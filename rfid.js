//let $ = require('jquery') 

/*jslint node: true */
//"use strict";

//var HID = require('..');
var HID = require('node-hid');
var device = new HID.HID(65535, 53);

var hid_table = {
  04: 'a', 05: 'b', 06: 'c', 07: 'd', 08: 'e', 09: 'f',
  10: 'g', 11: 'h', 12: 'i', 13: 'j', 14: 'k', 15: 'l',
  16: 'm', 17: 'n', 18: 'o', 19: 'p', 20: 'q', 21: 'r',
  22: 's', 23: 't', 24: 'u', 25: 'v', 26: 'w', 27: 'x',
  28: 'y', 29: 'z', 30: '1', 31: '2', 32: '3', 33: '4',
  34: '5', 35: '6', 36: '7', 37: '8', 38: '9', 39: '0',
  46: '=', 56: '/'
};

var shift_hid_table = {
  04: 'A', 05: 'B', 06: 'C', 07: 'D', 08: 'E', 09: 'F',
  10: 'G', 11: 'H', 12: 'I', 13: 'J', 14: 'K', 15: 'L',
  16: 'M', 17: 'N', 18: 'O', 19: 'P', 20: 'Q', 21: 'R',
  22: 'S', 23: 'T', 24: 'U', 25: 'V', 26: 'W', 27: 'X',
  28: 'Y', 29: 'Z', 46: '+'
};

function addID(name, email) {
   if(true){
      sno++
      let updateString = '<li> Card: '+ sno + ''+ name +'' + email +'</li>'
      $('#id-list').append(updateString)
   }
}

var buffer = '';

device.on('data', function(data) {
    var msg = 'xxxzz';
    var key = data[2];
    table = hid_table;

    var buttonState = data[0];
    //console.log('data 0: ' + data[0] + ', data 1: ' + data[1] + ', data 2: ' + data[2] + ', data 3: ' + data[3] + ', data 4: ' + data[4]);
    if( buttonState === 0x17 ) {
        msg = "Lid opened!";
    } else if( buttonState === 0x16 ) {
        msg = "Button pushed!";
    } else if( buttonState === 0x15 ) {
        msg = "waiting...";
    }

    if (table[key]) buffer += table[key];
    else if (key == 40) {
        console.log("Card ID: ", buffer);
        var datum = Date.now();
        console.log("Date: ", datum);
        //addID(datum +  ' The ID ', buffer);
        //$cope.khd = "";
        var the_link = window.location.href; //works
        console.log("the link: ", the_link, buffer); 
        //location.href = "#!/showBalance?card_id=" + buffer; 
        location.href = "#!/giveFeedbackPage?card_id=" + buffer; 
        buffer = '';
    }

    //console.log('button data', data, msg);
});
