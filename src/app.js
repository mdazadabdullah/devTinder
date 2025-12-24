const express = require("express")
const connectDB = require("./config/database")
const User = require('./models/user')
const { validateSignUpData } = require('./utils/validation')
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
        // validation of data
        validateSignUpData(req);
        const { firstName, lastName, password, emailId } = req.body;
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user" + err.message);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if(!user) {
            throw new Error("Invalid credentials");
        }
        // const isPasswordValid = await bcrypt.compare(passowrd, user.passowrd);
        const isPasswordValid = await bcrypt.compare(String(password), String(user.password));
        console.log("isPasswordValid", isPasswordValid);
        if(isPasswordValid) {
            res.send("Login Successful !!! ");
        }else {
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        res.status(400).send("Error:" + err.message);
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
        await User.findByIdAndUpdate({_id: userId }, data, {
            returnDocument: "after",
            runValidators: true
        });
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
