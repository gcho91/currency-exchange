import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Currency } from './currency'
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ForexService {

  constructor(public http: HttpClient) { 

  }

  ngOnInit(){
    console.log("coming from forex service");
    // for the scope of this project MVP, I kept all logic inside the component.ts
    // given a longer time frame, I would move all of the logic here to keep the main component file clean
  }

 
}
