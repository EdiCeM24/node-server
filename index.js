const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json())

const products = [
  {
    id: 1,
    name: 'apple',
    price: 20.00,
    numInStock: 250,
    rating: 4.5,
    description: ""
  },
  {
    id: 2,
    name: 'banana',
    price: 20.00,
    numInStock: 250,
    rating: 4.5,
    description: ""
  },
  {
    id: 3,
    name: 'cherry',
    price: 20.00,
    numInStock: 250,
    rating: 4.5,
    description: ""
  },
]

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.get('/api/products', (req, res) => {
    res.send(products);
});

//Post Handling and Input validate
app.post('/api/products', (req, res) => {
  const { error } = validateProduct(req.body); // object destructuring. instead of result.error.
  if (error) return res.status(400).send(error.details[0].message);
   /*const schema = {
    name: Joi.string().min(3).required()
   };

   const result = Joi.validate(req.body, schema);
   //console.log(result);

   // this was the first.
  //if (!req.body.name || req.body.name.length < 3) {
  //   res.status(400).send('Name is required and should be minimum of 3 characters.');
  // }
  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message);
    return;
  } */

  const product = {
    id: products.length + 1,
    name: req.body.name
  };
  products.push(product);
  res.send(product);
});

// Handling Put Request
app.put('/api/products/:id', (req, res) => {
  // Look up the product
  const product = products.find(b => b.id === parseInt(req.params.id));
  //if (!products) is added then the whole thing will return blank if product is more then given values and network will indicate 200 ok. 
  if (!product) return res.status(404).send('The products with the given ID was not found!');

  // If not existing, return 404.
  /*const schema = {
    name: Joi.string().min(3).required()
  };

   const result = Joi.validate(req.body, schema);*/
   //const result = validateProduct(req.body);
   const { error } = validateProduct(req.body); // object destructuring. instead of result.error.
   if (error) return res.status(400).send(error.details[0].message);
    // Update product
    product.name = req.body.name;

    // Return the updated product
    res.send(product);
});

// Delete HTTP Request Handler
app.delete('/app/products/:id', (req, res) => {
  // Look up the course id.
  const product = products.find(b => b.id === parseInt(req.params.id));
  // Not existing, then we return 404.
  if (!product) return res.status(404).send('The products with the given ID was not found!');

  // By convension Delete it.
   const index = products.indexOf(product);
   products.splice(index, 1);
  // Return the same product.
  res.send(product);
});


app.get('/api/products/:id', (req, res) => {
  // queryparam = req.query.
  const product = products.find(b => b.id === parseInt(req.params.id));
  //if (!products) is added then the whole thing will return blank if product is more then given values and network will indicate 200 ok. 
  if (!product) return res.status(404).send('The products with the given ID was not found!');
  res.send(product);
});


function validateProduct(product) {
  const schema = {
    name: Joi.string().min(3).required()
  };

   return Joi.validate(product, schema);
}


// environment variable
const port = process.env.PORT || 3002
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


// Fixing a bug made us amend our res.status(404) to return res.status(404).
// http://vidly.com/app/genres this a project.