'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-hot-loader/patch';

// AppContainer is a necessary wrapper component for HMR
//import { AppContainer } from 'react-hot-loader';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import {Router,Route, browserHistory} from 'react-router';

import routes from './routes';


const routerProps = {
    routes: routes,
    history: browserHistory
};

const render = () => {
    ReactDOM.render(
    		<Router {...routerProps}  />,
    	document.getElementById('app'));
};

render();

// Hot Module Replacement API
// if (module.hot) {
//     module.hot.accept('./app', () => {
//         render();
//     });
// }

