const createAutoComplete = ({root, renderOption, onOptionSelect, inputValueWhenClicked, fetchData}) => {
    // we now accept a root element to render stuff into
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input'); // no longer searching in document, but the root element passed in and generated above
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const onInput = async (event) => { // could wrap debounce here too
        const items = await fetchData(event.target.value);
        
        if (!items.length) { // if empty items result, close the dropdown menu and exit function
            dropdown.classList.remove('is-active');
            return;
        }

        resultsWrapper.innerHTML = ''; // empty results before each new call
        dropdown.classList.add('is-active'); // open the dropdown menu. Bulma CSS class
        for (let item of items) {
            const option = document.createElement('a'); // an option for the user to click on
            
            option.classList.add('dropdown-item'); // Bulma CSS class
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active'); // user clicked on an option so we close the dropdown menu
                input.value = inputValueWhenClicked(item); // update the input box with the user's selection
                onOptionSelect(item);
            })
            
            resultsWrapper.appendChild(option);
        }
    };

    input.addEventListener('input', debounce(onInput, 1000)); // we could wrap debounce around calling of onInput too

    document.addEventListener('click', (event) => { // listen for a click anywhere in the document
        if (!root.contains(event.target)) { // if the click target doesn't contain our 'root' element which contains our dropdown menu stuff
            dropdown.classList.remove('is-active'); // close the dropdown menu! Bulma CSS class
        }
    });
};