// Pisane na kolanie. O dziwo działa

$('ul.city-films li:lt(200)').each(function(){
  var movie_box = this;
  var url = $(this).find('.name').attr('href');
  url = url.substring(0, url.indexOf('/showtimes/'));
  $.get(url, function(data){
    // innerHtml has problem with tags not inside body, so I had to use regex
    var titleRegex = /<meta property="og:title" content="([^"]+)">/;
    title = titleRegex.exec(data)[1];
    if(title.indexOf('/') != -1){
      title = title.substring(title.indexOf('/') + 2); // jeśli mamy tytuł po polsku i angielsku, po angielsku bęcie po slashu
    }


    var encoded_title = encodeURIComponent(title);
    encoded_title = encoded_title.replace(/%20/g, '+');
    var metacritic_url = 'http://www.metacritic.com/search/all/' + encoded_title + '/results';

    $.get(metacritic_url, function(metacritic_data){
      metacritic_score = $(metacritic_data).find('.search_results .result:has(.result_type > strong:contains(Movie)) .metascore_w:lt(1)');
      if(metacritic_score){
        $(movie_box).find('.area').prepend(metacritic_score);
      }
    }.bind(this))

  }.bind(this));
});
