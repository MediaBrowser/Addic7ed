define(['baseView', 'loading', 'emby-input', 'emby-button', 'emby-scroller'], function (BaseView, loading) {
    'use strict';

    function loadPage(page, config) {

        page.querySelector('.txtAddic7edUsername').value = config.Addic7edUsername || '';
        page.querySelector('.txtAddic7edPassword').value = config.Addic7edPasswordHash || '';

        loading.hide();
    }

    function onSubmit(e) {

        e.preventDefault();

        loading.show();

        var form = this;

        ApiClient.getNamedConfiguration("addic7ed").then(function (config) {

            config.Addic7edUsername = form.querySelector('.txtAddic7edUsername').value;

            var newPassword = form.querySelector('.txtAddic7edPassword').value;

            if (newPassword) {
                config.Addic7edPasswordHash = newPassword;
            }


            ApiClient.updateNamedConfiguration("addic7ed", config).then(Dashboard.processServerConfigurationUpdateResult);
        });

        // Disable default form submission
        return false;
    }

    function getConfig() {

        return ApiClient.getNamedConfiguration("addic7ed").then(function (config) {

            if (config.Addic7edUsername || config.Addic7edPasswordHash) {
                return config;
            }

            return ApiClient.getNamedConfiguration("addic7ed");
        });
    }

    function View(view, params) {
        BaseView.apply(this, arguments);

        view.querySelector('form').addEventListener('submit', onSubmit);
    }

    Object.assign(View.prototype, BaseView.prototype);

    View.prototype.onResume = function (options) {

        BaseView.prototype.onResume.apply(this, arguments);

        loading.show();

        var page = this.view;

        getConfig().then(function (response) {

            loadPage(page, response);
        });
    };

    return View;
});
