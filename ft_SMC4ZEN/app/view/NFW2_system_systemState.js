
Ext.define('SMC4ZEN.view.NFW2_system_systemState', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_systemstate',

    requires: [
        'SMC4ZEN.view.NFW2_system_systemStateViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.panel.Tool',
        'Ext.form.Label',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_system_systemstate'
    },
    title : '예약 재시작',
    overflowY : 'auto',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding : 5,
    defaultListenerScope: true,
    items: [
        {
            xtype: 'form',
            flex: 1,
            id: 'fm_sys_state',
            layout: 'auto',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            bind: {
                                title: '{restart_reserved}'
                            },
                            tools: [
                                {
                                    xtype: 'toggleslide',
                                    resizeHandle: false,
                                    state: true,
                                    id : 'use_sysstate',
                                    listeners: {
                                        change: 'onToolChange',
                                        beforerender: 'onToolBeforeRender'
                                    }
                                }
                            ],
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_reboot',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 10 0',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'mt_noti',
                                                    bind: {
                                                        text: '{system_info4}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'con_date',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                                    margin: 0,
                                                    width: 100,
                                                    bind: {
                                                        text: '{date_entry}'
                                                    }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: 'reser_date',
                                                    width: 200,
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    editable: false,
                                                    enforceMaxLength: true,
                                                    format: 'Y-m-d',
                                                    submitFormat: 'Y-m-d',
                                                    bind : {
                                                        value : '{system_reboot.system_reboot.day}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'con_time',
                                            margin: '10 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                                    id: 'l_time',
                                                    margin: 0,
                                                    width: 100,
                                                    bind: {
                                                        text: '{time_entry}'
                                                    }
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    id: 'reser_hour',
                                                    width: 60,
                                                    labelSeparator: ' ',
                                                    value: '00',
                                                    editable: false,
                                                    format: 'H',
                                                    increment: 60
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{hour}'
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'reser_min',
                                                    padding: '0 0 0 6',
                                                    width: 60,
                                                    labelSeparator: ' ',
                                                    value: '00',
                                                    editable: false,
                                                    displayField: 'val',
                                                    queryMode: 'local',
                                                    store: 'store_system_state_min',
                                                    valueField: 'val',
                                                    bind : {
                                                        value : '{system_reboot.system_reboot.minute}'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{min}'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            width : 100,
                                                            cls: 'btn_b',
                                                            componentCls: 'btn_auth',
                                                            margin: '0 0 0 10',
                                                            bind: {
                                                                text: '{reset}'
                                                            },
                                                            listeners: {
                                                                click: 'onButtonClick2'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ] 
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            margin: '10 0 0 0',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                }
            ]
        }
    ],
    listeners: {
       afterrender: 'onViewportAfterRender',
       beforeclose : 'saveData'
    },

    onToolChange: function(tool, state) {
        
        var _panel = tool.up('panel');

        if(state === false){

            Ext.getCmp("fm_sys_state").getForm().reset();

        }

        var _state = (state) ? false : true;

        _panel.query('container:not(header)').forEach(function(c){ 

            c.setDisabled(_state);

        });

    },

    onToolBeforeRender: function(component, eOpts) {

        component.offText = __zen('toggle_off');
        component.onText = __zen('toggle_on');

    },

    onButtonClick2: function(button, e, eOpts) {

        var me = this;

        Ext.MessageBox.confirm(__weguardia, "설정을 초기화하시겠습니까?", function(btn){

            if(btn === "yes"){

                Ext.getCmp("fm_sys_state").getForm().reset();

            }

        });

    },

    onViewportAfterRender: function(component, eOpts) {
        
        var me = this;
        var vm = me.getViewModel();
        var vd = vm.getData().system_reboot.system_reboot;

        Ext.getCmp('reser_date').setValue(vd.day);
        Ext.getCmp('reser_hour').setValue((vd.hour === null) ? '00' : vd.hour);
        Ext.getCmp('reser_min').setValue((vd.minute === null) ? '00' : vd.minute);
        
    },

    checkRqDate: function() {
        var reser_date = Ext.getCmp("reser_date").getRawValue().split("-");
        reser_date = reser_date.join("");
        var reser_hour = Ext.getCmp("reser_hour").getRawValue();
        var reser_min = Ext.getCmp("reser_min").getValue();

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();

        var monthtext = (month+1>=10)?month+1:"0"+(month+1);
        var daytext = (date>=10)?date:"0"+date;

        var today = year + "" + monthtext + "" + daytext;

        if(reser_date < today && reser_date !== null){
            Ext.Msg.alert(__weguardia,"입력하신 날짜는 오늘 날짜보다 이전입니다.");
            return false;
        }

        if(reser_date === today){
            if(reser_hour < hour || Number(reser_hour) === Number(hour) && Number(reser_min) < Number(minute)){
                Ext.Msg.alert(__weguardia,"입력하신 시간은 현재 시간보다 이전 시간입니다.");
                return false;
            }
        }
    },

    saveData : function(component, eOpts){

        var me = this;
        var vm = me.parentObj.getViewModel();

        // 저장 데이터 취합

        var b_reboot = Ext.getCmp("b_reboot");

        var reser_date = Ext.getCmp("reser_date");
        var reser_hour = Ext.getCmp("reser_hour");
        var reser_min = Ext.getCmp("reser_min");

        // 유효성 검사

        if(Ext.getCmp('use_sysstate').state){

            if(!CheckNotNull(reser_date.getRawValue())){ 

                prt_errMsg(get_msg('err_null'), null); 
                reser_date.focus();

                me.parentObj.viewState = false;

                return false;

            }

            if(reser_date.isValid()===false){ 

                reser_date.focus(); 

                me.parentObj.viewState = false;

                return false; 

            }

            if(this.checkRqDate() === false){ 

                me.parentObj.viewState = false;

                return false; 

            }

        }

        var rebootObj = {};
        var rebootData = {};

        rebootData.day = reser_date.getRawValue();
        rebootData.hour = reser_hour.getRawValue();
        rebootData.minute = reser_min.getValue();
        rebootData.system = "reservation";

        rebootObj.system_reboot = rebootData;

        vm.set('system_reboot', rebootObj);

        me.parentObj.viewState = true;

        return true;

    }

});