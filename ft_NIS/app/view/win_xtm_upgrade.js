
Ext.define('SMC.view.win_xtm_upgrade', {
    extend: 'Ext.window.Window',
    alias: 'widget.xtm_upgrade',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.grid.plugin.BufferedRenderer',
        'Ext.grid.feature.Grouping',
        'Ext.XTemplate',
        'Ext.ProgressBar'
    ],

    border: false,
    height: 600,
    id: 'win_xtm_upgrade',
    minHeight: 400,
    minWidth: 800,
    padding: 10,
    width: 1000,
    title: '장비 업그레이드',
    maximizable: true,
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
                    flex: 0.6,
                    itemId: 'ctn_upgrade_select',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 0.7,
                            itemId: 'fds_upgrade_file',
                            margin: '0, 10, 10, 0',
                            width: 150,
                            title: '파일 선택',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'form',
                                    border: false,
                                    itemId: 'fpn_upgrade_upload',
                                    margin: '10, 0, 10, 0',
                                    title: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            itemId: 'cmb_selectview',
                                            margin: '0, 100, 0, 0',
                                            maxWidth: 150,
                                            width: 150,
                                            fieldLabel: '',
                                            value: 'All',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'st_upgrade_view',
                                            valueField: 'value',
                                            listeners: {
                                                change: {
                                                    fn: me.onCmb_selectviewChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_upgrade_upload',
                                            width: 193,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'filefield',
                                                    onFileChange: function(component) {
                                                        // onFileChange ==================================================================================================================================================================
                                                        //
                                                        // 일시 : 2014.07.22
                                                        //
                                                        // 설명 : ARP TABLE을 IP 버전에 따라 그리드를 설정합니다.
                                                        //
                                                        // ===============================================================================================================================================================================

                                                        var fileEl = component.fileInputEl.dom;

                                                        var fileStore = Ext.getStore('st_upgrade_selectfile');

                                                        var filelist = [];

                                                        var componentObj = Ext.getCmp(DEVICE_COMMON_ID.deviceupgrade).componentStorage();

                                                        if (fileEl.files !== undefined && fileEl.files !== null) {

                                                            if(fileEl.files.length > 0) {

                                                                this.submitFile(componentObj.upload, fileEl.files);

                                                            }

                                                        } else {

                                                            var fname = fileEl.value;

                                                            var lastSlash = fname.lastIndexOf('/');

                                                            var backSlash = fname.lastIndexOf('\\');

                                                            lastSlash = Math.max(lastSlash, backSlash);

                                                            if(lastSlash > -1) {

                                                                fname = fname.substring(lastSlash + 1);

                                                            }

                                                        }
                                                    },
                                                    submitFile: function(formObj, fileArray) {
                                                        // onFileChange ==================================================================================================================================================================
                                                        //
                                                        // 일시 : 2014.07.25
                                                        //
                                                        // 설명 : 로컬에 있는 파일을 웹-서버로 전송합니다.
                                                        //
                                                        // ===============================================================================================================================================================================

                                                        var me = Ext.getCmp(DEVICE_COMMON_ID.deviceupgrade);

                                                        var fileListStore = Ext.getStore('st_upgrade_selectfile');

                                                        fileListStore.removeAll();

                                                        formObj.submit({
                                                            'url'     : '/fileUpload',
                                                            'waitMsg' : '파일을 업로드 중입니다 ...',
                                                            'params'  : {

                                                                filepath: '/tmp/'

                                                            },
                                                            'success' : function(fp, o) {

                                                                me.setLoading('파일을 업로드 중 ...', true);
                                                                me.upgradeFileUpload(fileArray, fileListStore);

                                                            }

                                                        });
                                                    },
                                                    itemId: 'fnl_upgrade_file',
                                                    margin: '0, 10, 0, 0',
                                                    width: 100,
                                                    fieldLabel: '',
                                                    name: 'uploadfiles',
                                                    buttonOnly: true,
                                                    buttonConfig: {
                                                        xtype: 'filebutton',
                                                        handler: function(button, e) {
                                                            // file upload handler ===========================================================================================================================================================
                                                            //
                                                            // 설명 : 추가 버튼을 클릭할 때마다 파일 첨부방식을 multiple로 설정합니다.
                                                            //
                                                            // ===============================================================================================================================================================================

                                                            button.up().fileInputEl.set({

                                                                'tag'       : 'input',
                                                                'type'      : 'file',
                                                                'multiple'  : 'multiple'

                                                            });
                                                        },
                                                        itemId: 'bt_add',
                                                        margin: '0, 0, 0, 10',
                                                        width: 100,
                                                        text: '파일 업로드'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_upgrade_file',
                                    margin: '0, 0, 10, 0',
                                    title: '',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 131,
                                            dataIndex: 'file_type',
                                            text: 'Version Type',
                                            flex: 1.5
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'cpu_type',
                                            text: 'CPU',
                                            flex: 1.2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'version',
                                            text: 'Version',
                                            flex: 1.5
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'file_name',
                                            text: 'File Name',
                                            flex: 3
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            align: 'center',
                                            dataIndex: 'bool',
                                            flex: 0.1,
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        // handler =======================================================================================================================================================================
                                                        //
                                                        // 일시 : 2014.09.25
                                                        //
                                                        // 설명 : 업로드된 장비를 목록에서 삭제합니다.
                                                        //
                                                        // ===============================================================================================================================================================================

                                                        var deleteList   = [];

                                                        var store        = Ext.getStore('st_upgrade_selectfile');

                                                        deleteList.push(record.raw._id);

                                                        var service      = 'ftSMC',
                                                            serchService = 'delUpgradeFiles',
                                                            params       = {

                                                                'id_list' : Ext.encode(deleteList)

                                                            };

                                                        request_helper.xmlrpc_call_Ajax_Post(
                                                        service,
                                                        serchService,
                                                        params,
                                                        function(res){

                                                            console.log('개발 알림 메세지 업그레이드 파일 삭제 결과 -> ', res);

                                                        }

                                                        );

                                                        store.removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    listeners: {
                                        render: {
                                            fn: me.onGpn_upgrade_fileRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 0.4,
                            itemId: 'fds_upgrade_dev',
                            margin: '0, 0, 10, 0',
                            title: '적용할 장비 선택',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_upgrade_dev',
                                    margin: '10, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_upgrade',
                                            width: 100,
                                            text: '업그레이드',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_upgradeClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_upgrade_dev',
                                    margin: '0, 0, 10, 0',
                                    title: '',
                                    store: 'st_upgrade_dev',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'name',
                                            text: '장비명',
                                            flex: 1.5
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ip',
                                            text: 'IP 주소',
                                            flex: 1
                                        }
                                    ],
                                    plugins: [
                                        Ext.create('Ext.grid.plugin.BufferedRenderer', {
                                            pluginId: 'plg_buffered_devlist',
                                            leadingBufferZone: 40,
                                            scrollToLoadBuffer: 40,
                                            trailingBufferZone: 40
                                        })
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    listeners: {
                                        render: {
                                            fn: me.onGpn_upgrade_devRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    flex: 1,
                    itemId: 'fds_upgrade_devstat',
                    margin: '0, 0, 10, 0',
                    title: '업그레이드 목록',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 24,
                            itemId: 'ctn_upgrade_devcontrol',
                            margin: '10, 0, 0, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    setToggleButtonState: function(button) {
                                        switch(button.getItemId()){

                                            case 'bt_total'	: 	this.flowState = 'total';	break;
                                            case 'bt_new'	:	this.flowState = 'new'; 	break;
                                            case 'bt_chk'	: 	this.flowState = 3;			break;
                                            case 'bt_mgr'	: 	this.flowState = 4;			break;
                                            case 'bt_close'	: 	this.flowState = 5;			break;
                                            default :			this.flowState = 'total';

                                        }

                                        // 1. 버튼 토글 상태 변경

                                        Ext.each(Ext.ComponentQuery.query('[itemId="ctn_upgrade_summary"] > button'), function(buttonData, idx){

                                            if(buttonData === button){

                                                if(buttonData.pressed === false){

                                                    button.toggle();

                                                }

                                            }
                                            else if(buttonData.pressed === true){

                                                buttonData.toggle();

                                            }

                                        });
                                    },
                                    flex: 1,
                                    itemId: 'ctn_upgrade_summary',
                                    margin: '0, 10, 0, 0',
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_total',
                                            margin: '0, 5, 0, 0',
                                            width: 100,
                                            enableToggle: true,
                                            text: '전체 (0) ',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_totalClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_wait',
                                            margin: '0, 5, 0, 0',
                                            width: 100,
                                            allowDepress: false,
                                            enableToggle: true,
                                            text: '대기 (0)',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_waitClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_trans',
                                            margin: '0, 5, 0, 0',
                                            width: 100,
                                            allowDepress: false,
                                            enableToggle: true,
                                            text: '전송 (0)',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_transClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_fin',
                                            margin: '0, 5, 0, 0',
                                            width: 100,
                                            enableToggle: true,
                                            text: '완료 (0) ',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_finClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_fail',
                                            margin: '0,5,0,0',
                                            width: 100,
                                            allowDepress: false,
                                            text: '실패 (0)',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_failClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    toggleHandler: function(button, state) {
                                        // onBt_selectClick ==========================================================================================================================================================
                                        //
                                        // 일시 : 2014.08.08
                                        //
                                        // 설명 : 모든 그룹을 선택하고 해제합니다.
                                        //
                                        // - Checkbox
                                        //
                                        // ===========================================================================================================================================================================

                                        var selDevname = [];
                                        var checkboxEl = document.getElementsByName('upgradeGroup');
                                        var component = Ext.getCmp(DEVICE_COMMON_ID.deviceupgrade).componentStorage();
                                        var devStore = component.grid_upgrade.getStore();

                                        if(state)	button.setText('모두 선택 해제');
                                        else		button.setText('모두 선택');

                                        for(var i = 0; i < checkboxEl.length; i++){

                                            if(state){

                                                // 0. 선택된 장비 검색

                                                tmpName = checkboxEl[i].parentNode.textContent;
                                                devName = tmpName.split(':')[1];
                                                selDevname.push(devName.replace(' ', ''));

                                                // 1. 장비 데이터 찾기

                                                for(var i = 0, max = devStore.count(); i < max; i++){

                                                    //             if(){



                                                    //             }

                                                    console.log('devStore -> ', devStore.data.items[i]);

                                                }

                                                // 2. 체크된 장비 데이터 검색 후 Cid 입력

                                                component.grid_upgrade.deleteDevice.push();

                                                checkboxEl[i].setAttribute("checked", "checked");

                                            }
                                            else{

                                                checkboxEl[i].removeAttribute("checked");

                                            }

                                        }
                                    },
                                    flag: 0,
                                    hidden: true,
                                    itemId: 'bt_select',
                                    margin: '0, 10, 0, 0',
                                    width: 100,
                                    enableToggle: true,
                                    text: '모두 선택 '
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_del',
                                    margin: '0, 5, 0, 0',
                                    width: 100,
                                    text: '장비 삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_delClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_alldel',
                                    width: 100,
                                    text: '전체 삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_alldelClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            selectRecords: [
                                
                            ],
                            selectIndex: [
                                
                            ],
                            flex: 1,
                            itemId: 'gpn_upgrade_devstate',
                            margin: '10, 0, 10, 0',
                            title: '',
                            columnLines: true,
                            store: 'st_upgrade_devlist',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    hidden: true,
                                    width: 150,
                                    dataIndex: 'name',
                                    text: '장비명',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    dataIndex: 'ip',
                                    text: 'IP 주소',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'file_type',
                                    text: '파일 종류',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'file_name',
                                    text: '파일명',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    sortable: true,
                                    dataIndex: 'state',
                                    text: '업그레이드 상태',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value + ' %';
                                    },
                                    align: 'center',
                                    dataIndex: 'process',
                                    text: '업그레이드 진행 상태',
                                    flex: 1.2
                                }
                            ],
                            viewConfig: {
                                preserveScrollOnRefresh: true,
                                listeners: {
                                    refresh: {
                                        fn: me.onViewRefresh,
                                        scope: me
                                    }
                                }
                            },
                            features: [
                                {
                                    ftype: 'grouping',
                                    collapsible: false,
                                    enableGroupingMenu: false,
                                    groupHeaderTpl: [
                                        '<span>',
                                        '    <input type="checkbox" name="upgradeGroup"> 장비명 : {[values.rows[0].data.name]}',
                                        '</span>'
                                    ],
                                    hideGroupedHeader: true
                                }
                            ],
                            plugins: [
                                Ext.create('Ext.grid.plugin.BufferedRenderer', {
                                    pluginId: 'plg_buffered_state',
                                    leadingBufferZone: 40,
                                    scrollToLoadBuffer: 40,
                                    trailingBufferZone: 40
                                })
                            ]
                        },
                        {
                            xtype: 'progressbar',
                            itemId: 'pgb_processing',
                            margin: '0, 0, 10, 0',
                            animate: true,
                            value: 0.4
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_upgrade_control',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'bt_close',
                            width: 100,
                            text: '닫 기',
                            listeners: {
                                click: {
                                    fn: me.onBt_closeClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_xtm_upgradeAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onWin_xtm_upgradeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_selectviewChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_selectviewChange ========================================================================================================================================================
        //
        // 일시 : 2014.07.24
        //
        // 설명 : 콤보박스로 선택 시 파일을 타입에 맞게 조회합니다.
        //
        // ===============================================================================================================================================================================

        var store = Ext.getStore('st_upgrade_selectfile');

        store.clearFilter();

        store.filter({

            'property'      : 'file_type',
            'value'         : (newValue === 'all') ? '' : newValue,
            'anyMatch'      : true,
            'caseSensitive' : false

        });
    },

    onGpn_upgrade_fileRender: function(component, eOpts) {
        // onGpn_upgrade_fileRender =====================================================================================================================================================
        //
        // 일시 : 2014.11.05
        //
        // 설명 :
        //
        // ==============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_upgrade_selectfile',
            fields: [
                {
                    name: '_id'
                },
                {
                    name: 'file_type'
                },
                {
                    name: 'file_name'
                },
                {
                    name: 'version'
                },
                {
                    name: 'cpu_type'
                },
                {
                    name: 'file_path'
                }

            ]

        }));
    },

    onBt_upgradeClick: function(button, e, eOpts) {
        // onBt_upgradeClick ============================================================================================================================================================
        //
        // 일시 : 2014.08.04
        //
        // 설명 : 선택된 파일과 장비를 업그레이드 합니다.
        //
        // ==============================================================================================================================================================================

        var wndInstance = Ext.getCmp(DEVICE_COMMON_ID.deviceupgrade);

        var component = wndInstance.componentStorage();

        // 선택된 파일, 장비 정보 얻어오기 ===================================================================================================================================================

        var selectFile = component.grid_file.getSelectionModel().getSelection();
        var selectDev = component.grid_dev.getSelectionModel().getSelection();

        // 유효성 검사 ====================================================================================================================================================================

        if(selectFile.length <= 0){

            Ext.Msg.show({

                title : 'WeGuardia™ SMC 2.0',
                msg : '업그레이드를 진행할 파일을 선택하세요.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return;

        }

        if(selectDev.length <= 0){

            Ext.Msg.show({

                title : 'WeGuardia™ SMC 2.0',
                msg : '업그레이드를 진행할 장비를 선택하세요.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return;

        }

        // 선택된 파일, 장비 정보 addDeviceUpgrade 에 추가 ==================================================================================================================================

        var cid_list  = [];
        var file_list = [];

        for(var i = 0; i < selectFile.length; i++){

            var fileObj = {};

            fileObj.file_name = selectFile[i].data.file_name;
            fileObj.file_type = selectFile[i].data.file_type;

            file_list.push(fileObj);

        }

        for(var i = 0; i < selectDev.length; i++){

            cid_list.push(selectDev[i].data.cid);

        }

        var service      = 'ftSMC',
            serchService = 'addDeviceUpgrade',
            params       = {

                cid_list  : Ext.encode(cid_list),
                file_list : Ext.encode(file_list)

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){


                // 타이머 돌기 전 최초 데이터 로드 ===================================================================================================================================================

                var service = 'ftSMC',
                    serchService = 'getDeviceUpgrade';

                request_helper.xmlrpc_call_Ajax_Post(
                    service,
                    serchService,
                    null,
                    function(res){

                        // Summary 정보 수정 ============================================================================================================================================================

                        component.ctn_summary.down('[itemId=bt_total]').setText('전체 (' + res.summary.totalDev + ')');
                        component.ctn_summary.down('[itemId=bt_wait]').setText('대기 (' + res.summary.ready + ')');
                        component.ctn_summary.down('[itemId=bt_trans]').setText('전송 (' + res.summary.sending + ')');
                        component.ctn_summary.down('[itemId=bt_fin]').setText('완료 (' + res.summary.success + ')');
                        component.ctn_summary.down('[itemId=bt_fail]').setText('실패 (' + res.summary.failed + ')');

                        // 장비 업그레이드 ================================================================================================================================================================

                        component.grid_upgrade.selectRecords = component.grid_upgrade.getSelectionModel().getSelection();

                        var tmpArray = [];

                        for(var j = 0; j < component.grid_upgrade.selectRecords.length; j++){

                            tmpArray.push(component.grid_upgrade.getStore().indexOf(component.grid_upgrade.selectRecords[j]));

                        }

                        component.grid_upgrade.selectIndex = tmpArray;
                        component.grid_upgrade.getStore().loadData(res.data);

                    }

                );

                // 업그레이드 목록 조회 작업이 존재하면 ===============================================================================================================================================

                if(wndInstance.devUpgradeTask){

                    clearInterval(wndInstance.devUpgradeTask);

                }

                // 타이머 콜백 ====================================================================================================================================================================

                wndInstance.devUpgradeTask = setInterval(function(){

                    wndInstance.devUpgradeSearch(component.grid_upgrade);

                }, 5000);

            }

        );
    },

    onGpn_upgrade_devRender: function(component, eOpts) {
        // onGpn_upgrade_devRender ======================================================================================================================================================
        //
        // 일시 : 2014.11.05
        //
        // 설명 :
        //
        // ==============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_upgrade_dev',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'cid'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'spd_state'
                },
                {
                    name: 'percent'
                }

            ]

        }));
    },

    onBt_totalClick: function(button, e, eOpts) {
        var win_upgrade = Ext.getCmp('win_xtm_upgrade');
        var buttonContain = button.up();

        buttonContain.setToggleButtonState(button);

        win_upgrade.devUpgradeSort('total', null);
    },

    onBt_waitClick: function(button, e, eOpts) {
        var win_upgrade = Ext.getCmp('win_xtm_upgrade');
        var buttonContain = button.up();

        buttonContain.setToggleButtonState(button);

        win_upgrade.devUpgradeSort('wait', '전송 대기');
    },

    onBt_transClick: function(button, e, eOpts) {
        var win_upgrade = Ext.getCmp('win_xtm_upgrade');
        var buttonContain = button.up();

        buttonContain.setToggleButtonState(button);

        win_upgrade.devUpgradeSort('trans', '전송 중');
    },

    onBt_finClick: function(button, e, eOpts) {
        var win_upgrade = Ext.getCmp('win_xtm_upgrade');
        var buttonContain = button.up();

        buttonContain.setToggleButtonState(button);

        win_upgrade.devUpgradeSort('fin', '전송 성공');
    },

    onBt_failClick: function(button, e, eOpts) {
        var win_upgrade = Ext.getCmp('win_xtm_upgrade');
        var buttonContain = button.up();

        buttonContain.down('[itemId=bt_wait]');

        buttonContain.setToggleButtonState(button);

        win_upgrade.devUpgradeSort('fail', '전송 실패');
    },

    onBt_delClick: function(button, e, eOpts) {
        // onBt_delClick ================================================================================================================================================================
        //
        // 일시 : 2014.08.07
        //
        // 설명 : 선택된 장비들을 제거합니다.
        //
        // ==============================================================================================================================================================================

        var component = Ext.getCmp(DEVICE_COMMON_ID.deviceupgrade).componentStorage();

        // 유효성 검사 ====================================================================================================================================================================

        if(component.grid_upgrade.deleteDevice.length <= 0){

            Ext.Msg.show({

                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                msg : '선택된 장비가 없습니다.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return;

        }

        Ext.Msg.show({

            title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
            msg : '선택된 장비를 업그레이드 목록에서 제거하시겠습니까?',
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                if(res === 'yes'){

        // 삭제할 CID 목록 ================================================================================================================================================================

                    var service = 'ftSMC',
                        params  = {

                            'cid_list' : Ext.encode(component.grid_upgrade.deleteDevice)

                        },
                        serchService = 'delDeviceUpgrade';

                    request_helper.xmlrpc_call_Ajax_Post(
                        service,
                        serchService,
                        params,
                        function(res){

                            component.grid_upgrade.deleteDevice = [];

                            Ext.getCmp('win_xtm_upgrade').devUpgradeSearch(component.grid_upgrade, 'load');

                        }

                    );

                }

            }

        });
    },

    onBt_alldelClick: function(button, e, eOpts) {
        // onBt_delClick ================================================================================================================================================================
        //
        // 일 시 : 2015.05.26
        //
        // 설 명 : 모든 장비를 삭제합니다.
        //
        // 수 정 :
        //
        // (2015.06.10 김민수 - 등록된 모든 장비 삭제시 프로그래스바 초기화 코드 추가)
        //
        // ==============================================================================================================================================================================

        var me = Ext.getCmp(DEVICE_COMMON_ID.deviceupgrade);
        var component = me.componentStorage();

        var st_upgrade = component.grid_upgrade.getStore();

        // 유효성 검사 ====================================================================================================================================================================

        if(st_upgrade.count() <= 0){

            Ext.Msg.show({

                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                msg : '업그레이드 목록에 장비가 없습니다.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return;

        }

        Ext.Msg.show({

            title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
            msg : '추가된 모든 장비를 목록에서 제거하시겠습니까?',
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                if(res === 'yes'){

                    // 삭제할 CID 목록 ================================================================================================================================================================

                    var allCid = function(){

                        var allcid = [];

                        // 0. 모든 장비의 cid 추가

                        for(var i = 0, max = st_upgrade.count(); i < max; i++){

                            allcid.push(st_upgrade.data.items[i].data['@cid']);

                        }

                        // 1. cid 중복값 제거

                        return function(unique){

                            return allcid.reduce(function(a,b){

                                if (a.indexOf(b) < 0)
                                    a.push(b);

                                return a;

                            },[]);

                        }(allcid);

                    }();

                    var service = 'ftSMC',
                        params  = {

                            'cid_list' : Ext.encode(allCid)

                        },
                        serchService = 'delDeviceUpgrade';

                    request_helper.xmlrpc_call_Ajax_Post(
                        service,
                        serchService,
                        params,
                        function(res){

                            clearInterval(me.devUpgradeTask);

                            component.ctn_summary.down('[itemId=bt_total]').setText('전체 (0)');
                            component.ctn_summary.down('[itemId=bt_wait]').setText('대기 (0)');
                            component.ctn_summary.down('[itemId=bt_trans]').setText('전송 (0)');
                            component.ctn_summary.down('[itemId=bt_fin]').setText('완료 (0)');
                            component.ctn_summary.down('[itemId=bt_fail]').setText('실패 (0)');

                            component.pgb_process.updateProgress(0);

                            st_upgrade.removeAll();

                        }

                    );

                }

            }

        });
    },

    onViewRefresh: function(dataview, eOpts) {
        // onViewRefresh =================================================================================================================================================================
        //
        // 일시 : 2014.08.06
        //
        // 설명 : 그리드 상태유지를 위해 refresh 이벤트가 일어날 때마다 저장된 레코드와 선택 했던 인덱스 값으로 그리드를 복구합니다.
        //
        // ===============================================================================================================================================================================

        var component = dataview.up();

        if (0 >= component.selectRecords.length) {

            return;

        }

        var newRecordsToSelect = [];

        for (var i = 0, selectIndex = component.selectIndex.length; i < selectIndex; i++) {

            var record = component.getStore().getAt(component.selectIndex[i]);

            if (!Ext.isEmpty(record)) {

                newRecordsToSelect.push(record);

            }

        }

        component.getSelectionModel().select(newRecordsToSelect);
    },

    onBt_closeClick: function(button, e, eOpts) {
        this.destroy();
    },

    onWin_xtm_upgradeAfterRender: function(component, eOpts) {
        // onWin_xtm_upgradeAfterRender ================================================================================================================================================
        //
        // 일시 : 2014.07.24
        //
        // 설명 : 선택된 장비를 업로드된 파일로 업그레이드 합니다.
        //
        // =============================================================================================================================================================================

        var componentObj = component.componentStorage();

        var gridUpgrade = componentObj.grid_upgrade;

        var fileStore = componentObj.grid_file.getStore('st_upgrade_selectfile');
        var devlistStore = componentObj.grid_dev.getStore('st_upgrade_dev');
        var upgradeStore = gridUpgrade.getStore('st_upgrade_devlist');

        upgradeStore.clearFilter();

        // 장비 상태를 갱신하는 타이머를 종료합니다. ==========================================================================================================================================

        Ext.applyIf(component, {

            'devUpgradeTask' : null

        });

        // 서버에 올라와 있는 파일 추가 ====================================================================================================================================================

        var service      = 'ftSMC',
            serchService = 'getUpgradeFiles',
            params       = {

                'file_type' : Ext.encode('All')

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                fileStore.loadData(res);

            }

        );

        // 선택된 장비 추가 ===============================================================================================================================================================

        Ext.each(component.selectRecord, function(selectDev){

            var devObj = {};

            devObj.name = selectDev.name;
            devObj.cid  = selectDev['@cid'];
            devObj.ip   = selectDev.ip;
            devObj.spd_state = selectDev.spd_state;
            devObj.percent = 0;

            devlistStore.add(devObj);

        });

        // 장비 업그레이드 현황 조회 =======================================================================================================================================================

        component.devUpgradeSearch(gridUpgrade, true);

        componentObj.ctn_summary.down('[itemId=bt_total]').toggle();

        // 그리드에 그룹 click 이벤트 연결 =================================================================================================================================================

        Ext.applyIf(gridUpgrade, {

            'deleteDevice' : []

        });

        gridUpgrade.on('groupclick', this.groupCheck);
    },

    onWin_xtm_upgradeDestroy: function(component, eOpts) {
        // onWin_xtm_upgradeDestroy =====================================================================================================================================================
        //
        // 일시 : 2014.07.24
        //
        // 설명 : 업그레이드 창이 닫힐 때 그리드 스토어의 데이터를 초기화합니다.
        //
        // ==============================================================================================================================================================================

        var fileStore = Ext.getStore('st_upgrade_selectfile');
        var devStore  = Ext.getStore('st_upgrade_dev');
        var upgradeStore = Ext.getStore('st_upgrade_devlist');

        if(component.devUpgradeTask){

            clearInterval(component.devUpgradeTask);

        }

        fileStore.removeAll();
        devStore.removeAll();
        upgradeStore.removeAll();

        // 장비 리스트 화면 갱신 동작 =======================================================================================================================================================

        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
    },

    devUpgradeSearch: function(upgradeGrid) {
        // devUpgradeSearch ============================================================================================================================================================
        //
        // 일시 : 2014.08.08
        //
        // 설명 : 업그레이드 장비 목록을 조회하고 업그레이드시 상태를 실시간으로 변경합니다.
        //
        // 수정 :
        //
        // (2014.11.05 김민수 - 업그레이드 플래그 분기문 적용)
        // (2014.11.21 김민수 - 자바스크립트 최적화 코드 적용)
        // (2015.06.08 김민수 - 타이머 종료 조건 변경)
        // (2015.06.10 김민수 - 스토어 실시간 갱신 코드 최적화)
        // (2015.06.16 김민수 - 장비 업그레이드 상태 요약정보 토글버튼으로 변경)
        //
        // =============================================================================================================================================================================

        var upgradeStore = upgradeGrid.getStore();
        var wndInstance = Ext.getCmp(DEVICE_COMMON_ID.deviceupgrade);
        var component = wndInstance.componentStorage();

        var service = 'ftSMC',
            serchService = 'getDeviceUpgrade';

        request_helper.xmlrpc_call_Ajax_Get(
            service,
            serchService,
            null,
            function(res){

                component.ctn_summary.down('[itemId=bt_total]').setText('전체 (' + res.summary.totalDev + ')');
                component.ctn_summary.down('[itemId=bt_wait]').setText('대기 (' + res.summary.ready + ')');
                component.ctn_summary.down('[itemId=bt_trans]').setText('전송 (' + res.summary.sending + ')');
                component.ctn_summary.down('[itemId=bt_fin]').setText('완료 (' + res.summary.success + ')');
                component.ctn_summary.down('[itemId=bt_fail]').setText('실패 (' + res.summary.failed + ')');

                if(!arguments[1]){

                    var progressValue = (res.summary.success + res.summary.failed) / res.summary.totalDev;

                    // 프로그래스바 최초 실행시

                    component.pgb_process.updateProgress((progressValue <= 0.05) ? 0.05 : progressValue);

                }
                else{

                    component.pgb_process.updateProgress(0);

                }

                // 장비 업그레이드 및 실시간 조회시 상태 유지 =========================================================================================================================================
                //
                // 설명 : 장비가 갱신될 때 선택된 Row 상태를 유지하기 위해 선택된 Row 상태를 selectIndex 변수에 저장합니다.
                //
                // =============================================================================================================================================================================

                upgradeGrid.selectRecords = upgradeGrid.getSelectionModel().getSelection();

                var tmpArray = [];

                for(var j = 0, selectRecordsCnt = upgradeGrid.selectRecords.length; j < selectRecordsCnt; j++){

                    tmpArray.push(upgradeGrid.getStore().indexOf(upgradeGrid.selectRecords[j]));

                }

                upgradeGrid.selectIndex = tmpArray;

                upgradeStore.loadData(res.data);

                // 업그레이드 타이머 종료 ==========================================================================================================================================================
                //
                // 설명 : 업그레이드 대상인 장비와 성공 + 실패인 장비의 수가 같다면 카운트 종료.
                //
                // =============================================================================================================================================================================

                if(res.summary.totalDev === (res.summary.success + res.summary.failed)){

                    clearInterval(wndInstance.devUpgradeTask);

                }

            }

        );
    },

    componentStorage: function() {
        var obj         = {};

        var fds_file    = this.down('[itemId=ctn_upgrade_select]').down('[itemId=fds_upgrade_file]');
        var fds_dev     = this.down('[itemId=ctn_upgrade_select]').down('[itemId=fds_upgrade_dev]');
        var fds_devlist = this.down('[itemId=fds_upgrade_devstat]');

        obj.upload      = fds_file.down('[itemId=fpn_upgrade_upload]');
        obj.grid_file   = fds_file.down('[itemId=gpn_upgrade_file]');
        obj.grid_dev    = fds_dev.down('[itemId=gpn_upgrade_dev]');

        obj.ctn_summary = fds_devlist.down('[itemId=ctn_upgrade_devcontrol]').down('[itemId=ctn_upgrade_summary]');
        obj.grid_upgrade = fds_devlist.down('[itemId=gpn_upgrade_devstate]');
        obj.pgb_process = fds_devlist.down('[itemId=pgb_processing]');

        return obj;
    },

    upgradeFileUpload: function(fileArray) {
        // upgradeFileUpload ===========================================================================================================================================================
        //
        // 일시 : 2014.07.24
        //
        // 설명 : 선택된 파일들을 동기 방식으로 서버에 업로드 합니다.
        //
        // =============================================================================================================================================================================

        var me = Ext.getCmp(DEVICE_COMMON_ID.deviceupgrade);

        // 첨부된 파일이 없으면 리턴 합니다 =================================================================================================================================================

        if(fileArray.length <= 0){

            me.setLoading(false);

            return;

        }

        // AJAX 통신을 시작합니다 =========================================================================================================================================================

        Ext.Ajax.request({

            'url'    : 'api/ftSMC/import_upgradeFile',
            'params' : {

                'fileName' : Ext.encode(fileArray[0].name)

            },
            'method' : 'POST',
            'success': function(res){

                me.setLoading(false);

                var responseResult = JSON.parse(res.responseText);

                if(responseResult.retval){

                    // 1. 첨부 파일이 1개 라면 업로드된 파일 리스트를 조회 (재귀호출에 의해 파일의 갯수는 자동적으로 줄어든다.)

                    if(fileArray.length <= 1){

                        me.getUploadFilelist('all', 'st_upgrade_selectfile');

                        return;

                    }
                    else{

                        // 2. 파일의 갯수가 여러개라면 재귀호출

                        var sendFileArray = [];

                        for(var i = 1; i < fileArray.length; i++){

                            sendFileArray.push(fileArray[i]);

                        }

                        me.upgradeFileUpload(sendFileArray);

                    }

                }
                else{

                    me.getUploadFilelist('all', 'st_upgrade_selectfile');

                    return;

                }

            },
            'failure': function(res){

                me.setLoading(false);

                me.getUploadFilelist('all', 'st_upgrade_selectfile');

                return;

            }

        });
    },

    getUploadFilelist: function(fileType, storeId) {
        // getUploadFilelist ============================================================================================================================================================
        //
        // 일시 : 2014.11.03
        //
        // 설명 : 업로드된 업그레이드 파일리스트를 서비스에 요청합니다.
        //
        // ==============================================================================================================================================================================

        var me = Ext.getCmp(DEVICE_COMMON_ID.deviceupgrade);

        var service = 'ftSMC',
            serchService = 'getUpgradeFiles',
            params = {

                file_type : Ext.encode(fileType)

            };

        me.setLoading('업로드된 파일 조회 중 ...', true);

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                var fileListStore = Ext.getStore(storeId);

                fileListStore.loadData(res);

                me.setLoading(false);

            }

        );
    },

    devUpgradeSort: function(toggle, statvalue) {
        var store = Ext.getStore('st_upgrade_devlist');

        store.clearFilter();

        if(toggle !== 'total'){

            store.filter({

                'property'      : 'state',
                'value'         : statvalue || '',
                'anyMatch'      : true,
                'caseSensitive' : false

            });

        }
    },

    groupCheck: function(component, field, value, event) {
        // groupCheck ===================================================================================================================================================================
        //
        // 일시 : 2014.08.07
        //
        // 설명 : 장비의 그룹 Head 체크박스 이벤트를 정의합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = Ext.getCmp(DEVICE_COMMON_ID.deviceupgrade).componentStorage();

        if(event.target.checked){

            componentObj.grid_upgrade.deleteDevice.push(value);

        }
        else{

            var deleteIndex = componentObj.grid_upgrade.deleteDevice.indexOf(value);

            if(deleteIndex > -1){

                componentObj.grid_upgrade.deleteDevice.splice(deleteIndex, deleteIndex + 1);

            }

        }
    }

});