
Ext.define('SMC4ZEN.view.win_policy_spd_delViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_policy_spd_del',

    onBt_delClick: function(button, e, eOpts) {
        var me = this.getView(),
            _svc = 'ftSMC',
            _func = 'delPolicy';

        var tabs = Ext.getCmp(DEVICE_COMMON_ID.policytab);

        var _tabitemlist = tabs.items.items;

        var _active_cid_list = [];

        for(var i in _tabitemlist){

            var _cid = _tabitemlist[i]._policy_cid;

            _active_cid_list.push(_cid);

        }

        var _l = me._obj;
        var _cid_list = [];
        var _tab_cid_list = [];

        for(var i = 0 ; i < _l.length ; i++){

            var _tmp = _l[i].data;

            _cid_list.push(_tmp['@cid']);

            if(_active_cid_list.indexOf(_tmp['@cid']) < 0){

                _tab_cid_list.push(_tmp['@cid']);

            }

        }

        if(_tab_cid_list.length !== _cid_list.length){

            Ext.MessageBox.show({
                title:'WeGuardia™ SMC 2.0',
                msg: '편집중인 정책이 있습니다. 닫고 삭제하시겠습니까?',
                buttons: Ext.Msg.YESNOCANCEL,
                buttonText: {yes: "예",no: "아니오", cancel: "취소"},
                fn: function(btn){

                    if(btn === 'yes'){

                        request_helper.xmlrpc_call_Ajax_Post(
                        _svc,
                        _func,
                        {
                            cid : Ext.encode(_cid_list)
                        },
                        function(response){

                            me._policy_grp.fn_list_init(me._obj_cid);
                            me._policy_grp.fn_tabItem_remove(_cid_list);
                            me.destroy();

                        }

                        );

                    }
                    else if(btn === 'no'){

                        request_helper.xmlrpc_call_Ajax_Post(
                        _svc,
                        _func,
                        {
                            cid : Ext.encode(_tab_cid_list)
                        },
                        function(response){

                            me._policy_grp.fn_list_init(me._obj_cid);

                            me.destroy();

                        }

                        );

                    }

                }

            });

        }
        else{

            request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            {
                cid : Ext.encode(_cid_list)
            },
            function(response){

                me._policy_grp.fn_list_init(me._obj_cid);
                me._policy_grp.fn_tabItem_remove(_cid_list);
                me.destroy();

            }

            );

        }
    },

    onBt_closeClick: function(button, e, eOpts) {
        this.getView().close();
    },

    onDlg_del_spdAfterRender: function(component, eOpts) {
        var _txt = '';
        var me = this.getView();

        if(me._obj.length > 1){

            _txt = '[' +  me._obj[0].get('name') + ' 외 ' + (me._obj.length -1) + '개] 정책을 삭제하시겠습니까?';

        }
        else{

            _txt = '['+ me._obj[0].get('name') + '] 정책을 삭제 하시겠습니까?';

        }

        var _lbl = me.query('label')[0];

        _lbl.setText(_txt);

        me.keyNav = Ext.create('Ext.util.KeyNav', me.el, {

            enter : me.onButtonClick,
            scope : this

        });
    }

});
