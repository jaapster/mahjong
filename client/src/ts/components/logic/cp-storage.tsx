import React from 'react';
import bind from 'autobind-decorator';
import { connect } from 'react-redux';
import { ActionRestore } from '../../store/actions/actions';
import { selectActiveTableId, selectUser } from '../../store/selectors/selectors';

interface MappedProps {
	user?: Mahjong.User;
	table: string;
}

interface DispatchProps {
	restore(user: Mahjong.User, table: string): void;
}

@bind
class _Storage extends React.PureComponent<MappedProps & DispatchProps> {
	componentDidMount() {
		const { restore } = this.props;
		const {
			user,
			table
		} = JSON.parse(localStorage.getItem('mahjong') ?? '{}');

		restore(user, table);
	}

	componentDidUpdate() {
		console.log('set storage', this.props);
		localStorage.setItem('mahjong', JSON.stringify(this.props));
	}

	render() {
		return null;
	}
}

const mapStateToProps = (state: Mahjong.Store): MappedProps => {
	return {
		user: selectUser(state),
		table: selectActiveTableId(state)
	};
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
	return {
		restore(user: Mahjong.User, table: string) {
			dispatch(ActionRestore.create(user, table));
		}
	};
};

export const Storage = connect(mapStateToProps, mapDispatchToProps)(_Storage);
