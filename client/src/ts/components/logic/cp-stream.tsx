import React from 'react';
import bind from 'autobind-decorator';
import { connect } from 'react-redux';
import { ActionSetTables } from '../../store/actions/actions';

interface Props {
	setTables(tables: Mahjong.Table[]): void;
}

@bind
class _Stream extends React.Component<Props> {
	private stream: EventSource;

	componentDidMount() {
		this.stream = new EventSource('/streams/tables');
		this.stream.addEventListener('update', this.onUpdate);
	}

	componentWillUnmount() {
		this.stream.removeEventListener('update', this.onUpdate);
		this.stream.close();
	}

	private onUpdate(e: any) {
		const { setTables } = this.props;

		setTables(JSON.parse(e.data));
	}

	render() {
		return null;
	}
}

const mapDispatchToProps = (dispatch: any): Props => {
	return {
		setTables(tables: Mahjong.Table[]) {
			dispatch(ActionSetTables.create(tables));
		}
	};
};

export const Stream = connect(null, mapDispatchToProps)(_Stream);
