import React from 'react';
import bind from 'autobind-decorator';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionLogin } from '../../store/actions/actions';

import './ss-login.scss';

interface State {
	name: string;
}

interface Props {
	login(userName: string): void;
}

@bind
export class _Login extends React.Component<Props, State> {
	state = { name: '' };

	private onChange(e) {
		this.setState({ name: e.target.value });
	}

	private onSubmit() {
		const { name } = this.state;
		const { login } = this.props;

		login(name);
	}

	render() {
		const { name } = this.state;

		return (
			<div className="login">
				<div className="login-body">
					<h1>Mahjong</h1>
					<p>
						Vul hier je naam in en ga door naar de lobby
					</p>
					<input
						type="text"
						value={ name }
						onChange={ this.onChange }
						placeholder="Naam"
					/>
					<button
						onClick={ this.onSubmit }
						disabled={ !name }
					>
						Naar de lobby
					</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		login(userName: string) {
			dispatch(ActionLogin.create({ userName, password: 'secret' }));
		}
	};
};

export const Login = connect(null, mapDispatchToProps)(_Login);