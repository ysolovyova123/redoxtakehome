const express = require("express")
const path = require('path');
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, './public/index.html'))
})
const port = process.env.PORT || 3000;

async function init() {
  try {
    console.log('loading');;
    await app.listen(port, () => {
      console.log(`Listening on Port ${port}`);
  });
  } catch(err) { console.error(err); }
}

init();
