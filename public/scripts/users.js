$(document).ready(function() {

  $("#no-create").removeClass("error-hide")
  $("#contributed2").addClass("hide")
  $("#favourites2").addClass("hide")

  $(function() {
    const $created = $("#created1")

    $created.on("click", function(event) {
      $("#created2").removeClass("hide")
      $("#contributed2").addClass("hide")
      $("#favourites2").addClass("hide")
      $("#created1").addClass("sub-nav-active")
      $("#favourites1").removeClass("sub-nav-active")
      $("#contributed1").removeClass("sub-nav-active")
      $("#no-contribute").addClass("error-hide")
      $("#no-fav").addClass("error-hide")
      $("#no-create").removeClass("error-hide")
    })
  })

  $(function() {
    const $fav = $("#favourites1")

    $fav.on("click", function(event) {
      $("#favourites2").removeClass("hide")
      $("#contributed2").addClass("hide")
      $("#created2").addClass("hide")
      $("#contributed1").removeClass("sub-nav-active")
      $("#created1").removeClass("sub-nav-active")
      $("#favourites1").addClass("sub-nav-active")
      $("#no-contribute").addClass("error-hide")
      $("#no-create").addClass("error-hide")
      $("#no-fav").removeClass("error-hide")
    })
  })

  $(function() {
    const $contribute = $("#contributed1")

    $contribute.on("click", function(event) {
      $("#contributed2").removeClass("hide")
      $("#favourites2").addClass("hide")
      $("#created2").addClass("hide")
      $("#contributed1").addClass("sub-nav-active")
      $("#favourites1").removeClass("sub-nav-active")
      $("#created1").removeClass("sub-nav-active")
      $("#no-fav").addClass("error-hide")
      $("#no-create").addClass("error-hide")
      $("#no-contribute").removeClass("error-hide")
    })
  })

  $(function() {
    const $created = $("#ham-created")

    $created.on("click", function(event) {
      $("#created2").removeClass("hide")
      $("#contributed2").addClass("hide")
      $("#favourites2").addClass("hide")
      $("#created1").addClass("sub-nav-active")
      $("#favourites1").removeClass("sub-nav-active")
      $("#contributed1").removeClass("sub-nav-active")
      $("#no-contribute").addClass("error-hide")
      $("#no-fav").addClass("error-hide")
      $("#no-create").removeClass("error-hide")
    })
  })

  $(function() {
    const $fav = $("#ham-fav")

    $fav.on("click", function(event) {
      $("#favourites2").removeClass("hide")
      $("#contributed2").addClass("hide")
      $("#created2").addClass("hide")
      $("#contributed1").removeClass("sub-nav-active")
      $("#created1").removeClass("sub-nav-active")
      $("#favourites1").addClass("sub-nav-active")
      $("#no-contribute").addClass("error-hide")
      $("#no-create").addClass("error-hide")
      $("#no-fav").removeClass("error-hide")
    })
  })

  $(function() {
    const $contribute = $("#ham-contributed")

    $contribute.on("click", function(event) {
      $("#contributed2").removeClass("hide")
      $("#favourites2").addClass("hide")
      $("#created2").addClass("hide")
      $("#contributed1").addClass("sub-nav-active")
      $("#favourites1").removeClass("sub-nav-active")
      $("#created1").removeClass("sub-nav-active")
      $("#no-fav").addClass("error-hide")
      $("#no-create").addClass("error-hide")
      $("#no-contribute").removeClass("error-hide")
    })
  })


  $(function() {
    const $hamburger = $(".hamburger")

    $hamburger.on("click", function(event) {
      if ($('#mobile-menu').attr("hidden")) {
        $('#mobile-menu').attr("hidden", false);
      } else {
        $('#mobile-menu').attr("hidden", true);
      }
    })
  })
})
