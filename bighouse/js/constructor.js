// Элементы управления
const areaSlider = document.getElementById('areaSlider');
const areaValue = document.getElementById('areaValue');
const bedroomSlider = document.getElementById('bedroomSlider');
const bedroomValue = document.getElementById('bedroomValue');
const bathroomSlider = document.getElementById('bathroomSlider');
const bathroomValue = document.getElementById('bathroomValue');
const ceilingSlider = document.getElementById('ceilingSlider');
const ceilingValue = document.getElementById('ceilingValue');
const terraceCheckbox = document.getElementById('terraceCheckbox');
const terraceSlider = document.getElementById('terraceSlider');
const terraceValue = document.getElementById('terraceValue');
const terraceWrapper = document.getElementById('terraceSliderWrapper');
const garageCheckbox = document.getElementById('garageCheckbox');
const garageSlider = document.getElementById('garageSlider');
const garageValue = document.getElementById('garageValue');
const garageWrapper = document.getElementById('garageSliderWrapper');
const priceElement = document.getElementById('totalPrice');

// Кнопки переключателей
const floorButtons = document.querySelectorAll('#floorsOptions .option');
const materialButtons = document.querySelectorAll('#materialOptions .option');
const roofButtons = document.querySelectorAll('#roofOptions .option');


// Текущие значения
let floor = 1;
let material = 'frame';
let roof = 'flat';

// Базовая стоимость за м² для разных материалов
const basePricePerM2 = {
  frame: 55000,
  block: 70000,
  brick: 90000
};

// Коэффициенты для этажности
const floorCoefficient = {
  1: 1.0,
  2: 1.15,
  3: 1.3
};

// Коэффициенты для высоты потолков
function ceilingCoefficient(height) {
  return 1 + (height - 3.0) * 0.1;
}

// Стоимость террасы за м²
const terracePricePerM2 = 25000;

// Стоимость гаража за м²
const garagePricePerM2 = 20000;

// Функция обновления цены
function updatePrice() {
  const area = parseInt(areaSlider.value, 10);
  const baseM2Price = basePricePerM2[material];
  const floorFactor = floorCoefficient[floor];
  const ceilingFactor = ceilingCoefficient(parseFloat(ceilingSlider.value));

  let total = area * baseM2Price * floorFactor * ceilingFactor;

  if (terraceCheckbox.checked) {
    const terraceArea = parseInt(terraceSlider.value, 10);
    total += terraceArea * terracePricePerM2;
  }

  if (garageCheckbox.checked) {
    const garageArea = parseInt(garageSlider.value, 10);
    total += garageArea * garagePricePerM2;
  }

  priceElement.innerText = total.toLocaleString('ru-RU') + ' ₽';
}

// Обновление отображаемых значений ползунков
function updateSliderValues() {
  areaValue.innerText = areaSlider.value;
  bedroomValue.innerText = bedroomSlider.value;
  bathroomValue.innerText = bathroomSlider.value;
  ceilingValue.innerText = parseFloat(ceilingSlider.value).toFixed(1);
  terraceValue.innerText = terraceSlider.value;
  garageValue.innerText = garageSlider.value;
}

// Обработчики для ползунков
areaSlider.addEventListener('input', () => {
  updateSliderValues();
  updatePrice();
});
bedroomSlider.addEventListener('input', () => {
  updateSliderValues();
});
bathroomSlider.addEventListener('input', updateSliderValues);
ceilingSlider.addEventListener('input', () => {
  updateSliderValues();
  updatePrice();
});

// Обработчики для чекбоксов террасы и гаража
terraceCheckbox.addEventListener('change', function() {
  if (this.checked) {
    terraceWrapper.style.opacity = '1';
    terraceWrapper.style.pointerEvents = 'auto';
    terraceSlider.disabled = false;
  } else {
    terraceWrapper.style.opacity = '0.5';
    terraceWrapper.style.pointerEvents = 'none';
    terraceSlider.disabled = true;
    terraceSlider.value = 0; 
    terraceValue.innerText = 0;
  }
  updateSliderValues();
  updatePrice();
});

terraceSlider.addEventListener('input', () => {
  terraceValue.innerText = terraceSlider.value;
  updatePrice();
});

garageCheckbox.addEventListener('change', function() {
  if (this.checked) {
    garageWrapper.style.opacity = '1';
    garageWrapper.style.pointerEvents = 'auto';
    garageSlider.disabled = false;
  } else {
    garageWrapper.style.opacity = '0.5';
    garageWrapper.style.pointerEvents = 'none';
    garageSlider.disabled = true;
    garageSlider.value = 0;
    garageValue.innerText = 0;
  }
  updateSliderValues();
  updatePrice();
});

garageSlider.addEventListener('input', () => {
  garageValue.innerText = garageSlider.value;
  updatePrice();
});

// Обработчики для переключателей этажности
floorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    floorButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    floor = parseInt(btn.dataset.floor, 10);
    updatePrice();
  });
});

// Обработчики для материала
materialButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    materialButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    material = btn.dataset.material;
    updatePrice();
  });
});

// Обработчики для типа крыши
roofButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    roofButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    roof = btn.dataset.roof;
  });
});

// Инициализация
updateSliderValues();
updatePrice();
