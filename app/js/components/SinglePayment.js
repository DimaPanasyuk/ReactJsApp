import React 			 from 'react';

export default React.createClass({
		
	_removePayment(e) {
		
		let elem = $(e.target);

		if (this.props.remove) {

			this.props.remove(elem);
		}
	},

	render() {	

		return (

			<div className="app__user-payment"
					 style={{backgroundColor: this.props.payment.payment_color}}>

				<div className="container-fluid">
					
					<div className="app__user-payment-top-line">
						
						<div className="row">
							
							<div className="col-md-2">

								<h1>
									
									{this.props.payment.payment_title}
								</h1>
							</div>
							
							<div className="col-md-7">
								<div className="app__user-payment-info">
									<h4>{this.props.payment.payment_name}</h4>
									<p><em>Реквізити: </em>{this.props.payment.payment_account}</p>
								</div>
							</div>
							
							<div className="col-md-3">
								<div className="app__user-payment-actions">
									<a onClick={this._removePayment} className="waves-effect waves-light btn app__user-payment-actions-remove">Видалити</a>
									<a className="waves-effect waves-light btn app__user-payment-actions-pay disabled">Оплатити</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});