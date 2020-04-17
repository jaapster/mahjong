export const dealTiles = (tiles: Mahjong.Tile[]) => (
	tiles.map((t, i) => (
		{
			...t,
			tray: i < 13 ? 'a0' : i < 26 ? 'b0' : i < 39 ? 'c0' : i < 52 ? 'd0' : 't0',
			index: i - (i < 13 ? 0 : i < 26 ? 13 : i < 39 ? 26 : i < 52 ? 39 : 52)
		}
	))
);
