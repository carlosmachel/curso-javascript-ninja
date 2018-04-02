(function(win, doc) {
  'use strict';

  /*
  Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
  o código, conforme vimos na aula anterior. Quebrar as responsabilidades
  em funções, onde cada função faça somente uma única coisa, e faça bem feito.

  - Remova as duplicações de código;
  - agrupe os códigos que estão soltos em funções (declarações de variáveis,
  listeners de eventos, etc);
  - faça refactories para melhorar esse código, mas de forma que o mantenha com a
  mesma funcionalidade.
  */

  function operationPrecedence(operator) {
    var order = {
      '+': 0,
      '-': 0,
      '÷': 1,
      'x': 1
    };

    return order[operator];
  }

  function operations( operator, firstValue, lastValue ) {
    switch (operator) {
      case '+':
      return Number(firstValue) + Number(lastValue);
      case '-':
      return Number(firstValue) - Number(lastValue);
      case '÷':
      return Number(firstValue) / Number(lastValue);
      case 'x':
      return Number(firstValue) * Number(lastValue);
    }
  }

  var $visor = doc.querySelector('[data-js="visor"]');
  var $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]');
  var $buttonsOperations = doc.querySelectorAll('[data-js="button-operation"]');
  var $buttonCE = doc.querySelector('[data-js="button-ce"]');
  var $buttonEqual = doc.querySelector('[data-js="button-equal"]');

  function initialize() {
    initEvents();
  }

  function initEvents() {
    Array.prototype.forEach.call($buttonsNumbers, function(button) {
      button.addEventListener('click', handleClickNumber, false);
    });
    Array.prototype.forEach.call($buttonsOperations, function(button) {
      button.addEventListener('click', handleClickOperation, false);
    });
    $buttonCE.addEventListener('click', handleClickCE, false);
    $buttonEqual.addEventListener('click', handleClickEqual, false);
  }

  function handleClickNumber() {
    $visor.value = removeFirstItemIfItsZero($visor.value);
    $visor.value += this.value;
  }

  function handleClickOperation() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    $visor.value += ' ' + this.value + ' ';
  }

  function handleClickCE() {
    $visor.value = 0;
  }

  function isLastItemAnOperation(number) {
    var lastItem = number.split('').pop();
    return !!operations[lastItem];
  }

  function getOperations() {
    return Array.prototype.map.call($buttonsOperations, function(button) {
      return button.value;
    });
  }

  function removeFirstItemIfItsZero(number) {
    if(isFirstItemAnZero(number)) {
      return number.slice(1);
    }
    return number;
  }

  function isFirstItemAnZero(number) {
    return /^0/.test(number);
  }

  function removeLastItemIfItIsAnOperator(number) {
    if(isLastItemAnOperation(number)) {
      return number.slice(0, -2);
    }
    return number;
  }

  function handleClickEqual() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    $visor.value = calculateResult();
  }

  function getRegexOperations() {
    return new RegExp('\\d+['+ getOperations().join('') +']?', g);
  }

  function calculateResult() {
    var posFixExpression = infixToPosfix($visor.value);
    return posFixEvaluation(posFixExpression);
  }

  function getLastOperator(value) {
    return isLastItemAnOperation(value) ? value.split('').pop() : '';
  }

  function infixToPosfix(expression) {
    var opBuffer = [];
    var posFix = [];

    var tokens = expression.split(' ');

    tokens.forEach(function(token) {
      if( isDigit(token) )
        posFix.push(token);
      else {
        while(opBuffer.length !== 0 && operationPrecedence(opBuffer.slice(-1)[0]) >= operationPrecedence(token)) {
          posFix.push(opBuffer.pop());
        }
        opBuffer.push(token);
      }
    });

    while (opBuffer.length !== 0) {
      posFix.push(opBuffer.pop());
    }

    return posFix.join(' ');
  }

  function posFixEvaluation(expression) {
    var operandBuffer = [];
    var tokens = expression.split(' ');

    tokens.forEach(function( token ) {
      if(isDigit(token))
        operandBuffer.push(Number(token));
      else {
        var operand2 = operandBuffer.pop();
        var operand1 = operandBuffer.pop();
        operandBuffer.push(operations(token, operand1, operand2));
      }
    });

    return operandBuffer.pop();
  }

  function isDigit( item ) {
    return /\d+/.test( item );
  }

  initialize();
})(window, document);
