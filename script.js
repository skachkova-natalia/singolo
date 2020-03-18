const MENU = document.getElementById('menu');
const VERTICAL_PHONE = document.getElementById('vertical-phone');
const HORIZONTAL_PHONE = document.getElementById('horizontal-phone');
const SLIDER_ITEMS = document.querySelectorAll(".slider-item");
const LEFT_SLIDER_CONTROL = document.getElementById('arrow-prev');
const RIGHT_SLIDER_CONTROL = document.getElementById('arrow-next');
const PORTFOLIO_IMAGES = document.getElementById('portfolio-images');
const PORTFOLIO_TAGS = document.getElementById('portfolio-tags');
const BUTTON = document.getElementById('submit-button');
const CLOSE_BUTTON = document.getElementById('close-button');

/* window.onload = changeActiveMenuLink(); */

document.addEventListener('scroll', changeActiveMenuLink);

function changeActiveMenuLink() {
    let currentPosition = window.scrollY;
    const sections = document.querySelectorAll('#main>section');
    const links = document.querySelectorAll('#menu a');

    sections.forEach((e) => {
        if (document.body.scrollHeight - window.innerHeight == currentPosition) {
            links.forEach((a) => {
                a.classList.remove('active-link');
            })
            links[links.length - 1].classList.add('active-link');
        }
        else if (e.offsetTop - 89 <= currentPosition && (e.offsetTop + e.offsetHeight - 89) > currentPosition) {
            links.forEach((a) => {
                a.classList.remove('active-link');
                if (e.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active-link');
                }
            })
        }
    })
}

MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach(el => el.classList.remove('active-link'));
    event.target.classList.add('active-link');
})

function toggleBlackScreen(screen) {
    if (screen.style.opacity === '1') {
        screen.style.opacity = '0';
    } else {
        screen.style.opacity = '1';
    }
}

let verticalBlackScreen = document.createElement('div');
verticalBlackScreen.className = 'vertical-phone_inactive';
VERTICAL_PHONE.after(verticalBlackScreen);
verticalBlackScreen.addEventListener('click', () => {
    toggleBlackScreen(verticalBlackScreen);
})

VERTICAL_PHONE.addEventListener('click', (event) => {
    toggleBlackScreen(verticalBlackScreen);
})

let horizontalBlackScreen = document.createElement('div');
horizontalBlackScreen.className = 'horizontal-phone_inactive';
HORIZONTAL_PHONE.after(horizontalBlackScreen);
horizontalBlackScreen.addEventListener('click', () => {
    toggleBlackScreen(horizontalBlackScreen);
})

HORIZONTAL_PHONE.addEventListener('click', (event) => {
    toggleBlackScreen(horizontalBlackScreen);
})

RIGHT_SLIDER_CONTROL.addEventListener('click', (event) => {
    if (isEnabled) {
        nextSlide(currentIndex);
    }
});

LEFT_SLIDER_CONTROL.addEventListener('click', (event) => {
    if (isEnabled) {
        previousSlide(currentIndex);
    }
});

let currentIndex = 0;
let isEnabled = true;

function changeCurrentIndex(n) {
    currentIndex = (n + SLIDER_ITEMS.length) % SLIDER_ITEMS.length;
}

function hideSlide(direction) {
    isEnabled = false;
    SLIDER_ITEMS[currentIndex].classList.add(direction);
    SLIDER_ITEMS[currentIndex].addEventListener('animationend', function () {
        this.classList.remove('active', direction);
    })
}

function showSlide(direction) {
    SLIDER_ITEMS[currentIndex].classList.add('next', direction);
    SLIDER_ITEMS[currentIndex].addEventListener('animationend', function () {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

function changeBackground() {
    let slider = document.querySelector("#slider");
    if (!SLIDER_ITEMS[1].classList.contains("active")) {
        slider.style.backgroundColor = "#648BF0";
        slider.style.boxShadow = "0 6px 0 #788bf0";
    } else {
        slider.style.backgroundColor = "#F06C64";
        slider.style.boxShadow = "0 6px 0 #EA676B";
    }
}

function previousSlide(n) {
    hideSlide('to-right');
    changeCurrentIndex(n - 1);
    changeBackground();
    showSlide('from-left');
}

function nextSlide(n) {
    hideSlide('to-left');
    changeCurrentIndex(n + 1);
    changeBackground();
    showSlide('from-right');
}

PORTFOLIO_IMAGES.addEventListener('click', (event) => {
    if (event.target != PORTFOLIO_IMAGES) {
        PORTFOLIO_IMAGES.querySelectorAll('img').forEach(el => el.classList.remove('active-image'));
        event.target.classList.add('active-image');
    }
})

function shuffleArray(images) {
    for (let i = images.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        temp = images[j].innerHTML;
        images[j].innerHTML = images[i].innerHTML;
        images[i].innerHTML = temp;
    }
}

PORTFOLIO_TAGS.addEventListener('click', (event) => {
    if (event.target != PORTFOLIO_TAGS) {
        PORTFOLIO_TAGS.querySelectorAll('span').forEach(el => {
            el.classList.remove('tag_selected');
            el.classList.add('tag_bordered');
        });
        event.target.classList.add('tag_selected');
        shuffleArray(PORTFOLIO_IMAGES.querySelectorAll('div'));
    }
})

let form = document.querySelector("#quote-form");
form.addEventListener("submit", () => {
    event.preventDefault();
    if (form.checkValidity()) {
        let subject = document.getElementById('subject').value.toString();
        let description = document.getElementById('description').value.toString();
        document.getElementById('message-block__subject').innerText = 'Subject: ' + (subject || 'No subject');
        document.getElementById('message-block__description').innerText = 'Description: ' + (description || 'No description');
        document.getElementById('message-block').classList.remove('hidden');
    }
})

CLOSE_BUTTON.addEventListener('click', () => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('description').value = '';
    document.getElementById('message-block').classList.add('hidden');
})

