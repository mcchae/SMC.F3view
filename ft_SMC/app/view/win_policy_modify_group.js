
Ext.define('SMC.view.win_policy_modify_group', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    id: 'dlg_modify_group',
    title: '그룹 수정',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    margins: '20',
                    itemId: 'iid_cont_msg',
                    layout: 'fit'
                },
                {
                    xtype: 'textfield',
                    itemId: 'txt_grp_mod_name',
                    margin: '2 2 10 2',
                    width: 296,
                    enforceMaxLength: true,
                    maxLength: 32,
                    listeners: {
                        specialkey: {
                            fn: me.onTxt_grp_mod_nameSpecialkey,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'container',
                    weight: 100,
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            margin: '2 20 2 2',
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
                            margin: '2 2 2 20',
                            padding: '3 14',
                            text: '취소',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onDlg_modify_groupAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTxt_grp_mod_nameSpecialkey: function(field, e, eOpts) {
        var me = this;
        if(e.getKey() == e.ENTER){
            me.onButtonClick();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this,
            _svc = 'ftSMC',
            _func = 'modGroup';

        var _name = me.query('textfield[itemId=txt_grp_mod_name]')[0].getRawValue();

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
                name : Ext.encode(_name),
                cid : Ext.encode(me._cid)
            };

            ///*
            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){
                    console.log('response - ', response);
                    if(response)
                    {
                        if(!response.errcode)
                        {
                            me._policy_grp.fn_tree_init(response);
                        }
                    }

                    me.destroy();
                }
            );
            //*/

        }
    },

    onButtonClick1: function(button, e, eOpts) {
        this.destroy();
    },

    onDlg_modify_groupAfterRender: function(component, eOpts) {
        var me = this;
        var _lbl = me.query('label')[0];
        var _len = me._grp_name.length;
        var _p = _len / 40,
            _m = _len % 40;
        //var _msg = "<center>";
        var _msg = "";

        if (_len > 40){
            var i = 40;
            _msg += me._grp_name.substr(0, i);
            for (; i < _len ; i += 40){
                _msg += "<br/>";
                _msg += me._grp_name.substr(i, 40);
            }
            _msg += me._grp_name.substr(i, _m);
            _msg += "<br/>";

        } else {
            _msg = me._grp_name;
        }

        //_msg += "</center>";
        _msg += ' 그룹이름을 수정 하시겠습니까?';

        me.down('#iid_cont_msg').add({
            xtype: 'label',
            flex: 1,
            margin: '2 2 2 2',
            html : _msg
        });


    }

});