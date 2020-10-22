$(document).ready(() => {
  $('#search').on('input', function(event) {
    const $container = $('.section-container');
    for (const child of $($container).children()) {
      const title = child.children[1].children[0].innerText.toLowerCase();
      const description = child.children[1].children[1].innerText.toLowerCase();
      if (title.includes(event.target.value.toLowerCase()) || description.includes(event.target.value.toLowerCase())) {
        $(child).first().attr("hidden", false);
      } else {
        $(child).first().attr("hidden", true);
      }
    }
  });
});
