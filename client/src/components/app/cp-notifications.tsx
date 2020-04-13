import React from 'react';
import './ss-notifications.scss';

export const Notifications = ({ notification }: { notification: string }) => {
	return (
		<div className="notifications">
			{
				notification
					? (
						<div className="notification">
							{ notification }
						</div>
					)
					: null
			}
		</div>
	);
};