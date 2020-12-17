/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.



// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(()=> {
  

const createTweetElement = function(tweet) {
  const currentTime = new Date();
  const dateOfTweet = new Date(parseInt(tweet.created_at))
  let timeDiff = Math.floor((currentTime - dateOfTweet) / 86400000);
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
          <p>${tweet.content.text}</p>
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
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet)
      // takes return value and appends it to the tweets container
      $('.tweet-container').append($tweet);
    }
  }
  const loadTweets = () => {
    $.getJSON("/tweets")
      .done(function (tweets) {
          renderTweets(tweets);
          });
  };
  const $form = $('#tweet-form');
  $form.submit(function (event) {
    event.preventDefault();

    console.log('Button clicked, performing ajax call...');
    const text = $(this).serialize();
    $.ajax({type: 'POST', url: '/tweets/', data: text})
    .then(function () {
      loadTweets();
    }
    );
  });
});

