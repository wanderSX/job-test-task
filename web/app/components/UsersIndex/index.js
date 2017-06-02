import React, {Component} from 'react';
import UserInput from '../UserInput';
import UserList from '../UserList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Parse from '../../utils/parseServerInit';


export default class UsersIndex extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			users: [],
			isAddingNew: false,
			selectedUserForEdit: null };

		this.fetchUsers = this.fetchUsers.bind(this);
		this.handleAddUser = this.handleAddUser.bind(this);
		this.handleRemoveUser = this.handleRemoveUser.bind(this);
		this.handleEditUser = this.handleEditUser.bind(this);

		this.handleClick = this.handleClick.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentWillMount() {
		this.fetchUsers();
	}

	fetchUsers() {
    console.log('fetchUsers');
    let User = Parse.Object.extend("Employee");
    let query = new Parse.Query(User);
    	query.find()
      .then((users) => {
        this.setState({ users });
        console.log(this.state.users);
      })
      .catch((e) => console.log("Error:", e.message));
   }

  handleAddUser(newUser) {

  	this.setState({ isAddingNew: false });

    const {name, email, cityId} = newUser;
    let city = this.props.cities.find((city) => city.id === cityId );
    let User = Parse.Object.extend("Employee");
    let user = new User();
    user.set("name", name);
    user.set("email", email);
    user.set("city", city);
    user.save()
      .then((obj) => {
        this.fetchUsers();
      })
  }

  handleRemoveUser(userId) {
    let User = Parse.Object.extend("Employee");
    let query = new Parse.Query(User);
    query.get(userId)
      .then((user) => user.destroy())
      .then(() => this.fetchUsers())
      .catch((e) => console.log("Error:", e.message))
  }

	handleClick() {
		this.setState({ isAddingNew: true });
	}

	handleCancel() {
		this.setState({ isAddingNew: false, selectedUserForEdit: null });
	}

	handleEditUser(editedUser, id) {
		this.setState({ selectedUserForEdit: null })

		const {name, email, cityId} = editedUser;
		let city = this.props.cities.find((city) => city.id === cityId );
		let User = Parse.Object.extend("Employee");
    let query = new Parse.Query(User);
    query.get(id)
    	.then((user) => {
	    	user.set("name", name);
		    user.set("email", email);
		    user.set("city", city);
		    return user.save()
		}).then(() => this.fetchUsers())
      .catch((e) => console.log("Error:", e.message));
	}


	handleEditClick(userId) {
		this.setState( {selectedUserForEdit: userId} );
	}
	
	render() {
		const { isAddingNew, selectedUserForEdit, users } = this.state;
		const { cities } = this.props;
		return (
			<div>
				<h1>Users</h1>
				{ users.length > 0 && 
					<UserList 
					cities={cities} 
					users={users} 
					handleRemoveUser={this.handleRemoveUser}
					handleSaveUser={this.handleEditUser}
					handleEditClick={this.handleEditClick}
					handleCancel={this.handleCancel}
					selectedUserForEdit={selectedUserForEdit} 
					/> 
				}

				<Divider />

				<div style={{marginTop: "20px"}}>
					{isAddingNew ? (
						<UserInput 
							cities={this.props.cities} 
							handleSaveUser={this.handleAddUser} 
							handleCancel={this.handleCancel} />
					) : (
						<FloatingActionButton onClick={this.handleClick}>
		      		<ContentAdd />
		    		</FloatingActionButton> 
					)}
				</div>
	    </div>	
		);
	}
}