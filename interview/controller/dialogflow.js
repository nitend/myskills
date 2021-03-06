const dialogflow = require('dialogflow')
const uuid = require('uuid')

const projectId = 'mypersonalskills-bbosuc'
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(textinput, sessionkey, done) {
    // A unique identifier for the given session
    const sessionId = sessionkey;
  
    console.log(textinput)

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({keyFilename: 'credentials.json'});
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  
    // The text query request.
    const request = {
      session: sessionPath, 
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: textinput,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    };
  
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
    done(result.fulfillmentText, null, sessionId)
  }

  module.exports = { 
    runSample
  }