import user from '../services/GoogleService';

export const fetchGoogleAuth = (imediate, resolce, reject) => {
	return user.authorize(imediate)
		.then(res => {
			if(imediate) {
				resolce();
			}
		})
		.catch(() => {
			if(!imediate) reject();
			else resolce();
		});
}

export default fetchGoogleAuth;