
Ext.define('SSL.view.pnl_ssl_log', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem',
        'Ext.grid.RowNumberer',
        'Ext.toolbar.Paging'
    ],

    border: false,
    id: 'pnl_ssl_log',
    itemId: 'pnl_ssl_log',
    layout: 'border',
    header: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    region: 'west',
                    split: true,
                    border: false,
                    itemId: 'pnl_ssl_tree',
                    width: 300,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'treepanel',
                            flex: 1,
                            itemId: 'tpn_ssl_tree',
                            width: 250,
                            title: '장비그룹',
                            viewConfig: {

                            }
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_ssl_devices',
                            store: 'st_ssl_devices',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'name',
                                    text: '장비 이름',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 140,
                                    dataIndex: 'ip',
                                    text: 'IP 주소'
                                }
                            ],
                            selModel: Ext.create('Ext.selection.CheckboxModel', {

                            })
                        }
                    ]
                },
                {
                    xtype: 'container',
                    region: 'center',
                    itemId: 'pnl_ssl_log_main',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'toolbar',
                            id: 'tb_search',
                            itemId: 'tb_search',
                            width: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'filter',
                                    itemId: 'filter',
                                    width: 80,
                                    enableToggle: true,
                                    text: '필터',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cbo_search_range',
                                    width: 140,
                                    editable: false,
                                    store: 'st_ssl_range',
                                    valueField: 'index',
                                    listeners: {
                                        change: {
                                            fn: me.onCbo_search_rangeChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    id: 'ctn_ssl_log_date',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: 'dt_ssl_log_start',
                                            width: 140,
                                            editable: false,
                                            format: 'Y-m-d'
                                        },
                                        {
                                            xtype: 'container',
                                            width: 10
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: 'dt_ssl_log_end',
                                            width: 140,
                                            editable: false,
                                            format: 'Y-m-d'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    cls: 'search',
                                    height: 26,
                                    width: 80,
                                    text: '검색',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'export',
                                    height: 26,
                                    width: 80,
                                    text: '저장',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick2,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'export',
                                    height: 26,
                                    width: 80,
                                    text: '백업',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick21,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'export',
                                    height: 26,
                                    width: 80,
                                    text: '복원',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick211,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onTb_searchAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'toolbar',
                            border: false,
                            hidden: true,
                            itemId: 'tb_search_filter1',
                            width: 150,
                            items: [
                                {
                                    xtype: 'label',
                                    width: 80,
                                    text: '사용자 계정 :'
                                },
                                {
                                    xtype: 'cycle',
                                    itemId: 'user',
                                    width: 140,
                                    showText: true,
                                    menu: {
                                        xtype: 'menu',
                                        itemId: 'menu',
                                        width: 120,
                                        items: [
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '0',
                                                itemId: 'contain',
                                                text: '포함한 결과'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '1',
                                                itemId: 'equal',
                                                text: '같은 결과'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '2',
                                                itemId: 'not',
                                                text: '다른 결과'
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txt_user',
                                    width: 200
                                },
                                {
                                    xtype: 'container',
                                    width: 20
                                },
                                {
                                    xtype: 'label',
                                    width: 80,
                                    text: '사용자 IP :'
                                },
                                {
                                    xtype: 'cycle',
                                    itemId: 'ip',
                                    width: 140,
                                    showText: true,
                                    menu: {
                                        xtype: 'menu',
                                        itemId: 'menu',
                                        width: 120,
                                        items: [
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '0',
                                                itemId: 'contain',
                                                text: '포함한 결과'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '1',
                                                itemId: 'equal',
                                                text: '같은 결과'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '2',
                                                itemId: 'not',
                                                text: '다른 결과'
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txt_ip',
                                    width: 200
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            border: false,
                            hidden: true,
                            itemId: 'tb_search_filter2',
                            items: [
                                {
                                    xtype: 'label',
                                    width: 80,
                                    text: '임대 IP :'
                                },
                                {
                                    xtype: 'cycle',
                                    itemId: 'ip',
                                    width: 140,
                                    showText: true,
                                    menu: {
                                        xtype: 'menu',
                                        itemId: 'menu',
                                        width: 120,
                                        items: [
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '0',
                                                itemId: 'contain',
                                                text: '포함한 결과'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '1',
                                                itemId: 'equal',
                                                text: '같은 결과'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '2',
                                                itemId: 'not',
                                                text: '다른 결과'
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txt_ip',
                                    width: 200
                                },
                                {
                                    xtype: 'container',
                                    width: 20
                                },
                                {
                                    xtype: 'label',
                                    width: 80,
                                    text: '로그인 타입 :'
                                },
                                {
                                    xtype: 'cycle',
                                    itemId: 'type',
                                    width: 140,
                                    showText: true,
                                    menu: {
                                        xtype: 'menu',
                                        itemId: 'menu',
                                        width: 120,
                                        items: [
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '0',
                                                itemId: 'login',
                                                text: '로그인'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '1',
                                                itemId: 'logout',
                                                text: '로그아웃'
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 3,
                            border: false,
                            hidden: true,
                            id: 'pnl_ssl_log_chart',
                            layout: 'fit'
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 7,
                            itemId: 'gpn_ssl_log',
                            store: 'st_ssl_log',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 100,
                                    align: 'center',
                                    text: '번호'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    align: 'center',
                                    dataIndex: 'timevalue',
                                    text: '접속 일시'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 140,
                                    align: 'center',
                                    dataIndex: 'server_ip',
                                    text: '서버 IP주소'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    align: 'center',
                                    dataIndex: 'login',
                                    text: '사용자'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 140,
                                    align: 'center',
                                    dataIndex: 'remote_ip',
                                    text: '사용자 IP'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 150,
                                    align: 'center',
                                    dataIndex: 'virtual_ip',
                                    text: '임대 IP'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    align: 'center',
                                    dataIndex: 'logintype',
                                    text: '로그인/로그아웃'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    align: 'center',
                                    dataIndex: 'code',
                                    text: '로그인 정보'
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    width: 360,
                                    displayInfo: true,
                                    store: 'st_ssl_log'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_ssl_logAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick1: function(button, e, eOpts) {
        component = Ext.getCmp('pnl_ssl_log');
        filter1 = component.getComponent('pnl_ssl_log_main').getComponent('tb_search_filter1');
        filter2 = component.getComponent('pnl_ssl_log_main').getComponent('tb_search_filter2');
        if (button.pressed === true)
        {
            filter1.show();
            filter2.show();
        }
        else
        {
            filter1.hide();
            filter2.hide();
        }
    },

    onCbo_search_rangeChange: function(field, newValue, oldValue, eOpts) {
        if (newValue === 5)
        {
            Ext.getCmp('ctn_ssl_log_date').width = 290;
            Ext.getCmp('tb_search').doComponentLayout();
        }
        else
        {
            Ext.getCmp('ctn_ssl_log_date').width = 0;
            Ext.getCmp('tb_search').doComponentLayout();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var gpn_ssl_devices = Ext.getCmp('pnl_ssl_log').getComponent('pnl_ssl_tree').getComponent('gpn_ssl_devices');
        var items = gpn_ssl_devices.getSelectionModel().getSelection();

        var server_list = [];

        for (var devices in items)
        {
            server_list.push(items[devices].raw.ip);
        }

        var start_ts = (Math.round(+new Date() / 1000));
        var end_ts = (Math.round(+new Date() / 1000));

        _type = Ext.getCmp('tb_search').getComponent('cbo_search_range').getValue();

        if (_type === 0)
            start_ts = (Math.round(+new Date()/1000)) - 600;

        if (_type === 1)
            start_ts = (Math.round(+new Date()/1000)) - 3600;

        if (_type === 2)
            start_ts = (Math.round(+new Date()/1000)) - 86400;

        if (_type === 3)
            start_ts = (Math.round(+new Date()/1000)) - 86400 * 7;

        if (_type === 4)
            start_ts = (Math.round(+new Date()/1000)) - 86400 * 30;

        if (_type === 5)
        {
            start_ts = Ext.getCmp('dt_ssl_log_start').value.getTime() / 1000;
            end_ts = (Ext.getCmp('dt_ssl_log_end').value.getTime() / 1000) + 86400;
        }

        var pnl_ssl_log_main = Ext.getCmp('pnl_ssl_log').getComponent('pnl_ssl_log_main');
        var tb_search = pnl_ssl_log_main.getComponent('tb_search');
        var filter = tb_search.getComponent('filter');
        var query = '';
        var login = '';
        var remote_ip = '';
        var virtual_ip = '';

        if (filter.pressed === true)
        {
            user = pnl_ssl_log_main.getComponent('tb_search_filter1').getComponent('user');
            txt_user = pnl_ssl_log_main.getComponent('tb_search_filter1').getComponent('txt_user').getValue();


            if (txt_user !== '')
            {
                if (user.activeItem.stateId === "0")
                {
                    login = {'$regex' :  '.*' + txt_user + '.*'};
                }

                if (user.activeItem.stateId === "1")
                {
                    login = txt_user;
                }

                if (user.activeItem.stateId === "2")
                {
                    login = { '$ne' : txt_user };
                }
            }

            var ip = pnl_ssl_log_main.getComponent('tb_search_filter1').getComponent('ip');
            var txt_ip = pnl_ssl_log_main.getComponent('tb_search_filter1').getComponent('txt_ip').getValue();

            if (txt_ip !== '')
            {
                if (ip.activeItem.stateId === "0")
                {
                    remote_ip = { '$regex' : '.*' + txt_ip + '.*' };
                }

                if (ip.activeItem.stateId === "1")
                {
                    remote_ip = txt_ip;
                }

                if (ip.activeItem.stateId === "2")
                {
                    remote_ip = { '$ne' : txt_ip };
                }
            }

            var vip = pnl_ssl_log_main.getComponent('tb_search_filter2').getComponent('ip');
            var txt_vip = pnl_ssl_log_main.getComponent('tb_search_filter2').getComponent('txt_ip').getValue();

            if (txt_vip !== '')
            {
                if (vip.activeItem.stateId === "0")
                {
                    virtual_ip = { '$regex' : '.*' + txt_vip + '.*' };
                }

                if (vip.activeItem.stateId === "1")
                {
                    virtual_ip = txt_vip;
                }

                if (vip.activeItem.stateId === "2")
                {
                    virtual_ip = { '$ne' : txt_vip };
                }
            }


            if (pnl_ssl_log_main.getComponent('tb_search_filter2').getComponent('type').activeItem.stateId === "0")
            {
                logtype = 'login';
            }
            else
            {
                logtype = 'logout';
            }

            var query = {'server_ip' : {'$in' : server_list},
                         '_time' : {'$gte' : start_ts, '$lt' : end_ts},
                         'login' : login,
                         'logintype' :  logtype,
                         'virtual_ip' : virtual_ip,
                         'remote_ip' : remote_ip};

            Ext.getStore('st_ssl_log').getProxy().extraParams = {
                'query' : Ext.encode(query)
            };

        }
        else
        {
            var query = {'server_ip' : {'$in' : server_list}, '_time' : {'$gte' : start_ts, '$lt' : end_ts} };
            Ext.getStore('st_ssl_log').getProxy().extraParams = {
                'query' : Ext.encode(query)
            };
        }

        pnl_ssl_log_main.getComponent('gpn_ssl_log').query = query;


        Ext.getStore('st_ssl_log').load();



        var pnl_ssl_log_chart = Ext.getCmp('pnl_ssl_log_chart');
        if (_type === 5)
            pnl_ssl_log_chart.hide();
        else
            pnl_ssl_log_chart.show();

        var _tplList = {
            graphType : '',
            widgetTitle : '',
            drawType : 'column',
            chartAttr : {
                axisX :
                {
                    lineThickness: 1,
                    gridThickness: 1
                },
                axisY : {
                    lineThickness: 1,
                    gridThickness : 1
                },
                data :
                [
                    {
                        type : 'column',
                        name: 'log',
                        color : '#4374D9'
                    }
                ]
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSL/GetChart',
                            params :
                            {
                                server_ip : Ext.encode(server_list),
                                start_ts : Ext.encode(start_ts),
                                chart_type : _type
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.count, label : _element._time, legendText : '인증 로그', indexLabel : _element.count.toString()});
                                }

                                obj.setData(obj, [_data1]);
                            },
                            failure : function(res_data)
                            {
                                console.log(res_data);
                            }
                        });
                }
            },
            interval : 100000,
            name : 'log'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_ssl_log';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '인증 로그', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);
        pnl_ssl_log_chart.add(_widget);

    },

    onButtonClick2: function(button, e, eOpts) {
        Ext.create('SSL.view.win_ssl_export_log').show();
    },

    onTb_searchAfterRender: function(component, eOpts) {
        var cbo_search_range = component.getComponent('cbo_search_range');
        cbo_search_range.setValue(cbo_search_range.getStore().getAt(3).get(cbo_search_range.valueField));

        Ext.getCmp('dt_ssl_log_start').setValue(new Date());
        Ext.getCmp('dt_ssl_log_end').setValue(new Date());

        Ext.getCmp('ctn_ssl_log_date').width = 0;
    },

    onButtonClick21: function(button, e, eOpts) {
        Ext.create('SSL.view.win_ssl_backup_log').show();
    },

    onButtonClick211: function(button, e, eOpts) {
        Ext.create('SSL.view.win_ssl_restore_log').show();
    },

    onPnl_ssl_logAfterRender: function(component, eOpts) {
        var store = Ext.getStore('st_ssl_log');
        store.removeAll();

        obj = {};
        obj.pnl_ssl_tree = component.getComponent('pnl_ssl_tree');
        obj.tpn_ssl_tree = component.getComponent('pnl_ssl_tree').getComponent('tpn_ssl_tree');
        obj.gpn_ssl_devices = component.getComponent('pnl_ssl_tree').getComponent('gpn_ssl_devices');

        obj.tpn_ssl_tree.addListener('itemclick', function(node, record, item, index, event, eOpts)
                                     {
                                         Ext.Ajax.request(
                                             {
                                                 url : 'api/ftSSL/GetDevices',
                                                 params : {
                                                     parent : Ext.encode(record.raw._id)
                                                 },
                                                 success : function(res_data)
                                                 {
                                                     var resObj = JSON.parse(res_data.responseText);
                                                     Ext.getStore('st_ssl_devices').loadData(resObj);
                                                 }
                                             });
                                     });

        Ext.Ajax.request(
            {
                url : 'api/ftSSL/GetGroup',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    obj.tpn_ssl_tree.setRootNode(resObj);
                }
            }
        );


    }

});