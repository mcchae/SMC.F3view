
Ext.define('SMC4ZEN.view.pnl_objectListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pnl_objectList',

    onTool_smc_object_controlAfterRender: function(component, eOpts) {
        var me_objectList = Ext.getCmp('pnl_objectList');

        var addBtn = component.down('[itemId=addObject]');
        var modBtn = component.down('[itemId=modObject]');
        var delBtn = component.down('[itemId=delObject]');

        addBtn.on('click', function(){

            me_objectList.addObject();
        });

        modBtn.on('click', function(){

            me_objectList.modObject();
        });

        delBtn.on('click', function(){

            me_objectList.delObject();

        });

    },

    onCmb_ObjectConditionAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('SMC4ZEN.store.st_ObjectCBCondition'));
    },

    onTxf_ObjectSearchTextKeypress: function(textfield, e, eOpts) {
        // 2015.06.08 김민수 - 검색 함수 재정의 ================================================================================================================================================================================
        //
        // 일 시 : 2015.06.08
        //
        // 설 명 : findObject를 Tree Select 에서 사용할 수 있도록 재정의함
        //
        // =================================================================================================================================================================================================================

        var treeSel = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0];

        var tool_search = textfield.up('[itemId=tool_obj_search]');

        var chkCond = tool_search.down('[itemId=ck_ObjectCondition]').getValue();
        var searchKey = tool_search.down('[itemId=cmb_ObjectCondition]').getValue();
        var searchValue = textfield.getValue();

        if(e.getKey() === e.ENTER){

            tool_search.findObjectList(treeSel, chkCond, searchKey, searchValue);

        }
    },

    onPnl_objectListAfterRender: function(component, eOpts) {
        addExporter(component, 'exportGrid', '#gpn_objectList', Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0], 'excel');

        var obj_Context_Array = [

        {
            'name' : '객체 등록',
            'itemId' : 'id_objectAdd',
            'children' : null,
            'callback' : function(){
                component.addObject();
            }
        },
        {
            'name' : '객체 수정',
            'itemId' : 'id_objectMod',
            'children': null,
            'callback' : function(){
                component.modObject();
            }
        },
        {
            'name' : '객체 삭제',
            'itemId' : 'id_objectDel',
            'children' : null,
            'callback' : function(){
                component.delObject();
            }
        },
        {
            'name' : '객체 복사',
            'itemId' : 'id_objectCopy',
            'children' : null,
            'callback' : function(){
                component.copyObject();
            }
        },
        {
            'name' : '연결 객체',
            'itemId' : 'id_objectLink',
            'children' : null,
            'callback' : function(){
                component.linkObject();
            }
        },
        {
            'name' : '그룹 찾기',
            'itemId' : 'id_objectSearch',
            'children' : null,
            'callback' : function(){
                component.searchGroup();
            }
        },
        {
            'name' : '엑셀 파일로 목록 저장',
            'itemId' : 'id_objectExport',
            'children' : [

            {
                'name' : '현재 목록 저장',
                'itemId' : 'id_objectExportPage',
                'children' : null,
                'callback' : function(){

                    var trpn_menu = component.up().down('[itemId=trpn_objectMenu]');

                    component.exportXlsxlByList('condition', trpn_menu);

                }
            },
            {
                'name' : '전체 목록 저장',
                'itemId' : 'id_objectExportTotal',
                'children' : null,
                'callback' : function(){

                    var trpn_menu = component.up().down('[itemId=trpn_objectMenu]');

                    component.exportXlsxlByList('total', trpn_menu);

                }
            }

            ],
            'callback' : null
        },
        {
            'name' : '객체 일괄 등록',
            'itemId' : 'id_objectScript',
            'children' : null,
            'callback' : function(){
                component.addScript();
            }
        },
        {
            'name' : 'IPSEC 대상 일괄 편집',
            'itemId' : 'id_ipsec_compile',
            'children' : null,
            'callback' : function(){

                component.addBatchIpsecObject();

            }
        }
        ];

        var contextCallback = function(menuInstance){

            var objectList = component.down('gridpanel[itemId="gpn_objectList"]');

            var tree_select = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0];

            menuInstance.down('[itemId=id_objectAdd]').enable();
            menuInstance.down('[itemId=id_objectMod]').enable();
            menuInstance.down('[itemId=id_objectDel]').enable();
            menuInstance.down('[itemId=id_objectCopy]').enable();
            menuInstance.down('[itemId=id_objectLink]').enable();
            menuInstance.down('[itemId=id_objectSearch]').enable();
            menuInstance.down('[itemId=id_objectExport]').enable();
            menuInstance.down('[itemId=id_objectScript]').enable();
            menuInstance.down('[itemId=id_ipsec_compile]').enable();

            if(!objectList.getSelectionModel().getSelection()[0])
            {
                menuInstance.down('[itemId=id_objectSearch]').disable();
            }

            if(tree_select)
            {
                if(!tree_select.raw._kind || tree_select.raw._kind === 'obj_ip_eth')
                {
                    menuInstance.down('[itemId=id_objectAdd]').disable();
                    menuInstance.down('[itemId=id_objectMod]').disable();
                    menuInstance.down('[itemId=id_objectDel]').disable();
                    menuInstance.down('[itemId=id_objectCopy]').disable();
                    menuInstance.down('[itemId=id_objectLink]').disable();
                    menuInstance.down('[itemId=id_objectScript]').disable();
                    menuInstance.down('[itemId=id_ipsec_compile]').disable();
                }
                else
                {
                    if(!objectList.getSelectionModel().getSelection()[0])
                    {
                        menuInstance.down('[itemId=id_objectMod]').disable();
                        menuInstance.down('[itemId=id_objectDel]').disable();
                        menuInstance.down('[itemId=id_objectCopy]').disable();
                        menuInstance.down('[itemId=id_objectLink]').disable();
                        menuInstance.down('[itemId=id_ipsec_compile]').disable();
                    }

                    if(!tree_select.raw._kind)
                    {
                        menuInstance.down('[itemId=id_objectAdd]').disable();
                    }

                    if(tree_select.raw._kind !== 'obj_ip_v4_addr' && tree_select.raw._kind !== 'obj_ip_v6_addr' &&
                    tree_select.raw._kind !== 'obj_svc_port' && tree_select.raw._kind !== 'obj_ipsec_host')
                    {
                        menuInstance.down('[itemId=id_objectScript]').disable();
                    }

                    if(tree_select.raw._kind !== 'obj_ipsec_peer')
                    {
                        menuInstance.down('[itemId=id_ipsec_compile]').disable();
                    }
                }
            }
            else
            {
                menuInstance.down('[itemId=id_objectAdd]').disable();
                menuInstance.down('[itemId=id_objectMod]').disable();
                menuInstance.down('[itemId=id_objectDel]').disable();
                menuInstance.down('[itemId=id_objectCopy]').disable();
                menuInstance.down('[itemId=id_objectLink]').disable();
                menuInstance.down('[itemId=id_objectScript]').disable();
                menuInstance.down('[itemId=id_ipsec_compile]').disable();
            }

        };

        makeContextMenu({'itemId' : 'mn_obj_context', 'width' : 180, 'border' : false}, component, contextCallback, obj_Context_Array);

        var _treeTarget = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0];

        component.groupTreeDropTarget = new Ext.dd.DropTarget(_treeTarget.body.dom ,{
            ddGroup : 'objectlist-to-grouptree',

            notifyEnter: function(ddSource, e, data) {
                _treeTarget.isDD = true;
                _treeTarget.on('itemmouseup', component.onTreeNodeMouseUp, component);
            },

            notifyDrop: function(ddSource, e, data) {
                console.log('drop_record - ',_treeTarget.drop_record);
                component.onTreeNodeMouseUp(null,_treeTarget.drop_record);

                return true;
            }

        });

        var _tv = _treeTarget.getView();

        _tv.on('drop', function(node, data, overModel, dropPosition, eOpts){

            component.onTreeNodeAdd(overModel, data.records[0]);

        });
    }

});
