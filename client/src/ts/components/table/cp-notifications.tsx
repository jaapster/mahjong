import React from 'react';
import './ss-notifications.scss';

interface Props {
	notification?: any;
	table: Mahjong.Table;
}

interface State {
	trays: { [id: string]: string };
}

export class Notifications extends React.Component<Props, State> {
	state = { trays: {} };

	componentDidMount() {
		const { table } = this.props;

		const names = table.chairs.reduce((m, chair) => {
			return {
				...m,
				[chair.id]: chair.player
			};
		}, {} as { [id: string]: string });

		this.setState({
			trays: {
				a0: names.a,
				a1: names.a,
				b0: names.b,
				b1: names.b,
				c0: names.c,
				c1: names.c,
				d0: names.d,
				d1: names.d,
				t0: 'de muur',
				t1: 'de tafel'
			}
		});
	}

	render() {
		const { notification } = this.props;

		if (!notification) {
			return null;
		}

		const { trays } = this.state;
		const { from, to, title } = notification;

		const tile = [from, to].includes('t0') ? 'een steen' : title;

		const p = from[0] !== 't' ? from : to;
		const t = from[0] === 't' ? from : to;
		const a = p === from ? 'legt' : 'pakt';
		const b = p === from ? 'op' : 'van';

		const str = `${ trays[p] } ${ a } ${ tile } ${ b } ${ trays[t] }`;

		return (
			<div className="notifications">
				<div className="notification">
					{ str }
				</div>
			</div>
		);
	}
}