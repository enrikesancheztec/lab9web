import SessionStorageHelper from "../tools/SessionStorageHelper";
import Credentials from "../types/Credentials";
import ProductAPI from "./ProductAPI";

class ProductService {
  getAll() {
    return ProductAPI.get("/products", { headers: this.createHeaders() });
  }

  get(id: number) {
    return ProductAPI.get(`/products/${id}`, { headers: this.createHeaders() });
  }

  login(username: string, password: string) {
    const credentials = {} as Credentials;
    credentials.username = username;
    credentials.password = password;
    return ProductAPI.post("/authenticate", credentials);
  }

  createHeaders() : any {
    var headers = {};

    if (SessionStorageHelper.getToken() !== "") {
      const authStr = 'Bearer '.concat(SessionStorageHelper.getToken());
      headers = {authorization: authStr};
    }

    return headers;
  }
}

export default new ProductService();
