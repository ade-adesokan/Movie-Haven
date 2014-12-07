var url = "http://www.myapifilms.com/imdb";

var name = 'inception';

var title = 

settings = {
  title: 'inception'
  data: 'format=JSONP&trailer=1',
  dataType:  'jsonp',
  success:   function (response) {
    var plot = '<p>' + response[0].plot + '</p>';
    var videoURL = response[0].trailer.videoURL+"/imdb/embed?autoplay=false&width=480";
    plot+= '<iframe src="'+ videoURL+ '" width="480" height="270" frameborder="no" scrolling="no">'+'</iframe>';
    $('#container').html(plot);
  }
}


$.ajax(url, settings);










































