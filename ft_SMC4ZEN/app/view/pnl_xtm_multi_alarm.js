
Ext.define('SMC4ZEN.view.pnl_xtm_multi_alarm', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_multi_alarmViewModel',
        'Ext.form.FieldSet',
        'Ext.button.Button',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox'
    ],

    viewModel: {
        type: 'pnl_xtm_multi_alarm'
    },
    height: 680,
    id: 'pnl_xtm_multi_alarm',
    overflowY: 'auto',
    width: 800,
    bodyPadding: 10,
    title: '알람 설정',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            flex: 1,
            itemId: 'fds_log_sendemail',
            overflowY: 'auto',
            checkboxToggle: true,
            title: '관리자 Email로 전송할 알람 설정',
            items: [
                {
                    xtype: 'container',
                    itemId: 'ctn_log_allselect',
                    margin: '10, 0, 10, 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretchmax'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'bt_select',
                            maxWidth: 100,
                            width: 100,
                            text: '전체 선택 / 해제',
                            listeners: {
                                click: 'onBt_selectClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_log_usealarm',
                    title: '사용률 알람',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            itemId: 'ckg_usealarm',
                            margin: '10, 0, 10, 0',
                            width: 400,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_cpu',
                                    boxLabel: 'CPU Full'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_mem',
                                    boxLabel: 'MEM Full'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    disabled: true,
                                    itemId: 'ck_disk',
                                    fieldLabel: '',
                                    boxLabel: 'Disk Full',
                                    checked: true
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_session',
                                    fieldLabel: '',
                                    boxLabel: 'Max Session'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_log_sysalarm',
                    title: '시스템 알람',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            flex: 1,
                            itemId: 'ckg_sys1',
                            margin: '10, 0, 10, 0',
                            width: 400,
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_dellog',
                                    boxLabel: '저장된 로그 일부 삭제'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_modobj',
                                    boxLabel: '오브젝트 변경'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_policy',
                                    fieldLabel: '',
                                    boxLabel: '정책 적용'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            flex: 1,
                            itemId: 'ckg_sys2',
                            margin: '0, 0, 10, 0',
                            width: 400,
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_sysboot',
                                    boxLabel: '시스템 부팅'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_stopsvc',
                                    boxLabel: '서비스 정지'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_banlog',
                                    fieldLabel: '',
                                    boxLabel: '로그인 금지'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            flex: 1,
                            itemId: 'ckg_sys3',
                            margin: '0, 0, 10, 0',
                            width: 400,
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_mb',
                                    boxLabel: '장비 상태 변환 (Master -> Backup)'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_bm',
                                    boxLabel: '장비 상태 변환 (Backup -> Master)'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            itemId: 'ckg_sys4',
                            margin: '0, 0, 10, 0',
                            width: 400,
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_failintegrity',
                                    boxLabel: '무결성 검사 실패'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_log_vpnalarm',
                    title: 'VPN 알람',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_encryption',
                            margin: '10, 0, 10, 0',
                            fieldLabel: '',
                            boxLabel: 'VPN 암호화 연산 실패'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_log_dpi',
                    title: 'DPI 알람',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            itemId: 'ckg_dpi',
                            margin: '10, 0, 10, 0',
                            width: 400,
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_dpi',
                                    boxLabel: 'DPI 탐지'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_blockdpi',
                                    boxLabel: 'DPI 차단'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_log_trafficalarm',
                    title: 'Traffic Anomaly 알람',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            itemId: 'ckg_dos',
                            margin: '10, 0, 10, 0',
                            width: 400,
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_dos',
                                    boxLabel: 'DOS 공격'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_ddos',
                                    boxLabel: 'DDOS 공격'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_multi_logAfterRender',
        beforeclose: 'onPnl_xtm_multi_logBeforeClose'
    },

    onBt_selectClick: function(button, e, eOpts) {
        // onBt_selectClick ============================================================================================================================================================
        //
        // 일시 : 2014.10.30
        //
        // 설명 : 체크박스를 전체 선택, 해제 할 수 있는 버튼 이벤트를 정의합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        if(this.chkflag){

            component.ck_cpu.setValue(true);
            component.ck_mem.setValue(true);
            component.ck_session.setValue(true);

            component.ck_dellog.setValue(true);
            component.ck_modlog.setValue(true);
            component.ck_policy.setValue(true);

            component.ck_sysboot.setValue(true);
            component.ck_stopsvc.setValue(true);
            component.ck_banlog.setValue(true);

            component.ck_mb.setValue(true);
            component.ck_bm.setValue(true);

            component.ck_integrity.setValue(true);
            component.ck_encrypt.setValue(true);

            component.ck_dpi.setValue(true);
            component.ck_blockdpi.setValue(true);

            component.ck_dos.setValue(true);
            component.ck_ddos.setValue(true);

            this.chkflag = false;

        }
        else{

            component.ck_cpu.setValue(false);
            component.ck_mem.setValue(false);
            component.ck_session.setValue(false);

            component.ck_dellog.setValue(false);
            component.ck_modlog.setValue(false);
            component.ck_policy.setValue(false);

            component.ck_sysboot.setValue(false);
            component.ck_stopsvc.setValue(false);
            component.ck_banlog.setValue(false);

            component.ck_mb.setValue(false);
            component.ck_bm.setValue(false);

            component.ck_integrity.setValue(false);
            component.ck_encrypt.setValue(false);

            component.ck_dpi.setValue(false);
            component.ck_blockdpi.setValue(false);

            component.ck_dos.setValue(false);
            component.ck_ddos.setValue(false);

            this.chkflag = true;

        }
    },

    onPnl_xtm_multi_logAfterRender: function(component, eOpts) {
        // onPnl_xtm_multi_logAfterRender ==============================================================================================================================================
        //
        // 일시 : 2014.10.30
        //
        // 설명 : 일괄편집의 알람설정 화면의 데이터를 컴포넌트에 설정합니다.
        //
        // =============================================================================================================================================================================

        this.chkflag     = true;

        var componentObj = this.componentStorage();

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        // 필드셋 이벤트 설정 =============================================================================================================================================================

        componentObj.fds_main.checkboxCmp.setValue(false);

        componentObj.fds_main.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'log_alram', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'log_alram', false);

            }

        });

        if(getApplyTarget(wndInstance.apply_target, 'log_alram')){

            if(wndInstance.alarm_setting.system){

                componentObj.fds_main.checkboxCmp.setValue(true);

        // 사용량 설정 초기화 =============================================================================================================================================================

                componentObj.ck_cpu.setValue((wndInstance.alarm_setting.system.setting['@chk_cpu'] === 'on') ? true : false);
                componentObj.ck_mem.setValue((wndInstance.alarm_setting.system.setting['@chk_mem'] === 'on') ? true : false);
                componentObj.ck_session.setValue((wndInstance.alarm_setting.system.setting['@chk_session'] === 'on') ? true : false);

        // 시스템 설정 초기화 =============================================================================================================================================================

                componentObj.ck_dellog.setValue((wndInstance.alarm_setting.system.setting['@chk_log'] === 'on') ? true : false);
                componentObj.ck_modlog.setValue((wndInstance.alarm_setting.system.setting['@chk_object'] === 'on') ? true : false);
                componentObj.ck_policy.setValue((wndInstance.alarm_setting.system.setting['@chk_spd'] === 'on') ? true : false);

                componentObj.ck_sysboot.setValue((wndInstance.alarm_setting.system.setting['@chk_boot'] === 'on') ? true : false);
                componentObj.ck_stopsvc.setValue((wndInstance.alarm_setting.system.setting['@chk_stop'] === 'on') ? true : false);
                componentObj.ck_banlog.setValue((wndInstance.alarm_setting.system.setting['@chk_login'] === 'on') ? true : false);

                componentObj.ck_mb.setValue((wndInstance.alarm_setting.system.setting['@chk_mb'] === 'on') ? true : false);
                componentObj.ck_bm.setValue((wndInstance.alarm_setting.system.setting['@chk_bm'] === 'on') ? true : false);

                componentObj.ck_integrity.setValue((wndInstance.alarm_setting.system.setting['@chk_integrity'] === 'on') ? true : false);

        // VPN 암호화 연산 실패 초기화 =====================================================================================================================================================

                componentObj.ck_encrypt.setValue((wndInstance.alarm_setting.system.setting['@chk_ike'] === 'on') ? true : false);

        // DPI 설정 초기화 ===============================================================================================================================================================

                componentObj.ck_dpi.setValue((wndInstance.alarm_setting.dpi.pattern['@chk_detect'] === 'on') ? true : false);
                componentObj.ck_blockdpi.setValue((wndInstance.alarm_setting.dpi.pattern['@chk_block'] === 'on') ? true : false);

        // DOS 설정 초기화 ===============================================================================================================================================================

                componentObj.ck_dos.setValue((wndInstance.alarm_setting.dos.flooding['@chk_dos'] === 'on') ? true : false);
                componentObj.ck_ddos.setValue((wndInstance.alarm_setting.ddos.flooding['@chk_ddos'] === 'on') ? true : false);

            }

        }
    },

    onPnl_xtm_multi_logBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_multi_basicBeforeClose ==============================================================================================================================================
        //
        // 일시 : 2014.09.02
        //
        // 설명 : innerView 가 종료될 때 메인 뷰의 상태를 변경합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_multiset');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var fds_main = this.down('[itemId=fds_log_sendemail]');

        var allselect = fds_main.down('[itemId=ctn_log_allselect]').down('[itemId=bt_select]');

        var usealarm  = fds_main.down('[itemId=fds_log_usealarm]').down('[itemId=ckg_usealarm]');

        var ck_cpu    = usealarm.down('[itemId=ck_cpu]');
        var ck_mem    = usealarm.down('[itemId=ck_mem]');
        var ck_disk   = usealarm.down('[itemId=ck_disk]');
        var ck_session = usealarm.down('[itemId=ck_session]');

        var syslog1   = fds_main.down('[itemId=fds_log_sysalarm]').down('[itemId=ckg_sys1]');
        var syslog2   = fds_main.down('[itemId=fds_log_sysalarm]').down('[itemId=ckg_sys2]');
        var syslog3   = fds_main.down('[itemId=fds_log_sysalarm]').down('[itemId=ckg_sys3]');
        var syslog4   = fds_main.down('[itemId=fds_log_sysalarm]').down('[itemId=ckg_sys4]');

        var ck_dellog = syslog1.down('[itemId=ck_dellog]');
        var ck_modlog = syslog1.down('[itemId=ck_modobj]');
        var ck_policy = syslog1.down('[itemId=ck_policy]');

        var ck_sysboot = syslog2.down('[itemId=ck_sysboot]');
        var ck_stopsvc = syslog2.down('[itemId=ck_stopsvc]');
        var ck_banlog  = syslog2.down('[itemId=ck_banlog]');

        var ck_mb     = syslog3.down('[itemId=ck_mb]');
        var ck_bm     = syslog3.down('[itemId=ck_bm]');

        var ck_integrity = syslog4.down('[itemId=ck_failintegrity]');

        var ck_encrypt   = fds_main.down('[itemId=fds_log_vpnalarm]').down('[itemId=ck_encryption]');

        var dpialarm  = fds_main.down('[itemId=fds_log_dpi]').down('[itemId=ckg_dpi]');

        var ck_dpi    = dpialarm.down('[itemId=ck_dpi]');
        var ck_blockdpi = dpialarm.down('[itemId=ck_blockdpi]');

        var traffic   = fds_main.down('[itemId=fds_log_trafficalarm]').down('[itemId=ckg_dos]');

        var ck_dos    = traffic.down('[itemId=ck_dos]');
        var ck_ddos   = traffic.down('[itemId=ck_ddos]');

        obj.fds_main   = fds_main;

        obj.ck_cpu     = ck_cpu;
        obj.ck_mem     = ck_mem;
        obj.ck_disk    = ck_disk;
        obj.ck_session = ck_session;

        obj.ck_dellog  = ck_dellog;
        obj.ck_modlog  = ck_modlog;
        obj.ck_policy  = ck_policy;

        obj.ck_sysboot = ck_sysboot;
        obj.ck_stopsvc = ck_stopsvc;
        obj.ck_banlog  = ck_banlog;

        obj.ck_mb      = ck_mb;
        obj.ck_bm      = ck_bm;

        obj.ck_integrity = ck_integrity;
        obj.ck_encrypt   = ck_encrypt;

        obj.ck_dpi     = ck_dpi;
        obj.ck_blockdpi = ck_blockdpi;

        obj.ck_dos     = ck_dos;
        obj.ck_ddos    = ck_ddos;

        return obj;
    },

    saveData: function() {
        // onPnl_xtm_mgt_alarmAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.10.30
        //
        // 설명 : 알람 설정을 초기화 합니다. 파라미터는 alarm_setting 입니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var wndInstance  = Ext.getCmp('win_smc_device_multiset').deviceParam;

        if(getApplyTarget(wndInstance.apply_target, 'log_alram')){

        // 사용량 설정 초기화 ==============================================================================================================================================================

            wndInstance.alarm_setting.system.setting['@chk_cpu']     = (componentObj.ck_cpu.getValue() === true) ? 'on' : 'off';

            wndInstance.alarm_setting.system.setting['@chk_mem']     = (componentObj.ck_mem.getValue() === true) ? 'on' : 'off';
            wndInstance.alarm_setting.system.setting['@chk_session'] = (componentObj.ck_session.getValue() === true ) ? 'on' : 'off';

        // 시스템 설정 초기화 ==============================================================================================================================================================

            wndInstance.alarm_setting.system.setting['@chk_log']     = (componentObj.ck_dellog.getValue() === true) ? 'on' : 'off';
            wndInstance.alarm_setting.system.setting['@chk_object']  = (componentObj.ck_modlog.getValue() === true) ? 'on' : 'off';
            wndInstance.alarm_setting.system.setting['@chk_spd']     = (componentObj.ck_policy.getValue() === true) ? 'on' : 'off';

            wndInstance.alarm_setting.system.setting['@chk_boot']    = (componentObj.ck_sysboot.getValue() === true) ? 'on' : 'off';
            wndInstance.alarm_setting.system.setting['@chk_stop']    = (componentObj.ck_stopsvc.getValue() === true) ? 'on' : 'off';
            wndInstance.alarm_setting.system.setting['@chk_login']   = (componentObj.ck_banlog.getValue() === true) ? 'on' : 'off';

            wndInstance.alarm_setting.system.setting['@chk_mb']      = (componentObj.ck_mb.getValue() === true) ? 'on' : 'off';
            wndInstance.alarm_setting.system.setting['@chk_bm']      = (componentObj.ck_bm.getValue() === true) ? 'on' : 'off';

            wndInstance.alarm_setting.system.setting['@chk_integrity'] = (componentObj.ck_integrity.getValue() === true) ? 'on' : 'off';

        // VPN 암호화 연산 실패 초기화 ======================================================================================================================================================

            wndInstance.alarm_setting.system.setting['@chk_ike']     = (componentObj.ck_encrypt.getValue() === true) ? 'on' : 'off';

        // DPI 설정 초기화 ================================================================================================================================================================

            wndInstance.alarm_setting.dpi.pattern['@chk_detect']     = (componentObj.ck_dpi.getValue() === true) ? 'on' : 'off';
            wndInstance.alarm_setting.dpi.pattern['@chk_block']      = (componentObj.ck_blockdpi.getValue() === true) ? 'on' : 'off';

        // DOS 설정 초기화 ================================================================================================================================================================

            wndInstance.alarm_setting.dos.flooding['@chk_dos']       = (componentObj.ck_dos.getValue() === true) ? 'on' : 'off';
            wndInstance.alarm_setting.ddos.flooding['@chk_ddos']     = (componentObj.ck_ddos.getValue() === true) ? 'on' : 'off';

        }

        return true;
    }

});