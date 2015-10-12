
Ext.define('AUS.view.win_aus_filelist', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.tab.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.form.field.ComboBox'
    ],

    height: 520,
    id: 'win_aus_filelist',
    width: 780,
    layout: 'fit',
    title: '파일 목록',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    id: 'tpc_aus_filelist',
                    activeTab: 0,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            id: 'tb_version_file',
                            items: [
                                {
                                    xtype: 'form',
                                    flex: 1,
                                    border: false,
                                    id: 'frm_version_file',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'filefield',
                                            id: 'ffd_version_file',
                                            width: 80,
                                            hideLabel: true,
                                            name: 'uploadfiles',
                                            buttonOnly: true,
                                            buttonText: '파일 추가',
                                            buttonConfig: {
                                                xtype: 'filebutton',
                                                width: 80,
                                                text: '파일추가'
                                            },
                                            listeners: {
                                                change: {
                                                    fn: me.onFilefieldChange,
                                                    scope: me
                                                },
                                                afterrender: {
                                                    fn: me.onFfd_version_fileAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            width: 10
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '삭제',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'btn_version_close',
                                            width: 80,
                                            text: '닫기',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_version_closeClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            width: 10
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'panel',
                            id: 'tpn_xtm_mips_version',
                            layout: 'fit',
                            title: 'XTM - mips',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    id: 'tab_xtm_mips_version',
                                    activeTab: 0,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_mips_firmware',
                                            layout: 'fit',
                                            title: '펌웨어',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_mips_firmware',
                                                    header: false,
                                                    store: 'st_xtm_mips_firmware',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ],
                                                    viewConfig: {
                                                        id: 'grv_xtm_mips_version'
                                                    }
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_mips_firmware',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_mips_firmware',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_mips_firmwareAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_mips_ramdisk',
                                            layout: 'fit',
                                            title: '램디스크',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_mips_ramdisk',
                                                    store: 'st_xtm_mips_ramdisk',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_mips_ramdisk',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_mips_ramdisk',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange1,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_mips_ramdiskAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_mips_image',
                                            layout: 'fit',
                                            title: '이미지',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_mips_image',
                                                    store: 'st_xtm_mips_image',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_mips_image',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_mips_image',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange2,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_mips_imageAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_mips_do',
                                            layout: 'fit',
                                            title: 'DO',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_mips_do',
                                                    store: 'st_xtm_mips_do',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_mips_do',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_mips_do',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange3,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_mips_doAfterRender,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'tpn_xtm_x86_version',
                            layout: 'fit',
                            title: 'XTM - x86',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    id: 'tab_xtm_x86_version',
                                    activeTab: 0,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_x86_firmware',
                                            layout: 'fit',
                                            title: '펌웨어',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_x86_firmware',
                                                    header: false,
                                                    store: 'st_xtm_x86_firmware',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ],
                                                    viewConfig: {
                                                        id: 'grv_xtm_x86_firmware'
                                                    }
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_x86_firmware',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_x86_firmware',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange4,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_x86_firmwareAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_x86_ramdisk',
                                            layout: 'fit',
                                            title: '램디스크',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_x86_ramdisk',
                                                    store: 'st_xtm_x86_ramdisk',
                                                    viewConfig: {
                                                        id: 'grv_xtm_x86_ramdisk'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_x86_ramdisk',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_x86_ramdisk',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange11,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_x86_ramdiskAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_x86_image',
                                            layout: 'fit',
                                            title: '이미지',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_x86_image',
                                                    store: 'st_xtm_x86_image',
                                                    viewConfig: {
                                                        id: 'grv_xtm_x86_image'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_x86_image',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_x86_image',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange21,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_x86_imageAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_x86_do',
                                            layout: 'fit',
                                            title: 'DO',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_x86_do',
                                                    store: 'st_xtm_x86_do',
                                                    viewConfig: {
                                                        id: 'grv_xtm_x86_do'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_x86_do',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_x86_do',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange31,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_x86_doAfterRender,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'tpn_xtm_x64_version',
                            layout: 'fit',
                            title: 'XTM - x64',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    id: 'tab_xtm_x64_version',
                                    activeTab: 0,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_x64_firmware',
                                            layout: 'fit',
                                            title: '펌웨어',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_x64_firmware',
                                                    header: false,
                                                    store: 'st_xtm_x64_firmware',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ],
                                                    viewConfig: {
                                                        id: 'grv_xtm_x64_firmware'
                                                    }
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_x64_firmware',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_x64_firmware',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange41,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_x64_firmwareAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_x64_ramdisk',
                                            layout: 'fit',
                                            title: '램디스크',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_x64_ramdisk',
                                                    store: 'st_xtm_x64_ramdisk',
                                                    viewConfig: {
                                                        id: 'grv_xtm_x64_ramdisk'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_x64_ramdisk',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_x64_ramdisk',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange111,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_x64_ramdiskAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_x64_image',
                                            layout: 'fit',
                                            title: '이미지',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_x64_image',
                                                    store: 'st_xtm_x64_image',
                                                    viewConfig: {
                                                        id: 'grv_xtm_x64_image'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_x64_image',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_x64_image',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange211,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_x64_imageAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_xtm_x64_do',
                                            layout: 'fit',
                                            title: 'DO',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_xtm_x64_do',
                                                    store: 'st_xtm_x64_do',
                                                    viewConfig: {
                                                        id: 'grv_xtm_x64_do'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_xtm_x64_do',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_xtm_x64_do',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onComboboxChange311,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_xtm_x64_doAfterRender,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'tpn_zen_mips_version',
                            layout: 'fit',
                            title: 'ZEN - mips',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    id: 'tab_zen_mips_version',
                                    activeTab: 0,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: 'tab_zen_mips_firmware',
                                            layout: 'fit',
                                            title: '펌웨어',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_zen_mips_firmware',
                                                    header: false,
                                                    store: 'st_zen_mips_firmware',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ],
                                                    viewConfig: {
                                                        id: 'grv_zen_mips_firmware'
                                                    }
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_zen_mips_firmware',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_zen_mips_firmware',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCmb_zen_mips_firmwareChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_zen_mips_firmwareAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_zen_mips_ramdisk',
                                            layout: 'fit',
                                            title: '램디스크',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_zen_mips_ramdisk',
                                                    store: 'st_zen_mips_ramdisk',
                                                    viewConfig: {
                                                        id: 'grv_zen_mips_ramdisk'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_zen_mips_ramdisk',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_zen_mips_ramdisk',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCmb_zen_mips_ramdiskChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_zen_mips_ramdiskAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_zen_mips_image',
                                            layout: 'fit',
                                            title: '이미지',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_zen_mips_image',
                                                    store: 'st_zen_mips_image',
                                                    viewConfig: {
                                                        id: 'grv_zen_mips_image'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_zen_mips_image',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_zen_mips_image',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCmb_zen_mips_imageChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_zen_mips_imageAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_zen_mips_do',
                                            layout: 'fit',
                                            title: 'DO',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_zen_mips_do',
                                                    store: 'st_zen_mips_do',
                                                    viewConfig: {
                                                        id: 'grv_zen_mips_do'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_zen_mips_do',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_zen_mips_do',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCmb_zen_mips_doChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_zen_mips_doAfterRender,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'tpn_zen_x64_version',
                            layout: 'fit',
                            title: 'ZEN - x64',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    id: 'tab_zen_x64_version',
                                    activeTab: 0,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: 'tab_zen_x64_firmware',
                                            layout: 'fit',
                                            title: '펌웨어',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_zen_x64_firmware',
                                                    header: false,
                                                    store: 'st_zen_x64_firmware',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ],
                                                    viewConfig: {
                                                        id: 'grv_zen_x64_firmware'
                                                    }
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_zen_x64_firmware',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_zen_x64_firmware',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCmb_zen_x64_firmwareChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_zen_x64_firmwareAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_zen_x64_ramdisk',
                                            layout: 'fit',
                                            title: '램디스크',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_zen_x64_ramdisk',
                                                    store: 'st_zen_x64_ramdisk',
                                                    viewConfig: {
                                                        id: 'grv_zen_x64_ramdisk'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_zen_x64_ramdisk',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_zen_x64_ramdisk',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCmb_zen_x64_ramdiskChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_zen_x64_ramdiskAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_zen_x64_image',
                                            layout: 'fit',
                                            title: '이미지',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_zen_x64_image',
                                                    store: 'st_zen_x64_image',
                                                    viewConfig: {
                                                        id: 'grv_zen_x64_image'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_zen_x64_image',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_zen_x64_image',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCmb_zen_x64_imageChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_zen_x64_imageAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: 'tab_zen_x64_do',
                                            layout: 'fit',
                                            title: 'DO',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_zen_x64_do',
                                                    store: 'st_zen_x64_do',
                                                    viewConfig: {
                                                        id: 'grv_zen_x64_do'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                if (value === 'firmware')
                                                                return '펌웨어';

                                                                if (value === 'ramdisk')
                                                                return '램디스크';

                                                                if (value === 'image')
                                                                return '이미지';

                                                                if (value === 'do')
                                                                return 'DO';

                                                                return value;
                                                            },
                                                            width: 140,
                                                            dataIndex: 'file_type',
                                                            text: '타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 160,
                                                            dataIndex: 'version',
                                                            text: '버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 260,
                                                            dataIndex: 'name',
                                                            text: '파일 이름'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return Ext.Date.format(new Date(value * 1000), 'Y-m-d H:i:s');
                                                            },
                                                            width: 180,
                                                            dataIndex: 'time',
                                                            text: '생성일시'
                                                        }
                                                    ]
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    id: 'tb_zen_x64_do',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_zen_x64_do',
                                                            fieldLabel: '업데이트 버전',
                                                            editable: false,
                                                            displayField: 'version',
                                                            valueField: '_id',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCmb_zen_x64_doChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onTab_zen_x64_doAfterRender,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                beforedestroy: {
                    fn: me.onWin_aus_filelistBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onFilefieldChange: function(filefield, value, eOpts) {
        var _form = Ext.getCmp('frm_version_file').getForm();
        var _file = Ext.getCmp('ffd_version_file');

        if (_form.isValid())
        {
            _form.submit({
                url : '/fileUpload',
                waitMsg : '파일을 업로드 중 입니다.',
                params : {filepath: '/tmp/'},
                success : function (fp, o) {

                    var _data = JSON.parse(o.response.responseText);
                    var _fileName = _data.data;

                    Ext.Ajax.request(
                        {
                            url : 'api/ftAUS/UploadVersion',
                            params : {
                                fileinfo : Ext.encode(_fileName)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                if (resObj.result === 'error')
                                {
                                    Ext.MessageBox.show({ title: '파일 추가', msg: '업데이트 파일 형식이 잘못 되었습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                                    return;
                                }
                                else if (resObj.result === 'already')
                                {
                                    Ext.MessageBox.show({ title: '파일 추가', msg: '이미 등록된 파일 입니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                                    return;
                                }
                                else
                                {
                                    Ext.getCmp('win_aus_filelist').store_refresh(resObj.cpu_type, resObj.file_type, resObj.model_type);
                                }
                            }
                        }
                    );
                }
            });
        }

    },

    onFfd_version_fileAfterRender: function(component, eOpts) {
        component.fileInputEl.set({
            multiple:'multiple'
        });
    },

    onButtonClick: function(button, e, eOpts) {
        var gridPanel = null;
        var comboBox = null;

        if (Ext.getCmp('tpn_xtm_mips_version').tab.active === true)
        {
            if (Ext.getCmp('tab_xtm_mips_firmware').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_mips_firmware');
                comboBox = Ext.getCmp('cmb_xtm_mips_firmware');
            }

            if (Ext.getCmp('tab_xtm_mips_ramdisk').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_mips_ramdisk');
                comboBox = Ext.getCmp('cmb_xtm_mips_ramdisk');
            }

            if (Ext.getCmp('tab_xtm_mips_image').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_mips_image');
                comboBox = Ext.getCmp('cmb_xtm_mips_image');
            }

            if (Ext.getCmp('tab_xtm_mips_do').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_mips_do');
                comboBox = Ext.getCmp('cmb_xtm_mips_do');
            }
        }

        if (Ext.getCmp('tpn_xtm_x86_version').tab.active === true)
        {
            if (Ext.getCmp('tab_xtm_x86_firmware').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_x86_firmware');
                comboBox = Ext.getCmp('cmb_xtm_x86_firmware');
            }

            if (Ext.getCmp('tab_xtm_x86_ramdisk').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_x86_ramdisk');
                comboBox = Ext.getCmp('cmb_xtm_x86_ramdisk');
            }

            if (Ext.getCmp('tab_xtm_x86_image').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_x86_image');
                comboBox = Ext.getCmp('cmb_xtm_x86_image');
            }

            if (Ext.getCmp('tab_xtm_x86_do').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_x86_do');
                comboBox = Ext.getCmp('cmb_xtm_x86_do');
            }
        }

        if (Ext.getCmp('tpn_xtm_x64_version').tab.active === true)
        {
            if (Ext.getCmp('tab_xtm_x64_firmware').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_x64_firmware');
                comboBox = Ext.getCmp('cmb_xtm_x64_firmware');
            }

            if (Ext.getCmp('tab_xtm_x64_ramdisk').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_x64_ramdisk');
                comboBox = Ext.getCmp('cmb_xtm_x64_ramdisk');
            }

            if (Ext.getCmp('tab_xtm_x64_image').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_x64_image');
                comboBox = Ext.getCmp('cmb_xtm_x64_image');
            }

            if (Ext.getCmp('tab_xtm_x64_do').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_xtm_x64_do');
                comboBox = Ext.getCmp('cmb_xtm_x64_do');
            }
        }

        if (Ext.getCmp('tpn_zen_mips_version').tab.active === true)
        {
            if (Ext.getCmp('tab_zen_mips_firmware').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_zen_mips_firmware');
                comboBox = Ext.getCmp('cmb_zen_mips_firmware');
            }

            if (Ext.getCmp('tab_zen_mips_ramdisk').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_zen_mips_ramdisk');
                comboBox = Ext.getCmp('cmb_zen_mips_ramdisk');
            }

            if (Ext.getCmp('tab_zen_mips_image').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_zen_mips_image');
                comboBox = Ext.getCmp('cmb_zen_mips_image');
            }

            if (Ext.getCmp('tab_zen_mips_do').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_zen_mips_do');
                comboBox = Ext.getCmp('cmb_zen_mips_do');
            }
        }

        if (Ext.getCmp('tpn_zen_x64_version').tab.active === true)
        {
            if (Ext.getCmp('tab_zen_x64_firmware').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_zen_x64_firmware');
                comboBox = Ext.getCmp('cmb_zen_x64_firmware');
            }

            if (Ext.getCmp('tab_zen_x64_ramdisk').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_zen_x64_ramdisk');
                comboBox = Ext.getCmp('cmb_zen_x64_ramdisk');
            }

            if (Ext.getCmp('tab_zen_x64_image').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_zen_x64_image');
                comboBox = Ext.getCmp('cmb_zen_x64_image');
            }

            if (Ext.getCmp('tab_zen_x64_do').tab.active === true)
            {
                gridPanel = Ext.getCmp('gpn_zen_x64_do');
                comboBox = Ext.getCmp('cmb_zen_x64_do');
            }
        }

        if (gridPanel === null)
        {
            Ext.MessageBox.show({ title: '파일 삭제', msg: '삭제 할 파일을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(gridPanel.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '파일 삭제', msg: '삭제 할 파일을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        item = gridPanel.getSelectionModel().getSelection()[0];
        if (comboBox.getValue() === item.raw._id)
        {
            Ext.MessageBox.show({ title: '파일 삭제', msg: '업그레이드 버전으로 선택된 파일은 삭제 할 수 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.Ajax.request(
            {
                url : 'api/ftAUS/RemoveVersion',
                params : {
                    _id : Ext.encode(item.raw._id)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getCmp('win_aus_filelist').store_refresh(resObj.cpu_type, resObj.file_type, resObj.model_type);
                }
            }
        );
    },

    onBtn_version_closeClick: function(button, e, eOpts) {
        Ext.getCmp('win_aus_filelist').close();
    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_mips_firmware';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('mips'),
                        file_type : Ext.encode('firmware'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }
    },

    onTab_xtm_mips_firmwareAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('mips', 'firmware', 'xtm');
    },

    onComboboxChange1: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_mips_ramdisk';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('mips'),
                        file_type : Ext.encode('ramdisk'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }
    },

    onTab_xtm_mips_ramdiskAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('mips', 'ramdisk', 'xtm');
    },

    onComboboxChange2: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_mips_image';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('mips'),
                        file_type : Ext.encode('image'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }

    },

    onTab_xtm_mips_imageAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('mips', 'image', 'xtm');
    },

    onComboboxChange3: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_mips_do';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('mips'),
                        file_type : Ext.encode('do'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }


    },

    onTab_xtm_mips_doAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('mips', 'do', 'xtm');
    },

    onComboboxChange4: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_x86_firmware';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x86'),
                        file_type : Ext.encode('firmware'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }


    },

    onTab_xtm_x86_firmwareAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x86', 'firmware', 'xtm');
    },

    onComboboxChange11: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_x86_ramdisk';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x86'),
                        file_type : Ext.encode('ramdisk'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }

    },

    onTab_xtm_x86_ramdiskAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x86', 'ramdisk', 'xtm');
    },

    onComboboxChange21: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_x86_image';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x86'),
                        file_type : Ext.encode('image'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }

    },

    onTab_xtm_x86_imageAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x86', 'image', 'xtm');
    },

    onComboboxChange31: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_x86_do';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x86'),
                        file_type : Ext.encode('do'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }
    },

    onTab_xtm_x86_doAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x86', 'do', 'xtm');
    },

    onComboboxChange41: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_x64_firmware';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('firmware'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }

    },

    onTab_xtm_x64_firmwareAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'firmware', 'xtm');
    },

    onComboboxChange111: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_x64_ramdisk';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('ramdisk'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }

    },

    onTab_xtm_x64_ramdiskAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'ramdisk', 'xtm');
    },

    onComboboxChange211: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_x64_image';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('image'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }


    },

    onTab_xtm_x64_imageAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'image', 'xtm');
    },

    onComboboxChange311: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'xtm_x64_do';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('do'),
                        model_type : Ext.encode('xtm'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {

                    }
                }
            );
        }

    },

    onTab_xtm_x64_doAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'do', 'xtm');
    },

    onCmb_zen_mips_firmwareChange: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'zen_x64_firmware';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('firmware'),
                        model_type : Ext.encode('zen'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }

    },

    onTab_zen_mips_firmwareAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'firmware', 'zen');
    },

    onCmb_zen_mips_ramdiskChange: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'zen_x64_ramdisk';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('ramdisk'),
                        model_type : Ext.encode('zen'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }

    },

    onTab_zen_mips_ramdiskAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'ramdisk', 'zen');
    },

    onCmb_zen_mips_imageChange: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'zen_x64_image';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('image'),
                        model_type : Ext.encode('zen'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }


    },

    onTab_zen_mips_imageAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'image', 'zen');
    },

    onCmb_zen_mips_doChange: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'zen_x64_do';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('do'),
                        model_type : Ext.encode('zen'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }

    },

    onTab_zen_mips_doAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'do', 'zen');
    },

    onCmb_zen_x64_firmwareChange: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'zen_x64_firmware';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('firmware'),
                        model_type : Ext.encode('zen'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }

    },

    onTab_zen_x64_firmwareAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'firmware', 'zen');
    },

    onCmb_zen_x64_ramdiskChange: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'zen_x64_ramdisk';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('ramdisk'),
                        model_type : Ext.encode('zen'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }

    },

    onTab_zen_x64_ramdiskAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'ramdisk', 'zen');
    },

    onCmb_zen_x64_imageChange: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'zen_x64_image';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('image'),
                        model_type : Ext.encode('zen'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {
                    }
                }
            );
        }


    },

    onTab_zen_x64_imageAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'image', 'zen');
    },

    onCmb_zen_x64_doChange: function(field, newValue, oldValue, eOpts) {
        if(field.stateId === undefined)
        {
            field.stateId = 'zen_x64_do';
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/SetVersion',
                    params : {
                        cpu_type : Ext.encode('x64'),
                        file_type : Ext.encode('do'),
                        model_type : Ext.encode('zen'),
                        _id : Ext.encode(field.getValue())
                    },
                    success : function(res_data)
                    {

                    }
                }
            );
        }

    },

    onTab_zen_x64_doAfterRender: function(component, eOpts) {
        Ext.getCmp('win_aus_filelist').store_refresh('x64', 'do', 'zen');
    },

    onWin_aus_filelistBeforeDestroy: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftAUS/GetUpdateVersion',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_aus_update').loadData(resObj);
                }
            }
        );
    },

    store_refresh: function(cpu_type, file_type, model_type) {
        Ext.Ajax.request(
            {
                url : 'api/ftAUS/GetVersion',
                params :
                {
                    cpu_type : Ext.encode(cpu_type),
                    file_type : Ext.encode(file_type),
                    model_type : Ext.encode(model_type)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    var store = 'st_' + model_type + '_' + cpu_type + '_' + file_type;

                    Ext.getStore(store).loadData(resObj);

                    var data = [];

                    for ( var i in resObj)
                        data.push(resObj[i]);

                    var cmb_store = Ext.create('Ext.data.Store', {
                        fields : ['version', '_id'],
                        data : data
                    });

                    var cmpName = 'cmb_' + model_type + '_' + cpu_type + '_' + file_type;
                    var component = Ext.getCmp(cmpName);
                    component.bindStore(cmb_store);

                    Ext.Ajax.request(
                        {
                            url : 'api/ftAUS/GetConfig',
                            success : function(res_val)
                            {
                                var resVal = JSON.parse(res_val.responseText);
                                component.setValue(resVal[model_type][cpu_type][file_type]);
                                component.updateLayout();
                            }
                        }
                    );
                }
            }
        );
    }

});