import React from 'react';
import bind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Login } from './cp-login';
import { Lobby } from '../lobby/cp-lobby';
import { selectUserName } from '../../store/selectors/selectors';
import { Stream } from '../logic/cp-stream';
import { Storage } from '../logic/cp-storage';

interface Props {
	player?: string;
}

@bind
export class _App extends React.Component<Props> {
	render() {
		const { player } = this.props;

		return (
			<>
				{
					player == null
						? <Login />
						: <Lobby />
				}
				<Stream />
				<Storage />
			</>
		);
	}
}

const mapStateToProps = (state: Mahjong.Store) => {
	return {
		player: selectUserName(state)
	};
};

export const App = connect(mapStateToProps)(_App);
