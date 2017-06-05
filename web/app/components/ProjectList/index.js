import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';


export default class ProjectList extends Component {


	renderProjects() {
		return this.props.projects.map((project) => {
			const {name, status} = project.attributes;
			return (
			<ListItem 
				key={project.id} 
				primaryText={name} 
				secondaryText={"Status: " + status}
				containerElement={<Link to={"projects/" + project.id} />}
			/>
			) 
		})
	}

	render() {
		return (
			<Paper>
				<List>
					{this.renderProjects()}
				</List>
			</Paper>
		)
	}
}