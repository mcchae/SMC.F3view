
Ext.define('SMC4ZEN.view.pnl_xtm_dns_innerViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pnl_xtm_dns_inner',

    onCtn_dns_controlAfterRender: function(component, eOpts) {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : DNS 내부 허용 네트워크를 설정시에 추가, 수정, 삭제 작업을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var me = this.getView();
        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = me.componentStorage();

        bt_add.on('click', function(){

            if(!me.validityCheck().blankCheck(1) || !me.validityCheck().inDnsValidCheck() || !me.validityCheck().inDnsDuplicationCheck('add', componentObj.ipaddr.getValue())){

                return;

            }

            var obj      = {};

            obj.ip       = componentObj.ipaddr.getValue();
            obj.netmask  = componentObj.netmask.getValue();

            gridData_Add(componentObj.network_grid, obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.network_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : '내부 DNS 수정 에러',
                    msg : '수정할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck(1) || !me.validityCheck().inDnsValidCheck() || !me.validityCheck().inDnsDuplicationCheck('mod', componentObj.ipaddr.getValue())){

                return;

            }

            var obj = {};

            obj.ip = componentObj.ipaddr.getValue();
            obj.netmask  = componentObj.netmask.getValue();

            selectionGrid_Mod(componentObj.network_grid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.network_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : '내부 DNS 삭제 에러',
                    msg : '삭제할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.network_grid);

        });
    }

});
