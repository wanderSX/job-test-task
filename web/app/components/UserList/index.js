import React, {Component} from 'react';
import UserInput from '../UserInput';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import {cyan500, red500, greenA200} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardText} from 'material-ui/Card';

export default class UserList extends Component {

	constructor(props){
	super(props);

	// this.saveChanges = this.saveChanges.bind(this);
	// this.handleSubmit = this.handleSubmit.bind(this);
	this.handleEditClick = this.handleEditClick.bind(this);
	this.handleRemoveClick = this.handleRemoveClick.bind(this);
	this.renderUsers = this.renderUsers.bind(this);
	this.state = { isEditing: false };
}

	handleRemoveClick(userId) {
		this.props.handleRemoveUser(userId);
	}

	handleEditClick(userId) {
		this.props.handleEditClick(userId);
	}

	renderUsers() {
		let { selectedUserForEdit, handleSaveUser, handleCancel } = this.props;
		return this.props.users.map((user) => {
			const {name, email, city} = user.attributes;
			if ( selectedUserForEdit && selectedUserForEdit === user.id ) {
				return (
					<UserInput 
						key={user.id}
						userId={user.id} 
						initialData={{name, email, cityId: city.id}}
						cities={this.props.cities}
						handleSaveUser={handleSaveUser}
						handleCancel={handleCancel} 
					/>
				)	
			}
			return (
				<ListItem key={user.id}>
					<Card>
						<CardText actAsExpander>
						<p>{name}</p>
						<p>{email}</p>
						<p>{city.attributes.cityName}</p>
						</CardText>
						<CardActions expandable>
          		<RaisedButton 
          			label="Edit" 
          			primary={true} 
          			disabled={selectedUserForEdit ? true : false}
          			onClick={() => this.handleEditClick(user.id)} 
          		/>
          		<RaisedButton 
          			label="Delete" 
          			disabled={selectedUserForEdit ? true : false}
          			onClick={() => this.handleRemoveClick(user.id)} 
          		/>
        		</CardActions>
					</Card>
				</ListItem>
			)
		});
	}

	render() {

		return(
				<List>
					{this.renderUsers()}
				</List>
		);
	}
}
