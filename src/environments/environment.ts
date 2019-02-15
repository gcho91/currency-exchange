// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "secretkeyhere",
    authDomain: "currency-calculator-74b7e.firebaseapp.com",
    databaseURL: "https://currency-calculator-74b7e.firebaseio.com",
    projectId: "currency-calculator-74b7e",
    storageBucket: "",
    messagingSenderId: "584105934402"

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
