import React, {Component} from 'react';
import UserInput from '../UserInput';
import UserList from '../UserList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Parse from '../../utils/parseServerInit';


export default class UsersPage extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			isAddingNew: false,
			selectedUserForEdit: null };

		this.handleEditUser = this.handleEditUser.bind(this);
		this.handleSaveUser = this.handleSaveUser.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentWillMount() {
		this.props.fetchUsers();
	}
	handleEditUser(user, userId) {
		this.setState({ selectedUserForEdit: null });
		this.props.handleEditUser(user, userId)
	}

	handleSaveUser(user, userId) {
		this.setState({ isAddingNew: false });
		this.props.handleAddUser(user, userId)
	}
	    
	handleAddClick() {
		this.setState({ isAddingNew: true });
	}

	handleCancel() {
		this.setState({ isAddingNew: false, selectedUserForEdit: null });
	}

	handleEditClick(userId) {
		this.setState( {selectedUserForEdit: userId} );
	}
	
	render() {
		const { isAddingNew, selectedUserForEdit } = this.state;
		const { cities, users, handleRemoveUser } = this.props;
		return (
			<div>
				<h1>Users</h1>
				{ users.length > 0 && 
					<UserList 
					cities={cities} 
					users={users} 
					handleRemoveUser={handleRemoveUser}
					handleSaveUser={this.handleEditUser}
					handleEditClick={this.handleEditClick}
					handleCancel={this.handleCancel}
					selectedUserForEdit={selectedUserForEdit} 
					/> 
				}

				<Divider />

				<div style={{marginTop: "20px", marginBottom: "80px"}}>
					{isAddingNew ? (
						<UserInput 
							cities={this.props.cities} 
							handleSaveUser={this.handleSaveUser} 
							handleCancel={this.handleCancel} />
					) : (
						<FloatingActionButton onClick={this.handleAddClick}>
		      		<ContentAdd />
		    		</FloatingActionButton> 
					)}
				</div>
	    </div>	
		);
	}
}