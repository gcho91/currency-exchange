import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import cytoscape from "cytoscape";
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';


@Component({
  selector: 'app-cytoscape',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.css'],
  providers: [AppComponent]
})
export class CytoscapeComponent implements OnInit, OnChanges {

  historicalUrl: string = `https://api.exchangeratesapi.io/history?`;
  cy: any;
  exampleDataFromApp: string;
  historicalRates: object;
  today: string = moment().format('YYYY-MM-DD');
  oneMonthAgo: string = moment().subtract(1, 'months').format('YYYY-MM-DD');

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

  ngOnChanges(changes: SimpleChanges): void {
    this.baseCurrency = changes["baseCurrency"].currentValue;
    this.getHistoricalRates();
  }

  getHistoricalRates(): void {

    this.http.get(this.historicalUrl + "start_at=" + this.oneMonthAgo + "&end_at=" + this.today + `&base=${this.baseCurrency}`)
      .subscribe(resp => {

        let filteredRates = this.filterRates(resp["rates"], this.targetCurrency)
        let sortedDates = Object.keys(filteredRates).sort();
        this.nodeCreator(sortedDates, filteredRates);
      })
  }

  filterRates(rates: any, desiredRate: string) {
    var exchangeRates = {};
    for (const key of Object.keys(rates)) {
      exchangeRates[key] = rates[key][desiredRate]
    }
    return exchangeRates;
  }

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


// use dates as nodes -> sort!!!!
// sort
// iterate thru to create the nodes
// create nodes
// date 1 -> 2, edge, move down th e line