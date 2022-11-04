const $navbar = $(".header-wrapper");

$('a[href^="#"]').on("click", function (e) {
  e.preventDefault();

  let offTop = 200;
  if ($(window).width() < 767) {
    offTop = 140;
  }
  console.log($($(this).attr("href")).position().top);
  const scrollTop =
    $($(this).attr("href")).offset().top - offTop - $navbar.outerHeight();

  $("html, body").animate({ scrollTop });
});

let menuItems;
let scrollItems;
let topMenu, topMenuHeight, lastId;
topMenu = $(".detailsMenuItem");
menuItems = topMenu.find("a");
// Anchors corresponding to menu items

scrollItems = menuItems.map(function () {
  var item = $(this).attr("href");
  if (item != "#") {
    return $(item);
  }
});

console.log(scrollItems);
let offTop = 200;
if ($(window).width() < 767) {
  offTop = 140;
}
topMenuHeight = topMenu.outerHeight();
$(window).scroll(function () {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight;

  // Get id of current scroll item
  var cur = scrollItems.map(function () {
    if ($(this).offset().top - offTop - 100 < fromTop) return this;
  });
  // Get the id of the current element
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (id == "" || id == null) {
    $("a[href='#for-men']").addClass("active");
  }

  $(".detailsMenuItem__box--out").each(function () {
    if (!$(this).hasClass("active")) {
      $(this).next().find(".item_text").removeClass("active");
    }
  });

  if (lastId !== id) {
    lastId = id;
    // Set/remove active class
    menuItems
      .removeClass("active")
      .parent()
      .end()
      .filter("[href='#" + id + "']")
      .addClass("active");

    if (
      id != null &&
      id != "" &&
      id != "for-men" &&
      id != "for-women" &&
      id != "gift_kit"
    ) {
      $("a[href='#" + id + "']")
        .not(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".detailsMenuItem__box--out")
        .removeClass("active");

      $("a[href='#" + id + "']")
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".detailsMenuItem__box--out")
        .addClass("active");

      $("a[href='#" + id + "']")
        .parent()
        .parent()
        .parent()
        .next()
        .find(".item_text")
        .removeClass("active");
      $("a[href='#" + id + "']")
        .parent()
        .parent()
        .parent()
        .prev()
        .find(".item_text")
        .removeClass("active");

      $("a[href='#" + id + "']")
        .parent()
        .parent()
        .parent()
        .find(".item_text")
        .addClass("active");
    }
  }
});
