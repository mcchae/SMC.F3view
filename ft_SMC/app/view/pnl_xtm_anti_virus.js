
Ext.define('SMC.view.pnl_xtm_anti_virus', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_anti_virus',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Text'
    ],

    height: 680,
    id: 'pnl_xtm_anti_virus',
    width: 800,
    overflowY: 'auto',
    bodyPadding: 10,
    title: '안티 바이러스',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_virus_protocol',
                    title: '프로토콜',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            itemId: 'ckg_protocol',
                            margin: '0, 0, 10, 0',
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_smtp',
                                    margin: '0, 50, 0, 0',
                                    width: 60,
                                    name: 'smtp',
                                    boxLabel: 'SMTP'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    disabled: true,
                                    itemId: 'ck_ftp',
                                    margin: '0, 50, 0, 0',
                                    width: 60,
                                    name: 'ftp',
                                    boxLabel: 'FTP'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_http',
                                    margin: '0, 50, 0, 0',
                                    width: 60,
                                    fieldLabel: '',
                                    name: 'http',
                                    boxLabel: 'HTTP'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_pop3',
                                    fieldLabel: '',
                                    name: 'pop3',
                                    boxLabel: 'POP3'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_virus_search',
                    title: '바이러스 탐지시',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            itemId: 'rdg_virus',
                            margin: '0, 0, 10, 0',
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_block',
                                    margin: '0, 100, 0, 0',
                                    width: 80,
                                    name: 'virus',
                                    boxLabel: '발송 차단',
                                    checked: true,
                                    inputValue: 'deny'
                                },
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_enter',
                                    name: 'virus',
                                    boxLabel: '발송 허용'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_virus_alram',
                    title: '바이러스 발송 허용시 알림 제목',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'txf_alarmname',
                            margin: '0, 0, 10, 0',
                            maxWidth: 500,
                            width: 500,
                            fieldLabel: '바이러스 발송 허용시 알림 제목',
                            labelWidth: 200
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_virus_option',
                    title: '옵션',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1.5,
                            itemId: 'ctn_virus_smtp',
                            margin: '0, 10, 10, 0',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    itemId: 'ckg_smtp',
                                    width: 400,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_all',
                                            fieldLabel: '패턴',
                                            name: 'all',
                                            boxLabel: 'SMTP',
                                            listeners: {
                                                change: {
                                                    fn: me.onCk_smtpChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_run',
                                            fieldLabel: '실행파일',
                                            name: 'run',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_zip',
                                            fieldLabel: '압축파일',
                                            name: 'zip',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_office',
                                            fieldLabel: 'Office',
                                            name: 'office',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_image',
                                            fieldLabel: '그림 파일',
                                            name: 'image',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_pdf',
                                            fieldLabel: 'PDF',
                                            name: 'pdf',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_html',
                                            fieldLabel: 'HTML',
                                            name: 'html',
                                            boxLabel: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_virus_ftp',
                            margin: '0, 10, 10, 0',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    disabled: true,
                                    itemId: 'ckg_ftp',
                                    width: 400,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_all',
                                            fieldLabel: '',
                                            name: 'all',
                                            boxLabel: 'FTP',
                                            listeners: {
                                                change: {
                                                    fn: me.onCk_ftpChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_run',
                                            fieldLabel: '',
                                            name: 'run',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_zip',
                                            fieldLabel: '',
                                            name: 'zip',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_office',
                                            fieldLabel: '',
                                            name: 'office',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_image',
                                            fieldLabel: '',
                                            name: 'image',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_pdf',
                                            fieldLabel: '',
                                            name: 'pdf',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_html',
                                            fieldLabel: '',
                                            name: 'html',
                                            boxLabel: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_virus_http',
                            margin: '0, 0, 10, 0',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    itemId: 'ckg_http',
                                    width: 400,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_all',
                                            fieldLabel: '',
                                            name: 'all',
                                            boxLabel: 'HTTP',
                                            listeners: {
                                                change: {
                                                    fn: me.onCk_httpChanage,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_run',
                                            fieldLabel: '',
                                            name: 'run',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_zip',
                                            fieldLabel: '',
                                            name: 'zip',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_office',
                                            fieldLabel: '',
                                            name: 'office',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_image',
                                            fieldLabel: '',
                                            name: 'image',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_pdf',
                                            fieldLabel: '',
                                            name: 'pdf',
                                            boxLabel: ''
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_html',
                                            fieldLabel: '',
                                            name: 'html',
                                            boxLabel: ''
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
                    fn: me.onPnl_xtm_anti_virusAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_anti_virusBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCk_smtpChange: function(field, newValue, oldValue, eOpts) {
        // onCk_smtpChange ==============================================================================================================================================================
        //
        // 일시 : 2014.08.18
        //
        // 설명 : SMTP 체크 박스를 모두 선택, 해제합니다.
        //
        // ==============================================================================================================================================================================

        var smtpGroup = field.up();

        if(newValue){

            smtpGroup.setValue({

                'all'    : true,
                'html'   : true,
                'image'  : true,
                'office' : true,
                'pdf'    : true,
                'run'    : true,
                'zip'    : true

            });

        }
        else{

            smtpGroup.setValue({

                'all'    : false,
                'html'   : false,
                'image'  : false,
                'office' : false,
                'pdf'    : false,
                'run'    : false,
                'zip'    : false

            });

        }



    },

    onCk_ftpChange: function(field, newValue, oldValue, eOpts) {
        // onCk_ftpChange ===============================================================================================================================================================
        //
        // 일시 : 2014.08.18
        //
        // 설명 : ftp 체크 박스를 모두 선택, 해제합니다.
        //
        // ==============================================================================================================================================================================

        var ftpGroup = field.up();

        if(newValue){

            ftpGroup.setValue({

                'all'    : true,
                'html'   : true,
                'image'  : true,
                'office' : true,
                'pdf'    : true,
                'run'    : true,
                'zip'    : true

            });

        }
        else{

            ftpGroup.setValue({

                'all'    : false,
                'html'   : false,
                'image'  : false,
                'office' : false,
                'pdf'    : false,
                'run'    : false,
                'zip'    : false

            });

        }

    },

    onCk_httpChanage: function(field, newValue, oldValue, eOpts) {
        // onCk_httpChange ===============================================================================================================================================================
        //
        // 일시 : 2014.08.18
        //
        // 설명 : HTTP 체크 박스를 모두 선택, 해제합니다.
        //
        // ==============================================================================================================================================================================

        var httpGroup = field.up();

        if(newValue){

            httpGroup.setValue({

                'all'    : true,
                'html'   : true,
                'image'  : true,
                'office' : true,
                'pdf'    : true,
                'run'    : true,
                'zip'    : true

            });

        }
        else{

            httpGroup.setValue({

                'all'    : false,
                'html'   : false,
                'image'  : false,
                'office' : false,
                'pdf'    : false,
                'run'    : false,
                'zip'    : false

            });

        }

    },

    onPnl_xtm_anti_virusAfterRender: function(component, eOpts) {
        // onPnl_xtm_anti_virusAfterRender ==============================================================================================================================================
        //
        // 일시 : 2014.08.14
        //
        // 설명 : 안티-바이러스 설정을 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.setting;

                if(deviceData){

        // 프로토콜 ======================================================================================================================================================================

                    componentObj.protocol.setValue({

                        'ftp'  : (deviceData.protocol['@chk_ftp']  === 'on') ? true : false,
                        'http' : (deviceData.protocol['@chk_http'] === 'on') ? true : false,
                        'pop3' : (deviceData.protocol['@chk_pop3'] === 'on') ? true : false,
                        'smtp' : (deviceData.protocol['@chk_smtp'] === 'on') ? true : false

                    });

        // 바이러스 탐지시 ================================================================================================================================================================

                    if(deviceData.alarm){

                        componentObj.virus.setValue({	'virus' : deviceData.alarm['@action']	});

        // 바이러스 발송 허용시 제목 ========================================================================================================================================================

                        componentObj.alarm.setValue(deviceData.alarm['#text']);

                    }

        // 옵션 ==========================================================================================================================================================================

                    componentObj.smtp.setValue({

                        'html'   : (deviceData.smtp['@chk_html']  === 'on') ? true : false,
                        'image'  : (deviceData.smtp['@chk_image']  === 'on') ? true : false,
                        'office' : (deviceData.smtp['@chk_office']  === 'on') ? true : false,
                        'pdf'    : (deviceData.smtp['@chk_pdf']  === 'on') ? true : false,
                        'run'    : (deviceData.smtp['@chk_run']  === 'on') ? true : false,
                        'zip'    : (deviceData.smtp['@chk_zip']  === 'on') ? true : false

                    });

                    componentObj.ftp.setValue({

                        'html'   : (deviceData.ftp['@chk_html']  === 'on') ? true : false,
                        'image'  : (deviceData.ftp['@chk_image']  === 'on') ? true : false,
                        'office' : (deviceData.ftp['@chk_office']  === 'on') ? true : false,
                        'pdf'    : (deviceData.ftp['@chk_pdf']  === 'on') ? true : false,
                        'run'    : (deviceData.ftp['@chk_run']  === 'on') ? true : false,
                        'zip'    : (deviceData.ftp['@chk_zip']  === 'on') ? true : false

                    });

                    componentObj.http.setValue({

                        'html'   : (deviceData.http['@chk_html']  === 'on') ? true : false,
                        'image'  : (deviceData.http['@chk_image']  === 'on') ? true : false,
                        'office' : (deviceData.http['@chk_office']  === 'on') ? true : false,
                        'pdf'    : (deviceData.http['@chk_pdf']  === 'on') ? true : false,
                        'run'    : (deviceData.http['@chk_run']  === 'on') ? true : false,
                        'zip'    : (deviceData.http['@chk_zip']  === 'on') ? true : false

                    });

                }

            }

        }
        catch(err){

            console.log('안티 바이러스 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_anti_virusBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var fds_protocol = this.down('[itemId=fds_virus_protocol]');
        var fds_search   = this.down('[itemId=fds_virus_search]');
        var fds_alarm    = this.down('[itemId=fds_virus_alram]');
        var fds_option   = this.down('[itemId=fds_virus_option]');

        obj.protocol = fds_protocol.down('[itemId=ckg_protocol]');
        obj.virus    = fds_search.down('[itemId=rdg_virus]');
        obj.alarm    = fds_alarm.down('[itemId=txf_alarmname]');

        obj.smtp     = fds_option.down('[itemId=ctn_virus_smtp]').down('[itemId=ckg_smtp]');
        obj.ftp      = fds_option.down('[itemId=ctn_virus_ftp]').down('[itemId=ckg_ftp]');
        obj.http     = fds_option.down('[itemId=ctn_virus_http]').down('[itemId=ckg_http]');

        return obj;
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.08.18
        //
        // 설명 : 바이러스 설정을 저장합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // 프로토콜 저장 =================================================================================================================================================================

        deviceAllData.anti_virus.setting.protocol['@chk_ftp']  = (component.protocol.getValue().ftp === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.protocol['@chk_http'] = (component.protocol.getValue().http === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.protocol['@chk_pop3'] = (component.protocol.getValue().pop3 === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.protocol['@chk_smtp'] = (component.protocol.getValue().smtp === 'on') ? 'on' : 'off';

        // 바이러스 탐지시 저장 ===========================================================================================================================================================

        if(component.virus.getValue().virus !== 'deny'){

            if(!deviceAllData.anti_virus.setting.alarm){

                deviceAllData.anti_virus.setting.alarm = {};

            }

            deviceAllData.anti_virus.setting.alarm['@action'] = component.virus.getValue().virus;

            // 바이러스 발송 허용시 제목 저장 ==============================================================================================================================================

            deviceAllData.anti_virus.setting.alarm['#text'] = component.alarm.getValue();

        }
        else{

            deviceAllData.anti_virus.setting.alarm = null;

        }

        // 옵션 저장 ====================================================================================================================================================================

        deviceAllData.anti_virus.setting.smtp['@chk_html']   = (component.smtp.getValue().html === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.smtp['@chk_image']  = (component.smtp.getValue().image === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.smtp['@chk_office'] = (component.smtp.getValue().office === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.smtp['@chk_pdf']    = (component.smtp.getValue().pdf === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.smtp['@chk_run']    = (component.smtp.getValue().run === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.smtp['@chk_zip']    = (component.smtp.getValue().zip === 'on') ? 'on' : 'off';

        deviceAllData.anti_virus.setting.ftp['@chk_html']    = (component.ftp.getValue().html === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.ftp['@chk_image']   = (component.ftp.getValue().image === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.ftp['@chk_office']  = (component.ftp.getValue().office === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.ftp['@chk_pdf']     = (component.ftp.getValue().pdf === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.ftp['@chk_run']     = (component.ftp.getValue().run === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.ftp['@chk_zip']     = (component.ftp.getValue().zip === 'on') ? 'on' : 'off';

        deviceAllData.anti_virus.setting.http['@chk_html']   = (component.http.getValue().html === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.http['@chk_image']  = (component.http.getValue().image === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.http['@chk_office'] = (component.http.getValue().office === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.http['@chk_pdf']    = (component.http.getValue().pdf === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.http['@chk_run']    = (component.http.getValue().run === 'on') ? 'on' : 'off';
        deviceAllData.anti_virus.setting.http['@chk_zip']    = (component.http.getValue().zip === 'on') ? 'on' : 'off';

        return true;
    }

});