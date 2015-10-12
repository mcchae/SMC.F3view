
Ext.define('AUS.view.MyWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.tab.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Radio',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    height: 520,
    id: 'win_aus_filelist1',
    width: 780,
    layout: 'fit',
    title: '파일 목록',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    type_change: function(cpu_type, file_type) {
                        Ext.Ajax.request(
                        {
                            url : 'api/ftAUS/GetVersion',
                            params :
                            {
                                cpu_type : Ext.encode(cpu_type),
                                file_type : Ext.encode(file_type)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                Ext.getStore('st_aus_version').loadData(resObj);
                            }
                        }
                        );
                    },
                    id: 'tpc_aus_filelist1',
                    activeTab: 0,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            flex: 1,
                                            id: 'rdb_version_all1',
                                            name: 'rdb_version',
                                            boxLabel: '전체',
                                            checked: true,
                                            listeners: {
                                                change: {
                                                    fn: me.onRdb_version_allChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'radiofield',
                                            flex: 1,
                                            id: 'rdb_version_firmware1',
                                            name: 'rdb_version',
                                            boxLabel: '펌웨어',
                                            listeners: {
                                                change: {
                                                    fn: me.onRdb_version_firmwareChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'radiofield',
                                            flex: 1,
                                            id: 'rdb_version_ramdisk1',
                                            name: 'rdb_version',
                                            boxLabel: '램디스크',
                                            listeners: {
                                                change: {
                                                    fn: me.onRdb_version_ramdiskChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'radiofield',
                                            flex: 1,
                                            id: 'rdb_version_image1',
                                            name: 'rdb_version',
                                            boxLabel: '이미지',
                                            listeners: {
                                                change: {
                                                    fn: me.onRdb_version_imageChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'radiofield',
                                            flex: 1,
                                            id: 'rdb_version_do1',
                                            name: 'rdb_version',
                                            boxLabel: 'DO',
                                            listeners: {
                                                change: {
                                                    fn: me.onRdb_version_doChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'form',
                                    flex: 1,
                                    border: false,
                                    id: 'frm_version_file1',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'filefield',
                                            id: 'ffd_version_file1',
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
                                            id: 'btn_version_close1',
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
                            id: 'tpn_xtm_mips_version1',
                            layout: 'fit',
                            title: 'XTM - MIPS',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'gpn_xtm_mips_version1',
                                    header: false,
                                    store: 'st_aus_version',
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
                                        id: 'grv_xtm_mips_version1'
                                    }
                                }
                            ],
                            listeners: {
                                activate: {
                                    fn: me.onTpn_xtm_mips_versionActivate,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            id: 'tpn_xtm_x86_version1',
                            layout: 'fit',
                            title: 'XTM - x86',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'gpn_xtm_x86_version1',
                                    header: false,
                                    store: 'st_aus_version',
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
                                        id: 'grv_xtm_x86_version1'
                                    }
                                }
                            ],
                            listeners: {
                                activate: {
                                    fn: me.onTpn_xtm_x86_versionActivate,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            id: 'tpn_xtm_x64_version1',
                            layout: 'fit',
                            title: 'XTM - x64',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'gpn_xtm_x64_version1',
                                    header: false,
                                    store: 'st_aus_version',
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
                                        id: 'grv_xtm_x64_version1'
                                    }
                                }
                            ],
                            listeners: {
                                activate: {
                                    fn: me.onTpn_xtm_x64_versionActivate,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onRdb_version_allChange: function(field, newValue, oldValue, eOpts) {
        if(field.checked)
        {
            var cpu_type = 'all';

            if (Ext.getCmp('tpn_xtm_mips_version').tab.active === true)
                cpu_type = 'mips';

            if (Ext.getCmp('tpn_xtm_x86_version').tab.active === true)
                cpu_type = 'x86';

            if (Ext.getCmp('tpn_xtm_x64_version').tab.active === true)
                cpu_type = 'x64';

            Ext.getCmp('tpc_aus_filelist').type_change(cpu_type, 'all');
        }

    },

    onRdb_version_firmwareChange: function(field, newValue, oldValue, eOpts) {
        if(field.checked)
        {
            var cpu_type = 'all';

            if (Ext.getCmp('tpn_xtm_mips_version').tab.active === true)
                cpu_type = 'mips';

            if (Ext.getCmp('tpn_xtm_x86_version').tab.active === true)
                cpu_type = 'x86';

            if (Ext.getCmp('tpn_xtm_x64_version').tab.active === true)
                cpu_type = 'x64';

            Ext.getCmp('tpc_aus_filelist').type_change(cpu_type, 'firmware');
        }

    },

    onRdb_version_ramdiskChange: function(field, newValue, oldValue, eOpts) {
        if(field.checked)
        {
            var cpu_type = 'all';

            if (Ext.getCmp('tpn_xtm_mips_version').tab.active === true)
                cpu_type = 'mips';

            if (Ext.getCmp('tpn_xtm_x86_version').tab.active === true)
                cpu_type = 'x86';

            if (Ext.getCmp('tpn_xtm_x64_version').tab.active === true)
                cpu_type = 'x64';

            Ext.getCmp('tpc_aus_filelist').type_change(cpu_type, 'ramdisk');
        }

    },

    onRdb_version_imageChange: function(field, newValue, oldValue, eOpts) {
        if(field.checked)
        {
            var cpu_type = 'all';

            if (Ext.getCmp('tpn_xtm_mips_version').tab.active === true)
                cpu_type = 'mips';

            if (Ext.getCmp('tpn_xtm_x86_version').tab.active === true)
                cpu_type = 'x86';

            if (Ext.getCmp('tpn_xtm_x64_version').tab.active === true)
                cpu_type = 'x64';

            Ext.getCmp('tpc_aus_filelist').type_change(cpu_type, 'image');
        }

    },

    onRdb_version_doChange: function(field, newValue, oldValue, eOpts) {
        if(field.checked)
        {
            var cpu_type = 'all';

            if (Ext.getCmp('tpn_xtm_mips_version').tab.active === true)
                cpu_type = 'mips';

            if (Ext.getCmp('tpn_xtm_x86_version').tab.active === true)
                cpu_type = 'x86';

            if (Ext.getCmp('tpn_xtm_x64_version').tab.active === true)
                cpu_type = 'x64';

            Ext.getCmp('tpc_aus_filelist').type_change(cpu_type, 'do');
        }

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

                                var cpu_type = 'all';

                                if (Ext.getCmp('tpn_xtm_mips_version').tab.active === true)
                                    cpu_type = 'mips';

                                if (Ext.getCmp('tpn_xtm_x86_version').tab.active === true)
                                    cpu_type = 'x86';

                                if (Ext.getCmp('tpn_xtm_x64_version').tab.active === true)
                                    cpu_type = 'x64';

                                var file_type = 'all';

                                if (Ext.getCmp('rdb_version_all').checked === true)
                                    file_type = 'all';

                                if (Ext.getCmp('rdb_version_firmware').checked === true)
                                    file_type = 'firmware';

                                if (Ext.getCmp('rdb_version_ramdisk').checked === true)
                                    file_type = 'ramdisk';

                                if (Ext.getCmp('rdb_version_image').checked === true)
                                    file_type = 'image';

                                if (Ext.getCmp('rdb_version_do').checked === true)
                                    file_type = 'do';


                                Ext.getCmp('tpc_aus_filelist').type_change(cpu_type, file_type);
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
        var cpu_type = 'mips';
        var gridPanel = Ext.getCmp('gpn_xtm_mips_version');

        if (Ext.getCmp('tpn_xtm_mips_version').tab.active === true)
            cpu_type = 'mips';

        if (Ext.getCmp('tpn_xtm_x86_version').tab.active === true)
            cpu_type = 'x86';

        if (Ext.getCmp('tpn_xtm_x64_version').tab.active === true)
            cpu_type = 'x64';


        switch (cpu_type)
        {
            case 'mips':
                gridPanel = Ext.getCmp('gpn_xtm_mips_version');
                break;

            case 'x86':
                gridPanel = Ext.getCmp('gpn_xtm_x86_version');
                break;

            case 'x64':
                gridPanel = Ext.getCmp('gpn_xtm_x64_version');
                break;

            default:
                gridPanel = Ext.getCmp('gpn_xtm_mips_version');
                break;
        }

        if(gridPanel.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '파일 삭제', msg: '삭제 할 파일을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        item = gridPanel.getSelectionModel().getSelection()[0];

        console.log(item);

        Ext.Ajax.request(
            {
                url : 'api/ftAUS/RemoveVersion',
                params : {
                    _id : Ext.encode(item.raw._id)
                },
                success : function(res_data)
                {
                    var cpu_type = 'all';

                    if (Ext.getCmp('tpn_xtm_mips_version').tab.active === true)
                        cpu_type = 'mips';

                    if (Ext.getCmp('tpn_xtm_x86_version').tab.active === true)
                        cpu_type = 'x86';

                    if (Ext.getCmp('tpn_xtm_x64_version').tab.active === true)
                        cpu_type = 'x64';

                    var file_type = 'all';

                    if (Ext.getCmp('rdb_version_all').checked === true)
                        file_type = 'all';

                    if (Ext.getCmp('rdb_version_firmware').checked === true)
                        file_type = 'firmware';

                    if (Ext.getCmp('rdb_version_ramdisk').checked === true)
                        file_type = 'ramdisk';

                    if (Ext.getCmp('rdb_version_image').checked === true)
                        file_type = 'image';

                    if (Ext.getCmp('rdb_version_do').checked === true)
                        file_type = 'do';

                    Ext.getCmp('tpc_aus_filelist').type_change(cpu_type, file_type);
                }

            }
        );
    },

    onBtn_version_closeClick: function(button, e, eOpts) {
        Ext.getCmp('win_aus_filelist').close();
    },

    onTpn_xtm_mips_versionActivate: function(component, eOpts) {
        var file_type = 'all';

        if (Ext.getCmp('rdb_version_all').checked === true)
            file_type = 'all';

        if (Ext.getCmp('rdb_version_firmware').checked === true)
            file_type = 'firmware';

        if (Ext.getCmp('rdb_version_ramdisk').checked === true)
            file_type = 'ramdisk';

        if (Ext.getCmp('rdb_version_image').checked === true)
            file_type = 'image';

        if (Ext.getCmp('rdb_version_do').checked === true)
            file_type = 'do';

        Ext.getCmp('tpc_aus_filelist').type_change('mips', file_type);
    },

    onTpn_xtm_x86_versionActivate: function(component, eOpts) {
        var file_type = 'all';

        if (Ext.getCmp('rdb_version_all').checked === true)
            file_type = 'all';

        if (Ext.getCmp('rdb_version_firmware').checked === true)
            file_type = 'firmware';

        if (Ext.getCmp('rdb_version_ramdisk').checked === true)
            file_type = 'ramdisk';

        if (Ext.getCmp('rdb_version_image').checked === true)
            file_type = 'image';

        if (Ext.getCmp('rdb_version_do').checked === true)
            file_type = 'do';

        Ext.getCmp('tpc_aus_filelist').type_change('x86', file_type);
    },

    onTpn_xtm_x64_versionActivate: function(component, eOpts) {
        var file_type = 'all';

        if (Ext.getCmp('rdb_version_all').checked === true)
            file_type = 'all';

        if (Ext.getCmp('rdb_version_firmware').checked === true)
            file_type = 'firmware';

        if (Ext.getCmp('rdb_version_ramdisk').checked === true)
            file_type = 'ramdisk';

        if (Ext.getCmp('rdb_version_image').checked === true)
            file_type = 'image';

        if (Ext.getCmp('rdb_version_do').checked === true)
            file_type = 'do';

        Ext.getCmp('tpc_aus_filelist').type_change('x64', file_type);
    }

});