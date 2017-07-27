var request = require('request');
var util = require ('util');
//humanize time
//var ago = require('s-ago');

const path = require('path')

var mainApp = angular.module("mainApp", ['ngRoute', 'ngResource', 'keyboard']);
//khd: define global var
//mainApp.value('guestFeeback', 0);

mainApp.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/giveFeedbackPage', {
      templateUrl: 'views/give-feedback-screen2.html', controller: 'giveFeedbackCtrl'
   }).

   when('/welcomePage', {
      templateUrl: 'views/welcome-screen.html', controller: 'welcomeCtrl'
   }).
   
   when('/showBalance', {
      templateUrl: 'views/show-balance.html', 
      controller: 'BalanceController'
   }).

   when('/showCardInfo', {
      templateUrl: 'views/show-cardInfo.html', 
      controller: 'BalanceController'
   }).

   when('/showVideo', {
      templateUrl: 'views/landing-screen.html', controller: 'VideoController'
   }).

   when('/showVoted', {
      templateUrl: 'views/voted-screen.html', controller: 'VotedController'
   }).
   
   otherwise({
      redirectTo: '/welcomePage'
   });
	
}]);


mainApp.controller('LandingCtrl', function($rootScope, $scope, $location, $timeout, nfcPhonesService) {
	
	$scope.message = "This page will be used to display add student form";

	//nfcPhonesService.getPhones();


	var todoList = this;
	//var todoList = {};
    todoList.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];
 
    // todoList.addTodo = function() {
    //   todoList.todos.push({text:todoList.todoText, done:false});
    //   todoList.todoText = '';
    // };
 
    // todoList.remaining = function() {
    //   var count = 0;
    //   angular.forEach(todoList.todos, function(todo) {
    //     count += todo.done ? 0 : 1;
    //   });
    //   return count;
    // };
 
    // todoList.archive = function() {
    //   var oldTodos = todoList.todos;
    //   todoList.todos = [];
    //   angular.forEach(oldTodos, function(todo) {
    //     if (!todo.done) todoList.todos.push(todo);
    //   });
    // };

    console.log("Show default landing stuffs..!", todoList.todos);

    //simulate card tap
 //    $timeout(function(){ 
 //  		logged_in = true;
 //  		$location.path("/showVideo"); 
	// },3000);

})

//KHD: 20.07.2017
mainApp.controller('welcomeCtrl', function($rootScope, $scope, $location) {
  
    $scope.message = "This page is the welcome screen";
    console.log("Show default welcome screen..!");

    //simulate card tap
 //    $timeout(function(){ 
 //     logged_in = true;
 //     $location.path("/showVideo"); 
  // },3000);
})
 
  

//khd: 19.07.2017
mainApp.controller('VotedController', function ($rootScope, $scope, $location, $timeout, WCFService, votingService) {
  
  $scope.message = "This the Voted controller.";

  var todoList = this;
  //var todoList = {};
    todoList.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];
 
  //var fb = mainApp.value('guestFeeback'); 
  $scope.guestFeeback = votingService.getVoteObject();
  //$scope.message.voted = guestFeeback.name;
  $scope.the_customer = votingService.getCustObject();

  console.log("Show Voted screen..!");

    $timeout(function(){ 
      logged_in = true;
      $location.path("/showBalance"); 
  },100000);

    console.log('end timeer: ');  
    
})


//KHD 14.07.2017
//Tset controller to navigate through list with key-presss
mainApp.controller('giveFeedbackCtrl', function ($scope, $window, $location, votingService , $timeout, $routeParams, testWCFService, DBService) {
  console.log("running testControler");
  //$scope.console = $window.console;


  //reset scope values
  $scope.customer_info = {};
  //$scope.customer_trans = {};

  //khd, get the params:
  var param1 = $routeParams.card_id;
  console.log("Paramenter are: ", param1);

 //get customer information
  testWCFService.getCustInfo(param1)
        .then( function(response) {
          console.log('getCustInfo - Raw data: ', response);
          console.log('Data: ', response.data);
          console.log('Data.lenght: ', response.data.length);
          $scope.customer_info = response.data;
        }, function(response) {
          console.log("error...");
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        //console.log('nfcUseCasesService response with an error', status);
        });


  $scope.fn_load = function () {
    console.log("page load")
    var element = $window.document.getElementById('vote-area');
    if(element)
      element.focus();
  };
  
  $scope.records = [];

  // for (var i = 1; i <= 5; i++) {
  //   $scope.records.push({ id: i, navIndex: i, name: 'record ' + i});
  // }

  // $scope.records.push({ id: 1, navIndex: 1, name: 'Excelent ', name_vn: 'Rất tốt'});
  // $scope.records.push({ id: 2, navIndex: 2, name: 'Good ',     name_vn: 'Tốt'});
  // $scope.records.push({ id: 3, navIndex: 3, name: 'OK ',       name_vn: 'Bình thường'});
  // $scope.records.push({ id: 4, navIndex: 4, name: 'Poor',      name_vn: 'Chán'});
  // $scope.records.push({ id: 5, navIndex: 5, name: 'Terrible',  name_vn: 'Không hài lòng'});

  //reverse
  
  $scope.records.push({ id: 5, navIndex: 5, name: 'Terrible',  name_vn: 'Không hài lòng'});
  $scope.records.push({ id: 4, navIndex: 4, name: 'Poor',      name_vn: 'Chán'});
  $scope.records.push({ id: 3, navIndex: 3, name: 'OK ',       name_vn: 'Bình thường'});
  $scope.records.push({ id: 2, navIndex: 2, name: 'Good ',     name_vn: 'Tốt'});
  $scope.records.push({ id: 1, navIndex: 1, name: 'Excelent ', name_vn: 'Rất tốt'});

  //set default focus
  $scope.focusIndex = 2;
  
  $scope.open = function ( index ) {
    //var record = $scope.shownRecords[ index ] if use filter
    var record = $scope.records[ index ]

    //guestFeeback = record;
    // votingService.setString(record);
    votingService.setVoteObject(record);
    votingService.setCustObject($scope.customer_info);

    console.log('opening : ', record );
    //$scope.guestFB = record;
    //guestFeeback = record;

    //khd: do something here when "enter key is pushed"
    console.log("Enter ist gedruckt, macht was..."); 
    //store vote in DB
    DBService.storeVote(record);
    
    $location.path("/showVoted");

  };
  
  
  $scope.keys = [];

  //code: 13 = enter
  $scope.keys.push({ code: 13, action: function() { 
     $scope.open( $scope.focusIndex ); 
  }});

  //if up-key is pressed (38)
  $scope.keys.push({ code: 38, action: function() {
     $scope.focusIndex--;
     //khd
     if ($scope.focusIndex < 0)
       $scope.focusIndex = 0;
  }});

  //if down-key is pressed (40)
  $scope.keys.push({ code: 40, action: function() {
      if ($scope.focusIndex < 4) 
        $scope.focusIndex++; 
  }});


  //khd
  $scope.keydown = function() {
        /* validate $scope.mobileNumber here*/
    console.log("The key is down.");
  };
  
  $scope.$on('keydown', function( msg, obj ) {
    //console.log("The key is donw.");

   //khd: 19.07.2017 need to enclosed in $timeout, otherwise error of $$nextSibling' of null
   //ref: https://github.com/angular-ui/bootstrap/issues/1128
   $timeout(function() { 
    var code = obj.code;
    $scope.keys.forEach(function(o) {
      if ( o.code !== code ) { return; }
      o.action();
      $scope.$apply();
    });
  }, 0); //timelout

  });
  
});

mainApp.directive('keyTrap', function($timeout) {
  return function (scope, elem) {
    elem.bind('keydown', function( event ) {
      console.log("keytrap - keydown");
      scope.$broadcast('keydown', { code: event.keyCode } );
    });
  };
});

//https://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
mainApp.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                console.log("Enter gedruckt!");
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});


//khd, some customer filter
mainApp.filter('reverse', function() {
  return function(input, uppercase) {
  	//console.log("input a: ", input, uppercase); 
    input = input || '';
    var out = '';
    for (var i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }
    // conditional based on optional argument
    if (uppercase) {
      out = out.toUpperCase();
    }
    return out;
  };
})


mainApp.service('WCFService', function () {
  this.getCardInfo = function() {
  	//var filename = path.join(__dirname, '/assets/test.json')
    //console.log('filename: ', filename);

    // existed customer
	//getCustomerInfo("300000000511");
	// transactions of existed customer
    var trans = getCustomerTransactions("1646667492", 20);
    //var mydata = JSON.parse(trans);
    console.log("trans data", trans);
    //return mydata;
  };

});



mainApp.service('testWCFService', function ($http) {
  this.getCustInfo = function(card_id) {

    //test card '1646667492'
  	var cardID = card_id || '12345679';
  	//$httpProvider.defaults.headers.get = { 'My-Header' : 'value' };
  	var auth = { 'Authorization' : 'UI97pEi1rrcjr8lovGNWYC1k975PM9' };
  	var config = { 'headers' : auth };
    
    return $http.get('http://115.75.6.184:2893/RestServiceImpl.svc/cards/' + cardID, config);
  };

  this.getCustTrans = function(card_id) {

  	//test card '1646667492'
  	var cardID = card_id || '12345679';

  	var limit = 200;
  	//$httpProvider.defaults.headers.get = { 'My-Header' : 'value' };
  	var auth = { 'Authorization' : 'UI97pEi1rrcjr8lovGNWYC1k975PM9' };
  	var config = { 'headers' : auth };
    
    var url = 'http://115.75.6.184:2893/RestServiceImpl.svc/transactions/get_by_nfc/' + cardID + '?limit=' + limit;
    console.log("New Strung URL: ", url); 

    return $http.get( url, config ) ;
  };

});


mainApp.service('DBService', function(votingService) {

    var cfg = require('./config/config');    
    var stringValue = 'test string value';
    var objectValue = {
        data: 'test object value'
    };

    var voteObject = {};
    var custObject = {}; //Customer object, get via card ID
    
    return {
        storeVote: function(data) {
			
		   var sqlite3 = require('sqlite3').verbose();
           var db = new sqlite3.Database('db/tw-feedback.db');
           var date = new Date(); 
			 
		   //db.serialize(function() {
		   // var stmt = db.prepare("INSERT INTO feedbacks VALUES (?, ?, ?, ?, ?, ?)");
           //  stmt.run("cardnumber_xxx", 3, "Good", "TW007", "TW Saigon Center", date);
           // stmt.finalize();
		   //	});
		   
		   //$scope.records.push({ id: 1, navIndex: 1, name: 'Excelent ', name_vn: 'Rất tốt'});
		   var vote = votingService.getVoteObject();
           var cust = votingService.getCustObject();
           console.log("start storing", vote, cust);
           
		   db.run("INSERT INTO feedbacks VALUES (?, ?, ?, ?, ?, ?, ?)", [cfg.survey_question, cust.nfc_code, vote.navIndex, vote.name, cfg.location_code, cfg.location_name, date], function(err) {
			   if (err) {
				   return console.log("sqlerror: " + err.message);
			   }
			   //get the last insert id
			   console.log("A row has been inserted with rowid");
		   });

		   db.close();

        }
    }
});



mainApp.service('votingService', function() {
    var stringValue = 'test string value';
    var objectValue = {
        data: 'test object value'
    };

    var voteObject = {};
    var custObject = {}; //Customer object, get via card ID
    
    return {
        getVote: function() {
            return stringValue;
        },
        setVote: function(value) {
            stringValue = value;
        },
        getObject: function() {
            return objectValue;
        },
        getVoteObject: function() {
            return voteObject;
        },
        setVoteObject: function(data) {
            voteObject = data;
        },
        setCustObject: function(customer) {
            custObject = customer;
        },
        getCustObject: function() {
            return custObject;
        }

    }
});



function wcfRequest(method, uriPath, params, callback){
	if (typeof params === 'function') {
    	callback = params;
    	params = {};
	}

  	//params.uri = "http://192.168.8.32:2893/RestServiceImpl.svc" + uriPath;
  	params.uri = "http://115.75.6.184:2893/RestServiceImpl.svc" + uriPath;
  	params.json = true;
  	params.headers = params.headers || {};
  	params.headers.Authorization = "UI97pEi1rrcjr8lovGNWYC1k975PM9";
  	params.method = method.toUpperCase();

  	request(params, callback);
}


/* 
Input params:
	- nfcCode: nfc-code on the customer card
	- limit: number of transactions, default is 10
Response:
	- 200: get success
	- others: get failed. Check body to details
*/
function getCustomerInfo(nfcCode) {
	wcfRequest('get', '/cards/' + nfcCode, callback);

	function callback(err, response, body) {
		if (err) {
			console.log("Some errors occurred: ", err);
			return;
		}

		if (response.statusCode === 200) {
			//console.log("Yup, customer info:", JSON.stringify(body, null, 4))
		} else {
			console.log("Response code", response.statusCode)
			console.log("Response body", body)
		}
	}
}

/* 
Input params:
	- nfcCode: nfc-code on the customer card
	- limit: number of transactions, default is 10. Transansaction was sort from newest to oldest
Response:
	- 200: get success
	- others: get failed. Check body to details
*/
function getCustomerTransactions(nfcCode, limit = 50) {
	var url = util.format("/transactions/get_by_nfc/%s?limit=%d", nfcCode, limit);
	console.log(url);
	wcfRequest('get', url, callback);

	function callback(err, response, body) {
		if (err) {
			console.log("Some errors occurred: ", err);
			return;
		}

		if (response.statusCode === 200) {
			console.log("Yup, customer transactions:", JSON.stringify(body, null, 4))
		} else {
			console.log("Response code", response.statusCode)
			console.log("Response body", body)
		}
	}

}


function w_Pressed() {
   // Your stuff here
   console.log("W Buchstabe Pressed!");
}
function a_Pressed() {
   // Your stuff here
   console.log("A Buchstabe Pressed!");

}
function d_Pressed() {
   // Your stuff here
   console.log("D Buchstabe Pressed!");
}

function z_Pressed() {
   // Your stuff here
   console.log("Z Buchstabe Pressed!");

}

function rightArrowPressed() {
   // Your stuff here
   console.log("rightArrowPressed!");
}
function leftArrowPressed() {
   // Your stuff here
   console.log("leftArrowPressed!");
}
function upArrowPressed() {
   // Your stuff here
   console.log("upArrowPressed!");
}
function downArrowPressed() {
   // Your stuff here
   console.log("downArrowPressed!");
}

//https://www.w3schools.com/jsref/event_key_keycode.asp
//https://ole.michelsen.dk/blog/navigate-form-fields-with-arrow-keys.html
//https://jonlabelle.com/snippets/view/html/navigate-html-text-input-fields-with-arrow-keys
//http://jsfiddle.net/Vtn5Y/
//https://stackoverflow.com/questions/8902787/navigate-through-list-using-arrow-keys-javascript-jq




document.onkeydown = function(evt) {
    evt = evt || window.event;
    //console.log("evt.keyCode: ", evt.keyCode);
    //keyPressed(evt);

    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
        case 38:
            upArrowPressed();
            break;
        case 40:
            downArrowPressed();
            break;        
        case 87:
            w_Pressed();
            break; 
        case 65:
            a_Pressed();
            break;
        case 68:
            d_Pressed();
            break;
        case 90:
            z_Pressed();
            break;               
    }
};


function keyPressed(e) {
    console.log("Key is pressed: ", e);
    var li = $('li');
    var liSelected;

    if(e.which === 40){
        if(liSelected){
            liSelected.removeClass('selected');
            next = liSelected.next();
            if(next.length > 0){
                liSelected = next.addClass('selected');
            }else{
                liSelected = li.eq(0).addClass('selected');
            }
        }else{
            liSelected = li.eq(0).addClass('selected');
        }
    }else if(e.which === 38){
        if(liSelected){
            liSelected.removeClass('selected');
            next = liSelected.prev();
            if(next.length > 0){
                liSelected = next.addClass('selected');
            }else{
                liSelected = li.last().addClass('selected');
            }
        }else{
            liSelected = li.last().addClass('selected');
        }
    }

}


function keyPressed_2(e) {
    console.log("Key is pressed: ", e);

    var srcElement = e.target;    // get the element that fired the onkeydown function
    var dataset = false;
    var selectList = false;
    var next = "";
    var prev = "";
    if (srcElement.dataset) {        // can we use HTML5 dataset?
        dataset = true;              // remember for later
        // is this an element for which we care
        if (srcElement.dataset.selectlist == 'true') {
            selectList = true;
        }
    } else {    // can't use HTML5 dataset, use getAttribute
        if (srcElement.getAttribute('data-selectlist') == 'true') {
            selectList = true;
        }
    }
    // is it a select element and the user pressed either up arrow or down arrow
    // up: 38, down: 40
    // left:37, right: 39

    if (selectList && (e.keyCode == '37' || e.keyCode == '39')) {
        // get the next and prev navigation options for this element
        if (dataset) {
            next = srcElement.dataset.next;
            prev = srcElement.dataset.prev;
        } else {
            next = srcElement.getAttribute('data-next');
            prev = srcElement.getAttribute('data-prev');
        }
        // up arrow was pressed and a prev element is defined
        if (e.keyCode == '38' && prev != '') {
            document.getElementById(prev).focus();
        }
        // down arrow was pressed and a next element is defined
        if (e.keyCode == '40' && next != '') {
            document.getElementById(next).focus();
        }
        // don't do native processing of the up or down arrow (page scrolling)
        e.preventDefault;
    }
}


