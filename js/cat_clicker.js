(function() {

  var model, octopus, catListView, catView, adminView;

  model = {
    showAdminView: false,
    selectedCat: null,

    cats: [{
      name: "josey",
      clicks: 0,
      image: "./images/cat-1.png"
    }, {
      name: "jimmy",
      clicks: 0,
      image: "./images/cat-2.png"
    }, {
      name: "jinxy",
      clicks: 0,
      image: "./images/cat-3.png"
    }, {
      name: "joey",
      clicks: 0,
      image: "./images/cat-4.png"
    }, {
      name: "kensington",
      clicks: 0,
      image: "./images/cat-5.png"
    }]
  };

  octopus = {
    init: function() {
      catListView.init();
      catView.init();
      adminView.init();
    },

    getAllCats: function() {
      return model.cats;
    },

    getSelectedCat: function() {
      return model.selectedCat;
    },

    setSelectedCat: function(cat) {
      model.selectedCat = cat;
      catView.render();
    },

    incrementCatClicks: function() {
      model.selectedCat.clicks++;
      catView.render();
    },

    setAdminViewProperty: function(show) {
      model.showAdminView = show;
      adminView.render();
    },

    getAdminViewProperty: function() {
      return model.showAdminView;
    },

    saveAdminData: function(nameVal, clicksVal, imageVal) {
      model.selectedCat.name = nameVal.toLowerCase();
      model.selectedCat.clicks = parseInt(clicksVal, 10);
      model.selectedCat.image = String(imageVal);
      catView.render();
      catListView.render();
    }
  };

  catListView = {
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
          };
        })(cats[cat]));

        // add cat list item to unordered cat list
        this.cat_list.appendChild(cat_list_item);
      }
    }
  };

  catView = {
    cat_name: null,
    cat_clicks: null,
    cat_image: null,
    admin_button: null,

    init: function() {
      this.cat_name = document.getElementById('cat-name');
      this.cat_clicks = document.getElementById('cat-clicks');
      this.cat_image = document.getElementById('cat-image');
      this.admin_button = document.getElementById('admin-button');

      this.cat_image.addEventListener('click', function() {
        octopus.incrementCatClicks();
      });

      this.admin_button.addEventListener('click', function() {
        octopus.setAdminViewProperty(true);
      });
    },

    render: function() {
      var selectedCat = octopus.getSelectedCat();

      this.cat_name.innerHTML = selectedCat.name.charAt(0).toUpperCase() + selectedCat.name.substring(1);
      this.cat_clicks.innerHTML = selectedCat.clicks;
      this.cat_image.setAttribute('src', selectedCat.image);
      this.admin_button.style.display = 'block';
      adminView.render();
    }
  };

  adminView = {
    admin_button: null,
    admin_form: null,
    name_field: null,
    clicks_field: null,
    image_field: null,
    cancel_button: null,
    save_button: null,

    init: function() {
      this.admin_button = document.getElementById('admin-button');
      this.admin_form = document.getElementById('admin-form');
      this.name_field = document.getElementById('name-field');
      this.clicks_field = document.getElementById('clicks-field');
      this.image_field = document.getElementById('image-field');
      this.cancel_button = document.getElementById('cancel-button');
      this.save_button = document.getElementById('save-button');

      this.cancel_button.addEventListener('click', function() {
        octopus.setAdminViewProperty(false);
      });

      this.save_button.addEventListener('click', (function(nameField, clicksField, imageField) {
        return function() {
          octopus.saveAdminData(nameField.value, clicksField.value, imageField.value);
        };
      })(this.name_field, this.clicks_field, this.image_field));
    },

    render: function() {
      var show = octopus.getAdminViewProperty(),
        selectedCat = octopus.getSelectedCat();

      if (show) {
        this.admin_button.disabled = true;
        this.admin_form.style.display = 'block';
        this.name_field.value = selectedCat.name;
        this.clicks_field.value = selectedCat.clicks;
        this.image_field.value = selectedCat.image;
      } else {
        this.admin_button.disabled = false;
        this.admin_form.style.display = 'none';
        this.name_field.value = '';
        this.clicks_field.value = '';
        this.image_field.value = '';
      }
    }
  };

  octopus.init();

})();
