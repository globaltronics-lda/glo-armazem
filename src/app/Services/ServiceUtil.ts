

export default class ServiceUtil{

  static DELETED_AT_NULL = "NULL"
  static VALUE_AT_NULLABLE = "NULL"
  static VALUE_AT_STATUS_ACTIVE = "active"
  static VALUE_AT_STATUS_DISABLE = "disable"

  private user:any;


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


  convertJson(data: any) {
    if (data)
      return JSON.parse(data.toString());

    return {};
  }

  getSession(){
    let userInfo = sessionStorage.getItem('_user') as string
    if (userInfo != '')
      this.user = JSON.parse(userInfo);

      return this.user;
  }



}
