import { v4 } from 'uuid';

const hash = (str: string) => {
	let hash = 5381;
	let i = str.length;

	while(i) {
		hash = (hash * 33) ^ str.charCodeAt(--i);
	}

	/* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
	 * integers. Since we want the results to be always positive, convert the
	 * signed int to an unsigned by doing an unsigned bitshift. */
	return hash >>> 0;
};

const users: {
	name: string;
	id: string;
	password: number;
}[] = [
	{
		name: 'zaphod',
		id: 'b8569725-7726-42ec-acab-903aabe31dec',
		password: 1166315532 // 'beeble'
	},
	{
		name: 'trillian',
		id: 'c98a9fa5-9d19-4a9f-89f8-3ab05aedb8b3',
		password: 193416106 // 'mac'
	},
	{
		name: 'ford',
		id: 'a442ff8b-a487-41ca-ab37-b64347777d82',
		password: 1601328694 // 'prefect'
	},
	{
		name: 'arthur',
		id: '161c180f-a772-4740-8329-543e778b996a',
		password: 2087962174 // 'dent'
	}
];

export const getUserById = id => users.find(user => user.id === id);

export const getUserByName = name => users.find(user => user.name === name);

export const getUser = (name, password) => users.find(user => (
	user.name === name && user.password === hash(password)
));

export const addUser = (name, password) => {
	const userData = {
		name,
		id: v4(),
		password: hash(password)
	};

	users.push(userData);

	return {
		name,
		id: userData.id
	};
};