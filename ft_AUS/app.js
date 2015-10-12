
// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    stores: [
        'st_aus_device',
        'st_aus_update',
        'st_xtm_mips_firmware',
        'st_xtm_mips_ramdisk',
        'st_xtm_mips_image',
        'st_xtm_mips_do',
        'st_xtm_x86_firmware',
        'st_xtm_x86_ramdisk',
        'st_xtm_x86_image',
        'st_xtm_x86_do',
        'st_xtm_x64_firmware',
        'st_xtm_x64_ramdisk',
        'st_xtm_x64_image',
        'st_xtm_x64_do',
        'st_aus_log',
        'st_zen_mips_firmware',
        'st_zen_mips_ramdisk',
        'st_zen_mips_image',
        'st_zen_mips_do',
        'st_zen_x64_firmware',
        'st_zen_x64_ramdisk',
        'st_zen_x64_image',
        'st_zen_x64_do'
    ],
    views: [
        'main_view',
        'win_aus_filelist',
        'win_aus_config'
    ],
    name: 'AUS',

    launch: function() {
        Ext.create('AUS.view.main_view');
    }

});
