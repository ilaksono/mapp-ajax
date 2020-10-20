$(document).ready(() => {
  const modal = document.getElementById("profile-modal");

  // Get the button that opens the modal
  $('#profile-button').on('click', (event) => {
    if ($('#profile-modal').attr("hidden")) {
      $('#profile-modal').attr("hidden", false);
    } else {
      $('#profile-modal').attr("hidden", true);
    }
  });

  $('.close').on('click', (event) => {
    if ($('#profile-modal').attr("hidden")) {
      $('#profile-modal').attr("hidden", false);
    } else {
      $('#profile-modal').attr("hidden", true);
    }
  });
  $(window).on('click', (event) => {
    if ($(event.target).not('.modal-close-container')[0] && $(event.target).not('#profile-button')[0]) {
      $('#profile-modal').attr("hidden", true);
    }
  });
  /*
  const btn = document.getElementById("profile-button"); */

/*   // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  /* btn.onclick = function() {
    if (modal.style.display = "none") {
      modal.style.display = "block";
    } else if (modal.style.display = "block") {
      modal.style.display = "none";
    }
  } */

  // When the user clicks on <span> (x), close the modal
/*   span.onclick = function() {
    modal.style.display = "none";
  } */

  // When the user clicks anywhere outside of the modal, close it
/*   window.onclick = function(event) {
    if (event.target === modal) {
      $('#profile-modal').attr("hidden", true);
    }
  } */
});
