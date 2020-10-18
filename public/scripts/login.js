// const showError = function(message) {
//   if (!$("#error").hasClass("warning")) {
//     $("#error").empty();
//     $("#error").addClass("warning");
//     $("#error").append(message).hide().slideDown(500);
//   } else {
//     $("#error").empty();
//     $("#error").append(message)
//   }
// };

// $(document).ready(function() {

// $(function() {
//   const $form = $("form");
//   $form.on("submit", function(event) {
//     event.preventDefault();
//     const serialized = $(this).serialize();
//     const content = $(this).children("input").val()
//     console.log(serialized)
//     console.log("this", content)

//     if (content === "") {
//       showError("Please input login information");
//       console.log("error")
//     }
//   })
//   })
// });
