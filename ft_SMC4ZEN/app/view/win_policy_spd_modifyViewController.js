
Ext.define('SMC4ZEN.view.win_policy_spd_modifyViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_policy_spd_modify',

    onBt_modClick: function(button, e, eOpts) {
        var me = this.getView(),
            _svc = 'ftSMC',
            _func = 'modObjectName';

        var _name = this.lookupReference('xtm_policy_name').getValue();

        if(!_name){

            Ext.Msg.show({

                title: 'Error Message',
                msg: 'Input a policy name',
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO

            });

        }
        else{

            policy_obj = me._obj;

            var _params = {

                cid : Ext.encode(policy_obj['@cid']),
                name : Ext.encode(_name)

            };

            request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                var tabs = Ext.getCmp(DEVICE_COMMON_ID.policytab);

                var _tabitemlist = tabs.items.items;

                for(var i in _tabitemlist){

                    if(_tabitemlist[i]._policy_cid === policy_obj['@cid']){

                        _tabitemlist[i].setTitle(_name);

                    }

                }

                me._policy_grp.fn_list_init(me._obj_cid);

                me.destroy();

            }

            );

        }
    },

    onBt_closeClick: function(button, e, eOpts) {
        this.getView().close();
    },

    onDlg_modify_spdAfterRender: function(component, eOpts) {
        var me = this.getView();

        this.lookupReference('xtm_policy_modmesg').setText(me._policy_name + '정책 이름을 수정 하시겠습니까?');
        this.lookupReference('xtm_policy_name').setValue(me._policy_name);

        me.keyNav = Ext.create('Ext.util.KeyNav', me.el, {

            enter : me.onButtonClick,
            scope : this

        });
    }

});
