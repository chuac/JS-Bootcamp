const {hash} = window.location; // the Hash Fragment at the end of URLs can be accessed at window.location.hash . Destructuring

const message = atob(hash.replace('#', '')); // trim off the # symbol at the start

if (message) {
    document.querySelector('#message-form').classList.add('hide');
    document.querySelector('#message-show').classList.remove('hide');
    document.querySelector('h1').innerHTML = message; // inject the decoded message into the h1 element
}


document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // stop the browser from submitting (POSTing)

    const input = document.querySelector('#message-input');
    const encrypted = btoa(input.value); // simple Base64 character encoding

    const linkInput = document.querySelector('#link-input');
    
    
    document.querySelector('#link-form').classList.remove('hide');
    document.querySelector('#message-form').classList.add('hide');

    linkInput.value = `${window.location}#${encrypted}`; // concat our page's URL with the encrypted message as part of the Hash Fragment
    linkInput.select(); // make the input text pre-selected so the user can instantly do Ctrl+C to copy
});