var mysql=require('mysql');
//for localhost
// var connection=mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   password:'Rsince98?/',
//   database:'tourism2'
// });

//for deployment
var connection=mysql.createConnection({
  host:'sql6.freesqldatabase.com',
  user:'sql6447356',
  password:'24lWp4wX23',
  database:'sql6447356'
});

connection.connect(function(error){
  if(error){
    console.log("error in db");
  }else{
    console.log('db is Connected!:)');
  }
});  

    connection.query("CREATE TABLE register (id int primary key auto_increment, email VARCHAR(255) unique key , password VARCHAR(255))", function (err, result) { 
      if(err)
      {
    // console.log(err);
      }else{
        console.log("register table is created");
      }
    })

    connection.query("CREATE TABLE bookings (id int primary key auto_increment,email VARCHAR(255),sfrom VARCHAR(255),dto VARCHAR(255),Customer_Name VARCHAR(255),Customer_Address VARCHAR(255),Customer_Mobile VARCHAR(255),cclass VARCHAR(255),Type VARCHAR(255),TypeName VARCHAR(255),Quantity int(255),price int(255),date VARCHAR(255))", function (err, result) { 
      if(err)
      {
    // console.log(err);
      }else{
        console.log("bookings table is created");
      }
    })

module.exports = connection; 