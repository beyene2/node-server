const express=require("express");
const hbs = require("hbs");
const fs = require("fs");
//const port = process.env.PORT;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'sbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
    var now = new Date().toDateString();
    var log = (`${now}:${req.method} ${req.url}`);
    fs.appendFile('server.log', log + '\n',(err)=>{
        if(err){
            console.log("Unable to connect");
        }
    })
    
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// })

hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        greeting:"Welcome",
        pageTitle:"Home page",
    });
   
 
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:"About",
    });
});
app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:"Projects",
    });
});

app.listen(process.env.PORT, process.env.IP,()=>{
    console.log("Server has started");
})