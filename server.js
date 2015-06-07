/*--------------------------------------------------

app.js
App

-------------------------------------------------- */




/*
    --- Imports ---
*/

var path = require( 'path' );
var async = require( 'async' );
var multer = require( 'multer' );
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var db = require( './db' );



/*
    --- Locals ---
*/

var app = express();
var port = 8080;



/*
    --- Init ---
*/

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( multer( { dest: './audio/' } ) );



/*
    --- Routes ---
*/

// Ask a new question
app.post( '/ask', function( req, res ) {
    // DEBUG
    console.log( 'ask' );
    console.log( req.files );

    // params
    var audio = req.files[ 'audio' ];
    var length = req.files[ 'length' ];

    // insert
    var params = {
        qid: -1,
        name: audio.name,
        length: length,
        status: 1,
    };

    db.query( 'INSERT INTO qas SET ?', params, function( result ) {
        res.json({
            status: 'ok',
            message: audio.name,
        });
    }, function( error ) {
        // DEBUG
        console.log( error );

        res.json({
            status: 'err',
            message: 'Unable to process your request.',
        });
    });;
});


// Get all asked questions
app.get( '/list', function( req, res ) {
    // DEBUG
    console.log( 'list' );

    var params = [ -1 ];
    db.query( 'SELECT * FROM qas WHERE qid=? ORDER BY length DESC, created DESC', params, function( questions ) {
        // async
        async.forEachOf( questions, function( question, index, asyncCB ) {
            var params = [ question.id ];
            db.query( 'SELECT * FROM qas WHERE qid=? ORDER BY length DESC, created DESC', params, function( answers ) {
                // overwrite
                questions[ index ] = {
                    name: question.name,
                    length: question.length,
                    date: question.created.getTime(),
                    answers: answers.length,
                };

                // keep going
                asyncCB();
            }, asyncCB );
        }, function( error ) {
            if ( error ) {
                // DEBUG
                console.log( error );

                // if so, callback fail with the error and exit out
                res.json({
                    status: 'err',
                    message: 'Unable to process your request.',
                });

                return;
            }

            // success
            res.json({
                status: 'ok',
                message: questions,
            });
        });
    }, function( error ) {
        // DEBUG
        console.log( error );

        res.json({
            status: 'err',
            message: 'Unable to process your request.',
        });
    });
});




/*
    --- Start ---
*/
app.listen( port );
