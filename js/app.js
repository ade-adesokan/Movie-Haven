var movieHaven = {

  searchField : $('#searchField'), //search textbox

  searchButton : $('#searchButton'), //search button

  url : "http://www.myapifilms.com/imdb", //url for API

  //To disable search bar after clicking search and to display loading bar
  enableSearch : function () {
    movieHaven.searchField.prop('disabled', true);
    $('#loading').show();
    $('#intro').hide();
  },

  //To remove loading bar after movie is found and to enable search bar again
  disableSearch : function () {
    $('#loading').hide();   
    movieHaven.searchField.prop('disabled', false);
  },

  //Execute function: to get movie information to display
  execute : function () {

    //To get search field informatiom i.e movie title
    var name = movieHaven.searchField.val();

    //call enableSearch
    movieHaven.enableSearch();    

    //Settings Object to be fed into AJAX Call
    settings = {
      
      //data parameter
      data : 'title="' + name + '"&format=JSONP&actors=S&trailer=1',
      //datatype parameter, in this case JSONP
      dataType : 'jsonp',   

      //Movie Missing
      movieMissing : function (response) {        
        //display error message
        $('#intro').text(response.message);
        $('#intro').show();
        $('#container').hide();        
      },
      //Movie Found
      movieFound : function (response) {            
        //heading of movie
        var movieInfo = '<h1>' + response[0].title + '</h1>';
        //If movie trailer does not exist
        if (Object.keys(response[0].trailer).length !== 0) {
          //variable to set trailer's url
          var videoURL = response[0].trailer.videoURL + "/imdb/embed?autoplay=false&width=480";
          //trailer
          movieInfo += '<iframe src="' + videoURL + '" alt="Web site is not avaialable" width="480" height="270" frameborder="no" scrolling="no" >' + '</iframe>';       
        }               
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

        this.movieInfo = movieInfo;        
      },
      //display movie info
      showMovieInfo : function () {
        $('#container').html(this.movieInfo);
        $('#container').show();
        
      },

      //Success Method
      success : function (response) {

        //If movie is not found, user didn't type anything or jargons are typed
        if ( response.message === "Movie not found" ) {

          settings.movieMissing (response);

        //Movie found perfectly
        } else { 
          
          settings.movieFound (response); //call movie found method
          settings.showMovieInfo(); //show movie info

        }//end of conditional statements 

        //call enableSearch        
        movieHaven.disableSearch ();
       
      },//end of success method

      statusCode: {
        404: function() {
          $('#intro').text("Page not found !!! ");
          $('#intro').show();
          $('#container').hide();      
          movieHaven.disableSearch ();
        }
      }

      
    }//end of settings object

    //Make AJAX Call
    $.ajax(movieHaven.url, settings);      
  }//end of execute method

};//end of movie haven object

//What happens on load and click event is executed
movieHaven.searchButton.click( function () {
  movieHaven.execute();
});


