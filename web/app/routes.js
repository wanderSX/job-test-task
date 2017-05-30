import React from 'react';
import App from './components/App';
import IndexPage from './index/Index.jsx';
import UsersIndex from './components/UsersIndex';
import ProjectsIndex from './components/ProjectsIndex';


import {Route, IndexRoute, Redirect } from 'react-router';

// export default [
//     {
//         path: '/',
//         component: Layout,
//         indexRoute: {
//             component: IndexPage
//         },
//     }
// ]

export default (
<Route path="/" component={App}>
	<IndexRoute component={IndexPage} />
	<Route path="users" component={UsersIndex} />
	<Route path="projects" component={ProjectsIndex} />
</Route>
);