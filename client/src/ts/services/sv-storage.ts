const subscribers = [];

const notify = (data: any) => {
	subscribers.forEach(fn => fn(data));
};

export const Storage = {
	get() {
		return JSON.parse(localStorage.getItem('mahjong') ?? '{}');
	},

	set(data) {
		const newData = {
			...Storage.get(),
			...data
		};

		localStorage.setItem('mahjong', JSON.stringify(newData));

		notify(newData);
	},

	subscribe(fn: any) {
		subscribers.push(fn);

		fn(Storage.get());
	}
};
