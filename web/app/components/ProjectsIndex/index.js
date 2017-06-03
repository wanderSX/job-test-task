import React, {Component} from 'react';
import ProjectInput from '../ProjectInput';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Link} from 'react-router';

export default class ProjectsIndex extends Component {

	constructor(props) {
		super(props);

		this.state = {
			
		}
	}


	render() {
	
		//console.log(this.props);
		return (
			<div>
				<h1 >Projects</h1>
				<FloatingActionButton containerElement={<Link to='/projects/new' />}>
				  <ContentAdd />
				</FloatingActionButton>
			 </div>  
		);
	}
}