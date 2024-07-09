// Script Side Bar
//Sobreposição NavBar
/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function menuInspiracoes() {
  closeNav();
  document.getElementById("main").style.display = "none";
  document.getElementById("inspiracao").style.display = "";
  document.getElementById("influencers").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("forum").style.display = "none";

}

function menuInfluencers() {
  closeNav();
  document.getElementById("main").style.display = "none";
  document.getElementById("inspiracao").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("forum").style.display = "none";

  document.getElementById("influencers").style.display = "";
}
function menuBrecho() {
  closeNav();
  document.getElementById("main").style.display = "none";
  document.getElementById("inspiracao").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("forum").style.display = "none";

  document.getElementById("brecho").style.display = "";
}
function menuMain() {
  closeNav();
  document.getElementById("main").style.display = "";
  document.getElementById("inspiracao").style.display = "none";
  document.getElementById("influencers").style.display = "none";
  document.getElementById("forum").style.display = "none";

  document.getElementById("login").style.display = "none";

}

function menuCadastro() {
  menuLogin();
  document.getElementById("chk").click();
}

function menuLogin() {
  closeNav();
  let checkbox = document.getElementById('chk');
  document.getElementById("main").style.display = "none";
  document.getElementById("inspiracao").style.display = "none";
  document.getElementById("influencers").style.display = "none";
  document.getElementById("login").style.display = "";
  document.getElementById("forum").style.display = "none";
  document.getElementById("chk").click();

  if (!checkbox.checked) {
    checkbox.click();
  }

}

function menuForum() {
  if (sessionStorage.getItem('nome') == null) {
    menuLogin();
    return;
  }
  closeNav();


  document.getElementById("main").style.display = "none";
  document.getElementById("inspiracao").style.display = "none";
  document.getElementById("influencers").style.display = "none";
  document.getElementById("cadastro").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("forum").style.display = "";

}




document.addEventListener('DOMContentLoaded', function () {
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  lightboxTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      createLightbox(trigger);
    });
  });

  function createLightbox(trigger) {
    const imageUrl = trigger.href;
    const imageCaption = trigger.querySelector('.inspiracao-info').innerHTML;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
  <div class="lightbox-content">
    <span class="close-btn">&times;</span>
    <img src="${imageUrl}">
      <div class="caption">${imageCaption}</div>
  </div>`;
    document.body.appendChild(lightbox);

    lightbox.querySelector('.close-btn').addEventListener('click', function () {
      lightbox.remove();
    });
  }
});

document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    nascimento: document.getElementById('nascimento').value,
    senha: document.getElementById('senha').value
  };

  try {
    const response = await fetch('cadastro.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    alert('Erro ao realizar o cadastro.');
  }
});

document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const email = document.getElementById('emailLogin').value;
  const senha = document.getElementById('senhaLogin').value;

  const response = await fetch('login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, senha: senha })
  });

  const result = await response.json();

  if (result.message === "Login realizado com sucesso!") {
    // Armazenar credenciais no Session Storage
    sessionStorage.setItem('nome', result.nome);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('senha', senha);
    document.getElementById("nomeUsuarioLogado").innerText = result.nome;
  }
});

if (sessionStorage.getItem('nome') != null) {
  document.getElementById("nomeUsuarioLogado").innerText = sessionStorage.getItem('nome');

}

// Função para listar os tópicos
async function listarTopicos() {
  const response = await fetch('topicos.php');
  const topicos = await response.json();

  const topicosList = document.getElementById('topicosList');
  topicosList.innerHTML = '';

  if (topicos.length > 0) {
    topicos.forEach(topico => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${topico.topico}</h3>`;
      topicosList.appendChild(div);

      div.addEventListener('click', () => {
        listarMensagens(topico.id);
        document.getElementById('idTopico').value = topico.id;
      });
    });
  } else {
    topicosList.innerHTML = '<p>Nenhum tópico encontrado.</p>';
  }
}

// Função para listar as mensagens de um tópico específico
async function listarMensagens(idTopico) {
  const response = await fetch(`mensagens.php?idTopico=${idTopico}`);
  const mensagens = await response.json();

  const mensagensList = document.getElementById('mensagensList');
  mensagensList.innerHTML = '';
  document.getElementById("divNovaMensagemForm").style.display = '';
  if (mensagens.length > 0) {
    mensagens.forEach(mensagem => {
      const div = document.createElement('div');
      div.classList.add('mensagem');
      div.innerHTML = `
                        <p><strong>${mensagem.datahora}</strong></p>
                        <p>Usuário: ${mensagem.idUser}</p>
                        <p>${mensagem.mensagem}</p>
                    `;
      mensagensList.appendChild(div);
    });
  } else {
    mensagensList.innerHTML = '<p>Nenhuma mensagem encontrada para este tópico.</p>';
  }
}

// Event listener para adicionar novo tópico
document.getElementById('novoTopicoForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const topico = document.getElementById('topico').value;
  const mensagem = document.getElementById('mensagemTopico').value;
  const email = sessionStorage.getItem('email');
  const senha = sessionStorage.getItem('senha');

  const response = await fetch('topicos.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ topico: topico, mensagem: mensagem, email: email, senha: senha })
  });

  const result = await response.json();
  document.getElementById('responseTopico').innerText = result.message;
  listarTopicos();
});

// Event listener para adicionar nova mensagem
document.getElementById('novaMensagemForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const mensagem = document.getElementById('mensagemResposta').value;
  const email = sessionStorage.getItem('email');
  const senha = sessionStorage.getItem('senha');
  const idTopico = document.getElementById('idTopico').value;

  const response = await fetch('mensagens.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mensagem: mensagem, email: email, senha: senha, idTopico: idTopico })
  });

  const result = await response.json();
  document.getElementById('responseMensagem').innerText = result.message;
  listarMensagens(idTopico);
});

// Carregar tópicos ao carregar a página
listarTopicos();

// Scroll rodape
