import React 									   from 'react';
import ReactDOM 								 from 'react-dom';
import App 										   from './components/App';
import AuthorisationController   from './components/AuthorisationController';
import UserInterfaceController   from './components/UserInterfaceController';
import PaymentsController        from './components/PaymentsController';
import ProfileController         from './components/ProfileController';

import {

	Router, 
	Route, 
	browserHistory, 
	IndexRoute 
} from 'react-router'		



ReactDOM.render((
	
	<Router history={browserHistory}>
		
		<Route path='/' component={App}>
			
			<IndexRoute component={AuthorisationController} />
      
      <Route path="jek"
             component={UserInterfaceController}>
      
        <Route path='profile' 
               component={ProfileController} />
        <Route path='payments'
               component={PaymentsController}>
        </Route>
      </Route>	
		</Route>
	</Router>
), document.getElementById('app'));