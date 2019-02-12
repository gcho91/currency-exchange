import { Component } from '@angular/core';
import { Currency } from './currency'
import { ForexService } from './forex.service'
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'currency-calc';
  posts: Currency; //
  rates: Currency; //store rates info in rates AFTER initial, use this now

  Url= "https://api.exchangeratesapi.io/latest";

  currencyList = ['']; //stores list of all currencies for drop down load



  // update these variables for calcuations
  inputValue: number;
  baseSymbol: string;

  toSymbol: string;
  toRate: number;

  //variables for display answers only
  answer: number;
  answerInputValue: number;
  answerBaseSymbol: string;
  answerRate: number;
  answerSymbol: string;
  

  constructor(public http: HttpClient, public forexService: ForexService){}

  ngOnInit(){
    this.getPosts();
    
  }

  getPosts(): void {
    //getPosts runs once to initialize at ngInit

    this.http.get<Currency>(this.Url)
    .subscribe( (resp) => {

      this.posts = resp;
      this.baseSymbol = resp.base; //initialize base to default euro
      this.inputValue = 1; //initialize input value to 1 unit
      this.toSymbol ="AUD";
      this.toRate = this.posts.rates['AUD'];

      if (this.currencyList.length === 1) {

        this.currencyList = Object.keys(this.posts.rates)
        //add EURO to list
        this.currencyList.push("EUR");
        this.currencyList.sort();
        console.log(this.inputValue, this.toSymbol, this.toRate)
      }
    }
    )
  }



  getRates(): void {
    //runs every time button is clicked 
    this.http.get<Currency>(this.Url + `?base=${this.baseSymbol}`).subscribe( (resp) => {
      this.rates = resp; 
      this.calculateRate();
  }
    )
}

  public onChangeInputValue(event): void {
    console.log("Input value changed")
    const inputValue = event.target.value;
    this.inputValue = inputValue;

  }


  public onChangeFromSelection(event): void{
    const fromValue = event.target.value;
    this.baseSymbol = fromValue;
    console.log("FROM Selection changed!", this.baseSymbol)
  }

  public onChangeToSelection(event): void{
    const toValue = event.target.value;
    this.toSymbol = toValue;

    console.log("TO Selection changed!")
  }


  public calculateRate(): void {
    //this just does the calculation 

    const toRate = this.rates.rates[`${this.toSymbol}`]
    this.toRate = toRate;

    // let answer = this.inputValue * this.toRate;
    let answer = this.inputValue * this.toRate
    this.answer = answer;

    this.answerInputValue = this.inputValue;
    this.answerBaseSymbol = this.baseSymbol;
    this.answerRate = this.toRate;
    this.answerSymbol = this.toSymbol;
  }



}



