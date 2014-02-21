/*
UNTV - remote-interface.coffee
Author: Gordon Hall

Sets up remote control bindings for publishing events to the
remote control bus for interception by the tv interface components
*/

var $      = window.jQuery;
var socket = window.io.connect(location.origin);

/*
Setup Interaction Bindings
*/

$(document).ready(function() {

  var trackpad        = $("#trackpad");
  var dpad            = $("#dpad");
  var controls        = $("#controls");
  var options         = $("#options");
  var scroll_interval = null

  $("button").bind("touchstart", function(event) {
    var button = $(this);
    var action = button.data("action");
    
    socket.emit(action);
    
    scroll_interval = setInterval(function() {
      socket.emit(action);
    }, 800);

    button.addClass("active");

  $("button").bind("touchend", function(event) {
    var button = $(this);
    button.removeClass("active");
    button.blur();
    clearInterval(scroll_interval);
  });

  $("[type='range']", controls).change(function(event) {
    var value = this.value
    socket.emit("player:seek", { value: value });
  });

});

/*
Setup Events from TV
*/
socket.on("prompt:ask", function(data) {
  var input = window.prompt(data.message)
  socket.emit("prompt:answer", { value: input })
});

socket.on("confirm:ask", function(data) {
  var confirmation = window.confirm(data.message);
  socket.emit("confirm:answer", { value: confirmation });
});

socket.on("alert:show", function(data) {
  window.alert(data.message);
  socket.emit("alert:dismissed");
});
