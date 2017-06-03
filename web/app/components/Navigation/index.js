import React, {Component} from 'react';
import {Link} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';


export default class Navigation extends Component {
	render() {
		let styles = {
      appTitle:{
        display: 'none'
      },
      tabs: {
        width: 300
      }
    };

    return (
    	<AppBar title="Title" titleStyle={styles.appTitle} showMenuIconButton={false}>
          <Tabs initialSelectedIndex={-1} style={styles.tabs}>
            <Tab label='Users' containerElement={<Link to='/users' />}/>
            <Tab label='Projects'containerElement={<Link to='/projects' />}/>
          </Tabs>
      </AppBar>
    )
	}
}
