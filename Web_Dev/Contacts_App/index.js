const { query } = require('express');
const jquery = require('jquery');
const express = require('express');
const path = require('path');
const port = 3000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// var contact_list = [
//     {
//         name: 'human0',
//         phone: '1234567890'
//     },
//     {
//         name: 'human1',
//         phone: '1234565890'
//     },
//     {
//         name: 'human2',
//         phone: '123475545890'
//     }
// ]


app.get('/',function(req,res){

    Contact.find({}, (err, contacts) => {
        
        if(err){
            console.log('error in fetching the contacts');
        }
        
        return res.render('home',{
            title: 'Contacts Home',
            contactList: contacts
        });
        
    });
});

app.post('/create-contact', (req, res) => {
    
   Contact.create({
       name: req.body.name,
       phone: req.body.phone
   }, (err, newContact) => {
       if(err){
        console.log('error in creating the contact');
        return;
       }

       console.log('*********', newContact);

       return res.redirect('back');
   });
});

app.get('/delete', (req, res) => {
    
    // get the id of the contact
    let id = req.query.id;

    // find the contact by id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error deleting the contact!!');
            return;
        }

        return res.redirect('back');
    });

});


app.listen(port, function(err){

    if(err){
        console.log("ERROR", err);
    }

    console.log("My server is running on port: " + port);
});