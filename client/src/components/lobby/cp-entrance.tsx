import React from 'react';
import bind from 'autobind-decorator';
import './cp-entrance.scss';

interface Props {
	submit(name: string): void;
}

interface State {
	name: string;
}

@bind
export class Entrance extends React.Component<Props, State> {
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
			<div className="entrance">
				<h2>Welkom!</h2>
				<p>
					Vul hier je naam in en ga door naar de lobby
				</p>
				<input
					type="text"
					value={ name }
					onChange={ this.onChange }
				/>
				<button
					onClick={ this.onSubmit }
					disabled={ !name }
				>
					Naar de lobby
				</button>
			</div>
		);
	}
}