
Ext.define('SSL.view.pnl_ssl_devices', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Column'
    ],

    border: false,
    id: 'pnl_ssl_devices',
    itemId: 'pnl_ssl_devices',
    layout: 'border',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    flex: 0,
                    region: 'west',
                    split: true,
                    id: 'tpn_ssl_tree',
                    itemId: 'tpn_ssl_tree',
                    width: 300,
                    title: '장비그룹',
                    viewConfig: {
                        preserveScrollOnRefresh: true
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    border: false,
                                    cls: 'group_add',
                                    height: 26,
                                    style: 'background-color:white',
                                    width: 28,
                                    tooltip: '그룹추가',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    border: false,
                                    cls: 'group_modify',
                                    height: 26,
                                    style: 'background-color:white',
                                    width: 28,
                                    tooltip: '그룹수정',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    border: false,
                                    cls: 'group_remove',
                                    height: 26,
                                    style: 'background-color:white',
                                    width: 28,
                                    tooltip: '그룹삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick2,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onTreepanelAfterRender,
                            scope: me
                        },
                        itemclick: {
                            fn: me.onTpn_ssl_treeItemClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    region: 'center',
                    itemId: 'ctn_grid',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'toolbar',
                            flex: 0,
                            itemId: 'toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    cls: 'device_add',
                                    height: 26,
                                    width: 60,
                                    text: '추가',
                                    textAlign: 'right',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick3,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'device_modify',
                                    height: 26,
                                    width: 60,
                                    text: '수정',
                                    textAlign: 'right',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick4,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'device_remove',
                                    height: 26,
                                    width: 60,
                                    text: '삭제',
                                    textAlign: 'right',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick5,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'terminal',
                                    height: 26,
                                    width: 75,
                                    text: '터미널',
                                    textAlign: 'right',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick6,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    height: 26,
                                    width: 75,
                                    text: '관리페이지',
                                    textAlign: 'right',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick7,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    width: 75,
                                    text: '재 접속',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick8,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    width: 75,
                                    text: '연결 해제',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick9,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            id: 'gpn_ssl_devices',
                            itemId: 'gpn_ssl_devices',
                            autoScroll: true,
                            forceFit: false,
                            sortableColumns: false,
                            store: 'st_ssl_devices',
                            viewConfig: {
                                listeners: {
                                    refresh: {
                                        fn: me.onViewRefresh,
                                        scope: me
                                    }
                                }
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 140,
                                    align: 'center',
                                    dataIndex: 'name',
                                    text: '장비 이름'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 140,
                                    align: 'center',
                                    dataIndex: 'ip',
                                    text: 'IP 주소'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'tunnels',
                                    text: '터널 수'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (value !== '')
                                        {
                                            if (value > 1024 * 1024 * 1024)
                                            return (value / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                            else if (value > 1024 * 1024)
                                            return (value / (1024 * 1024)).toFixed(2) + ' MB';
                                            else if (value > 1024)
                                            return (value / 1024).toFixed(2) + ' KB';
                                            else
                                            return value;
                                        }
                                        else
                                        return '';
                                    },
                                    width: 140,
                                    align: 'center',
                                    dataIndex: 'rx',
                                    text: '수신'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (value !== '')
                                        {
                                            if (value > 1024 * 1024 * 1024)
                                            return (value / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                            else if (value > 1024 * 1024)
                                            return (value / (1024 * 1024)).toFixed(2) + ' MB';
                                            else if (value > 1024)
                                            return (value / 1024).toFixed(2) + ' KB';
                                            else
                                            return value;
                                        }
                                        else
                                        return '';
                                    },
                                    width: 140,
                                    align: 'center',
                                    dataIndex: 'tx',
                                    text: '송신'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value + '%';
                                    },
                                    align: 'center',
                                    dataIndex: 'cpu',
                                    text: 'CPU'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value + '%';
                                    },
                                    align: 'center',
                                    dataIndex: 'memory',
                                    text: '메모리'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value + '%';
                                    },
                                    align: 'center',
                                    dataIndex: 'disk',
                                    text: '디스크'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    align: 'center',
                                    dataIndex: 'fw_version',
                                    text: '펌웨어 버전'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    align: 'center',
                                    dataIndex: 'rd_version',
                                    text: '램디스크 버전'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (value === true)
                                        {
                                            metaData.tdCls = 'status_on';
                                        }
                                        else
                                        {
                                            metaData.tdCls = 'status_off';
                                        }

                                        return '';
                                    },
                                    align: 'center',
                                    dataIndex: 'connect',
                                    text: '장비 연결상태'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'interface_ip',
                                    text: 'eth0',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.eth0;
                                            },
                                            width: 140,
                                            align: 'center',
                                            dataIndex: 'interface_ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth0.rx !== '')
                                                {
                                                    if (value.eth0.rx > 1024 * 1024 * 1024)
                                                    return (value.eth0.rx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth0.rx > 1024 * 1024)
                                                    return (value.eth0.rx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth0.rx > 1024)
                                                    return (value.eth0.rx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth0.rx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '수신'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth0.tx !== '')
                                                {
                                                    if (value.eth0.tx > 1024 * 1024 * 1024)
                                                    return (value.eth0.tx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth0.tx > 1024 * 1024)
                                                    return (value.eth0.tx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth0.tx > 1024)
                                                    return (value.eth0.tx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth0.tx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '송신'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'interface_ip',
                                    text: 'eth1',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.eth1;
                                            },
                                            width: 140,
                                            align: 'center',
                                            dataIndex: 'interface_ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth1.rx !== '')
                                                {
                                                    if (value.eth1.rx > 1024 * 1024 * 1024)
                                                    return (value.eth1.rx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth1.rx > 1024 * 1024)
                                                    return (value.eth1.rx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth1.rx > 1024)
                                                    return (value.eth1.rx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth1.rx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '수신'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth1.tx !== '')
                                                {
                                                    if (value.eth1.tx > 1024 * 1024 * 1024)
                                                    return (value.eth1.tx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth1.tx > 1024 * 1024)
                                                    return (value.eth1.tx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth1.tx > 1024)
                                                    return (value.eth1.tx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth1.tx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '송신'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'interface_ip',
                                    text: 'eth2',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.eth2;
                                            },
                                            width: 140,
                                            align: 'center',
                                            dataIndex: 'interface_ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth2.rx !== '')
                                                {
                                                    if (value.eth2.rx > 1024 * 1024 * 1024)
                                                    return (value.eth2.rx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth2.rx > 1024 * 1024)
                                                    return (value.eth2.rx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth2.rx > 1024)
                                                    return (value.eth2.rx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth2.rx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '수신'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth2.tx !== '')
                                                {
                                                    if (value.eth2.tx > 1024 * 1024 * 1024)
                                                    return (value.eth2.tx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth2.tx > 1024 * 1024)
                                                    return (value.eth2.tx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth2.tx > 1024)
                                                    return (value.eth2.tx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth2.tx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '송신'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'interface_ip',
                                    text: 'eth3',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.eth3;
                                            },
                                            width: 140,
                                            align: 'center',
                                            dataIndex: 'interface_ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth3.rx !== '')
                                                {
                                                    if (value.eth3.rx > 1024 * 1024 * 1024)
                                                    return (value.eth3.rx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth3.rx > 1024 * 1024)
                                                    return (value.eth3.rx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth3.rx > 1024)
                                                    return (value.eth3.rx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth3.rx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '수신'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth3.tx !== '')
                                                {
                                                    if (value.eth3.tx > 1024 * 1024 * 1024)
                                                    return (value.eth3.tx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth3.tx > 1024 * 1024)
                                                    return (value.eth3.tx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth3.tx > 1024)
                                                    return (value.eth3.tx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth3.tx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '송신'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'interface_ip',
                                    text: 'eth4',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.eth4;
                                            },
                                            width: 140,
                                            align: 'center',
                                            dataIndex: 'interface_ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth4.rx !== '')
                                                {
                                                    if (value.eth4.rx > 1024 * 1024 * 1024)
                                                    return (value.eth4.rx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth4.rx > 1024 * 1024)
                                                    return (value.eth4.rx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth4.rx > 1024)
                                                    return (value.eth4.rx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth4.rx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '수신'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth4.tx !== '')
                                                {
                                                    if (value.eth4.tx > 1024 * 1024 * 1024)
                                                    return (value.eth4.tx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth4.tx > 1024 * 1024)
                                                    return (value.eth4.tx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth4.tx > 1024)
                                                    return (value.eth4.tx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth4.tx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '송신'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'interface_ip',
                                    text: 'eth5',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.eth5;
                                            },
                                            width: 140,
                                            align: 'center',
                                            dataIndex: 'interface_ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth5.rx !== '')
                                                {
                                                    if (value.eth5.rx > 1024 * 1024 * 1024)
                                                    return (value.eth5.rx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth5.rx > 1024 * 1024)
                                                    return (value.eth5.rx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth5.rx > 1024)
                                                    return (value.eth5.rx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth5.rx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '수신'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth5.tx !== '')
                                                {
                                                    if (value.eth5.tx > 1024 * 1024 * 1024)
                                                    return (value.eth5.tx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth5.tx > 1024 * 1024)
                                                    return (value.eth5.tx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth5.tx > 1024)
                                                    return (value.eth5.tx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth5.tx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '송신'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'interface_ip',
                                    text: 'eth6',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.eth6;
                                            },
                                            width: 140,
                                            align: 'center',
                                            dataIndex: 'interface_ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth6.rx !== '')
                                                {
                                                    if (value.eth6.rx > 1024 * 1024 * 1024)
                                                    return (value.eth6.rx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth6.rx > 1024 * 1024)
                                                    return (value.eth6.rx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth6.rx > 1024)
                                                    return (value.eth6.rx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth6.rx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '수신'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth6.tx !== '')
                                                {
                                                    if (value.eth6.tx > 1024 * 1024 * 1024)
                                                    return (value.eth6.tx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth6.tx > 1024 * 1024)
                                                    return (value.eth6.tx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth6.tx > 1024)
                                                    return (value.eth6.tx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth6.tx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '송신'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'interface_ip',
                                    text: 'eth7',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.eth7;
                                            },
                                            width: 140,
                                            align: 'center',
                                            dataIndex: 'interface_ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth7.rx !== '')
                                                {
                                                    if (value.eth7.rx > 1024 * 1024 * 1024)
                                                    return (value.eth7.rx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth7.rx > 1024 * 1024)
                                                    return (value.eth7.rx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth7.rx > 1024)
                                                    return (value.eth7.rx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth7.rx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '수신'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth7.tx !== '')
                                                {
                                                    if (value.eth7.tx > 1024 * 1024 * 1024)
                                                    return (value.eth7.tx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth7.tx > 1024 * 1024)
                                                    return (value.eth7.tx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth7.tx > 1024)
                                                    return (value.eth7.tx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth7.tx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '송신'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'interface_ip',
                                    text: 'eth8',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.eth8;
                                            },
                                            width: 140,
                                            align: 'center',
                                            dataIndex: 'interface_ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth8.rx !== '')
                                                {
                                                    if (value.eth8.rx > 1024 * 1024 * 1024)
                                                    return (value.eth8.rx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth8.rx > 1024 * 1024)
                                                    return (value.eth8.rx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth8.rx > 1024)
                                                    return (value.eth8.rx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth8.rx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '수신'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth8.tx !== '')
                                                {
                                                    if (value.eth8.tx > 1024 * 1024 * 1024)
                                                    return (value.eth8.tx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth8.tx > 1024 * 1024)
                                                    return (value.eth8.tx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth8.tx > 1024)
                                                    return (value.eth8.tx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth8.tx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '송신'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'interface_ip',
                                    text: 'eth9',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value.eth9;
                                            },
                                            width: 140,
                                            align: 'center',
                                            dataIndex: 'interface_ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth9.rx !== '')
                                                {
                                                    if (value.eth9.rx > 1024 * 1024 * 1024)
                                                    return (value.eth9.rx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth9.rx > 1024 * 1024)
                                                    return (value.eth9.rx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth9.rx > 1024)
                                                    return (value.eth9.rx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth9.rx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '수신'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value.eth9.tx !== '')
                                                {
                                                    if (value.eth9.tx > 1024 * 1024 * 1024)
                                                    return (value.eth9.tx / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                                    else if (value.eth9.tx > 1024 * 1024)
                                                    return (value.eth9.tx / (1024 * 1024)).toFixed(2) + ' MB';
                                                    else if (value.eth9.tx > 1024)
                                                    return (value.eth9.tx / 1024).toFixed(2) + ' KB';
                                                    else
                                                    return value.eth9.tx;
                                                }
                                                else
                                                return '';
                                            },
                                            width: 120,
                                            align: 'center',
                                            dataIndex: 'interface_use',
                                            text: '송신'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            border: false,
                            height: 300,
                            title: '최근 인증 로그',
                            store: 'st_ssl_curlog',
                            viewConfig: {
                                preserveScrollOnRefresh: true
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'timevalue',
                                    text: '접속 일시'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'server_ip',
                                    text: '서버 주소'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'login',
                                    text: '사용자'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'remote_ip',
                                    text: '사용자 IP'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'virtual_ip',
                                    text: '임대 IP'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'logintype',
                                    text: '로그인/로그아웃'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'code',
                                    text: '로그인 정보'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_ssl_devicesAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_ssl_devicesBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        var tpn_ssl_tree = Ext.getCmp('tpn_ssl_tree');

        if(tpn_ssl_tree.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({
                title: '그룹 추가',
                msg: '부모 그룹을 선택하세요',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });

            return;
        }

        Ext.Msg.prompt('그룹 추가', '그룹 이름을 입력해주세요 : ', function(btn, text){
            if (btn == 'ok')
            {
                var item = tpn_ssl_tree.getSelectionModel().getSelection()[0].raw;
                console.log(item);

                Ext.Ajax.request(
                    {
                        url : 'api/ftSSL/AddGroup',
                        params : {
                            'parent' : Ext.encode(item._id),
                            'name' : Ext.encode(text)
                        },
                        success : function(res_data)
                        {
                            Ext.Ajax.request(
                                {
                                    url : 'api/ftSSL/GetGroup',
                                    success : function(res_data)
                                    {
                                        Ext.Ajax.request(
                                            {
                                                url : 'api/ftSSL/GetGroup',
                                                success : function(res_data)
                                                {
                                                    var resObj = JSON.parse(res_data.responseText);
                                                    tpn_ssl_tree.setRootNode(resObj);
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });


    },

    onButtonClick1: function(button, e, eOpts) {
        var tpn_ssl_tree = Ext.getCmp('tpn_ssl_tree');

        if(tpn_ssl_tree.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({
                title: '그룹 수정',
                msg: '수정할 그룹을 선택하세요',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });

            return;
        }

        Ext.Msg.prompt('그룹 수정', '그룹 이름을 입력해주세요 : ', function(btn, text){
            if (btn == 'ok')
            {

                var item = tpn_ssl_tree.getSelectionModel().getSelection()[0].raw;

                item.text = text;

                Ext.Ajax.request(
                    {
                        url : 'api/ftSSL/ModifyGroup',
                        params : {
                            'group' : Ext.encode(item)
                        },
                        success : function(res_data)
                        {
                            Ext.Ajax.request(
                                {
                                    url : 'api/ftSSL/GetGroup',
                                    success : function(res_data)
                                    {
                                        Ext.Ajax.request(
                                            {
                                                url : 'api/ftSSL/GetGroup',
                                                success : function(res_data)
                                                {
                                                    var resObj = JSON.parse(res_data.responseText);
                                                    tpn_ssl_tree.setRootNode(resObj);
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });


    },

    onButtonClick2: function(button, e, eOpts) {
        var tpn_ssl_tree = Ext.getCmp('tpn_ssl_tree');

        if(tpn_ssl_tree.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({
                title: '그룹 삭제',
                msg: '삭제할 그룹을 선택하세요',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });

            return;
        }

        var item = tpn_ssl_tree.getSelectionModel().getSelection()[0].raw;

        if(item.parent === null)
        {
            Ext.Msg.show({
                title : lang.title_del_group,
                msg : lang.invalid_del_root,
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR
            });

            return;
        }


        Ext.Msg.confirm('그룹 삭제', '그룹을 삭제 하시겠습니까?', function(btn) {
            if (btn === 'yes')
            {
                Ext.Ajax.request(
                    {
                        url : 'api/ftSSL/RemoveGroup',
                        params : {
                            '_id' : Ext.encode(item._id)
                        },
                        success : function(res_data)
                        {
                            var resObj = JSON.parse(res_data.responseText);
                            if (resObj === false)
                            {
                                Ext.MessageBox.show({
                                    title: '그룹 삭제',
                                    msg: '장비나 그룹이 포함되어 있습니다.',
                                    buttons: Ext.MessageBox.OK,
                                    fn: function()
                                    {
                                        return;
                                    },
                                    icon : Ext.Msg.ERROR
                                });
                            }
                            else
                            {
                                Ext.Ajax.request(
                                    {
                                        url : 'api/ftSSL/GetGroup',
                                        success : function(res_data)
                                        {

                                            var resObj = JSON.parse(res_data.responseText);
                                            tpn_ssl_tree.setRootNode(resObj);

                                        }
                                    }
                                );
                            }
                        }
                    }
                );
            }
            else
            {
                return;
            }
        });
    },

    onTreepanelAfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftSSL/GetGroup',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    component.setRootNode(resObj);
                }
            }
        );
    },

    onTpn_ssl_treeItemClick: function(dataview, record, item, index, e, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftSSL/GetDevices',
                params : {
                    'parent' : Ext.encode(record.raw._id)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_ssl_devices').loadData(resObj);
                }
            }
        );

    },

    onButtonClick3: function(button, e, eOpts) {
        var item = Ext.getCmp('tpn_ssl_tree').getSelectionModel().getSelection()[0];
        if (item === undefined)
        {
            Ext.MessageBox.show({
                title: '장비 추가',
                msg: '그룹을 선택하세요.',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });
        }
        else
        {
            var component = Ext.getCmp('pnl_ssl_devices');
            clearInterval(component.timer);

            Ext.create('SSL.view.win_set_device', {
                'isModify' : false
            }).show();
        }



    },

    onButtonClick4: function(button, e, eOpts) {
        var item = Ext.getCmp('gpn_ssl_devices').getSelectionModel().getSelection()[0];

        if (item === undefined)
        {
            Ext.MessageBox.show({
                title: '장비 수정',
                msg: '장비를 선택하세요',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });
        }
        else
        {
            var component = Ext.getCmp('pnl_ssl_devices');
            clearInterval(component.timer);

            Ext.create('SSL.view.win_set_device', {
                'isModify' : true
            }).show();
        }


    },

    onButtonClick5: function(button, e, eOpts) {
        var item = Ext.getCmp('gpn_ssl_devices').getSelectionModel().getSelection()[0];

        if (item === undefined)
        {
            Ext.MessageBox.show({
                title: '장비 추가',
                msg: '그룹을 선택하세요.',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });
        }
        else
        {
            Ext.MessageBox.confirm('장비 삭제', '삭제하시겠습니까?', function(btn){
                if (btn == 'yes') {
                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSLMsgMgr/remove_device',
                            params : {
                                '_id' : Ext.encode(item.raw._id)
                            },
                            success : function(res_data)
                            {

                            }
                        }
                    );

                } else {
                    return;
                }
            });
        }

    },

    onButtonClick6: function(button, e, eOpts) {
        var pnl = Ext.getCmp('pnl_ssl_devices');
        var item = Ext.getCmp('gpn_ssl_devices').getSelectionModel().getSelection()[0];

        if (item === undefined)
        {
            Ext.MessageBox.show({
                title: '터미널',
                msg: '장비를 선택하세요.',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });
        }
        else
        {
            pnl.showSSLTerminal(item.raw.admin_id, item.raw.ip, item.raw.name);
        }

    },

    onButtonClick7: function(button, e, eOpts) {
        var pnl = Ext.getCmp('pnl_ssl_devices');
        var item = Ext.getCmp('gpn_ssl_devices').getSelectionModel().getSelection()[0];

        if (item === undefined)
        {
            Ext.MessageBox.show({
                title: '관리 페이지',
                msg: '장비를 선택하세요.',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });
        }
        else
        {
            var ip = item.raw.ip;

            var httpsUrl = 'https://' + ip + '/admin';
            window.open(httpsUrl, '_blank');
        }

    },

    onButtonClick8: function(button, e, eOpts) {
        var pnl = Ext.getCmp('pnl_ssl_devices');
        var item = Ext.getCmp('gpn_ssl_devices').getSelectionModel().getSelection()[0];

        if (item === undefined)
        {
            Ext.MessageBox.show({
                title: '재 접속',
                msg: '장비를 선택하세요.',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });
        }
        else
        {
            var id = item.raw._id;

            Ext.Ajax.request(
                {
                    url : 'api/ftSSLMsgMgr/reconnect_device',
                    params : {
                        '_id' : Ext.encode(id)
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }



    },

    onButtonClick9: function(button, e, eOpts) {
        var pnl = Ext.getCmp('pnl_ssl_devices');
        var item = Ext.getCmp('gpn_ssl_devices').getSelectionModel().getSelection()[0];

        if (item === undefined)
        {
            Ext.MessageBox.show({
                title: '연결 해제',
                msg: '장비를 선택하세요.',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });
        }
        else
        {
            var id = item.raw._id;

            Ext.Ajax.request(
                {
                    url : 'api/ftSSLMsgMgr/disconnect_device',
                    params : {
                        '_id' : Ext.encode(id)
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }



    },

    onViewRefresh: function(dataview, eOpts) {
        var component = Ext.getCmp('gpn_ssl_devices');

        if ( component.selectRecords === undefined)
            return;

        if (component.selectRecords.length <= 0)
            return;

        var newRecordsToSelect = [];

        for (var i = 0; i < component.selectIndex.length; i++)
        {
            var record = component.getStore().getAt(component.selectIndex[i]);
            if (!Ext.isEmpty(record))
            {
                newRecordsToSelect.push(record);
            }
        }

        component.getSelectionModel().select(newRecordsToSelect);


    },

    onPnl_ssl_devicesAfterRender: function(component, eOpts) {
        component.startTimer();
    },

    onPnl_ssl_devicesBeforeDestroy: function(component, eOpts) {
        clearInterval(component.timer);
        Ext.getStore('st_ssl_devices').loadData([]);
    },

    showSSLTerminal: function(adminId, ip, deviceName) {
        var PopWin;

        function openPopWin(theURL,winName,features) {

            PopWin = window.open(theURL,winName,features);

            PopWin.focus();

            return PopWin;

        }

        var _params = {

                termInfo : Ext.encode({
                    id : adminId,
                    address : ip
                })

            };


        var _callback = arguments[3];
        var _winName = deviceName + ' (' + ip + ')';

        Ext.Ajax.request(
            {
                url : 'terminal/make',
                params : _params,
                method : 'GET',
                success : function(res_data)
                {
                    var src = '/viewTerminal?title=' + Ext.encode(_winName);
                    var _newWin = openPopWin(src, _winName, "status=1,toolbar=1,width=680,height=400");

                    if(typeof _callback === 'function'){
                        _callback();
                    }
                },
                failure : function(result, request)
                {
                    Ext.Msg.alert('terminal Failed');
                }

            });
    },

    startTimer: function() {
        var component = Ext.getCmp('pnl_ssl_devices');

        component.timer = function()
        {
            var end_ts = (Math.round(+new Date() / 1000));
            var start_ts = (Math.round(+new Date()/1000)) - 600;
            var query = {'_time' : {'$gte' : start_ts, '$lt' : end_ts}};

            Ext.Ajax.request(
                {
                    url : 'api/ftSSL/GetLog',
                    params : {
                        'query' : Ext.encode(query),
                        'offset' : 0,
                        'limit' : 100
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        Ext.getStore('st_ssl_curlog').loadData(resObj.retval.data);
                    }
                }
            );

            var tpn_ssl_tree = Ext.getCmp('tpn_ssl_tree');
            var selection = tpn_ssl_tree.getSelectionModel().getSelection();

            if (selection.length === 0)
                return;

            _id = selection[0].raw._id;

            var grid = Ext.getCmp('gpn_ssl_devices');
            grid.selectRecords = grid.getSelectionModel().getSelection();

            var array = [];

            for(i = 0; i < grid.selectRecords.length; i++)
                array.push(grid.getStore().indexOf(grid.selectRecords[i]));

            grid.selectIndex = array;

            Ext.Ajax.request(
                {
                    url : 'api/ftSSL/GetDevices',
                    params : {
                        'parent' : Ext.encode(_id)
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        Ext.getStore('st_ssl_devices').loadData(resObj);
                    }
                }
            );

        };

        component.timer = setInterval(component.timer, 4000);
    }

});