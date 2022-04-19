
var userTitle = document.querySelector('.user-title');
var form = document.querySelector('form');
var resultUL = document.querySelector('.result-box');
var views = document.querySelectorAll('.view');
var home = document.querySelector('.home');

home.addEventListener('click', function () {
  viewSwitch('search-form');
});

function saveInfo(event) {
  event.preventDefault();
  data.tempTitle = userTitle.value;
  viewSwitch('search-result');
}

form.addEventListener('submit', saveInfo);

function createSearch(result) {
  var list = document.createElement('li');
  list.className = 'searchListItem';
  var row = document.createElement('div');
  row.className = 'row';
  list.appendChild(row);
  var col = document.createElement('div');
  col.className = 'col-full';
  row.appendChild(col);
  var theSearch = document.createElement('div');
  theSearch.className = 'a-search';
  col.appendChild(theSearch);
  var poster = document.createElement('img');
  poster.className = 'search-image';
  poster.setAttribute('src', result.poster);
  theSearch.appendChild(poster);
  var centerDiv = document.createElement('div');
  centerDiv.className = 'center';
  theSearch.appendChild(centerDiv);
  var name = document.createElement('p');
  name.className = 'search-title';
  name.textContent = result.title;
  centerDiv.appendChild(name);
  return list;
}

function domLoad(event) {
  searchRequest(data.tempTitle);
  for (var i = 0; i < data.search.length; i++) {
    resultUL.append(createSearch(data.search[i]));
  }
  viewSwitch(data.view);
}

window.addEventListener('DOMContentLoaded', domLoad);

function viewSwitch(view) {
  for (var i = 0; i < views.length; i++) {
    if (views[i].getAttribute('data-view') === view) {
      views[i].className = 'view';
    } else {
      views[i].className = 'view hidden';
    }
  }
  data.view = view;
}

function searchRequest(title) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/SearchMovie/k_u0o3hbaw/' + title);
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.results.length; i++) {
      var newobj = {};
      newobj.title = xhr.response.results[i].title;
      newobj.poster = xhr.response.results[i].image;
      data.search.push(newobj);
    }
  });
}
