import React from 'react';
import axios from 'axios';
import bind from 'autobind-decorator';
import { connect } from 'react-redux';
import { ActionLogin, ActionRegister, ActionSetUser } from '../../store/actions/actions';
import { selectAuthError } from '../../store/selectors/selectors';

interface State {
	name: string;
	password: string;
	xname: string;
	xpassword1: string;
	xpassword2: string;
	showForm: boolean;
}

interface Props {
	authError?: string;
	authenticate?: boolean;
	login(userName: string, password: string): void;
	register(userName: string, password: string): void;
	setUser(user: Mahjong.User): void;
}

@bind
export class _Login extends React.Component<Props, State> {
	state = {
		name: '',
		password: '',
		xname: '',
		xpassword1: '',
		xpassword2: '',
		showForm: false
	};

	componentDidMount() {
		const { setUser, authenticate } = this.props;

		if (authenticate) {
			axios
				.get('/user').then(res => {
					if (res.data.success) {
						setUser(res.data.data);
					} else {
						this.setState({ showForm: true });
					}
				})
				.catch(({ response: res }) => {
					if (res.status !== 401) {
						console.warn('Unexpected auth response', res);
					}

					this.setState({ showForm: true });
				});
		} else {
			this.setState({ showForm: true });
		}
	}

	private getHandler(n: string) {
		return ({ target: { value } }: any) => (
			n === 'name'
				? this.setState({ name: value })
				: n === 'password'
					? this.setState({ password: value })
					: n === 'xname'
						? this.setState({ xname: value })
						: n === 'xpassword1'
							? this.setState({ xpassword1: value })
							: this.setState({ xpassword2: value })
		);
	}

	private onKeyDown(e) {
		if (e.key === 'Enter') {
			this.onLogin();
		}
	}

	private onLogin() {
		const { name, password } = this.state;
		const { login } = this.props;

		login(name, password);
	}

	private onRegister() {
		const { xname, xpassword1 } = this.state;
		const { register } = this.props;

		register(xname, xpassword1);
	}

	render() {
		const { name, password, xname, xpassword1, xpassword2, showForm } = this.state;
		const { authError, authenticate } = this.props;

		if (!showForm) {
			return null;
		}

		return (
			<div className="root">
				<div className="panel">
					<div className="head">
						<h1>Mahjong</h1>
					</div>

					<div className="panel">
						<div className="head">
							<h2>Inloggen</h2>
						</div>
						<div className="body">
							{
								authError != null
									? <p className="error">{ authError }</p>
									: null
							}
							<input
								type="text"
								value={ name }
								autoComplete="new-password"
								onChange={ this.getHandler('name') }
								placeholder="Naam"
								onKeyDown={ this.onKeyDown }
								autoFocus
							/>
							{
								authenticate
									? (
										<input
											type="password"
											value={ password }
											autoComplete="new-password"
											onChange={ this.getHandler('password') }
											placeholder="Wachtwoord"
											onKeyDown={ this.onKeyDown }
										/>
									)
									: null
							}
							<button
								onClick={ this.onLogin }
								disabled={ authenticate ? !name || !password : !name }
							>
								Log in
							</button>
						</div>
					</div>
					{
						authenticate
							? (
								<div className="panel">
									<div className="head">
										<h2>Registreren</h2>
									</div>
									<div className="body">
										<input
											type="text"
											value={ xname }
											autoComplete="new-password"
											onChange={ this.getHandler('xname') }
											placeholder="Naam"
										/>
										<input
											type="password"
											value={ xpassword1 }
											autoComplete="new-password"
											onChange={ this.getHandler('xpassword1') }
											placeholder="Wachtwoord"
										/>
										<input
											className={ xpassword2.length ? xpassword1 !== xpassword2 ? 'error' : '' : '' }
											type="password"
											value={ xpassword2 }
											autoComplete="new-password"
											onChange={ this.getHandler('xpassword2') }
											placeholder="Herhaal wachtwoord"
										/>
										<button
											onClick={ this.onRegister }
											disabled={ !xname || !xpassword1 || !xpassword2 || xpassword1 !== xpassword2 }
										>
											Registreer
										</button>
									</div>
								</div>
							)
							: null
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: Mahjong.Store) => {
	return {
		authError: selectAuthError(state),
		authenticate: state.auth.authenticate
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login(userName: string, password: string) {
			dispatch(ActionLogin.create(userName, password));
		},

		register(userName: string, password: string) {
			dispatch(ActionRegister.create(userName, password));
		},

		setUser(user: Mahjong.User) {
			dispatch(ActionSetUser.create(user));
		}
	};
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);