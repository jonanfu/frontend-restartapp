

export interface RespuestaPedido {
  ok: boolean;
  pedido: Pedidos[];

}

export interface Pedidos {
  _id?: string;
  mesa?: string;
  nombrePlato_Precio?: NombrePlatoPrecio[];
  notas?: string;
  listo ?: boolean;
  precioTotal?: number;
  usuario?: Usuario[]; 
}

export interface Usuario {
  _id?: string;
  nombre?: string;
  apellido?: string;
  rol?:string;
  email?: string;
  contrasena?:string;
}

export interface NombrePlatoPrecio {
  _id?: string;
  nombreArt?: string;
  precio?: number;
  cantidad?: number;
}

