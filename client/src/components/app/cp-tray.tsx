import React from 'react';
import { Tile } from './cp-tile';

interface Props {
	id: string;
	tiles: Mahjong.Tile[];
	hidden: boolean;
	max?: number;
}

export const Tray = ({ id, tiles, hidden, max = 13 }: Props) => {
	const exceeds = tiles.length > max;

	return (
		<div className={ `tray${ hidden ? ' hidden' : '' }${ exceeds ? ' tray-exceeds-max-tiles' : '' }` } id={ id }>
			{
				tiles.map(t => <Tile key={ t.id } tile={ t } hidden={ hidden } />)
			}
			<div className="tile-count">{ tiles.length }</div>
		</div>
	)
};
