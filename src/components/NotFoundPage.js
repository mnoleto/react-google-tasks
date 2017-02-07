import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
	return (
		<div className="demo-card-wide mdl-card mdl-shadow--2dp">
			<div className="mdl-card__title">
				<h4 className="mdl-card__title-text">404 Page Not Found</h4>
			</div>
			<div className="mdl-card__supporting-text">
				<p>Sorry, the page you are looking for could not be found</p>
			</div>
			<div className="mdl-card__actions mdl-card--border">
				<Link to="/"> Go back to homepage </Link>
			</div>
		</div>
	);
};

export default NotFoundPage;
