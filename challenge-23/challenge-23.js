(function( win, doc ){
  'use strict';
  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
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

  function mathFunctions(operation) {
    var operations = {
      '+': function add ( arg1, arg2 ) {
        return Number(arg1) + Number(arg2);
      },
      '-': function minus ( arg1, arg2 ) {
        return Number(arg1) - Number(arg2);
      },
      '÷': function divide ( arg1, arg2 ) {
        return Number(arg1) / Number(arg2);
      },
      'x': function mutiply ( arg1, arg2 ) {
        return Number(arg1) * Number(arg2);
      }
    }

    return operations[operation];
  }

  /* dom elements */

  var $input = doc.querySelector( 'input' );
  var $buttonNumbers = doc.querySelectorAll( '[data-js="number"]' );
  var $buttonOperations = doc.querySelectorAll( '[data-js="operation"]' );
  var $buttonEqual = doc.querySelector( '[data-js="equal"]' );
  var $buttonCE = doc.querySelector( '[data-js="ce"]' );

  function handleClickNumber( ) {
    if( $input.value === '0' )
      return $input.value = this.value;

    return $input.value += this.value;
  }

  function handleClickOperation( ) {
    $input.value = removeLastItemIfIsAnOperator( $input.value );
    $input.value += ' ' + this.value + ' ';
  }

  function removeLastItemIfIsAnOperator( number ) {
    if( isLastItemAnOperation( number ) )
      return number.slice(0, -3);

    return number;
  }

  function isLastItemAnOperation ( number ) {
    return /(?:[x+÷-]+$)/.test( number.trim() );
  }

  function handleClickEqual() {
    $input.value = removeLastItemIfIsAnOperator( $input.value );
    calculateResult();
  }

  function calculateResult() {
    var posFix = infixToPosfix($input.value);
    $input.value = posFixEvaluation(posFix);
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

    tokens.forEach(function(token) {
      if(isDigit(token))
        operandBuffer.push(Number(token));
      else {
        var operand2 = operandBuffer.pop();
        var operand1 = operandBuffer.pop();
        operandBuffer.push(mathFunctions(token)(operand1, operand2));
      }
    });

    return operandBuffer.pop();
  }

  function isDigit( item ) {
    return /\d+/.test( item );
  }

  function handleClickCE() {
    $input.value = '0';
  }

  Array.prototype.forEach.call($buttonNumbers, function ( item ) {
    item.addEventListener( 'click', handleClickNumber, false );
  });

  Array.prototype.forEach.call($buttonOperations, function ( item ) {
      item.addEventListener( 'click', handleClickOperation, false );
  });

  $buttonCE.addEventListener( 'click', handleClickCE, false);
  $buttonEqual.addEventListener( 'click', handleClickEqual, false);

})(window, document);
