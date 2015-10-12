
Ext.define('SMC4ZEN.view.win_zen_sendpolicy', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_zen_sendpolicy',

    requires: [
        'SMC4ZEN.view.win_zen_sendpolicyViewModel',
        'SMC4ZEN.view.win_zen_sendpolicyViewController',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.grid.plugin.BufferedRenderer',
        'Ext.ProgressBar',
        'Ext.button.Button'
    ],

    controller: 