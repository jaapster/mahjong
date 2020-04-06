import React from 'react';
import bind from 'autobind-decorator';
import { Tile } from './cp-tile';

const map = {
	public: 'a1',
	private: 'a0',
	table: 't1'
};

@bind
export class Table extends React.Component<any, any> {
	// onDragstart(e) {
	// 	dragged = e.target.id;
	// 	dragSource = e.target.parentNode.id;
	// }

	// onDragOver(e) {
	// 	dropTarget = e.target.id;
	// 	event.preventDefault();
	// }

	// onDragEnter(e) {
	// 	const id = e.target.id;

	// 	if (id != dragSource && map[id]) {
	// 		e.target.classList.add('hovered');
	// 	}

	// 	e.preventDefault();
	// }

	// onDragLeave(e) {
	// 	const id = e.target.id;

	// 	if (id != dragSource && map[id]) {
	// 		e.target.classList.remove('hovered');
	// 	}

	// 	e.preventDefault();
	// }

	// onDragEnd(e) => {
	// 	if (dropTarget) {
	// 		if (dropTarget !== dragSource && dropTarget !== dragged) {
	// 			fetch(`/games/${ gameId }/tiles/${ map[dragSource] }/${ dragged }?to=${ map[dropTarget] }`);
	// 		}
	// 	}

	// 	document.getElementById(dropTarget).classList.remove('hovered');

	// 	dragged = undefined;
	// 	dragSource = undefined;
	// 	dropTarget = undefined;
	// }

	onDragStart(e) {
		this.setState({
			dragged: e.target.id,
			dragSource: e.target.parentNode.id
		});
	}

	onDrop(e) {

	}

	onDragEnter(e) {
		e.preventDefault();
	}

	onDragOver(e) {
		this.setState({
			dropTarget: e.nativeEvent.target.id
		});
		e.preventDefault();
	}

	onDragEnd(e) {
		const { game } = this.props;
		const { dropTarget, dragSource, dragged } = this.state;

		if (dropTarget) {
			if (dropTarget !== dragSource && dropTarget !== dragged) {
				fetch(`/games/${ game.id }/tiles/${ map[dragSource] }/${ dragged }?to=${ map[dropTarget] }`);
			}
		}

		this.setState({
			dragged: undefined,
			dragSource: undefined,
			dropTarget: undefined
		});
	}

	render() {
		const { game } = this.props;

		return (
			<div
				className="table"
				onDragEnd={ this.onDragEnd }
			>
				<h2>Table</h2>
				<div
					id="table"
					className="tray"
					onDragEnter={ this.onDragEnter }
					onDragOver={ this.onDragOver }
					onDrop={ this.onDrop }
				>
					{
						game.tiles.t1.map((t) => <Tile key={ t.id } tile={ t } onDragStart={ this.onDragStart } />)
					}
				</div>

				<h2>Public</h2>
				<div
					id="public"
					className="tray"
					onDragEnter={ this.onDragEnter }
					onDragOver={ this.onDragOver }
					onDrop={ this.onDrop }
				>
					{
						game.tiles.a1.map((t) => <Tile key={ t.id } tile={ t } onDragStart={ this.onDragStart } />)
					}
				</div>

				<h2>Private</h2>
				<div
					id="private"
					className="tray"
					onDragEnter={ this.onDragEnter }
					onDragOver={ this.onDragOver }
					onDrop={ this.onDrop }
				>
					{
						game.tiles.a0.map((t) => <Tile key={ t.id } tile={ t } onDragStart={ this.onDragStart } />)
					}
				</div>
			</div>
		);
	}
};
