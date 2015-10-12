
Ext.define('SMC4ZEN.view.win_policy_del_groupViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_policy_del_group',

    onBt_delClick: function(button, e, eOpts) {
        var me = this.getView(),
            _svc = 'ftSMC',
            _func = 'delGroup';

        var _params = {

            cid : Ext.encode(me._cid)

        };

        request_helper.xmlrpc_call_Ajax_Post(
        _svc,
        _func,
        _params,
        function(response){

            if(response){

                if(!response.errcode){

                    var pnl_main = Ext.getCmp('pnl_policy_view');
                    var pnl_west = pnl_main.down('[itemId=pnl_policy_group]');
                    var pnl_group = pnl_west.down('[itemId=tree_policy_group]');

                    var grp_select = pnl_group.getSelection()[0];

                    var parent = pnl_group.getSelection()[0].parentNode;

                    if(response.errcode){

                        if(response.errcode === 5003){

                            me._policy_grp.fn_tree_init(grp_select.raw);

                        }

                    }
                    else{

                        grp_select.remove(true);

                        if(parent.childNodes.length < 1){

                            parent.data.leaf = true;
                            parent.raw.leaf = true;

                        }

                        pnl_group.getView().refresh();

                    }

                }

            }

            me.destroy();

        }

        );
    },

    onBt_closeClick: function(button, e, eOpts) {
        this.getView().close();
    },

    onDlg_del_groupAfterRender: function(component, eOpts) {
        var me = this.getView();

        this.lookupReference('zen_group_mesg').setText(me._grp_name + '그룹을 삭제 하시겠습니까?');

        me.keyNav = Ext.create('Ext.util.KeyNav', me.el, {

            enter : me.onButtonClick,
            scope : this

        });
    }

});
