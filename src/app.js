const express = require("express")
const connectDB = require("./config/database")
const User = require('./models/user')
const app = express();
const port = 3000;
app.use(express.json());

app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user" + err.message);
    }
})

app.get('/user', async(req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({ emailId: userEmail});
        res.send(user);
    }catch (err) {
        res.status(400).send("Something went wrong");
    }
})

app.delete('/user', async(req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch (err) {
        res.status(400).send("Something went wrong");
    }
})

app.patch('/user', async(req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate({_id: userId }, data);
        res.send("User updated successfully");
    }catch (err) {
        res.status(400).send("Something went wrong");
    }
})


app.get('/feed', async(req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    }catch (err) {
        res.status(400).send("Something went wrong");
    }
})

connectDB().then(()=> {
    console.log("Database connection established...");
    app.listen(port, () => {
        console.log("Server started running on port " + port)
    });
}).catch(err=>{
    console.error("Database cannot be established...");
});
