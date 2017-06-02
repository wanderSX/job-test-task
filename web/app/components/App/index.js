import React, {Component} from 'react';
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
            projects: [],
            cities: []
        };
    }
 
    componentWillMount() {
      console.log("Component will Mount - APp");
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

        })
        .then((cities) => {
          //console.log(cities);
          this.setState({cities});
        })
        .catch((e) => {
          console.log("Error:", e.message);
        })
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