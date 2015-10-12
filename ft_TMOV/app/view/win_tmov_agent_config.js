
Ext.define('TMOV.view.win_tmov_agent_config', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.form.field.Radio',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    height: 540,
    id: 'win_tmov_agent_config',
    width: 860,
    layout: 'fit',
    constrainHeader: true,
    title: '에이전트 버전 정보',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'gpn_tmov_agentfile',
                    store: 'st_tmov_agent',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'form',
                                    flex: 1,
                                    border: false,
                                    id: 'form_agent_file',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'filefield',
                                            id: 'ff_agent_file',
                                            width: 300,
                                            name: 'uploadfiles',
                                            buttonText: '찾기',
                                            buttonConfig: {
                                                xtype: 'filebutton',
                                                width: 80,
                                                text: '찾기'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'rdb_agent_inner_type',
                                                    fieldLabel: '망 구분',
                                                    labelAlign: 'right',
                                                    labelWidth: 60,
                                                    name: 'agent',
                                                    boxLabel: '내부',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 10
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'rdb_agent_outer_type',
                                                    name: 'agent',
                                                    boxLabel: '외부'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    id: 'txf_agent_update_version',
                                                    fieldLabel: '버전 명',
                                                    labelAlign: 'right',
                                                    labelWidth: 80
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 0 0 5',
                                            width: 80,
                                            text: '등록',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            hidden: true,
                            id: 'tb_agent_select',
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '선택',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 0 0 10',
                                            width: 80,
                                            text: '취소',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick2,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 260,
                            dataIndex: 'name',
                            text: '파일 이름'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value === '01')
                                return '내부';
                                else
                                return '외부';

                            },
                            width: 160,
                            dataIndex: 'type',
                            text: '망 구분'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 140,
                            dataIndex: 'version',
                            text: '버전'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 160,
                            dataIndex: 'reg_dtm',
                            text: '등록 일시',
                            flex: 1
                        }
                    ],
                    listeners: {
                        itemdblclick: {
                            fn: me.onGpn_tmov_agentfileItemDblClick,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_agent_configAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_agent_configBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        var _form = Ext.getCmp('form_agent_file').getForm();
        var _file = Ext.getCmp('ff_agent_file');

        if (Ext.getCmp('ff_agent_file').getValue() === '')
        {
            Ext.MessageBox.show({ title: '에이전트 등록', msg: '추가할 에이전트를 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var type = '01';

        if (Ext.getCmp('rdb_agent_inner_type').getValue() === true)
        {
            type = '01';
        }
        else
        {
            type = '02';
        }

        var version = Ext.getCmp('txf_agent_update_version').getValue();

        if (version === '')
        {
            Ext.MessageBox.show({ title: '에이전트 등록', msg: '에이전트 버전을 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(_form.isValid())
        {
            _form.submit({
                url: '/fileUpload',
                waitMsg: 'Uploading...',
                params: {filepath: '/tmp/'},
                success: function(fp, o) {

                    var _data = JSON.parse(o.response.responseText);
                    var _fileName = _data.data;

                    var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Uploading...."});
                    myMask.show();

                    Ext.Ajax.request(
                        {
                            url : 'api/ftTMOV/UploadAgentVersion',
                            params : {
                                fileInfo : Ext.encode(_fileName),
                                ftype : Ext.encode(type),
                                version : Ext.encode(version)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                if(resObj.retval === false)
                                {
                                    myMask.destroy();

                                    if (resObj.ercode === 'already')
                                    {
                                        Ext.MessageBox.show({ title: '에이전트 등록', msg: '이미 등록된 에이전트 입니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                                        return;
                                    }
                                    else
                                    {
                                        Ext.MessageBox.show({ title: '에이전트 등록', msg: '올바른 에이전트 파일이 아닙니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                                        return;
                                    }

                                    myMask.destroy();
                                }
                                else
                                {
                                    Ext.Ajax.request(
                                        {
                                            url : 'api/ftTMOV/GetAgentFileList',
                                            success : function(res_data)
                                            {
                                                var resObj = JSON.parse(res_data.responseText);
                                                Ext.getStore('st_tmov_agent').loadData(resObj);

                                                myMask.destroy();
                                            }
                                        }
                                    );
                                }

                            }
                        }
                    );
                }
            });
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var item = Ext.getCmp('gpn_tmov_agentfile').getSelectionModel().getSelection()[0].raw;

        Ext.getCmp('txf_agent_version').setValue(item.version);
        Ext.getCmp('txf_agent_filename').setValue(item.name);

        Ext.getCmp('win_tmov_agent_config').close();
    },

    onButtonClick2: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_agent_config').close();
    },

    onGpn_tmov_agentfileItemDblClick: function(dataview, record, item, index, e, eOpts) {
        if (Ext.getCmp('win_tmov_agent_config').isSelect === true)
        {
            var item = Ext.getCmp('gpn_tmov_agentfile').getSelectionModel().getSelection()[0].raw;

            Ext.getCmp('txf_agent_version').setValue(item.version);
            Ext.getCmp('txf_agent_filename').setValue(item.name);

            Ext.getCmp('win_tmov_agent_config').close();
        }

    },

    onWin_tmov_agent_configAfterRender: function(component, eOpts) {
        var pnl_tmov_main = Ext.getCmp('pnl_tmov_main');

        if (pnl_tmov_main !== undefined)
        {
            clearInterval(pnl_tmov_main.timer);
        }

        if (component.isSelect === true)
        {
            Ext.getCmp('tb_agent_select').show();
        }

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetAgentFileList',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_agent').loadData(resObj);
                }
            }
        );
    },

    onWin_tmov_agent_configBeforeDestroy: function(component, eOpts) {
        var pnl_tmov_main = Ext.getCmp('pnl_tmov_main');
        if (pnl_tmov_main !== undefined)
        {
            pnl_tmov_main.timer_tick();
        }

    }

});