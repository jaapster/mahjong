import { shuffle } from "./utils/util-shuffle-array";

const SUITS = {
	BAMBOO: 'bamboo',
	CHARACTERS: 'characters',
	DOTS: 'dots',
	DRAGONS: 'dragons',
	FLOWERS: 'flowers',
	SEASONS: 'seasons',
	WINDS: 'winds'
};

export const getTileSet = (): Mahjong.Tile[]  => {
	return shuffle([
		{
			id: '1',
			suit: SUITS.BAMBOO,
			name: '1',
			title: 'bamboe 1'
		},
		{
			id: '2',
			suit: SUITS.BAMBOO,
			name: '2',
			title: 'bamboe 2'
		},
		{
			id: '3',
			suit: SUITS.BAMBOO,
			name: '3',
			title: 'bamboe 3'
		},
		{
			id: '4',
			suit: SUITS.BAMBOO,
			name: '4',
			title: 'bamboe 4'
		},
		{
			id: '5',
			suit: SUITS.BAMBOO,
			name: '5',
			title: 'bamboe 5'
		},
		{
			id: '6',
			suit: SUITS.BAMBOO,
			name: '6',
			title: 'bamboe 6'
		},
		{
			id: '7',
			suit: SUITS.BAMBOO,
			name: '7',
			title: 'bamboe 7'
		},
		{
			id: '8',
			suit: SUITS.BAMBOO,
			name: '8',
			title: 'bamboe 8'
		},
		{
			id: '9',
			suit: SUITS.BAMBOO,
			name: '9',
			title: 'bamboe 9'
		},
		{
			id: '10',
			suit: SUITS.BAMBOO,
			name: '1',
			title: 'bamboe 1'
		},
		{
			id: '11',
			suit: SUITS.BAMBOO,
			name: '2',
			title: 'bamboe 2'
		},
		{
			id: '12',
			suit: SUITS.BAMBOO,
			name: '3',
			title: 'bamboe 3'
		},
		{
			id: '13',
			suit: SUITS.BAMBOO,
			name: '4',
			title: 'bamboe 4'
		},
		{
			id: '14',
			suit: SUITS.BAMBOO,
			name: '5',
			title: 'bamboe 5'
		},
		{
			id: '15',
			suit: SUITS.BAMBOO,
			name: '6',
			title: 'bamboe 6'
		},
		{
			id: '16',
			suit: SUITS.BAMBOO,
			name: '7',
			title: 'bamboe 7'
		},
		{
			id: '17',
			suit: SUITS.BAMBOO,
			name: '8',
			title: 'bamboe 8'
		},
		{
			id: '18',
			suit: SUITS.BAMBOO,
			name: '9',
			title: 'bamboe 9'
		},
		{
			id: '19',
			suit: SUITS.BAMBOO,
			name: '1',
			title: 'bamboe 1'
		},
		{
			id: '20',
			suit: SUITS.BAMBOO,
			name: '2',
			title: 'bamboe 2'
		},
		{
			id: '21',
			suit: SUITS.BAMBOO,
			name: '3',
			title: 'bamboe 3'
		},
		{
			id: '22',
			suit: SUITS.BAMBOO,
			name: '4',
			title: 'bamboe 4'
		},
		{
			id: '23',
			suit: SUITS.BAMBOO,
			name: '5',
			title: 'bamboe 5'
		},
		{
			id: '24',
			suit: SUITS.BAMBOO,
			name: '6',
			title: 'bamboe 6'
		},
		{
			id: '25',
			suit: SUITS.BAMBOO,
			name: '7',
			title: 'bamboe 7'
		},
		{
			id: '26',
			suit: SUITS.BAMBOO,
			name: '8',
			title: 'bamboe 8'
		},
		{
			id: '27',
			suit: SUITS.BAMBOO,
			name: '9',
			title: 'bamboe 9'
		},
		{
			id: '28',
			suit: SUITS.BAMBOO,
			name: '1',
			title: 'bamboe 1'
		},
		{
			id: '29',
			suit: SUITS.BAMBOO,
			name: '2',
			title: 'bamboe 2'
		},
		{
			id: '30',
			suit: SUITS.BAMBOO,
			name: '3',
			title: 'bamboe 3'
		},
		{
			id: '31',
			suit: SUITS.BAMBOO,
			name: '4',
			title: 'bamboe 4'
		},
		{
			id: '32',
			suit: SUITS.BAMBOO,
			name: '5',
			title: 'bamboe 5'
		},
		{
			id: '33',
			suit: SUITS.BAMBOO,
			name: '6',
			title: 'bamboe 6'
		},
		{
			id: '34',
			suit: SUITS.BAMBOO,
			name: '7',
			title: 'bamboe 7'
		},
		{
			id: '35',
			suit: SUITS.BAMBOO,
			name: '8',
			title: 'bamboe 8'
		},
		{
			id: '36',
			suit: SUITS.BAMBOO,
			name: '9',
			title: 'bamboe 9'
		},
		{
			id: '37',
			suit: SUITS.DOTS,
			name: '1',
			title: 'ringen 1'
		},
		{
			id: '38',
			suit: SUITS.DOTS,
			name: '2',
			title: 'ringen 2'
		},
		{
			id: '39',
			suit: SUITS.DOTS,
			name: '3',
			title: 'ringen 3'
		},
		{
			id: '40',
			suit: SUITS.DOTS,
			name: '4',
			title: 'ringen 4'
		},
		{
			id: '41',
			suit: SUITS.DOTS,
			name: '5',
			title: 'ringen 5'
		},
		{
			id: '42',
			suit: SUITS.DOTS,
			name: '6',
			title: 'ringen 6'
		},
		{
			id: '43',
			suit: SUITS.DOTS,
			name: '7',
			title: 'ringen 7'
		},
		{
			id: '44',
			suit: SUITS.DOTS,
			name: '8',
			title: 'ringen 8'
		},
		{
			id: '45',
			suit: SUITS.DOTS,
			name: '9',
			title: 'ringen 9'
		},
		{
			id: '46',
			suit: SUITS.DOTS,
			name: '1',
			title: 'ringen 1'
		},
		{
			id: '47',
			suit: SUITS.DOTS,
			name: '2',
			title: 'ringen 2'
		},
		{
			id: '48',
			suit: SUITS.DOTS,
			name: '3',
			title: 'ringen 3'
		},
		{
			id: '49',
			suit: SUITS.DOTS,
			name: '4',
			title: 'ringen 4'
		},
		{
			id: '50',
			suit: SUITS.DOTS,
			name: '5',
			title: 'ringen 5'
		},
		{
			id: '51',
			suit: SUITS.DOTS,
			name: '6',
			title: 'ringen 6'
		},
		{
			id: '52',
			suit: SUITS.DOTS,
			name: '7',
			title: 'ringen 7'
		},
		{
			id: '53',
			suit: SUITS.DOTS,
			name: '8',
			title: 'ringen 8'
		},
		{
			id: '54',
			suit: SUITS.DOTS,
			name: '9',
			title: 'ringen 9'
		},
		{
			id: '55',
			suit: SUITS.DOTS,
			name: '1',
			title: 'ringen 1'
		},
		{
			id: '56',
			suit: SUITS.DOTS,
			name: '2',
			title: 'ringen 2'
		},
		{
			id: '57',
			suit: SUITS.DOTS,
			name: '3',
			title: 'ringen 3'
		},
		{
			id: '58',
			suit: SUITS.DOTS,
			name: '4',
			title: 'ringen 4'
		},
		{
			id: '59',
			suit: SUITS.DOTS,
			name: '5',
			title: 'ringen 5'
		},
		{
			id: '60',
			suit: SUITS.DOTS,
			name: '6',
			title: 'ringen 6'
		},
		{
			id: '61',
			suit: SUITS.DOTS,
			name: '7',
			title: 'ringen 7'
		},
		{
			id: '62',
			suit: SUITS.DOTS,
			name: '8',
			title: 'ringen 8'
		},
		{
			id: '63',
			suit: SUITS.DOTS,
			name: '9',
			title: 'ringen 9'
		},
		{
			id: '64',
			suit: SUITS.DOTS,
			name: '1',
			title: 'ringen 1'
		},
		{
			id: '65',
			suit: SUITS.DOTS,
			name: '2',
			title: 'ringen 2'
		},
		{
			id: '66',
			suit: SUITS.DOTS,
			name: '3',
			title: 'ringen 3'
		},
		{
			id: '67',
			suit: SUITS.DOTS,
			name: '4',
			title: 'ringen 4'
		},
		{
			id: '68',
			suit: SUITS.DOTS,
			name: '5',
			title: 'ringen 5'
		},
		{
			id: '69',
			suit: SUITS.DOTS,
			name: '6',
			title: 'ringen 6'
		},
		{
			id: '70',
			suit: SUITS.DOTS,
			name: '7',
			title: 'ringen 7'
		},
		{
			id: '71',
			suit: SUITS.DOTS,
			name: '8',
			title: 'ringen 8'
		},
		{
			id: '72',
			suit: SUITS.DOTS,
			name: '9',
			title: 'ringen 9'
		},
		{
			id: '73',
			suit: SUITS.CHARACTERS,
			name: '1',
			title: 'tekens 1'
		},
		{
			id: '74',
			suit: SUITS.CHARACTERS,
			name: '2',
			title: 'tekens 2'
		},
		{
			id: '75',
			suit: SUITS.CHARACTERS,
			name: '3',
			title: 'tekens 3'
		},
		{
			id: '76',
			suit: SUITS.CHARACTERS,
			name: '4',
			title: 'tekens 4'
		},
		{
			id: '77',
			suit: SUITS.CHARACTERS,
			name: '5',
			title: 'tekens 5'
		},
		{
			id: '78',
			suit: SUITS.CHARACTERS,
			name: '6',
			title: 'tekens 6'
		},
		{
			id: '79',
			suit: SUITS.CHARACTERS,
			name: '7',
			title: 'tekens 7'
		},
		{
			id: '80',
			suit: SUITS.CHARACTERS,
			name: '8',
			title: 'tekens 8'
		},
		{
			id: '81',
			suit: SUITS.CHARACTERS,
			name: '9',
			title: 'tekens 9'
		},
		{
			id: '82',
			suit: SUITS.CHARACTERS,
			name: '1',
			title: 'tekens 1'
		},
		{
			id: '83',
			suit: SUITS.CHARACTERS,
			name: '2',
			title: 'tekens 2'
		},
		{
			id: '84',
			suit: SUITS.CHARACTERS,
			name: '3',
			title: 'tekens 3'
		},
		{
			id: '85',
			suit: SUITS.CHARACTERS,
			name: '4',
			title: 'tekens 4'
		},
		{
			id: '86',
			suit: SUITS.CHARACTERS,
			name: '5',
			title: 'tekens 5'
		},
		{
			id: '87',
			suit: SUITS.CHARACTERS,
			name: '6',
			title: 'tekens 6'
		},
		{
			id: '88',
			suit: SUITS.CHARACTERS,
			name: '7',
			title: 'tekens 7'
		},
		{
			id: '89',
			suit: SUITS.CHARACTERS,
			name: '8',
			title: 'tekens 8'
		},
		{
			id: '90',
			suit: SUITS.CHARACTERS,
			name: '9',
			title: 'tekens 9'
		},
		{
			id: '91',
			suit: SUITS.CHARACTERS,
			name: '1',
			title: 'tekens 1'
		},
		{
			id: '92',
			suit: SUITS.CHARACTERS,
			name: '2',
			title: 'tekens 2'
		},
		{
			id: '93',
			suit: SUITS.CHARACTERS,
			name: '3',
			title: 'tekens 3'
		},
		{
			id: '94',
			suit: SUITS.CHARACTERS,
			name: '4',
			title: 'tekens 4'
		},
		{
			id: '95',
			suit: SUITS.CHARACTERS,
			name: '5',
			title: 'tekens 5'
		},
		{
			id: '96',
			suit: SUITS.CHARACTERS,
			name: '6',
			title: 'tekens 6'
		},
		{
			id: '97',
			suit: SUITS.CHARACTERS,
			name: '7',
			title: 'tekens 7'
		},
		{
			id: '98',
			suit: SUITS.CHARACTERS,
			name: '8',
			title: 'tekens 8'
		},
		{
			id: '99',
			suit: SUITS.CHARACTERS,
			name: '9',
			title: 'tekens 9'
		},
		{
			id: '100',
			suit: SUITS.CHARACTERS,
			name: '1',
			title: 'tekens 1'
		},
		{
			id: '101',
			suit: SUITS.CHARACTERS,
			name: '2',
			title: 'tekens 2'
		},
		{
			id: '102',
			suit: SUITS.CHARACTERS,
			name: '3',
			title: 'tekens 3'
		},
		{
			id: '103',
			suit: SUITS.CHARACTERS,
			name: '4',
			title: 'tekens 4'
		},
		{
			id: '104',
			suit: SUITS.CHARACTERS,
			name: '5',
			title: 'tekens 5'
		},
		{
			id: '105',
			suit: SUITS.CHARACTERS,
			name: '6',
			title: 'tekens 6'
		},
		{
			id: '106',
			suit: SUITS.CHARACTERS,
			name: '7',
			title: 'tekens 7'
		},
		{
			id: '107',
			suit: SUITS.CHARACTERS,
			name: '8',
			title: 'tekens 8'
		},
		{
			id: '108',
			suit: SUITS.CHARACTERS,
			name: '9',
			title: 'tekens 9'
		},
		{
			id: '109',
			suit: SUITS.WINDS,
			name: 'east',
			title: 'oostenwind'
		},
		{
			id: '110',
			suit: SUITS.WINDS,
			name: 'south',
			title: 'zuidenwind'
		},
		{
			id: '111',
			suit: SUITS.WINDS,
			name: 'west',
			title: 'westenwind'
		},
		{
			id: '112',
			suit: SUITS.WINDS,
			name: 'north',
			title: 'noordenwind'
		},
		{
			id: '113',
			suit: SUITS.WINDS,
			name: 'east',
			title: 'oostenwind'
		},
		{
			id: '114',
			suit: SUITS.WINDS,
			name: 'south',
			title: 'zuidenwind'
		},
		{
			id: '115',
			suit: SUITS.WINDS,
			name: 'west',
			title: 'westenwind'
		},
		{
			id: '116',
			suit: SUITS.WINDS,
			name: 'north',
			title: 'noordenwind'
		},
		{
			id: '117',
			suit: SUITS.WINDS,
			name: 'east',
			title: 'oostenwind'
		},
		{
			id: '118',
			suit: SUITS.WINDS,
			name: 'south',
			title: 'zuidenwind'
		},
		{
			id: '119',
			suit: SUITS.WINDS,
			name: 'west',
			title: 'westenwind'
		},
		{
			id: '120',
			suit: SUITS.WINDS,
			name: 'north',
			title: 'noordenwind'
		},
		{
			id: '121',
			suit: SUITS.WINDS,
			name: 'east',
			title: 'oostenwind'
		},
		{
			id: '122',
			suit: SUITS.WINDS,
			name: 'south',
			title: 'zuidenwind'
		},
		{
			id: '123',
			suit: SUITS.WINDS,
			name: 'west',
			title: 'westenwind'
		},
		{
			id: '124',
			suit: SUITS.WINDS,
			name: 'north',
			title: 'noordenwind'
		},
		{
			id: '125',
			suit: SUITS.DRAGONS,
			name: 'red',
			title: 'rode draak'
		},
		{
			id: '126',
			suit: SUITS.DRAGONS,
			name: 'green',
			title: 'groene draak'
		},
		{
			id: '127',
			suit: SUITS.DRAGONS,
			name: 'white',
			title: 'witte draak'
		},
		{
			id: '128',
			suit: SUITS.DRAGONS,
			name: 'red',
			title: 'rode draak'
		},
		{
			id: '129',
			suit: SUITS.DRAGONS,
			name: 'green',
			title: 'groene draak'
		},
		{
			id: '130',
			suit: SUITS.DRAGONS,
			name: 'white',
			title: 'witte draak'
		},
		{
			id: '131',
			suit: SUITS.DRAGONS,
			name: 'red',
			title: 'rode draak'
		},
		{
			id: '132',
			suit: SUITS.DRAGONS,
			name: 'green',
			title: 'groene draak'
		},
		{
			id: '133',
			suit: SUITS.DRAGONS,
			name: 'white',
			title: 'witte draak'
		},
		{
			id: '134',
			suit: SUITS.DRAGONS,
			name: 'red',
			title: 'rode draak'
		},
		{
			id: '135',
			suit: SUITS.DRAGONS,
			name: 'green',
			title: 'groene draak'
		},
		{
			id: '136',
			suit: SUITS.DRAGONS,
			name: 'white',
			title: 'witte draak'
		} //,
		// {
		// 	id: '137',
		// 	suit: SUITS.FLOWERS,
		// 	name: 'plum'
		// },
		// {
		// 	id: '138',
		// 	suit: SUITS.FLOWERS,
		// 	name: 'orchid'
		// },
		// {
		// 	id: '139',
		// 	suit: SUITS.FLOWERS,
		// 	name: 'chrysanthemum'
		// },
		// {
		// 	id: '140',
		// 	suit: SUITS.FLOWERS,
		// 	name: 'bamboo'
		// },
		// {
		// 	id: '141',
		// 	suit: SUITS.SEASONS,
		// 	name: 'spring'
		// },
		// {
		// 	id: '142',
		// 	suit: SUITS.SEASONS,
		// 	name: 'summer'
		// },
		// {
		// 	id: '143',
		// 	suit: SUITS.SEASONS,
		// 	name: 'autumn'
		// },
		// {
		// 	id: '144',
		// 	suit: SUITS.SEASONS,
		// 	name: 'winter'
		// }
	]).map((t, index) => ({ ...t, tray: 't0', index }));
};
