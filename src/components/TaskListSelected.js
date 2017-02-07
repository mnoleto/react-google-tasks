import React, { PropTypes } from 'react';
import '../styles/taskListSelected-component.scss';

import Tasks from '../components/Tasks';
// import TasksToolbarActions from '../components/TasksToolbarActions';
import TasksToolbarViewType from '../components/TasksToolbarViewType';

const TaskListSelected = ({ list, onAddNewTask, onChangeViewType, onDeleteTask, onUpdateTask, onUpdateTaskStatus, onOpenTaskEdition, tasks, viewType }) => {
	return (
		<div className="mdl-layout__content tasks-main-content">
			<h3>{list.title}</h3>
			
			<div className="toolbar">
				<nav className="mdl-navigation">
					{/*<TasksToolbarActions />*/}
					<TasksToolbarViewType
						onChangeViewType={onChangeViewType}
						viewType={viewType}
					/>
				</nav>
			</div>

			<Tasks
				tasks={tasks}
				onAddNewTask={onAddNewTask}
				onDeleteTask={onDeleteTask}
				onUpdateTask={onUpdateTask}
				onUpdateTaskStatus={onUpdateTaskStatus}
				onOpenTaskEdition={onOpenTaskEdition}
				viewType={viewType}
			/>
		</div>
	);
};

TaskListSelected.propTypes = {
	list: PropTypes.object.isRequired,
	onAddNewTask: PropTypes.func.isRequired,
	onChangeViewType: PropTypes.func.isRequired,
	onDeleteTask: PropTypes.func.isRequired,
	onOpenTaskEdition: PropTypes.func.isRequired,
	onUpdateTask: PropTypes.func.isRequired,
	onUpdateTaskStatus: PropTypes.func.isRequired,
	tasks: PropTypes.array.isRequired,
	viewType: PropTypes.string.isRequired
};

export default TaskListSelected;