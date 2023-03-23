
var appMain = {

    options: {
        basePath: 'app',
    },

    /**
     *
     */
    install: {
        event: null,
        promise: null,
    },

    /**
     *
     */
    _hashChangeCallbacks: [],


    /**
     * @param pageName
     */
    viewPage: function (pageName) {

        let pageObjectName = 'appPage' +  pageName.charAt(0).toUpperCase() + pageName.slice(1);

        if (window[pageObjectName]) {
            let pageContent = window[pageObjectName].getPageContent();
            $('.main').append('<div class="page page-' + pageName + '">' + pageContent + '</div>');
            window[pageObjectName].init();

            appMain.activePage = pageName

            let $otherPages = $('.main > .page:not(.page-' + pageName + ')');

            if ($otherPages[0]) {
                $otherPages.fadeOut('fast', function () {
                    $otherPages.remove();

                    $('.main > .page-' + pageName).fadeIn('fast');
                });

            } else {
                $('.main > .page-' + pageName).fadeIn('fast');
            }

        } else {
            CoreUI.alert.danger('Ошибка', 'Страница ' + pageName + ' не найдена');
        }
    },


    /**
     * @param eventName
     * @param callback
     */
    on: function (eventName, callback) {

        if (eventName === 'hashchange') {
            appMain._hashChangeCallbacks.push(callback);
        }
    },


    /**
     *
     */
    hashChange: function () {

        if (appMain._hashChangeCallbacks.length > 0) {
            for (let i = 0; i < appMain._hashChangeCallbacks.length; i++) {
                appMain._hashChangeCallbacks[i]();
            }
        }
    },


    /**
     * @param text
     * @param options
     * @private
     */
    _: function (text, options) {

        return text;
    },
}


$(function () {

    // Событие установки
    appMain.install.promise = new Promise(function (resolve, reject) {

        window.addEventListener('beforeinstallprompt', event => {
            event.preventDefault();
            appMain.install.event = event;
            resolve(event);
        })
    });


    // Регистрация service worker
   if ('serviceWorker' in navigator && location.protocol === 'https') {
      navigator.serviceWorker.register('sw.js')
          .then(swRegistration => {
              // при каждой перезагрузке страницы будет запускать обновление кэша
              swRegistration.update();

          }).catch(err => console.log('SW registration FAIL:', err));
   }

    appMain.viewPage('menu');


    if ("onhashchange" in window) {
        window.onhashchange = appMain.hashChange;
    }
});