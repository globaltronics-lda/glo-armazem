//@ts-ignore
import Tagify from "@yaireo/tagify";
import {ServiceEncryptDecriptSimples} from "./service-encrypt-decript-simples";
import {ActivatedRoute, Router} from "@angular/router";


export default class ServiceUtil {

  static DELETED_AT_NULL = "NULL"
  static VALUE_AT_NULLABLE = "NULL"
  static VALUE_AT_STATUS_ACTIVE = "active"
  static VALUE_AT_STATUS_DISABLE = "disable"

  private user: any;


  // tables
  static STORAGE_ITEM_MOVIMENTO = "global-movements-items"
  static STORAGE_MOVEMENT = "global-movements"
  static STORAGE_EAN = "global-ean-referencias";
  static STORAGE_FORNECEDOR = "global-forncedores";
  static STORAGE_TYPE_REQUISITION = "global-type-requisition";
  static STORAGE_NIF_CLIENTS = "global-nif-clients";

  static STORAGE_MODELO = "global-modelos";

  static MESSAGE_SUCCESS = "Foi inserido a informação com sucesso!"
  static MESSAGE_SUCCESS_DELETE = "Foi removido a informação com sucesso!"
  static MESSAGE_ERROR = "Não foi inserido a informação com sucesso, possivel ocorrência de erro!"

  static SAVE_TEXT = "Gravar"
  static CANCEL_TEXT = "Cancelar"


  convertJson(data: any) {
    if (data)
      return JSON.parse(data.toString());

    return '';
  }

  getSession() {
    let userInfo = sessionStorage.getItem('_user') as string
    if (userInfo != '') {
      this.user = JSON.parse(userInfo);
      //this.user.providerData = "";
      //this.user.stsTokenManager = "";


      return this.user;
    }
    return null;
  }


  static myTagify(elements: any[]) {
    elements.forEach(e => {
      new Tagify(e, {
        originalInputValueFormat: (valuesArr: any[]) => valuesArr.map((item: any) => item.value).join(',')
      });

      console.log(e)
    })

  }

  static requestDataInfo(route: any) {
    try {
      if (route.snapshot.paramMap.get('information')) {


        let data: any = ServiceEncryptDecriptSimples.decript(
          //@ts-ignore
          route.snapshot.paramMap.get('information')
        )
        let anyObj = JSON.parse(data)
        anyObj.updated_mode = true;

        return anyObj;
      }
    } catch (err) {
      console.table(err)
    }
  }

  static numberConvert(attr: number) {
    var str = "" + attr;
    var pad = "00000"
    var ans = pad.substring(0, pad.length - str.length) + str

    return ans;
  }

  static numberConvertTo(attr: number) {
    var str = "" + attr;
    var pad = "00"
    var ans = pad.substring(0, pad.length - str.length) + str

    return ans;
  }

  static IconGlo = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="507.5" height="97.02" viewBox="0 0 507.5 97.02">
  <defs>
    <linearGradient id="linear-gradient" x1="0.167" y1="0.065" x2="0.737" y2="0.837" gradientUnits="objectBoundingBox">
      <stop offset="0.01" stop-color="#04005e"/>
      <stop offset="0.09" stop-color="#040b66"/>
      <stop offset="0.22" stop-color="#03297d"/>
      <stop offset="0.4" stop-color="#0158a1"/>
      <stop offset="0.54" stop-color="#0087c5"/>
      <stop offset="1" stop-color="#5ee1ed"/>
    </linearGradient>
  </defs>
  <g id="Group_2" data-name="Group 2" transform="translate(-239.5 -598)">
    <g id="logo-txt512" transform="translate(235.5 739.2)">
      <path id="Path_1" data-name="Path 1" d="M10.2-137.5C3.9-132.3,4-132.7,4-92.9,4-58.1,4.1-56.6,6.1-53A16.836,16.836,0,0,0,11-47.7c3.8,2.3,10.8,2.2,14.3-.2,6-3.9,6.2-4.8,6.5-27.4L32.1-96h-8c-8,0-8.1,0-8.1,2.5,0,2.4.3,2.5,5.6,2.5h5.6l-.4,17c-.3,16.9-.4,17-3,19.7-3.6,3.5-8,3.5-11.6-.1L9.5-57v-73.2l2.8-2.4c5.1-4.4,11.9-2.1,13.7,4.6.9,3.3,1.5,4,3.5,4,2.9,0,3.3-2.3,1.1-7.3-2.3-5.4-5.9-8-11.9-8.5C14.1-140.2,13-139.9,10.2-137.5Z" fill="#04005e"/>
      <path id="Path_2" data-name="Path 2" d="M37.7-139.3c-.4.3-.7,21.5-.7,47v46.4l13.3-.3c12.4-.3,13.2-.4,13.2-2.3,0-1.8-.8-2-10-2.3-6.4-.2-10.2-.7-10.7-1.5C42.4-53,42-73,42-96.8c0-41.2-.1-43.2-1.8-43.2A3.923,3.923,0,0,0,37.7-139.3Z" fill="#04005e"/>
      <path id="Path_3" data-name="Path 3" d="M75.9-137.3c-5.8,4.9-5.9,5.8-5.9,44.9,0,34.5.1,35.7,2.1,39.4,4.2,7.3,12.8,9.1,20,4,5.7-4.1,5.9-5.4,5.9-44,0-38.5-.1-39.4-5.9-44.3-2.6-2.1-4.3-2.7-8.1-2.7S78.5-139.4,75.9-137.3Zm14.2,5.2c1.3,1.6,1.7,6,2.2,24.7,1,31.7.9,45.3-.3,49.6-1.9,6.8-8.5,8.9-13.7,4.4l-2.8-2.4-.3-35.6c-.3-31-.1-35.9,1.3-38.6a9.839,9.839,0,0,1,3.8-4C83.4-135.3,88.2-134.4,90.1-132.1Z" fill="#04005e"/>
      <path id="Path_4" data-name="Path 4" d="M103-93.1V-46h8.8c6.9,0,9.4-.4,11.9-2,6.2-3.8,6.8-5.7,6.8-23,0-13.9-.2-15.9-2.1-19l-2.1-3.6,2.1-2.8c1.8-2.4,2.1-4.4,2.4-16,.4-15.2-.5-20-4.8-24.1-2.9-2.8-3.6-3-13-3.3l-10-.4Zm19.7-39.5c2.8,2.4,2.8,2.4,2.8,15.3,0,7-.3,14-.8,15.5-1,3.6-5.4,5.8-11.7,5.8h-5.1l.2-19.5.2-19.5h5.8C118.8-135,120.4-134.5,122.7-132.6Zm-1.8,43.1c4,2,5.1,6.1,5.1,17.9,0,17.2-2,20.6-12.2,20.6h-5.7V-91h5A20.774,20.774,0,0,1,120.9-89.5Z" fill="#04005e"/>
      <path id="Path_5" data-name="Path 5" d="M142.6-137.9c-5.6,4.4-5.6,4.2-5.6,49.9v42h5V-90h18v44h5V-87.3c0-45.9,0-45.8-6.9-50.4C153.6-140.7,146.3-140.8,142.6-137.9Zm14.1,5.3,2.8,2.4v34.7h-17v-34.7l2.8-2.4C148.9-135.7,153.1-135.7,156.7-132.6Z" fill="#04005e"/>
      <path id="Path_6" data-name="Path 6" d="M170.7-139.4c-.4.4-.7,21.6-.7,47.1v46.4l13.3-.3c12.4-.3,13.2-.4,13.2-2.3,0-1.8-.8-2-10.5-2.5l-10.5-.5-.2-44c-.2-41.8-.3-44-2.1-44.3A3.176,3.176,0,0,0,170.7-139.4Z" fill="#04005e"/>
    </g>
    <path id="logo" d="M33.882,29.977a5.211,5.211,0,0,0,.743-10.4h-.074a5.209,5.209,0,0,0-.668,10.4ZM32.4,13.343A3.567,3.567,0,0,0,36.184,10a3.524,3.524,0,0,0-3.342-3.787,3.567,3.567,0,0,0-3.787,3.342h0A3.619,3.619,0,0,0,32.4,13.343Zm3.342,35.793a7.222,7.222,0,0,0,1.04-14.406h0a7.222,7.222,0,1,0-1.04,14.406ZM34.551,62.354a9.637,9.637,0,1,0,19.233,1.262h0a9.637,9.637,0,1,0-19.233-1.262Zm29.7,18.119a7.222,7.222,0,1,0-6.683-7.723,7.181,7.181,0,0,0,6.683,7.723Zm28.367-.223a3.567,3.567,0,0,0,3.342,3.787,3.571,3.571,0,0,0,.446-7.129A3.673,3.673,0,0,0,92.621,80.251Zm-6.386-1.337h0a5.17,5.17,0,0,0-4.753-5.569h0a5.211,5.211,0,1,0-.743,10.4A5.111,5.111,0,0,0,86.235,78.914ZM6.332,29.457a7.37,7.37,0,1,0,14.7,1.04A7.434,7.434,0,0,0,14.2,22.625a7.332,7.332,0,0,0-7.871,6.832Zm10.99-18.119a5.217,5.217,0,1,0-10.4-.891v.074a5.205,5.205,0,0,0,4.827,5.5h0A5.056,5.056,0,0,0,17.323,11.338Zm-2,52.724A10.737,10.737,0,0,0,26.754,54.037h0A10.754,10.754,0,1,0,5.293,52.626,10.878,10.878,0,0,0,15.318,64.062ZM95.592,90.87h0a5.214,5.214,0,1,0,4.753,5.644v-.074A5.26,5.26,0,0,0,95.592,90.87ZM23.115,71.711A13.4,13.4,0,1,0,35.59,85.968,13.345,13.345,0,0,0,23.115,71.711Zm18.639,19.53a10.719,10.719,0,1,0,21.387,1.485h0A10.737,10.737,0,0,0,53.116,81.29,10.6,10.6,0,0,0,41.754,91.241Zm33.714,10.768a6.624,6.624,0,1,0,.891-13.218h0a6.624,6.624,0,1,0-.891,13.218ZM65.814,7.477a1.6,1.6,0,1,1-1.485-1.708A1.7,1.7,0,0,1,65.814,7.477ZM63.215,17.5h0a2.233,2.233,0,1,0,4.456.3,2.23,2.23,0,0,0-2-2.376A2.261,2.261,0,0,0,63.215,17.5Zm2.3,13.07h0A3.482,3.482,0,0,0,69.3,27.229a3.571,3.571,0,0,0-7.129-.446A3.673,3.673,0,0,0,65.517,30.571ZM87.869,54.557a2.282,2.282,0,0,0,2.376-2.079,2.185,2.185,0,0,0-2-2.376h-.074a2.233,2.233,0,0,0-.3,4.456Zm9.282.965a1.6,1.6,0,1,0-1.485-1.708A1.588,1.588,0,0,0,97.151,55.522ZM80.072,42.3a3.567,3.567,0,0,0-3.787,3.342h0A3.571,3.571,0,1,0,80.072,42.3ZM72.646,31.165h0a5.211,5.211,0,1,0,4.827,5.569A5.135,5.135,0,0,0,72.646,31.165ZM47.843,18.69a3.524,3.524,0,0,0,3.342,3.787h0a3.571,3.571,0,0,0,.446-7.129A3.673,3.673,0,0,0,47.843,18.69Zm4.01-7.946a2.233,2.233,0,0,0,.3-4.456,2.282,2.282,0,0,0-2.376,2.079,2.179,2.179,0,0,0,2.079,2.376Zm30.3,51.981a3.524,3.524,0,0,0,3.342,3.787,3.571,3.571,0,1,0-3.342-3.787ZM53.784,27.749h0a5.211,5.211,0,1,0,4.827,5.569A5.228,5.228,0,0,0,53.784,27.749ZM97,67.478h0A2.2,2.2,0,0,0,99.379,65.4,2.243,2.243,0,0,0,97.3,63.022a2.161,2.161,0,0,0-2.3,2A2.255,2.255,0,0,0,97,67.478ZM73.165,63.022a5.211,5.211,0,0,0,.743-10.4h-.074a5.205,5.205,0,0,0-5.5,4.827h0A5.178,5.178,0,0,0,73.165,63.022ZM59.131,41.487a7.219,7.219,0,1,0,6.758,7.723,7.29,7.29,0,0,0-6.758-7.723Z" transform="translate(431.684 592.322)" fill="url(#linear-gradient)"/>
    <g id="logo-txt512_2_" data-name="logo-txt512 (2)" transform="translate(534 738.1)">
      <path id="Path_24" data-name="Path 24" d="M3-136.5c0,2.4.3,2.5,5.5,2.5H14l.2,44.2.3,44.3,2.3.3,2.2.3v-89l5.8-.3c4.9-.3,5.7-.6,5.7-2.3,0-1.9-.8-2-13.7-2.3L3-139.1Z" fill="#1399cd"/>
      <path id="Path_25" data-name="Path 25" d="M36-92v47h5V-89h3.4c3.1,0,3.4.3,4.4,4.2C56.7-54.6,59-45.8,59-45.4c0,.2,1.1.4,2.5.4s2.5-.1,2.5-.3c0-.1-2.5-9.8-5.4-21.6L53.2-88.3l3.2-2.1A21.519,21.519,0,0,0,61.8-97c2.1-4.2,2.3-5.5,2-18.5-.3-12.6-.5-14.3-2.5-17.1-3.4-4.8-7.8-6.4-17.2-6.4H36Zm19.7-39.6c2.6,2.3,2.8,2.8,3.1,13C59.6-98.2,57.6-94,47-94H41v-40h5.9C51.8-134,53.4-133.6,55.7-131.6Z" fill="#1399cd"/>
      <path id="Path_26" data-name="Path 26" d="M76.3-137c-6.9,4.2-6.8,3.4-7.1,44-.3,40.8-.2,41.1,6.7,45.7,4.2,2.8,8,2.9,13,.4,7.8-4,7.6-2.9,7.6-45.1,0-34.5-.1-37.8-1.8-40.3C90.6-138.7,82.4-140.7,76.3-137Zm12.1,5.3c2.3,2.3,2.4,2.8,3.1,30.8.9,36.7.6,43.9-2.1,47.6-3.1,4.2-8.5,4.4-12.5.4l-3-3,.3-36.6.3-36.7,2.8-2.4C80.9-134.7,85.4-134.7,88.4-131.7Z" fill="#1399cd"/>
      <path id="Path_27" data-name="Path 27" d="M103-92v47h5V-79.7c0-19,.2-34.4.4-34.2.3.2,3.9,14.1,8.1,30.9s8.1,32.2,8.6,34.3c.8,3.1,1.4,3.8,3.2,3.5l2.2-.3v-93l-2.2-.3-2.3-.3v34.8c0,19.1-.4,34.1-.9,33.3-.4-.8-4.5-16.5-9.1-34.8-7.9-32-8.3-33.2-10.6-33.2H103Z" fill="#1399cd"/>
      <path id="Path_28" data-name="Path 28" d="M137-92v47h5v-94h-5Z" fill="#1399cd"/>
      <path id="Path_29" data-name="Path 29" d="M158.9-136.7c-6.8,4.5-6.9,5.1-6.9,44.7,0,39.7.1,40.2,7,44.8,2.8,1.9,4.4,2.3,8.4,1.9,4.1-.4,5.5-1.1,8.3-4.1,1.8-1.9,3.3-4.4,3.3-5.5a12.807,12.807,0,0,1,.6-3.5c.5-1.2,0-1.6-2-1.6-2.1,0-2.8.6-3.3,3-1.3,6.9-9.3,9.1-14.4,4.1L157-55.8v-72.4l2.9-2.9c5.3-5.2,13.2-2.7,14.5,4.6.5,2.6,1.2,3.5,2.6,3.5a1.993,1.993,0,0,0,2.1-1.3A13.375,13.375,0,0,0,165.7-139,14.153,14.153,0,0,0,158.9-136.7Z" fill="#1399cd"/>
      <path id="Path_30" data-name="Path 30" d="M192.3-137c-6.2,3.8-6.8,5.7-6.8,23.1,0,14.4.2,16,2.1,18.6,2,2.7,7.8,5.6,13.6,6.8,4.7.9,6.2,4.6,6.6,16.2.5,12.5-.2,16.8-3.3,19.9-4.7,4.7-12.8,1.7-14.1-5.2-.5-2.8-1-3.5-2.8-3.2-4.9.7,0,12.5,6.2,14.9,4.6,1.8,11.1.5,14.4-2.8,3.7-3.8,4.8-8.3,4.8-20.8,0-16.4-2.2-21.4-10.4-23.6-11.9-3.2-12.6-4.4-12.6-22.4,0-12.6,0-12.7,2.9-15.6,3.7-3.7,7.8-3.8,11.5-.4,1.4,1.3,2.6,3,2.6,3.8,0,2.3,2.5,4.8,4.2,4.2,1.7-.7,1.2-5-1.1-9.3C207-138.5,198.2-140.6,192.3-137Z" fill="#1399cd"/>
    </g>
  </g>
</svg>`


  static IconGloView = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="507.5" height="97.02" viewBox="0 0 507.5 97.02">
  <defs>
    <linearGradient id="linear-gradient" x1="0.167" y1="0.065" x2="0.737" y2="0.837" gradientUnits="objectBoundingBox">
      <stop offset="0.01" stop-color="#04005e"/>
      <stop offset="0.09" stop-color="#040b66"/>
      <stop offset="0.22" stop-color="#03297d"/>
      <stop offset="0.4" stop-color="#0158a1"/>
      <stop offset="0.54" stop-color="#0087c5"/>
      <stop offset="1" stop-color="#5ee1ed"/>
    </linearGradient>
  </defs>
  <g id="Group_2" data-name="Group 2" transform="translate(-239.5 -598)">
    <g id="logo-txt512" transform="translate(235.5 739.2)">
      <path id="Path_1" data-name="Path 1" d="M10.2-137.5C3.9-132.3,4-132.7,4-92.9,4-58.1,4.1-56.6,6.1-53A16.836,16.836,0,0,0,11-47.7c3.8,2.3,10.8,2.2,14.3-.2,6-3.9,6.2-4.8,6.5-27.4L32.1-96h-8c-8,0-8.1,0-8.1,2.5,0,2.4.3,2.5,5.6,2.5h5.6l-.4,17c-.3,16.9-.4,17-3,19.7-3.6,3.5-8,3.5-11.6-.1L9.5-57v-73.2l2.8-2.4c5.1-4.4,11.9-2.1,13.7,4.6.9,3.3,1.5,4,3.5,4,2.9,0,3.3-2.3,1.1-7.3-2.3-5.4-5.9-8-11.9-8.5C14.1-140.2,13-139.9,10.2-137.5Z" fill="#04005e"/>
      <path id="Path_2" data-name="Path 2" d="M37.7-139.3c-.4.3-.7,21.5-.7,47v46.4l13.3-.3c12.4-.3,13.2-.4,13.2-2.3,0-1.8-.8-2-10-2.3-6.4-.2-10.2-.7-10.7-1.5C42.4-53,42-73,42-96.8c0-41.2-.1-43.2-1.8-43.2A3.923,3.923,0,0,0,37.7-139.3Z" fill="#04005e"/>
      <path id="Path_3" data-name="Path 3" d="M75.9-137.3c-5.8,4.9-5.9,5.8-5.9,44.9,0,34.5.1,35.7,2.1,39.4,4.2,7.3,12.8,9.1,20,4,5.7-4.1,5.9-5.4,5.9-44,0-38.5-.1-39.4-5.9-44.3-2.6-2.1-4.3-2.7-8.1-2.7S78.5-139.4,75.9-137.3Zm14.2,5.2c1.3,1.6,1.7,6,2.2,24.7,1,31.7.9,45.3-.3,49.6-1.9,6.8-8.5,8.9-13.7,4.4l-2.8-2.4-.3-35.6c-.3-31-.1-35.9,1.3-38.6a9.839,9.839,0,0,1,3.8-4C83.4-135.3,88.2-134.4,90.1-132.1Z" fill="#04005e"/>
      <path id="Path_4" data-name="Path 4" d="M103-93.1V-46h8.8c6.9,0,9.4-.4,11.9-2,6.2-3.8,6.8-5.7,6.8-23,0-13.9-.2-15.9-2.1-19l-2.1-3.6,2.1-2.8c1.8-2.4,2.1-4.4,2.4-16,.4-15.2-.5-20-4.8-24.1-2.9-2.8-3.6-3-13-3.3l-10-.4Zm19.7-39.5c2.8,2.4,2.8,2.4,2.8,15.3,0,7-.3,14-.8,15.5-1,3.6-5.4,5.8-11.7,5.8h-5.1l.2-19.5.2-19.5h5.8C118.8-135,120.4-134.5,122.7-132.6Zm-1.8,43.1c4,2,5.1,6.1,5.1,17.9,0,17.2-2,20.6-12.2,20.6h-5.7V-91h5A20.774,20.774,0,0,1,120.9-89.5Z" fill="#04005e"/>
      <path id="Path_5" data-name="Path 5" d="M142.6-137.9c-5.6,4.4-5.6,4.2-5.6,49.9v42h5V-90h18v44h5V-87.3c0-45.9,0-45.8-6.9-50.4C153.6-140.7,146.3-140.8,142.6-137.9Zm14.1,5.3,2.8,2.4v34.7h-17v-34.7l2.8-2.4C148.9-135.7,153.1-135.7,156.7-132.6Z" fill="#04005e"/>
      <path id="Path_6" data-name="Path 6" d="M170.7-139.4c-.4.4-.7,21.6-.7,47.1v46.4l13.3-.3c12.4-.3,13.2-.4,13.2-2.3,0-1.8-.8-2-10.5-2.5l-10.5-.5-.2-44c-.2-41.8-.3-44-2.1-44.3A3.176,3.176,0,0,0,170.7-139.4Z" fill="#04005e"/>
    </g>
    <path id="logo" d="M33.882,29.977a5.211,5.211,0,0,0,.743-10.4h-.074a5.209,5.209,0,0,0-.668,10.4ZM32.4,13.343A3.567,3.567,0,0,0,36.184,10a3.524,3.524,0,0,0-3.342-3.787,3.567,3.567,0,0,0-3.787,3.342h0A3.619,3.619,0,0,0,32.4,13.343Zm3.342,35.793a7.222,7.222,0,0,0,1.04-14.406h0a7.222,7.222,0,1,0-1.04,14.406ZM34.551,62.354a9.637,9.637,0,1,0,19.233,1.262h0a9.637,9.637,0,1,0-19.233-1.262Zm29.7,18.119a7.222,7.222,0,1,0-6.683-7.723,7.181,7.181,0,0,0,6.683,7.723Zm28.367-.223a3.567,3.567,0,0,0,3.342,3.787,3.571,3.571,0,0,0,.446-7.129A3.673,3.673,0,0,0,92.621,80.251Zm-6.386-1.337h0a5.17,5.17,0,0,0-4.753-5.569h0a5.211,5.211,0,1,0-.743,10.4A5.111,5.111,0,0,0,86.235,78.914ZM6.332,29.457a7.37,7.37,0,1,0,14.7,1.04A7.434,7.434,0,0,0,14.2,22.625a7.332,7.332,0,0,0-7.871,6.832Zm10.99-18.119a5.217,5.217,0,1,0-10.4-.891v.074a5.205,5.205,0,0,0,4.827,5.5h0A5.056,5.056,0,0,0,17.323,11.338Zm-2,52.724A10.737,10.737,0,0,0,26.754,54.037h0A10.754,10.754,0,1,0,5.293,52.626,10.878,10.878,0,0,0,15.318,64.062ZM95.592,90.87h0a5.214,5.214,0,1,0,4.753,5.644v-.074A5.26,5.26,0,0,0,95.592,90.87ZM23.115,71.711A13.4,13.4,0,1,0,35.59,85.968,13.345,13.345,0,0,0,23.115,71.711Zm18.639,19.53a10.719,10.719,0,1,0,21.387,1.485h0A10.737,10.737,0,0,0,53.116,81.29,10.6,10.6,0,0,0,41.754,91.241Zm33.714,10.768a6.624,6.624,0,1,0,.891-13.218h0a6.624,6.624,0,1,0-.891,13.218ZM65.814,7.477a1.6,1.6,0,1,1-1.485-1.708A1.7,1.7,0,0,1,65.814,7.477ZM63.215,17.5h0a2.233,2.233,0,1,0,4.456.3,2.23,2.23,0,0,0-2-2.376A2.261,2.261,0,0,0,63.215,17.5Zm2.3,13.07h0A3.482,3.482,0,0,0,69.3,27.229a3.571,3.571,0,0,0-7.129-.446A3.673,3.673,0,0,0,65.517,30.571ZM87.869,54.557a2.282,2.282,0,0,0,2.376-2.079,2.185,2.185,0,0,0-2-2.376h-.074a2.233,2.233,0,0,0-.3,4.456Zm9.282.965a1.6,1.6,0,1,0-1.485-1.708A1.588,1.588,0,0,0,97.151,55.522ZM80.072,42.3a3.567,3.567,0,0,0-3.787,3.342h0A3.571,3.571,0,1,0,80.072,42.3ZM72.646,31.165h0a5.211,5.211,0,1,0,4.827,5.569A5.135,5.135,0,0,0,72.646,31.165ZM47.843,18.69a3.524,3.524,0,0,0,3.342,3.787h0a3.571,3.571,0,0,0,.446-7.129A3.673,3.673,0,0,0,47.843,18.69Zm4.01-7.946a2.233,2.233,0,0,0,.3-4.456,2.282,2.282,0,0,0-2.376,2.079,2.179,2.179,0,0,0,2.079,2.376Zm30.3,51.981a3.524,3.524,0,0,0,3.342,3.787,3.571,3.571,0,1,0-3.342-3.787ZM53.784,27.749h0a5.211,5.211,0,1,0,4.827,5.569A5.228,5.228,0,0,0,53.784,27.749ZM97,67.478h0A2.2,2.2,0,0,0,99.379,65.4,2.243,2.243,0,0,0,97.3,63.022a2.161,2.161,0,0,0-2.3,2A2.255,2.255,0,0,0,97,67.478ZM73.165,63.022a5.211,5.211,0,0,0,.743-10.4h-.074a5.205,5.205,0,0,0-5.5,4.827h0A5.178,5.178,0,0,0,73.165,63.022ZM59.131,41.487a7.219,7.219,0,1,0,6.758,7.723,7.29,7.29,0,0,0-6.758-7.723Z" transform="translate(431.684 592.322)" fill="url(#linear-gradient)"/>
    <g id="logo-txt512_2_" data-name="logo-txt512 (2)" transform="translate(534 738.1)">
      <path id="Path_24" data-name="Path 24" d="M3-136.5c0,2.4.3,2.5,5.5,2.5H14l.2,44.2.3,44.3,2.3.3,2.2.3v-89l5.8-.3c4.9-.3,5.7-.6,5.7-2.3,0-1.9-.8-2-13.7-2.3L3-139.1Z" fill="#1399cd"/>
      <path id="Path_25" data-name="Path 25" d="M36-92v47h5V-89h3.4c3.1,0,3.4.3,4.4,4.2C56.7-54.6,59-45.8,59-45.4c0,.2,1.1.4,2.5.4s2.5-.1,2.5-.3c0-.1-2.5-9.8-5.4-21.6L53.2-88.3l3.2-2.1A21.519,21.519,0,0,0,61.8-97c2.1-4.2,2.3-5.5,2-18.5-.3-12.6-.5-14.3-2.5-17.1-3.4-4.8-7.8-6.4-17.2-6.4H36Zm19.7-39.6c2.6,2.3,2.8,2.8,3.1,13C59.6-98.2,57.6-94,47-94H41v-40h5.9C51.8-134,53.4-133.6,55.7-131.6Z" fill="#1399cd"/>
      <path id="Path_26" data-name="Path 26" d="M76.3-137c-6.9,4.2-6.8,3.4-7.1,44-.3,40.8-.2,41.1,6.7,45.7,4.2,2.8,8,2.9,13,.4,7.8-4,7.6-2.9,7.6-45.1,0-34.5-.1-37.8-1.8-40.3C90.6-138.7,82.4-140.7,76.3-137Zm12.1,5.3c2.3,2.3,2.4,2.8,3.1,30.8.9,36.7.6,43.9-2.1,47.6-3.1,4.2-8.5,4.4-12.5.4l-3-3,.3-36.6.3-36.7,2.8-2.4C80.9-134.7,85.4-134.7,88.4-131.7Z" fill="#1399cd"/>
      <path id="Path_27" data-name="Path 27" d="M103-92v47h5V-79.7c0-19,.2-34.4.4-34.2.3.2,3.9,14.1,8.1,30.9s8.1,32.2,8.6,34.3c.8,3.1,1.4,3.8,3.2,3.5l2.2-.3v-93l-2.2-.3-2.3-.3v34.8c0,19.1-.4,34.1-.9,33.3-.4-.8-4.5-16.5-9.1-34.8-7.9-32-8.3-33.2-10.6-33.2H103Z" fill="#1399cd"/>
      <path id="Path_28" data-name="Path 28" d="M137-92v47h5v-94h-5Z" fill="#1399cd"/>
      <path id="Path_29" data-name="Path 29" d="M158.9-136.7c-6.8,4.5-6.9,5.1-6.9,44.7,0,39.7.1,40.2,7,44.8,2.8,1.9,4.4,2.3,8.4,1.9,4.1-.4,5.5-1.1,8.3-4.1,1.8-1.9,3.3-4.4,3.3-5.5a12.807,12.807,0,0,1,.6-3.5c.5-1.2,0-1.6-2-1.6-2.1,0-2.8.6-3.3,3-1.3,6.9-9.3,9.1-14.4,4.1L157-55.8v-72.4l2.9-2.9c5.3-5.2,13.2-2.7,14.5,4.6.5,2.6,1.2,3.5,2.6,3.5a1.993,1.993,0,0,0,2.1-1.3A13.375,13.375,0,0,0,165.7-139,14.153,14.153,0,0,0,158.9-136.7Z" fill="#1399cd"/>
      <path id="Path_30" data-name="Path 30" d="M192.3-137c-6.2,3.8-6.8,5.7-6.8,23.1,0,14.4.2,16,2.1,18.6,2,2.7,7.8,5.6,13.6,6.8,4.7.9,6.2,4.6,6.6,16.2.5,12.5-.2,16.8-3.3,19.9-4.7,4.7-12.8,1.7-14.1-5.2-.5-2.8-1-3.5-2.8-3.2-4.9.7,0,12.5,6.2,14.9,4.6,1.8,11.1.5,14.4-2.8,3.7-3.8,4.8-8.3,4.8-20.8,0-16.4-2.2-21.4-10.4-23.6-11.9-3.2-12.6-4.4-12.6-22.4,0-12.6,0-12.7,2.9-15.6,3.7-3.7,7.8-3.8,11.5-.4,1.4,1.3,2.6,3,2.6,3.8,0,2.3,2.5,4.8,4.2,4.2,1.7-.7,1.2-5-1.1-9.3C207-138.5,198.2-140.6,192.3-137Z" fill="#1399cd"/>
    </g>
  </g>
</svg>`

}
