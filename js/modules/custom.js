addEventListener("DOMContentLoaded", function () {
    const html = document.querySelector("html");
    const header = document.querySelector("header");
    const cartIcon = document.querySelector(".header__cart");
    const modalCart = document.querySelector(".cart--popup");
    const cartWrp = modalCart.querySelector(".cart__items-wrap");
    const addToCart = document.querySelectorAll(".to-cart");

    function ajaxUpdateMyCart(key, qty) {
        modalCart.classList.add("loading");
        const data = {
            action: "updateCartQty",
            key: key,
            qty: qty,
        };
        jQuery.post(custom_cart_ajax.ajax_url, data, function (response) {
            renderNewCart();
        });
        jQuery.post(
            custom_cart_ajax.ajax_url,
            { action: "ajaxGetTotalOrder" },
            function (response) {
                document.querySelectorAll(".cart__total .price").forEach((el) => {
                    el.innerHTML = response.slice(0, -1);
                });
            }
        );
        jQuery.post(custom_cart_ajax.ajax_url, { action: "getCartQty" }, function (response) {
            document.querySelectorAll(".total-product-quantity").forEach((el) => {
                el.innerHTML = response.slice(0, -1);
            });
        });

        setTimeout(() => {
            jQuery.post(
                custom_cart_ajax.ajax_url,
                { action: "ajaxGetTotalOrder" },
                function (response) {
                    document.querySelectorAll(".cart__total .price").forEach((el) => {
                        el.innerHTML = response.slice(0, -1);
                    });
                }
            );
            jQuery.post(custom_cart_ajax.ajax_url, { action: "getCartQty" }, function (response) {
                document.querySelectorAll(".total-product-quantity").forEach((el) => {
                    el.innerHTML = response.slice(0, -1);
                });
            });
        }, 100);
    }

    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
            modalCart.classList.add("loading");
            modalCart.classList.add("modal-active");
            // html.classList.add('fix');
            header.classList.add("header-fix");
            renderNewCart();
        });
    }

    setTimeout(() => {
        if (document.querySelector(".cart__item").length) {
            console.log(123213);
            document.querySelector(".header__cart").classList.add("active");
        }
    }, 100);

    function renderNewCart() {
        cartWrp.innerHTML = "";
        jQuery.post(custom_cart_ajax.ajax_url, { action: "renderNewCart" }, function (response) {
            cartWrp.innerHTML = response.slice(0, -1);

            jQuery.post(
                custom_cart_ajax.ajax_url,
                { action: "ajaxGetTotalOrder" },
                function (response) {
                    document.querySelectorAll(".cart__total .price").forEach((el) => {
                        el.innerHTML = response.slice(0, -1);
                    });
                }
            );
            jQuery.post(custom_cart_ajax.ajax_url, { action: "getCartQty" }, function (response) {
                document.querySelectorAll(".total-product-quantity").forEach((el) => {
                    el.innerHTML = response.slice(0, -1);
                });
                document.querySelector(".header__cart span").innerHTML = response.slice(0, -1);
            });
            modalCart.classList.remove("loading");

            const fakeCartItems = document.getElementsByClassName("cart__item");

            if (fakeCartItems.length) {
                document.querySelector(".cart__bottom").style.display = "block";
                document.querySelector(".header__cart span").classList.add("active");

                if (document.querySelector(".cart__bottom-empty")) {
                    document.querySelector(".cart__bottom-empty").style.display = "none";
                }
                Object.keys(fakeCartItems).forEach((item) => {
                    jQuery.post(
                        custom_cart_ajax.ajax_url,
                        { action: "getCartQty" },
                        function (response) {
                            $(item).find(".cart__item-qty-wrap input").value = response.slice(
                                0,
                                -1
                            );
                        }
                    );
                    const input = fakeCartItems[item].querySelector("input");
                    const plus = fakeCartItems[item].querySelector(".plus");
                    const cartQtyInput = fakeCartItems[item].querySelector(".cart__item-qty-input");
                    const minus = fakeCartItems[item].querySelector(".minus");
                    const key = fakeCartItems[item].getAttribute("data-key");
                    const remove = fakeCartItems[item].querySelector(".item-meta__top--remove");
                    if (plus) {
                        plus.addEventListener("click", () => {
                            const value = Number(input.value);
                            input.value = value + 1;
                            ajaxUpdateMyCart(key, input.value);
                            udpateAddToCartEvent();
                        });
                    }
                    if (minus) {
                        minus.addEventListener("click", () => {
                            const value = Number(input.value);
                            input.value = value - 1;
                            ajaxUpdateMyCart(key, input.value);
                            udpateAddToCartEvent();
                        });
                    }

                    if (cartQtyInput) {
                        cartQtyInput.addEventListener("input", (e) => {
                            setTimeout(() => {
                                const value = Number(input.value);
                                ajaxUpdateMyCart(key, value);
                                udpateAddToCartEvent();
                            }, 2000);
                        });
                    }

                    if (remove) {
                        remove.addEventListener("click", (e) => {
                            e.preventDefault();
                            cartWrp.classList.add("loading");
                            jQuery.post(
                                custom_cart_ajax.ajax_url,
                                { action: "removeProductFromCart", key },
                                function (response) {
                                    renderNewCart();
                                    udpateAddToCartEvent();
                                }
                            );
                        });
                    }
                    udpateAddToCartEvent();
                });
            }
        });
    }

    function addEventProducts(node) {
        if (node[0]) {
            node.forEach((item) => {
                item.addEventListener("click", () => {
                    item.setAttribute("disabled", "disabled");
                    cartWrp.classList.add("loading");
                    const data = {
                        action: "addToCart",
                        id: item.getAttribute("data-id"),
                        qty: item.getAttribute("data-value"),
                    };
                    jQuery.post("/wp-admin/admin-ajax.php", data, function () {
                        $(".cart--popup").toggleClass("active");
                        $("body").toggleClass("cart--open");
                        renderNewCart(item, true);
                        udpateAddToCartEvent();
                    });
                });
            });
        }
    }

    function udpateAddToCartEvent() {
        const addToCart2 = document.querySelectorAll(".to-cart");
        addToCart2.forEach((bttn) => {
            addEventProducts(bttn);
            bttn.removeAttribute("disabled");
        });
    }
    addEventProducts(addToCart);
});
