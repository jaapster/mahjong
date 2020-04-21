import React from 'react';
import bind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Login } from './cp-login';
import { Lobby } from '../lobby/cp-lobby';
import { selectUser, selectSize } from '../../store/selectors/selectors';
import { Stream } from '../logic/cp-stream';

interface Props {
	size: number;
	user?: Mahjong.User;
}

const HTML = document.getElementsByTagName('html')[0];

@bind
export class _App extends React.Component<Props> {
	render() {
		const { user, size } = this.props;

		HTML.style.fontSize = `${ size }px`;

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

const mapStateToProps = (state: Mahjong.Store): Props => {
	return {
		user: selectUser(state),
		size: selectSize(state)
	};
};

export const App = connect(mapStateToProps)(_App);
