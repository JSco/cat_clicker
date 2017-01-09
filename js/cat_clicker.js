(function() {
  var model = {
    cats: [{
      name: "josey",
      clicks: "0",
      image: "http://placehold.it/250x150"
    }, {
      name: "jimmy",
      clicks: "0",
      image: "http://placehold.it/250x160"
    }, {
      name: "jinxy",
      clicks: "0",
      image: "http://placehold.it/250x140"
    }, {
      name: "joey",
      clicks: "0",
      image: "http://placehold.it/250x170"
    }, {
      name: "kensington",
      clicks: "0",
      image: "http://placehold.it/250x130"
    }]
  };

  var octopus = {

    init: function() {
      // model.init();
      view.init();
    },

    renderCatList: function() {
      var cat_list = document.getElementById('cat-list'),
        cat_name = document.getElementById('cat-name'),
        cat_clicks = document.getElementById('cat-clicks'),
        cat_image = document.getElementById('cat-image');

      for (var cat in model.cats) {
        var li = document.createElement('li'),
          catName = model.cats[cat].name,
          prettyName = catName.charAt(0).toUpperCase() + catName.substring(1);
        li.appendChild(document.createTextNode(prettyName));
        li.setAttribute('id', catName);
        li.setAttribute('data-clicks', model.cats[cat].clicks);
        li.setAttribute('data-image', model.cats[cat].image);

        // variable 'i' will change and all evet listeners will reference 'i'
        // by passing 'i' to an inner function using closures, the parameter is saved ('name') in each loop
        // add click listener to cat list item
        li.addEventListener('click', (function(cName) {
          return function() {
            cat_name.innerHTML = cName;
            cat_clicks.innerHTML = this.getAttribute('data-clicks');
            cat_image.setAttribute('data-name', cName.toLowerCase());
            cat_image.setAttribute('src', this.getAttribute('data-image'));
          };
        })(prettyName));

        // add cat list item
        cat_list.appendChild(li);
      }
    },

    addImageListener: function() {
      var cat_image = document.getElementById('cat-image'),
        cat_clicks = document.getElementById('cat-clicks');

      cat_image.addEventListener('click', function() {
        var catName = this.getAttribute('data-name'),
          list_item = document.getElementById(catName),
          clicks = list_item.getAttribute('data-clicks'),
          newClick = parseInt(clicks, 10) + 1;

        // this could all be updated at once using frameworks that bind them to the model
        // update cat list item
        list_item.setAttribute('data-clicks', newClick);
        // update number of clicks displayed
        cat_clicks.innerHTML = newClick;
        // update clicks in model
        for (var cat in model.cats) {
          if (model.cats[cat].name === catName) {
            model.cats[cat].clicks = newClick;
            break;
          }
        }
      });
    }

  };

  var view = {
    init: function() {
      octopus.renderCatList();
      octopus.addImageListener();
    },
  };

  octopus.init();

})();