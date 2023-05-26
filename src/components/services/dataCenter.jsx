import { db } from "../backend";
import { onValue, ref } from 'firebase/database';

export const residences = [

{
depar: 'Aucun',
communes:[
{
  comm:  'Aucun',
  arr: [
    'Aucun'
  ]
}
]
},

    {
  
      depar: 'ATACORA',
      communes: [
       
          {
            comm:'Aucun',
            arr:[
              'Aucun'
            ]
          },
           {
            comm:'BOUKOUMBE',
            arr: [
                 'Aucun',
                'KORONTIERE',
                'KOUSSOUCOINGOU',
                'MANTA',
                'NATA',
                'TABOTA',
                'BOUKOUMBE'
              ]
          },
  
          {
              comm:'COBLY',
              arr: [
                  'Aucun',
                  'DATORI',
                  'KOUNTORI',
                  'TAPOGA',
                  'COBLY',
                ]
            },
            {
              comm:'KEROU',
              arr: [
                'Aucun',

                  'BRIGNAMARO',
                  'FIROU',
                  'KAOBAGOU',
                  'KEROU',
                ]
            },
  
            {
              comm:'KOUANDE',
              arr: [
                  'Aucun',

                  'BIRNI',
                  'CHABI-COUMA',
                  'FOO-TANCE',
                  'GUILMARO',
                  'OROUKAYO',
                  'KOUANDE'
                ]
            },
  
            {
              comm:'MATERI',
              arr: [
                'Aucun',

                  'DASSARI',
                  'GOUANDE',
                  'NODI',
                  'TANTEGA',
                  'TCHANHOUNCOSSI',
                  'MATERI'
                ]
            },
  
            {
              comm:'NATITINGOU',
              arr: [
                'Aucun',

                  'KOTOPOUNGA',
                  'KOUABA',
                  'KOUANDATA',
                  'PERMA',
                  'TCHOUMI-TCHOUMI',
                  'NATITINGOU I',
                  'NATITINGOU II',
                  'NATITINGOU III',
                  'PEPORIYAKOU',
                ]
            },
  
            {
              comm:'OUASSA-PEHUNCO',
              arr: [
                 'Aucun',

                  'GNEMASSON',
                  'TOBRE',
                  'PEHUNCO',
                ]
            },
  
            {
              comm:'TANGUIETA',
              arr: [
                'Aucun',

                  'COTIAKOU',
                  'NDAHONTA',
                  'TAIACOU',
                  'TANONGOU',
                  'TANGUIETA',
                ]
            },
  
            {
              comm:'TOUKOUNTOUNA',
              arr: [
                'Aucun',

                  'KOUARFA',
                  'TAMPEGRE',
                  'TOUKOUNTOUNA',
                ]
            },
  
      ]
  },//Département de l'Atacora
  
  {
      depar: 'LITTORAL',
      communes: [
        {
          comm:'Aucun',
          arr:[
            'Aucun'
          ]
        },
           {

            comm:'COTONOU',
            arr: [
                 'Aucun',

                '1ER ARRONDISSEMENT',
                '2EME ARRONDISSEMENT',
                '3EME ARRONDISSEMENT',
                '4EME ARRONDISSEMENT',
                '5EME ARRONDISSEMENT',
                '6EME ARRONDISSEMENT',
                '7EME ARRONDISSEMENT',
                '8EME ARRONDISSEMENT',
                '9EME ARRONDISSEMENT',
                '10EME ARRONDISSEMENT',
                '11EME ARRONDISSEMENT',
                '12EME ARRONDISSEMENT',
                '13EME ARRONDISSEMENT',
              ]
          },
      ]
  },///Département du Litoral
  
  {
          depar: 'PLATEAU',
          communes: [
            {
              comm:'Aucun',
              arr:[
                'Aucun'
              ]
            },
               {
                comm:'ADJA-OUERE',
                arr: [
                  'Aucun',
                  'ADJA-OUERE',
                  'IKPINLE',
                    'KPOULOU',
                    'MASSE',
                    'OKO-AKARE',
                    'TATONNONKON',
                  ]
              },
  
              {
                  comm:'IFANGNI',
                  arr: [
                      'Aucun',

                      'BANIGBE',
                      'DAAGBA',
                      'IFANGNI',
                      'KO-KOUMOLO',
                      'LAGBA',
                      'TCHAADA',
                    ]
                },
                {
                  comm:'KETOU',
                  arr: [
                      'Aucun',

                      'ADAKPLAME',
                      'IDIGNY',
                      'KETOU',
                      'KPANKOU',
                      'ODOMETA',
                      'OKPOMETA',
                    ]
                },
  
                {
                  comm:'POBE',
                  arr: [
                    'Aucun',

                      'AHOYEYE',
                      'IGANA',
                      'ISSABA',
                      'POBE',
                      'TOWE',
                    ]
                },
  
                {
                  comm:'SAKETE',
                  arr: [
                      'Aucun',

                      'AGUIDI',
                      'ITA-DJEBOU',
                      'TAKON',
                      'YOKO',
                      'SAKETE 1',
                      'SAKETE 2',
                    ]
                },
  
          ],
  
      },//Département du Plateau
  
  {
    depar: 'ZOU',
    communes: [
      {
        comm:'Aucun',
        arr:[
          'Aucun'
        ]
      },
         {
          comm:'ABOMEY',
          arr: [
              'Aucun',

              'AGBOKPA',
              'DETOHOU',
              'SEHOUN',
              'ZOUNZONME',
              'DJEGBE',
              'HOUNLI',
              'VIDOLE',
            ]
        },
  
        {
            comm:'AGBANGNIZOUN',
            arr: [
              'Aucun',

                'ADANHONDJIGO',
                'ADINGNIGON',
                'AGBANGNIZOUN',
                'KINTA',
                'KPOTA',
                'LISSAZOUNME',
                'SAHE',
                'SINWE',
                'TANVE',
                'ZOUNGOUNDO'
              ]
          },
          {
            comm:'BOHICON',
            arr: [
              'Aucun',

                'AGONGOINTO',
                'AVOGBANNA',
                'BOHICON I',
                'BOHICON II',
                'GNIDJAZOUN',
                'LISSEZOUN',
                'OUASSAHO',
                'PASSAGON',
                'SACLO',
                'SODOHOME',
              ]
          },
  
          {
            comm:'COVE',
            arr: [
              'Aucun',

                'HOUEKO',
                'ADOGBE',
                'GOUNLI',
                'HOUIN-HOUNSO',
                'LAINTA-COGBE',
                'NAOGON',
                'SOLI',
                'ZOGBA',
              ]
          },
  
          {
            comm:'DJIDJA',
            arr: [
              'Aucun',

                'AGONDJI',
                'AGOUNA',
                'DAN',
                'DJIDJA CENTRE',
                'DOHOUIME',
                'GOBAIX',
                'HOUTO',
                'MONSOUROU',
                'MOUGNON',
                'OUMBEGAME',
                'SETTO',
                'ZOUNKON',
              ]
          },
  
          {
            comm:'OUINHI',
            arr: [
                 'Aucun',

                'DASSO',
                'OUINHI CENTRE',
                'SAGON',
                'TOHOUES',
              ]
          },
  
          {
            comm:'ZAGNANADO',
            arr: [
              'Aucun',

                'AGONLI-HOUEGBO',
                'BANAME',
                'DON-TAN',
                'DOVI',
                'KPEDEKPO',
                'ZAGNANADO CENTRE',
              ]
          },
  
          {
            comm:'ZA-KPOTA',
            arr: [
              'Aucun',

                'ALLAHE',
                'ASSANLIN',
                'HOUNGOME',
                'KPAKPAME',
                'KPOZOUN',
                'ZA-KPOTA',
                'ZA-TANTA',
                'ZEKO',
              ]
          },
  
          {
            comm:'ZOGBODOME',
            arr: [
              'Aucun',

                'AKIZA',
                'AVLAME',
                'CANA 1',
                'CANA 2',
                'DOME',
                'KOUSSOUKPA',
                'KPOKISSA',
                'MASSI',
                'TANWE-HESSOU',
                'ZOGBODOME',
                'ZOUKOU',
              ]
          },
  
        ]
      }, //Département du Zou 
  
      {
        depar: 'ATLANTIQUE',
        communes: [
          {
            comm:'Aucun',
            arr:[
              'Aucun'
            ]
          },
             {
              comm:'ABOMEY-CALAVI',
              arr: [
                'Aucun',

                  'KPANROUN',
                  'OUEDO',
                  'TOGBA',
                  'ZINVIE',
                  'ABOMEY-CALAVI CENTRE',
                ]
            },
      
            {
                comm:'ALLADA',
                arr: [
                  'Aucun',

                    'AGBANOU',
                    'AHOUANNONZOU',
                    'ATTOGON',
                    'AVAKPA',
                    'AYOU',
                    'HINVI',
                    'LISSEGAZOUN',
                    'LON-AGONMEY',
                    'SEKOU',
                    'TOKPA',
                    'TOGOUDO',
                    'ALLADA CENTRE'
                  ]
              },
              {
                comm:'KPOMASSE',
                arr: [
                    'Aucun',

                    'AGANMALOME',
                    'AGBANTO',
                    'AGONKANME',
                    'DEDOME',
                    'DEKANME',
                    'SEGBEYA',
                    'SEGBOHOUE',
                    'TOKPA-DOME',
                    'KPOMASSE CENTRE',
                  ]
              },
      
              {
                comm:'OUIDAH',
                arr: [
                    'Aucun',

                    'AVLEKETE',
                    'DJEGBADJI',
                    'GAKPE',
                    'HOUAKPE-DAHO',
                    'PAHOU',
                    'SAVI',
                    'OUIDAH I',
                    'OUIDAH II',
                    'OUIDAH III',
                    'OUIDAH VI',
                  ]
              },
      
              {
                comm:'SO-AVA',
                arr: [
                  'Aucun',

                    'AHOMEY-LOKPO',
                    'DEKANMEY',
                    'GANVIE I',
                    'GANVIE II',
                    'HOUEDO-AGUEKON',
                    'VEKKY',
                    'SO-AVA CENTRE',
                  ]
              },
      
              {
                comm:'TOFFO',
                arr: [
                  'Aucun',

                    'AGUE',
                    'COLLI',
                    'COUSSI',
                    'DAME',
                    'DJANGLANME',
                    'HOUEGBO',
                    'KPOME',
                    'SEHOUE',
                    'SEY',
                    'TOFFO CENTRE',
                  ]
              },
      
              {
                comm:'TORI-BOSSITO',
                arr: [
                  'Aucun',

                    'AVAME',
                    'AZOHOUE-ALIHO',
                    'AZOHOUE-CADA',
                    'TORI-CADA',
                    'TORI-GARE',
                    'TORI-BOSSITO CENTRE',
                  ]
              },
      
              {
                comm:'ZE',
                arr: [
                  'Aucun',

                    'ADJAN',
                    'DAWE',
                    'DJGBE',
                    'DODJI-BATA',
                    'HEKANME',
                    'HOUNDOKPOE',
                    'SEDJI-DENOU',
                    'SEDJI-HOUEGOUDO',
                    'TANGBO',
                    'YOKPO',
                    'ZE CENTRE',
                  ]
              },
            ]
          },//Département de l'Atlantique
  
  {
            depar: 'DONGA',
            communes: [
              {
                comm:'Aucun',
                arr:[
                  'Aucun'
                ]
              },
                 {
                  comm:'BASSILA',
                  arr: [
                       'Aucun',

                      'ALEDJO',
                      'MANIGRI',
                      'PENESSOULOU',
                      'BASSILA CENTRE',
                    ]
                },
  
                {
                  comm:'COPARGO',
                  arr: [
                       'Aucun',

                      'ANANDANA',
                      'PABEGOU',
                      'SINGRE',
                      'COPARGO CENTRE',
                    ]
                },
  
                {
                  comm:'DJOUGOU',
                  arr: [
                      'Aucun',

                      'BAREI',
                      'BARIENOU',
                      'BELLEFOUNGOU',
                      'BOUGOU',
                      'KOLOCONDE',
                      'ONKLOU',
                      'PARTAGO',
                      'PELEBINA',
                      'SEROU',
                      'DJOUGOU I',
                      'DJOUGOU II',
                      'DJOUGOU III',
                    ]
                },
  
                {
                  comm:'OUAKE',
                  arr: [
                      'Aucun',

                      'BADJOUDE',
                      'KOMDE',
                      'SEMERE I',
                      'SEMERE II',
                      'TCHALINGA',
                      'OUAKE CENTRE',
                    ]
                },
  
            ]
    },///Département de la Donga

    {
    depar: 'COLLINES',
   communes: [
        {
          comm:'Aucun',
          arr:[
            'Aucun'
          ]
        },
      {
        comm: 'BANTE',
        arr: [
           'Aucun',
          'AGOUA',
          'AKPASSI',
          'ATOKOLIBE',
          'BOBE',
          'GOUKA',
          'KOKO',
          'LOUGBA',
          'PIRA',
          'BANTE',
        ]
      },
      {
        comm: 'DASSA-ZOUME',
        arr: [
           'Aucun',
          'AKOFFODJOULE',
          'GBAFFO',
          'KERE',
          'KPINGNI',
          'LEMA',
          'PAOUINGNAN',
          'SOCLOGBO',
          'TRE',
          'DASSA I',
          'DASSA II',
        ]
      },
      {
        comm: 'GLAZOUE',
        arr: [
           'Aucun',
          'AKLAMPA',
          'ASSANTE',
          'GOME',
          'KPAKPAZA',
          'MAGOUMI',
          'OUEDEME',
          'SOKPONTA',
          'THIO',
          'ZAFFE',
          'GLAZOUE',
        ]
      },
      {
        comm: 'OUESSE',
        arr: [
           'Aucun',
          'CHALLA-OGOI',
          'DJEGBE',
          'GBANLIN',
          'IKEMON',
          'KILIBO',
          'LAMINOU',
          'ODOUGBA',
          'TOW',
          'OUESSE',
        ]
      },
      {
        comm: 'SAVALOU',
        arr: [
           'Aucun',
          'DJALLOUKOU',
          'DOUME',
          'GOBADA',
          'KPATABA',
          'LAHOTAN',
          'LEMA',
          'LOGOZOHE',
          'MONKPA',
          'OTTOLA',
          'OUESSE',
          'TCHETTI',
          'SAVALOU-AGA',
          'SAVALOU-AGBADO',
          'SAVALOU-AKE',
        ]
      },
      
      {
        comm: 'SAVE',
        arr: [
           'Aucun',
          'BESSE',
          'KABOUA',
          'OFFE',
          'SAKIN',
          'ADIDO',
          'BONI',
          'PLATEAU',
        ]
      },
    ]
  },
   {
    depar: 'MONO',
   communes: [
        {
          comm:'Aucun',
          arr:[
            'Aucun'
          ]
        },
      
      {
        comm: 'ATHIEME',
        arr: [
           'Aucun',
          'ADOHOUN',
          'ATCHANNOU',
          'DEDEKPOE',
          'KPINNOU',
          'ATHIEME',
        ]
      },
      {
        comm: 'BOPA',
        arr: [
           'Aucun',
          'AGBODJI',
          'BADAZOUIN',
          'GBAKPODJI',
          'LOBOGO',
          'POSSOTOME',
          'YEGODOE',
          'BOPA',
        ]
      },
      {
        comm: 'COME',
        arr: [
           'Aucun',
          'AGATOGBO',
          'AKODEHA',
          'OUEDEME-PEDAH',
          'OUMAKO',
          'COME',
          'COME',
        ]
      },
      {
        comm: 'GRAND-POPO',
        arr: [
           'Aucun',
          'ADJAHA',
          'AGOUE',
          'AVIO',
          'DJANGLANMEY',
          'GBEHOUE',
          'SAZUE',
          'GRAND-POPO',
        ]
      },
      {
        comm: 'HOUEYOGBE',
        arr: [
           'Aucun',
          'DAHE',
          'DOUTOU',
          'HONHOUE',
          'ZOUNGBONOU',
          'HOUEYOGBE',
          'SE',
          'HOUEYOGBE',
        ]
      },
      {
        comm: 'LOKOSSA',
        arr: [
           'Aucun',
          'AGAME',
          'HOWN',
          'KOUDO',
          'OUEDEME-ADJA',
          'LOKOSSA',
        ]
      },

    ]
  },
    {
      depar: 'BORGOU',
      communes: [
        {
          comm:'Aucun',
          arr:[
            'Aucun'
          ]
        },
           {
            comm:'BEMBEREKE',
            arr: [

              'Aucun',

                'BEROUBOUAY',
                'BOUANRI',
                'GAMIA',
                'INA',
                'BEMBEREKE',
              ]
          },
          {
            comm:'KALALE',
            arr: [
                'Aucun',

                'BASSO',
                'BOUCA',
                'DERASSI',
                'DUNKASSA',
                'PEONGA',
                'KALALE',
              ]
          },
         {
            comm:"N'DALI",
            arr: [
                'Aucun',

                'BORI',
                'GBEGOUROU',
                'OUENOU',
                'SIRAROU',
                "N'DALI",
              ]
          },
          {
            comm:"NIKKI",
            arr: [
              'Aucun',

                'BIRO',
                'GNONKOUROKALI',
                'OUENOU',
                'SEREKALI',
                "SUYA",
                'TASSO',
                'NIKKI',
              ]
          },
          {
            comm:"PARAKOU",
            arr: [
              'Aucun',

                'IER ARRONDISSEMENT',
                '2EME ARRONDISSEMENT',
                '3EME ARRONDISSEMENT',
              ]
          },
          {
            comm:"PERERE",
            arr: [
                'Aucun',

                'GNINSY',
                'GUINAGOUROU',
                'KPEBIE',
                'PANE',
                "SONTOU",
                'PERERE',
              ]
          },
          {
            comm:"SINENDE",
            arr: [
              'Aucun',

                'FO-BOURE',
                'SEKERE',
                'SIKKI',
                'SINENDE',
              ]
          },
          {
            comm:"TCHAOUROU",
            arr: [
              'Aucun',

                'ALAFIAROU',
                'BETEROU',
                'GORO',
                'KIKA',
                "SANSON",
                'TCHATCHOU',
                'TCHAOUROU',
              ]
          },

      ]
  },

  {
    depar: 'OUEME',
    communes: [
      {
        comm:'Aucun',
        arr:[
          'Aucun'
        ]
      },
      {
        comm:'ADJARRA',
        arr: [
          'Aucun',
   
            'AGLOGBE',
            'HONVIE',
            'MALANHOUI',
            'MEDEDJONOU',
            'ADJARRA 1',
            'ADJARRA 2',
          ]
      },
      {
        comm:'ADJOHOUN',
        arr: [
          'Aucun',

            'AKPADANOU',
            'AWONOU',
            'AZOWLISSE',
            'DEME',
            'GANGBAN',
            'KODE',
            'TOGBOTA',
            'ADJOHOUN',
          ]
      },
      {
        comm:'AGUEGUES',
        arr: [
          'Aucun',

            'AVAGBODJI',
            'HOUEDOME',
            'ZOUNGAME',
            'AGUEGUES',
          ]
      },
      {
        comm:'AKPRO-MISSERETE',
        arr: [
          'Aucun',

            'GOME-SOTA',
            'KATAGON',
            'VAKON',
            'ZOUNGBOME',
            'AKPRO-MISSERETE',
          ]
      },
         {
          comm:'AVRANKOU',
          arr: [ 
            'Aucun',

              'ATCHOUKPA',
              'DJOMON',
              'GBOZOUME',
              'KOUTI',
              'OUANHO',
              'SADO',
              'AVRANKOU',
            ]
        },
        {
          comm:'BONOU',
          arr: [
            'Aucun',

              'AFFAME',
              'ATCHONSA',
              'DAME-WOGON',
              'HOUNVIGUE',
              'BONOU',
            ]
        },
        {
          comm:'DANGBO',
          arr: [
            'Aucun',

              'DEKIN',
              'GBEKO',
              'HOUEDOMEY',
              'HOZIN',
              'KESSOUNOU',
              'ZOUNGUE',
              'DANGBO',
            ]
        },
        {
          comm:'PORTO-NOVO',
          arr: [
            'Aucun',

              '1ER ARRONDISSEMENT',
              '2EME ARRONDISSEMENT',
              '3EME ARRONDISSEMENT',
              '4EME ARRONDISSEMENT',
              '5EME ARRONDISSEMENT',
            ]
        },
        {
          comm:'SEME-PODJI',
          arr: [
            'Aucun',

              'AGBLANGANDAN',
              'AHOLOUYEME',
              'DJEREGBE',
              'EKPE',
              'TOHOUE',
              'SEME-PODJI',
            ]
        },
    ]
},

{
  depar: 'ALIBORI',
  communes: [
    {
      comm:'Aucun',
      arr:[
        'Aucun'
      ]
    },
    {
      comm: 'BANIKOARA',
      arr: [
        'Aucun',

        'FOUNOUGO',
        'GOMPAROU',
        'GOUMORI',
        'KOKEY',
        'KOKIBOROU',
        'OUNET',
        'SOMPEROUKOU',
        'SOROKO',
        'TOURA',
        'BANIKOARA'
      ]
    },

    {
      comm: 'GOGOUNOU',
      arr: [
        'Aucun',

        'BAGOU',
        'GOUNAROU',
        'SORI',
        'SOUGOU-KPAN-TROSSI',
        'WARA',
        'GOGOUNOU'
      ]
    },
    {
      comm: 'KANDI',
      arr: [
        'Aucun',

        'ANGARADEBOU',
        'BENSEKOU',
        'DONWARI',
        'KASSAKOU',
        'SAAH',
        'SAM',
        'SONSORO',
        'KANDI 1',
        'KANDI 2',
        'KANDI 3'
      ]
    },

    {
      comm: 'KARIMAMA',
      arr: [
        'Aucun',

        'BIRNI LAFIA',
        'BOGO-BOGO',
        'KOMPA',
        'MONSEY',
        'KARIMAMA'
      ]
    },

    {
      comm: 'MALANVILLE',
      arr: [
        'Aucun',

        'GAROU',
        'GUENE',
        'MADECALI',
        'TOUMBOUTOU',
        'MALANVILLE'
      ]
    },

    {
      comm: 'SEGBANA',
      arr: [
        'Aucun',

        'LIBANTE',
        'LIBOUSSOU',
        'LOUGOU',
        'SOKOTINDJI',
        'SEGBANA'
      ]
    },

  ]
},

{
  depar: 'COUFFO',
  communes: [
    {
      comm:'Aucun',
      arr:[
        'Aucun'
      ]
    },
    {
      comm: 'APLAHOUE',
      arr: [
        'Aucun',

        'ATOMEY',
        'AZOVE',
        'DEKPO-CENTRE',
        'GODOHOU',
        'KISSAMEY',
        'LONKLY',
        'APLAHOUE'
      ]
    },

    {
      comm: 'DJAKOTOMEY',
      arr: [
        'Aucun',

        'ADJINTIMEY',
        'BETOUMEY',
        'GOHOMEY',
        'HOUEGAMEY',
        'KINKINHOUE',
        'KOKOHOUE',
        'KPOBA',
        'SOKOUHOUE',
        'DJAKOTOMEY 1',
        'DJAKOTOMEY 2'
      ]
    },

    {
      comm: 'DOGBO',
      arr: [
        'Aucun',

        'AYOMI',
        'DEVE',
        'HONTON',
        'LOKOGOHOUE',
        'MADJRE',
        'TOTCHANGNI CENTRE',
        'TOTA'
      ]
    },

    {
      comm: 'KLOUEKANMEY',
      arr: [
        'Aucun',

        'ADJAHONME',
        'AHOGBEYA',
        'AYAHOHOUE',
        'DJOTTO',
        'HONDJIN',
        'LANTA',
        'TCHIKPE',
        'KLOUEKANME'
      ]
    },

    {
      comm: 'LALO',
      arr: [
        'Aucun',

        'ADOUKANDJI',
        'AHODJINNAKO',
        'AHOMADEGBE',
        'BANIGBE',
        'GNIZOUNME',
        'HLASSAME',
        'LOKOGBA',
        'TCHITO',
        'TOHOU',
        'ZALLI',
        'LALO'
      ]
    },

    {
      comm: 'TOVIKLIN',
      arr: [
        'Aucun',

        'ADJIDO',
        'AVEDJIN',
        'DOKO',
        'HOUEDOGLI',
        'MISSINKO',
        'TANNOU-GOLA',
        'TOVIKLIN'
      ]
    },
  ]
}
  

  ]
  export const logo = 'https://firebasestorage.googleapis.com/v0/b/oxygene-6e5c5.appspot.com/o/staticFolder%2FO.png?alt=media&token=dc1bd932-cf04-451a-bde3-5279ed91c075'
  export const userProfile = 'https://firebasestorage.googleapis.com/v0/b/oxygene-6e5c5.appspot.com/o/staticFolder%2Fprofile.png?alt=media&token=7aea00ea-0197-4a16-8986-217e13bc17f6'

   export const allDemandesSise = ()=>{
    const demandesRef = ref(db, 'demandes/');
       
    // Abonnez-vous aux modifications de la base de données Firebase Realtime
    onValue(demandesRef, (snapshot) => {
      const demandesData = snapshot.val();
      
      if (demandesData) {
        // Convertir les données de la base de données en tableau
        const demandesArray = Object.entries(demandesData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        
      return demandesArray.length


      }
    });
   }