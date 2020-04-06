import React from 'react';
import bind from 'autobind-decorator';
import { Table } from './cp-table';

interface State {
	game?: Mahjong.Game;
}

@bind
export class App extends React.Component<{}, State> {
	state = { game: undefined };

	private readonly stream: any;

	constructor(props: any) {
		super(props);

		this.stream = new EventSource('/stream');
		this.stream.onmessage = this.onMessage;
	}

	private onConnect() {
		fetch('/games')
			.then(response => response.json())
			.then(data => {
				this.setState({ game: data[0] });
			});
	}

	private onMessage(event) {
		const { id, type, data } = JSON.parse(event.data);

			if (type === 'connect') {
				this.onConnect();
			}

			if (type === 'game') {
				this.setState({ game: data });
			}
	}

	render() {
		const { game } = this.state;

		return (
			<div className="app">
				<h1>Mahjong</h1>
				{
					game != null
						? (
							<>
								<Table game={ game } />
							</>
						)
						: <p>NO GAME</p>
				}
			</div>
		);
	}
};
