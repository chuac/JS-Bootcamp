class Timer {
    constructor(durationInput, startButton, pauseButton) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        this.startButton.addEventListener('click', this.start); // listen for a click event, and when it occurs, call this.start method
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => { // binded to the event listener declared in the constructor. as an arrow function to solve our 'this' issue
        this.tick();
        this.intervalID = setInterval(this.tick, 1000); // timer ID is saved to be used in pause()
    }
    pause = () => {
        clearInterval(this.intervalID);
    }
    tick = () => {
        console.log('tick');
    }
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton);

