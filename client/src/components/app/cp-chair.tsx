import React from 'react';
import { Tray } from './cp-tray';

export const Chair = ({ chair, getTray }: { chair: Mahjong.Chair, getTray: any }) => {
	return (
		<>
			<div className="nameTag">{ chair.player }</div>
			<Tray
				id={ `${ chair.position }0` }
				hidden={ !chair.reveal }
				tiles={ getTray(`${ chair.position }0`) }
			/>
			<Tray
				id={ `${ chair.position }1` }
				hidden={ false }
				tiles={ getTray(`${ chair.position }1`) }
			/>
		</>
	)
}