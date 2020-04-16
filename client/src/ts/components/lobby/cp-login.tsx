import React from 'react';
import bind from 'autobind-decorator';
import './ss-login.scss';

interface Props {
	submit(name: string): void;
}

interface State {
	name: string;
}

@bind
export class Login extends React.Component<Props, State> {
	state = { name: '' };

	private onChange(e) {
		this.setState({ name: e.target.value });
	}

	private onSubmit() {
		const { submit } = this.props;
		const { name } = this.state;

		submit(name);
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