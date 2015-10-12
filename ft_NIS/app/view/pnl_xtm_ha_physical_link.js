
Ext.define('SMC.view.pnl_xtm_ha_physical_link', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_ha_physical_link',

    requires: [
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    height: 680,
    id: 'pnl_xtm_ha_physical_link',
    width: 800,
    bodyPadding: 10,
    title: '물리적 링크',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    flex: 1,
                    itemId: 'fds_ha_link',
                    layout: 'fit',
                    title: 'Link Pack',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_ha_link',
                            margin: '5, 0, 10, 0',
                            title: '',
                            store: 'st_ha_bond_grid',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    text: 'Name'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    flex: 1,
                    itemId: 'fds_ha_bond',
                    layout: 'fit',
                    title: 'Bond Pack',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_ha_bond',
                            margin: '5, 0, 10, 0',
                            title: '',
                            store: 'st_ha_bond_grid',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    text: 'Name'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_ha_physical_linkAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_ha_physical_linkBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_xtm_ha_physical_linkAfterRender: function(component, eOpts) {
        // onPnl_xtm_ha_physical_linkAfterRender =======================================================================================================================================
        //
        // 일시 : 2014.06.16
        //
        // 설명 : HA 지점 데이터를 설정된 모드에 맞게 출력합니다. 사용하는 파라미터는 ha_branch_script 입니다. 데이터가 없을 경우 ha_branch_script = null 로 데이터가 표현됩니다.
        //
        // =============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var devStore     = Ext.getStore('st_common_deveth');
        var linkStore    = Ext.getStore('st_ha_link_grid');
        var bondStore    = Ext.getStore('st_ha_bond_grid');

        component.on('validitycheck', this.validityCheck);

        this.makeComponent();

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                for(var i = 0; i < deviceData.link_pack.length; i++){

                    var ethArray = {};

                    var record   = linkStore.getAt(i);

                    for(var j = 0; j < devStore.count(); j++){

                        var tmpCol  = '@chk_' + devStore.getAt(j).get('eth');

                        ethArray[tmpCol] = (deviceData.link_pack[i]['interface'][tmpCol] === 'on') ? true : false;

                    }

                    record.set(ethArray);

                }

                for(var i = 0; i < deviceData.bond_pack.length; i++){

                    var ethArray = {};

                    var record   = bondStore.getAt(i);

                    for(var j = 0; j < devStore.count(); j++){

                        var tmpCol  = '@chk_' + devStore.getAt(j).get('eth');

                        ethArray[tmpCol] = (deviceData.bond_pack[i]['interface'][tmpCol] === 'on') ? true : false;

                    }

                    record.set(ethArray);

                }

                linkStore.sync();
                bondStore.sync();

            }

        }
        catch(err){

            console.log('HA 물리 링크 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_ha_physical_linkBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var component = Ext.getCmp('pnl_xtm_ha_physical_link');

        var linkGrid  = component.down('[itemId=gpn_ha_link]');
        var bondGrid  = component.down('[itemId=gpn_ha_bond]');

        return function(){

            var obj = {};

            obj.linkGrid = linkGrid;
            obj.bondGrid = bondGrid;

            return obj;

        }();
    },

    duplicateEthCheck: function(component, rowIndex, type) {
        // duplicateEthCheck ====================================================================================================================
        //
        // 일시 : 2014.07.04
        //
        // 설명 : HA 물리적 링크의 ETH 중복 검사를 수행합니다. LINK 그리드의 스토어와 BOND 그리드의 스토어를 조회하여 체크 값이 true인 경우 에러 메세지를 출력합니다.
        //       beforechange 이벤트를 사용한 이유는 checkboxchange 이벤트 사용시 중복검사에 검색되는 것과 무관하게 상태를 변경하기 때문입니다.
        //       beforechange 이벤트는 리턴 값을 false로 반환하면 해당 열에 있는 모든 checkbox의 값이 false로 설정됩니다.
        //       따라서, 기존에 설정되어있는 체크박스의 인덱스를 validitycheck 이벤트에 넘겨주면 인덱스에 해당하는 컬럼의 check 값을 true로 변경합니다.
        //
        // - link, bond 에서 사용하는 인터페이스 중복 검사
        //
        // ======================================================================================================================================

        var linkStore = Ext.getStore('st_ha_link_grid');
        var bondStore = Ext.getStore('st_ha_bond_grid');

        var me = this;

        for(var i = 0; i < linkStore.count(); i++){

            var errorObj = {};

            if(i === rowIndex && type === 'link'){

                continue;

            }

            if(linkStore.getAt(i).get(component.dataIndex)){

                Ext.Msg.show({

                    title : '물리적 링크 적용 에러',
                    msg : '이미 사용하고 있는 인터페이스 입니다.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                errorObj[component.dataIndex] = false;

                linkStore.getAt(i).set(errorObj);

                me.fireEvent('validitycheck', i, 'link', component.dataIndex);

                return false;

            }

        }

        for(var i = 0; i < bondStore.count(); i++){

            var errorObj = {};

            if(i === rowIndex && type === 'bond'){

                continue;

            }

            if(bondStore.getAt(i).get(component.dataIndex)){

                Ext.Msg.show({

                    title : '물리적 링크 적용 에러',
                    msg : '이미 사용하고 있는 인터페이스 입니다.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                errorObj[component.dataIndex] = false;

                bondStore.getAt(i).set(errorObj);

                me.fireEvent('validitycheck', i, 'bond', component.dataIndex);

                return false;

            }

        }
    },

    makeComponent: function() {
        // makeComponent ================================================================================================================================================================
        //
        // 일시 : 2014.07.04
        //
        // 설명 : 장비의 인터페이스의 갯수에 따라 체크박스 컬럼을 생성합니다. 기본 값은 0부터 25까지 입니다.
        //
        // ==============================================================================================================================================================================

        var linkStore  = Ext.getStore('st_ha_link_grid');
        var bondStore  = Ext.getStore('st_ha_bond_grid');
        var devEth     = Ext.getStore('st_common_deveth');

        var component  = this.componentStorage();

        var linkField  = [];
        var linkColumn = [];

        var bondField  = [];
        var bondColumn = [];

        var tmpColumn_name = {};

        tmpColumn_name.width  = 80;
        tmpColumn_name.text  = 'name';
        tmpColumn_name.dataIndex = 'name';

        linkColumn.push(tmpColumn_name);
        bondColumn.push(tmpColumn_name);

        var me = this;

        linkField.push('name');

        // Link 팩 설정 ==================================================================================================================================================================

        for(var f = 0; f < devEth.count(); f++){

            var ethCol = '@chk_' + devEth.getAt(f).get('eth');

            linkField.push(ethCol);

        }

        var model = linkStore.model;

        model.setFields(linkField);

        // 데이터 초기화 ==================================================================================================================================================================

        var linkArray = [];

        for(var s = 0; s < 5; s++){

            var tmpLink    = {};

            tmpLink.name   = 'pack' + ( s+1 );
            tmpLink['interface'] = {};

            for(var m = 0; m < devEth.count(); m++){

                var ethCol = '@chk_' + devEth.getAt(m).get('eth');

                tmpLink['interface'][ethCol] = 'off';
            }

            linkArray.push(tmpLink);

        }

        linkStore.loadData(linkArray);

        // 그리드 구현 ====================================================================================================================================================================

        Ext.each(devEth.data.items, function(ethData, idx){

            var colObj = {};

            colObj.dataIndex = '@chk_' + devEth.getAt(idx).get('eth');
            colObj.text      = devEth.getAt(idx).get('eth');
            colObj.width     = 50;
            colObj.xtype     = 'checkcolumn';
            colObj.listeners = {

                beforecheckchange : {

                    fn: function(component, rowIndex){

                        return me.duplicateEthCheck(component, rowIndex, 'link');

                    }

                }

            };

            linkColumn.push(colObj);

        });

        // Bond 팩 설정 ==================================================================================================================================================================

        bondField.push('name');

        for(var f = 0; f < devEth.count(); f++){

            var ethCol = '@chk_' + devEth.getAt(f).get('eth');

            bondField.push(ethCol);

        }

        var model = bondStore.model;

        model.setFields(bondField);

        var bondArray = [];

        for(var s = 0; s < 4; s++){

            var tmpLink    = {};

            tmpLink.name   = 'Group' + ( s+1 );
            tmpLink['interface'] = {};

            for(var m = 0; m < devEth.count(); m++){

                var ethCol = '@chk_' + devEth.getAt(m).get('eth');

                tmpLink['interface'][ethCol] = 'off';

            }

            bondArray.push(tmpLink);

        }

        bondStore.loadData(bondArray);

        Ext.each(devEth.data.items, function(ethData, idx){

            var colObj = {};

            colObj.dataIndex = '@chk_' + devEth.getAt(idx).get('eth');
            colObj.text      = devEth.getAt(idx).get('eth');
            colObj.id        = 'chk_bond_' + idx;
            colObj.width     = 50;
            colObj.xtype     = 'checkcolumn';
            colObj.listeners = {

                beforecheckchange: {

                    fn: function(component, rowIndex){

                        return me.duplicateEthCheck(component, rowIndex, 'bond');

                    }

                }

            };

            bondColumn.push(colObj);

        });

        component.linkGrid.reconfigure(linkStore, linkColumn);
        component.bondGrid.reconfigure(bondStore, bondColumn);
    },

    validityCheck: function(idx, type, fieldname) {
        // validityCheck =================================================================================================================================================================
        //
        // 일시 : 2014.07.04
        //
        // 설명 : 중복 값이 검색되면 이전에 선택된 체크박스를 true로 변경합니다. 자세한 설명은 duplicateEthCheck에 작성되어있습니다.
        //
        // ===============================================================================================================================================================================

        var bondStore = Ext.getStore('st_ha_bond_grid');
        var linkStore = Ext.getStore('st_ha_link_grid');

        var linkData = {};
        var bondData = {};

        if(type === 'bond'){

            bondData[fieldname] = true;

            bondStore.getAt(idx).set(bondData);

        }
        else{

            linkData[fieldname] = true;

            linkStore.getAt(idx).set(linkData);

        }

        bondStore.sync();
        linkStore.sync();
    },

    saveData: function() {
        var component     = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var dataFlag      = false;

        var linkStore     = Ext.getStore('st_ha_link_grid');
        var bondStore     = Ext.getStore('st_ha_bond_grid');
        var devStore      = Ext.getStore('st_common_deveth');

        // linkPack 초기화 ==============================================================================================================================================================

        delete deviceAllData.link_pack_script;

        for(var i = 0; i < linkStore.count(); i++){

            for(var j = 0; j < devStore.count(); j++){

                var keyStr = '@chk_' + devStore.getAt(i).get('eth');

                if(linkStore.getAt(i).data[keyStr] === true){

                    dataFlag = true;

                    break;

                }

            }

        }

        if(!dataFlag){

            for(var i = 0; i < bondStore.count(); i++){

                for(var j = 0; j < devStore.count(); j++){

                    var keyStr = '@chk_' + devStore.getAt(i).get('eth');

                    if(bondStore.getAt(i).data[keyStr] === true){

                        dataFlag = true;

                        break;

                    }

                }

            }

        }


        if(dataFlag){

            deviceAllData.link_pack_script = {};

            deviceAllData.link_pack_script.bond_pack = [];
            deviceAllData.link_pack_script.link_pack = [];

            for(var i = 0; i < linkStore.count(); i++){

                var tmpLinkObj = {};

                tmpLinkObj.name = linkStore.getAt(i).get('name');
                tmpLinkObj['interface'] = {};

                for(var j = 0; j < devStore.count(); j++){

                    var keyStr = '@chk_eth' + j;

                    tmpLinkObj['interface'][keyStr] = (linkStore.getAt(i).data[keyStr] === true) ? "on" : "off";

                }

                deviceAllData.link_pack_script.link_pack.push(tmpLinkObj);

            }

            for(var i = 0; i < bondStore.count(); i++){

                var tmpBondObj = {};

                tmpBondObj.name = bondStore.getAt(i).get('name');
                tmpBondObj['interface'] = {};

                for(var j = 0; j < devStore.count(); j++){

                    var keyStr = '@chk_eth' + j;

                    tmpBondObj['interface'][keyStr] = (bondStore.getAt(i).data[keyStr] === true) ? "on" : "off";

                }

                deviceAllData.link_pack_script.bond_pack.push(tmpBondObj);

            }

        }
        else{

            deviceAllData.link_pack_script = null;

        }

        linkStore.sync();
        bondStore.sync();

        return true;
    },

    initStore: function() {
        var physicalStore = Ext.getStore('st_ha_physical');
        var linkStore     = Ext.getStore('st_ha_link_grid');
        var bondStore     = Ext.getStore('st_ha_bond_grid');

        physicalStore.removeAll();
        linkStore.removeAll();
        bondStore.removeAll();
    }

});