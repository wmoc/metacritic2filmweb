// Pisane na kolanie. O dziwo działa

$('ul.city-films li:lt(200)').each(function(){
  var movie_box = this;
  var url = $(this).find('.name').attr('href');
  $.get(url, function(data){
    // innerHtml has problem with tags not inside body, so I had to use regex
    var titleRegex = /<div class="filmPreview__originalTitle">([^<]+)<\/div>/;
    title = titleRegex.exec(data)[1];

    var encoded_title = encodeURIComponent(title);
    encoded_title = encoded_title.replace(/%20/g, '+');
    var metacritic_url = 'http://www.metacritic.com/search/all/' + encoded_title + '/results';

    $.get(metacritic_url, function(metacritic_data){
      metacritic_score = $(metacritic_data).find('.search_results .result .metascore_w:lt(1)');
      if(metacritic_score){
        $(movie_box).find('.area').prepend(metacritic_score);
      }
    }.bind(this))

  }.bind(this));
});
