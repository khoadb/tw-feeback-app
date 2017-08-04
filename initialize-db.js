/*
 * Khoa Do, 27.07.2017
 * Initilize the SQLite Database when Electron App is started,
 * make sure that the sqlite Database "tw-feedback.db" exists,
 * If not exists it will be created once.
 *
 * Table properties:
 * 
 * survey_question TEXT => i.e. How was our service today?
 * card_number TEXT     => card number 
 * rated_score INT      => feedback score by customer, i.e. [1, 2, 3, 4, 5]
 * rated_name TEXT      => feedback name,  i.e. Good, Poor, Great, etc.
 * location_code TEXT   => i.e. TW_001
 * location_name TEXT   => i.e. TW Saigon Center
 * date_created INTEGER => time in miliseconds from 1970
*/ 

var sqlite3 = require('sqlite3').verbose();
var cfg = require('./config/config'); 
//let db = new sqlite3.Database('db/tw-feedback.db');
var db_filename =  'db/tw-feedback_'+ cfg.location_code + '.db'; 
var db = new sqlite3.Database(db_filename);
db.run("CREATE TABLE IF NOT EXISTS feedbacks (survey_question text, card_number text, rated_score int, rated_name text, location_code text, location_name text, date_created integer, date_string text)" );
db.close();
