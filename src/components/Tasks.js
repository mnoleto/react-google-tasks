import React, { PropTypes, Component } from 'react';
import Task from '../components/Task';
import '../styles/tasks-component.scss';

class Tasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: []
		};
		this.handleAddTaskClick = this.handleAddTaskClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.tasks) {
			this.setState({tasks: nextProps.tasks});
		}
	}

	handleAddTaskClick() {
		const { tasks } = this.props;
		if(tasks.length === this.state.tasks.length) {
			this.setState({ tasks: this.state.tasks.concat({id: '', title: '', status: 'needsAction'}) });
		}
	}

	render() {
		const { onAddNewTask, onDeleteTask, onUpdateTask, onUpdateTaskStatus, onOpenTaskEdition, viewType } = this.props;
		
		let tasksElements = [];
		if(this.state.tasks.length > 0) {
			if(viewType === 'date') {
				// Recreate arrays to group tasks by date
				let byday = {}; // New tasks array
				let noDueDate = []; // The tasks without date will be placed in a different array
				this.state.tasks.map(function groupday(value) {
					if(value.due) {
						let d = new Date(value['due']);
						d = Math.floor(d.getTime()/(1000*60*60*24));
						byday[d]=byday[d]||[];
						byday[d].push(value);
					} else {
						noDueDate.push(value);
					}
				});
				
				let group = [];
				for(let groupDay in byday) {
					if( byday.hasOwnProperty(groupDay) ) {
						group.push({
							due: byday[groupDay][0].due,
							tasks: byday[groupDay]
						});
					}
				}

				if(group.length > 0) {
					// Loop through the grouped by date array
					group.forEach(function(value, index) {
						let due = new Date(value.due);
						tasksElements.push( <div className="due-title" key={index + value.due}><strong>{due.getDate() + '/' + (due.getMonth() + 1) + '/' + due.getFullYear()}</strong></div> );
						
						let list = value.tasks.map(function(task) {
							return (
								<Task
									key={task.id}
									task={task}
									onAddNewTask={onAddNewTask}
									onDeleteTask={onDeleteTask}
									onUpdateTask={onUpdateTask}
									onUpdateTaskStatus={onUpdateTaskStatus}
									onOpenTaskEdition={onOpenTaskEdition}
								/>
							);
						});
						tasksElements.push(<ol key={index} className="mdl-list primary-tasks">{list}</ol>);
						
					});
				}
				
				if(noDueDate.length > 0) {
					tasksElements.push( <div className="due-title" key={"noduetitle"}><strong>No due data</strong></div> );
					// Loop through the tasks without due date
					let list = noDueDate.map(function(task) {
						return (
							<Task
								key={task.id}
								task={task}
								onAddNewTask={onAddNewTask}
								onDeleteTask={onDeleteTask}
								onUpdateTask={onUpdateTask}
								onUpdateTaskStatus={onUpdateTaskStatus}
								onOpenTaskEdition={onOpenTaskEdition}
							/>
						);
					});
					tasksElements.push(<ol key={"noduelist"} className="mdl-list primary-tasks">{list}</ol>);
				}
				
			} else {
				let list = this.state.tasks.map(function(value) {
					return (
						<Task
							key={value.id}
							task={value}
							onAddNewTask={onAddNewTask}
							onDeleteTask={onDeleteTask}
							onUpdateTask={onUpdateTask}
							onUpdateTaskStatus={onUpdateTaskStatus}
							onOpenTaskEdition={onOpenTaskEdition}
						/>
					);
				});
				tasksElements.push(<ol key={"tasklist"} className="mdl-list primary-tasks">{list}</ol>);
			}
		} else if(viewType === 'completed') {
			tasksElements.push(<div className="empty-message">No tasks to show.</div>);
		}
		return (
			<div className="tasks-container">
				{tasksElements}

				{(viewType !== 'completed') &&
				<button type="button" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored add-task-button" onClick={this.handleAddTaskClick}>
					<i className="material-icons">add</i>
				</button>
				}
			</div>
		);
	}
}

Tasks.propTypes = {
	onAddNewTask: PropTypes.func.isRequired,
	onDeleteTask: PropTypes.func.isRequired,
	onOpenTaskEdition: PropTypes.func.isRequired,
	onUpdateTask: PropTypes.func.isRequired,
	onUpdateTaskStatus: PropTypes.func.isRequired,
	tasks: PropTypes.array.isRequired,
	viewType: PropTypes.string.isRequired
};

export default Tasks;