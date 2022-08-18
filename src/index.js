import Template from './templates/Template.js';
import '../src/styles/main.css'
import '../src/styles/vars.styl';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
