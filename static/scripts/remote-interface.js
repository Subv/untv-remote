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

  $("button").bind("touchstart, mousedown", function(event) {
    var button = $(this);
    var action = button.data("action");
    
    socket.emit(action);
    
    scroll_interval = setInterval(function() {
      var active_buttons = $(".active").length;
      if (active_buttons) {
        socket.emit(action);
      }
      else {
        clearInterval(scroll_interval);
      }
    }, 800);

    button.addClass("active");
  });

  $("button").bind("touchend, mouseup", function(event) {
    var button = $(this);
    button.removeClass("active");
    button.blur();
    clearInterval(scroll_interval);
  });

  // set orientation
  $(window).trigger("resize");

});

/*
Check Orientation
*/
$(window).bind("resize orientationchange", function() {
  var body = $("body");
  var win  = $(window);

  if (win.height() > win.width()) {
    body.removeClass("landscape");
  }
  else {
    if (!body.hasClass("landscape")) $("body").addClass("landscape");
  }
});

/*
Setup Events from TV
*/
socket.on("prompt:ask", function(data) {
  var input = window.prompt(data.message);
  $(".active").removeClass("active");
  socket.emit("prompt:answer", { value: input });
});

socket.on("confirm:ask", function(data) {
  var confirmation = window.confirm(data.message);
  $(".active").removeClass("active");
  socket.emit("confirm:answer", { value: confirmation });
});

socket.on("alert:show", function(data) {
  window.alert(data.message);
  $(".active").removeClass("active");
  socket.emit("alert:dismissed");
});
