import React from 'react';
import './ss-center.scss';
import { Tray } from './cp-tray';
import { getTray } from '../../utils/util-get-tray';

interface Props {
	tiles: Mahjong.Tile[];
	transit: boolean;
}

export const Center = ({ tiles, transit }: Props) => {
	return (
		<div className="center">
			{
				!transit
					? (
						<>
							<Tray
								id="t2"
								hidden={ false }
								tiles={ getTray('t2', tiles) }
								small={ false }
								draggable={ false }
							/>
							<Tray
								id="t1"
								hidden={ false }
								tiles={ getTray('t1', tiles) }
								small={ false }
								draggable={ true }
							/>
						</>
					)
					: null
			}
			<div className="transit-area" id="transit-area"/>
		</div>
	);
}
