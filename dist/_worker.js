var ar=Object.defineProperty;var pt=e=>{throw TypeError(e)};var or=(e,t,r)=>t in e?ar(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var O=(e,t,r)=>or(e,typeof t!="symbol"?t+"":t,r),rt=(e,t,r)=>t.has(e)||pt("Cannot "+r);var u=(e,t,r)=>(rt(e,t,"read from private field"),r?r.call(e):t.get(e)),T=(e,t,r)=>t.has(e)?pt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),E=(e,t,r,n)=>(rt(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r),P=(e,t,r)=>(rt(e,t,"access private method"),r);var mt=(e,t,r,n)=>({set _(s){E(e,t,s,r)},get _(){return u(e,t,n)}});var gt=(e,t,r)=>(n,s)=>{let i=-1;return a(0);async function a(o){if(o<=i)throw new Error("next() called multiple times");i=o;let l,c=!1,d;if(e[o]?(d=e[o][0][0],n.req.routeIndex=o):d=o===e.length&&s||void 0,d)try{l=await d(n,()=>a(o+1))}catch(h){if(h instanceof Error&&t)n.error=h,l=await t(h,n),c=!0;else throw h}else n.finalized===!1&&r&&(l=await r(n));return l&&(n.finalized===!1||c)&&(n.res=l),n}},cr=Symbol(),lr=async(e,t=Object.create(null))=>{const{all:r=!1,dot:n=!1}=t,i=(e instanceof kt?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?dr(e,{all:r,dot:n}):{}};async function dr(e,t){const r=await e.formData();return r?ur(r,t):{}}function ur(e,t){const r=Object.create(null);return e.forEach((n,s)=>{t.all||s.endsWith("[]")?hr(r,s,n):r[s]=n}),t.dot&&Object.entries(r).forEach(([n,s])=>{n.includes(".")&&(fr(r,n,s),delete r[n])}),r}var hr=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},fr=(e,t,r)=>{let n=e;const s=t.split(".");s.forEach((i,a)=>{a===s.length-1?n[i]=r:((!n[i]||typeof n[i]!="object"||Array.isArray(n[i])||n[i]instanceof File)&&(n[i]=Object.create(null)),n=n[i])})},jt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},pr=e=>{const{groups:t,path:r}=mr(e),n=jt(r);return gr(n,t)},mr=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,n)=>{const s=`@${n}`;return t.push([s,r]),s}),{groups:t,path:e}},gr=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[n]=t[r];for(let s=e.length-1;s>=0;s--)if(e[s].includes(n)){e[s]=e[s].replace(n,t[r][1]);break}}return e},Ge={},xr=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const n=`${e}#${t}`;return Ge[n]||(r[2]?Ge[n]=t&&t[0]!==":"&&t[0]!=="*"?[n,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Ge[n]=[e,r[1],!0]),Ge[n]}return null},ft=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},br=e=>ft(e,decodeURI),Mt=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let n=r;for(;n<t.length;n++){const s=t.charCodeAt(n);if(s===37){const i=t.indexOf("?",n),a=t.slice(r,i===-1?void 0:i);return br(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(s===63)break}return t.slice(r,n)},vr=e=>{const t=Mt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},we=(e,t,...r)=>(r.length&&(t=we(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),$t=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let n="";return t.forEach(s=>{if(s!==""&&!/\:/.test(s))n+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){r.length===0&&n===""?r.push("/"):r.push(n);const i=s.replace("?","");n+="/"+i,r.push(n)}else n+="/"+s}),r.filter((s,i,a)=>a.indexOf(s)===i)},nt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?ft(e,Pt):e):e,It=(e,t,r)=>{let n;if(!r&&t&&!/[%+]/.test(t)){let a=e.indexOf("?",8);if(a===-1)return;for(e.startsWith(t,a+1)||(a=e.indexOf(`&${t}`,a+1));a!==-1;){const o=e.charCodeAt(a+t.length+1);if(o===61){const l=a+t.length+2,c=e.indexOf("&",l);return nt(e.slice(l,c===-1?void 0:c))}else if(o==38||isNaN(o))return"";a=e.indexOf(`&${t}`,a+1)}if(n=/[%+]/.test(e),!n)return}const s={};n??(n=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const a=e.indexOf("&",i+1);let o=e.indexOf("=",i);o>a&&a!==-1&&(o=-1);let l=e.slice(i+1,o===-1?a===-1?void 0:a:o);if(n&&(l=nt(l)),i=a,l==="")continue;let c;o===-1?c="":(c=e.slice(o+1,a===-1?void 0:a),n&&(c=nt(c))),r?(s[l]&&Array.isArray(s[l])||(s[l]=[]),s[l].push(c)):s[l]??(s[l]=c)}return t?s[t]:s},wr=It,yr=(e,t)=>It(e,t,!0),Pt=decodeURIComponent,xt=e=>ft(e,Pt),Oe,J,te,Dt,Lt,ht,re,At,kt=(At=class{constructor(e,t="/",r=[[]]){T(this,te);O(this,"raw");T(this,Oe);T(this,J);O(this,"routeIndex",0);O(this,"path");O(this,"bodyCache",{});T(this,re,e=>{const{bodyCache:t,raw:r}=this,n=t[e];if(n)return n;const s=Object.keys(t)[0];return s?t[s].then(i=>(s==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,E(this,J,r),E(this,Oe,{})}param(e){return e?P(this,te,Dt).call(this,e):P(this,te,Lt).call(this)}query(e){return wr(this.url,e)}queries(e){return yr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,n)=>{t[n]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await lr(this,e))}json(){return u(this,re).call(this,"text").then(e=>JSON.parse(e))}text(){return u(this,re).call(this,"text")}arrayBuffer(){return u(this,re).call(this,"arrayBuffer")}blob(){return u(this,re).call(this,"blob")}formData(){return u(this,re).call(this,"formData")}addValidatedData(e,t){u(this,Oe)[e]=t}valid(e){return u(this,Oe)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[cr](){return u(this,J)}get matchedRoutes(){return u(this,J)[0].map(([[,e]])=>e)}get routePath(){return u(this,J)[0].map(([[,e]])=>e)[this.routeIndex].path}},Oe=new WeakMap,J=new WeakMap,te=new WeakSet,Dt=function(e){const t=u(this,J)[0][this.routeIndex][1][e],r=P(this,te,ht).call(this,t);return r&&/\%/.test(r)?xt(r):r},Lt=function(){const e={},t=Object.keys(u(this,J)[0][this.routeIndex][1]);for(const r of t){const n=P(this,te,ht).call(this,u(this,J)[0][this.routeIndex][1][r]);n!==void 0&&(e[r]=/\%/.test(n)?xt(n):n)}return e},ht=function(e){return u(this,J)[1]?u(this,J)[1][e]:e},re=new WeakMap,At),Sr={Stringify:1},Ht=async(e,t,r,n,s)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(s?s[0]+=e:s=[e],Promise.all(i.map(o=>o({phase:t,buffer:s,context:n}))).then(o=>Promise.all(o.filter(Boolean).map(l=>Ht(l,t,!1,n,s))).then(()=>s[0]))):Promise.resolve(e)},Er="text/plain; charset=UTF-8",st=(e,t)=>({"Content-Type":e,...t}),ke,De,V,Ae,Q,U,Le,Ne,_e,de,He,Fe,ne,ye,Nt,Or=(Nt=class{constructor(e,t){T(this,ne);T(this,ke);T(this,De);O(this,"env",{});T(this,V);O(this,"finalized",!1);O(this,"error");T(this,Ae);T(this,Q);T(this,U);T(this,Le);T(this,Ne);T(this,_e);T(this,de);T(this,He);T(this,Fe);O(this,"render",(...e)=>(u(this,Ne)??E(this,Ne,t=>this.html(t)),u(this,Ne).call(this,...e)));O(this,"setLayout",e=>E(this,Le,e));O(this,"getLayout",()=>u(this,Le));O(this,"setRenderer",e=>{E(this,Ne,e)});O(this,"header",(e,t,r)=>{this.finalized&&E(this,U,new Response(u(this,U).body,u(this,U)));const n=u(this,U)?u(this,U).headers:u(this,de)??E(this,de,new Headers);t===void 0?n.delete(e):r!=null&&r.append?n.append(e,t):n.set(e,t)});O(this,"status",e=>{E(this,Ae,e)});O(this,"set",(e,t)=>{u(this,V)??E(this,V,new Map),u(this,V).set(e,t)});O(this,"get",e=>u(this,V)?u(this,V).get(e):void 0);O(this,"newResponse",(...e)=>P(this,ne,ye).call(this,...e));O(this,"body",(e,t,r)=>P(this,ne,ye).call(this,e,t,r));O(this,"text",(e,t,r)=>!u(this,de)&&!u(this,Ae)&&!t&&!r&&!this.finalized?new Response(e):P(this,ne,ye).call(this,e,t,st(Er,r)));O(this,"json",(e,t,r)=>P(this,ne,ye).call(this,JSON.stringify(e),t,st("application/json",r)));O(this,"html",(e,t,r)=>{const n=s=>P(this,ne,ye).call(this,s,t,st("text/html; charset=UTF-8",r));return typeof e=="object"?Ht(e,Sr.Stringify,!1,{}).then(n):n(e)});O(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});O(this,"notFound",()=>(u(this,_e)??E(this,_e,()=>new Response),u(this,_e).call(this,this)));E(this,ke,e),t&&(E(this,Q,t.executionCtx),this.env=t.env,E(this,_e,t.notFoundHandler),E(this,Fe,t.path),E(this,He,t.matchResult))}get req(){return u(this,De)??E(this,De,new kt(u(this,ke),u(this,Fe),u(this,He))),u(this,De)}get event(){if(u(this,Q)&&"respondWith"in u(this,Q))return u(this,Q);throw Error("This context has no FetchEvent")}get executionCtx(){if(u(this,Q))return u(this,Q);throw Error("This context has no ExecutionContext")}get res(){return u(this,U)||E(this,U,new Response(null,{headers:u(this,de)??E(this,de,new Headers)}))}set res(e){if(u(this,U)&&e){e=new Response(e.body,e);for(const[t,r]of u(this,U).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const n=u(this,U).headers.getSetCookie();e.headers.delete("set-cookie");for(const s of n)e.headers.append("set-cookie",s)}else e.headers.set(t,r)}E(this,U,e),this.finalized=!0}get var(){return u(this,V)?Object.fromEntries(u(this,V)):{}}},ke=new WeakMap,De=new WeakMap,V=new WeakMap,Ae=new WeakMap,Q=new WeakMap,U=new WeakMap,Le=new WeakMap,Ne=new WeakMap,_e=new WeakMap,de=new WeakMap,He=new WeakMap,Fe=new WeakMap,ne=new WeakSet,ye=function(e,t,r){const n=u(this,U)?new Headers(u(this,U).headers):u(this,de)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[a,o]of i)a.toLowerCase()==="set-cookie"?n.append(a,o):n.set(a,o)}if(r)for(const[i,a]of Object.entries(r))if(typeof a=="string")n.set(i,a);else{n.delete(i);for(const o of a)n.append(i,o)}const s=typeof t=="number"?t:(t==null?void 0:t.status)??u(this,Ae);return new Response(e,{status:s,headers:n})},Nt),L="ALL",Ar="all",Nr=["get","post","put","delete","options","patch"],Ft="Can not add a route since the matcher is already built.",Bt=class extends Error{},_r="__COMPOSED_HANDLER",Tr=e=>e.text("404 Not Found",404),bt=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},q,H,Gt,Y,ce,Je,qe,Te,Rr=(Te=class{constructor(t={}){T(this,H);O(this,"get");O(this,"post");O(this,"put");O(this,"delete");O(this,"options");O(this,"patch");O(this,"all");O(this,"on");O(this,"use");O(this,"router");O(this,"getPath");O(this,"_basePath","/");T(this,q,"/");O(this,"routes",[]);T(this,Y,Tr);O(this,"errorHandler",bt);O(this,"onError",t=>(this.errorHandler=t,this));O(this,"notFound",t=>(E(this,Y,t),this));O(this,"fetch",(t,...r)=>P(this,H,qe).call(this,t,r[1],r[0],t.method));O(this,"request",(t,r,n,s)=>t instanceof Request?this.fetch(r?new Request(t,r):t,n,s):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${we("/",t)}`,r),n,s)));O(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(P(this,H,qe).call(this,t.request,t,void 0,t.request.method))})});[...Nr,Ar].forEach(i=>{this[i]=(a,...o)=>(typeof a=="string"?E(this,q,a):P(this,H,ce).call(this,i,u(this,q),a),o.forEach(l=>{P(this,H,ce).call(this,i,u(this,q),l)}),this)}),this.on=(i,a,...o)=>{for(const l of[a].flat()){E(this,q,l);for(const c of[i].flat())o.map(d=>{P(this,H,ce).call(this,c.toUpperCase(),u(this,q),d)})}return this},this.use=(i,...a)=>(typeof i=="string"?E(this,q,i):(E(this,q,"*"),a.unshift(i)),a.forEach(o=>{P(this,H,ce).call(this,L,u(this,q),o)}),this);const{strict:n,...s}=t;Object.assign(this,s),this.getPath=n??!0?t.getPath??Mt:vr}route(t,r){const n=this.basePath(t);return r.routes.map(s=>{var a;let i;r.errorHandler===bt?i=s.handler:(i=async(o,l)=>(await gt([],r.errorHandler)(o,()=>s.handler(o,l))).res,i[_r]=s.handler),P(a=n,H,ce).call(a,s.method,s.path,i)}),this}basePath(t){const r=P(this,H,Gt).call(this);return r._basePath=we(this._basePath,t),r}mount(t,r,n){let s,i;n&&(typeof n=="function"?i=n:(i=n.optionHandler,n.replaceRequest===!1?s=l=>l:s=n.replaceRequest));const a=i?l=>{const c=i(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};s||(s=(()=>{const l=we(this._basePath,t),c=l==="/"?0:l.length;return d=>{const h=new URL(d.url);return h.pathname=h.pathname.slice(c)||"/",new Request(h,d)}})());const o=async(l,c)=>{const d=await r(s(l.req.raw),...a(l));if(d)return d;await c()};return P(this,H,ce).call(this,L,we(t,"*"),o),this}},q=new WeakMap,H=new WeakSet,Gt=function(){const t=new Te({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,E(t,Y,u(this,Y)),t.routes=this.routes,t},Y=new WeakMap,ce=function(t,r,n){t=t.toUpperCase(),r=we(this._basePath,r);const s={basePath:this._basePath,path:r,method:t,handler:n};this.router.add(t,r,[n,s]),this.routes.push(s)},Je=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},qe=function(t,r,n,s){if(s==="HEAD")return(async()=>new Response(null,await P(this,H,qe).call(this,t,r,n,"GET")))();const i=this.getPath(t,{env:n}),a=this.router.match(s,i),o=new Or(t,{path:i,matchResult:a,env:n,executionCtx:r,notFoundHandler:u(this,Y)});if(a[0].length===1){let c;try{c=a[0][0][0][0](o,async()=>{o.res=await u(this,Y).call(this,o)})}catch(d){return P(this,H,Je).call(this,d,o)}return c instanceof Promise?c.then(d=>d||(o.finalized?o.res:u(this,Y).call(this,o))).catch(d=>P(this,H,Je).call(this,d,o)):c??u(this,Y).call(this,o)}const l=gt(a[0],this.errorHandler,u(this,Y));return(async()=>{try{const c=await l(o);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return P(this,H,Je).call(this,c,o)}})()},Te),Kt=[];function Cr(e,t){const r=this.buildAllMatchers(),n=(s,i)=>{const a=r[s]||r[L],o=a[2][i];if(o)return o;const l=i.match(a[0]);if(!l)return[[],Kt];const c=l.indexOf("",1);return[a[1][c],l]};return this.match=n,n(e,t)}var Xe="[^/]+",Ie=".*",Pe="(?:|/.*)",Se=Symbol(),jr=new Set(".\\+*[^]$()");function Mr(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ie||e===Pe?1:t===Ie||t===Pe?-1:e===Xe?1:t===Xe?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var ue,he,W,xe,$r=(xe=class{constructor(){T(this,ue);T(this,he);T(this,W,Object.create(null))}insert(t,r,n,s,i){if(t.length===0){if(u(this,ue)!==void 0)throw Se;if(i)return;E(this,ue,r);return}const[a,...o]=t,l=a==="*"?o.length===0?["","",Ie]:["","",Xe]:a==="/*"?["","",Pe]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const d=l[1];let h=l[2]||Xe;if(d&&l[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw Se;if(c=u(this,W)[h],!c){if(Object.keys(u(this,W)).some(f=>f!==Ie&&f!==Pe))throw Se;if(i)return;c=u(this,W)[h]=new xe,d!==""&&E(c,he,s.varIndex++)}!i&&d!==""&&n.push([d,u(c,he)])}else if(c=u(this,W)[a],!c){if(Object.keys(u(this,W)).some(d=>d.length>1&&d!==Ie&&d!==Pe))throw Se;if(i)return;c=u(this,W)[a]=new xe}c.insert(o,r,n,s,i)}buildRegExpStr(){const r=Object.keys(u(this,W)).sort(Mr).map(n=>{const s=u(this,W)[n];return(typeof u(s,he)=="number"?`(${n})@${u(s,he)}`:jr.has(n)?`\\${n}`:n)+s.buildRegExpStr()});return typeof u(this,ue)=="number"&&r.unshift(`#${u(this,ue)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},ue=new WeakMap,he=new WeakMap,W=new WeakMap,xe),Qe,Be,_t,Ir=(_t=class{constructor(){T(this,Qe,{varIndex:0});T(this,Be,new $r)}insert(e,t,r){const n=[],s=[];for(let a=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const c=`@\\${a}`;return s[a]=[c,l],a++,o=!0,c}),!o)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=s.length-1;a>=0;a--){const[o]=s[a];for(let l=i.length-1;l>=0;l--)if(i[l].indexOf(o)!==-1){i[l]=i[l].replace(o,s[a][1]);break}}return u(this,Be).insert(i,t,n,u(this,Qe),r),n}buildRegExp(){let e=u(this,Be).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],n=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,i,a)=>i!==void 0?(r[++t]=Number(i),"$()"):(a!==void 0&&(n[Number(a)]=++t),"")),[new RegExp(`^${e}`),r,n]}},Qe=new WeakMap,Be=new WeakMap,_t),Pr=[/^$/,[],Object.create(null)],Ye=Object.create(null);function zt(e){return Ye[e]??(Ye[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function kr(){Ye=Object.create(null)}function Dr(e){var c;const t=new Ir,r=[];if(e.length===0)return Pr;const n=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,h],[f,b])=>d?1:f?-1:h.length-b.length),s=Object.create(null);for(let d=0,h=-1,f=n.length;d<f;d++){const[b,S,_]=n[d];b?s[S]=[_.map(([R])=>[R,Object.create(null)]),Kt]:h++;let A;try{A=t.insert(S,h,b)}catch(R){throw R===Se?new Bt(S):R}b||(r[h]=_.map(([R,N])=>{const I=Object.create(null);for(N-=1;N>=0;N--){const[k,y]=A[N];I[k]=y}return[R,I]}))}const[i,a,o]=t.buildRegExp();for(let d=0,h=r.length;d<h;d++)for(let f=0,b=r[d].length;f<b;f++){const S=(c=r[d][f])==null?void 0:c[1];if(!S)continue;const _=Object.keys(S);for(let A=0,R=_.length;A<R;A++)S[_[A]]=o[S[_[A]]]}const l=[];for(const d in a)l[d]=r[a[d]];return[i,l,s]}function ve(e,t){if(e){for(const r of Object.keys(e).sort((n,s)=>s.length-n.length))if(zt(r).test(t))return[...e[r]]}}var se,ie,Ze,Ut,Tt,Lr=(Tt=class{constructor(){T(this,Ze);O(this,"name","RegExpRouter");T(this,se);T(this,ie);O(this,"match",Cr);E(this,se,{[L]:Object.create(null)}),E(this,ie,{[L]:Object.create(null)})}add(e,t,r){var o;const n=u(this,se),s=u(this,ie);if(!n||!s)throw new Error(Ft);n[e]||[n,s].forEach(l=>{l[e]=Object.create(null),Object.keys(l[L]).forEach(c=>{l[e][c]=[...l[L][c]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=zt(t);e===L?Object.keys(n).forEach(c=>{var d;(d=n[c])[t]||(d[t]=ve(n[c],t)||ve(n[L],t)||[])}):(o=n[e])[t]||(o[t]=ve(n[e],t)||ve(n[L],t)||[]),Object.keys(n).forEach(c=>{(e===L||e===c)&&Object.keys(n[c]).forEach(d=>{l.test(d)&&n[c][d].push([r,i])})}),Object.keys(s).forEach(c=>{(e===L||e===c)&&Object.keys(s[c]).forEach(d=>l.test(d)&&s[c][d].push([r,i]))});return}const a=$t(t)||[t];for(let l=0,c=a.length;l<c;l++){const d=a[l];Object.keys(s).forEach(h=>{var f;(e===L||e===h)&&((f=s[h])[d]||(f[d]=[...ve(n[h],d)||ve(n[L],d)||[]]),s[h][d].push([r,i-c+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(u(this,ie)).concat(Object.keys(u(this,se))).forEach(t=>{e[t]||(e[t]=P(this,Ze,Ut).call(this,t))}),E(this,se,E(this,ie,void 0)),kr(),e}},se=new WeakMap,ie=new WeakMap,Ze=new WeakSet,Ut=function(e){const t=[];let r=e===L;return[u(this,se),u(this,ie)].forEach(n=>{const s=n[e]?Object.keys(n[e]).map(i=>[i,n[e][i]]):[];s.length!==0?(r||(r=!0),t.push(...s)):e!==L&&t.push(...Object.keys(n[L]).map(i=>[i,n[L][i]]))}),r?Dr(t):null},Tt),ae,Z,Rt,Hr=(Rt=class{constructor(e){O(this,"name","SmartRouter");T(this,ae,[]);T(this,Z,[]);E(this,ae,e.routers)}add(e,t,r){if(!u(this,Z))throw new Error(Ft);u(this,Z).push([e,t,r])}match(e,t){if(!u(this,Z))throw new Error("Fatal error");const r=u(this,ae),n=u(this,Z),s=r.length;let i=0,a;for(;i<s;i++){const o=r[i];try{for(let l=0,c=n.length;l<c;l++)o.add(...n[l]);a=o.match(e,t)}catch(l){if(l instanceof Bt)continue;throw l}this.match=o.match.bind(o),E(this,ae,[o]),E(this,Z,void 0);break}if(i===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(u(this,Z)||u(this,ae).length!==1)throw new Error("No active router has been determined yet.");return u(this,ae)[0]}},ae=new WeakMap,Z=new WeakMap,Rt),Me=Object.create(null),oe,z,fe,Re,G,ee,le,Ce,Fr=(Ce=class{constructor(t,r,n){T(this,ee);T(this,oe);T(this,z);T(this,fe);T(this,Re,0);T(this,G,Me);if(E(this,z,n||Object.create(null)),E(this,oe,[]),t&&r){const s=Object.create(null);s[t]={handler:r,possibleKeys:[],score:0},E(this,oe,[s])}E(this,fe,[])}insert(t,r,n){E(this,Re,++mt(this,Re)._);let s=this;const i=pr(r),a=[];for(let o=0,l=i.length;o<l;o++){const c=i[o],d=i[o+1],h=xr(c,d),f=Array.isArray(h)?h[0]:c;if(f in u(s,z)){s=u(s,z)[f],h&&a.push(h[1]);continue}u(s,z)[f]=new Ce,h&&(u(s,fe).push(h),a.push(h[1])),s=u(s,z)[f]}return u(s,oe).push({[t]:{handler:n,possibleKeys:a.filter((o,l,c)=>c.indexOf(o)===l),score:u(this,Re)}}),s}search(t,r){var l;const n=[];E(this,G,Me);let i=[this];const a=jt(r),o=[];for(let c=0,d=a.length;c<d;c++){const h=a[c],f=c===d-1,b=[];for(let S=0,_=i.length;S<_;S++){const A=i[S],R=u(A,z)[h];R&&(E(R,G,u(A,G)),f?(u(R,z)["*"]&&n.push(...P(this,ee,le).call(this,u(R,z)["*"],t,u(A,G))),n.push(...P(this,ee,le).call(this,R,t,u(A,G)))):b.push(R));for(let N=0,I=u(A,fe).length;N<I;N++){const k=u(A,fe)[N],y=u(A,G)===Me?{}:{...u(A,G)};if(k==="*"){const w=u(A,z)["*"];w&&(n.push(...P(this,ee,le).call(this,w,t,u(A,G))),E(w,G,y),b.push(w));continue}const[M,v,g]=k;if(!h&&!(g instanceof RegExp))continue;const m=u(A,z)[M],x=a.slice(c).join("/");if(g instanceof RegExp){const w=g.exec(x);if(w){if(y[v]=w[0],n.push(...P(this,ee,le).call(this,m,t,u(A,G),y)),Object.keys(u(m,z)).length){E(m,G,y);const p=((l=w[0].match(/\//))==null?void 0:l.length)??0;(o[p]||(o[p]=[])).push(m)}continue}}(g===!0||g.test(h))&&(y[v]=h,f?(n.push(...P(this,ee,le).call(this,m,t,y,u(A,G))),u(m,z)["*"]&&n.push(...P(this,ee,le).call(this,u(m,z)["*"],t,y,u(A,G)))):(E(m,G,y),b.push(m)))}}i=b.concat(o.shift()??[])}return n.length>1&&n.sort((c,d)=>c.score-d.score),[n.map(({handler:c,params:d})=>[c,d])]}},oe=new WeakMap,z=new WeakMap,fe=new WeakMap,Re=new WeakMap,G=new WeakMap,ee=new WeakSet,le=function(t,r,n,s){const i=[];for(let a=0,o=u(t,oe).length;a<o;a++){const l=u(t,oe)[a],c=l[r]||l[L],d={};if(c!==void 0&&(c.params=Object.create(null),i.push(c),n!==Me||s&&s!==Me))for(let h=0,f=c.possibleKeys.length;h<f;h++){const b=c.possibleKeys[h],S=d[c.score];c.params[b]=s!=null&&s[b]&&!S?s[b]:n[b]??(s==null?void 0:s[b]),d[c.score]=!0}}return i},Ce),pe,Ct,Br=(Ct=class{constructor(){O(this,"name","TrieRouter");T(this,pe);E(this,pe,new Fr)}add(e,t,r){const n=$t(t);if(n){for(let s=0,i=n.length;s<i;s++)u(this,pe).insert(e,n[s],r);return}u(this,pe).insert(e,t,r)}match(e,t){return u(this,pe).search(e,t)}},pe=new WeakMap,Ct),Jt=class extends Rr{constructor(e={}){super(e),this.router=e.router??new Hr({routers:[new Lr,new Br]})}},Gr=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},n=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(r.origin),s=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(r.allowMethods);return async function(a,o){var d;function l(h,f){a.res.headers.set(h,f)}const c=await n(a.req.header("origin")||"",a);if(c&&l("Access-Control-Allow-Origin",c),r.credentials&&l("Access-Control-Allow-Credentials","true"),(d=r.exposeHeaders)!=null&&d.length&&l("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),a.req.method==="OPTIONS"){r.origin!=="*"&&l("Vary","Origin"),r.maxAge!=null&&l("Access-Control-Max-Age",r.maxAge.toString());const h=await s(a.req.header("origin")||"",a);h.length&&l("Access-Control-Allow-Methods",h.join(","));let f=r.allowHeaders;if(!(f!=null&&f.length)){const b=a.req.header("Access-Control-Request-Headers");b&&(f=b.split(/\s*,\s*/))}return f!=null&&f.length&&(l("Access-Control-Allow-Headers",f.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await o(),r.origin!=="*"&&a.header("Vary","Origin",{append:!0})}},Kr=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,vt=(e,t=Ur)=>{const r=/\.([a-zA-Z0-9]+?)$/,n=e.match(r);if(!n)return;let s=t[n[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},zr={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Ur=zr,Jr=(...e)=>{let t=e.filter(s=>s!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),n=[];for(const s of r)s===".."&&n.length>0&&n.at(-1)!==".."?n.pop():s!=="."&&n.push(s);return n.join("/")||"."},qt={br:".br",zstd:".zst",gzip:".gz"},qr=Object.keys(qt),Yr="index.html",Wr=e=>{const t=e.root??"./",r=e.path,n=e.join??Jr;return async(s,i)=>{var d,h,f,b;if(s.finalized)return i();let a;if(e.path)a=e.path;else try{if(a=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((d=e.onNotFound)==null?void 0:d.call(e,s.req.path,s)),i()}let o=n(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(a):a);e.isDir&&await e.isDir(o)&&(o=n(o,Yr));const l=e.getContent;let c=await l(o,s);if(c instanceof Response)return s.newResponse(c.body,c);if(c){const S=e.mimes&&vt(o,e.mimes)||vt(o);if(s.header("Content-Type",S||"application/octet-stream"),e.precompressed&&(!S||Kr.test(S))){const _=new Set((h=s.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(A=>A.trim()));for(const A of qr){if(!_.has(A))continue;const R=await l(o+qt[A],s);if(R){c=R,s.header("Content-Encoding",A),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((f=e.onFound)==null?void 0:f.call(e,o,s)),s.body(c)}await((b=e.onNotFound)==null?void 0:b.call(e,o,s)),await i()}},Xr=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let n;t&&t.namespace?n=t.namespace:n=__STATIC_CONTENT;const s=r[e];if(!s)return null;const i=await n.get(s,{type:"stream"});return i||null},Vr=e=>async function(r,n){return Wr({...e,getContent:async i=>Xr(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,n)},Qr=e=>Vr(e);const X=new Jt,We=new Map,Zr=1e3*60*60*24*7;let it=!1;function Yt(){return new Date().toISOString()}function C(e){return e==null?"":String(e)}function me(e,t,r){return Math.max(t,Math.min(r,e))}function en(e){return(e||"").replace(/\s+/g,"")}function Ee(e){return en(e).length}const wt={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}},yt={brief:["연구 목적","연구 방법","핵심 결론"],standard:["연구 목적","연구 문제","연구 방법","주요 결과","결론"],detail:["연구 목적","연구 문제","연구 대상","연구 절차","결과","해석","교육적 의의"]};function Wt(e){return(e||"").replace(/-\s*[ivxIVX]+-\s*/gi,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[p\.\s*\d+\]/gi,"").replace(/p\.\s*\d+/gi,"").replace(/\n+/g," ").replace(/\s{2,}/g," ").trim()}const tn=["DLPFC","VLPFC","OFC","ACC","PFC","vmPFC","dmPFC","전두엽","측두엽","두정엽","후두엽","편도체","해마"];function at(e,t){if(t==="brief"){for(const s of tn)if(e.includes(s))return{valid:!1,error:`간단요약에 세부 뇌영역(${s}) 단독 등장 금지. 일반적 설명만 포함하세요.`}}const r=yt[t]||yt.standard,n=[];for(const s of r)s.split(" ").some(o=>e.includes(o))||n.push(s);return n.length>0?{valid:!1,error:`필수 요소 누락: ${n.join(", ")}. 이 항목들을 반드시 포함하세요.`}:{valid:!0}}function rn(e){return wt[e]||wt.standard}function ot(e,t){const r=Math.max(50,Ee(e)),{min:n,max:s}=rn(t);return{base:r,min:Math.floor(r*n),max:Math.ceil(r*s)}}function Xt(e){const t=C(e).trim().toLowerCase();return t?t==="brief"||t==="simple"||t==="short"||t==="lite"?"brief":t==="detail"||t==="detailed"||t==="full"?"detail":"standard":"standard"}function Vt(e){const t=C(e).trim().toLowerCase();return t?t==="narrative"||t==="structured"||t==="mindmap"||t==="selftest"?t:t==="mind-map"||t==="mind_map"?"mindmap":"narrative":"narrative"}function nn(e){const t=C(e).trim().toLowerCase();return t==="concept"?"concept":t==="exam"?"exam":"summary"}function F(e){const t=new Set,r=[];for(const n of e||[]){const s=typeof n=="string"?n:JSON.stringify(n);t.has(s)||(t.add(s),r.push(n))}return r}function ge(e){return Array.isArray(e)?e:e==null?[]:[e]}function Ve(e){return e&&typeof e=="object"&&!Array.isArray(e)}function sn(e){let t=C(e).replace(/\s+/g," ").trim();if(!t)return[];t=t.replace(/[\u201C\u201D\u2033\u00AB\u00BB]/g,'"').replace(/[\u2018\u2019\u2032]/g,"'");const r=[];let n="",s=null,i=0;const a=()=>{const o=n.trim();o&&r.push(o),n=""};for(let o=0;o<t.length;o++){const l=t[o],c=t[o+1]||"",d=t[o+2]||"";if(l==="("&&i++,l===")"&&(i=Math.max(0,i-1)),(l==='"'||l==="'")&&s===null?s=l:s&&l===s&&(s=null),n+=l,s===null&&i===0&&/[.!?]/.test(l)){c===" "&&(a(),o++);continue}if(s===null&&i===0&&c===" "){const f=n.trimEnd().slice(-1),b=/[가-힣A-Za-z0-9"'(\[]/.test(d);(f==="다"||f==="요"||f==="죠")&&b&&(a(),o++)}}return a(),r.length?r:[t]}function ct(e){if(!Ve(e))return{anchor:C(e).trim()||"",outline:{}};const t=C(e.anchor).trim(),r=e.outline,n={};if(Ve(r))for(const s of Object.keys(r))n[s]=F(ge(r[s]).map(i=>C(i).trim()).filter(Boolean));return{anchor:t,outline:n}}function an(e,t,r){var l,c,d;const n=ct(e),s=ct(t),i=ct(r),a=n.anchor||s.anchor||i.anchor||"";n.anchor=a,s.anchor=a,i.anchor=a;const o=F([...Object.keys(n.outline||{}),...Object.keys(s.outline||{}),...Object.keys(i.outline||{})]);for(const h of o){const f=F(ge((l=n.outline)==null?void 0:l[h]).map(R=>C(R).trim()).filter(Boolean)),b=F(ge((c=s.outline)==null?void 0:c[h]).map(R=>C(R).trim()).filter(Boolean)),S=F(ge((d=i.outline)==null?void 0:d[h]).map(R=>C(R).trim()).filter(Boolean)),_=F([...f,...b]),A=F([..._,...S]);n.outline||(n.outline={}),s.outline||(s.outline={}),i.outline||(i.outline={}),n.outline[h]=f,s.outline[h]=_,i.outline[h]=A}return{brief:n,standard:s,detail:i}}function lt(e){if(!Ve(e))return{anchorNodeId:"n0",nodes:[],edges:[]};const t=C(e.anchorNodeId||"n0").trim()||"n0",r=F(ge(e.nodes).map(s=>{const i=C(s==null?void 0:s.id).trim(),a=C(s==null?void 0:s.label).trim();return i&&a?{id:i,label:a}:null}).filter(Boolean)),n=F(ge(e.edges).map(s=>{const i=C(s==null?void 0:s.from).trim(),a=C(s==null?void 0:s.to).trim(),o=C(s==null?void 0:s.label).trim();return i&&a?o?{from:i,to:a,label:o}:{from:i,to:a}:null}).filter(Boolean));return{anchorNodeId:t,nodes:r,edges:n}}function dt(e){const t=new Map;for(const r of e||[])t.set(r.id,r);return t}function on(e){return`${e.from}→${e.to}::${C(e.label)}`}function cn(e,t,r){const n=lt(e),s=lt(t),i=lt(r),a=n.anchorNodeId||s.anchorNodeId||i.anchorNodeId||"n0";n.anchorNodeId=a,s.anchorNodeId=a,i.anchorNodeId=a,dt(n.nodes||[]),dt(s.nodes||[]),dt(i.nodes||[]);const o=F([...n.nodes||[],...s.nodes||[]]),l=F([...o||[],...i.nodes||[]]),c=N=>(N.some(I=>I.id===a)||N.unshift({id:a,label:"핵심 개념"}),F(N));n.nodes=c(n.nodes||[]),s.nodes=c(o),i.nodes=c(l);const d=new Set((n.nodes||[]).map(N=>N.id)),h=new Set((s.nodes||[]).map(N=>N.id)),f=new Set((i.nodes||[]).map(N=>N.id)),b=(N,I)=>F((N||[]).filter(k=>I.has(k.from)&&I.has(k.to))),S=b(n.edges||[],d),_=F([...S,...b(s.edges||[],h)]),A=F([..._,...b(i.edges||[],f)]),R=N=>{const I=new Set,k=[];for(const y of N||[]){const M=on(y);I.has(M)||(I.add(M),k.push(y))}return k};return n.edges=R(S),s.edges=R(_),i.edges=R(A),{brief:n,standard:s,detail:i}}function ut(e){return Ve(e)?{questions:F(ge(e.questions).map(r=>{const n=C(r==null?void 0:r.id).trim(),s=C(r==null?void 0:r.type).trim(),i=C(r==null?void 0:r.prompt).trim();if(!n||!s||!i)return null;const a=r==null?void 0:r.choices,o=r==null?void 0:r.answer,l={id:n,type:s,prompt:i};return a!=null&&(l.choices=a),o!=null&&(l.answer=o),l}).filter(Boolean)),gate:{passRatio:.8}}:{questions:[],gate:{passRatio:.8}}}function ln(e,t,r){const n=ut(e),s=ut(t),i=ut(r),a=n.questions||[],o=s.questions||[],l=i.questions||[],c=F([...a,...o]),d=F([...c,...l]),h=(f,b)=>f.slice(0,Math.max(0,b));return n.questions=h(a,3),s.questions=h(c,5),i.questions=h(d,8),n.gate={passRatio:.8},s.gate={passRatio:.8},i.gate={passRatio:.8},{brief:n,standard:s,detail:i}}function dn(e){var s,i,a,o,l,c,d,h,f;const t=an((s=e==null?void 0:e.structured)==null?void 0:s.brief,(i=e==null?void 0:e.structured)==null?void 0:i.standard,(a=e==null?void 0:e.structured)==null?void 0:a.detail),r=cn((o=e==null?void 0:e.mindmap)==null?void 0:o.brief,(l=e==null?void 0:e.mindmap)==null?void 0:l.standard,(c=e==null?void 0:e.mindmap)==null?void 0:c.detail),n=ln((d=e==null?void 0:e.selftest)==null?void 0:d.brief,(h=e==null?void 0:e.selftest)==null?void 0:h.standard,(f=e==null?void 0:e.selftest)==null?void 0:f.detail);return{structured:t,mindmap:r,selftest:n}}function un(e){if(!e)return"";let t=String(e);return t=t.replace(/([가-힣])\r?\n([가-힣])/g,"$1$2"),t=t.replace(/([A-Za-z])-\r?\n([A-Za-z])/g,"$1$2"),t=t.replace(/\r/g,""),t=t.replace(/\n{2,}/g,`
`),t=t.replace(/\n/g," "),t=t.replace(/[ \t]{2,}/g," "),t=t.replace(/\s+([,.;:!?])/g,"$1"),t.trim()}function hn(e){return(e||[]).filter(t=>{const r=(t||"").trim();return!(!r||r.length<18||!(/[.!?]$/.test(r)||/다\.$/.test(r)||/이다\.$/.test(r)||/하였다\.$/.test(r))&&r.length<45)})}const fn=new Set(["그리고","그러나","하지만","또한","및","또","또는","즉","때문에","따라서","그래서","한편","이것","그것","저것","에서","으로","에게","부터","까지","보다","처럼","같이","의","가","이","은","는","을","를","과","와","도","만","하다","된다","있다","없다","이다","아니다","수","등","및","것","들","좀","매우","정말"]);function St(e){return(e||"").toLowerCase().replace(/[^0-9a-z가-힣\s]/g," ").split(/\s+/).map(t=>t.trim()).map(t=>t.replace(/에게$/g,"").replace(/에서$/g,"").replace(/으로$/g,"").replace(/를$/g,"").replace(/을$/g,"").replace(/의$/g,"").replace(/하는$/g,"하").replace(/하$/g,"하")).filter(t=>t.length>=2&&!fn.has(t))}function pn(e){const t=new Map;for(const n of e)for(const s of St(n))t.set(s,(t.get(s)||0)+1);return e.map((n,s)=>{const i=St(n);let a=0;for(const c of i)a+=t.get(c)||0;const o=n.length,l=o<15?.7:o>180?.85:1;return{idx:s,s:n,score:a*l}})}function mn(e,t){return pn(e).slice().sort((s,i)=>i.score-s.score).slice(0,me(t,1,Math.max(1,e.length))).sort((s,i)=>s.idx-i.idx).map(s=>s.s)}function gn(e){let t=(e||"").trim();t=t.replace(/모\s+든/g,"모든"),t=t.replace(/기\s+회/g,"기회"),t=t.replace(/이\s+루어지는/g,"이루어지는"),t=t.replace(/루어지는/g,"이루어지는"),t=t.replace(/생태계물/g,"자연물"),t=t.replace(/놀은\s+는/g,"놀이는"),t=t.replace(/형성은\s+는/g,"형성은"),t=t.replace(/특정\s+공간\s+인/g,"특정 공간인"),t=t.replace(/(\S+)\s+\1/g,"$1"),t=t.replace(/([가-힣])을\b/g,(i,a)=>{const o=a.charCodeAt(0);return o>=44032&&o<=55203?(o-44032)%28!==0?a+"을":a+"를":i});const r=t.split(new RegExp("(?<=다\\.)\\s+")),n=new Set,s=[];for(const i of r){const a=i.match(/^([^은는]+[은는])\s+(.+)/);if(a){const o=a[1];if(n.has(o))continue;n.add(o)}s.push(i)}return t=s.join(" "),t=t.replace(/입니다\.\s*이는\s+/g,"이다. "),t=t.replace(/입니다\.\s*또한\s+/g,"이다. 또한 "),t=t.replace(/입니다\.\s*즉\s+/g,"이다. 즉 "),t=t.replace(/\s*\.\s*/g,". "),t=t.replace(/\s*,\s*/g,", "),t=t.replace(/\s*;\s*/g,"; "),t=t.replace(/[ ]{2,}/g," "),t=t.replace(/\n{3,}/g,`

`),t.trim()}function Qt(e){const t=Math.max(200,Ee(e)),r=ot(e,"brief"),n=ot(e,"standard"),s=ot(e,"detail"),i=me(r.min+Math.round((r.max-r.min)*.5),r.min,r.max),a=me(Math.max(n.min,i+40),n.min,n.max),o=me(Math.max(s.min,a+120),s.min,s.max);return{base:t,brief:i,standard:a,detail:o}}function xn(e){const t=Qt(e);return`
당신은 학술 논문을 3단계(간단/표준/상세)로 "생성적 요약(Abstractive Summarization)" 방식으로 요약하는 전문 엔진입니다.

[입력 원문 - 학술 논문]
"""${Wt(e)}"""

[🔹 C. 논문형 텍스트 전용 요약 구조 - 반드시 준수]
이 텍스트는 학술 논문입니다.
요약 시 반드시 다음 순서를 유지하세요:

1. 연구 목적 (무엇을 연구했는가?)
2. 연구 설계 및 방법 (어떻게 연구했는가?)
3. 핵심 결과 (무엇을 발견했는가?)
4. 결과 해석 (결과가 의미하는 바는?)
5. 교육적 의의 (실무/교육에 어떤 시사점을 주는가?)

각 단계는 1문단 이상을 넘지 마세요.

[요약 모드별 필수 포함 요소]
- 간단 요약: 연구 목적, 연구 방법, 핵심 결론 (세부 뇌 영역 금지)
- 표준 요약: 연구 목적, 연구 문제, 연구 방법, 주요 결과, 결론
- 상세 요약: 연구 목적, 연구 문제, 연구 대상, 연구 절차, 결과, 해석, 교육적 의의

[요약 작업 전 세팅 규칙]
1. 비율 준수: 간단 10~15%, 표준 25~30%, 상세 45~55% (공백 제외 글자수 기준 엄수)
2. 텍스트 정제: 페이지 번호(p.XX), 각주 번호, 특수기호, 질문형 문장 제거 → 학술적 평서문으로 재구성
3. 정보 계층화: 상세로 갈수록 '학술적 논거'와 '세부 지표'의 깊이를 더할 것
4. 퀴즈 최적화: 핵심 키워드와 인과관계를 문장 내에 전략적으로 배치

[요약 원칙]
1) "간단 < 표준 < 상세" 글자수 단조 증가는 절대적 기준. 역전 금지.
2) 단순 추출/복붙 금지: 원문을 생성적으로 재구성하여 매끄러운 글 작성
3) 원문에 없는 정보 추가 금지 (할루시네이션 금지)
4) 세 요약은 내용과 표현이 "거의 동일"하면 실패 (중복 금지)
5) 🔹 B. 결과 단독 발췌 금지:
   - 간단 요약: DLPFC, VLPFC, OFC 등 세부 뇌 영역 명칭 사용 금지 (일반적 설명만)
   - 표준/상세 요약: 세부 뇌 영역 허용 (단, 맥락과 함께 설명)
6) 스마트 편집:
   - 중복 표현 통합
   - 전문 용어 일관성 유지
   - 한 문장 2줄 이내로 단문 위주 작성

[길이 목표(공백 제외 글자수)]
- 간단: ${t.brief}자 내외 (원문 10~15%, 핵심만 간결하게)
- 표준: ${t.standard}자 내외 (원문 25~30%, 주요 논거 포함)
- 상세: ${t.detail}자 내외 (원문 45~55%, 학술적 논거+세부 지표+인과관계 명시, 아래 소제목 3개)

[상세 요약 소제목(반드시 그대로 사용)]
- 개념
- 영향
- 교육적 가치

[퀴즈 연동 강조]
모든 요약문은 향후 퀴즈 생성의 근거입니다. 특히 상세 요약에서는:
- 전문 용어(DLPFC, OFC 등)와 개념 간의 **인과관계**를 생략하지 말 것
- 학습 유형, 뇌 영역, 발달 단계 등의 **지식 앵커(Anchors)**를 명확히 확보
- 퀴즈 문항으로 변환 가능한 구체적 사실과 관계를 배치

[출력 형식 - JSON만 출력]
{
  "meta": {
    "base_chars_no_space": ${t.base},
    "target": { "brief": ${t.brief}, "standard": ${t.standard}, "detail": ${t.detail} }
  },
  "brief": "…",
  "standard": "…",
  "detail": {
    "개념": "…",
    "영향": "…",
    "교육적 가치": "…"
  }
}

※ JSON 외 어떤 문장도 출력하지 마라.
※ 모든 요약은 자연스러운 한국어 학술 문어체로 작성하라.
`.trim()}function bn(e,t,r){if(!Array.isArray(e)||e.length===0)return{summary:"요약할 내용이 부족합니다.",mindmap:{keywords:[],nodes:[],edges:[]},meta:{ratio:0,target:{min:0,max:0}}};const n=Math.max(1,Number(r)||1),s=t==="brief"?{min:10,max:15}:t==="detail"?{min:45,max:55}:{min:25,max:30},i=["또한","아울러","더불어"],a=["한편","이와 함께","이와 더불어","또 다른 측면에서"],o=y=>{const M=String(y||"").trim().slice(0,24);if(/^(또한|아울러|더불어|한편|이와\s|그리고|그러나|하지만)\b/.test(M))return null;const v=M.match(/^(.{1,20}?(은|는|이|가))\s+/);return v?v[1]:null},l=y=>{const M=String(y||"").trim();return M&&(/[.!?…]$/.test(M)?M:M+".")},c=y=>{let M=String(y||"").trim(),v="";const g=M.match(/([.!?…])$/);return g&&(v=g[1],M=M.slice(0,-1).trim()),M=M.replace(/합니다$/,"한다").replace(/되었습니다$/,"되었다").replace(/입니다$/,"이다").replace(/습니다$/,"다"),(M+(v||".")).trim()},d=y=>/^(그러므로|따라서|하지만|그러나|또한|더불어|한편|이와|나아가|아울러|즉|특히)\s/.test(y.trim()),h=y=>y.replace(/^(또한|더불어|한편|이와|나아가|아울러)\s+/,"").trim();let f=e.map((y,M)=>{const v=String(y||"").trim();if(!v)return"";if(M===0){const p=h(v);return c(l(p))}if(d(v))return c(l(v));const g=String(e[M-1]||"").trim(),m=o(g),x=o(v),w=p=>p[M%p.length];if(x&&m&&x===m){const p=v.replace(/^(.{1,40}?(은|는|이|가))\s+/,"");return c(l(`${w(i)} ${p}`.trim()))}else return v.length>15?c(l(`${w(a)} ${v}`.trim())):c(l(v))}).filter(Boolean);const b=y=>String(y||"").replace(/\s+/g,"").length;let S=f.join(" ");S=S.replace(/\s*(또한|더불어|한편|이와|나아가|아울러)\s+(또한|더불어|한편|이와|나아가|아울러)\s+/g," $2 ").replace(/\s{2,}/g," ").trim();let _=b(S)/n*100;for(;_>s.max&&f.length>1;)f.pop(),S=f.join(" "),_=b(S)/n*100;_<s.min&&console.warn(`[젠스] 요약율 ${_.toFixed(1)}%가 목표 최소치 ${s.min}% 미만입니다.`);const R=f.join(" ").replace(/[0-9]/g," ").replace(/[^\uAC00-\uD7A3a-zA-Z\s]/g," ").split(/\s+/).map(y=>y.trim()).filter(y=>y.length>=2&&y.length<=6),N=new Map;for(const y of R)N.set(y,(N.get(y)||0)+1);const I=[...N.entries()].sort((y,M)=>M[1]-y[1]).slice(0,12).map(([y])=>y),k={keywords:I,nodes:I.map((y,M)=>({id:`k${M}`,label:y})),edges:[]};return{summary:S,mindmap:k,meta:{ratio:_,target:s}}}function vn(e,t,r){const n=un(e);let s=sn(n);s=hn(s);const i=t==="brief"?me(Math.round(s.length*.15),2,4):t==="standard"?me(Math.round(s.length*.3),5,9):me(Math.round(s.length*.55),10,18);let a=mn(s,i);if(t==="detail"){const c=["성별","학년","남학생","여학생","초등","중학","고학년","저학년","변인","차이","비교"],d=s.filter(h=>c.some(f=>h.includes(f))&&!a.includes(h)).slice(0,5);d.length>0&&(a=[...a,...d])}const o=Ee(n);if(r==="narrative"){let c,d=null,h=null;{const f=bn(a,t,o);c=f.summary,d=f.mindmap,h=f.meta}return c=gn(c),{kind:"summary",mode:t,viewType:r,narrative:c,...d&&{mindmapKeywords:d},...h&&{meta:{...h,inputNormalized:!0,originalLen:o}}}}if(r==="structured")return{kind:"summary",mode:t,viewType:r,structured:{title:"구조화 요약",bullets:a.map((c,d)=>`- (${d+1}) ${c}`)}};if(r==="mindmap"){const c=(a[0]||s[0]||"핵심").slice(0,40),d=[{id:"c",label:c,level:0}],h=[];return a.slice(1).forEach((f,b)=>{const S=`n${b+1}`;d.push({id:S,label:f.slice(0,60),level:1}),h.push({from:"c",to:S})}),{kind:"summary",mode:t,viewType:r,mindmap:{center:c,nodes:d,edges:h}}}const l=a.map((c,d)=>({id:`q${d+1}`,type:"short",question:`(${d+1}) 다음 내용을 한 문장으로 설명해보세요: "${c.slice(0,70)}"`,answerHint:c}));return{kind:"summary",mode:t,viewType:r,selftest:{title:"셀프테스트",questions:l}}}function Zt(e){if(!e)return"empty";let t=2166136261,r=0;for(let i=0;i<e.length;i++){const a=e.charCodeAt(i);t^=a,t+=(t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24),r=(r<<5)-r+a,r|=0}const n=(t>>>0).toString(16),s=(Math.abs(r)>>>0).toString(16);return`${e.length.toString(16)}_${n}_${s}`}function wn(e,t,r,n){const s=Zt(r);return`${e}::${n||"anon"}::${t}::base::${s}`}function yn(e,t,r,n,s){const i=Zt(n);return`${e}::${s||"anon"}::${t}::${r}::${i}`}async function Sn(e){if(!it){if(!e){it=!0;return}await e.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await e.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),it=!0}}async function Et(e,t){const r=Date.now(),n=We.get(t);if(n&&r-n.createdAt<Zr)return{hit:!0,data:n.data,store:"mem"};if(n&&We.delete(t),!e)return{hit:!1};const s=await e.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(t).first();if(!(s!=null&&s.response_json))return{hit:!1};try{const i=JSON.parse(s.response_json);return We.set(t,{data:i,createdAt:r}),{hit:!0,data:i,store:"d1"}}catch{return{hit:!1}}}async function $e(e,t,r,n){const s=Date.now();We.set(t,{data:n,createdAt:s}),e&&await e.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(t,r,JSON.stringify(n),Yt()).run()}function Ke(e){const t=e.split(/\n\n+/).filter(n=>n.trim());return{kind:"summary",viewType:"structured",structured:{title:"구조화 요약",bullets:t.length>1?t.map((n,s)=>`- (${s+1}) ${n}`):e.split(/[\.。]\s+/).filter(n=>n.trim()).map((n,s)=>`- (${s+1}) ${n}.`)}}}function ze(e){const t=e.split(/[\.。]\s+/).filter(i=>i.trim()).map(i=>i.trim()),r=(t[0]||"핵심").slice(0,40),n=[{id:"c",label:r,level:0}],s=[];return t.slice(1).forEach((i,a)=>{const o=`n${a+1}`;n.push({id:o,label:i.slice(0,60),level:1}),s.push({from:"c",to:o})}),{kind:"summary",viewType:"mindmap",mindmap:{center:r,nodes:n,edges:s}}}function Ue(e){return{kind:"summary",viewType:"selftest",selftest:{title:"셀프테스트",questions:e.split(/[\.。]\s+/).filter(n=>n.trim()).map(n=>n.trim()).map((n,s)=>({id:`q${s+1}`,type:"short",question:`(${s+1}) 다음 내용을 한 문장으로 설명해보세요: "${n.slice(0,70)}"`,answerHint:n}))}}}async function En(e,t){var l,c,d,h,f;const r=C(e.GEMINI_API_KEY).trim();if(!r)throw new Error("GEMINI_API_KEY is missing");const n=C(e.GEMINI_MODEL).trim()||"gemini-1.5-flash",s=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`,i={contents:[{role:"user",parts:[{text:t}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let a=0,o=500;for(;a<3;){a++;const b=await fetch(s,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(i)});if(b.ok){const _=await b.json();return{ok:!0,text:((f=(h=(d=(c=(l=_==null?void 0:_.candidates)==null?void 0:l[0])==null?void 0:c.content)==null?void 0:d.parts)==null?void 0:h[0])==null?void 0:f.text)??"",raw:_}}if(b.status===429||b.status===503){await new Promise(_=>setTimeout(_,o)),o*=2;continue}const S=await b.text().catch(()=>"");throw new Error(`Gemini error ${b.status}: ${S.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function On(e,t,r){var c,d,h,f,b;const n=C(e.GEMINI_API_KEY).trim();if(!n)throw new Error("GEMINI_API_KEY is missing");const s=C(e.GEMINI_MODEL).trim()||"gemini-1.5-flash",i=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(n)}`,a={system_instruction:{parts:[{text:t}]},contents:[{role:"user",parts:[{text:r}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let o=0,l=500;for(;o<3;){o++;const S=await fetch(i,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(a)});if(S.ok){const A=await S.json();return((b=(f=(h=(d=(c=A==null?void 0:A.candidates)==null?void 0:c[0])==null?void 0:d.content)==null?void 0:h.parts)==null?void 0:f[0])==null?void 0:b.text)??""}if(S.status===429||S.status===503){await new Promise(A=>setTimeout(A,l)),l*=2;continue}const _=await S.text().catch(()=>"");throw new Error(`Gemini error ${S.status}: ${_.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function er(e,t){const r=await En(e,t);return typeof r=="string"?r:((r==null?void 0:r.text)??"").toString()}async function An(e,t){const r=xn(t);for(let n=1;n<=2;n++)try{let i=(await er(e,r)||"").trim();i.startsWith("```")&&(i=i.replace(/^```(?:json)?\s*/i,"").replace(/```\s*$/i,"").trim());const a=JSON.parse(i);if(!(a!=null&&a.brief)||!(a!=null&&a.standard)||!(a!=null&&a.detail))throw new Error("Missing required fields");if(!a.detail.개념||!a.detail.영향||!a.detail["교육적 가치"])throw new Error("Missing detail fields");const o=Ee(a.brief),l=Ee(a.standard),c=Ee(a.detail.개념+a.detail.영향+a.detail["교육적 가치"]);(o>=l||l>=c)&&console.warn("[SummaryJSON] monotonic violated",{bLen:o,sLen:l,dLen:c,attempt:n});const d=at(a.brief,"brief"),h=at(a.standard,"standard"),f=a.detail.개념+" "+a.detail.영향+" "+a.detail["교육적 가치"],b=at(f,"detail");if(!d.valid&&(console.warn("[SummaryJSON] brief validation failed:",d.error),n===1))throw new Error(`Brief validation: ${d.error}`);if(!h.valid&&(console.warn("[SummaryJSON] standard validation failed:",h.error),n===1))throw new Error(`Standard validation: ${h.error}`);if(!b.valid&&(console.warn("[SummaryJSON] detail validation failed:",b.error),n===1))throw new Error(`Detail validation: ${b.error}`);return a}catch(s){if(console.error("[SummaryJSON] attempt failed",n,s==null?void 0:s.message),n===2){const i=Qt(t);return{meta:{base_chars_no_space:i.base,target:{brief:i.brief,standard:i.standard,detail:i.detail}},brief:"[JSON 실패] 요약 생성 실패",standard:"[JSON 실패] 요약 생성 실패",detail:{개념:"[실패]",영향:"[실패]","교육적 가치":"[실패]"}}}}throw new Error("summarizeWithJSON failed")}const Nn=(()=>{const t={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}},r={brief:6,standard:10,detail:14},n=["narrative","structured","mindmap"],s=["preview","exam"];function i(v){return(v||"").replace(/\s+/g,"")}function a(v,g){const x=Math.max(200,i(v||"").length),w=t[g]||t.standard,p=Math.floor(x*w.min),$=Math.ceil(x*w.max);return{base:x,min:Math.max(80,p),max:Math.max(120,$)}}function o(v){const g=(v||"").trim();return g?g.replace(/\r/g,"").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map(x=>x.trim()).filter(Boolean):[]}function l(v){return o(v).map((m,x)=>({sid:`S${x+1}`,text:m}))}function c(v,g,m){const x=v.find(w=>w.sid===g);return!x||!m||typeof m!="string"?!1:x.text.includes(m.trim())}function d(){return["당신은 교육공학 기반 요약·셀프테스트 생성 엔진이다.","추출형 복붙 금지. 반드시 의미 단위로 재구성하라.","가장 중요한 1순위는 문자수(공백 제외) 제한 준수다.","허위 정보(원문/요약에 없는 내용) 생성 금지.","JSON 출력이 요구되면 JSON만 출력하라."].join(`
`)}function h({originalText:v,mode:g,format:m}){const x=a(v,g),w=Wt(v),p=m==="narrative"?"서술형: 연결어를 사용해 흐름/인과가 보이도록 1~3문단으로 구성":m==="structured"?"구조화: 상위-하위 위계가 드러나는 조목(가/나/다 또는 ①②③) 형태":"마인드맵: 텍스트로 표현된 노드-관계 목록(중심노드/하위노드/연결라벨) 형태";return["[TASK] 아래 학술 논문을 생성적 요약(Abstractive Summarization) 방식으로 지정된 형식에 맞춰 요약하라.",`- 모드: ${g} (간단/표준/상세)`,`- 형식: ${m} (${p})`,`- 문자수 목표(공백 제외): 최소 ${x.min}자 ~ 최대 ${x.max}자`,"","[🔹 C. 논문형 텍스트 전용 요약 구조 - 반드시 준수]","이 텍스트는 학술 논문입니다.","요약 시 반드시 다음 순서를 유지하세요:","1. 연구 목적 (무엇을 연구했는가?)","2. 연구 설계 및 방법 (어떻게 연구했는가?)","3. 핵심 결과 (무엇을 발견했는가?)","4. 결과 해석 (결과가 의미하는 바는?)","5. 교육적 의의 (실무/교육에 어떤 시사점을 주는가?)","각 단계는 1문단 이상을 넘지 마세요.","","[요약 품질 규칙]","1. 단순 추출/복붙 금지: 원문 문장을 그대로 나열하지 말고 생성적으로 재구성하여 매끄러운 글 작성","2. 텍스트 정제: 페이지 번호(p.XX), 각주, 특수기호, 질문형 문장 제거 → 학술적 평서문으로 전환","3. 스마트 편집: 중복 표현 통합, 전문 용어 일관성 유지, 한 문장 2줄 이내로 단문 위주","4. 퀴즈 연동: 핵심 키워드와 인과관계를 문장 내에 전략적으로 배치 (퀴즈 앵커 확보)","5. 할루시네이션 금지: 원문에 없는 주장/사례/인과/수치 추가 절대 금지","6. 🔹 B. 결과 단독 발췌 금지: 간단 모드에서는 DLPFC, VLPFC, OFC 등 세부 뇌 영역 명칭 사용 금지","","[비율 엄수]","- 간단 10~15%, 표준 25~30%, 상세 45~55% 글자수 비율은 절대적 기준","- 상세 요약이 표준보다 짧아지는 역전 현상 금지","- 각 단계마다 정보의 깊이와 양을 계층적으로 명확히 차별화","","[ORIGINAL]",w].join(`
`)}function f({summaryText:v,format:g}){return["[TASK] 아래 요약문에서 학습 앵커(핵심 개념/관계)를 추출하라.","- 출력은 JSON만. 한국어로.","- 앵커 수: 6~14개 범위(요약 길이에 맞춰 적절히).","- 각 앵커는 요약문에 실제로 등장하는 표현을 근거(quote)로 가져와야 한다.","- quote는 요약문 일부를 그대로 복사(짧게 8~25자).","","[OUTPUT JSON SCHEMA]",`{
  "anchors":[
    {
      "id":"A1",
      "label":"핵심 개념/관계 이름",
      "type":"concept|relation|claim",
      "sid":"S1",
      "quote":"요약문에서 그대로 인용한 짧은 구절",
      "note":"학습 포인트(1문장)"
    }
  ]
}`,"","[SUMMARY]",v].join(`
`)}function b({mode:v,purpose:g,format:m,summaryText:x,sentTable:w,anchors:p}){const $=r[v]||10,K=g==="preview"?"예습용 셀프테스트: 요약문 안에서 바로 확인 가능한 재인 중심(스키마 형성). 과도한 추론 금지.":"시험대비 셀프테스트: 요약문에 있는 근거를 바탕으로 인과/관계/분류를 인출하는 회상 중심. 요약에 없는 정보 금지.",D=m==="narrative"?"문항 스타일: 문장 빈칸, 문장 순서 배열, 인과관계 단답/서술(요약 근거 필수)":m==="structured"?"문항 스타일: 항목-정의 매칭, 분류 채우기, 상하위 체계, 사례-범주 매칭(요약 근거 필수)":"문항 스타일: 노드 라벨 맞추기, 연결 라벨링, 누락 노드/연결 복원, 관계 이유 단답(요약 근거 필수)";return["[TASK] 아래 요약문과 앵커만을 근거로 셀프테스트 문항을 생성하라.",`- 모드: ${v} (문항수 ${$})`,`- 목적: ${g} (${K})`,`- 요약 형식: ${m} (${D})`,"- 규칙1: 요약문에 없는 정보로 문제 만들지 말 것(할루시네이션 금지).","- 규칙2: 각 문항은 반드시 evidence를 포함: sid + quote(요약 문장 일부 8~25자).","- 규칙3: quote는 반드시 해당 sid 문장에 실제로 포함되어야 한다.","- 규칙4: 정답/해설은 간결하게. 해설은 evidence와 연결되게.","","[OUTPUT JSON ONLY]",`{
  "items":[
    {
      "id":"Q1",
      "type":"blank|match|order|label|short|mcq",
      "question":"문항",
      "choices":["보기1","보기2","보기3","보기4"], 
      "answer":"정답(choices 기반이면 보기 텍스트 그대로)",
      "explanation":"해설(1~2문장)",
      "evidence": { "sid":"S1", "quote":"요약 문장 일부" },
      "anchorIds":["A1","A3"]
    }
  ]
}`,"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(w,null,2),"","[ANCHORS]",JSON.stringify(p,null,2),"","[SUMMARY]",x].join(`
`)}function S(v,g){const m=g&&g.anchors?g.anchors:[],x=[],w=[];for(const p of m){const $=p==null?void 0:p.sid,K=p==null?void 0:p.quote;if(typeof(p==null?void 0:p.label)!="string"||!p.label.trim()){w.push({a:p,reason:"label missing"});continue}if(!c(v,$,K)){w.push({a:p,reason:"evidence not in sentence"});continue}x.push(p)}return{ok:x,bad:w}}function _(v,g){const m=g&&Array.isArray(g.items)?g.items:[],x=[],w=[];for(const p of m){const $=p==null?void 0:p.evidence;if(!(p!=null&&p.id)||!(p!=null&&p.question)||!(p!=null&&p.answer)||!($!=null&&$.sid)||!($!=null&&$.quote)){w.push({q:p,reason:"missing fields"});continue}if(!c(v,$.sid,$.quote)){w.push({q:p,reason:"evidence not in sentence"});continue}if(Array.isArray(p.choices)&&p.choices.length>0&&!p.choices.includes(p.answer)){w.push({q:p,reason:"answer not in choices"});continue}x.push(p)}return{ok:x,bad:w}}function A({summaryText:v,sentTable:g,anchors:m,badItems:x,mode:w,purpose:p,format:$}){return["[TASK] 아래는 검증에서 탈락한 문항들이다. 요약문 근거(sid+quote)를 만족하도록 문항을 다시 생성하라.",`- 재생성 문항 수: ${x.length}`,`- 모드: ${w}, 목적: ${p}, 형식: ${$}`,"- 규칙: 요약문 밖 정보 금지. 반드시 sid+quote가 실제로 해당 문장에 포함되어야 한다.","- 출력: JSON만. items 길이는 정확히 재생성 문항 수와 같아야 한다.","","[OUTPUT JSON ONLY]",'{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}',"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(g,null,2),"","[ANCHORS]",JSON.stringify(m,null,2),"","[BAD ITEMS]",JSON.stringify(x,null,2),"","[SUMMARY]",v].join(`
`)}async function R({llmCall:v,originalText:g,mode:m,format:x}){if(!v)throw new Error("llmCall is required");t[m]||(m="standard"),n.includes(x)||(x="narrative");const w=h({originalText:g,mode:m,format:x}),p=(await v({system:d(),user:w,json:!1})||"").trim()||"",$=l(p),K=f({summaryText:p,format:x});let D=await v({system:d(),user:K,json:!0}),B;try{B=JSON.parse(D)}catch{B={anchors:[]}}const{ok:j}=S($,B),be=j.length>=4?j:N($);return{summaryText:p,sentTable:$,anchors:be}}function N(v){const g=[];for(let m=0;m<Math.min(8,v.length);m++){const x=v[m],w=(x.text||"").slice(0,18);g.push({id:`A${m+1}`,label:`문장 핵심${m+1}`,type:"claim",sid:x.sid,quote:w,note:"요약 문장 기반 안전 앵커"})}return g}async function I({llmCall:v,mode:g,purpose:m,format:x,summaryText:w,sentTable:p,anchors:$}){t[g]||(g="standard"),s.includes(m)||(m="preview"),n.includes(x)||(x="narrative");const K=b({mode:g,purpose:m,format:x,summaryText:w,sentTable:p,anchors:$});let D=await v({system:d(),user:K,json:!0}),B;try{B=JSON.parse(D)}catch{B={items:[]}}let{ok:j,bad:be}=_(p,B);if(be.length>0){const je=A({summaryText:w,sentTable:p,anchors:$,badItems:be.map(ir=>ir.q),mode:g,purpose:m,format:x});let rr=await v({system:d(),user:je,json:!0}),tt;try{tt=JSON.parse(rr)}catch{tt={items:[]}}const nr=_(p,tt);j=j.concat(nr.ok);const sr=r[g]||10;j=j.slice(0,sr)}else{const je=r[g]||10;j=j.slice(0,je)}const et=r[g]||10;if(j.length<et){const je=k({sentTable:p,anchors:$,count:et-j.length,format:x,purpose:m});j=j.concat(je).slice(0,et)}return{items:j}}function k({sentTable:v,anchors:g,count:m,format:x,purpose:w}){const p=[],$=g.slice(0,Math.max(m,1));for(let K=0;K<m;K++){const D=$[K%$.length],B=D.sid,j=D.quote;p.push({id:`QF${K+1}`,type:"short",question:w==="preview"?`요약에서 '${j}'가 의미하는 핵심 개념을 한 문장으로 말해보세요.`:`요약에서 '${j}'가 포함된 문장의 핵심 인과/관계를 한 문장으로 인출해보세요.`,choices:[],answer:"(서술형 정답: 사용자 입력 비교는 해설 기반 채점 또는 키워드 채점으로 처리)",explanation:"근거 문장을 다시 읽고 핵심을 1문장으로 재구성하면 됩니다.",evidence:{sid:B,quote:j},anchorIds:[D.id]})}return p}class y{constructor(g,{passScore:m=90}={}){this.items=Array.isArray(g)?g:[],this.passScore=m,this.state={idx:0,attempts:1,correct:0,wrongIds:new Set,finished:!1}}gradeAnswer(g,m){if(!g)return{ok:!1,reason:"no item"};const x=g.type;if(x==="mcq"||x==="blank"||x==="match"||x==="order"||x==="label"||x==="short"){if(x==="short")return{ok:!0,reason:"short-auto-pass"};const w=(g.answer||"").trim(),p=(m||"").trim();return{ok:p===w,reason:p===w?"match":"mismatch"}}return{ok:!1,reason:"unknown type"}}getScore(){return this.items.length===0?0:Math.round(this.state.correct/this.items.length*100)}currentItem(){return this.items[this.state.idx]||null}submit(g){if(this.state.finished)return{done:!0,message:"already finished"};const m=this.currentItem();if(this.gradeAnswer(m,g).ok)return this.state.correct+=1,this.next(),{ok:!0,message:"정답 처리",score:this.getScore()};if(this.state.wrongIds.add(m.id),this.state.attempts===1)return this.state.attempts=2,{ok:!1,stage:1,hint:`힌트1: 근거 문장(${m.evidence.sid})을 다시 읽어보세요.`,score:this.getScore()};if(this.state.attempts===2)return this.state.attempts=3,{ok:!1,stage:2,hint:`힌트2: 근거 구절 = '${m.evidence.quote}'`,score:this.getScore()};{const w=m.explanation||"해설 없음";return this.next(),{ok:!1,stage:3,explanation:w,score:this.getScore()}}}next(){if(this.state.idx+=1,this.state.attempts=1,this.state.idx>=this.items.length)if(this.getScore()>=this.passScore)this.state.finished=!0;else{const m=this.items.filter(x=>this.state.wrongIds.has(x.id));this.items=m.length>0?m:this.items,this.state.idx=0,this.state.attempts=1,this.state.correct=0,this.state.wrongIds=new Set}}status(){return{idx:this.state.idx,total:this.items.length,score:this.getScore(),passScore:this.passScore,finished:this.state.finished}}}async function M({llmCall:v,originalText:g,mode:m,format:x,purpose:w}){const p=await R({llmCall:v,originalText:g,mode:m,format:x}),$=await I({llmCall:v,mode:m,purpose:w,format:x,summaryText:p.summaryText,sentTable:p.sentTable,anchors:p.anchors});return{summary:{mode:m,format:x,text:p.summaryText,sentences:p.sentTable,anchors:p.anchors},selfTest:{purpose:w,passScore:90,items:$.items}}}return{computeCharTargets:a,splitSentencesKR:o,makeSentenceTable:l,generateBundle:R,generateSelfTest:I,runPipeline:M,MasteryRunner:y}})(),_n=`/* MindStory Engine Bundle (compat) */
(function(){
  if(window.__MS_ENGINE_BUNDLE__) return;
  window.__MS_ENGINE_BUNDLE__=true;
  window.callEngineAPI = async function(kind, text, options){
    const res = await fetch('/api/engine', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({
        kind,
        text,
        mode: options?.mode || options?.level || 'standard',
        viewType: options?.viewType || options?.displayMode || 'narrative',
        options: { userId: options?.userId || options?.options?.userId || 'web_user' }
      })
    });
    const data = await res.json().catch(()=>({ok:false,error:{message:'bad json'}}));
    return data;
  }
})();`;X.use("/api/*",Gr());X.get("/static/ms-engine-bundle.js",e=>e.text(_n,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));X.get("/favicon.ico",e=>e.body(null,204));X.use("/static/*",Qr({root:"./public"}));X.get("/",e=>e.html(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MindStory - 학습 요약 도우미</title>
  <style>
    :root{
      --bg0:#070A12;
      --bg1:#0B1020;
      --card: rgba(255,255,255,.06);
      --card2: rgba(255,255,255,.10);
      --stroke: rgba(255,255,255,.14);
      --txt: rgba(255,255,255,.92);
      --muted: rgba(255,255,255,.65);
      --muted2: rgba(255,255,255,.45);
      --brand:#8B5CF6;
      --brand2:#22D3EE;
      --danger:#FB7185;
      --ok:#34D399;
      --shadow: 0 18px 60px rgba(0,0,0,.55);
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
      color:var(--txt);
      background:
        radial-gradient(1200px 800px at 20% 10%, rgba(139,92,246,.25), transparent 60%),
        radial-gradient(900px 700px at 80% 30%, rgba(34,211,238,.18), transparent 60%),
        radial-gradient(1100px 800px at 50% 110%, rgba(16,185,129,.12), transparent 55%),
        linear-gradient(180deg, var(--bg0), var(--bg1));
      overflow-x:hidden;
    }
    .wrap{min-height:100%; display:flex; align-items:center; justify-content:center; padding:28px;}
    .card{
      width:min(1040px, 100%);
      background: linear-gradient(180deg, var(--card), rgba(255,255,255,.04));
      border:1px solid var(--stroke);
      border-radius:22px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      overflow:hidden;
      position:relative;
    }
    .card::before{
      content:"";
      position:absolute; inset:-2px;
      background: radial-gradient(700px 320px at 30% 0%, rgba(139,92,246,.22), transparent 60%),
                  radial-gradient(520px 260px at 90% 20%, rgba(34,211,238,.18), transparent 60%);
      pointer-events:none;
    }
    .inner{position:relative; padding:22px;}
    .top{
      display:flex; gap:14px; align-items:center; justify-content:space-between;
      padding:18px 22px;
      border-bottom: 1px solid rgba(255,255,255,.10);
      background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
    }
    .brand{
      display:flex; align-items:center; gap:12px;
    }
    .logo{
      width:44px; height:44px; border-radius:14px;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.16), rgba(255,255,255,.04)),
                  linear-gradient(135deg, rgba(139,92,246,.9), rgba(34,211,238,.75));
      border:1px solid rgba(255,255,255,.18);
      box-shadow: 0 10px 30px rgba(139,92,246,.22);
      display:flex; align-items:center; justify-content:center;
      font-weight:800;
    }
    .title h1{margin:0; font-size:22px; letter-spacing:.2px}
    .title p{margin:2px 0 0; color:var(--muted); font-size:13px}
    .status{
      display:flex; flex-direction:column; align-items:flex-end; gap:6px;
      color:var(--muted);
      font-size:12px;
    }
    .pill{
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 10px;
      border-radius:999px;
      background: rgba(0,0,0,.18);
      border:1px solid rgba(255,255,255,.12);
    }
    .dot{width:8px; height:8px; border-radius:50%;}
    .dot.ok{background:var(--ok)}
    .dot.bad{background:var(--danger)}
    .grid{
      display:grid;
      grid-template-columns: 1.2fr .8fr;
      gap:18px;
      padding:18px 22px 22px;
    }
    @media (max-width: 900px){
      .grid{grid-template-columns: 1fr;}
      .status{align-items:flex-start}
      .top{flex-direction:column; align-items:flex-start}
    }
    .panel{
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.12);
      border-radius:18px;
      padding:16px;
      backdrop-filter: blur(10px);
    }
    .label{color:var(--muted); font-size:13px; margin-bottom:10px; display:flex; gap:8px; align-items:center}
    .textarea{
      width:100%;
      min-height:220px;
      resize:vertical;
      padding:14px 14px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(0,0,0,.20);
      color:var(--txt);
      outline:none;
      line-height:1.55;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
    }
    .textarea:focus{
      border-color: rgba(139,92,246,.55);
      box-shadow: 0 0 0 4px rgba(139,92,246,.18);
    }
    .row{display:flex; align-items:center; justify-content:space-between; margin-top:10px}
    .count{color:var(--muted2); font-size:12px}
    .segTitle{color:var(--muted); font-size:12px; margin:14px 0 8px}
    .seg{
      display:flex; flex-wrap:wrap; gap:10px;
    }
    .btn{
      appearance:none; border:none; cursor:pointer;
      border-radius:12px;
      padding:10px 12px;
      color:var(--txt);
      background: rgba(255,255,255,.06);
      border:1px solid rgba(255,255,255,.12);
      transition: transform .08s ease, background .15s ease, border-color .15s ease;
      font-size:13px;
      display:inline-flex; align-items:center; gap:8px;
      user-select:none;
    }
    .btn:hover{background: rgba(255,255,255,.10)}
    .btn:active{transform: translateY(1px)}
    .btn.active{
      background: linear-gradient(135deg, rgba(139,92,246,.45), rgba(34,211,238,.18));
      border-color: rgba(139,92,246,.55);
    }
    .btn.primary{
      background: linear-gradient(135deg, rgba(139,92,246,.95), rgba(34,211,238,.55));
      border-color: rgba(255,255,255,.18);
      box-shadow: 0 18px 40px rgba(139,92,246,.18);
      font-weight:700;
    }
    .btn.primary:disabled{
      opacity:.45; cursor:not-allowed; box-shadow:none;
    }
    .btn.ghost{
      background: rgba(0,0,0,.18);
    }
    .actions{display:flex; gap:10px; margin-top:14px}
    .result{
      min-height:220px;
      display:flex; flex-direction:column; gap:10px;
    }
    .resultHead{
      display:flex; align-items:center; justify-content:space-between; gap:10px;
      padding-bottom:10px; border-bottom: 1px solid rgba(255,255,255,.10);
    }
    .resultHead h2{margin:0; font-size:16px}
    .meta{color:var(--muted2); font-size:12px}
    .out{
      background: rgba(0,0,0,.22);
      border: 1px solid rgba(255,255,255,.12);
      border-radius:14px;
      padding:14px;
      line-height:1.6;
      overflow:auto;
    }
    .out h3{margin:0 0 10px; font-size:14px}
    .out ul{margin:8px 0 0; padding-left:18px}
    .out li{margin:6px 0}
    .badge{
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 10px;
      border-radius:999px;
      background: rgba(0,0,0,.20);
      border:1px solid rgba(255,255,255,.12);
      font-size:12px; color:var(--muted);
    }
    .spin{
      width:14px; height:14px;
      border-radius:50%;
      border:2px solid rgba(255,255,255,.22);
      border-top-color: rgba(255,255,255,.75);
      animation: spin 1s linear infinite;
    }
    @keyframes spin{to{transform:rotate(360deg)}}
    .err{
      color: rgba(255,255,255,.92);
      background: rgba(251,113,133,.12);
      border:1px solid rgba(251,113,133,.25);
      padding:10px 12px; border-radius:12px;
      display:none;
    }
    .hint{color:var(--muted2); font-size:12px; margin-top:8px}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="top">
        <div class="brand">
          <div class="logo">MS</div>
          <div class="title">
            <h1>MindStory</h1>
            <p>학습 요약 도우미 · 압축 요약 엔진 (AI + 로컬 폴백)</p>
          </div>
        </div>
        <div class="status">
          <div class="pill" id="healthPill">
            <span class="dot bad" id="healthDot"></span>
            <span id="healthText">엔진 연결 확인 중…</span>
          </div>
          <div class="meta" id="healthMeta">—</div>
        </div>
      </div>

      <div class="grid">
        <div class="panel">
          <div class="label">입력 텍스트</div>
          <textarea id="inputText" class="textarea" placeholder="여기에 요약할 텍스트를 붙여넣거나 입력하세요. (텍스트 손실 없이 동작)"></textarea>
          <div class="row">
            <div class="hint">요약은 문장을 "자르지 않고" 의미 단위로 압축합니다.</div>
            <div class="count"><span id="charCount">0</span> 자</div>
          </div>

          <div class="segTitle">요약 모드</div>
          <div class="seg" id="modeSeg">
            <button class="btn" data-mode="brief">⚡ 간단</button>
            <button class="btn active" data-mode="standard">⚖️ 표준</button>
            <button class="btn" data-mode="detail">🔬 상세</button>
          </div>

          <div class="segTitle">보기 형식</div>
          <div class="seg" id="viewSeg">
            <button class="btn active" data-view="narrative">📘 서술형</button>
            <button class="btn" data-view="structured">🧱 구조화</button>
            <button class="btn" data-view="mindmap">🧠 마인드맵</button>
            <button class="btn" data-view="selftest">✅ 자가테스트</button>
          </div>

          <div class="actions">
            <button id="summarizeBtn" class="btn primary" disabled>✨ 요약하기</button>
            <button id="clearBtn" class="btn ghost">🧹 지우기</button>
          </div>
          <div class="err" id="errBox"></div>
        </div>

        <div class="panel result">
          <div class="resultHead">
            <h2>결과</h2>
            <div style="display:flex; gap:10px; align-items:center;">
              <span class="badge" id="runBadge"><span class="spin" id="spin" style="display:none"></span><span id="runText">대기</span></span>
              <button id="copyBtn" class="btn">📋 복사</button>
            </div>
          </div>
          <div class="out" id="out">
            <div class="meta">아직 결과가 없습니다. 오른쪽 상단 상태가 'OK'인지 확인 후 요약을 실행하세요.</div>
          </div>
          <div class="meta" id="resultMeta">—</div>
        </div>
      </div>
    </div>
  </div>

  <!-- =======================================================
       MindStory Engine Scripts (ORDER MATTERS)
       위치: </body> 직전
  ======================================================= -->

  <!-- 0) 번들 (이미 라우트로 제공됨 /static/ms-engine-bundle.js) -->
  <script src="/static/ms-engine-bundle.js"><\/script>

  <!-- 1) API 호출 래퍼 -->
  <script src="/static/engine-api-client.js"><\/script>

  <!-- 2) 파이프라인(캐시/중복방지/자동 base 준비) -->
  <script src="/static/summary-pipeline.js"><\/script>

  <!-- 3) UI 탭/렌더링/이벤트 바인딩 -->
  <script src="/static/result-ui.js"><\/script>

  <!-- 4) Health check (독립 유지) -->
  <script>
    (function(){
      const healthDot = document.getElementById('healthDot');
      const healthText = document.getElementById('healthText');
      const healthMeta = document.getElementById('healthMeta');

      async function health(){
        try{
          const r = await fetch('/api/health');
          const j = await r.json();
          if(j.ok){
            healthDot.className = 'dot ok';
            healthText.textContent = '엔진 OK · ' + (j.engineMode || 'unknown');
            healthMeta.textContent = 'db:' + (j.hasDB ? 'on' : 'off') + ' · ' + (j.ts || '');
          }else{
            healthDot.className = 'dot bad';
            healthText.textContent = '엔진 응답 비정상';
            healthMeta.textContent = '';
          }
        }catch{
          healthDot.className = 'dot bad';
          healthText.textContent = '엔진 연결 실패';
          healthMeta.textContent = '';
        }
      }
      health();
      setInterval(health, 8000);
    })();
  <\/script>
</body>
</html>`));X.get("/api/health",e=>{const t=!!C(e.env.GEMINI_API_KEY).trim(),r=C(e.env.USE_MOCK).trim().toLowerCase()==="true";return e.json({ok:!0,ts:Yt(),hasDB:!!e.env.DB,hasGeminiKey:t,engineMode:t&&!r?"gemini+fallback":"local-only"})});X.post("/api/gens/run",async e=>{const t=Date.now();let r=null;try{r=await e.req.json()}catch{return e.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const n=C((r==null?void 0:r.text)||(r==null?void 0:r.originalText)||""),s=Xt((r==null?void 0:r.mode)||"standard"),i=Vt((r==null?void 0:r.format)||(r==null?void 0:r.viewType)||"narrative"),a=C((r==null?void 0:r.purpose)||"preview").trim().toLowerCase();if(!n)return e.json({ok:!1,error:{code:"NO_TEXT",message:"원문 텍스트가 필요합니다."}},400);const o=!!C(e.env.GEMINI_API_KEY).trim(),l=C(e.env.USE_MOCK).trim().toLowerCase()==="true";if(!o||l)return e.json({ok:!1,error:{code:"GEMINI_REQUIRED",message:"GENS Engine은 Gemini API가 필요합니다. .dev.vars에 GEMINI_API_KEY를 설정하세요."},guide:{step1:".dev.vars 파일 생성",step2:"GEMINI_API_KEY=your_api_key_here 추가",step3:"서비스 재시작: pm2 restart webapp"}},503);const c=async({system:d,user:h,json:f})=>{if(f){const b=`${d}

${h}

출력은 반드시 JSON만 출력하라. 다른 텍스트 금지.`;return await er(e.env,b)}else return(await On(e.env,d,h)||"").toString()};try{const d=await Nn.runPipeline({llmCall:c,originalText:n,mode:s,format:i,purpose:a==="exam"?"exam":"preview"});return e.json({ok:!0,data:d,meta:{engine:"gens-v3",mode:s,format:i,purpose:a,elapsedMs:Date.now()-t}},200)}catch(d){return console.error("[GENS Engine Error]",d),e.json({ok:!1,error:{code:"GENS_ERROR",message:d.message||"GENS 엔진 오류",details:d.stack}},500)}});X.post("/api/engine",async e=>{var A,R;const t=Date.now(),r=e.env.DB;await Sn(r);let n=null;try{n=await e.req.json()}catch{return e.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=nn(n==null?void 0:n.kind),i=C((n==null?void 0:n.text)||""),a=Xt((n==null?void 0:n.mode)||(n==null?void 0:n.level)),o=Vt((n==null?void 0:n.viewType)||(n==null?void 0:n.displayMode)),l=C(((A=n==null?void 0:n.options)==null?void 0:A.userId)||(n==null?void 0:n.userId)||"anon");if(!i.trim()||i.trim().length<5)return e.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const c=yn(s,a,o,i,l||null),d=await Et(r,c);if(d.hit)return e.json({ok:!0,data:d.data,meta:{cached:!0,cacheStore:d.store,cacheType:"derived",engine:"cache",elapsedMs:Date.now()-t}},200);const h=wn(s,a,i,l||null),f=await Et(r,h);if(f.hit&&((R=f.data)!=null&&R.narrative)){const N=f.data.narrative;let I;return o==="narrative"?I={kind:s,mode:a,viewType:o,narrative:N}:o==="structured"?I={kind:s,mode:a,...Ke(N)}:o==="mindmap"?I={kind:s,mode:a,...ze(N)}:I={kind:s,mode:a,...Ue(N)},await $e(r,c,l||"anon",I),e.json({ok:!0,data:I,meta:{cached:!0,cacheStore:"derived",cacheType:"converted",engine:"local-convert",elapsedMs:Date.now()-t}},200)}const b=!!C(e.env.GEMINI_API_KEY).trim(),S=C(e.env.USE_MOCK).trim().toLowerCase()==="true";if(s==="summary"&&b&&!S)try{const N=await An(e.env,i),I=N.brief,k=N.standard,y=`**개념**
${N.detail.개념}

**영향**
${N.detail.영향}

**교육적 가치**
${N.detail["교육적 가치"]}`,M=Ke(I),v=Ke(k),g=Ke(y),m=ze(I),x=ze(k),w=ze(y),p=Ue(I),$=Ue(k),K=Ue(y),D=dn({structured:{brief:M,standard:v,detail:g},mindmap:{brief:m,standard:x,detail:w},selftest:{brief:p,standard:$,detail:K}});let B,j;a==="brief"?(B=I,o==="structured"?j={kind:s,mode:a,viewType:o,...D.structured.brief}:o==="mindmap"?j={kind:s,mode:a,viewType:o,...D.mindmap.brief}:o==="selftest"?j={kind:s,mode:a,viewType:o,...D.selftest.brief}:j={kind:s,mode:a,viewType:o,narrative:B}):a==="standard"?(B=k,o==="structured"?j={kind:s,mode:a,viewType:o,...D.structured.standard}:o==="mindmap"?j={kind:s,mode:a,viewType:o,...D.mindmap.standard}:o==="selftest"?j={kind:s,mode:a,viewType:o,...D.selftest.standard}:j={kind:s,mode:a,viewType:o,narrative:B}):(B=y,o==="structured"?j={kind:s,mode:a,viewType:o,...D.structured.detail}:o==="mindmap"?j={kind:s,mode:a,viewType:o,...D.mindmap.detail}:o==="selftest"?j={kind:s,mode:a,viewType:o,...D.selftest.detail}:j={kind:s,mode:a,viewType:o,narrative:B});const be={kind:s,mode:a,viewType:"narrative",narrative:B,allSummaries:{brief:I,standard:k,detail:N.detail},meta:N.meta};return await $e(r,h,l||"anon",be),await $e(r,c,l||"anon",j),e.json({ok:!0,data:j,meta:{cached:!1,engine:"gemini-json-v3-enforced",elapsedMs:Date.now()-t,enforced:["structured","mindmap","selftest"]}},200)}catch(N){console.error("[Gemini JSON Error]",N)}const _=vn(i,a,o);if(await $e(r,c,l||"anon",_),_.narrative){const N={kind:"summary",mode:a,viewType:"narrative",narrative:_.narrative};await $e(r,h,l||"anon",N)}return e.json({ok:!0,data:_,meta:{cached:!1,engine:"local",elapsedMs:Date.now()-t}},200)});X.get("/health",e=>e.json({ok:!0,service:"MindStory v2 Revised"}));X.notFound(e=>e.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const Ot=new Jt,Tn=Object.assign({"/src/index.tsx":X});let tr=!1;for(const[,e]of Object.entries(Tn))e&&(Ot.route("/",e),Ot.notFound(e.notFoundHandler),tr=!0);if(!tr)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{Ot as default};
