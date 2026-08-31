/* =====================================================
   MACA COFFEE
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const navbar =
    document.getElementById("navbar");


menuButton.addEventListener("click", () => {

    navbar.classList.toggle("active");


    const icon =
        menuButton.querySelector("i");


    if (navbar.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/* Close menu */

document.querySelectorAll(".navbar a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            const icon =
                menuButton.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });



/* =====================================================
   HEADER SCROLL
===================================================== */

const header =
    document.getElementById("header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/* =====================================================
   HERO SLIDER
===================================================== */

const heroSlides =
    document.querySelectorAll(".hero-slide");

const sliderPrev =
    document.getElementById("sliderPrev");

const sliderNext =
    document.getElementById("sliderNext");

const sliderDots =
    document.getElementById("sliderDots");


let heroIndex = 0;


/* Create dots */

heroSlides.forEach((slide, index) => {

    const dot =
        document.createElement("button");

    if (index === 0) {

        dot.classList.add("active");

    }


    dot.addEventListener("click", () => {

        heroIndex = index;

        showHeroSlide(heroIndex);

    });


    sliderDots.appendChild(dot);

});


const heroDots =
    sliderDots.querySelectorAll("button");


function showHeroSlide(index) {

    heroSlides.forEach(slide => {

        slide.classList.remove("active");

    });


    heroDots.forEach(dot => {

        dot.classList.remove("active");

    });


    heroSlides[index]
        .classList.add("active");


    heroDots[index]
        .classList.add("active");

}


function nextHeroSlide() {

    heroIndex++;

    if (heroIndex >= heroSlides.length) {

        heroIndex = 0;

    }

    showHeroSlide(heroIndex);

}


function previousHeroSlide() {

    heroIndex--;

    if (heroIndex < 0) {

        heroIndex =
            heroSlides.length - 1;

    }

    showHeroSlide(heroIndex);

}


sliderNext.addEventListener(
    "click",
    nextHeroSlide
);


sliderPrev.addEventListener(
    "click",
    previousHeroSlide
);


/* Automatic slider */

setInterval(
    nextHeroSlide,
    5000
);



/* =====================================================
   FAQ ACCORDION
===================================================== */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");


    question.addEventListener("click", () => {


        const isOpen =
            item.classList.contains("active");


        /* Close all */

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });


        /* Open selected */

        if (!isOpen) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});



/* =====================================================
   GENERIC CAROUSEL FUNCTION
===================================================== */

function createCarousel(
    track,
    slides,
    previousButton,
    nextButton,
    dotsContainer
) {

    let current = 0;


    /* Create dots */

    slides.forEach((slide, index) => {

        const dot =
            document.createElement("button");

        if (index === 0) {

            dot.classList.add("active");

        }


        dot.addEventListener("click", () => {

            current = index;

            updateCarousel();

        });


        dotsContainer.appendChild(dot);

    });


    const dots =
        dotsContainer.querySelectorAll("button");


    function getVisibleSlides() {

        if (window.innerWidth <= 600) {

            return 1;

        }


        if (window.innerWidth <= 850) {

            return 2;

        }


        return 3;

    }


    function getMaxIndex() {

        return Math.max(
            0,
            slides.length -
            getVisibleSlides()
        );

    }


    function updateCarousel() {

        const visible =
            getVisibleSlides();

        const slideWidth =
            slides[0].offsetWidth;

        const gap = 20;


        track.scrollTo({

            left:
                current *
                (slideWidth + gap),

            behavior: "smooth"

        });


        dots.forEach(dot => {

            dot.classList.remove("active");

        });


        /*
           Active dot is limited
           to available starting positions.
        */

        if (dots[current]) {

            dots[current]
                .classList.add("active");

        }

    }


    previousButton.addEventListener(
        "click",
        () => {

            current--;

            if (current < 0) {

                current =
                    getMaxIndex();

            }

            updateCarousel();

        }
    );


    nextButton.addEventListener(
        "click",
        () => {

            current++;

            if (current > getMaxIndex()) {

                current = 0;

            }

            updateCarousel();

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (current > getMaxIndex()) {

                current = getMaxIndex();

                updateCarousel();

            }

        }
    );

}


/* Review carousel */

createCarousel(

    document.getElementById("reviewTrack"),

    document.querySelectorAll(
        "#reviewTrack .review-slide"
    ),

    document.getElementById("reviewPrev"),

    document.getElementById("reviewNext"),

    document.getElementById("reviewDots")

);


/* Product carousel */

createCarousel(

    document.getElementById("productTrack"),

    document.querySelectorAll(
        "#productTrack .product-slide"
    ),

    document.getElementById("productPrev"),

    document.getElementById("productNext"),

    document.getElementById("productDots")

);



/* =====================================================
   ORDER SYSTEM
===================================================== */

const orderCards =
    document.querySelectorAll(
        ".order-product-card"
    );


const orderTotal =
    document.getElementById("orderTotal");

const summaryProduct =
    document.getElementById("summaryProduct");

const summaryPrice =
    document.getElementById("summaryPrice");

const summarySubtotal =
    document.getElementById("summarySubtotal");

const summaryTotal =
    document.getElementById("summaryTotal");

const buttonPrice =
    document.getElementById("buttonPrice");


let selectedProduct = {
    name: "10 Sachets",
    price: 1850,
    quantity: 1
};



/* Select product */

orderCards.forEach(card => {

    const radio =
        card.querySelector(
            'input[type="radio"]'
        );


    radio.addEventListener("change", () => {

        orderCards.forEach(item => {

            item.classList.remove(
                "selected"
            );

        });


        card.classList.add(
            "selected"
        );


        selectedProduct.name =
            card.dataset.product;


        selectedProduct.price =
            Number(card.dataset.price);


        selectedProduct.quantity =
            Number(
                card.querySelector(
                    ".product-qty"
                ).value
            );


        updateOrder();

    });


    /* Clicking card */

    card.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    ".quantity-control"
                )
            ) {

                return;

            }


            radio.checked = true;

            radio.dispatchEvent(
                new Event("change")
            );

        }
    );

});



/* Initial selected card */

orderCards[0]
    .classList.add("selected");



/* =====================================================
   QUANTITY
===================================================== */

orderCards.forEach(card => {

    const minus =
        card.querySelector(".qty-minus");

    const plus =
        card.querySelector(".qty-plus");

    const input =
        card.querySelector(".product-qty");


    minus.addEventListener("click", event => {

        event.stopPropagation();


        let quantity =
            Number(input.value);


        if (quantity > 1) {

            quantity--;

            input.value = quantity;

        }


        if (
            card.querySelector(
                'input[type="radio"]'
            ).checked
        ) {

            selectedProduct.quantity =
                quantity;

            updateOrder();

        }

    });


    plus.addEventListener("click", event => {

        event.stopPropagation();


        let quantity =
            Number(input.value);


        if (quantity < 10) {

            quantity++;

            input.value = quantity;

        }


        if (
            card.querySelector(
                'input[type="radio"]'
            ).checked
        ) {

            selectedProduct.quantity =
                quantity;

            updateOrder();

        }

    });

});



/* =====================================================
   UPDATE ORDER
===================================================== */

function updateOrder() {

    const total =
        selectedProduct.price *
        selectedProduct.quantity;


    orderTotal.textContent =
        formatBDT(total);


    summaryProduct.textContent =
        `Maca Coffee ${selectedProduct.name} × ${selectedProduct.quantity}`;


    summaryPrice.textContent =
        formatBDT(total);


    summarySubtotal.textContent =
        formatBDT(total);


    summaryTotal.textContent =
        formatBDT(total);


    buttonPrice.textContent =
        formatBDT(total);

}



/* BDT format */

function formatBDT(amount) {

    return "৳ " +
        amount.toLocaleString("en-BD");

}



/* =====================================================
   WHATSAPP ORDER
===================================================== */

const orderForm =
    document.getElementById("orderForm");


orderForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "customerName"
                )
                .value
                .trim();


        const phone =
            document
                .getElementById(
                    "customerPhone"
                )
                .value
                .trim();


        const address =
            document
                .getElementById(
                    "customerAddress"
                )
                .value
                .trim();


        const note =
            document
                .getElementById(
                    "orderNote"
                )
                .value
                .trim();


        if (!name) {

            alert(
                "অনুগ্রহ করে আপনার নাম লিখুন।"
            );

            return;

        }


        if (!phone) {

            alert(
                "অনুগ্রহ করে ফোন নম্বর লিখুন।"
            );

            return;

        }


        if (!address) {

            alert(
                "অনুগ্রহ করে আপনার ঠিকানা লিখুন।"
            );

            return;

        }


        const total =
            selectedProduct.price *
            selectedProduct.quantity;


        /*
           IMPORTANT:
           WhatsApp number:
           01349557254

           International format:
           8801349557254
        */

        const whatsappNumber =
            "8801349557254";


        const message =

            `*MACA COFFEE ORDER*%0A` +

            `----------------------------%0A` +

            `*Product:* Maca Coffee%0A` +

            `*Package:* ${selectedProduct.name}%0A` +

            `*Quantity:* ${selectedProduct.quantity}%0A` +

            `*Price:* ${formatBDT(total)}%0A` +

            `*Name:* ${name}%0A` +

            `*Phone:* ${phone}%0A` +

            `*Address:* ${address}%0A` +

            `*Note:* ${note || "None"}%0A` +

            `----------------------------%0A` +

            `*Total:* ${formatBDT(total)}%0A` +

            `*Payment:* Cash On Delivery`;


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${message}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);



/* =====================================================
   CURRENT YEAR
===================================================== */

document.getElementById(
    "currentYear"
).textContent =
    new Date().getFullYear();



/* =====================================================
   SMOOTH SCROLL
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function(event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    });



/* =====================================================
   INITIAL ORDER UPDATE
===================================================== */

updateOrder();
