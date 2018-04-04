import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'app';

  foods;
  paises;
  food_name;

  constructor(private http:HttpClient) {}

  ngOnInit() {
    this.getFoods();
    this.getdato()
  }

  getFoods() {
    this.http.get('./assets/productos.json').subscribe(
      // the first argument is a function which runs on success
      data => { this.foods = data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading foods')
    );
  }

  createFood(name) {
    let food = {name: name};
    let body = JSON.stringify(food);
    this.http.post('./assets/productos.json', body).subscribe(
       data2 => {
         // refresh the list
         this.getFoods();
         return true;
       },
       error => {
         console.error("Error saving food!");
         return Observable.throw(error);
       }
    );
  }

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  getdato(){
    this.http.get(this.apiUrl).subscribe(
      data1 => { this.paises = data1},
    )

  }
 
}

