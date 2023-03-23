
appPageMenu.loader = {

    /**
     * Показ лодера
     * @returns {boolean}
     */
    show: function(options) {

        if ($('#loader')[0]) {
            return false;
        }

        options = typeof options === 'object' ? options : {};

        $('.page-menu > header').after(appTemplates['page-menu/loader']);

        let loaderElement  = $('#loader .loader-progress');
        let linearProgress = new mdc['linear-progress'].MDCLinearProgress(loaderElement[0]);
        linearProgress.determinate = false;

        return true;
    },


    /**
     * Скрытие лодера
     */
    hide: function () {
        $('#loader').remove();
    }
};
