const express = require("express")
const path = require('path');//require morgan|volleyball, path packages
const volleyball = require('volleyball') // require morgan or volleyball
const app = express();//initialize app
app.use(express.json()); //use express.json()
app.use(volleyball) // use morgan or volleyball
//require db from /db


//use express.static() MAKE SURE THE PATH TO YOUR PUBLIC FOLDER IS RIGHT!
app.use(express.static(path.join(__dirname, './public')));
// app.use(express.static(path.join(__dirname, '..', 'public')))

//require in your routes and use them on your api path
app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, './public/index.html'))
})
// //404 handler

// //500 handler
// app.use((err, req, res, next) => {
//   console.error(err, typeof next)
//   console.error(err.stack)
//   res.status(err.status || 500).send(err.message || 'Internal server error.')
// })

//set PORT
const port = process.env.PORT || 3000;

//listen

async function init() {
  try {
    console.log('loading');;
    await app.listen(port, () => {
      console.log(`Listening on Port ${port}`);
  });
  } catch(err) { console.error(err); }
}

// const init = async()=> {
//   //await syncAndSeed()
//   app.listen(port, ()=> console.log(`listening on port ${port}`));
// }

init();
