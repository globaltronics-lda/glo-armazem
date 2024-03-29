import moment from "moment";

//@ts-ignore
import * as pdfMake from "pdfmake";
import {Injectable} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import ServiceUtil from "./ServiceUtil";
import {firstValueFrom} from "rxjs/internal/firstValueFrom";
import {StorageService} from "../shared/storage.service";
import ServiceStorage from "./ServiceStorage";

@Injectable({
  providedIn: 'root'
})
export default class ServicePrintMove {
  static STORAGE_EXIST_ITEM: string = "global-existence"

  constructor(private auth: AuthService, private store: StorageService) {

  }

  printFunctions(listItems: any[], move: any) {

    let headerBetwin = [
      [
        {
          text: '',
          borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        }, {
        text: '',
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      }, {
        text: '',
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      }
      ],
      [
        {
          text: [
            {
              text: '' + '\n',
              fontSize: 10,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: '' + '\n',
              fontSize: 9,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: '' + '\n',
              fontSize: 8,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],
            }

          ],
          border: [false, false, false, false]
        },
        {text: '', border: [false, false, false, false]},
        {
          text: [
            {
              text: 'Data.: ' + moment().format('DD / MM / YYYY HH:mm') + '\n',
              fontSize: 10,
              color: '#454545',
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: 'Ref.: ' + move.oItem.docRef + '\n',
              fontSize: 9,
              color: '#797979',
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            }
          ],
          border: [false, false, false, false]
        },

      ]
    ];

    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME DO ARTIGO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'QT', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'LOCALIZAÇÃO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'VALOR', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'FORNECEDOR', style: 'tableHeader'},

      ]
    ]

    let footer = [
      [
        {
          text: {
            text: 'Entreguei\n\n __________________________________',
            fontSize: 9,
            color: '#515A5A',
            alignment: 'center',
            bold: false,
            margin: [0, 0, 0, 2],
          },
          borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        }, {
        text: '',
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      }, {
        text: {
          text: 'Recebi\n\n __________________________________',
          fontSize: 9,
          color: '#515A5A',
          bold: false,
          alignment: 'center',
          margin: [0, 0, 0, 2],
        },
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      }
      ]
    ];

    listItems.forEach((g) => {

      let articleInfo = g.article ? JSON.parse(g.article) : {};
      let infoArticle = articleInfo?.name + ', ' + articleInfo?.model;
      let localStore = (g.localStorage ? JSON.parse(g.localStorage) : {});
      let localAmby: string = localStore.name + ', ' + (g.localAmbry ? JSON.parse(g.localAmbry).ambry.name : "") + ', ' + (g.localShelf ? JSON.parse(g.localShelf).name : '');

      let infoFinancial = g.financialCost + ' KZ';
      let providerInfo = g.provider ? JSON.parse(g.provider) : {};

      content.push([

        {margin: [2, 1, 1, 1], fillColor: '#fff', text: infoArticle, style: 'all'},
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: g.quantity, style: 'allEnd'},
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: localStore.name ? localAmby : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: infoFinancial ? infoFinancial : {text: '-- -- -- --', style: 'span'},
          style: 'allEnd'
        },
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: providerInfo.name ? providerInfo.name : {text: '-- -- --', style: 'span'},
          style: 'all'
        }
      ])
    })

    var dd = {
      content: [
        {
          svg: ServiceUtil.IconGlo,
          width: 100,
          height: 30,
          margin: [0, 2, 2, 2]
        },
        {
          text: 'Contribuinte nº 5417106372 ',
          fontSize: 7,
          bold: false,
          color: '#515A5A',
          margin: [0, 0, 0, 2],
        },
        {
          text: 'Endereço: Bº Benfica Pista Lote 249 ',
          fontSize: 7,
          bold: false,
          color: '#515A5A',
          margin: [0, 0, 0, 2],
        },
        {
          margin: [-2, 15, 0, 15],
          table: {
            widths: [160, 160, 160],
            body: headerBetwin

          }
        },

        {
          text: ('Entrada de Artigos').toUpperCase(),
          fontSize: 9,
          alignment: 'center',
          bold: true,
          margin: [0, 20, 0, 25]
        },
        {
          style: 'tableExample',
          table: {
            widths: [182, 30, 110, 60, 70],
            headerRows: 1,
            body: content
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: '',
          fontSize: 8,
          bold: false,
          margin: [20, 20, 20, 20],
          alignment: 'justify'
        },

        {
          text: 'Obs:' + move.oItem.details,
          fontSize: 8,
          bold: false,
          margin: [0, 5, 5, 5]
        },
        {
          qr: move.oItem.docRef,
          fit: 80,
          alignment: 'right',
          foreground: '#D7D5D5'
        },
        {
          text: 'Data: ' + moment().format('DD / MM / YYYY HH:mm.s'),
          fontSize: 7,
          color: '#454545',
          bold: false,
          margin: [0, 20, 0, 0]
        },
        {
          text: 'Operador: ' + this.auth.user.displayName + '',
          fontSize: 7,
          color: '#454545',
          bold: false,
          margin: [0, 0, 0, 1]
        },
      ],
      footer: {
        columns: [
          {
            text: 'Projectos e instalação domesticas «» Segurança electrónica - cctv, videofone-proteiro - alarmes de intrusão, fumo, gás e inundação «» Automação - portões cortinas «» Iluminação inteligente «» Centrais de Tv p/ condominios e edificios «» Centrais telefónicas «» Som ambiente e etc.',
            alignment: 'center',
            fontSize: 7,
            margin: [40, 20, 40, 20],
            color: '#7f8690',
          }
        ]
      },
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 9,
          color: '#0a0a0a',
        },
        span: {
          fontSize: 8,

          color: '#E6B0AA'
        },
        table: {
          width: '1000px'
        },
        all: {
          fontSize: 8,

          color: '#515A5A'
        },
        allEnd: {
          fontSize: 8,
          alignment: 'right',
          color: '#515A5A'
        },
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      },
    }

    var pdf = pdfMake.createPdf(dd);
    pdf.print();


  }

  printFunctionsRequisition(listItems: any[], move: any) {

    let client: any = move.oItem.client ? JSON.parse(move.oItem.client) : {}
    let headerBetwin = [
      [
        {
          text: '',
          borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
        }, {
        text: '',
        borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
      }, {
        text: '',
        borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
      }
      ],
      [
        {
          text: [
            {
              text: 'Data.: ' + moment().format('DD / MM / YYYY HH:mm') + '\n',
              fontSize: 10,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: 'Ref.: ' + move.oItem.docRef + '\n',
              fontSize: 9,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: 'Requisitante.: ' + this.auth.user.displayName + '\n',
              fontSize: 8,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],
            }

          ],
          border: [false, false, false, false]
        },
        {text: '', border: [false, false, false, false]},
        {
          text: [
            {
              text: ('Cliente : ').toUpperCase() + '\n',
              fontSize: 10,
              bold: false,
              borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: client.name + '\n',
              fontSize: 10,
              bold: false,
              borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: (client.identityClient ? 'Contribuinte nº 5417106372 ' + client.identityClient : '') + '\n',
              fontSize: 7,
              color: '#515A5A',
              bold: false,
              borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],
            },
            {
              text: 'Luanda - Angola' + '\n',
              fontSize: 9,
              color: '#515A5A',
              bold: false,
              borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],
            }

          ],
          border: [false, false, false, false]
        },


      ]
    ];

    let footer = [
      [
        {
          text: {
            text: 'Entreguei\n\n __________________________________',
            fontSize: 9,
            color: '#515A5A',
            alignment: 'center',
            bold: false,
            margin: [0, 0, 0, 2],
          },
          borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        }, {
        text: '',
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      }, {
        text: {
          text: 'Recebi\n\n __________________________________',
          fontSize: 9,
          color: '#515A5A',
          bold: false,
          alignment: 'center',
          margin: [0, 0, 0, 2],
        },
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      }
      ]
    ];

    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'REFERÊNCIA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'MODELO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'S/N', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'QT', style: 'tableHeader'},
      ]
    ]

    listItems.forEach((g) => {

      let article = g.article ? JSON.parse(g.article) : {};

      content.push([
        {
          margin: [1, 1, 1, 1], fillColor: '#fff',
          text: article.ean ? article.ean : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {margin: [1, 1, 1, 1], fillColor: '#fff', text: article?.name, style: 'all'},
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: article.model ? article.model.toUpperCase() : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: g.SN ? g.SN.toUpperCase() : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 10, 1],
          fillColor: '#fff',
          text: g.quantity ? g.quantity : {text: '-- -- --', style: 'span'},
          style: 'allEnd',

        }
      ])
    })

    var dd = {
      content: [
        {
          svg: ServiceUtil.IconGlo,
          width: 100,
          height: 30,
          margin: [0, 2, 2, 2]
        },
        {
          text: 'Contribuinte nº 5417106372 ',
          fontSize: 7,
          bold: false,
          color: '#515A5A',
          margin: [0, 0, 0, 2],
        },
        {
          text: 'Endereço: Bº Benfica Pista Lote 249 ',
          fontSize: 7,
          bold: false,
          color: '#515A5A',
          margin: [0, 0, 0, 2],
        },
        {
          margin: [-2, 15, 0, 15],
          table: {
            widths: [160, 160, 160],
            body: headerBetwin

          }
        },
        {
          text: ('Nota de Entrega: ').toUpperCase(),
          fontSize: 12,
          alignment: 'center',
          bold: true,
          margin: [0, 15, 0, 5]
        },

        {
          text: 'Viemos por intermédio desta, proceder a entrega dos equipamentos à baixo listados, ao cliente acima mensionado (' + client.name + '), em bom estado de funcionamento.',
          fontSize: 10,
          lineSpacing: 2,
          bold: false,
          alignment: '',
          color: '#222323',
          margin: [0, 10, 0, 15],
        },

        {
          style: 'tableExample',
          table: {
            widths: [70, 125, 90, 107, 60],
            headerRows: 1,
            body: content
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: '',
          fontSize: 8,
          bold: false,
          margin: [20, 20, 20, 20],
          alignment: 'justify'
        },
        {
          table: {
            widths: [160, 160, 160],
            body: footer

          },
          margin: [0, 20, 0, 0]
        },
        {
          margin: [0, 40, 0, 0],
          qr: move.oItem.docRef,
          fit: 60,
          alignment: 'right',
          foreground: '#D7D5D5'
        },
      ],
      footer: {
        columns: [
          {
            text: 'Projectos e instalação domesticas «» Segurança electrónica - cctv, videofone-proteiro - alarmes de intrusão, fumo, gás e inundação «» Automação - portões cortinas «» Iluminação inteligente «» Centrais de Tv p/ condominios e edificios «» Centrais telefónicas «» Som ambiente e etc.',
            alignment: 'center',
            fontSize: 7,
            margin: [40, 20, 40, 20],
            color: '#7f8690',
          }
        ]
      }

      ,
      styles: {
        tableExample: {
          width: 1000
        },
        tableHeader: {
          bold: true,
          fontSize: 9,
          color: '#0a0a0a',
        },
        span: {
          fontSize: 8,
          color: '#E6B0AA'
        },
        all: {
          fontSize: 8,
          color: '#515A5A'
        },
        allEnd: {
          fontSize: 8,
          alignment: 'right',
          color: '#515A5A'
        },
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      },


    }

    var pdf = pdfMake.createPdf(dd);
    pdf.print();


  }

  printFunctionsRequisitionObra(listItems: any[], move: any) {

    let client: any = move.oItem.client ? JSON.parse(move.oItem.client) : {}
    let headerBetwin = [
      [
        {
          text: '',
          borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
        }, {
        text: '',
        borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
      }, {
        text: '',
        borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
      }
      ],
      [
        {
          text: [
            {
              text: 'Data.: ' + moment().format('DD / MM / YYYY HH:mm') + '\n',
              fontSize: 10,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: 'Ref.: ' + move.oItem.docRef + '\n',
              fontSize: 9,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: 'Requisitante.: ' + this.auth.user.displayName + '\n',
              fontSize: 8,
              bold: false,
              borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],
            }

          ],
          border: [false, false, false, false]
        },
        {text: '', border: [false, false, false, false]},
        {
          text: [
            {
              text: ('Cliente : ').toUpperCase() + '\n',
              fontSize: 10,
              bold: false,
              borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: client.name + '\n',
              fontSize: 10,
              bold: false,
              borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],

            },
            {
              text: (client.identityClient ? 'Contribuinte nº 5417106372 ' + client.identityClient : '') + '\n',
              fontSize: 7,
              color: '#515A5A',
              bold: false,
              borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],
            },
            {
              text: 'Luanda - Angola' + '\n',
              fontSize: 9,
              color: '#515A5A',
              bold: false,
              borderColor: ['#ffffff', '#d8d8d8', '#ffffff', '#ffffff'],
              margin: [0, 0, 0, 2],
            }

          ],
          border: [false, false, false, false]
        },


      ]
    ];

    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'REFERÊNCIA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'MODELO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'S/N', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'QT', style: 'tableHeader'},
      ]
    ]

    listItems.forEach((g) => {

      let article = g.article ? JSON.parse(g.article) : {};

      content.push([
        {
          margin: [1, 1, 1, 1], fillColor: '#fff',
          text: article.ean ? article.ean : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {margin: [1, 1, 1, 1], fillColor: '#fff', text: article?.name, style: 'all'},
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: article.model ? article.model.toUpperCase() : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: g.SN ? g.SN.toUpperCase() : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 10, 1],
          fillColor: '#fff',
          text: g.quantity ? g.quantity : {text: '-- -- --', style: 'span'},
          style: 'allEnd',

        }
      ])
    })

    var dd = {
      content: [
        {
          svg: ServiceUtil.IconGlo,
          width: 100,
          height: 30,
          margin: [0, 2, 2, 2]
        },
        {
          text: 'Contribuinte nº 5417106372 ',
          fontSize: 7,
          bold: false,
          color: '#515A5A',
          margin: [0, 0, 0, 2],
        },
        {
          text: 'Endereço: Bº Benfica Pista Lote 249 ',
          fontSize: 7,
          bold: false,
          color: '#515A5A',
          margin: [0, 0, 0, 2],
        },
        {
          margin: [-2, 15, 0, 15],
          table: {
            widths: [160, 160, 160],
            body: headerBetwin

          }
        },
        {
          text: ('Folha de Obra: ').toUpperCase(),
          fontSize: 12,
          alignment: 'center',
          bold: true,
          margin: [0, 15, 0, 15]
        },
        {
          style: 'tableExample',
          table: {
            widths: [70, 125, 90, 107, 60],
            headerRows: 1,
            body: content
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: '',
          fontSize: 8,
          bold: false,
          margin: [20, 20, 20, 20],
          alignment: 'justify'
        },
        {
          margin: [0, 40, 0, 0],
          qr: move.oItem.docRef,
          fit: 60,
          alignment: 'right',
          foreground: '#D7D5D5'
        },
      ],
      footer: {
        columns: [
          {
            text: 'Projectos e instalação domesticas «» Segurança electrónica - cctv, videofone-proteiro - alarmes de intrusão, fumo, gás e inundação «» Automação - portões cortinas «» Iluminação inteligente «» Centrais de Tv p/ condominios e edificios «» Centrais telefónicas «» Som ambiente e etc.',
            alignment: 'center',
            fontSize: 7,
            margin: [40, 20, 40, 20],
            color: '#7f8690',
          }
        ]
      }

      ,
      styles: {
        tableExample: {
          width: 1000
        },
        tableHeader: {
          bold: true,
          fontSize: 9,
          color: '#0a0a0a',
        },
        span: {
          fontSize: 8,
          color: '#E6B0AA'
        },
        all: {
          fontSize: 8,
          color: '#515A5A'
        },
        allEnd: {
          fontSize: 8,
          alignment: 'right',
          color: '#515A5A'
        },
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      },


    }

    var pdf = pdfMake.createPdf(dd);
    pdf.print();


  }

  printFunctionsTransfer(listItems: any[], move: any) {

    let client: any = {}

    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'ANTERIOR', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'ATUAL', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'S/N', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'QT', style: 'tableHeader'},
      ]
    ]

    listItems.forEach(async (g) => {

      let article: any = g.article ? JSON.parse(g.article) : {}
      let name = article?.name + ', ' + article?.model
      let localStore = (g.localStorage ? JSON.parse(g.localStorage) : {});
      let localAmby = localStore.name + ', ' + (g.localAmbry ? JSON.parse(g.localAmbry).ambry : {}) + ', ' + (g.localShelf ? JSON.parse(g.localShelf) : '');

      let existence = (g.existence ? JSON.parse(g.existence) : {});

      let storage = (g.localStorageExistance ? JSON.parse(g.localStorageExistance) : {})
      let anterior = storage?.name + ', ' + existence?.localAmbry + ', ' + existence?.localShelf
      content.push([
        {margin: [1, 1, 1, 1], fillColor: '#fff', text: name, style: 'all'},
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: anterior ? anterior : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: localAmby ? localAmby : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: g.SN ? g.SN.toUpperCase() : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 10, 1],
          fillColor: '#fff',
          text: g.quantity ? g.quantity : {text: '-- -- --', style: 'span'},
          style: 'allEnd',

        }
      ])
    })

    var dd = {
      content: [
        {
          svg: ServiceUtil.IconGlo,
          width: 100,
          height: 30,
          margin: [0, 2, 2, 2]
        },
        {
          text: 'Ref : ' + move.oItem.docRef,
          fontSize: 8,
          bold: false,
          margin: [0, 0, 0, 10],
          alignment: 'justify'
        },

        {
          text: move.oItem.details,
          fontSize: 8,
          bold: false,
          margin: [0, 5, 0, 10],
          alignment: 'justify'
        },
        {text: ('Artigos Transferidos').toUpperCase(), fontSize: 9, bold: true, margin: [0, 20, 0, 10]},
        {
          style: 'tableExample',
          table: {
            widths: [100, 120, 120, 88, 30],
            headerRows: 1,
            body: content
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: '',
          fontSize: 8,
          bold: false,
          margin: [20, 20, 20, 20],
          alignment: 'justify'
        },
        {
          qr: move.oItem.docRef,
          fit: 80,
          alignment: 'right',
          foreground: '#D7D5D5'
        },
        {
          text: 'Data: ' + moment().format('DD / MM / YYYY HH:mm.s'),
          fontSize: 11,
          color: '#D7DBDD',
          bold: false,
          margin: [0, 20, 0, 0]
        },
        {
          text: 'Operador: ' + this.auth.user.displayName + '',
          fontSize: 11,
          color: '#D7DBDD',
          bold: false,
          margin: [0, 0, 0, 1]
        },
      ],
      styles: {
        tableExample: {
          width: 1000
        },
        tableHeader: {
          bold: true,
          fontSize: 9,
          color: '#0a0a0a',
        },
        span: {
          fontSize: 8,

          color: '#E6B0AA'
        },
        table: {
          width: '1000px'
        },
        all: {
          fontSize: 8,

          color: '#515A5A'
        },
        allEnd: {
          fontSize: 8,
          alignment: 'right',
          color: '#515A5A'
        },
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      },


    }

    var pdf = pdfMake.createPdf(dd);
    pdf.print();


  }

  printFunctionsDevolution(listItems: any[], move: any) {


    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'REFERÊNCIA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME DO ARTIGO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'QT', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'LOCALIZAÇÃO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'Responsável', style: 'tableHeader'},

      ]
    ]

    listItems.forEach((g) => {

      let articleInfo = g.article ? JSON.parse(g.article) : {};
      let infoArticle = articleInfo?.name + ', ' + articleInfo?.model;
      let localStore = (g.localStorage ? JSON.parse(g.localStorage) : {});
      let localAmby: string = localStore.name + ', ' + (g.localAmbry ? JSON.parse(g.localAmbry).ambry.name : "") + ', ' + (g.localShelf ? JSON.parse(g.localShelf).name : '');

      let infoFinancial = g.financialCost + ' KZ';
      let providerInfo = g.provider ? JSON.parse(g.provider) : {};

      content.push([
        {
          margin: [2, 1, 1, 1], fillColor: '#fff',
          text: articleInfo.ean ? articleInfo.ean : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: infoArticle, style: 'all'},
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: g.quantity, style: 'allEnd'},
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: localStore.name ? localAmby : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: g.user ? g.user.displayName : {text: '-- -- --', style: 'span'},
          style: 'all'
        }
      ])
    })

    var dd = {
      content: [
        {
          svg: ServiceUtil.IconGlo,
          width: 100,
          height: 30,
          margin: [0, 2, 2, 2]
        },
        {
          text: 'Ref : ' + move.oItem.docRef,
          fontSize: 8,
          bold: false,
          margin: [0, 0, 0, 10],
          alignment: 'justify'
        },
        {
          text: move.oItem.details,
          fontSize: 8,
          bold: false,
          margin: [0, 20, 0, 10],
          alignment: 'justify'
        },
        {text: ('Artigos devolvidos').toUpperCase(), fontSize: 9, bold: true, margin: [0, 20, 0, 10]},
        {
          style: 'tableExample',
          table: {
            widths: [70, 140, 50, 110, 70],
            headerRows: 1,
            body: content
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: '',
          fontSize: 8,
          bold: false,
          margin: [20, 20, 20, 20],
          alignment: 'justify'
        },
        {
          qr: move.oItem.docRef,
          fit: 80,
          alignment: 'right',
          foreground: '#D7D5D5'
        },
        {
          text: 'Data: ' + moment().format('DD / MM / YYYY HH:mm.s'),
          fontSize: 11,
          color: '#D7DBDD',
          bold: false,
          margin: [0, 20, 0, 0]
        },
        {
          text: 'Operador: ' + this.auth.user.displayName + '',
          fontSize: 11,
          color: '#D7DBDD',
          bold: false,
          margin: [0, 0, 0, 1]
        },
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 9,
          color: '#0a0a0a',
        },
        span: {
          fontSize: 8,

          color: '#E6B0AA'
        },
        table: {
          width: '1000px'
        },
        all: {
          fontSize: 8,

          color: '#515A5A'
        },
        allEnd: {
          fontSize: 8,
          alignment: 'right',
          color: '#515A5A'
        },
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      },


    }

    var pdf = pdfMake.createPdf(dd);
    pdf.print();


  }

  printFunctionsInventory(listItems: any[], move: any) {


    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME DO ARTIGO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'REFERÊNCIA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'QT', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'CT', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'DF', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'Armazém', style: 'tableHeader'},

      ]
    ]

    listItems.forEach((g) => {

      let articleInfo = g.article ? JSON.parse(g.article) : {};
      let infoArticle = articleInfo?.name + ', ' + articleInfo?.model;

      let infoFinancial = g.financialCost + ' KZ';
      let providerInfo = g.provider ? JSON.parse(g.provider) : {};

      content.push([

        {margin: [2, 1, 1, 1], fillColor: '#fff', text: infoArticle, style: 'all'},
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: articleInfo.ean ? articleInfo.ean : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: g.quantity, style: 'allEnd'},
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: g.myCount,
          style: 'allEnd'
        },
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: g.differenceCount,
          style: 'allEnd'
        },
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: g.localStorage,
          style: 'all'
        }
      ])
    })

    var dd = {
      content: [
        {
          svg: ServiceUtil.IconGlo,
          width: 100,
          height: 30,
          margin: [0, 2, 2, 2]
        },
        {
          text: 'Ref : ' + move.oItem.docRef,
          fontSize: 8,
          bold: false,
          margin: [0, 0, 0, 10],
          alignment: 'justify'
        },
        {
          text: move.oItem.details,
          fontSize: 8,
          bold: false,
          margin: [0, 20, 0, 10],
          alignment: 'justify'
        },
        {text: ('Inventário').toUpperCase(), fontSize: 9, bold: true, margin: [0, 20, 0, 10]},
        {
          style: 'tableExample',
          table: {
            widths: [130, 100, 40, 40, 40, 90],
            headerRows: 1,
            body: content
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: 'QT: Quantidade' + ' | CT: Quantidade Contada' + ' | DF: Diferença',
          fontSize: 8,
          style: 'span',
          color: '#313131',
          bold: false,
          margin: [0, 20, 0, 0]
        },
        {
          text: '',
          fontSize: 8,
          bold: false,
          margin: [20, 20, 20, 20],
          alignment: 'justify'
        },
        {
          qr: move.oItem.docRef,
          fit: 80,
          alignment: 'right',
          foreground: '#D7D5D5'
        },
        {
          text: 'Data: ' + moment().format('DD / MM / YYYY HH:mm.s'),
          fontSize: 11,
          color: '#D7DBDD',
          bold: false,
          margin: [0, 20, 0, 0]
        },
        {
          text: 'Operador: ' + this.auth.user.displayName + '',
          fontSize: 11,
          color: '#D7DBDD',
          bold: false,
          margin: [0, 0, 0, 1]
        },
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 9,
          color: '#0a0a0a',
        },
        span: {
          fontSize: 8,

          color: '#E6B0AA'
        },
        table: {
          width: '1000px'
        },
        all: {
          fontSize: 8,

          color: '#515A5A'
        },
        allEnd: {
          fontSize: 8,
          alignment: 'right',
          color: '#515A5A'
        },
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      },


    }

    var pdf = pdfMake.createPdf(dd);
    pdf.print();


  }


  printFunctionsBaixa(listItems: any[], move: any) {


    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'REFERÊNCIA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME DO ARTIGO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'QT', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'LOCALIZAÇÃO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'Responsável', style: 'tableHeader'},

      ]
    ]

    listItems.forEach((g) => {

      let articleInfo = g.article ? JSON.parse(g.article) : {};
      let infoArticle = articleInfo?.name + ', ' + articleInfo?.model;
      let localStore = (g.localStorage ? JSON.parse(g.localStorage) : {});
      let localAmby: string = localStore.name + ', ' + (g.localAmbry ? JSON.parse(g.localAmbry).ambry.name : "") + ', ' + (g.localShelf ? JSON.parse(g.localShelf).name : '');

      let infoFinancial = g.financialCost + ' KZ';
      let providerInfo = g.provider ? JSON.parse(g.provider) : {};

      content.push([
        {
          margin: [2, 1, 1, 1], fillColor: '#fff',
          text: articleInfo.ean ? articleInfo.ean : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: infoArticle, style: 'all'},
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: g.quantity, style: 'allEnd'},
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: localStore.name ? localAmby : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: g.user ? g.user.displayName : {text: '-- -- --', style: 'span'},
          style: 'all'
        }
      ])
    })

    var dd = {
      content: [
        {
          svg: ServiceUtil.IconGlo,
          width: 100,
          height: 30,
          margin: [0, 2, 2, 2]
        },
        {
          text: 'Ref : ' + move.oItem.docRef,
          fontSize: 8,
          bold: false,
          margin: [0, 0, 0, 10],
          alignment: 'justify'
        },
        {
          text: move.oItem.details,
          fontSize: 8,
          bold: false,
          margin: [0, 20, 0, 10],
          alignment: 'justify'
        },
        {text: ('Baixa no Armazém').toUpperCase(), fontSize: 9, bold: true, margin: [0, 20, 0, 10]},
        {
          style: 'tableExample',
          table: {
            widths: [70, 140, 50, 110, 70],
            headerRows: 1,
            body: content
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: '',
          fontSize: 8,
          bold: false,
          margin: [20, 20, 20, 20],
          alignment: 'justify'
        },
        {
          qr: move.oItem.docRef,
          fit: 80,
          alignment: 'right',
          foreground: '#D7D5D5'
        },
        {
          text: 'Data: ' + moment().format('DD / MM / YYYY HH:mm.s'),
          fontSize: 11,
          color: '#D7DBDD',
          bold: false,
          margin: [0, 20, 0, 0]
        },
        {
          text: 'Operador: ' + this.auth.user.displayName + '',
          fontSize: 11,
          color: '#D7DBDD',
          bold: false,
          margin: [0, 0, 0, 1]
        },
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 9,
          color: '#0a0a0a',
        },
        span: {
          fontSize: 8,

          color: '#E6B0AA'
        },
        table: {
          width: '1000px'
        },
        all: {
          fontSize: 8,

          color: '#515A5A'
        },
        allEnd: {
          fontSize: 8,
          alignment: 'right',
          color: '#515A5A'
        },
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      },


    }

    var pdf = pdfMake.createPdf(dd);
    pdf.print();


  }

  convertTo(resp: any) {
    return resp.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;

      return data;
    })
  }


}
