
Ext.define('SMC4ZEN.view.win_policy_spd_addViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_policy_spd_add',

    onBt_addClick: function(button, e, eOpts) {
        var me = this.getView(),
            _svc = 'ftSMC',
            _func = 'getPolicyDefault';

        var _name = this.lookupReference('xtm_policy_name').getValue();

        if(!_name){

            Ext.Msg.show({

                title: 'Error Message',
                msg: 'Input a group name',
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO

            });

        }
        else{

            var _params = {

                kind : Ext.encode(me.kind)

            };

            request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                response.name = _name;

                console.log('_params -> ' ,me.g_cid);

                var _params = {

                    obj : Ext.encode(response),
                    g_cid : Ext.encode(me.g_cid)

                };

                console.log('_params -> ' ,me.g_cid);

                request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                'addPolicy',
                _params,
                function(response){

                    console.log("Add policy -> ", response);

                    if(response){

                        me._policy_grp.fn_list_init(me.g_cid);

                        me.destroy();

                    }
                    else {

                        Ext.Msg.show({

                            title: 'Error Message',
                            msg: 'Add Failed!',
                            buttons: Ext.Msg.OK,
                            icon: Ext.window.MessageBox.INFO

                        });

                    }

                }

                );

            }

            );

        }
    },

    onBt_closeClick: function(button, e, eOpts) {
        this.getView().close();
    },

    onWin_policy_spd_addAfterRender: function(component, eOpts) {
        var me = this.getView();

        me.keyNav = Ext.create('Ext.util.KeyNav', me.el, {

            enter : me.onButtonClick,
            scope : me

        });
    }

});
