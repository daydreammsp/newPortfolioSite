const express = require('express');
const contactForm = require('./routes/contactForm.route');


const app = express();
const bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//contact form route


app.use(express.static('public/static'));

app.use('/', contactForm);

// App Set //
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
