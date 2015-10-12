
Ext.define('SMC.view.pnl_object_user_group', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.Text',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.toolbar.Paging',
        'Ext.button.Button',
        'Ext.grid.column.Action'
    ],

    border: false,
    height: 550,
    itemId: 'pnl_object_user_group',
    minHeight: 550,
    minWidth: 1000,
    padding: '0 20 10 20',
    width: 1200,
    resizable: true,
    constrainHeader: true,
    title: '사용자 그룹',
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
                    flex: 1,
                    itemId: 'ctn_user_group',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '10 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){return false; }
                                        return true;
                                    },
                                    flex: 0.2,
                                    itemId: 'txf_objectName',
                                    margin: '0 10 0 0 ',
                                    fieldLabel: '객체명',
                                    labelAlign: 'top',
                                    msgTarget: 'none'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 0.4,
                                    itemId: 'txf_objectDesc',
                                    fieldLabel: '기타 설명',
                                    labelAlign: 'top'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1.2,
                            border: false,
                            margin: '0 0 10 0',
                            header: false,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 0.5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'treepanel',
                                            getGridList: function(type, data, option) {
                                                var me = this.up('window[itemId="pnl_object_user_group"]');

                                                var object_tree = this;
                                                var _grid = me.down('gridpanel[itemId="gpn_object_grid"]');
                                                var _gStore = _grid.getStore();
                                                var select_data = me.down('gridpanel[itemId="gpn_object_select_grid"]').getSelectionModel().getSelection()[0];

                                                switch(type)
                                                {
                                                    case 'add':

                                                    if(data['@cid'] !== "00000000000000000000000000000000")
                                                    {
                                                        _gStore.getProxy().extraParams = {
                                                            g_cid : Ext.encode(data['@groupcid'])
                                                        };

                                                        _gStore.loadPage(_gStore.currentPage);
                                                    }

                                                    break;
                                                    case 'mod':

                                                    if(data)
                                                    {
                                                        _gStore.each(function(store_data, idx){

                                                            if(data['@cid'] === store_data.data['@cid'])
                                                            {
                                                                store_data.set('name', data.name);
                                                                store_data.set('desc', data.desc);
                                                                store_data.commit();
                                                                return false;
                                                            }

                                                        });
                                                    }

                                                    break;
                                                    case 'del':

                                                    if(option.length < 1)
                                                    {
                                                        Ext.each(data, function(record, idx){

                                                            _gStore.remove(record);
                                                        });
                                                    }
                                                    else if(data.length > option.length)
                                                    {
                                                        var fail_array = [];

                                                        Ext.each(option, function(fail_record){
                                                            fail_array.push(fail_record['@cid']);
                                                        });

                                                        Ext.each(data, function(record, idx){

                                                            if(fail_array.indexOf(record.data['@cid']) < 0)
                                                            {
                                                                _gStore.remove(record);
                                                            }
                                                        });
                                                    }

                                                    break;
                                                    case 'treeSelect':

                                                    if(_gStore.getProxy().url !== 'api/ftSMC/getObjectList/')
                                                    {
                                                        _gStore.getProxy().url = 'api/ftSMC/getObjectList/';
                                                    }

                                                    if(object_tree.select_grid_click && select_data)
                                                    {
                                                        _gStore.getProxy().extraParams = {
                                                            g_cid : Ext.encode(data.raw.cid),
                                                            isRecursive : false
                                                        };

                                                        _gStore.loadPage(1, {
                                                            callback: function(){
                                                                object_tree.searchObject(data.raw.cid, _gStore, _grid, object_tree, select_data);
                                                            }
                                                        });
                                                    }
                                                    else
                                                    {
                                                        _gStore.getProxy().extraParams = {
                                                            g_cid : Ext.encode(data.raw.cid),
                                                            isRecursive : true
                                                        };
                                                        _gStore.loadPage(1);
                                                    }

                                                    break;
                                                }
                                            },
                                            searchObject: function(g_cid, object_store, object_grid, object_tree, select_data) {
                                                var me = this.up('window[itemId="pnl_object_user_group"]');

                                                var treeObj = this;

                                                var ctn_group = me.down('container[itemId="ctn_user_group"]');

                                                var _svc = 'ftSMC',
                                                    _func = 'getObjectList',
                                                    _params = {
                                                        g_cid : Ext.encode(g_cid),
                                                        start : 0,
                                                        limit : Ext.encode(object_store.totalCount)
                                                    };

                                                ctn_group.setLoading(true);

                                                request_helper.xmlrpc_call_Ajax_Post(
                                                _svc,
                                                _func,
                                                _params,
                                                function(response){

                                                    ctn_group.setLoading(false);

                                                    var pageNumber = 1;

                                                    Ext.each(response.result, function(data, idx){

                                                        if(data['@cid'] === select_data.data['#text'])
                                                        {
                                                            if(idx > 100)
                                                            {
                                                                pageNumber = parseInt(idx/100) + 1;
                                                            }
                                                            return false;
                                                        }
                                                    });

                                                    object_store.loadPage(pageNumber, {
                                                        callback: function(){

                                                            object_store.each(function(obj_data, idx2){

                                                                if(obj_data.data['@cid'] === select_data.data['#text'])
                                                                {
                                                                    treeObj.select_grid_click = false;

                                                                    object_grid.getSelectionModel().select(idx2);
                                                                    return false;
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                                );

                                            },
                                            searchChildGroup: function(cid, childNodes) {
                                                var me = this.up('window[itemId="pnl_object_svc_group"]');

                                                var treeObj = this;

                                                for(var i=0; i<childNodes.length; i++)
                                                {
                                                    if(cid === childNodes[i].raw.cid)
                                                    {
                                                        if(!treeObj.select_grid_click)
                                                        {
                                                            treeObj.select_grid_click = true;
                                                        }

                                                        if(treeObj.getSelectionModel().getSelection()[0])
                                                        {
                                                            treeObj.getSelectionModel().deselect(treeObj.getSelectionModel().getSelection()[0], true);
                                                        }

                                                        treeObj.tree_expand(childNodes[i]);

                                                        treeObj.getSelectionModel().select(childNodes[i], true);

                                                        return false;
                                                    }

                                                    if(childNodes[i].childNodes.length > 0)
                                                    {
                                                        treeObj.searchChildGroup(cid, childNodes[i].childNodes);
                                                    }
                                                }
                                            },
                                            tree_expand: function(_node) {
                                                var treeObj = this;
                                                var _parent = _node.parentNode;

                                                if(_parent === null || typeof _parent === 'undefined'){
                                                    return;
                                                } else {
                                                    treeObj.expandNode(_parent);
                                                    treeObj.tree_expand(_parent);
                                                }
                                            },
                                            flex: 1,
                                            itemId: 'trpn_object_tree',
                                            margin: '0 10 5 0',
                                            autoScroll: true,
                                            title: '',
                                            rootVisible: false,
                                            useArrows: true,
                                            viewConfig: {

                                            },
                                            listeners: {
                                                select: {
                                                    fn: me.onTrpn_object_treeSelect,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_all_search',
                                            margin: '1 10 1 0',
                                            fieldLabel: '',
                                            boxLabel: '전체 목록에서 검색',
                                            checked: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            itemId: 'gpn_object_grid',
                                            margin: '0 10 4 0',
                                            autoScroll: true,
                                            header: false,
                                            title: '',
                                            store: 'st_ObjectGroupGrid',
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    width: 50,
                                                    resizable: true,
                                                    align: 'center',
                                                    text: 'No'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = 'ico_' + record.data._kind + '_16';
                                                        return value;
                                                    },
                                                    width: 150,
                                                    dataIndex: 'name',
                                                    text: '추가 객체명'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 221,
                                                    dataIndex: 'desc',
                                                    text: '객체 설명',
                                                    flex: 1
                                                }
                                            ],
                                            listeners: {
                                                itemdblclick: {
                                                    fn: me.onGpn_ipv4_gridItemDblClick,
                                                    scope: me
                                                }
                                            },
                                            dockedItems: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    dock: 'bottom',
                                                    itemId: 'ptb_objectList',
                                                    margin: '0 0 1 0',
                                                    width: 360,
                                                    afterPageText: '전체 페이지 {0}',
                                                    beforePageText: '페이지',
                                                    displayInfo: true,
                                                    displayMsg: '{2} 결과 중 {0} - {1}',
                                                    emptyMsg: '결과 없음',
                                                    firstText: '처음 페이지',
                                                    lastText: '마지막 페이지',
                                                    nextText: '다음 페이지',
                                                    prevText: '이전 페이지',
                                                    refreshText: '새로고침',
                                                    store: 'st_ObjectGroupGrid'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 3.5,
                                                    itemId: 'txf_search',
                                                    margin: '1 10 1 0',
                                                    fieldLabel: '',
                                                    labelWidth: 80
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_user_group"]');

                                                        var search_name = me.down('textfield[itemId="txf_search"]').getValue();
                                                        var grid = me.down('gridpanel[itemId="gpn_object_grid"]');
                                                        var _gStore = grid.getStore();
                                                        var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');
                                                        var _kind = ['obj_usr_list'];

                                                        if(search_name)
                                                        {
                                                            if(me.down('checkbox[itemId="ck_all_search"]').checked)
                                                            {
                                                                var condition = {
                                                                    name : search_name,
                                                                    op_in : true,
                                                                    kind : _kind
                                                                };

                                                                if(condition)
                                                                {
                                                                    _gStore.getProxy().extraParams = {
                                                                        condition : Ext.encode(condition)
                                                                    };

                                                                    if(_gStore.getProxy().url !== 'api/ftSMC/findObjectList/')
                                                                    {
                                                                        _gStore.getProxy().url = 'api/ftSMC/findObjectList/';
                                                                    }

                                                                    _gStore.loadPage(1,{
                                                                        callback: function(){
                                                                            treeObj.getSelectionModel().deselectAll();
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                            else
                                                            {
                                                                _gStore.filterBy(function(record){

                                                                    if(record.data.name.match(search_name))
                                                                    return true;
                                                                    else
                                                                    return false;
                                                                });
                                                            }

                                                        }
                                                    },
                                                    margin: '1 10 1 0',
                                                    width: 100,
                                                    text: '검색'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 0.6,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            itemId: 'gpn_object_select_grid',
                                            margin: '0 0 5 0',
                                            autoScroll: true,
                                            title: '',
                                            store: 'st_ObjectSelectGrid',
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    width: 30,
                                                    align: 'center'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = 'ico_' + record.data.kind + '_16';
                                                        return value;
                                                    },
                                                    defaultWidth: 180,
                                                    weight: 180,
                                                    dataIndex: '@name',
                                                    text: '선택된 객체 목록',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 30,
                                                    align: 'center',
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                view.up('window[itemId="pnl_object_user_group"]').down('gridpanel[itemId="gpn_object_select_grid"]').getStore().removeAt(rowIndex);
                                                            },
                                                            iconCls: 'ico_grid_row_delete'
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                itemdblclick: {
                                                    fn: me.onGpn_object_select_gridItemDblClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_user_group"]');

                                                        var object_grid = me.down('gridpanel[itemId="gpn_object_grid"]');
                                                        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();
                                                        var record = object_grid.getSelectionModel().getSelection()[0];

                                                        if(record)
                                                        {
                                                            if(!Object_DuplicateCheck(record.data['@cid'], '#text', select_store))
                                                            {
                                                                alertMessage('[ ' + record.data.name + '] ' + '동일한 객체를 사용하고 있습니다.');
                                                                return false;
                                                            }

                                                            if(record.data['@cid'] === me.object['@cid'])
                                                            {
                                                                alertMessage('그룹 객체로 자기 자신을 추가할 수 없습니다. ' + '[ ' + record.data.name + '] ');
                                                                return false;
                                                            }

                                                            var _svc = 'ftSMC',
                                                                _func = 'getObject',
                                                                _params = {
                                                                    cid : Ext.encode(record.data['@cid'])
                                                                };

                                                            request_helper.xmlrpc_call_Ajax_Post(
                                                            _svc,
                                                            _func,
                                                            _params,
                                                            function(response){

                                                                select_store.add({
                                                                    '#text': response['@cid'],
                                                                    '@name': response.name,
                                                                    'kind': response._kind

                                                                });
                                                            }
                                                            );
                                                        }
                                                    },
                                                    flex: 1,
                                                    margin: '1 10 1 0',
                                                    maxWidth: 100,
                                                    text: '추가'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_user_group"]');

                                                        var object_grid = me.down('gridpanel[itemId="gpn_object_select_grid"]');
                                                        var record = object_grid.getSelectionModel().getSelection()[0].data;
                                                        var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');
                                                        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();
                                                        var object_window = Ext.create('SMC.view.pnl_object_user');

                                                        if(object_window)
                                                        {
                                                            var _svc = 'ftSMC',
                                                                _func = 'getObject',
                                                                _params = {
                                                                    cid : Ext.encode(record['#text'])
                                                                };

                                                            request_helper.xmlrpc_call_Ajax_Post(
                                                            _svc,
                                                            _func,
                                                            _params,
                                                            function(response){

                                                                object_window.loadData(response);

                                                                object_window.on('destroy', function() {

                                                                    select_store.each(function(record,idx){

                                                                        if(record.data['#text'] === object_window.object['@cid'])
                                                                        {
                                                                            record.set('@name', object_window.object.name);

                                                                            record.commit();

                                                                            return false;
                                                                        }
                                                                    });

                                                                    treeObj.getGridList('mod', object_window.object);
                                                                });
                                                            }
                                                            );
                                                        }
                                                    },
                                                    flex: 1,
                                                    margin: '1 10 1 0',
                                                    maxWidth: 100,
                                                    text: '수정'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_user_group"]');

                                                        var select_record = me.down('gridpanel[itemId="gpn_object_select_grid"]').getSelectionModel().getSelection()[0];
                                                        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

                                                        delObject(select_record, '#text', select_store);
                                                    },
                                                    flex: 1,
                                                    margin: '1 10 1 0',
                                                    maxWidth: 100,
                                                    text: '삭제'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_user_group"]');

                                                        var search_name;
                                                        var grid_data = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore().data.items;
                                                        var grid_model = me.down('gridpanel[itemId="gpn_object_select_grid"]').getSelectionModel();

                                                        search_grid(search_name, grid_data, grid_model);
                                                    },
                                                    flex: 1,
                                                    margin: 1,
                                                    maxWidth: 100,
                                                    text: '검색'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_user_group"]').saveData();
                                    },
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_user_group"]').destroy();
                                    },
                                    margin: 1,
                                    width: 100,
                                    text: '취소'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_object_user_groupAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_user_groupBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTrpn_object_treeSelect: function(rowmodel, record, index, eOpts) {
        this.down('treepanel[itemId="trpn_object_tree"]').getGridList('treeSelect', record);
    },

    onGpn_ipv4_gridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var me = this;

        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

        if(record)
        {
            if(!Object_DuplicateCheck(record.data['@cid'], '#text', select_store))
            {
                alertMessage('[ ' + record.data.name + '] ' + '동일한 오브젝트를 사용하고 있습니다.');
                return false;
            }

            if(record.data['@cid'] === me.object['@cid'])
            {
                alertMessage('그룹 오브젝트로 자기 자신을 추가할 수 없습니다. ' + '[ ' + record.data.name + '] ');
                return false;
            }

            var _svc = 'ftSMC',
                _func = 'getObject',
                _params = {
                    cid : Ext.encode(record.data['@cid'])
                };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    select_store.add({
                        '#text': response['@cid'],
                        '@name': response.name,
                        'kind': response._kind
                    });
                }
            );
        }



    },

    onGpn_object_select_gridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var me = this;

        var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');

        var _svc = 'ftSMC',
            _func = 'getObject',
            _params = {
                cid : Ext.encode(record.data['#text'])
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response)
                {
                    treeObj.getSelectionModel().store.each(function(data, idx){

                        if(data.raw.gtype === response._kind)
                        {
                            if(data.raw.cid === response['@groupcid'])
                            {
                                if(!treeObj.select_grid_click)
                                {
                                    treeObj.select_grid_click = true;
                                }

                                if(treeObj.getSelectionModel().getSelection()[0])
                                {
                                    treeObj.getSelectionModel().deselect(treeObj.getSelectionModel().getSelection()[0], true);
                                }

                                treeObj.tree_expand(data);

                                treeObj.getSelectionModel().select(data, true);

                                return false;
                            }
                            else if(data.childNodes.length > 0)
                            {
                                treeObj.searchChildGroup(response['@groupcid'], data.childNodes);
                            }
                        }
                    });
                }
            }
        );
    },

    onPnl_object_user_groupAfterRender: function(component, eOpts) {
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
                'children' : null,
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
            }
        ];

        var contextCallback = function(menuInstance){

            var tree_select = component.down('treepanel[itemId="trpn_object_tree"]').getSelectionModel().getSelection()[0];
            var grid_select = component.down('gridpanel[itemId="gpn_object_grid"]').getSelectionModel().getSelection()[0];

            if(tree_select)
            {
                menuInstance.down('[itemId=id_objectAdd]').enable();
                menuInstance.down('[itemId=id_objectMod]').enable();
                menuInstance.down('[itemId=id_objectDel]').enable();

                if(!grid_select)
                {
                    menuInstance.down('[itemId=id_objectMod]').disable();
                    menuInstance.down('[itemId=id_objectDel]').disable();
                }

                if(!tree_select.raw._kind)
                {
                    menuInstance.down('[itemId=id_objectAdd]').disable();
                }
            }
            else
            {
                menuInstance.down('[itemId=id_objectAdd]').disable();
                menuInstance.down('[itemId=id_objectMod]').disable();
                menuInstance.down('[itemId=id_objectDel]').disable();
            }

        };

        makeContextMenu({'itemId' : 'mn_obj_context', 'width' : 180, 'border' : false}, component, contextCallback, obj_Context_Array);

    },

    onPnl_object_user_groupBeforeDestroy: function(component, eOpts) {
        if(!component.isNew)
        {
            var _svc = 'ftSMC',
                _func = 'clrObject',
                _params = {
                    cid : Ext.encode(component.object['@cid'])
                };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){
                }
            );
        }
    },

    loadData: function(record) {
        var me = this;

        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();
        var tree = me.down('treepanel[itemId="trpn_object_tree"]');
        var ctn_group = me.down('container[itemId="ctn_user_group"]');

        me.down('gridpanel[itemId="gpn_object_grid"]').getStore().removeAll();
        select_store.removeAll();

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        me.object = record;

        var _svc = 'ftSMC',
            _func = 'getGroup',
            _params = {
                gtype : Ext.encode('obj_usr')
            };

        me.show();

        ctn_group.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                ctn_group.setLoading(false);

                for(var i=0; i<response.children.length; i++)
                {
                    if(response.children[i].gtype !== 'obj_usr_list')
                    {
                        response.children.splice(i,1);
                        i = -1;
                    }
                }

                tree_children_expand(response.children);

                tree.setRootNode(response);
                tree.getView().refresh();

                if(!me.isNew)
                {
                    Ext.each(record.member, function(data, idx){

                        var _svc = 'ftSMC',
                            _func = 'getObject',
                            _params = {
                                cid : Ext.encode(data)
                            };

                        request_helper.xmlrpc_call_Ajax_Post(
                            _svc,
                            _func,
                            _params,
                            function(response){

                                select_store.add({
                                    '@name': response.name,
                                    '#text': response['@cid'],
                                    'kind': response._kind
                                });
                            }
                        );
                    });
                }
            }
        );
    },

    saveData: function() {
        var me = this;

        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

        if(me.down('textfield[itemId="txf_objectName"]').validate())
        {
            me.object.name = me.down('textfield[itemId="txf_objectName"]').getValue();
        }
        else
        {
            alertMessage('객체명을 입력하시오.', me.down('textfield[itemId="txf_objectName"]'));
            return false;
        }

        if(me.down('textfield[itemId="txf_objectDesc"]').getValue())
        {
            me.object.desc = me.down('textfield[itemId="txf_objectDesc"]').getValue();
        }
        else
        {
            me.object.desc = null;
        }

        if(select_store.getCount() > 0)
        {
            var object_member = [];

            select_store.each(function(record, idx){

                object_member.push(record.data['#text']);
            });

            me.object.member = object_member;

            me.object['@count'] = select_store.getCount();
        }
        else
        {
            alertMessage('리스트에 데이터가 없습니다.');
            return false;
        }

        var _svc = 'ftSMC',
            _func,
            _params;

        if(me.isNew)
        {
            _func = 'addObject';
            _params = {
                obj : Ext.encode(me.object),
                g_cid : Ext.encode(me.object['@groupcid'])
            };
        }
        else
        {
            _func = 'modObject';
            _params = {
                obj : Ext.encode(me.object)
            };
        }

        var ctn_group = me.down('container[itemId="ctn_user_group"]');

        ctn_group.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                ctn_group.setLoading(false);

                if(response)
                {
                    if((_func === 'addObject') && response)
                    {
                        me.object['@cid'] = response;
                    }

                    if(typeof me.closeEvent === 'function'){
                        me.closeEvent();
                    }

                    me.destroy();
                }
            }
        );
    },

    addObject: function() {
        var me = this;

        var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');
        var record = treeObj.getSelectionModel().getSelection()[0];
         var object_window;

        if(record)
        {
            object_window = Ext.create('SMC.view.pnl_object_user');

            if(object_window)
            {
                var _svc = 'ftSMC',
                    _func = 'getObjectDefault',
                    _params = {
                        kind : Ext.encode(record.raw._kind)
                    };

                request_helper.xmlrpc_call_Ajax_Post(
                    _svc,
                    _func,
                    _params,
                    function(response){

                        response['@groupcid'] = record.raw.cid;
                        object_window.isNew = true;
                        object_window.loadData(response);

                        object_window.on('destroy', function() {
                            treeObj.getGridList('add', object_window.object);
                        });
                    }
                );
            }
        }
    },

    modObject: function() {
        var me = this;

        var object_grid = me.down('gridpanel[itemId="gpn_object_grid"]');
        var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');
        var record = object_grid.getSelectionModel().getSelection()[0];
        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();
        var object_window;

        if(record)
        {
            var _svc = 'ftSMC',
                _func = 'getObject',
                _params = {
                    cid : Ext.encode(record.data['@cid'])
                };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    if(response)
                    {
                        object_window = Ext.create('SMC.view.pnl_object_user');
                        object_window.loadData(response);

                        object_window.on('destroy', function() {

                            select_store.each(function(record,idx){

                                if(record.data['#text'] === object_window.object['@cid'])
                                {
                                    record.set('@name', object_window.object.name);

                                    record.commit();

                                    return false;
                                }
                            });

                            treeObj.getGridList('mod', object_window.object);
                        });
                    }
                }
            );
        }

    },

    delObject: function() {
        var me = this;

        var me_objectList = Ext.getCmp('pnl_objectList');
        var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');
        var gridObj = me.down('gridpanel[itemId="gpn_object_grid"]');
        var record = gridObj.getSelectionModel().getSelection()[0];
        var fail_array = [];

        if(record)
        {
            Ext.MessageBox.show({
                title:'삭제',
                msg: '삭제 하시겠습니까?',
                buttonText: {yes: "확인",no: "취소"},
                fn: function(btn){
                    if(btn === 'yes')
                    {
                        var _svc = 'ftSMC',
                            _func = 'delObject',
                            _params = {
                                cid : Ext.encode(record.data['@cid'])
                            };

                        request_helper.xmlrpc_call_Ajax_Post(
                            _svc,
                            _func,
                            _params,
                            function(response){

                                if(treeObj)
                                    treeObj.getGridList(treeObj.getSelectionModel().getSelection()[0]);
                                else
                                    me.destroy();

                                if(response.errorList)
                                {
                                    fail_array.push(response.errorList[0]);
                                }

                                if(fail_array.length > 0)
                                {
                                    var object_window = Ext.create('SMC.view.pnl_object_delete_fail');
                                    var copy_store = Ext.create('Ext.data.Store', {
                                        storeId: 'st_ObjectGroupGridCopy',
                                        fields: [
                                            {
                                                name: 'name'
                                            },
                                            {
                                                name: 'desc'
                                            },
                                            {
                                                name: '@cid'
                                            },
                                            {
                                                name: '_kind'
                                            }
                                        ]
                                    });
                                    object_window.down('gridpanel[itemId="gpn_object_grid"]').reconfigure(copy_store);

                                    object_window.loadData(fail_array);
                                }

                                treeObj.getGridList('del', record, fail_array);
                            }
                        );
                    }
                }
            });
        }
    }

});