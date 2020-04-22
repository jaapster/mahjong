import React from 'react';
import { Tile } from './cp-tile';
import { mergeClasses } from '../../utils/util-merge-classes';
import './ss-tray.scss';

interface Props {
	id: string;
	hidden: boolean;
	tiles: Mahjong.Tile[];
	rotate?: number;
	small: boolean;
	draggable: boolean;
	showCount?: boolean;
	before?: boolean;
	after?: boolean;
}

export const Tray = ({ id, tiles, hidden, rotate = 0, small, draggable, showCount, before, after }: Props) => {
	const index0 = tiles[0]?.index ?? 0;
	const index1 = tiles[tiles.length - 1]?.index ?? 0;

	return (
		<div
			id={ id }
			className={
				mergeClasses(
					'tray',
					{
						'tray-hidden': hidden,
						'tray-regular': rotate === 0,
						'tray-rotate': rotate !== 0,
						'tray-mega': before || after
					}
				)
			}
		>
			{
				after
					? null
					: (
						<div
							className="before"
							id="before"
							data-tray={ id }
							data-index={ (index0 + (index0 - 1)) / 2 }
						/>
					)
			}

			{
				before
					? null
					: (
						<div
							className="after"
							id="before"
							data-tray={ id }
							data-index={ (index1 + (index1 + 1)) / 2 }
						/>
					)
			}
			{
				tiles.map((t, i) => (
					<Tile
						key={ t.id }
						tile={ t }
						left={ tiles[i - 1]}
						hidden={ hidden }
						rotate={ rotate }
						small={ small }
						draggable={ draggable }
					/>
				))
			}
			{
				showCount
					? (
						<div className="tile-count">
							{ tiles.length }
						</div>
					)
					: null
			}
		</div>
	);
};
