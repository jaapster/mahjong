import { getUser, getUserById, getUserByName, addUser } from '../users/users';

export const connectAuth = (app: any) => {
	app.get('/user', (req, res) => {
		const id = req.cookies.auth;

		if (id) {
			const user = getUserById(id);

			if (user) {
				res.send({
					success: true,
					data: {
						name: user.name,
						id
					}
				});
			} else {
				res.send({
					success: false,
					message: 'there be dragons ...'
				});
			}
		} else {
			res.send({
				success: false,
				message: 'log in first'
			});
		}
	});

	app.post('/auth/login', (req, res) => {
		const {
			userName,
			password
		} = req.body;

		const user = getUser(userName, password);

		if (user ) {
			res
				.cookie('auth', user.id)
				.send({
					success: true,
					data: {
						name: user.name,
						id: user.id
					}
				});
		} else {
			res.send({ success: false  });
		}
	});

	app.post('/auth/logout', (req, res) => {
		res
			.clearCookie('auth')
			.send({ success: true  });
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
				message: 'Gebruiker met die naam bestaat al'
			});
		} else {
			const user = addUser(userName, password);

			res
				.cookie('auth', user.id)
				.send({
					success: true,
					data: user
				});
		}
	});
};
