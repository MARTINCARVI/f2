(function(V){typeof define=="function"&&define.amd?define(V):V()})(function(){"use strict";var V=Object.defineProperty,ee=(t,e,n)=>e in t?V(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,A=(t,e,n)=>(ee(t,typeof e!="symbol"?e+"":e,n),n);function ne(t,e){const n=Object.create(null),s=t.split(",");for(let r=0;r<s.length;r++)n[s[r]]=!0;return r=>!!n[r]}function ht(t){if(g(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],r=M(s)?ie(s):ht(s);if(r)for(const i in r)e[i]=r[i]}return e}else if(M(t)||$(t))return t}const se=/;(?![^(]*\))/g,re=/:(.+)/;function ie(t){const e={};return t.split(se).forEach(n=>{if(n){const s=n.split(re);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function dt(t){let e="";if(M(t))e=t;else if(g(t))for(let n=0;n<t.length;n++){const s=dt(t[n]);s&&(e+=s+" ")}else if($(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}function oe(t,e){if(t.length!==e.length)return!1;let n=!0;for(let s=0;n&&s<t.length;s++)n=T(t[s],e[s]);return n}function T(t,e){if(t===e)return!0;let n=gt(t),s=gt(e);if(n||s)return n&&s?t.getTime()===e.getTime():!1;if(n=g(t),s=g(e),n||s)return n&&s?oe(t,e):!1;if(n=$(t),s=$(e),n||s){if(!n||!s)return!1;const r=Object.keys(t).length,i=Object.keys(e).length;if(r!==i)return!1;for(const o in t){const c=t.hasOwnProperty(o),f=e.hasOwnProperty(o);if(c&&!f||!c&&f||!T(t[o],e[o]))return!1}}return String(t)===String(e)}function D(t,e){return t.findIndex(n=>T(n,e))}const ce=Object.assign,le=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},fe=Object.prototype.hasOwnProperty,G=(t,e)=>fe.call(t,e),g=Array.isArray,U=t=>mt(t)==="[object Map]",gt=t=>t instanceof Date,M=t=>typeof t=="string",Q=t=>typeof t=="symbol",$=t=>t!==null&&typeof t=="object",ue=Object.prototype.toString,mt=t=>ue.call(t),ae=t=>mt(t).slice(8,-1),X=t=>M(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,vt=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},pe=/-(\w)/g,he=vt(t=>t.replace(pe,(e,n)=>n?n.toUpperCase():"")),de=/\B([A-Z])/g,yt=vt(t=>t.replace(de,"-$1").toLowerCase()),ge=(t,e)=>!Object.is(t,e),bt=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let me;function xt(t,e){e=e||me,e&&e.active&&e.effects.push(t)}const _t=t=>{const e=new Set(t);return e.w=0,e.n=0,e},wt=t=>(t.w&k)>0,$t=t=>(t.n&k)>0,ve=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=k},ye=t=>{const{deps:e}=t;if(e.length){let n=0;for(let s=0;s<e.length;s++){const r=e[s];wt(r)&&!$t(r)?r.delete(t):e[n++]=r,r.w&=~k,r.n&=~k}e.length=n}},Y=new WeakMap;let I=0,k=1;const tt=30,K=[];let R;const z=Symbol(""),kt=Symbol("");class be{constructor(e,n=null,s){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],xt(this,s)}run(){if(!this.active)return this.fn();if(!K.includes(this))try{return K.push(R=this),$e(),k=1<<++I,I<=tt?ve(this):Ot(this),this.fn()}finally{I<=tt&&ye(this),k=1<<--I,St(),K.pop();const e=K.length;R=e>0?K[e-1]:void 0}}stop(){this.active&&(Ot(this),this.onStop&&this.onStop(),this.active=!1)}}function Ot(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}function xe(t,e){t.effect&&(t=t.effect.fn);const n=new be(t);e&&(ce(n,e),e.scope&&xt(n,e.scope)),(!e||!e.lazy)&&n.run();const s=n.run.bind(n);return s.effect=n,s}function _e(t){t.effect.stop()}let B=!0;const et=[];function we(){et.push(B),B=!1}function $e(){et.push(B),B=!0}function St(){const t=et.pop();B=t===void 0?!0:t}function H(t,e,n){if(!ke())return;let s=Y.get(t);s||Y.set(t,s=new Map);let r=s.get(n);r||s.set(n,r=_t()),Oe(r)}function ke(){return B&&R!==void 0}function Oe(t,e){let n=!1;I<=tt?$t(t)||(t.n|=k,n=!wt(t)):n=!t.has(R),n&&(t.add(R),R.deps.push(t))}function nt(t,e,n,s,r,i){const o=Y.get(t);if(!o)return;let c=[];if(e==="clear")c=[...o.values()];else if(n==="length"&&g(t))o.forEach((f,l)=>{(l==="length"||l>=s)&&c.push(f)});else switch(n!==void 0&&c.push(o.get(n)),e){case"add":g(t)?X(n)&&c.push(o.get("length")):(c.push(o.get(z)),U(t)&&c.push(o.get(kt)));break;case"delete":g(t)||(c.push(o.get(z)),U(t)&&c.push(o.get(kt)));break;case"set":U(t)&&c.push(o.get(z));break}if(c.length===1)c[0]&&Et(c[0]);else{const f=[];for(const l of c)l&&f.push(...l);Et(_t(f))}}function Et(t,e){for(const n of g(t)?t:[...t])(n!==R||n.allowRecurse)&&(n.scheduler?n.scheduler():n.run())}const Se=ne("__proto__,__v_isRef,__isVue"),jt=new Set(Object.getOwnPropertyNames(Symbol).map(t=>Symbol[t]).filter(Q)),Ee=Rt(),je=Rt(!0),At=Ae();function Ae(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const s=P(this);for(let i=0,o=this.length;i<o;i++)H(s,"get",i+"");const r=s[e](...n);return r===-1||r===!1?s[e](...n.map(P)):r}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){we();const s=P(this)[e].apply(this,n);return St(),s}}),t}function Rt(t=!1,e=!1){return function(n,s,r){if(s==="__v_isReactive")return!t;if(s==="__v_isReadonly")return t;if(s==="__v_raw"&&r===(t?e?Ie:Ct:e?We:Pt).get(n))return n;const i=g(n);if(!t&&i&&G(At,s))return Reflect.get(At,s,r);const o=Reflect.get(n,s,r);return(Q(s)?jt.has(s):Se(s))||(t||H(n,"get",s),e)?o:st(o)?!i||!X(s)?o.value:o:$(o)?t?Fe(o):L(o):o}}const Re=Pe();function Pe(t=!1){return function(e,n,s,r){let i=e[n];if(!t&&!Ve(s)&&(s=P(s),i=P(i),!g(e)&&st(i)&&!st(s)))return i.value=s,!0;const o=g(e)&&X(n)?Number(n)<e.length:G(e,n),c=Reflect.set(e,n,s,r);return e===P(r)&&(o?ge(s,i)&&nt(e,"set",n,s):nt(e,"add",n,s)),c}}function Ce(t,e){const n=G(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&n&&nt(t,"delete",e,void 0),s}function Ne(t,e){const n=Reflect.has(t,e);return(!Q(e)||!jt.has(e))&&H(t,"has",e),n}function Te(t){return H(t,"iterate",g(t)?"length":z),Reflect.ownKeys(t)}const Me={get:Ee,set:Re,deleteProperty:Ce,has:Ne,ownKeys:Te},Be={get:je,set(t,e){return!0},deleteProperty(t,e){return!0}},Pt=new WeakMap,We=new WeakMap,Ct=new WeakMap,Ie=new WeakMap;function Ke(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Le(t){return t.__v_skip||!Object.isExtensible(t)?0:Ke(ae(t))}function L(t){return t&&t.__v_isReadonly?t:Nt(t,!1,Me,null,Pt)}function Fe(t){return Nt(t,!0,Be,null,Ct)}function Nt(t,e,n,s,r){if(!$(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=r.get(t);if(i)return i;const o=Le(t);if(o===0)return t;const c=new Proxy(t,o===2?s:n);return r.set(t,c),c}function Ve(t){return!!(t&&t.__v_isReadonly)}function P(t){const e=t&&t.__v_raw;return e?P(e):t}function st(t){return!!(t&&t.__v_isRef===!0)}Promise.resolve();let rt=!1;const J=[],ze=Promise.resolve(),Z=t=>ze.then(t),Tt=t=>{J.includes(t)||J.push(t),rt||(rt=!0,Z(He))},He=()=>{for(const t of J)t();J.length=0,rt=!1},Je=/^(spellcheck|draggable|form|list|type)$/,it=({el:t,get:e,effect:n,arg:s,modifiers:r})=>{let i;s==="class"&&(t._class=t.className),n(()=>{let o=e();if(s)r!=null&&r.camel&&(s=he(s)),ot(t,s,o,i);else{for(const c in o)ot(t,c,o[c],i&&i[c]);for(const c in i)(!o||!(c in o))&&ot(t,c,null)}i=o})},ot=(t,e,n,s)=>{if(e==="class")t.setAttribute("class",dt(t._class?[t._class,n]:n)||"");else if(e==="style"){n=ht(n);const{style:r}=t;if(!n)t.removeAttribute("style");else if(M(n))n!==s&&(r.cssText=n);else{for(const i in n)ct(r,i,n[i]);if(s&&!M(s))for(const i in s)n[i]==null&&ct(r,i,"")}}else!(t instanceof SVGElement)&&e in t&&!Je.test(e)?(t[e]=n,e==="value"&&(t._value=n)):e==="true-value"?t._trueValue=n:e==="false-value"?t._falseValue=n:n!=null?t.setAttribute(e,n):t.removeAttribute(e)},Mt=/\s*!important$/,ct=(t,e,n)=>{g(n)?n.forEach(s=>ct(t,e,s)):e.startsWith("--")?t.setProperty(e,n):Mt.test(n)?t.setProperty(yt(e),n.replace(Mt,""),"important"):t[e]=n},O=(t,e)=>{const n=t.getAttribute(e);return n!=null&&t.removeAttribute(e),n},S=(t,e,n,s)=>{t.addEventListener(e,n,s)},Ze=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,qe=["ctrl","shift","alt","meta"],De={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>qe.some(n=>t[`${n}Key`]&&!e[n])},Bt=({el:t,get:e,exp:n,arg:s,modifiers:r})=>{if(!s)return;let i=Ze.test(n)?e(`(e => ${n}(e))`):e(`($event => { ${n} })`);if(s==="vue:mounted"){Z(i);return}else if(s==="vue:unmounted")return()=>i();if(r){s==="click"&&(r.right&&(s="contextmenu"),r.middle&&(s="mouseup"));const o=i;i=c=>{if(!("key"in c&&!(yt(c.key)in r))){for(const f in r){const l=De[f];if(l&&l(c,r))return}return o(c)}}}S(t,s,i,r)},Ge=({el:t,get:e,effect:n})=>{const s=t.style.display;n(()=>{t.style.display=e()?s:"none"})},Wt=({el:t,get:e,effect:n})=>{n(()=>{t.textContent=It(e())})},It=t=>t==null?"":$(t)?JSON.stringify(t,null,2):String(t),Ue=({el:t,get:e,effect:n})=>{n(()=>{t.innerHTML=e()})},Qe=({el:t,exp:e,get:n,effect:s,modifiers:r})=>{const i=t.type,o=n(`(val) => { ${e} = val }`),{trim:c,number:f=i==="number"}=r||{};if(t.tagName==="SELECT"){const l=t;S(t,"change",()=>{const u=Array.prototype.filter.call(l.options,a=>a.selected).map(a=>f?bt(E(a)):E(a));o(l.multiple?u:u[0])}),s(()=>{const u=n(),a=l.multiple;for(let p=0,b=l.options.length;p<b;p++){const y=l.options[p],x=E(y);if(a)g(u)?y.selected=D(u,x)>-1:y.selected=u.has(x);else if(T(E(y),u)){l.selectedIndex!==p&&(l.selectedIndex=p);return}}!a&&l.selectedIndex!==-1&&(l.selectedIndex=-1)})}else if(i==="checkbox"){S(t,"change",()=>{const u=n(),a=t.checked;if(g(u)){const p=E(t),b=D(u,p),y=b!==-1;if(a&&!y)o(u.concat(p));else if(!a&&y){const x=[...u];x.splice(b,1),o(x)}}else o(Kt(t,a))});let l;s(()=>{const u=n();g(u)?t.checked=D(u,E(t))>-1:u!==l&&(t.checked=T(u,Kt(t,!0))),l=u})}else if(i==="radio"){S(t,"change",()=>{o(E(t))});let l;s(()=>{const u=n();u!==l&&(t.checked=T(u,E(t)))})}else{const l=u=>c?u.trim():f?bt(u):u;S(t,"compositionstart",Xe),S(t,"compositionend",Ye),S(t,r!=null&&r.lazy?"change":"input",()=>{t.composing||o(l(t.value))}),c&&S(t,"change",()=>{t.value=t.value.trim()}),s(()=>{if(t.composing)return;const u=t.value,a=n();document.activeElement===t&&l(u)===a||u!==a&&(t.value=a)})}},E=t=>"_value"in t?t._value:t.value,Kt=(t,e)=>{const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e},Xe=t=>{t.target.composing=!0},Ye=t=>{const e=t.target;e.composing&&(e.composing=!1,tn(e,"input"))},tn=(t,e)=>{const n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0),t.dispatchEvent(n)},Lt=Object.create(null),F=(t,e,n)=>Ft(t,`return(${e})`,n),Ft=(t,e,n)=>{const s=Lt[e]||(Lt[e]=en(e));try{return s(t,n)}catch(r){console.error(r)}},en=t=>{try{return new Function("$data","$el",`with($data){${t}}`)}catch(e){return console.error(`${e.message} in expression: ${t}`),()=>{}}},nn=({el:t,ctx:e,exp:n,effect:s})=>{Z(()=>s(()=>Ft(e.scope,n,t)))},sn={bind:it,on:Bt,show:Ge,text:Wt,html:Ue,model:Qe,effect:nn},rn=(t,e,n)=>{const s=t.parentElement,r=new Comment("v-if");s.insertBefore(r,t);const i=[{exp:e,el:t}];let o,c;for(;(o=t.nextElementSibling)&&(c=null,O(o,"v-else")===""||(c=O(o,"v-else-if")));)s.removeChild(o),i.push({exp:c,el:o});const f=t.nextSibling;s.removeChild(t);let l,u=-1;const a=()=>{l&&(s.insertBefore(r,l.el),l.remove(),l=void 0)};return n.effect(()=>{for(let p=0;p<i.length;p++){const{exp:b,el:y}=i[p];if(!b||F(n.scope,b)){p!==u&&(a(),l=new ut(y,n),l.insert(s,r),s.removeChild(r),u=p);return}}u=-1,a()}),f},on=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,Vt=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,cn=/^\(|\)$/g,ln=/^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/,fn=(t,e,n)=>{const s=e.match(on);if(!s)return;const r=t.nextSibling,i=t.parentElement,o=new Text("");i.insertBefore(o,t),i.removeChild(t);const c=s[2].trim();let f=s[1].trim().replace(cn,"").trim(),l,u=!1,a,p,b="key",y=t.getAttribute(b)||t.getAttribute(b=":key")||t.getAttribute(b="v-bind:key");y&&(t.removeAttribute(b),b==="key"&&(y=JSON.stringify(y)));let x;(x=f.match(Vt))&&(f=f.replace(Vt,"").trim(),a=x[1].trim(),x[2]&&(p=x[2].trim())),(x=f.match(ln))&&(l=x[1].split(",").map(m=>m.trim()),u=f[0]==="[");let Yt=!1,C,q,at;const dn=m=>{const _=new Map,h=[];if(g(m))for(let d=0;d<m.length;d++)h.push(pt(_,m[d],d));else if(typeof m=="number")for(let d=0;d<m;d++)h.push(pt(_,d+1,d));else if($(m)){let d=0;for(const v in m)h.push(pt(_,m[v],d++,v))}return[h,_]},pt=(m,_,h,d)=>{const v={};l?l.forEach((N,j)=>v[N]=_[u?j:N]):v[f]=_,d?(a&&(v[a]=d),p&&(v[p]=h)):a&&(v[a]=h);const W=Dt(n,v),w=y?F(W.scope,y):h;return m.set(w,h),W.key=w,W},te=(m,_)=>{const h=new ut(t,m);return h.key=m.key,h.insert(i,_),h};return n.effect(()=>{const m=F(n.scope,c),_=at;if([q,at]=dn(m),!Yt)C=q.map(h=>te(h,o)),Yt=!0;else{for(let w=0;w<C.length;w++)at.has(C[w].key)||C[w].remove();const h=[];let d=q.length,v,W;for(;d--;){const w=q[d],N=_.get(w.key);let j;N==null?j=te(w,v?v.el:o):(j=C[N],Object.assign(j.ctx.scope,w.scope),N!==d&&(C[N+1]!==v||W===v)&&(W=j,j.insert(i,v?v.el:o))),h.unshift(v=j)}C=h}}),r},zt=({el:t,ctx:{scope:{$refs:e}},get:n,effect:s})=>{let r;return s(()=>{const i=n();e[i]=t,r&&i!==r&&delete e[r],r=i}),()=>{r&&delete e[r]}},un=/^(?:v-|:|@)/,an=/\.([\w-]+)/g;let lt=!1;const Ht=(t,e)=>{const n=t.nodeType;if(n===1){const s=t;if(s.hasAttribute("v-pre"))return;O(s,"v-cloak");let r;if(r=O(s,"v-if"))return rn(s,r,e);if(r=O(s,"v-for"))return fn(s,r,e);if((r=O(s,"v-scope"))||r===""){const c=r?F(e.scope,r):{};e=Dt(e,c),c.$template&&pn(s,c.$template)}const i=O(s,"v-once")!=null;i&&(lt=!0),(r=O(s,"ref"))&&ft(s,zt,`"${r}"`,e),Jt(s,e);const o=[];for(const{name:c,value:f}of[...s.attributes])un.test(c)&&c!=="v-cloak"&&(c==="v-model"?o.unshift([c,f]):c[0]==="@"||/^v-on\b/.test(c)?o.push([c,f]):Zt(s,c,f,e));for(const[c,f]of o)Zt(s,c,f,e);i&&(lt=!1)}else if(n===3){const s=t.data;if(s.includes(e.delimiters[0])){let r=[],i=0,o;for(;o=e.delimitersRE.exec(s);){const c=s.slice(i,o.index);c&&r.push(JSON.stringify(c)),r.push(`$s(${o[1]})`),i=o.index+o[0].length}i<s.length&&r.push(JSON.stringify(s.slice(i))),ft(t,Wt,r.join("+"),e)}}else n===11&&Jt(t,e)},Jt=(t,e)=>{let n=t.firstChild;for(;n;)n=Ht(n,e)||n.nextSibling},Zt=(t,e,n,s)=>{let r,i,o;if(e=e.replace(an,(c,f)=>((o||(o={}))[f]=!0,"")),e[0]===":")r=it,i=e.slice(1);else if(e[0]==="@")r=Bt,i=e.slice(1);else{const c=e.indexOf(":"),f=c>0?e.slice(2,c):e.slice(2);r=sn[f]||s.dirs[f],i=c>0?e.slice(c+1):void 0}r&&(r===it&&i==="ref"&&(r=zt),ft(t,r,n,s,i,o),t.removeAttribute(e))},ft=(t,e,n,s,r,i)=>{const o=e({el:t,get:(c=n)=>F(s.scope,c,t),effect:s.effect,ctx:s,exp:n,arg:r,modifiers:i});o&&s.cleanups.push(o)},pn=(t,e)=>{if(e[0]==="#"){const n=document.querySelector(e);t.appendChild(n.content.cloneNode(!0));return}t.innerHTML=e},qt=t=>{const e={delimiters:["{{","}}"],delimitersRE:/\{\{([^]+?)\}\}/g,...t,scope:t?t.scope:L({}),dirs:t?t.dirs:{},effects:[],blocks:[],cleanups:[],effect:n=>{if(lt)return Tt(n),n;const s=xe(n,{scheduler:()=>Tt(s)});return e.effects.push(s),s}};return e},Dt=(t,e={})=>{const n=t.scope,s=Object.create(n);Object.defineProperties(s,Object.getOwnPropertyDescriptors(e)),s.$refs=Object.create(n.$refs);const r=L(new Proxy(s,{set(i,o,c,f){return f===r&&!i.hasOwnProperty(o)?Reflect.set(n,o,c):Reflect.set(i,o,c,f)}}));return Gt(r),{...t,scope:r}},Gt=t=>{for(const e of Object.keys(t))typeof t[e]=="function"&&(t[e]=t[e].bind(t))};class ut{constructor(e,n,s=!1){A(this,"template"),A(this,"ctx"),A(this,"key"),A(this,"parentCtx"),A(this,"isFragment"),A(this,"start"),A(this,"end"),this.isFragment=e instanceof HTMLTemplateElement,s?this.template=e:this.isFragment?this.template=e.content.cloneNode(!0):this.template=e.cloneNode(!0),s?this.ctx=n:(this.parentCtx=n,n.blocks.push(this),this.ctx=qt(n)),Ht(this.template,this.ctx)}get el(){return this.start||this.template}insert(e,n=null){if(this.isFragment)if(this.start){let s=this.start,r;for(;s&&(r=s.nextSibling,e.insertBefore(s,n),s!==this.end);)s=r}else this.start=new Text(""),this.end=new Text(""),e.insertBefore(this.end,n),e.insertBefore(this.start,this.end),e.insertBefore(this.template,this.end);else e.insertBefore(this.template,n)}remove(){if(this.parentCtx&&le(this.parentCtx.blocks,this),this.start){const e=this.start.parentNode;let n=this.start,s;for(;n&&(s=n.nextSibling,e.removeChild(n),n!==this.end);)n=s}else this.template.parentNode.removeChild(this.template);this.teardown()}teardown(){this.ctx.blocks.forEach(e=>{e.teardown()}),this.ctx.effects.forEach(_e),this.ctx.cleanups.forEach(e=>e())}}const Ut=t=>t.replace(/[-.*+?^${}()|[\]\/\\]/g,"\\$&"),Qt=t=>{const e=qt();if(t&&(e.scope=L(t),Gt(e.scope),t.$delimiters)){const[s,r]=e.delimiters=t.$delimiters;e.delimitersRE=new RegExp(Ut(s)+"([^]+?)"+Ut(r),"g")}e.scope.$s=It,e.scope.$nextTick=Z,e.scope.$refs=Object.create(null);let n;return{directive(s,r){return r?(e.dirs[s]=r,this):e.dirs[s]},mount(s){if(typeof s=="string"&&(s=document.querySelector(s),!s))return;s=s||document.documentElement;let r;return s.hasAttribute("v-scope")?r=[s]:r=[...s.querySelectorAll("[v-scope]")].filter(i=>!i.matches("[v-scope] [v-scope]")),r.length||(r=[s]),n=r.map(i=>new ut(i,e,!0)),this},unmount(){n.forEach(s=>s.teardown())}}},Xt=document.currentScript;Xt&&Xt.hasAttribute("init")&&Qt().mount();const hn=L({});Qt({$delimiters:["[[","]]"],store:hn}).mount()});