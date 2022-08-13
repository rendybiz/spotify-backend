const getToken = require('../controllers/callback.controller');

const callbackRoute = function (req, res) {
   
    var code = req.query.code || null;
    var state = req.query.state || null;

    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        getToken(req, res, code)
        
    }

}
module.exports = callbackRoute;
