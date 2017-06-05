import React, {Component} from 'react';

export default class ProjectsPage extends Component {

	componentWillMount() {
		this.props.fetchProjects();
	}


 render() {
 	return (
 		<div>
 			{this.props.children && React.cloneElement(this.props.children, this.props)}
 		</div>
 	)
 }
}