import React, { PropTypes } from 'react';

const AddListButton = (props) => {
  return (
		<button type="button" className="mdl-button mdl-js-button new-list-button mdl-button--accent" onClick={props.onClickButton}>
			New List
		</button>
  );
};

AddListButton.propTypes = {
	onClickButton: PropTypes.func.isRequired
};

export default AddListButton;