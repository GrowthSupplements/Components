function handleMedias() {
  const htmlModeloVeste = document.querySelector(".modelo-veste");
  const htmlModeloAltura = document.querySelector(".modelo-altura");
  const htmlModeloPeso = document.querySelector(".modelo-peso");
  htmlModeloVeste.textContent = data().modelo.veste;
  htmlModeloAltura.textContent =  `${data().modelo.altura} m`;
  htmlModeloPeso.textContent = `${data().modelo.peso} kg`;

  const productMedias = document.querySelector(".productMedias");
  const videoModal = document.querySelector(".video__modal");

  const renderImages = /%7B%7BIMAGENS_LAYOUT%7D%7D/;

  const videoModalContent = `
      <div class='video__modal-wrapper'>
        <div class='video__container'>
            <span class='video__close'>&times;</span>
            <video id='video-modal' playsinline muted loop>
                <source class='video__modal-src' src='${data().video}' type='video/mp4' alt='{{layout.h1}}' />
            </video>
            <div class='video__medidas-ctn'>
                <div class='video__medidas-ctn-title'>
                    <h4>Medidas da modelo</h4>
                    <img class='video__medidas-ctn-icon' src='%7B%7BIMAGENS_LAYOUT%7D%7D/open-medidas.svg' alt='Medidas.'>
                </div>
                <div class='video__medidas-caracteristicas'>
                    <div class='video__medidas-tamanho'>
                        <span>Modelo veste:</span>
                        <span class='size'>${data().modelo.veste}</span>
                    </div>
                    <div class='line-wrapper'></div>
                    <div class='video__medidas-info'>
                        <span class='gray-text'><b class='video__medidas-caracteristicas--color'>Altura:</b> ${data().modelo.altura} m</span>
                        <span class='gray-text'><b class='video__medidas-caracteristicas--color'>Peso:</b> ${data().modelo.peso} kg</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
  const productMediaContent = `
  <div class='ver-mais-ctn'>
        <div class='buttons'>
            <div class='video__button'>
                <div class='video__button-text'>
                    <img src='%7B%7BIMAGENS_LAYOUT%7D%7D/play-video-button.svg'>
                    <span>Ver Vídeo</span>
                </div>
                <video id='video-btn' playsinline autoplay muted loop>
                    <source src='${data().video}' type='video/mp4' alt='{{layout.h1}}' />
                </video>
            </div>
            <div class='ver-mais-fotos'>
                <img src='%7B%7BIMAGENS_LAYOUT%7D%7D/open-modal.svg' alt='Ver mais fotos.'>
                <span>Ver mais fotos</span>
            </div>
        </div>
    </div>
    <div class='screen-control product-slider'></div>
    <div class='screen-control-nav product-slider-nav hide-for-large'></div>

    <div id='myModal' class='modal show-for-large'>
        <div class='modal-content'>

            <div class='slides-modal'></div>

            <!-- Thumbnail image controls -->
            <div class='medium-1 d-flex flex-column thumbsModal hide-for-small-only'></div>
        </div>
    </div>
  `;
  productMedias.innerHTML = productMediaContent;
  videoModal.innerHTML = videoModalContent;
}
handleMedias();

function appendImages(pai, type) {
  const vitrinePrincipal = document.querySelector(pai);
  const vitrinePrincipalNav = document.querySelector(".screen-control-nav");
  const modal = document.querySelector(".slides-modal");
  const thumbsModal = document.querySelector(".thumbsModal");

  data().images.forEach((image, index) => {
    const vitrinePrincipalContent = `
      <div class='medium-6 mediaWrapper '>
          <img src='%7B%7BIMAGENS_LAYOUT%7D%7D/${image}.webp' onclick='currentSlide(${
      index + 1
    })' class='hover-shadow' alt='{{layout.h1}}'>
      </div>
    `;
    const modalImagesContent = `
      <div class='mySlides'>
        <span class='close cursor'>&times;</span>
        <div class='numbertext'>1 / ${index + 1}</div>
        <img src='%7B%7BIMAGENS_LAYOUT%7D%7D/${image}.webp' alt='{{layout.h1}}'>
        <!-- Next/previous controls -->
        <a class='prev' onclick='plusSlides(-1)'>&#10094;</a>
        <a class='next' onclick='plusSlides(1)'>&#10095;</a>
      </div>
    `;
    const thumbsModalContent = `
      <div class='column'>
        <img class='demo' src='%7B%7BIMAGENS_LAYOUT%7D%7D/${image}.webp' onclick='currentSlide(${
      index + 1
    })' alt='{{layout.h1}}'>
      </div>
    `;
    if (type === "principal") {
      if (index < 4 && window.innerWidth > 1024) {
        vitrinePrincipal.innerHTML += vitrinePrincipalContent;
      }
      if (window.innerWidth <= 1024) {
        vitrinePrincipal.innerHTML += vitrinePrincipalContent;
      }
      vitrinePrincipalNav.innerHTML += vitrinePrincipalContent;
    }

    if (type === "modal") {
      modal.innerHTML += modalImagesContent;
      thumbsModal.innerHTML += thumbsModalContent;
    }
  });
}

appendImages(".screen-control", "principal");
appendImages("slides-modal", "modal");


// CONTROLE DE TECLAS
function handleRightLeftKeys() {
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      plusSlides(-1);
    }
    if (event.key === "ArrowRight") {
      plusSlides(1);
    }
  });
}

// lida com os modais
function openModal(gatilho, modal) {
  const a = document.querySelectorAll(gatilho);
  a.forEach((element) => {
    element.addEventListener("click", function () {
      let videoBtn = document.getElementById("video-btn");
      let video = document.getElementById("video-modal");
      const b = document.querySelector(modal);
      b.style.display = "flex";
      document.body.style.overflow = "hidden";
      video.play();
      if (videoBtn.played) {
        videoBtn.pause();
      }
    });
  });
}

openModal(".ver-mais-fotos", "#myModal");
openModal(".video__button", ".video__modal");
openModal(".hover-shadow", "#myModal");

function closeModal(closeBtn, modal) {
  const a = document.querySelectorAll(closeBtn);
  a.forEach((element) => {
    element.addEventListener("click", function () {
      const b = document.querySelector(modal);
      let videoBtn = document.getElementById("video-btn");
      let video = document.getElementById("video-modal");
      const content = document.querySelector(".video__medidas-ctn");
      content.classList.remove("active-content");
      b.style.display = "none";
      document.body.style.overflow = "auto";
      if (videoBtn.paused) {
        videoBtn.play();
      }
      video.pause();
      video.currentTime = 0;
    });
  });
}

closeModal(".video__close", ".video__modal");
closeModal(".close", "#myModal");

window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  let videoBtn = document.getElementById("video-btn");
  let video = document.getElementById("video-modal");
  const videoModal = document.querySelector(".video__modal");
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    if (videoBtn.paused) {
      videoBtn.play();
    } else {
      videoBtn.pause();
    }
  }
  if (event.target == videoModal) {
    const content = document.querySelector(".video__medidas-ctn");
    content.classList.remove("active-content");
    videoModal.style.display = "none";
    document.body.style.overflow = "auto";
    if (videoBtn.paused) {
      videoBtn.play();
    } else {
      videoBtn.pause();
    }
    video.pause();
    video.currentTime = 0;
  }
};

//lida com medidas da modelo dentro do modal

function openMedidas() {
  const openMedidas = document.querySelector(".video__medidas-ctn-title");
  const content = document.querySelector(".video__medidas-ctn");
  const btn = document.querySelector(".video__medidas-ctn-icon");
  openMedidas.addEventListener("click", () => {
    content.classList.toggle("active-content");
    btn.classList.toggle("active-btn");
  });
}

openMedidas();

function playPauseVideo() {
  let videoBtn = document.getElementById("video-btn");
  let video = document.getElementById("video-modal");
  let videoModal = document.querySelector(".video__modal");
  videoBtn.addEventListener("click", () => {
    if ((videoModal.style.display = "flex" && videoBtn.played)) {
      videoBtn.pause();
    }
  });
  video.addEventListener("click", function () {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}

playPauseVideo();

function escKeyPressed() {
  const modal = document.getElementById("myModal");
  const videoModal = document.querySelector(".video__modal");
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      const content = document.querySelector(".video__medidas-ctn");
      content.classList.remove("active-content");
      modal.style.display = "none";
      videoModal.style.display = "none";
      document.body.style.overflow = "auto";
      let videoBtn = document.getElementById("video-btn");
      let video = document.getElementById("video-modal");
      if (videoBtn.paused) {
        videoBtn.play();
      }
      video.pause();
      video.currentTime = 0;
    }
  });
}

escKeyPressed();

//slide do desk
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  if (window.innerWidth > 1024) {
    showSlides((slideIndex += n));
  }
}

function currentSlide(n) {
  if (window.innerWidth > 1024) {
    showSlides((slideIndex = n));
  }
}

function showSlides(n) {
  if (window.innerWidth > 1024) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("demo");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }
}

// Inicializar elementos
function initialize(selector, callback) {
  document.querySelectorAll(selector).forEach(function (element) {
    callback.call(element);
  });
}

// Manipulação de clique e toggle das boxes
initialize("[data-conteudo]", function () {
  this.addEventListener("click", function () {
    if (window.innerWidth <= 1023) {
      let boxCorrespondente = this.getAttribute("data-conteudo");
      document.querySelectorAll("[data-conteudo].open").forEach(
        function (el) {
          if (el !== this) {
            el.classList.remove("open");
          }
        }.bind(this)
      );
      document.querySelector('[data-conteudo="' + boxCorrespondente + '"]').classList.toggle("open");

      document.querySelectorAll(".boxMainConteudo").forEach(function (el) {
        if (el.id !== boxCorrespondente) {
          el.style.display = "none";
          el.classList.remove("boxMainConteudo-aberto");
        }
      });

      let targetBox = document.getElementById(boxCorrespondente);
      if (targetBox.classList.contains("boxMainConteudo-aberto")) {
        targetBox.style.display = "none";
        targetBox.classList.remove("boxMainConteudo-aberto");
      } else {
        targetBox.style.display = "block";
        setTimeout(function () {
          targetBox.classList.add("boxMainConteudo-aberto");
        }, 300);

        setTimeout(function () {
          let pontoScroll = targetBox.getBoundingClientRect().top + window.pageYOffset - 150;
          window.scrollTo({ top: pontoScroll, behavior: "smooth" });
        }, 400);
      }
    }
  });
});

// Exibir a barra superior
initialize("#infoProd", function () {
  const barraTop = document.querySelector(".containerBarraTop");
  barraTop.style.display = "block";
  barraTop.style.height = "auto";
});

// Abrir e fechar as perguntas
initialize("#accordion", function () {
  document.querySelectorAll(".duvidas-pergunta").forEach(function (pergunta) {
    pergunta.addEventListener("click", function () {
      document.querySelectorAll(".duvidas-resposta").forEach(function (resposta) {
        resposta.style.display = "none";
      });
      if (pergunta.classList.contains("open")) {
        pergunta.classList.remove("open");
      } else {
        document.querySelectorAll(".duvidas-pergunta.open").forEach(function (openPergunta) {
          openPergunta.classList.remove("open");
        });
        pergunta.classList.add("open");
        pergunta.nextElementSibling.style.display = "block";
      }
    });
  });
});

// Função para inicializar rolagem suave
function initializeScroll() {
  document.querySelectorAll("[data-scroll]").forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      var targetId = this.getAttribute("data-scroll");
      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        var pontoScroll = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: pontoScroll, behavior: "smooth" });
      }
    });
  });
}

// Inicializar funções
initializeScroll();
handleRightLeftKeys();

if (window.innerWidth < 1024) {
  $(".product-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    asNavFor: ".product-slider-nav",
    pauseHover: true,
  });
  $(".product-slider-nav").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".product-slider",
    arrows: false,
    focusOnSelect: true,
  });
}
