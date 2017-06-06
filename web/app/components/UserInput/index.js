import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import {FormsySelect, FormsyText} from 'formsy-material-ui';

export default class UserInput extends Component {

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.enableButton = this.enableButton.bind(this);
		this.disableButton = this.disableButton.bind(this);

		this.state = {
			email: "",
			name: "",
			cityId: null,
			canSubmit: false
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

	handleSelectChange(e,value,i) {
		this.setState({cityId: value});
	}

	handleSubmit(data){

		const { email, name, cityId } = this.state;
		const {userId} = this.props;
		const user = {
			name: name.trim(),
			email: email.trim(),
			cityId
		}
		this.props.handleSaveUser(user, userId);
	}

	enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
  	this.setState({ canSubmit: false })
  }

	renderMenuItems() {
		return this.props.cities.map((city, index) => {
			return <MenuItem value={city.id} key={city.id} primaryText={city.attributes.cityName}/>
		})
	}

	render() {
		const {email, name, cityId} = this.state;
		const style = {
			field: {
				margin: 12
			},
			paper: {
				display: 'inline-block',
				padding: '25px'
			},
			form: {
  			display: 'flex',
 				flexDirection: 'row'
			}
		};
		return(
			<Paper style={style.paper}>
				<Formsy.Form
				  onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.handleSubmit}
				>
					<div style={style.form}>
					<FormsyText
              name="name"
              value={name}
              validations="isWords"
              validationError="Please only use letters"
              required
              hintText="Enter your name"
              floatingLabelText="Name"
              onChange={this.handleChange} 
              style={style.field}
          /><br />
          <FormsyText
              name="email"
              value={email}
              validations="isEmail"
              validationError="Please provide a correct email"
              required
              hintText="Enter your email"
              floatingLabelText="Email"
              style={style.field} 
              onChange={this.handleChange} 
          /><br />
          <FormsySelect
						style={style.field} 
						value={cityId} 
						name='city'
						required 
						maxHeight={200} 
						floatingLabelText="City" 
						hintText='Select a city'
						validationError="Please select your city" 
						onChange={this.handleSelectChange} 
					>	
						{this.renderMenuItems()}
					</FormsySelect><br />
					</div>
					<RaisedButton 
						type="submit" 
						label="Save" 
						primary={true} 
						style={style} 
						disabled={!this.state.canSubmit}
					/>
					<RaisedButton 
						label="Cancel" 
						style={style} 
						onClick={this.props.handleCancel}
					/>
				</Formsy.Form>
			</Paper>
		);
	}
}