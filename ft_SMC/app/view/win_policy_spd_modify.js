
Ext.define('SMC.view.win_policy_spd_modify', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 176,
    id: 'dlg_modify_spd',
    width: 354,
    title: '보안정책 수정',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    height: 20
                },
                {
                    xtype: 'label',
                    margin: '0 0 0 20',
                    text: '보안정책 이름을 입력하세요'
                },
                {
                    xtype: 'textfield',
                    itemId: 'txt_policy_mod_name',
                    margin: '20 20 20 20',
                    width: 296,
                    enforceMaxLength: true,
                    maxLength: 32
                },
                {
                    xtype: 'button',
                    margin: '0 20 20 80',
                    padding: '3 14',
                    text: '확인',
                    listeners: {
                        click: {
                            fn: me.onButtonClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'button',
                    margin: '0 20 20 40',
                    padding: '3 14',
                    text: '취소',
                    listeners: {
                        click: {
                            fn: me.onButtonClick1,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onDlg_modify_spdAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this,
            _svc = 'ftSMC',
            _func = 'modObjectName';

        var _name = me.query('textfield[itemId=txt_policy_mod_name]')[0].getRawValue();
        if(_name === "" | typeof _name === 'undefined'){
            Ext.Msg.show({
                title: 'Error Message',
                msg: 'Input a policy name',
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });
        } else {

            policy_obj = me._obj;
            var _params = {
                cid : Ext.encode(policy_obj['@cid']),
                name : Ext.encode(_name)
            };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                'chkDuplicateObject',
                {obj : Ext.encode(policy_obj)},
                function(response){
                    if(response === true){
                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '중복되는 정책명이 존재합니다. 저장하시겠습니까?',
                            buttonText: {
                                ok     : "저장",
                                cancel : "취소"
                            },

                            buttons : Ext.Msg.OKCANCEL,
                            alwaysOnTop : true,
                            icon : Ext.Msg.INFO,
                            fn: function(buttonId) {

                                if (buttonId === "ok") {
                                    request_helper.xmlrpc_call_Ajax_Post(
                                        _svc,
                                        _func,
                                        _params,
                                        function(response){

                                            var tabs = Ext.ComponentQuery.query('tabpanel[itemId=tab_spds]')[0];

                                            var _tabitemlist = tabs.items.items;

                                            for(var i in _tabitemlist){

                                                if(_tabitemlist[i]._policy_cid === policy_obj['@cid'])
                                                {
                                                    _tabitemlist[i].setTitle(_name);
                                                }
                                            }

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
                            _params,
                            function(response){

                                var tabs = Ext.ComponentQuery.query('tabpanel[itemId=tab_spds]')[0];

                                var _tabitemlist = tabs.items.items;

                                for(var i in _tabitemlist){

                                    if(_tabitemlist[i]._policy_cid === policy_obj['@cid'])
                                    {
                                        _tabitemlist[i].setTitle(_name);
                                    }
                                }

                                me._policy_grp.fn_list_init(me._obj_cid);
                                me.destroy();

                            }
                        );
                    }
                }
            );
        }
        //*/

    },

    onButtonClick1: function(button, e, eOpts) {
        this.destroy();
    },

    onDlg_modify_spdAfterRender: function(component, eOpts) {
        var me = this;
        var _lbl = me.query('label')[0];
        _lbl.setText(me._policy_name + '정책이름을 수정 하시겠습니까?');
        me.query('textfield[itemId="txt_policy_mod_name"]')[0].setValue(me._policy_name);

        me.keyNav = Ext.create('Ext.util.KeyNav', me.el, {
            enter : me.onButtonClick,
            scope : this
        });
    }

});