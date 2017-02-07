import React, { PropTypes, Component } from 'react';
import ContentEditable from 'react-contenteditable';
import '../styles/tasks-component.scss';

class Task extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: ''
		};

		this.timer;
		this.findAncestor = this.findAncestor.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleTaskClick = this.handleTaskClick.bind(this);
		this.handleTitleBlur = this.handleTitleBlur.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
	}

	componentDidMount() {
		const { task } = this.props;
		if(task && task.title !== this.state.title) {
			this.setState({title: task.title});
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.task && nextProps.task.title !== this.state.title) {
			this.setState({title: nextProps.task.title});
		}
	}

	findAncestor(el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls));
		return el;
	}

	handleCheckboxChange() {
		const { task, onUpdateTaskStatus } = this.props;
		const taskId = task.id;

		if(this.refs[taskId].checked) {
			this.refs[taskId].parentElement.classList.add('completed');
			onUpdateTaskStatus(task.id, 'completed');
		} else {
			this.refs[taskId].parentElement.classList.remove('completed');
			onUpdateTaskStatus(task.id, 'needsAction');
		}
	}

	handleDeleteClick() {
		const { task, onDeleteTask } = this.props;
		onDeleteTask(task);
	}

	handleEditClick(e) {
		e.preventDefault();
		const { task, onOpenTaskEdition } = this.props;
		this.handleTaskClick(e);
		onOpenTaskEdition(task);
	}

	handleTaskClick(e) {
		let elements = document.querySelectorAll('.task-item');
		[].forEach.call(elements, function(el) {
			el.classList.remove("selected");
		});

		const parent = this.findAncestor(e.target, 'task-item');
		parent.classList.add('selected');
	}

	handleTitleBlur() {
		const { task, onAddNewTask, onUpdateTask } = this.props;
		clearTimeout(this.timer);

		// Check if the title was changed
		if(this.state.title !== task.title) {
			if(task.id !== '') {
				// Update an existing task
				onUpdateTask(task.id, this.state.title);
			} else {
				// Create a new task
				onAddNewTask(this.state.title);
			}
		}
	}

	handleTitleChange(e) {
		this.setState({title: e.target.value});

		clearTimeout(this.timer);
		this.timer = setTimeout(this.handleTitleBlur, 1000);
	}

	render() {
		const { task } = this.props;

		let tk;
		if(!task) tk = {id: '', title: '', status: 'needsAction'};
		tk = task;

		let date;
		if(task.due) {
			let dateFormated = new Date(task.due);
			let month = dateFormated.getMonth() + 1;
			date = ( (dateFormated.getDate() <= 9) ? '0' : '' ) + dateFormated.getDate() + '/' + ( (month <= 9) ? '0' : '')  + month + '/' + dateFormated.getFullYear();
		}

		return (
			<li>
				<div className={(tk.status === 'completed') ? "task-item completed" : "task-item"}>
					{ (!tk.deleted) ? (
						tk.status === 'completed' ? (
							<input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" ref={tk.id} value={tk.id} defaultChecked onChange={this.handleCheckboxChange} />
						) : (
							<input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" ref={tk.id} value={tk.id} onChange={this.handleCheckboxChange} />
						)
					) : <button type="button" className="undo-button"><i className="material-icons">undo</i></button>}
					
					<div className="task-info">
						<ContentEditable
							className="task-title"
							html={tk.title}
							onBlur={this.handleTitleBlur}
							onChange={this.handleTitleChange}
							onClick={this.handleTaskClick}
						/>
						<div className="due">
							{(task.due) &&
								<a href="#" onClick={this.handleEditClick}>{date}</a>
							}
						</div>
					</div>

					<div className="notes">
						{(task.notes) &&
							<a href="#" onClick={this.handleEditClick}>{task.notes}</a>
						}
					</div>

					<div className="task-action-button">
						<button type="button" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab list-button edit-details-button" onClick={this.handleEditClick}>
							<i className="material-icons">mode_edit</i>
						</button>

						{(tk.id !== '') &&
						<button type="button"  className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab list-button edit-details-button" onClick={this.handleDeleteClick}>
							<i className="material-icons">delete</i>
						</button>
						}
					</div>
				</div>
			</li>
		);
	}
}

Task.propTypes = {
	onAddNewTask: PropTypes.func.isRequired,
	onDeleteTask: PropTypes.func.isRequired,
	onOpenTaskEdition: PropTypes.func.isRequired,
	onUpdateTask: PropTypes.func.isRequired,
	onUpdateTaskStatus: PropTypes.func.isRequired,
	task: PropTypes.object
};

export default Task;