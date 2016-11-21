// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {


  // Get the text the user is typing in the search bar
  $('.flexsearch-input').keyup(function(event){
    var text = $(".flexsearch-input").val();
    $(".dropdown-content").html("");
    // Retrieve data for all possible topics
    retrieveJSON("all", text);
  });

  // Find matches using AJAX
  function retrieveJSON(category, searchText){
    $.ajax({
      url:"http://www.mattbowytz.com/simple_api.json?data=" + category,
      type:"GET",
      dataType:"json"
    })
    .done(function(json){
      var substringMatches = [];
      json.data.programming.forEach(function(entry){
        entry = entry.toLowerCase();
        if(searchText.length > 0 && entry.startsWith(searchText.toLowerCase())){
          substringMatches.push(entry);
          $(".dropdown-content").append("<a href=\"#\">" + entry + "</a>");
        }
      });
      json.data.interests.forEach(function(entry){
        entry = entry.toLowerCase();
        if(searchText.length > 0 && entry.startsWith(searchText.toLowerCase())){
          substringMatches.push(entry);
          $(".dropdown-content").append("<a href=\"#\">" + entry + "</a>");
        }
      });
    })
    .fail(function(xhr, status, error){
      console.log('ERROR: ' + error);
    });
  }
})();
