import { LoginApplicationView } from './LoginApplicationView.js';

class Application
{
	constructor( apiInstanceObject )
	{
		this._api = apiInstanceObject;
		this._defaultView = new LoginApplicationView(this._api);		
		this._maxLoginFailedAttempts = this._api.getMaxLoginAttempts();
		this._attempts = 0;
		this._api_return = null;
	}

	async init()
	{
		await this._api.openDB();
		this._api_return = await this._defaultView.show();
	}

	async run()
	{
		while( this._api_return.result == 'USER_PASSWORD_FAILED' && this._attempts < this._maxLoginFailedAttempts )
		{
			this._api_return = await this._defaultView.show();

			if ( this._api_return.result == 'USER_PASSWORD_FAILED' )
			{
				this._attempts++;
			}
		}
	}
}

export { Application };