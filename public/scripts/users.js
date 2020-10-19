$(document).ready(function() {

  $(function() {
    const $fav = $("#favourites1")

    $fav.on("click", function(event) {
      $("#contributed2").addClass("hide");
    })
  })

  $(function() {
    const $contribute = $("#contributed1")

    $contribute.on("click", function(event) {
      $("#favourites2").addClass("hide");
    })
  })

  $(function() {
    const $all = $("#all")

    $all.on("click", function(event) {
      location.reload()
    })
  })
})
