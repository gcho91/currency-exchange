import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import cytoscape from "cytoscape";
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { TargetLocator } from 'selenium-webdriver';


@Component({
  selector: 'app-cytoscape',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.css'],
  providers: [AppComponent]
})
export class CytoscapeComponent implements OnInit, OnChanges {

  historicalUrl: string = `https://api.exchangeratesapi.io/history?`;
  cy: any;
  // exampleDataFromApp: string;
  historicalRates: object;
  today: string = moment().format('YYYY-MM-DD');
  oneMonthAgo: string = moment().subtract(1, 'months').format('YYYY-MM-DD');

  // Pass to Cytoscape Component in main component as inputs
  @Input() baseCurrency: string; 
  @Input() targetCurrency: string;

  constructor(public http: HttpClient, public appComponent: AppComponent) { }

  ngOnInit() {

    this.cy = cytoscape({
      container: document.getElementById('graph'),

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(name)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        }
      ]
    })
  }

  /* 
  * Detects changes and updates baseCurrency and targetCurrency for display in cytoscape nodes values, 
  * then run getHistoricalRates
  */
  
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['baseCurrency']) {
      this.baseCurrency = changes['baseCurrency'].currentValue;
    }
    else if (changes['targetCurrency']) {
      this.targetCurrency = changes['targetCurrency'].currentValue;
    }
    this.getHistoricalRates();
  }


  // Performs API call to get historical rates of past month
  getHistoricalRates(): void {

    this.http.get(this.historicalUrl + "start_at=" + this.oneMonthAgo + "&end_at=" + this.today + `&base=${this.baseCurrency}`)
      .subscribe(resp => {

        let filteredRates = this.filterRates(resp["rates"], this.targetCurrency) //filteredRates is an object of exc rates info from filterRates
        let sortedDates = Object.keys(filteredRates).sort(); //returns sorted dates
        this.nodeCreator(sortedDates, filteredRates);
      })
  }

  // Creates an object with exchange rates
  filterRates(rates: any, desiredRate: string) {
    var exchangeRates = {};
    for (const key of Object.keys(rates)) {
      exchangeRates[key] = rates[key][desiredRate]
    }
    return exchangeRates;
  }

  /*
  * Creates nodes and edges of different days to be used in cytoscape
  * Time period: 1 month, nodes created dependent on how many dates come back from API
  */

  nodeCreator(sortedDates, exchangeRates) {
    this.cy.elements().remove();
    var nodes = [];
    for (let date of sortedDates) {
      this.cy.add({
        group: "nodes", data: { id: date, name: date + "-" + exchangeRates[date] }
      })
    }

    for (let i = 0; i < sortedDates.length; i++) {
      if (i + 1 >= sortedDates.length) {
        break;
      }
      this.cy.add({
        group: "edges", data: { id: "e" + i, source: sortedDates[i], target: sortedDates[i + 1] }
      })
    }

    this.cy.elements().layout({
      name: 'grid',
      rows: 4
    }).run();
  }
}
