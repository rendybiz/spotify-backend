/**
 * You should put all the required route here
 * and do specifically in other files
 */

const callbackRoute = require("./callback.route");
const fetchtest     = require("./fetchtest.route");

const generalRoute = (
    app
) => {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.get('/callback', callbackRoute);
    app.post('/fetch-test', fetchtest)
}

module.exports = generalRoute;