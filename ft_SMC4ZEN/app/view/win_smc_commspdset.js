
Ext.define('SMC4ZEN.view.win_smc_commspdset', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_smc_commspdset',

    requires: [
        'SMC4ZEN.view.win_smc_commspdsetViewModel',
        'SMC4ZEN.view.win_smc_commspdsetViewController',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.Text'
    ],

    config: {
        activeView: 0,
        delTempDB: true
    },

    controller: 'win_smc_commspdset',
    viewModel: {
        type: 'win_smc_commspdset'
    },
    height: 700,
    id: 'win_smc_commspdset',
    width: 1280,
    title: 'WeGuardia ZEN',
    maximizable: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'tabpanel',
            flex: 1,
            itemId: 'trpn_commspd_zensetting',
            activeTab: 0,
            tabPosition: 'left',
            items: [
                {
                    xtype: 'panel',
                    itemId: 'pnl_commspd_basic',
                    layout: 'fit',
                    bodyPadding: 5,
                    title: '기본 설정',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_commspd_profbasicset',
                            margin: '5, 0, 5, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    itemId: 'fds_basicset_basic',
                                    collapsible: true,
                                    title: '프로파일 기본 정보',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'form',
                                            flex: 1,
                                            reference: 'zen_commspd_basicvalid',
                                            itemId: 'pnl_commpsd_validate',
                                            margin: '10, 0, 10, 0',
                                            title: '',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    reference: 'zen_commspd_profname',
                                                    itemId: 'txf_profname',
                                                    margin: '0, 10, 0, 0',
                                                    fieldLabel: '프로파일 이름',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    itemId: 'ctn_commspd_margin'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            reference: 'zen_commspd_profdesc',
                                            itemId: 'txf_profdesc',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '프로파일 설명'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    reference: 'zen_commspd_detail',
                    itemId: 'pnl_dev_detail',
                    layout: 'fit',
                    title: '상세 설정',
                    items: [
                        {
                            xtype: 'container',
                            reference: 'zen_commspd_detailview',
                            itemId: 'ctn_view_detailzen',
                            layout: 'fit',
                            listeners: {
                                beforerender: 'onCtn_view_detailzenBeforeRender'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'ctn_basicset_control',
            margin: '5 5 5 0',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_save',
                    margin: '0, 5, 0, 0,',
                    width: 100,
                    text: '저 장',
                    listeners: {
                        click: 'onBt_saveClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_cancel',
                    width: 100,
                    text: '취 소',
                    listeners: {
                        click: 'onBt_cancelClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_smc_commspdsetAfterRender',
        beforedestroy: 'onWin_smc_zendevice_setBeforeDestroy'
    },

    onEsc: function() {
        this.destroy();
    }

});