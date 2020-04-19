import fs from 'fs';
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

const read = () => JSON.parse(fs.readFileSync(__dirname + '/users.json') as any);

const write = (data) => fs.writeFileSync(__dirname + '/users.json', JSON.stringify(data));

const users = read();

export const getUserById = id => {
	const user = users.find(user => user.id === id);

	if (!user) {
		return null;
	}

	return {
		name: user.name,
		id: user.id
	};
};

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

	write(users);

	return {
		name,
		id: userData.id
	};
};