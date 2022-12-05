import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/auth.service";
import {StorageService} from "../../../../shared/storage.service";
import {Products} from "../../../../model/products";
import * as moment from "moment";


@Component({
  selector: 'app-form-geral',
  templateUrl: './form-geral.component.html',
  styleUrls: ['./form-geral.component.css']
})

export class FormGeralComponent implements OnInit {

  products: Products[] = [];
  productObj: any = {};
  list_modelos: any = [];
  list_categories: any = [];

  private STORAGE_MODELOS: string = 'global-modelos'
  private STORAGE_PRODUCT: string = 'global-produtos'
  private STORAGE_CATEGORIES: string = 'global-categorias'

  private DELETED_AT_NULL: string = 'NULL'

  constructor(private auth: AuthService, private store: StorageService) {

  }

  ngOnInit(): void {

    (<any>window).instanceSelectedId = "";
    (<any>window).instanceSelectedIdCategories = "";
    (<any>window).instanceSelectedTextCategories = "";

    this.findAllModelos();

    this.findAllCategories()

    // calling event change
    this.eventChang();


  }

  save() {
    moment().locale('pt-br');
    this.productObj.modeloId = (<any>window).instanceSelectedId;
    this.productObj.categoriesIds = (<any>window).instanceSelectedIdCategories;

    console.log((<any>window).instanceSelectedTextCategories)
    this.productObj.categoriesText = (<any>window).instanceSelectedTextCategories;
    console.log('não funciona')
    const now = new Date();

    this.productObj.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.productObj.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.productObj.deleted_at = this.DELETED_AT_NULL;
    this.productObj.email_auth = 'user activities';

    this.productObj.id = ""

    this.store.create(this.productObj, this.STORAGE_PRODUCT).then(
      resp => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
        console.log(resp.id)
      },
      err => {
        alert('Ocorreu um determido erro ')
      }
    );
  }


  findAllModelos() {
    this.store.findAll(this.STORAGE_MODELOS).subscribe(
      resp => {
        this.list_modelos = resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      err => {
      }
    )
  }

  findAllCategories() {
    this.store.findAll(this.STORAGE_CATEGORIES).subscribe(
      resp => {
        this.list_categories = resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      err => {
      }
    )
  }


  eventChang() {
    (<any>window).$(function ($: any) {

      $('#modelos').select2();

      $('#categorias').select2();

      $('#modelos').on('change', (event: any) => {
        (<any>window).instanceSelectedId = event.target.value

      })

      $('#categorias').on('change', (event: any) => {
        (<any>window).instanceSelectedIdCategories = $('#categorias').select2("val");
      })

    })


  }
}
