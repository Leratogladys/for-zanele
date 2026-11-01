const no = document.querySelector('#no');
const yes = document.querySelector('#girlfriend-yes');
let dodges = 0, lastDodge = 0;
function escapeNo(force = false) {
  const now = performance.now();
  if (!force && now - lastDodge < 180) return;
  lastDodge = now;
  dodges++;
  yes.style.setProperty('--growth', Math.min(dodges, 10));
  document.querySelector('#chase-message').textContent = "catch me if you can, but honestly, just click yes, it's much easier than chasing a no";
  const width = no.offsetWidth, height = no.offsetHeight, pad = 18;
  const maxX = Math.max(pad, innerWidth - width - pad);
  const maxY = Math.max(pad, innerHeight - height - pad);
  const previous = no.getBoundingClientRect();
  const yesRect = yes.getBoundingClientRect();
  let x, y;
  for (let i = 0; i < 30; i++) {
    x = pad + Math.random() * (maxX - pad);
    y = pad + Math.random() * (maxY - pad);
    const far = Math.hypot(x - previous.x, y - previous.y) > 130;
    const clear = x + width < yesRect.left - 15 || x > yesRect.right + 15 || y + height < yesRect.top - 15 || y > yesRect.bottom + 15;
    if (far && clear) break;
  }
  no.classList.add('escaping');
  no.style.left = `${x}px`;
  no.style.top = `${y}px`;
}
document.addEventListener('pointermove', event => {
  if (document.querySelector('#ask').hidden || event.pointerType === 'touch') return;
  const r = no.getBoundingClientRect();
  if (event.clientX > r.left - 55 && event.clientX < r.right + 55 && event.clientY > r.top - 50 && event.clientY < r.bottom + 50) escapeNo();
});
no.addEventListener('pointerdown', e => { e.preventDefault(); escapeNo(true); });
no.addEventListener('click', () => escapeNo(true));
addEventListener('resize', () => { if (no.classList.contains('escaping')) escapeNo(true); });
function celebrate() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const host = document.querySelector('#confetti');
  for (let i = 0; i < 36; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti'; piece.textContent = i % 3 ? '♥' : '✧';
    piece.style.cssText = `left:${Math.random()*100}%;font-size:${12+Math.random()*17}px;animation-delay:${Math.random()*.6}s;color:${i%2?'#a94356':'#d3a25d'}`;
    host.append(piece); setTimeout(() => piece.remove(), 3600);
  }
}
function show(id) {
  document.querySelectorAll('.screen').forEach(s => { s.hidden = s.id !== id; s.classList.toggle('active', s.id === id); });
  scrollTo({top:0, behavior:'instant'});
  const heading = document.querySelector(`#${id} h1`); heading.tabIndex = -1; heading.focus({preventScroll:true});
}
yes.addEventListener('click', () => { show('valentine'); celebrate(); });
const milestones = [
  ['01','THE DAY YOU SAID YES','Officially us.','One click. Approximately a million butterflies. My girlfriend era has officially begun.'],
  ['♡','14 FEBRUARY 2027','Our first Valentine’s.','Flowers, a proper date, and me pretending I haven’t been planning this since you clicked yes.'],
  ['1','ONE YEAR TOGETHER','365 days of choosing you.','Our first anniversary. Still crushing on you. Still absolutely unable to act normal about it.'],
  ['2','TWO YEARS TOGETHER','My favourite everyday person.','More memories, more inside jokes, and a suspicious number of your things at my place.'],
  ['3','THREE YEARS TOGETHER','Still you. Obviously.','Three years in, and I’d still embarrass myself with a runaway button just to ask you again.'],
  ['◇','A LITTLE LATER · WHEN WE’RE READY','A very important knee drop.','I ask you to marry me. You may cry. I will definitely forget the speech I rehearsed 47 times.'],
  ['✦','OUR WEDDING DAY','Wife & wife. Partners for life.','We both say “I do,” dance badly, and begin the wonderfully ordinary magic of being each other’s wife.'],
  ['♡','ONE YEAR OF MARRIAGE','My heart. And my bank card.','I’m off to work; you’ve got my card for a little spoiling. Our budget has requested a moment of silence.'],
  ['⌂','THREE YEARS OF MARRIAGE · THE DREAM','A farm. A porch. Our kind of peace.','My wildly ambitious plan? Build software, sell it for R180 million, retire, and buy us a farm. Exit strategy: you, me, and chickens with unnecessarily fancy names. You can open the windows. I’m negotiating for the quiet side of the house.'],
  ['∞','ALL THE YEARS AFTER','Wrinkly hands. Same butterflies.','We grow old together, steal each other’s blankets, and tell this story far too often. I still reach for your hand.']
];
const memories = [
  ['♡','JULY 2017 · THE LEASING AGENT’S OFFICE','You saw me first.','I arrived first, then rushed out to get documents sorted before the office closed. You saw me. I didn’t see you. Apparently, life had already spotted the potential.'],
  ['⌂','THE ROOMMATE CHAPTER','One room. Two very different mornings.','I was a light sleeper. You were an open-the-windows-first-thing kind of girl. Every passing car became my alarm clock. We discussed the windows. Multiple times. The windows remained remarkably committed to being open.'],
  ['✧','ALSO IN THE ROOMMATE CHAPTER','The undies subplot.','And then there was you, casually walking around in your undies. As if the open windows weren’t already enough of a situation. Roommate life really came with bonus plotlines.'],
  ['♡','LATER IN 2017','The words took the scenic route.','We fell in love later that year, but neither of us really admitted it until years later. Some feelings apparently prefer a very long introduction.'],
  ['↺','LATE NOVEMBER 2024','There you were. Again.','We met again, and that love emerged all over again. Not a new person. Not a new feeling. Just us, finding our way back.'],
  ['∞','SINCE FEBRUARY 2025','Somewhat inseparable.','“Somewhat” is doing a lot of work in that sentence. After all those years, being close to you became part of everyday life. My favourite part.']
];
function renderMilestones(items, selector) {
const timeline = document.querySelector(selector);
items.forEach(([icon, when, title, text]) => {
  const article = document.createElement('article'); article.className = 'milestone';
  const marker = document.createElement('span'); marker.className='marker'; marker.textContent=icon; marker.setAttribute('aria-hidden','true');
  const date = document.createElement('small'); date.textContent=when;
  const heading = document.createElement('h2'); heading.textContent=title;
  const paragraph = document.createElement('p'); paragraph.textContent=text;
  article.append(marker,date,heading,paragraph); timeline.append(article);
});
}
renderMilestones(memories, '#memories');
renderMilestones(milestones, '#timeline');
document.querySelectorAll('.val-yes').forEach(button => button.addEventListener('click', () => { show('future'); celebrate(); }));
document.querySelector('#replay').addEventListener('click', () => { dodges=0;yes.style.setProperty('--growth',0);no.classList.remove('escaping');no.style.left='';no.style.top='';document.querySelector('#chase-message').textContent='Choose wisely. My heart is doing a little drumroll.';show('ask'); });
