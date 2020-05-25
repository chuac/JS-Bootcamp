//// DOM-centric approach. Timer Class is in timer.js

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart() {
        console.log("timer started");
    },
    onTick() {
        console.log("timer ticking");
    },
    onComplete() {
        console.log("timer completed");
    }
}); // passing in 3 callback functions

