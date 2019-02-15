# Arris Coding Challenge - Currency Calculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

Tools Used:

Angular
ExchangeRates API
Bootstrap
Moment.JS

## Installation

1. Clone to your local computer, `git clone https://github.com/gcho91/currency-exchange.git`
2. Go into directory by `cd currency-exchange`
3. `npm install` to download all dependencies
4. `ng serve --open` to build & serve app locally
4. go to [http://localhost:4200/]

### Big Picture Process of the Application

There were two main requirements - to build an application that:

1) consumes API data from a foreign currency exchange rate application, and calculates the exchange rate from base currency to target currency

2) Use above data to draw a line graph with nodes using Cytoscape.js

In the big picture, the application is organized in the following way:

-Module
-Main Component (app.component.ts, html, spec, css)
-Cytoscape Component (cytoscape.component.ts, html, spec, css)
-Currency Class (currency.ts)

The main component is responsible for performing the GET request from API, creating dropdown list of all currencies available, initializing all variables to be used throughout the application, and calculating values each time the button is clicked.

Cytoscape Component is responsible for performing all logic related to Cytoscape.js, including node generation, getting historical rates info from API, and edge generation.

Currency class is responsible for structuring the data coming from the exchange rate API, to be used in instances in the main component.

Since there are many events happening simultaneously, my priority was to create and name each individual function/method to perform one duty, acting as callback to be used to update other variables to be used in another function.


### Improvement Points

I prioritized the goal of building the MVP application that fulfuills stated requirements. If given more time, I would gear towards: 

- refactoring the code to take advantage of component-based architecture that Angular offers, with a different dedicated service (forex service) that would handle all of the logic in performing the GET request and recalculating values

- isolating service and components so service performs most of the logic, leaving components to just display it

- making the parent-child relationship of the components clear to make it easier for other developers to read and understand my architectural decisions

- redesign the UI and reorganize content to make it more user-friendly, visually vibrant, and compliant with web accessibility standards

