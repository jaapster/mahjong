const findChow = (rack, base) => {
	const number = parseInt(base.name);
	const suits = rack.filter(t => t.suit === base.suit);

	const left = suits.find(t => parseInt(t.name) + 1 === number);
	const right = suits.find(t => parseInt(t.name) - 1 === number);

	if (left && right) {
		return [left, base, right];
	} else if (left) {
		const left2 = suits.find(t => parseInt(t.name) + 1 === parseInt(left.name));

		if (left2) {
			return [left2, left, base];
		}
	} else if (right) {
		const right2 = suits.find(t => parseInt(t.name) - 1 === parseInt(right.name));

		if (right2) {
			return [base, right, right2];
		}
	}

	return null;
};

const findPung = (rack, base) => {
	const same = rack.filter(t => t.suit === base.suit && t.name === base.name);

	if (same.length > 1) {
		return [...same, base];
	}

	return null;
};

const findUseless = ts => {
	const useless = ts.reduce((m, ta) => {
		if (!ts.find(tb =>
			ta.id !== tb.id &&
			ta.suit === tb.suit	&&
			(
				ta.name === tb.name ||
				(
					['dots', 'bamboo', 'characters'].includes(ta.suit) &&
					Math.abs(parseInt(ta.name) - parseInt(tb.name)) === 1
				)
			)
		)) {
			return [...m, ta];
		}

		return m;
	}, []);

	return useless.length ? useless : ts;
};

export const analyseHand = (rack: Mahjong.Tile[], free: Mahjong.Tile, wall: Mahjong.Tile) => {
	const freeChow = free ? findChow(rack, free) : null;
	const freePung = free ? findPung(rack, free) : null;

	if (freeChow) {
		return {
			move: freeChow,
			take: null,
			discard: findUseless(rack.filter(t => !freeChow.includes(t)))[0]
		};
	}

	if (freePung) {
		return {
			move: freePung,
			take: null,
			discard: findUseless(rack.filter(t => !freePung.includes(t)))[0]
		};
	}

	return {
		move: null,
		take: wall,
		discard: findUseless([...rack, wall])[0]
	};
};
