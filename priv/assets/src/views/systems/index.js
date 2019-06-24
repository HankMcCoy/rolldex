// @flow

import * as React from 'react'
import { useReducer, useState } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled/macro'

import { useModals, useInput } from 'r/util/hooks'
import PageHeader from 'r/components/page-header'
import Spacer from 'r/components/spacer'
import AddBtn from 'r/components/add-btn'
import { Input } from 'r/components/input'
import { FormRow } from 'r/components/form'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import { H2, H3 } from 'r/components/heading'
import theme from 'r/theme'

import type { ThingDef, ChildDef } from './types'
import AddChildModal from './add-child-modal'
import SheetPreview from './sheet-preview'

const Content = styled.div`
	display: flex;
	flex: 1 0 0%;
`

const ThingFrame = styled.div`
	background: #f8f8f8;
	border: 1px solid #ddd;
	padding: 0 20px;
`
const Controls = styled.div`
	flex: 1 0 0%;
	background: ${theme.systemColorLight};
	padding: 20px 30px;
`

const LeftFrame = styled.div`
	flex: 1 0 0%;
`

const ChildrenFrame = styled.div`
	border-left: 4px solid ${theme.gray87};
	padding: 0 0 10px 20px;
`

function EditThing({
	thing,
	onSave,
	onCancel,
}: {
	thing?: ThingDef,
	onSave: ThingDef => void,
	onCancel: () => void,
}) {
	const name = useInput(thing && thing.name)
	const label = useInput(thing && thing.label)
	const { showModal, closeModal } = useModals()
	const [children, setChildren] = useState<Array<ChildDef>>(
		thing ? thing.children : []
	)
	return (
		<ThingFrame>
			<form
				onSubmit={() => {
					onSave({
						name: name.value,
						label: label.value,
						children,
					})
				}}
				css={css`
					padding: 10px 0 20px 0;
				`}
			>
				<FormRow label="Name:">
					<Input {...name} autoFocus />
				</FormRow>
				<Spacer height={10} />
				<FormRow label="Label:">
					<Input {...label} />
				</FormRow>
				<Spacer height={20} />
				<ChildrenFrame>
					<div
						css={css`
							display: flex;
							justify-content: space-between;
							align-items: center;
						`}
					>
						<H3>Children</H3>
						<AddBtn
							onClick={e => {
								e.preventDefault()
								showModal(
									<AddChildModal
										createChild={child => {
											setChildren([...children, child])
										}}
										closeModal={closeModal}
									/>
								)
							}}
						/>
					</div>
					{children.map(c => (
						<div>{c.name}</div>
					))}
				</ChildrenFrame>
				<Spacer height={20} />
				<div
					css={css`
						display: flex;
						flex-direction: row-reverse;
					`}
				>
					<PrimaryButton>Save</PrimaryButton>
					<Spacer width={10} />
					<SecondaryButton
						onClick={e => {
							e.preventDefault()
							onCancel()
						}}
					>
						Cancel
					</SecondaryButton>
				</div>
			</form>
		</ThingFrame>
	)
}

function Thing({ thing, edit }: { thing: ThingDef, edit: () => void }) {
	return (
		<ThingFrame>
			<div
				css={css`
					line-height: 50px;
					display: flex;
					align-items: center;
					justify-content: space-between;
				`}
			>
				{thing.name}
				<SecondaryButton onClick={edit}>Edit</SecondaryButton>
			</div>
		</ThingFrame>
	)
}
type ThingsState = {
	things: Map<string, ThingDef>,
	isEditing: Map<string, boolean>,
	isDrafting: boolean,
}
type ThingsAction =
	| {| type: 'CREATE', thing: ThingDef |}
	| {| type: 'EDIT', name: string |}
	| {| type: 'CANCEL_EDIT', name: string |}
	| {| type: 'UPDATE', thing: ThingDef |}
	| {| type: 'DRAFT' |}
	| {| type: 'CANCEL_DRAFT' |}
const mapAdd = <K, V>(map: Map<K, V>, key: K, value: V): Map<K, V> =>
	new Map([...map, [key, value]])

function addLogging<S, A: { type: any }>(reducer: (S, A) => S): (S, A) => S {
	return function loggingReducer(s, a) {
		const before = s
		const after = reducer(s, a)

		console.groupCollapsed(`%c${a.type}`, 'color: #444')
		console.log(
			'%cPrevious State:',
			'color: #9E9E9E; font-weight: 700;',
			before
		)
		console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', a)
		console.log('%cNext State:', 'color: #47B04B; font-weight: 700;', after)
		console.groupEnd()
		return after
	}
}
function reduceThings(s: ThingsState, action: ThingsAction): ThingsState {
	switch (action.type) {
		case 'DRAFT':
			return { ...s, isDrafting: true }
		case 'CANCEL_DRAFT':
			return { ...s, isDrafting: false }
		case 'CREATE':
			return {
				...s,
				things: mapAdd(s.things, action.thing.name, action.thing),
				isDrafting: false,
			}
		case 'EDIT':
			return { ...s, isEditing: mapAdd(s.isEditing, action.name, true) }
		case 'CANCEL_EDIT':
			return { ...s, isEditing: mapAdd(s.isEditing, action.name, false) }
		case 'UPDATE':
			return {
				...s,
				isEditing: mapAdd(s.isEditing, action.thing.name, false),
				things: mapAdd(s.things, action.thing.name, action.thing),
			}
		default:
			throw new Error(`Invalid action ${action.type}`)
	}
}
const reduceThingsWithLogging = addLogging(reduceThings)

function Systems() {
	const [{ things, isDrafting, isEditing }, dispatch] = useReducer<
		ThingsState,
		ThingsAction
	>(reduceThingsWithLogging, {
		things: new Map(),
		isEditing: new Map(),
		isDrafting: false,
	})
	return (
		<>
			<PageHeader title="Systems" />
			<Content>
				<LeftFrame>
					<SheetPreview things={things} />
				</LeftFrame>
				<Controls>
					<H2>Things</H2>
					<Spacer height={10} />
					<div
						css={css`
							& > *:not(:last-child) {
								margin-bottom: 5px;
							}
						`}
					>
						{[...things.values()].map(t =>
							isEditing.get(t.name) ? (
								<EditThing
									thing={t}
									onCancel={() =>
										dispatch({ type: 'CANCEL_EDIT', name: t.name })
									}
									onSave={thing => {
										dispatch({ type: 'UPDATE', thing })
									}}
								/>
							) : (
								<Thing
									thing={t}
									edit={() => {
										dispatch({ type: 'EDIT', name: t.name })
									}}
								/>
							)
						)}
					</div>
					{!!things.size && <Spacer height={10} />}
					{isDrafting ? (
						<EditThing
							onCancel={() => dispatch({ type: 'CANCEL_DRAFT' })}
							onSave={thing => {
								dispatch({ type: 'CREATE', thing })
							}}
						/>
					) : (
						<PrimaryButton onClick={() => dispatch({ type: 'DRAFT' })}>
							+
						</PrimaryButton>
					)}
				</Controls>
			</Content>
		</>
	)
}

export default Systems
