
Ext.define('SSL.view.win_ssl_service_port', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.button.Button'
    ],

    id: 'win_ssl_service_port',
    autoScroll: true,
    title: '서비스 포트',
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
                    xtype: 'form',
                    flex: 1,
                    id: 'fm',
                    autoScroll: true,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn',
                            minWidth: 750,
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'name',
                                    width: 500,
                                    fieldLabel: '객체 이름',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    enforceMaxLength: true,
                                    maxLength: 31
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'desc',
                                    width: 500,
                                    fieldLabel: '설명',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    enforceMaxLength: true,
                                    maxLength: 127
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'protocol',
                                    fieldLabel: '프로토콜'
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_tcp',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_source',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'start',
                                                    fieldLabel: '출발지 포트'
                                                },
                                                {
                                                    xtype: 'label',
                                                    padding: '3 3 3 3',
                                                    text: '~'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'end'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 6
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_dest',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'start',
                                                    fieldLabel: '목적지 포트'
                                                },
                                                {
                                                    xtype: 'label',
                                                    padding: '3 3 3 3',
                                                    text: '~'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'end'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    itemId: 'ctn_udp',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_source',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'start',
                                                    fieldLabel: '출발지 포트'
                                                },
                                                {
                                                    xtype: 'label',
                                                    padding: '3 3 3 3',
                                                    text: '~'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'end'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 6
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_dest',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'start',
                                                    fieldLabel: '목적지 포트'
                                                },
                                                {
                                                    xtype: 'label',
                                                    padding: '3 3 3 3',
                                                    text: '~'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'end'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    itemId: 'ctn_icmp',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            width: 500,
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Any'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            width: 500,
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'echo-request'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'echo-reply'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'destination-unreachable'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            width: 500,
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'source-quench'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'redirect'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'router-advertisement'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            width: 500,
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'router-solicitation'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'time-exceeded'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'timestamp-reply'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            width: 500,
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'address-mask-request'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'timestamp-request'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'address-mask-reply'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 6
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            width: 100,
                                            text: '확인',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 0 0 5',
                                            width: 100,
                                            text: '취소',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick,
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
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        var m_count = Ext.getCmp("NFW2_domain").m_count;
        var count = Ext.getCmp("NFW2_domain").count;

        var name = Ext.getCmp("name");
        var desc = Ext.getCmp("desc");
        var domain = Ext.getCmp("domain");

        if(name.validateValue()===false){ name.focus(); return false; }
        if(CheckNotNull(domain.getValue())===false){ prt_errMsg(get_msg("err_null"),"errorBox"); domain.focus(); return false; }

        var arr_domain = domain.getValue().split(",");

        if(arr_domain.length > m_count){
            prt_errMsg(ValidMaxCnt(m_count),'errorBox');
            domain.focus();
            return false;
        }

        for(var i=0; i<arr_domain.length; i++){

            var fir = (/^[a-z]/).test(arr_domain[i]);

            if(fir===true){

                var d_sp = arr_domain[i].split("..");
                if(d_sp.length > 1){ prt_errMsg(ValidIP("도메인 "),"errorBox"); domain.focus(); return false; }
                if(ValidDomain(arr_domain[i],2)===false){ prt_errMsg(ValidIP("도메인 "),"errorBox"); domain.focus(); return false; }

            }else{

                if(arr_domain[i].substring(0,2) !== "*."){ prt_errMsg(ValidIP("도메인 "),"errorBox"); domain.focus(); return false; }

                if(arr_domain[i].substring(0,5) === "*.com" || arr_domain[i].substring(0,7) === "*.co.kr"){
                    prt_errMsg(ValidIP("도메인 "),"errorBox"); domain.focus();
                    return false;
                }
            }

        }

        Ext.getCmp("errorBox").hide();

        var obj = {
            'name': name.getValue(),
            'desc': desc.getValue(),
            'domain': arr_domain
        };

        var update = (me.edit==="edit")?true:false;

        var key = {
            name: name.getValue(),
            _kind: 'object_domain'
        };

        if(update){
            key['@cid'] = { '$ne': me.record['@cid'] };
            obj['@cid'] = me.record['@cid'];
        }

        var _params = {
            basename: Ext.encode('object_domain'),
            obj: Ext.encode(obj),
            id_info: Ext.encode({'fieldname':'@cid'}),
            num_info: Ext.encode({'fieldname':'@num'}),
            update: Ext.encode(update)
        };

        var _param = {
            basename: Ext.encode("with_cid"),
            key: Ext.encode(key)
        };

        if(me.name !== name.getValue()){

            request_helper.xmlrpc_call_JsonP(
                'ftuctrl',
                'getObject',
                _param,
                function(response){

                    if(response !== null){
                        Ext.MessageBox.confirm("",get_msg("conf_validN"),function(btn){
                            if(btn === "yes"){
                                fn_set();
                            }
                        });
                    }else{
                        fn_set();
                    }
                }
            );
        }else{
            fn_set();
        }

        function fn_set(){

            Ext.data.JsonP.request({
                url: "/api/ftuctrl/setObjectWithCid",
                params: _params,
                success: function(response){

                    if(response.retcode === true){

                        var store = Ext.data.StoreManager.lookup("store_domain_list");
                        store.load();

                        if(store.getTotalCount()+1 >= count){
                            me.close();
                            return false;
                        }

                        if(update === true){

                            Ext.Msg.show({
                                title: 'System Message - SUCCESS',
                                msg: get_msg("msg_ok_edit"),
                                width: 300,
                                buttons: Ext.Msg.OK,
                                fn: setWinClose,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }else{

                            Ext.Msg.show({
                                title: 'System Message - SUCCESS',
                                msg: get_msg("msg_ok_add"),
                                width: 300,
                                buttons: Ext.Msg.YESNO,
                                buttonText:{
                                    yes: "계속 추가",
                                    no: "닫기"
                                },
                                fn: setWinState,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }
                    }else{
                        console.log(response.errcode);
                    }
                },
                failrue: function(response){
                    console.log("fail");
                }
            });
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        if(component.isNew === false)
        {
            var item = Ext.getCmp('win_ssl_service').getComponent('tabControl').getComponent('port').getComponent('grid').getSelectionModel().getSelection()[0].raw;

            component.getComponent('fm').getComponent('ctn').getComponent('name').setValue(item.name);
            component.getComponent('fm').getComponent('ctn').getComponent('desc').setValue(item.desc);

            component.getComponent('fm').getComponent('ctn').getComponent('protocol').setValue(item.protocol.type);

            component.getComponent('fm').getComponent('ctn').getComponent('ctn_tcp').getComponent('ctn_source').getComponent('start').setValue(item.source.start);
            component.getComponent('fm').getComponent('ctn').getComponent('ctn_tcp').getComponent('ctn_source').getComponent('end').setValue(item.source.end);

            component.getComponent('fm').getComponent('ctn').getComponent('ctn_tcp').getComponent('ctn_dest').getComponent('start').setValue(item.dest.start);
            component.getComponent('fm').getComponent('ctn').getComponent('ctn_tcp').getComponent('ctn_dest').getComponent('end').setValue(item.dest.end);

            console.log(item);
        }


    }

});