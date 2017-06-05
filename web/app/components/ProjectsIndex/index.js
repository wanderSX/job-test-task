import React, {Component} from 'react';
import ProjectInput from '../ProjectInput';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Link} from 'react-router';
import ProjectList from '../ProjectList';

export default class ProjectsIndex extends Component {

	render() {
		return (
			<div>
				<h1>Projects</h1>
				<ProjectList projects={this.props.projects}/>
				<FloatingActionButton containerElement={<Link to='/projects/new' />}>
				  <ContentAdd />
				</FloatingActionButton>
			 </div>  
		);
	}
}