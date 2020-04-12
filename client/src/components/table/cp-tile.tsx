import React from 'react';
import bind from 'autobind-decorator';
import { mergeClasses } from '../../utils/util-merge-classes';
import './cp-tile.scss';

interface Props {
	tile: Mahjong.Tile;
	hidden: boolean;
	rotate: boolean;
	blank: boolean;
}

interface State {
	hovered: boolean;
	dragged: boolean;
}

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
		this.setState({ hovered: true });
	}

	onDragLeave() {
		this.setState({ hovered: false });
	}

	onDragStart() {
		setTimeout(() => {
			this.setState({ dragged: true });
		}, 1);
	}

	onDragEnd() {
		this.setState({ dragged: false });
	}

	render() {
		const { tile: { id, suit, name }, hidden, rotate, blank } = this.props;
		const { hovered, dragged } = this.state;

		return (
			<div
				className={ mergeClasses(
					'tile',
					{
						'tile-hidden': hidden,
						'tile-hovered': hovered,
						'tile-dragged': dragged,
						'tile-rotated': rotate,
						'tile-blank': blank
					}
				) }
				draggable="true"
				id={ id.toString() }
				onDragEnd={ this.onDragEnd }
				onDragEnter={ this.onDragEnter }
				onDragLeave={ this.onDragLeave }
				onDragStart={ this.onDragStart }
			>
				<div className="tile-graphic">
					<div className={ `tile-symbol tile-symbol-${ suit }-${ name }` } />
				</div>
			</div>
		);
	}
}