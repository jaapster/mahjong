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
}

export const Tray = ({ id, tiles, hidden, rotate, blank, small, draggable }: Props) => {
	return (
		<div
			id={ id }
			className={
				mergeClasses(
					'tray',
					{
						'tray-hidden': hidden,
						'tray-overflow': tiles.length > 13
					}
				)
			}
		>
			{
				tiles.map(t => (
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
		</div>
	)
};
