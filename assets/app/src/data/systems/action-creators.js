// @flow
import { actionXhr } from 'r/util/redux'
import type { System, DraftSystem } from './index'
import {
	FETCH_SYSTEM_LIST,
	FETCH_SYSTEM,
	CREATE_SYSTEM,
	UPDATE_SYSTEM
} from './action-types'

export const fetchSystemList = () =>
	actionXhr({
		actionType: FETCH_SYSTEM_LIST,
		method: 'GET',
		path: '/api/systems'
	})

export const fetchSystem = (id: number) =>
	actionXhr({
		actionType: FETCH_SYSTEM,
		method: 'GET',
		path: `/api/systems/${id}`
	})

export const createSystem = (draftSystem: DraftSystem) =>
	actionXhr({
		actionType: CREATE_SYSTEM,
		method: 'POST',
		path: '/api/systems',
		requestBody: { system: draftSystem }
	})

export const updateSystem = (system: System) =>
	actionXhr({
		actionType: UPDATE_SYSTEM,
		method: 'PUT',
		path: `/api/systems/${system.id}`,
		requestBody: { system }
	})
