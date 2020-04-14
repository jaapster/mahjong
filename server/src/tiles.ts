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
			title: 'bamboe 1',
			spaced: false
		},
		{
			id: '2',
			suit: SUITS.BAMBOO,
			name: '2',
			title: 'bamboe 2',
			spaced: false
		},
		{
			id: '3',
			suit: SUITS.BAMBOO,
			name: '3',
			title: 'bamboe 3',
			spaced: false
		},
		{
			id: '4',
			suit: SUITS.BAMBOO,
			name: '4',
			title: 'bamboe 4',
			spaced: false
		},
		{
			id: '5',
			suit: SUITS.BAMBOO,
			name: '5',
			title: 'bamboe 5',
			spaced: false
		},
		{
			id: '6',
			suit: SUITS.BAMBOO,
			name: '6',
			title: 'bamboe 6',
			spaced: false
		},
		{
			id: '7',
			suit: SUITS.BAMBOO,
			name: '7',
			title: 'bamboe 7',
			spaced: false
		},
		{
			id: '8',
			suit: SUITS.BAMBOO,
			name: '8',
			title: 'bamboe 8',
			spaced: false
		},
		{
			id: '9',
			suit: SUITS.BAMBOO,
			name: '9',
			title: 'bamboe 9',
			spaced: false
		},
		{
			id: '10',
			suit: SUITS.BAMBOO,
			name: '1',
			title: 'bamboe 1',
			spaced: false
		},
		{
			id: '11',
			suit: SUITS.BAMBOO,
			name: '2',
			title: 'bamboe 2',
			spaced: false
		},
		{
			id: '12',
			suit: SUITS.BAMBOO,
			name: '3',
			title: 'bamboe 3',
			spaced: false
		},
		{
			id: '13',
			suit: SUITS.BAMBOO,
			name: '4',
			title: 'bamboe 4',
			spaced: false
		},
		{
			id: '14',
			suit: SUITS.BAMBOO,
			name: '5',
			title: 'bamboe 5',
			spaced: false
		},
		{
			id: '15',
			suit: SUITS.BAMBOO,
			name: '6',
			title: 'bamboe 6',
			spaced: false
		},
		{
			id: '16',
			suit: SUITS.BAMBOO,
			name: '7',
			title: 'bamboe 7',
			spaced: false
		},
		{
			id: '17',
			suit: SUITS.BAMBOO,
			name: '8',
			title: 'bamboe 8',
			spaced: false
		},
		{
			id: '18',
			suit: SUITS.BAMBOO,
			name: '9',
			title: 'bamboe 9',
			spaced: false
		},
		{
			id: '19',
			suit: SUITS.BAMBOO,
			name: '1',
			title: 'bamboe 1',
			spaced: false
		},
		{
			id: '20',
			suit: SUITS.BAMBOO,
			name: '2',
			title: 'bamboe 2',
			spaced: false
		},
		{
			id: '21',
			suit: SUITS.BAMBOO,
			name: '3',
			title: 'bamboe 3',
			spaced: false
		},
		{
			id: '22',
			suit: SUITS.BAMBOO,
			name: '4',
			title: 'bamboe 4',
			spaced: false
		},
		{
			id: '23',
			suit: SUITS.BAMBOO,
			name: '5',
			title: 'bamboe 5',
			spaced: false
		},
		{
			id: '24',
			suit: SUITS.BAMBOO,
			name: '6',
			title: 'bamboe 6',
			spaced: false
		},
		{
			id: '25',
			suit: SUITS.BAMBOO,
			name: '7',
			title: 'bamboe 7',
			spaced: false
		},
		{
			id: '26',
			suit: SUITS.BAMBOO,
			name: '8',
			title: 'bamboe 8',
			spaced: false
		},
		{
			id: '27',
			suit: SUITS.BAMBOO,
			name: '9',
			title: 'bamboe 9',
			spaced: false
		},
		{
			id: '28',
			suit: SUITS.BAMBOO,
			name: '1',
			title: 'bamboe 1',
			spaced: false
		},
		{
			id: '29',
			suit: SUITS.BAMBOO,
			name: '2',
			title: 'bamboe 2',
			spaced: false
		},
		{
			id: '30',
			suit: SUITS.BAMBOO,
			name: '3',
			title: 'bamboe 3',
			spaced: false
		},
		{
			id: '31',
			suit: SUITS.BAMBOO,
			name: '4',
			title: 'bamboe 4',
			spaced: false
		},
		{
			id: '32',
			suit: SUITS.BAMBOO,
			name: '5',
			title: 'bamboe 5',
			spaced: false
		},
		{
			id: '33',
			suit: SUITS.BAMBOO,
			name: '6',
			title: 'bamboe 6',
			spaced: false
		},
		{
			id: '34',
			suit: SUITS.BAMBOO,
			name: '7',
			title: 'bamboe 7',
			spaced: false
		},
		{
			id: '35',
			suit: SUITS.BAMBOO,
			name: '8',
			title: 'bamboe 8',
			spaced: false
		},
		{
			id: '36',
			suit: SUITS.BAMBOO,
			name: '9',
			title: 'bamboe 9',
			spaced: false
		},
		{
			id: '37',
			suit: SUITS.DOTS,
			name: '1',
			title: 'ringen 1',
			spaced: false
		},
		{
			id: '38',
			suit: SUITS.DOTS,
			name: '2',
			title: 'ringen 2',
			spaced: false
		},
		{
			id: '39',
			suit: SUITS.DOTS,
			name: '3',
			title: 'ringen 3',
			spaced: false
		},
		{
			id: '40',
			suit: SUITS.DOTS,
			name: '4',
			title: 'ringen 4',
			spaced: false
		},
		{
			id: '41',
			suit: SUITS.DOTS,
			name: '5',
			title: 'ringen 5',
			spaced: false
		},
		{
			id: '42',
			suit: SUITS.DOTS,
			name: '6',
			title: 'ringen 6',
			spaced: false
		},
		{
			id: '43',
			suit: SUITS.DOTS,
			name: '7',
			title: 'ringen 7',
			spaced: false
		},
		{
			id: '44',
			suit: SUITS.DOTS,
			name: '8',
			title: 'ringen 8',
			spaced: false
		},
		{
			id: '45',
			suit: SUITS.DOTS,
			name: '9',
			title: 'ringen 9',
			spaced: false
		},
		{
			id: '46',
			suit: SUITS.DOTS,
			name: '1',
			title: 'ringen 1',
			spaced: false
		},
		{
			id: '47',
			suit: SUITS.DOTS,
			name: '2',
			title: 'ringen 2',
			spaced: false
		},
		{
			id: '48',
			suit: SUITS.DOTS,
			name: '3',
			title: 'ringen 3',
			spaced: false
		},
		{
			id: '49',
			suit: SUITS.DOTS,
			name: '4',
			title: 'ringen 4',
			spaced: false
		},
		{
			id: '50',
			suit: SUITS.DOTS,
			name: '5',
			title: 'ringen 5',
			spaced: false
		},
		{
			id: '51',
			suit: SUITS.DOTS,
			name: '6',
			title: 'ringen 6',
			spaced: false
		},
		{
			id: '52',
			suit: SUITS.DOTS,
			name: '7',
			title: 'ringen 7',
			spaced: false
		},
		{
			id: '53',
			suit: SUITS.DOTS,
			name: '8',
			title: 'ringen 8',
			spaced: false
		},
		{
			id: '54',
			suit: SUITS.DOTS,
			name: '9',
			title: 'ringen 9',
			spaced: false
		},
		{
			id: '55',
			suit: SUITS.DOTS,
			name: '1',
			title: 'ringen 1',
			spaced: false
		},
		{
			id: '56',
			suit: SUITS.DOTS,
			name: '2',
			title: 'ringen 2',
			spaced: false
		},
		{
			id: '57',
			suit: SUITS.DOTS,
			name: '3',
			title: 'ringen 3',
			spaced: false
		},
		{
			id: '58',
			suit: SUITS.DOTS,
			name: '4',
			title: 'ringen 4',
			spaced: false
		},
		{
			id: '59',
			suit: SUITS.DOTS,
			name: '5',
			title: 'ringen 5',
			spaced: false
		},
		{
			id: '60',
			suit: SUITS.DOTS,
			name: '6',
			title: 'ringen 6',
			spaced: false
		},
		{
			id: '61',
			suit: SUITS.DOTS,
			name: '7',
			title: 'ringen 7',
			spaced: false
		},
		{
			id: '62',
			suit: SUITS.DOTS,
			name: '8',
			title: 'ringen 8',
			spaced: false
		},
		{
			id: '63',
			suit: SUITS.DOTS,
			name: '9',
			title: 'ringen 9',
			spaced: false
		},
		{
			id: '64',
			suit: SUITS.DOTS,
			name: '1',
			title: 'ringen 1',
			spaced: false
		},
		{
			id: '65',
			suit: SUITS.DOTS,
			name: '2',
			title: 'ringen 2',
			spaced: false
		},
		{
			id: '66',
			suit: SUITS.DOTS,
			name: '3',
			title: 'ringen 3',
			spaced: false
		},
		{
			id: '67',
			suit: SUITS.DOTS,
			name: '4',
			title: 'ringen 4',
			spaced: false
		},
		{
			id: '68',
			suit: SUITS.DOTS,
			name: '5',
			title: 'ringen 5',
			spaced: false
		},
		{
			id: '69',
			suit: SUITS.DOTS,
			name: '6',
			title: 'ringen 6',
			spaced: false
		},
		{
			id: '70',
			suit: SUITS.DOTS,
			name: '7',
			title: 'ringen 7',
			spaced: false
		},
		{
			id: '71',
			suit: SUITS.DOTS,
			name: '8',
			title: 'ringen 8',
			spaced: false
		},
		{
			id: '72',
			suit: SUITS.DOTS,
			name: '9',
			title: 'ringen 9',
			spaced: false
		},
		{
			id: '73',
			suit: SUITS.CHARACTERS,
			name: '1',
			title: 'tekens 1',
			spaced: false
		},
		{
			id: '74',
			suit: SUITS.CHARACTERS,
			name: '2',
			title: 'tekens 2',
			spaced: false
		},
		{
			id: '75',
			suit: SUITS.CHARACTERS,
			name: '3',
			title: 'tekens 3',
			spaced: false
		},
		{
			id: '76',
			suit: SUITS.CHARACTERS,
			name: '4',
			title: 'tekens 4',
			spaced: false
		},
		{
			id: '77',
			suit: SUITS.CHARACTERS,
			name: '5',
			title: 'tekens 5',
			spaced: false
		},
		{
			id: '78',
			suit: SUITS.CHARACTERS,
			name: '6',
			title: 'tekens 6',
			spaced: false
		},
		{
			id: '79',
			suit: SUITS.CHARACTERS,
			name: '7',
			title: 'tekens 7',
			spaced: false
		},
		{
			id: '80',
			suit: SUITS.CHARACTERS,
			name: '8',
			title: 'tekens 8',
			spaced: false
		},
		{
			id: '81',
			suit: SUITS.CHARACTERS,
			name: '9',
			title: 'tekens 9',
			spaced: false
		},
		{
			id: '82',
			suit: SUITS.CHARACTERS,
			name: '1',
			title: 'tekens 1',
			spaced: false
		},
		{
			id: '83',
			suit: SUITS.CHARACTERS,
			name: '2',
			title: 'tekens 2',
			spaced: false
		},
		{
			id: '84',
			suit: SUITS.CHARACTERS,
			name: '3',
			title: 'tekens 3',
			spaced: false
		},
		{
			id: '85',
			suit: SUITS.CHARACTERS,
			name: '4',
			title: 'tekens 4',
			spaced: false
		},
		{
			id: '86',
			suit: SUITS.CHARACTERS,
			name: '5',
			title: 'tekens 5',
			spaced: false
		},
		{
			id: '87',
			suit: SUITS.CHARACTERS,
			name: '6',
			title: 'tekens 6',
			spaced: false
		},
		{
			id: '88',
			suit: SUITS.CHARACTERS,
			name: '7',
			title: 'tekens 7',
			spaced: false
		},
		{
			id: '89',
			suit: SUITS.CHARACTERS,
			name: '8',
			title: 'tekens 8',
			spaced: false
		},
		{
			id: '90',
			suit: SUITS.CHARACTERS,
			name: '9',
			title: 'tekens 9',
			spaced: false
		},
		{
			id: '91',
			suit: SUITS.CHARACTERS,
			name: '1',
			title: 'tekens 1',
			spaced: false
		},
		{
			id: '92',
			suit: SUITS.CHARACTERS,
			name: '2',
			title: 'tekens 2',
			spaced: false
		},
		{
			id: '93',
			suit: SUITS.CHARACTERS,
			name: '3',
			title: 'tekens 3',
			spaced: false
		},
		{
			id: '94',
			suit: SUITS.CHARACTERS,
			name: '4',
			title: 'tekens 4',
			spaced: false
		},
		{
			id: '95',
			suit: SUITS.CHARACTERS,
			name: '5',
			title: 'tekens 5',
			spaced: false
		},
		{
			id: '96',
			suit: SUITS.CHARACTERS,
			name: '6',
			title: 'tekens 6',
			spaced: false
		},
		{
			id: '97',
			suit: SUITS.CHARACTERS,
			name: '7',
			title: 'tekens 7',
			spaced: false
		},
		{
			id: '98',
			suit: SUITS.CHARACTERS,
			name: '8',
			title: 'tekens 8',
			spaced: false
		},
		{
			id: '99',
			suit: SUITS.CHARACTERS,
			name: '9',
			title: 'tekens 9',
			spaced: false
		},
		{
			id: '100',
			suit: SUITS.CHARACTERS,
			name: '1',
			title: 'tekens 1',
			spaced: false
		},
		{
			id: '101',
			suit: SUITS.CHARACTERS,
			name: '2',
			title: 'tekens 2',
			spaced: false
		},
		{
			id: '102',
			suit: SUITS.CHARACTERS,
			name: '3',
			title: 'tekens 3',
			spaced: false
		},
		{
			id: '103',
			suit: SUITS.CHARACTERS,
			name: '4',
			title: 'tekens 4',
			spaced: false
		},
		{
			id: '104',
			suit: SUITS.CHARACTERS,
			name: '5',
			title: 'tekens 5',
			spaced: false
		},
		{
			id: '105',
			suit: SUITS.CHARACTERS,
			name: '6',
			title: 'tekens 6',
			spaced: false
		},
		{
			id: '106',
			suit: SUITS.CHARACTERS,
			name: '7',
			title: 'tekens 7',
			spaced: false
		},
		{
			id: '107',
			suit: SUITS.CHARACTERS,
			name: '8',
			title: 'tekens 8',
			spaced: false
		},
		{
			id: '108',
			suit: SUITS.CHARACTERS,
			name: '9',
			title: 'tekens 9',
			spaced: false
		},
		{
			id: '109',
			suit: SUITS.WINDS,
			name: 'east',
			title: 'oostenwind',
			spaced: false
		},
		{
			id: '110',
			suit: SUITS.WINDS,
			name: 'south',
			title: 'zuidenwind',
			spaced: false
		},
		{
			id: '111',
			suit: SUITS.WINDS,
			name: 'west',
			title: 'westenwind',
			spaced: false
		},
		{
			id: '112',
			suit: SUITS.WINDS,
			name: 'north',
			title: 'noordenwind',
			spaced: false
		},
		{
			id: '113',
			suit: SUITS.WINDS,
			name: 'east',
			title: 'oostenwind',
			spaced: false
		},
		{
			id: '114',
			suit: SUITS.WINDS,
			name: 'south',
			title: 'zuidenwind',
			spaced: false
		},
		{
			id: '115',
			suit: SUITS.WINDS,
			name: 'west',
			title: 'westenwind',
			spaced: false
		},
		{
			id: '116',
			suit: SUITS.WINDS,
			name: 'north',
			title: 'noordenwind',
			spaced: false
		},
		{
			id: '117',
			suit: SUITS.WINDS,
			name: 'east',
			title: 'oostenwind',
			spaced: false
		},
		{
			id: '118',
			suit: SUITS.WINDS,
			name: 'south',
			title: 'zuidenwind',
			spaced: false
		},
		{
			id: '119',
			suit: SUITS.WINDS,
			name: 'west',
			title: 'westenwind',
			spaced: false
		},
		{
			id: '120',
			suit: SUITS.WINDS,
			name: 'north',
			title: 'noordenwind',
			spaced: false
		},
		{
			id: '121',
			suit: SUITS.WINDS,
			name: 'east',
			title: 'oostenwind',
			spaced: false
		},
		{
			id: '122',
			suit: SUITS.WINDS,
			name: 'south',
			title: 'zuidenwind',
			spaced: false
		},
		{
			id: '123',
			suit: SUITS.WINDS,
			name: 'west',
			title: 'westenwind',
			spaced: false
		},
		{
			id: '124',
			suit: SUITS.WINDS,
			name: 'north',
			title: 'noordenwind',
			spaced: false
		},
		{
			id: '125',
			suit: SUITS.DRAGONS,
			name: 'red',
			title: 'rode draak',
			spaced: false
		},
		{
			id: '126',
			suit: SUITS.DRAGONS,
			name: 'green',
			title: 'groene draak',
			spaced: false
		},
		{
			id: '127',
			suit: SUITS.DRAGONS,
			name: 'white',
			title: 'witte draak',
			spaced: false
		},
		{
			id: '128',
			suit: SUITS.DRAGONS,
			name: 'red',
			title: 'rode draak',
			spaced: false
		},
		{
			id: '129',
			suit: SUITS.DRAGONS,
			name: 'green',
			title: 'groene draak',
			spaced: false
		},
		{
			id: '130',
			suit: SUITS.DRAGONS,
			name: 'white',
			title: 'witte draak',
			spaced: false
		},
		{
			id: '131',
			suit: SUITS.DRAGONS,
			name: 'red',
			title: 'rode draak',
			spaced: false
		},
		{
			id: '132',
			suit: SUITS.DRAGONS,
			name: 'green',
			title: 'groene draak',
			spaced: false
		},
		{
			id: '133',
			suit: SUITS.DRAGONS,
			name: 'white',
			title: 'witte draak',
			spaced: false
		},
		{
			id: '134',
			suit: SUITS.DRAGONS,
			name: 'red',
			title: 'rode draak',
			spaced: false
		},
		{
			id: '135',
			suit: SUITS.DRAGONS,
			name: 'green',
			title: 'groene draak',
			spaced: false
		},
		{
			id: '136',
			suit: SUITS.DRAGONS,
			name: 'white',
			title: 'witte draak',
			spaced: false
		},
		{
			id: '137',
			suit: SUITS.FLOWERS,
			name: 'plum',
			title: 'pruimenbloesem',
			spaced: false
		},
		{
			id: '138',
			suit: SUITS.FLOWERS,
			name: 'orchid',
			title: 'orchidee',
			spaced: false
		},
		{
			id: '139',
			suit: SUITS.FLOWERS,
			name: 'chrysanthemum',
			title: 'chrysant',
			spaced: false
		},
		{
			id: '140',
			suit: SUITS.FLOWERS,
			name: 'bamboo',
			title: 'bamboe',
			spaced: false
		},
		{
			id: '141',
			suit: SUITS.SEASONS,
			name: 'spring',
			title: 'lente',
			spaced: false
		},
		{
			id: '142',
			suit: SUITS.SEASONS,
			name: 'summer',
			title: 'zomer',
			spaced: false
		},
		{
			id: '143',
			suit: SUITS.SEASONS,
			name: 'autumn',
			title: 'herfst',
			spaced: false
		},
		{
			id: '144',
			suit: SUITS.SEASONS,
			name: 'winter',
			title: 'winter',
			spaced: false
		}

	]).map((t, index) => ({ ...t, tray: 't0', index, hidden: false }));
};
