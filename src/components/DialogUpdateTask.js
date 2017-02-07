import React, { PropTypes, Component } from 'react';
import ContentEditable from 'react-contenteditable';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../styles/dialogs.scss';
import 'react-datepicker/dist/react-datepicker.css';

class DialogUpdateTask extends Component {
	constructor(props) {
		super(props);

		this.state = {
			due: moment(),
			notes: '',
			status: '',
			title: ''
		}

		this.handleCancel = this.handleCancel.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleNotesChange = this.handleNotesChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.task) {
			this.setState({
				due: (nextProps.task.due) ? moment(nextProps.task.due) : moment(),
				notes: (nextProps.task.notes) ? nextProps.task.notes : '',
				status: nextProps.task.status,
				title: nextProps.task.title
			});
		}
	}

	handleCancel(e) {
		e.preventDefault();
		const { id, onCancel } = this.props;
		onCancel(id);
	}

	handleCheckboxChange(e) {
		const { task, onUpdateTaskStatus } = this.props;
		const taskId = task.id;

		if(this.refs[taskId].checked) {
			let status = 'completed';
			this.setState({status});
			this.refs[taskId].parentElement.classList.add('completed');
			onUpdateTaskStatus(task.id, status);
		} else {
			let status = 'needsAction';
			this.setState({status});
			this.refs[taskId].parentElement.classList.remove('completed');
			onUpdateTaskStatus(task.id, status);
		}
	}

	handleChangeDate(date) {
		this.setState({
			due: date
		});
	}

	handleNotesChange() {
		this.setState({notes: this.refs.notes.value});
	}

	handleTitleChange(e) {
		this.setState({title: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		const { task, onConfirm } = this.props;

		onConfirm(task.id, this.state.title, this.state.due.toDate(), this.state.notes);
		this.refs.notes.value = "";
	}

	render() {
		const { id, task } = this.props;

		let tk;
		if(!task) tk = {id: '', title: '', status: 'needsAction'};
		tk = task;

		return (
			<dialog id={id} className="mdl-dialog dialog">
				<form name="updateTask" method="post">
					<div className="mdl-dialog__content">
						<div className={(this.state.status === 'completed') ? "task-title-container completed" : "task-title-container"}>
							{ (this.state.status === 'completed') ?
								<input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" ref={tk.id} value={tk.id} defaultChecked onChange={this.handleCheckboxChange} />
							:
								<input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" ref={tk.id} value={tk.id} onChange={this.handleCheckboxChange} />
							}
							<ContentEditable
								className="task-title"
								html={this.state.title}
								onChange={this.handleTitleChange}
							/>
						</div>

						{/* customInput={<CustomInput />} */}
						<label htmlFor="datepicker">Due date:</label>
						<DatePicker
							className="datepicker"
							dateFormat='DD/MM/YYYY'
							id="datepicker"
							onChange={this.handleChangeDate}
							selected={this.state.due}
						/>

						<label htmlFor="note">Note:</label>
						<textarea rows="2" ref="notes" id="note" value={this.state.notes} onChange={this.handleNotesChange} />
					</div>

					<div className="mdl-dialog__actions actions">
						<button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.handleSubmit}>Update</button>
						<button type="button" className="mdl-button close" onClick={this.handleCancel}>Cancel</button>
					</div>
				</form>
			</dialog>
		);
	}
	
}

DialogUpdateTask.propTypes = {
	id: PropTypes.string.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	onUpdateTaskStatus: PropTypes.func.isRequired,
	task: PropTypes.object
};

export default DialogUpdateTask;