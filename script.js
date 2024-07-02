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
  document.getElementById("cadastro").style.display = "none";

}

function menuInfluencers() {
  closeNav();
  document.getElementById("main").style.display = "none";
  document.getElementById("inspiracao").style.display = "none";
  document.getElementById("cadastro").style.display = "none";

  document.getElementById("influencers").style.display = "";
}
function menuMain() {
  closeNav();
  document.getElementById("main").style.display = "";
  document.getElementById("inspiracao").style.display = "none";
  document.getElementById("influencers").style.display = "none";
  document.getElementById("cadastro").style.display = "none";


}

function menuCadastro() {
  closeNav();

  document.getElementById("main").style.display = "none";
  document.getElementById("inspiracao").style.display = "none";
  document.getElementById("influencers").style.display = "none";
  document.getElementById("cadastro").style.display = "";
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
    document.getElementById('mensagem').textContent = result.message;
  } catch (error) {
    document.getElementById('mensagem').textContent = 'Erro ao realizar o cadastro.';
  }
});