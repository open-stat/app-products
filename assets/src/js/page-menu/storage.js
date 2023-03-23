
appPageMenu.storage = {

    _cartFilters: 'app_products_filters',

    /**
     * Все фильтры
     * @returns {Object}
     */
    getFilters: function () {

        let allFilters = localStorage.getItem(
            appPageMenu.storage._cartFilters
        );

        try {
            allFilters = allFilters === null ? {} : JSON.parse(allFilters);

            if (typeof allFilters !== 'object' ||
                Array.isArray(allFilters) ||
                allFilters === null
            ) {
                allFilters = {};
            }

        } catch {
            allFilters = {};
        }

        return allFilters;
    },


    /**
     * Установка фильтров
     * @param filters
     * @returns {number}
     */
    addFilters: function (filters) {

        let allFilters = appPageMenu.storage.getFilters();
        let key        = appTools.hashCode();

        allFilters[key] = filters;

        localStorage.setItem(appPageMenu.storage._cartFilters, JSON.stringify(allFilters));

        return key;
    },


    /**
     * Получение количества установленных фильтров
     * @returns {number}
     */
    getCountFilters: function () {

        let allFilters = appPageMenu.storage.getFilters();

        return Object.keys(allFilters).length;
    },


    /**
     * Удаление фильтров
     * @param key
     */
    removeFilters: function (key) {

        let allFilters = appPageMenu.storage.getFilters();

        if (allFilters.hasOwnProperty(key)) {
            delete allFilters[key];
            localStorage.setItem(appPageMenu.storage._cartFilters, JSON.stringify(allFilters));
        }
    },


    /**
     * Удаление всех фильтров
     */
    removeFiltersAll: function () {

        localStorage.removeItem(appPageMenu.storage._cartFilters);
    }
}