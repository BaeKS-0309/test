$(function () {
  //팝업
  let s = 0,
    v,
    p;
  $(".popup_btn, .today_check .close_btn").click(function () {
    if (s == 0) {
      v = 0;
      p = 2;
      s = 1;
    } else {
      v = 110;
      p = 1;
      s = 0;
    }

    $(".popup").animate({ height: v });
    $("header").animate({ top: v });

    $(".popup_btn img").css({ animation: "popup" + p + " 0.5s forwards" });
  });

  //올메뉴(햄버거버튼)
  //allmenu_btn을 클릭하면 allmenu_box를 보임
  $(".allmenu_btn").click(function () {
    $(".allmenu_box, .header_util .login").show();
    $("html, body").css({ "overflow-y": "hidden" });
    $(".allmenu_wrap").addClass("on");
  });
  //close_btn
  $(".allmenu_box .close_btn").click(function () {
    $(".allmenu_box, .header_util .login").hide();
    $("html, body").css({ "overflow-y": "visible" });
    $(".allmenu_wrap").removeClass("on");
  });
  $(".allmenu_box .a1>li").has("ul").addClass("dep1");
  $(".allmenu_box .a2>li").has("ul").addClass("dep2");

  $(".allmenu_box .a1>li>a").click(function () {
    $(".allmenu_box .a1>li>a").not(this).next().slideUp();

    $(this).next().slideToggle();

    $(".dep1>a::before").hide();
  });
  $(".allmenu_box .a2>li>a").click(function () {
    $(".allmenu_box .a2>li>a").not(this).next().slideUp();
    $(this).next().slideToggle();
  });

  // nav animate
  const sectionEls = $("section");
  $(".main_nav li").click(function (e) {
    const navIndexNum = $(".main_nav li").index(this);
    const sectionEl = $(sectionEls[navIndexNum]);
    $("html, body").animate(
      {
        scrollTop: sectionEl.offset().top,
      },
      1000,
      "swing"
    );
  });
  // .exhibit_wrap
  $(".exhibit_wrap .control .dot").click(function () {
    const dotIndex = $(".exhibit_wrap .control .dot").index(this);
    const exhibitLiArray = $(".exhibit_wrap li").toArray();
    const exhibitLiIndex = exhibitLiArray[dotIndex];
    $(this).addClass("on");
    $(".exhibit_wrap .control .dot").not(this).removeClass("on");
    $(exhibitLiIndex).fadeIn();
    $(exhibitLiIndex).siblings().fadeOut();
  });

  // standing_wrap hover
  $(".standing_wrap li").mouseover(function () {
    $(".standing_wrap li").removeClass("hover");
    $(this).addClass("hover");

    const btnIndexNum = $(".standing_wrap li").index(this) + 1;
    $(".standing_wrap").css({
      backgroundImage: "url(../komsco/img/section_3_exhi_" + btnIndexNum + "_bg2.jpg)",
    });
  });
  // family site
  $(".family_site button").click(function () {
    if ($(".family_site ul").css("display") === "block") {
      $(".family_site ul").slideUp();
      $(".family_site button img").css({ transform: "rotate(360deg)" });
    } else {
      $(".family_site ul").slideDown();
      $(".family_site button img").css({ transform: "rotate(180deg)" });
    }
  });

  //swiper
  var visual_swiper = new Swiper(".visual_wrap .visual_swiper", {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    navigation: {
      nextEl: ".visual_wrap .control .next",
      prevEl: ".visual_wrap .control .prev",
    },
    pagination: {
      el: ".visual_wrap .swiper-pagination",
      type: "fraction",
    },
    autoplay: {
      delay: 3000,
    },
  });

  const museum_swiper = new Swiper(".museum_info_wrap .ban_slider", {
    spaceBetween: 30,
    loop: false,
    navigation: {
      nextEl: ".museum_info_wrap .ban_slider .control .next",
      prevEl: ".museum_info_wrap .ban_slider .control .prev",
    },
    pagination: {
      el: ".museum_info_wrap .ban_slider .swiper-pagination",
      type: "fraction",
    },
    autoplay: {
      delay: 3000,
    },
  });

  $(".visual_wrap .control .stop").click(function () {
    visual_swiper.autoplay.stop();
    $(".visual_wrap .control .stop").css({ display: "none" });
    $(".visual_wrap .control .play").css({ display: "inline-block" });
  });

  $(".visual_wrap .control .play").click(function () {
    visual_swiper.autoplay.start();
    $(".visual_wrap .control .play").css({ display: "none" });
    $(".visual_wrap .control .stop").css({ display: "inline-block" });
  });

  $(".museum_info_wrap .control .stop").click(function () {
    museum_swiper.autoplay.stop();
    $(".museum_info_wrap .control .stop").css({ display: "none" });
    $(".museum_info_wrap .control .play").css({ display: "inline-block" });
  });

  $(".museum_info_wrap .control .play").click(function () {
    museum_swiper.autoplay.start();
    $(".museum_info_wrap .control .play").css({ display: "none" });
    $(".museum_info_wrap .control .stop").css({ display: "inline-block" });
  });
}); //ready()
