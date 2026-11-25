/* FARM.RAJ farmer PWA — SPA router + Hindi-first UI */
const $=s=>document.querySelector(s), app=$('#app');
let LANG=localStorage.getItem('fr-lang')||'hi';
if(!['hi','en','mwr','bgq','mew','dhd','hoj','mwt'].includes(LANG))LANG='hi';
let USER=JSON.parse(localStorage.getItem('fr-user')||'null');
let ADMIN=localStorage.getItem('fr-admin')||null;
let ADMINROLE=localStorage.getItem('fr-admin-role')||'content-editor';
let DIST=localStorage.getItem('fr-dist')||'Jaipur';

const LANGS=[['hi','हिंदी'],['mwr','मारवाड़ी'],['bgq','बागड़ी'],['mew','मेवाड़ी'],['dhd','ढूंढाड़ी'],['hoj','हाड़ौती'],['mwt','मेवाती'],['en','English']];
const L={
hi:{nav_home:'होम',nav_learn:'खेती सीखें',nav_schemes:'सरकारी योजनाएं',nav_chat:'कृषि सहायक',nav_lib:'किसान लाइब्रेरी',nav_weather:'मौसम',nav_mandi:'मंडी भाव',nav_cal:'फसल कैलेंडर',nav_services:'किसान सेवाएं',nav_myfarm:'मेरी खेती',nav_market:'बाज़ार',nav_feedback:'सुझाव',nav_admin:'विभाग लॉगिन',nav_analytics:'एनालिटिक्स',nav_about:'जानकारी',tag:'खेती की हर जानकारी, हर किसान के लिए',demo:'डेमो मोड: सिंथेटिक डेटा — असली SSO/सरकारी लॉगिन नहीं',greet:'नमस्ते किसान साथी 🙏',gsub:'आज खेत के लिए क्या करें?',search_ph:'खोजें: गेहूं, PM-KISAN, मंडी भाव…',s_learn:'खेती सीखें',s_learn_s:'मुफ्त पाठ',s_sch:'सरकारी योजनाएं',s_sch_s:'पात्रता जांच',s_chat:'कृषि सहायक',s_chat_s:'हिंदी में पूछें',s_lib:'किसान लाइब्रेरी',s_lib_s:'गाइड-वीडियो',s_wea:'मौसम और मंडी',s_wea_s:'सलाह व भाव',s_my:'मेरी खेती',s_my_s:'डायरी व दस्तावेज़',news:'ताज़ा खबर व सलाह',read:'पढ़ें'},
en:{nav_home:'Home',nav_learn:'Learn Farming',nav_schemes:'Govt Schemes',nav_chat:'Agri Assistant',nav_lib:'Farmer Library',nav_weather:'Weather',nav_mandi:'Mandi Prices',nav_cal:'Crop Calendar',nav_services:'Farmer Services',nav_myfarm:'My Farm',nav_market:'Marketplace',nav_feedback:'Feedback',nav_admin:'Dept Login',nav_analytics:'Analytics',nav_about:'About',tag:'All farming knowledge, for every farmer',demo:'Demo mode: synthetic data — not a real govt login',greet:'Hello farmer friend 🙏',gsub:'What shall we do on the farm today?',search_ph:'Search: wheat, PM-KISAN, mandi rates…',s_learn:'Learn',s_learn_s:'Free lessons',s_sch:'Schemes',s_sch_s:'Eligibility',s_chat:'Assistant',s_chat_s:'Ask in Hindi',s_lib:'Library',s_lib_s:'Guides',s_wea:'Weather',s_wea_s:'Advice & rates',s_my:'My Farm',s_my_s:'Diary & docs',news:'News & advisories',read:'Read'},
mwr:{tag:'खेती री हर जाणकारी, हर किसान वास्ते',demo:'डेमो मोड: नकली आंकड़ा — असली सरकारी लॉगिन कोनी',greet:'राम-राम किसान साथी 🙏',gsub:'आज खेत वास्ते कांई करां?',search_ph:'खोजो: गेहूं, PM-KISAN, मंडी भाव…',s_learn:'खेती सीखो',s_learn_s:'मफत पाठ',s_sch:'सरकारी योजना',s_sch_s:'पात्रता जांचो',s_chat:'खेती सहायक',s_chat_s:'मारवाड़ी में पूछो',s_lib:'किसान लाइब्रेरी',s_lib_s:'गाइड-वीडियो',s_wea:'मौसम अर मंडी',s_wea_s:'सलाह अर भाव',s_my:'म्हारी खेती',s_my_s:'डायरी अर कागद',news:'ताजी खबर अर सलाह',nav_learn:'खेती सीखो',nav_schemes:'सरकारी योजना',nav_chat:'खेती सहायक',nav_cal:'फसल जंत्री',nav_services:'किसान सेवा',nav_myfarm:'म्हारी खेती',read:'पढ़ो'},
bgq:{tag:'खेती दी हर जाणकारी, हर किसान लई',demo:'डेमो मोड: नकली डाटा — असली सरकारी लॉगिन कोई नी',greet:'सत श्री अकाल किसान वीरो 🙏',gsub:'आज खेत लई की करिए?',search_ph:'खोजो: कणक, PM-KISAN, मंडी भाव…',s_learn:'खेती सिखो',s_learn_s:'मफ्त पाठ',s_sch:'सरकारी योजना',s_sch_s:'पात्रता जांचो',s_chat:'खेती सहायक',s_chat_s:'बागड़ी च पूछो',s_wea:'मौसम ते मंडी',s_wea_s:'सलाह ते भाव',s_my:'मेरी खेती',s_my_s:'डायरी ते कागज',news:'ताजी खबर ते सलाह',nav_learn:'खेती सिखो',nav_schemes:'सरकारी योजना',nav_cal:'फसल जंत्री',nav_services:'किसान सेवा',read:'पढ़ो'},
mew:{tag:'खेती री हर जाणकारी, हर किसान सारू',demo:'डेमो मोड: नकली आंकड़ा — असली सरकारी लॉगिन कोनी',greet:'राम-राम किसान साथी 🙏',gsub:'आज खेत सारू कांई करां?',s_chat_s:'मेवाड़ी में पूछो',s_my:'म्हारी खेती',news:'ताजी खबर अर सलाह',nav_learn:'खेती सीखो',nav_schemes:'सरकारी योजना',nav_cal:'फसल जंत्री',nav_services:'किसान सेवा',nav_myfarm:'म्हारी खेती',read:'पढ़ो'},
dhd:{tag:'खेती की हर जाणकारी, हर किसान कै लिए',demo:'डेमो मोड: नकली आंकड़ा — असली सरकारी लॉगिन ना',greet:'राम-राम किसान साथी 🙏',gsub:'आज खेत कै लिए कांई करां?',s_chat_s:'ढूंढाड़ी में पूछो',news:'ताजी खबर अर सलाह',nav_cal:'फसल जंत्री',nav_services:'किसान सेवा',read:'पढ़ो'},
hoj:{tag:'खेती री हर जाणकारी, हर किसान कानी',demo:'डेमो मोड: नकली आंकड़ा — असली सरकारी लॉगिन कोनी',greet:'राम-राम किसान साथी 🙏',gsub:'आज खेत कानी कांई करां?',s_chat_s:'हाड़ौती में पूछो',news:'ताजी खबर अर सलाह',nav_cal:'फसल जंत्री',nav_services:'किसान सेवा',read:'पढ़ो'},
mwt:{tag:'खेती की हर जानकारी, हर किसान खातर',demo:'डेमो मोड: नकली आंकड़ा — असली सरकारी लॉगिन ना',greet:'राम-राम किसान साथी 🙏',gsub:'आज खेत खातर के करां?',s_chat_s:'मेवाती में पूछो',news:'ताजी खबर अर सलाह',nav_cal:'फसल जंत्री',nav_services:'किसान सेवा',read:'पढ़ो'}};
const t=k=>((L[LANG]&&L[LANG][k])||L.hi[k]||L.en[k]||k);
const hi=(a,b)=>LANG==='en'?b:a;
const U=(id,w)=>`https://images.unsplash.com/${id}?w=${w||800}&q=60&auto=format&fit=crop`;
const PH={
 heroA:[U('photo-1500382017468-9049fed747ef',1000),U('photo-1464226184884-fa280b87c399',1000)],
 heroB:[U('photo-1625246333195-78d9c38ad449',600),U('photo-1560493676-04071c5f467b',600)],
 heroC:[U('photo-1592982537447-7440770cbfc9',600),U('photo-1500382017468-9049fed747ef',600)],
 field:[U('photo-1560493676-04071c5f467b',600),U('photo-1500382017468-9049fed747ef',600)],
 wheat:[U('photo-1500382017468-9049fed747ef',600),U('photo-1464226184884-fa280b87c399',600)],
 tractor:[U('photo-1625246333195-78d9c38ad449',600),U('photo-1560493676-04071c5f467b',600)],
 paddy:[U('photo-1592982537447-7440770cbfc9',600),U('photo-1464226184884-fa280b87c399',600)],
 cattle:[U('photo-1516467508483-a7212febe31a',600),U('photo-1560493676-04071c5f467b',600)],
 market:[U('photo-1488459716781-31db52582fe9',600),U('photo-1500382017468-9049fed747ef',600)],
 road:[U('photo-1464226184884-fa280b87c399',600),U('photo-1500382017468-9049fed747ef',600)]};
function ph(srcs,alt){return `<img class="ph" loading="lazy" referrerpolicy="no-referrer" src="${srcs[0]}" data-b="${srcs[1]||''}" alt="${esc(alt||'')}" onerror="if(this.dataset.b){this.src=this.dataset.b;this.dataset.b=''}else{this.style.display='none'}">`;}
const API_BASE=()=>(window.FR_API||'').replace(/\/+$/,'');
async function api(m,p,b,auth){const r=await fetch(API_BASE()+p,{method:m,headers:{'Content-Type':'application/json',...(auth?{Authorization:'Bearer '+auth}:{})},body:b?JSON.stringify(b):undefined});return {s:r.status,d:await r.json().catch(()=>({}))};}
function toast(m){const e=$('#toast');e.textContent=m;e.style.display='block';clearTimeout(e._t);e._t=setTimeout(()=>e.style.display='none',2600);}
function track(ev,extra){fetch('/api/analytics/track',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event:ev,page:location.pathname,lang:LANG,district:DIST,...(extra||{})})}).catch(()=>{});}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function speak(txt){try{const u=new SpeechSynthesisUtterance(txt);u.lang=LANG==='en'?'en-IN':'hi-IN';speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){toast('Audio not supported');}}
function listen(into){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){toast(hi('आवाज़ इस ब्राउज़र में नहीं','Voice not supported'));return;}const r=new SR();r.lang=LANG==='en'?'en-IN':'hi-IN';r.onresult=e=>{into.value=e.results[0][0].transcript;into.dispatchEvent(new Event('input'));};r.start();toast('🎤 '+hi('बोलें…','Speak…'));}
function go(p){history.pushState({},'',p);route();}
document.addEventListener('click',e=>{const a=e.target.closest('[data-link]');if(a){e.preventDefault();go(a.getAttribute('href'));$('#side').classList.remove('open');$('#scrim').classList.remove('on');}});

/* ---------- layout chrome ---------- */
function chrome(){$('#langSel').value=LANG;$('#tagline').textContent=t('tag');document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n);});
$('#demoBadge').innerHTML='🧪 '+t('demo');document.documentElement.lang=(LANG==='en'?'en':'hi');
if(localStorage.getItem('fr-noimg')==='1')document.body.classList.add('noimg');}
$('#langSel').onchange=e=>{LANG=e.target.value;localStorage.setItem('fr-lang',LANG);chrome();route();track('lang_switch');};
$('#fontBtn').onclick=()=>document.body.classList.toggle('big');
$('#imgBtn').onclick=()=>{const off=document.body.classList.toggle('noimg');localStorage.setItem('fr-noimg',off?'1':'0');toast(off?hi('फोटो बंद — कम डेटा मोड','Photos off — low-data mode'):hi('फोटो चालू','Photos on'));};
$('#speakTop').onclick=()=>speak(app.innerText.slice(0,400));
$('#micTop').onclick=()=>{go('/chat');setTimeout(()=>{const i=$('#chatIn');if(i)listen(i);},400);};
$('#menuBtn').onclick=()=>{$('#side').classList.add('open');$('#scrim').classList.add('on');};
$('#scrim').onclick=()=>{$('#side').classList.remove('open');$('#scrim').classList.remove('on');};

/* ---------- HOME ---------- */
async function pHome(){track('page_view');
const DL=(LANG!=='hi'&&LANG!=='en');
app.innerHTML=`<div class="hero-photo"><div class="grid"><div>${ph(PH.heroA,hi('राजस्थान का किसान — खेत में','Rajasthan farmer in field'))}</div><div class="stack">${ph(PH.heroB,hi('ट्रैक्टर से जुताई','Tractor tilling'))}${ph(PH.heroC,hi('हरी फसल','Green crop'))}</div></div>
<div class="hero-cap"><h1>${t('greet')}<br>${t('gsub')}</h1><p>${t('tag')}</p>
<div class="searchbar"><input id="q" placeholder="${t('search_ph')}"><button onclick="doSearch()">🔍</button><button onclick="listen(document.querySelector('#q'))" title="voice">🎤</button></div></div></div>
<div class="grid6">
<a class="svc" href="/education" data-link><span>📚</span>${t('s_learn')}<small>${t('s_learn_s')}</small></a>
<a class="svc" href="/schemes" data-link><span>🏛️</span>${t('s_sch')}<small>${t('s_sch_s')}</small></a>
<a class="svc" href="/chat" data-link><span>🤖</span>${t('s_chat')}<small>${t('s_chat_s')}</small></a>
<a class="svc" href="/library" data-link><span>📖</span>${t('s_lib')}<small>${t('s_lib_s')}</small></a>
<a class="svc" href="/weather" data-link><span>🌦️</span>${t('s_wea')}<small>${t('s_wea_s')}</small></a>
<a class="svc" href="/my-farm" data-link><span>🚜</span>${t('s_my')}<small>${t('s_my_s')}</small></a>
</div>
<div class="ticker" id="tick">📢 …</div>
<div class="card"><h2>🌾 ${hi('फसल सीखें — फोटो चुनें','Learn crops — tap a photo')}</h2><div class="photogrid">
<a class="photocard" href="/education?cat=crops" data-link>${ph(PH.wheat,hi('गेहूं','Wheat'))}<span class="lbl">🌾 ${hi('गेहूं-सरसों','Wheat-Mustard')}</span></a>
<a class="photocard" href="/education?cat=irrigation" data-link>${ph(PH.field,hi('सिंचाई','Irrigation'))}<span class="lbl">💧 ${hi('सिंचाई','Irrigation')}</span></a>
<a class="photocard" href="/education?cat=livestock" data-link>${ph(PH.cattle,hi('पशुपालन','Livestock'))}<span class="lbl">🐄 ${hi('पशुपालन','Livestock')}</span></a>
<a class="photocard" href="/education?cat=machinery" data-link>${ph(PH.tractor,hi('यंत्र','Machinery'))}<span class="lbl">🚜 ${hi('यंत्र','Machinery')}</span></a>
</div></div>
<div class="card"><h2>📰 ${t('news')}</h2><div id="news"></div></div>
<div class="card"><h2>${hi('लोकप्रिय सरकारी योजनाएं','Popular govt schemes')}</h2><div id="popS"></div><a class="btn sec" href="/schemes" data-link>${hi('सभी योजनाएं देखें →','See all schemes →')}</a> <a class="btn sec" href="/schemes/eligibility" data-link>${hi('पात्रता जांचें','Check eligibility')}</a></div>
<div class="card"><h2>${hi('इस मौसम की सलाह (रबी)','This season: Rabi advisory')}</h2><div class="banner-strip">
<div class="season">🌾 <b>${hi('गेहूं','Wheat')}</b><br>${hi('राज-3077 • बुवाई नवंबर मध्य तक • CRI पर सिंचाई','Raj-3077 • sow by mid-Nov • irrigate at CRI')}</div>
<div class="season">🌻 <b>${hi('सरसों','Mustard')}</b><br>${hi('Giriraj • माहू निगरानी • 25-30 दिन पर सिंचाई','Giriraj • watch aphids • irrigate 25-30d')}</div>
<div class="season">💧 <b>${hi('पानी बचाएं','Save water')}</b><br>${hi('ड्रिप पर 55% तक अनुदान • राज किसान पोर्टल','Up to 55% drip subsidy • Raj Kisan portal')}</div></div></div>
<div class="card"><h2>${hi('किसान सेवाएं','Farmer services')}</h2><p>🧾 ${hi('राज किसान • SSO/जन आधार (अनुमति हेतु लंबित) • मृदा कार्ड • KCC —','Raj Kisan • SSO/Jan Aadhaar (pending auth) • soil card • KCC —')} <a href="/services" data-link>${hi('सेवाएं खोलें','open services')}</a></p>
<p>💬 ${hi('सुझाव देना हो तो','To give feedback')} <a href="/feedback" data-link>${hi('यहां बताएं','tell us here')}</a> • 📞 Kisan Call Centre: <b>1800-180-1551</b></p></div>
<div class="footer">FARM.RAJ प्रस्तावित मंच • WebStudio/Vrajhna Technologies • ${hi('डेमो डेटा स्पष्ट चिह्नित','Demo data clearly marked')} • <a href="/about" data-link>About</a></div>`;
const {d}=await api('GET','/api/schemes');const pop=(d.schemes||[]).slice(0,4);
$('#popS').innerHTML=pop.map(s=>`<div class="scheme"><b>${esc(LANG==='en'?s.name_en:s.name_hi)}</b> <span class="badge ${s.type==='state'?'b-orange':'b-green'}">${s.type==='state'?hi('राज्य','State'):hi('केंद्र','Centre')}</span><div class="kv"><span>✅ ${esc(LANG==='en'?s.benefit_en:s.benefit_hi).slice(0,90)}…</span></div><a href="/schemes/${s.id}" data-link>${hi('विवरण →','Details →')}</a></div>`).join('');
try{const n=await api('GET','/api/news');const items=n.d.news||[];
$('#tick').textContent='📢 '+items.map(x=>LANG==='en'?x.title_en:x.title_hi).join(' • ');
const nimgs=[PH.wheat,PH.market,PH.tractor,PH.field];
$('#news').innerHTML=items.slice(0,4).map((x,i)=>`<div class="news-item">${ph(nimgs[i%4], x.title_hi)}<div><b>${esc(LANG==='en'?x.title_en:x.title_hi)}</b><div class="kv"><span>📅 ${esc(x.date)}</span><span>🔗 ${esc(x.source)}</span></div><p style="margin:4px 0">${esc(LANG==='en'?x.body_en:x.body_hi)}</p></div></div>`).join('');}catch(e){}
}
window.doSearch=()=>{const q=($('#q')||{}).value||'';go(q?'/education?q='+encodeURIComponent(q):'/education');};

/* ---------- EDUCATION ---------- */
const CATS=[['crops','🌾', 'फसलें','Crops'],['soil','🟤','मिट्टी','Soil'],['seeds','🌱','बीज','Seeds'],['irrigation','💧','सिंचाई','Irrigation'],['organic','🍃','जैविक','Organic'],['pest','🐛','कीट प्रबंधन','Pest Mgmt'],['harvest','🧺','कटाई-भंडारण','Harvest'],['livestock','🐄','पशुपालन','Livestock'],['machinery','🚜','यंत्र','Machinery'],['business','💼','व्यापार-निर्यात','Business'],['history','🏰','राजस्थान गौरव','Heritage']];
const CATIMG={crops:'wheat',soil:'field',seeds:'paddy',irrigation:'paddy',organic:'field',pest:'field',harvest:'wheat',livestock:'cattle',machinery:'tractor',business:'market',history:'fort'};
PH.fort=[U('photo-1599661046289-e31897846e41',600),U('photo-1464226184884-fa280b87c399',600)];
async function pEdu(q){track('page_view');
const query=q.get('q')||'', cat=q.get('cat')||'';
app.innerHTML=`<div class="card"><h2>📚 ${hi('मुफ्त कृषि शिक्षा केंद्र','Free agriculture learning centre')}</h2>
${(LANG!=='hi'&&LANG!=='en')?`<div class="alert">🗣️ ${hi('पाठ हिंदी में हैं — बोली में सुनने हेतु 🔊 बटन दबाएं या सहायक से पूछें।','Lessons are in Hindi — press 🔊 or ask the assistant in your dialect.')} <a class="btn sec" href="/chat" data-link>🤖 ${t('s_chat')}</a></div>`:''}
<div class="photogrid"><a class="photocard" href="/education/crops" data-link>${ph(PH.wheat,'crops')}<span class="lbl">🌾 ${hi('फसलें','Crops')}</span></a><a class="photocard" href="/education/soil" data-link>${ph(PH.field,'soil')}<span class="lbl">🟤 ${hi('मिट्टी','Soil')}</span></a><a class="photocard" href="/education/livestock" data-link>${ph(PH.cattle,'livestock')}<span class="lbl">🐄 ${hi('पशुपालन','Livestock')}</span></a><a class="photocard" href="/education/irrigation" data-link>${ph(PH.paddy,'irrigation')}<span class="lbl">💧 ${hi('सिंचाई','Irrigation')}</span></a><a class="photocard" href="/education/business" data-link>${ph(PH.market,'business')}<span class="lbl">💼 ${hi('व्यापार-निर्यात','Business')}</span></a><a class="photocard" href="/education/rajasthan-heritage" data-link>${ph(PH.fort,'heritage')}<span class="lbl">🏰 ${hi('राजस्थान गौरव','Heritage')}</span></a></div>
<div class="searchbar"><input id="eq" value="${esc(query)}" placeholder="${hi('पाठ खोजें…','Search lessons…')}"><button onclick="searchEdu()">🔍</button></div>
<div class="chips"><button class="chip ${!cat?'on':''}" onclick="go('/education')">${hi('सभी','All')}</button>${CATS.map(c=>`<button class="chip ${cat===c[0]?'on':''}" onclick="go('/education?cat=${c[0]}')">${c[1]} ${hi(c[2],c[3])}</button>`).join('')}</div>
<div id="les"></div></div>`;
window._curCat=cat;
window.searchEdu=()=>go('/education?cat='+encodeURIComponent(window._curCat||'')+'&q='+encodeURIComponent($('#eq').value));
const {d}=await api('GET','/api/lessons?cat='+encodeURIComponent(cat)+'&q='+encodeURIComponent(query));
$('#les').innerHTML=(d.lessons||[]).map(l=>`<div class="lesson"><b>📖 ${esc(LANG==='en'?l.title_en:l.title_hi)}</b><div class="kv"><span>⏱ ${l.duration_min} min</span><span>📶 ${l.level}</span><button class="chip" onclick="speak('${esc((LANG==='en'?l.title_en:l.title_hi)).slice(0,60)}')">🔊 ${hi('सुनें','Listen')}</button></div><a class="btn" href="/education/${l.id}" data-link>${hi('पाठ पढ़ें','Read lesson')}</a></div>`).join('')||'<p>'+hi('कोई पाठ नहीं मिला','No lessons found')+'</p>';
}
async function pLesson(id){const {d}=await api('GET','/api/lessons/'+id);const l=d.lesson;if(!l){app.innerHTML='<p>Not found</p>';return;}track('page_view',{lesson:id});
const img=PH[CATIMG[l.cat]||'field']||PH.field;
const rel=await (async()=>{try{const r=await api('GET','/api/lessons?cat='+l.cat);return (r.d.lessons||[]).filter(x=>x.id!==l.id).slice(0,3);}catch(e){return[];}})();
window.dlLesson=()=>{const txt=`FARM.RAJ — ${l.title_hi} / ${l.title_en}\n${'='.repeat(40)}\n\n${l.text_hi}\n\n${l.text_en}\n\nप्रक्रिया:\n${l.steps_hi.map((s,i)=>(i+1)+'. '+s).join('\n')}\n\nस्रोत: कृषि विभाग सलाह पैटर्न • हेल्पलाइन 1800-180-1551`;const b=new Blob([txt],{type:'text/plain;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=l.id+'-guide.txt';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000);track('lesson_download');toast('⬇ '+hi('गाइड डाउनलोड','Guide downloaded'));};
app.innerHTML=`<div class="hero-photo"><div class="grid" style="grid-template-columns:1fr"><div>${ph(img,l.title_hi)}</div></div><div class="hero-cap"><h2 style="margin:0">${esc(LANG==='en'?l.title_en:l.title_hi)}</h2></div></div>
<div class="card"><a href="/education?cat=${l.cat}" data-link>← ${hi('सभी पाठ','All lessons')}</a>
<div class="kv"><span>⏱ ${l.duration_min} min</span><span class="badge b-green">${l.level}</span><span class="badge b-grey">${l.cat}</span> <button class="chip" onclick="speak(document.querySelector('#ltext').innerText)">🔊 ${hi('पूरा पाठ सुनें','Listen aloud')}</button> <button class="chip" onclick="dlLesson()">⬇ ${hi('गाइड','Guide')}</button></div>
<p id="ltext">${esc(LANG==='en'?l.text_en:l.text_hi)}</p>
<h3>🪜 ${hi('चरण-दर-चरण प्रक्रिया','Step-by-step process')}</h3>
${(LANG==='en'?l.steps_en:l.steps_hi).map((s,i)=>`<div class="step"><b>${hi('चरण','Step')} ${i+1}:</b> ${esc(s)}</div>`).join('')}
${rel.length?`<h3>🔗 ${hi('संबंधित पाठ','Related lessons')}</h3>`+rel.map(r=>`<div class="lesson"><b>📖 ${esc(LANG==='en'?r.title_en:r.title_hi)}</b><br><a class="btn sec" href="/education/${r.id}" data-link>${t('read')} →</a></div>`).join(''):''}
<div class="alert">📞 ${hi('शंका हो तो कृषि पर्यवेक्षक / KCC 1800-180-1551 से पूछें। कीटनाशक मात्रा केवल अधिकारी/लेबल अनुसार।','Ask your agri supervisor / KCC 1800-180-1551. Pesticide dose only per officer/label.')}</div>
<a class="btn sec" href="/chat" data-link>🤖 ${hi('सहायक से पूछें','Ask assistant')}</a> <a class="btn sec" href="/library" data-link>📖 ${hi('संबंधित गाइड','Related guides')}</a></div>`;
}

/* ---------- SCHEMES ---------- */
const SCH_CATS=['income-support','insurance','credit','soil','irrigation','crops','infrastructure','seeds','energy','livestock','organic','services'];
async function pSchemes(q){track('page_view');
const query=q.get('q')||'',type=q.get('type')||'',cat=q.get('category')||'',dept=q.get('dept')||'';
const depts=['Rajasthan Agriculture Department','Rajasthan Horticulture / MNRE','Rajasthan Animal Husbandry','Rajasthan Horticulture / Agriculture','Agriculture & Farmers Welfare','Fisheries, Animal Husbandry & Dairying / DFS'];
app.innerHTML=`<div class="card"><h2>🏛️ ${hi('राज्य व केंद्र सरकारी योजनाएं','State & central govt schemes')}</h2>
<div class="alert">${hi('सभी लाभ/लिंक आधिकारिक स्रोत सहित। कोई अनुमोदन गारंटी नहीं। आवेदन अधिकृत पोर्टल पर ही होता है।','All benefits with official sources. No approval guarantee. Apply only on authorised portals.')}</div>
<div class="searchbar"><input id="sq" value="${esc(query)}" placeholder="${hi('योजना खोजें: बीमा, सिंचाई…','Search schemes…')}"><button onclick="schGo()">🔍</button><button onclick="listen(document.querySelector('#sq'))">🎤</button></div>
<div class="chips"><button class="chip ${!type?'on':''}" onclick="go('/schemes')">${hi('सभी','All')}</button><button class="chip ${type==='state'?'on':''}" onclick="go('/schemes/rajasthan')">🏜️ ${hi('राजस्थान राज्य','Rajasthan')}</button><button class="chip ${type==='central'?'on':''}" onclick="go('/schemes/central')">🇮🇳 ${hi('केंद्र','Central')}</button></div>
<div class="chips">${SCH_CATS.map(c=>`<button class="chip ${cat===c?'on':''}" onclick="go('/schemes?category=${c}')">${esc(c)}</button>`).join('')}</div>
<label>${hi('विभाग','Department')}</label><select id="sdept" onchange="schGo()"><option value="">${hi('सभी विभाग','All departments')}</option>${depts.map(x=>`<option ${dept===x?'selected':''}>${esc(x)}</option>`).join('')}</select>
<div class="chips"><button class="chip" onclick="go('/schemes/eligibility')">✅ ${hi('पात्रता जांच (2 मिनट)','Eligibility check (2 min)')}</button><button class="chip" onclick="go('/schemes/finder')">🎯 ${hi('मेरे लिए खोजें (AI)','Find for me (AI)')}</button></div>
<div id="sch"></div></div>`;
window._schType=type;window._schCat=cat;
window.schGo=()=>{go('/schemes?q='+encodeURIComponent($('#sq').value)+'&type='+encodeURIComponent(window._schType||'')+'&category='+encodeURIComponent(window._schCat||'')+'&dept='+encodeURIComponent($('#sdept').value));};
const {d}=await api('GET',`/api/schemes?q=${encodeURIComponent(query)}&type=${encodeURIComponent(type)}&category=${encodeURIComponent(cat)}&dept=${encodeURIComponent(dept)}`);
$('#sch').innerHTML=(d.schemes||[]).map(s=>`<div class="scheme"><b>${esc(LANG==='en'?s.name_en:s.name_hi)}</b><br><span class="badge ${s.type==='state'?'b-orange':'b-green'}">${s.type==='state'?hi('राजस्थान','Rajasthan'):hi('केंद्र','Centre')}</span> <span class="badge b-grey">${esc(s.category)}</span><div class="kv"><span>🎁 ${esc((LANG==='en'?s.benefit_en:s.benefit_hi)).slice(0,110)}…</span></div><div class="kv"><span>🔗 ${esc(s.source)}</span><span>🕒 ${esc(s.updated)}</span></div><a class="btn" href="/schemes/${s.id}" data-link>${hi('विवरण व आवेदन →','Details & apply →')}</a></div>`).join('');
}
async function pScheme(id){const {s,d}=await (async()=>{const r=await api('GET','/api/schemes/'+id);return{s:null,d:r.d};})();const sc=d.scheme;if(!sc){app.innerHTML='<p>Not found</p>';return;}track('scheme_view',{scheme:id});
app.innerHTML=`<div class="card"><a href="/schemes" data-link>← ${hi('सभी योजनाएं','All schemes')}</a><h2>${esc(LANG==='en'?sc.name_en:sc.name_hi)}</h2>
<p><span class="badge ${sc.type==='state'?'b-orange':'b-green'}">${sc.type}</span> <span class="badge b-grey">${esc(sc.category)}</span></p>
<h3>🎁 ${hi('लाभ','Benefits')}</h3><p>${esc(LANG==='en'?sc.benefit_en:sc.benefit_hi)}</p>
<h3>✅ ${hi('पात्रता शर्तें','Eligibility')}</h3>${sc.eligibility.map(e=>`<div class="step">${esc(LANG==='en'?e.en:e.hi)}</div>`).join('')}
<h3>📄 ${hi('आवश्यक दस्तावेज़','Documents needed')}</h3><p>${sc.documents.map(esc).join(' • ')}</p>
<div class="kv"><span>🔗 ${hi('स्रोत','Source')}: ${esc(sc.source)}</span><span>🕒 ${hi('अद्यतन','Updated')}: ${esc(sc.updated)}</span>${sc.deadline?`<span>⏰ ${esc(sc.deadline)}</span>`:''}</div>
<div class="alert">${hi('आवेदन केवल आधिकारिक पोर्टल पर करें। FARM.RAJ पर कोई शुल्क/गारंटी नहीं।','Apply only on the official portal. No fee/guarantee on FARM.RAJ.')}</div>
<a class="btn" target="_blank" rel="noopener" href="${esc(sc.applyUrl)}">🔗 ${hi('आधिकारिक आवेदन लिंक','Official apply link')} ↗</a>
<a class="btn sec" href="/schemes/eligibility" data-link>✅ ${hi('मेरी पात्रता जांचें','Check my eligibility')}</a></div>`;
}
async function pElig(){track('page_view');
let dists=[];try{const r=await api('GET','/api/districts');dists=r.d.districts||[];}catch(e){}
app.innerHTML=`<div class="card"><h2>✅ ${hi('योजना पात्रता जांच','Scheme eligibility check')}</h2>
<p class="kv">${hi('नियम संस्करण','Rules version')}: eligibility-rules v1.0 • ${hi('सांकेतिक जांच — गारंटी नहीं','Indicative only')}</p>
<label>${hi('जिला','District')}</label><select id="e_d">${dists.map(x=>`<option ${x===DIST?'selected':''}>${x}</option>`).join('')}</select>
<label>${hi('श्रेणी','Category')}</label><select id="e_c"><option>General</option><option>SC</option><option>ST</option><option>OBC</option><option>Small/Marginal</option><option>Woman farmer</option></select>
<label>${hi('कुल कृषि भूमि (एकड़)','Farm land (acres)')}</label><input id="e_l" type="number" min="0" step="0.5" value="2">
<label>${hi('मुख्य फसल / कार्य','Main crop / activity')}</label><select id="e_crop"><option>wheat</option><option>mustard</option><option>bajra</option><option>cotton</option><option>vegetables</option><option>dairy</option><option>other</option></select>
<label><input type="checkbox" id="e_j" style="width:auto"> ${hi('जन आधार कार्ड है','Have Jan Aadhaar')}</label>
<label><input type="checkbox" id="e_t" style="width:auto"> ${hi('आयकर दाता हूं','I pay income tax')}</label>
<label><input type="checkbox" id="e_w" style="width:auto"> ${hi('सिंचाई जल स्रोत है','Have water source')}</label>
<button class="btn" onclick="runElig()">✅ ${hi('जांचें','Check')}</button><div id="er"></div></div>`;
window.runElig=async()=>{const b={district:$('#e_d').value,category:$('#e_c').value,landAcres:+$('#e_l').value,crop:$('#e_crop').value,janAadhaar:$('#e_j').checked,taxPayer:$('#e_t').checked,waterSource:$('#e_w').checked};
const {d}=await api('POST','/api/eligibility/check',b);DIST=b.district;localStorage.setItem('fr-dist',DIST);
$('#er').innerHTML='<h3>'+hi('परिणाम','Results')+'</h3>'+d.results.map(r=>{const c=r.status==='likely'?'b-green':r.status==='ineligible'?'b-red':'b-orange';const lbl=r.status==='likely'?hi('संभावित पात्र','Likely eligible'):r.status==='ineligible'?hi('अपात्र','Not eligible'):hi('कार्रवाई needed','Action needed');
return `<div class="scheme"><b>${esc(r.id)}</b> <span class="badge ${c}">${lbl}</span>${r.reasons.map(x=>`<div class="step">${esc(LANG==='en'?x.en:x.hi)}</div>`).join('')}<a href="/schemes/${r.id}" data-link>${hi('योजना विवरण →','Scheme details →')}</a></div>`;}).join('')+`<div class="alert red">${esc(LANG==='en'?d.disclaimer_en:d.disclaimer_hi)}</div>`;};
}
/* ---------- SCHEME FINDER (Meta-powered) ---------- */
async function pFinder(){track('page_view');
let dists=[];try{const r=await api('GET','/api/districts');dists=r.d.districts||[];}catch(e){}
let eng='…';try{eng=(await api('GET','/api/ai/status')).d.engine||'local-kb';}catch(e){}
app.innerHTML=`<div class="card"><h2>🎯 ${hi('मेरे लिए योजना खोजें','Find schemes for me')} <span class="badge ${String(eng).startsWith('meta')?'b-green':'b-grey'}">🤖 ${esc(eng)}</span></h2>
<div class="alert">${hi('नियम-इंजन वास्तविक जांच करता है; Meta मॉडल (चाबी लगने पर) व्यक्तिगत व्याख्या देता है। चाबी सर्वर पर ही रहती है — फ्रंटएंड पर कभी नहीं।','The rules engine does the real check; the Meta model (when key is set) adds personal explanation. Keys stay server-side — never in frontend.')}</div>
<label>${hi('जिला','District')}</label><select id="f_d">${dists.map(x=>`<option ${x===DIST?'selected':''}>${x}</option>`).join('')}</select>
<label>${hi('श्रेणी','Category')}</label><select id="f_c"><option>General</option><option>SC</option><option>ST</option><option>OBC</option><option>Small/Marginal</option><option>Woman farmer</option></select>
<label>${hi('भूमि (एकड़)','Land (acres)')}</label><input id="f_l" type="number" min="0" step="0.5" value="2">
<label>${hi('मुख्य फसल/कार्य','Main crop/activity')}</label><select id="f_crop"><option>wheat</option><option>mustard</option><option>bajra</option><option>cotton</option><option>cumin</option><option>vegetables</option><option>dairy</option><option>goat</option><option>export</option><option>processing</option><option>other</option></select>
<label>${hi('मुझे क्या चाहिए? (जैसे: सिंचाई, ऋण, निर्यात)','What do you need? (e.g. irrigation, loan, export)')}</label><input id="f_n" placeholder="${hi('सिंचाई हेतु सहायता','help for irrigation')}">
<label><input type="checkbox" id="f_j" checked style="width:auto"> ${hi('जन आधार कार्ड है','Have Jan Aadhaar')}</label>
<button class="btn" onclick="runFinder()">🎯 ${hi('योजनाएं खोजें','Find schemes')}</button><div id="fr"></div></div>`;
window.runFinder=async()=>{const b={district:$('#f_d').value,category:$('#f_c').value,landAcres:+$('#f_l').value,crop:$('#f_crop').value,janAadhaar:$('#f_j').checked,taxPayer:false,waterSource:true,need:$('#f_n').value,lang:LANG};
$('#fr').innerHTML='<p>⏳ '+hi('खोज रहे हैं…','Searching…')+'</p>';
const {d}=await api('POST','/api/schemes/finder',b);DIST=b.district;localStorage.setItem('fr-dist',DIST);
$('#fr').innerHTML=`<p class="kv">🤖 engine: <b>${esc(d.engine)}</b> • 📜 ${esc(d.rulesVersion)}</p>`+(d.aiNotes?`<div class="alert">🤖 ${esc(d.aiNotes).replace(/\n/g,'<br>')}</div>`:'')+'<h3>'+hi('शीर्ष योजनाएं','Top schemes')+'</h3>'+d.top.map(r=>{const c=r.status==='likely'?'b-green':r.status==='ineligible'?'b-red':'b-orange';return `<div class="scheme"><b>${esc(r.id)}</b> <span class="badge ${c}">${esc(r.status)}</span><div class="kv"><span>${esc((LANG==='en'?r.benefit_en:r.benefit_hi)).slice(0,120)}…</span></div>${r.reasons.slice(0,2).map(x=>`<div class="step">${esc(LANG==='en'?x.en:x.hi)}</div>`).join('')}<a class="btn sec" href="/schemes/${r.id}" data-link>${hi('विवरण →','Details →')}</a> <a class="btn sec" target="_blank" rel="noopener" href="${esc(r.applyUrl)}">🔗 ${hi('आवेदन','Apply')} ↗</a></div>`;}).join('')+`<div class="alert red">${esc(LANG==='en'?d.disclaimer_en:d.disclaimer_hi)}</div>`;};
}

/* ---------- CHAT ---------- */
const CHAT_Q={hi:['PM-KISAN कैसे मिलेगा?','सरसों में माहू','ड्रिप अनुदान','आज मंडी भाव','मिट्टी जांच'],en:['How to get PM-KISAN?','Aphids in mustard','Drip subsidy','Mandi rates','Soil test'],mwr:['PM-KISAN कियां मिलेला?','सरसों में माहू','ड्रिप अनुदान','आज मंडी भाव','माटी जांच'],bgq:['PM-KISAN किवें मिलेगा?','सरसों च माहो','ड्रिप सब्सिडी','आज मंडी भाव','मिट्टी जांच'],mew:['PM-KISAN कियां मिलेला?','सरसों में माहू','ड्रिप अनुदान','मंडी भाव','माटी जांच'],dhd:['PM-KISAN कस्यो मिलेगो?','सरसों में माहू','ड्रिप अनुदान','मंडी भाव','माटी जांच'],hoj:['PM-KISAN कियां मिलेगो?','सरसों में माहू','ड्रिप अनुदान','मंडी भाव','माटी जांच'],mwt:['PM-KISAN किसे मिलेगा?','सरसों में माहू','ड्रिप अनुदान','मंडी भाव','मिट्टी जांच']};
const CHAT_HELLO={hi:'नमस्ते! फसल, योजना, मौसम-मंडी, पशुपालन — कुछ भी पूछें। 🎤 बटन से बोलकर भी पूछ सकते हैं।',en:'Hello! Ask about crops, schemes, weather-mandi, livestock. Use 🎤 to speak.',mwr:'राम-राम! फसल, योजना, मौसम-मंडी, पशु — कांई भी पूछो। 🎤 सूं बोलर भी पूछ सको।',bgq:'सत श्री अकाल! फसल, योजना, मौसम-मंडी, पशु — कुछ वी पूछो।',mew:'राम-राम! कांई भी पूछो।',dhd:'राम-राम! कांई भी पूछो।',hoj:'राम-राम! कांई भी पूछो।',mwt:'राम-राम! कुछ भी पूछो।'};
function pChat(){track('page_view');
const hist=JSON.parse(localStorage.getItem('fr-chat')||'[]');
const qs=CHAT_Q[LANG]||CHAT_Q.hi;
app.innerHTML=`<div class="card"><h2>🤖 ${t('s_chat')} — ${t('s_chat_s')} <span class="badge b-grey" id="engB">🤖 …</span></h2>
<div class="alert">ℹ️ ${hi('आपकी बोली में उत्तर (मारवाड़ी/बागड़ी पूर्ण; अन्य बोलियों हेतु सरल हिंदी) + सत्यापित स्रोत + किसान कॉल सेंटर। दवा-खुराक/निदान/वित्तीय निर्णय स्थानीय अधिकारी से सत्यापित करें। "मेरे लिए योजना बताओ" लिखें — सहायक नियम-इंजन से जांचेगा।','Sourced answers + KCC. Type "find schemes for me" — the assistant runs the rules engine.')}</div>
<div class="chips">${qs.map(q=>`<button class="chip" onclick="askQ(this)">${esc(q)}</button>`).join('')}<button class="chip" onclick="go('/schemes/finder')">🎯 ${hi('मेरे लिए योजना खोजें','Find schemes for me')}</button></div>
<div class="chatbox" id="cb">${hist.map(m=>`<div class="msg ${m.w}">${esc(m.t)}<small>${esc(m.s||'')}</small></div>`).join('')||`<div class="msg b">${esc(CHAT_HELLO[LANG]||CHAT_HELLO.hi)}</div>`}</div>
<div class="chatrow"><button class="btn sec" onclick="listen(document.querySelector('#chatIn'))">🎤</button><input id="chatIn" placeholder="${hi('यहां लिखें या बोलें…','Type or speak…')}"><button class="btn" onclick="sendChat()">➤</button></div>
<div id="crate"></div></div>`;
window.askQ=b=>{$('#chatIn').value=b.textContent;sendChat();};
window.sendChat=async()=>{const inp=$('#chatIn'),msg=inp.value.trim();if(!msg)return;inp.value='';
const cb=$('#cb');cb.innerHTML+=`<div class="msg u">${esc(msg)}</div>`;cb.scrollTop=1e6;
const t0=Date.now();
cb.innerHTML+=`<div class="msg b" id="typing">…</div>`;
const h0=JSON.parse(localStorage.getItem('fr-chat')||'[]');
let full='',meta=null,gotStream=false;
try{
const resp=await fetch(API_BASE()+'/api/chat/stream',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg,lang:LANG,district:DIST,landAcres:2,history:h0.slice(-6)})});
if(!resp.ok||!resp.body) throw new Error('no stream');
const reader=resp.body.getReader();const dec=new TextDecoder();let buf='';
const el=()=>document.querySelector('#typing');
while(true){const {done,value}=await reader.read();if(done)break;buf+=dec.decode(value,{stream:true});
const parts=buf.split('\n\n');buf=parts.pop();
for(const part of parts){const line=part.split('\n').map(l=>l.trim()).find(l=>l.startsWith('data:'));if(!line)continue;
try{const o=JSON.parse(line.slice(5).trim());
if(o.token){gotStream=true;full+=o.token;const e=el();if(e){e.innerHTML=esc(full).replace(/\n/g,'<br>')+(o.firstTokenMs?`<small>⚡</small>`:'');}cb.scrollTop=1e6;}
if(o.done){meta=o;}
}catch(e){}}}
}catch(e){gotStream=false;}
const finish=(reply,engine,sources)=>{const e=document.querySelector('#typing');
if(e)e.outerHTML=`<div class="msg b">${esc(reply).replace(/\n/g,'<br>')}<small>📚 ${esc((sources||[]).join(' • ')).slice(0,220)}${engine?' • 🤖 '+esc(engine):''} • ⚡ ${((Date.now()-t0)/1000).toFixed(1)}s</small><div><button class="chip" onclick="speak(this.parentElement.parentElement.textContent.slice(0,300))">🔊</button> <button class="chip" onclick="rateChat(1)">👍</button> <button class="chip" onclick="rateChat(0)">👎</button> <button class="chip" onclick="go('/schemes/finder')">🎯 ${hi('योजना खोजें','Find schemes')}</button> <button class="chip" onclick="webAsk('${esc(msg).slice(0,60)}')">🌐 Web</button></div></div>`;
cb.scrollTop=1e6;const h=JSON.parse(localStorage.getItem('fr-chat')||'[]');h.push({w:'u',t:msg},{w:'b',t:reply,s:(sources||[]).join(',')});localStorage.setItem('fr-chat',JSON.stringify(h.slice(-30)));
const eb=$('#engB');if(eb&&engine){eb.textContent='🤖 '+engine;eb.className='badge '+(String(engine).startsWith('meta')?'b-green':'b-grey');}};
if(gotStream&&full){finish(full,meta&&meta.engine,meta&&meta.sources);return;}
const {d}=await api('POST','/api/chat',{message:msg,lang:LANG,district:DIST,history:h0.slice(-6)});
finish(d.reply,d.engine,d.sources);};
window.webAsk=async q=>{const {d}=await api('POST','/api/websearch',{q,lang:LANG,answer:true});
let html=`<div class="msg b">🌐 <b>${esc(q)}</b><br>${(d.results||[]).map(r=>`[${r.n}] <a target="_blank" rel="noopener" href="${esc(r.url)}">${esc(r.title)}</a>`).join('<br>')}${d.answer?'<br><br>'+esc(d.answer).replace(/\n/g,'<br>'):''}<small>⚡ ${((d.ms||0)/1000).toFixed(1)}s • ${esc(d.engine||'')} • ${esc(d.note||'')}</small></div>`;
const cb=$('#cb');if(cb){cb.innerHTML+=html;cb.scrollTop=1e6;}};
window.rateChat=v=>{api('POST','/api/chat/rate',{rating:v,lang:LANG});toast(hi('धन्यवाद!','Thanks!'));};
api('GET','/api/ai/status').then(({d})=>{const eb=$('#engB');if(eb&&d){eb.textContent='🤖 '+(d.engine||'local-kb');eb.className='badge '+(String(d.engine||'').startsWith('meta')?'b-green':'b-grey');}}).catch(()=>{});
}

/* ---------- LIBRARY / WEATHER / MANDI / CALENDAR ---------- */
async function pLib(q){track('page_view');const query=q.get('q')||'', kind=q.get('kind')||'';
app.innerHTML=`<div class="card"><h2>📖 ${hi('डिजिटल कृषि लाइब्रेरी','Digital agriculture library')}</h2>
<div class="chips"><button class="chip ${!kind?'on':''}" onclick="go('/library')">📚 ${hi('सभी','All')}</button><button class="chip ${kind==='guide'?'on':''}" onclick="go('/library/guides')">📄 ${hi('गाइड','Guides')}</button><button class="chip ${kind==='video'?'on':''}" onclick="go('/library/videos')">🎬 ${hi('वीडियो-ऑडियो','Video-Audio')}</button></div>
<div class="searchbar"><input id="lq" value="${esc(query)}" placeholder="${hi('गाइड/वीडियो खोजें…','Search guides…')}"><button onclick="go('/library?q='+encodeURIComponent(document.querySelector('#lq').value))">🔍</button></div><div id="li"></div>
<div class="alert">${hi('नोट: डेमो रिकॉर्ड — आधिकारिक PDF/वीडियो विभागीय अनुमोदन के बाद जुड़ेंगे। डाउनलोड बटन से वास्तविक पठनीय प्रति (text) तुरंत मिलती है।','Note: demo records — official PDFs attach after departmental approval. Download gives a real readable copy (text) instantly.')}</div></div>`;
const {d}=await api('GET','/api/library?q='+encodeURIComponent(query));
const items=(d.items||[]).filter(g=>!kind||g.kind===kind||(kind==='video'&&(g.kind==='video'||g.kind==='audio'))||(kind==='guide'&&g.kind==='guide'));
window.dlGuide=id=>{const g=(d.items||[]).find(x=>x.id===id);if(!g)return;const txt=`FARM.RAJ — ${g.title_hi} / ${g.title_en}\n${g.file} (${g.size})\n\nयह डेमो पठनीय प्रति है। आधिकारिक संस्करण विभागीय अनुमोदन के बाद जुड़ेगा।\nThis is a demo readable copy. Official version attaches after departmental approval.\n\nस्रोत: कृषि विभाग सलाह पैटर्न • हेल्पलाइन 1800-180-1551`;const b=new Blob([txt],{type:'text/plain;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=g.file.replace(/\.\w+$/,'')+'-demo.txt';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000);track('library_download');toast('⬇ '+hi('डाउनलोड हो गया','Downloaded'));};
$('#li').innerHTML=items.map(g=>{const ic=g.kind==='video'?'🎬':g.kind==='audio'?'🎧':'📄';return `<div class="lesson">${ic} <b>${esc(LANG==='en'?g.title_en:g.title_hi)}</b><div class="kv"><span>${g.file}</span><span>${g.size}</span></div><button class="btn sec" onclick="dlGuide('${g.id}')">⬇ ${hi('डाउनलोड','Download')}</button> ${g.kind==='audio'?`<button class="chip" onclick="speak('${esc(LANG==='en'?g.title_en:g.title_hi)}. ${hi('रबी सलाह: समय पर बुवाई, बीजोपचार और संतुलित खाद अपनाएं।','Rabi advice: timely sowing, seed treatment and balanced fertiliser.')}')">🔊 ${hi('ऑडियो सुनें','Play audio')}</button>`:''}</div>`;}).join('')||'<p>'+hi('कोई सामग्री नहीं','No items')+'</p>';
}
async function pWeather(){track('page_view');
let dists=[];try{dists=(await api('GET','/api/districts')).d.districts||[];}catch(e){}
app.innerHTML=`<div class="card"><h2>🌦️ ${hi('मौसम व कृषि सलाह','Weather & advisory')}</h2><label>${hi('जिला','District')}</label><select id="w_d">${['Jaipur','Jodhpur','Udaipur','Kota','Bikaner','Sri Ganganagar'].map(x=>`<option ${x===DIST?'selected':''}>${x}</option>`).join('')}</select><div id="w"></div></div>`;
const load=async()=>{const {d}=await api('GET','/api/weather?district='+$('#w_d').value);DIST=$('#w_d').value;localStorage.setItem('fr-dist',DIST);
$('#w').innerHTML=`<h3>${esc(d.district)} — ${d.tmax}°/${d.tmin}°C • ${hi('वर्षा','Rain')} ${d.rain}mm • 💧${d.hum}% • 🍃${d.wind}km/h</h3><div class="step">${esc(LANG==='en'?d.adv_en:d.adv_hi)}</div><h3>${hi('5-दिन पूर्वानुमान','5-day forecast')}</h3><table><tr><th>${hi('दिन','Day')}</th><th>Max</th><th>Min</th><th>${hi('वर्षा','Rain')}</th></tr>${d.forecast.map(f=>`<tr><td>${f.day}</td><td>${f.tmax}°</td><td>${f.tmin}°</td><td>${f.rain}mm</td></tr>`).join('')}</table><p class="kv">📅 ${d.date} • ${esc(d.source)}</p>`;};
$('#w_d').onchange=load;load();
}
async function pMandi(){track('page_view');
app.innerHTML=`<div class="card"><h2>⚖️ ${hi('मंडी भाव','Mandi prices')}</h2><div class="searchbar"><input id="mq" placeholder="${hi('फसल खोजें: गेहूं, सरसों…','Search crop…')}"><button onclick="loadMandi()">🔍</button></div><div id="m"></div><div class="alert">💡 ${hi('बेचने से पहले 2-3 नजदीकी मंडियों के भाव तुलना करें। नमी मानक: गेहूं <12%।','Compare 2-3 mandis before selling. Moisture: wheat <12%.')}</div></div>`;
window.loadMandi=async()=>{const {d}=await api('GET','/api/mandi?crop='+encodeURIComponent(($('#mq')||{value:''}).value));$('#m').innerHTML=`<p class="kv">📅 ${d.date} • ${esc(d.source)}</p><table><tr><th>${hi('मंडी','Mandi')}</th><th>${hi('फसल','Crop')}</th><th>Modal ₹/q</th><th>Min–Max</th></tr>${d.prices.map(p=>`<tr><td>${esc(p.mandi)}</td><td>${esc(LANG==='en'?p.crop_en:p.crop_hi)}</td><td><b>₹${p.modal}</b></td><td>${p.min}–${p.max}</td></tr>`).join('')}</table>`;};
loadMandi();
}
async function pCal(){track('page_view');
app.innerHTML=`<div class="card"><h2>🗓️ ${hi('फसल कैलेंडर','Crop calendar')}</h2><div class="chips"><button class="chip" onclick="go('/crop-calendar?season=rabi')">❄️ Rabi</button><button class="chip" onclick="go('/crop-calendar?season=kharif')">🌧️ Kharif</button><button class="chip" onclick="go('/crop-calendar?season=zaid')">☀️ Zaid</button></div><div id="c"></div></div>`;
const s=new URLSearchParams(location.search).get('season')||'rabi';
const {d}=await api('GET','/api/crop-calendar?season='+s);
$('#c').innerHTML=d.calendar.map(x=>`<div class="step"><b>${esc(x.m)}</b> — ${esc(LANG==='en'?x.en:x.hi)}</div>`).join('');
}

/* ---------- SOIL / PEST / LIVESTOCK / MARKET ---------- */
function pSoil(){track('page_view');
app.innerHTML=`<div class="card"><h2>🟤 ${hi('मिट्टी सलाह','Soil advisory')}</h2><label>pH ${hi('मान','value')} (e.g. 7.2)</label><input id="s_ph" type="number" step="0.1" value="7.5"><label>${hi('मिट्टी प्रकार','Soil type')}</label><select><option>${hi('रेतीली (थार)','Sandy')}</option><option>${hi('दोमट','Loam')}</option><option>${hi('काली','Black')}</option></select><label>${hi('फसल','Crop')}</label><input id="s_c" value="${hi('गेहूं','wheat')}"><button class="btn" onclick="soilGo()">${hi('सलाह पाएं','Get advice')}</button><div id="so"></div>
<div class="alert">🧪 ${hi('पुष्टि हेतु जिला मिट्टी प्रयोगशाला में परीक्षण + Soil Health Card बनवाएं।','Confirm at district soil lab + get Soil Health Card.')}</div></div>`;
window.soilGo=async()=>{const {d}=await api('POST','/api/soil-advisory',{ph:+$('#s_ph').value});$('#so').innerHTML=`<div class="step">${esc(LANG==='en'?d.en:d.hi)}</div><p class="kv">${esc(d.lab)}</p>`;};
}
function pPest(){track('page_view');
app.innerHTML=`<div class="card"><h2>🐛 ${hi('कीट-रोग सहायता','Pest-disease help')}</h2>
<a class="btn" href="/crop-doctor" data-link>📸 ${hi('फोटो से पहचानें — क्रॉप डॉक्टर','Identify from photo — Crop Doctor')}</a>
<div class="alert red">⚠️ ${hi('कोई कीटनाशक मात्रा यहां नहीं दी जाती। छिड़काव केवल कृषि अधिकारी की सलाह व लेबल मात्रा पर।','No pesticide dose is given here. Spray only on officer advice at label dose.')}</div>
<label>${hi('फसल','Crop')}</label><input id="p_c" placeholder="${hi('जैसे: सरसों','e.g. mustard')}"><label>${hi('लक्षण लिखें','Describe symptoms')}</label><textarea id="p_s" rows="3" placeholder="${hi('जैसे: पत्तों पर माहू, सफेद पाउडर…','e.g. aphids on leaves…')}"></textarea><button class="btn" onclick="pestGo()">🔍 ${hi('पहचानें','Identify')}</button> <button class="btn sec" onclick="listen(document.querySelector('#p_s'))">🎤</button><div id="po"></div></div>`;
window.pestGo=async()=>{const {d}=await api('POST','/api/pest-diagnose',{crop:$('#p_c').value,symptom:$('#p_s').value});$('#po').innerHTML=`<div class="step">${esc(LANG==='en'?d.en:d.hi)}</div><div class="alert">${esc(LANG==='en'?d.safety_en:d.safety_hi)} 📞 ${d.helpline}</div>`;};
}
/* ---------- CROP DOCTOR (photo -> Meta vision) ---------- */
function pDoctor(){track('page_view');
app.innerHTML=`<div class="card"><h2>📸 ${hi('क्रॉप डॉक्टर — फोटो से जानें','Crop Doctor — learn from a photo')}</h2>
<div class="alert">🤖 ${hi('फोटो Meta AI मॉडल को जाती है (सर्वर से, सुरक्षित)। चेहरा/आधार जैसी निजी जानकारी वाली फोटो न भेजें।','Photo goes to the Meta AI model (via server, securely). Do not send photos with faces/Aadhaar/private info.')}</div>
<label>📷 ${hi('पत्ती/फसल की साफ फोटो','Clear photo of leaf/crop')}</label><input type="file" id="cd_f" accept="image/*" capture="environment">
<div id="cd_prev" style="margin:8px 0"></div>
<label>${hi('फसल (यदि पता हो)','Crop (if known)')}</label><input id="cd_c" placeholder="${hi('जैसे: सरसों','e.g. mustard')}">
<label>${hi('लक्षण/नोट','Symptoms/notes')}</label><textarea id="cd_n" rows="2"></textarea> <button class="btn sec" onclick="listen(document.querySelector('#cd_n'))">🎤</button>
<button class="btn" onclick="docGo()">🔍 ${hi('पहचानें व निदान करें','Identify & diagnose')}</button><div id="cd_o"></div></div>`;
window.docGo=async()=>{
const f=$('#cd_f').files[0];if(!f)return toast(hi('पहले फोटो चुनें','Choose a photo first'));
const img=await new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.readAsDataURL(f);});
const down=await new Promise(res=>{const im=new Image();im.onload=()=>{const mx=768;let w=im.width,h=im.height;if(Math.max(w,h)>mx){const k=mx/Math.max(w,h);w=Math.round(w*k);h=Math.round(h*k);}const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(im,0,0,w,h);res(c.toDataURL('image/jpeg',0.72));};im.onerror=()=>res(img);im.src=img;});
$('#cd_prev').innerHTML=`<img src="${down}" style="max-width:100%;border-radius:12px" alt="crop">`;
$('#cd_o').innerHTML='<p>⏳ '+hi('AI देख रहा है…','AI is looking…')+'</p>';
const {s,d}=await api('POST','/api/crop-doctor',{imageBase64:down,crop:$('#cd_c').value,notes:$('#cd_n').value,lang:LANG});
if(s!==200){$('#cd_o').innerHTML='<div class="alert red">❌ '+esc(d.error||'error')+'</div>';return;}
if(d.diagnosis)$('#cd_o').innerHTML=`<p class="kv">🤖 ${esc(d.engine||'')}</p><div class="step">${esc(d.diagnosis).replace(/\n/g,'<br>')}</div><div class="alert">${esc(d.disclaimer||'')}</div><button class="chip" onclick="speak(document.querySelector('#cd_o').innerText.slice(0,350))">🔊 ${hi('सुनें','Listen')}</button>`;
else $('#cd_o').innerHTML=`<div class="alert">${esc(d.guidance||'')}</div><a class="btn sec" href="/pest-help" data-link>🐛 ${hi('प्रश्नावली भरें','Use questionnaire')}</a>`;
};}

/* ---------- LIVESTOCK ---------- */
function pLivestock(){track('page_view');
app.innerHTML=`<div class="card"><h2>🐄 ${hi('पशुपालन','Livestock')}</h2>
<div class="lesson">🥛 <b>${hi('दैनिक डायरी','Daily diary')}</b><div class="kv"><span>${hi('दूध (लीटर)','Milk (L)')}</span></div><input id="milk" type="number" placeholder="12"><button class="btn sec" onclick="saveMilk()">${hi('सहेजें','Save')}</button> <span id="milkOut" class="kv"></span></div>
<div class="lesson">💉 <b>${hi('टीकाकरण कैलेंडर','Vaccination calendar')}</b><div class="step">FMD — ${hi('वर्ष में 2 बार (पशु चिकित्सक से)','twice yearly (via vet)')}</div><div class="step">HS/BQ — ${hi('मानसून पूर्व','pre-monsoon')}</div><div class="step">${hi('कृमिनाशक — हर 6 माह','Deworming — every 6 months')}</div></div>
<div class="lesson">🌾 <b>${hi('चारा योजना','Fodder plan')}</b><p>${hi('हरा + सूखा + दाना; साफ पानी दिन में 2-3 बार।','Green + dry + concentrate; clean water 2-3x daily.')}</p></div>
<div class="alert">📞 ${hi('पशु चिकित्सा हेतु नजदीकी पशु चिकित्सालय — आपातकाल में 1962 (जहां उपलब्ध)।','Nearest vet hospital — emergency 1962 where available.')}</div></div>`;
const m=JSON.parse(localStorage.getItem('fr-milk')||'[]');if(m.length)$('#milkOut').textContent=hi('पिछला 7 दिन औसत: ','Last 7-day avg: ')+(m.slice(-7).reduce((a,b)=>a+b,0)/Math.min(7,m.length)).toFixed(1)+' L';
window.saveMilk=()=>{const v=+$('#milk').value||0;const a=JSON.parse(localStorage.getItem('fr-milk')||'[]');a.push(v);localStorage.setItem('fr-milk',JSON.stringify(a));toast(hi('सहेजा गया','Saved'));};
}
async function pMarket(){track('page_view');
app.innerHTML=`<div class="card"><h2>🤝 ${hi('किसान बाज़ार','Farmer marketplace')} <span class="badge b-orange">${hi('डेमो','Demo')}</span></h2><div id="mk"></div>
<h3>${hi('अपना विज्ञापन दें','Post your ad')}</h3><label>${hi('वस्तु','Item')}</label><input id="k_t"><label>${hi('मूल्य ₹','Price ₹')}</label><input id="k_p" type="number"><label>${hi('जिला','District')}</label><input id="k_d" value="${esc(DIST)}"><button class="btn" onclick="postAd()">${hi('प्रकाशित करें','Publish')}</button></div>`;
const load=async()=>{const {d}=await api('GET','/api/marketplace');$('#mk').innerHTML=d.items.map(m=>`<div class="lesson">🧺 <b>${esc(LANG==='en'?m.item_en:m.item_hi)}</b><div class="kv"><span>₹${m.price}/${esc(m.unit)}</span><span>📍 ${esc(m.district)}</span><span>📞 ${esc(m.phone)}</span></div></div>`).join('');};
window.postAd=async()=>{const {d}=await api('POST','/api/marketplace',{title:$('#k_t').value,price:+$('#k_p').value,unit:'unit',district:$('#k_d').value});if(d.ok){toast(hi('प्रकाशित!','Published!'));load();}};
load();
}

/* ---------- MY FARM / SERVICES / FEEDBACK / ABOUT ---------- */
function pMyFarm(sub){track('page_view');
const diary=JSON.parse(localStorage.getItem('fr-diary')||'[]');
app.innerHTML=`<div class="card"><h2>🚜 ${hi('मेरी खेती','My farm')} ${USER?`<span class="badge b-green">👤 ${esc(USER.name)} • ${esc(USER.district)}</span>`:''}</h2>
${USER?'':`<div class="alert">🧪 ${hi('डेमो किसान मोड — सिंथेटिक पहचान। असली SSO/जन आधार नहीं।','Demo farmer mode — synthetic identity, not real SSO.')}<br><input id="dn" placeholder="${hi('नाम','Name')}" style="max-width:220px;display:inline-block"> <button class="btn" onclick="demoLogin()">${hi('डेमो लॉगिन','Demo login')}</button></div>`}
<h3>📓 ${hi('खेत डायरी','Field diary')}</h3><div class="chatrow"><input id="di" placeholder="${hi('आज का कार्य लिखें…','Today’s work…')}"><button class="btn" onclick="addDiary()">${hi('जोड़ें','Add')}</button></div><div id="dl">${diary.map(x=>`<div class="step">${esc(x)}</div>`).join('')}</div>
<h3 id="docs">📄 ${hi('दस्तावेज़ (सुरक्षित)','Documents (secure)')}</h3><label>${hi('प्रकार','Type')}</label><select id="dt"><option>Jamabandi</option><option>Aadhaar</option><option>Bank passbook</option><option>Soil card</option><option>PDF guide</option><option>Other</option></select><label>PDF/JPG/PNG (PDF max 10MB, अन्य 5MB)</label><input type="file" id="df" accept=".pdf,.jpg,.jpeg,.png"><button class="btn" onclick="upDoc()">${hi('अपलोड','Upload')}</button><div id="dl2" class="kv"></div>
<div id="pdfAsk" style="margin-top:8px"></div>
<p><a class="btn sec" href="/services/application-status" data-link>📦 ${hi('आवेदन स्थिति','Application status')}</a></p></div>`;
window.demoLogin=async()=>{const name=($('#dn')||{value:'Demo Farmer'}).value||'Demo Farmer';const {d}=await api('POST','/api/auth/demo-login',{name,district:DIST});USER={name:d.name,district:d.district,token:d.token};localStorage.setItem('fr-user',JSON.stringify(USER));toast('🧪 '+hi('डेमो लॉगिन सफल','Demo login ok'));pMyFarm();};
window.addDiary=()=>{const v=$('#di').value.trim();if(!v)return;const a=JSON.parse(localStorage.getItem('fr-diary')||'[]');a.unshift(new Date().toISOString().slice(0,10)+' — '+v);localStorage.setItem('fr-diary',JSON.stringify(a.slice(0,50)));pMyFarm();};
window.upDoc=async()=>{const f=$('#df').files[0];if(!f)return toast(hi('फाइल चुनें','Choose file'));const buf=await f.arrayBuffer();const bytes=new Uint8Array(buf);let bin='';for(let i=0;i<bytes.length;i+=8192)bin+=String.fromCharCode.apply(null,bytes.subarray(i,i+8192));const b64=btoa(bin);
const isPdf=(f.type||'').includes('pdf')||/\.pdf$/i.test(f.name);
if(isPdf){$('#dl2').textContent='⏳ '+hi('PDF पढ़ रहे हैं…','Reading PDF…');
const {s,d}=await api('POST','/api/docs/upload-pdf',{filename:f.name,dataBase64:b64,owner:(USER||{}).name||'demo-farmer'});
if(s===200&&d.ok){$('#dl2').innerHTML=`✅ ${esc(d.doc.filename)} • ${d.doc.pages} pages • ${d.doc.chars} chars • ⚡ ${(d.ms/1000).toFixed(1)}s`;
$('#pdfAsk').innerHTML=`<label>❓ ${hi('इस PDF से पूछें (पेज सहित उत्तर)','Ask this PDF (answers with pages)')}</label><div class="chatrow"><input id="pq" placeholder="${hi('जैसे: बीज दर क्या है?','e.g. what is seed rate?')}"><button class="btn" onclick="askPdf('${d.doc.id}')">➤</button></div><div id="pa"></div>`;}
else{$('#dl2').innerHTML='<div class="alert">'+esc((d&&d.reason)||(d&&d.error)||'error')+'</div>';}
return;}
const {s,d}=await api('POST','/api/documents/upload',{filename:f.name,mime:f.type||'application/pdf',size:f.size,dataBase64:b64,docType:$('#dt').value,owner:(USER||{}).name||'demo-farmer'});
if(s===200){toast('✅ '+hi('अपलोड सफल (निजी)','Uploaded (private)'));$('#dl2').textContent='ID: '+d.doc.id+' • '+d.doc.encrypted;}else toast('❌ '+(d.error||'error'));};
window.askPdf=async id=>{const q=$('#pq').value.trim();if(!q)return;$('#pa').innerHTML='<p>⏳…</p>';
const {d}=await api('POST','/api/docs/ask',{docId:id,question:q,lang:LANG});
$('#pa').innerHTML=`<div class="step">${esc(d.answer||'').replace(/\n/g,'<br>')}</div><div class="kv">📄 ${(d.citations||[]).map(c=>esc(c.doc)+' p.'+c.page).join(' • ')} • 🤖 ${esc(d.engine||'')}</div>`;};
}
async function pServices(sub){track('page_view');
if(sub==='application-status'){app.innerHTML=`<div class="card"><h2>📦 ${hi('आवेदन स्थिति','Application status')}</h2><div class="alert">🏛️ ${hi('स्थिति का आधिकारिक रिकॉर्ड राज किसान पोर्टल पर है। FARM.RAJ फ्रंट-डोर है — आधिकारिक API अनुमति के बाद लाइव स्थिति यहां दिखेगी।','Official record lives on Raj Kisan. Live status appears here after API authorization.')}<br><a class="btn" target="_blank" rel="noopener" href="https://rajkisan.rajasthan.gov.in/">rajkisan.rajasthan.gov.in ↗</a></div>
${USER?`<p>${hi('डेमो खाते से कोई वास्तविक आवेदन जुड़ा नहीं है।','No real applications linked to the demo account.')}</p>`:`<p>${hi('डेमो में देखने हेतु पहले','For a demo view, first')} <a href="/my-farm" data-link>${hi('डेमो लॉगिन करें','demo-login')}</a></p>`}</div>`;return;}
const {d}=await api('GET','/api/services');
app.innerHTML=`<div class="card"><h2>🧾 ${hi('किसान सेवाएं','Farmer services')}</h2><div class="alert">🏛️ <b>${hi('महत्वपूर्ण: FARM.RAJ मौजूदा सरकारी प्रणालियों को बदलता नहीं — आसान प्रवेश-द्वार है। SSO/जन आधार/राज किसान एकीकरण अनुमति हेतु लंबित।','FARM.RAJ does not replace govt systems — it is the easy front door. SSO/Jan Aadhaar/Raj Kisan integration pending authorization.')}</b></div>
${d.services.map(s=>`<div class="lesson"><b>${esc(LANG==='en'?s.en:s.hi)}</b> <span class="badge ${s.status.startsWith('pending')?'b-orange':'b-green'}">${esc(s.status)}</span><p class="kv">${esc(s.note)}</p><a class="btn sec" target="_blank" rel="noopener" href="${esc(s.url)}">${hi('आधिकारिक पोर्टल ↗','Official portal ↗')}</a></div>`).join('')}
<h3>🔐 SSO / ${hi('जन आधार एकीकरण','Jan Aadhaar integration')}</h3><div id="ssoBox"><p class="kv">⏳ ${hi('स्थिति जांच रहे हैं…','checking status…')}</p></div>
<p class="kv">OAuth2/OIDC + PKCE • ${hi('राज्य सत्यापन • सुरक्षित कुकी • सर्वर-साइड टोकन • ऑडिट लॉग','state validation • secure cookies • server-side tokens • audit logs')}</p>
<a class="btn" onclick="ssoLogin()">🔐 ${hi('Rajasthan SSO से लॉगिन','Login with Rajasthan SSO')}</a> <a class="btn sec" href="/about" data-link>${hi('तकनीकी विवरण','Technical details')}</a>
<div id="sewaBox"></div></div>`;
window.ssoLogin=async()=>{const {d}=await api('GET','/api/sso/login');
if(d.configured===false){$('#sewaBox').innerHTML=`<div class="alert">🏛️ <b>Raj Sewadwaar — ${hi('सेटअप चरण (मैनुअल v2.0)','setup steps (manual v2.0)')}</b><br>`+(d.steps||[]).map(s=>esc(s)).join('<br>')+`<br>🔗 <a target="_blank" rel="noopener" href="${esc(d.portal)}">${esc(d.portal)} ↗</a></div>`;toast(hi('SSO क्रेडेंशियल लंबित — चरण दिखाए गए','SSO credentials pending — steps shown'));}
else window.location='/api/sso/login';};
api('GET','/api/sewa/status').then(({d})=>{const s=$('#ssoBox');if(s&&d)s.innerHTML=`<div class="kv"><span>🔐 SSO: <b>${d.ssoConfigured?hi('कॉन्फ़िगर्ड (UAT शेष)','configured (UAT left)'):'⏳ pending'}</b></span><span>🪪 Sewadwaar Client ID: <b>${d.clientIdConfigured?'✅':'⏳ pending'}</b></span></div>`;}).catch(()=>{});
}
function pFeedback(){track('page_view');
app.innerHTML=`<div class="card"><h2>💬 ${hi('सुझाव / शिकायत','Feedback / grievance')}</h2>
<label>${hi('प्रकार','Type')}</label><select id="f_t"><option value="suggestion">${hi('सुझाव','Suggestion')}</option><option value="complaint">${hi('शिकायत','Complaint')}</option><option value="content">${hi('सामग्री सुधार','Content correction')}</option><option value="usability">${hi('उपयोग समस्या','Usability issue')}</option></select>
<label>${hi('संबंधित पेज','Related page')}</label><input id="f_p" value="${esc(location.pathname)}">
<label>${hi('संदेश','Message')}</label><textarea id="f_m" rows="4"></textarea>
<label>${hi('संपर्क (वैकल्पिक)','Contact (optional)')}</label><input id="f_c" placeholder="mobile/email">
<button class="btn" onclick="sendFb()">📩 ${hi('भेजें','Send')}</button><div id="fo"></div></div>`;
window.sendFb=async()=>{const {s,d}=await api('POST','/api/feedback',{type:$('#f_t').value,page:$('#f_p').value,message:$('#f_m').value,lang:LANG,district:DIST,contact:$('#f_c').value});
if(s===200)$('#fo').innerHTML=`<div class="alert">✅ ${esc(LANG==='en'?d.message_en:d.message_hi)}</div>`;else toast('❌ '+(d.error||'error'));};
}
function pAbout(){track('page_view');
app.innerHTML=`<div class="card"><h2>ℹ️ FARM.RAJ — ${hi('प्रस्तावित मंच','Proposed platform')}</h2>
<p><b>${hi('खेती की हर जानकारी, हर किसान के लिए।','All farming knowledge, for every farmer.')}</b></p>
<p>${hi('FARM.RAJ राजस्थान कृषि विभाग के पोर्टल सुधार हेतु प्रस्तावित किसान-मंच है (WebStudio / Vrajhna Technologies द्वारा)। यह मौजूदा राज किसान व जन आधार प्रणालियों के साथ जुड़कर आसान प्रवेश-द्वार बनेगा — रिकॉर्ड की आधिकारिक प्रणालियां वही रहेंगी।','FARM.RAJ is a proposed farmer platform for the Rajasthan agriculture portal revamp (by WebStudio / Vrajhna Technologies). It becomes the easy front door over existing Raj Kisan & Jan Aadhaar systems — which remain the systems of record.')}</p>
<h3>${hi('सरकार की 4 कमियां → हमारा समाधान','4 govt gaps → our answer')}</h3>
<div class="step">📱 ${hi('मोबाइल-फर्स्ट, हिंदी-प्रथम, PWA, आवाज़ व ऑडियो','Mobile-first, Hindi-first PWA with voice & audio')}</div>
<div class="step">🧭 ${hi('आसान योजना खोज + 2-मिनट पात्रता जांच','Easy scheme search + 2-min eligibility check')}</div>
<div class="step">🔐 SSO/${hi('जन आधार','Jan Aadhaar')} — <span class="badge b-orange">pending-authorization</span> ${hi('एडाप्टर तैयार, डेमो में सिंथेटिक पहचान','adapter ready, synthetic identity in demo')}</div>
<div class="step">📊 ${hi('अलग विभाग एनालिटिक्स + संरचित फीडबैक','Separate dept analytics + structured feedback')}</div>
<h3>${hi('तकनीक','Technology')}</h3><p class="kv">Node.js API • JSON DB (PostgreSQL-ready: /db/schema.sql) • PWA frontend (Angular migration map in docs) • ${hi('सर्वर-साइड रहस्य, दर-सीमा, ऑडिट लॉग','server-side secrets, rate limits, audit logs')}</p>
<p><a class="btn sec" href="/pitch" data-link>📑 Pitch deck</a> <a class="btn sec" href="/analytics" data-link>📊 Analytics</a></p></div>`;
}

/* ---------- ADMIN / ANALYTICS / PITCH ---------- */
async function pAdmin(sub){track('page_view');
if(!ADMIN){app.innerHTML=`<div class="card"><h2>🔐 ${hi('विभाग लॉगिन (डेमो)','Department login (demo)')}</h2><div class="alert">🧪 ${hi('डेमो पासवर्ड: admin123 — उत्पादन में Rajasthan SSO से बदलेगा।','Demo password: admin123 — replaced by Rajasthan SSO in production.')}</div>
<label>${hi('भूमिका','Role')}</label><select id="a_r"><option>super-admin</option><option>dept-admin</option><option selected>content-editor</option><option>reviewer</option><option>district-officer</option><option>analytics-viewer</option></select>
<label>Password</label><input id="a_p" type="password" value="admin123"><button class="btn" onclick="adminLogin()">${hi('लॉगिन','Login')}</button></div>`;
window.adminLogin=async()=>{const {s,d}=await api('POST','/api/admin/login',{password:$('#a_p').value,role:$('#a_r').value});if(s===200){ADMIN=d.token;ADMINROLE=d.role;localStorage.setItem('fr-admin',ADMIN);localStorage.setItem('fr-admin-role',ADMINROLE);pAdmin();}else toast('❌ invalid');};return;}
window.adminLogin=window.adminLogin||(async()=>{});
const sec=sub||'dashboard';
let ov={};try{ov=(await api('GET','/api/admin/overview',null,ADMIN)).d;}catch(e){}
let html=`<div class="card"><h2>🔐 ${hi('विभाग पोर्टल','Department portal')} <span class="badge b-green">${esc(ADMINROLE)}</span> <button class="chip" onclick="localStorage.removeItem('fr-admin');ADMIN=null;go('/admin')">${hi('लॉगआउट','Logout')}</button></h2>
<div class="chips">${['dashboard','content','schemes','chatbot','analytics','feedback','users','audit-logs','settings'].map(x=>`<button class="chip ${sec===x?'on':''}" onclick="go('/admin/${x}')">${x}</button>`).join('')}</div>
<div class="kv">📚 ${ov.lessons||0} lessons • 🏛️ ${ov.schemes||0} schemes • 💬 ${ov.feedback||0} feedback • 📄 ${ov.docs||0} docs • 📊 ${ov.events||0} events</div><div id="adm"></div></div>`;
app.innerHTML=html;const A=$('#adm');
if(sec==='dashboard'){A.innerHTML=`<h3>${hi('भूमिकाएं','Roles')}</h3><table><tr><th>Role</th><th>n</th></tr>${(ov.users||[]).map(u=>`<tr><td>${u.role}</td><td>${u.n}</td></tr>`).join('')}</table><p><a class="btn sec" href="/analytics" data-link>📊 ${hi('एनालिटिक्स खोलें','Open analytics')}</a></p>`;}
if(sec==='content'){A.innerHTML=`<h3>➕ ${hi('नई सामग्री (ड्राफ्ट → समीक्षा → प्रकाशन)','New content (draft → review → publish)')}</h3>
<label>Kind</label><select id="c_k"><option value="lesson">lesson</option><option value="scheme">scheme</option></select>
<label>${hi('शीर्षक (हिंदी)','Title (Hindi)')}</label><input id="c_h"><label>Title (English)</label><input id="c_e"><label>${hi('विवरण/लाभ','Body/benefit')}</label><textarea id="c_b" rows="3"></textarea>
<button class="btn" onclick="pubContent()">${hi('ड्राफ्ट सहेजें','Save draft')}</button><div id="co"></div>`;
window.pubContent=async()=>{const k=$('#c_k').value;const {d}=await api('POST','/api/admin/content',{kind:k,title_hi:$('#c_h').value,title_en:$('#c_e').value,text_hi:$('#c_b').value,benefit_hi:$('#c_b').value,benefit_en:$('#c_b').value,name_hi:$('#c_h').value,name_en:$('#c_e').value},ADMIN);$('#co').innerHTML='<div class="alert">✅ Draft saved: '+esc(d.lesson?d.lesson.id:d.scheme.id)+'</div>';};}
if(sec==='feedback'){const {d}=await api('GET','/api/feedback',null,ADMIN);A.innerHTML=`<h3>💬 Feedback (${(d.feedback||[]).length})</h3>`+((d.feedback||[]).slice(0,20).map(f=>`<div class="lesson"><b>${esc(f.type)}</b> <span class="badge b-grey">${esc(f.status)}</span><p>${esc(f.message)}</p><div class="kv"><span>${esc(f.ts)}</span><span>${esc(f.page)}</span></div></div>`).join('')||'<p>—</p>');}
if(sec==='analytics'){go('/analytics');return;}
if(sec==='audit-logs'||sec==='audit'){const {d}=await api('GET','/api/admin/audit',null,ADMIN);A.innerHTML=`<h3>🧾 Audit log</h3><table><tr><th>Time</th><th>Actor</th><th>Action</th></tr>${(d.audit||[]).slice(0,30).map(a=>`<tr><td>${esc(a.ts.slice(0,19))}</td><td>${esc(a.actor)}</td><td>${esc(a.action)}</td></tr>`).join('')}</table>`;}
if(sec==='schemes'){const {d}=await api('GET','/api/schemes');A.innerHTML=`<h3>🏛️ Scheme records (${d.count}) <span class="badge b-grey">rules ${esc(d.rulesVersion)}</span></h3><table><tr><th>ID</th><th>Type</th><th>Source</th><th>Updated</th></tr>${d.schemes.map(s=>`<tr><td><a href="/schemes/${s.id}" data-link>${esc(s.id)}</a></td><td>${s.type}</td><td>${esc(s.source)}</td><td>${esc(s.updated)}</td></tr>`).join('')}</table><p><a class="btn sec" href="/admin/content" data-link>➕ New scheme draft</a></p>`;}
if(sec==='chatbot'){const {d}=await api('GET','/api/analytics/summary');const recent=(d.recent||[]).filter(e=>e.event==='chat_question').slice(0,15);A.innerHTML=`<h3>🤖 Chatbot — recent questions (${d.chatQuestions})</h3>`+(recent.map(e=>`<div class="step">${esc(e.q||e.page||'')} <span class="badge b-grey">${esc(e.lang||'')}</span></div>`).join('')||'<p>—</p>')+`<p class="kv">Ratings: 👍 ${d.byEvent&&d.byEvent.chat_rating||0} events • Escalation rule: low-confidence → 1800-180-1551</p>`;}
if(sec==='users'){A.innerHTML=`<h3>👥 ${hi('भूमिकाएं व उपयोगकर्ता','Roles & users')} (demo)</h3><table><tr><th>Role</th><th>n</th><th>Can</th></tr>${(ov.users||[]).map(u=>`<tr><td>${u.role}</td><td>${u.n}</td><td>${/admin/.test(u.role)?'approve+publish':/editor/.test(u.role)?'draft+edit':/review/.test(u.role)?'review':'view'}</td></tr>`).join('')}</table><div class="alert">🔐 Production: Rajasthan SSO-backed identities replace demo roles.</div>`;}
if(sec==='settings'){A.innerHTML=`<h3>⚙️ Settings (demo)</h3><div class="step"><b>Rules version:</b> eligibility-rules v1.0</div><div class="step"><b>Integrations:</b> SSO / Jan Aadhaar / Raj Kisan — <span class="badge b-orange">pending-authorization</span></div><div class="step"><b>Uploads:</b> PDF/JPG/PNG ≤5MB, private store, AV-vendor pending</div><div class="step"><b>Languages:</b> हिंदी, English, मारवाड़ी, बागड़ी, मेवाड़ी, ढूंढाड़ी, हाड़ौती, मेवाती (dialect packs v1, community review pending)</div><div class="step"><b>Retention:</b> feedback 3y, uploads per dept policy, audit log 5y</div>`;}
}
async function pAnalytics(){track('page_view');
const {d}=await api('GET','/api/analytics/summary');
app.innerHTML=`<div class="card"><h2>📊 ${hi('परिचालन एनालिटिक्स (अधिकृत)','Operational analytics (authorized)')}</h2>
<div class="alert">🧪 ${hi('Seeded demo events','Seeded demo events')}: <b>${d.seededDemo}</b> • Live: <b>${d.live}</b> • ${hi('कुल','Total')}: <b>${d.total}</b> — ${hi('डेमो व लाइव स्पष्ट अलग। व्यक्तिगत किसान डेटा नहीं।','Demo vs live separated. No personal farmer data.')}</div>
<div class="kv"><span>💬 chat: <b>${d.chatQuestions}</b></span><span>✅ eligibility: <b>${d.eligibilityChecks}</b></span><span>📝 feedback: <b>${d.feedbackCount}</b></span></div>
<h3>${hi('पेज उपयोग','Page usage')}</h3><canvas class="chart" id="ch1" width="600" height="220"></canvas>
<h3>${hi('इवेंट','Events')}</h3><table><tr><th>Event</th><th>n</th></tr>${Object.entries(d.byEvent||{}).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${v}</td></tr>`).join('')}</table>
<h3>${hi('भाषा','Language')}</h3><p class="kv">${Object.entries(d.byLang||{}).map(([k,v])=>`${k}: ${v}`).join(' • ')}</p></div>`;
const c=$('#ch1'),x=c.getContext('2d');const entries=Object.entries(d.byPage||{});const mx=Math.max(1,...entries.map(e=>e[1]));
x.fillStyle='#1B5E20';entries.slice(0,8).forEach((e,i)=>{const h=e[1]/mx*150;x.fillRect(20+i*70,180-h,44,h);x.fillStyle='#212121';x.fillText(e[0].slice(0,8),20+i*70,196);x.fillText(e[1],30+i*70,170-h);x.fillStyle='#1B5E20';});
}
function pPitch(){track('page_view');
const slides=[
['🌾 FARM.RAJ','खेती की हर जानकारी, हर किसान के लिए।','Farmer-first front door for Rajasthan agriculture • WebStudio/Vrajhna Technologies • Rajasthan Innovation Challenge'],
['🎯 सरकार की 4 कमियां','1. खराब मोबाइल अनुभव 2. योजना खोज कठिन 3. SSO/स्थिति नहीं 4. एनालिटिक्स/फीडबैक नहीं','→ एक ही मंच पर चारों का समाधान'],
['📱 किसान अनुभव','मोबाइल PWA • हिंदी-प्रथम • आवाज़ + ऑडियो • बड़ा टेक्स्ट • लो-बैंडविड्थ','6 बड़े बटन: सीखें • योजनाएं • सहायक • लाइब्रेरी • मौसम-मंडी • मेरी खेती'],
['📚 शिक्षा + 📖 लाइब्रेरी','16+ पाठ (मिट्टी-बीज-सिंचाई-जैविक-पशु-यंत्र) • गाइड/वीडियो/ऑडियो • खोज + श्रेणी','सत्यापित स्रोत, ऑडियो पाठ, संबंधित पाठ'],
['🏛️ योजना खोज इंजन','16 राजस्थान+केंद्र योजनाएं • फिल्टर • पात्रता नियम v1.0 • दस्तावेज़ • आधिकारिक लिंक','गारंटी कभी नहीं • स्रोत + तिथि हर योजना पर'],
['🤖 AI कृषि सहायक','हिंदी Q&A • आवाज़ • स्रोत सहित उत्तर • रेटिंग • 1800-180-1551 एस्केलेशन','सर्वर-साइड की • दर-सीमा • असत्यापित खुराक कभी नहीं'],
['🔐 SSO / जन आधार','एडाप्टर तैयार (OAuth/OIDC) • PENDING-AUTHORIZATION स्पष्ट','डेमो में सिंथेटिक पहचान • असली लॉगिन का दिखावा नहीं'],
['🔐 दस्तावेज़ + 🧾 सेवाएं','PDF/JPG/PNG ≤5MB • हस्ताक्षर जांच • निजी स्टोर • ऑडिट','राज किसान ही रिकॉर्ड-सिस्टम • FARM.RAJ फ्रंट-डोर'],
['📊 CMS + एनालिटिक्स','भूमिका-आधारित CMS • ड्राफ्ट→समीक्षा→प्रकाशन • संस्करण','पेज/योजना/चैट/फीडबैक माप • डेमो-लाइव अलग'],
['🛡️ सुरक्षा + 🚀 तैनाती','RBAC • वैलिडेशन • XSS/CSRF/दर-सीमा • हेडर • रहस्य सर्वर पर','Node + JSON DB (PostgreSQL-रेडी) • PWA • /docs में रनबुक'],
['✅ कल का डेमो (16 चरण)','होम → भाषा → पाठ → योजना → पात्रता → चैट → सेवाएं → डेमो लॉगिन → दस्तावेज़ → विभाग → एनालिटिक्स → CMS → फीडबैक','कोई डेड बटन नहीं • हर रिकॉर्ड स्रोत सहित'],
];
app.innerHTML=`<div class="card"><h2>📑 FARM.RAJ — Government Pitch Deck (11 slides)</h2><button class="btn sec" onclick="window.print()">🖨 Print / Save PDF</button>
${slides.map((s,i)=>`<div class="card" style="border-top:6px solid var(--green2)"><h3>Slide ${i+1}. ${esc(s[0])}</h3><p><b>${esc(s[1])}</b></p><p>${esc(s[2])}</p></div>`).join('')}</div>`;
}

/* ---------- ROUTER ---------- */
const EDU_SLUGS={'crops':'crops','soil':'soil','seeds':'seeds','irrigation':'irrigation','organic-farming':'organic','livestock':'livestock','machinery':'machinery','pest-management':'pest','harvesting':'harvest','business':'business','rajasthan-heritage':'history','heritage':'history'};
async function route(){chrome();window.scrollTo(0,0);
const path=location.pathname, q=new URLSearchParams(location.search);
try{
if(path==='/')return pHome();
if(path==='/education')return pEdu(q);
if(path.startsWith('/education/')){const s=path.split('/')[2];if(EDU_SLUGS[s]){const nq=new URLSearchParams({cat:EDU_SLUGS[s]});return pEdu(nq);}return pLesson(s);}
if(path==='/schemes')return pSchemes(q);
if(path==='/schemes/eligibility')return pElig();
if(path==='/schemes/finder')return pFinder();
if(path==='/schemes/rajasthan')return pSchemes(new URLSearchParams({type:'state'}));
if(path==='/schemes/central')return pSchemes(new URLSearchParams({type:'central'}));
if(path.startsWith('/schemes/'))return pScheme(path.split('/')[2]);
if(path==='/chat')return pChat();
if(path==='/library')return pLib(q);
if(path==='/library/videos')return pLib(new URLSearchParams({kind:'video'}));
if(path==='/library/guides')return pLib(new URLSearchParams({kind:'guide'}));
if(path.startsWith('/library/'))return pLib(q);
if(path==='/weather')return pWeather();
if(path==='/mandi')return pMandi();
if(path==='/crop-calendar')return pCal();
if(path==='/soil')return pSoil();
if(path==='/pest-help')return pPest();
if(path==='/crop-doctor')return pDoctor();
if(path==='/livestock')return pLivestock();
if(path==='/marketplace')return pMarket();
if(path==='/my-farm')return pMyFarm();
if(path==='/my-farm/documents')return pMyFarm('documents');
if(path.startsWith('/my-farm/'))return pMyFarm();
if(path==='/services')return pServices();
if(path==='/services/application-status')return pServices('application-status');
if(path==='/feedback')return pFeedback();
if(path==='/about')return pAbout();
if(path==='/admin')return pAdmin('dashboard');
if(path.startsWith('/admin/'))return pAdmin(path.split('/')[2]);
if(path==='/analytics')return pAnalytics();
if(path==='/pitch')return pPitch();
app.innerHTML=`<div class="card"><h2>404</h2><p>${hi('पेज नहीं मिला','Page not found')}</p><a class="btn" href="/" data-link>🏠 ${hi('होम','Home')}</a></div>`;
}catch(e){console.error(e);app.innerHTML='<div class="card"><h2>Error</h2><p>'+esc(e.message)+'</p></div>';}
}
window.addEventListener('popstate',route);
chrome();route();
