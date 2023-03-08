const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

// messageOne.textContent = 'From Javascript';
weatherForm.addEventListener('submit', (e) => {
    // prevent browsers to restart the page freshly
    e.preventDefault();
    messageOne.textContent = '...Loading';
    messageTwo.textContent = '';

    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then((res) => {
        res.json().then( (data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast;
            }
        });
    })
   
})

