import React, { PropTypes, Component } from 'react';
import '../styles/dialogs.scss';

class DialogUpdateList extends Component {
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
		const { list, onConfirm } = this.props;
		const newName = this.refs.listname.value;
		onConfirm(list, newName);
		this.refs.listname.value = "";
	}

	render() {
		const { id, list } = this.props;
		const title = (list) ? list.title : '';
		return (
			<dialog id={id} className="mdl-dialog dialog">
				<h4 className="mdl-dialog__title title">Update list <strong>"{title}"</strong> as:</h4>
				<div className="mdl-dialog__content">
					<form name="list-name-form" method="post" onSubmit={this.handleSubmit}>
						<input type="text" ref="listname" className="name-input" placeholder="List Name" />

						<div className="mdl-dialog__actions actions">
							<button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.handleConfirm}>Update</button>
							<button type="button" className="mdl-button close" onClick={this.handleCancel}>Cancel</button>
						</div>
					</form>
				</div>
			</dialog>
		);
	}
	
}

DialogUpdateList.propTypes = {
	id: PropTypes.string.isRequired,
	list: PropTypes.object,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired
};

export default DialogUpdateList;