import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { deleteTasksList, insertTasksList, updateTasksList } from '../actions/tasksLists';
import { deleteTask, fetchTasks, insertTask, setViewType, updateTask } from '../actions/tasks';

import AddListButton from '../components/AddListButton';
import DialogAddList from '../components/DialogAddList';
import DialogDeleteList from '../components/DialogDeleteList';
import DialogUpdateList from '../components/DialogUpdateList';
import DialogUpdateTask from '../components/DialogUpdateTask';
import TasksList from '../components/TasksList';
import TaskListSelected from '../components/TaskListSelected';

import '../styles/tasks-page.scss';

class TasksPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deleteList: {},
			selectedList: {},
			selectedTask: {},
			updateList: {},
			modalAddListIsOpen: false,
			modalDeleteListIsOpen: false,
			modalUpdateListIsOpen: false,
			modalUpdateTaskIsOpen: false
		};
		this.closeDialog = this.closeDialog.bind(this);
		this.onAddNewTask = this.onAddNewTask.bind(this);
		this.onChangeViewType = this.onChangeViewType.bind(this);
		this.onDeleteTask = this.onDeleteTask.bind(this);
		this.onDeleteTasksList = this.onDeleteTasksList.bind(this);
		this.onInsertNewList = this.onInsertNewList.bind(this);
		this.onOpenAddDialog = this.onOpenAddDialog.bind(this);
		this.onOpenDeleteDialog = this.onOpenDeleteDialog.bind(this);
		this.onOpenUpdateDialog = this.onOpenUpdateDialog.bind(this);
		this.onOpenTaskDialog = this.onOpenTaskDialog.bind(this);
		this.onOpenTasksList = this.onOpenTasksList.bind(this);
		this.onUpdateTask = this.onUpdateTask.bind(this);
		this.onUpdateTaskTitle = this.onUpdateTaskTitle.bind(this);
		this.onUpdateTasksList = this.onUpdateTasksList.bind(this);
		this.onUpdateTaskStatus = this.onUpdateTaskStatus.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// Select the first list when the page loads
		if(nextProps.tasksLists && nextProps.tasksLists.length > 1 && Object.keys(this.state.selectedList).length === 0 && this.state.selectedList.id !== nextProps.tasksLists[0].id ) {
			this.onOpenTasksList(nextProps.tasksLists[0]);
		}
	}

	// Close an onOpen dialog
	closeDialog() {
		this.setState({
			modalAddListIsOpen: false,
			modalDeleteListIsOpen: false,
			modalUpdateListIsOpen: false,
			modalUpdateTaskIsOpen: false
		});
	}

	// Add new task
	onAddNewTask(title) {
		const { tasks, insertTask } = this.props;
		if(tasks.length > 0) {
			// Previous sibling task identifier. If the task is created at the first position among its siblings, this parameter is omitted. Optional.
			insertTask({tasklist: this.state.selectedList.id, title: title, previous: tasks[tasks.length-1].id});
		} else {
			insertTask({tasklist: this.state.selectedList.id, title: title});
		}
	}

	// Change tasks visualization
	onChangeViewType(type) {
		const { setViewType, fetchTasks } = this.props;
		let showCompleted = false,
			showDeleted = false;
		
		setViewType(type);

		switch(type) {
			case 'completed': {
				showCompleted = true;
				break;
			}
			case 'date': {
				showCompleted = true;
				break;
			}
			case 'myOrder': {
				showCompleted = true;
				break;
			}
			case 'trash': {
				showDeleted = true;
				break;
			}
		}

		fetchTasks(this.state.selectedList.id, showCompleted, showDeleted);
	}

	// Delete the seletec task
	onDeleteTask(task) {
		const { deleteTask } = this.props;
		deleteTask(this.state.selectedList.id, task.id);
	}

	// Delete the selected list
	onDeleteTasksList(list) {
		this.closeDialog();
		const { deleteTasksList } = this.props;

		deleteTasksList(list.id);
		this.setState({deleteList: {}});
	}

	// Insert a new list
	onInsertNewList(name) {
		this.closeDialog();

		if(name !== '') {
			const { insertTasksList } = this.props;
			insertTasksList(name);
		}
	}

	// Open the "Add List" dialog
	onOpenAddDialog() {
		this.setState({modalAddListIsOpen: true});
	}

	// Open the "Delete List" dialog
	onOpenDeleteDialog(list) {
		this.setState({
			deleteList: list,
			modalDeleteListIsOpen: true
		});
	}

	// Open the "Update Task" dialog
	onOpenTaskDialog(list) {
		this.setState({
			modalUpdateTaskIsOpen: true,
			selectedTask: list
		});
	}

	// Open the "Update List" dialog
	onOpenUpdateDialog(list) {
		this.setState({
			modalUpdateListIsOpen: true,
			updateList: list
		});
	}

	// Open the selected list and fetch its tasks
	onOpenTasksList(list) {
		const { fetchTasks } = this.props;
		document.querySelector('.task-list').classList.remove('is-visible');
		document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
		
		this.setState({
			selectedList: list
		});

		fetchTasks(list.id);
	}

	// Change the title, due and notes of selected task from a list
	onUpdateTask(taskId, title, due, notes) {
		const { updateTask } = this.props;
		this.closeDialog();
		updateTask({tasklist: this.state.selectedList.id, task: taskId, id: taskId, title, due, notes});
	}

	// Change the title of selected task from a list
	onUpdateTaskTitle(taskId, title) {
		const { updateTask } = this.props;
		updateTask({tasklist: this.state.selectedList.id, task: taskId, id: taskId, title});
	}

	// Update a selected list
	onUpdateTasksList(list, newName) {
		this.closeDialog();
		const { updateTasksList } = this.props;

		updateTasksList(list.id, newName);
		this.setState({updateList: {}});
	}

	// Update the status of a task
	// completed - needsAction
	onUpdateTaskStatus(taskId, status) {
		const { updateTask } = this.props;
		updateTask({tasklist: this.state.selectedList.id, task: taskId, id: taskId, status});
	}

	toggleMenu() {
		if(!document.querySelector('.task-list').classList.contains('is-visible')) {
			document.querySelector('.task-list').classList.add('is-visible');
			document.querySelector('.mdl-layout__obfuscator').classList.add('is-visible');
		} else {
			document.querySelector('.task-list').classList.remove('is-visible');
			document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
		}
	}

	render() {
		const { viewType, tasks, tasksLists } = this.props;

		const customStyles = {
			content : {
				background: 'transparent',
				border: '0px',
				boxShadow: 'none',
				top : '50%',
				left : '50%',
				right : 'auto',
				bottom : 'auto',
				marginRight : '-50%',
				transform : 'translate(-50%, -50%)'
			}
		};
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header has-drawer is-upgraded tasks-page">
				<header className="mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
					<button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" onClick={this.toggleMenu}>
						<i className="material-icons">more_vert</i>
						<span className="mdl-button__ripple-container"><span className="mdl-ripple" /></span>
					</button>
				</header>

				<div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50 task-list" aria-hidden="false">
					<AddListButton
						onClickButton={this.onOpenAddDialog}
					/>

					<TasksList
						onDeleteTasksList={this.onOpenDeleteDialog}
						onOpenTasksList={this.onOpenTasksList}
						onUpdateTasksList={this.onOpenUpdateDialog}
						tasksLists={tasksLists}
					/>
				</div>

				<TaskListSelected
					list={this.state.selectedList}
					viewType={viewType}
					tasks={tasks}
					onAddNewTask={this.onAddNewTask}
					onDeleteTask={this.onDeleteTask}
					onChangeViewType={this.onChangeViewType}
					onOpenTaskEdition={this.onOpenTaskDialog}
					onUpdateTask={this.onUpdateTaskTitle}
					onUpdateTaskStatus={this.onUpdateTaskStatus}
				/>

				<div className="mdl-layout__obfuscator" onClick={this.toggleMenu} />
				
				{/*
				* DIALOG COMPONENTS
				*/}
				<Modal
					style={customStyles}
					isOpen={this.state.modalAddListIsOpen}
					contentLabel="Insert New List"
				>
					<DialogAddList
						id={"insertDialog"}
						onCancel={this.closeDialog}
						onConfirm={this.onInsertNewList}
					/>
				</Modal>


				<Modal
					style={customStyles}
					isOpen={this.state.modalDeleteListIsOpen}
					contentLabel="Delete Task"
				>
					<DialogDeleteList
						id={"deleteDialog"}
						list={this.state.deleteList}
						onCancel={this.closeDialog}
						onConfirm={this.onDeleteTasksList}
					/>
				</Modal>

				<Modal
					style={customStyles}
					isOpen={this.state.modalUpdateListIsOpen}
					contentLabel="Update List"
				>
					<DialogUpdateList
						id={"updateDialog"}
						list={this.state.updateList}
						onCancel={this.closeDialog}
						onConfirm={this.onUpdateTasksList}
					/>
				</Modal>

				<Modal
					style={customStyles}
					isOpen={this.state.modalUpdateTaskIsOpen}
					contentLabel="Update Task"
				>
					<DialogUpdateTask
						id={"updateTask"}
						task={this.state.selectedTask}
						onCancel={this.closeDialog}
						onConfirm={this.onUpdateTask}
						onUpdateTaskStatus={this.onUpdateTaskStatus}
					/>
				</Modal>
			</div>
		);
	}
	
}

TasksPage.propTypes = {
	deleteTasksList: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
	fetchTasks: PropTypes.func.isRequired,
	insertTasksList: PropTypes.func.isRequired,
	insertTask: PropTypes.func.isRequired,
	setViewType: PropTypes.func.isRequired,
	tasks: PropTypes.array,
	tasksLists: PropTypes.array.isRequired,
	updateTask: PropTypes.func.isRequired,
	updateTasksList: PropTypes.func.isRequired,
	viewType: PropTypes.string.isRequired
};

function filterTasksByStatus(tasks, viewType) {
	if(tasks && viewType === 'completed') {
		return tasks.filter(function(task) {
			return (task.status === 'completed' && !task.deleted);
		});
	} else if(tasks && viewType === 'trash') {
		return tasks.filter(function(task) {
			return (task.deleted);
		});
	} else {
		return tasks;
	}
}

function mapStateToProps(state) {
	return {
		viewType: state.tasks.viewType,
		tasks: filterTasksByStatus(state.tasks.tasks, state.tasks.viewType),
		tasksLists: state.tasksLists
	};
}

export default connect( mapStateToProps, {
	deleteTask,
	deleteTasksList,
	fetchTasks,
	insertTask,
	insertTasksList,
	setViewType,
	updateTask,
	updateTasksList
})(TasksPage);
