var controller = new ScrollMagic.Controller();

function translateElem(elem, elemX, elemY, elemIndex) {
    $(elem).css({
        "-webkit-transform":
            "translate(" + elemX * (elemIndex + 1) + "px, " + elemY * (elemIndex + 1) + "px)",
        "-ms-transform":
            "translate(" + elemX * (elemIndex + 1) + "px, " + elemY * (elemIndex + 1) + "px)",
        transform:
            "translate(" + elemX * (elemIndex + 1) + "px, " + elemY * (elemIndex + 1) + "px)",
    });
}

// banner anim
if ($(".banner").length) {
    translateElem($(".banner .tip"), 0, 50, 0);
    var whyScene = new ScrollMagic.Scene({
        triggerElement: ".banner",
        triggerHook: 0.5,
        duration: window.innerHeight / 2,
    })
        .on("progress", function (event) {
            gsap.to($(".banner .tip"), {
                y: 50 - 50 * event.progress,
            });
        })
        .addTo(controller);
}

// categories
if ($(".categories").length) {
    var categoriesTranslate = [];
    $(".categories__item > span > *:not(svg)").each(function (index, item) {
        translateElem(item, 0, 15, index);
        categoriesTranslate[index] = 15 * (index + 1);
    });
    var categiriesScene = new ScrollMagic.Scene({
        triggerElement: ".categories",
        triggerHook: 1,
        duration: window.innerHeight / 2,
    })
        .on("progress", function (event) {
            $(".categories__item > span > *:not(svg)").each(function (index, item) {
                gsap.to($(item), {
                    y: categoriesTranslate[index] - categoriesTranslate[index] * event.progress,
                    duration: 1.2,
                });
            });
        })
        .addTo(controller);
}

// Proposal
if ($(".proposal").length) {
    $(".proposal").each((index, section) => {
        translateElem($(section).find("h2"), 0, 50, 0);
        translateElem($(section).find(".products__bttn"), 0, 70, 0);

        var proposalScene = new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 0.5,
            duration: window.innerHeight / 2,
        })
            .on("progress", function (event) {
                gsap.to($(section).find("h2"), {
                    y: 50 - 50 * event.progress,
                });
                gsap.to($(section).find(".products__bttn"), {
                    y: 70 - 70 * event.progress,
                });
            })
            .addTo(controller);
    });
}

// Products
if ($(".products .product").length) {
    const productItems = document.querySelectorAll(".products .product");
    if (productItems) {
        productItems.forEach((productItem, index) => {
            const effectiveIndex = index % 4;

            translateElem($(productItem), 0, (effectiveIndex + 1) * 20, 0);

            var productScene = new ScrollMagic.Scene({
                triggerElement: productItem,
                triggerHook: 0.8,
                duration: window.innerHeight / 2,
            })
                .on("progress", function (event) {
                    gsap.to($(productItem), {
                        y: (effectiveIndex + 1) * 20 - (effectiveIndex + 1) * 20 * event.progress,
                        duration: 0.5,
                    });
                })
                .addTo(controller);
        });
    }
}

// categories
if ($(".about").length) {
    var aboutTranslate = [];
    translateElem($(".about h2"), 0, 50, 0);

    $(".about__wrap > * > *").each(function (index, item) {
        translateElem(item, 0, 30, index);
        aboutTranslate[index] = 30 * (index + 1);
    });
    var categiriesScene = new ScrollMagic.Scene({
        triggerElement: ".about",
        triggerHook: 1,
        duration: window.innerHeight / 2,
    })
        .on("progress", function (event) {
            gsap.to($(".about h2"), {
                y: 50 - 50 * event.progress,
            });
            $(".about__wrap > * > *").each(function (index, item) {
                gsap.to($(item), {
                    y: aboutTranslate[index] - aboutTranslate[index] * event.progress,
                    duration: 1.2,
                });
            });
        })
        .addTo(controller);
}
