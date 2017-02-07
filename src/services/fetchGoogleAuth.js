import user from '../services/GoogleService';

export const fetchGoogleAuth = (imediate, resolve, reject) => {
	return user.authorize(imediate)
		.then(res => {
			if(imediate) {
				resolve(res);
			}
		})
		.catch((res) => {
			if(!imediate) reject(res.error);
			else resolve(res);
		});
};

export default fetchGoogleAuth;