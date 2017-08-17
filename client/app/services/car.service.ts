import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CarService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getCars(): Observable<any> {
    return this.http.get('/api/cars').map(res => res.json());
  }

  countCars(): Observable<any> {
    return this.http.get('/api/cars/count').map(res => res.json());
  }

  addCar(car): Observable<any> {
    return this.http.post('/api/car', JSON.stringify(car), this.options);
  }

  sendCar(car): Observable<any> {
    return this.http.post('http://localhost:2000/api/tk1/addcar', JSON.stringify(car), this.options);
  }

  getCar(car): Observable<any> {
    return this.http.get(`/api/car/${car._id}`).map(res => res.json());
  }

  editCar(car): Observable<any> {
    return this.http.put(`/api/car/${car._id}`, JSON.stringify(car), this.options);
  }

  deleteCar(car): Observable<any> {
    return this.http.delete(`/api/car/${car._id}`, this.options);
  }

}
