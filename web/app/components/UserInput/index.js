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
		console.log(e);
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
					<TextField value={name} name='name' hintText='Name' onChange={this.handleChange} /><br />
					<TextField value={email} name='email' hintText='Email' onChange={this.handleChange} /><br />
					<SelectField value={cityId} name='city' maxHeight={200} hintText='City' onChange={this.handleSelectChange} >
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