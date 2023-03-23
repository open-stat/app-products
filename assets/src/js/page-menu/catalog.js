
appPageMenu.catalog = {

    /**
     *
     */
    viewSections: function () {

        let tplSections = ejs.render(appTemplates['page-menu/catalog/sections'], {
            sections: appPageMenu._enums.sections
        });

        appPageMenu.catalog._scrollTop();
        $('#menu-content-catalog').html(tplSections);


        // Поиск разделов
        $('#menu-content-catalog input[type="search"]').keyup(function () {
            appPageMenu.catalog.viewSearch(this.value);
        });


        // Переход категориям
        $('#menu-content-catalog a.list-group-item').click(function (e) {
            e.preventDefault();
            let sectionId = $(this).data('section-id');

            appPageMenu.catalog._slideRight().then(function () {
                appPageMenu.catalog.viewSection(sectionId);
            });
        });
    },


    /**
     * @param sectionId
     */
    viewSection: function (sectionId) {

        let section = {};

        $.each(appPageMenu._enums.sections, function (key, sectionItem) {
            if (sectionItem.id === sectionId) {
                section = sectionItem;
                return false;
            }
        })

        let tplCategories = ejs.render(appTemplates['page-menu/catalog/categories'], {
            section: section
        });

        appPageMenu.catalog._scrollTop();
        $('#menu-content-catalog').html(tplCategories);


        // Возврат к разделам
        $('#menu-content-catalog a.list-group-item.section-item').click(function (e) {
            e.preventDefault();

            appPageMenu.catalog._slideLeft().then(function () {
                appPageMenu.catalog.viewSections();
            });
        });


        // Поиск товаров категории
        $('#menu-content-catalog a.list-group-item.category-item').click(function (e) {
            e.preventDefault();
            let categoryId = $(this).data('category-id');

            appPageMenu.catalog._slideRight().then(function () {
                appPageMenu.catalog.viewCategory(categoryId);
            });
        });
    },


    /**
     * @param query
     */
    viewSearch: function (query) {

        appPageMenu.catalog._scrollTop();
        let searchContainer   = $('#menu-content-catalog .search-container');
        let sectionsContainer = $('#menu-content-catalog .sections-container');

        if ( ! query) {
            searchContainer.html('').hide();
            sectionsContainer.show();
            return;
        }


        let searched = [];

        $.each(appPageMenu._enums.sections, function (key, section) {
            $.each(section.categories, function (key2, category) {
                if (category.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                    searched.push({
                        sectionId: section.id,
                        sectionTitle: section.title,
                        categoryId: category.id,
                        categoryTitle: category.title
                    });
                }
            })
        })

        let tplSearch = ejs.render(appTemplates['page-menu/catalog/search'], {
            searched: searched
        });

        sectionsContainer.hide();
        searchContainer.html(tplSearch).show();


        // переход к разделам
        $('a.list-group-item', searchContainer).click(function (e) {
            e.preventDefault();
            let categoryId = $(this).data('category-id');

            appPageMenu.catalog._slideRight().then(function () {
                appPageMenu.catalog.viewCategory(categoryId);
            });
        });
    },


    /**
     @param categoryId
     @param filters
     @param filterKey
     */
    viewCategory: function (categoryId, filters, filterKey) {

        appPageMenu.catalog.category.view(categoryId, filters, filterKey);
    },


    /**
     * Сдвиг влево
     * @returns {Promise}
     * @private
     */
    _slideLeft: function () {

        return new Promise(function(resolve, reject) {
            $('#menu-content-catalog > *').animate({ "left":"+100%" }, {
                duration: 100,
                specialEasing: {
                    width: "linear",
                    height: "easeOutBounce"
                },
                complete: function() {
                    resolve();
                }
            });
        });
    },


    /**
     * Сдвиг вправо
     * @returns {Promise}
     * @private
     */
    _slideRight: function () {

        return new Promise(function(resolve, reject) {
            $('#menu-content-catalog > *').animate({ "left":"-100%" }, {
                duration: 100,
                specialEasing: {
                    width: "linear",
                    height: "easeOutBounce"
                },
                complete: function() {
                    resolve();
                }
            });
        });
    },


    /**
     * @private
     */
    _scrollTop: function () {
        $('.page-menu .tab-content').scrollTop(0);
    }
};
