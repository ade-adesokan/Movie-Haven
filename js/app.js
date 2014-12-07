var movieHaven = {

  searchField : $('#searchField'), //search textbox

  searchButton : $('#searchButton'), //search button

  url : "http://www.myapifilms.com/imdb", //url for API

  //To disable search bar after clicking search and to display loading bar
  disableSearch : function () {
    movieHaven.searchField.prop('disabled', true);
    $('#loading').show();
  },

  //To remove loading bar after movie is found and to enable search bar again
  enableSearch : function () {
    $('#loading').hide();   
    movieHaven.searchField.prop('disabled', false);
  },

  //Execute function: to get movie information to display
  execute : function () {

    //call disableSearch
    movieHaven.disableSearch();
    
    //To get search field informatiom i.e movie title
    var name = movieHaven.searchField.val();

    //Settings Object to be fed into AJAX Call
    settings = {
      
      //data parameter
      data : 'title="' + name + '"&format=JSONP&actors=S&trailer=1',
      //datatype parameter, in this case JSONP
      dataType : 'jsonp',
      //Success Method
      success : function (response) {
        var videoURL = response[0].trailer.videoURL + "/imdb/embed?autoplay=false&width=480";
        //heading of movie
        var movieInfo = '<h1>' + response[0].title + '</h1>';
        //trailer
        movieInfo += '<iframe src="' + videoURL + '" width="480" height="270" frameborder="no" scrolling="no">' + '</iframe>';
        //plot
        movieInfo += '<div id = "plot">' + '<h3>Plot of Movie' + '</h3>';
        movieInfo += '<p>' + response[0].plot + '</p>' + '</div>';
        
        //Director's name
        movieInfo += '<div id = "content">' + '<p><span>Director:</span> ' + response[0].directors[0].name + '</p>';
        //List of actors 
        movieInfo += '<h3>Actors</h3>';
        movieInfo += '<ul id = "actorsList">';
        for (var i = 0; i < response[0].actors.length; i++ ) {
          movieInfo += '<li>' + response[0].actors[i].actorName + ' as <span>' + response[0].actors[i].character + '</span>' + '</li>';
        }
        movieInfo += '</ul>';
        //year of movie
        movieInfo += '<p><span>Year of Movie:</span> ' + response[0].year + '</p>';
        //Location
        movieInfo += '<h3>Locations' + '</h3>';
        movieInfo += '<ol id = "locations">';
        for (var i = 0; i < response[0].filmingLocations.length; i++ ) {
          movieInfo += '<li>' + response[0].filmingLocations[i] + '</li>';
        }
        movieInfo += '</ol>'; 
        //genres
        movieInfo += '<h3>Genres' + '</h3>';
        movieInfo += '<ol id = "genres">';
        for (var i = 0; i < response[0].genres.length; i++ ) {
          movieInfo += '<li>' + response[0].genres[i] + '</li>';
        }
        movieInfo += '</ol>'; 
        //rating
        movieInfo += '<p><span>Rating:</span> ' + response[0].rating + '</p>' + '</div>';
        
        //call enableSearch        
        movieHaven.enableSearch ();

        //show movie info
        $('#container').html(movieInfo);
        $('#container').show();
        //movie info styles
        $('html').css('height', '100%')
        $('html').css('background', 'url("../images/backgroundImage.jpg") no-repeat');
       
      }//end of success method

      
    }//end of settings object

    //Make AJAX Call
    $.ajax(movieHaven.url, settings);      
  }//end of execute method

};//end of movie haven object

//What happens on load and click event is executed
movieHaven.searchButton.click( function () {
  movieHaven.execute();
});


