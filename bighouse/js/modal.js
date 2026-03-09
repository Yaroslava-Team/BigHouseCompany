const modal = document.getElementById('projectModal');
const buttons = document.querySelectorAll('.project-btn');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.getElementById('prevImage');
const nextBtn = document.getElementById('nextImage');

const projectsData = {
  forest: {
    title: 'Forest 120 м²',
    images: ['assets/forestfull.png', 'assets/forest-2.png', 'assets/forest-3.png'], 
    description: `
      <p>Компактный дом для комфортной жизни за городом.</p>
      <p>Продуманная планировка с двумя спальнями, просторной кухней-гостиной и выходом на террасу. Панорамные окна обеспечивают естественное освещение и ощущение единства с природой.</p>
      <p>Идеальный вариант для молодой семьи или загородного отдыха.</p>
    `
  },
  family: {
    title: 'Family 180 м²',
    images: ['assets/familyfull.png', 'assets/family-2.png', 'assets/family-3.png'],
    description: `
      <p>Функциональный дом для большой семьи.</p>
      <p>Три спальни, просторная гостиная со вторым светом и отдельная зона отдыха создают комфортное пространство для жизни и приема гостей. Предусмотрен гараж и удобная хозяйственная зона.</p>
      <p>Баланс практичности и уюта в современном исполнении.</p>
    `
  },
  modern: {
    title: 'Modern 250 м²',
    images: ['assets/modernfull.png', 'assets/modern-2.png', 'assets/modern-3.png'],
    description: `
      <p>Современная архитектура и простор.</p>
      <p>Дом с плоской крышей и лаконичным фасадом в стиле минимализм. Большая гостиная, кабинет, мастер-спальня с гардеробной и продуманная зона хранения делают проект удобным для постоянного проживания.</p>
      <p>Идеальное решение для ценителей архитектурного стиля и пространства.</p>
    `
  }
};

let currentProject = null;
let currentImageIndex = 0;

function openModal(projectKey) {
  const data = projectsData[projectKey];
  if (!data) return;

  currentProject = projectKey;
  currentImageIndex = 0;
  updateModalContent();
  modal.style.display = 'block';
}

function updateModalContent() {
  if (!currentProject) return;
  const data = projectsData[currentProject];
  modalTitle.textContent = data.title;
  modalImage.src = data.images[currentImageIndex];
  modalDescription.innerHTML = data.description;
}

function nextImage() {
  if (!currentProject) return;
  const data = projectsData[currentProject];
  currentImageIndex = (currentImageIndex + 1) % data.images.length;
  modalImage.src = data.images[currentImageIndex];
}

function prevImage() {
  if (!currentProject) return;
  const data = projectsData[currentProject];
  currentImageIndex = (currentImageIndex - 1 + data.images.length) % data.images.length;
  modalImage.src = data.images[currentImageIndex];
}

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const project = button.dataset.project;
    openModal(project);
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

if (prevBtn) {
  prevBtn.addEventListener('click', prevImage);
}
if (nextBtn) {
  nextBtn.addEventListener('click', nextImage);
}