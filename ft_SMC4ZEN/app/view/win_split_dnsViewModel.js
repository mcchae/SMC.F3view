
Ext.define('SMC4ZEN.view.win_split_dnsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_split_dns',

    data: {
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        direction: __zen('direction'),
        domain_name: __zen('domain_name'),
        type4: __zen('type4'),
        host_name: __zen('host_name'),
        host_ip: __zen('host_ip')
    }

});