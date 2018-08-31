
var appCin = new Vue({
  el: '#app-cin',
  data: {
    rowsList: [
      { nrRow: 1, num: 5, price: 70 },
      { nrRow: 2, num: 6, price: 70 },
      { nrRow: 3, num: 7, price: 70 },
      { nrRow: 4, num: 8, price: 70 },
      { nrRow: 5, num: 9, price: 70 },
      { nrRow: 6, num: 10, price: 100 },
      { nrRow: 7, num: 10, price: 100 },
      { nrRow: 8, num: 10, price: 100 },
      { nrRow: 9, num: 10, price: 100 },
      { nrRow: 10, num: 10, price: 100 },
    ],
    boughtPlaces: {},
    selectedPlace: "1",
    isPlaceSelected: false,
    placeDomObject: null,
    slectedRow: 0,
    slectedPlace: 0,
    slectedPrice: 0,
    message: "Выберите место",
    message1: "Выберите место",
    message2: "Спасибо за покупку!",
  },
  mounted: function () {
    for (var i=0; i<10; i++) {
      // random place
      var rowNr = Math.floor((Math.random() * this.rowsList.length) + 1);
      var placeNr = Math.floor((Math.random() * this.rowsList[rowNr-1].num) + 1);
      var alias = this.getPlaceAlias(rowNr, placeNr);
      // set as bought
      this.boughtPlaces[ alias ] = true;
      this.$refs[ alias ][0].classList.add("person-place-bought");
    }
  },
  methods: {
    placeClick: function(ev, row, place, price) {
      if ( this.isPlaceSelected || this.boughtPlaces[ this.getPlaceAlias(row, place) ] )
        return;
      this.placeDomObject = ev.target;
      this.placeDomObject.classList.add("person-place-selected");
      this.slectedRow = row;
      this.slectedPlace = place;
      this.slectedPrice = price;
      this.isPlaceSelected = true;
    },

    resumePlace: function() {
      this.placeDomObject.classList.remove("person-place-selected");
      this.resetSelectedPlace();
    },

    buyPlace: function() {
      this.boughtPlaces[ this.getPlaceAlias(this.slectedRow, this.slectedPlace) ] = true;

      this.placeDomObject.classList.remove("person-place-selected");
      this.placeDomObject.classList.add("person-place-bought");
      this.resetSelectedPlace();
      
      this.setMessage( this.message2 );
      setTimeout(() => this.setMessage( this.message1 ), 2000);
    },

    getPlaceAlias: function(row, place) {
      return ''+row+'-'+place;
    },

    setMessage: function(messg) {
      this.message = messg;
    },

    resetSelectedPlace: function() {
      this.placeDomObject = null;
      this.slectedRow = 0;
      this.slectedPlace = 0;
      this.slectedPrice = 0;
      this.isPlaceSelected = false;
    }

/*
    // condition for class binding - too many items on screen, looks ugly
    isSelectedPlace: function(row, place) {
      return row == this.slectedRow && place == this.slectedPlace;
    }
*/
  }
})
