import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {FbResponse} from './ interfases';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  create(order) {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(map((res: FbResponse) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.data)
        };
      }));
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/orders.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].data)
          }));
      }));
  }

  remove(id: string) {
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`);
  }


}
