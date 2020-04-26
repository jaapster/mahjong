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

// x is used to reverse stacking order
// const aTiles = (tiles, x = 0) => (tiles.length + x) % 2
// 	? tiles.slice(0, Math.ceil(tiles.length / 2))
// 	: tiles.slice(tiles.length / 2);

// const bTiles = (tiles, x = 0) => (tiles.length + x) % 2
// 	? tiles.slice(Math.ceil(tiles.length / 2))
// 	: tiles.slice(0, tiles.length / 2);

const gTiles = (tiles) => tiles.reduce((m, t, i) => {
	return {
		a: (i % 2 ? [] : [t]).concat(m.a), //.concat(i % 2 ? [t] : []),
		b: (i % 2 ? [t] : []).concat(m.b) // .concat(i % 2 ? [] : [t]),
	};
}, { a: [], b: [] });

export const Center = ({ tiles, transit, padding }: Props) => {
	const wall = getTray('t0', tiles);

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
	const right = ts.slice(wallSize * 2, wallSize * 4);
	const bottom = ts.slice(0, wallSize * 2);

	const idE = wall[wall.length - 1]?.id;
	const idB = wall[0]?.id;

	const i = top.findIndex(t => !t.x);
	const a = top[i];

	if (!(top.filter(t => !t.x).length % 2)) {
		const b = top[i + 1];

		top[i] = b;
		top[i + 1] = a;
	} else {
		const a = top[i];
		const b = top[i - 1];

		top[i] = b;
		top[i - 1] = a;
	}

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
														{ gTiles(top).a.map(t => <T key={ t.id } t={ t } id={ [idE, idB] } r={ 0 } />) }
													</div>
													<div className="wall-top b">
														{ gTiles(top).b.map(t => <T key={ t.id } t={ t } id={ [idE, idB] } r={ 0 } />) }
													</div>
													<div className="wall-bottom a">
														{ gTiles(bottom).b.map(t => <T key={ t.id } t={ t } id={ [idE, idB] } r={ 0 } />) }
													</div>
													<div className="wall-bottom b">
														{ gTiles(bottom).a.map(t => <T key={ t.id } t={ t } id={ [idE, idB] } r={ 0 } />) }
													</div>
													<div className="wall-right a">
														{ gTiles(right).b.map(t => <T key={ t.id } t={ t } id={ [idE, idB] } r={ 90 } />) }
													</div>
													<div className="wall-right b">
														{ gTiles(right).a.map(t => <T key={ t.id } t={ t } id={ [idE, idB] } r={ 90 } />) }
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
			<div className="transit-area" id="transit-area"/>
		</div>
	);
};
