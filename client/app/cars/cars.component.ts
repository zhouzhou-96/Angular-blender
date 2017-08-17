import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CarService } from '../services/car.service';
import { ToastComponent } from '../shared/toast/toast.component';

import { Socket } from 'ng-socket-io';
import * as io from "socket.io-client";

@Component({
  selector: 'app-cats',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  car = {};
  cars = [];
  isLoading = true;
  isEditing = false;
  socket = io('http://localhost:4000');

  addCarForm: FormGroup;
  sendCarForm:FormGroup;
  name = new FormControl('', Validators.required);
  traffic = new FormControl('', Validators.required);

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getCars();
    this.addCarForm = this.formBuilder.group({
      name: this.name,
      traffic: this.traffic,
    });
    
    this.socket.on('new-message', function (data) {
      console.log(data);
      var msg : string = data.toString();
      var na : string = msg.split(':')[0];
      var tr : string = msg.split(':')[1];
      console.log(na);
      console.log(tr);
      for(let car of this.cars){
        if(car.name == na){
          car.traffic=tr;
        }
      }
    }.bind(this));
  }

  getCars() {
    this.carService.getCars().subscribe(
      data => this.cars = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCar() {
    this.carService.addCar(this.addCarForm.value).subscribe(
      res => {
        const newCar = res.json();
        this.cars.push(newCar);
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
    this.carService.sendCar(this.addCarForm.value).subscribe(
      res => {
        this.addCarForm.reset();
      },
      error => console.log(error)
    );
  }

sendCar(){
  this.carService.sendCar(this.sendCarForm.value).subscribe(
      res => {
        const newCar = res.json();
        this.cars.push(newCar);
        this.sendCarForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
}

  enableEditing(car) {
    this.isEditing = true;
    this.car = car;
  }

  cancelEditing() {
    this.isEditing = false;
    this.car = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cars to reset the editing
    this.getCars();
  }

  editCar(car) {
    this.carService.editCar(car).subscribe(
      res => {
        this.isEditing = false;
        this.car = car;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCar(car) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.carService.deleteCar(car).subscribe(
        res => {
          const pos = this.cars.map(elem => elem._id).indexOf(car._id);
          this.cars.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
