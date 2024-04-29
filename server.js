const express=require ("express");
const mongoose= require("mongoose");
const devuser= require('./devusermodel');
const quizquestion = require('./quizQuestionModel');

const jwt= require('jsonwebtoken');
const middleware=require('./middleware');
const cors=require('cors')
const app =express();


mongoose.connect('mongodb+srv://kirankanimella888:7898Kiran@cluster0.zz8own3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    ()=>console.log("Db connected")
)



app.get("/",(req,res)=>{
    return res.send("Hello world...!")
})

app.use(express.json());
app.use(cors({origin:"*"}))

app.post('/register',async(req, res)=>{
    try{
        const{username,email,password,confirmpassword}= req.body;
        const exist =await devuser.findOne({email});
        if(exist){
            return res.status(400).send("user is there")
        }
        if (password != confirmpassword){
            return res.status(403).send("password wrong")
        }
        let newUser =new devuser({
            username,email,password,confirmpassword
        })
        await newUser.save();
        return res.status(200).send("user regester")

    }
    catch(err){
        console.log(err);
        return res.status(500).send('sever error')
        res => alert(err)
    }
})

app.post('/login',async(req,res)=>{
    try{
        const {email,password}= req.body;
        let exist =await devuser.findOne({email});
        if (!exist){
            return res.status(400).send("user not found")
        }
        if (exist.password !== password){
            return res.status(400).send("invalid password")
        }
        let payload={
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
            (err,token)=>{
                if (err)throw err;
                return res.json({token})
        }
        )
    }
    catch(err){
        console.log(err);
        return res.status(500).send("invalid user")
       
    }
})

app.get('/home',middleware,async(req, res)=>{
    try{
        let exist = await devuser.findById(req.user.id);
        if (!exist){
            return req.status(400).send("user not found");
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("invalid token")
    }
})

app.get('/myprofile',middleware,async(req, res)=>{
    try{
        let exist = await devuser.findById(req.user.id);
        if (!exist){
            return req.status(400).send("user not found");
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("invalid token")
    }
})

app.post('/quiz', async (req, res) => {
    try {
      const { category, question, options, correctAnswer } = req.body;
      const newQuizQuestion = new quizquestion({ category, question, options, correctAnswer });
      await newQuizQuestion.save();
      res.status(201).json(newQuizQuestion);
    } catch (error) {
      console.error('Error inserting quiz question:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.get('/quiz', async (req, res) => {
    try {
      const { category } = req.query; 
      const quizQuestions = await quizquestion.find({ category });
      res.status(200).json(quizQuestions);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  

app.listen(5001,()=>console.log("server running..."))