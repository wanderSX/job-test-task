import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';


export default class ProjectInput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			name: "",
			status: "",
			description: "",
			team: []
		};

		this.handleAddMember = this.handleAddMember.bind(this);
		this.handleRemoveMember = this.handleRemoveMember.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.setInitialState = this.setInitialState.bind(this);
	}

	setInitialState() {
		const {name, status, description} = this.props.selectedProject.attributes;
		const team = this.props.selectedProject.team.map((member) => {
			return {
				id: member.get('employee').id,
				position: member.get('position')
			}
		});

		this.setState({name, status, description, team});
	}

	componentWillMount() {
		const {selectedProject, params, routes} = this.props;
		if (selectedProject && selectedProject.id === params.id) {
			this.setInitialState();
		} else if (routes[2].path === ':id/edit') {
			this.props.fetchProject(params.id);
		}
	}

	componentWillReceiveProps() {
		if (this.props.selectedProject && this.props.selectedProject.id === this.props.params.id) {
			this.setInitialState();
		}
	}

	handleAddMember() {
		let {team} = this.state;
	
		this.setState({team: [...team, {id: "", position: ""} ]});
	}

	handleRemoveMember(index) {
		let {team} = this.state;
		this.setState({ team: [...team.slice(0,index), ...team.slice(index+1)] });
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSelectChange(value, index) {
		let team = [...this.state.team];
		team[index].position = value;
		this.setState({team});
	}


	handleSelectName(value, index) {
		let team = [...this.state.team];
		team[index].id = value;
		this.setState({team});
	}

	handleSubmit(e) {
		e.preventDefault();

		if(this.props.routes[2].path === ':id/edit') {
			this.props.handleEditProject(this.props.params.id, this.state);
		} else {	
			this.props.handleAddProject(this.state);
		}
		
	}

	renderNames() {
		//
		return this.props.users.map((user) => {
			return <MenuItem key={user.id} value={user.id} primaryText={user.attributes.name} />
		})
	}
 

	renderTeam() {
		let style = {
			display: "flex",
			alignItems: "center"
		}
		return this.state.team.map((member, index) => {
			
			return (
				<div style={style} key={index}>
				<SelectField 
					value={member.id}
					floatingLabelText="Name"  
					hintText='Select an employee' 
					onChange={(e,i,value) => this.handleSelectName(value, index)}
				>
					{this.renderNames()}
				</SelectField>
				<SelectField 
					value={member.position} 
					floatingLabelText='Position'
					hintText='Select a position'  
					onChange={(e,i,value) => this.handleSelectChange(value, index)} 
				>
					<MenuItem value="Manager" primaryText="Manager" />
		      <MenuItem value="Developer" primaryText="Developer" />
		      <MenuItem value="Designer" primaryText="Designer" />
				</SelectField>
				<RaisedButton 
					secondary={true} 
					label="Remove" 
					onClick={() => this.handleRemoveMember(index)}/> 
				</div>
			)
		})
	}

	render() {
		const {name, description, status} = this.state;

		return (
			<Paper>
				<form onSubmit={this.handleSubmit} style={{padding: "20px", paddingBottom: 0}} >
					<TextField 
						value={name} 
						name='name'
						floatingLabelText='Project Name' 
						hintText='Enter a project name' 
						onChange={this.handleChange} 
					/><br />
					<TextField 
						value={description} 
						multiLine 
						name='description'
						floatingLabelText='Description' 
						hintText='Enter a description' 
						onChange={this.handleChange} 
					/><br />
					<SelectField
						value={status} 
						name='status' 
						maxHeight={200} 
						hintText='Select a project status'
						floatingLabelText='Status'  
						onChange={(e,i,value) => this.setState({status: value})} 
					>
						<MenuItem value="Started" primaryText="Started" />
		        <MenuItem value="Alpha" primaryText="Alpha" />
		        <MenuItem value="Beta" primaryText="Beta" />
		        <MenuItem value="Release" primaryText="Release" />
		        <MenuItem value="Finished" primaryText="Finished" />
					</SelectField>
					<Divider />
					<h3>Team</h3>
					{this.state.team.length > 0 && this.renderTeam()}
					<RaisedButton label="Add member" onClick={this.handleAddMember}/> 

					<RaisedButton style={{marginTop: '30px', display: 'block'}} label="Save Project" type="submit" primary={true} /> 
				</form>
			</Paper>
		);
	}
}