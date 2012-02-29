$(document).ready ->
  $('#navbar').scrollspy(200)
  ids = [ "serious", "duck", "smile" ]
  active = 0
  setInterval (->
    $('.face, .txt').removeClass 'active'
    active++
    active =0 if active == 3
    $('#'+ids[active]).addClass('active')
    $('#txt-'+ids[active]).addClass('active')
  ), 4000
