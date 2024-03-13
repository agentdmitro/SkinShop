// JS fragment import example
import * as functions from "./modules/functions.js";
functions.isWebp();
functions.spollers();

// БАЗОВІ СКРИПТИ
import "./modules/base.js";

import "./modules/popup.js";

addEventListener("DOMContentLoaded", function () {
    let wpcf7Elm = document.querySelector(".wpcf7-form");
    if (wpcf7Elm) {
        wpcf7Elm.addEventListener(
            "wpcf7mailsent",
            function (event) {
                $(".popup-bg").addClass("show").hide().show();
                $("#popup-thanks").toggleClass("show");
            },
            false
        );
    }
    if ($(".header__search img").length) {
        $(".header__search img").on("click", function () {
            $(".header__search-wrap").toggleClass("active");
            $("#dgwt-wcas-search-input-1").focus();
        });
    }
    $(document).click(function (e) {
        if (
            $(e.target).parents(".header__search").length === 0 &&
            $(".header__search-wrap").hasClass("active")
        ) {
            $(".header__search-wrap").removeClass("active");
        }
    });
    if ($(".product__faq-header").length) {
        $(".product__faq-header").click(function (e) {
            $(this).toggleClass("active");
            $(this).next(".product__faq-content").slideToggle();
        });
    }
    Fancybox.bind("[data-fancybox]", {
        Thumbs: {
            type: "modern",
        },
    });
});

// ANIMATIONS
import "./modules/anim.js";

// Динамический адаптив
// Документация: https://github.com/FreelancerLifeStyle/dynamic_adapt#readme
//import './libs/dynamicAdapt.js';

// NPM Swiper installation example
/*
import Swiper, { Navigation, Pagination } from 'swiper';

// init Swiper:
const swiper = new Swiper('.swiper', {
	// configure Swiper to use modules
	modules: [Navigation, Pagination],
	...
});
*/

//  IMAGES LAZY LOAD
// import Bound from './libs/bounds.js'

// const boundary = Bound({
// 	margins: {bottom: 100}
// })

// const image = document.querySelectorAll('img[data-src]')

// const whenImageEnters = (image) => {
// 	return () => {
// 		image.src = image.dataset.src
// 	}
// }

// image.forEach(img => {
// 	boundary.watch(img, whenImageEnters(img))
// })
