export interface IProduct {
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    image: string,
    active: boolean,
    visible?: boolean //campo opcional para gestionar la visibilidad del producto en el filtro
}
//uso pagina https://transform.tools/json-to-typescript