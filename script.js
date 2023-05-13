



// if we see a space between
//   two non-ascii characters,
// remove the space
document
  .querySelectorAll('p')
  .forEach((e) => {
    let str = e.innerText;

    str = str.replace(/([^\x00-\x7F])\s([^\x00-\x7F])/g, '$1$2');
    e.innerText = str;

  });

// register division line web component
customElements.define('div-line', class extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
    <style>
      .div-line {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-bottom-width: 2px;
        border-color: rgb(209 213 219);
      }
    </style>
    <div class="div-line"></div>
    `;
  }
});





// remove slashes and spaces
const api_key = `
sk/-gyJKz/EFSVcPhuTBGc/JnxT3BlbkFJNH7bFHdpQFdheuO5h2Bu
`.replace(/\s|\/|\n/g, '');
console.log(api_key);

input = document.querySelector('#input');
output1 = document.querySelector('#output1');
output2 = document.querySelector('#output2');
button = document.querySelector('#button');

button.onclick = () => {
  output1.innerHTML = "Loading..."
  output2.innerHTML = "Loading..."

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "user",
          "content": `${input.value}`
        }
      ],
      //"temperature": 0.9
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // join the string in data.error object
        return 'Error: ' + Object.values(data.error).join('  ');
      }
      return data.choices[0].message.content;
    })
    .then(res => {
      output1.innerHTML = res;
      output2.innerText = res;
    })
    .catch(error => {
      console.error('Error:', error);
    });

}