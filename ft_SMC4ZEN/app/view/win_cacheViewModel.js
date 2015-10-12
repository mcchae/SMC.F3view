
Ext.define('SMC4ZEN.view.win_cacheViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_cache',

    data: {
        dns_cache_add: __zen('dns_cache_add'),
        dns_cache_mod: __zen('dns_cache_mod'),
        inter: __zen('inter'),
        ip_mask: __zen('ip_mask'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        add_plus: __zen('add_plus'),
        close: __zen('close')
    }

});