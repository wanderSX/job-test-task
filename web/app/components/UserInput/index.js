import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const cities = ['City1','City2','City3','City4',];

export default class UserInput extends Component {

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			email: "",
			name: "",
			cityId: null
		};
	}

	componentWillMount() {
		if (this.props.initialData) {
			this.setState(this.props.initialData);
		}
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSelectChange(e,i,value) {
		this.setState({cityId: value});
	}

	handleSubmit(e){
		e.preventDefault();

		const { email, name, cityId } = this.state;
		const {userId} = this.props;
		const user = {
			name: name.trim(),
			email: email.trim(),
			cityId
		}
		this.props.handleSaveUser(user, userId);
	}

	renderMenuItems() {
		console.log(this.props.cities);
		return this.props.cities.map((city, index) => <MenuItem value={city.id} key={city.id} primaryText={city.attributes.cityName}/>)
	}

	render() {
		const {email, name, cityId} = this.state;
		const style = {
			button: {
				margin: 12
			},
			paper: {
				display: 'inline-block',
				padding: 25 + 'px'
			},
			form: {
  			display: 'flex',
 				flexDirection: 'row'
			}
		};
		return(
			<Paper style={style.paper}>
				<form onSubmit={this.handleSubmit} >
					<div style={style.form}>
					<TextField 
						style={style.button} 
						value={name} 
						name='name'
						floatingLabelText="Name" 
						hintText='Enter your name' 
						onChange={this.handleChange} /><br />
					<TextField 
						style={style.button} 
						value={email} 
						name='email' 
						floatingLabelText="Email" 
						hintText='Enter your email' 
						onChange={this.handleChange} /><br />
					<SelectField 
						style={style.button} 
						value={cityId} 
						name='city' 
						maxHeight={200} 
						floatingLabelText="City" 
						hintText='Select a city' 
						onChange={this.handleSelectChange} 
					>
						{this.renderMenuItems()}
					</SelectField><br />
					</div>
					<RaisedButton type="submit" label="Save" primary={true} style={style} />
					<RaisedButton label="Cancel" style={style} onClick={this.props.handleCancel}/>
				</form>
			</Paper>
		);
	}
}