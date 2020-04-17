import React from 'react';
import bind from 'autobind-decorator';
import { mergeClasses } from '../../utils/util-merge-classes';
import './ss-tile.scss';

interface Props {
	tile: Mahjong.Tile;
	left: Mahjong.Tile;
	hidden: boolean;
	rotate: boolean;
	blank: boolean;
	small: boolean;
	draggable: boolean;
}

interface State {
	hovered: boolean;
	dragged: boolean;
}

let id;
let index;

@bind
export class Tile extends React.Component<Props, State> {
	state = { hovered: false, dragged: false };

	componentDidMount() {
		document.addEventListener('dragend', this.onDragLeave);
	}

	componentWillUnmount() {
		document.removeEventListener('dragend', this.onDragLeave);
	}

	onDragEnter() {
		const { tile } = this.props;

		// if (id !== tile.id && index !== tile.index - 1) {
		this.setState({ hovered: true });
		// }
	}

	onDragLeave() {
		this.setState({ hovered: false });
	}

	onDragStart(e: React.SyntheticEvent) {
		setTimeout(() => {
			const { tile } = this.props;
			id = tile.id;
			index = tile.index;
			this.setState({ dragged: true });
		}, 1);
	}

	onDragEnd() {
		this.setState({ dragged: false });
	}

	render() {
		const { tile: { id, suit, name, spaced, title }, tile, left, hidden, rotate, blank, small, draggable } = this.props;
		const { hovered, dragged } = this.state;

		return (
			<div
				className={ mergeClasses(
					'tile',
					{
						'tile-hidden': hidden || tile.hidden,
						'tile-hovered': hovered,
						'tile-dragged': dragged,
						'tile-rotated': rotate,
						'tile-blank': blank,
						'tile-small': small,
						'tile-spaced': spaced
					}
				) }
				draggable={ draggable }
				id={ id.toString() }
				onDragEnd={ draggable ? this.onDragEnd : undefined }
				onDragEnter={ this.onDragEnter }
				onDragLeave={ this.onDragLeave }
				onDragStart={ draggable ? this.onDragStart : (e) => e.preventDefault() }
				// title={ tile.index.toString() }
				title={ blank || hidden || tile.hidden ? undefined : title }
				data-tray={ tile.tray }
				data-index={ (tile.index + (left?.index ?? (tile.index - 1))) / 2 }
				data-hidden={ tile.hidden }
			>
				<div className="tile-graphic">
					<div className={ `tile-symbol tile-symbol-${ suit }-${ name }` } />
					<div className="tile-gloss" />
				</div>
			</div>
		);
	}
}