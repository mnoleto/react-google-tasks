import React, { PropTypes, Component } from 'react';
import '../styles/tasksList-component.scss';

class TasksListItem extends Component {
	constructor(props) {
		super(props);
		this.handleDeleteListClick = this.handleDeleteListClick.bind(this);
		this.handleOpenListClick = this.handleOpenListClick.bind(this);
		this.handleUpdateListClick = this.handleUpdateListClick.bind(this);
	}

	handleDeleteListClick(e) {
		e.preventDefault();
		const { list, onDeleteTasksList } = this.props;
		onDeleteTasksList(list);
	}

	handleOpenListClick(e) {
		e.preventDefault();
		const { list, onOpenTasksList } = this.props;
		onOpenTasksList(list);
	}

	handleUpdateListClick(e) {
		e.preventDefault();
		const { list, onUpdateTasksList } = this.props;
		onUpdateTasksList(list);
	}

	render() {
		const { list } = this.props;
		return (
			<li className="mdl-list__item list-item">
				<a href="" onClick={this.handleOpenListClick}>{list.title}</a>
				<ul className="action-buttons">
					<li>
						<button type="button" className="mdl-button mdl-js-button mdl-button--mini-fab edit-button" onClick={this.handleUpdateListClick}>
							<i className="material-icons">mode_edit</i>
						</button>
					</li>
					<li>
						<button type="button" className="mdl-button mdl-js-button mdl-button--mini-fab delete-button" onClick={this.handleDeleteListClick}>
							<i className="material-icons">delete</i>
						</button>
					</li>
				</ul>
			</li>
		);
	}
}

TasksListItem.propTypes = {
	list: PropTypes.object.isRequired,
	onDeleteTasksList: PropTypes.func.isRequired,
	onOpenTasksList: PropTypes.func.isRequired,
	onUpdateTasksList: PropTypes.func.isRequired
};

export default TasksListItem;