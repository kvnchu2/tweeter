/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.



// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(()=> {
  
  $("#tweet-button").on('click', function (event) {
    event.preventDefault();
    
    $textfield = $(this).closest("form").find("#tweet-text");
    $counter = $(this).closest("form").find(".counter");
    $textdata = $textfield.serialize();
    $text = $textfield.val().trim();

    $lengthOfText = $text.length;

    if ($text === '' || $text === null) {
      $(".display-hidden").slideDown( "slow" );
      $(".error").text("Please enter a tweet!");
    } else if ($lengthOfText > 140) {
      $( ".display-hidden" ).slideDown( "slow" );
      $(".error").text("Your tweet exceeded character limit!");
    } else {
      $(".display-hidden").hide();
      $.post("/tweets/", $textdata)
        .done(function () {
          loadTweets();
        });
    }
  });

  const loadTweets = () => {
    $.getJSON("/tweets")
      .done(function (tweets) {
        renderTweets(tweets);
      });
  };

  loadTweets();
});

const createTweetElement = function(tweet) {
  const currentTime = new Date();
  const dateOfTweet = new Date(parseInt(tweet.created_at))
  let timeDiff = Math.floor((currentTime - dateOfTweet) / 86400000);
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  return `<article class="tweet-article">
          <header class="tweet-header">
            <div class="avatar-name">
              <img src=${tweet.user.avatars}>
              <p>${tweet.user.name}</p>
            </div>
            <div class="twitter-user">
              <p><strong>${tweet.user.handle}</strong></p>
            </div>
          </header>
          <p class= "tweet-message">${escape(tweet.content.text)}</p>
          <footer>
            <div class="tweet-time">
              <p>${timeDiff} days ago</p>
            </div>
            <div class="tweet-icons">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
  </article>`
}

  const renderTweets = function(tweets) {
    // loops through tweets
    $('.tweet-container').empty();
    for (let x = tweets.length - 1; x >= 0; x--) {
      
      const $tweet = createTweetElement(tweets[x]);
      
      $('.tweet-container').append($tweet);
    }
  }



