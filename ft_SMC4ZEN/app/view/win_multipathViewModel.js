
Ext.define('SMC4ZEN.view.win_multipathViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_multipath',

    data: {
        add_multipath: __zen('add_multipath'),
        edit_multipath: __zen('edit_multipath'),
        rank: __zen('rank'),
        src_ip: __zen('src_ip'),
        dest_ip: __zen('dest_ip'),
        space_any: __zen('space_any'),
        inter: __zen('inter'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});