export interface Producto {
  id: string;
  nombre: string;
  lugar: string;
  photo: string;
  urlproducto: string;
  precio: string;
  fecha: string;
}

export  interface RespuestaAPI {
  productos: Producto[];
  totalPages: number;
  currentPage: number;
  limit: number;
}
