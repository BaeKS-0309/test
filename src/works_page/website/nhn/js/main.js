$(document).ready(function () {
  $('.family button, .global button').click(function () {
    var ulContents = $(this).siblings("ul");
    ulContents.toggle();

    if (ulContents.css("display") === "none") {

      $(this).css({ color: '#999' })
    } else {
      $(this).css({ color: '#333' })
    };
  })
})