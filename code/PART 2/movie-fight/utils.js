//// put our utility functions in here to better organise the project

const debounce = (func, delay = 1000) => { // implemented a reusable debounce
    let timeoutId;
    return (...args) => { // grab all the args that was passed in with this func, and pass it along
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => { // introduces a delay to actually calling the API
            func.apply(null, args); // return all those args that was passed along, using apply
        }, delay); // non-hardcoded delay
    }
}