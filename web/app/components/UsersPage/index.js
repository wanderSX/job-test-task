import React, {Component} from 'react';
import UserInput from '../UserInput';
import UserList from '../UserList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Parse from '../../utils/parseServerInit';
import ReactPaginate from 'react-paginate';


export default class UsersPage extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			isAddingNew: false,
			selectedUserForEdit: null,
      users: [],
      offset: 0
		};

		this.handleEditUser = this.handleEditUser.bind(this);
		this.handleSaveUser = this.handleSaveUser.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.fetchLimitedUsers = this.fetchLimitedUsers.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
	}

	componentWillMount() {
		//this.props.fetchUsers();
		this.fetchLimitedUsers();
	}

	componentWillUpdate() {
		console.log("componentWillUpdate");
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

	handlePageClick(data) {
		console.log(data);
		let selected = data.selected;
    let offset = Math.ceil(selected * 10);

    this.setState({offset: offset}, () => {
      this.fetchLimitedUsers();
    });
	}

	fetchLimitedUsers() {
		let User = Parse.Object.extend('Employee');
		let query = new Parse.Query(User);

		query.count()
			.then((amount) => {
				this.setState({pageCount: Math.ceil(amount / 10)});
				query.limit(10);
				query.skip(this.state.offset);
				return query.find();
		}).then((users) => {
	        this.setState({ users });
	        console.log(this.state.users);
	  }).catch((e) => console.log("Error:", e.message));
		
		
	}
	
	render() {
		//const { isAddingNew, selectedUserForEdit } = this.state;
		//const { cities, users, handleRemoveUser } = this.props;
		const { isAddingNew, users, selectedUserForEdit } = this.state;
		const { cities, handleRemoveUser } = this.props;
		return (
			<div>
				<h1>Users</h1>
				{ users.length > 0 && 
					<div> 
						<UserList 
							cities={cities} 
							users={users} 
							handleRemoveUser={handleRemoveUser}
							handleSaveUser={this.handleEditUser}
							handleEditClick={this.handleEditClick}
							handleCancel={this.handleCancel}
							selectedUserForEdit={selectedUserForEdit} 
						/> 
						<ReactPaginate 
							previousLabel="previous"
	            nextLabel="next"
	            breakLabel={'...'}
	            pageCount={this.state.pageCount}
	            marginPagesDisplayed={2}
	            pageRangeDisplayed={5}
	            onPageChange={this.handlePageClick}
	            containerClassName={'pagination-container'}
	            activeClassName={'active'}
						/>
					</div>
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