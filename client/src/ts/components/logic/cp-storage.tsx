import React from 'react';
import bind from 'autobind-decorator';
import { connect } from 'react-redux';
import { ActionRestore } from '../../store/actions/actions';
import { selectUserName, selectActiveTableId } from '../../store/selectors/selectors';

interface MappedProps {
	player: string;
	table: string;
}

interface DispatchProps {
	restore(player: string, table: string): void;
}

@bind
class _Storage extends React.PureComponent<MappedProps & DispatchProps> {
	componentDidMount() {
		const { restore } = this.props;
		const {
			player,
			table
		} = JSON.parse(localStorage.getItem('mahjong') ?? '{}');

		restore(player, table);
	}

	componentDidUpdate() {
		localStorage.setItem('mahjong', JSON.stringify(this.props));
	}

	render() {
		return null;
	}
}

const mapStateToProps = (state: Mahjong.Store): MappedProps => {
	return {
		player: selectUserName(state),
		table: selectActiveTableId(state)
	};
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
	return {
		restore(player: string, table: string) {
			dispatch(ActionRestore.create(player, table));
		}
	};
};

export const Storage = connect(mapStateToProps, mapDispatchToProps)(_Storage);
