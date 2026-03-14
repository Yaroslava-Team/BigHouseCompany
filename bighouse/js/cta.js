// SUPABASE
const SUPABASE_URL = "https://bsfyjxwswqwnfrwyaytl.supabase.co";
const SUPABASE_KEY = "sb_publishable_ovErQXGiE8Q4cIeqr6fnyw_-tkO-j8D";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


document.addEventListener('DOMContentLoaded', function () {

  const ctaForm = document.querySelector('.cta-form');
  const ctaBtn = ctaForm.querySelector('.cta-btn');

  // СОЗДАЁМ SUCCESS-МОДАЛКУ И ДОБАВЛЯЕМ В DOM
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

  // ЗАКРЫТИЕ МОДАЛКИ
  document.getElementById('successClose').addEventListener('click', () => {
    successModal.classList.remove('active');
  });

  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.remove('active');
    }
  });

  // ОТПРАВКА ФОРМЫ
  ctaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name  = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !phone) return;

    ctaBtn.disabled = true;
    ctaBtn.textContent = 'Отправляем...';

    try {

      // ПРОВЕРЯЕМ, СУЩЕСТВУЕТ ЛИ ПОЛЬЗОВАТЕЛЬ С ТАКИМ ТЕЛЕФОНОМ
      const { data: existingUser, error: searchError } = await supabaseClient
        .from('users')
        .select('id')
        .eq('phone', phone)
        .maybeSingle();

      if (searchError) throw searchError;

      if (!existingUser) {
        // Пользователя нет — создаём нового
        const { error: insertError } = await supabaseClient
          .from('users')
          .insert([{ name, phone }]);

        if (insertError) throw insertError;
      }

      ctaForm.reset();
      successModal.classList.add('active');

    } catch (err) {

      console.error('Supabase error:', err);
      alert('Ошибка отправки: ' + (err.message || 'попробуйте ещё раз'));

    } finally {

      ctaBtn.disabled = false;
      ctaBtn.textContent = 'Оставить заявку';

    }

  });

});