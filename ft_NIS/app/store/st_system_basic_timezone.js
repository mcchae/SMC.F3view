
Ext.define('SMC.store.st_system_basic_timezone', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_system_basic_timezone',
            data: [
                {
                    text: '(GMT -11:00) Niue, Samoa, West',
                    value: -11
                },
                {
                    text: '(GMT -10:00) Hawaii, Tahiti, Tokelau',
                    value: -10
                },
                {
                    text: '(GMT -09:30) Marquesas',
                    value: -9.5
                },
                {
                    text: '(GMT -09:00) Alaska Standard, Gambier',
                    value: -9
                },
                {
                    text: '(GMT -08:00) Pacific Standard, Pacific Standard',
                    value: -8
                },
                {
                    text: '(GMT -07:00) Mountain Standard',
                    value: -7
                },
                {
                    text: '(GMT -06:00) Central Standard, Easter Is, Galapagos',
                    value: -6
                },
                {
                    text: '(GMT -05:00) Acre, Central Standard, Colombia, Eastern standard, Ecuador, Peru',
                    value: -5
                },
                {
                    text: '(GMT -04:00) Amazon, Atlantic, Bolivia, Chile, Fakland Is, Guyana, Paraguay, Venezuela',
                    value: -4
                },
                {
                    text: '(GMT -03:30) Newfoundland Standard',
                    value: -3.5
                },
                {
                    text: '(GMT -03:00) Argentine, Brazil, French Guiana, Pierre and Miquelon, Suriname, Uruguay, Western Greenland',
                    value: -3
                },
                {
                    text: '(GMT -02:00) Fernando de Noronha, South Georgia',
                    value: -2
                },
                {
                    text: '(GMT -01:00) Azores, Cape, Eastern Greenland',
                    value: -1
                },
                {
                    text: '(GMT -00:00) Coordinated Universal, Greenwich Mean, Western European',
                    value: 0
                },
                {
                    text: '(GMT  01:00) Central European, Western African',
                    value: 1
                },
                {
                    text: '(GMT  02:00) Central Afracan, Eastern European, Israel, South Africa',
                    value: 2
                },
                {
                    text: '(GMT  03:00) Arabia, Eastern African, Moscow',
                    value: 3
                },
                {
                    text: '(GMT  03:30) Iran',
                    value: 3.5
                },
                {
                    text: '(GMT  04:00) Aqtau, Armenia, Azerbaijan, Georgia, Gulf, Mauritius, Reunion, Samara, Seychelles',
                    value: 4
                },
                {
                    text: '(GMT  04:30) Afghanistan',
                    value: 4.5
                },
                {
                    text: '(GMT  05:00) Aqtobe, French Southern and Antarctic Lands, Indian Ocean Territory, Kirgizstan, Maldives, Pakistan, Tajikistan, Turkmenistan, Uzbekistan, Yekaterinburg',
                    value: 5
                },
                {
                    text: '(GMT  05:30) India',
                    value: 5.5
                },
                {
                    text: '(GMT  06:00) Alma-Ata, Bangladesh, Bhutan, Mawson, Novosibirsk, Sri Lanka',
                    value: 6
                },
                {
                    text: '(GMT  06:30) Cocos is, Myanmar',
                    value: 6.5
                },
                {
                    text: '(GMT  07:00) Christmas Is, Indochina, Java, Krasnoyarsk',
                    value: 7
                },
                {
                    text: '(GMT  08:00) Borneo, Brunei, China, Hongkong, Irkutsk, Malaysia, Philippines, Singapore, Ulaanbaatar, Western Standard',
                    value: 8
                },
                {
                    text: '(GMT  09:00) Korea, Japan, Jayapura, Palau, Yakutsk',
                    value: 9
                },
                {
                    text: '(GMT  09:30) Central Standard',
                    value: 9.5
                },
                {
                    text: '(GMT  10:00) Chamorro Standard, Dumont-d\'Urville, Eastern Standard, Papua New Guinea, Truk, Vladivostok',
                    value: 10
                },
                {
                    text: '(GMT  10:30) Load Howe Standard',
                    value: 10.5
                },
                {
                    text: '(GMT  11:00) Norfolk',
                    value: 11
                },
                {
                    text: '(GMT  12:00) Anadyr, Anadyr, Fiji, Gilbert Is, Marshall Is, Nauru, New Zealand, Petropavlovsk-Kamchatski, Tuvalu, Wake, Wallis and Futuna',
                    value: 12
                },
                {
                    text: '(GMT  13:00) Phoenix Is, Tonga',
                    value: 13
                },
                {
                    text: '(GMT  14:00) Line Is',
                    value: 14
                }
            ],
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});