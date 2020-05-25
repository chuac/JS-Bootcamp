//// DOM-centric approach. Timer Class is in timer.js

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        duration = totalDuration; // capture the total duration
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset',
            perimeter * (timeRemaining / duration) - perimeter
        ); // we subtract perimeter because we want negative offset value. timeRemain/duration to get percentage of completion
    },
    onComplete() {
        console.log("Timer completed");
    }
}); // passing in 3 callback functions

