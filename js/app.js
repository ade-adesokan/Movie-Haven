
var searchField = $('#searchField');
var searchButton = $('#searchButton');
var url = "http://www.myapifilms.com/imdb";

searchButton.click(function(){
  var name = searchField.val();
  settings = {
  
    data: 'title="'+name+'"&format=JSONP&actors=S&trailer=1',
    dataType:  'jsonp',
    success:   function (response) {
      var videoURL = response[0].trailer.videoURL+"/imdb/embed?autoplay=false&width=480";
      //heading of movie
      var movieInfo = '<h1>'+name+'</h1>';
      //trailer
      movieInfo += '<iframe src="'+ videoURL+ '" width="480" height="270" frameborder="no" scrolling="no">'+'</iframe>';
      //Directors name
      movieInfo+= '<p>Director: '+response[0].directors[0].name+'</p>';
      //List of actors 
      movieInfo+= '<h2>Actors</h2>';
      movieInfo += '<ul id = "actorsList">';
      for (var i =0; i< response[0].actors.length; i++ ) {
        movieInfo+= '<li>'+response[0].actors[i].actorName+' as '+response[0].actors[i].character+'</li>';
      }
      movieInfo += '<p>' + response[0].plot + '</p>';
      
      
      $('#container').html(movieInfo);//show movie info
      
    }
  }
  $.ajax(url, settings);


});

