(function() {

  $(document).ready(function() {
    var active, ids;
    $('#navbar').scrollspy(200);
    ids = ["serious", "duck", "smile"];
    active = 0;
    return setInterval((function() {
      $('.face, .txt').removeClass('active');
      active++;
      if (active === 3) active = 0;
      $('#' + ids[active]).addClass('active');
      return $('#txt-' + ids[active]).addClass('active');
    }), 3000);
  });

}).call(this);
