const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('View engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log)
	fs.appendFile('server.log', log + '\n',(err)=>{
		if(err){
			console.log('Unable to find data');
		}
	});
	next();
});

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
})
app.get('/',(req,res)=>{
	res.render('home.hbs',{
		titlePage : 'Welcome To Our Website',
		paragaraphText : "Welcome",
		footerText : new Date().getFullYear()
	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		titlePage : 'About Us',
		footerText : new Date().getFullYear()
	});
});

app.get('/maintain',(req,res)=>{
	res.render('maintain.hbs',{
		titlePage : 'Under construction',
		footerText : new Date().getFullYear()
	});
});

app.get('/contact',(req,res)=>{
	res.render('contact.hbs',{
		titlePage : 'Under construction',
		footerText : new Date().getFullYear()
	});
});
app.listen(port,()=>{
	console.log(`Server is up on port ${port}`);
});