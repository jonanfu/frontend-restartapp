import { Component, OnInit, Input } from '@angular/core';
//Para imprimir pdf
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform, ModalController, NavParams, AlertController } from '@ionic/angular';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { RestauranteService } from '../../services/restaurante.service';
import { Pedidos, Usuario } from '../../interfaces/interfacePedido';
import { UsuarioService } from '../../services/usuario.service';
import { UiService } from '../../services/ui.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-modal-imprimir',
  templateUrl: './modal-imprimir.component.html',
  styleUrls: ['./modal-imprimir.component.scss'],
})
export class ModalImprimirComponent implements OnInit {

  pdfObject: any;

  datosCli = {
    nombres: '',
    dni: '',
    ciudad: '',
    direccion: '',
    telefono: '',
  }

  datosRes = {
    nombreRes: '',
    ruc: '',
    telefono: '',
    ciudad: '',
    direccion: '',
  }

  datosPedido = {
    mesa: '',
    subtotal: 0,
    iva: 0,
    precioTotal: 0
  }

  ciudad: string = '';


  ciudades: any[] = [
    {
      id: 1,
      ciudad: 'Otra (Ingrese)'
    },
    {
      id: 2,
      ciudad: 'Tulcán'
    },
    {
      id: 3,
      ciudad: 'Ibarra'
    },
    {
      id: 4,
      ciudad: 'Quito'
    },
    {
      id: 5,
      ciudad: 'Esmeraldas'
    },
    {
      id: 6,
      ciudad: 'Riobamba'
    },
    {
      id: 7,
      ciudad: 'Guayaquil'
    },
    {
      id: 8,
      ciudad: 'Ambato'
    },
    {
      id: 9,
      ciudad: 'Zamora'
    },
    {
      id: 10,
      ciudad: 'Santo Domingo'
    },
    {
      id: 11,
      ciudad: 'Portoviejo'
    },
    {
      id: 12,
      ciudad: 'Machala'
    }
  ];

  onChange( event ){
    this.ciudad = event.target.value;

    if (this.ciudad === 'Otra (Ingrese)'){
      this.alertaIngresarCity();
    }
  }

  // gerente: Usuario [] = [];
  pedidos: any [] = [];
  items: Pedidos;
  
  constructor(private file: File,
              private fileOpener: FileOpener,
              private platform: Platform,
              private restaurante: RestauranteService,
              private modalCtrl: ModalController,
              private nav: NavParams,
              private alertCtrl: AlertController,
              private uiService: UiService) 
  {
    

    // this.userGerente.getUsuarios().subscribe( resp => {

    //   this.gerente = resp.usuario.filter( x => {
    //     x.rol === 'gerente'
    //   })

    // })

  }

  ngOnInit() { 
    this.items = this.nav.get('item'); 
    this.pedidos = this.items.nombrePlato_Precio;
    this.cargarPedidos(this.items);
    this.eliminarID();

   this.restaurante.traerRestaurante().then(resp => {
    console.log('datos: ',resp);
      const datos = resp['datos']
      this.cargarDatos(datos[0])
      
    })
  }
  
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  cargarPedidos(items: Pedidos){
    this.datosPedido.mesa = items.mesa;
    this.datosPedido.precioTotal = items.precioTotal;
    this.ivaYSubtotal(items.precioTotal);

    console.log('subtotal cargado: ',this.datosPedido.subtotal);
    console.log('iva cargado: ',this.datosPedido.iva);

  }

  async alertaIngresarCity(){

    const alert = await this.alertCtrl.create({
      header: 'Ingresar ciudad',
      inputs: [
        {
          name: 'cityCountry',
          type: 'text',
          placeholder: 'Ciudad del cliente'
        }
      ],
      buttons:[{
        text: 'Cancelar',
        role: 'cancel',
      },{
        text: 'Aceptar',
        handler: (dataAlert) => {
          this.datosCli.ciudad = dataAlert['cityCountry'];
        } 
      }

      ]
    });

    await alert.present();

  }

  // validarCedula(){
  //   const cedula = this.datosCli.dni;
  //   console.log('cedula: ',cedula);

  //   if (cedula.length === 10) {

  //     // Obtenemos el digito de la region que sonlos dos primeros digitos
  //     const digitoRegion = cedula.substring(0, 2);
     
  //     // Pregunto si la region existe ecuador se divide en 24 regiones
  //     if (digitoRegion >= String(0) && digitoRegion <= String(24)) {
  
  //       // Extraigo el ultimo digito
  //       const ultimoDigito = Number(cedula.substring(9, 10));
  
  //       // Agrupo todos los pares y los sumo
  //       const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));
  
  //       // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
  //       let numeroUno: any = cedula.substring(0, 1);
  //       numeroUno = (numeroUno * 2);
  //       if (numeroUno > 9) {
  //         numeroUno = (numeroUno - 9);
  //       }
  
  //       let numeroTres: any = cedula.substring(2, 3);
  //       numeroTres = (numeroTres * 2);
  //       if (numeroTres > 9) {
  //         numeroTres = (numeroTres - 9);
  //       }
  
  //       let numeroCinco: any = cedula.substring(4, 5);
  //       numeroCinco = (numeroCinco * 2);
  //       if (numeroCinco > 9) {
  //         numeroCinco = (numeroCinco - 9);
  //       }
  
  //       let numeroSiete: any = cedula.substring(6, 7);
  //       numeroSiete = (numeroSiete * 2);
  //       if (numeroSiete > 9) {
  //         numeroSiete = (numeroSiete - 9);
  //       }
  
  //       let numeroNueve: any = cedula.substring(8, 9);
  //       numeroNueve = (numeroNueve * 2);
  //       if (numeroNueve > 9) {
  //         numeroNueve = (numeroNueve - 9);
  //       }
  
  //       const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
  
  //       // Suma total
  //       const sumaTotal = (pares + impares);
  
  //       // extraemos el primero digito
  //       const primerDigitoSuma = String(sumaTotal).substring(0, 1);
  
  //       // Obtenemos la decena inmediata
  //       const decena = (Number(primerDigitoSuma) + 1) * 10;
  
  //       // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
  //       let digitoValidador = decena - sumaTotal;
  
  //       // Si el digito validador es = a 10 toma el valor de 0
  //       if (digitoValidador === 10) {
  //         digitoValidador = 0;
  //       }
  
  //       // Validamos que el digito validador sea igual al de la cedula
  //       if (digitoValidador === ultimoDigito) {
  //         // console.log('CEDULA COMPLETAMENTE CORRECTA');
  //         this.imprimirPDF();
  //         return true;
  //       } else {
  //         // console.log('CEDULA CASI CORRECTA');
  //         this.uiService.alertaInformativa('La cédula que ha ingresado es incorrecta', 'Cédula incorrecta')
  //         return false;
  //       }
  
  //     } else {
  //       // imprimimos en consola si la region no pertenece
  //       // console.log('LA REGIÓN NO PERTENECE A LA CEDULA INGRESADA');
  //       this.uiService.alertaInformativa('La cédula no pertenece a ninguna región', 'Cédula incorrecta')
  //       return false;
  //     }
  //   } else {
  //     // console.log('LA CEDULA INGRESADA NO SE ENCUENTRA DENTRO DEL RANGO DE DIGITOS PERMITIDOS');
  //     this.uiService.alertaInformativa('La cédula ingresada no se encuentra dentro del rango de dígitos permitidos','Cédula incorrecta')
  //     // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
  //     return false;
  //   }
   
  // }


  ivaYSubtotal(precioTotal: any){

    this.datosPedido.subtotal = (precioTotal-(precioTotal * 0.12));
    this.datosPedido.iva = (precioTotal * 0.12)
  }

  cargarDatos(datos) {

    // console.log('arr: ', datos);

    this.datosRes.nombreRes = datos.nombreRes;
    this.datosRes.ruc = datos.ruc || '';
    this.datosRes.telefono = datos.telefono || '';
    this.datosRes.ciudad = datos.ciudad || '';
    this.datosRes.direccion = datos.direccion || '';

  }

  construirBodyTabla(data, columns) {
   
    var body = [];

    body.push(columns);

    data.forEach( row => {
        var dataRow = [];

        columns.forEach( column => {         
            dataRow.push(row[column].toString());
        })

        body.push(dataRow);
    });

    return body;
  }

  table(data, columns) {
    return {
        table: {
            headerRows: 1,
            style: 'subheader',
            body: this.construirBodyTabla(data, columns)
        }
    };
  }
  
  imprimirPDF() {

    this.eliminarID();

    var today = new Date();
    var dd = String(today.getDate())
    var mm = String(today.getMonth() + 1)
    var yyyy = today.getFullYear();

    var todayy = mm + '/' + dd + '/' + yyyy;

    const docDefinition = {
      content: [
        { text: `Restaurante ${this.datosRes.nombreRes}`, fontSize: 14, bold: true, margin: [0, 0, 0, 8] },

        {
          style: 'tableExample',
          table: {
            widths: [70, 140],
            headerRows: 1,
            body:[
              [{text: `RUC`, style: 'tableHeader', alignment: 'center'}, 
              {text: `${this.datosRes.ruc}`, fontsize:10, alignment: 'center'}],
              [{text: `Teléfono`, style: 'tableHeader', alignment: 'center'}, 
              {text: `${this.datosRes.telefono}`, fontsize:10, alignment: 'center'}],
              [{text: `Ciudad`, style: 'tableHeader', alignment: 'center'}, 
              {text: `${this.datosRes.ciudad}`, fontsize:10, alignment: 'center'}],
              [{text: `Dirección`, style: 'tableHeader', alignment: 'center'}, 
              {text: `${this.datosRes.direccion}`, fontsize:10, alignment: 'center'}],
            ]

          }
        },

        { text: '\nDatos del consumidor', style: 'subheader', bold: true, margin: [0, 0, 0, 8] },

        {
          style: 'tableExample',
          table: {
            widths: [70, 140],
            headerRows: 1,
            body:[
              [{text: `Nombres`, style: 'tableHeader', alignment: 'center'}, 
              {text: `${this.datosCli.nombres}`, fontsize:10, alignment: 'center'}],

              [{text: `Cédula/Ruc`, style: 'tableHeader', alignment: 'center'}, 
              {text: `${this.datosCli.dni}`, fontsize:10, alignment: 'center'}],

              [{text: `Ciudad`, style: 'tableHeader', alignment: 'center'}, 
              {text: `${this.ciudad}`, fontsize:10, alignment: 'center'}],

              [{text: `Dirección`, style: 'tableHeader', alignment: 'center'}, 
              {text: `${this.datosCli.direccion}`, fontsize:10, alignment: 'center'}],
            ]
          }
        },
        { text: '\nProductos consumidos', style: 'subheader', bold: true, margin: [0, 0, 0, 8] },
        {
          bold: true,
          ul: [
            `FECHA: ${todayy}`,
            `MESA: ${this.datosPedido.mesa}`,
          ]
        },
        //PONER AQUÍ EL BODY DE LA TABLA A GENERAR CON EL ESTILO
        this.table(this.pedidos, ['cantidad', 'nombreArt', 'precio']),

        {
          style: 'tableExample',
          table: {
            widths: [160, 'auto'],
            body: [
              ['Subtotal', {text: `$ ${this.datosPedido.subtotal}`, noWrap: true}],
              ['IVA (12%)', {text: `$ ${this.datosPedido.iva}`, noWrap: true}],
              ['Precio Total', {text: `$ ${this.datosPedido.precioTotal}`, noWrap: true}]
            ]
          }
        },
        
      ],
      styles: {

        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }

    }


    this.pdfObject = pdfMake.createPdf(docDefinition);
    this.uiService.presentToast('Factura generada', 'success');

    if (this.platform.is('cordova')) {

      this.pdfObject.getBuffer(buffer => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        this.file.writeFile(this.file.dataDirectory, 'factura_pedido.pdf', blob, {
          replace: true
        }).then(fileEntry => {
          this.fileOpener.open(
            this.file.dataDirectory + 'factura_pedido.pdf', 'application/pdf'
          );
        });
      });
      return true;
    }
    this.pdfObject.download();

  }


  eliminarID(){

    this.pedidos = this.pedidos.map(x => ({
      cantidad: x.cantidad,
      nombreArt: x.nombreArt,
      precio: x.precio      
    }))

  }

}
