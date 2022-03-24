"use strict";

const plus25min = 60000 * 25 // change to 25 to win
const plus5min = 60000 * 5 // change to 5 to win

var focusTime = true;
var future = new Date();

function updatePomodoroTimer() {
  var now = new Date();
  var dist = future.getTime() - now.getTime();
  if (dist > 0){
    var mins = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((dist % (1000 * 60)) / 1000);

    document.getElementById("clock").innerHTML = mins + "m " + seconds + "s";
  } else {
    timerComplete();
  }
}

function timerComplete() {
  playChime();
  alternateFocus();
  setUpPomodoro();
}

function playChime() {
  document.getElementById("chimeAudio").play();
}

function setUpPomodoro() {
  var extraTime = focusTime ? plus25min : plus5min;
  future = new Date(new Date().getTime() + extraTime)
}

function alternateFocus() {
  focusTime = !focusTime; // switch to focus/break
  if (focusTime){
    setToFocusTime();
  } else {
    setToBreakTime();
  }
}

function setToFocusTime() {
  document.getElementById("screen").className = "fullscreen focus";
  document.getElementById("clock").title = "It's focus time";
  document.getElementById("timeType").innerHTML = "It's focus time";
}

function setToBreakTime() {
  document.getElementById("screen").className = "fullscreen cooldown";
  document.getElementById("clock").title = "It's break time";
  document.getElementById("timeType").innerHTML = "It's break time";
}

function reset() {
  focusTime = true;
  setUpPomodoro();
}

function pause() {
  // TODO
}

setUpPomodoro();
var trackTime = setInterval(updatePomodoroTimer, 249);
