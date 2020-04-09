import React from 'react';
import bind from 'autobind-decorator';
import axios from 'axios';
import { Tray } from './cp-tray';

import './cp-game.scss';

interface Props {
	name: string;
	game: Mahjong.Game;
	leave(): void;
}

interface State {
	dragged?: string;
	dragSource?: HTMLElement;
	dropTarget?: HTMLElement;
	order: Mahjong.Chair[];
}

@bind
export class Game extends React.Component<Props, State> {
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
			dragSource: undefined,
			dropTarget: undefined,
			order
		};
	}

	private onDragStart(e) {
		this.setState({
			dragged: e.target.id,
			dragSource: e.target.parentNode
		});
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
		const { dropTarget, dragSource, dragged } = this.state;

		if (dropTarget.id) {
			if (dropTarget !== dragSource && dropTarget.id !== dragged) {
				if ((dropTarget as HTMLElement).classList.contains('vectile')) {
					const parent: HTMLElement = dropTarget.parentNode as HTMLElement;
					const children = Array.from(parent.children);
					const ids = children.map(c => c.id).filter(id => id !== dragged);

					ids.splice(children.indexOf(dropTarget), 0, dragged);

					Promise.all(ids.map((id, i) => (
						axios.put(`/games/${ game.id }/tiles/${ id }?to=${ parent.id }&index=${ i }`)
					)));
				} else {
					const index = Array.from(dropTarget.children).length;
					axios.put(`/games/${ game.id }/tiles/${ dragged }?to=${ dropTarget.id }&index=${ index }`);
				}
			}
		}

		this.setState({
			dragged: undefined,
			dragSource: undefined,
			dropTarget: undefined
		});
	}

	private getTray(id: string) {
		const { game } = this.props;

		return game.ts
			.filter(t => t.tray === id)
			.sort((a, b) => a.index > b.index ? 1 : -1);
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
						<div className="nameTag">{ order[2].player }</div>
						<Tray
							id={ `${ order[2].position }0` }
							hidden={ true }
							tiles={ this.getTray(`${ order[2].position }0`) }
						/>
						<Tray
							id={ `${ order[2].position }1` }
							hidden={ false }
							tiles={ this.getTray(`${ order[2].position }1`) }
						/>
					</div>
					<div className="left">
						<div className="nameTag">{ order[1].player }</div>
						<Tray
							id={ `${ order[1].position }0` }
							hidden={ true }
							tiles={ this.getTray(`${ order[1].position }0`) }
						/>
						<Tray
							id={ `${ order[1].position }1` }
							hidden={ false }
							tiles={ this.getTray(`${ order[1].position }1`) }
						/>
					</div>
					<div className="center">
						<Tray
							id="t1"
							hidden={ false }
							tiles={ this.getTray('t1') }
						/>
					</div>
					<div className="right">
						<div className="nameTag">{ order[3].player }</div>
						<Tray
							id={ `${ order[3].position }1` }
							hidden={ false }
							tiles={ this.getTray(`${ order[3].position }1`) }
						/>
						<Tray
							id={ `${ order[3].position }0` }
							hidden={ true }
							tiles={ this.getTray(`${ order[3].position }0`) }
						/>
					</div>
					<div className="bottom">
						<div className="nameTag">{ order[0].player }</div>
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
					<div className="wall" title="De muur">
						<Tray
							id="t0"
							hidden={ false }
							tiles={ [this.getTray('t0')[0]] }
						/>
					</div>
					<div className="exit" onClick={ leave } title="Naar de lobby">
						<span>&#x2799;</span>
					</div>
				</div>
			</div>
		);
	}
};
