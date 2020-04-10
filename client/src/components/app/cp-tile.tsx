import React from 'react';
import bind from 'autobind-decorator';

import './cp-tile.scss';

interface Props {
	tile: Mahjong.Tile;
	hidden: boolean;
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
		const { tile: { id, suit, name }, hidden } = this.props;
		const { hovered, dragged } = this.state;

		return (
			<div
				className={ `vectile${ hidden ? ' tile-hidden' : '' }${ hovered ? ' tile-hover' : '' }${ dragged ? ' tile-dragged' : ''}` }
				draggable="true"
				onDragEnter={ this.onDragEnter }
				onDragLeave={ this.onDragLeave }
				onDragStart={ this.onDragStart }
				onDragEnd={ this.onDragEnd }
				id={ id.toString() }
			>
				<div className="tile-graphic">
					<div className={ `image tile-${ suit }-${ name }` } />
				</div>
			</div>
		);
	}
}