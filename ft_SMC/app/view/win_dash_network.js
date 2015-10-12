
Ext.define('SMC.view.win_dash_network', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.chart.Chart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line'
    ],

    height: 780,
    width: 1024,
    layout: 'fit',
    title: 'My Window',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'chart',
                    height: 250,
                    id: 'st_dash_chart_network',
                    width: 400,
                    animate: true,
                    insetPadding: 20,
                    store: 'st_dash_network',
                    axes: [
                        {
                            type: 'Category',
                            fields: [
                                'time'
                            ],
                            position: 'bottom'
                        },
                        {
                            type: 'Numeric',
                            fields: [
                                'inkbps',
                                'outkbps'
                            ],
                            position: 'left'
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            xField: 'time',
                            yField: 'inkbps',
                            showMarkers: false,
                            smooth: 3
                        },
                        {
                            type: 'line',
                            xField: 'time',
                            yField: 'outkbps',
                            showMarkers: false,
                            smooth: 3
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});