var WA="",P=[];
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var fmt=function(n){return "\u20A6"+Number(n).toLocaleString("en-NG")};
var cart={},wish={},cat="All",q="";
try{cart=JSON.parse(localStorage.getItem("kh-cart"))||{};wish=JSON.parse(localStorage.getItem("kh-wish"))||{}}catch(e){}
function save(){try{localStorage.setItem("kh-cart",JSON.stringify(cart));localStorage.setItem("kh-wish",JSON.stringify(wish))}catch(e){}}
function card(p){var d=p.old>p.price?Math.round((1-p.price/p.old)*100):0;
 return '<div class="card">'+(d?'<span class="badge">-'+d+'%</span>':'')+'<button class="heart" type="button" data-w="'+p.id+'" aria-pressed="'+!!wish[p.id]+'" aria-label="Save '+esc(p.name)+' to wishlist">&#9829;</button>'+(p.image?'<div class="ph"><img src="'+esc(p.image)+'" alt="'+esc(p.name)+'" loading="lazy"></div>':'<div class="ph" aria-hidden="true">'+esc(p.name.charAt(0))+'</div>')+'<h3>'+esc(p.name)+'</h3><span class="cat">'+esc(p.cat||'')+'</span><span class="price">'+fmt(p.price)+(d?'<s>'+fmt(p.old)+'</s>':'')+'</span><div class="acts"><button class="add" type="button" data-a="'+p.id+'">Add</button><button class="qv" type="button" data-v="'+p.id+'">Quick view</button></div></div>'}
function draw(){
 var cats=["All"];P.forEach(function(p){if(p.cat&&cats.indexOf(p.cat)<0)cats.push(p.cat)});
 $("cats").innerHTML=cats.map(function(c){return '<button class="chip" type="button" data-c="'+esc(c)+'" aria-pressed="'+(c===cat)+'">'+esc(c)+'</button>'}).join("");
 var l=P.filter(function(p){return(cat==="All"||p.cat===cat)&&(p.name+" "+p.desc+" "+(p.cat||"")).toLowerCase().indexOf(q)>-1});
 $("grid").innerHTML=l.map(card).join("")||'<p class="empty">No products found.</p>';
 var o=P.filter(function(p){return p.old>p.price});$("offers").hidden=!o.length;$("offrow").innerHTML=o.map(card).join("");
}
function render(){
 var t=0,c=0,h="";
 Object.keys(cart).forEach(function(k){var p=P.filter(function(x){return x.id===k})[0];if(!p||cart[k]<1)return;t+=p.price*cart[k];c+=cart[k];
  h+='<div class="line"><span>'+esc(p.name)+'<br><small>'+fmt(p.price)+'</small></span><span class="qty"><button type="button" data-d="-1" data-id="'+k+'" aria-label="Remove one '+esc(p.name)+'">&minus;</button> '+cart[k]+' <button type="button" data-d="1" data-id="'+k+'" aria-label="Add one '+esc(p.name)+'">+</button></span></div>'});
 $("items").innerHTML=h||"<p>Your cart is empty.</p>";$("total").textContent=fmt(t);$("count").textContent=c;save();
}
function toggle(o){$("drawer").classList.toggle("open",o);$("drawer").setAttribute("aria-hidden",!o)}
var cur=null;
document.addEventListener("click",function(e){
 var b=e.target.closest("button");if(!b)return;
 if(b.dataset.a){cart[b.dataset.a]=(cart[b.dataset.a]||0)+1;render()}
 if(b.dataset.d){cart[b.dataset.id]=Math.max(0,(cart[b.dataset.id]||0)+Number(b.dataset.d));render()}
 if(b.dataset.c){cat=b.dataset.c;draw()}
 if(b.dataset.w){wish[b.dataset.w]=!wish[b.dataset.w];save();draw()}
 if(b.dataset.v){cur=P.filter(function(x){return x.id===b.dataset.v})[0];$("qn").textContent=cur.name;$("qc").textContent=cur.cat||"";$("qd").textContent=cur.desc;$("qp").textContent=fmt(cur.price);$("qvd").showModal()}
});
$("qa").onclick=function(){if(cur){cart[cur.id]=(cart[cur.id]||0)+1;render()}$("qvd").close();toggle(true)};
$("qx").onclick=function(){$("qvd").close()};
$("q").oninput=function(){q=this.value.trim().toLowerCase();draw()};
$("open").onclick=$("open2").onclick=function(){toggle(true)};$("close").onclick=function(){toggle(false)};
document.addEventListener("keydown",function(e){if(e.key==="Escape")toggle(false)});
function setLinks(){
 var wl="https://wa.me/"+WA+"?text="+encodeURIComponent("Hello, I have a question about your products.");
 $("wa2").href=wl;$("sellink").href="https://wa.me/"+WA+"?text="+encodeURIComponent("Hello, I would like to sell my products on your website.");
}
$("order").onclick=function(){
 var ln=[],t=0;P.forEach(function(p){var n=cart[p.id]||0;if(n>0){ln.push(n+" x "+p.name+" - "+fmt(p.price*n));t+=p.price*n}});
 if(!ln.length){$("msg").textContent="Add at least one product first.";return}
 if(!$("nm").value.trim()||!$("ph").value.trim()||!$("ad").value.trim()){$("msg").textContent="Enter your name, phone number and delivery address.";return}
 var m="New order KH-"+Date.now().toString(36).toUpperCase()+"\n"+ln.join("\n")+"\nTotal: "+fmt(t)+"\nName: "+$("nm").value.trim()+"\nPhone: "+$("ph").value.trim()+"\nAddress: "+$("ad").value.trim();
 $("msg").textContent="";window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(m),"_blank");
};
// hero carousel
var sl=document.querySelectorAll(".slide"),i=0,tm;
$("dots").innerHTML=[].map.call(sl,function(_,n){return '<button type="button" data-s="'+n+'" aria-label="Show slide '+(n+1)+'"></button>'}).join("");
function show(n){i=n;sl.forEach(function(s,k){s.classList.toggle("on",k===n)});[].forEach.call($("dots").children,function(d,k){d.setAttribute("aria-current",k===n)})}
$("dots").onclick=function(e){var b=e.target.closest("button");if(b){show(+b.dataset.s);clearInterval(tm)}};
show(0);
if(!window.matchMedia("(prefers-reduced-motion:reduce)").matches)tm=setInterval(function(){show((i+1)%sl.length)},6000);
// load products from products.json
fetch("products.json").then(function(r){return r.json()}).then(function(D){WA=D.wa;P=D.products.map(function(p,i){p.id=p.id||(p.name||"p"+i).toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-"+i;return p});setLinks();draw();render()}).catch(function(){$("grid").innerHTML='<p class="empty">Could not load products. Run the site through a web server (see README).</p>'});
