import React from 'react';
import bind from 'autobind-decorator';
import { Game } from './cp-game';
import { Lobby } from './cp-lobby';
import { Entrance } from './cp-entrance';
import { Player } from './cp-player';

interface State {
	name: string | null;
	game: Mahjong.Game | null;
	games: Mahjong.Game[];
}

const Storage = {
	get() {
		return JSON.parse(localStorage.getItem('mahjong') ?? '{}');
	},

	set(data: { [key: string]: any }) {
		localStorage.setItem('mahjong', JSON.stringify({
			games: [],
			...Storage.get(),
			...data
		}));
	}
};

@bind
export class App extends React.Component<any, State> {
	state = { name: null, game: null, games: [] };

	private stream: any;

	componentDidMount() {
		this.getGames();
		this.setState({ name: Storage.get().name });
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
		const { name } = this.state;

		fetch(`/games/${ gameId }/players/${ name }`).then(this.getGames);
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
		Storage.set({ name });
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
									leave={ this.leaveGame }
								/>
							)
							: (
								<>
									<Player
										name={ name }
										logout={ this.logout }
									/>
									<Lobby
										name={ name }
										games={ games }
										join={ this.joinGame }
										enter={ this.enterGame }
									/>
								</>
							)
				}
			</>
		);
	}
}
