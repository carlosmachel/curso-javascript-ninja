(function(DOM){
  'use strict';
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

  function app() {
    var $formCep = new DOM('[data-js="form-cep"]');
    var $inputCep = new DOM('[data-js="input-cep"]');
    var $fields = new DOM('[data-js="search-result"]');
    var $status = new DOM('[data-js="status"]');
    var ajax = new XMLHttpRequest();
    $formCep.on('submit', handleSubmitFormCep);

    function handleSubmitFormCep(event) {
      event.preventDefault();
      searchCep();
    }

    function searchCep() {
      if(!isCepValid()) {
        getMessage('error');
        return;
      }

      var url = getUrl();
      ajax.open('GET', url);
      ajax.send(null);
      getMessage('loading');
      ajax.addEventListener('readystatechange', handleReadyStateChange);
    }

    function getUrl() {
      return replaceCep('https://viacep.com.br/ws/[CEP]/json/');
    }

    function sanitizeCep(){
      return $inputCep.get()[0].value.replace(/\D/g, '');
    }

    function handleReadyStateChange() {
      if( isRequestOk() ) {
        getMessage('ok');
        populateCepFields();
      }
    }


    function isRequestOk() {
      return ajax.readyState === 4 && ajax.status === 200;
    }

    function populateCepFields () {
      var data = parseData();
      if(!data || data.erro) {
        getMessage('error');
        data = clearData();
      }

      $fields.forEach(function(item){
        item.textContent = data[item.getAttribute('data-js-name')];
      });
    }

    function clearData() {
      return {
        logradouro: '-',
        bairro: '-',
        uf: '-',
        localidade: '-',
        cep: '-'
      }
    }

    function parseData(){
      var result;

      try {
        result = JSON.parse(ajax.responseText);
      }
      catch(e) {
        result = null;
      }
      return result;
    }

    function getMessage(type) {
      var messages = {
        loading: replaceCep('Buscando informações para o CEP [CEP]...'),
        ok: replaceCep('Endereço referente ao CEP [CEP]:'),
        error: replaceCep('Não encontramos o endereço para o CEP [CEP].')
      };
      $status.get()[0].textContent = messages[type];
    }

    function replaceCep(message) {
      return message.replace('[CEP]', sanitizeCep());
    }

    function isCepValid() {
      return sanitizeCep().length === 8;
    }

    return {
      getMessage: getMessage,
      replaceCep: replaceCep
    };
  }

  window.app = app;
  app();

})(window.DOM);
