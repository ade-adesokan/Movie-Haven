
var searchField = $('#searchField');
var searchButton = $('#searchButton');
var url = "http://www.myapifilms.com/imdb";

searchButton.click(function(){
  searchField.prop('disabled', true);
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
      movieInfo+= '<div id = "content">'+'<p><span>Director:</span> '+response[0].directors[0].name+'</p>';
      //List of actors 
      movieInfo+= '<h3>Actors</h3>';
      movieInfo += '<ul id = "actorsList">';
      for (var i =0; i< response[0].actors.length; i++ ) {
        movieInfo+= '<li>'+response[0].actors[i].actorName+' as <span>'+response[0].actors[i].character+ '</span>'+'</li>';
      }
      movieInfo += '</ul>';
      //year of movie
      movieInfo += '<p><span>Year of Movie:</span> '+response[0].year+'</p>';
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
      movieInfo += '<p><span>Rating:</span> '+response[0].rating+'</p>'+'</div>';
      
      
      $('#loading').hide();   
      searchField.prop('disabled', false);
      $('#container').html(movieInfo);//show movie info
      $('#container').show();
      $('html').css('height', '100%')
      $('html').css('background', 'url("../images/backgroundImage.jpg") no-repeat');
     
    }
  }
  $.ajax(url, settings);


});

