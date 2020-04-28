import React from 'react';
import { Tray } from './cp-tray';
import { Tile } from './cp-tile';
import { getTray } from '../../utils/util-get-tray';

import './ss-center.scss';

interface Props {
	tiles: Mahjong.Tile[];
	transit: boolean;
	padding: number;
}

const T = ({ t, id, r }: any) => (
	<Tile
		draggable={ id.includes(t.id) }
		hidden={ true }
		key={ id.includes(t.id) ? t.id : undefined }
		left={ undefined }
		rotate={ r }
		small={ false }
		tile={ t }
	/>
);

const flipPairs = (array) => {
	const res = [];

	for (let i = 0; i < array.length - 1; i += 2) {
		res.push(array[i + 1], array[i]);
	}

	if (array.length % 2) {
		res.push(array[array.length - 1]);
	}

	return res;
};

export const Center = ({ tiles, transit, padding }: Props) => {
	const wall = getTray('t0', tiles);

	if (padding < 0) {
		padding = 0;
	}

	const ts = (new Array(padding)).fill(1).map((_x, i) => {
		return {
			hidden: true,
			id: `p${ i }`,
			index: 10,
			name: '1',
			space: 0,
			spaced: false,
			suit: 'characters 1',
			title: 'tekens 1',
			tray: 't0',
			x: true
		};
		// @ts-ignore
	}).concat(wall);

	const wallSize = 18;

	const top = ts.slice(wallSize * 4, wallSize * 6);
	const right = flipPairs(ts.slice(wallSize * 2, wallSize * 4).reverse());
	const bottom = ts.slice(0, wallSize * 2);

	const idE = wall[wall.length - 1]?.id;
	const idB = wall[0]?.id;

	return (
		<div className="center">
			{
				!transit
					? (
						<>
							<div className="tiles">
								<div className="wall">
									{
										wall.length > 0
											? (
												<>
													<div className="wall-top a">
														{ top.map(t => <T key={ t.id } t={ t } id={ [idE, idB] } r={ 0 } />) }
													</div>
													<div className="wall-bottom a">
														{ bottom.map(t => <T key={ t.id } t={ t } id={ [idE, idB] } r={ 0 } />) }
													</div>
													<div className="wall-right a">
														{right.map(t => <T key={ t.id } t={ t } id={ [idE, idB] } r={ 90 } />) }
													</div>
												</>
											)
											: null
									}
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
			<div className="transit-area" id="transit-area" />
		</div>
	);
};
