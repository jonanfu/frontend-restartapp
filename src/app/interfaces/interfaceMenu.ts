
export interface RespuestaMenu {
  ok: boolean;
  plato: Plato[];
}

export interface Plato {
  _id?: string;
  nombreCat?: string;
  articulos?: Articulo[];
}

export interface Articulo {
  _id?: string;
  nombreArt?: string;
  precio?: number;
  cantidad?: number;
}