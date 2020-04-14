import ReactDOM from 'react-dom';

export const Portal = ({ children, id }: any) => {
	const target = document.getElementById(id);
	return target != null
		? ReactDOM.createPortal(
			children,
			document.getElementById(id)
		)
		: null;
};
