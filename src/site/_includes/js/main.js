function Gallery(gallery) {
  const images = document.querySelectorAll('.winnerImage');
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    if (!modal.matches('.hidden')) return;
    modal.classList.remove('hidden');

    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.add('hidden');
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
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
    // update the modal with this info
    console.log(el.dataset.full);
    modal.querySelector('.modalImage').src = el.dataset.full;
    modal.querySelector('.modalTitle').textContent = el.title;
    modal.querySelector('.modalGroup').textContent = el.dataset.group;
    modal.querySelector('.modalCategory').textContent = el.dataset.category;
    modal.querySelector('.modalDesigners').textContent = el.dataset.designers;

    currentImage = el;
    openModal();
  }

  function showNextImage() {
    const nextImg = currentImage.closest('li').nextElementSibling
      ? currentImage.closest('li').nextElementSibling.querySelector('img')
      : gallery.firstElementChild.querySelector('img');
    showImage(nextImg);
    // showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }
  function showPrevImage() {
    const prevImg = currentImage.closest('li').previousElementSibling
      ? currentImage.closest('li').previousElementSibling.querySelector('img')
      : gallery.lastElementChild.querySelector('img');
    showImage(prevImg);
    // showImage(currentImage.previousElementSibling || gallery.lastElementChild);
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

const gallery1 = Gallery(document.querySelector('.gallery-1'));
const gallery2 = Gallery(document.querySelector('.gallery-2'));
const gallery3 = Gallery(document.querySelector('.gallery-3'));
