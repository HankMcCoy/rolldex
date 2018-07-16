// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { withRouter } from 'react-router-dom'
import { type History } from 'history'

import { connect } from 'r/util/redux'
import type { System, DraftSystem } from 'r/data/systems'
import { createSystem } from 'r/data/systems/action-creators'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'

import SystemForm from './system-form'

type Props = {
	history: History,
	createSystem: DraftSystem => Promise<System>
}
function AddSystem({ history, createSystem }: Props) {
	return (
		<React.Fragment>
			<PageHeader title="New System" />
			<PageContent>
				<SystemForm
					initialValues={{
						name: '',
						description: ''
					}}
					onSubmit={(values, { setSubmitting }) => {
						const { name, description } = values
						createSystem({ name, description }).then(system => {
							setSubmitting(false)
							history.push(`/systems/${system.id}`)
						})
					}}
					onCancel={() => {
						history.push('/systems')
					}}
				/>
			</PageContent>
		</React.Fragment>
	)
}

export default flowRight(
	withRouter,
	connect({
		actionCreators: {
			createSystem
		}
	})
)(AddSystem)
