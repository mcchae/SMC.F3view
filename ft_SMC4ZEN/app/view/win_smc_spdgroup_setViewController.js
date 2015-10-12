
Ext.define('SMC4ZEN.view.win_smc_spdgroup_setViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_smc_spdgroup_set',

    onBt_addClick: function(button, e, eOpts) {
        var me = this.getView();
        var pnl_group = Ext.getCmp(SMC_COMMSPD_ID.commspdgroup);
        var dat_groupname = this.lookupReference('zen_commspd_groupname').getValue();

        if(me.mode === 'ADD'){

            if(dat_groupname.length <= 0){

                Ext.Msg.show({

                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_null_groupname'),
                    buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR

                });

                return false;
            }

            // 데이터 추가

            var service = 'ftZEN',
                svc_func = 'addGroup',
                params = {
                    'name' : Ext.encode(dat_groupname),
                    'p_cid' : Ext.encode(me.groupParams)
                };

            request_helper.xmlrpc_call_Ajax_Post(
            service,
            svc_func,
            params,
            function(res){

                var serviceName = 'ftZEN',
                    rpcFunc = 'getGroup',
                    params = {

                        'gtype' : Ext.encode('object_profile')

                    };

                treeReload(pnl_group, serviceName, rpcFunc, params);

            }
            );

        }
        else{

            if(dat_groupname.length <= 0){

                Ext.Msg.show(
                {

                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_null_groupname'),
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return false;

            }

            // 데이터 수정

            var service = 'ftZEN',
                svc_func = 'modGroup',
                params = {
                    name : Ext.encode(dat_groupname),
                    cid : Ext.encode(me.groupParams)
                };

            request_helper.xmlrpc_call_Ajax_Post(
            service,
            svc_func,
            params,
            function(res){

                var serviceName = 'ftZEN',
                    rpcFunc = 'getGroup',
                    params = {

                        'gtype' : Ext.encode('object_profile')

                    };

                treeReload(pnl_group, serviceName, rpcFunc, params);

            }
            );

        }

        me.destroy();
    },

    onBt_cancelClick: function(button, e, eOpts) {
        this.getView().close();
    },

    onWin_smc_spdgroup_setBeforeRender: function(component, eOpts) {
        component.setTitle(SMC_SET_PRODUCT);
    }

});
