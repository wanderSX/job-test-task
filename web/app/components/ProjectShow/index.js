import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

export default class ProjectShow extends Component {

	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchProject(this.props.params.id);
	}

	renderTeam() {
		return this.props.selectedProject.team.map((member) => {
			return (
				<ListItem key={member.id}>
					<p>{member.attributes.employee.get('name')}</p>
					<p>{member.attributes.position}</p>
				</ListItem>
			)
		})
	}

	render() {

		if (!this.props.selectedProject) {
			return <CircularProgress />
		}
		const {id, team} = this.props.selectedProject;
		const {name, status, description} = this.props.selectedProject.attributes;
		console.log(team);
		return(
			<div style={{marginTop:"40px"}}>
				<RaisedButton primary={true} label="Delete Project" onClick={() => this.props.handleRemoveProject(id)} />
				<Link to={`/projects/${id}/edit`}>
					<RaisedButton label="Edit Project" />
				</Link>
				<Paper style={{padding: '20px'}}>
					<h2>{name}</h2>
					<h5>{'Status:' + status}</h5>
					<p>{description}</p>
				</Paper>
				<Paper>
					<h3>Team</h3>
					<List>
					 {team.length > 0 && this.renderTeam()}
					</List>
				</Paper>
			</div>
		)
	}

}