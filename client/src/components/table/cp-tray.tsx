import React from 'react';
import { Tile } from './cp-tile';
import { mergeClasses } from '../../utils/util-merge-classes';
import './cp-tray.scss';

interface Props {
	id: string;
	hidden: boolean;
	tiles: Mahjong.Tile[];
	rotate?: boolean;
	blank?: boolean;
	small: boolean;
	draggable: boolean;
	showCount?: boolean;
}

export const Tray = ({ id, tiles, hidden, rotate, blank, small, draggable, showCount }: Props) => {
	return (
		<div
			id={ id }
			className={
				mergeClasses(
					'tray',
					{
						'tray-hidden': hidden
					}
				)
			}
		>
			{
				tiles.map((t, i) => (
					<Tile
						key={ t.id }
						tile={ t }
						hidden={ hidden }
						rotate={ rotate }
						blank={ blank }
						small={ small }
						draggable={ draggable }
					/>
				))
			}
			{
				showCount
					? (
						<div
							className={ mergeClasses(
								'tile-count',
								{
									'tile-count-overflow': tiles.length > 13
								}
							) }
						>
							{ tiles.length }
						</div>
					)
					: null
			}
		</div>
	)
};
