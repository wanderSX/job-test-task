import React, {Component} from 'react';
import Navigation from '../Navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Parse from '../../utils/parseServerInit';
import cities from '../../utils/cities';

function saveCitiesToDB(cities) {

}
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      projects: [],
      cities: []
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);

    this.fetchProjects = this.fetchProjects.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);

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
    let city = this.state.cities.find((city) => city.id === cityId );
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

  handleEditUser(editedUser, id) {

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
    }).then(() => this.fetchUsers())
      .catch((e) => console.log("Error:", e.message));
  }  

  handleRemoveUser(userId) {
    let User = Parse.Object.extend("Employee");
    let query = new Parse.Query(User);
    query.get(userId)
      .then((user) => user.destroy())
      .then(() => this.fetchUsers())
      .catch((e) => console.log("Error:", e.message))
  }

  fetchProjects() {
    let Project = Parse.Object.extend("Project");
    let query = Parse.Query(Project);

  }

  handleAddProject(newProject) {
    console.log("Add Project (App)");
    const {name, status, description, team} = newProject;
    let ProjectTeam = Parse.Object.extend("ProjectTeam");
    let Project = Parse.Object.extend("Project");
    let project = new Project();
    project.set("name", name);
    project.set("status", status);
    project.set("description", description);
    project.save()
      .then((project) => {

        let memberList = team.map((member) => {
          const {id, position} = member;
          let projectTeam = new ProjectTeam();
          let User = Parse.Object.extend("Employee");
          let query = new Parse.Query(User);
          return query.get(id)
            .then((member) => {
              projectTeam.set("employee", member);
              projectTeam.set("project", project);
              projectTeam.set("position", position);
              return projectTeam;
          }).catch((e) => console.log(e.message));
        });

        Promise.all(memberList)
          .then((results) => Parse.Object.saveAll(results));

    }).then(() => {
      console.log("Success!");
    }).catch((e) => console.log(e.message));

    //this.context.router.push('/projects');
  }
 
  componentWillMount() {
      console.log("Component will Mount - APp");
      let City = Parse.Object.extend("City");
      let query = new Parse.Query(City);
      let city = new City();
      query.limit(1000);
      query.count()
        .then((result) => {

          if (result === 0) {

            let cityObjects = cities.map((cityName) => {
              let city = new City();
              city.set("cityName", cityName);
              return city;
            });
            return Parse.Object.saveAll(cityObjects);
          } else {
            return query.find();
          }

        })
        .then((cities) => {
          this.setState({cities});
        })
        .catch((e) => {
          console.log("Error:", e.message);
        })
    }  

    render() {

        let props = {
          cities: this.state.cities,
          users: this.state.users,
          handleAddUser: this.handleAddUser,
          handleEditUser: this.handleEditUser,
          handleRemoveUser: this.handleRemoveUser,
          fetchUsers: this.fetchUsers,
          handleAddProject: this.handleAddProject
        }

        return (
            <MuiThemeProvider>
                <div id="app-wrapper">
                    <div id="app-content">
                          <Navigation />
                          {this.props.children && React.cloneElement(this.props.children, props)}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
};

// let memberFetchPromises = team.map((member) => {
//           let User = Parse.Object.extend("Employee");
//           let query = Parse.Query(User);
//           return query.get(id);
//         });

//         Promise.all(memberFetchPromises)
//           .then((member) => {
//             let projectTeam = new ProjectTeam();
//             projectTeam.set("employee", member);
//             projectTeam.set("project", project);
//             projectTeam.set("position", position);
//             return projectTeam;
//           });  