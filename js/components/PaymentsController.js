import React         from 'react';
import UserStore     from '../stores/UserStore';
import Payments      from './Payments';

export default React.createClass({
  
  getInitialState() {
    
    return {
      
      payments: UserStore.returnUserPayments()
    }  
  },
  
  componentDidMount() {
    
    console.debug('rendered component profilecontroller');
    UserStore.bind('update', this._paymentsUpdate);
  },
  
  _paymentsUpdate() {
    
    let payments = UserStore.returnUserPayments();
    this.setState({
      
      payments: payments
    })
  },
  
  componentWillUnmount() {
    
    UserStore.unbind('update');
  },
  
  render() {
    
    return (
      
      <Payments payments={this.state.payments}>
      </Payments>      
    )
  }
})