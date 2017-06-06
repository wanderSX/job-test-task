import React, {Component, PropTypes} from 'react';
import Navigation from '../Navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Parse from '../../utils/parseServerInit';
import cities from '../../utils/cities';
import sortCities from '../../utils/sortCities';

function saveCitiesToDB(cities) {

}
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cities: []
    };
  }

  componentWillMount() {
    this.fetchCities();

    // To Prepopulate your parse with 'employess'
    
    // let User = Parse.Object.extend("Employee");
    // let array = [];
    // for( let i = 0; i < 100; i++){
    //   let user = new User;
    //   user.set('name', 'name' + i);
    //   user.set('email', 'email' + i);
    //   array.push(user);
    // }
    // Parse.Object.saveAll(array)
    //   .then(() => this.fetchCities())
    //   .catch((e) => console.log("Error:", e.message)) 
    
  
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
        let sorted = cities.sort(sortCities);
        //console.log(sorted);
        this.setState({cities: sorted});
    }).catch((e) => console.log("Error:", e.message))          
  }

    render() {
        let props = {
          cities: this.state.cities,
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
