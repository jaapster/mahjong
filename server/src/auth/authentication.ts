import { getUser, getUserById, getUserByName, addUser } from '../users/users';

const AUTHENTICATE = false;

export const connectAuth = (app: any) => {
	if (AUTHENTICATE) {
		app.use((req, res, next) => {
			if (req.url.split('/')[1] === 'auth') {
				next();
			} else if (!req.cookies.auth) {
				res.status(401).send({
					success: false,
					message: 'auth.unautohirized'
				});
			} else {
				next();
			}
		});
	}

	app.get('/user', (req, res) => {
		const id = req.cookies.auth;
		const user = getUserById(id);

		if (user) {
			res.send({
				success: true,
				data: user
			});
		} else {
			res.send({
				success: false,
				message: 'auth.userNotFound'
			});
		}
	});

	app.post('/auth/login', (req, res) => {
		const {
			userName,
			password
		} = req.body;

		const user = getUser(userName, password);

		if (user) {
			res.cookie('auth', user.id).send({
				success: true,
				data: user
			});
		} else {
			res.send({
				success: false,
				message: 'auth.invalidUserPasswordCombination'
			});
		}
	});

	app.post('/auth/logout', (req, res) => {
		res.clearCookie('auth').send({ success: true  });
	});

	app.post('/auth/register', (req, res) => {
		const {
			userName,
			password
		} = req.body;

		const user = getUserByName(userName);

		if (user) {
			res.send({
				success: false,
				message: 'auth.userNameTaken'
			});
		} else {
			const user = addUser(userName, password);

			res.cookie('auth', user.id).send({
				success: true,
				data: user
			});
		}
	});
};
