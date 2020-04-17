export const shuffle = (array: any[]): any[] => {
	const source = [...array];
	const target = [];

	while (source.length) {
		target.push(source.splice(Math.floor(Math.random() * source.length), 1)[0]);
	}

	return target;
};
