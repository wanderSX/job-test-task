import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const cities = ['City1','City2','City3','City4',];

export default class AddUserForm extends Component {

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
		const user = {
			name: name.trim(),
			email: email.trim(),
			cityId
		}
		this.props.handleAddUser(this.state);
	}

	renderMenuItems() {
		return this.props.cities.map((city, index) => <MenuItem value={city.id} key={city.id} primaryText={city.attributes.cityName}/>)
	}

	render() {
		const {email, name, cityId} = this.state;
		const style = {
		  margin: 12,
		};
		return(
			<form onSubmit={this.handleSubmit}>
				<TextField value={name} name='name' hintText='Name' onChange={this.handleChange} /><br />
				<TextField value={email} name='email' hintText='Email' onChange={this.handleChange} /><br />
				<SelectField value={cityId} name='city' maxHeight={200} hintText='City' onChange={this.handleSelectChange} >
					{this.renderMenuItems()}
				</SelectField><br />
				<RaisedButton type="submit" label="Save" primary={true} style={style} />
				<RaisedButton label="Cancel" style={style} onClick={this.props.handleCancel}/>
			</form>
		);
	}
}