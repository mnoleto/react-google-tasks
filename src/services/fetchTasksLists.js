import tasksLists from '../services/TasksListService';

const fetchTasksLists = () => new Promise((resolve, reject) => {
	const request = gapi.client.tasks.tasklists.list();
	request.execute(res => 
		res.error ? reject(res.error) : resolve(res.result)
	);
});

export default fetchTasksLists;
