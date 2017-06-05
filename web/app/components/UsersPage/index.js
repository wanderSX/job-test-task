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

		this.fetchLimitedUsers = this.fetchLimitedUsers.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);

		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
	}

	componentWillMount() {
		this.fetchLimitedUsers();
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
        this.fetchLimitedUsers();
      })
  }

  handleEditUser(editedUser, id) {
  	this.setState({ selectedUserForEdit: null });
    const {name, email, cityId} = editedUser;
    let city = this.state.cities.find((city) => city.id === cityId );
    let User = Parse.Object.extend("Employee");
    let query = new Parse.Query(User);

    query.get(id)
      .then((user) => {
        user.set("name", name);
        user.set("email", email);
        user.set("city", city);
        return user.save()
    }).then(() => this.fetchLimitedUsers())
      .catch((e) => console.log("Error:", e.message));
  }

  handleRemoveUser(userId) {
    let ProjectTeam = Parse.Object.extend("ProjectTeam");
    let User = Parse.Object.extend("Employee");
    let query = new Parse.Query(User);

    query.get(userId)
      .then((user) => user.destroy())
      .then((user) => {
        let query = new Parse.Query(ProjectTeam);

        query.equalTo('employee', user)
        return query.find()
          .then((projectsTeams) => {
            if(projectsTeams.length !== 0) {
              return Parse.Object.destroyAll(projectsTeams);
            }
            return Promise.resolve;
          })  
      })
      .then(() => this.fetchLimitedUsers())
      .catch((e) => console.log("Error:", e.message))
  }     

	handleAddClick() {
		this.setState({ isAddingNew: true });
	}

	handleCancel() {
		this.setState({ isAddingNew: false, selectedUserForEdit: null });
	}

	handleEditClick(userId) {
		this.setState({ selectedUserForEdit: userId });
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
		const { isAddingNew, users, selectedUserForEdit } = this.state;
		const { cities } = this.props;
		return (
			<div>
				<h1>Users</h1>
				{ users.length > 0 && 
					<div> 
						<UserList 
							cities={cities} 
							users={users} 
							handleRemoveUser={this.handleRemoveUser}
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
							handleSaveUser={this.handleAddUser} 
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