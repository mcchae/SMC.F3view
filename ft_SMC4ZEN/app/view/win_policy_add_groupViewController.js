
Ext.define('SMC4ZEN.view.win_policy_add_groupViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_policy_add_group',

    onTxt_grp_nameSpecialkey: function(field, e, eOpts) {
        if(e.getKey() === e.ENTER){

            this.lookupReference('zen_bt_addgroup').onButtonClick();

        }
    },

    onBt_addClick: function(button, e, eOpts) {
        var me = this.getView(),
            _svc = 'ftSMC',
            _func = 'addGroup';

        var _name = this.lookupReference('zen_group_name').getValue();

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

                name : Ext.encode(_name),
                p_cid : Ext.encode(me._parent_cid)

            };

            request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response){

                    if(!response.errcode){

                        var policy_grp = me._policy_grp;

                        policy_grp.fn_tree_init(response);

                    }

                }

                me.destroy();

            }

            );

        }
    },

    onBt_closeClick: function(button, e, eOpts) {
        this.getView().close();
    }

});
