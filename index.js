const express = require("express");
const cors = require('cors')

const {oktaResourceAuthentication} = require('./okta-middleware')
const app = express();


app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



app.use(oktaResourceAuthentication)

app.get('/secure-list', (req, res) => {
    res.json([{
        name: 'John Doe',
        age: 20
    }, {
        name: 'Joe Doe',
        age: 20
    }])
})

app.listen(8000, () => {
    console.log("Server is live on port 8000");
})