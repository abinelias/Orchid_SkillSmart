$(function () {
  /*
  $.when($('#header').load('../Common/header-jobseeker.htm')).then(function () {
    $.ajax({
      url: GetWebAPIURL() + 'api/JobSeeker',
      type: 'GET',
      async: false,
      headers: app.securityHeaders(),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        ko.applyBindings(data, $('#welcome')[0]);
      }
    });
  });*/
  $('#header').load('../Common/header-jobseeker.htm');
  $('#footer').load('../Common/footer-jobseeker.htm');
  $('body').on('click', '#viewProfile', function () {
    app.navigateToManage();
  });
});