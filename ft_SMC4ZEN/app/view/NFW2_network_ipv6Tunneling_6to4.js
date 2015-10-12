
Ext.define('SMC4ZEN.view.NFW2_network_ipv6Tunneling_6to4', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ipv6tunneling_6to4',

    requires: [
        'SMC4ZEN.view.NFW2_network_ipv6Tunneling_6to4ViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_ipv6tunneling_6to4'
    },
    id: 'NFW2_network_ipv6Tunneling_6to4',
    defaultListenerScope: true,
    title : '6 to 4',
    items: [
        {
            xtype: 'form',
            bodyPadding: 5,
            header: false,
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'toggleslide',
                            resizeHandle: false,
                            state: false,
                            id: 'chker_6to4_tunnel_use',
                            listeners: {
                                change: 'onChker_6to4_tunnel_useChange',
                                afterrender: 'onChker_6to4_tunnel_useAfterRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    disabled: true,
                    id: 'tunnel_6to4_con',
                    margin: '8 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            margin: '0 0 0 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'tunnel_6to4_inter',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_interface',
                                    valueField: 'name',
                                    bind: {
                                        fieldLabel: '{ipv4_inter}',
                                        value : '{network_tunneling_6to4.interface}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'lb_info',
                                    margin: '5 0 0 5',
                                    text: '패킷 전송을 위한 인터페이스'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 135,
                                    bind: {
                                        text: '{ttl}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!LengthCheck(value, 0, 255)){ return ValidLimit(0, 255); }
                                        }

                                        return true;
                                    },
                                    fieldInfo: '입력범위 : 0 ~ 255',
                                    id: 'tunnel_ttl',
                                    width: 80,
                                    labelSeparator: ' ',
                                    value: 128,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 3,
                                    maxLengthText: ' ',
                                    listeners: {
                                        focus: 'onTunnel_ttlFocus',
                                        blur: 'onTunnel_ttlBlur',
                                        errorchange: 'onTunnel_ttlErrorChange'
                                    },
                                    bind : {
                                        value : '{network_tunneling_6to4.ttl}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            margin: '8 0 0 0',
                            iconCls: 'icb_add',
                            bind: {
                                text: '{add}'
                            },
                            listeners: {
                                click: 'onButtonClick2',
                                blur: 'onButtonBlur'
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'ipv6tunnel_6to4_grid',
                            margin: '8 0 10 0',
                            header: false,
                            title: 'My Grid Panel',
                            allowDeselect: true,
                            disableSelection: true,
                            enableColumnMove: false,
                            sortableColumns: false,
                            store: 'store_tunnel_6to4_list',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 60,
                                    align: 'center',
                                    text: 'N'
                                },
                                {

                                    xtype: 'gridcolumn',

                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.tdCls = "cell_text";
                                        return value;
                                    },

                                    dataIndex: 'v6',
                                    menuDisabled: true,
                                    flex: 1,
                                    bind: {
                                        text: '{ipv6_dest}'
                                    },
                                    editor: {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            if(value === true){ return true; }
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                            return true;
                                        },

                                        baseCls: 'cell_text',
                                        enableKeyEvents: true,
                                        maskRe: /[0-9a-fA-F:\/]/,
                                        listeners: {
                                            blur: 'onTextfieldBlur',
                                            focus: 'onTextfieldFocus'
                                        }
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',

                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.tdCls = "cell_text";
                                        return value;
                                    },

                                    dataIndex: 'v4',
                                    menuDisabled: true,
                                    flex: 1,
                                    bind: {
                                        text: '{remote_ipv4}'
                                    },
                                    editor: {
                                        xtype: 'textfield',
                                         validator: function(value) {
                                            if(value === true){ return true; }
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                            return true;
                                        },
                                        baseCls: 'cell_text',
                                        maskRe: /[0-9.:\/]/,
                                        listeners: {
                                            blur: 'onTextfieldBlur1',
                                            focus: 'onTextfieldFocus1'
                                        }
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    id: 't_6to4_actioncol',
                                    width: 50,
                                    align: 'center',
                                    menuDisabled: true,
                                    
                                    items: [
                                        {
                                            iconCls: 'icr_del',
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                
                                                var grid =Ext.getCmp('ipv6tunnel_6to4_grid');
                                                var st_6to4list = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');

                                                grid.getPlugin('tunnel_6to4_plug').completeEdit();                                                

                                                store_6to4.removeAt(rowIndex);

                                                if(store_6to4.data.items.length < 2){ Ext.getCmp('t_6to4_actioncol').items[0].disabled = true; 

                                                }
                                                else{ 

                                                    Ext.getCmp('t_6to4_actioncol').items[0].disabled = false; 

                                                }

                                                Ext.getCmp('ipv6tunnel_6to4_grid').getView().refresh();

                                            }
                                        }
                                    ]
                                    
                                }
                            ],
                            viewConfig: {
                                markDirty: false
                            },
                            plugins: [
                                {
                                    ptype: 'cellediting',
                                    pluginId: 'tunnel_6to4_plug',
                                    clicksToEdit: 1
                                }
                            ]
                        }
                    ]
                }
            ]

        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            padding: 0,
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_network_ipv6Tunneling_6in4AfterRender',
        beforeclose : 'saveData'
    },

    onChker_6to4_tunnel_useChange: function(button) {

        if(button.state){

            Ext.getCmp('tunnel_6to4_con').enable();

        }
        else{

            Ext.getCmp('tunnel_6to4_con').disable();

        }

    },

    onChker_6to4_tunnel_useAfterRender: function(component, eOpts) {
        component.onText = __zen('use');
        component.offText = __zen('unused');
    },

    onTunnel_ttlFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTunnel_ttlBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onTunnel_ttlErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_6to4');
        var grid =Ext.getCmp('ipv6tunnel_6to4_grid');
        grid.getPlugin('tunnel_6to4_plug').completeEdit();

        var store_6to4 = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');

        if(me.max_cnt <= store_6to4.getCount()){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(me.max_cnt));

            return false;

        }

        var record_6to4 = [];

        record_6to4.push({
            'ipv6' : '',
            'ipv4' : ''
        });

        store_6to4.add(record_6to4);

        if(store_6to4.data.items.length < 2){ Ext.getCmp('t_6to4_actioncol').items[0].disabled = true; }
        else{ Ext.getCmp('t_6to4_actioncol').items[0].disabled = false; }
        Ext.getCmp('ipv6tunnel_6to4_grid').getView().refresh();
    },

    onButtonBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldBlur: function(component, event, eOpts) {
        setTipBlur(this, component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4ss2p');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        setTipBlur(this, component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    validate6to4Check: function(button, e, eOpts) {

        var me = Ext.getCmp('NFW2_network_ipv6Tunneling');
        var store_6to4 = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');
        var record_6to4 = [];

        if(Ext.getCmp('chker_6to4_tunnel_use').state){

            if(!Ext.getCmp('tunnel_ttl').isValid()){  

                Ext.getCmp('tunnel_ttl').focus(); 

                return false; 

            }

            for(var i in store_6to4.data.items){

                if(!CheckNotNull(store_6to4.data.items[i].data.v6)){

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);

                    return false;

                }

                var temp;

                if(store_6to4.data.items[i].get('v6') !== undefined){ 

                    temp = store_6to4.data.items[i].get('v6').split('/'); 

                }
                else{

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);

                    return false;

                }

                if(!temp[1]){

                    if(!ValidIPv6(temp[0])){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);

                        return false;

                    }

                }
                else{

                    if(!ValidIPv6(temp[0])){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);

                        return false;

                    }

                    if(temp[1] === ""){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_form'));

                        Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);

                        return false;

                    }

                    if(Number(temp[1]) < 3 || Number(temp[1]) > 128){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(ValidLimit(3,128));

                        Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 1);

                        return false;

                    }

                }

                if(!CheckNotNull(store_6to4.data.items[i].get('v4'))){

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 2);

                    return false;

                }

                if(!ValidIPAddress(store_6to4.data.items[i].get('v4'))){

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_ip'));

                    Ext.getCmp('ipv6tunnel_6to4_grid').getPlugin('tunnel_6to4_plug').startEdit(Number(i), 2);

                    return false;
                }

            }

        }

        return true;

    },

    onButtonClick: function(button, e, eOpts) {

        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_6to4');

        var store_6to4 = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');
        var record_6to4 = [];

        record_6to4.push({
            'ipv6' : '',
            'ipv4' : ''
        });

        store_6to4.loadData(record_6to4);

        if(store_6to4.data.items.length < 2){ 

            Ext.getCmp('t_6to4_actioncol').items[0].disabled = true; 

        }

        Ext.getCmp('ipv6tunnel_6to4_grid').getView().refresh();

    },

    onNFW2_network_ipv6Tunneling_6in4AfterRender: function(component, eOpts) {

        var me = this;
        var vm = me.getViewModel();
        var sixtofor = vm.getData().network_tunneling_6to4;
        var st_tunneling = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');

        this.fieldInfo = makeZenTip();

        if(sixtofor){

            if(sixtofor.ip && sixtofor.ip.length > 0){

                st_tunneling.loadData(sixtofor.ip);

            }
                         
            Ext.getCmp('chker_6to4_tunnel_use').state = (sixtofor.use === 'on') ? true : false;
            Ext.getCmp('chker_6to4_tunnel_use').moveHandle((sixtofor.use === 'on') ? true : false);

            if(sixtofor.use === 'on')
            {
                Ext.getCmp('tunnel_6to4_con').enable();
                Ext.getCmp('tunnel_6to4_con').use  = 'on'
            }
            else
            {
                Ext.getCmp('tunnel_6to4_con').disable();
                Ext.getCmp('tunnel_6to4_con').use  = 'off'
            }

        }

    },

    saveData : function(component, eOpts){

        var me = this;
        var vm = component.getViewModel();
        var st_6to4_use = Ext.getCmp('chker_6to4_tunnel_use').state;
        var st_sixtofor = Ext.data.StoreManager.lookup('store_tunnel_6to4_list');
        var sixtofor_list = [];
        var main_viewModel = component.parentObj.getViewModel();

        var tmp = {};

        if(!me.validate6to4Check()){

            me.parentObj.viewState = false;

            return false;

        }

        // 0. IP리스트 데이터 생성

        for(var i = 0, max = st_sixtofor.count(); i < max; i++){

            var tmpip = {};

            tmpip.v4 = st_sixtofor.data.items[i].get('v4');
            tmpip.v6 = st_sixtofor.data.items[i].get('v6');

            sixtofor_list.push(tmpip);
        }


        // 1. network_tunneling_6to4 데이터 생성
        tmp.ip = sixtofor_list;
        tmp.use = (st_6to4_use) ? 'on' : 'off';
        tmp.ttl = Ext.getCmp('tunnel_ttl').getValue();
        tmp.interface = Ext.getCmp('tunnel_6to4_inter').getValue();

        // 2. 메인-뷰 모델의 데이터에 데이터 추가
        main_viewModel.set('network_tunneling_6to4', tmp);

        //3.Store 삭제 
        st_sixtofor.removeAll();

        me.parentObj.viewState = true;

        return true;

    }

});