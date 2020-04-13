import React from 'react';
import bind from 'autobind-decorator';
import { mergeClasses } from '../../utils/util-merge-classes';
import './ss-tile.scss';

interface Props {
	tile: Mahjong.Tile;
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
		const { tile: { id, suit, name, title }, hidden, rotate, blank, small, draggable } = this.props;
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
						'tile-blank': blank,
						'tile-small': small
					}
				) }
				draggable={ draggable }
				id={ id.toString() }
				onDragEnd={ draggable ? this.onDragEnd : undefined }
				onDragEnter={ this.onDragEnter }
				onDragLeave={ this.onDragLeave }
				onDragStart={ draggable ? this.onDragStart : (e) => e.preventDefault() }
				title={ blank || hidden ? undefined : title }
			>
				<div className="tile-graphic">
					<div className={ `tile-symbol tile-symbol-${ suit }-${ name }` } />
				</div>
			</div>
		);
	}
}