const defaults={locations:{h:'H',ub:'UB',st:'ST'},minsHU:15,minsUS:15,journeys:[
{id:crypto.randomUUID(),p:'E',from:'H',to:'UB',time:'06:55',driver:'MK'},
{id:crypto.randomUUID(),p:'E',from:'UB',to:'ST',time:'08:15',driver:'MK'},
{id:crypto.randomUUID(),p:'J+R',from:'UB',to:'ST',time:'08:50',driver:'MK'},
{id:crypto.randomUUID(),p:'R',from:'H',to:'UB',time:'07:20',driver:'CY'},
{id:crypto.randomUUID(),p:'JO',from:'H',to:'UB',time:'08:10',driver:'CY'},
{id:crypto.randomUUID(),p:'M',from:'H',to:'UB',time:'08:45',driver:'CY'},
{id:crypto.randomUUID(),p:'M+JO',from:'UB',to:'ST',time:'09:35',driver:'CY'}]};
let state=JSON.parse(localStorage.getItem('transportSchedule')||'null')||defaults;
const $=id=>document.getElementById(id);
function save(){localStorage.setItem('transportSchedule',JSON.stringify(state));}
function toMin(t){let [h,m]=t.split(':').map(Number);return h*60+m;}
function toTime(m){m=((m%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');}
function tripMin(j){return (j.from===state.locations.h&&j.to===state.locations.ub)?state.minsHU:state.minsUS;}
function endTime(j){return toTime(toMin(j.time)+tripMin(j));}
function conflicts(){let bad=new Set();for(const d of ['MK','CY']){let js=state.journeys.filter(j=>j.driver===d).sort((a,b)=>toMin(a.time)-toMin(b.time));for(let i=0;i<js.length-1;i++){let a=js[i],b=js[i+1];let needed=toMin(a.time)+tripMin(a)+tripMin(a); if(needed>toMin(b.time)){bad.add(a.id);bad.add(b.id);}}}return bad;}
function render(){
 $('locH').value=state.locations.h; $('locUB').value=state.locations.ub; $('locST').value=state.locations.st;
 $('timeHU').textContent=state.minsHU+' min'; $('timeUS').textContent=state.minsUS+' min';
 let bad=conflicts();
 for(const d of ['MK','CY']){let list=$(d==='MK'?'mkList':'cyList');list.innerHTML='';state.journeys.filter(j=>j.driver===d).sort((a,b)=>toMin(a.time)-toMin(b.time)).forEach(j=>{let div=document.createElement('button');div.className='journey '+(bad.has(j.id)?'conflict':'');div.innerHTML=`<div class="time">${j.time}</div><div><div class="route">${j.from} → ${j.to}</div><div class="arrive">Arrive ${endTime(j)}</div></div><div class="bubble">${j.p}</div>`;div.onclick=()=>openJourney(j);list.appendChild(div);});}
 $('mkStatus').textContent=bad.size?'Check 🔴':'Available ✅'; $('cyStatus').textContent=bad.size?'Check 🔴':'Available ✅';
 $('warning').classList.toggle('hidden',bad.size===0); $('warning').textContent=bad.size?'Driver conflict: one driver does not have enough time to finish and return before the next trip.':'';
 save();
}
function openJourney(j=null,driver=null){$('journeyDialog').showModal();$('dialogTitle').textContent=j?'Edit Journey':'Add Journey';$('journeyId').value=j?.id||'';$('passengers').value=j?.p||'';$('fromLoc').value=j?.from||state.locations.h;$('toLoc').value=j?.to||state.locations.ub;$('leaveTime').value=j?.time||'09:00';$('driver').value=j?.driver||driver||'MK';$('deleteJourney').classList.toggle('hidden',!j);}
$('journeyForm').addEventListener('submit',e=>{e.preventDefault();let id=$('journeyId').value;let j={id:id||crypto.randomUUID(),p:$('passengers').value,from:$('fromLoc').value,to:$('toLoc').value,time:$('leaveTime').value,driver:$('driver').value}; if(id) state.journeys=state.journeys.map(x=>x.id===id?j:x); else state.journeys.push(j); $('journeyDialog').close();render();});
$('deleteJourney').onclick=()=>{state.journeys=state.journeys.filter(j=>j.id!==$('journeyId').value);$('journeyDialog').close();render();};
$('addJourney').onclick=()=>openJourney(); document.querySelectorAll('.add-driver').forEach(b=>b.onclick=()=>openJourney(null,b.dataset.driver));
function openSettings(){ $('setH').value=state.locations.h; $('setUB').value=state.locations.ub; $('setST').value=state.locations.st; $('setHU').value=state.minsHU; $('setUS').value=state.minsUS; $('settingsDialog').showModal();}
['settingsBtn','changeLocations','changeTimes'].forEach(id=>$(id).onclick=openSettings);
$('settingsForm').addEventListener('submit',e=>{e.preventDefault();let old={...state.locations};state.locations={h:$('setH').value||'H',ub:$('setUB').value||'UB',st:$('setST').value||'ST'};state.minsHU=Number($('setHU').value)||15;state.minsUS=Number($('setUS').value)||15;state.journeys.forEach(j=>{if(j.from===old.h)j.from=state.locations.h;if(j.to===old.h)j.to=state.locations.h;if(j.from===old.ub)j.from=state.locations.ub;if(j.to===old.ub)j.to=state.locations.ub;if(j.from===old.st)j.from=state.locations.st;if(j.to===old.st)j.to=state.locations.st;});$('settingsDialog').close();render();});
$('editBtn').onclick=()=>$('warning').classList.toggle('hidden');$('passengersBtn').onclick=()=>openJourney();$('resetBtn').onclick=()=>{if(confirm('Reset to the sample schedule?')){state=structuredClone(defaults);render();}};
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});}
render();