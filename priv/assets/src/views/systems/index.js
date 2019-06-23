// @flow

import * as React from 'react'
import { useReducer } from 'react'
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

import { type ThingDef } from './types'
import AddChildModal from './add-child-modal'

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

const Sheet = styled.div`
	flex: 1 0 0%;
	padding: 20px 30px;
`

const ChildrenFrame = styled.div`
	border: 1px solid ${theme.gray87};
	background: #f0f0f0;
	padding: 20px;
`

function EditThing({
	onSave,
	onCancel,
}: {
	onSave: ThingDef => void,
	onCancel: () => void,
}) {
	const name = useInput()
	const label = useInput()
	const { showModal, closeModal } = useModals()
	return (
		<ThingFrame>
			<form
				onSubmit={() => {
					onSave({
						name: name.value,
						label: label.value,
						children: [],
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
											console.log(child)
										}}
										closeModal={closeModal}
									/>
								)
							}}
						/>
					</div>
				</ChildrenFrame>
				<Spacer height={20} />
				<div
					css={css`
						display: flex;
						flex-direction: row-reverse;
					`}
				>
					<PrimaryButton>Submit</PrimaryButton>
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

function Thing({ thing }: { thing: ThingDef }) {
	return (
		<ThingFrame>
			<div
				css={css`
					line-height: 50px;
				`}
			>
				{thing.name}
			</div>
		</ThingFrame>
	)
}
type ThingsState = {
	things: Array<ThingDef>,
	isDrafting: boolean,
}
type ThingsAction =
	| {| type: 'CREATE', thing: ThingDef |}
	| {| type: 'DRAFT' |}
	| {| type: 'CANCEL_DRAFT' |}
function reduceThings(s: ThingsState, action: ThingsAction) {
	switch (action.type) {
		case 'DRAFT':
			return { ...s, isDrafting: true }
		case 'CANCEL_DRAFT':
			return { ...s, isDrafting: false }
		case 'CREATE':
			return { ...s, things: [...s.things, action.thing], isDrafting: false }
		default:
			throw new Error(`Invalid action ${action.type}`)
	}
}

function Systems() {
	const [{ things, isDrafting }, dispatch] = useReducer<
		ThingsState,
		ThingsAction
	>(reduceThings, {
		things: [],
		isDrafting: false,
	})
	return (
		<>
			<PageHeader title="Systems" />
			<Content>
				<Sheet>
					<H2>Preview</H2>
					{things.map(t => (
						<div>{t.label}</div>
					))}
				</Sheet>
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
						{things.map(t => (
							<Thing thing={t} />
						))}
					</div>
					{!!things.length && <Spacer height={10} />}
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
