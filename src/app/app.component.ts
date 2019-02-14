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
  rates: Currency; //stores currency ex rates info in rates 
  currencyList = ['']; //stores list of all currencies for drop down load
  Url= "https://api.exchangeratesapi.io/latest";

  // update these variables for calcuations
  inputValue: number; //amount from input field
  baseSymbol: string; // 'from' currency symbol, euro is default at init

  toSymbol: string; //'to' currency symbol
  toRate: number; //exchange rate 

  //variables for displaying answers in component, gets updated at calculation
  answer: number;
  answerInputValue: number;
  answerBaseSymbol: string;
  answerRate: number;
  answerSymbol: string;


  constructor(public http: HttpClient, public forexService: ForexService){}

  ngOnInit(){
    this.inputValue = 1; //initialize input value to 1 on init
    this.toSymbol ="AUD"; //initialize to first item on 'TO' dropdown, AUD. 
    this.updateRates(null, false);
  }

  buildCurrencyList(): void {
// builds the currencyList which will be used in FROM and TO dropdowns
// if currencyList has not been loaded yet, take all of the currency symbols coming from the API, 
// assign keys to currencyList, add Euro, and sort

    if (this.currencyList.length === 1) {

      this.currencyList = Object.keys(this.rates.rates)
      //add EURO to list
      this.currencyList.push("EUR");
      this.currencyList.sort();
    }
  }


  getRates(): void {
    //this func runs every time 'Convert' button is clicked
    this.updateRates( this.baseSymbol, true);
  }

  public getApiUrl(symbol: string): string {
    if (symbol) {
      return this.Url + "?base=" + symbol;  
    }
    return this.Url;
  }

  public onChangeInputValue(event): void {
    // event handler for when 'amount' input vaue dropdown changes
    // updates this.inputValue to whatever was updated in the input box
    const inputValue = event.target.value;
    this.inputValue = inputValue;
  }

  public onChangeFromSelection(event): void{
    // event handler for when 'FROM' dropdown changes
    // updates this.baseSymbol to what was selected in FROM dropdown
    const fromValue = event.target.value;
    this.baseSymbol = fromValue;
  }

  public onChangeToSelection(event): void {
    // event handler for when 'TO' dropdown changes
    // updates this.toSymbol to what was selected in TO dropdown
    const toValue = event.target.value;
    this.toSymbol = toValue;
  }

  public calculateRate(): void {
    //function for 1) recalculating and 2)updating this.answer-x variables

    //selects the actual TO rate from this.rates and assigns to this.toRate
    const toRate = this.rates.rates[`${this.toSymbol}`]
    this.toRate = toRate;

    // this.convertRates is a callback that does just the calculation math
    // calculateRate assigns the answer to let answer
    let answer = this.convertRates(this.toSymbol, this.inputValue)
    console.log(answer)
    this.answer = answer; //assigns above answer to this.answer

    //reassigns inputValue, baseSymbol, toRate, toSymbol to be displayed on component ONLY after recalculating
    // I made the decision based on the need to isolate event handler change and 
    // what gets displayed after hitting 'convert' button
    this.answerInputValue = this.inputValue;
    this.answerBaseSymbol = this.baseSymbol;
    this.answerRate = this.toRate;
    this.answerSymbol = this.toSymbol;
  }

  public convertRates(symbol: string, amount: number): number {
    // this function is just in charge of the math
    // this.rates.rates[symbol] shows the conversion rate
    // multiplies the rate * unit amount
    return this.rates.rates[symbol] * amount;
}

public updateRates(symbol: string, shouldCalculate: boolean ): void {
  // /getPosts runs once to initialize at ngInit

    this.http.get<Currency>( this.getApiUrl(symbol)  )
    .subscribe( (resp) => {
        this.rates = resp;
        this.initializeValues( resp );

        if (shouldCalculate) {
          this.calculateRate();
        }
    }
    )
}

initializeValues(resp: Currency): void {
  if (this.currencyList.length === 1) {

    this.baseSymbol = resp.base; //initialize base to default euro
    this.toRate = this.rates.rates['AUD'];
    this.buildCurrencyList();
  } 
 }






}



