import { Component, OnInit } from '@angular/core';
import { Currency } from './currency'
import { ForexService } from './forex.service'
import { HttpClient } from '@angular/common/http';

// import cytoscape from "cytoscape";

// import { CytoscapeComponent } from './cytoscape/cytoscape.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'currency-calc';
  rates: Currency; //stores currency ex rates info in rates 
  currencyList = ['']; //stores list of all currencies for drop down load
  Url = "https://api.exchangeratesapi.io/latest";

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

  cy: string;

  returnStringExample: string;

  constructor(public http: HttpClient, public forexService: ForexService) { }

  ngOnInit() {
    this.inputValue = 1; //initialize input value to 1 on init
    this.toSymbol = "AUD"; //initialize toSymbol
    this.updateRates(null, false);
  }

  public cyTest(input: any): string {
    console.log("Help")
    input = this.cy;
    return input;
  }
  

  /* 
   * updateRates runs once at init
   * gets data from API and assigns this.rates with the response
  */

  public updateRates(symbol: string, shouldCalculate: boolean): void {

    /*
    * null gets passed only on the first time and returns this.Url for initial api call
    * this.rates is set
    * baseSymbol, toRate are initialized at initializeValues
    */

    this.http.get<Currency>(this.getApiUrl(symbol))
      .subscribe((resp) => {
        this.rates = resp;
        this.initializeValues(resp);

        // only runs after convert gets clicked 2nd time and onwards
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


  /*
  * builds the currencyList which will be used in FROM and TO dropdowns
  * if currencyList has not been loaded yet, take all of the currency symbols coming from the API, 
  * assign keys to currencyList, add Euro, and sort
  */

  buildCurrencyList(): void {

    if (this.currencyList.length === 1) {

      this.currencyList = Object.keys(this.rates.rates)
      //add EURO to list
      this.currencyList.push("EUR");
      this.currencyList.sort();
    }
  }


  //this func runs every time 'Convert' button is clicked
  getRates(): void {
    this.updateRates(this.baseSymbol, true);
  }

  public getApiUrl(symbol: string): string {
    if (symbol) {
      return this.Url + "?base=" + symbol;
    }
    return this.Url;
  }

  /*  
  * event handler for when 'amount' input vaue dropdown changes
  * updates this.inputValue to whatever was updated in the input box
  */

  public onChangeInputValue(event): void {
    const inputValue = event.target.value;
    this.inputValue = inputValue;
  }


  /*  
  * event handler for when 'FROM' dropdown changes
  * updates this.baseSymbol to what was selected in FROM dropdown
  */

  public onChangeFromSelection(event): void {
    const fromValue = event.target.value;
    this.baseSymbol = fromValue;
  }


  /* 
  * event handler for when 'TO' dropdown changes
  * updates this.toSymbol to what was selected in TO dropdown
  */

  public onChangeToSelection(event): void {
    const toValue = event.target.value;
    this.toSymbol = toValue;
  }


  //function for 1) recalculating and 2)updating this.answer-x variables
  public calculateRate(): void {

    //selects the actual TO rate from this.rates and assigns to this.toRate
    const toRate = this.rates.rates[`${this.toSymbol}`]
    this.toRate = toRate;


    /* 
    * this.convertRates is a callback that does just the calculation math
    * calculateRate assigns the answer to let answer
    */

    let answer = this.convertRates(this.toSymbol, this.inputValue)
    this.answer = answer; //assigns above answer to this.answer

    /* 
    * reassigns inputValue, baseSymbol, toRate, toSymbol to be displayed on component ONLY after recalculating
    * I made the decision based on the need to isolate event handler change and 
    * what gets displayed after hitting 'convert' button
    */

    this.answerInputValue = this.inputValue;
    this.answerBaseSymbol = this.baseSymbol;
    this.answerRate = this.toRate;
    this.answerSymbol = this.toSymbol;
  }

  /* 
  * this function is just in charge of the math
  * this.rates.rates[symbol] shows the conversion rate
  * multiplies the rate * unit amount
  */

  public convertRates(symbol: string, amount: number): number {
    return this.rates.rates[symbol] * amount;
  }

  getDatePoints(): any {
    this.returnStringExample = "Answer!"
    return this.returnStringExample;
  }

}



