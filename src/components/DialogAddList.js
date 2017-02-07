import React, { PropTypes, Component } from 'react';
import '../styles/dialogs.scss';

class DialogAddList extends Component {
	constructor(props) {
		super(props);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleCancel(e) {
		e.preventDefault();
		const { id, onCancel } = this.props;
		onCancel(id);
	}

	handleSubmit(e) {
		e.preventDefault();
		const { onConfirm } = this.props;
		const newListName = this.refs.listname.value;
		onConfirm(newListName);

		this.refs.listname.value = "";
	}

	render() {
		const { id } = this.props;
		return (
			<div id={id} className="mdl-dialog dialog">
				<h4 className="mdl-dialog__title title">Add new list</h4>
				<div className="mdl-dialog__content">
					<form name="list-name-form" method="post" onSubmit={this.handleSubmit}>
						<input type="text" ref="listname" className="name-input" placeholder="List Name" />

						<div className="mdl-dialog__actions actions">
							<button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Add</button>
							<button type="button" className="mdl-button close" onClick={this.handleCancel}>Cancel</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
	
}

DialogAddList.propTypes = {
	id: PropTypes.string.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired
};

export default DialogAddList;