import React, {Component} from 'react';
import Navigation from '../Navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

export default class App extends Component {

    render() {
        let {content} = this.props;

        
        return (
            <MuiThemeProvider>
                <div id="app-wrapper">
                    <div id="app-content">
                        <Navigation />
                        {this.props.children && React.cloneElement(this.props.children, {onRemoveTaco: this.handleRemoveTaco})}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
};