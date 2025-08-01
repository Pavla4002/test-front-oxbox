// Кнопка выбора языка

const langBtn = document.getElementById('langBtn');
const langBox = document.getElementById('someLang');
const imgLang = document.getElementById('imgLang');
const langList = document.getElementById('langList');

langBtn.onclick = () => {
    if (langList.style.display === 'block') {
        langList.style.display = "none";
        imgLang.classList.remove("openLang");
    }else {
        langList.style.display = "block";
        imgLang.classList.add("openLang");
    }
};

langList.querySelectorAll('li').forEach(li => {
    li.onclick = () => {
        langBox.textContent = li.textContent;
        langList.style.display = 'none';
        imgLang.classList.remove("openLang");
    };
});

document.onclick = (e) => {
    if (!langBtn.contains(e.target) && !langList.contains(e.target)) {
        langList.style.display = 'none';
    }
};

function bodyLock() {
    document.body.classList.add('body-locked');
}

// Функция разблокировки прокрутки
function bodyUnLock() {
    document.body.classList.remove('body-locked');
}

// Меню
const menuOpen = document.querySelectorAll('.header__burger')
if (menuOpen)

    menuOpen.forEach(function (btn) {
        btn.addEventListener('click', () => {
            bodyLock()
            document.querySelector('.wrapper').classList.add('overlay')
            document.querySelector('.mobile__menu').classList.add('open')
        })
    })

const menuClose = document.querySelector('.header__burger-close')
if (menuClose)
    menuClose.addEventListener('click', () => {
        bodyUnLock()
        document.querySelector('.wrapper').classList.remove('overlay')
        document.querySelector('.mobile__menu').classList.remove('open')
    })



//  Слайдер
const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Аккордеон
const accordionsWrapper = document.querySelectorAll('.accordion-container')
accordionsWrapper.forEach(el => {

    const accordions = el.querySelectorAll(".accordion");

    const openAccordion = (accordion) => {
        const content = accordion.querySelector(".accordion__content");
        const iconWrap = accordion.querySelector(".accordion__intro-btn");
        accordion.classList.add("accordion__active");
        iconWrap.classList.add('acc_icon_active');
        content.style.maxHeight = content.scrollHeight + "px";
    };

    const closeAccordion = (accordion) => {
        const content = accordion.querySelector(".accordion__content");
        const iconWrap = accordion.querySelector(".accordion__intro-btn");
        accordion.classList.remove("accordion__active");
        iconWrap.classList.remove('acc_icon_active');
        content.style.maxHeight = null;
    };

    accordions.forEach((accordion) => {
        const introItems = accordion.querySelectorAll(".accordion__intro");
        const content = accordion.querySelector(".accordion__content");
        introItems && introItems.forEach(intro => {
            intro.addEventListener('click', () => {
                if (content.style.maxHeight) {
                    closeAccordion(accordion);
                } else {
                    accordions.forEach((accordion) => {
                        closeAccordion(accordion);
                    });
                    openAccordion(accordion);
                }
            })
        })

    });

    if (accordions[0].closest('.services'))
        openAccordion(accordions[0])
})

const btnOpenAll = document.querySelector('.all');
const allAccorions = document.querySelector(".allAccorions");

btnOpenAll.addEventListener('click', (e) =>{
    const open = allAccorions.classList.toggle('closeAccordion');

    if (open) {
        btnOpenAll.textContent ='Смотреть все';
    }else {
        btnOpenAll.textContent = 'Скрыть';
    }
});


jQuery(document).ready(function () {

    const vh = window.innerHeight;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));

    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab')
        $('body').find('ul.tabs li').removeClass('current');
        $('body').find('.tab-content').removeClass('current');
        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });

    $('.input-field').on('input', function () {
        var $this = $(this);
        if ($this.val() == '') {
            $this.removeClass('filled');
        } else {
            $this.addClass('filled');
        }
    });

});

const modalOpenBtns = document.querySelectorAll('.modal-open-btn');
if (modalOpenBtns) {
    modalOpenBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.wrapper').classList.add('overlay');
            document.querySelector('.modal').classList.add('open');
        });
    });
}

const modalCloseBtns = document.getElementById('closeModalBtn');
modalCloseBtns.addEventListener('click', () =>{
    document.querySelector('.wrapper').classList.remove('overlay');
    document.querySelector('.modal').classList.remove('open');
});


// Валидация и форма

jQuery.extend(jQuery.validator.messages, {
    required: "Пожалуйста, заполните поле",
    remote: "Введите правильное значение",
    email: "Введите корректный email адрес",
    url: "Введите корректный URL",
    date: "Введите корректную дату",
    dateISO: "Введите корректную дату в формате ISO",
    number: "Введите число",
    digits: "Введите только цифры",
    creditcard: "Введите правильный номер кредитной карты",
    equalTo: "Введите такое же значение ещё раз",
    extension: "Загрузите изображение, документ или архив",
    maxlength: jQuery.validator.format("Введите не больше {0} символов"),
    minlength: jQuery.validator.format("Введите не менее {0} символов"),
    rangelength: jQuery.validator.format("Введите значение длиной от {0} до {1} символов"),
    range: jQuery.validator.format("Введите число от {0} до {1}"),
    max: jQuery.validator.format("Введите число меньше {0}"),
    min: jQuery.validator.format("Введите число больше {0}"),
    phone: "Введите корректный номер телефона",
});

function formLoader(form) {
    var $form = jQuery(form);
    var isInitialized = $form.hasClass('form-initialized');
    if (isInitialized) {
        return;
    }
    $form.addClass('form-initialized');
    var controllerName = $form.data('controller') || 'Form';
    if (typeof window[controllerName] !== 'function') {
        new Form(form);
    } else {
        new window[controllerName](form);
    }
}

function Form(form) {
    this.init(form);
}

Form.prototype.init = function (form) {
    this.$form = jQuery(form);
    // Инициализация текстовых полей
    this.$form.find('.input-wrapper').each(function () {
        new Input(this);
    });
    // Инициализация чекбоксов
    this.$form.find('.checkbox-container').each(function () {
        new Checkbox(this);
    });
    this.validater();
    this.mask();
};

Form.prototype.validater = function () {
    this.validator = this.$form.validate({
        focusInvalid: true,
        highlight: function (element) {
            var $element = jQuery(element);
            var $row = $element.closest('.input-wrapper, .checkbox-container');
            $row.addClass('error');
        }.bind(this),
        unhighlight: function (element) {
            var $element = jQuery(element);
            var $row = $element.closest('.input-wrapper, .checkbox-container');
            $row.removeClass('error');
        }.bind(this),
        submitHandler: function (el, ev) {
            if (this.$form.valid()) {
                this.submitForm(ev);
            } else {
                this.validator.focusInvalid();
            }
        }.bind(this),
        errorPlacement: function (error, element) {
            if (element.is(':checkbox')) {
                error.appendTo(element.closest('.checkbox-container'));
            } else {
                error.insertAfter(element);
            }
        }
    });
};

Form.prototype.mask = function () {
    this.$form.find('input[type="tel"]').mask('+7 900 000 00 00');
};

Form.prototype.submitForm = function (ev) {
    var ajaxurl = '/wp-admin/admin-ajax.php';
    var formData = new FormData(this.$form[0]);
    jQuery.ajax({
        url: ajaxurl,
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log('AJAX response:', response);
            if (response.SUCCESS == 'Y' && response.HTML) {
                jQuery(this.$form).html(response.HTML);
            } else if (response.SUCCESS == 'N' && response.MESSAGE) {
                jQuery(this.$form).html(response.MESSAGE);
            }
        }.bind(this),
        error: function (xhr, status, error) {
            console.log('AJAX error:', status, error);
        }
    });
};

function Input(el) {
    this.$wrapper = jQuery(el);
    this.$input = this.$wrapper.find('input, textarea');
    if (this.$input.length === 0) {
        console.error('No input or textarea found in wrapper:', el);
        return;
    }
    this.$input.on('change', this.checkEmpty.bind(this));
    this.$input.on('input', this.checkEmpty.bind(this));
    this.checkEmpty();
}

Input.prototype.checkEmpty = function () {
    let val = this.$input.val();
    this.$wrapper.toggleClass('empty', val.length === 0);
};

function Checkbox(el) {
    this.$wrapper = jQuery(el);
    this.$input = this.$wrapper.find('input[type="checkbox"]');
    if (this.$input.length === 0) {
        return;
    }
    this.$input.on('change', this.checkChecked.bind(this));
    this.checkChecked();
}

Checkbox.prototype.checkChecked = function () {
    let isChecked = this.$input.is(':checked');
    this.$wrapper.toggleClass('checked', isChecked);
};

const form = document.querySelector('form');
const checkbox = document.querySelector('#agreement');
form.addEventListener('submit', (e) => {
    if (!checkbox.checked) {
        e.preventDefault();
        checkbox.closest('.checkbox-container').classList.add('agree-error');
    } else {
        checkbox.closest('.checkbox-container').classList.remove('agree-error');
    }
});

window.onload = function initPage() {
    jQuery('form[data-controller]').each(function () {
        console.log('Found form:', this);
        formLoader(this);
    });
};