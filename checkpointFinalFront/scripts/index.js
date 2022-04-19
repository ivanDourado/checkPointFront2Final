// Constantes e variáveis
const form = document.querySelector('form');
const email = window.getValue("inputEmail");
const password = window.getValue("inputPassword");
const smallEmail = window.getValue("messageEmail");
const smallPassword = window.getValue("messagePassword");
const btnAccess = window.getValue("btnAccess");

const spinner = document.querySelector('.spinner-loading');

// Funções e validações 

const showSpinner = () => {
  return spinner.classList.add("show");
};

const hideSpinner = () => {
  spinner.classList.remove("show");
}

// validando email
const validaEmailLogin = () => {
  if (email.value === '') {
    email.classList.add("messageError");
    smallEmail.innerHTML = "Favor preencher ser usuário/email";
    smallEmail.classList.add("error");
  } else {
    email.classList.remove("messageError");
    smallEmail.innerHTML = '';
    smallEmail.classList.remove("error");
  }
}
email.addEventListener('keyup', validaEmailLogin);

//validando password
const validaPasswordLogin = () => {
  if (password.value === '') {
    password.classList.add("messageError");
    smallPassword.innerHTML = "Favor informar sua senha";
    smallPassword.classList.add("error");
  } else {
    password.classList.remove("messageError");
    smallPassword.innerHTML = '';
    smallPassword.classList.remove("error");
  }
}
password.addEventListener('keyup', validaPasswordLogin);

//habilitar botão do login
const habilitaBotaoLogin = () => {
  if (email.value !== '' && password.value !== '') {
    btnAccess.disabled = false;
  }
}
form.addEventListener('keyup', habilitaBotaoLogin);

// enviando o formulário de login para a api
const envioApiLogin = (event) => {

  event.preventDefault();
  //criando objeto para comunicação com a API

  //exibe spinner
  showSpinner();

  // objeto json com os valores dos inputs do login
  const formLogin = {
    email: email.value,
    password: password.value
  };

  const urlApi = "https://ctd-todo-api.herokuapp.com/v1/";//api
  //objeto de configuração. É nele onde indicamos o método da requisição, cabeçalho, corpo
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formLogin)//irá transformar um objeto JavaScript em uma String no Formato JSON.
  }


  //Criando a comunicação com a API                           
  //         \loga o usuario na api/
  //             \^^  |  ^^ /
  fetch(urlApi + 'users/login', options)
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    if (typeof data === 'object') {
      //guardo o token no ssessionStorage
      sessionStorage.setItem("jwt", data.jwt);//verifica se o token do usuário é o registrado
      //rota de direcionamento para a página tarefas
      window.location.href = 'tarefas.html';
    } else if (typeof data === 'string') {
      alert(data);
      hideSpinner();
    } else {
      hideSpinner();
    }
  });
}
btnAccess.addEventListener('click', envioApiLogin);