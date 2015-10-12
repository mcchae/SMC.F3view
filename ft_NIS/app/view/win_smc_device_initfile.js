
Ext.define('SMC.view.win_smc_device_initfile', {
    extend: 'Ext.window.Window',
    alias: 'widget.smc_device_initfile',

    requires: [
        'Ext.form.Label',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 190,
    itemId: 'win_xtm_initfile_password',
    width: 400,
    bodyPadding: 10,
    title: '초기파일 비밀번호 설정',
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
                    xtype: 'label',
                    margin: '10, 0, 10, 0',
                    text: '초기파일 발급시 사용할 비밀번호를 입력하세요.'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_xtm_initfile_pw',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'txf_passwd',
                            maxWidth: 300,
                            fieldLabel: '비밀번호 입력',
                            inputType: 'password',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: {
                                    fn: me.onTxf_passwdKeypress,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_xtm_initfile_check',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'txf_check',
                            maxWidth: 300,
                            fieldLabel: '비밀번호 확인',
                            inputType: 'password',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: {
                                    fn: me.onTxf_checkKeypress,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_xtm_initfile_control',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'bt_ok',
                            margin: '0, 10, 0, 0',
                            width: 100,
                            text: '확 인',
                            listeners: {
                                click: {
                                    fn: me.onBt_okClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_cancel',
                            width: 100,
                            text: '취 소',
                            listeners: {
                                click: {
                                    fn: me.onBt_cancelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                destroy: {
                    fn: me.onWin_xtm_initfile_passwordDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTxf_passwdKeypress: function(textfield, e, eOpts) {
        if(e.getKey() === e.ENTER){

            this.exportFile();

        }
    },

    onTxf_checkKeypress: function(textfield, e, eOpts) {
        if(e.getKey() === e.ENTER){

            this.exportFile();

        }
    },

    onBt_okClick: function(button, e, eOpts) {
        // onBt_okClick =========================================================================================================================================================
        //
        // 일시 : 2014.06.23
        //
        // 설명 : 초기파일 발급 기능을 수행합니다. 비밀번호 확인 후 비밀번호와 장비 cid를 서비스에 전달합니다.
        //
        // ======================================================================================================================================================================

        this.exportFile();
    },

    onBt_cancelClick: function(button, e, eOpts) {
        this.destroy();
    },

    onWin_xtm_initfile_passwordDestroy: function(component, eOpts) {
        // onWin_xtm_initfile_passwordDestroy ===========================================================================================================================================
        //
        // 일시 : 2014.07.28
        //
        // 설명 : 초기파일 발급 창이 종료되면 장비 목록을 새로 불러오는 이벤트를 발생시킵니다.
        //
        // ==============================================================================================================================================================================

        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
    },

    componentStorage: function() {
        var obj     = {};

        obj.passwd  = this.down('[itemId=ctn_xtm_initfile_pw]').down('[itemId=txf_passwd]');
        obj.checkpw = this.down('[itemId=ctn_xtm_initfile_check]').down('[itemId=txf_check]');

        return obj;
    },

    exportFile: function() {
        // exportFile ===================================================================================================================================================================
        //
        // 일시 : 2014.06.23
        //
        // 수정 : (김민수) - 버튼 이벤트에서 this 이벤트로 변경됨. 엔터키 입력시 기능을 공유하기 위함.
        //
        // 설명 : 초기파일 발급 기능을 수행합니다. 비밀번호 확인 후 비밀번호와 장비 cid를 서비스에 전달합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var me = this;

        if(component.passwd.getValue() === '' || component.checkpw.getValue() === ''){

            Ext.Msg.show({
                    title : '비밀번호 입력 에러',
                    msg : '비밀번호가 입력되지 않았습니다.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR
                });

            return;

        }

        if(component.passwd.getValue().match(component.checkpw.getValue())){

            var service = 'ftSMC',
            svc_func = 'getInitFileData',
            params = {

                'cid' : Ext.encode(this.cid),
                'pin' : Ext.encode(component.passwd.getValue())

            };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                svc_func,
                params,
                function(res){

                    Ext.create('Ext.Component', {
                        renderTo: Ext.getBody(),
                        cls: 'x-hidden',
                        autoEl: {
                            tag: 'iframe',
                            src: res
                        }
                    });

                    me.destroy();

                }

            );

        }
        else{

            Ext.Msg.show({
                    title : '비밀번호 확인 에러',
                    msg : '비밀번호가 일치하지 않습니다.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR
                });

            return;

        }
    }

});