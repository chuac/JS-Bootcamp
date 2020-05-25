//// DOM-centric approach

class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        if (callbacks) { // passing in callback functions are optional
            this.onStart = callbacks.onStart; // onStart key in this object = onStart key (function) in the callbacks object passed in
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start); // listen for a click event, and when it occurs, call this.start method
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => { // binded to the event listener declared in the constructor. as an arrow function to solve our 'this' issue
        if (this.onStart) { // if a callback was passed in
            this.onStart();
        }
        this.tick();
        this.intervalID = setInterval(this.tick, 50); // timer ID is saved to be used in pause(). tick every 50ms
    }
    pause = () => {
        clearInterval(this.intervalID);
    }
    tick = () => {
        if (this.timeRemaining <= 0) {
            if (this.onComplete) { // if a callback was passed in
                this.onComplete();
            }
            this.pause();
        }
        else {
            if (this.onTick) { // if a callback was passed in
                this.onTick();
            }
            this.timeRemaining = this.timeRemaining - 0.05; // setter on the left, getter on the right - 1. decrement by 50ms now
        }
        
    }
    get timeRemaining() { // getter
        return parseFloat(this.durationInput.value); // html values are strings so we need to convert
    }
    set timeRemaining(time) { // setter
        this.durationInput.value = time.toFixed(2); // round to 2 decimal places
    }
}