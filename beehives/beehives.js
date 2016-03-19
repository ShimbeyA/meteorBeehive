Mites = new Mongo.Collection("mites");

Router.route('/home', function () {
  
      this.render ('miteBeehive'); //render mitebeehive template 
      this.layout('layout');
  
  });
Router.route('/admin', function () {
  this.render('observe');
  this.layout('layout');
});

Router.route('/export', function () {
  this.render('observe');
  this.layout('layout');
});


Router.route('/hive/:name', function () {
 this.render('hiveName', {
   data: function (){
     return {
      hiveName: Observation.find({name: this.params.name})
     }
   }
  });
  
    this.layout('layout');
  }, {
    name: 'hiveName.show'
  });


Router.route('/mites/:_id', function () {
  //data is a specific keyword in meteor that
  //calls on message that was entered
  this.render('mites', {
    data:function() {
      return Mites.findOne({_id: this.params._id});
    }
  });
  
  this.layout('layout');
  },
  {
    name: 'mites.show'
  }
  );

if (Meteor.isClient) {
  
  Meteor.subscribe("mites");
  
  Template.miteBeehive.helpers({
    "mites": function() {
      return Mites.find( {}, {sort:{createdOn: -1}}) || {};
    //return all mites objects or an empty object if
    //DB is invalid
    }
  });
  
  Template.miteBeehive.events(
      {
        "submit form": function(event){
          event.preventDefault();
          
          var nameBox=
          $(event.target).find('input[name=miteName]');
          
          var nameText= nameBox.val();
          
          var observationBox=
          $(event.target).find('input[name=miteObservation]');
          
          var observationText= observationBox.val();
          
          var periodBox=
          $(event.target).find('input[name=mitePeriod]');
          
          var periodText= periodBox.val();
          
          var countBox=
          $(event.target).find('input[name=miteCount]');
          
          var countText= countBox.val();
          
          if (nameText.length > 0 && periodText > 0)
          {
            Mites.insert(
            {
              name: nameText,
              observation :observationText,
              period: periodText,
              count : countText,
              createdOn: Date.now(),
            });
            
          nameBox.val("");
          observationBox.val("");
          periodBox.val("");
          countBox.val("");
         // alert("Name is " + nameText + ", msg is " + messageText);
      }
     else{
        //alert
        console.log(nameBox)
        nameBox.classList.add("has-warning");
        
        console.log(observationBox)
        observationBox.classList.add("has-warning");
        
        console.log(periodBox)
        periodBox.classList.add("has-warning");
        
        console.log(countBox)
        countBox.classList.add("has-warning");
      }
      }
      }      
      );
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  Meteor.publish("mites", function() {
    return Mites.find();
  });
  
}
