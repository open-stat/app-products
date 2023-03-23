
appPageMenu.cart = {

    _filterProducts: {},
    _shownProducts: {},


    /**
     *
     */
    viewCart: function () {

        appPageMenu.cart._scrollTop();

        if (appPageMenu._enums.shops.length === 0 ||
            appPageMenu._enums.sections.length === 0
        ) {
            $('#menu-content-cart').html('');
            CoreUI.alert.danger(
                'Не удалось получить список магазинов',
                'Проверьте ваше соединение с интернет'
            );
            return;
        }

        let container   = $('#menu-content-cart');
        let allFilters  = appPageMenu.cart._getCartFilters();
        let cartFilters = [];
        let needUpdate  = Object.keys(appPageMenu.cart._filterProducts).length === 0;

        $.each(allFilters, function (key, filters) {
            if ( ! appPageMenu.cart._filterProducts.hasOwnProperty(key)) {
                needUpdate = true;
            }

            cartFilters.push({
                key: key,
                labels: appPageMenu.cart._getFilterLabels(filters),
            });
        });

        container.html(ejs.render(appTemplates['page-menu/cart/list'], {
            filters: cartFilters,
            shops: appPageMenu._enums.shops || [],
        }));


        // Кнопка показа товаров магазина
        $('.cart_shop__products .cart_shop__product', container).click(function () {
            let filterKey  = $(this).data('filter-key').toString();
            let shopName   = $(this).data('shop-name');
            let cartFilters = appPageMenu.cart._getCartFilters();

            if (cartFilters.hasOwnProperty(filterKey)) {
                appPageMenu.cart.modal.show(shopName, filterKey, cartFilters[filterKey]);
            }
        });


        // Кнопка показа товаров магазина
        $('.cart_shop .card-header', container).click(function () {
            $('.cart_shop__products', $(this).parent()).slideToggle('fast');
        });

        // Кнопка копирования результатов
        $('.cart_shop .card-header .cart_shop__copy', container).click(function (e) {
            e.preventDefault();
            let shopName = $(this).data('shop');

            appTools.clipboardText(appPageMenu.cart._getShownProducts(shopName))
                .then(function () {
                    CoreUI.notice.create('Продукты скопированы');
                })
                .catch(function () {
                    CoreUI.notice.create('Не удалось скопировать');
                });
            return false;
        });

        // Кнопка удаления фильтра
        $('.cart-shop__product__delete', container).click(function (e) {
            e.preventDefault();
            let filterKey = $(this).data('filter-key');

            CoreUI.confirm.warning('Удалить позицию?', '', {
                acceptButtonText: 'Удалить',
                cancelButtonText: 'Отмена',
                onAccept: function () {
                    appPageMenu.cart._removeFilterKey(filterKey)
                }
            });
            return false;
        });

        // Кнопка настройки фильтра
        $('.cart-shop__product__catalog', container).click(function (e) {
            e.preventDefault();
            let filterKey = $(this).data('filter-key');

            if (allFilters.hasOwnProperty(filterKey)) {
                let filters = allFilters[filterKey];
                appPageMenu.showCatalog(function () {
                    appPageMenu.catalog.viewCategory(filters.category_id, filters, filterKey);
                });
            } else {
                CoreUI.alert.warning('Ой, не получилось', 'Обновите страницу и попробуйте еще раз');
            }
            return false;
        });


        if (cartFilters.length > 0) {
            if (needUpdate) {
                appPageMenu.cart._loadProducts(allFilters);

            } else {
                $.each(appPageMenu.cart._filterProducts, function (filterKey, shopsProducts) {
                    appPageMenu.cart._viewProductsTop(filterKey);
                });
            }
        }
    },


    /**
     * @param key
     * @private
     */
    _viewProductsTop: function (key) {

        let productsShops = appPageMenu.cart._filterProducts.hasOwnProperty(key)
            ? appPageMenu.cart._filterProducts[key]
            : {};


        $.each(appPageMenu._enums.shops, function (k, shop) {

            if (productsShops.hasOwnProperty(shop.name) && productsShops[shop.name].length > 0) {
                $.each(productsShops[shop.name], function (k2, product) {
                    appPageMenu.cart._viewProduct(key, shop.name, product);
                    return false;
                });

            } else {
                appPageMenu.cart._viewProductError(key, shop.name, 'Не найдено');
            }
        });
    },


    /**
     * @param key
     * @param shopName
     * @param product
     * @private
     */
    _viewProduct: function (key, shopName, product) {

        let container = $('#menu-content-cart .cart_shop-' + shopName + ' .filter-key-' + key);

        if ( ! container[0]) {
            return;
        }

        $('.cart-shop__product__header-title', container).removeClass('text-danger').text(product.title);
        $('.cart-shop__product__price_amount', container).text(product.price);
        $('.cart-shop__product__price_currency', container).text(product.currency);

        if (product.standard_price > 0) {
            $('.cart-shop__product__price-standard', container).show();
            $('.cart-shop__product__price-standard-amount', container).text(product.standard_price);
            $('.cart-shop__product__price-standard-currency', container).text(product.currency);
            $('.cart-shop__product__price-standard-unit', container).text(product.standard_unit);
        } else {
            $('.cart-shop__product__price-standard', container).hide();
        }

        $('.cart-shop__product__price-date', container).text(moment(product.date_price).format('DD.MM.YYYY'));


        appPageMenu.cart._setShownProduct(shopName, key, product);


        // Загрузка картинки
        let productImg = $('.cart-shop__product__img', container);
        productImg.html('<i class="fs-1 fa-solid fa-spinner fa-spin-pulse"></i>');

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

        appPageMenu.cart._updatePageMetrics();
    },


    /**
     * @param key
     * @param shopName
     * @param errorMessage
     * @private
     */
    _viewProductError: function (key, shopName, errorMessage) {

        let container = shopName === 'all'
            ? $('#menu-content-cart .cart_shop .filter-key-' + key)
            : $('#menu-content-cart .cart_shop-' + shopName + ' .filter-key-' + key);

        if ( ! container[0]) {
            return;
        }

        $('.cart-shop__product__header-title', container).addClass('text-danger').text(errorMessage);
        $('.cart-shop__product__price_amount', container).text('');
        $('.cart-shop__product__price_currency', container).text('');
        $('.cart-shop__product__price-standard', container).hide();
        $('.cart-shop__product__price-date', container).text('');

        $('.cart-shop__product__img', container).html('');

        appPageMenu.cart._updatePageMetrics();
    },


    /**
     * @private
     */
    _updatePageMetrics: function () {

        let container = $('#menu-content-cart');
        let filters   = appPageMenu.cart._getCartFilters();;

        $.each(appPageMenu._enums.shops, function (key, shop) {

            let shopMetrics = {
                countFound: 0,
                totalPrice: 0
            };

            $.each(appPageMenu.cart._filterProducts, function (key, shopsProducts) {
                if (shopsProducts !== null &&
                    shopsProducts.hasOwnProperty(shop.name)
                ) {

                    $.each(shopsProducts[shop.name], function (key2, shopProduct) {
                        shopMetrics.totalPrice += shopProduct.price;
                        shopMetrics.countFound++;
                        return false;
                    });
                }
            });


            $('.cart_shop-' + shop.name + ' .card-header .cart_shop__count-found__number_found', container).text(shopMetrics.countFound);
            $('.cart_shop-' + shop.name + ' .card-header .cart_shop__count-found__number_of', container).text(Object.keys(filters).length);

            $('.cart_shop-' + shop.name + ' .card-header .cart_shop__price', container)
                .text(shopMetrics.totalPrice > 0 ? appTools.formatMoney(shopMetrics.totalPrice) : '');
            $('.cart_shop-' + shop.name + ' .card-header .cart_shop__price_currency', container)
                .text(shopMetrics.totalPrice > 0 ? 'BYN' : '');
        });
    },


    /**
     *
     * @param key
     * @private
     */
    _removeFilterKey: function (key) {

        if (appPageMenu.cart._filterProducts.hasOwnProperty(key)) {
            appPageMenu.storage.removeFilters(key);
            $('#menu-content-cart .filter-key-' + key).remove();


            appPageMenu.cart._removeShownProduct(key);

            delete appPageMenu.cart._filterProducts[key];
            appPageMenu.cart._updatePageMetrics();
        }
    },


    /**
     * @param allFilters
     * @private
     */
    _loadProducts: function (allFilters) {

        appPageMenu.loader.show();

        let countFilters = Object.keys(allFilters).length;
        let checkEndLoad = function() {

            if (--countFilters <= 0) {
                appPageMenu.loader.hide();
            }
        }


        $.each(allFilters, function (key, filters) {

            // Категория удалена
            let issetCategory = false;

            if (filters.hasOwnProperty('category_id')) {
                $.each(appPageMenu._enums.sections, function (key, section) {
                    $.each(section.categories, function (key2, categoryItem) {
                        if (categoryItem.id === filters.category_id) {
                            issetCategory = true;
                            return false;
                        }
                    })
                });
            }

            if ( ! issetCategory) {
                return true;
            }


            appPageMenu._loadProducts(filters.category_id, filters)
                .then(function (result) {

                    let filterProducts = [];
                    let productsTop    = result.hasOwnProperty('products_top') ? result.products_top : [];
                    let products       = result.hasOwnProperty('products') ? result.products : [];

                    $.each(productsTop, function(k, product) {
                        filterProducts.push(product);
                    });
                    $.each(products, function(k, product) {
                        filterProducts.push(product);
                    });


                    if (filterProducts.length > 0) {
                        $.each(filterProducts, function (k2, product) {
                            if (!appPageMenu.cart._filterProducts.hasOwnProperty(key)) {
                                appPageMenu.cart._filterProducts[key] = {};
                            }
                            if (!appPageMenu.cart._filterProducts[key].hasOwnProperty(product.shop_name)) {
                                appPageMenu.cart._filterProducts[key][product.shop_name] = [];
                            }

                            appPageMenu.cart._filterProducts[key][product.shop_name].push(product);
                        });

                    } else {
                        appPageMenu.cart._filterProducts[key] = {};
                    }


                    appPageMenu.cart._viewProductsTop(key);
                    checkEndLoad();

                })
                .catch(function () {
                    appPageMenu.cart._filterProducts[key] = {};
                    appPageMenu.cart._viewProductError(key, 'all', 'Ошибка получения товаров');
                    checkEndLoad();
                });
        });
    },


    /**
     * Добавление товара в список показываемых
     * @param shop
     * @param keyFilter
     * @param product
     * @private
     */
    _setShownProduct: function (shop, keyFilter, product) {

        if ( ! appPageMenu.cart._shownProducts.hasOwnProperty(shop)) {
            appPageMenu.cart._shownProducts[shop] = {};
        }

        appPageMenu.cart._shownProducts[shop][keyFilter] = product;
    },


    /**
     * Удаление товара из списка показываемых
     * @param keyFilter
     * @private
     */
    _removeShownProduct: function (keyFilter) {

        $.each(appPageMenu.cart._shownProducts, function (shop, products) {
            if (appPageMenu.cart._shownProducts[shop].hasOwnProperty(keyFilter)) {
                delete appPageMenu.cart._shownProducts[shop][keyFilter];
            }
        });
    },


    /**
     * @private
     */
    _getCartFilters: function () {

        let allFilters  = appPageMenu.storage.getFilters();
        let cartFilters = [];

        if (typeof allFilters === 'object') {
            $.each(allFilters, function (key, filters) {

                let issetCategory = false;

                if (filters.hasOwnProperty('category_id')) {
                    $.each(appPageMenu._enums.sections, function (key2, section) {
                        $.each(section.categories, function (key3, categoryItem) {
                            if (categoryItem.id === filters.category_id) {
                                issetCategory = true;
                                return false;
                            }
                        })
                    });
                }

                if (issetCategory) {
                    cartFilters.push(filters);
                }
            })
        }

        return cartFilters;
    },


    /**
     * @param filters
     * @private
     */
    _getFilterLabels: function (filters) {

        let labels = [];


        if (filters.hasOwnProperty('category_id')) {
            $.each(appPageMenu._enums.sections, function (key, section) {
                $.each(section.categories, function (key2, categoryItem) {
                    if (categoryItem.id === filters.category_id) {
                        labels.push(categoryItem.title);
                        return false;
                    }
                })
            });
        }

        if (filters.hasOwnProperty('product_title')) {
            labels.push(filters.product_title);
        }
        if (filters.hasOwnProperty('brand')) {
            labels.push(filters.brand);
        }
        if (filters.hasOwnProperty('country')) {
            labels.push(filters.country);
        }

        if (filters.hasOwnProperty('quantity_start')) {
            labels.push('от ' + filters.quantity_start);
        }
        if (filters.hasOwnProperty('quantity_end')) {
            labels.push('до ' + filters.quantity_end);
        }

        if (filters.hasOwnProperty('price_start')) {
            labels.push('от ' + filters.price_start + ' BYN');
        }
        if (filters.hasOwnProperty('price_end')) {
            labels.push('до ' + filters.price_start + ' BYN');
        }

        if (filters.hasOwnProperty('percent_start')) {
            labels.push('от ' + filters.percent_start + ' %');
        }
        if (filters.hasOwnProperty('percent_end')) {
            labels.push('до ' + filters.percent_end + ' %');
        }

        return labels;
    },


    /**
     * @param shopName
     * @returns {string}
     * @private
     */
    _getShownProducts: function (shopName) {

        let productsText = [];

        if (appPageMenu.cart._shownProducts.hasOwnProperty(shopName)) {
            let num = 1;
            $.each(appPageMenu.cart._shownProducts[shopName], function (key, product) {
                productsText.push(num++ + '. ' + product.title + ' (' + product.price + ' ' + product.currency + ')');
            });
        }

        return productsText.join("\n");
    },


    /**
     * @private
     */
    _scrollTop: function () {
        $('.page-menu .tab-content').scrollTop(0);
    }
};
