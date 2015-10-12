
Ext.define('SMC4ZEN.view.pnl_xtm_network_interface', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_network_interfaceViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View'
    ],

    config: {
        deviceParams: ''
    },

    viewModel: {
        type: 'pnl_xtm_network_interface'
    },
    height: 680,
    id: 'pnl_xtm_network_interface',
    width: 800,
    bodyPadding: 10,
    title: '인터페이스',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_network_interfaceAfterRender',
        beforeclose: 'onPnl_xtm_network_interfaceBeforeClose'
    },
    items: [
        {
            xtype: 'fieldset',
            itemId: 'fds_interface_set',
            margin: '0, 0, 10, 0',
            title: '설정',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    itemId: 'ctn_interface_iptype',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_iptype',
                            margin: '0, 100, 0, 0',
                            width: 250,
                            fieldLabel: 'IP 타입',
                            value: null,
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            valueField: 'value',
                            listeners: {
                                change: 'onCmb_iptypeChange',
                                afterrender: 'onCmb_iptypeAfterRender'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            flex: 1,
                            itemId: 'ck_multi',
                            fieldLabel: '',
                            boxLabel: 'Multipath 라우팅 허용'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_interface_top',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_duplex',
                            margin: '0, 100, 0, 0',
                            width: 250,
                            fieldLabel: 'Duplex',
                            editable: false,
                            displayField: 'duplex',
                            valueField: 'duplex',
                            listeners: {
                                change: 'onCmb_duplexChange',
                                afterrender: 'onCmb_duplexAfterRender'
                            }
                        },
                        {
                            xtype: 'combobox',
                            disabled: true,
                            itemId: 'cmb_speed',
                            width: 250,
                            fieldLabel: 'Speed',
                            editable: false,
                            displayField: 'speed',
                            valueField: 'speed',
                            listeners: {
                                afterrender: 'onCmb_speedAfterRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_interface_bottom',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_mtu',
                            margin: '0, 100, 0, 0',
                            width: 250,
                            fieldLabel: 'MTU',
                            editable: false,
                            displayField: 'mtu',
                            valueField: 'mtu',
                            listeners: {
                                afterrender: 'onCmb_mtuAfterRender'
                            }
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_part',
                            width: 250,
                            fieldLabel: '구분',
                            editable: false,
                            displayField: 'part',
                            valueField: 'part',
                            listeners: {
                                afterrender: 'onCmb_partAfterRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_interface_multi',
                    margin: '0, 0, 10, 0',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_interface_bandwidth',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        if(value){

                                            var retValue = LengthCheck(value, 1, 10000);

                                            if(!retValue){

                                                return false;

                                            }

                                        }

                                        return true;
                                    },
                                    itemId: 'nfd_bandwidth',
                                    margin: '0, 10, 0, 0',
                                    width: 250,
                                    fieldLabel: '수동 대역폭'
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    text: 'Mbps (1 ~ 10000 Mbps)'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_interface_mss',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        if(value){

                                            var retValue = LengthCheck(value, 100, 1460);

                                            if(!retValue){

                                                return false;

                                            }

                                        }

                                        return true;
                                    },
                                    itemId: 'nfd_manualmss',
                                    margin: '0, 10, 0, 0',
                                    width: 250,
                                    fieldLabel: '수동 MSS'
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    text: '(100 ~ 1460)'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            hidden: true,
            itemId: 'fds_interface_ethset',
            title: '인터페이스 설정',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'form',
                    flex: 1,
                    border: false,
                    itemId: 'fpn_interface_valid',
                    margin: '0, 0, 10, 0',
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_interface_ipv4',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value){

                                            var retValue = ValidIPAddress(value);

                                            if(!retValue){

                                                return false;

                                            }

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_ipv4',
                                    margin: '0, 100, 0, 0',
                                    width: 250,
                                    fieldLabel: 'IPv4 주소',
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value){

                                            var retValue = ValidIPAddress(value);

                                            if(!retValue){

                                                return false;

                                            }

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_netmask',
                                    width: 250,
                                    fieldLabel: '넷마스크',
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_interface_ipv6',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value){

                                            var retValue = ValidIPv6(value);

                                            if(!retValue){

                                                return false;

                                            }

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_ipv6',
                                    margin: '0, 100, 0, 0',
                                    width: 250,
                                    fieldLabel: 'IPv6 주소'
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        if(value){

                                            var retValue = LengthCheck(value, 1, 128);

                                            if(!retValue){

                                                return false;

                                            }


                                        }

                                        return true;
                                    },
                                    itemId: 'nfd_prefix',
                                    width: 250,
                                    fieldLabel: '프리픽스'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            hidden: true,
            itemId: 'fds_interface_autoip',
            padding: 10,
            layout: 'fit',
            title: '자동 IP 주소 설정',
            items: [
                {
                    xtype: 'form',
                    border: false,
                    itemId: 'fpn_interface_valid',
                    bodyPadding: 10,
                    title: '',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            itemId: 'txf_user',
                            margin: '0, 10, 0, 0',
                            width: 250,
                            fieldLabel: '사용자'
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            itemId: 'txf_passwd',
                            margin: '0, 10, 0, 0',
                            width: 250,
                            fieldLabel: '비밀번호',
                            inputType: 'password'
                        },
                        {
                            xtype: 'combobox',
                            flex: 1,
                            itemId: 'cmb_modem',
                            fieldLabel: '모뎀',
                            displayField: 'modem',
                            valueField: 'modem',
                            listeners: {
                                afterrender: 'onCmb_modemAfterRender'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'ctn_interface_control',
            margin: '0, 0, 10, 0',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_mod',
                    width: 100,
                    text: '수 정',
                    listeners: {
                        click: 'onBt_modClick'
                    }
                }
            ]
        },
        {
            xtype: 'gridpanel',
            flex: 1,
            itemId: 'gpn_interface_set',
            title: '',
            columns: [
                {
                    xtype: 'rownumberer',
                    text: 'N'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: '인터페이스',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var str_type = value['@type'];

                        return (str_type) ? str_type : 'None';
                    },
                    width: 184,
                    dataIndex: 'setting',
                    text: '타입',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value[0]['#text'];
                    },
                    width: 184,
                    dataIndex: 'ip',
                    text: 'IPv4',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value['@duplex'];
                    },
                    dataIndex: 'setting',
                    text: 'Duplex',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value['@speed'];
                    },
                    dataIndex: 'setting',
                    text: 'Speed',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value['@mode'];
                    },
                    dataIndex: 'setting',
                    text: '구분',
                    flex: 1
                }
            ],
            listeners: {
                itemclick: 'onGpn_interface_setItemClick',
                beforerender: 'onGpn_interface_setBeforeRender'
            }
        }
    ],

    onPnl_xtm_network_interfaceAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_interfaceAfterRender ========================================================================================================================================
        //
        // 일시 : 2014.07.08
        //
        // 설명 : 인터페이스 정보를 그리드에 출력합니다.
        //
        // 추가 설명 :
        //
        // ===============================================================================================================================================================================

        var eth_count = Ext.getStore('st_common_deveth').count();
        var st_interface = Ext.getStore('st_interface_grid');

        this.initStore();

        if(component.deviceParams){

            var eth = component.deviceParams['interface'];

            try{

                for(var j = 0, max = eth_count; j < max; j++){

                    st_interface.add(eth[j]);

                }

            }
            catch(err){

                console.log('인터페이스 데이터를 초기화 중 catch 발생 : ', err);

            }

        }
    },

    onPnl_xtm_network_interfaceBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_network_interfaceBeforeClose ========================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : 데이터를 저장하고 view 상태를 true 로 변경합니다.
        //
        // ===============================================================================================================================================================================

        this.saveData();

        Ext.getCmp('win_smc_device_set').viewState = true;
    },

    onCmb_iptypeChange: function(field, newValue, oldValue, eOpts) {
        var component = this.componentStorage();

        if(newValue === 'Static'){

            component.fds_autoip.setVisible(false);
            component.fds_ethset.setVisible(true);

        }
        else if(newValue === 'PPPoE'){

            component.fds_autoip.setVisible(true);
            component.fds_ethset.setVisible(false);

        }
        else{

            component.fds_autoip.setVisible(false);
            component.fds_ethset.setVisible(false);

        }
    },

    onCmb_iptypeAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {

            'storeId' : 'st_interface_iptype',
            'fields' : [
                {	'name' : 'name'		},
                {	'name' : 'value'	}
            ],
            'data' : [
                {	'name' : 'None', 'value' : null				},
                {	'name' : 'Static', 'value' : 'Static'		},
                {	'name' : 'DHCP', 'value' : 'DHCP'			},
                {	'name' : 'PPPoE', 'value' : 'PPPoE'			},
                {	'name' : 'HSDPA/LTE', 'value' : 'HSDPA/LTE'	}
            ]

        }));

        component.setValue(null);
    },

    onCmb_duplexChange: function(field, newValue, oldValue, eOpts) {
        var speedField = field.up().down('[itemId=cmb_speed]');

        if(newValue === 'Auto')
            speedField.setDisabled(true);
        else
            speedField.setDisabled(false);
    },

    onCmb_duplexAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {

            'storeId' : 'st_interface_duplex',
            'fields' : [
                {	'name' : 'duplex'	}
            ],
            'data' : [
                {	'duplex' : 'Auto'	},
                {	'duplex' : 'Full'	},
                {	'duplex' : 'Half'	}
            ]

        }));

        component.setValue('Auto');
    },

    onCmb_speedAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {

            'storeId' : 'st_interface_speed',
            'fields' : [
                {	'name' : 'speed'	}
            ],
            'data' : [
                {	'speed' : 'Auto'	},
                {	'speed' : '10MBps'	},
                {	'speed' : '100MBps'	},
                {	'speed' : '1GBps'	},
                {	'speed' : '10GBps'	}
            ]

        }));

        component.setValue('Auto');
    },

    onCmb_mtuAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {

            'storeId' : 'st_interface_mtu',
            'fields' : [
                {	'name' : 'mtu'	}
            ],
            'data' : [
                {	'mtu' : 'Default'	},
                {	'mtu' : 1000		},
                {	'mtu' : 1200		},
                {	'mtu' : 1280		},
                {	'mtu' : 1400		},
                {	'mtu' : 1440		},
                {	'mtu' : 1448		},
                {	'mtu' : 1456		},
                {	'mtu' : 1464		},
                {	'mtu' : 1472		},
                {	'mtu' : 1480		},
                {	'mtu' : 1488		}
            ]

        }));

        component.setValue('Default');
    },

    onCmb_partAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {

            'storeId' : 'st_interface_part',
            'fields' : [
                {	'name' : 'part'	}
            ],
            'data' : [
                {	'part' : 'Internal'	  },
                {	'part' : 'DMZ'	      },
                {	'part' : 'External'	  }
            ]

        }));

        component.setValue('Internal');
    },

    onCmb_modemAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_interface_modem',
            'fields' : [
                {	'name' : 'modem'	}
            ],
            'data' : [
                {	'modem' : 'None'	},
                {	'modem' : 'Samsung'	},
                {	'modem' : 'Hyundai'	}
            ]

        }));

        component.setValue('None');
    },

    onBt_modClick: function(button, e, eOpts) {
        // onBt_modClick ================================================================================================================================================================
        //
        // 일시 : 2014.06.23
        //
        // 설명 : 인터페이스 정보를 수정합니다.
        //
        // 추가 : 인터페이스 정보를 수정하면 Point to Point Protocol이 인터페이스 스토어에 추가됩니다. 추가되는 스토어는 다음과 같습니다.
        //
        // - totalEth Store
        // - pppStore (dev + ppp)
        // - (추가) st_etc_eth
        //
        // 수정 :
        //
        // - (2014.10.10 김민수 기타 정보에서 multi 체크박스 설정시에 st_etc_eth 에 데이터가 추가되도록 변경)
        //
        // ==============================================================================================================================================================================

        var totalEthStore = Ext.getStore('st_common_totaleth');
        var pppEthStore   = Ext.getStore('st_common_pppeth');
        var etcEthStore   = Ext.getStore('st_etc_eth');

        var component = this.componentStorage();

        var iptype    = component.iptype.getValue();
        var duplex    = component.duplex.getValue();
        var speed     = component.speed.getValue();
        var mtu       = component.mtu.getValue();
        var part      = component.part.getValue();

        var multi     = component.multi.getValue();

        var bandwidth = component.bandwidth.getValue();
        var manualmss = component.manualmss.getValue();

        var user_id   = component.user.getValue();
        var modem     = component.modem.getValue();
        var user_passwd = component.passwd.getValue();

        var ipv4      = component.ipv4.getValue();
        var netmask   = component.netmask.getValue();

        var ipv6      = component.ipv6.getValue();
        var prefix    = component.prefix.getValue();

        // 수정 데이터 설정 ================================================================================================================================================================

        if(!component.ethgrid.getSelectionModel().getSelection()[0]){

            Ext.Msg.show({

                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                msg : '수정할 인터페이스 데이터를 선택하세요.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return;

        }

        // 유효성 검사 ====================================================================================================================================================================

        if(!this.validityCheck().ethBasicCheck() || !this.validityCheck().ethBlankCheck(iptype) || !this.validityCheck().ethIpCheck() || !this.validityCheck().prefixCheck()){

            return;

        }

        // 인터페이스 데이터 객체 ===========================================================================================================================================================

        var obj     = {};

        var ipArray = [];

        var ipv4Obj = {},
            ipv6Obj = {};

        if(ipv4 !== "" && iptype === 'Static'){

            ipv4Obj['#text'] = ipv4 + '/' + netmask;

        }

        ipv4Obj['@type']         = 'netmask';
        ipv4Obj['@version']      = 'v4';

        if(ipv6 !== "" && iptype === 'Static'){

            ipv6Obj['#text'] = ipv6 + '/' + prefix;

        }

        ipv6Obj['@type']         = 'prefix';
        ipv6Obj['@version']      = 'v6';

        ipArray.push(ipv4Obj);
        ipArray.push(ipv6Obj);

        var adslObj              = {};

        adslObj.id               = user_id;
        adslObj.modem            = modem;
        adslObj.password         = user_passwd;

        obj.adsl                 = adslObj;
        obj.ip                   = ipArray;

        var setObj               = {};

        setObj['@band']          = bandwidth;
        setObj['@chk_frag']      = "on";
        setObj['@chk_multipath'] = (multi === true) ? 'on' : 'off';
        setObj['@duplex']        = duplex;
        setObj['@mode']          = part;
        setObj['@mss']           = manualmss;
        setObj['@mtusize']       = (mtu === 'Default') ? "Default" : mtu;
        setObj['@speed']         = speed;
        setObj['@type']          = iptype;

        obj.setting              = setObj;

        // 선택된 인터페이스 Row ===========================================================================================================================================================

        var selectRow = component.ethgrid.getSelectionModel().getSelection()[0];
        var rowIndex  = component.ethgrid.getStore().indexOf(selectRow);

        // Multipath 라우팅이 체크 되었을 경우 ==============================================================================================================================================
        //
        // 설명 : multipath 가 체크되어 있을경우 기타설정 화면에서 사용하는 인터페이스 스토어에 적용됩니다.
        //
        // ==============================================================================================================================================================================

        if(multi){

            etcEthStore.add({	'eth' : selectRow.get('name')	});

        }
        else{

            for(var i = 0, max = etcEthStore.count(); i < max; i++){

                if(selectRow.get('name') === etcEthStore.getAt(i).get('eth')){

                    etcEthStore.removeAt(i);

                }

            }

        }

        // IPTYPE이 PPPoE 로 선택될 경우 ===================================================================================================================================================
        //
        // 설명 : 해당하는 인터페이스가 PPPn 으로 변경됩니다. PPP는 라우팅 메뉴에서만 사용합니다. 변경되는 스토어는 totalEth, pppEth 입니다.
        //
        // ==============================================================================================================================================================================

        if(iptype === 'PPPoE'){

            totalEthStore.getAt(rowIndex).set(	{	'eth' : 'ppp' + rowIndex	});
            pppEthStore.getAt(rowIndex).set(	{	'eth' : 'ppp' + rowIndex	});

        }
        else{

            totalEthStore.getAt(rowIndex).set(	{	'eth' : 'eth' + rowIndex	});
            pppEthStore.getAt(rowIndex).set(	{	'eth' : 'eth' + rowIndex	});

        }

        selectionGrid_Mod(component.ethgrid, obj);
    },

    onGpn_interface_setItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_interface_setItemClick ===========================================================================================================
        //
        // 설명 : 그리드 클릭시 인터페이스 정보를 출력합니다. type 에 따라 표시하는 화면이 달라집니다. 입력창은 클릭시 모두 초기화합니다.
        //
        // ========================================================================================================================================

        var component = this.componentStorage();

        // 폼 패널을 초기화 합니다. ===================================================================================================================

        component.autovalid.getForm().reset();
        component.ethvalid.getForm().reset();

        component.iptype.setValue((record.data.setting['@type'] === null) ? 'None': record.data.setting['@type']);
        component.duplex.setValue(record.data.setting['@duplex']);
        component.speed.setValue(record.data.setting['@speed']);
        component.mtu.setValue(record.data.setting['@mtusize']);

        if(record.data.name !== 'eth0'){

            component.multi.setDisabled(false);

            component.part.setDisabled(false);

            component.part.setValue(record.data.setting['@mode']);

            component.multi.setValue((record.data.setting['@chk_multipath'] === 'on') ? true : false);

        }
        else {

            component.multi.setDisabled(true);

            component.part.setDisabled(true);

            component.part.setValue('Internal');

        }

        component.bandwidth.setValue(record.data.setting['@band']);
        component.manualmss.setValue(record.data.setting['@mss']);

        if(record.data.adsl){

            component.user.setValue(record.data.adsl.id);
            component.passwd.setValue(record.data.adsl.password);
            component.modem.setValue(record.data.adsl.modem);

        }

        if(record.data.ip[0]['#text'] !== undefined){

            component.ipv4.setValue(record.data.ip[0]['#text'].split('/')[0]);

            component.netmask.setValue(record.data.ip[0]['#text'].split('/')[1]);

        }

        if(record.data.ip[1]['#text'] !== undefined){

            component.ipv6.setValue(record.data.ip[1]['#text'].split('/')[0]);

            component.prefix.setValue(Number(record.data.ip[1]['#text'].split('/')[1]));

        }
    },

    onGpn_interface_setBeforeRender: function(component, eOpts) {
        // 생성된 스토어와 그리드와 바인딩

        component.bindStore(Ext.getStore('st_interface_grid'));
    },

    componentStorage: function() {
        var component   = Ext.getCmp('pnl_xtm_network_interface');

        var obj = {};

        var fds_eth     = this.down('[itemId=fds_interface_set]');
        var fds_autoip  = this.down('[itemId=fds_interface_autoip]');
        var fds_ethset  = this.down('[itemId=fds_interface_ethset]');
        var ctn_control = this.down('[itemId=ctn_interface_control]');

        obj.fds_eth    = fds_eth;
        obj.fds_autoip = fds_autoip;
        obj.fds_ethset = fds_ethset;

        obj.iptype    = fds_eth.down('[itemId=cmb_iptype]');
        obj.duplex    = fds_eth.down('[itemId=cmb_duplex]');
        obj.speed     = fds_eth.down('[itemId=cmb_speed]');
        obj.mtu       = fds_eth.down('[itemId=cmb_mtu]');
        obj.part      = fds_eth.down('[itemId=cmb_part]');
        obj.multi     = fds_eth.down('[itemId=ck_multi]');
        obj.bandwidth = fds_eth.down('[itemId=nfd_bandwidth]');
        obj.manualmss = fds_eth.down('[itemId=nfd_manualmss]');

        obj.autovalid = fds_autoip.down('[itemId=fpn_interface_valid]');
        obj.user      = fds_autoip.down('[itemId=txf_user]');
        obj.passwd    = fds_autoip.down('[itemId=txf_passwd]');
        obj.modem     = fds_autoip.down('[itemId=cmb_modem]');

        obj.ethvalid  = fds_ethset.down('[itemId=fpn_interface_valid]');
        obj.ipv4      = fds_ethset.down('[itemId=txf_ipv4]');
        obj.netmask   = fds_ethset.down('[itemId=txf_netmask]');
        obj.ipv6      = fds_ethset.down('[itemId=txf_ipv6]');
        obj.prefix    = fds_ethset.down('[itemId=nfd_prefix]');

        obj.ethgrid   = component.down('[itemId=gpn_interface_set]');

        return obj;
    },

    validityCheck: function() {
        // validateCheck ========================================================================================================================
        //
        // 일시 : 2014.07.08
        //
        // 설명 : 인터페이스 정보 수정시 유효성 검사를 수행합니다.
        //
        //
        // ======================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            ethBlankCheck : function(type){

                if(type === 'Static' && component.ipv4.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(type === 'Static' && component.netmask.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '넷마스크는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(type === 'PPPoE' && component.user.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '사용자는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(type === 'PPPoE' && component.passwd.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '비밀번호는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            ethBasicCheck : function(){

                if(!component.bandwidth.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '대역폭의 범위는 1 ~ 10000 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.manualmss.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'MMS의 범위는 100 ~ 1460 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            ethIpCheck : function(){

                if(component.ipv4.getValue() !== '' && !component.ipv4.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.netmask.getValue() !== '' && !component.netmask.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '넷마스크 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.ipv6.getValue() !== '' && !component.ipv6.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v6 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            prefixCheck : function(){

                if(!component.prefix.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Prefix의 범위는 1 ~ 128 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 :
        //
        // 설명 : 네트워크 인터페이스 데이터를 저장한다.
        //
        // 수정 :
        //
        // (2014.09.26 김민수) - IPType이 None 이면 null로 저장되도록 수정.
        //
        // =============================================================================================================================================================================

        var ethgridStore = Ext.getStore('st_interface_grid');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var ethCount = ethgridStore.count();

        var dataObj;

        if(ethCount === 1){

            dataObj = {};

            dataObj = ethgridStore.getAt(0).data;

        }
        else if(ethCount > 1){

            dataObj = [];

            for(var i = 0, max = ethCount; i < max; i++){

                dataObj.push(ethgridStore.getAt(i).data);

            }

        }

        if(deviceAllData.network_interface){

            deviceAllData.network_interface['interface'] = dataObj;

        }
        else{

            deviceAllData.network_interface = {};

            deviceAllData.network_interface['interface'] = dataObj;

        }

        return true;
    },

    initStore: function() {
        Ext.getStore('st_interface_grid').removeAll();
    }

});