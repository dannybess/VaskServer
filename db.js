/*--------------------------------------------------

db.js
DB

-------------------------------------------------- */

var mysql = require( 'mysql' );



var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'vask',
    database: 'vask',
});


var query = function( sql, params, cb, err ) {
    db.query( sql, params, function( error, rows ) {
        ! error ? cb( rows ) : err( error );
    });
};



module.exports = {
    'query': query,
};
