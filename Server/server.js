var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
var md5 = require('md5');
var moment = require('moment');
var models = require('./models/mongo_models.js')

app.use(express.static(__dirname + '../../Client/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//moment().format();
mongoose.Promise = Promise

var dbUrl = 'mongodb://mohsen:mohsen123@clustertest-shard-00-00-0rgah.mongodb.net:27017,clustertest-shard-00-01-0rgah.mongodb.net:27017,clustertest-shard-00-02-0rgah.mongodb.net:27017/test?ssl=true&replicaSet=ClusterTest-shard-0&authSource=admin&retryWrites=true'



app.get('/Users', (req, res) => {
    models.Users.find({}, (err, User) => {
        res.send(User)
    })
})

// app.get('/messages/:user', (req, res) => {
//     var user = req.params.user
//     Message.find({name: user}, (err, messages) => {
//         res.send(messages)
//     })
// })

app.post('/newuser', async (req, res) => {

    try {
        var user = new models.Users(req.body)

        var savedMessage = await user.save()

        console.log('saved: ', savedMessage)

        // var censored = await Message.findOne({ message: 'badword' })

        // if (censored)
        //     await Message.remove({ _id: censored.id })
        // else
        //     io.emit('message', req.body)

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    } finally {
        console.log('message post called')
    }
})

app.post('/login', async (req, res) => {
    try{
        console.log('req: ', req.body.username, req.body.password)
        models.Users.findOne({ username: req.body.username, password: md5(req.body.password) }, (err, user) => {
            //console.log('User found: ', user)
            if (user){
                res.send(user)
            }
            else
                res.sendStatus(403)
        })
    }
    catch(err){
        res.sendStatus(500)
        console.log('Login failed: ', err)
    }
    finally{
        console.log('Login Successfull')
    }
})

app.get('/logout', (req, res) => {
    // Cleaning server authentication...
    // TODO: Could send another activity of type "Logout" to MongoDB
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('user connected')
})

// Saving users' Action
app.post('/action', async (req, res) => {
    try{
        console.log('req: ', req.body.type)

        var activity = new models.Activities({
            userID: req.body.userID,
            type: req.body.type,
            last_seen: new Date()
        })
        await activity.save()
        res.sendStatus(200)
        // Sending Notification
        io.emit('message',  {'id': req.body.userID, 'message': req.body.type})
    }
    catch(err){
        res.sendStatus(500)
        console.log('Action failed: ', err)
    }
    finally{
        console.log('Action Successfull')
    }
})

// Getting Notifications
app.post('/notifications', async (req, res) => {
    try{
        console.log('req: ', req.body.userID)
        models.Activities.find({ userID: req.body.userID}, (err, activities) => {
            //console.log('Notifications: ', notification)
            if (activities){
                res.send(activities)
            }
            else
                res.send(403)
        })
    }
    catch(err){
        res.sendStatus(500)
        console.log('Getting Notifications failed: ', err)
    }
    finally{
        console.log('Notifications Successfull')
    }
})
mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    console.log('mongoDB connection status, error: ', err)
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})