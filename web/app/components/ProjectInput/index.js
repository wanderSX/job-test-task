import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Formsy from 'formsy-react';
import {FormsySelect, FormsyText} from 'formsy-material-ui';
import {Link} from 'react-router';


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
		this.enableButton = this.enableButton.bind(this);
		this.disableButton = this.disableButton.bind(this);

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

		if(this.props.routes[2].path === ':id/edit') {
			this.props.handleEditProject(this.props.params.id, this.state);
		} else {	
			this.props.handleAddProject(this.state);
		}
	}

	enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
  	this.setState({ canSubmit: false })
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
				<FormsySelect 
					value={member.id}
					floatingLabelText="Name"
					name="employeeName"
					required  
					hintText='Select an employee' 
					validationError="Please select an employee"
					onChange={(e, value) => this.handleSelectName(value, index)}
				>
					{this.renderNames()}
				</FormsySelect>
				<FormsySelect 
					value={member.position} 
					name="position"
					floatingLabelText='Position'
					required
					hintText='Select a position'
					validationError="Please select a position"  
					onChange={(e, value) => this.handleSelectChange(value, index)} 
				>
					<MenuItem value="Manager" primaryText="Manager" />
		      <MenuItem value="Developer" primaryText="Developer" />
		      <MenuItem value="Designer" primaryText="Designer" />
				</FormsySelect>
				<RaisedButton 
					secondary={true} 
					label="Remove" 
					onClick={() => this.handleRemoveMember(index)}
				/> 
				</div>
			)
		})
	}

	render() {
		const {name, description, status} = this.state;

		return (
			<Paper>
				<Formsy.Form
				  onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.handleSubmit}
          style={{padding: "20px", paddingBottom: 0}}
				>
					<FormsyText
              name="name"
              value={name}
              required
              hintText="Enter a project name"
              floatingLabelText='Project Name'
              onChange={this.handleChange} 
          /><br />
					<FormsyText
              name="description"
              value={description}
              multiLine
              required
              hintText="Enter a description"
              floatingLabelText='Description'
              onChange={this.handleChange} 
          /><br />
          <FormsySelect
						value={status} 
						name='status'
						required 
						maxHeight={200} 
						floatingLabelText="Status" 
						hintText='Select a project status'
						validationError="Please select a status"  
						onChange={(e, value, i) => this.setState({status: value})}
					>
						<MenuItem value="Started" primaryText="Started" />
		        <MenuItem value="Alpha" primaryText="Alpha" />
		        <MenuItem value="Beta" primaryText="Beta" />
		        <MenuItem value="Release" primaryText="Release" />
		        <MenuItem value="Finished" primaryText="Finished" />
					</FormsySelect>
					<Divider />
					<h3>Team</h3>
					{this.state.team.length > 0 && this.renderTeam()}
					<RaisedButton 
						label="Add member" 
						onClick={this.handleAddMember}
					/> 
					<br />
					<RaisedButton 
						style={{marginTop: '30px'}} 
						label="Save Project" 
						type="submit"
						disabled={!this.state.canSubmit} 
						primary={true} 
					/>
					<Link to='/projects'>
						<RaisedButton 
							style={{marginTop: '30px'}} 
							label="Cancel"  
						/>
					</Link>	 	 
				</Formsy.Form>
			</Paper>
		);
	}
}