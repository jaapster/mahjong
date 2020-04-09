import React from 'react';
import { Tile } from './cp-tile';

interface Props {
	id: string;
	tiles: Mahjong.Tile[];
	hidden: boolean;
}

export const Tray = ({ id, tiles, hidden }: Props) => {
	return (
		<div className={ `tray ${ hidden ? 'hidden' : null }` } id={ id }>
			{
				tiles.map(t => <Tile key={ t.id } tile={ t } hidden={ hidden } />)
			}
		</div>
	)
};
