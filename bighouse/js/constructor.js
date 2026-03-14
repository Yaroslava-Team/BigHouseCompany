// SUPABASE
const SUPABASE_URL = "https://bsfyjxwswqwnfrwyaytl.supabase.co";
const SUPABASE_KEY = "sb_publishable_ovErQXGiE8Q4cIeqr6fnyw_-tkO-j8D";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// слайдеры
const areaSlider = document.getElementById('areaSlider');
const areaValue = document.getElementById('areaValue');

const bedroomSlider = document.getElementById('bedroomSlider');
const bedroomValue = document.getElementById('bedroomValue');

const bathroomSlider = document.getElementById('bathroomSlider');
const bathroomValue = document.getElementById('bathroomValue');

const ceilingSlider = document.getElementById('ceilingSlider');
const ceilingValue = document.getElementById('ceilingValue');

const terraceSlider = document.getElementById('terraceSlider');
const terraceValue = document.getElementById('terraceValue');

const garageSlider = document.getElementById('garageSlider');
const garageValue = document.getElementById('garageValue');

const priceElement = document.getElementById('totalPrice');


// опции
const floorButtons = document.querySelectorAll('#floorsOptions .option');
const materialButtons = document.querySelectorAll('#materialOptions .option');
const roofButtons = document.querySelectorAll('#roofOptions .option');


// текущие значения
let floor = 1;
let material = 'frame';
let roof = 'flat';


// цены
const basePricePerM2 = {
  frame: 55000,
  block: 70000,
  brick: 90000
};

const floorCoefficient = {
  1: 1.0,
  2: 1.15,
  3: 1.3
};

function ceilingCoefficient(height) {
  return 1 + (height - 3.0) * 0.1;
}

const terracePricePerM2 = 25000;
const garagePricePerM2 = 20000;



// подсчет цены
function updatePrice() {

  const area = parseInt(areaSlider.value, 10);
  const baseM2Price = basePricePerM2[material];

  const floorFactor = floorCoefficient[floor];
  const ceilingFactor = ceilingCoefficient(parseFloat(ceilingSlider.value));

  let total = area * baseM2Price * floorFactor * ceilingFactor;

  const terraceArea = parseInt(terraceSlider.value, 10);
  if (terraceArea > 0) {
    total += terraceArea * terracePricePerM2;
  }

  const garageArea = parseInt(garageSlider.value, 10);
  if (garageArea > 0) {
    total += garageArea * garagePricePerM2;
  }

  priceElement.innerText = total.toLocaleString('ru-RU') + ' ₽';

}



// обновление значения слайдеров
function updateSliderValues() {

  areaValue.innerText = areaSlider.value;
  bedroomValue.innerText = bedroomSlider.value;
  bathroomValue.innerText = bathroomSlider.value;

  ceilingValue.innerText = parseFloat(ceilingSlider.value).toFixed(1);

  terraceValue.innerText = terraceSlider.value;
  garageValue.innerText = garageSlider.value;

}



// инициализация по URL (при переходе из проекта)
function initFromURL() {

  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('area')) {
    areaSlider.value = parseInt(urlParams.get('area'));
  }

  if (urlParams.has('bedrooms')) {
    bedroomSlider.value = parseInt(urlParams.get('bedrooms'));
  }

  if (urlParams.has('bathrooms')) {
    bathroomSlider.value = parseInt(urlParams.get('bathrooms'));
  }

  if (urlParams.has('ceiling')) {
    ceilingSlider.value = parseFloat(urlParams.get('ceiling'));
  }

  if (urlParams.has('terraceArea')) {
    terraceSlider.value = parseInt(urlParams.get('terraceArea'));
  }

  if (urlParams.has('garageArea')) {
    garageSlider.value = parseInt(urlParams.get('garageArea'));
  }

  updateSliderValues();
  updatePrice();

}



// события слайдера
areaSlider.addEventListener('input', () => {
  updateSliderValues();
  updatePrice();
});

bedroomSlider.addEventListener('input', updateSliderValues);
bathroomSlider.addEventListener('input', updateSliderValues);

ceilingSlider.addEventListener('input', () => {
  updateSliderValues();
  updatePrice();
});

terraceSlider.addEventListener('input', () => {
  updateSliderValues();
  updatePrice();
});

garageSlider.addEventListener('input', () => {
  updateSliderValues();
  updatePrice();
});



// выбор пола
floorButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    floorButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    floor = parseInt(btn.dataset.floor);

    updatePrice();
  });
});



// выбор материала
materialButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    materialButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    material = btn.dataset.material;

    updatePrice();
  });
});



// выбор крыши
roofButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    roofButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    roof = btn.dataset.roof;

  });
});



document.addEventListener('DOMContentLoaded', function () {

  const formModal = document.getElementById('formModal');
  const submitBtn = document.querySelector('.submit-btn');
  const formClose = document.getElementById('formClose');
  const estimateForm = document.getElementById('estimateForm');

  if (!formModal || !submitBtn || !formClose || !estimateForm) {
    console.warn('Не найдены элементы модального окна');
    return;
  }

  // создание формы
  const successModal = document.createElement('div');
  successModal.id = 'successModal';
  successModal.innerHTML = `
    <div class="success-modal__content">
      <div class="success-modal__icon">✓</div>
      <h3 class="success-modal__title">Заявка отправлена!</h3>
      <p class="success-modal__text">Мы свяжемся с вами в ближайшее время для консультации и расчёта стоимости проекта.</p>
      <button class="success-modal__btn" id="successClose">Хорошо</button>
    </div>
  `;
  document.body.appendChild(successModal);

  document.getElementById('successClose').addEventListener('click', () => {
    successModal.classList.remove('active');
  });

  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.remove('active');
    }
  });

  // Открыть форму окно
  submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    formModal.style.display = 'flex';
  });

  // Закрыть по крестику
  formClose.addEventListener('click', function () {
    formModal.style.display = 'none';
  });

  // Закрыть по клику вне окна
  window.addEventListener('click', function (e) {
    if (e.target === formModal) {
      formModal.style.display = 'none';
    }
  });

  // отправка формы
  estimateForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const name  = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const email = document.getElementById('clientEmail').value.trim();

    const submitButton = estimateForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Отправляем...';

    try {

      // проверка пользователя по телефону
      const { data: existingUser, error: searchError } = await supabaseClient
        .from('users')
        .select('id')
        .eq('phone', phone)
        .maybeSingle();

      if (searchError) throw searchError;

      let userId;

      if (existingUser) {
        userId = existingUser.id;
      } else {
        const { data: newUser, error: insertError } = await supabaseClient
          .from('users')
          .insert([{ name, phone, email }])
          .select('id')
          .single();

        if (insertError) throw insertError;
        userId = newUser.id;
      }

      // сборка параметров конструктора
      const area      = parseInt(areaSlider.value);
      const bedrooms  = parseInt(bedroomSlider.value);
      const bathrooms = parseInt(bathroomSlider.value);
      const ceiling   = parseFloat(ceilingSlider.value);
      const terrace   = parseInt(terraceSlider.value);
      const garage    = parseInt(garageSlider.value);

      const totalPrice = parseInt(priceElement.innerText.replace(/\D/g, ''), 10);

      // сохранение сметы
      const { error: estimateError } = await supabaseClient
        .from('estimates')
        .insert([{
          user_id:        userId,
          area:           area,
          floors:         floor,
          material:       material,
          roof:           roof,
          bedrooms:       bedrooms,
          bathrooms:      bathrooms,
          ceiling_height: ceiling,
          terrace_area:   terrace,
          garage_area:    garage,
          total_price:    totalPrice
        }]);

      if (estimateError) throw estimateError;

      // закрытие формы и показ успеха
      formModal.style.display = 'none';
      estimateForm.reset();
      successModal.classList.add('active');

    } catch (err) {

      console.error('Supabase error:', err);
      alert('Ошибка отправки: ' + (err.message || 'попробуйте ещё раз'));

    } finally {

      submitButton.disabled = false;
      submitButton.textContent = 'Отправить';

    }

  });

});




initFromURL();