
Ext.define('SMC4ZEN.view.NFW2_network_ipv6Tunneling_isatap', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ipv6tunneling_isatap',

    requires: [
        'SMC4ZEN.view.NFW2_network_ipv6Tunneling_isatapViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.form.field.ComboBox',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_ipv6tunneling_isatap'
    },
    id: 'NFW2_network_ipv6Tunneling_isatap',
    width: 900,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                
                    xtype: 'container',
                    items: [
                        
                        {
                        	
                            xtype: 'toggleslide',
                            resizeHandle: false,
                            state: false,
                            id: 'chker_isatap_tunnel_use',
                            listeners: {
                                change: 'onButtonChange',
                                afterrender: 'onChker_isatap_tunnel_useAfterRender'
                            }
                            
                        },
                         
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'tunnel_isatap_con',
                            items: [
                               
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    margin: '8 0 0 0',
                                    iconCls: 'icb_add',
                                    bind: {
                                        text: '{add}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick',
                                        blur: 'onButtonBlur'
                                    }
                                },
                                
                                {
                                    xtype: 'gridpanel',
                                    id: 'ipv6tunnel_isatap_grid',
                                    margin: '8 0 0 0',
                                    header: false,
                                    title: 'My Grid Panel',
                                    allowDeselect: true,
                                    disableSelection: true,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    store: 'store_tunnel_isatap_list',
                                    
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            width: 60,
                                            align: 'center',
                                            dataIndex: 'string',
                                            text: 'N'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 265,
                                            menuDisabled: true,
                                            flex: 1.2,
                                            bind: {
                                                text: '{ipv6_prefix}'
                                            },
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = "cell_text";

                                                        return value;
                                                    },
                                                    
                                                    height: 0,
                                                    style: 'border:none',
                                                    width: 220,
                                                    dataIndex: 'prefix',
                                                    text: 'MyColumn3',
                                                    editor: {
                                                        xtype: 'textfield',
                                                        baseCls: 'cell_text',
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
                                                        return "/64";
                                                    },
                                                    
                                                    height: 0,
                                                    style: 'border:none',
                                                    width: 45,
                                                    text: 'MyColumn4'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = "cell_combo";

                                                return value;
                                            },
                                            
                                            id: 'tunnel_isatap_name_col',
                                            dataIndex: 'name',
                                            menuDisabled: true,
                                            flex: 0.5,
                                            bind: {
                                                text: '{name}'
                                            },
                                            
                                            editor: {
                                                xtype: 'combobox',
                                                baseCls: 'cell_combo',
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                valueField: 'name',
                                                listeners: {
                                                
                                                    focus: 'onComboboxFocus',
                                                    collapse: 'onComboboxCollapse',
                                                    blur: 'onComboboxBlur'
                                                
                                                }
                                            }

                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = "cell_combo";

                                                return value;
                                            },
                                            
                                            dataIndex: 'interface',
                                            menuDisabled: true,
                                            flex: 1,
                                            bind: {
                                                text: '{inter}'
                                            },
                                            
                                            editor: {
                                                xtype: 'combobox',
                                                baseCls: 'cell_combo',
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_interface_isatap',
                                                valueField: 'name',
                                                listeners: {
                                                    
                                                    focus: 'onComboboxFocus1',
                                                    collapse: 'onComboboxCollapse1',
                                                    blur: 'onComboboxBlur1'
                                                    
                                                }
                                            }
                                            
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                metaData.tdCls = "cell_text";

                                                return value;
                                            },
                                            
                                            dataIndex: 'ttl',
                                            menuDisabled: true,
                                            flex: 0.5,
                                            bind: {
                                                text: '{ttl}'
                                            },
                                            editor: {
                                                xtype: 'textfield',
                                                fieldInfo: '입력 범위 : 0 ~ 255',
                                                baseCls: 'cell_text',
                                                enforceMaxLength: true,
                                                maskRe: /[0-9]/,
                                                maxLength: 3,
                                                maxLengthText: ' ',
                                                listeners: {
                                                    blur: 'onTextfieldBlur1',
                                                    focus: 'onTextfieldFocus1'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            id: 'isatap_actioncol',
                                            width: 50,
                                            align: 'center',
                                            menuDisabled: true,
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    
                                                    
                                                        var grid =Ext.getCmp('ipv6tunnel_isatap_grid');
                                                        grid.getPlugin('tunnel_isatap_plug').completeEdit();

                                                        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');

                                                        store_isatap.removeAt(rowIndex);

                                                        if(store_isatap.data.items.length < 2){ Ext.getCmp('isatap_actioncol').items[0].disabled = true; }
                                                        else{ Ext.getCmp('isatap_actioncol').items[0].disabled = false; }
                                                        Ext.getCmp('ipv6tunnel_isatap_grid').getView().refresh();
                                                    
                                                    },
                                                    iconCls: 'icr_del'
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
                                            pluginId: 'tunnel_isatap_plug',
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
    

    listeners: {
        afterrender: 'onNFW2_network_ipv6Tunneling_isatapAfterRender',
        beforeclose : 'saveData'

    },

    onButtonChange: function(button) {
        if(button.state){
            Ext.getCmp('tunnel_isatap_con').enable();
        }
        else{
            Ext.getCmp('tunnel_isatap_con').disable();
        }
    },

    onChker_isatap_tunnel_useAfterRender: function(component, eOpts) {
        component.onText = __zen('use');
        component.offText = __zen('unused');
    },

    onButtonClick: function(button, e, eOpts) {
    	
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_isatap');
        var grid =Ext.getCmp('ipv6tunnel_isatap_grid');
        grid.getPlugin('tunnel_isatap_plug').completeEdit();

        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');

        if(me.max_cnt <= store_isatap.getCount()){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(me.max_cnt));

            return false;
        }

        var record_isatap = [];

        record_isatap.push({
            'ipv6' : '',
            'name' : '',
            'interface' : '',
            'ttl' : '128'
        });

        store_isatap.add(record_isatap);

        if(store_isatap.data.items.length < 2){ Ext.getCmp('isatap_actioncol').items[0].disabled = true; }
        else{ Ext.getCmp('isatap_actioncol').items[0].disabled = false; }
        Ext.getCmp('ipv6tunnel_isatap_grid').getView().refresh();
     
    },

    onButtonBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldBlur: function(component, event, eOpts) {
        
        setTipBlur(this,component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        
    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('isatap');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onComboboxFocus: function(component, event, eOpts) {
        
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_isatap');
        var store = component.getStore();
        var grid_store = Ext.getCmp('ipv6tunnel_isatap_grid').getStore();
        var records = [];

        var isatap_name_record = [];

        for(var i = 0;i <16;i++){
            isatap_name_record.push({ 'name' : 'is'+i });
        }

        store.loadData(isatap_name_record);

        for(var i in store.data.items){
            var chk = false;
            for(var j in grid_store.data.items){
                if(store.data.items[i].data.name === grid_store.data.items[j].data.name){
                    if(grid_store.data.items[j].data.name !== component.getValue()){
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

    onComboboxCollapse: function(field, eOpts) {

       field.blur();

    },

    onComboboxBlur: function(component, event, eOpts) {
        
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        
    },

    onComboboxFocus1: function(component, event, eOpts) {
        
        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_isatap');
        var store = component.getStore();
        var grid_store = Ext.getCmp('ipv6tunnel_isatap_grid').getStore();

        var isatap_inter_record = [];

        for(var i = 0; i <=25; i++){

            isatap_inter_record.push({ 'name' : 'eth'+i });

        }

        store.loadData(isatap_inter_record);
        component.setValue(component.getValue());
        component.expand();
        
    },

    onComboboxCollapse1: function(field, eOpts) {

        field.blur();

    },

    onComboboxBlur1: function(component, event, eOpts) {
        
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        
    },

    onTextfieldBlur1: function(component, event, eOpts) {

        setTipBlur(this,component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');

    },

    onTextfieldFocus1: function(component, event, eOpts) {

        setTipFocus(this,component);

    },

    isatapCheck: function(button, e, eOpts) {

        var me = this;

        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');

        if(Ext.getCmp('chker_isatap_tunnel_use').state){

            for(var i in store_isatap.data.items){

                if(!CheckNotNull(store_isatap.data.items[i].get('prefix'))){

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 1);

                    return false;

                }

                var temp;

                if(store_isatap.data.items[i].get('prefix'))
                { 
                    temp = store_isatap.data.items[i].get('prefix').split('/'); 
                }
                else
                {

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 1);

                    return false;

                }
                if(!temp[1])
                {

                    if(!ValidIPv6(temp[0]))
                    {

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 1);

                        return false;
                    }

                }
                else{

                    if(!ValidIPv6(temp[0]))
                    {

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_ip'));

                        Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 1);

                        return false;

                    }

                    if(temp[1] === "")
                    {

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_form'));

                        Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 1);

                        return false;

                    }

                    if(Number(temp[1]) < 3 || Number(temp[1]) > 128)
                    {

                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(ValidLimit(3,128));

                        Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 1);

                        return false;

                    }

                }

                if(store_isatap.data.items[i].get('name') === "" || store_isatap.data.items[i].get('name') === undefined){

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i),3);

                    return false;

                }

                if(store_isatap.data.items[i].get('interface') === "" || store_isatap.data.items[i].get('interface') === undefined){

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_null'));

                    Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 4);

                    return false;

                }

                if(Number(store_isatap.data.items[i].get('ttl')) < 0 || Number(store_isatap.data.items[i].get('ttl')) > 255){

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(ValidLimit(0,255));

                    Ext.getCmp('ipv6tunnel_isatap_grid').getPlugin('tunnel_isatap_plug').startEdit(Number(i), 5);

                    return false;

                }

            }

        }

        return true;
    
    },

    onButtonClick1: function(button, e, eOpts) {

        var me = Ext.getCmp('NFW2_network_ipv6Tunneling_isatap');

        var store_isatap = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');

        var record_isatap = [];

        record_isatap.push({
            'ipv6' : '',
            'name' : '',
            'interface' : '',
            'ttl' : '128'
        });

        store_isatap.loadData(record_isatap);

        if(store_isatap.data.items.length < 2){ Ext.getCmp('isatap_actioncol').items[0].disabled = true; }

        Ext.getCmp('ipv6tunnel_isatap_grid').getView().refresh();

    },

    onNFW2_network_ipv6Tunneling_isatapAfterRender: function(component, eOpts) {

         var me = this;
         var vm = me.getViewModel();
         var isatap_name_record = [];
         var set_name_record = [];
         var sixinfor = vm.getData().network_tunneling_isatap;
         var st_tunneling = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');

         this.fieldInfo = makeZenTip();

         for(var i = 0;i <16;i++){
            isatap_name_record.push({ 'name' : 'is'+i });
        }

        var isatap_name_store = {
            data: isatap_name_record,
            fields:[
            { name : 'name' }
            ]
        };

        for(var i = 0;i <16;i++)
        {
          set_name_record.push({ 'name' : 'sit'+i });
        }

        if(sixinfor)
        {
                        
            Ext.getCmp('chker_isatap_tunnel_use').state = (sixinfor.use === 'on') ? true : false;
            Ext.getCmp('chker_isatap_tunnel_use').moveHandle((sixinfor.use === 'on') ? true : false);

            if(sixinfor.use === 'on')
            {
                Ext.getCmp('tunnel_isatap_con').enable();
                Ext.getCmp('tunnel_isatap_con').use  = 'on'
            }
            else
            {
                Ext.getCmp('tunnel_isatap_con').disable();
                Ext.getCmp('tunnel_isatap_con').use  = 'off'
            }           
            st_tunneling.loadData(sixinfor.entry_list);
        }

        Ext.getCmp('tunnel_isatap_name_col').getEditor().bindStore(isatap_name_store);
        Ext.getCmp('ipv6tunnel_isatap_grid').getView().refresh();

    },

    saveData : function(component, eOpts){
        
        var me = this;
        var vm = me.getViewModel();
        var st_isatap_use = Ext.getCmp('chker_isatap_tunnel_use').state;
        var st_isatap = Ext.data.StoreManager.lookup('store_tunnel_isatap_list');
        var isatap_list = [];
        var main_viewModel = component.parentObj.getViewModel();

        var tmp = {};

        // 유효성 검사 체크
        if(!me.isatapCheck()){

            me.parentObj.viewState = false;

            return false;

        }

        // 0. 그리드 리스트 데이터 생성

        for(var i = 0, max = st_isatap.count(); i < max; i++)
        {
            var tmpip = {};

            tmpip.prefix = st_isatap.data.items[i].get('prefix');
            tmpip.name = st_isatap.data.items[i].get('name');
            tmpip.interface = st_isatap.data.items[i].get('interface');
            tmpip.ttl = st_isatap.data.items[i].get('ttl');
            isatap_list.push(tmpip);

        }

        // 1. network_tunneling_6in4 데이터 생성

        tmp.use = (st_isatap_use) ? 'on' : 'off';
        tmp.entry_list = isatap_list;

        // 2. 메인-뷰 모델의 데이터에 데이터 추가
        main_viewModel.set('network_tunneling_isatap', tmp);

        //3. Store Delete 
        st_isatap.removeAll();

        me.parentObj.viewState = true;

        return true;
        
    }


});