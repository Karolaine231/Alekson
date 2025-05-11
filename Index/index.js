let currentSection = 0;

const sections = document.querySelectorAll('.section');

window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    // Rolagem para baixo
    currentSection = Math.min(sections.length - 1, currentSection + 1);
  } else {
    // Rolagem para cima
    currentSection = Math.max(0, currentSection - 1);
  }

  // Scroll para a próxima seção
  sections[currentSection].scrollIntoView({
    behavior: 'smooth',
  });
});


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

const elTodosItems = document.querySelectorAll(".elemento__cartao");

const expand = (item, i) => {
  elTodosItems.forEach((it, ind) => {
    if (i === ind) return;
    it.clicked = false;
  });
  gsap.to(elTodosItems, {
    width: item.clicked ? "15vw" : "8vw",
    duration: 2,
    ease: "elastic(1, .6)",
  });

  item.clicked = !item.clicked;
  gsap.to(item, {
    width: item.clicked ? "42vw" : "15vw",
    duration: 2.5,
    ease: "elastic(1, .3)",
  });
};

elTodosItems.forEach((item, i) => {
  item.clicked = false;
  item.addEventListener("click", () => expand(item, i));
});