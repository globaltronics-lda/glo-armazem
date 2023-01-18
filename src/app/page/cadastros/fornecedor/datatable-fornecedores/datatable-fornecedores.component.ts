import {Component, NgZone, OnInit} from '@angular/core';
import ServiceFornecedor from "../../../../Services/ServiceFornecedor";
import {StorageService} from "../../../../shared/storage.service";
import {firstValueFrom, Observable} from 'rxjs';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {ServiceEncryptDecriptSimples} from "../../../../Services/service-encrypt-decript-simples";
import {Router} from "@angular/router";
import moment from "moment";
//@ts-ignore
import * as pdfMake from "pdfmake";
import {AuthService} from "../../../../shared/auth.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-datatable-fornecedores',
  templateUrl: './datatable-fornecedores.component.html',
  styles: []
})
export class DatatableFornecedoresComponent implements OnInit {

  list_forncedors: any[] = []
  private window = (<any>window);
  listForncedores: Observable<any>;
  ServiceUtil: ServiceUtil;
  downloadJsonHref: any;

  constructor(private store: StorageService, private auth: AuthService, private router: Router, private sanitizer: DomSanitizer, private ngZone: NgZone) {
    this.listForncedores = new ServiceFornecedor(this.store).findAll();
    this.ServiceUtil = new ServiceUtil()
  }


  async ngOnInit() {
    this.window.InstanceAplication.init()
    await this.listFornecedor()
  }

  deleteFornecedor(attr: any) {
    let Obj: ServiceFornecedor = new ServiceFornecedor(this.store);
    Obj.IObjectClass = attr;
    Obj.delete()
  }


  async listFornecedor() {
  }

  editFornecedor(attr: any) {
    this.window.$('#categories').val(attr.category_id)
    let data = ServiceEncryptDecriptSimples.encript(JSON.stringify(attr))
    this.router.navigate(['/cadastros/fornecedor/geral', {information: data}]);
  }

  pdfGenerator() {
    firstValueFrom(this.listForncedores).then((a: any[]) => {
      let highchartSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 260.93 157.51">
      <defs>
        <style>
          .cls-1{fill:none;}.cls-2,.cls-5{font-size:72.94px;font-family:Montepetrum-Bold,
          Montepetrum;font-weight:700;}.cls-2{fill:#060063;}.cls-3{clip-path:url(#clip-path);}.cls-4{fill:url(#linear-gradient);}.cls-5{fill:#16aaf7;}</style>
        <clipPath id="clip-path" transform="translate(4.93)">
          <path class="cls-1"
            d="M37.49,112.48A16.62,16.62,0,1,1,22.05,94.76,16.62,16.62,0,0,1,37.49,112.48ZM60.1,84.79a12,12,0,1,0-12.75,11.1A12,12,0,0,0,60.1,84.79ZM29.43,57.23A8.93,8.93,0,1,0,39,48.94,8.92,8.92,0,0,0,29.43,57.23ZM82.5,97.39A8.93,8.93,0,1,0,73,105.68,8.92,8.92,0,0,0,82.5,97.39ZM57.09,65.61a8.93,8.93,0,1,0,9.52-8.29A8.92,8.92,0,0,0,57.09,65.61Zm2.2,41a13.32,13.32,0,1,0,12.37,14.21A13.32,13.32,0,0,0,59.29,106.61ZM88,115.9a8.22,8.22,0,1,0,7.64,8.77A8.23,8.23,0,0,0,88,115.9Zm24.25-5.78a4.43,4.43,0,1,0-4.11-4.72A4.42,4.42,0,0,0,112.26,110.12ZM99.89,79.55A4.43,4.43,0,1,0,104,84.27,4.41,4.41,0,0,0,99.89,79.55ZM92,67.19a4.43,4.43,0,1,0-4.11-4.72A4.41,4.41,0,0,0,92,67.19ZM56.76,33.87a4.43,4.43,0,1,0-4.11-4.72A4.42,4.42,0,0,0,56.76,33.87Zm17.86,9.94a4.43,4.43,0,1,0-4.11-4.72A4.42,4.42,0,0,0,74.62,43.81Zm39.07,45.74a2.8,2.8,0,1,0-2.6-3A2.78,2.78,0,0,0,113.69,89.55Zm0-14.85a2,2,0,1,0-1.83-2.11A2,2,0,0,0,113.74,74.7ZM102.58,68a2.8,2.8,0,1,0,2.6,3A2.79,2.79,0,0,0,102.58,68Zm9.22,50.57a6.4,6.4,0,1,0,5.94,6.82A6.4,6.4,0,0,0,111.8,118.57ZM94.28,96.79a6.4,6.4,0,1,0,5.94,6.82A6.4,6.4,0,0,0,94.28,96.79ZM53.13,46.31A6.4,6.4,0,1,0,60,40.37,6.39,6.39,0,0,0,53.13,46.31Zm23.41,4.15a6.4,6.4,0,1,0,6.82-5.94A6.39,6.39,0,0,0,76.54,50.46ZM78.1,77.13a6.4,6.4,0,1,0,6.82-5.94A6.39,6.39,0,0,0,78.1,77.13Zm-51.49-4.2A13.32,13.32,0,1,0,12.4,85.3,13.32,13.32,0,0,0,26.61,72.93ZM9.78,52.17a9.16,9.16,0,1,0-8.5-9.77A9.16,9.16,0,0,0,9.78,52.17ZM8,25.88A6.4,6.4,0,1,0,2,19.06,6.41,6.41,0,0,0,8,25.88ZM29.42,36.2a6.4,6.4,0,1,0,6.82-5.94A6.4,6.4,0,0,0,29.42,36.2Zm4.11-13.7a4.43,4.43,0,1,0-4.11-4.72A4.43,4.43,0,0,0,33.53,22.5ZM57.6,19.25a2.8,2.8,0,1,0-2.6-3A2.8,2.8,0,0,0,57.6,19.25Zm14.1,8.38a2.8,2.8,0,1,0,3-2.59A2.81,2.81,0,0,0,71.7,27.63Zm1.12-10.58A2,2,0,1,0,71,14.94,2,2,0,0,0,72.82,17.05Z" />
        </clipPath>
        <linearGradient id="linear-gradient" x1="37.19" y1="141.14" x2="89.04" y2="19.78"
          gradientUnits="userSpaceOnUse">
          <stop offset="0.01" stop-color="#04005e" />
          <stop offset="0.09" stop-color="#040b66" />
          <stop offset="0.22" stop-color="#03297d" />
          <stop offset="0.4" stop-color="#0158a1" />
          <stop offset="0.54" stop-color="#0087c5" />
          <stop offset="1" stop-color="#5ee1ed" />
        </linearGradient>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <text class="cls-2" transform="translate(140.32 62.36)">GLOBAL</text>
          <g class="cls-3">
            <rect class="cls-4" y="7.76" width="131.98" height="131.98" />
          </g>
          <text class="cls-5" transform="translate(139.14 131.16)">TRONICS</text>
        </g>
      </g>
    </svg>`;

      let content = [
        [
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NIF / BI', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'TIPO', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: ('Contacto').toUpperCase(), style: 'tableHeader'},
        ]
      ]

      a.forEach((g) => {
        content.push([
          {margin: [2, 1, 1, 1], fillColor: '#fff', text: g.name, style: 'all'},
          {
            margin: [2, 1, 1, 1],
            fillColor: '#fff',
            text: g.identityClient ? g.identityClient : {text: '-- -- -- --', style: 'span'},
            style: 'all'
          },
          {
            margin: [2, 1, 1, 1],
            fillColor: '#fff',
            text: g.type ? (g.type == 1 ? 'Individual' : 'Colectivo') : {text: '-- -- -- --', style: 'span'},
            style: 'all'
          },
          {
            margin: [2, 1, 1, 1],
            fillColor: '#fff',
            text: g.phoneNumber ? g.phoneNumber.split(',')[0] : {text: '-- -- --', style: 'span'},
            style: 'all'
          }
        ])
      })

      var dd = {
        content: [
          {
            svg: highchartSvg,
            width: 100,
            height: 30,
            margin: [-28, 2, 2, 2]
          },
          {text: 'Lista de Fornecedores Cadastrados', fontSize: 14, bold: true, margin: [0, 20, 0, 10]},
          {
            style: 'tableExample',
            table: {
              widths: [150, 120, 90, 115],
              headerRows: 1,
              body: content
            },
            layout: 'lightHorizontalLines'
          },
          {
            text: '', margin: [20, 20, 20, 20]
          },
          {
            qr: moment().format('DD / MM / YYYY') + 'user=' + this.auth.user.displayName,
            fit: 80,
            alignment: 'right',
            foreground: '#D7D5D5'
          },
          {
            text: 'Data:' + moment().format('DD / MM / YYYY'),
            fontSize: 11,
            color: '#D7DBDD',
            bold: false,
            margin: [0, 20, 0, 0]
          },
          {
            text: 'Autor : ' + this.auth.user.displayName + '',
            fontSize: 11,
            color: '#D7DBDD',
            bold: false,
            margin: [0, 0, 0, 1]
          },
        ],
        styles: {
          tableHeader: {
            bold: true,
            fontSize: 11,
            color: '#515A5A',
          },
          span: {
            fontSize: 11,
            alignment: 'justify',
            color: '#E6B0AA'
          },
          table: {
            width: '1000px'
          },
          all: {
            fontSize: 11,
            alignment: 'justify',
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
      pdf.open();


    })
  }

  xlsFile() {

  }

  donwladBackData() {
    firstValueFrom(this.listForncedores).then((a: any) => {
      var theJSON = JSON.stringify(a, null, 2);
      var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHref = uri;

    })
  }
}
