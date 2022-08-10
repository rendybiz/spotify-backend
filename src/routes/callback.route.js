const fetch = require('node-fetch');

const callbackRoute = function (req, res) {
    const client_secret = (process.env.REACT_APP_SPOTIFY_CLIENT_SECRET)
    const client_id = (process.env.REACT_APP_SPOTIFY_CLIENT_ID)
   
    var code = req.query.code || null;
    var state = req.query.state || null;
    var auth = {"code":"AQDhvfpYasEicd4MpHCaNo3aw99v1Asff9I00jITJy__quV1OAfrBMVJx2ZWBUiEpnuSuB2x48Tm51ugSGU38efAfWecOIa1Gj5ybhaOlQ7gUyWVl44GAiVz2iNOK7-QLiaJcT5lXXaJI039bOonVojmdqAJ7xGWE9s_OxBGUwexkHAWq7ZjicOsU8ZoRDSwDJteScjwucmVfzIcjWXxEsEyKxVXSA","state":"SN27f3RoOPOR5b0h"}
    code = auth.code
    state = auth.state

    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {

        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            // url: 'http://localhost:3001/fetch-test',
            form: {
                code: code,
                redirect_uri: 'http://localhost:3000/callback',
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret)),
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            json: true
        };
        // console.log("autooptions",  new URLSearchParams(authOptions.form).toString())
        fetch(authOptions.url, {
            method: 'post',
            body:  new URLSearchParams(authOptions.form).toString(),
            headers: authOptions.headers
        })
            .then(async (response) => {
                const resp =  await response.text()

                /**
                 * Response sample:
                  { "access_token":"BQCHBmjUr8WAAvgvZwLEhDrKRkNPBYI4VY69lALXMbEknD6jgHr-Kdkjt5xsTjod4XXNgfZjCNdF1TFbF420xwRIQ6OvAURtTMEVUp7tmW7U6hVTxrBpqJtChxJ81aGoWW4-kUQmweAYDC-97PiiOoMHsXICTffHsIr5_--BE4-QhclJiU8Aru0iynXmbv7EvRqsXwtgYhAh5tGWXchxAA","token_type":"Bearer",
                 "expires_in":3600,
                 "refresh_token":"AQChyaDgZTXcVANuntFu9iFty8k15FbRPzJ9Mg0W5hrzVt1qqslde4ktxQbHv5_4aB35hlxtnTkKCBjQ9N-4ZaADHE1mO78JxxJCYobSoucUEDDZS6V0o9aY3dkpnnuv1rg",
                 "scope":"user-read-email user-read-private"
                  }
                 */
                res.json(JSON.parse(resp))
            })
            .catch(function (err) {
                console.log("Unable to fetch -", err);
            });
    }

    console.log("hello test fetch")
}
module.exports = callbackRoute;
