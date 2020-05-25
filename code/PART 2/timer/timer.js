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
            this.onStart(this.timeRemaining); // the total timer duration is passed along
        }
        this.tick();
        this.intervalID = setInterval(this.tick, 20); // timer ID is saved to be used in pause(). tick every 20ms for smoothness
    }
    pause = () => {
        clearInterval(this.intervalID);
    }
    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) { // if a callback was passed in
                this.onComplete();
            }
        }
        else {
            this.timeRemaining = this.timeRemaining - 0.02; // setter on the left, getter on the right - 1. decrement by 20ms now
            // above line has to be called before below 2 lines so it'll be faster
            if (this.onTick) { // if a callback was passed in
                this.onTick(this.timeRemaining);
            }
        }
        
    }
    get timeRemaining() { // getter
        return parseFloat(this.durationInput.value); // html values are strings so we need to convert
    }
    set timeRemaining(time) { // setter
        this.durationInput.value = time.toFixed(2); // round to 2 decimal places
    }
}