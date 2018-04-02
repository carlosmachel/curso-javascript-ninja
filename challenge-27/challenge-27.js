(function(win, doc){
  'use strict';

  /*
  Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
  métodos semelhantes aos que existem no array, mas que sirvam para os
  elementos do DOM selecionados.
  Crie os seguintes métodos:
  - forEach, map, filter, reduce, reduceRight, every e some.

  Crie também métodos que verificam o tipo do objeto passado por parâmetro.
  Esses métodos não precisam depender de criar um novo elmento do DOM, podem
  ser métodos estáticos.

  Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
  no objeto, como nos exemplos abaixo:
  DOM.isArray([1, 2, 3]); // true
  DOM.isFunction(function() {}); // true
  DOM.isNumber('numero'); // false

  Crie os seguintes métodos para verificação de tipo:
  - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
  O método isNull deve retornar `true` se o valor for null ou undefined.
  */

  function init () {
    testDOMMethods();
    console.log('\n');
    testIsDOMMethods();
  }

  function DOM( elements ) {
    this.element = doc.querySelectorAll(elements);
  }

  DOM.prototype.on = function on(eventName, callback) {
    this.element.forEach(function (item) {
      item.addEventListener(eventName, callback, false);
    });
  }

  DOM.prototype.off = function off(eventName, callback) {
    this.element.forEach(function (item ) {
      item.removeEventListener(eventName, callback, false);
    })
  }

  DOM.prototype.get = function get() {
    return this.element;
  }

  /*
  var arrayMethods = [
    'forEach',
    'map',
    'filer',
    'reduce',
    'reduceRight',
    'every',
    'some'
  ];

  arrayMethods.forEach(function(item) {
    DOM.prototype[item] = function() {
      return Array.prototype[item].apply(this.element, arguments);
    }
  });
  */


  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.element, arguments);
  }

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
  }

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
  }

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  }

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  }

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
  }

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  }


  DOM.is = function is(element) {
    return Object.prototype.toString.apply(element);
  }

  DOM.isArray = function isArray(element) {
    return DOM.is(element) === '[object Array]';
  }

  DOM.isObject = function isObject(element) {
    return DOM.is(element) === '[object Object]';
  }

  DOM.isFunction = function isFunction(element) {
    return DOM.is(element) === '[object Function]';
  }

  DOM.isNumber = function isNumber(element) {
    return DOM.is(element) === '[object Number]';
  }

  DOM.isString = function isString(element) {
    return DOM.is(element) === '[object String]';
  }

  DOM.isBoolean = function isBoolean(element) {
    return DOM.is(element) === '[object Boolean]';
  }

  DOM.isNull = function isNull(element) {
    return DOM.is(element) === '[object Null]'
        || DOM.is(element) === '[object Undefined]';
  }

  /* Tests */

  function testDOMMethods() {
    var $a = new DOM('a');
    console.log('\nForEach method:');
    $a.forEach(function(currentValue, index, array, thisArg) {
      console.log('inner html: ', currentValue.innerHTML);
    });

    console.log('\nMap method: ');
    $a.map(function(currentValue, index, array, thisArg) {
      console.log('inner html: ', currentValue.innerHTML);
    });

    console.log('\nFilter method: ');
    $a.map(function(element, index, array, thisArg) {
      console.log('inner html: ', element.innerHTML);
    });

    console.log('\nReduce method: ');
    console.log($a.reduce(function(acumulated, currentValue, currentIndex, array) {
      return acumulated + ' ' + currentValue.innerHTML;
    }, 'inner html:'));

    console.log('\nReduceRight method: ');
    console.log($a.reduceRight(function(acumulated, currentValue, currentIndex, array) {
      return acumulated + ' ' + currentValue.innerHTML;
    }, 'inner html:'));

    console.log('\nEvery method - Is all numbers even?');
    console.log($a.every(function(currentValue, index, array, thisArg) {
      if(Number(String.prototype.slice.call(currentValue.innerHTML, -1)[0]) % 2) {
        return currentValue.innerHTML;
      }
    }));

    console.log('\nSome method: ');
    console.log($a.some(function(currentValue, index, array, thisArg) {
      return /\d$/.test(currentValue.innerHTML);
    }));
  }

  function testIsDOMMethods() {
    var variables = [
      [1,2,3,4],
      true,
      undefined,
      null,
      function someFunction(){},
      10000,
      {prop1:1000}
    ];

    testIsArrayDOMMethod(variables);
    console.log('\n');
    testIsObjectDOMMethod(variables);
    console.log('\n');
    testIsFunctionDOMMethod(variables);
    console.log('\n');
    testIsBoleanDOMMethod(variables);
    console.log('\n');
    testIsNullDOMMethod(variables);
    console.log('\n');
    testIsNumberDOMMethod(variables);

    function testIsArrayDOMMethod(array){
      array.forEach(function(item) {
        console.log('Is ' + item + ' an Array?', DOM.isArray(item));
      });
    }

    function testIsObjectDOMMethod(array) {
      array.forEach(function(item) {
        console.log('Is ' + item + ' an Object?', DOM.isObject(item));
      });
    }

    function testIsFunctionDOMMethod(array) {
      array.forEach(function(item) {
        console.log('Is ' + item + ' a Function?', DOM.isFunction(item));
      });
    }

    function testIsBoleanDOMMethod(array) {
      array.forEach(function(item) {
        console.log('Is ' + item + ' a Boolean?', DOM.isBoolean(item));
      });
    }

    function testIsNullDOMMethod(array) {
      array.forEach(function(item) {
        console.log('Is ' + item + ' null?', DOM.isNull(item));
      });
    }

    function testIsNumberDOMMethod(array) {
      array.forEach(function(item) {
        console.log('Is ' + item + ' a Number?', DOM.isNumber(item));
      });
    }
  }

  init();

})(window, document);
