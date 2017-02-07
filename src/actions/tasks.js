import * as types from '../constants/actionTypes';

// Action Creators
// FETCH
export function fetchTasksFailure(error) {
	return {
		type: types.FETCH_TASKS_FAILURE,
		error
	};
}

export function fetchTasksRequest(id, showCompleted, showDeleted) {
	return {
		type: types.FETCH_TASKS_REQUEST,
		id,
		showCompleted,
		showDeleted
	};
}

export function fetchTasksSuccess(data) {
	return {
		type: types.FETCH_TASKS_SUCCESS,
		data
	};
}
// thunk for create a user session
export function fetchTasks(taskListId, showCompleted = true, showDeleted = false) {
	return (dispatch) => {
		// Optimistic update
		dispatch(fetchTasksRequest(taskListId, showCompleted, showDeleted));

		let promise = new Promise((resolve, reject) => {
			window.gapi.client.tasks.tasks.list({
				tasklist: taskListId,
				showCompleted,
				showDeleted
			}).execute(res => (res.error) ? reject(res.error) : resolve(res));
		});

		return promise.then(function(res) {
			dispatch(fetchTasksSuccess(res.items));
		})
		.catch(function(error) {
			dispatch(fetchTasksFailure(error));
		});
	};
}

// INSERT
export function insertTaskFailure(error) {
	return {
		type: types.INSERT_TASK_FAILURE,
		error
	};
}

export function insertTaskRequest(data) {
	return {
		type: types.INSERT_TASK_REQUEST,
		data
	};
}

export function insertTaskSuccess(data) {
	return {
		type: types.INSERT_TASK_SUCCESS,
		data
	};
}

// thunk for create a user session
export function insertTask(data) {
	return (dispatch) => {
		// Optimistic update
		dispatch(insertTaskRequest(data));

		let promise = new Promise((resolve, reject) => {
			window.gapi.client.tasks.tasks.insert(data).execute(res => (res.error) ? reject(res.error) : resolve(res));
		});

		return promise.then(function(res) {
			dispatch(insertTaskSuccess(res));
		})
		.catch(function(error) {
			dispatch(insertTaskFailure(error));
		});
	};
}

// DELETE
export function deleteTaskFailure(error) {
	return {
		type: types.DELETE_TASK_FAILURE,
		error
	};
}

export function deleteTaskRequest(id) {
	return {
		type: types.DELETE_TASK_REQUEST,
		id
	};
}

export function deleteTaskSuccess() {
	return {
		type: types.DELETE_TASK_SUCCESS
	};
}

// thunk for create a user session
export function deleteTask(taskListId, taskId) {
	return dispatch => {
		// Optimistic update
		dispatch(deleteTaskRequest(taskId));

		let promise = new Promise((resolve, reject) => {
			window.gapi.client.tasks.tasks.delete({
				tasklist: taskListId,
				task: taskId
			}).execute(res => (res.error) ? reject(res.error) : resolve(res));
		});

		return promise.then(function(res) {
			dispatch(deleteTaskSuccess(res));
		})
		.catch(function(error) {
			dispatch(deleteTaskFailure(error));
		});
	};
}

// UPDATE
export function updateTaskFailure(error) {
	return {
		type: types.UPDATE_TASK_FAILURE,
		error
	};
}

export function updateTaskRequest(data) {
	return {
		type: types.UPDATE_TASK_REQUEST,
		data
	};
}

export function updateTaskSuccess(data) {
	return {
		type: types.UPDATE_TASK_SUCCESS,
		data
	};
}

// thunk for create a user session
export function updateTask(data) {
	return (dispatch) => {

		// Optimistic update
		dispatch(updateTaskRequest(data));

		let promise = new Promise((resolve, reject) => {
			window.gapi.client.tasks.tasks.update(data).execute(res => (res.error) ? reject(res.error) : resolve(res));
		});

		return promise.then(function(res) {
			dispatch(updateTaskSuccess(res));
		})
		.catch(function(error) {
			dispatch(updateTaskFailure(error));
		});
	};
}

// ORDER BY
function viewType(view) {
	return {
		type: types.SET_TASK_VIEWTYPE,
		view
	};
}

export function setViewType(view) {
	return dispatch => {
		dispatch(viewType(view));
	};
}