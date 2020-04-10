import React from 'react';
import bind from 'autobind-decorator';
import axios from 'axios';
import { Tray } from './cp-tray';

import './cp-game.scss';
import { Chair } from './cp-chair';

interface Props {
	name: string;
	game: Mahjong.Game;
	leave(): void;
}

interface State {
	dragged?: string;
	dropTarget?: HTMLElement;
	order: Mahjong.Chair[];
}

@bind
export class Game extends React.Component<Props, State> {
	static getDerivedStateFromProps(nextProps, prevState) {
		const { game, name } = nextProps;

		const playerChair = game.chairs.find(c => c.player === name);
		const playerPosition = playerChair.position;

		const ord = playerPosition === 'a'
			? ['a', 'b', 'c', 'd']
			: playerPosition === 'b'
				? ['b', 'c', 'd', 'a']
				: playerPosition === 'c'
					? ['c', 'd', 'a', 'b']
					: ['d', 'a', 'b', 'c'];

		const order = ord.map(p => game.chairs.find(c => c.position === p));

		return {
			...prevState,
			order
		}
	}

	constructor(props: Props) {
		super(props);

		const { game, name } = this.props;
		const playerChair = game.chairs.find(c => c.player === name);
		const playerPosition = playerChair.position;

		const ord = playerPosition === 'a'
			? ['a', 'b', 'c', 'd']
			: playerPosition === 'b'
				? ['b', 'c', 'd', 'a']
				: playerPosition === 'c'
					? ['c', 'd', 'a', 'b']
					: ['d', 'a', 'b', 'c'];

		const order = ord.map(p => game.chairs.find(c => c.position === p));

		this.state = {
			dragged: undefined,
			dropTarget: undefined,
			order
		};
	}

	private onDragStart(e) {
		this.setState({ dragged: e.target.id });
	}

	private onDragEnter(e) {
		this.setState({ dropTarget: e.nativeEvent.target });
		e.preventDefault();
	}

	private onDragLeave(e) {
		e.preventDefault();
	}

	private onDragOver(e) {
		e.preventDefault();
	}

	private onDragEnd(e) {
		const { game } = this.props;
		const { dropTarget, dragged } = this.state;

		if (dropTarget && dropTarget.id && dropTarget.id !== dragged) {
			if ((dropTarget as HTMLElement).classList.contains('vectile')) {
				const parent: HTMLElement = dropTarget.parentNode as HTMLElement;
				const index = Array.from(parent.children).indexOf(dropTarget);

				axios.put(`/games/${ game.id }/tiles/${ dragged }`, {
					to: parent.id,
					index
				});
			} else {
				const index = Array.from(dropTarget.children).length;

				axios.put(`/games/${ game.id }/tiles/${ dragged }`, {
					to: dropTarget.id,
					index
				});
			}
		}

		this.setState({
			dragged: undefined,
			dropTarget: undefined
		});
	}

	private getTray(id: string) {
		const { game } = this.props;

		return game.ts
			.filter(t => t.tray === id)
			.sort((a, b) => a.index > b.index ? 1 : -1);
	}

	private toggleReveal() {
		const { game } = this.props;
		const { order } = this.state;
		const chair = order[0];

		axios.put(`/games/${ game.id }/chairs/${ chair.position }`, {
			chairData: {
				...chair,
				reveal: !chair.reveal
			}
		});
	}

	render() {
		const { leave } = this.props;
		const { order } = this.state;

		return (
			<div
				className="game"
				onDragEnd={ this.onDragEnd }
				onDragEnter={ this.onDragEnter }
				onDragOver={ this.onDragOver }
				onDragStart={ this.onDragStart }
				onDragLeave={ this.onDragLeave }
			>
				<div className="table">
					<div className="top">
						<div className="name-tag"><span>{ order[2].player }</span></div>
						<Tray
							id={ `${ order[2].position }0` }
							hidden={ !order[2].reveal }
							tiles={ this.getTray(`${ order[2].position }0`) }
						/>
						<Tray
							id={ `${ order[2].position }1` }
							hidden={ false }
							tiles={ this.getTray(`${ order[2].position }1`) }
						/>
					</div>
					<div className="left">
						<div className="name-tag"><span>{ order[1].player }</span></div>
						<Tray
							id={ `${ order[1].position }0` }
							hidden={ !order[1].reveal }
							tiles={ this.getTray(`${ order[1].position }0`) }
						/>
						<Tray
							id={ `${ order[1].position }1` }
							hidden={ false }
							tiles={ this.getTray(`${ order[1].position }1`) }
						/>
					</div>
					<div className="bottom">
						<div className="name-tag" onClick={ this.toggleReveal }><span>{ order[0].player }</span></div>
						<Tray
							id={ `${ order[0].position }1` }
							hidden={ false }
							tiles={ this.getTray(`${ order[0].position }1`) }
						/>
						<Tray
							id={ `${ order[0].position }0` }
							hidden={ false }
							tiles={ this.getTray(`${ order[0].position }0`) }
						/>
					</div>
					<div className="right">
						<div className="name-tag"><span>{ order[3].player }</span></div>
						<Tray
							id={ `${ order[3].position }1` }
							hidden={ false }
							tiles={ this.getTray(`${ order[3].position }1`) }
						/>
						<Tray
							id={ `${ order[3].position }0` }
							hidden={ !order[3].reveal }
							tiles={ this.getTray(`${ order[3].position }0`) }
						/>
					</div>
					<div className="wall" title="De muur">
						<Tray
							id="t0"
							hidden={ false }
							tiles={
								this.getTray('t0')[0]
									? [this.getTray('t0')[0]]
									: []
							}
						/>
					</div>
					<div className="exit" onClick={ leave } title="Naar de lobby">
						<span>&#x2799;</span>
					</div>
					<div className="center">
						<Tray
							id="t1"
							hidden={ false }
							tiles={ this.getTray('t1') }
						/>
					</div>
				</div>
			</div>
		);
	}
};
