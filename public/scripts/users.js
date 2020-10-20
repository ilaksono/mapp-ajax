$(document).ready(function() {

  $(function() {
    const $fav = $("#favourites1")

    $fav.on("click", function(event) {
      $("#favourites2").removeClass("hide")
      $("#contributed2").addClass("hide")
      $("#contributed1").removeClass("sub-nav-active")
      $("#favourites1").addClass("sub-nav-active")
    })
  })

  $(function() {
    const $contribute = $("#contributed1")

    $contribute.on("click", function(event) {
      $("#contributed2").removeClass("hide")
      $("#favourites2").addClass("hide")
      $("#favourites1").removeClass("sub-nav-active")
      $("#contributed1").addClass("sub-nav-active")
    })
  })

  $(function () {
    const $heart = $(".heart-div")

    $heart.on("click", function(event){
      console.log("banana")
    })
  })
})
