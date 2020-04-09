import React from 'react';
import bind from 'autobind-decorator';
import axios from 'axios';
import { Tray } from './cp-tray';

import './cp-game.scss';

interface Props {
	game: Mahjong.Game;
	leave(): void;
}

interface State {
	dragged?: HTMLElement;
	dragSource?: HTMLElement;
	dropTarget?: HTMLElement;
}

@bind
export class Game extends React.Component<Props, State> {
	state = {
		dragged: undefined,
		dragSource: undefined,
		dropTarget: undefined
	};

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

	private onDragOver(e) {
		e.preventDefault();
	}

	private onDragEnd(e) {
		const { game } = this.props;
		const { dropTarget, dragSource, dragged } = this.state;

		if (dropTarget.id) {
			if (dropTarget !== dragSource && dropTarget !== dragged) {
				if ((dropTarget as HTMLElement).classList.contains('tile')) {
					const daddy = dropTarget.parentNode;
					const index = Array.from(daddy.children).indexOf(dropTarget);

					axios.put(`/games/${ game.id }/tiles/${ dragged }?to=${ daddy.id }&index=${ index }`);
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

		return (
			<div
				className="game"
				onDragEnd={ this.onDragEnd }
				onDragEnter={ this.onDragEnter }
				onDragOver={ this.onDragOver }
				onDragStart={ this.onDragStart }
			>
				{/* <a href="#" onClick={ leave }>Verlaat dit spel</a> */}

				<div className="table">
					<div className="top">

						<Tray
							id="c0"
							hidden={ true }
							tiles={ this.getTray('c0') }
						/>

						<Tray
							id="c1"
							hidden={ false }
							tiles={ this.getTray('c1') }
						/>
					</div>
					<div className="middle">
						<div className="left">
							<Tray
								id="d0"
								hidden={ true }
								tiles={ this.getTray('d0') }
							/>
							<Tray
								id="d1"
								hidden={ false }
								tiles={ this.getTray('d1') }
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
							<Tray
								id="b1"
								hidden={ false }
								tiles={ this.getTray('b1') }
							/>
							<Tray
								id="b0"
								hidden={ true }
								tiles={ this.getTray('b0') }
							/>
						</div>
					</div>
					<div className="bottom">
						<Tray
							id="a1"
							hidden={ false }
							tiles={ this.getTray('a1') }
						/>
						<Tray
							id="a0"
							hidden={ false }
							tiles={ this.getTray('a0') }
						/>
					</div>
				</div>
			</div>
		);
	}
};
