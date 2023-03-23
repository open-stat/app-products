
appPageMenu.catalog.category = {

    _prop: {
        id: 0,
        title: '',
        sectionId: 0,
        sectionTitle: '',
        brands: [],
        countries: [],
        filters: {},
        cartKey: null
    },


    /**
     * @param categoryId
     * @param filters
     * @param filtersKey
     */
    view: function (categoryId, filters, filtersKey) {

        appPageMenu.catalog.category._prop.cartKey = typeof filtersKey !== 'undefined' ? filtersKey : null;

        $.each(appPageMenu._enums.sections, function (key, section) {
            $.each(section.categories, function (key2, categoryItem) {
                if (categoryItem.id === categoryId) {
                    appPageMenu.catalog.category._prop.id           = categoryItem.id;
                    appPageMenu.catalog.category._prop.title        = categoryItem.title;
                    appPageMenu.catalog.category._prop.sectionId    = section.id;
                    appPageMenu.catalog.category._prop.sectionTitle = section.title;
                    return false;
                }
            })
        });


        let tplCategory = ejs.render(appTemplates['page-menu/catalog/category'], {
            category: appPageMenu.catalog.category._prop
        });

        appPageMenu.catalog._scrollTop();
        $('#menu-content-catalog').html(tplCategory)


        // Загрузка товаров категории
        appPageMenu.catalog.category._loadProducts(categoryId, filters);


        // Возврат к разделам
        $('#menu-content-catalog a.list-group-item.section-item').click(function (e) {
            e.preventDefault();

            appPageMenu.catalog._slideLeft().then(function () {
                appPageMenu.catalog.viewSection(appPageMenu.catalog.category._prop.sectionId)
            });
        });


        // Показ формы с фильтрами
        $('#menu-content-catalog .btn-show-filters').click(appPageMenu.catalog.filters.show);
        $('#menu-content-catalog .sidenav-lock').click(appPageMenu.catalog.filters.hide);



        // Сохранение фильтров
        $('#menu-content-catalog .btn-save-filters').click(function () {
            let filters = appPageMenu.catalog.category._prop.filters;

            if (appPageMenu.catalog.category._prop.cartKey !== null) {
                CoreUI.confirm.info('Заменить текущий поиск или добавить новый?', '', {
                    cancelButtonText: 'Добавить новый',
                    acceptButtonText: 'Заменить',
                    onCancel: function () {
                        if (appPageMenu.storage.getCountFilters() >= 100) {
                            CoreUI.alert.danger('Количество товаров в корзине слишком большое', 'Максимальное количество 100шт');
                            return;
                        }

                        appPageMenu.catalog.category._prop.cartKey = appPageMenu.storage.addFilters(filters);
                    },
                    onAccept: function () {
                        appPageMenu.storage.removeFilters(appPageMenu.catalog.category._prop.cartKey);
                        appPageMenu.catalog.category._prop.cartKey = appPageMenu.storage.addFilters(filters);
                    }
                });
            } else {
                if (appPageMenu.storage.getCountFilters() >= 100) {
                    CoreUI.alert.danger('Количество товаров в корзине слишком большое', 'Максимальное количество 100шт');
                    return;
                }

                appPageMenu.catalog.category._prop.cartKey = appPageMenu.storage.addFilters(filters);

                CoreUI.confirm.success('Поиск сохранен', 'Добавьте еще товары или перейдите в корзину', {
                    cancelButtonText: 'Открыть корзину',
                    acceptButtonText: 'Закрыть',
                    onCancel: function () {
                        appPageMenu.showCart();
                    }
                });
            }
        });
    },


    /**
     *
     */
    acceptedFilters: function () {

        let categoryId = appPageMenu.catalog.category._prop.id;
        let filters    = appPageMenu.catalog.filters.getFilters();

        appPageMenu.catalog.filters.hide()
            .then(function () {
                appPageMenu.catalog.category._loadProducts(categoryId, filters);
            });
    },


    /**
     * Загрузка и рендер товаров
     * @param categoryId
     * @param filters
     * @private
     */
    _loadProducts: function (categoryId, filters) {

        appPageMenu.preloader.show();

        filters = filters || {};
        appPageMenu.catalog.category._prop.filters = filters;

        // Загрузка товаров
        appPageMenu._loadProducts(categoryId, filters)
            .then(function (result) {

                appPageMenu.preloader.hide();

                appPageMenu.catalog.category._prop.countries = result.hasOwnProperty('countries') ? result.countries : [];
                appPageMenu.catalog.category._prop.brands    = result.hasOwnProperty('brands') ? result.brands : [];

                let categoryContainer = $('#menu-content-catalog .category-id-' + categoryId);
                if ( ! categoryContainer[0]) {
                    return;
                }

                let productsTotal = result.products_total > 100 ? '+100' : result.products_total;
                let tplProducts   = ejs.render(appTemplates['page-menu/catalog/category/products'], {
                    productsTotal: productsTotal,
                    productsTop: result.products_top || [],
                    products: result.products || []
                });

                categoryContainer.find('.category-products').html(tplProducts);
                categoryContainer.find('.filters-controls').show();


                // Фильтры
                let tplFilters = ejs.render(appTemplates['page-menu/catalog/category/filters'], {
                    filters:   filters,
                    countries: appPageMenu.catalog.category._prop.countries,
                    brands:    appPageMenu.catalog.category._prop.brands,
                });
                categoryContainer.find('.sidenav-body').html(tplFilters);


                // Кнопки еще в фильтрах
                $('#menu-content-catalog .btn-add-filter-title').click(function () {
                    $('#menu-content-catalog .filters-title')
                        .append(appTemplates['page-menu/catalog/category/filters/product_title']);
                });
                $('#menu-content-catalog .btn-add-filter-brand').click(function () {
                    let tplFilterBrand = ejs.render(appTemplates['page-menu/catalog/category/filters/brand'], {
                        brands: appPageMenu.catalog.category._prop.brands
                    });
                    $('#menu-content-catalog .filters-brand').append(tplFilterBrand);
                });
                $('#menu-content-catalog .btn-add-filter-country').click(function () {
                    let tplFilterCountry = ejs.render(appTemplates['page-menu/catalog/category/filters/country'], {
                        countries: appPageMenu.catalog.category._prop.countries
                    });
                    $('#menu-content-catalog .filters-country').append(tplFilterCountry);
                });

                // Фильтры меток
                let tplLabels = ejs.render(appTemplates['page-menu/catalog/category/labels'], {
                    filters: filters
                });
                categoryContainer.find('.filters-labels').html(tplLabels);

                // Удаление меток
                $('#menu-content-catalog .filters-labels > button').click(function () {
                    let filterName = $(this).data('filter');
                    let filterKey  = $(this).data('filter-key');
                    let filters    = appPageMenu.catalog.category._prop.filters;

                    $.each(filters, function (name, value) {
                        if (filterName === name) {
                            if (filterKey === undefined) {
                                delete filters[name];
                            } else {
                                if (filters[name].hasOwnProperty(filterKey)) {
                                    filters[name].splice(filterKey, 1);
                                }
                            }

                            return false;
                        }
                    });

                    appPageMenu.catalog.category._loadProducts(appPageMenu.catalog.category._prop.id, filters);
                });

                // Инициализация полей
                document.querySelectorAll('#menu-content-catalog .filters-form .form-outline').forEach((formOutline) => {
                    new mdb.Input(formOutline).init();
                });


                // Применение фильтров
                $('#menu-content-catalog .btn-filter-accepted').click(appPageMenu.catalog.category.acceptedFilters);


                // Загрузка картинок
                categoryContainer.find('.product-item').each(function () {

                    let productId  = $(this).data('product-id');
                    let productImg = $(this).find('.product-img');

                    appPageMenu._loadImage(productId).then(function (result) {

                        let reader = new FileReader();
                        reader.onloadend = function() {
                            productImg.html('');
                            productImg.attr('style', 'background-image: url(' + reader.result + ')');
                        }
                        reader.readAsDataURL(result.blob);
                    });
                });
            })
            .catch(function () {
                appPageMenu.preloader.hide();
            });
    }
}