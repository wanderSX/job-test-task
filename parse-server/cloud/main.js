'use strict';

const mongoMigrate = require('mongodb-migrate');
mongoMigrate.changeWorkingDirectory("/parse/cloud");
mongoMigrate.setConfigFilename("migrate-config.js");

//TO include migrations and modules
// mongoMigrate.run('up', null,()=>{
//     require('./modules/User');
// });
