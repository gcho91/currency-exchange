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
    console.log("coming from forex service")

  }

 
}
