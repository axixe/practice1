// VALIDATION

const fields = ['corp', 'phone', 'email', 'director'],
      fieldNames = {
        corp: 'Название организации',
        phone: 'Телефон',
        email: 'E-mail',
        director: 'Руководитель'
      };
const values = fields.map(id => document.querySelector(`#${id}`)),
      form = document.querySelector('.modal__form');

const [corp, phone, email, director] = values;

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