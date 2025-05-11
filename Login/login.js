window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  const conteudo = document.getElementById("conteudo");

  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
      preloader.style.display = 'none';
      conteudo.classList.remove('hidden');
    }, 500);
  }, 1500); // Tempo que o preloader fica na tela (1.5s)
});
