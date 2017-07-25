var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(':memory:');
//var db = new sqlite3.Database('tw-feedback.db');
let db = new sqlite3.Database('tw-feedback.db');

db.run('CREATE TABLE feedbacks(name text)');


// db.serialize(function() {
//   db.run("CREATE TABLE IF NOT EXISTS feedbacks (the_id integer, card_number text, rated_score int, rated_name text, location_code text, location_name text, date_created text )" );

//   var stmt = db.prepare("INSERT INTO feedbacks VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run(i, "cardnumber_" + i, 3, "Good", "TW007", "TW Saigon Center", "date_time" );
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM feedbacks", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });

// });

db.close();