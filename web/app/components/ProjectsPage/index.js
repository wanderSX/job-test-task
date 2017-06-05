import React, {Component, PropTypes} from 'react';
import Parse from '../../utils/parseServerInit';

export default class ProjectsPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			users: [],
			projects: [],
			selectedProject: null
		}
		this.fetchUsers = this.fetchUsers.bind(this);

		this.fetchProject = this.fetchProject.bind(this);
		this.fetchProjects = this.fetchProjects.bind(this);
		this.handleAddProject =	this.handleAddProject.bind(this);
		this.handleEditProject = this.handleEditProject.bind(this);
		this.handleRemoveProject = this.handleRemoveProject.bind(this);
	}

	static contextTypes = {
    router: PropTypes.object
  }

	componentWillMount() {
		this.fetchProjects();
		this.fetchUsers();
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
      .catch((e) => console.log(e));
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

 render() {

 	let props = {
 		users: this.state.users,
 		selectedProject: this.state.selectedProject,
    projects: this.state.projects,
 		fetchProjects: this.fetchProjects,
    handleAddProject: this.handleAddProject,
    handleRemoveProject: this.handleRemoveProject,
    handleEditProject: this.handleEditProject,
    fetchProject: this.fetchProject
 	}
 	return (
 		<div>
 			{this.props.children && React.cloneElement(this.props.children, props)}
 		</div>
 	)
 }
}