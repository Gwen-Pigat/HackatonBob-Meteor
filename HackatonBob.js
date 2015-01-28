Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

  Accounts.ui.config({
    requestPermissions: {
      facebook: ['user_likes'],
      github: ['user','repo']
    },
    requestOfflineToken: {
      google: true
    },
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });

   Template.body.helpers({
     tasks: function(){
       return Tasks.find({createdBy: Meteor.userId()}, {sort: {createdAt: -1}});
   }
});

  Template.body.events({
    "submit": function (event) {

      	var adresse = event.target.adresse.value;

      Meteor.call ('geoCoder', adresse, function (error,result) {
      	var lat = result[0].latitude;
      	var lon = result[0].longitude; 

      Meteor.call ('getMeteo', lat, lon, function (err,res) {
        var summaryweather = res.data.hourly.data[0].summary;
        // var tem = result[0].timezone;
          var windSpeed = res.data.currently.windSpeed * 1.609;
          var windSpeed2 = res.data.daily.data[2].windSpeed * 1.609;
          var windSpeed3 = res.data.daily.data[3].windSpeed * 1.609;
          var windSpeed4 = res.data.daily.data[4].windSpeed * 1.609;
          var windSpeed5 = res.data.daily.data[5].windSpeed * 1.609;
          var windSpeed6 = res.data.daily.data[6].windSpeed * 1.609;
          var windSpeed7 = res.data.daily.data[7].windSpeed * 1.609;
          var windSpeedrond = Math.floor(windSpeed);
          var windSpeedrond2 = Math.floor(windSpeed2);
          var windSpeedrond3 = Math.floor(windSpeed3);
          var windSpeedrond4 = Math.floor(windSpeed4);
          var windSpeedrond5 = Math.floor(windSpeed5);
          var windSpeedrond6 = Math.floor(windSpeed6);
          var windSpeedrond7 = Math.floor(windSpeed7);
           
          Tasks.insert({
                   adresse: adresse,
                  latitude: lat,
                 longitude: lon,
                   summary: summaryweather,
                  timezone: tem,
             windSpeedrond: windSpeedrond,
            windSpeedrond2: windSpeedrond2,
            windSpeedrond3: windSpeedrond3,
            windSpeedrond4: windSpeedrond4,
            windSpeedrond5: windSpeedrond5,
            windSpeedrond6: windSpeedrond6,
            windSpeedrond7: windSpeedrond7,
                 createdBy: Meteor.userId(),            
                 createdAt: new Date()
          })
          if (windSpeedrond >= 30){
            $(".spawn2").animate({"color" : "red"});
          }
          if (windSpeedrond <= 8){
            $(".spawn2").animate({"color" : "red"});
          }
          if (windSpeedrond2 >= 30){
            $(".rond2").animate({"color" : "red"});
          }
          if (windSpeedrond2 <= 8){
            $(".rond2").animate({"color" : "red"});
          }
          if (windSpeedrond3 >= 30){
            $(".rond3").animate({"color" : "red"});
          }
          if (windSpeedrond3 <= 8){
            $(".rond3").animate({"color" : "red"});
          }
          if (windSpeedrond4 >= 30){
            $(".rond4").animate({"color" : "red"});
          }
          if (windSpeedrond4 <= 8){
            $(".rond4").animate({"color" : "red"});
          }
          if (windSpeedrond5 >= 30){
            $(".rond5").animate({"color" : "red"});
          }
          if (windSpeedrond5 <= 8){
            $(".rond5").animate({"color" : "red"});
          }
          if (windSpeedrond6 >= 30){
            $(".rond6").animate({"color" : "red"});
          }
          if (windSpeedrond6 <= 8){
            $(".rond6").animate({"color" : "red"});
          }
          if (windSpeedrond7 >= 30){
            $(".rond7").animate({"color" : "red"});
          }
          if (windSpeedrond7 <= 8){
            $(".rond7").animate({"color" : "red"});
          }
        })
      })

      event.target.adresse.value = "";

      return false;
    },
     "click .dataremove": function () {
     	Tasks.remove(this._id);
     }
  });
}
  
if (Meteor.isServer) {

	Meteor.methods({
	
	geoCoder: function (adresse) {
		var geo = new GeoCoder();
		var result = geo.geocode(adresse);
		return result;
	},

  getMeteo: function (latitude, longitude) {
    var baseUrl = 'https://api.forecast.io/forecast/424559c4d88231fe3f5b2b10e8eb34c5/';
    return Meteor.http.get(baseUrl + latitude + ',' + longitude);
    }
  });
}