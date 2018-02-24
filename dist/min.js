const utils=()=>{let e=0;const{log:t,warn:r}=console,{documentElement:a,head:s,body:n}=document||{},o=()=>{},i=e=>{try{return JSON.parse(e)}catch(t){return e}},l=e=>{try{return e.constructor}catch(e){return}},d=(e,t)=>l(e)===t,c=(e,t,r=" ")=>{e&&t&&(e=d(e,String)?e.split(r):e).forEach(e=>e&&t(e))},h=(e,t)=>{if(t=d(t,Object)?[t]:t,!e||!t)throw new Error("MergeError");return t.forEach(t=>{Object.keys(t).forEach(r=>{e[r]=d(t[r],Object)?h(e[r]||{},t[r]):t[r]})}),e},p=(t,r)=>Object.keys(t).map(a=>(e=r?`${r}[${a}]`:a,t[a]=Array.isArray(t[a])?`[${t[a]}]`:t[a],"object"==typeof t[a]?p(t[a],e):`${e}=${t[a]}`)).join("&"),u=()=>{let t=!1;try{n.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>{t={passive:!0}}}))}catch(e){}const r=(e,t=document)=>[...t.querySelectorAll(e)],o=(t,a)=>{t&&a&&(d(t,Array)?e=t:d(t,String)?e=r(t):d(t,HTMLElement)||window?e=[t]:d(t,NodeList)&&(e=[...t]),e.forEach(e=>e&&a(e)))},i=(e,t,r)=>{e&&t&&r&&o(e,e=>c(t,t=>e&&t&&r(e,t)))},l=(e,t)=>new RegExp(` ${t} `).test(` ${e.className} `),h=(t,r)=>{i(t,r,(t,r)=>{e=t.classList?t.classList.add(r):t.className+=` ${r}`})},p=(t,r)=>{i(t,r,(t,r)=>{e=t.classList?t.classList.remove(r):t.className=t.className.split(r).join("")})},u=()=>({w:window.innerWidth||a.clientWidth||n.clientWidth||0,h:window.innerHeight||a.clientHeight||n.clientHeight||0}),m=function(){this.version="1.3.4";var e={mergeCDATA:!0,grokAttr:!0,grokText:!0,normalize:!0,xmlns:!0,namespaceKey:"_ns",textKey:"_text",valueKey:"_value",attrKey:"_attr",cdataKey:"_cdata",attrsAsObject:!0,stripAttrPrefix:!0,stripElemPrefix:!0,childrenAsArray:!0},t=new RegExp(/(?!xmlns)^.*:/),r=new RegExp(/^\s+|\s+$/g);return this.grokType=function(e){return/^\s*$/.test(e)?null:/^(?:true|false)$/i.test(e)?"true"===e.toLowerCase():isFinite(e)?parseFloat(e):e},this.parseString=function(e,t){return this.parseXML(this.stringToXML(e),t)},this.parseXML=function(a,s){for(var n in s)e[n]=s[n];var o={},i=0,l="";if(e.xmlns&&a.namespaceURI&&(o[e.namespaceKey]=a.namespaceURI),a.attributes&&a.attributes.length>0){for(var d={};i<a.attributes.length;i++){var c,h=a.attributes.item(i);m={},c=e.stripAttrPrefix?h.name.replace(t,""):h.name,e.grokAttr?m[e.valueKey]=this.grokType(h.value.replace(r,"")):m[e.valueKey]=h.value.replace(r,""),e.xmlns&&h.namespaceURI&&(m[e.namespaceKey]=h.namespaceURI),e.attrsAsObject?d[c]=m:o[e.attrKey+c]=m}e.attrsAsObject&&(o[e.attrKey]=d)}if(a.hasChildNodes())for(var p,u,m,y=0;y<a.childNodes.length;y++)4===(p=a.childNodes.item(y)).nodeType?e.mergeCDATA?l+=p.nodeValue:o.hasOwnProperty(e.cdataKey)?(o[e.cdataKey].constructor!==Array&&(o[e.cdataKey]=[o[e.cdataKey]]),o[e.cdataKey].push(p.nodeValue)):e.childrenAsArray?(o[e.cdataKey]=[],o[e.cdataKey].push(p.nodeValue)):o[e.cdataKey]=p.nodeValue:3===p.nodeType?l+=p.nodeValue:1===p.nodeType&&(0===i&&(o={}),u=e.stripElemPrefix?p.nodeName.replace(t,""):p.nodeName,m=xmlToJSON.parseXML(p),o.hasOwnProperty(u)?(o[u].constructor!==Array&&(o[u]=[o[u]]),o[u].push(m)):(e.childrenAsArray?(o[u]=[],o[u].push(m)):o[u]=m,i++));else l||(e.childrenAsArray?(o[e.textKey]=[],o[e.textKey].push(null)):o[e.textKey]=null);if(l)if(e.grokText){var f=this.grokType(l.replace(r,""));null!=f&&(o[e.textKey]=f)}else e.normalize?o[e.textKey]=l.replace(r,"").replace(/\s+/g," "):o[e.textKey]=l.replace(r,"");return o},this.xmlToString=function(e){try{return e.xml?e.xml:(new XMLSerializer).serializeToString(e)}catch(e){return null}},this.stringToXML=function(e){try{var t=null;return window.DOMParser?t=(new DOMParser).parseFromString(e,"text/xml"):((t=new ActiveXObject("Microsoft.XMLDOM")).async=!1,t.loadXML(e),t)}catch(e){return null}},this}.call({});"undefined"!=typeof module&&null!==module&&module.exports?module.exports=xmlToJSON:"function"==typeof define&&define.amd&&define(function(){return xmlToJSON});return window&&document?{one:(e,t=document)=>t.querySelector(e),all:r,rm:e=>e&&e.parentNode.removeChild(e),eachNode:o,eachNodeAndText:i,hasClass:l,addClass:h,removeClass:p,toggleClass:(t,r)=>{i(t,r,(t,r)=>{e=l(t,r)?p(t,r):h(t,r)})},getScroll:()=>({x:window.scrollX||window.scrollLeft||0,y:window.scrollY||window.scrollTop||0}),getViewport:u,isElementInViewport:t=>(e=t.getBoundingClientRect())&&e.top>=0&&e.left>=0&&e.right<=u().w&&e.bottom<=u().h,wrapDOM:(e,t)=>e.parentNode.insertBefore(t,e)&&t.appendChild(e),xmlToObject:m,xmlToString:e=>e.xml||(new XMLSerializer).serializeToString(e),stringToXML:e=>(new DOMParser).parseFromString(e,"text/xml"),stringToDOM:t=>(e=document.createElement("div"))&&(e.innerHTML=t)&&e.firstChild,jsonp:e=>{const t=document.createElement("script");s.appendChild(t),t.src=e,t.parentNode.removeChild(t)},addCSS:e=>{const t=document.createElement("style");s.appendChild(t),t.appendChild(document.createTextNode(e))},off:(r,a,s,n=t)=>{i(r,a,(t,r)=>{e=t.removeEventListener?t.removeEventListener(r,s,n):void 0,e=t.detachEvent?t.detachEvent(`on${r}`,s):void 0})},on:(r,a,s,n=t)=>{i(r,a,(t,r)=>{e=t.addEventListener?t.addEventListener(r,s,n):void 0,e=t.attachEvent?t.attachEvent(`on${r}`,s):void 0})}}:{}};return window.runDefer=((e=1e3,t=0,a=99,s=9,n=o,i=o)=>{try{for(n=window.defer;n.length;)i=(i=n[n.length-1])&&i(),n.pop()}catch(n){t>=a&&r(`${String(t).padStart(3)} > MAX`),setTimeout(()=>{window.runDefer(e,++t,((e,t)=>{e>=s&&r(`${String(e).padStart(3)} > ${t.stack}`)})(t,n))},e)}}),window.runDefer(),h({noop:o,val:i,getType:l,is:d,eachText:c,merge:h,objectToQueryString:p,queryStringToObject:e=>e.split("&").map(e=>e.split("=")).reduce((e,[t,r])=>(r=d(i(r),String)?`"${r}"`:r,t=t.split(/\[|\]/g).filter(e=>e).reduce((e,t)=>`{"${t}":${e||r}}`,""),h(e,JSON.parse(t))),{})},[u(),(()=>{const{one:e,all:t,rm:r,stringToDOM:a,wrapDOM:s,isElementInViewport:i,hasClass:l,addClass:d,removeClass:c,off:h,on:p}=u(),m=class{constructor(t={},a=o,s=o){window.eKbd=(e=>{27===e.keyCode&&this.close(!0)});const i=document.createElement("div");this.id=t.id||`Modal_${(new Date).getTime()}`,this.className=t.className||"",this.header=t.header||"Header",this.body=t.body||"Body goes here",this.onClose=t.onClose||a,this.callback=t.callback||s,this.close=((t=!1)=>{(!t||!1!==this.onClose&&!1!==this.onClose())&&(h(document,"keydown",window.eKbd),window.eKbd=void 0,r(e(`#${this.id}`)))}),this.close(),i.id=`${this.id}`,i.className=`Modal ${this.className}`,i.innerHTML=`\n                <h1 id='${this.id}_Header' class='header'>${this.header}</h1>\n                    <div id='${this.id}_Body' class='body'>\n                        <div>${this.body}</div>\n                    </div>\n                <button id='${this.id}_Close' class='close'>Close</button>\n                `,n.appendChild(i),p(document,"keydown",window.eKbd),p(e(`#${this.id}_Close`),"click",()=>{this.close(!0)}),this.callback()}},y=(e="img.lazyload",r="lazyload")=>{t(e).forEach(e=>{i(e)&&e.dataset.src&&0===e.src.indexOf("data:image")&&(e.src=e.dataset.src,e.dataset.src=void 0,c(e,r))})};return window&&document?{DropZone:class{constructor(e,t){this.files=[],this.ctrl=e,this.face=t;const r=(e,t)=>{e.dataTXT&&e.dataB64&&(this.files.push(e),t(e))},a=(e,t=o,a=o)=>{let s=0;!1!==t(e,this.files)&&((s=new FileReader).onload=(e=>t=>{e.dataTXT=t.target.result,r(e,a)})(e),s.readAsText(e),(s=new FileReader).onload=(e=>t=>{e.dataB64=t.target.result,r(e,a)})(e),s.readAsDataURL(e))};this.fileHandler=((e,t,r)=>{"dragend"===e.type?e.dataTransfer.clearData():"drop"===e.type?[...e.dataTransfer.files].forEach(e=>{a(e,t,r)}):"change"===e.type&&([...e.target.files].forEach(e=>{a(e,t,r)}),e.target.value="")})}},Modal:m,Swipe:class{run(e,t){this.onUp=t.onUp||o,this.onDown=t.onDown||o,this.onLeft=t.onLeft||o,this.onRight=t.onRight||o,e=(e=e&&"touchstart"===e.type?(e=>{const{touches:[{clientX:t,clientY:r}]}=e;this.xA=t,this.yA=r})(e):e)&&"touchmove"===e.type?(e=>{const{touches:[{clientX:t,clientY:r}]}=e;if(this.xA&&this.yA){let e=this.xA-t,a=this.yA-r;Math.abs(e)<Math.abs(a)?a=a>0?this.onUp():this.onDown():e=e>0?this.onLeft():this.onRight(),this.xA=void 0,this.yA=void 0}})(e):e}},lazyLoad:y,interactiveMD:()=>{const r={find:(r,a)=>{const s=(a.tag||"").trim().toUpperCase(),n=a.className||"";let o=!0,i=0;for(r.tabIndex=-1;o&&(r=r.parentNode);)r.tagName===s&&(o=!1,d(r,n),"TABLE"===s&&l(r,"responsive")&&(i=t("tr",r),d(i,"row"),i=t("td,th",r),d(i,`col-sm-1 col-md-1-${i[0].parentNode.children.length}`),i=e("thead",r),d(i,"hide")))},wrap:(e,t)=>{const r=(t.tag||"").trim().toUpperCase(),n=t.className||"",o=t.attr||"",i=t.figcaption||e.alt||e.title||"",l=r.length?a(`<${r} ${o}></${r}>`):e;d(l,n),l!==e&&(s(e,l),"FIGURE"===r&&i.length&&l.appendChild(a(`<figcaption ${o}>${i}</figcaption>`)))},audio:(e,t)=>{const r=t.src||e.src||e.href||"",s=t.attr||"",n=a(`<audio src='${r}' ${s}></audio>`);e.parentNode.insertBefore(n,e),p(e,"click",e=>(e.preventDefault(),e=n.paused?n.play():n.pause(),!1),!1)},embed:(e,t)=>{const r=t.src||e.src||e.href||"",s=t.className||"embed ratio ratio-16-9",n=t.attr||'allowfullscreen frameborder="0"',o=r.toLowerCase().indexOf("youtube")>=0&&r.indexOf("?")<0?"?&autoplay=1&iv_load_policy=3&modestbranding=1&showinfo=0&rel=0&playsinline=1":"";d(e,s),p(e,"click",t=>(t.preventDefault(),c(e,"embed"),e.parentNode.replaceChild(a(`<span class='${s}'>\n                                <iframe src='${r}${o}' ${n}></iframe>\n                            </span>`),e),!1),!1)},modal:(e,t)=>{const r=t.src||e.src||e.href||"",a=t.body||e.innerHTML||"Body",s=t.header||"Header",n=t.className||"";p(e,"click",e=>(e.preventDefault(),e=new m({body:`${a}`,header:`<a target='_blank' href='${r}'>${s}</a>`,className:`${n}`}),y(),!1),!1)}},n=t("body [title]");let i=n.length,h=o,u=void 0;for(;i--;){try{u=(u=JSON.parse(n[i].title)).pop?u:[u]}catch(e){}for(;u.length&&(h=u.pop());)r[h[">"]](n[i],h),(n[i]||{}).title=""}}}:{}})()])},u=utils(),{merge:merge}=u;merge(window,u);