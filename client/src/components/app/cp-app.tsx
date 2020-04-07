import React from 'react';
import bind from 'autobind-decorator';
import { Table } from './cp-table';
import { Lobby } from './cp-lobby';

interface State {
	game: Mahjong.Game | null;
	games: Mahjong.Game[];
}

@bind
export class App extends React.Component<any, State> {
	state = { game: null, games: [] };

	private stream: any;

	componentDidMount() {
		this.getGames();
	}

	private openStream(gameId: string) {
		if (this.stream) {
			this.stream.close();
		}

		this.stream = new EventSource(`/stream/${ gameId }`);
		this.stream.addEventListener('game-state', this.onGameState);
		this.stream.addEventListener('game-close', this.onGameClose);
	}

	private closeStream() {
		if (this.stream) {
			this.stream.removeEventListener('game-state', this.onGameState);
			this.stream.removeEventListener('game-close', this.onGameClose);
			this.stream.close();
		}
	}

	private getGames() {
		fetch('/games')
			.then(response => response.json())
			.then(games => this.setState({ games }));
	}

	private onGameState(event) {
		this.setState({ game: JSON.parse(event.data) });
	}

	private onGameClose() {
		this.closeStream()
		this.setState({ game: null });
		this.getGames();
	}

	render() {
		const { game, games } = this.state;

		return (
			<div className="app">
				<h1>Mahjong</h1>
				{
					game != null
						? (
							<Table
								game={ game }
								leave={ this.onGameClose }
							/>
						)
						: (
							<Lobby
								games={ games }
								selectGame={ this.openStream }
							/>
						)
				}
			</div>
		);
	}
};
