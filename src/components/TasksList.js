import React, { PropTypes } from 'react';
import '../styles/tasksList-component.scss';

import TasksListItem from '../components/TasksListItem';

const TasksList = ({ tasksLists, onDeleteTasksList, onOpenTasksList, onUpdateTasksList }) => {
	let tasksList;
	if(tasksLists && tasksLists.length > 0) {
		tasksList = tasksLists.map(function(list, index) {
			return (
				<TasksListItem key={list.id}
					list={list}
					onDeleteTasksList={onDeleteTasksList}
					onOpenTasksList={onOpenTasksList}
					onUpdateTasksList={onUpdateTasksList}
				/>
			);
		});
	}
	
	return (
		<nav>
			<span className="mdl-layout-title">Task Lists:</span>
			<ul className="demo-list-icon mdl-list">
				{tasksList}
			</ul>
		</nav>
	);
}

TasksList.propTypes = {
	onDeleteTasksList: PropTypes.func.isRequired,
	onOpenTasksList: PropTypes.func.isRequired,
	onUpdateTasksList: PropTypes.func.isRequired,
	tasksLists: PropTypes.array.isRequired
};

export default TasksList;