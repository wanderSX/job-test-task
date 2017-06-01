import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class UserList extends Component {

	constructor(props){
	super(props);

	// this.saveChanges = this.saveChanges.bind(this);
	// this.handleSubmit = this.handleSubmit.bind(this);
	// this.handleEditClick = this.handleEditClick.bind(this);
	this.handleRemoveClick = this.handleRemoveClick.bind(this);
	this.renderUsers = this.renderUsers.bind(this);
	this.state = { isEditing: false };
}

	handleRemoveClick(userId) {
		this.props.handleRemoveUser(userId);
	}

	renderUsers() {

		return this.props.users.map((user) => {
			return (
					<Card key={user.id}>
						<CardHeader
				      title={`Name: ${user.attributes.name}`}
				      actAsExpander={true}
				      showExpandableButton={true}
				    />
						<CardText>
	          	<br />
	          	Email: {user.attributes.email}
	          	<br />
	          	City: {user.attributes.city.get('cityName')}
						</CardText>
						<CardActions expandable={true}>
				      <RaisedButton label="Edit" primary={true}  />
				      <RaisedButton label="Remove" secondary={true} onClick={() => this.handleRemoveClick(user.id)} />
				    </CardActions>
					</Card>
			)
		});
	}

	render() {

		return(
			<div>
				{this.props.users ? this.renderUsers() : <CircularProgress />}
			</div>
		);
	}
}