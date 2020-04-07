import React from 'react';
import { Tile } from './cp-tile';

interface Props {
	id: string;
	name: string;
	tiles: Mahjong.Tile[];
}

export const Tray = ({ id, name, tiles }: Props) => {
	return (
		<>
			<h2>{ name }</h2>
			<div
				className="tray"
				id={ id }
			>
				{
					tiles.map(t => <Tile key={ t.id } tile={ t } />)
				}
			</div>
		</>
	)
};
