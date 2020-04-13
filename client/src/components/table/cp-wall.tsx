import React from 'react';
import { Tray } from './cp-tray';
import { getTray } from '../../utils/util-get-tray';
import './cp-wall.scss';

interface Props {
	tiles: Mahjong.Tile[];
}

export const Wall = ({ tiles }: Props) => {
	const count = getTray('t0', tiles).length;
	const tile = getTray('t0', tiles)[0];

	return (
		<div className="wall">
			<Tray
				id="t0"
				hidden={ false }
				tiles={ tile ? [tile] : [] }
				blank={ true }
				small={ false }
				draggable={ true }
			/>
			<div className="tile-count">
				{ count }
			</div>
		</div>
	);
}
