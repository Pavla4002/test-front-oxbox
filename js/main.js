// Кнопка выбора языка

const langBtn = document.getElementById('langBtn');
const langList = document.getElementById('langList');

langBtn.onclick = () => {
    langList.style.display = langList.style.display === 'block' ? 'none' : 'block';
};

langList.querySelectorAll('li').forEach(li => {
    li.onclick = () => {
        langBtn.textContent = li.textContent + ' ▼';
        langList.style.display = 'none';
    };
});

document.onclick = (e) => {
    if (!langBtn.contains(e.target) && !langList.contains(e.target)) {
        langList.style.display = 'none';
    }
};

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

// Аккордион
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

