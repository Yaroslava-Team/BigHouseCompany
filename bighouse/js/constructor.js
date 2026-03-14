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

// Обновление отображаемых значений ползунков
function updateSliderValues() {
  areaValue.innerText = areaSlider.value;
  bedroomValue.innerText = bedroomSlider.value;
  bathroomValue.innerText = bathroomSlider.value;
  ceilingValue.innerText = parseFloat(ceilingSlider.value).toFixed(1);
  terraceValue.innerText = terraceSlider.value;
  garageValue.innerText = garageSlider.value;
}

//  Инициализация из URL
function initFromURL() {
  const urlParams = new URLSearchParams(window.location.search);

  // Площадь
  if (urlParams.has('area')) {
    const area = parseInt(urlParams.get('area'), 10);
    if (!isNaN(area) && area >= 80 && area <= 400) {
      areaSlider.value = area;
    }
  }

  // Спальни
  if (urlParams.has('bedrooms')) {
    const beds = parseInt(urlParams.get('bedrooms'), 10);
    if (!isNaN(beds) && beds >= 1 && beds <= 6) {
      bedroomSlider.value = beds;
    }
  }

  // Санузлы
  if (urlParams.has('bathrooms')) {
    const baths = parseInt(urlParams.get('bathrooms'), 10);
    if (!isNaN(baths) && baths >= 1 && baths <= 4) {
      bathroomSlider.value = baths;
    }
  }

  // Высота потолков
  if (urlParams.has('ceiling')) {
    const ceiling = parseFloat(urlParams.get('ceiling'));
    if (!isNaN(ceiling) && ceiling >= 2.5 && ceiling <= 4.5) {
      ceilingSlider.value = ceiling;
    }
  }

  // Площадь террасы
  if (urlParams.has('terraceArea')) {
    const tArea = parseInt(urlParams.get('terraceArea'), 10);
    if (!isNaN(tArea) && tArea >= 0 && tArea <= 60) {
      terraceSlider.value = tArea;
    }
  }

  // Площадь гаража
  if (urlParams.has('garageArea')) {
    const gArea = parseInt(urlParams.get('garageArea'), 10);
    if (!isNaN(gArea) && gArea >= 0 && gArea <= 80) {
      garageSlider.value = gArea;
    }
  }

  // Материал
  if (urlParams.has('material')) {
    const materialVal = urlParams.get('material');
    const materialBtn = Array.from(materialButtons).find(btn => btn.dataset.material === materialVal);
    if (materialBtn) {
      materialButtons.forEach(b => b.classList.remove('active'));
      materialBtn.classList.add('active');
      material = materialVal;
    }
  }

  // Этажность
  if (urlParams.has('floors')) {
    const floorsVal = urlParams.get('floors');
    const floorBtn = Array.from(floorButtons).find(btn => btn.dataset.floor === floorsVal);
    if (floorBtn) {
      floorButtons.forEach(b => b.classList.remove('active'));
      floorBtn.classList.add('active');
      floor = parseInt(floorsVal, 10);
    }
  }

  // Тип крыши
  if (urlParams.has('roof')) {
    const roofVal = urlParams.get('roof');
    const roofBtn = Array.from(roofButtons).find(btn => btn.dataset.roof === roofVal);
    if (roofBtn) {
      roofButtons.forEach(b => b.classList.remove('active'));
      roofBtn.classList.add('active');
      roof = roofVal;
    }
  }

  // Обновление отображения и цены
  updateSliderValues();
  updatePrice();
}

// Обработчики
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
  terraceValue.innerText = terraceSlider.value;
  updatePrice();
});

garageSlider.addEventListener('input', () => {
  garageValue.innerText = garageSlider.value;
  updatePrice();
});

floorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    floorButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    floor = parseInt(btn.dataset.floor, 10);
    updatePrice();
  });
});

materialButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    materialButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    material = btn.dataset.material;
    updatePrice();
  });
});

roofButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    roofButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    roof = btn.dataset.roof;
  });
});

// Запуск инициализации по URL
initFromURL();