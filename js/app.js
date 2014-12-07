
var searchField = $('#searchField');
var searchButton = $('#searchButton');
var url = "http://www.myapifilms.com/imdb";

searchButton.click(function(){
  $('#loading').show();
  var name = searchField.val();
  settings = {
  
    data: 'title="'+name+'"&format=JSONP&actors=S&trailer=1',
    dataType:  'jsonp',
    success:   function (response) {
      var videoURL = response[0].trailer.videoURL+"/imdb/embed?autoplay=false&width=480";
      //heading of movie
      var movieInfo = '<h1>'+response[0].title+'</h1>';
      //trailer
      movieInfo += '<iframe src="'+ videoURL+ '" width="480" height="270" frameborder="no" scrolling="no">'+'</iframe>';
      //plot
      movieInfo += '<div id = "plot">'+'<h3>Plot of Movie'+'</h3>';
      movieInfo += '<p>' + response[0].plot + '</p>' +'</div>';
      
      //Directors name
      movieInfo+= '<div id = "content">'+'<p>Director: '+response[0].directors[0].name+'</p>';
      //List of actors 
      movieInfo+= '<h3>Actors</h3>';
      movieInfo += '<ul id = "actorsList">';
      for (var i =0; i< response[0].actors.length; i++ ) {
        movieInfo+= '<li>'+response[0].actors[i].actorName+' as '+response[0].actors[i].character+ '</li>';
      }
      movieInfo += '</ul>';
      //year of movie
      movieInfo += '<p>Year of Movie: '+response[0].year+'</p>';
      //Location
      movieInfo += '<h3>Locations'+'</h3>';
      movieInfo += '<ol id = "locations">';
      for (var i =0; i< response[0].filmingLocations.length; i++ ) {
        movieInfo+= '<li>'+response[0].filmingLocations[i]+'</li>';
      }
      movieInfo += '</ol>'; 
      //genres
      movieInfo += '<h3>Genres'+'</h3>';
      movieInfo += '<ol id = "genres">';
      for (var i =0; i< response[0].genres.length; i++ ) {
        movieInfo+= '<li>'+response[0].genres[i]+'</li>';
      }
      movieInfo += '</ol>'; 
      //rating
      movieInfo += '<p>Rating: '+response[0].rating+'</p>'+'</div>';
      
      $('#loading').hide();   
      
      $('#container').html(movieInfo);//show movie info
      $('#container').show();
    }
  }
  $.ajax(url, settings);


});

