class APIModelAccess
{
	constructor()
	{
		this._authData = new Map();
		this._maxLoginFailedAttempts = 3;
		
		let userData =
		[
			{
				password: '987654',
				failedLoginCounter: 0,
				isLocked: false
			},
			{
				password: '987654',
				failedLoginCounter: 0,
				isLocked: false
			}
		]

		this._authData.set('scorpion', userData[0] );
		this._authData.set('subZero', userData[1] );
	}

	

}


export { APIModelAccess };