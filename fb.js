function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
	function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the app know the current login status of the person
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

    window.fbAsyncInit = function() {//will run as soon as SDK has finished loading
    FB.init({//intiaze the setup sdk
    	cookie   : true,//if enables the cookie can be used by web server
      appId      : '*************',//Obtain Your own API key from facebook developers
            xfbml      : true,//extended Fb Markup Langugae...intialize any fb plugin used in page using DOM
      version    : 'v2.2',
      status : true,
      //frictionlessrequest for games on facebook.com
      //status to get current login info default is false//manually retrieved through .getLoginStatus()
    });//can add more in javascript ..any code that you want to be run after SDK is loaded is placed here
    FB.getLoginStatus(function(response) {
    	statusChangeCallback(response);
  	});
  	/*
  	FB.api('/me',{fields:'last_name'},function(response){
  		alert(response);
  		if (!response || response.error) {
    		alert('Error occured');
  		} else {
    		alert('Post ID: ' + response.id);
  		}
  	});*/

  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";//en_US to use US english es_LA->spanish....sdk.js is minified version....debug.js is full version
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  function testAPI() {
    	console.log('Welcome!  Fetching your information.... ');
    	//console.log(response);
    	/*FB.api("/me?fields=id,first_name,last_name,gender,email,birthday,bio,hometown,education,quotes,cover,work,devices",
    	function (response) {
    		console.log(response);
    		document.getElementById('status').innerHTML =
            'Thanks for logging in, <br /><br />' 
            + response.bio + '<br />'
            + response.first_name+ '<br />'
            + response.last_name + '<br />'
            + response.email + '<br />'
            + response.gender + '<br />'
            + response.birthday + '<br />'
            + response.cover.id + '<br />'
            + response.quotes + '<br />'
            + response.hometown.name + '<br />'
            ;
        });*/
        /*
        FB.api("/me/feed","POST",{"message":"Hello World!"},function(response){
        	//console.log(response.authResponse);
        	//if(response.authResponse){
        		//console.log(response.authResponse.accessToken);
        		console.log(response);
        	console.log("Here");
        	console.log(response.authResponse.accessToken);
        	if(!response || response.error)
        	{
        		alert("error");
        	}
        	else
        	{
        		alert(response.id);
        	}
        //}
        });*/
        FB.api("/me/feed",function(response){
        	console.log(response);
        	//console.log("2");
        	if(!response||response.error)
        	{
        		alert("error");
        	}
        	else
        	{
        		var currDate='YYYY-MM-DD';//refrence date ...posts made on our profile after this date will be affected
        		var mx=response.data.length;
        		//alert(mx);
        		var msg=["Dhanyawad...:v","Thank You!....:v","Thanks...:D","Thanks a lot!..;)","Thnq..:)","Thanx..:D"];
        		for(var index=0;index<mx;index++)
        		{
	        		var tm=response.data[index].created_time;
	        		//alert(tm);
	        		//alert(currDate)
	        		var idx=Math.floor(Math.random()*5);
	        		if(tm>=currDate)
	        		{
	        			//alert("yes");
	        			var user1=response.data[index].from.name;
	        			if(user1=='Tarun Garg')
	        			{
	        				index++;
	        				continue;
	        			}
	        			//alert(msg[idx]);
	        			var id=response.data[index].id;
	        			//alert(response.data[index].comments);
	        			if(response.data[index].comments == undefined)
	        			{
	        				//alert("finished");
	        				FB.api("/"+id+"/comments","POST",{"message":msg[idx]+"  "+user1},function(res){
	        					if(!res||res.error)
	        					{
	        						alert("WTF!");
	        					}
	        					else
	        					{
	        						document.getElementById('status').innerHTML+="<Br> Message posted on status of "+user1;      					
	        					}
	        				});

						}
	        		}
	        		else
	        		{
	        			break;
	        		}
	        	}
        	}
        });
        /*FB.api("/561781800588254_562762293823538/comments","POST",{"message":"Ye hota h comment",function(response){
        		console.log(response);
        		if(!response||response.error)
        		{
        			alert("error");
        		}
        		else
        			alert("yes");
        });*/

    }
