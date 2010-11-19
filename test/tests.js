$(document).ready(function(){

  // test("a basic test example", function() {
  //   var input = $('#fixed');
  //   equals(100, input.width());
  //   input.val('this is a very long string');
  //   equals(100, input.width());
  //   // ok( true, "this test is fine" );
  //   // var value = "hello";
  //   // equals( "hello", value, "We expect value to be hello" );
  // });

  var LONG_STRING = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  $.each(['text','password'], function(i, type) {

    $.each(['','growing="y"'], function(i, growing) {

      module('<input type="'+type+'" '+growing+'/>');

      test("should not grow at all when value is added", function() {
        var
          input = $('<input type="'+type+'" '+growing+'>').appendTo('#inputs'),
          empty_width,
          empty_height;

        console.log(input);
        expect(input.length).toBe(1);
        input.css({width: 'auto', height: 'auto'}).val('');
        empty_width  = input.width();
        empty_height = input.height();

        input.val(LONG_STRING).change();

        expect(input.width() ).toEqual(empty_width);
        expect(input.height()).toEqual(empty_height);

        input.remove();
      });

    });

    $.each(['growing','growing="x"'], function(i, growing) {

      module('<input type="'+type+'" '+growing+'/>');

      test("should get wider but not taller as you add value", function() {
        var
          input = $('<input type="'+type+'" '+growing+'>').appendTo('#inputs'),
          empty_width,
          empty_height,
          height,
          width;

        input.css({width: '0', height: '0'}).val('');
        empty_width  = input.width();
        empty_height = input.height();

        input.val('a').change();
        width  = input.width();
        height = input.height();

        expect(width ).toBeGreaterThan(empty_width);
        expect(height).toEqual(empty_height);

        input.val('ab').change();
        expect(input.width() ).toBeGreaterThan(width);
        expect(input.height()).toEqual(height);

        input.remove();
      });

    });

  });

  module("<textarea />");
  test("should not grow at all when value is added", function() {
    var
      input = $('<textarea />').appendTo('#inputs'),
      empty_width,
      empty_height;

    input.css({width: 0, height: 0}).val('');
    empty_width  = input.width();
    empty_height = input.height();

    input.val(LONG_STRING).change();

    expect(input.width() ).toEqual(empty_width);
    expect(input.height()).toEqual(empty_height);

    input.remove();
  });

  module('<textarea growing="x"/>');
  test("should grow horizontally but not verticall when value is added", function() {
    var
      input = $('<textarea growing="x"/>').appendTo('#inputs'),
      empty_width,
      empty_height;

    input.css({width: 0, height: '1em'}).val('');
    empty_width  = input.width();
    empty_height = input.height();

    input.val('hello world').change();
    width  = input.width();
    height = input.height();

    expect(width ).toBeGreaterThan(empty_width);
    expect(height).toEqual(empty_height);

    input.val(LONG_STRING).change();
    expect(input.width() ).toBeGreaterThan(width);
    expect(input.height()).toEqual(height);

    input.remove();
  });


  module('<textarea growing="y"/>');
  test("should grow verticall but not horizontally when value is added", function() {
    var
      input = $('<textarea growing="y"/>').appendTo('#inputs'),
      empty_width,
      empty_height;

    input.css({width: '100px', height: '1em', 'max-width': 100}).val('');
    empty_width  = input.width();
    empty_height = input.height();

    input.val('hello world').change();
    width  = input.width();
    height = input.height();

    expect(width ).toEqual(empty_width);
    expect(height).toBeGreaterThan(empty_height);

    input.val(LONG_STRING).change();
    expect(input.width() ).toEqual(width);
    expect(input.height()).toBeGreaterThan(height);

    input.remove();
  });

  module("<textarea growing/>");
  test("should grow verticall and horizontally when value is added", function() {
    var
      div = $('<div><textarea growing/></div>').appendTo('#inputs'),
      input = div.find('textarea'),
      empty_width,
      empty_height;
  
    div.css({width: '200px', backgroundColor: 'red', marginBottom: '100px'})
    input.css({width: 0, height: 'auto'}).val(' ').change();
    empty_width  = input.width();
    empty_height = input.height();
  
    input.val('hello').change();
    width  = input.width();
    height = input.height();
      
    expect(width ).toBeGreaterThan(empty_width);
    expect(height).toEqual(empty_height);
    
    input.val(LONG_STRING).change();
    ok(input.width() <= 200);
    expect(input.height()).toBeGreaterThan(height);
  
    input.remove();
  });

});