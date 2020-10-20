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
});
