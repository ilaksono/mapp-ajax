
$(document).ready(() => {
  $('#search').on('input', function(event) {
    loadCardsMatchingSearch(event.target.value);
  });

  const loadCardsMatchingSearch = string => {
    const $container = $('.section-container');
    for (const child of $($container).children()) {
      const title = child.children[1].children[0].innerText.toLowerCase();
      const description = child.children[1].children[1].innerText.toLowerCase();
      if (title.includes(string.toLowerCase()) || description.includes(string.toLowerCase())) {
        $(child).first().attr("hidden", false);
      } else {
        $(child).first().attr("hidden", true);
      }
    }
  }
});
