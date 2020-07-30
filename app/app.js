var keyExists = function(key) {
  return window.localStorage.getItem(key) !== null /
}

var valueExists = function(value) {
  var todoList = JSON.parse(localStorage.getItem("key")) || [];
  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i].description === value) {
      return true;
    }
  }
  return false;
}

var createItem = function(value) {
  var obj = {};
  obj.description = getValueInput();
  obj.date = new Date();
  var randomNum = Math.floor(Math.random() * 10**10);
  obj.num = randomNum.toString();
  if (keyExists("key")) {
    var todoList = JSON.parse(localStorage.getItem("key"));
  } else {
    var todoList = [];
  }
  todoList.push(obj);
  window.localStorage.setItem("key", JSON.stringify(todoList));
}

var updateItem = function(hTML) {
  var todoList = JSON.parse(localStorage.getItem("key"));
  var htmlID = $(hTML).attr("id");

  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i].num === htmlID)
      todoList[i].description = getValueInput();
  }
  window.localStorage.setItem("key", JSON.stringify(todoList));
  showDatabaseContents();
  resetInputs();
}

// delete: removes item from local storage
var deleteItem = function(arr) {
  var todoList = JSON.parse(localStorage.getItem("key"));

  for (var i = 0; i < arr.length; i++) {
    var id = $(arr[i]).attr("id");
    todoList = todoList.filter(obj => obj.num !== id);
  }
  window.localStorage.setItem("key", JSON.stringify(todoList));
  showDatabaseContents();
  resetInputs();
}

// clear database
var clearDatabase = function() {
  return window.localStorage.clear();
}

var showDatabaseContents = function() {
  $('.list-group').html("")
  var todoList = JSON.parse(localStorage.getItem("key")) || [];
  for (var i = 0; i < todoList.length; i++) {
    var description = todoList[i].description;
    var num = todoList[i].num;
    var date = todoList[i].date;
    $('.list-group').append(`<a href="#" id=${num} class="list-group-item list-group-item-action" data-title="${moment(date).fromNow()}">${description}</a>`);
  }
  window.localStorage.setItem("key", JSON.stringify(todoList));

  $('.list-group-item').click(function() {
    $(this).toggleClass("active");
    var arr = $(".active");
    if (arr.length === 1) {
      var text = $(arr[0]).text();
      $('.value').val(text);
    } else {
      $('.value').val("");
    }
  });
}

var getValueInput = function() {
  return $('.value').val();
}

var resetInputs = function() {
  $('.value').val("");
}

$(document).ready(function() {
  showDatabaseContents();

  $('.create').click(function() {
    if (getValueInput() !== '') {
      createItem(getValueInput());
      showDatabaseContents();
      resetInputs();
    } else {
      alert('Please type something to create item.');
    }
  });

  // update button
  $('.update').click(function() {
    var arr = $(".active");
    if (arr.length === 0) {
      alert('Please select something to update.');
    } else if (arr.length > 1) {
      alert('Please select only one item to update.');
    } else if (getValueInput() === '') {
      alert('Please type something to change item');
    } else {
      updateItem(arr[0]);
    }
  });

  // delete button
  $('.delete').click(function() {
    var arr = $(".active");
    if (arr.length === 0) {
      alert('Please select something to delete.')
    } else {
      deleteItem(arr);
    }
  });

  // reset input
  $('.reset').click(function() {
    resetInputs();
  });

  // clear database
  $('.clear').click(function() {
    if (confirm('WARNING: Are you sure you want to clear the database? \nTHIS ACTION CANNOT BE UNDONE')) {
      clearDatabase();
      showDatabaseContents();
    }
  })
});




