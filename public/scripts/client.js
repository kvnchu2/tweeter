//function that requests for tweets
const loadTweets = () => {
  $.getJSON("/tweets")
    .done(function (tweets) {
      renderTweets(tweets);
    });
};

//adds html with information from tweet
const createTweetElement = function(tweet) {
  const currentTime = new Date();
  const dateOfTweet = new Date(parseInt(tweet.created_at));
  let timeDiff = Math.floor((currentTime - dateOfTweet) / 86400000);
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
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
  </article>`;
};

//adds tweets to tweet-container
const renderTweets = function(tweets) {
  // loops through tweets
  $('.tweet-container').empty();
  for (let x = tweets.length - 1; x >= 0; x--) {
    
    const $tweet = createTweetElement(tweets[x]);
    
    $('.tweet-container').append($tweet);
  }
};
//submits form to tweets and loads tweets to page on submit
$('form#tweet-form').on('submit', function(event) {
  event.preventDefault();

  //obtains input of textfield
  $textfield = $(this).closest("form").find("#tweet-text");
  //obtains counter
  $counter = $(this).closest("form").find(".counter");
  //encodes textfield for post request
  $textdata = $textfield.serialize();
  //reduces textfield to just the string itself and gets length of characters
  $text = $textfield.val().trim();
  $lengthOfText = $text.length;
  
  //if no characters written, or number of characters exceeds limit, error message. otherwise, tweet is rendered and sent
  if ($text === '' || $text === null) {
    $(".display-hidden").slideDown("slow");
    $(".error").text("Please enter a tweet!");
  } else if ($lengthOfText > 140) {
    $(".display-hidden").slideDown("slow");
    $(".error").text("Your tweet exceeded character limit!");
  } else {

    $(".display-hidden").hide();
    $.post("/tweets/", $textdata)
      .then(() => {
        loadTweets();
      });

    $textfield.val('');
    $counter.text(140);

  }
});

$('div.write span').on('click', function(event) {
  if($(".display-hidden-tweet").is(":hidden")) {
    $(".display-hidden-tweet").slideDown("slow");
    $("#tweet-text").focus();
    $("#tweet-text").trigger("click");
  } else {
    $(".display-hidden-tweet").hide();
    $(".display-hidden").hide();
  }
});

$(window).scroll(function() {
  $("#scroll-icon").show();
});

$("#scroll-icon").click(function() {
  $("html, body").animate({scrollTop: 0}, function() {$("#scroll-icon").hide();
  $('div.write span').click() });
});


//waits for document to load before adding in tweets
$(document).ready(()=> {
  
  loadTweets();
  
});
