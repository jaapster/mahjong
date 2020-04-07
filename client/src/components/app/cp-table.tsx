import React from 'react';
import bind from 'autobind-decorator';
import axios from 'axios';
import { Tray } from './cp-tray';

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
export class Table extends React.Component<Props, State> {
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

		if (dropTarget) {
			if (dropTarget !== dragSource && dropTarget !== dragged) {
				axios.put(`/games/${ game.id }/tiles/${ dragSource.id }/${ dragged }?to=${ dropTarget.id }`);
			}
		}

		this.setState({
			dragged: undefined,
			dragSource: undefined,
			dropTarget: undefined
		});
	}

	render() {
		const { game, leave } = this.props;

		return (
			<div
				className="table"
				onDragEnd={ this.onDragEnd }
				onDragEnter={ this.onDragEnter }
				onDragOver={ this.onDragOver }
				onDragStart={ this.onDragStart }
			>
				<a href="#" onClick={ leave }>Leave table</a>
				<Tray
					id="t1"
					name="Table"
					tiles={ game.tiles.t1 }
				/>
				<Tray
					id="a1"
					name="Public"
					tiles={ game.tiles.a1 }
				/>
				<Tray
					id="a0"
					name="Private"
					tiles={ game.tiles.a0 }
				/>
			</div>
		);
	}
};
