
Ext.define('SMC.view.pnl_xtm_anti_mail_filter', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_anti_mail_filter',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.form.CheckboxGroup'
    ],

    height: 680,
    id: 'pnl_xtm_anti_mail_filter',
    width: 800,
    overflowY: 'auto',
    title: '메일 필터링',

    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: 10
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_mail_match',
                    title: '매치 필터링 \' ; \'  구분자로 여러개 입력 가능합니다.',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 0.6,
                            itemId: 'ctn_mail_mailinfo',
                            margin: '10, 10, 10, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_send',
                                    fieldLabel: '송신자'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_receiver',
                                    fieldLabel: '수신자'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_subject',
                                    fieldLabel: '제목'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_content',
                                    fieldLabel: '내용'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 0.4,
                            itemId: 'ctn_mail_setting',
                            margin: '10, 0, 10, 0',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_permit',
                                    margin: '30, 0, 0, 0',
                                    fieldLabel: '',
                                    boxLabel: '설정된 송신자 / 수신자 허용'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_mail_filter',
                    title: '확장 필터링',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_delete',
                            maxWidth: 270,
                            width: 270,
                            fieldLabel: '첨부파일 제거',
                            labelWidth: 120,
                            value: false,
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'st_mail_attachfile',
                            valueField: 'value'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_mail_max',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_maxlimit',
                                    margin: '0, 50, 0, 0',
                                    width: 270,
                                    fieldLabel: '최대메일 크기제한',
                                    labelWidth: 120,
                                    value: false,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_mail_maxsize',
                                    valueField: 'value',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_maxlimitChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 1, 100000000);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    disabled: true,
                                    itemId: 'nfd_maxsize',
                                    margin: '0, 10, 0, 0',
                                    width: 250,
                                    fieldLabel: '최대 메일 크기'
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    text: 'Byte'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_mail_mime',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    flex: 1,
                                    itemId: 'ckg_mime',
                                    width: 400,
                                    fieldLabel: 'MIME 차단',
                                    labelWidth: 110,
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_audio',
                                            margin: '0, 30, 0, 0',
                                            width: 70,
                                            name: 'audio',
                                            boxLabel: 'Audio'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_video',
                                            margin: '0, 30, 0, 0',
                                            width: 70,
                                            name: 'video',
                                            boxLabel: 'Video'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_application',
                                            margin: '0, 30, 0, 0',
                                            width: 100,
                                            name: 'application',
                                            boxLabel: 'Application'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_image',
                                            margin: '0, 30, 0, 0',
                                            width: 80,
                                            name: 'image',
                                            boxLabel: 'Image'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_message',
                                            margin: '0, 30, 0, 0',
                                            width: 80,
                                            name: 'message',
                                            boxLabel: 'Message'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_multipart',
                                            width: 80,
                                            name: 'multipart',
                                            boxLabel: 'Multipart'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_mail_convert',
                    title: '변환 필터링 \' ; \' 구분자로 여러개 입력 가능합니다.',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_mail_sender',
                            margin: '10, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_sender',
                                    margin: '0, 10, 0, 0',
                                    width: 300,
                                    fieldLabel: '송신자'
                                },
                                {
                                    xtype: 'label',
                                    margin: '0, 10, 0, 0',
                                    text: '→'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_sender2',
                                    margin: '0, 10, 0, 0',
                                    width: 200,
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_mail_receiver',
                            margin: '10, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_receiver',
                                    margin: '0, 10, 0, 0',
                                    width: 300,
                                    fieldLabel: '수신자'
                                },
                                {
                                    xtype: 'label',
                                    margin: '0, 10, 0, 0',
                                    text: '→'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_receiver2',
                                    margin: '0, 10, 0, 0',
                                    width: 200,
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_mail_subject',
                            margin: '10, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_subject',
                                    margin: '0, 10, 0, 0',
                                    width: 300,
                                    fieldLabel: '제목'
                                },
                                {
                                    xtype: 'label',
                                    margin: '0, 10, 0, 0',
                                    text: '→'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_subject2',
                                    margin: '0, 10, 0, 0',
                                    width: 200,
                                    fieldLabel: ''
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_anti_mail_filterAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_anti_mail_filterBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_maxlimitChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_maxlimitChange ==========================================================================================================================================================
        //
        // 설명 : 최대 메일 크기를 설정합니다. false일 경우 최대 메일 크기는 설정할 수 없습니다.
        //
        // ===============================================================================================================================================================================

        var mailMaxSize = field.up().down('[itemId=nfd_maxsize]');

        if(newValue){

            mailMaxSize.setDisabled(false);

        }
        else{

            mailMaxSize.setValue(0);
            mailMaxSize.setDisabled(true);

        }
    },

    onPnl_xtm_anti_mail_filterAfterRender: function(component, eOpts) {
        // onPnl_xtm_anti_mail_filterAfterRender ========================================================================================================================================
        //
        // 일시 : 2014.08.18
        //
        // 설명 : 안티-스팸 메일을 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        if(component.deviceParams){

            var deviceData = component.deviceParams.setting;

            if(deviceData){

                // 매치 필터링 설정 ===============================================================================================================================================================

                try{

                    componentObj.sender.setValue(deviceData.sender);
                    componentObj.receiver.setValue(deviceData.recipient['#text']);
                    componentObj.permit.setValue((deviceData.recipient['@chk_allow'] === 'on') ? true : false);
                    componentObj.subject.setValue(deviceData.subject);
                    componentObj.content.setValue(deviceData.content);

                }
                catch(err){

                    console.log('매치 필터링 데이터 초기화 중 catch 발생 : ', err);

                }

                // 확장 필터링 설정 ===============================================================================================================================================================

                try{

                    componentObj.filedel.setValue(deviceData.delattachedfile);
                    componentObj.maxlimit.setValue(deviceData.sizelimit['#text']);
                    componentObj.maxsize.setValue(deviceData.sizelimit['@size']);
                    componentObj.mime.setValue({

                        'audio' : (deviceData.mime['@chk_audio'] === 'on') ? true : false,
                        'video' : (deviceData.mime['@chk_video'] === 'on') ? true : false,
                        'application' : (deviceData.mime['@chk_app'] === 'on') ? true : false,
                        'image'     : (deviceData.mime['@chk_image'] === 'on') ? true : false,
                        'message'   : (deviceData.mime['@chk_message'] === 'on') ? true : false,
                        'multipart' : (deviceData.mime['@chk_multipart'] === 'on') ? true : false

                    });

                }
                catch(err){

                    console.log('확장 필터링 데이터 초기화 중 catch 발생 : ', err);

                }

                // 변환 필터링 설정 ===============================================================================================================================================================

                try{

                    componentObj.sendTransform.setValue(deviceData.sendtotransform);
                    componentObj.sendTransform2.setValue(deviceData.transformedsender);

                    componentObj.receiveTransform.setValue(deviceData.recipienttotransform);
                    componentObj.receiveTransform2.setValue(deviceData.transformedrecipient);

                    componentObj.subjectTransform.setValue(deviceData.subjecttotransform);
                    componentObj.subjectTransform2.setValue(deviceData.transformedsubject);

                }
                catch(err){

                    console.log('변환 필터링 데이터 초기화 중 catch 발생 : ', err);

                }

            }

        }
    },

    onPnl_xtm_anti_mail_filterBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_anti_mail_filterBeforeClose ========================================================================================================================================
        //
        // 일시 : 2014.08.18
        //
        // 설명 : 메일 필터링 화면이 종료될 때의 작업을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var fds_match   = this.down('[itemId=fds_mail_match]');
        var fds_filter  = this.down('[itemId=fds_mail_filter]');
        var fds_convert = this.down('[itemId=fds_mail_convert]');

        obj.sender   = fds_match.down('[itemId=ctn_mail_mailinfo]').down('[itemId=txf_send]');
        obj.receiver = fds_match.down('[itemId=ctn_mail_mailinfo]').down('[itemId=txf_receiver]');
        obj.subject  = fds_match.down('[itemId=ctn_mail_mailinfo]').down('[itemId=txf_subject]');
        obj.content  = fds_match.down('[itemId=ctn_mail_mailinfo]').down('[itemId=txf_content]');

        obj.permit   = fds_match.down('[itemId=ctn_mail_setting]').down('[itemId=ck_permit]');

        obj.filedel  = fds_filter.down('[itemId=cmb_delete]');
        obj.maxlimit = fds_filter.down('[itemId=ctn_mail_max]').down('[itemId=cmb_maxlimit]');
        obj.maxsize  = fds_filter.down('[itemId=ctn_mail_max]').down('[itemId=nfd_maxsize]');
        obj.mime     = fds_filter.down('[itemId=ctn_mail_mime]').down('[itemId=ckg_mime]');

        obj.sendTransform   = fds_convert.down('[itemId=ctn_mail_sender]').down('[itemId=txf_sender]');
        obj.sendTransform2  = fds_convert.down('[itemId=ctn_mail_sender]').down('[itemId=txf_sender2]');

        obj.receiveTransform  = fds_convert.down('[itemId=ctn_mail_receiver]').down('[itemId=txf_receiver]');
        obj.receiveTransform2 = fds_convert.down('[itemId=ctn_mail_receiver]').down('[itemId=txf_receiver2]');

        obj.subjectTransform  = fds_convert.down('[itemId=ctn_mail_subject]').down('[itemId=txf_subject]');
        obj.subjectTransform2 = fds_convert.down('[itemId=ctn_mail_subject]').down('[itemId=txf_subject2]');

        return obj;
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.08.18
        //
        // 설명 : 스팸 메일 설정을 저장합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        if(!deviceAllData.anti_smtp.setting){

            return;

        }

        // 매치 필터링 저장 ==============================================================================================================================================================

        deviceAllData.anti_smtp.setting.sender = (component.sender.getValue() === '') ? null : component.sender.getValue();

        if(component.receiver.getValue() === ''){

            if(deviceAllData.anti_smtp.setting.recipient['#text']){

                delete deviceAllData.anti_smtp.setting.recipient['#text'];

            }

        }
        else{

            deviceAllData.anti_smtp.setting.recipient['#text'] = component.receiver.getValue();

        }

        deviceAllData.anti_smtp.setting.recipient['@chk_allow'] = (component.permit.getValue() === true) ? 'on' : 'off';
        deviceAllData.anti_smtp.setting.subject = (component.subject.getValue() === '') ? null : component.subject.getValue();
        deviceAllData.anti_smtp.setting.content = (component.content.getValue() === '') ? null : component.content.getValue();

        // 확장 필터링 저장 ==============================================================================================================================================================

        deviceAllData.anti_smtp.setting.delattachedfile    = component.filedel.getValue();
        deviceAllData.anti_smtp.setting.sizelimit['#text'] = component.maxlimit.getValue();
        deviceAllData.anti_smtp.setting.sizelimit['@size'] = component.maxsize.getValue();
        deviceAllData.anti_smtp.setting.mime['@chk_app']   = (component.mime.getValue().application === 'on') ? 'on' : 'off';
        deviceAllData.anti_smtp.setting.mime['@chk_audio']   = (component.mime.getValue().audio === 'on') ? 'on' : 'off';
        deviceAllData.anti_smtp.setting.mime['@chk_image']   = (component.mime.getValue().image === 'on') ? 'on' : 'off';
        deviceAllData.anti_smtp.setting.mime['@chk_message'] = (component.mime.getValue().message === 'on') ? 'on' : 'off';
        deviceAllData.anti_smtp.setting.mime['@chk_multipart'] = (component.mime.getValue().multipart === 'on') ? 'on' : 'off';
        deviceAllData.anti_smtp.setting.mime['@chk_video']   = (component.mime.getValue().video === 'on') ? 'on' : 'off';

        // 변환 필터링 저장 ==============================================================================================================================================================

        deviceAllData.anti_smtp.setting.sendtotransform      = (component.sendTransform.getValue() === '')  ? null : component.sendTransform.getValue();
        deviceAllData.anti_smtp.setting.transformedsender    = (component.sendTransform2.getValue() === '') ? null : component.sendTransform2.getValue();

        deviceAllData.anti_smtp.setting.recipienttotransform = (component.receiveTransform.getValue() === '')  ? null : component.receiveTransform.getValue();
        deviceAllData.anti_smtp.setting.transformedrecipient = (component.receiveTransform2.getValue() === '') ? null : component.receiveTransform2.getValue();

        deviceAllData.anti_smtp.setting.subjecttotransform   = (component.subjectTransform.getValue() === '')  ? null : component.subjectTransform.getValue();
        deviceAllData.anti_smtp.setting.transformedsubject   = (component.subjectTransform2.getValue() === '') ? null : component.subjectTransform2.getValue();

        return true;
    }

});