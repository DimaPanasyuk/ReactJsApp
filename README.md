<h1>ReactJsApp</h1>

<h1>Application is written using:</h1>
<ol>
	<li>React</li>
	<li>Flux</li>
	<li>Jade</li>
	<li>Less</li>
	<li>jQuery</li>
	<li>loDash</li>
	<li>Materialize</li>
</ol>

<p>
	Though, this application has no connected databases, it allows you to:
</p>
<ul>
	<li>
		Sign in using default user login and user password: Login: User1, Password: 1234
	</li>
	
	<li>
		Sign up, without saving your data to the database 
	</li>

	<li>
		Change your personal information such as address, e-mail, phone number or background-image of your page from your personal page (without saving to the database only for 1 session)	
	</li>

	<li>
		Add and remove payments 
	</li>
</ul>

<h1>How it works</h1>
<p>When you "sign in" with default login and password, program makes AJAX request to the json file and takes information about default user from it, than program loads this data into Store (Flux) using Dispatcher (Flux) and redirect you to your personal page, which is totally rendered by React and displays default information.</p>
<p>When you choose "sign up", program takes your data and inserts it into Store, that is why, you are able to see your information in your personal page.</p>

<h4>You can try this application by visiting this link http://jek.esy.es/</h4>

<h1>Application screenshots</h1>

![sign in form](https://cloud.githubusercontent.com/assets/15168071/13574979/38c1ef38-e48f-11e5-9a9a-83c328c2bca6.png)
![sign up form](https://cloud.githubusercontent.com/assets/15168071/13574981/3b2105d4-e48f-11e5-8e2c-0a8600072d5b.png)
![user page](https://cloud.githubusercontent.com/assets/15168071/13574985/3d4ca3ae-e48f-11e5-9894-683243012311.png)
![user information change](https://cloud.githubusercontent.com/assets/15168071/13574988/40dd3eb6-e48f-11e5-92f1-ef0f6c629662.png)
![payments](https://cloud.githubusercontent.com/assets/15168071/13574994/442eabd6-e48f-11e5-95d7-e4939652f65c.png)
