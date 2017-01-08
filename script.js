(function() {
  var cats = {
    "Josey": {
      image: "http://placehold.it/250x150",
      clicks: "0"
    },
    "Jimmy": {
      image: "http://placehold.it/250x160",
      clicks: "0"
    },
    "Jinxy": {
      image: "http://placehold.it/250x140",
      clicks: "0"
    },
    "Joey": {
      image: "http://placehold.it/250x170",
      clicks: "0"
    },
    "Kensington": {
      image: "http://placehold.it/250x130",
      clicks: "0"
    }
  },
      cat_list = document.getElementById('cat-list'),
      cat_name = document.getElementById('cat-name'),
      cat_clicks = document.getElementById('cat-clicks'),
      cat_image = document.getElementById('cat-image');

  for (var i in cats) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(i));
    li.setAttribute('id', i.toLowerCase());
    li.setAttribute('data-clicks', cats[i].clicks);
    li.setAttribute('data-image', cats[i].image);
    
    // variable 'i' will change and all evet listeners will reference 'i'
    // by passing 'i' to an inner function using closures, the parameter is saved ('name') in each loop
    li.addEventListener('click', (function(name) {
      return function() {
        cat_name.innerHTML = name;
        cat_clicks.innerHTML = this.getAttribute('data-clicks');
        cat_image.setAttribute('data-name', name.toLowerCase());
        cat_image.setAttribute('src', this.getAttribute('data-image'));
      };
    })(i));
  ]''
    cat_list.appendChild(li);
  }
  
  cat_image.addEventListener('click', function() {
    var cat = this.getAttribute('data-name');
    var list_item = document.getElementById(cat);
    var clicks = list_item.getAttribute('data-clicks');
    var newClick = parseInt(clicks, 10) + 1;
    list_item.setAttribute('data-clicks', newClick);
    cat_clicks.innerHTML = newClick;
  });
})();