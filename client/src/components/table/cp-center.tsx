import React from 'react';
import './cp-center.scss';
import { Tray } from './cp-tray';
import { getTray } from '../../utils/util-get-tray';

interface Props {
	tiles: Mahjong.Tile[];
}

export const Center = ({ tiles }: Props) => {
	return (
		<div className="center">
			<Tray
				id="t1"
				hidden={ false }
				tiles={ getTray('t1', tiles) }
				small={ false }
				draggable={ true }
			/>
			<div className="transit-area" id="transit-area"/>
		</div>
	);
}
