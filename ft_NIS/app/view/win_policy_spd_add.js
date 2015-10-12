
Ext.define('SMC.view.win_policy_spd_add', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 176,
    id: '',
    width: 354,
    title: '보안정책 등록',

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
                    itemId: 'txt_policy_name',
                    margin: '20 20 20 20',
                    width: 296
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
                    fn: me.onWindowAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this,
            _svc = 'ftSMC',
            _func = 'getPolicyDefault';

        var _name = me.query('textfield[itemId=txt_policy_name]')[0].getRawValue();
        if(_name === "" | typeof _name === 'undefined'){
            Ext.Msg.show({
                title: 'Error Message',
                msg: 'Input a group name',
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });
        } else {
            var _params = {
                kind : Ext.encode(me.kind)
            };

            ///*
            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){
                    response.name = _name;

                    var _params = {
                        obj : Ext.encode(response),
                        g_cid : Ext.encode(me.g_cid)
                    };

                    request_helper.xmlrpc_call_Ajax_Post(
                        _svc,
                        'addPolicy',
                        _params,
                        function(response){
                           if(response){
                               me._policy_grp.fn_list_init(me.g_cid);
                               me.destroy();
                           } else {
                               Ext.Msg.show({
                                   title: 'Error Message',
                                   msg: 'Add Failed!',
                                   width: 300,
                                   buttons: Ext.Msg.OK,
                                   icon: Ext.window.MessageBox.INFO
                               });
                           }
                        }
                    );

                }
            );
        }
        //*/

    },

    onButtonClick1: function(button, e, eOpts) {
        this.destroy();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.keyNav = Ext.create('Ext.util.KeyNav', me.el, {
            enter : me.onButtonClick,
            scope : this
        });
    }

});