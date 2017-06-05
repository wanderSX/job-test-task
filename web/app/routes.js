import React from 'react';
import App from './components/App';
import IndexPage from './index/Index.jsx';
import UsersPage from './components/UsersPage';
import ProjectsIndex from './components/ProjectsIndex';
import ProjectInput from './components/ProjectInput';
import ProjectsPage from './components/ProjectsPage';
import ProjectShow from './components/ProjectShow';

import {Route, IndexRoute, Redirect } from 'react-router';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={IndexPage} />
		<Route path="users" component={UsersPage} />
		<Route path="projects" component={ProjectsPage}>
			<IndexRoute component={ProjectsIndex} />
			<Route exact path="new" component={ProjectInput} />
			<Route path=":id" component={ProjectShow} />
			<Route path=":id/edit" component={ProjectInput} />
		</Route>
	</Route>
);