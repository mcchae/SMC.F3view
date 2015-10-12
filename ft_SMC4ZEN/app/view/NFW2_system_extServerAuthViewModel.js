
Ext.define('SMC4ZEN.view.NFW2_system_extServerAuthViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_system_extserverauth',

    data: {
        auth_method: __zen('auth_method'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        server_address: __zen('server_address'),
        shared_pwd: __zen('shared_pwd'),
        auth_port: __zen('auth_port'),
        account_port: __zen('account_port'),
        state_chk: __zen('state_chk'),
        base_dn: __zen('base_dn'),
        bind_dn: __zen('bind_dn'),
        bind_pwd: __zen('bind_pwd'),
        current_state_chk: __zen('current_state_chk')
    },
    formulas : {
        use_radius : {
            bind : '{system_external_access.nac.radius}',
            get : function(value){
                var ck_value = value['@chk_use'];
                return (ck_value === 'off') ? false : true;
            },
            set : function(value){
                this.get('system_external_access').nac.radius['@chk_use'] = value;
            }
        },
        use_tacacs : {
            bind : '{system_external_access.nac.tacacs}',
            get : function(value){
                var ck_value = value['@chk_use'];
                return (ck_value === 'off') ? false : true;
            },
            set : function(value){
                this.get('system_external_access').nac.tacacs['@chk_use'] = value;
            }
        },
        use_ldap : {
            bind : '{system_external_access.nac.ldap}',
            get : function(value){
                var ck_value = value['@chk_use'];
                return (ck_value === 'off') ? false : true;
            },
            set : function(value){
                this.get('system_external_access').nac.ldap['@chk_use'] = value;
            }
        }
    }

});