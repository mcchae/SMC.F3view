
Ext.define('SMC.view.win_object_ipsec_compileresult', {
    extend: 'Ext.window.Window',
    alias: 'widget.object_ipsec_compileresult',

    requires: [
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.button.Button'
    ],

    height: 300,
    itemId: 'win_object_ipsec_compileresult',
    width: 627,
    bodyPadding: 5,
    title: 'IPSec 대상 일괄적용 결과',
    modal: true,

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
                    itemId: 'ctn_object_summary',
                    margin: '0, 0, 5, 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            flex: 1,
                            itemId: 'dnf_summary',
                            fieldLabel: '',
                            labelWidth: 70,
                            value: 'Display Field'
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_ipsec_batchresult',
                    margin: '0, 0, 5, 0',
                    title: '',
                    store: 'st_IPSec_batchresult',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: '객체명',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'errorType',
                            text: '에러 정보',
                            flex: 2
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_object_close',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                button.up('window[itemId="win_object_ipsec_compileresult"]').destroy();
                            },
                            itemId: 'bt_close',
                            width: 100,
                            text: '닫 기'
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_object_ipsec_compileresultAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onWin_object_ipsec_compileresultAfterRender: function(component, eOpts) {
        // 0. 공통변수선언

        var gpn_store = component.down('[itemId=gpn_ipsec_batchresult]').getStore();
        var dnf_summary = this.down('[itemId=ctn_object_summary]').down('[itemId=dnf_summary]');

        // 1. 요약정보 출력

        dnf_summary.setValue('전체 객체 수 : ' + component.total + ' 개 <br>전송 성공 갯수 : ' + component.successCount + ' 개<br>' + '전송 에러 갯수 : ' + component.errorCount + ' 개 ');

        // 2. 에러정보 출력

        gpn_store.removeAll();

        if(component.errorList){

            gpn_store.loadData(component.errorList);

        }
    }

});