import React from 'react';
import bind from 'autobind-decorator';
import { Game } from './cp-game';
import { Lobby } from './cp-lobby';
import { Entrance } from './cp-entrance';
import { Player } from './cp-player';
import axios from 'axios';

interface State {
	name: string | null;
	game: Mahjong.Game | null;
	games: Mahjong.Game[];
}

const Storage = {
	get() {
		return JSON.parse(localStorage.getItem('mahjong') ?? '{ "chairs": [] }');
	},

	setName(name: string) {
		localStorage.setItem('mahjong', JSON.stringify({
			...Storage.get(),
			name
		}));
	}
};

@bind
export class App extends React.Component<any, State> {
	state = { name: null, game: null, games: [] };

	private gameStream: any;
	private globalStream: any;

	componentDidMount() {
		this.getGames();

		const { name } = Storage.get();

		this.setState({ name });

		this.globalStream = new EventSource('/streams/global');
		this.globalStream.addEventListener('games', this.onGamesUpdate);
	}

	private enterGame(gameId: string) {
		if (this.gameStream) {
			this.gameStream.close();
		}

		this.gameStream = new EventSource(`/streams/games/${ gameId }`);
		this.gameStream.addEventListener('game-state', this.onGameState);
		this.gameStream.addEventListener('game-close', this.onGameClose);
	}

	private joinGame(gameId: string) {
		const { name } = this.state;
		axios.post(`/games/${ gameId }/players`, { playerName: name });
	}

	private onGameClose() {
		if (this.gameStream) {
			this.gameStream.removeEventListener('game-state', this.onGameState);
			this.gameStream.removeEventListener('game-close', this.onGameClose);
			this.gameStream.close();
		}

		this.setState({ game: null });
	}

	private getGames() {
		fetch('/games')
			.then(response => response.json())
			.then(games => this.setState({ games }));
	}

	private onGamesUpdate(event) {
		this.setState(JSON.parse(event.data));
	}

	private onGameState(event) {
		this.setState({ game: JSON.parse(event.data) });
	}

	private createGame() {
		const { name } = this.state;
		axios.post('/games', { creator: name });
	}

	private deleteGame(id: string) {
		axios.delete(`/games/${ id }`);
	}

	private submitName(name: string) {
		this.setState({ name });
		Storage.setName(name);
	}

	private logout() {
		this.setState({ name: null });
	}

	render() {
		const { name, game, games } = this.state;

		return (
			<>
				{
					name == null
						? (
							<>
								<h1>Mahjong</h1>
								<Entrance submit={ this.submitName } />
							</>
						)
						: game != null
							? (
								<Game
									game={ game }
									leave={ this.onGameClose }
									name={ name }
								/>
							)
							: (
								<>
									<Player
										logout={ this.logout }
										name={ name }
									/>
									<Lobby
										enter={ this.enterGame }
										games={ games }
										join={ this.joinGame }
										player={ name }
										createGame={ this.createGame }
										deleteGame={ this.deleteGame }
									/>
								</>
							)
				}
			</>
		);
	}
}
