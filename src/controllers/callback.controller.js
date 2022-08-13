const fetch = require('node-fetch');
const getenv = require('../utils/getenv');
/**
 * 
 * @param {*} req | Express Request Object
 * @param {*} res | Express Response Object
 * @param {String} code | String response from Spotify "Code" Response
 */
async function getToken(req, res, code) {
    const env = getenv()
    const client_secret = env.REACT_APP_SPOTIFY_CLIENT_SECRET
    const client_id = env.REACT_APP_SPOTIFY_CLIENT_ID
    console.log("client id", { client_id, client_secret })
    try {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
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
        fetch(authOptions.url, {
            method: 'post',
            body: new URLSearchParams(authOptions.form).toString(),
            headers: authOptions.headers
        })
            .then(async (response) => {
                const resp = await response.text()

                /**
                 * Response sample:
                  { "access_token":"BQCHBmjUr8WAAvgvZwLEhDrKRkNPBYI4VY69lALXMbEknD6jgHr-Kdkjt5xsTjod4XXNgfZjCNdF1TFbF420xwRIQ6OvAURtTMEVUp7tmW7U6hVTxrBpqJtChxJ81aGoWW4-kUQmweAYDC-97PiiOoMHsXICTffHsIr5_--BE4-QhclJiU8Aru0iynXmbv7EvRqsXwtgYhAh5tGWXchxAA","token_type":"Bearer",
                 "expires_in":3600,
                 "refresh_token":"AQChyaDgZTXcVANuntFu9iFty8k15FbRPzJ9Mg0W5hrzVt1qqslde4ktxQbHv5_4aB35hlxtnTkKCBjQ9N-4ZaADHE1mO78JxxJCYobSoucUEDDZS6V0o9aY3dkpnnuv1rg",
                 "scope":"user-read-email user-read-private"
                  }
                 */
                res.json(JSON.parse(resp), response.status)
            })
            .catch(function (err) {
                console.log("Unable to fetch -", err);
            });

    } catch (err) {
        console.error(" Unknown error", err)
        res.json({ error: "unknown error" }, 500)
    }
}

module.exports = getToken