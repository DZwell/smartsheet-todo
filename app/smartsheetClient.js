const client = require('smartsheet');
const smartsheet = client.createClient({ accessToken: process.env.SMARTSHEET_TOKEN});

smartsheet.users.listAllUsers().then((users) => {
    console.log(users);
}).catch((err) => {
    console.log(err);
})