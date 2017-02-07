const fetchTasksLists = () => new Promise((resolve, reject) => {
	const request = window.gapi.client.tasks.tasklists.list();
	request.execute(res => 
		res.error ? reject(res.error) : resolve(res.result)
	);
});

export default fetchTasksLists;
