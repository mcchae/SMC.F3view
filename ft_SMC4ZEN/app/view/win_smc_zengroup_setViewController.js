
Ext.define('SMC4ZEN.view.win_smc_zengroup_setViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_zen_group_set',

    onBt_addClick: function(button, e, eOpts) {
        var win_group = this.getView(),
            pnl_group = Ext.getCmp(DEVICE_COMMON_ID.devicezengroup),
            groupName = this.lookupReference('zen_dev_groupname').getValue();

        if(win_group.mode === 'ADD'){

            if(groupName.length <= 0){

                Ext.Msg.show({

                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_null_groupname'),
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return false;
            }

            // 데이터 추가

            var service = 'ftZEN',
                svc_func = 'addGroup',
                params = {
                    'name' : Ext.encode(groupName),
                    'p_cid' : Ext.encode(win_group.groupParams)
                };

            request_helper.xmlrpc_call_Ajax_Post(
            service,
            svc_func,
            params,
            function(res){

                var serviceName = 'ftZEN',
                    rpcFunc = 'getGroup',
                    params = {

                        'gtype' : Ext.encode('object_dev_zen')

                    };

                treeReload(pnl_group, serviceName, rpcFunc, params);

            }

            );

        }
        else{

            if(groupName.length <= 0){

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
                    name : Ext.encode(groupName),
                    cid : Ext.encode(win_group.groupParams)
                };

            request_helper.xmlrpc_call_Ajax_Post(
            service,
            svc_func,
            params,
            function(res){

                var serviceName = 'ftZEN',
                    rpcFunc = 'getGroup',
                    params = {

                        'gtype' : Ext.encode('object_dev_zen')

                    };

                treeReload(pnl_group, serviceName, rpcFunc, params);

            }

            );

        }

        win_group.close();
    },

    onBt_cancelClick: function(button, e, eOpts) {
        this.getView().close();
    }

});
