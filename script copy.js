const PROMPT = 'Anchal_Dubey@DESKTOP-JJK9UEH';
const UBUNTU = '<svg class="ico" viewBox="0 0 16 16"><rect width="16" height="16" rx="3" fill="#e95420"/><circle cx="8" cy="8" r="3.3" fill="none" stroke="#fff" stroke-width="1.2"/><circle cx="4.6" cy="8" r="1.25" fill="#fff" stroke="#e95420" stroke-width=".6"/><circle cx="9.7" cy="5.05" r="1.25" fill="#fff" stroke="#e95420" stroke-width=".6"/><circle cx="9.7" cy="10.95" r="1.25" fill="#fff" stroke="#e95420" stroke-width=".6"/></svg>';
const WIN = '<svg class="win11" viewBox="0 0 16 16"><path fill="#4cc2ff" d="M0 2.3 6.8 1.4v6H0zM7.6 1.3 16 0v7.4H7.6zM0 8.2h6.8v6L0 13.7zM7.6 8.2H16V16l-8.4-1.2z"/></svg>';
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function renderLine(text) {
  if (text.startsWith('$ ')) {
    return `<span class="u">${PROMPT}</span><span class="d">:~</span>$ ${esc(text.slice(2))}`;
  }
  return esc(text);
}

function buildWindow(w) {
  const el = document.createElement('section');
  el.className = 'win' + (w.big ? ' big' : '') + (w.sm ? ' sm' : '');
  const lines = w.l.map(renderLine);
  lines[lines.length - 1] += '<span class="cur"></span>';
  el.innerHTML =
    `<div class="tabs"><div class="tab">${UBUNTU}${esc(w.tab)}<b>×</b></div>` +
    `<div class="plus">+ &nbsp;⌄</div><div class="ctl"><span>–</span><span>▢</span><span>✕</span></div></div>` +
    `<div class="term">${lines.map(l => `<div class="ln">${l}</div>`).join('')}</div>` +
    (w.tb
      ? `<div class="tb">${WIN}<span>C:\\Users\\Anchal_Dubey</span><span>Set Up Hadoop HDFS</span>` +
      `<span>Introduction to Data An</span><span>Ubuntu</span><span>*new 1 - Notepad++</span>` +
      `<span class="clock">${esc(w.tb)}<br>10/4/2026</span></div>`
      : '');
  return el;
}

fetch('data.json')
  .then(r => r.json())
  .then(data => data.forEach(w => document.body.appendChild(buildWindow(w))))
  .catch(() => {
    document.body.insertAdjacentHTML('beforeend',
      '<p>Could not load data.json. Open this folder with a local server (e.g. <code>python -m http.server</code>) or VS Code Live Server.</p>');
  });
