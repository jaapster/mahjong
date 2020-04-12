import React from 'react';
import './cp-exit.scss';

interface Props {
	onClick(): void;
}

export const Exit = ({ onClick }: Props) => {
	return (
		<div
			className="exit"
			onClick={ onClick }
		>
			<span>&#x2799;</span>
		</div>
	);
}
