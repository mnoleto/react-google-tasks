import React, { PropTypes, Component } from 'react';
import '../styles/dialogs.scss';

class DialogDeleteList extends Component {
	constructor(props) {
		super(props);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleConfirmClick = this.handleConfirmClick.bind(this);
	}

	handleCancel(e) {
		e.preventDefault();
		const { id, onCancel } = this.props;
		onCancel(id);
	}

	handleConfirmClick(e) {
		e.preventDefault();
		const { list, onConfirm } = this.props;
		onConfirm(list);
	}

	render() {
		const { id, list } = this.props;
		const title = (list) ? list.title : '';
		return (
			<div id={id} className="mdl-dialog dialog">
				<h4 className="mdl-dialog__title title">Delete list <strong>"{title}"</strong>?</h4>
				<div className="mdl-dialog__actions">
					<button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.handleConfirmClick}>Yes</button>
					<button type="button" className="mdl-button close" onClick={this.handleCancel}>No</button>
				</div>
			</div>
		);
	}
	
}

DialogDeleteList.propTypes = {
	id: PropTypes.string.isRequired,
	list: PropTypes.object.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired
};

export default DialogDeleteList;