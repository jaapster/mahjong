import React from 'react';

interface Props {
	logout(): void;
	name: string;
}

export const Player = ({ logout, name }: Props) => {
	return (
		<p>
			Spelernaam: { name }&nbsp;
			<a href="#" onClick={ logout }>
				(aanpassen)
			</a>
		</p>
	);
};
