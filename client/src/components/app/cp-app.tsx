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
	chairs: string[];
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
	},

	addChair(id: string) {
		const data = Storage.get();
		localStorage.setItem('mahjong', JSON.stringify({
			...data,
			chairs: data.chairs.concat(id)
		}));
	}
};

@bind
export class App extends React.Component<any, State> {
	state = { name: null, game: null, games: [], chairs: [] };

	private stream: any;

	componentDidMount() {
		this.getGames();

		const { name, chairs } = Storage.get();

		this.setState({ name, chairs });
	}

	private enterGame(gameId: string) {
		if (this.stream) {
			this.stream.close();
		}

		this.stream = new EventSource(`/stream/${ gameId }`);
		this.stream.addEventListener('game-state', this.updateGame);
		this.stream.addEventListener('game-close', this.leaveGame);
	}

	private joinGame(gameId: string) {
		const { name, chairs } = this.state;

		axios.get(`/games/${ gameId }/players/${ name }`)
			.then(({ data }) => {
				Storage.addChair(data);
				this.setState({ chairs: chairs.concat(data) });
				this.getGames();
			});
	}

	private leaveGame() {
		if (this.stream) {
			this.stream.removeEventListener('game-state', this.updateGame);
			this.stream.removeEventListener('game-close', this.leaveGame);
			this.stream.close();
		}

		this.setState({ game: null });
		this.getGames();
	}

	private getGames() {
		fetch('/games')
			.then(response => response.json())
			.then(games => this.setState({ games }));
	}

	private updateGame(event) {
		this.setState({ game: JSON.parse(event.data) });
	}

	private submitName(name: string) {
		this.setState({ name });
		Storage.setName(name);
	}

	private logout() {
		this.setState({ name: null });
	}

	render() {
		const { name, game, games, chairs } = this.state;

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
									leave={ this.leaveGame }
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
										chairs={ chairs }
										enter={ this.enterGame }
										games={ games }
										join={ this.joinGame }
										name={ name }
									/>
								</>
							)
				}
			</>
		);
	}
}
