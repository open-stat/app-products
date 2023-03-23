
appPageMenu.preloader = {

    /**
     * Показ прелодера
     * @param options
     * @returns {boolean}
     */
    show: function(options) {

        if ($('#preloader')[0]) {
            return false;
        }

        options = typeof options === 'object' ? options : {};

        $('.page-menu').prepend(ejs.render(appTemplates['page-menu/preloader'], {
            text: options.text || 'Загрузка...'
        }));

        let element            = $('#preloader .mdc-circular-progress');
        const circularProgress = new mdc['circular-progress'].MDCCircularProgress(element[0]);
        circularProgress.determinate = false;
        circularProgress.progress = 0;

        return true;
    },


    /**
     * Скрытие прелодера
     */
    hide: function () {
        $('#preloader').fadeOut('fast', function () {
            $(this).remove();
        });
    }
};
