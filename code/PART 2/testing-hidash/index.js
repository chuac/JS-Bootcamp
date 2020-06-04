// small node code to practice testing on
module.exports = {
    forEach(arr, func) { // implement our own forEach
        // for(let i = 0; i < arr.length; i++) {
        //     const value = arr[i];
        //     func(value, i);
        // }
        for (let index in arr) { // for-in loop loops over the indexes in the array, for-of loops over the items
            //const value = arr[index];
            func(arr[index], index);
        }
    },

    map(arr, func) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(func(arr[i]));
        }
        return result;
    }
}