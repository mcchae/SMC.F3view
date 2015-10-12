
Ext.define('TMOV.view.win_tmov_tmm_config', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    height: 540,
    id: 'win_tmov_tmm_config',
    width: 600,
    layout: 'fit',
    constrainHeader: true,
    title: 'TMM 버전 정보',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'gpn_tmov_tmm_update_file',
                    store: 'st_tmov_tmm_server',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            id: 'tb_tmm_select',
                            items: [
                                {
                                    xtype: 'form',
                                    flex: 1,
                                    border: false,
                                    id: 'form_tmm_update_file',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'filefield',
                                            id: 'ff_tmm_update_file',
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
                            id: 'tb_tmm_update_select',
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
                            width: 300,
                            dataIndex: 'name',
                            text: '이름'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 160,
                            dataIndex: 'reg_dtm',
                            text: '배포 일시',
                            flex: 1
                        }
                    ],
                    listeners: {
                        itemdblclick: {
                            fn: me.onGpn_tmov_tmm_update_fileItemDblClick,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_tmm_configAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_tmm_configBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        var _form = Ext.getCmp('form_tmm_update_file').getForm();
        var _file = Ext.getCmp('ff_tmm_update_file');

        if (Ext.getCmp('ff_tmm_update_file').getValue() === '')
        {
            Ext.MessageBox.show({ title: '서버 등록', msg: '추가할 서버 파일을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
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
                            url : 'api/ftTMOV/UploadTMMServerVersion',
                            params : {
                                fileInfo : Ext.encode(_fileName)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                if(resObj.retval === false)
                                {
                                    myMask.destroy();

                                    if (resObj.ercode === 'already')
                                    {
                                        Ext.MessageBox.show({ title: '파일 등록', msg: '이미 등록된 업데이트 파일 입니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                                        return;
                                    }
                                    else
                                    {
                                        Ext.MessageBox.show({ title: '파일 등록', msg: '올바른 업데이트 파일이 아닙니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                                        return;
                                    }

                                    myMask.destroy();
                                }
                                else
                                {
                                    Ext.Ajax.request(
                                        {
                                            url : 'api/ftTMOV/GetTMMServerFileList',
                                            success : function(res_data)
                                            {
                                                var resObj = JSON.parse(res_data.responseText);
                                                Ext.getStore('st_tmov_tmm_server').loadData(resObj);

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
        var item = Ext.getCmp('gpn_tmov_tmm_update_file').getSelectionModel().getSelection()[0].raw;

        Ext.getCmp('txf_tmm_update_version').setValue(item.name);
        Ext.getCmp('win_tmov_tmm_config').close();
    },

    onButtonClick2: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_agent_config').close();
    },

    onGpn_tmov_tmm_update_fileItemDblClick: function(dataview, record, item, index, e, eOpts) {
        if (Ext.getCmp('win_tmov_tmm_config').isSelect === true)
        {
            var item = Ext.getCmp('gpn_tmov_tmm_update_file').getSelectionModel().getSelection()[0].raw;

            Ext.getCmp('txf_tmm_update_version').setValue(item.name);
            Ext.getCmp('win_tmov_tmm_config').close();
        }

    },

    onWin_tmov_tmm_configAfterRender: function(component, eOpts) {
        var pnl_tmov_main = Ext.getCmp('pnl_tmov_main');

        if (pnl_tmov_main !== undefined)
        {
            clearInterval(pnl_tmov_main.timer);
        }

        if (component.isSelect === true)
        {
            Ext.getCmp('tb_tmm_update_select').show();
        }

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetTMMServerFileList',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_tmm_server').loadData(resObj);
                }
            }
        );
    },

    onWin_tmov_tmm_configBeforeDestroy: function(component, eOpts) {
        var pnl_tmov_main = Ext.getCmp('pnl_tmov_main');
        if (pnl_tmov_main !== undefined)
        {
            pnl_tmov_main.timer_tick();
        }
    }

});