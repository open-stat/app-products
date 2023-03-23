
var CoreUI = typeof CoreUI !== 'undefined' ? CoreUI : {};

CoreUI.confirm = {

    _dialog: null,

    info: function (title, message, options) {
        this.create(title, message, options);
    },


    /**
     * @param title
     * @param message
     * @param options
     */
    warning: function (title, message, options) {

        options = typeof options === 'object' ? options : {};
        options.titleColor = "#e65100";

        this.create(title, message, options);
    },


    /**
     * @param title
     * @param message
     * @param options
     */
    danger: function (title, message, options) {

        options = typeof options === 'object' ? options : {};
        options.titleColor = "#f44336";

        this.create(title, message, options);
    },


    /**
     * @param title
     * @param message
     * @param options
     */
    success: function (title, message, options) {

        options = typeof options === 'object' ? options : {};
        options.titleColor = "#4caf50";

        this.create(title, message, options);
    },


    /**
     * @param title
     * @param message
     * @param options
     * @returns {MDCDialog}
     */
    create: function(title, message, options) {

        if (CoreUI.confirm._dialog) {
            CoreUI.confirm._dialog.close();
        }

        options = options || {};

        let titleColor = typeof options['titleColor'] === 'string'
            ? 'style="color: ' + options['titleColor'] + '"'
            : '';

        let messageColor = typeof options['messageColor'] === 'string'
            ? 'style="color: ' + options['messageColor'] + '"'
            : '';

        let cancelButtonText = typeof options['cancelButtonText'] === 'string'
            ? options['cancelButtonText']
            : 'Отмена';

        let acceptButtonText = typeof options['acceptButtonText'] === 'string'
            ? options['acceptButtonText']
            : 'Да';

        let tplTitle = title
            ? '<h2 class="mdc-dialog__title" ' + titleColor + '>' + title + '</h2>'
            : '';

        let tplMessage = message
            ? '<div class="mdc-dialog__content" ' + messageColor + '>' + message + '</div>'
            : '';

        $('body').append(
            '<div class="mdc-dialog" id="dialog-confirm">' +
                '<div class="mdc-dialog__container">' +
                    '<div class="mdc-dialog__surface" role="alertdialog" aria-modal="true"' +
                         'aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content">' +
                        tplTitle +
                        tplMessage +
                        '<div class="mdc-dialog__actions">' +
                            '<button type="button" class="mdc-button mdc-dialog__button" ' +
                                    'data-mdc-dialog-action="cancel">' +
                                '<div class="mdc-button__ripple"></div>' +
                                '<span class="mdc-button__label">' + cancelButtonText + '</span>' +
                            '</button>' +
                            '<button type="button" class="mdc-button mdc-dialog__button" ' +
                                    'data-mdc-dialog-action="accept">' +
                                '<div class="mdc-button__ripple"></div>' +
                                '<span class="mdc-button__label">' + acceptButtonText + '</span>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="mdc-dialog__scrim"></div>' +
            '</div>'
        );

        let dialogElement = $('#dialog-confirm:not(.mdc-dialog--closing)');
        let dialog        = new mdc.dialog.MDCDialog(dialogElement[0]);

        dialog.listen('MDCDialog:closing', function(data) {
            switch (data.detail.action) {
                case 'accept':
                    if (typeof options['onAccept'] === 'function') {
                        options['onAccept']();
                    }
                    break;

                case 'cancel':
                    if (typeof options['onCancel'] === 'function') {
                        options['onCancel']();
                    }
                    break;
            }
        });

        dialog.listen('MDCDialog:closed', function(data) {
            dialogElement.remove();
        });

        dialog.open();

        CoreUI.confirm._dialog = dialog;

        return dialog;
    },
}