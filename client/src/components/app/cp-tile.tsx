import React from 'react';


const g = {
	characters: {
		'1': '1F007',
		'2': '1F008',
		'3': '1F009',
		'4': '1F00A',
		'5': '1F00B',
		'6': '1F00C',
		'7': '1F00D',
		'8': '1F00E',
		'9': '1F00F',
	},
	bamboo: {
		'1': '1F010',
		'2': '1F011',
		'3': '1F012',
		'4': '1F013',
		'5': '1F014',
		'6': '1F015',
		'7': '1F016',
		'8': '1F017',
		'9': '1F018',
	},
	dots: {
		'1': '1F019',
		'2': '1F01A',
		'3': '1F01B',
		'4': '1F01C',
		'5': '1F01D',
		'6': '1F01E',
		'7': '1F01F',
		'8': '1F020',
		'9': '1F021',
	},
	flowers: {
		'plum': '1F022',
		'orchid': '1F023',
		'chrysanthemum': '1F025',
		'bamboo': '1F024'
	},
	seasons: {
		'spring': '1F022',
		'summer': '1F023',
		'autumn': '1F024',
		'winter': '1F025'
	},
	winds: {
		'east': '1F000',
		'north': '1F001',
		'west': '1F002',
		'south': '1F003'
	},
	dragons: {
		'red': '1F004',
		'green': '1F005',
		'white': '1F006'
	}
};

export const Tile = ({ tile, onDragStart }: { tile: Mahjong.Tile, onDragStart: (e: any) => void }) => {
	return (
		<div
			className="tile"
			draggable="true"
			id={ tile.id.toString() }
			onDragStart={ onDragStart }
		>
			<span
				className="gfx"
				dangerouslySetInnerHTML={{__html: `&#x${ g[tile.suit][tile.name] }` }}
			>
			</span>
			<span>
				{ tile.suit }
			</span>
			<span>
				{ tile.name }
			</span>
			<span>
				({ tile.id })
			</span>
		</div>
	);
};