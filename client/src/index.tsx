import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from './ts/store/store';
import { App } from './ts/components/app/cp-mahjong';

import "./style/base.scss";

ReactDOM.render(
	<Provider store={ store } >
		<App />
	</Provider>,
	document.getElementById('app'),
);