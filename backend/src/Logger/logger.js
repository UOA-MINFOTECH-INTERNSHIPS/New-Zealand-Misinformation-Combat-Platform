const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;


//importing the mongodb package so we could upload log to database collection in mongo
require('winston-mongodb');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.prettyPrint())
    }),
    new transports.MongoDB({
      level: 'error', 
      db: 'mongodb+srv://cojomedialab:cojolab123@cojo.g5jff.gcp.mongodb.net/myFirstDtabase',
      collection: 'ErrorLog',
      format: format.combine(format.timestamp(), format.json()),
      useUnifiedTopology: true
    }),
  ]
});
 
module.exports = logger;