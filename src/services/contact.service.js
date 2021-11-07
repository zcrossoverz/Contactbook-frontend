import http from "../common/http";
import store from "../store";

class ContactService {
  constructor() {
    http.interceptors.request.use(config => {
        const user = store.getters.loggedInUser;
        if (user && user.accessToken) {
            config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    });     
  }
  
  getAll() {
    return http.get("/contacts");
  }
  get(id) {
    return http.get(`/contacts/${id}`);
  }
  create(data) {
    return http.post("/contacts", data);
  }
  update(id, data) {
    return http.put(`/contacts/${id}`, data);
  }
  delete(id) {
    return http.delete(`/contacts/${id}`);
  }
  deleteAll() {
    return http.delete("/contacts");
  }
  findByName(name) {
    return http.get(`/contacts?name=${name}`);
  }
}
export default new ContactService();
