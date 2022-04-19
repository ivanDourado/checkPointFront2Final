const codeJwt = sessionStorage.getItem('jwt');//recebeo valor da chave jwt, que é o token JSON web
const form = document.querySelector('form');
const closeApp = document.getElementById("closeApp");
const spinner = document.querySelector('.spinner-loading');

// Faz a leitura dos dados do usuário
const getUser = (token) => {
  const urlApi = "https://ctd-todo-api.herokuapp.com/v1/";//api
  const options = {
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  }

  fetch(urlApi + 'users/getMe', options)
    .then( response => response.json())
    .then( data => {
      const el = document.querySelector('.user-name');//selecionando o p no header
      el.innerHTML = `${data.firstName} ${data.lastName}`;//inserindo dados do usuario no header
    });
};
getUser(codeJwt);//acessa os dados do usuario com o token JWT

//função que formata a data
function date(date) {
  const formatDate = new Date(date);
  return formatDate.toLocaleDateString("pt-BR");
}
//função que aparece o loading na página
const showSpinner = () => {
  return spinner.classList.add("show");
};
//função que esconde o loading na página
const hideSpinner = () => {
  return spinner.classList.remove("show");
};

// Criar função get de novas tarefas
const getNewTasks = function (token) {
  const urlApi = "https://ctd-todo-api.herokuapp.com/v1/";//api
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  }

  fetch(urlApi + 'tasks', options)
  // .then( function (resp) { padrão de escrita da linguagem
  //   return resp.json() 
  // })
  .then( response => response.json() ) // arrow function - este código é sempre padrão
  .then( data => {
    
    data.forEach( taskObj => {
      //pego o elemento no HTML onde quero criar as informações que preciso
      const createTasks = document.querySelector('.create-tasks');
      // crio o elemento de lista
      const listTasks = document.createElement('li');
      listTasks.classList.add("tarefa");
      createTasks.appendChild(listTasks);
      //crio o elemento de div 
      const divDone = document.createElement("div");
      divDone.classList.add("not-done");
      listTasks.appendChild(divDone);
      //crio o elemento de div
      const divDescription = document.createElement("div");
      divDescription.classList.add("descricao");
      listTasks.appendChild(divDescription);
      //crio o parágrafo de descrição da tarefa
      const pNome = document.createElement("p");
      pNome.classList.add("nome");
      pNome.innerText = `${taskObj.description}`;
      divDescription.appendChild(pNome); 
      //crio o parágrafo de data de criação da tarefa
      const pTimestamp = document.createElement("p");
      pTimestamp.classList.add("timestamp");
      pTimestamp.innerText = "Criada em: " + date(taskObj.createdAt);
      divDescription.appendChild(pTimestamp);
    });
    //oculta o eskeleton
    const incluir = document.getElementById("incluir");
    incluir.classList.add("tasks");
  });
};
getNewTasks(codeJwt);

//Função do formulário que cria as novas tarefas
const criaNovaTarefa = (event) => {  
    event.preventDefault();
  
    const newTask = window.getValue('novaTarefa');
    const dataForm = {
      description: newTask.value,
      completed: false
    };
  
    fetch(window.apiApplication + 'tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: codeJwt
      },
      body: JSON.stringify(dataForm)
    })
    .then(resp => resp.json())
    .then(data => {
      //determina início do html
      const createNewTasks = document.querySelector('.create-tasks');
      //cria elemento de lista
      const listTasks = document.createElement("li");
      listTasks.classList.add("tarefa");
      createNewTasks.appendChild(listTasks);
      //cria elemento not-done
      const divDone = document.createElement("div");
      divDone.classList.add("not-done");
      listTasks.appendChild(divDone);
      //cria elemento descricao
      const divDescription = document.createElement("div");
      divDescription.classList.add("descricao");
      listTasks.appendChild(divDescription);
      //cria paragrafo de nome tarefa
      const pNome = document.createElement("p");
      pNome.classList.add("nome");
      pNome.innerHTML = `${data.description}`;
      divDescription.appendChild(pNome);
      //cria paragrafo de data de criação
      const pTimestamp = document.createElement("p");
      pTimestamp.classList.add("timestamp");
      pTimestamp.innerHTML = `Criada em: ${data.createAt}`;
    });  
};
form.addEventListener('submit', criaNovaTarefa);//ao submeter, executa a função

const finalizarSessao = () => {
  showSpinner();
  setTimeout(() => {
    sessionStorage.removeItem('jwt', codeJwt);
    window.location.href = "index.html";
    hideSpinner();
  }, 3000);
};
closeApp.onclick = finalizarSessao;//ao clicar nessa tag p, executa a função 