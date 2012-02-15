$(document).ready ->

  $('#me').scrollspy({
    min : 0
    max : $('#me').outerHeight(),
    onEnter: (element, position) ->
      $('body').removeClass 'corner'
    onLeave: (element, position) ->
      $('body').addClass 'corner'
  })

  $('.bloc').each () ->
    position = $(this).position()
    $(this).scrollspy({
      min: position.top,
      max: position.top + $(this).outerHeight(),
      onEnter: (element, position) ->
        $('[href=#'+element.id+']').addClass 'on'
        $('body').addClass 'corner'
      onLeave: (element, position) ->
        $('[href=#'+element.id+']').removeClass 'on'
    })

    $('body').trigger 'scroll'

  filterPath = (string) ->
    string.replace(/^\//, "").replace(/(index|default).[a-zA-Z]{3,4}$/, "").replace /\/$/, ""
  scrollableElement = (els) ->
    i = 0
    argLength = arguments.length

    while i < argLength
      el = arguments[i]
      $scrollElement = $(el)
      if $scrollElement.scrollTop() > 0
        return el
      else
        $scrollElement.scrollTop 1
        isScrollable = $scrollElement.scrollTop() > 0
        $scrollElement.scrollTop 0
        return el  if isScrollable
      i++
    []
  locationPath = filterPath(location.pathname)
  scrollElem = scrollableElement("html", "body")
  $("a[href*=#]").each ->
    thisPath = filterPath(@pathname) or locationPath
    if locationPath is thisPath and (location.hostname is @hostname or not @hostname) and @hash.replace(/#/, "")
      $target = $(@hash)
      target = @hash
      if target
        targetOffset = $target.offset().top
        $(this).click (event) ->
          event.preventDefault()
          $(scrollElem).animate
            scrollTop: targetOffset
          , 400, ->
            location.hash = target