// constantes e variáveis globais
// console.log(window.apiApplication);

//formulário
const form = document.querySelector('form');
const namePerson = window.getValue('name');
const nickPerson = window.getValue('nickname');
const emailPerson = window.getValue('email');
const password = window.getValue('password');
const repeatPassword = window.getValue('repeatPassword');
// mensagem
const messageName = window.getValue('messageName');
const messageNick = window.getValue('messageNick');
const messageEmail = window.getValue('messageEmail');
// Botão
const btnSubmit = window.getValue('btn-submit');
//mensagens
const smallName = window.getValue('smallName');
const smallNickname = window.getValue('smallNickname');
const smallEmail = window.getValue('smallEmail');
const smallPassword = window.getValue('smallPassword');

// funções e validações

const validaNome = () => {//vadidar nome

  if (namePerson.value === '') {
    smallName.innerHTML = 'Informe seu nome';
    namePerson.classList.add("messageError");
    smallName.classList.add("error");
  } else {
    smallName.innerHTML = '';
    namePerson.classList.remove("messageError");
    smallName.classList.remove("error");
  }

}
namePerson.addEventListener('keydown', validaNome);//ao pressionar a tecla, executar a função

//validação do apelido
const validaApelido = () => {
  if (nickPerson.value === '') {
    smallNickname.innerHTML = "Crie seu apelido";
    nickPerson.classList.add("messageError");
    smallNickname.classList.add("error");
  } else {
    smallNickname.innerHTML = '';
    nickPerson.classList.remove("messageError");
    smallNickname.classList.remove("error");
  }
}
nickPerson.addEventListener('keydown',validaApelido);//ao pressionar a tecla, executar a função

// Validação do Email
const validaEmail = () => {  
    if (emailPerson.value === '') {
      emailPerson.classList.add("messageError");
      smallEmail.innerHTML = "Informe seu email";
      smallEmail.classList.add("error");
    } else {
      smallEmail.innerHTML = '';
      emailPerson.classList.remove("messageError");
      smallEmail.classList.remove("error");
    }  
}
emailPerson.addEventListener('keydown', validaEmail);//ao pressionar a tecla, executar a função
//validação da senha
const validaSenha = () => {
    if (password.value === '') {
      password.classList.add("messageError");
      smallPassword.innerHTML = "Favor cadastrar uma senha";
      smallPassword.classList.add("error");
    } else {
      smallPassword.innerHTML = '';
      password.classList.remove("messageError");
      smallPassword.classList.remove("error");
    }  
}
password.addEventListener('keyup', validaSenha);//ao liberar a tecla, executar a função
//validação da confirmação da senha
const validaRepetirSenha = () => {
    if (password.value !== repeatPassword.value) {
      smallPassword.innerHTML = "A senha deve ser a mesma nos dois campos";
      password.classList.add("messageError");
      smallPassword.classList.add("error");
    } else {
      smallPassword.innerHTML = '';
      password.classList.remove("messageError");
      smallPassword.classList.remove("error");
    }  
}
repeatPassword.addEventListener('keyup', validaRepetirSenha);//ao liberar a tecla, executar a função

// habilitação do botão de Criar Conta
const habilitaBotao = (event) => {
    event.preventDefault();//previne comportamento padrão de submissão de dados ao servidor
    if ((namePerson.value !== '' && nickPerson.value !== '' && emailPerson.value !== '')) {
      btnSubmit.disabled = false;
    } else {
      btnSubmit.disabled = true;
    }
}
form.addEventListener('change', habilitaBotao);//ao alterar os inputs, executar a função

// Envio do formulário API
const envioApi = (event) => {  
  event.preventDefault();
    // criando o objeto com os dados do formulário
    const formData = {
      firstName: namePerson.value,
      lastName: nickPerson.value,
      email: emailPerson.value,
      password: password.value,
    };

    const urlApi = "https://ctd-todo-api.herokuapp.com/v1/";//api
    //objeto de configuração. É nele onde indicamos o método da requisição, cabeçalho, corpo
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
  
    // criando a comunicação com a API
    fetch(urlApi + 'users', options)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // lendo os dados recebidos
        if (typeof data === 'object') {
          alert('Cadastro realizado com sucesso');
          sessionStorage.setItem("jwt", data.jwt);// configura a chave jwt e seu valor
          window.location.href = 'index.html';//redireciona para a pagina de login
        } else {
          alert(data);
        }
      })
      .catch(function (reject) { //caso reject, da promessa não lograr
        alert(reject);
      });
  
}
btnSubmit.addEventListener('click', envioApi);