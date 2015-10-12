
Ext.define('SMC.view.pnl_apt_view', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_apt_view',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.panel.Panel'
    ],

    border: false,
    id: 'pnl_apt_view',
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
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'tb_apt_control',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'btn_agent_access',
                            enableToggle: true,
                            text: 'Agent 접속 현황',
                            toggleGroup: 'btn_agent',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick2,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btn_agent_detect',
                            enableToggle: true,
                            text: 'Agent  탐지 및 설정',
                            toggleGroup: 'btn_agent',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btn_agent_block',
                            enableToggle: true,
                            text: 'Agent 차단 로그',
                            toggleGroup: 'btn_agent',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btn_agent_block_request',
                            text: 'Agent 차단 정보 요청',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick11,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    region: 'center',
                    border: false,
                    itemId: 'pnl_apt_view_main',
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

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('pnl_apt_view');

        button.toggle(true);

        if((typeof me.apt_svr_ip !== 'undefined' && me.apt_svr_ip !== '' && me.apt_svr_ip !== '0.0.0.0') &&
           (typeof me.apt_session_key !== 'undefined' && me.apt_session_key !== ''))
        {
            me.down('panel[itemId=pnl_apt_view_main]').update('<object style="overflow:auto;width:100%;height:100%;" data="https://' + me.apt_svr_ip + ':17879/zblock/solution/link/agt3.zblock?key=' + me.apt_session_key + '"></object>');
        }
        else
        {
            Ext.Msg.show({
                title : '페이지 접속 에러',
                msg : 'IP주소 또는 세션키가 존재하지 않습니다.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR
            });
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('pnl_apt_view');

        button.toggle(true);

        if((typeof me.apt_svr_ip !== 'undefined' && me.apt_svr_ip !== '' && me.apt_svr_ip !== '0.0.0.0') &&
           (typeof me.apt_session_key !== 'undefined' && me.apt_session_key !== ''))
        {
            me.down('panel[itemId=pnl_apt_view_main]').update('<object style="overflow:auto;width:100%;height:100%;" data="https://' + me.apt_svr_ip + ':17879/zblock/solution/link/agt1.zblock?key=' + me.apt_session_key + '"></object>');
        }
        else
        {
            Ext.Msg.show({
                title : '페이지 접속 에러',
                msg : 'IP주소 또는 세션키가 존재하지 않습니다.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR
            });
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp('pnl_apt_view');

        button.toggle(true);

        if((typeof me.apt_svr_ip !== 'undefined' && me.apt_svr_ip !== '' && me.apt_svr_ip !== '0.0.0.0') &&
           (typeof me.apt_session_key !== 'undefined' && me.apt_session_key !== ''))
        {
            me.down('panel[itemId=pnl_apt_view_main]').update('<object style="overflow:auto;width:100%;height:100%;" data="https://' + me.apt_svr_ip + ':17879/zblock/solution/link/agt2.zblock?key=' + me.apt_session_key + '"></object>');
        }
        else
        {
            Ext.Msg.show({
                title : '페이지 접속 에러',
                msg : 'IP주소 또는 세션키가 존재하지 않습니다.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR
            });
        }
    },

    onButtonClick11: function(button, e, eOpts) {
        var me = Ext.getCmp('pnl_apt_view');

        var _svc = 'ftSMC',
            _func = 'blackInfoRequest',
            _params = {
                sKey: Ext.encode(me.apt_session_key)
            };

        me.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                console.log('response - ', response);
                if(response){
                    me.setLoading(false);

                    if(response === 'Success send file')
                    {
                        alertMessage('차단 정보 요청이 완료되었습니다.');
                    }
                    else
                    {
                        alertMessage('차단 정보 요청이 실패하였습니다.');
                    }
                }
                else
                {
                    alertMessage('차단 정보 요청이 실패하였습니다.');
                }
            }
        );
    },

    onPnl_apt_viewAfterRender: function(component, eOpts) {
        var _svc = 'ftSMC',
            _func = 'getSMCSetting',
            _params = {
                key: Ext.encode('apt')
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                console.log('getSMCSetting - ', response);
                if(response)
                {
                    component.apt_svr_ip = response.apt_svr_ip;

                    _func = 'getZBlockKey';
                    _params = {};

                    request_helper.xmlrpc_call_Ajax_Post(
                        _svc,
                        _func,
                        _params,
                        function(response){

                            console.log('getZBlockKey - ', response);
                            if(response)
                            {
                                component.apt_session_key = response;

                                var evt = document.createEvent('MouseEvents');
                                evt.initEvent("click", true, true);
                                component.down('button[itemId="btn_agent_access"]').btnEl.dom.dispatchEvent(evt);
                            }
                            else
                            {
                                Ext.Msg.show({
                                    title : '페이지 접속 에러',
                                    msg : '세션키가 존재하지 않습니다.',
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR
                                });
                            }
                        }
                    );
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