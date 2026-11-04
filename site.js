document.querySelector('.menu-btn')?.addEventListener('click',()=>{const m=document.querySelector('.links');m.classList.toggle('open');document.querySelector('.menu-btn').setAttribute('aria-expanded',m.classList.contains('open'))});
const path=window.location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.links a').forEach(a=>{if(a.getAttribute('href')===path||(path.startsWith('devotional-')&&a.getAttribute('href')==='devotionals.html'))a.classList.add('active')});
document.querySelectorAll('[data-journal]').forEach(el=>{const k='surrender-journal-'+el.dataset.journal;el.value=localStorage.getItem(k)||'';el.addEventListener('input',()=>localStorage.setItem(k,el.value))});
document.querySelectorAll('[data-complete]').forEach(el=>{const k='surrender-complete-'+el.dataset.complete;el.checked=localStorage.getItem(k)==='yes';el.addEventListener('change',()=>{localStorage.setItem(k,el.checked?'yes':'no');updateProgress()})});function updateProgress(){let boxes=[...document.querySelectorAll('[data-complete]')];let done=boxes.filter(b=>b.checked).length;let n=document.querySelector('#progress');if(n)n.textContent=done+' of '+boxes.length+' introductory lessons completed'}updateProgress();
document.querySelectorAll('[data-demo-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const msg=f.querySelector('.notice');msg.textContent='This is a website preview. Email subscriptions and form delivery need to be connected to an email service before launch. No information was submitted.';msg.classList.add('show')}));

/* Private journal email: opens the visitor's own email app; no entry is sent or stored by this site. */
document.querySelectorAll('textarea[data-journal]').forEach(()=>{}); 
if(document.querySelector('textarea[data-journal]')) {
  const journalFields=[...document.querySelectorAll('textarea[data-journal]')];
  const last=journalFields[journalFields.length-1];
  const panel=document.createElement('section');
  panel.setAttribute('aria-label','Email my reflections');
  panel.style.cssText='margin:25px 0;padding:24px;border:1px solid #c49c60;border-radius:15px;background:#fffaf3;color:#432516';
  panel.innerHTML='<h3 style="margin:0 0 9px">Keep Your Reflection</h3><p style="margin:0 0 15px">Email your journal responses to yourself to revisit later.</p><label for="reflection-email"><strong>Your email address</strong></label><input id="reflection-email" type="email" autocomplete="email" placeholder="you@example.com" style="display:block;width:100%;max-width:420px;padding:12px;margin:8px 0 14px;border:1px solid #a6886e;border-radius:7px"><button type="button" class="btn" id="email-reflection">Email My Reflection →</button><p class="small" style="margin-top:14px">This opens your own email app with your reflections pre-filled. Review the email and press Send there; nothing is automatically emailed or uploaded to SURRENDER. Avoid including sensitive information if your email is shared.</p><p class="small" id="email-reflection-status" role="status"></p>';
  const note=last.nextElementSibling;
  (note && note.tagName==='DIV' ? note : last).insertAdjacentElement('afterend',panel);
  panel.querySelector('#email-reflection').addEventListener('click',()=>{
    const email=panel.querySelector('#reflection-email');
    const status=panel.querySelector('#email-reflection-status');
    if(!email.value.trim() || !email.checkValidity()){email.reportValidity();status.textContent='Enter a valid email address first.';return;}
    const title=document.querySelector('main h1')?.textContent.trim()||'SURRENDER Devotional';
    const reflections=journalFields.map((field,i)=>{
      const label=document.querySelector('label[for="'+field.id+'"]')?.textContent.trim()||('Question '+(i+1));
      return label+'\n'+(field.value.trim()||'(No response written)');
    }).join('\n\n');
    const body='SURRENDER — To Become. To Walk in Purpose. To Impact.\n'+title+'\n\n'+reflections+'\n\nSaved from '+location.href;
    const mailto='mailto:'+encodeURIComponent(email.value.trim())+'?subject='+encodeURIComponent('My SURRENDER Reflection — '+title)+'&body='+encodeURIComponent(body);
    if(mailto.length>8000){status.textContent='Your reflection is too long for an email link. Copy your responses into your email app instead.';return;}
    status.textContent='Opening your email app. Review the draft and press Send to email it to yourself.';
    window.location.href=mailto;
  });
}


/* SURRENDER worship video: official YouTube embed; browsers generally mute autoplay. */
document.querySelectorAll('[data-worship-player]').forEach((panel)=>{
  const song={id:'QS04WbSnxok',name:'Trust In God',artist:'Elevation Worship',reason:'A worship reminder that God is faithful, even when the next step is uncertain.'};
  const set=(selector,value)=>{const el=panel.querySelector(selector);if(el)el.textContent=value;};
  set('[data-worship-theme]','Featured worship for your devotional');
  set('[data-worship-title]',song.name);
  set('[data-worship-artist]',song.artist);
  set('[data-worship-reason]',song.reason);
  const link=panel.querySelector('[data-worship-link]');
  if(link)link.href='https://www.youtube.com/watch?v='+song.id;
  const slot=panel.querySelector('[data-worship-video]');
  const btn=panel.querySelector('[data-worship-play]');
  if(!slot||!btn)return;
  const frame=document.createElement('iframe');
  frame.title='Trust In God — Elevation Worship (official live worship video)';
  frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.allowFullscreen=true;
  frame.loading='eager';
  frame.referrerPolicy='strict-origin-when-cross-origin';
  frame.src='https://www.youtube-nocookie.com/embed/'+song.id+'?autoplay=1&mute=1&playsinline=1&rel=0';
  slot.replaceChildren(frame);
  btn.textContent='🔊 Play with sound';
  btn.addEventListener('click',()=>{
    frame.src='https://www.youtube-nocookie.com/embed/'+song.id+'?autoplay=1&mute=0&playsinline=1&rel=0';
    btn.textContent='↻ Restart with sound';
  });
  const note=panel.querySelector('.worship-note');
  if(note)note.textContent='The video starts muted when your browser permits autoplay. Choose “Play with sound” to hear worship music. Some browsers may require pressing Play within YouTube.';
});


/* Featured devotional dates follow Eastern Time, independent of EmailOctopus sends.
   Day 1 November 9, 2026; Days 2–4 on successive mornings at 7 AM. */
(function(){
  const days=[{"t":"The Power of Surrender","scripture":"Proverbs 3:5–6","desc":"Place your trust in God, even when you cannot see how everything will unfold.","cls":"sunset"},{"t":"Letting Go of What You Cannot Control","scripture":"1 Peter 5:7","desc":"Release worry and allow God's peace to guide your next step.","cls":"warm"},{"t":"Becoming Who God Created You to Be","scripture":"2 Corinthians 5:17","desc":"Embrace renewal and the identity you are growing into.","cls":"garden"},{"t":"Walking in Purpose","scripture":"Ephesians 2:10","desc":"Take the next faithful step toward meaningful impact.","cls":"walk"}];
  const fmt=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'});
  const parts=Object.fromEntries(fmt.formatToParts(new Date()).filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));
  const easternDate=parts.year+'-'+parts.month+'-'+parts.day;
  const start=Date.UTC(2026,10,9);
  const today=Date.UTC(Number(parts.year),Number(parts.month)-1,Number(parts.day));
  const daysSince=Math.floor((today-start)/86400000);
  const current=Math.max(0,Math.min(days.length-1,daysSince-(Number(parts.hour)<7?1:0)));
  const d=days[current];
  const write=(q,v)=>document.querySelectorAll(q).forEach(el=>el.textContent=v);
  write('[data-todays-day]','Featured devotional · Day '+(current+1));
  write('[data-todays-title]',d.t);
  write('[data-todays-scripture]',d.scripture);
  write('[data-todays-desc]',d.desc);
  write('[data-todays-art-title]',d.t);
  document.querySelectorAll('[data-todays-art]').forEach(el=>{el.classList.remove('sunset','warm','garden','walk');el.classList.add(d.cls)});
  document.querySelectorAll('[data-todays-link]').forEach(el=>el.href='devotional-'+(current+1)+'.html');
  write('[data-todays-note]','The featured devotional updates at 7:00 AM Eastern on its scheduled date. Previous devotionals remain in the library.');
})();
