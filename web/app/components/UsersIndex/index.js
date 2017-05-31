import React, {Component} from 'react';
import AddUserForm from '../AddUserForm';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


export default class UsersIndex extends Component {

	constructor(props) {
		super(props);

		this.state = { isAddingNew: false };
		this.handleClick = this.handleClick.bind(this);
		this.handleAddUser = this.handleAddUser.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentWillMount() {
		this.props.fetchUsers();
	}

	handleClick() {
		this.setState({ isAddingNew: true });
	}

	handleAddUser(user) {
		this.setState({ isAddingNew: false });
		this.props.handleAddUser(user);
	}

	handleCancel() {
		this.setState({ isAddingNew: false });
	}
	
	render() {
		//console.log('Users');
		//console.log(this.props);
		const { isAddingNew } = this.state;
		return (
			<div>
				<h1>Users</h1>

				{isAddingNew ? (
					<AddUserForm cities={this.props.cities} handleAddUser={this.handleAddUser} handleCancel={this.handleCancel}/>
				) : (
					<FloatingActionButton onClick={this.handleClick}>
	      		<ContentAdd />
	    		</FloatingActionButton> 
				)}
	    </div>	
		);
	}
}