
Ext.define('SMC4ZEN.view.NFW2_network_llcf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_llcf',

    requires: [
        'SMC4ZEN.view.NFW2_network_llcfViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_network_llcf'
    },
    //cls: 'zen_body',
    title : 'LLCF',
    id: 'NFW2_network_ha_physicalLink',
    defaultListenerScope: true,
    items: [
        {
            xtype: 'form',
            id: 'fm',
            layout: 'auto',
            bodyPadding: 5,
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'label',
                            bind: {
                                text: '{link_pack}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    id: 'grid_link',
                    margin: '10 0 0 0',
                    title: '',
                    overflowX : 'auto',
                    columnLines: true,
                    disableSelection: true,
                    enableColumnHide: false,
                    enableColumnMove: false,
                    enableColumnResize: false,
                    sortableColumns: false,
                    store: 'store_physical_link',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 100,
                            sortable: false,
                            dataIndex: 'name'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="link_eth0_'+rowIndex+'" />';
                            },
                            id: 'l_eth0',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'number',
                            text: 'eth0'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="link_eth1_'+rowIndex+'" />';
                            },
                            id: 'l_eth1',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'date',
                            text: 'eth1'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="link_eth2_'+rowIndex+'" />';
                            },
                            id: 'l_eth2',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'bool',
                            text: 'eth2'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="link_eth3_'+rowIndex+'" />';
                            },
                            id: 'l_eth3',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            text: 'eth3'
                        }
                    ],
                    listeners: {
                        cellclick: 'onGrid_linkCellClick'
                    }
                },
                {
                    xtype: 'container',
                    margin: '10 0 0 0',
                    items: [
                        {
                            xtype: 'label',
                            bind: {
                                text: '{bond_pack}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    id: 'grid_bond',
                    margin: '5 0 0 0',
                    overflowX : 'auto',
                    title: '',
                    columnLines: true,
                    disableSelection: true,
                    enableColumnHide: false,
                    enableColumnMove: false,
                    enableColumnResize: false,
                    sortableColumns: false,
                    store: 'store_physical_bond',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 100,
                            sortable: false,
                            dataIndex: 'name'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="bond_eth0_'+rowIndex+'" />';
                            },
                            id: 'b_eth0',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'number',
                            text: 'eth0'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="bond_eth1_'+rowIndex+'" />';
                            },
                            id: 'b_eth1',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'date',
                            text: 'eth1'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="bond_eth2_'+rowIndex+'" />';
                            },
                            id: 'b_eth2',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            dataIndex: 'bool',
                            text: 'eth2'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<input type="checkbox" id="bond_eth3_'+rowIndex+'" />';
                            },
                            id: 'b_eth3',
                            width: 50,
                            sortable: false,
                            align: 'center',
                            text: 'eth3'
                        }
                    ],
                    listeners: {
                        cellclick: 'onGrid_bondCellClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforeclose : 'saveData'
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    }
                },
                /*
                {
                    
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
                */
            ]
        }
    ],

    onGrid_linkCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var grid_link = Ext.getCmp("grid_link");
        var grid_bond = Ext.getCmp("grid_bond");

        this.grid_chk_link(cellIndex,rowIndex);
    },

    onGrid_bondCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var grid_link = Ext.getCmp("grid_link");
        var grid_bond = Ext.getCmp("grid_bond");

        this.grid_chk_bond(cellIndex,rowIndex);
    },

    onPanelAfterRender: function(component, eOpts) {
        
        var me = this;
        var vm = me.getViewModel().getData();
        var st_eth = Ext.data.StoreManager.lookup('store_interface');
        var ctn_eth = st_eth.count();

        // 스토어에 저장되어있는 인터페이스 갯수별로 그리드 아이템 생성.

        console.log('ctn_eth' , ctn_eth);

        for(var v = 0; v < ctn_eth; v++){

            var column_link = Ext.create('Ext.grid.column.Column', {
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return '<input type="checkbox" id="link_eth'+(colIndex-1)+'_'+rowIndex+'" />';
                },
                id: 'l_eth'+v,
                width: 50,
                hidden: true,
                align: 'center',
                text: "eth"+v,
                sortable: false
            });

            var column_bond = Ext.create('Ext.grid.column.Column', {
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return '<input type="checkbox" id="bond_eth'+(colIndex-1)+'_'+rowIndex+'" />';
                },
                id: 'b_eth'+v,
                width: 50,
                hidden: true,
                align: 'center',
                text: "eth"+v,
                sortable: false
            });

            Ext.getCmp("grid_link").headerCt.insert(v + 1, column_link);
            Ext.getCmp("grid_bond").headerCt.insert(v + 1, column_bond);

        }

        // 체크박스 컬럼 추가

        for(var i = 0; i < ctn_eth; i++){
            
            Ext.getCmp("l_" + st_eth.getAt(i).get('name')).show();
            Ext.getCmp("b_" + st_eth.getAt(i).get('name')).show();
            
        }

        // 데이터 추가

        me.get_ha_physicalLink(vm);

   
/*

        var vm = component.getViewModel();
        var main_viewModel = component.parentObj.getViewModel();

        var st_eth = Ext.data.StoreManager.lookup("store_interface");
        var llcf_link_list = Ext.data.StoreManager.lookup("store_physical_link");
        var llcf_link_bond = Ext.data.StoreManager.lookup('store_physical_bond');

        console.log('list', llcf_link_list);
        console.log('bond', llcf_link_bond);
   
*/

        // var _params = {
        //     option: Ext.encode("all")
        // };
        // var grid = Ext.getCmp("grid_link");

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'get_pname_list',
        //     _params,
        //     function(response){

        //         hideLoadMask();

        //         Ext.getCmp("NFW2_network_ha_physicalLink").setWidth(wid+20);

        //         me.eth_length = response.length;
        //         setTimeout(function(){ me.get_ha_physicalLink(); },1);
        //     }
        // );
    },

    // SMC4ZEN에서는 더이상 사용하지 않습니다.
    /*
    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var grid_link = Ext.getCmp("grid_link");
        var grid_bond = Ext.getCmp("grid_bond");

        var group = 0;

        var obj = {
            'link_pack_script': {'link_pack':''},
            'bond_pack_script': {'bond_pack':''}
        };

        var link = [];
        var bond = [];

        for(var l=0; l<grid_link.getStore().getCount(); l++){

            var chk = 0;

            var eth_chk = [];

            for(var e=0; e<me.eth_length; e++){
                eval('var eth'+e+' = document.getElementById("link_eth'+e+'_'+l+'").checked;');
                eval('if(eth'+e+'){ eth_chk.push("eth'+e+'"); chk = 1; }');
            }

            if(chk === 1){

                var inter = {};
                for(var e=0; e<me.eth_length; e++){
                    eval('inter["chk_eth'+e+'"] = (eth'+e+')?"on":"off";');
                }

                link_pack = {
                    'name': "pack"+(l+1),
                    'interface': inter
                };

                link.push(link_pack);
            }
        }

        obj.link_pack_script.link_pack = link;

        for(var i=0; i<grid_bond.getStore().getCount(); i++){

            var chk = 0;

            for(var e=0; e<me.eth_length; e++){
                eval('var eth'+e+' = document.getElementById("bond_eth'+e+'_'+i+'").checked;');
                eval('if(eth'+e+'){ chk = 1; }');
            }

            if(chk === 1){

                var inter = {};
                for(var e=0; e<me.eth_length; e++){
                    eval('inter["chk_eth'+e+'"] = (eth'+e+')?"on":"off";');
                }

                bond_pack = {
                    'name': "pack"+(i+1),
                    'interface': inter
                };
                bond.push(bond_pack);
                group++;
            }
        }
        obj.bond_pack_script.bond_pack = bond;

        if(group > 0 && group < 2){

            prt_errMsg(get_msg('err_bond_chk'), null);
            return false;
        }

        prt_errMsg(null,null);

        var _params = {
            basename: Ext.encode("link_pack_script"),
            obj: Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){

                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg('msg_ok_add'),
                    width: 300,
                    buttons: Ext.Msg.YES,
                    buttonText:{
                        yes: __zen('confirm')
                    }
                });
            }
        );
    },
    */

    // SMC4ZEN에서는 더이상 사용하지 않습니다.
    /*
    onButtonClick1: function(button, e, eOpts) {
        this.get_ha_physicalLink();
    },
    */

    get_ha_physicalLink: function(data) {
        
        var me = this;
        var st_eth = Ext.data.StoreManager.lookup("store_interface");
        var _store_link = Ext.data.StoreManager.lookup("store_physical_link");
        var _store_bond = Ext.data.StoreManager.lookup('store_physical_bond');
        var link = data.link_pack_script;
        var bond = data.bond_pack_script;
  
        // 그리드의 체크박스 상태를 모두 기본값으로 초기화 한다.

        
        for(var k = 0, max = _store_link.getCount() ; k <max ; k++)
        {

            for(var e = 0; e < st_eth.count(); e++){
                
                document.getElementById('link_eth' + e +'_' + k).checked = false;
                document.getElementById('link_eth' + e +'_' + k).disabled = false;

            }
        }

        for(var d = 0, max = _store_bond.getCount(); d < max; d++)
        {
        
            for(var e = 0; e < st_eth.count(); e++){
            
                document.getElementById('bond_eth' + e + '_' + d).checked = false;
                document.getElementById('bond_eth' + e + '_' + d).disabled = false;

            }
            
        }

        if(!data.link_pack_script)
        {
            return;
        }
        if(!data.bond_pack_script)
        {
            return;
        }

        for(var i= 0, max = link.link_pack.length; i<max; i++)
        {

            for(var l=0; l<st_eth.count(); l++)
            {

                if(link.link_pack[i]['interface']['chk_eth'+l]==="on")
                {

                    document.getElementById('link_eth'+l+'_'+i).checked = true;
                    me.grid_chk_link(l+1,i);
                }

            }

        }
        
        for(var i= 0, max = bond.bond_pack.length; i<max; i++)
        {

                for(var l=0; l<st_eth.count(); l++){

                    if(bond.bond_pack[i]['interface']['chk_eth'+l]==="on"){

                        document.getElementById('bond_eth'+l+'_'+i).checked = true;

                        me.grid_chk_bond(l+1,i);

                    }

                }

        }
        
    },

    grid_chk_link: function(cellIndex, rowIndex) {
        var grid_link = Ext.getCmp("grid_link");
        var grid_bond = Ext.getCmp("grid_bond");

        var stop = '';

        for(var i=0; i<grid_link.getStore().getCount(); i++){

            if(i !== Number(rowIndex)){

                if(document.getElementById("link_eth"+(cellIndex-1)+"_"+i).checked === true){

                    stop = '1';
                    break;
                }
            }
        }

        for(var l=0; l<grid_bond.getStore().getCount(); l++){

            if(document.getElementById("bond_eth"+(cellIndex-1)+"_"+l).checked === true){
                stop = '1';
                break;
            }
        }

        if(stop === '1'){
            return false;
        }

        var chk = document.getElementById("link_eth"+(cellIndex-1)+"_"+rowIndex).checked;

        for(var i=0; i<grid_link.getStore().getCount(); i++){

            if(i !== Number(rowIndex)){

                document.getElementById("link_eth"+(cellIndex-1)+"_"+i).disabled = chk;
            }
        }

        for(var l=0; l<grid_bond.getStore().getCount(); l++){

            document.getElementById("bond_eth"+(cellIndex-1)+"_"+l).disabled = chk;
        }


    },

    grid_chk_bond: function(cellIndex, rowIndex) {
        var grid_link = Ext.getCmp("grid_link");
        var grid_bond = Ext.getCmp("grid_bond");

        var stop = '';

        for(var i=0; i<grid_link.getStore().getCount(); i++){

            if(document.getElementById("link_eth"+(cellIndex-1)+"_"+i).checked === true){
                stop = '1';
                break;
            }
        }

        for(var l=0; l<grid_bond.getStore().getCount(); l++){

            if(l !== Number(rowIndex)){

                if(document.getElementById("bond_eth"+(cellIndex-1)+"_"+l).checked === true){
                    stop = '1';
                    break;
                }
            }
        }

        if(stop === '1'){
            return false;
        }

        var chk = document.getElementById("bond_eth"+(cellIndex-1)+"_"+rowIndex).checked;

        for(var i=0; i<grid_bond.getStore().getCount(); i++){

            if(i !== Number(rowIndex)){

                document.getElementById("bond_eth"+(cellIndex-1)+"_"+i).disabled = chk;
            }
        }

        for(var l=0; l<grid_link.getStore().getCount(); l++){

            document.getElementById("link_eth"+(cellIndex-1)+"_"+l).disabled = chk;
        }
    },

    saveData : function(component, eOpts){
        
        var main_viewModel = component.parentObj.getViewModel();
        var st_eth = Ext.data.StoreManager.lookup("store_interface");
        var _store_link = Ext.data.StoreManager.lookup("store_physical_link");
        var _store_bond = Ext.data.StoreManager.lookup('store_physical_bond');
        var tmpcheck = {};
        var g_bond_pack = {};
        var g_link_pack = {};
        var llcf_link_list = [];
        var llcf_link_bond = [];


        for(var k = 0 , max  = _store_link.getCount(); k <max ;  k++)
        {
            tmpcheck={};
            tmpcheck.interface = {};
            tmpcheck.name = 'pack' + k;
            for(var e = 0 , st_eth_max = st_eth.count(); e < st_eth_max; e++)
            {
                
                if(document.getElementById('link_eth' + e +'_' + k).checked == true)
                { 
                    tmpcheck.interface['chk_eth'+ e] = 'on';
                }
                else
                {
                    tmpcheck.interface['chk_eth'+ e] = 'off';
                }
            }
            llcf_link_list.push(tmpcheck);
     
        }

        g_link_pack.link_pack = llcf_link_list;

        for(var k = 0, max = _store_bond.getCount(); k < max; k++)
        {
            tmpcheck={};
            tmpcheck.interface = {};
            tmpcheck.name = 'pack' + k;
            for(var e = 0 , st_eth_max=st_eth.count() ; e < st_eth_max; e++)
            {
                
                if(document.getElementById('bond_eth' + e +'_' + k).checked == true)
                {
                    tmpcheck.interface['chk_eth' + e] = 'on';
                }
                else
                {
                    tmpcheck.interface['chk_eth' + e] = 'off';
                }
            }
            llcf_link_bond.push(tmpcheck);
        }
        g_bond_pack.bond_pack = llcf_link_bond;


        // 2. 메인-뷰 모델의 데이터에 데이터 추가
        main_viewModel.set('link_pack_script', g_link_pack);
        main_viewModel.set('bond_pack_script', g_bond_pack);

        console.log('g_link_pack' , g_link_pack);
        console.log('g_bond_pack', g_bond_pack);
        //3. Store Delete 
        
        //_store_link.removeAll();
        //_store_bond.removeAll();
           

    }

});