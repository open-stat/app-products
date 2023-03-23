
appPageMenu.catalog.filters = {

    /**
     * Показ фильтров
     * @returns {Promise<unknown>}
     */
    show: function () {

        return new Promise(function(resolve, reject) {

            $('#menu-content-catalog .sidenav').show();
            $('#menu-content-catalog .sidenav .sidenav-body').css({'left': '-260px'}).animate({ "left": "0" }, {duration: 100});
            $('#menu-content-catalog .sidenav .sidenav-lock').fadeIn(100, resolve);
        });
    },


    /**
     * Скрытие фильтров
     * @returns {Promise<unknown>}
     */
    hide: function () {

        return new Promise(function(resolve, reject) {

            $('#menu-content-catalog .sidenav .sidenav-body').animate({ "left": "-260px" }, {duration: 100});
            $('#menu-content-catalog .sidenav .sidenav-lock').fadeOut(100, function () {
                $('#menu-content-catalog .sidenav').hide();
                resolve();
            });
        });
    },


    /**
     *
     */
    getFilters: function () {

        let filters = {};

        $('#menu-content-catalog .sidenav').find('select, textarea, input')
            .each(function (key, input) {
                let name  = $(this).attr('name');
                let value = $.trim($(this).val());

                if ( ! value || ! name) {
                    return;
                }

                if (name.slice(-2) === '[]') {
                    name = name.substring(0, name.length - 2);

                    if ( ! filters.hasOwnProperty(name) ||
                        typeof filters[name] !== 'object'
                    ) {
                        filters[name] = [];
                    }

                    filters[name].push(value);

                } else {
                    filters[name] = value;
                }
            });

        $('#menu-content-catalog .sidenav .filters-title input').val();

        return filters;
    }
}