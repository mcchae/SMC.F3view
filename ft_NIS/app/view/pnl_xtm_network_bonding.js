
Ext.define('SMC.view.pnl_xtm_network_bonding', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_network_bonding',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.button.Button',
        'Ext.grid.RowNumberer',
        'Ext.selection.RowModel'
    ],

    static_num: 0,
    height: 680,
    id: 'pnl_xtm_network_bonding',
    width: 800,
    bodyPadding: 10,
    title: 'Bonding',

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
                    flex: 1.5,
                    itemId: 'ctn_bonding_input',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1.5,
                            itemId: 'ctn_bonding_westinput',
                            margin: '0, 10, 10, 0',
                            padding: 10,
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_bondingname',
                                    width: 270,
                                    fieldLabel: 'Bonding 이름',
                                    labelWidth: 120,
                                    value: 'bond0',
                                    editable: false,
                                    displayField: 'name',
                                    store: 'st_bonding_name',
                                    valueField: 'name'
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_runmode',
                                    width: 270,
                                    fieldLabel: '동작 모드',
                                    labelWidth: 120,
                                    value: 'Round Robin',
                                    editable: false,
                                    displayField: 'name',
                                    store: 'st_bonding_runmode',
                                    valueField: 'mode',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_runmodeChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    itemId: 'nfd_linkmonitering',
                                    width: 270,
                                    fieldLabel: '링크 모니터링 주기',
                                    labelWidth: 120,
                                    value: 100
                                },
                                {
                                    xtype: 'numberfield',
                                    itemId: 'nfd_updelay',
                                    width: 270,
                                    fieldLabel: '업 딜레이',
                                    labelWidth: 120,
                                    value: 200
                                },
                                {
                                    xtype: 'numberfield',
                                    itemId: 'nfd_downdelay',
                                    width: 270,
                                    fieldLabel: '다운 딜레이',
                                    labelWidth: 120,
                                    value: 200
                                },
                                {
                                    xtype: 'combobox',
                                    hidden: true,
                                    itemId: 'cmb_primaryinterface',
                                    width: 270,
                                    fieldLabel: 'Primary 인터페이스',
                                    labelWidth: 120,
                                    editable: false,
                                    displayField: 'eth',
                                    queryMode: 'local',
                                    store: 'st_bonding_primary',
                                    valueField: 'eth'
                                },
                                {
                                    xtype: 'combobox',
                                    hidden: true,
                                    itemId: 'cmb_lacprate',
                                    width: 270,
                                    fieldLabel: 'LACP rate',
                                    labelWidth: 120,
                                    value: 0,
                                    editable: false,
                                    displayField: 'name',
                                    store: 'st_bonding_lacprate',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'numberfield',
                                    itemId: 'nfd_period',
                                    width: 270,
                                    fieldLabel: 'ARP 주기',
                                    labelWidth: 120,
                                    value: 100
                                },
                                {
                                    xtype: 'radiogroup',
                                    hidden: true,
                                    itemId: 'rdg_hashmode',
                                    width: 400,
                                    fieldLabel: '해시 모드',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_layer2',
                                            name: 'hashmode',
                                            boxLabel: 'Layer2',
                                            inputValue: '0'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_layer3',
                                            name: 'hashmode',
                                            boxLabel: 'Layer3 + 4',
                                            inputValue: '1'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_bonding_eastinput',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                padding: 10
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_bonding_member',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_member',
                                            margin: '0, 50, 10, 0',
                                            fieldLabel: 'Bonding 멤버',
                                            emptyText: 'Select Member',
                                            editable: false,
                                            displayField: 'eth',
                                            queryMode: 'local',
                                            store: 'st_common_bondeth',
                                            valueField: 'eth',
                                            listeners: {
                                                change: {
                                                    fn: me.onCmb_memberChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            itemId: 'gpn_bondingmemeber',
                                            title: '',
                                            hideHeaders: true,
                                            store: 'st_bonding_member',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    align: 'center',
                                                    dataIndex: 'member',
                                                    text: '본딩 멤버',
                                                    flex: 0.8
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    align: 'center',
                                                    flex: 0.2,
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store         = Ext.getStore('st_bonding_member');

                                                                var primary_store = Ext.getStore('st_bonding_primary');

                                                                store.removeAt(rowIndex);

                                                                primary_store.removeAt(rowIndex);
                                                            },
                                                            iconCls: 'ico_grid_row_delete'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_bonding_arpip',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_bonding_arpip',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(!validIPForm(value, 'v4')){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'txf_arpip',
                                                    margin: '0, 5, 0, 0',
                                                    fieldLabel: 'ARP 대상 IP',
                                                    enableKeyEvents: true
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'bt_add',
                                                    width: 50,
                                                    text: '추 가',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBt_addClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            itemId: 'gpn_arpip',
                                            title: '',
                                            hideHeaders: true,
                                            store: 'st_bonding_arpip',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    align: 'center',
                                                    dataIndex: 'arp',
                                                    text: 'ARP 대상 IP',
                                                    flex: 0.8
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    align: 'center',
                                                    flex: 0.2,
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store = Ext.getStore('st_bonding_arpip');

                                                                store.removeAt(rowIndex);
                                                            },
                                                            iconCls: 'ico_grid_row_delete'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'ctn_network_controlclass1',
                    itemId: 'ctn_bonding_control',
                    margin: '10, 0, 10, 0',
                    listeners: {
                        afterrender: {
                            fn: me.onCtn_bonding_controlAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_bonding_set',
                    title: '',
                    store: 'st_bonding_set',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: '이름',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'iface',
                            text: 'Bonding 멤버',
                            flex: 1.5
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'actionmode',
                            text: '동작 모드',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                return value['@interval'];
                            },
                            dataIndex: 'monitor',
                            text: '링크 모니터링 주기',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                return value['@updelay'];
                            },
                            dataIndex: 'monitor',
                            text: '업 딜레이',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                return value['@downdelay'];
                            },
                            dataIndex: 'monitor',
                            text: '다운 딜레이',
                            flex: 1
                        }
                    ],
                    selModel: Ext.create('Ext.selection.RowModel', {
                        mode: 'MULTI'
                    }),
                    listeners: {
                        itemclick: {
                            fn: me.onGpn_bonding_setItemClick,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_network_bondingAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_network_bondingBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_runmodeChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_runmodeChange ==================================================================================================================
        //
        // 일시 : 2014.07.03
        //
        // 설명 : 동작 모드를 변경합니다. Active Backup의 경우 본딩멤버의 데이터로 초기화 됩니다.
        //
        // ======================================================================================================================================

        var ctnMain = Ext.ComponentQuery.query('[id=pnl_xtm_network_bonding]')[0];

        var ctnWest = ctnMain.down('[itemId=ctn_bonding_input]').down('[itemId=ctn_bonding_westinput]');
        var ctnEast = ctnMain.down('[itemId=ctn_bonding_input]').down('[itemId=ctn_bonding_eastinput]');

        var memberlist = Ext.getStore('st_bonding_member');

        if(newValue === 0 || newValue === 'Round Robin'){

            ctnWest.down('[itemId=nfd_period]').setVisible(true);

            ctnWest.down('[itemId=cmb_primaryinterface]').setVisible(false);

            ctnWest.down('[itemId=cmb_lacprate]').setVisible(false);

            ctnWest.down('[itemId=rdg_hashmode]').setVisible(false);

            ctnEast.down('[itemId=ctn_bonding_arpip]').setVisible(true);

        }
        else if(newValue === 1 || newValue === 'Active Backup'){

            ctnWest.down('[itemId=nfd_period]').setVisible(true);

            ctnWest.down('[itemId=cmb_primaryinterface]').setVisible(true);

            ctnWest.down('[itemId=cmb_lacprate]').setVisible(false);

            ctnWest.down('[itemId=rdg_hashmode]').setVisible(false);

            ctnEast.down('[itemId=ctn_bonding_arpip]').setVisible(true);

        }
        else if(newValue === 2 || newValue === 'Balance XOR'){

            ctnWest.down('[itemId=nfd_period]').setVisible(true);

            ctnWest.down('[itemId=cmb_primaryinterface]').setVisible(false);

            ctnWest.down('[itemId=cmb_lacprate]').setVisible(false);

            ctnWest.down('[itemId=rdg_hashmode]').setVisible(false);

            ctnEast.down('[itemId=ctn_bonding_arpip]').setVisible(true);

        }
        else if(newValue === 3 || newValue === 'Broadcast'){

            ctnWest.down('[itemId=nfd_period]').setVisible(false);

            ctnWest.down('[itemId=cmb_primaryinterface]').setVisible(false);

            ctnWest.down('[itemId=cmb_lacprate]').setVisible(false);

            ctnWest.down('[itemId=rdg_hashmode]').setVisible(false);

            ctnEast.down('[itemId=ctn_bonding_arpip]').setVisible(false);
        }
        else if(newValue === 4 || newValue === '802.3ad'){

            ctnWest.down('[itemId=nfd_period]').setVisible(false);

            ctnWest.down('[itemId=cmb_primaryinterface]').setVisible(false);

            ctnWest.down('[itemId=cmb_lacprate]').setVisible(true);

            ctnWest.down('[itemId=rdg_hashmode]').setVisible(true);

            ctnEast.down('[itemId=ctn_bonding_arpip]').setVisible(false);

        }
        else if(newValue === 5 || newValue === 'Balance TLB' ){

            ctnWest.down('[itemId=nfd_period]').setVisible(false);

            ctnWest.down('[itemId=cmb_primaryinterface]').setVisible(false);

            ctnWest.down('[itemId=cmb_lacprate]').setVisible(false);

            ctnWest.down('[itemId=rdg_hashmode]').setVisible(false);

            ctnEast.down('[itemId=ctn_bonding_arpip]').setVisible(false);

        }
        else{

            ctnWest.down('[itemId=nfd_period]').setVisible(false);

            ctnWest.down('[itemId=cmb_primaryinterface]').setVisible(false);

            ctnWest.down('[itemId=cmb_lacprate]').setVisible(false);

            ctnWest.down('[itemId=rdg_hashmode]').setVisible(false);

            ctnEast.down('[itemId=ctn_bonding_arpip]').setVisible(false);

        }
    },

    onCmb_memberChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_memberChange ===================================================================================================================
        //
        // 일시 : 2014.07.03
        //
        // 설명 : 본딩 멤버를 추가합니다.
        //
        // ======================================================================================================================================

        var store         = Ext.getStore('st_bonding_member');

        var primary_store = Ext.getStore('st_bonding_primary');

        if(duplicationItem(newValue, 'member', 'st_bonding_member') === false){

            Ext.Msg.show({ title : '본딩 멤버 중복 에러', msg : '동일한 본딩 멤버가 이미 추가되어 있습니다.', buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });

            return;
        }

        store.add({	'member' : newValue  });

        // 프라이머리 인터페이스 추가 ===============================================================================================================

        if(duplicationItem(newValue, 'eth', primary_store)){

            primary_store.add({ 'eth' : newValue });

        }
    },

    onBt_addClick: function(button, e, eOpts) {
        // onBt_addClick ========================================================================================================================
        //
        // 일시 : 2014.07.03
        //
        // 설명 : ARP 대상 IP를 입력합니다.
        //
        // ======================================================================================================================================

        var store = Ext.getStore('st_bonding_arpip');

        var component = this.componentStorage();

        if(!this.validityCheck().arpBlankCheck() ||
           !this.validityCheck().arpipDuplicatioinCheck() ||
           !this.validityCheck().arpIpCheck()){

            return;

        }

        store.add({	'arp' : component.arpip.getValue() });
    },

    onCtn_bonding_controlAfterRender: function(component, eOpts) {
        // onCtn_bonding_controlAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.06.23
        //
        // 설명 : 브릿지 추가, 수정, 삭제작업을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = component.up().componentStorage();

        var me     = this;

        bt_add.on('click', function(){

        // 유효성 검사 ====================================================================================================================================================================

            if(!me.validityCheck().blankCheck() ||
               !me.validityCheck().bondDuplicationCheck(componentObj.bondingname.getValue(), 'add') ||
               !me.validityCheck().memberDuplicationCheck('add')){

                return;

            }

            var iface = "";
            var eth   = [];
            var _eth  = "";

            for(var i = 0; i <componentObj.member.getStore().count(); i++){

                if(componentObj.member.getStore().count() <= 1){

                    _eth  = componentObj.member.getStore().getAt(i).get('member');

                    iface = _eth;

                    break;
                }
                else{

                    var tmp = "";

                    tmp = componentObj.member.getStore().getAt(i).get('member');

                    eth.push(tmp);

                    iface += ((i+1) === componentObj.member.getStore().count()) ? tmp : tmp + ', ';

                }

            }

            var ip_array = [];
            var _ip      = "";

            for(var i = 0; i < componentObj.arpipmember.getStore().count(); i++){

                if(componentObj.arpipmember.getStore().count() <= 1){

                    _ip = componentObj.arpipmember.getStore().getAt(i).get('arp');

                    break;
                }
                else{

                    ip_array.push(componentObj.arpipmember.getStore().getAt(i).get('arp'));

                }
            }

            var obj = {};
            var arp = {};

            if(componentObj.runmode.getRawValue() === 'Round Robin'   ||
               componentObj.runmode.getRawValue() === 'Active Backup' ||
               componentObj.runmode.getRawValue() === 'Balance XOR'){

                arp['@count']    = (_ip === "") ? ip_array.length : 1;
                arp['@interval'] = componentObj.period.getValue();
                arp.ip           = (_ip === "") ? ip_array : _ip;

            }
            else{

                arp['@count']    = 0;
                arp['@interval'] = componentObj.period.getValue();

            }

            var monitor = {

                '@downdelay' : componentObj.downdelay.getValue(),
                '@interval'  : componentObj.linkmonitering.getValue(),
                '@updelay'   : componentObj.updelay.getValue()

            };

            obj['@cid']      = "";
            obj['@groupid']  = "";
            obj.actionmode   = componentObj.runmode.getRawValue();
            obj.arp          = arp;
            obj.hash         = (componentObj.runmode.getRawValue() === '802.3ad') ? componentObj.hashmode.getValue().hashmode : 0;
            obj.iface        = iface;
            obj['interface'] = (_eth === "") ? eth : _eth;
            obj.lacp         = (componentObj.runmode.getRawValue() === '802.3ad') ? componentObj.lacprate.getValue() : 0;
            obj.mode         = componentObj.runmode.getValue();
            obj.monitor      = monitor;
            obj.name         = componentObj.bondingname.getValue();
            obj.primary      = (componentObj.runmode.getRawValue() === 'Active Backup') ? componentObj.primaryinterface.getValue() : null;

            gridData_Add(componentObj.bondgrid, obj);

            reconfigNum(componentObj.bondgrid.getStore());

            addInterface(componentObj.bondgrid.getStore(),
                         Ext.getStore('st_common_alleth'),
                         'name');

            ip_array = null;

        });

        bt_mod.on('click', function(){

            if(!componentObj.bondgrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'Bonding 수정 에러',
                    msg : '수정할 Bonding 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

        // 유효성 검사 ====================================================================================================================================================================

            if(!me.validityCheck().blankCheck() ||
               !me.validityCheck().bondDuplicationCheck(componentObj.bondingname.getValue(), 'modify') ||
               !me.validityCheck().memberDuplicationCheck('modify')){

                return;

            }

        // ==============================================================================================================================================================================

            var iface = "";
            var eth   = [];
            var _eth  = "";

            for(var i = 0; i < componentObj.member.getStore().count(); i++){

                if(componentObj.member.getStore().count() <= 1){

                    _eth  = componentObj.member.getStore().getAt(i).get('member');

                    iface = _eth;

                    break;
                }
                else{

                    var tmp = "";

                    tmp = componentObj.member.getStore().getAt(i).get('member');

                    eth.push(tmp);

                    iface += ((i+1) === componentObj.member.getStore().count()) ? tmp : tmp + ', ';

                }
            }

            var ip_array = [];
            var _ip      = "";

            for(var i = 0; i < componentObj.arpipmember.getStore().count(); i++){

                if(componentObj.arpipmember.getStore().count() <= 1){

                    _ip = componentObj.arpipmember.getStore().getAt(i).get('arp');

                    break;
                }
                else{

                    ip_array.push(componentObj.arpipmember.getStore().getAt(i).get('arp'));

                }
            }

            var obj = {};
            var arp = {};

            if(componentObj.runmode.getRawValue() === 'Round Robin'   ||
               componentObj.runmode.getRawValue() === 'Active Backup' ||
               componentObj.runmode.getRawValue() === 'Balance XOR'){

                arp['@count']    = (_ip === "") ? ip_array.length : 1;
                arp['@interval'] = componentObj.period.getValue();
                arp.ip           = (_ip === "") ? ip_array : _ip;

            }
            else{

                arp['@count']    = 0;
                arp['@interval'] = componentObj.period.getValue();

            }

            var monitor = {

                '@downdelay' : componentObj.downdelay.getValue(),
                '@interval'  : componentObj.linkmonitering.getValue(),
                '@updelay'   : componentObj.updelay.getValue()

            };

            obj['@cid']      = "";
            obj['@groupid']  = "";
            obj.actionmode   = componentObj.runmode.getRawValue();
            obj.arp          = arp;
            obj.hash         = (componentObj.runmode.getRawValue() === '802.3ad') ? componentObj.hashmode.getValue().hashmode : 0;
            obj.iface        = iface;
            obj['interface'] = (_eth === "") ? eth : _eth;
            obj.lacp         = (componentObj.runmode.getRawValue() === '802.3ad') ? componentObj.lacprate.getValue() : 0;
            obj.mode         = componentObj.runmode.getValue();
            obj.monitor      = monitor;
            obj.name         = componentObj.bondingname.getValue();
            obj.primary      = (componentObj.runmode.getRawValue() === 'Active Backup') ? componentObj.primaryinterface.getValue() : null;

            selectionGrid_Mod(componentObj.bondgrid, obj);

            ip_array = null;

        });

        bt_del.on('click', function(){

            if(!componentObj.bondgrid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'Bonding 삭제 에러',
                    msg : '삭제할 Bonding 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            var delRecord = selectionGrid_Del(componentObj.bondgrid);

            reconfigNum(componentObj.bondgrid.getStore());

            for(var i = 0; i < delRecord.length; i++){

                delInterface(Ext.getStore('st_common_alleth'), delRecord[i].data.name);

            }

        });
    },

    onGpn_bonding_setItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_bonding_setItemClick ============================================================================================================
        //
        // 일시 : 2014.07.03
        //
        // 설명 : 본딩의 유효성 검사를 수행합니다.
        //
        // - 본딩이름 중복 체크
        // - 본딩멤버 중복 체크
        //
        // ======================================================================================================================================

        var componentObj = Ext.getCmp('pnl_xtm_network_bonding').componentStorage();

        var bondingmember  = Ext.getStore('st_bonding_member');
        var arpip          = Ext.getStore('st_bonding_arpip');

        componentObj.bondingname.setValue(record.data.name);
        componentObj.runmode.setValue(record.data.actionmode);
        componentObj.linkmonitering.setValue(record.data.monitor['@interval']);
        componentObj.updelay.setValue(record.data.monitor['@updelay']);
        componentObj.downdelay.setValue(record.data.monitor['@downdelay']);
        componentObj.primaryinterface.setValue(record.data.primary);
        componentObj.lacprate.setValue(record.data.lacp);
        componentObj.period.setValue(record.data.arp['@interval']);
        componentObj.hashmode.setValue({ 'hashmode' : record.data.hash });

        bondingmember.removeAll();
        arpip.removeAll();

        Ext.each(record.data.arp, function(arpData, idx){

            if(arpData['@count'] > 1){

                for(var i = 0; i < arpData['@count']; i++){

                    arpip.add({	'arp' : arpData.ip[i] });

                }

                return;

            }
            else if(arpData['@count'] <= 0){

            }
            else{

                arpip.add({	'arp' : arpData.ip });

            }

        });

        Ext.each(record.data['interface'], function(ethData, idx){

            bondingmember.add({ 'member' : ethData });

        });

        // 프라이머리 인터페이스 추가

        var memberStore = Ext.getStore('st_bonding_member');
        var primaryStore = Ext.getStore('st_bonding_primary');

        primaryStore.removeAll();

        for(var i = 0; i < memberStore.count(); i++){

            primaryStore.add( { 'eth' : memberStore.getAt(i).get('member') } );

        }
    },

    onPnl_xtm_network_bondingAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_bondingAfterRender ==========================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : 본딩 데이터를 그리드에 출력합니다.
        //
        // ===============================================================================================================================================================================

        var bondingStore = Ext.getStore('st_bonding_set');

        this.initStore();

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                if(deviceData.bonding){

                    bondingStore.add(deviceData.bonding);

                }

            }

        }
        catch(err){

            console.log('본딩 데이터 로드중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_network_bondingBeforeClose: function(panel, eOpts) {
        var deviceMain    = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var ctnMain          = Ext.getCmp('pnl_xtm_network_bonding');

        var ctnInput         = ctnMain.down('[itemId=ctn_bonding_input]');

        var bondingname      = ctnInput.down('[itemId=ctn_bonding_westinput]').down('[itemId=cmb_bondingname]');
        var runmode          = ctnInput.down('[itemId=ctn_bonding_westinput]').down('[itemId=cmb_runmode]');
        var linkmonitering   = ctnInput.down('[itemId=ctn_bonding_westinput]').down('[itemId=nfd_linkmonitering]');
        var updelay          = ctnInput.down('[itemId=ctn_bonding_westinput]').down('[itemId=nfd_updelay]');
        var downdelay        = ctnInput.down('[itemId=ctn_bonding_westinput]').down('[itemId=nfd_downdelay]');
        var primaryinterface = ctnInput.down('[itemId=ctn_bonding_westinput]').down('[itemId=cmb_primaryinterface]');
        var lacprate         = ctnInput.down('[itemId=ctn_bonding_westinput]').down('[itemId=cmb_lacprate]');
        var period           = ctnInput.down('[itemId=ctn_bonding_westinput]').down('[itemId=nfd_period]');
        var hashmode         = ctnInput.down('[itemId=ctn_bonding_westinput]').down('[itemId=rdg_hashmode]');
        var member           = ctnInput.down('[itemId=ctn_bonding_eastinput]').down('[itemId=ctn_bonding_member]').down('[itemId=gpn_bondingmemeber]');

        var arpip            = ctnInput.down('[itemId=ctn_bonding_eastinput]').down('[itemId=ctn_bonding_arpip]').down('[itemId=txf_arpip]');
        var arpipmember      = ctnInput.down('[itemId=ctn_bonding_eastinput]').down('[itemId=ctn_bonding_arpip]').down('[itemId=gpn_arpip]');

        var bondgrid         = ctnMain.down('[itemId=gpn_bonding_set]');

        return function(){

            var obj              = {};

            obj.ctnMain          = ctnMain;
            obj.ctnInput         = ctnInput;
            obj.bondingname      = bondingname;
            obj.runmode          = runmode;
            obj.linkmonitering   = linkmonitering;
            obj.updelay          = updelay;
            obj.downdelay        = downdelay;
            obj.primaryinterface = primaryinterface;
            obj.lacprate         = lacprate;
            obj.period           = period;
            obj.hashmode         = hashmode;
            obj.member           = member;
            obj.arpip            = arpip;
            obj.arpipmember      = arpipmember;
            obj.bondgrid         = bondgrid;

            return obj;

        }();
    },

    validityCheck: function() {
        // validateCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.07.02
        //
        // 설명 : 본딩의 유효성 검사를 수행합니다.
        //
        // - 본딩이름 중복 체크
        // - 본딩멤버 중복 체크
        //
        // =============================================================================================================================================================================

        var memberlist   = Ext.getStore('st_bonding_member');

        var bondingStore = Ext.getStore('st_bonding_set');

        var bondGrid     = this.down('[itemId=gpn_bonding_set]');

        var component    = this.componentStorage();

        var validCheckObj = {

            blankCheck : function(){

                if(memberlist.count() === 0){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Bonding 멤버는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            bondDuplicationCheck : function(componentValue, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, 'name', 'st_bonding_set')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 Bonding이 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _bdName = bondGrid.getSelectionModel().getSelection()[0].get('name');

                    if(!duplicationItem(componentValue, 'name', 'st_bonding_set') && _bdName !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 Bonding이 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }

            },
            arpBlankCheck : function(){

                if(component.arpip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP가 입력되지 않았습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            arpIpCheck : function(){

                if(!component.arpip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            arpipDuplicatioinCheck : function(){

                if(!duplicationItem(component.arpip.getValue(), 'arp', 'st_bonding_arpip')){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '동일한 IP가 이미 추가되어 있습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            memberDuplicationCheck : function(mode){

                var modeFlag  = true;

                var modeValue = mode || 'add';

                if(modeValue === 'add'){

                    for(var i = 0; i < bondingStore.count(); i++){

                        Ext.each(bondingStore.getAt(i).get('interface'), function(ethData){

                            if(!duplicationItem(ethData, 'member', 'st_bonding_member')){

                                Ext.Msg.show({

                                    title : 'WeGuardia™ SMC 2.0',
                                    msg : '같은 Bonding 멤버가 이미 등록되었습니다.',
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR

                                });

                                modeFlag = false;

                            }

                        });

                    }

                    return modeFlag;

                }
                else{

                    var selectData = bondGrid.getSelectionModel().getSelection()[0];

                    for(var i = 0; i < bondingStore.count(); i++){

                        if(i === bondingStore.indexOf(selectData)){

                            continue;

                        }

                        Ext.each(bondingStore.getAt(i).get('interface'), function(ethData){

                            if(!duplicationItem(ethData, 'member', 'st_bonding_member')){

                                Ext.Msg.show({

                                    title : 'WeGuardia™ SMC 2.0',
                                    msg : '같은 Bonding 멤버가 이미 등록되었습니다.',
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR

                                });

                                modeFlag = false;

                                return false;

                            }
                            else{

                                modeFlag = true;

                            }

                        });

                        if(!modeFlag){

                            break;

                        }

                    }

                    return modeFlag;

                }

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        var bondStore     = Ext.getStore('st_bonding_set');
        var memberStore   = Ext.getStore('st_bonding_member');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;
        var dataObj;

        if(bondStore.count() === 1){

            dataObj = {};

            dataObj = bondStore.getAt(0).data;

        }
        else if(bondStore.count() > 1){

            dataObj = [];

            for(var i = 0; i < bondStore.count(); i++){

                dataObj.push(bondStore.getAt(i).data);

            }

        }
        else{

            deviceAllData.network_bonding = null;

            return true;

        }

        if(deviceAllData.network_bonding){

            deviceAllData.network_bonding.bonding = dataObj;
        }
        else{

            deviceAllData.network_bonding = {};

            deviceAllData.network_bonding.bonding = dataObj;

        }

        return true;
    },

    initStore: function() {
        var bondStore   = Ext.getStore('st_bonding_set');
        var arpStore    = Ext.getStore('st_bonding_arpip');
        var memberStore = Ext.getStore('st_bonding_member');

        bondStore.removeAll();
        arpStore.removeAll();
        memberStore.removeAll();
    }

});