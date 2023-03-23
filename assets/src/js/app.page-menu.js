var appPageMenu = {

    _apikey: "6A24F3AFD2FFEADEC2756592831D5696C37A6950",
    _baseUrl: '/api/products/v1.0',
    _enums: {},

    /**
     * Получение страницы кабинета
     * @returns {*}
     */
    getPageContent: function () {
        return appTemplates['page-menu/main'];
    },


    /**
     * Инициализация
     */
    init: function () {

        appPageMenu._errorHandler();
        appPageMenu._initInstall();
        appPageMenu._initEvents();

        appPageMenu._loadEnums()
            .then(function () {

                if (localStorage.getItem('app_products_tab') === 'cart') {
                    appPageMenu.showCart();
                } else {
                    appPageMenu.showCatalog()
                }
            });
    },


    /**
     * @param callback
     */
    showCatalog: function (callback) {

        const tabCatalog = document.querySelector('.page-menu #menu-tab-catalog');
        const header     = document.querySelector('.page-menu header h4');

        $(header).text('Каталог товаров');

        if (typeof callback === 'function') {
            callback();
        } else {
            appPageMenu.catalog.viewSections();
        }

        (new mdb.Tab(tabCatalog)).show();
        localStorage.setItem('app_products_tab', 'catalog');
    },


    /**
     *
     */
    showCart: function () {

        const tabCart = document.querySelector('.page-menu #menu-tab-cart');
        const header  = document.querySelector('.page-menu header h4');

        $(header).text('Корзина');
        appPageMenu.cart.viewCart();
        (new mdb.Tab(tabCart)).show();
        tabCart.blur();

        localStorage.setItem('app_products_tab', 'cart');
    },


    /**
     * Загрузка справочников
     * @returns {Promise<unknown>}
     */
    _loadEnums: function() {

        return new Promise(function(resolve, reject) {

            appPageMenu.preloader.show();

            $.ajax({
                url: appPageMenu._baseUrl + '/enums',
                method: "GET",
                headers: {
                    'Core2-Apikey': appPageMenu._apikey
                },
                success: function (response, textStatus, jqXHR) {
                    appPageMenu.preloader.hide();

                    if (/^application\/json($|$)/.test(jqXHR.getResponseHeader('Content-type'))) {
                        try {
                            appPageMenu._enums = response;
                            resolve();

                        } catch (e) {
                            CoreUI.alert.danger('Произошла ошибка при запросе справочников', e.message);
                            reject();
                        }

                    } else {
                        CoreUI.alert.danger('Произошла ошибка при запросе справочников', 'Некорректный формат ответа');
                        reject();
                    }
                },
                error: function (response) {
                    appPageMenu.preloader.hide();
                    CoreUI.alert.danger('Ошибка', 'Обновите приложение или обратитесь к администратору');
                    reject();
                }
            });
        });
    },


    /**
     * Загрузка товаров
     * @returns {Promise<Object>}
     */
    _loadProducts: function(categoryId, filters) {

        return new Promise(function(resolve, reject) {

            filters  = typeof filters === 'object' ? filters : {};
            let data = {
                category_id: categoryId
            };

            data = Object.assign(filters, data);


            $.ajax({
                url: appPageMenu._baseUrl + '/products',
                method: "POST",
                headers: {
                    'Core2-Apikey': appPageMenu._apikey
                },
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (response, textStatus, jqXHR) {

                    if (/^application\/json($|$)/.test(jqXHR.getResponseHeader('Content-type'))) {
                        try {
                            resolve(response);

                        } catch (e) {
                            CoreUI.alert.danger('Произошла ошибка при запросе товаров', e.message);
                            reject();
                        }

                    } else {
                        CoreUI.alert.danger('Произошла ошибка при запросе товаров', 'Некорректный формат ответа');
                        reject();
                    }
                },
                error: function (response) {
                    CoreUI.alert.danger('Ошибка', 'Обновите приложение или обратитесь к администратору');
                    reject();
                }
            });
        });
    },


    /**
     * Загрузка картинки
     * @returns {Promise<unknown>}
     */
    _loadImage: function(productId) {

        return new Promise(function(resolve, reject) {

            $.ajax({
                url: appPageMenu._baseUrl + '/product/image',
                method: "GET",
                headers: {
                    'Core2-Apikey': appPageMenu._apikey
                },
                data: {
                    product_id : productId
                },
                xhr: function() {
                    let xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    return xhr;
                },
                success: function (response, textStatus, jqXHR) {

                    try {
                        resolve({
                            type: jqXHR.getResponseHeader('Content-type'),
                            blob: response
                        });

                    } catch (e) {
                        CoreUI.alert.danger('Произошла ошибка при запросе картинки', e.message);
                        reject();
                    }
                },
                error: function (response) {
                    CoreUI.alert.danger('Ошибка', 'Обновите приложение или обратитесь к администратору');
                    reject();
                }
            });
        });
    },


    /**
     * Установка
     */
    _initInstall: function () {

        let install = function (event) {
            event.preventDefault();

            let button = $('.page-menu .install-button');

            if (event.platforms.includes('web')) {
                button.show();
                button.on('click', function () {
                    event.prompt();
                });
            }

            event.userChoice.then(function(choiceResult) {
                switch (choiceResult.outcome) {
                    case "accepted" :
                        button.hide();
                        break;

                    case "dismissed" :
                        button.css('opacity', '0.7');
                        break;
                }
            });
        }

        if (appMain.install.event) {
            install(appMain.install.event);
        } else {
            appMain.install.promise.then(install);
        }
    },


    /**
     * Регистрация обработки ошибок
     * @private
     */
    _errorHandler: function () {

        $(document).ajaxError(function (event, jqxhr, settings, exception) {
            appPageMenu.preloader.hide();
            appPageMenu.loader.hide();

            if (jqxhr.status === '0') {
                //alert("Соединение прервано.");
            } else if (jqxhr.statusText === 'error') {
                CoreUI.alert.danger("Отсутствует соединение с Интернет.");
            } else if (jqxhr.status === 500) {
                CoreUI.alert.danger("Ой, извините!", "Во время обработки вашего запроса произошла ошибка.");
            }
        });
    },


    /**
     *
     * @private
     */
    _initEvents: function () {

        const tabCatalog = document.querySelector('.page-menu #menu-tab-catalog');
        const tabCart    = document.querySelector('.page-menu #menu-tab-cart');

        if (tabCatalog) {
            $(tabCatalog).click(function () {
                appPageMenu.showCatalog();
            });
        }
        if (tabCart) {
            $(tabCart).click(function () {
                appPageMenu.showCart();
            });
        }
    }
}


$(function () {

    appMain.on('hashchange', function () {
        if ($('.page-menu.active')[0]) {
            appPageMenu.load(location.hash.substring(1));
        }
    });
});
