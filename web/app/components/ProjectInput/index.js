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
	}

	componentWillMount() {
		//console.log('Projects11');
		//console.log(this.props);
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
		//console.log('handleChange');
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

		console.log("Add Project (input)");
		this.props.handleAddProject(this.state);
		//
	}

	renderNames() {
		//
		return this.props.users.map((user) => {
			//console.log(user.attributes.name);
			return <MenuItem key={user.id} value={user.id} primaryText={user.attributes.name} />
		})
	}
 

	renderTeam() {
		//console.log(this.state.team);
		return this.state.team.map((member, index) => {
			
			// console.log(index);
			return (
				<div key={index}>
				<SelectField 
					value={member.id} 
					hintText='Name' 
					onChange={(e,i,value) => this.handleSelectName(value, index)}
				>
					{this.renderNames()}
				</SelectField>
				<SelectField 
					value={member.position} 
					hintText='Position' 
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
				<form onSubmit={this.handleSubmit} >
					<TextField value={name} name='name' hintText='Name' onChange={this.handleChange} /><br />
					<TextField value={description} multiLine name='description' hintText='Description' onChange={this.handleChange} /><br />
					<SelectField
						value={status} 
						name='status' 
						maxHeight={200} 
						hintText='Status' 
						onChange={(e,i,value) => this.setState({status: value})} 
					>
						<MenuItem value="Started" primaryText="Started" />
		        <MenuItem value="Alpha" primaryText="Alpha" />
		        <MenuItem value="Beta" primaryText="Beta" />
		        <MenuItem value="Release" primaryText="Release" />
		        <MenuItem value="Finished" primaryText="Finished" />
					</SelectField>
					<Divider />
					<Subheader>Team</Subheader>
					{this.state.team.length > 0 && this.renderTeam()}
					<RaisedButton label="Add" onClick={this.handleAddMember}/> 
					<Divider />
					<RaisedButton label="Save Project" type="submit" primary={true} /> 
				</form>
			</Paper>
		);
	}

}