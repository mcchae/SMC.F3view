
Ext.define('SMC.view.pnl_wips_view', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_wips_view',

    requires: [
        'Ext.panel.Panel'
    ],

    border: false,
    id: 'pnl_wips_view',
    bodyBorder: false,

    layout: {
        type: 'border',
        regionWeights: {
            north: 20,
            south: 10,
            center: 0,
            west: -10,
            east: -20
        }
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    region: 'center',
                    border: false,
                    itemId: 'pnl_wips_view_main',
                    header: false
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_apt_viewAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_apt_viewAfterRender: function(component, eOpts) {
        var _svc = 'ftSMC',
            _func = 'getSMCSetting',
            _params = {
                key: Ext.encode('wips_svr_ip')
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                console.log('getSMCSetting - ', response);

                if(typeof response !== 'undefined' && response !== '' && response !== '0.0.0.0')
                {
                    component.down('panel[itemId=pnl_wips_view_main]').update('<object style="overflow:auto;width:100%;height:100%;" data="https://' + response  + ':3000/#/dashboard?fullscreen=true"></object>');
                }
                else
                {
                    Ext.Msg.show({
                        title : '페이지 접속 에러',
                        msg : 'IP주소가 존재하지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR
                    });
                }
            }
        );
    }

});