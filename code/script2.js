const allLIs = document.querySelectorAll('li');

// for (let i = 0; i < allLIs.length; i++) {
//     allLIs[i].innerText = 'WE ARE THE CHAMPIONS!';
// }

for (let li of allLIs) {
    li.innerHTML = 'WE ARE THE <b>CHAMPIONS</b>'; // bold tag is parsed when using innerHTML
}