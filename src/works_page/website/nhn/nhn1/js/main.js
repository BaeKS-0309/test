$(document).ready(function () {

  // 패밀리사이트 글로벌사이트 클릭이벤트
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
