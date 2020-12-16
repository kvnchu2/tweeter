$(document).ready(function() {
  $("#tweet-text").on('keyup',function() {
    let charCount = 140 - $(this).val().length;
    if (charCount > 0) {
      $(this).siblings("div").children("output").html(charCount);
      $(this).siblings("div").children("output").css("color", "#545149");
    } else if (charCount < 0) {
      $(this).siblings("div").children("output").html(charCount);
      $(this).siblings("div").children("output").css("color", "#FF0000");
    }
    console.log($(this).val().length);
  })
});