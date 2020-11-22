export interface RespuestaRestaurant {
  ok: boolean;
  restaurantData: Restaurante;
}

export interface Restaurante {
  _id ?: string;
  nombreRes ?: string;
  ruc ?: string;
  telefono ?: string;
  ciudad ?: string;
  direccion ?: string;
  mesas ?: number;

}