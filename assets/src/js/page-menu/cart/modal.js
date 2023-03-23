
appPageMenu.cart.modal = {

    /**
     * Открытие модала для выбора замены
     * @param shopName
     * @param filterKey
     * @param filters
     */
    show: function (shopName, filterKey, filters) {

        let selectProduct = appPageMenu.cart._shownProducts.hasOwnProperty(shopName) &&
            appPageMenu.cart._shownProducts[shopName].hasOwnProperty(filterKey)
            ? appPageMenu.cart._shownProducts[shopName][filterKey]
            : {};

        let products = appPageMenu.cart._filterProducts.hasOwnProperty(filterKey) &&
            appPageMenu.cart._filterProducts[filterKey].hasOwnProperty(shopName)
            ? appPageMenu.cart._filterProducts[filterKey][shopName]
            : [];

        if (products.length === 0) {
            return;
        }

        let shop = {};

        $.each(appPageMenu._enums.shops, function (key, shopItem) {
            if (shopName === shopItem.name) {
                shop = shopItem;
                return false;
            }
        });

        let tpl = ejs.render(appTemplates['page-menu/cart/modal'], {
            shop: shop,
            labels: appPageMenu.cart._getFilterLabels(filters),
            products: products,
            selectProduct: selectProduct,
        });

        CoreUI.modal.show("Выберите замену", tpl, {
            onShown: function () {
                $.each(products, function (key, product) {

                    let container = $('.cart-modal__container .product-id-' + product.id);

                    // Выбор товара
                    container.click(function () {
                        appPageMenu.cart._viewProduct(filterKey, shop.name, product);
                        CoreUI.modal.hide();
                    });


                    // Загрузка картинки
                    let productImg = $('.product-img', container);

                    appPageMenu._loadImage(product.id).then(function (result) {

                        let reader = new FileReader();
                        reader.onloadend = function() {
                            productImg.html('');
                            productImg.attr('style', 'background-image: url(' + reader.result + ')');
                        }
                        reader.readAsDataURL(result.blob);

                    }).catch(function () {
                        productImg.html('');
                    });
                });
            }
        });
    }
}