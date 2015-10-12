
Ext.define('SMC4ZEN.view.pnl_zenobj_mainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pnl_zenobj_main',

    initExpandNode: function(children) {
        var me = this;

        for(var i = 0, max = children.length; i < max; i++){

            if(children[i].expanded === "true" || children[i].expanded === "false"){

                children[i].expanded = false;

            }

            if(children[i].children){

                me.initExpandNode(children[i].children);

            }

        }var me = this;

        for(var i = 0, max = children.length; i < max; i++){

            if(children[i].expanded === "true" || children[i].expanded === "false"){

                children[i].expanded = false;

            }

            if(children[i].children){

                me.initExpandNode(children[i].children);

            }

        }
    },

    getZenobjMenuId: function(kind) {
        switch(kind){
            case 'object_ip_address' : 		return 'NFW2_firewall_object_ip_address';
            case 'object_ip_group' : 		return 'NFW2_firewall_object_ip_addressGroup';
            case 'object_ipv6_group' :		return 'NFW2_firewall_object_ip_ipv6_addressGroup';
            case 'object_ipv6_address' : 	return 'NFW2_firewall_object_ip_ipv6_address';
            case 'object_ipv6_header' : 	return 'NFW2_firewall_object_ip_ipv6_header';
            case 'object_service_group' : 	return 'NFW2_firewall_object_service_serviceGroup';
            case 'object_service_port' : 	return 'NFW2_firewall_object_service_servicePort';
            case 'object_country' : 		return 'NFW2_firewall_object_ip_country';
            case 'object_schedule' : 		return 'NFW2_firewall_object_schedule';
            case 'object_qos' : 			return 'NFW2_firewall_object_qos';
            case 'object_session' : 		return 'NFW2_firewall_object_session';
            case 'object_domain' : 			return 'NFW2_firewall_object_domain';
            case 'object_profile_web' : 	return 'NFW2_firewall_profile_filtering_config';
            default:
                return false;

        }
    },

    makeZenObjset: function(connectUri) {
        var cmp = Ext.create('Ext.Component', {

            style : {

                width : '100%',
                height : '100%'

            },
            autoEl : {

                tag : 'iframe',
                src : connectUri

            }

        });

        return cmp;
    },

    onPnl_zenobj_groupAfterRender: function(component, eOpts) {
        var me = this;

        request_helper.xmlrpc_call_Ajax_Post(
        'ftZEN',
        'getGroup',
        {

            gtype : Ext.encode('object_object')

        },
        function(res){

            me.initExpandNode(res.children);

            component.setRootNode(res);
            component.setLoading(false);

        }

        );
    },

    onPnl_zenobj_groupSelect: function(rowmodel, record, index, eOpts) {
        var pnl_group = this.lookupReference('zen_commobj_group');
        var pnl_center = this.lookupReference('zen_commobj_center');

        var dat_viewid = this.getZenobjMenuId(record.get('_kind'));

        pnl_center.setLoading(getDefineMsg('lod_zen'), true);

        if(dat_viewid){

            var vp = Ext.getCmp(SMC_COMMON_ID.smcviewport);

            var connect_uri = 'https://' + vp.clientInfo.hostIp + ':9443' + '/setDB/ZENCDB?' + 'menu=%22' + dat_viewid + '%22';

            var cmp = this.makeZenObjset(connect_uri);

            cmp.update('<iframe src="' + connect_uri + '"></iframe>');

            pnl_center.removeAll();

            pnl_center.add(cmp);

        }
        else{

            Ext.Msg.show({

                title : SMC_SET_PRODUCT,
                msg : getDefineMsg('err_null_objkind'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

        }

        pnl_center.setLoading(false);
    }

});
