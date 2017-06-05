'use strict';

const mongoMigrate = require('mongodb-migrate');
mongoMigrate.changeWorkingDirectory("/parse/cloud");
mongoMigrate.setConfigFilename("migrate-config.js");

//TO include migrations and modules
// mongoMigrate.run('up', null,()=>{
//     require('./modules/User');
// });

Parse.Cloud.define('prepopulate', (req, res) => {
	let City = Parse.Object.extends("City");
	let city = new City();

	city.save(null, {useMasterKey:true})
		.then((city) => city.destroy())
})