
Ext.define('SMC4ZEN.view.NFW2_system_backup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_backup',

    requires: [
        'SMC4ZEN.view.NFW2_system_backupViewModel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.Label',
        'Ext.form.field.Time',
        'Ext.toolbar.Toolbar',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.tab.Panel',
        'Ext.form.field.Display',
        'Ext.tab.Tab'
    ],

    config: {
        obj_d: {
            integrity: '',
            restore: ''
        }
    },

    viewModel: {
        type: 'nfw2_system_backup'
    },
    //cls: 'zen_body',
    bodyPadding : 5,
    id: 'NFW2_system_backup',
    width: 900,
    defaultListenerScope: true,
    overflowY : 'auto',
    title : '주기적 검사',
    listeners: {
        afterrender: 'onNFW2_system_backupAfterRender',
        beforeclose : 'saveData'
    },
    initConfig: function(instanceConfig) {
        var me = this,
        config = {
            items : [
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            width: 110,
                            bind: {
                                text: '{period_chk}'
                            }
                        },
                        {
                            xtype: 'container',
                            html: '<div id="integrity"/>',
                            listeners: {
                                render: 'onContainerRender1'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '8 0 10 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            disabled: true,
                            id: 'cb_type',
                            value: '월요일',
                            editable: false,
                            displayField: 'name',
                            store: 'store_backup_weeks',
                            valueField: 'value',
                            bind : {
                                value : '{system_integrity.type}'
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            id: 'ft_backup_con1',
                            margin: '0 0 0 5',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    disabled: true,
                                    id: 'ft_time1',
                                    width: 100,
                                    value: 0,
                                    editable: false,
                                    displayField: 'value',
                                    valueField : 'value',
                                    queryMode: 'local',
                                    store: {
                                        data: [
                                            {
                                                'value' : 0
                                            },
                                            {
                                                'value' : 1
                                            },
                                            {
                                                'value' : 2
                                            },
                                            {
                                                'value' : 3
                                            },
                                            {
                                                'value' : 4
                                            },
                                            {
                                                'value' : 5
                                            },
                                            {
                                                'value' : 6
                                            },
                                            {
                                                'value' : 7
                                            },
                                            {
                                                'value' : 8
                                            },
                                            {
                                                'value' : 9
                                            },
                                            {
                                                'value' : 10
                                            },
                                            {
                                                'value' : 11
                                            },
                                            {
                                                'value' : 12
                                            },
                                            {
                                                'value' : 13
                                            },
                                            {
                                                'value' : 14
                                            },
                                            {
                                                'value' : 15
                                            },
                                            {
                                                'value' : 16
                                            },
                                            {
                                                'value' : 17
                                            },
                                            {
                                                'value' : 18
                                            },
                                            {
                                                'value' : 19
                                            },
                                            {
                                                'value' : 20
                                            },
                                            {
                                                'value' : 21
                                            },
                                            {
                                                'value' : 22
                                            },
                                            {
                                                'value' : 23
                                            }
                                        ],
                                        fields: [
                                            {
                                                name: 'value'
                                            }
                                        ]
                                    },
                                    bind : {
                                        value : '{system_integrity.time}'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    margin: '5 0 0 5',
                                    bind: 
                                    {
                                        text: '{hour}'
                                    }

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
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            cls: 'fld_msg',
                            itemId: 'fld_msg2'
                        }
                    ]
                }
            ]
        };

        if (instanceConfig) {

            me.getConfigurator().merge(me, config, instanceConfig);

        }

        return me.callParent([config]);
    },

    onContainerRender1: function(component, eOpts) {

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen("toggle_on"),
            offText: __zen('toggle_off'),
            id:'chk_integrity',
            renderTo: 'integrity',
            style:'margin-left:10px',
            resizeHandle: false,
            state: false,
            listeners: {

                change: function(field, newValue, oldValue, eOpts){

                    if(newValue){

                        Ext.getCmp('cb_type').enable();
                        Ext.getCmp('ft_time1').enable();

                    }
                    else{

                        Ext.getCmp('cb_type').disable();
                        Ext.getCmp('ft_time1').disable();

                    }

                }

            }

        });

    },

    onNFW2_system_backupAfterRender: function(component, eOpts) {
        
        var me = this;
        var vm = me.getViewModel();
        var vd = vm.getData();

        if(vd.system_integrity.use === 'on'){

            Ext.getCmp("chk_integrity").state = true;
            Ext.getCmp("chk_integrity").moveHandle(true);

            Ext.getCmp('cb_type').enable();
            Ext.getCmp('ft_time1').enable();

        }
        else{

            Ext.getCmp("chk_integrity").state = false;
            Ext.getCmp("chk_integrity").moveHandle(false);

            Ext.getCmp('cb_type').disable();
            Ext.getCmp('ft_time1').disable();

        }        

    },

    saveData : function(){

        var me = this;
        var vm = me.parentObj.getViewModel();

        // 주기적 검사 사용여부 저장

        vm.set('system_integrity', {'use' : (Ext.getCmp("chk_integrity").state) ? 'on' : 'off'});

        me.parentObj.viewState = true;

        return true;

    }

});