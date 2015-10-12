
Ext.define('SMC4ZEN.view.NFW2_network_ipv6Tunneling_6in4', 
{
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ipv6tunneling_6in4',

    requires: 
    [
        'SMC4ZEN.view.NFW2_network_ipv6Tunneling_6in4ViewModel',
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

    viewModel: 
    {
        type: 'nfw2_network_ipv6tunneling_6in4'
    },
    id: 'NFW2_network_ipv6Tunneling_6in4',
    defaultListenerScope: true,
    title : '터널링 설정',

    items: 
    [
        {
            xtype: 'form',
            bodyPadding: 5,
            header: false,
            title: 'My Form',
            items: 
            [
                {
                    xtype: 'container',
                    items:
                    [
                        
                        {
                            xtype: 'toggleslide',
                            resizeHandle: false,
                            state: false,
                            id: 'chker_set_tunnel_use',
                            listeners: {
                                change: 'onChker_set_tunnel_useChange',
                                afterrender: 'onChker_set_tunnel_useAfterRender'
                            }
                        },
                        

                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'tunnel_set_con',
                            margin: '8 0 0 0',
                            items: 
                            [
                                {
                                    xtype: 'container',
                                    layout: 
                                    {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: 
                                    [
                                        {
                                            xtype: 'combobox',
                                            id: 'tunnel_set_inter',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: 'store_interface',
                                            valueField: 'name',
                                            bind: 
                                            {
                                                fieldLabel: '{ipv4_inter}',
                                                value : '{network_tunneling_6in4.interface}'
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
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    margin: '8 0 0 0',
                                    iconCls: 'icb_add',
                                    bind: 
                                    {
                                        text: '{add}'
                                    },
                                    listeners: 
                                    {
                                        click: 'onButtonClick2',
                                        blur: 'onButtonBlur'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'ipv6tunnel_set_grid',
                                    margin: '8 0 10 0',
                                    header: false,
                                    title: 'My Grid Panel',
                                    allowDeselect: true,
                                    disableSelection: true,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    store: 'store_tunnel_set_list',
                                    columns: 
                                    [
                                        {
                                            xtype: 'rownumberer',
                                            width: 60,
                                            align: 'center',
                                            dataIndex: 'string',
                                            text: 'N'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) 
                                            {
                                                metaData.tdCls = "cell_text";

                                                return value;
                                            },
                                            width: 210,
                                            dataIndex: 'v6',
                                            menuDisabled: true,
                                            bind: 
                                            {
                                                text: '{ipv6_dest}'
                                            },
                                            editor: 
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value === true){ return true; }
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                    return true;
                                                },
                                                baseCls: 'cell_text',
                                                maskRe: /[0-9a-fA-F:\/]/,
                                                listeners: 
                                                {
                                                    blur: 'onTextfieldBlur',
                                                    focus: 'onTextfieldFocus'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            minWidth: 290,
                                            menuDisabled: true,
                                            bind: 
                                            {
                                                text: '{tunnel_inter}'
                                            },
                                            columns: 
                                            [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) 
                                                    {
                                                        metaData.tdCls = "cell_combo";

                                                        return value;
                                                    },
                                                    height: 0,
                                                    id: 'tunnel_set_name_col',
                                                    style: 'border:none',
                                                    width: 80,
                                                    dataIndex: 'sit_name',
                                                    text: 'MyColumn4',
                                                    editor: 
                                                    {
                                                        xtype: 'combobox',
                                                        baseCls: 'cell_combo',
                                                        editable: false,
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        valueField: 'name',
                                                        listeners:
                                                        {
                                                            focus: 'onComboboxFocus',
                                                            collapse: 'onComboboxCollapse',
                                                            blur: 'onComboboxBlur'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) 
                                                    {
                                                        metaData.tdCls = "cell_text";

                                                        return value;
                                                    },
                                                    height: 0,
                                                    style: 'border:none',
                                                    width: 210,
                                                    dataIndex: 'sit_v6',
                                                    text: 'MyColumn5',
                                                    editor: 
                                                    {
                                                        xtype: 'textfield',
                                                        baseCls: 'cell_text',
                                                        maskRe: /[0-9a-fA-F:\/]/,
                                                        listeners: 
                                                        {
                                                            blur: 'onTextfieldBlur1',
                                                            focus: 'onTextfieldFocus1'
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) 
                                            {
                                                metaData.tdCls = "cell_text";

                                                return value;
                                            },
                                            dataIndex: 'v4',
                                            menuDisabled: true,
                                            bind: 
                                            {
                                                text: '{remote_ipv4}'
                                            },
                                            editor:
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value === true){ return true; }
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                                    return true;
                                                },
                                                baseCls: 'cell_text',
                                                maskRe: /[0-9.:\/]/,
                                                listeners: 
                                                {
                                                    blur: 'onTextfieldBlur2',
                                                    focus: 'onTextfieldFocus2'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) 
                                            {
                                                metaData.tdCls = "cell_text";

                                                return value;
                                            },
                                            dataIndex: 'ttl',
                                            flex: 0.5,
                                            bind: 
                                            {
                                                text: '{ttl}'
                                            },
                                            editor: 
                                            {
                                                xtype: 'textfield',
                                                fieldInfo: '입력범위 : 0 ~ 255',
                                                baseCls: 'cell_text',
                                                enforceMaxLength: true,
                                                maskRe: /[0-9]/,
                                                maxLength: 3,
                                                maxLengthText: ' ',
                                                listeners: 
                                                {
                                                    blur: 'onTextfieldBlur3',
                                                    focus: 'onTextfieldFocus3'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            id: 'set_actioncol',
                                            width: 50,
                                            align: 'center',
                                            menuDisabled: true,
                                            items: 
                                            [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) 
                                                    {
                                                    
                                                        var grid =Ext.getCmp('ipv6tunnel_set_grid');
                                                        grid.getPlugin('tunnel_set_plug').completeEdit();

                                                        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_set_list');

                                                        store_isatap.removeAt(rowIndex);

                                                        if(store_isatap.data.items.length < 2){ Ext.getCmp('set_actioncol').items[0].disabled = true; }
                                                        else{ Ext.getCmp('set_actioncol').items[0].disabled = false; }
                                                        Ext.getCmp('ipv6tunnel_set_grid').getView().refresh();
                                                    
                                                    },
                                                    iconCls: 'icr_del'
                                                }
                                            ]
                                        }
                                    ],
                                    viewConfig: 
                                    {
                                        markDirty: false
                                    },
                                    plugins: 
                                    [
                                        {
                                            ptype: 'cellediting',
                                            pluginId: 'tunnel_set_plug',
                                            clicksToEdit: 1
                                        }
                                    ]
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
    
    listeners: 
    {
        afterrender: 'onNFW2_network_ipv6Tunneling_6in4AfterRender',
        beforeclose : 'saveData'
    },

    onChker_set_tunnel_useChange: function(button) 
    {
        if(button.state)
        {
            Ext.getCmp('tunnel_set_con').enable();
        }
        else
        {
            Ext.getCmp('tunnel_set_con').disable();
        }
    },

    onChker_set_tunnel_useAfterRender: function(component, eOpts) 
    {
        component.onText = __zen('use');
        component.offText = __zen('unused');
    },

    onButtonClick2: function(button, e, eOpts) 
    {
     
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_6in4');
        var grid =Ext.getCmp('ipv6tunnel_set_grid');
        grid.getPlugin('tunnel_set_plug').completeEdit();

        var store_set = Ext.data.StoreManager.lookup('store_tunnel_set_list');

        if(me.max_cnt <= store_set.getCount())
        {
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(me.max_cnt));

            return false;
        }

        var record_set = [];

        record_set.push({
            'ipv6' : '',
            'ipv4' : '',
            'tunnel_inter' : '',
            'ttl' : '128'
        });

        store_set.add(record_set);

        if(store_set.data.items.length < 2){ Ext.getCmp('set_actioncol').items[0].disabled = true; }
        else{ Ext.getCmp('set_actioncol').items[0].disabled = false; }
        Ext.getCmp('ipv6tunnel_set_grid').getView().refresh();
    
    },

    onButtonBlur: function(component, event, eOpts)
    {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldBlur: function(component, event, eOpts) 
    {
        setTipBlur(this, component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus: function(component, event, eOpts) 
    {
        var str = disp_help_ip('4ss2p');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    onComboboxFocus: function(component, event, eOpts) 
    {
    
        console.log('Combobox store init start !!');

        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_6in4');
        var store = component.getStore();
        var grid_store = Ext.getCmp('ipv6tunnel_set_grid').getStore();
        var records = [];

        var set_name_record = [];

        for(var i = 0;i <16;i++){

            set_name_record.push({ 'name' : 'sit'+i });
        
        }
    
        console.log('Combobox records -> ', set_name_record);

        store.loadData(set_name_record);

        for(var i in store.data.items){
            
            var chk = false;
            
            for(var j in grid_store.data.items){
            
                if(store.data.items[i].data.name === grid_store.data.items[j].data.sit_name){
            
                    if(grid_store.data.items[j].data.sit_name !== component.getValue()){
            
                        chk = true;
            
                    }
            
                }
            }
            
            if(chk === false){
            
                records.push({'name':store.data.items[i].data.name});
            
            }

        }

        store.loadData(records);

        component.setValue(component.getValue());
        
        component.expand();
    
    },

    onComboboxCollapse: function(field, eOpts) 
    {
        field.blur();
    },

    onComboboxBlur: function(component, event, eOpts) 
    {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');

    },

    onTextfieldBlur1: function(component, event, eOpts) 
    {
        setTipBlur(this, component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus1: function(component, event, eOpts) 
    {
        var str = disp_help_ip('4s2p');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    onTextfieldBlur2: function(component, event, eOpts) 
    {
        setTipBlur(this,component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus2: function(component, event, eOpts) 
    {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    onTextfieldBlur3: function(component, event, eOpts) 
    {
        setTipBlur(this,component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus3: function(component, event, eOpts) 
    {
        setTipFocus(this,component);
    },

    validate6in4Check: function(button, e, eOpts) 
    {
    
        var me = this;
        var store_set = Ext.data.StoreManager.lookup('store_tunnel_set_list');

        if(Ext.getCmp('chker_set_tunnel_use').state){
            
            for(var i in store_set.data.items){

                if(!CheckNotNull(store_set.data.items[i].get('v6'))){

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);

                    return false;

                }

                var temp;

                if(store_set.data.items[i].get('v6')){ 

                    temp = store_set.data.items[i].get('v6').split('/'); 

                }
                else{

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);

                    return false;

                }

                if(!temp[1]){

                    if(!ValidIPv6(temp[0])){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);

                        return false;
                    }

                }
                else{

                    if(!ValidIPv6(temp[0])){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);

                        return false;

                    }

                    if(temp[1] === ""){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_form'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);

                        return false;

                    }

                    if(Number(temp[1]) < 3 || Number(temp[1]) > 128){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(ValidLimit(3,128));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 1);

                        return false;

                    }

                }

                if(store_set.data.items[i].get('sit_name') === "" || store_set.data.items[i].get('sit_name') === undefined){
                    
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 2);

                    return false;

                }

                var temp_sit;

                if(store_set.data.items[i].get('sit_v6')){ 

                    temp_sit = store_set.data.items[i].get('sit_v6').split('/'); 

                }
                else{

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);

                    return false;

                }

                if(temp_sit[1] === undefined){

                    if(!ValidIPv6(temp_sit[0])){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);

                        return false;

                    }
                    else{

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_form'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);

                        return false;
                    }

                }
                else{

                    if(!ValidIPv6(temp_sit[0])){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);

                        return false;

                    }

                    if(temp_sit[1] === ""){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_form'));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);

                        return false;

                    }
                    
                    if(Number(temp_sit[1]) < 3 || Number(temp_sit[1]) > 128){

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(ValidLimit(3,128));

                        Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 3);

                        return false;

                    }

                }

                if(!store_set.data.items[i].get('v4')){
                    
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 4);

                    return false;

                }
                if(!ValidIPAddress(store_set.data.items[i].get('v4'))){
                    
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_ip'));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 4);

                    return false;

                }

                if(Number(store_set.data.items[i].get('ttl')) < 0 || Number(store_set.data.items[i].get('ttl')) > 255){
                    
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(ValidLimit(0,255));

                    Ext.getCmp('ipv6tunnel_set_grid').getPlugin('tunnel_set_plug').startEdit(Number(i), 5);

                    return false;
                }

            }

        }

        return true;
    
    },

    onButtonClick: function(button, e, eOpts) 
    {
    
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_6in4');

        var store_set = Ext.data.StoreManager.lookup('store_tunnel_set_list');
        var record_set = [];

        record_set.push({
            'ipv6' : '',
            'ipv4' : '',
            'sit_name' : '',
            'sit_v6' : '',
            'ttl' : '128'
        });

        store_set.loadData(record_set);

        if(store_set.data.items.length < 2){ Ext.getCmp('set_actioncol').items[0].disabled = true; }

        Ext.getCmp('ipv6tunnel_set_grid').getView().refresh();
    
    },

    onNFW2_network_ipv6Tunneling_6in4AfterRender: function(component, eOpts) 
    {
        var me = this;
        var vm = me.getViewModel();
        var sixinfor = vm.getData().network_tunneling_6in4;
        var st_tunneling = Ext.data.StoreManager.lookup('store_tunnel_set_list');

        this.fieldInfo = makeZenTip();

        var set_name_record = [];

        if(sixinfor)
        {
                        
            Ext.getCmp('chker_set_tunnel_use').state = (sixinfor.use === 'on') ? true : false;
            Ext.getCmp('chker_set_tunnel_use').moveHandle((sixinfor.use === 'on') ? true : false);

            console.log('use  ' , sixinfor.use);

            if(sixinfor.use === 'on')
            {
                Ext.getCmp('tunnel_set_con').enable();
                Ext.getCmp('tunnel_set_con').use  = 'on'
            }
            else
            {
                Ext.getCmp('tunnel_set_con').disable();
                Ext.getCmp('tunnel_set_con').use  = 'off'
            }           
            st_tunneling.loadData(sixinfor.ip);
            Ext.getCmp('ipv6tunnel_set_grid').getView().refresh();
        } 

         for(var i = 0;i <16;i++)
        {
          set_name_record.push({ 'name' : 'sit'+i });
        }

        var set_name_store = 
        {
            data: set_name_record,
            fields:[
            { name : 'name' }
            ]
         };

         Ext.getCmp('tunnel_set_name_col').getEditor().bindStore(set_name_store);
         Ext.getCmp('ipv6tunnel_set_grid').getView().refresh();

    },

    saveData : function(component, eOpts){

        var me = this;
        var vm = component.getViewModel();
        var st_6in4_use = Ext.getCmp('chker_set_tunnel_use').state;
        var st_sixinfor = Ext.data.StoreManager.lookup('store_tunnel_set_list');
        var sixinfor_list = [];
        var main_viewModel = component.parentObj.getViewModel();

        var tmp = {};

        // 화면 유효성 검사

        if(!me.validate6in4Check()){

            me.parentObj.viewState = false;

            return false;

        }

        // 0. IP리스트 데이터 생성

        for(var i = 0, max = st_sixinfor.count(); i < max; i++)
        {
            var tmpip = {};

            tmpip.v4 = st_sixinfor.data.items[i].get('v4');
            tmpip.v6 = st_sixinfor.data.items[i].get('v6');
            tmpip.sit_v6 = st_sixinfor.data.items[i].get('sit_v6');
            tmpip.ttl = st_sixinfor.data.items[i].get('ttl');
            tmpip.sit_name = st_sixinfor.data.items[i].get('sit_name');

            sixinfor_list.push(tmpip);
        }

        // 1. network_tunneling_6in4 데이터 생성

        tmp.use = (st_6in4_use) ? 'on' : 'off';

        tmp.interface = Ext.getCmp('tunnel_set_inter').getValue();
        tmp.ip = sixinfor_list;

        // 2. 메인-뷰 모델의 데이터에 데이터 추가
        main_viewModel.set('network_tunneling_6in4', tmp);

        // 3. Store Delete 
        st_sixinfor.removeAll();

        me.parentObj.viewState = true;

        return true;

    }

});