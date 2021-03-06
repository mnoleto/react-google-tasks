import { google } from '../config/secrets';

const SCOPES = ['https://www.googleapis.com/auth/tasks'];

const GoogleService =  {
	authorize: (immediate) => {
		return new Promise((success, err) => {
			window.gapi.auth.authorize({
				'client_id': google.clientID,
				'scope': SCOPES,
				'immediate': immediate,
				'cookie_policy': 'single_host_origin'
			},
			res => {
				if (res.error) {
					return err(res.error);
				}
				return window.gapi.client.load('tasks', 'v1', () => window.gapi.client.load('plus', 'v1', () => success(res)));
			});
		});
	}
};

export default GoogleService;