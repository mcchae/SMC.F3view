
Ext.define('SMC4ZEN.view.pnl_smc_device_zen', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_smc_device_zen',

    requires: [
        'SMC4ZEN.view.pnl_smc_device_zenViewModel',
        'SMC4ZEN.view.pnl_smc_device_zenViewController',
        'Ext.toolbar.Toolbar',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.tab.Panel',
        'Ext.form.field.ComboBox',
        'Ext.tab.Tab'
    ],

    config: {
        taskObj: null
    },

    controller: 'pnl_smc_device_zen',
    viewModel: {
        type: 'pnl_smc_device_zen'
    },
    id: 'pnl_smc_device_zen',
    layout: 'border',
    title: '',

    items: [
        {
            xtype: 'panel',
            region: 'west',
            split: true,
            id: 'pnl_smc_device_zen_west',
            width: 250,
            animCollapse: true,
            collapsible: true,
            title: 'ZEN 장비 그룹',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    itemId: 'tb_zen_groupset',
                    items: [
                        {
                            xtype: 'button',
                            baseCls: '',
                            cls: 'common_plus_enable',
                            height: 24,
                            itemId: 'bt_add',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_addClick'
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            cls: 'common_modify_enable',
                            height: 24,
                            itemId: 'bt_mod',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_modClick'
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            cls: 'common_delete_enable',
                            height: 24,
                            itemId: 'bt_del',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_delClick'
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            cls: 'common_search_enable',
                            height: 24,
                            itemId: 'bt_search',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_searchClick1'
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            cls: 'common_rule_send',
                            height: 24,
                            itemId: 'bt_recursive',
                            width: 24,
                            enableToggle: true,
                            text: '',
                            listeners: {
                                click: 'onBt_recursiveClick',
                                toggle: 'onBt_recursiveToggle'
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            cls: 'common_folder_open',
                            height: 24,
                            itemId: 'bt_expand',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_expandClick'
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            cls: 'common_folder_close',
                            height: 24,
                            itemId: 'bt_fold',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_foldClick'
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'treepanel',
                    flex: 1,
                    reference: 'zen_dev_group',
                    id: 'pnl_zen_device_tree_view',
                    itemId: 'pnl_zen_group',
                    width: 250,
                    title: '',
                    viewConfig: {
                        plugins: [
                            {
                                ptype: 'treeviewdragdrop'
                            }
                        ],
                        listeners: {
                            drop: 'onViewDrop'
                        }
                    },
                    listeners: {
                        select: 'onPnl_zen_groupSelect',
                        boxready: 'onPnl_zen_groupBoxReady',
                        afterrender: 'onPnl_zen_groupAfterRender'
                    }
                }
            ]
        },
        {
            xtype: 'tabpanel',
            activeIndex: 0,
            region: 'center',
            reference: 'zen_dev_mode',
            itemId: 'pnl_zen_devmode',
            activeTab: 0,
            items: [
                {
                    xtype: 'panel',
                    setSummaryData: function(component, summary) {
                        var st_zendevlist = component.getStore();

                        var normalCount = 0;

                        for(var i = 0, deviceAllCount = st_zendevlist.count(); i < deviceAllCount; i++){

                            if(st_zendevlist.getAt(i).get('run_state') === 2){

                                normalCount++;

                            }

                        }

                        summary.down('[itemId=dpf_summary_state]').setValue('전체 장비 : ' + deviceAllCount + '  ' + '정상 동작 : ' + normalCount);
                    },
                    refreshEventByZen: function() {
                        var pnl_main = Ext.getCmp(DEVICE_COMMON_ID.devicemainzen);
                        var pnl_group = pnl_main.down('[itemId=pnl_zen_group]');
                        var grp_select = pnl_group.getSelection()[0];
                        var pnl_center = pnl_main.down('[itemId=pnl_zen_center]');
                        var ctn_center = pnl_center.down('[itemId=ctn_zen_center]');

                        var tb_managetool = pnl_center.down('[itemId=tb_zen_device_managetool]');
                        var tb_managesearch = pnl_center.down('[itemId=tb_zen_device_search]');

                        if(pnl_main.taskObj){

                            clearInterval(pnl_main.taskObj);

                        }

                        if(grp_select){

                            if(DEVICE_COMMON_CONST.ZEN_UPGRADE_TIME > 999){

                                pnl_main.taskObj = setInterval(refreshDeviceList, DEVICE_COMMON_CONST.ZEN_UPGRADE_TIME);

                            }
                            else{

                                pnl_main.taskObj = setInterval(refreshDeviceList, 10000);

                            }

                        }

                        function refreshDeviceList(){

                            console.log("ZEN Device refresh timer run !!");

                            var txf_filterValue = tb_managesearch.down('[itemId=txf_searchstr]').getValue();

                            if(grp_select === undefined || grp_select === null){

                                clearInterval(pnl_main.taskObj);

                                return;

                            }

                            var service = 'ftZEN',
                                serchService = 'getDeviceList',
                                params = {

                                    g_cid : Ext.encode(grp_select.get('cid')),
                                    isRecursive : Ext.encode(ZEN_GROUP_RECURSIVE)

                                };

                            request_helper.xmlrpc_call_Ajax_Post(
                            service,
                            serchService,
                            params,
                            function(res){

                                var gpn_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
                                var _deviceCenter = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                                if(gpn_zenlist){

                                    var tmpArray = [];
                                    var store = gpn_zenlist.getStore();

                                    gpn_zenlist.selectRecords = gpn_zenlist.getSelection();

                                    for(var i = 0; i < gpn_zenlist.selectRecords.length; i++){

                                        tmpArray.push(store.indexOf(gpn_zenlist.selectRecords[i]));

                                    }

                                    gpn_zenlist.selectIndex = tmpArray;

                                    if(store){

                                        store.loadData(res);

                                        searchDeviceName(store, txf_filterValue, ['name', 'ip']);

                                    }

                                }

                                pnl_center.setSummaryData(gpn_zenlist, Ext.getCmp('tb_zen_devicelist_summary'));

                                ctn_center.setLoading(false);

                                pnl_group.setDisabled(false);

                            }

                            );

                        }
                    },
                    _dynamicZENGrid: null,
                    oldZENView: null,
                    _dynamicGrid: null,
                    reference: 'zen_dev_center',
                    itemId: 'pnl_zen_center',
                    title: '장비',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            dock: 'top',
                            reference: 'zen_dev_search',
                            itemId: 'tb_zen_device_search',
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    reference: 'zen_dev_searchval',
                                    itemId: 'txf_searchstr',
                                    margin: '0, 10, 0, 0',
                                    fieldLabel: '',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'onTxf_searchstrKeypress',
                                        focus: 'onTxf_searchstrFocus'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_search',
                                    width: 100,
                                    text: '검 색',
                                    listeners: {
                                        click: 'onBt_searchClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            dock: 'top',
                            reference: 'zen_dev_control',
                            itemId: 'tb_zen_device_managetool',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'bt_add',
                                    width: 100,
                                    text: '장비 추가',
                                    listeners: {
                                        click: 'onBt_addClick1'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_mod',
                                    width: 100,
                                    text: '장비 설정',
                                    listeners: {
                                        click: 'onBt_detailClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_del',
                                    width: 100,
                                    text: '장비 삭제',
                                    listeners: {
                                        click: 'onBt_delClick1'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_sendpolicy',
                                    width: 100,
                                    text: '정책 전송',
                                    listeners: {
                                        click: 'onBt_sendpolicyClick'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_zen_refresh',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            validator: function(value) {
                                                if(value < 0 || value > 600){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            validityCheck: function() {
                                                var me = this;

                                                var validateObject = {

                                                    'blankCheck' : function(){

                                                        var argument = (arguments[1] === undefined) ? true : arguments[1];

                                                        if(me.getValue() === null && argument){

                                                            Ext.Msg.show({

                                                                'title': SMC_SET_PRODUCT,
                                                                'msg'  : '업데이트 주기는 비울 수 없습니다.',
                                                                'buttons' : Ext.Msg.OK,
                                                                'icon' : Ext.Msg.ERROR,
                                                                'fn'   : function(res){

                                                                    me.focus();

                                                                }

                                                            });

                                                            return false;

                                                        }

                                                        return true;

                                                    },
                                                    'scaleValidate' : function(msg){

                                                        var argument = (arguments[2] === undefined) ? true : arguments[2];

                                                        if(!me.validate() && argument){

                                                            Ext.Msg.show({

                                                                'title': SMC_SET_PRODUCT,
                                                                'msg'  : msg,
                                                                'buttons' : Ext.Msg.OK,
                                                                'icon' : Ext.Msg.ERROR,
                                                                'fn'   : function(res){

                                                                    me.focus();

                                                                }

                                                            });

                                                            return false;

                                                        }

                                                        return true;

                                                    }

                                                };

                                                return validateObject;
                                            },
                                            reference: 'zen_dev_timeperiod',
                                            itemId: 'cmb_period',
                                            margin: '0, 10, 0, 0',
                                            width: 205,
                                            fieldLabel: '업데이트 주기 (초)',
                                            labelWidth: 120,
                                            value: 10,
                                            queryMode: 'local',
                                            store: [
                                                0,
                                                5,
                                                10,
                                                30,
                                                60,
                                                120,
                                                180,
                                                240,
                                                300,
                                                360,
                                                420,
                                                480,
                                                540,
                                                600
                                            ],
                                            listeners: {
                                                focus: 'onCmb_periodFocus'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_refresh',
                                            width: 100,
                                            text: '주기 변경',
                                            listeners: {
                                                click: 'onBt_refreshClick'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            reference: 'zen_dev_inner',
                            itemId: 'ctn_zen_center',
                            layout: 'fit'
                        }
                    ],
                    listeners: {
                        boxready: 'onPnl_zen_centerBoxReady'
                    }
                },
                {
                    xtype: 'panel',
                    setSummaryData: function(component, summary) {
                        var st_zenrtmlist = component.getStore();

                        var normalCount = 0;

                        for(var i = 0, deviceAllCount = st_zenrtmlist.count(); i < deviceAllCount; i++){

                            if(st_zenrtmlist.getAt(i).get('run_state') === 2){

                                normalCount++;

                            }

                        }

                        summary.down('[itemId=dpf_summary_state]').setValue('전체 장비 : ' + deviceAllCount + '  ' + '정상 동작 : ' + normalCount);
                    },
                    refreshEventByMonitor: function() {
                        var pnl_main = Ext.getCmp(DEVICE_COMMON_ID.devicemainzen);
                        var pnl_group = pnl_main.down('[itemId=pnl_zen_group]');
                        var grp_select = pnl_group.getSelection()[0];
                        var pnl_center = pnl_main.down('[itemId=pnl_monitor_center]');
                        var ctn_center = pnl_center.down('[itemId=ctn_rtm_inner]');

                        var tb_managesearch = pnl_center.down('[itemId=tb_rtm_device_search]');

                        if(pnl_main.taskObj){

                            clearInterval(pnl_main.taskObj);

                        }

                        if(grp_select){

                            if(DEVICE_COMMON_CONST.ZEN_UPGRADE_TIME > 999){

                                pnl_main.taskObj = setInterval(refreshDeviceList, DEVICE_COMMON_CONST.ZEN_UPGRADE_TIME);

                            }
                            else{

                                pnl_main.taskObj = setInterval(refreshDeviceList, 10000);

                            }

                        }

                        function refreshDeviceList(){

                            console.log("ZEN Monitor refresh timer run !!");

                            var txf_filterValue = tb_managesearch.down('[itemId=txf_searchstr]').getValue();

                            if(grp_select === undefined || grp_select === null){

                                clearInterval(pnl_main.taskObj);

                                return;

                            }

                            var service = 'ftZEN',
                                serchService = 'getDeviceList',
                                params = {

                                    'g_cid' : Ext.encode(grp_select.get('cid')),
                                    'isRecursive' : Ext.encode(ZEN_GROUP_RECURSIVE),
                                    'isRtm' : true

                                };

                            request_helper.xmlrpc_call_Ajax_Post(
                            service,
                            serchService,
                            params,
                            function(res){

                                var gpn_zenlist = Ext.getCmp(RTM_COMMON_ID.devicezenlist);

                                if(gpn_zenlist){

                                    var tmpArray = [];
                                    var store = gpn_zenlist.getStore();

                                    gpn_zenlist.selectRecords = gpn_zenlist.getSelection();

                                    for(var i = 0; i < gpn_zenlist.selectRecords.length; i++){

                                        tmpArray.push(store.indexOf(gpn_zenlist.selectRecords[i]));

                                    }

                                    gpn_zenlist.selectIndex = tmpArray;

                                    if(store){

                                        store.loadData(res);

                                        searchDeviceName(store, txf_filterValue, ['name', 'ip']);

                                    }

                                }

                                pnl_center.setSummaryData(gpn_zenlist, Ext.getCmp('tb_rtm_devicelist_summary'));

                                ctn_center.setLoading(false);

                                pnl_group.setDisabled(false);

                            }

                            );

                        }
                    },
                    reference: 'zen_rtm_monitor',
                    itemId: 'pnl_monitor_center',
                    title: '모니터',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            dock: 'top',
                            reference: 'zen_rtm_search',
                            itemId: 'tb_rtm_device_search',
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    reference: 'zen_rtm_searchval',
                                    itemId: 'txf_searchstr',
                                    margin: '0, 10, 0, 0',
                                    fieldLabel: '',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'onTxf_searchstrKeypress1',
                                        focus: 'onTxf_searchstrFocus1'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_search',
                                    width: 100,
                                    text: '검 색',
                                    listeners: {
                                        click: 'onBt_searchClick2'
                                    }
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            reference: 'zen_rtm_inner',
                            itemId: 'ctn_rtm_inner',
                            layout: 'fit'
                        }
                    ],
                    listeners: {
                        boxready: 'onPanelBoxReady'
                    }
                }
            ],
            listeners: {
                tabchange: 'onPnl_zen_devmodeTabChange'
            }
        }
    ],
    listeners: {
        beforedestroy: 'onPnl_smc_device_zenBeforeDestroy'
    }

});