const tasksListsService =  {
	getTasksLists: () => gapi.client.tasks.tasklists.list()
};

export default tasksListsService;