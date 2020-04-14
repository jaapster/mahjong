export const getTray = (id: string, tiles: Mahjong.Tile[]) => (
	tiles
		.filter(t => t.tray === id)
		.sort((a, b) => a.index > b.index ? 1 : -1)
);