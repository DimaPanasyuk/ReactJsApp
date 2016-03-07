import React 					 from 'react';
import ReactDOM 				 from 'react-dom';
import App 						 from './components/App'
import AuthorisationController   from './components/AuthorisationController'
import UserInterfaceController   from './components/UserInterfaceController'
import {

	Router, 
	Route, 
	hashHistory, 
	IndexRoute 
} from 'react-router'		



ReactDOM.render((
	
	<Router history={hashHistory}>
		
		<Route path='/' component={App}>
			
			<IndexRoute component={AuthorisationController} />	
			<Route path='/userInterface' component={UserInterfaceController} />
		</Route>
	</Router>
), document.getElementById('app'));