import React, { PropTypes, Component } from 'react';
import '../styles/tasksToolbarViewType-component.scss';

class TaskToolbarViewType extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		const { onChangeViewType, viewType } = this.props;
		const type = e.target.dataset.type;
		if(type !== viewType) {
			onChangeViewType(type);
		}
	}

	render() {
		const { viewType } = this.props;
		return (
			<div className="tasks-toolbar-viewType">
				<button type="button" className={(viewType === 'myOrder') ? "mdl-navigation__link active-filter" : "mdl-navigation__link"}  data-type="myOrder" onClick={this.handleClick}>My order</button>
				<button type="button" className={(viewType === 'date') ? "mdl-navigation__link active-filter" : "mdl-navigation__link"} data-type="date" onClick={this.handleClick}>Sort by date</button>
				<button type="button" className={(viewType === 'completed') ? "mdl-navigation__link active-filter" : "mdl-navigation__link"} data-type="completed" onClick={this.handleClick}>Completed tasks</button>
				{/*<button type="button" className={(viewType === 'trash') ? "mdl-navigation__link active-filter" : "mdl-navigation__link"} data-type="trash" onClick={this.handleClick}>Trash</button>*/}
			</div>
		);
	}
}

TaskToolbarViewType.propTypes = {
	onChangeViewType: PropTypes.func.isRequired,
	viewType: PropTypes.string.isRequired
};

export default TaskToolbarViewType;