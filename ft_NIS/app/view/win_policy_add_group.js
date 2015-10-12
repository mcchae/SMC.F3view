
Ext.define('SMC.view.win_policy_add_group', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 176,
    id: 'dlg_add_group',
    width: 354,
    title: '그룹 등록',

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
                    text: '그룹 이름을 입력하세요'
                },
                {
                    xtype: 'textfield',
                    itemId: 'txt_grp_name',
                    margin: '20 20 20 20',
                    width: 296,
                    listeners: {
                        specialkey: {
                            fn: me.onTxt_grp_nameSpecialkey,
                            scope: me
                        }
                    }
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
            ]
        });

        me.callParent(arguments);
    },

    onTxt_grp_nameSpecialkey: function(field, e, eOpts) {
        var me = this;
        if(e.getKey() == e.ENTER){
            me.onButtonClick();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this,
            _svc = 'ftSMC',
            _func = 'addGroup';

        var _name = me.query('textfield[itemId=txt_grp_name]')[0].getRawValue();
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
                p_cid : Ext.encode(me._parent_cid)
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
                            var policy_grp = me._policy_grp;
                            policy_grp.fn_tree_init(response);
                        }
                    }

                    me.destroy();
                }
            );
        }
        //*/



    },

    onButtonClick1: function(button, e, eOpts) {
        this.destroy();
    }

});