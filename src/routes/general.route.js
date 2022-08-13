/**
 * You should put all the required route here
 * and do specifically in other files
 */

const callbackRoute = require("./callback.route");

const generalRoute = (
    app
) => {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.get('/callback', callbackRoute);
}

module.exports = generalRoute;