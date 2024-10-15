// VALIDATION

const fields = ['corp', 'phone', 'email', 'director', 'logo'],
      fieldNames = {
        corp: 'Название организации',
        phone: 'Телефон',
        email: 'E-mail',
        director: 'Руководитель',
        logo: 'Логотип'
      };
const values = fields.map(id => document.querySelector(`#${id}`)),
      form = document.querySelector('.modal__form');

const [corp, phone, email, director, logo] = values;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nullDataTest(values, fields, fieldNames)) {
        alert('form was successfully send to server');
    }
});

function nullDataTest(valArray, fields, fieldNames) {
    const error = [];
    let errorMessage;

    valArray.forEach((val, index) => {
        const wrapper = val.parentElement;

        if (val.value.length === 0) {
            wrapper.classList.add('modal__input-wrapper--error');
            error.push(`Поле ввода "${fieldNames[fields[index]]}" не должно быть пустым`);
        } else {
            wrapper.classList.remove('modal__input-wrapper--error');
        }
    })

    if (error.length > 0) {
        errorMessage = `Были допущены следующие ошибки:\n* ${error.join('\n* ')}`
        alert(errorMessage);
    }

    return (errorMessage ? false : true);
}

// MASK OF PHONE NUMBER

phone.addEventListener('input', phoneMask);
phone.addEventListener('focus', phoneMask);

function phoneMask(e) {
    const input = e.target;
    let value = input.value.replace(/\D/g, '');

    const pattern = [
        '+7 (',
        value.substring(1, 4),
        value.length >= 5 ? ') ' : '',
        value.substring(4, 7),
        value.length >= 8 ? '-' : '',
        value.substring(7, 9),
        value.length >= 10 ? '-' : '',
        value.substring(9, 11)
    ];

    input.value = pattern.join('');
}

// SHOW FILE PREVIEW

const preview = document.querySelector('.modal__preview'),
      clearLogo = document.querySelector('.modal__xmark'),
      textWrapper = document.querySelector('.modal__file-text-wrapper');

logo.addEventListener('change', () => {
    const file = logo.files[0];
    
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
    
        reader.onload = function (e) {
            preview.src = e.target.result;
        };

        textWrapper.classList.add('modal__file-text-wrapper--hidden');
        clearLogo.classList.remove('modal__xmark--hidden');

        reader.readAsDataURL(file);
    } else {
        textWrapper.classList.remove('modal__file-text-wrapper--hidden');
        clearLogo.classList.add('modal__xmark--hidden');

        preview.src = 'img/preview.svg';
    }
});

clearLogo.addEventListener('click', (e) => {
    e.preventDefault();

    preview.src = 'img/preview.svg';
    textWrapper.classList.remove('modal__file-text-wrapper--hidden');
    clearLogo.classList.add('modal__xmark--hidden');

    logo.value = '';
});

// CLOSE/OPEN MODAL WIN

const overlay = document.querySelector('.overlay'),
      cancelBtn = document.querySelector('.modal__cancel'),
      modalWin = document.querySelector('.modal'),
      openModalBtn = document.querySelector('.open-modal-btn');

openModalBtn.addEventListener('click', openModal);

overlay.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    closeModal();
});

function openModal() {
    modalWin.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModal() {
    modalWin.style.display = 'none';
    overlay.style.display = 'none';
}
