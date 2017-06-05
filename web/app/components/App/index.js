import React, {Component, PropTypes} from 'react';
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
      cities: [],
      projects: [],
      selectedProject: null
    };
    this.fetchCities = this.fetchCities.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);

    this.fetchProjects = this.fetchProjects.bind(this);
    this.fetchProject = this.fetchProject.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleRemoveProject = this.handleRemoveProject.bind(this);
    this.handleEditProject = this.handleEditProject.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.fetchCities();
    this.fetchUsers(); 
  }

  fetchCities() {
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
    }).then((cities) => {
        this.setState({cities});
    }).catch((e) => {
          console.log("Error:", e.message);
    })          
  }

  fetchUsers() {
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
    console.log("Fetch Projects");
    let ProjectTeam = Parse.Object.extend("ProjectTeam");
    let Project = Parse.Object.extend("Project");
    let query = new Parse.Query(Project);

    query.find()
      .then((projects) => {

        let teamPromises = projects.map((project) => {
          let query = new Parse.Query(ProjectTeam);
          query.equalTo("project", project);
          query.select(["employee", "position"]);
          query.include('employee');

          return query.find()
            .then((team) => {
              project.team = team;
              return project;
          }).catch((e) => console.log("Error:", e.message));
        });
        
        return Promise.all(teamPromises);
    }).then((projectsWithTeams) => this.setState({projects: projectsWithTeams}))
      .catch((e) => console.log("Error:", e.message))

  }

  handleAddProject(newProject) {
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
      this.fetchProjects();
      this.context.router.push('/projects');
    }).catch((e) => console.log(e.message));
  }

  handleEditProject(id, params)  {
    const {name, status, description, team} = params;
    let ProjectTeam = Parse.Object.extend("ProjectTeam");
    let Project = Parse.Object.extend("Project");
    let query = new Parse.Query(Project);
    let project = null;

    query.get(id)
      .then((project) => {
        project.set('name', name);
        project.set('status', status);
        project.set('description', description);
        return project.save();
    }).then((updatedProject) => {
      project = updatedProject;
      let query = new Parse.Query(ProjectTeam);
      query.equalTo('project', project);
      return query.find();
    }).then((projectTeam) => Parse.Object.destroyAll(projectTeam))
      .then(() => {

        let memberList = team.map((member) => {
          const {id, position} = member;
          let projectTeam = new ProjectTeam();
          let User = Parse.Object.extend("Employee");
          let query = new Parse.Query(User);

          return query.get(id)
            .then((member) => {
              //console.log(project);
              projectTeam.set("employee", member);
              projectTeam.set("project", project);
              projectTeam.set("position", position);
              return projectTeam;
          }).catch((e) => console.log(e.message));
        });

        Promise.all(memberList)
          .then((results) => Parse.Object.saveAll(results));
    }).then(() => {
        this.fetchProjects();
        this.context.router.push('/projects');
        this.setState({selectedProject: null});
    }).catch((e) => console.log(e.message));
  }

  handleRemoveProject(id) {
    let ProjectTeam = Parse.Object.extend("ProjectTeam");
    let Project = Parse.Object.extend("Project");
    let query = new Parse.Query(Project);

    query.get(id)
      .then((project) => project.destroy())
      .then((project) => {
        let query = new Parse.Query(ProjectTeam);
        query.equalTo('project', project);
        return query.find();
    }).then((projectTeam) => Parse.Object.destroyAll(projectTeam))
      .then(() => {
        this.fetchProjects();
        this.context.router.push('/projects');
        this.setState({selectedProject: null});
    }).catch((e) => console.log(e.message));
  }


  fetchProject(id) {
    console.log('Fetch Project');
    let ProjectTeam = Parse.Object.extend("ProjectTeam");
    let Project = Parse.Object.extend("Project");
    let query = new Parse.Query(Project);

    query.get(id)
      .then((project) => {
        let query = new Parse.Query(ProjectTeam);
        query.equalTo("project", project);
        query.select("employee", "position");
        query.include('employee');

        return query.find()
          .then((team) => {
            project.team = team;
            return project;
        }).catch((e) => console.log(e.message));

    }).then((projectWithTeam) => this.setState({selectedProject: projectWithTeam }))
      .catch((e) => console.log(e.message));

  }
 


    render() {

        let props = {
          selectedProject: this.state.selectedProject,
          projects: this.state.projects,
          cities: this.state.cities,
          users: this.state.users,
          fetchUsers: this.fetchUsers,
          handleAddUser: this.handleAddUser,
          handleEditUser: this.handleEditUser,
          handleRemoveUser: this.handleRemoveUser,
          fetchProjects: this.fetchProjects,
          handleAddProject: this.handleAddProject,
          handleRemoveProject: this.handleRemoveProject,
          handleEditProject: this.handleEditProject,
          fetchProject: this.fetchProject
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
