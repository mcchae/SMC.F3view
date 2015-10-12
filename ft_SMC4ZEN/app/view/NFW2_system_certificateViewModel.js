
Ext.define('SMC4ZEN.view.NFW2_system_certificateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_system_certificate',

    data: {
        root_cert: __zen('root_cert'),
        certificate: __zen('certificate'),
        add_cert: __zen('add_cert'),
        add_key: __zen('add_key'),
        del: __zen('del'),
        private_pass: __zen('private_pass'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        number: __zen('number'),
        issue_target: __zen('issue_target'),
        issuer: __zen('issuer'),
        expire_date: __zen('expire_date')
    }

});