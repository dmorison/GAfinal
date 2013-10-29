/*Declare variables*/

var dist;
var units;
var hrs;
var mins;
var avespd
var x;

/*Object describing animals and their speed values in miles per hour*/
var petspd = {
	tortoise: 0,
	mosquito: 1,
	hamster: 4,
	otter: 5,
	mouse: 8,
	goat: 10,
	pig: 11,
	donkey: 13,
	possum: 15,
	badger: 17,
	jackal: 20,
	bear: 22,
	gorilla: 25,
	elephant: 30,
	camel: 40,
	superman: 100,
};

/*Array of the animals in the order of the above object, this was used for looping through 
the object to fing the appropriate speed match and then to extract the associated animal*/
var pets = [
	"tortoise",
	"mosquito",
	"hamster",
	"otter",
	"mouse",
	"goat",
	"pig",
	"donkey",
	"possum",
	"badger",
	"jackal",
	"bear",
	"gorilla",
	"elephant",
	"camel",
	"superman"
];

/*list of countrys as objects*/
var alaska = {
	country: "Alaska",
	capital: "Juneau",
	meth: "Car",
	comtime: "10 minutes",
	animal: "Bear",
	animalspd: "22 mph",
};

var mexico = {
	country: "Mexico",
	capital: "Mexico City",
	meth: "Car",
	comtime: "1 hour",
	animal: "Armadillo",
	animalspd: "30 mph",
};

var australia = {
	country: "Australia",
	capital: "Canberra",
	meth: "Car",
	comtime: "20 minutes",
	animal: "Kangaroo",
	animalspd: "38 mph",
};

var uk = {
	country: "United Kingdom",
	capital: "London",
	meth: "Car",
	comtime: "41 minutes",
	animal: "Deer",
	animalspd: "43 mph",
};

/*name spaced grouped functions*/
CAL = {
	/*function carrying out the calculations and displaying results for the index page*/
	commute: function(){
		$('#calculate').click(function(){
			/*select the user distance input value and validate it*/
			dist = $('[name="distance"]').val();
			if (dist == null || dist == "") {
				alert("Please enter a valid distance for your commute");
				return false;
			} else {

				dist = parseInt(dist);
				/*determine from the radio selector whether the user has entered miles or
				kilometers*/
				if (document.getElementById('miles').checked) {
					units = "Miles";
				} else if (document.getElementById('kms').checked) {
					units = "Kilometers";
				}
				console.log(dist);
				console.log(units);
				console.log("I commute: " + dist + " " + units);
				/*select the user commuting time input values for hours and minutes and
				validate them*/
				hrs = $('[name="hours"]').val();
				mins = $('[name="minutes"]').val();
				if (hrs == null || hrs == "" || mins == null || mins == "") {
					alert("Please enter a valid number for either hours or minutes");
					return false;
				} else {

					hrs = parseInt(hrs);
					console.log(hrs);
					mins = parseInt(mins);
					console.log(mins);

					console.log("It takes me: " + hrs + " hours" + " " + mins + " minutes");
					/*calculate average speed of users commute*/
					mins = (hrs * 60) + mins;
					avespd = (dist / mins) * 60;
					console.log("I commute at a speed of: " + avespd + " " + units + "/hour");
					/*convert kilometers into miles to match animal speeds in miles per hour*/
					if (units === "Kilometers") {
						dist = dist / 1.61;
						console.log("Converted Kilometers into Miles");
						avespd = (dist / mins) * 60;
						console.log("Therefore avespd now equals: " + avespd + " Miles/hour");
					}
					/*create an array to push the looped object properties into*/
					var myArr = [];
					/*loop through the object properties until the users commuting average
					speed is matched and push these into the array*/ 
					for (var prop in petspd) {
						if (avespd > petspd[prop]) {
							myArr.push(petspd[prop]);
							console.log(myArr); 
						}
					}
					/*determine the length of the new array and use this to find the matched
					animal from the declared animal array*/
					x = myArr.length - 1;
					petstwo = pets[x];

					console.log(petstwo);
					/*find the matching animal image from the folder to display*/
					$('#animalimg img').attr('src', "./images/" + petstwo + ".jpg");
					$('#animalimg figcaption').text(petstwo);
				}
			}
		});
	},
	/*function for the indigenous commuting page to display the properties of the selected
	country*/
	findCountry: function(){
		$('#calcountry').click(function(){
			var indig = $('#countryreg').val();
			console.log(indig);
			/*after determining the selected country the eval method is needed below to match
			the string being the country name to the country object and then display the
			countries facts in the page fields*/
			$('#country').text(eval(indig).country);
			console.log(eval(indig).country);

			$('#capital').text(eval(indig).capital);
			console.log(eval(indig).capital);

			$('#meth').text(eval(indig).meth);
			console.log(eval(indig).meth);

			$('#comtime').text(eval(indig).comtime);
			console.log(eval(indig).comtime);
			/*find the matching animal image from the folder to display*/
			$('#indigimg img').attr('src', "./images/" + eval(indig).animal + ".jpg");
			$('#indigimg figcaption').text(eval(indig).animal);
			console.log(eval(indig).animal);
			
			$('#indigspd').text(eval(indig).animalspd);
			console.log(eval(indig).animalspd);
		});
	},
	/*function to display the contact form when the contact link is clicked*/
	contact: function(){
		$('#contlink').click(function(){
			$('#contact').css('display', 'block');
		});
	},
	/*function to validate the user contact form input and return to page once submitted*/
	check: function(){
		$('#button').click(function(){
			/*declare each selected field as a variable*/
			var name = $('#name').val();
			var emailadd = $('#email').val();
			var msg = $('#usermsg').val();
			/*function to validate user name is greater than 3 characters*/
			function validateName(name){
				if (name.length < 3) {
					return false;
				} else {
					return true;
				}
			}
			/*function to validate user email again regex*/
			function validateEmail(email){
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if (!emailReg.test(email)) {
					return false;
				} else if (email == null || email == "") {
					return false;
				} else {
					return true;
				}
			}
			/*function to validate if there is text in the message field or not*/
			function validateMsg(msg){
				if (msg == null || msg == "") {
					return false;
				} else {
					return true;
				}
			}
			/*test each of the functions and set the error message to display or not*/
			if (!validateName(name)){
				$('#msgError').css('display', 'none'); /*in case the error message for the message field is showing from a previous input error it will be reset to display none*/
				$('#emailError').css('display', 'none'); /*in case the error message for the email field is showing from a previous input error it will be reset to display none*/
				$('#nameError').css('display', 'inline');
				return false;
			} else if (!validateEmail(emailadd)){
				$('#msgError').css('display', 'none'); /*in case the error message for the message field is showing from a previous input error it will be reset to display none*/
				$('#nameError').css('display', 'none'); /*reset display none for name field error message*/
				$('#emailError').css('display', 'inline');
				return false;
			} else if (!validateMsg(msg)){
				$('#nameError').css('display', 'none'); /*in case the error message for the name field is showing from a previous input error it will be reset to display none*/
				$('#emailError').css('display', 'none'); /*reset display none for email field error message*/
				$('#msgError').css('display', 'inline');
				return false;
			} else {
				console.log(name);
				console.log(emailadd);
				console.log(msg);
				$('#userinput').html('<p>Thank you for your message!</p>');
			}
			
		});
	}

}

$(document).ready(function(){

	CAL.commute();
	CAL.findCountry();
	CAL.contact();
	CAL.check();

});

