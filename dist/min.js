const utils=()=>{let e=0;try{e=document}catch(t){e={}}const{documentElement:t=0,head:r=0,body:a=0}=e,{log:s,warn:n}=console,i=()=>{},o=e=>{try{return JSON.parse(e)}catch(t){return e}},l=e=>{try{return e.constructor}catch(e){return}},d=(e,t)=>l(e)===t,c=(e,t,r=" ")=>{e&&t&&(e=d(e,String)?e.split(r):e).forEach(e=>e&&t(e))},h=(e,t)=>{if(t=d(t,Object)?[t]:t,!e||!t)throw s("a",JSON.stringify(e)),s("b",JSON.stringify(t)),s("========"),new Error("MergeError");return t.forEach(t=>{Object.keys(t).forEach(r=>{s("c",JSON.stringify(t)),e[r]=d(t[r],Object)?h(Object.assign({},e[r]),t[r]):t[r]})}),e},p=(e,t)=>Object.keys(e).map(r=>{const a=t?`${t}[${r}]`:r;return e[r]=d(e[r],Array)?`[${e[r]}]`:e[r],d(e[r],Object)?p(e[r],a):`${a}=${e[r]}`}).join("&"),u=()=>{let s=!1;try{a.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>{s={passive:!0}}}))}catch(e){}const n=(e,t=document)=>[...t.querySelectorAll(e)],i=(t,r)=>{t&&r&&(d(t,Array)?e=t:d(t,String)?e=n(t):d(t,HTMLElement)||window?e=[t]:d(t,NodeList)&&(e=[...t]),e.forEach(e=>e&&r(e)))},o=(e,t,r)=>{e&&t&&r&&i(e,e=>c(t,t=>e&&t&&r(e,t)))},l=(e,t)=>new RegExp(` ${t} `).test(` ${e.className} `),h=(t,r)=>{o(t,r,(t,r)=>{e=t.classList?t.classList.add(r):t.className+=` ${r}`})},p=(t,r)=>{o(t,r,(t,r)=>{e=t.classList?t.classList.remove(r):t.className=t.className.split(r).join("")})},u=()=>({w:window.innerWidth||t.clientWidth||a.clientWidth||0,h:window.innerHeight||t.clientHeight||a.clientHeight||0}),m=function(){this.version="1.3.4";var e={mergeCDATA:!0,grokAttr:!0,grokText:!0,normalize:!0,xmlns:!0,namespaceKey:"_ns",textKey:"_text",valueKey:"_value",attrKey:"_attr",cdataKey:"_cdata",attrsAsObject:!0,stripAttrPrefix:!0,stripElemPrefix:!0,childrenAsArray:!0},t=new RegExp(/(?!xmlns)^.*:/),r=new RegExp(/^\s+|\s+$/g);return this.grokType=function(e){return/^\s*$/.test(e)?null:/^(?:true|false)$/i.test(e)?"true"===e.toLowerCase():isFinite(e)?parseFloat(e):e},this.parseString=function(e,t){return this.parseXML(this.stringToXML(e),t)},this.parseXML=function(a,s){for(var n in s)e[n]=s[n];var i={},o=0,l="";if(e.xmlns&&a.namespaceURI&&(i[e.namespaceKey]=a.namespaceURI),a.attributes&&a.attributes.length>0){for(var d={};o<a.attributes.length;o++){var c,h=a.attributes.item(o);y={},c=e.stripAttrPrefix?h.name.replace(t,""):h.name,e.grokAttr?y[e.valueKey]=this.grokType(h.value.replace(r,"")):y[e.valueKey]=h.value.replace(r,""),e.xmlns&&h.namespaceURI&&(y[e.namespaceKey]=h.namespaceURI),e.attrsAsObject?d[c]=y:i[e.attrKey+c]=y}e.attrsAsObject&&(i[e.attrKey]=d)}if(a.hasChildNodes())for(var p,u,y,f=0;f<a.childNodes.length;f++)4===(p=a.childNodes.item(f)).nodeType?e.mergeCDATA?l+=p.nodeValue:i.hasOwnProperty(e.cdataKey)?(i[e.cdataKey].constructor!==Array&&(i[e.cdataKey]=[i[e.cdataKey]]),i[e.cdataKey].push(p.nodeValue)):e.childrenAsArray?(i[e.cdataKey]=[],i[e.cdataKey].push(p.nodeValue)):i[e.cdataKey]=p.nodeValue:3===p.nodeType?l+=p.nodeValue:1===p.nodeType&&(0===o&&(i={}),u=e.stripElemPrefix?p.nodeName.replace(t,""):p.nodeName,y=m.parseXML(p),i.hasOwnProperty(u)?(i[u].constructor!==Array&&(i[u]=[i[u]]),i[u].push(y)):(e.childrenAsArray?(i[u]=[],i[u].push(y)):i[u]=y,o++));else l||(e.childrenAsArray?(i[e.textKey]=[],i[e.textKey].push(null)):i[e.textKey]=null);if(l)if(e.grokText){var g=this.grokType(l.replace(r,""));null!=g&&(i[e.textKey]=g)}else e.normalize?i[e.textKey]=l.replace(r,"").replace(/\s+/g," "):i[e.textKey]=l.replace(r,"");return i},this.xmlToString=function(e){try{return e.xml?e.xml:(new XMLSerializer).serializeToString(e)}catch(e){return null}},this.stringToXML=function(e){try{var t=null;return window.DOMParser?t=(new DOMParser).parseFromString(e,"text/xml"):((t=new ActiveXObject("Microsoft.XMLDOM")).async=!1,t.loadXML(e),t)}catch(e){return null}},this}.call({});"undefined"!=typeof module&&null!==module&&module.exports?module.exports=m:"function"==typeof define&&define.amd&&define(function(){return m});return{one:(e,t=document)=>t.querySelector(e),all:n,rm:e=>e&&e.parentNode.removeChild(e),eachNode:i,eachNodeAndText:o,hasClass:l,addClass:h,removeClass:p,toggleClass:(t,r)=>{o(t,r,(t,r)=>{e=l(t,r)?p(t,r):h(t,r)})},getScroll:()=>({x:window.scrollX||window.scrollLeft||0,y:window.scrollY||window.scrollTop||0}),getViewport:u,isElementInViewport:t=>(e=t.getBoundingClientRect())&&e.top>=0&&e.left>=0&&e.right<=u().w&&e.bottom<=u().h,wrapDOM:(e,t)=>e.parentNode.insertBefore(t,e)&&t.appendChild(e),xmlToObject:m,xmlToString:e=>e.xml||(new XMLSerializer).serializeToString(e),stringToXML:e=>(new DOMParser).parseFromString(e,"text/xml"),stringToDOM:t=>(e=document.createElement("div"))&&(e.innerHTML=t)&&e.firstChild,jsonp:e=>{const t=document.createElement("script");r.appendChild(t),t.src=e,t.parentNode.removeChild(t)},addCSS:e=>{const t=document.createElement("style");r.appendChild(t),t.appendChild(document.createTextNode(e))},off:(t,r,a,n=s)=>{o(t,r,(t,r)=>{e=t.removeEventListener?t.removeEventListener(r,a,n):void 0,e=t.detachEvent?t.detachEvent(`on${r}`,a):void 0})},on:(t,r,a,n=s)=>{o(t,r,(t,r)=>{e=t.addEventListener?t.addEventListener(r,a,n):void 0,e=t.attachEvent?t.attachEvent(`on${r}`,a):void 0})}}};try{window.runDefer=((e=1e3,t=0,r=99,a=1,s=i,o=i)=>{try{for(s=window.defer||[];s.length;)o=(o=s[s.length-1])&&o(),s.pop()}catch(s){t>=r&&n(`${String(t).padStart(3)} > MAX`),setTimeout(()=>{window.runDefer(e,++t,((e,t)=>{e>=a&&n(`${String(e).padStart(3)} > ${t.stack}`)})(t,s))},e)}}),window.runDefer()}catch(e){}return h({noop:i,val:o,getType:l,is:d,eachText:c,merge:h,objectToQueryString:p,queryStringToObject:e=>(e=e||window&&window.location.search.substr(1),d(e,String)&&e.split("&").map(e=>e.split("=")).reduce((e,[t,r])=>(r=d(o(r),String)?`"${r}"`:r,t=t&&r?t.split(/\[|\]/g).filter(e=>e).reverse().reduce((e,t)=>`{"${t}":${e||r}}`,""):{},h(e,o(t))),{}))},void 0===typeof window?{}:[u(),(()=>{const{one:e,all:t,rm:r,stringToDOM:s,wrapDOM:n,isElementInViewport:o,hasClass:l,addClass:d,removeClass:c,off:h,on:p}=u(),m=class{constructor(t={},s=i,n=i){window.eKbd=(e=>{27===e.keyCode&&this.close(!0)});const o=document.createElement("div");this.id=t.id||`Modal_${(new Date).getTime()}`,this.className=t.className||"",this.header=t.header||"Header",this.body=t.body||"Body goes here",this.onClose=t.onClose||s,this.callback=t.callback||n,this.close=((t=!1)=>{(!t||!1!==this.onClose&&!1!==this.onClose())&&(h(document,"keydown",window.eKbd),window.eKbd=void 0,r(e(`#${this.id}`)))}),this.close(),o.id=`${this.id}`,o.className=`Modal ${this.className}`,o.innerHTML=`\n                <h1 id='${this.id}_Header' class='header'>${this.header}</h1>\n                    <div id='${this.id}_Body' class='body'>\n                        <div>${this.body}</div>\n                    </div>\n                <button id='${this.id}_Close' class='close'>Close</button>\n                `,a.appendChild(o),p(document,"keydown",window.eKbd),p(e(`#${this.id}_Close`),"click",()=>{this.close(!0)}),this.callback()}},y=(e="img.lazyload",r="lazyload")=>{t(e).forEach(e=>{o(e)&&e.dataset.src&&0===e.src.indexOf("data:image")&&(e.src=e.dataset.src,e.dataset.src=void 0,c(e,r))})};return{DropZone:class{constructor(e,t){this.files=[],this.ctrl=e,this.face=t;const r=(e,t)=>{e.dataTXT&&e.dataB64&&(this.files.push(e),t(e))},a=(e,t=i,a=i)=>{let s=0;!1!==t(e,this.files)&&((s=new FileReader).onload=(e=>t=>{e.dataTXT=t.target.result,r(e,a)})(e),s.readAsText(e),(s=new FileReader).onload=(e=>t=>{e.dataB64=t.target.result,r(e,a)})(e),s.readAsDataURL(e))};this.fileHandler=((e,t,r)=>{"dragend"===e.type?e.dataTransfer.clearData():"drop"===e.type?[...e.dataTransfer.files].forEach(e=>{a(e,t,r)}):"change"===e.type&&([...e.target.files].forEach(e=>{a(e,t,r)}),e.target.value="")})}},Modal:m,Swipe:class{run(e,t){this.onUp=t.onUp||i,this.onDown=t.onDown||i,this.onLeft=t.onLeft||i,this.onRight=t.onRight||i,e=(e=e&&"touchstart"===e.type?(e=>{const{touches:[{clientX:t,clientY:r}]}=e;this.xA=t,this.yA=r})(e):e)&&"touchmove"===e.type?(e=>{const{touches:[{clientX:t,clientY:r}]}=e;if(this.xA&&this.yA){let e=this.xA-t,a=this.yA-r;Math.abs(e)<Math.abs(a)?a=a>0?this.onUp():this.onDown():e=e>0?this.onLeft():this.onRight(),this.xA=void 0,this.yA=void 0}})(e):e}},lazyLoad:y,interactiveMD:()=>{const r={find:(r,a)=>{const s=(a.tag||"").trim().toUpperCase(),n=a.className||"";let i=!0,o=0;for(r.tabIndex=-1;i&&(r=r.parentNode);)r.tagName===s&&(i=!1,d(r,n),"TABLE"===s&&l(r,"responsive")&&(o=t("tr",r),d(o,"row"),o=t("td,th",r),d(o,`col-sm-1 col-md-1-${o[0].parentNode.children.length}`),o=e("thead",r),d(o,"hide")))},wrap:(e,t)=>{const r=(t.tag||"").trim().toUpperCase(),a=t.className||"",i=t.attr||"",o=t.figcaption||e.alt||e.title||"",l=r.length?s(`<${r} ${i}></${r}>`):e;d(l,a),l!==e&&(n(e,l),"FIGURE"===r&&o.length&&l.appendChild(s(`<figcaption ${i}>${o}</figcaption>`)))},audio:(e,t)=>{const r=t.src||e.src||e.href||"",a=t.attr||"",n=s(`<audio src='${r}' ${a}></audio>`);e.parentNode.insertBefore(n,e),p(e,"click",e=>(e.preventDefault(),e=n.paused?n.play():n.pause(),!1),!1)},embed:(e,t)=>{const r=t.src||e.src||e.href||"",a=t.className||"embed ratio ratio-16-9",n=t.attr||'allowfullscreen frameborder="0"',i=r.toLowerCase().indexOf("youtube")>=0&&r.indexOf("?")<0?"?&autoplay=1&iv_load_policy=3&modestbranding=1&showinfo=0&rel=0&playsinline=1":"";d(e,a),p(e,"click",t=>(t.preventDefault(),c(e,"embed"),e.parentNode.replaceChild(s(`<span class='${a}'>\n                                <iframe src='${r}${i}' ${n}></iframe>\n                            </span>`),e),!1),!1)},modal:(e,t)=>{const r=t.src||e.src||e.href||"",a=t.body||e.innerHTML||"Body",s=t.header||"Header",n=t.className||"";p(e,"click",e=>(e.preventDefault(),e=new m({body:`${a}`,header:`<a target='_blank' href='${r}'>${s}</a>`,className:`${n}`}),y(),!1),!1)}},a=t("body [title]");let o=a.length,h=i,u=void 0;for(;o--;){try{u=(u=JSON.parse(a[o].title)).pop?u:[u]}catch(e){}for(;u.length&&(h=u.pop());)r[h[">"]](a[o],h),(a[o]||{}).title=""}}}})()])},u=utils();typeof window===u.noop()?module.exports=u:u.merge(window,u);