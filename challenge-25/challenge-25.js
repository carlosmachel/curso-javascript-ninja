(function(win, doc){
  'use strict';
  /*
  Essa semana você terá dois desafios:
  1) Revisar todo o contéudo passado até aqui, e ver se você realmente entendeu
  tudo o que foi passado! Se tiver dúvidas, anote, e então abra issues,
  ou comente no seu pull request mesmo, que eu irei ajudá-lo a entender
  o que não ficou tão claro das aulas anteriores.
  É essencial que você entenda todo o conteúdo que foi passado até aqui,
  para que possamos prosseguir para a parte mais avançada do curso :D

  2) Estudar eventos!
  Acesse a página do MDN:
  https://developer.mozilla.org/en-US/docs/Web/Events#Categories

  Tente aplicar na prática alguns dos eventos que estão ali e coloque nesse
  desafio os experimentos legais que você conseguir desenvolver :D
  */

  function initialize() {
    selectLanguage('en');
    initEvents();
  }

  function selectLanguage(selectedLanguage) {
    var elements = doc.querySelectorAll('[data-lang]');
    Array.prototype.forEach.call(elements, function(element) {
      return element.attributes['data-lang'].value === selectedLanguage
        ? element.style.display = 'inline-block'
        : element.style.display = 'none';
    });
  }

  function initEvents() {
    on('[data-js="inputName"]', 'focus', handleFocus);
    on('[data-js="inputName"]', 'blur', handleBlur);

    on('[data-js="inputEmail"]', 'focus', handleFocus);
    on('[data-js="inputEmail"]', 'blur', handleBlur);

    on('[data-js="form"]', 'submit', handleSubmit);
    on('[data-js="form"]', 'reset', handleReset);

    on('[data-js="language"', 'change', handleChange);
  }

  function handleChange(event) {
    selectLanguage(this.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert('Done! Submit pressed!');
  }

  function handleReset(event) {
    alert('Ohh noo... We lost everything.');
  }

  function handleFocus(event) {
    var $label = getLabelByInputName(this.name);
    switchClass($label, 'above-line', 'upward');
  }

  function handleBlur(event) {
    if(!this.value) {
      var $label = getLabelByInputName(this.name);
      switchClass($label, 'upward', 'above-line');
    }
  }

  function switchClass(element, removedClass, addedClass) {
    element.classList.remove(removedClass);
    element.className += ' ' + addedClass;
  }

  function getLabelByInputName(name) {
    return doc.querySelector('[data-js="label' + name.split('')[0].toUpperCase() + name.slice(1) + '"');
  }

  function on(element, event, callback) {
    doc.querySelector(element).addEventListener(event, callback, false);
  }

  function off(element, event, callback) {
    doc.querySelector(element).removeEventListener(event, callback, false);
  }

  initialize();

})(window, document);
