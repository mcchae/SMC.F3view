
Ext.define('SMC.view.pnl_xtm_alg_ftp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_alg_ftp',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    height: 680,
    id: 'pnl_xtm_alg_ftp',
    itemId: '',
    width: 800,
    bodyPadding: 10,
    title: 'FTP',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'ctn_network_controlclass1',
                    itemId: 'ctn_ftp_control',
                    margin: '0, 0, 10, 0',
                    listeners: {
                        afterrender: {
                            fn: me.onCtn_algftp_controlAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_alg_ftplist',
                    title: '',
                    store: 'st_alg_ftp',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 150,
                            dataIndex: 'advertised_ftp_ip',
                            text: 'Public FTP Server IP'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 150,
                            dataIndex: 'ftp_ip',
                            text: 'Real  FTP Servver IP'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 100,
                            dataIndex: 'interface',
                            text: 'Interface'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 100,
                            dataIndex: 'port',
                            text: '포트 번호'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 130,
                            dataIndex: 'max_user',
                            text: '최대 동시 접속자수'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return (value === 1) ? '투명게이트 방식' : '일반게이트 방식' ;
                            },
                            width: 120,
                            dataIndex: 'action',
                            text: '동작 방식'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return (value['@chk_deny'] === 'on') ? 'Deny' : 'Accept';
                            },
                            width: 120,
                            dataIndex: 'upload',
                            text: '파일 업로드'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return (value['@chk_deny'] === 'on') ? 'Deny' : 'Accept';
                            },
                            width: 120,
                            dataIndex: 'download',
                            text: '파일 다운로드'
                        }
                    ],
                    selModel: Ext.create('Ext.selection.RowModel', {
                        mode: 'MULTI'
                    })
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_alg_ftpAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_alg_ftpBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCtn_algftp_controlAfterRender: function(component, eOpts) {
        // onCtn_algftp_controlAfterRender ==============================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : Telnet 데이터를 추가, 수정, 삭제 기능을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var ftplist = this.down('[itemId=gpn_alg_ftplist]');

        var me = this;

        bt_add.on('click', function(){

            Ext.create('widget.win_xtm_alg_ftp', {

                'openmode' : 'add',
                'ftpParam' : null,
                'parent'   : ftplist

            }).show();

        });

        bt_mod.on('click', function(){

            if(!ftplist.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'FTP 데이터 수정 에러',
                    msg : '수정할 FTP 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

           Ext.create('widget.win_xtm_alg_ftp', {

               'openmode' : 'edit',
               'ftpParam' : ftplist.getSelectionModel().getSelection()[0].data,
               'parent'   : ftplist

           }).show();

        });

        bt_del.on('click', function(){

            if(!ftplist.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'FTP 데이터 삭제 에러',
                    msg : '삭제할 FTP 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(ftplist);

            reconfigNum(ftplist.getStore());

        });
    },

    onPnl_xtm_alg_ftpAfterRender: function(component, eOpts) {
        // onPnl_xtm_alg_ftpAfterRender ==================================================================================================================================================
        //
        // 일시 : 2014.08.23
        //
        // 설명 : FTP 데이터를 그리드에 출력합니다.
        //
        // ===============================================================================================================================================================================

        this.initStore();

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.ftp;

                if(deviceData){

                    Ext.getStore('st_alg_ftp').add(deviceData);

                }

            }

        }
        catch(err){

            console.log('FTP 데이터를 컴포넌트에 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_alg_ftpBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_alg_ftpBeforeClose ==================================================================================================================================================
        //
        // 일시 : 2014.08.23
        //
        // 설명 : FTP 화면이 종료될 때 데이터를 저장하고 화면 상태를 변경합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : ALG FTP 데이터를 deviceAllData에 저장한다.
        //
        // =============================================================================================================================================================================

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var algFtpStore = Ext.getStore('st_alg_ftp');

        if(algFtpStore.count() <= 0){

            if(deviceAllData.alg_ftp_proxy){

                deviceAllData.alg_ftp_proxy = null;

            }

        }
        else{

            if(!deviceAllData.alg_ftp_proxy){

                deviceAllData.alg_ftp_proxy = {};

            }

            var algftpArray = [];

            for(var i = 0; i < algFtpStore.count(); i++){

                algftpArray.push(algFtpStore.getAt(i).data);

            }

            deviceAllData.alg_ftp_proxy.ftp = algftpArray;

        }

        return true;
    },

    initStore: function() {
        // initStore =====================================================================================================================================================================
        //
        // 설명 : 스토어를 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        Ext.getStore('st_alg_ftp').removeAll();
    }

});