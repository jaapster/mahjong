import React from 'react';
import './ss-exit.scss';

interface Props {
	onClick(): void;
}

export const Exit = ({ onClick }: Props) => {
	return (
		<div
			className="exit"
			onClick={ onClick }
			title="Terug naar de lobby"
		>
			<span>&#x2799;</span>
		</div>
	);
}
