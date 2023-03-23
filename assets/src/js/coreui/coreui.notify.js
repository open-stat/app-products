
var CoreUI = typeof CoreUI !== 'undefined' ? CoreUI : {};

CoreUI.notice = {


    /**
     * @param text
     * @param options
     */
    info: function (text, options) {

        this.create(text, options);
    },


    /**
     * @param text
     * @param options
     */
    warning: function (text, options) {

        options = typeof options === 'object' ? options : {};
        options.color     = "#ff9800";
        options.textColor = "#000000";

        this.create(text, options);
    },


    /**
     * @param text
     * @param options
     */
    danger: function (text, options) {

        options = typeof options === 'object' ? options : {};
        options.color = "#f44336";

        this.create(text, options)
    },


    /**s
     * @param text
     * @param options
     */
    success: function (text, options) {

        options = typeof options === 'object' ? options : {};
        options.color = "#4caf50";

        this.create(text, options);
    },


    /**
     * @param text
     * @param options
     * @returns {*}
     */
    create: function(text, options) {

        $('.mdc-snackbar').remove('');

        options = options || {};

        options['color'] = typeof options['color'] === 'string'
            ? 'style="background-color:' + options['color'] + '"'
            : '';

        options['textColor'] = typeof options['textColor'] === 'string'
            ? 'style="color:' + options['textColor'] + '"'
            : '';

        options['customClass'] = typeof options['customClass'] === 'string'
            ? options['customClass']
            : '';

        options['timeout'] = typeof options['timeout'] === 'number'
            ? options['timeout']
            : 4000;

        options['closeButton'] = typeof options['closeButton'] === 'boolean' && options['closeButton']
            ? '<button class="mdc-icon-button mdc-snackbar__dismiss material-icons" title="Dismiss">close</button>'
            : '';

        let buttonText = typeof options['buttonText'] === 'string'
            ? options['buttonText']
            : '';

        let buttonCallback = typeof options['buttonCallback'] === 'function'
            ? options['buttonCallback']
            : '';


        let trlButton = buttonText && buttonCallback
            ? '<button type="button" class="mdc-button mdc-snackbar__action">' +
                '<div class="mdc-button__ripple"></div>' +
                '<span class="mdc-button__label">' + buttonText + '</span>' +
                '</button>'
            : '';

        let id = "snackbar-" + new Date().getTime()

        $('body').prepend(
            '<div class="mdc-snackbar ' + options['customClass'] + '" id="' + id + '">' +
                '<div class="mdc-snackbar__surface" ' + options['color'] + ' role="status" aria-relevant="additions">' +
                    '<div class="mdc-snackbar__label" ' + options['textColor'] + ' aria-atomic="false">' +
                        text +
                    '</div>' +
                    trlButton +
                    options['closeButton'] +
                '</div>' +
            '</div>'
        );


        let snackbarElement = $('#' + id);
        let snackbar        = new mdc.snackbar.MDCSnackbar(snackbarElement[0]);
        snackbar.timeoutMs = options['timeout'];


        if (buttonText && buttonCallback) {
            new mdc.ripple.MDCRipple($('#' + id + ' button')[0]);

            $('#' + id + ' button').on('click', function (event) {
                buttonCallback(event)
            });
        }



        if (typeof options['onClose'] === 'function') {
            snackbar.listen('MDCSnackbar:closing', function(data) {
                options['onClose'](data);
            });
        }


        snackbar.listen('MDCSnackbar:closed', function(data) {
            snackbarElement.remove();
        });

        snackbar.open();

        return snackbar;
    },
}