import React from 'react';
import { Tray } from './cp-tray';
import { Tile } from './cp-tile';
import { getTray } from '../../utils/util-get-tray';

import './ss-center.scss';

interface Props {
	tiles: Mahjong.Tile[];
	transit: boolean;
}

const T = ({ t, id, r }: any) => (
	<Tile
		draggable={ t.id === id }
		hidden={ true }
		key={ t.id === id ? t.id : undefined }
		left={undefined }
		rotate={ r }
		small={ false }
		tile={ t }
	/>
);

// x is used to reverse stacking order
const aTiles = (tiles, x = 0) => (tiles.length + x) % 2
	? tiles.slice(0, Math.ceil(tiles.length / 2))
	: tiles.slice(tiles.length / 2);

const bTiles = (tiles, x = 0) => (tiles.length + x) % 2
	? tiles.slice(Math.ceil(tiles.length / 2))
	: tiles.slice(0, tiles.length / 2);

export const Center = ({ tiles, transit }: Props) => {
	const wall = getTray('t0', tiles);
	const top = wall.slice(68, 102).reverse();
	const right = wall.slice(34, 68).reverse();
	const bottom = wall.slice(0, 34);

	const id = wall[wall.length - 1]?.id;

	return (
		<div className="center">
			{
				!transit
					? (
						<>

							<div className="tiles">
								<div className="wall">
									<div className="wall-top a">
										{ aTiles(top).map(t => <T key={ t.id } t={ t } id={ id } r={ 0 } />) }
									</div>
									<div className="wall-top b">
										{ bTiles(top).map(t => <T  key={ t.id }t={ t } id={ id } r={ 0 } />) }
									</div>
									<div className="wall-bottom a">
										{ aTiles(bottom, 1).map(t => <T key={ t.id } t={ t } id={ id } r={ 0 } />) }
									</div>
									<div className="wall-bottom b">
										{ bTiles(bottom, 1).map(t => <T key={ t.id } t={ t } id={ id } r={ 0 } />) }
									</div>
									<div className="wall-right a">
										{ aTiles(right).map(t => <T key={ t.id } t={ t } id={ id } r={ 90 } />) }
									</div>
									<div className="wall-right b">
										{ bTiles(right).map(t => <T key={ t.id } t={ t } id={ id } r={ 90 } />) }
									</div>
									<div className="drop-zone" data-tray="t1" />
									<Tray
										draggable={ false }
										hidden={ false }
										id="t2"
										small={ false }
										tiles={ getTray('t2', tiles) }
									/>
									<Tray
										draggable={ true }
										hidden={ false }
										id="t1"
										small={ false }
										tiles={ getTray('t1', tiles) }
									/>
								</div>
							</div>
						</>
					)
					: null
			}
			<div className="transit-area" id="transit-area"/>
		</div>
	);
};
