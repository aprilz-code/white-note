// 轮播图组件注册，并挂载
const glide = new Glide(".glide", {
    type: 'slider',
    startAt: 0,
    autoplay: 3000,
    gap: 5,
    hoverpause: false

})
const captiopnsEl = document.querySelectorAll('.slide-caption')
const headerEl = document.querySelector('header');
const scrollToTop = document.querySelector(".scrollToTop")

// 点击回到首页按钮出现
if (window.pageYOffset > 1000) {
    scrollToTop.style.display = "block"
} else {
    scrollToTop.style.display = "none";
}


//导航栏
window.addEventListener("scroll", () => {
    let height = headerEl.getBoundingClientRect().height;

    if (window.pageYOffset - height > 80) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky")
        }
    } else {
        headerEl.classList.remove("sticky")
    }
})

// 轮播图上的文字效果
glide.on(['mount.after', 'run.after'], () => {
    const caption = captiopnsEl[glide.index]
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(400, {start: 300}),
        translateY: [anime.stagger([40, 10]), 0]
    })
})

glide.on('run,before', () => {
    document.querySelectorAll('.slide-caption > *').forEach(el => {
        el.style.opacity = 0;
    })
})


glide.mount({})


// 成功案例排布
const isotope = new Isotope(".cases", {
    layoutMode: 'fitRows',
    itemSelector: ".case-item"
});

const filterBtns = document.querySelector(".filter-btns")

filterBtns.addEventListener("click", e => {
    let {target} = e
    const filterOption = target.getAttribute("data-filter")
    if (filterOption) {
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove('active'))
        target.classList.add('active');

        isotope.arrange({filter: filterOption})
    }
})

// 元素滑动效果出现
const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: 'ease-in-out',
    origin: "bottom"
}

ScrollReveal().reveal(".feature", {...staggeringOption, interval: 350})
ScrollReveal().reveal(".service-item", {...staggeringOption, interval: 350})

const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            innerHTML: el => {
                return [0, el.innerHTML]
            },
            duration: 2000,
            round: 1,
            easing: 'easeInExpo',
        });
        dataSectionEl.style.backgroundPosition = `center calc(50% -${dataSectionEl.getBoundingClientRect().bottom / 5}px)`;
    }
});

window.addEventListener("scroll", () => {
    const bottom = dataSectionEl.getBoundingClientRect.bottom
    const top = dataSectionEl.getBoundingClientRect.top

    if (bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = `center calc(50% -${bottom / 5}px)`
    }
})

//滑动效果
const scroll = new SmoothScroll('nav a[href *="#"], .scrollToTop a[href *="#"]', {
    header: 'header',
    offset: 80
})

const exploreBtnEls = document.querySelectorAll(".explore-btn")
exploreBtnEls.forEach(exploreBtnEl => {
    exploreBtnEl.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#about-us"))
    })
})

// 折叠按钮
const burgerEl = document.querySelector(".burger")
burgerEl.addEventListener("click", () => {
    headerEl.classList.toggle("open")
})

document.addEventListener('scroll', () => {
    if (headerEl.classList.contains("open")) {
        headerEl.classList.remove("open")
    }
})