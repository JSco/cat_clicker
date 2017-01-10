(function() {
  var model = {
    selectedCat: null,
    cats: [{
      name: "Josey",
      clicks: 0,
      image: "http://placehold.it/250x150"
    }, {
      name: "Jimmy",
      clicks: 0,
      image: "http://placehold.it/250x160"
    }, {
      name: "Jinxy",
      clicks: 0,
      image: "http://placehold.it/250x140"
    }, {
      name: "Joey",
      clicks: 0,
      image: "http://placehold.it/250x170"
    }, {
      name: "Kensington",
      clicks: 0,
      image: "http://placehold.it/250x130"
    }]
  };

  var octopus = {

    init: function() {
      // model.init();
      catListView.init();
      catView.init();
    },

    getSelectedCat: function() {
      return model.selectedCat;
    },

    getAllCats: function() {
      return model.cats;
    },

    setSelectedCat: function(cat) {
      model.selectedCat = cat;
    },

    incrementCatClicks: function() {
      model.selectedCat.clicks++;
      catView.render();
    },

  };

  var catListView = {
    cat_list: null,

    init: function() {
      this.cat_list = document.getElementById('cat-list');

      this.render();
    },

    render: function() {
      var cats = octopus.getAllCats(),
        cat,
        cat_list_item;

      this.cat_list.innerHTML = '';

      for (cat = 0, len = cats.length; cat < len; cat += 1) {
        cat_list_item = document.createElement('li');
        cat_list_item.textContent = cats[cat].name.charAt(0).toUpperCase() + cats[cat].name.substring(1);

        // variable 'cat' will change in loop and all evet listeners will reference final value
        // by passing 'cat' to an inner function using closures, the parameter is saved ('tempCat') in each iteration of the loop
        cat_list_item.addEventListener('click', (function(tempCat) {
          return function() {
            octopus.setSelectedCat(tempCat);
            catView.render();
          };
        })(cats[cat]));

        // add cat list item to unordered cat list
        this.cat_list.appendChild(cat_list_item);
      }
    }
  };

  var catView = {
    cat_name: null,
    cat_clicks: null,
    cat_image: null,

    init: function() {
      this.cat_name = document.getElementById('cat-name');
      this.cat_clicks = document.getElementById('cat-clicks');
      this.cat_image = document.getElementById('cat-image');

      this.cat_image.addEventListener('click', function() {
        octopus.incrementCatClicks();
      });
    },

    render: function() {
      var selectedCat = octopus.getSelectedCat();

      this.cat_name.innerHTML = selectedCat.name.charAt(0).toUpperCase() + selectedCat.name.substring(1);
      this.cat_clicks.innerHTML = selectedCat.clicks;
      this.cat_image.setAttribute('src', selectedCat.image);
    }
  };

  octopus.init();

})();