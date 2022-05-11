const app = require('express')();
const winston = require('winston');

// Imports the Google Cloud client library for Winston
const {LoggingWinston} = require('@google-cloud/logging-winston');

// Creates a client
const loggingWinston = new LoggingWinston({
  projectId: 'la-gcp-test',
  keyFilename: 'projects/la-gcp-test/log-test-bucket/winston_log.json',
});

const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console(),
      // Add Stackdriver Logging
      loggingWinston,
    ],
  });
  
  // Writes some log entries

app.get('/', (req, res ) => 
    res.json({ message: 'Docker is easy 🐳' }) 
    
);
logger.info('shields at 99%');
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`) );

