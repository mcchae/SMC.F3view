
Ext.define('SMC4ZEN.view.win_policy_modify_groupViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_policy_modify_group',

    onBt_modClick: function(button, e, eOpts) {
        var me = this.getView(),
            _svc = 'ftSMC',
            _func = 'modGroup';

        var _name = this.lookupReference('zen_policy_groupname').getValue();

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
                cid : Ext.encode(me._cid)

            };

            request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response){

                    if(!response.errcode){

                        me._policy_grp.fn_tree_init(response);

                    }

                }

                me.destroy();

            }

            );

        }
    },

    onBt_closeClick: function(button, e, eOpts) {
        this.getView().close();
    },

    onDlg_modify_groupAfterRender: function(component, eOpts) {
        var me = this.getView();

        this.lookupReference('zen_policy_mesg').setText(me._grp_name + '그룹 이름을 수정하시겠습니까?');
    }

});
