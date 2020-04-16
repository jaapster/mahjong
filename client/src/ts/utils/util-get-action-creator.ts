export const getActionCreator = <Data>(type: string) => {
	const token = Symbol(type);

	return {
		create(data?: Data): any {
			return {
				token,
				type,
				data
			};
		},

		validate(action: any) {
			return action.token === token;
		},

		data(action: any): Data {
			if (action.token !== token) {
				throw new Error(`Action [${ type }] mismatch`);
			}
			return action.data;
		},

		type() {
			return type;
		}
	};
};