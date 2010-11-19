;(function($, document){
  var DOCUMENT = $(document),
      STYLES = 
     'font-size\
      font-family\
      padding-top\
      padding-left\
      padding-bottom\
      padding-right\
      border-top-style\
      border-left-style\
      border-bottom-style\
      border-right-style\
      border-top-width\
      border-left-width\
      border-bottom-width\
      border-right-width\
      word-spacing\
      letter-spacing\
      text-indent\
      text-transform'.split(/\s+/);

  function getHiddenFor(input) {
    var hidden = input.data('hidden'), styles;
    if (hidden) return hidden;
    styles = {
      'position'         : 'absolute',
      'top'              : '-99999px',
      'left'             : '-9999px',
      'background-color' : 'orange'
    };
    $.each(STYLES, function(i, style) { styles[style] = input.css(style); });
    hidden = $('<span/>').css(styles).insertAfter(input);
    input.data('hidden', hidden);
    return hidden;
  };

  DOCUMENT
    // horiontal growth only
    .delegate('input[type="text"][growing], input[type="password"][growing], textarea[growing="x"]', 'keydown keyup change', function() {
      var
        input = $(this),
        value = input.val();

      if (input.attr('growing') === 'y'){
        input.removeAttr('growing');
        return
      };

      if (value === input.data('previous_value')) return;
      input.data('previous_value', value);

      var hidden = getHiddenFor(input);
      input.width( hidden.css({display:'inline'}).text(value).width() + hidden.text('Mi').width() );

    })

    // vertical growth only
    .delegate('textarea[growing="y"]', 'keydown keyup change', function() {
      var
        input = $(this),
        value = input.val();

      if (value === input.data('previous_value')) return;
      input.data('previous_value', value);

      var hidden = getHiddenFor(input);

      hidden.css({
        display       : 'block',
        'white-space' : 'pre-wrap',
        'word-wrap'   : 'break-word',
        width         : input.width()
      }).text(value)

      input.css({
        height: hidden.height(),
        overflow: 'hidden'
      });
    })

    // growth in both directions
    .delegate('textarea[growing=""], textarea[growing="growing"]', 'keydown keyup change', function() {
      var
        input = $(this),
        value = input.val(),
        hidden;

      if (value === input.data('previous_value')) return;
      input.data('previous_value', value);

      var hidden = getHiddenFor(input);
      var span = hidden.html('<span/>').find('span');
      
      hidden.css({
        position      : 'static',
        display       : 'block',
        'padding-right': '.25em'
      });
      span.css({
        'white-space' : 'pre-wrap',
        background: 'purple'
      });
      
      span.text('.')
      var extra_width = span.width();
      var min_height  = hidden.height();

      span.text(value);
      var new_height = hidden.height();

      input.css({
        overflow: 'hidden',
        height: new_height < min_height ? min_height : new_height,
        width:  span.width() + extra_width
      });

      hidden.css({position : 'absolute'});
    });
  ;

})(jQuery, document);
