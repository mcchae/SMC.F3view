
Ext.define('SMC4ZEN.view.pnl_object_schedule_setting', {
    extend: 'Ext.window.Window',
    alias: 'widget.mypanel110',

    requires: [
        'SMC4ZEN.view.pnl_object_schedule_settingViewModel',
        'Ext.form.FieldSet',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'mypanel110'
    },
    border: false,
    height: 400,
    itemId: 'pnl_object_schedule_setting',
    minHeight: 400,
    minWidth: 450,
    padding: 10,
    resizable: true,
    width: 450,
    constrainHeader: true,
    title: '특정 월/일',
    maximizable: true,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            flex: 1,
            layout: 'fit',
            title: '특정 일',
            items: [
                {
                    xtype: 'checkboxgroup',
                    itemId: 'ckg_day',
                    fieldLabel: '',
                    columns: 6,
                    items: [
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day1',
                            boxLabel: '1'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day2',
                            boxLabel: '2'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day3',
                            boxLabel: '3'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day4',
                            boxLabel: '4'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day5',
                            boxLabel: '5'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day6',
                            boxLabel: '6'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day7',
                            boxLabel: '7'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day8',
                            boxLabel: '8'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day9',
                            boxLabel: '9'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day10',
                            boxLabel: '10'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day11',
                            boxLabel: '11'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day12',
                            boxLabel: '12'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day13',
                            boxLabel: '13'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day14',
                            boxLabel: '14'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day15',
                            boxLabel: '15'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day16',
                            boxLabel: '16'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day17',
                            boxLabel: '17'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day18',
                            boxLabel: '18'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day19',
                            boxLabel: '19'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day20',
                            boxLabel: '20'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day21',
                            boxLabel: '21'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day22',
                            boxLabel: '22'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day23',
                            boxLabel: '23'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day24',
                            boxLabel: '24'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day25',
                            boxLabel: '25'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day26',
                            boxLabel: '26'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day27',
                            boxLabel: '27'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day28',
                            boxLabel: '28'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day29',
                            boxLabel: '29'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day30',
                            boxLabel: '30'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_day31',
                            boxLabel: '31'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            flex: 0.5,
            layout: 'fit',
            title: '특정 월',
            items: [
                {
                    xtype: 'checkboxgroup',
                    itemId: 'ckg_month',
                    fieldLabel: '',
                    columns: 6,
                    items: [
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month1',
                            boxLabel: '1'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month2',
                            boxLabel: '2'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month3',
                            boxLabel: '3'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month4',
                            boxLabel: '4'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month5',
                            boxLabel: '5'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month6',
                            boxLabel: '6'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month7',
                            boxLabel: '7'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month8',
                            boxLabel: '8'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month9',
                            boxLabel: '9'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month10',
                            boxLabel: '10'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month11',
                            boxLabel: '11'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_month12',
                            boxLabel: '12'
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
                        button.up('window[itemId="pnl_object_schedule_setting"]').saveData();
                    },
                    margin: '1 10 1 0',
                    width: 100,
                    text: '저장'
                },
                {
                    xtype: 'button',
                    handler: function(button, e) {
                        button.up('window[itemId="pnl_object_schedule_setting"]').destroy();
                    },
                    margin: 1,
                    width: 100,
                    text: '취소'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_object_schedule_settingAfterRender'
    },

    onPnl_object_schedule_settingAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    loadData: function(month, day) {
        var me = this;

        if(month['@count'] > 0)
        {
            Ext.each(month.member, function(date, idx){
                me.down('checkbox[itemId="ck_month' + date + '"]').setValue(true);
            });
        }

        if(day['@count'] > 0)
        {
            Ext.each(day.member, function(date, idx){
                me.down('checkbox[itemId="ck_day' + date + '"]').setValue(true);
            });
        }

        me.show();
    },

    saveData: function() {
        var me = this;

        var wnd_schedule = Ext.ComponentQuery.query('window[itemId="pnl_object_schedule"]')[0];
        var month = me.down('checkboxgroup[itemId="ckg_month"]').getChecked();
        var day = me.down('checkboxgroup[itemId="ckg_day"]').getChecked();
        var check_month = [];
        var check_day = [];
        var pattern = /[^(0-9)]/gi;

        wnd_schedule.object.month['@count'] = month.length;
        wnd_schedule.object.day['@count'] = day.length;

        if(month.length > 1)
        {
            for(var i=0; i< month.length; i++)
            {
                check_month.push(Number((month[i].itemId).replace(pattern,"")));
            }

            wnd_schedule.object.month.member = check_month;
        }
        else if(month.length === 1)
        {
            wnd_schedule.object.month.member = Number((month[0].itemId).replace(pattern,""));
        }
        else
        {
            delete wnd_schedule.object.month.member;
        }

        if(day.length > 1)
        {
            for(var i=0; i< day.length; i++)
            {
                check_day.push(Number((day[i].itemId).replace(pattern,"")));
            }

            wnd_schedule.object.day.member = check_day;

        }
        else if(day.length === 1)
        {
            wnd_schedule.object.day.member = Number((day[0].itemId).replace(pattern,""));
        }
        else
        {
            delete wnd_schedule.object.day.member;
        }

        if(typeof me.closeEvent === 'function'){
            me.closeEvent();
        }

        me.destroy();
    }

});