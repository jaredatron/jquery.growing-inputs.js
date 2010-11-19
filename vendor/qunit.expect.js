var expect;
;(function() {

  expect = function expect(object){
    return new Expect(arguments);
  };
  expect.prototype = Expect.prototype;

  function Expect(objects){
    this.objects = Array.prototype.slice.apply(objects);
  };
  Expect.prototype.each = function(block){
    var self = this;
    self.objects.forEach(function(object){ block.call(self, object); });
    return self;
  };


  [
    ['to equal',                 'toEqual',              equals              ],
    ['to not equal',             'toNotEqual',           notEqual            ],
    ['to be',                    'toBe',                 strictEqual         ],
    ['to not be',                'toNotBe',              notStrictEqual      ],
    ['to be an instance of',     'toBeA',                toBeA               ],
    ['to not be an instance of', 'toNotBeA',             toNotBeA            ],
    ['to be an instance of',     'toBeAnInstanceOf',     toBeA               ],
    ['to not be an instance of', 'toNotBeAnInstanceOf',  toNotBeA            ],
    ['to deep equal',            'toDeepEqual',          deepEqual           ],
    ['to not deep equal',        'toNotDeepEqual',       notDeepEqual        ],
    ['to throw',                 'toThrow',              toThrow             ],
    ['to not throw',             'toNotThrow',           toNotThrow          ],
    ['to throw a',               'toThrowA',             toThrowA            ],
    ['to not throw a',           'toNotThrowA',          toNotThrowA         ],
    ['to have property',         'toHaveProperty',       toHaveProperty      ],
    ['to not have property',     'toNotHaveProperty',    toNotHaveProperty   ],
    ['to be greater than',       'toBeGreaterThan',      toBeGreaterThan     ],
    ['to not be greater than',   'toNotBeGreaterThan',   toNotBeGreaterThan  ]
  ].forEach(function(data){
    Expect.prototype[data[1]] = function(expected, message){
      return this.each(function(actual){
        var expected_as_string = QUnit.jsDump.parse(expected),
            actual_as_string   = typeof actual === 'function' ?
              '`'+actual.toString().split("\n").slice(1,-1).join("\n").replace(/\n/g, ' ')+'`' :
              QUnit.jsDump.parse(actual);

        message = message ? message : '(expected: '+actual_as_string+' '+data[0]+' '+expected_as_string;
        data[2](actual, expected, message);
      });
    };
  });

  function emptyFunction(){}
  function instanceOf(object, func){
    if (typeof func !== 'function'){
      console.warn(func, typeof func);
      emptyFunction.prototype = func;
      return object instanceof emptyFunction;
    }
    return object instanceof func;
  }

  function toBeA(actual, expected, message){
    if (typeof expected === 'string'){
      ok(typeof actual === expected, message);
    }else{
      ok(instanceOf(actual, expected), message);
    }
    return this;
  };
  function toNotBeA(actual, expected, message){
    if (typeof expected === 'string'){
      ok(typeof actual !== expected, message);
    }else{
      ok(!instanceOf(actual, expected), message);
    }
    return this;
  };
  function toThrow(actual, expected, message){
    equals.apply(null, captureErrorMessage(actual, expected, message));
    return this;
  };
  function toNotThrow(actual, expected, message){
    notEqual.apply(null, captureErrorMessage(actual, expected, message));
    return this;
  };
  function toThrowA(actual, expected, message){
    toBeA(captureError(actual), expected, message);
    return this;
  };
  function toNotThrowA(actual, expected, message){
    toNotBeA(captureError(actual), expected, message);
    return this;
  };
  function toHaveProperty(actual, expected, message){
    ok(expected in actual, message);
    return this;
  }
  function toNotHaveProperty(actual, expected, message){
    ok(!(expected in actual), message);
    return this;
  }
  function toBeGreaterThan(actual, expected, message){
    ok(actual > expected , message);
    return this;
  }
  function toNotBeGreaterThan(actual, expected, message){
    ok(!(actual > expected), message);
    return this;
  }

  function captureError(actual){
    if (typeof actual !== "function") throw new Error('functions only fool!');
    try{ actual(); }catch(e){ return e; }
  }
  function captureErrorMessage(actual, expected, message){
    var error = captureError(actual);
    if (error    && error.message   ) error    = error.message;
    if (expected && expected.message) expected = expected.message;
    return [error, expected, message];
  }

})();
