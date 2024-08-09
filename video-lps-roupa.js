function handleMedias() {
  const htmlModeloVeste = document.querySelector(".modelo-veste");
  const htmlModeloAltura = document.querySelector(".modelo-altura");
  const htmlModeloPeso = document.querySelector(".modelo-peso");
  htmlModeloVeste.textContent = data().modelo.veste;
  htmlModeloAltura.textContent =  `${data().modelo.altura} m`;
  htmlModeloPeso.textContent = `${data().modelo.peso} kg`;

  const productMedias = document.querySelector(".productMedias");
  const videoModal = document.querySelector(".video__modal");
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
                    <img class='video__medidas-ctn-icon' src='{{IMAGENS_LAYOUT}}/open-medidas.svg' alt='Medidas.'>
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
                    <img src='{{IMAGENS_LAYOUT}}/play-video-button.svg'>
                    <span>Ver Vídeo</span>
                </div>
                <video id='video-btn' playsinline autoplay muted loop>
                    <source src='${data().video}' type='video/mp4' alt='{{layout.h1}}' />
                </video>
            </div>
            <div class='ver-mais-fotos'>
                <img src='{{IMAGENS_LAYOUT}}/open-modal.svg' alt='Ver mais fotos.'>
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
          <img src='{{IMAGENS_LAYOUT}}/${image}.webp' onclick='currentSlide(${
      index + 1
    })' class='hover-shadow' alt='{{layout.h1}}'>
      </div>
    `;
    const modalImagesContent = `
      <div class='mySlides'>
        <span class='close cursor'>&times;</span>
        <div class='numbertext'>1 / ${index + 1}</div>
        <img src='{{IMAGENS_LAYOUT}}/${image}.webp' alt='{{layout.h1}}'>
        <!-- Next/previous controls -->
        <a class='prev' onclick='plusSlides(-1)'>&#10094;</a>
        <a class='next' onclick='plusSlides(1)'>&#10095;</a>
      </div>
    `;
    const thumbsModalContent = `
      <div class='column'>
        <img class='demo' src='{{IMAGENS_LAYOUT}}/${image}.webp' onclick='currentSlide(${
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
