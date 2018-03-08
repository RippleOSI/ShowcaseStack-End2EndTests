function scrollPage(browser) {
  return function (result) {
    const coords = result.value || { x: 0, y: 0 };
    coords.x = coords.x || 0;
    coords.y = coords.y || 0;

    browser.pause(browser.globals.wait_milliseconds_for_scrolling_before);
    browser.execute('window.scrollTo(' + coords.x + ', ' + coords.y + ')');
    browser.pause(browser.globals.wait_milliseconds_for_scrolling_after);
  }
}

module.exports = scrollPage;