import React from 'react';
import bind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Login } from './cp-login';
import { Lobby } from '../lobby/cp-lobby';
import { selectUser } from '../../store/selectors/selectors';
import { Stream } from '../logic/cp-stream';

interface Props {
	user?: Mahjong.User;
}

@bind
export class _App extends React.Component<Props> {
	render() {
		const { user } = this.props;

		return (
			<>
				{
					user == null
						? <Login />
						: (
							<>
								<Lobby />
								<Stream />
							</>
						)
				}
			</>
		);
	}
}

const mapStateToProps = (state: Mahjong.Store) => {
	return {
		user: selectUser(state)
	};
};

export const App = connect(mapStateToProps)(_App);
