function Gallery(gallery) {
  const images = gallery.querySelectorAll('.winnerImage');
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  const closeButton = modal.querySelector('.close');
  let currentImage;
  let lastFocus;

  function openModal() {
    if (!modal.matches('.hidden')) return;
    lastFocus = document.activeElement;
    modal.setAttribute('aria-hidden', false);
    modal.classList.remove('hidden');
    focusVideo();
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
    closeButton.addEventListener('click', closeModal);
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', true);
    lastFocus.focus();
    if (modal.querySelector('.modalVideo')) {
      modal.querySelector('.modalVideo').src = '';
    }
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function focusVideo() {
    if (modal.querySelector('.modalVideo')) {
      modal.querySelector('.modalVideo').focus();
    }
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPrevImage();
  }

  function showImage(el) {
    if (!el) {
      console.info('no image to show');
      return;
    }
    // remove the previous website link if it exists
    if (modal.querySelector('.websiteLink')) {
      modal
        .querySelector('figcaption')
        .removeChild(modal.querySelector('.websiteLink'));
    }
    const modalVideo = modal.querySelector('.modalVideo');
    const modalImage = modal.querySelector('.modalImage');
    // if it's a video handle that. else handle the image
    if (el.dataset.video) {
      modalVideo.src = el.dataset.video;
      modalImage.classList.add('hidden');
      modalVideo.classList.remove('hidden');
    } else {
      modalImage.src = el.dataset.full;
      modalVideo.classList.add('hidden');
      modalVideo.src = '';
      modalImage.classList.remove('hidden');
    }
    // update the modal with this info
    modal.querySelector('.modalTitle').textContent = el.title;
    modal.querySelector('.modalGroup').textContent = el.dataset.group;
    modal.querySelector('.modalCategory').textContent = el.dataset.category;
    modal.querySelector('.modalDesigners').textContent = el.dataset.designers;
    // if it's a website add a link
    if (el.dataset.link) {
      console.log(modal.querySelector('figcaption'));
      let tag = document.createElement('a');
      tag.classList.add('websiteLink');
      tag.innerText = el.dataset.linktext;
      tag.href = el.dataset.link;
      tag.target = '_blank';
      modal.querySelector('figcaption').appendChild(tag);
      console.log(modal.querySelector('figcaption'));
    }
    currentImage = el;
    openModal();
  }

  function showNextImage() {
    const nextImg = currentImage.closest('li').nextElementSibling
      ? currentImage.closest('li').nextElementSibling.querySelector('img')
      : gallery.firstElementChild.querySelector('img');
    showImage(nextImg);
    focusVideo();
  }
  function showPrevImage() {
    const prevImg = currentImage.closest('li').previousElementSibling
      ? currentImage.closest('li').previousElementSibling.querySelector('img')
      : gallery.lastElementChild.querySelector('img');
    showImage(prevImg);
    focusVideo();
  }

  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );

  images.forEach(image => {
    image.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    });
  });

  modal.addEventListener('click', handleClickOutside);
}

const gallery4 = Gallery(document.querySelector('.gallery-4'));
const gallery1 = Gallery(document.querySelector('.gallery-1'));
const gallery2 = Gallery(document.querySelector('.gallery-2'));
const gallery3 = Gallery(document.querySelector('.gallery-3'));
