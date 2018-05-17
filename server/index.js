const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const massive = require( 'massive' );
const cors = require( 'cors' );
require( 'dotenv' ).config();
const products_controller = require( './products_controller' );

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

massive( process.env.CONNECTION_STRING ).then( database => {
    app.set( 'db', database );
});

app.post( '/api/product', products_controller.create );
app.get( '/api/products', products_controller.getAll );
app.get( '/api/product/:id', products_controller.getOne );
app.put( '/api/product/:id', products_controller.update );
app.delete( '/api/product/:id', products_controller.delete)


const PORT = 9000
app.listen(PORT, () => {
    console.log( `This port is over ${PORT}!!!` );
});