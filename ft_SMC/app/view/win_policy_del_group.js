
Ext.define('SMC.view.win_policy_del_group', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    height: 146,
    id: 'dlg_del_group',
    title: '그룹 삭제',

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
                    text: '그룹을 삭제 하시겠습니까?'
                },
                {
                    xtype: 'container',
                    height: 20
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
                    fn: me.onDlg_del_groupAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this,
            _svc = 'ftSMC',
            _func = 'delGroup';

        var _params = {
            cid : Ext.encode(me._cid)
        };

        ///*
        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){
                console.log(response);
                if(response)
                {
                    if(!response.errcode)
                    {
                        var treeObj = Ext.ComponentQuery.query('treepanel[itemId="tree_policy_group"]')[0];
                        var treeSelection = me._selectionModel;//treeObj.getSelectionModel().getSelection()[0];
                        var parent = treeSelection.parentNode;

                        if(response.errcode)
                        {
                            if(response.errcode === 5003)
                            {
                                me._policy_grp.fn_tree_init(treeSelection.raw);
                                me.destroy();
                            }
                        }
                        else
                        {
                            me._policy_grp.fn_tree_init(me._selectionModel.parentNode.raw);
                            me.destroy();
                        }
                    }
                }
            }
        );
        //*/

    },

    onButtonClick1: function(button, e, eOpts) {
        Ext.getCmp('dlg_del_group').destroy();
    },

    onDlg_del_groupAfterRender: function(component, eOpts) {
        var me = this;
        var _lbl = me.query('label')[0];
        _lbl.setText(me._grp_name + '그룹을 삭제 하시겠습니까?');

        me.keyNav = Ext.create('Ext.util.KeyNav', me.el, {
            enter : me.onButtonClick,
            scope : this
        });
    }

});