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
// coosing to focus on the MVP
//display rate
//rename variables, make it make sense, look for dead variables
//make it very specific and explicit
//leave documentation, trail of comments, hthis is what it does, this is what I WOULD do next
// readme file how to dl and run this thing, use ryan example


// moment.js calendar 30 days dates
//dont reinitialize cyto every time button is clicked, just feed it new data
// make nodes, connect them, no height no graph
// ask about nodes and height - as long as theres nodes and theyre connected its ok???/
// email ad ask
// link out example
  }

 
}
