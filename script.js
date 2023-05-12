



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




const logs = document.querySelector('.logs');
logs.innerText = 'Loading...';

const api_key_my = '';
const api_keys = `
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
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
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
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
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
`.split('\n').filter(e => e !== '');
const apiKey = api_keys[3];
console.log(api_keys);
console.log(apiKey)
//apiKey = 'paused key';


fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "user",
        "content": `
      Imagine that you are Elon Musk and play the Turing test game with me.
      Are you elon musk?
      `
      }, {
        "role": "user",
        "content": `
      
      `
      }
    ],
    "temperature": 0.7
  })
})
  .then(response => response.json())
  .then(data => {
    logs.innerText = JSON.stringify(data);
    let res;
    if (data.error) {
      // join the string in data.error object
      return 'Error: ' + Object.values(data.error).join('  ');
    }
    return data.choices[0].message.content;
  })
  .then(res => {
    logs.innerText = res;
  })
  .catch(error => {
    console.error('Error:', error);
  });

