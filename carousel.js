/* Video carousel: one iframe, arrows, dots, auto-advance when a 1-minute video ends */
(function(){
var still=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
[].forEach.call(document.querySelectorAll(".carousel[data-items]"),function(c){
var v=JSON.parse(c.getAttribute("data-items")),i=0,timer=null,q=function(s){return c.querySelector(s)};
var f=q(".car-frame"),ti=q(".car-title"),me=q(".car-meta"),ln=q(".car-link"),d=q(".dots");
v.forEach(function(x,k){var b=document.createElement("button");b.className="dot";b.type="button";b.setAttribute("aria-label","Show video "+(k+1)+": "+x.t);b.onclick=function(){go(k,true)};d.appendChild(b)});
function go(k,user){i=(k+v.length)%v.length;var x=v[i];f.src=x.s;f.title="One-minute video: "+x.t;ti.textContent=x.t;
me.textContent=(x.m||"1-minute video")+" · "+(i+1)+" of "+v.length;
if(ln){if(x.l){ln.href=x.l;ln.textContent=x.lt;ln.hidden=false}else ln.hidden=true}
[].forEach.call(d.children,function(b,n){b.setAttribute("aria-current",n===i?"true":"false")});
if(user)stop();else start()}
function start(){stop();if(!still)timer=setTimeout(function(){go(i+1)},61000)}
function stop(){if(timer)clearTimeout(timer);timer=null}
q(".car-prev").onclick=function(){go(i-1,true)};q(".car-next").onclick=function(){go(i+1,true)};
go(0);});
})();
