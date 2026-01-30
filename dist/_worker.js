var Zt=Object.defineProperty;var st=t=>{throw TypeError(t)};var er=(t,e,r)=>e in t?Zt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var S=(t,e,r)=>er(t,typeof e!="symbol"?e+"":e,r),Xe=(t,e,r)=>e.has(t)||st("Cannot "+r);var d=(t,e,r)=>(Xe(t,e,"read from private field"),r?r.call(t):e.get(t)),_=(t,e,r)=>e.has(t)?st("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),E=(t,e,r,n)=>(Xe(t,e,"write to private field"),n?n.call(t,r):e.set(t,r),r),C=(t,e,r)=>(Xe(t,e,"access private method"),r);var at=(t,e,r,n)=>({set _(s){E(t,e,s,r)},get _(){return d(t,e,n)}});var it=(t,e,r)=>(n,s)=>{let i=-1;return a(0);async function a(o){if(o<=i)throw new Error("next() called multiple times");i=o;let l,c=!1,u;if(t[o]?(u=t[o][0][0],n.req.routeIndex=o):u=o===t.length&&s||void 0,u)try{l=await u(n,()=>a(o+1))}catch(h){if(h instanceof Error&&e)n.error=h,l=await e(h,n),c=!0;else throw h}else n.finalized===!1&&r&&(l=await r(n));return l&&(n.finalized===!1||c)&&(n.res=l),n}},tr=Symbol(),rr=async(t,e=Object.create(null))=>{const{all:r=!1,dot:n=!1}=e,i=(t instanceof Rt?t.raw.headers:t.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?nr(t,{all:r,dot:n}):{}};async function nr(t,e){const r=await t.formData();return r?sr(r,e):{}}function sr(t,e){const r=Object.create(null);return t.forEach((n,s)=>{e.all||s.endsWith("[]")?ar(r,s,n):r[s]=n}),e.dot&&Object.entries(r).forEach(([n,s])=>{n.includes(".")&&(ir(r,n,s),delete r[n])}),r}var ar=(t,e,r)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(r):t[e]=[t[e],r]:e.endsWith("[]")?t[e]=[r]:t[e]=r},ir=(t,e,r)=>{let n=t;const s=e.split(".");s.forEach((i,a)=>{a===s.length-1?n[i]=r:((!n[i]||typeof n[i]!="object"||Array.isArray(n[i])||n[i]instanceof File)&&(n[i]=Object.create(null)),n=n[i])})},Ot=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},or=t=>{const{groups:e,path:r}=cr(t),n=Ot(r);return lr(n,e)},cr=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(r,n)=>{const s=`@${n}`;return e.push([s,r]),s}),{groups:e,path:t}},lr=(t,e)=>{for(let r=e.length-1;r>=0;r--){const[n]=e[r];for(let s=t.length-1;s>=0;s--)if(t[s].includes(n)){t[s]=t[s].replace(n,e[r][1]);break}}return t},Ge={},dr=(t,e)=>{if(t==="*")return"*";const r=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const n=`${t}#${e}`;return Ge[n]||(r[2]?Ge[n]=e&&e[0]!==":"&&e[0]!=="*"?[n,r[1],new RegExp(`^${r[2]}(?=/${e})`)]:[t,r[1],new RegExp(`^${r[2]}$`)]:Ge[n]=[t,r[1],!0]),Ge[n]}return null},nt=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return e(r)}catch{return r}})}},ur=t=>nt(t,decodeURI),At=t=>{const e=t.url,r=e.indexOf("/",e.indexOf(":")+4);let n=r;for(;n<e.length;n++){const s=e.charCodeAt(n);if(s===37){const i=e.indexOf("?",n),a=e.slice(r,i===-1?void 0:i);return ur(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(s===63)break}return e.slice(r,n)},hr=t=>{const e=At(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},xe=(t,e,...r)=>(r.length&&(e=xe(e,...r)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),_t=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),r=[];let n="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))n+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){r.length===0&&n===""?r.push("/"):r.push(n);const i=s.replace("?","");n+="/"+i,r.push(n)}else n+="/"+s}),r.filter((s,i,a)=>a.indexOf(s)===i)},Ve=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?nt(t,Nt):t):t,Tt=(t,e,r)=>{let n;if(!r&&e&&!/[%+]/.test(e)){let a=t.indexOf("?",8);if(a===-1)return;for(t.startsWith(e,a+1)||(a=t.indexOf(`&${e}`,a+1));a!==-1;){const o=t.charCodeAt(a+e.length+1);if(o===61){const l=a+e.length+2,c=t.indexOf("&",l);return Ve(t.slice(l,c===-1?void 0:c))}else if(o==38||isNaN(o))return"";a=t.indexOf(`&${e}`,a+1)}if(n=/[%+]/.test(t),!n)return}const s={};n??(n=/[%+]/.test(t));let i=t.indexOf("?",8);for(;i!==-1;){const a=t.indexOf("&",i+1);let o=t.indexOf("=",i);o>a&&a!==-1&&(o=-1);let l=t.slice(i+1,o===-1?a===-1?void 0:a:o);if(n&&(l=Ve(l)),i=a,l==="")continue;let c;o===-1?c="":(c=t.slice(o+1,a===-1?void 0:a),n&&(c=Ve(c))),r?(s[l]&&Array.isArray(s[l])||(s[l]=[]),s[l].push(c)):s[l]??(s[l]=c)}return e?s[e]:s},fr=Tt,pr=(t,e)=>Tt(t,e,!0),Nt=decodeURIComponent,ot=t=>nt(t,Nt),ye,K,ee,Ct,jt,rt,te,bt,Rt=(bt=class{constructor(t,e="/",r=[[]]){_(this,ee);S(this,"raw");_(this,ye);_(this,K);S(this,"routeIndex",0);S(this,"path");S(this,"bodyCache",{});_(this,te,t=>{const{bodyCache:e,raw:r}=this,n=e[t];if(n)return n;const s=Object.keys(e)[0];return s?e[s].then(i=>(s==="json"&&(i=JSON.stringify(i)),new Response(i)[t]())):e[t]=r[t]()});this.raw=t,this.path=e,E(this,K,r),E(this,ye,{})}param(t){return t?C(this,ee,Ct).call(this,t):C(this,ee,jt).call(this)}query(t){return fr(this.url,t)}queries(t){return pr(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((r,n)=>{e[n]=r}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await rr(this,t))}json(){return d(this,te).call(this,"text").then(t=>JSON.parse(t))}text(){return d(this,te).call(this,"text")}arrayBuffer(){return d(this,te).call(this,"arrayBuffer")}blob(){return d(this,te).call(this,"blob")}formData(){return d(this,te).call(this,"formData")}addValidatedData(t,e){d(this,ye)[t]=e}valid(t){return d(this,ye)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[tr](){return d(this,K)}get matchedRoutes(){return d(this,K)[0].map(([[,t]])=>t)}get routePath(){return d(this,K)[0].map(([[,t]])=>t)[this.routeIndex].path}},ye=new WeakMap,K=new WeakMap,ee=new WeakSet,Ct=function(t){const e=d(this,K)[0][this.routeIndex][1][t],r=C(this,ee,rt).call(this,e);return r&&/\%/.test(r)?ot(r):r},jt=function(){const t={},e=Object.keys(d(this,K)[0][this.routeIndex][1]);for(const r of e){const n=C(this,ee,rt).call(this,d(this,K)[0][this.routeIndex][1][r]);n!==void 0&&(t[r]=/\%/.test(n)?ot(n):n)}return t},rt=function(t){return d(this,K)[1]?d(this,K)[1][t]:t},te=new WeakMap,bt),mr={Stringify:1},$t=async(t,e,r,n,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const i=t.callbacks;return i!=null&&i.length?(s?s[0]+=t:s=[t],Promise.all(i.map(o=>o({phase:e,buffer:s,context:n}))).then(o=>Promise.all(o.filter(Boolean).map(l=>$t(l,e,!1,n,s))).then(()=>s[0]))):Promise.resolve(t)},gr="text/plain; charset=UTF-8",Qe=(t,e)=>({"Content-Type":t,...e}),Me,ke,X,Ee,V,G,Ie,Se,Oe,le,Pe,De,re,be,vt,xr=(vt=class{constructor(t,e){_(this,re);_(this,Me);_(this,ke);S(this,"env",{});_(this,X);S(this,"finalized",!1);S(this,"error");_(this,Ee);_(this,V);_(this,G);_(this,Ie);_(this,Se);_(this,Oe);_(this,le);_(this,Pe);_(this,De);S(this,"render",(...t)=>(d(this,Se)??E(this,Se,e=>this.html(e)),d(this,Se).call(this,...t)));S(this,"setLayout",t=>E(this,Ie,t));S(this,"getLayout",()=>d(this,Ie));S(this,"setRenderer",t=>{E(this,Se,t)});S(this,"header",(t,e,r)=>{this.finalized&&E(this,G,new Response(d(this,G).body,d(this,G)));const n=d(this,G)?d(this,G).headers:d(this,le)??E(this,le,new Headers);e===void 0?n.delete(t):r!=null&&r.append?n.append(t,e):n.set(t,e)});S(this,"status",t=>{E(this,Ee,t)});S(this,"set",(t,e)=>{d(this,X)??E(this,X,new Map),d(this,X).set(t,e)});S(this,"get",t=>d(this,X)?d(this,X).get(t):void 0);S(this,"newResponse",(...t)=>C(this,re,be).call(this,...t));S(this,"body",(t,e,r)=>C(this,re,be).call(this,t,e,r));S(this,"text",(t,e,r)=>!d(this,le)&&!d(this,Ee)&&!e&&!r&&!this.finalized?new Response(t):C(this,re,be).call(this,t,e,Qe(gr,r)));S(this,"json",(t,e,r)=>C(this,re,be).call(this,JSON.stringify(t),e,Qe("application/json",r)));S(this,"html",(t,e,r)=>{const n=s=>C(this,re,be).call(this,s,e,Qe("text/html; charset=UTF-8",r));return typeof t=="object"?$t(t,mr.Stringify,!1,{}).then(n):n(t)});S(this,"redirect",(t,e)=>{const r=String(t);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,e??302)});S(this,"notFound",()=>(d(this,Oe)??E(this,Oe,()=>new Response),d(this,Oe).call(this,this)));E(this,Me,t),e&&(E(this,V,e.executionCtx),this.env=e.env,E(this,Oe,e.notFoundHandler),E(this,De,e.path),E(this,Pe,e.matchResult))}get req(){return d(this,ke)??E(this,ke,new Rt(d(this,Me),d(this,De),d(this,Pe))),d(this,ke)}get event(){if(d(this,V)&&"respondWith"in d(this,V))return d(this,V);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,V))return d(this,V);throw Error("This context has no ExecutionContext")}get res(){return d(this,G)||E(this,G,new Response(null,{headers:d(this,le)??E(this,le,new Headers)}))}set res(t){if(d(this,G)&&t){t=new Response(t.body,t);for(const[e,r]of d(this,G).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const n=d(this,G).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of n)t.headers.append("set-cookie",s)}else t.headers.set(e,r)}E(this,G,t),this.finalized=!0}get var(){return d(this,X)?Object.fromEntries(d(this,X)):{}}},Me=new WeakMap,ke=new WeakMap,X=new WeakMap,Ee=new WeakMap,V=new WeakMap,G=new WeakMap,Ie=new WeakMap,Se=new WeakMap,Oe=new WeakMap,le=new WeakMap,Pe=new WeakMap,De=new WeakMap,re=new WeakSet,be=function(t,e,r){const n=d(this,G)?new Headers(d(this,G).headers):d(this,le)??new Headers;if(typeof e=="object"&&"headers"in e){const i=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[a,o]of i)a.toLowerCase()==="set-cookie"?n.append(a,o):n.set(a,o)}if(r)for(const[i,a]of Object.entries(r))if(typeof a=="string")n.set(i,a);else{n.delete(i);for(const o of a)n.append(i,o)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??d(this,Ee);return new Response(t,{status:s,headers:n})},vt),k="ALL",br="all",vr=["get","post","put","delete","options","patch"],Mt="Can not add a route since the matcher is already built.",kt=class extends Error{},wr="__COMPOSED_HANDLER",yr=t=>t.text("404 Not Found",404),ct=(t,e)=>{if("getResponse"in t){const r=t.getResponse();return e.newResponse(r.body,r)}return console.error(t),e.text("Internal Server Error",500)},q,I,It,z,oe,Fe,Ke,Ae,Er=(Ae=class{constructor(e={}){_(this,I);S(this,"get");S(this,"post");S(this,"put");S(this,"delete");S(this,"options");S(this,"patch");S(this,"all");S(this,"on");S(this,"use");S(this,"router");S(this,"getPath");S(this,"_basePath","/");_(this,q,"/");S(this,"routes",[]);_(this,z,yr);S(this,"errorHandler",ct);S(this,"onError",e=>(this.errorHandler=e,this));S(this,"notFound",e=>(E(this,z,e),this));S(this,"fetch",(e,...r)=>C(this,I,Ke).call(this,e,r[1],r[0],e.method));S(this,"request",(e,r,n,s)=>e instanceof Request?this.fetch(r?new Request(e,r):e,n,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${xe("/",e)}`,r),n,s)));S(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(C(this,I,Ke).call(this,e.request,e,void 0,e.request.method))})});[...vr,br].forEach(i=>{this[i]=(a,...o)=>(typeof a=="string"?E(this,q,a):C(this,I,oe).call(this,i,d(this,q),a),o.forEach(l=>{C(this,I,oe).call(this,i,d(this,q),l)}),this)}),this.on=(i,a,...o)=>{for(const l of[a].flat()){E(this,q,l);for(const c of[i].flat())o.map(u=>{C(this,I,oe).call(this,c.toUpperCase(),d(this,q),u)})}return this},this.use=(i,...a)=>(typeof i=="string"?E(this,q,i):(E(this,q,"*"),a.unshift(i)),a.forEach(o=>{C(this,I,oe).call(this,k,d(this,q),o)}),this);const{strict:n,...s}=e;Object.assign(this,s),this.getPath=n??!0?e.getPath??At:hr}route(e,r){const n=this.basePath(e);return r.routes.map(s=>{var a;let i;r.errorHandler===ct?i=s.handler:(i=async(o,l)=>(await it([],r.errorHandler)(o,()=>s.handler(o,l))).res,i[wr]=s.handler),C(a=n,I,oe).call(a,s.method,s.path,i)}),this}basePath(e){const r=C(this,I,It).call(this);return r._basePath=xe(this._basePath,e),r}mount(e,r,n){let s,i;n&&(typeof n=="function"?i=n:(i=n.optionHandler,n.replaceRequest===!1?s=l=>l:s=n.replaceRequest));const a=i?l=>{const c=i(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};s||(s=(()=>{const l=xe(this._basePath,e),c=l==="/"?0:l.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(c)||"/",new Request(h,u)}})());const o=async(l,c)=>{const u=await r(s(l.req.raw),...a(l));if(u)return u;await c()};return C(this,I,oe).call(this,k,xe(e,"*"),o),this}},q=new WeakMap,I=new WeakSet,It=function(){const e=new Ae({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,E(e,z,d(this,z)),e.routes=this.routes,e},z=new WeakMap,oe=function(e,r,n){e=e.toUpperCase(),r=xe(this._basePath,r);const s={basePath:this._basePath,path:r,method:e,handler:n};this.router.add(e,r,[n,s]),this.routes.push(s)},Fe=function(e,r){if(e instanceof Error)return this.errorHandler(e,r);throw e},Ke=function(e,r,n,s){if(s==="HEAD")return(async()=>new Response(null,await C(this,I,Ke).call(this,e,r,n,"GET")))();const i=this.getPath(e,{env:n}),a=this.router.match(s,i),o=new xr(e,{path:i,matchResult:a,env:n,executionCtx:r,notFoundHandler:d(this,z)});if(a[0].length===1){let c;try{c=a[0][0][0][0](o,async()=>{o.res=await d(this,z).call(this,o)})}catch(u){return C(this,I,Fe).call(this,u,o)}return c instanceof Promise?c.then(u=>u||(o.finalized?o.res:d(this,z).call(this,o))).catch(u=>C(this,I,Fe).call(this,u,o)):c??d(this,z).call(this,o)}const l=it(a[0],this.errorHandler,d(this,z));return(async()=>{try{const c=await l(o);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return C(this,I,Fe).call(this,c,o)}})()},Ae),Pt=[];function Sr(t,e){const r=this.buildAllMatchers(),n=(s,i)=>{const a=r[s]||r[k],o=a[2][i];if(o)return o;const l=i.match(a[0]);if(!l)return[[],Pt];const c=l.indexOf("",1);return[a[1][c],l]};return this.match=n,n(t,e)}var ze="[^/]+",je=".*",$e="(?:|/.*)",ve=Symbol(),Or=new Set(".\\+*[^]$()");function Ar(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===je||t===$e?1:e===je||e===$e?-1:t===ze?1:e===ze?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var de,ue,B,me,_r=(me=class{constructor(){_(this,de);_(this,ue);_(this,B,Object.create(null))}insert(e,r,n,s,i){if(e.length===0){if(d(this,de)!==void 0)throw ve;if(i)return;E(this,de,r);return}const[a,...o]=e,l=a==="*"?o.length===0?["","",je]:["","",ze]:a==="/*"?["","",$e]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const u=l[1];let h=l[2]||ze;if(u&&l[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw ve;if(c=d(this,B)[h],!c){if(Object.keys(d(this,B)).some(m=>m!==je&&m!==$e))throw ve;if(i)return;c=d(this,B)[h]=new me,u!==""&&E(c,ue,s.varIndex++)}!i&&u!==""&&n.push([u,d(c,ue)])}else if(c=d(this,B)[a],!c){if(Object.keys(d(this,B)).some(u=>u.length>1&&u!==je&&u!==$e))throw ve;if(i)return;c=d(this,B)[a]=new me}c.insert(o,r,n,s,i)}buildRegExpStr(){const r=Object.keys(d(this,B)).sort(Ar).map(n=>{const s=d(this,B)[n];return(typeof d(s,ue)=="number"?`(${n})@${d(s,ue)}`:Or.has(n)?`\\${n}`:n)+s.buildRegExpStr()});return typeof d(this,de)=="number"&&r.unshift(`#${d(this,de)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},de=new WeakMap,ue=new WeakMap,B=new WeakMap,me),Be,Le,wt,Tr=(wt=class{constructor(){_(this,Be,{varIndex:0});_(this,Le,new _r)}insert(t,e,r){const n=[],s=[];for(let a=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,l=>{const c=`@\\${a}`;return s[a]=[c,l],a++,o=!0,c}),!o)break}const i=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=s.length-1;a>=0;a--){const[o]=s[a];for(let l=i.length-1;l>=0;l--)if(i[l].indexOf(o)!==-1){i[l]=i[l].replace(o,s[a][1]);break}}return d(this,Le).insert(i,e,n,d(this,Be),r),n}buildRegExp(){let t=d(this,Le).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const r=[],n=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,i,a)=>i!==void 0?(r[++e]=Number(i),"$()"):(a!==void 0&&(n[Number(a)]=++e),"")),[new RegExp(`^${t}`),r,n]}},Be=new WeakMap,Le=new WeakMap,wt),Nr=[/^$/,[],Object.create(null)],Ue=Object.create(null);function Dt(t){return Ue[t]??(Ue[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Rr(){Ue=Object.create(null)}function Cr(t){var c;const e=new Tr,r=[];if(t.length===0)return Nr;const n=t.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[m,v])=>u?1:m?-1:h.length-v.length),s=Object.create(null);for(let u=0,h=-1,m=n.length;u<m;u++){const[v,O,T]=n[u];v?s[O]=[T.map(([j])=>[j,Object.create(null)]),Pt]:h++;let A;try{A=e.insert(O,h,v)}catch(j){throw j===ve?new kt(O):j}v||(r[h]=T.map(([j,N])=>{const M=Object.create(null);for(N-=1;N>=0;N--){const[U,y]=A[N];M[U]=y}return[j,M]}))}const[i,a,o]=e.buildRegExp();for(let u=0,h=r.length;u<h;u++)for(let m=0,v=r[u].length;m<v;m++){const O=(c=r[u][m])==null?void 0:c[1];if(!O)continue;const T=Object.keys(O);for(let A=0,j=T.length;A<j;A++)O[T[A]]=o[O[T[A]]]}const l=[];for(const u in a)l[u]=r[a[u]];return[i,l,s]}function ge(t,e){if(t){for(const r of Object.keys(t).sort((n,s)=>s.length-n.length))if(Dt(r).test(e))return[...t[r]]}}var ne,se,Je,Lt,yt,jr=(yt=class{constructor(){_(this,Je);S(this,"name","RegExpRouter");_(this,ne);_(this,se);S(this,"match",Sr);E(this,ne,{[k]:Object.create(null)}),E(this,se,{[k]:Object.create(null)})}add(t,e,r){var o;const n=d(this,ne),s=d(this,se);if(!n||!s)throw new Error(Mt);n[t]||[n,s].forEach(l=>{l[t]=Object.create(null),Object.keys(l[k]).forEach(c=>{l[t][c]=[...l[k][c]]})}),e==="/*"&&(e="*");const i=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const l=Dt(e);t===k?Object.keys(n).forEach(c=>{var u;(u=n[c])[e]||(u[e]=ge(n[c],e)||ge(n[k],e)||[])}):(o=n[t])[e]||(o[e]=ge(n[t],e)||ge(n[k],e)||[]),Object.keys(n).forEach(c=>{(t===k||t===c)&&Object.keys(n[c]).forEach(u=>{l.test(u)&&n[c][u].push([r,i])})}),Object.keys(s).forEach(c=>{(t===k||t===c)&&Object.keys(s[c]).forEach(u=>l.test(u)&&s[c][u].push([r,i]))});return}const a=_t(e)||[e];for(let l=0,c=a.length;l<c;l++){const u=a[l];Object.keys(s).forEach(h=>{var m;(t===k||t===h)&&((m=s[h])[u]||(m[u]=[...ge(n[h],u)||ge(n[k],u)||[]]),s[h][u].push([r,i-c+l+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(d(this,se)).concat(Object.keys(d(this,ne))).forEach(e=>{t[e]||(t[e]=C(this,Je,Lt).call(this,e))}),E(this,ne,E(this,se,void 0)),Rr(),t}},ne=new WeakMap,se=new WeakMap,Je=new WeakSet,Lt=function(t){const e=[];let r=t===k;return[d(this,ne),d(this,se)].forEach(n=>{const s=n[t]?Object.keys(n[t]).map(i=>[i,n[t][i]]):[];s.length!==0?(r||(r=!0),e.push(...s)):t!==k&&e.push(...Object.keys(n[k]).map(i=>[i,n[k][i]]))}),r?Cr(e):null},yt),ae,Q,Et,$r=(Et=class{constructor(t){S(this,"name","SmartRouter");_(this,ae,[]);_(this,Q,[]);E(this,ae,t.routers)}add(t,e,r){if(!d(this,Q))throw new Error(Mt);d(this,Q).push([t,e,r])}match(t,e){if(!d(this,Q))throw new Error("Fatal error");const r=d(this,ae),n=d(this,Q),s=r.length;let i=0,a;for(;i<s;i++){const o=r[i];try{for(let l=0,c=n.length;l<c;l++)o.add(...n[l]);a=o.match(t,e)}catch(l){if(l instanceof kt)continue;throw l}this.match=o.match.bind(o),E(this,ae,[o]),E(this,Q,void 0);break}if(i===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(d(this,Q)||d(this,ae).length!==1)throw new Error("No active router has been determined yet.");return d(this,ae)[0]}},ae=new WeakMap,Q=new WeakMap,Et),Re=Object.create(null),ie,H,he,_e,D,Z,ce,Te,Mr=(Te=class{constructor(e,r,n){_(this,Z);_(this,ie);_(this,H);_(this,he);_(this,_e,0);_(this,D,Re);if(E(this,H,n||Object.create(null)),E(this,ie,[]),e&&r){const s=Object.create(null);s[e]={handler:r,possibleKeys:[],score:0},E(this,ie,[s])}E(this,he,[])}insert(e,r,n){E(this,_e,++at(this,_e)._);let s=this;const i=or(r),a=[];for(let o=0,l=i.length;o<l;o++){const c=i[o],u=i[o+1],h=dr(c,u),m=Array.isArray(h)?h[0]:c;if(m in d(s,H)){s=d(s,H)[m],h&&a.push(h[1]);continue}d(s,H)[m]=new Te,h&&(d(s,he).push(h),a.push(h[1])),s=d(s,H)[m]}return d(s,ie).push({[e]:{handler:n,possibleKeys:a.filter((o,l,c)=>c.indexOf(o)===l),score:d(this,_e)}}),s}search(e,r){var l;const n=[];E(this,D,Re);let i=[this];const a=Ot(r),o=[];for(let c=0,u=a.length;c<u;c++){const h=a[c],m=c===u-1,v=[];for(let O=0,T=i.length;O<T;O++){const A=i[O],j=d(A,H)[h];j&&(E(j,D,d(A,D)),m?(d(j,H)["*"]&&n.push(...C(this,Z,ce).call(this,d(j,H)["*"],e,d(A,D))),n.push(...C(this,Z,ce).call(this,j,e,d(A,D)))):v.push(j));for(let N=0,M=d(A,he).length;N<M;N++){const U=d(A,he)[N],y=d(A,D)===Re?{}:{...d(A,D)};if(U==="*"){const w=d(A,H)["*"];w&&(n.push(...C(this,Z,ce).call(this,w,e,d(A,D))),E(w,D,y),v.push(w));continue}const[$,b,g]=U;if(!h&&!(g instanceof RegExp))continue;const p=d(A,H)[$],x=a.slice(c).join("/");if(g instanceof RegExp){const w=g.exec(x);if(w){if(y[b]=w[0],n.push(...C(this,Z,ce).call(this,p,e,d(A,D),y)),Object.keys(d(p,H)).length){E(p,D,y);const f=((l=w[0].match(/\//))==null?void 0:l.length)??0;(o[f]||(o[f]=[])).push(p)}continue}}(g===!0||g.test(h))&&(y[b]=h,m?(n.push(...C(this,Z,ce).call(this,p,e,y,d(A,D))),d(p,H)["*"]&&n.push(...C(this,Z,ce).call(this,d(p,H)["*"],e,y,d(A,D)))):(E(p,D,y),v.push(p)))}}i=v.concat(o.shift()??[])}return n.length>1&&n.sort((c,u)=>c.score-u.score),[n.map(({handler:c,params:u})=>[c,u])]}},ie=new WeakMap,H=new WeakMap,he=new WeakMap,_e=new WeakMap,D=new WeakMap,Z=new WeakSet,ce=function(e,r,n,s){const i=[];for(let a=0,o=d(e,ie).length;a<o;a++){const l=d(e,ie)[a],c=l[r]||l[k],u={};if(c!==void 0&&(c.params=Object.create(null),i.push(c),n!==Re||s&&s!==Re))for(let h=0,m=c.possibleKeys.length;h<m;h++){const v=c.possibleKeys[h],O=u[c.score];c.params[v]=s!=null&&s[v]&&!O?s[v]:n[v]??(s==null?void 0:s[v]),u[c.score]=!0}}return i},Te),fe,St,kr=(St=class{constructor(){S(this,"name","TrieRouter");_(this,fe);E(this,fe,new Mr)}add(t,e,r){const n=_t(e);if(n){for(let s=0,i=n.length;s<i;s++)d(this,fe).insert(t,n[s],r);return}d(this,fe).insert(t,e,r)}match(t,e){return d(this,fe).search(t,e)}},fe=new WeakMap,St),Ht=class extends Er{constructor(t={}){super(t),this.router=t.router??new $r({routers:[new jr,new kr]})}},Ir=t=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},n=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(r.origin),s=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(r.allowMethods);return async function(a,o){var u;function l(h,m){a.res.headers.set(h,m)}const c=await n(a.req.header("origin")||"",a);if(c&&l("Access-Control-Allow-Origin",c),r.credentials&&l("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&l("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),a.req.method==="OPTIONS"){r.origin!=="*"&&l("Vary","Origin"),r.maxAge!=null&&l("Access-Control-Max-Age",r.maxAge.toString());const h=await s(a.req.header("origin")||"",a);h.length&&l("Access-Control-Allow-Methods",h.join(","));let m=r.allowHeaders;if(!(m!=null&&m.length)){const v=a.req.header("Access-Control-Request-Headers");v&&(m=v.split(/\s*,\s*/))}return m!=null&&m.length&&(l("Access-Control-Allow-Headers",m.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await o(),r.origin!=="*"&&a.header("Vary","Origin",{append:!0})}},Pr=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,lt=(t,e=Lr)=>{const r=/\.([a-zA-Z0-9]+?)$/,n=t.match(r);if(!n)return;let s=e[n[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},Dr={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Lr=Dr,Hr=(...t)=>{let e=t.filter(s=>s!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=e.split("/"),n=[];for(const s of r)s===".."&&n.length>0&&n.at(-1)!==".."?n.pop():s!=="."&&n.push(s);return n.join("/")||"."},Gt={br:".br",zstd:".zst",gzip:".gz"},Gr=Object.keys(Gt),Fr="index.html",Kr=t=>{const e=t.root??"./",r=t.path,n=t.join??Hr;return async(s,i)=>{var u,h,m,v;if(s.finalized)return i();let a;if(t.path)a=t.path;else try{if(a=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((u=t.onNotFound)==null?void 0:u.call(t,s.req.path,s)),i()}let o=n(e,!r&&t.rewriteRequestPath?t.rewriteRequestPath(a):a);t.isDir&&await t.isDir(o)&&(o=n(o,Fr));const l=t.getContent;let c=await l(o,s);if(c instanceof Response)return s.newResponse(c.body,c);if(c){const O=t.mimes&&lt(o,t.mimes)||lt(o);if(s.header("Content-Type",O||"application/octet-stream"),t.precompressed&&(!O||Pr.test(O))){const T=new Set((h=s.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(A=>A.trim()));for(const A of Gr){if(!T.has(A))continue;const j=await l(o+Gt[A],s);if(j){c=j,s.header("Content-Encoding",A),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=t.onFound)==null?void 0:m.call(t,o,s)),s.body(c)}await((v=t.onNotFound)==null?void 0:v.call(t,o,s)),await i()}},Ur=async(t,e)=>{let r;e&&e.manifest?typeof e.manifest=="string"?r=JSON.parse(e.manifest):r=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let n;e&&e.namespace?n=e.namespace:n=__STATIC_CONTENT;const s=r[t];if(!s)return null;const i=await n.get(s,{type:"stream"});return i||null},qr=t=>async function(r,n){return Kr({...t,getContent:async i=>Ur(i,{manifest:t.manifest,namespace:t.namespace?t.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,n)},zr=t=>qr(t);const J=new Ht,qe=new Map,Br=1e3*60*60*24*7;let Ze=!1;function Ft(){return new Date().toISOString()}function L(t){return t==null?"":String(t)}function pe(t,e,r){return Math.max(e,Math.min(r,t))}function Jr(t){return(t||"").replace(/\s+/g,"")}function we(t){return Jr(t).length}const dt={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}},ut={brief:["연구 목적","연구 방법","핵심 결론"],standard:["연구 목적","연구 문제","연구 방법","주요 결과","결론"],detail:["연구 목적","연구 문제","연구 대상","연구 절차","결과","해석","교육적 의의"]};function Kt(t){return(t||"").replace(/-\s*[ivxIVX]+-\s*/gi,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[p\.\s*\d+\]/gi,"").replace(/p\.\s*\d+/gi,"").replace(/\n+/g," ").replace(/\s{2,}/g," ").trim()}const Yr=["DLPFC","VLPFC","OFC","ACC","PFC","vmPFC","dmPFC","전두엽","측두엽","두정엽","후두엽","편도체","해마"];function et(t,e){if(e==="brief"){for(const s of Yr)if(t.includes(s))return{valid:!1,error:`간단요약에 세부 뇌영역(${s}) 단독 등장 금지. 일반적 설명만 포함하세요.`}}const r=ut[e]||ut.standard,n=[];for(const s of r)s.split(" ").some(o=>t.includes(o))||n.push(s);return n.length>0?{valid:!1,error:`필수 요소 누락: ${n.join(", ")}. 이 항목들을 반드시 포함하세요.`}:{valid:!0}}function Wr(t){return dt[t]||dt.standard}function tt(t,e){const r=Math.max(50,we(t)),{min:n,max:s}=Wr(e);return{base:r,min:Math.floor(r*n),max:Math.ceil(r*s)}}function Ut(t){const e=L(t).trim().toLowerCase();return e?e==="brief"||e==="simple"||e==="short"||e==="lite"?"brief":e==="detail"||e==="detailed"||e==="full"?"detail":"standard":"standard"}function qt(t){const e=L(t).trim().toLowerCase();return e?e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"||e==="mind_map"?"mindmap":"narrative":"narrative"}function Xr(t){const e=L(t).trim().toLowerCase();return e==="concept"?"concept":e==="exam"?"exam":"summary"}function Vr(t){const e=(t||"").replace(/\s+/g," ").trim();if(!e)return[];const r=[];let n="",s=!1;for(let i=0;i<e.length;i++){const a=e[i],o=e[i+1];(a==='"'||a==='"'||a==='"')&&(s=!s),n+=a,!s&&/[\.\?\!]/.test(a)&&o===" "?a==="."&&n.endsWith("...")||(r.push(n.trim()),n="",i++):!s&&/[다요죠]/.test(a)&&o===" "&&(r.push(n.trim()),n="",i++)}return n.trim()&&r.push(n.trim()),r.length?r:[e]}function Qr(t){if(!t)return"";let e=String(t);return e=e.replace(/([가-힣])\r?\n([가-힣])/g,"$1$2"),e=e.replace(/([A-Za-z])-\r?\n([A-Za-z])/g,"$1$2"),e=e.replace(/\r/g,""),e=e.replace(/\n{2,}/g,`
`),e=e.replace(/\n/g," "),e=e.replace(/[ \t]{2,}/g," "),e=e.replace(/\s+([,.;:!?])/g,"$1"),e.trim()}function Zr(t){return(t||[]).filter(e=>{const r=(e||"").trim();return!(!r||r.length<18||!(/[.!?]$/.test(r)||/다\.$/.test(r)||/이다\.$/.test(r)||/하였다\.$/.test(r))&&r.length<45)})}const en=new Set(["그리고","그러나","하지만","또한","및","또","또는","즉","때문에","따라서","그래서","한편","이것","그것","저것","에서","으로","에게","부터","까지","보다","처럼","같이","의","가","이","은","는","을","를","과","와","도","만","하다","된다","있다","없다","이다","아니다","수","등","및","것","들","좀","매우","정말"]);function ht(t){return(t||"").toLowerCase().replace(/[^0-9a-z가-힣\s]/g," ").split(/\s+/).map(e=>e.trim()).map(e=>e.replace(/에게$/g,"").replace(/에서$/g,"").replace(/으로$/g,"").replace(/를$/g,"").replace(/을$/g,"").replace(/의$/g,"").replace(/하는$/g,"하").replace(/하$/g,"하")).filter(e=>e.length>=2&&!en.has(e))}function tn(t){const e=new Map;for(const n of t)for(const s of ht(n))e.set(s,(e.get(s)||0)+1);return t.map((n,s)=>{const i=ht(n);let a=0;for(const c of i)a+=e.get(c)||0;const o=n.length,l=o<15?.7:o>180?.85:1;return{idx:s,s:n,score:a*l}})}function rn(t,e){return tn(t).slice().sort((s,i)=>i.score-s.score).slice(0,pe(e,1,Math.max(1,t.length))).sort((s,i)=>s.idx-i.idx).map(s=>s.s)}function nn(t){let e=(t||"").trim();e=e.replace(/모\s+든/g,"모든"),e=e.replace(/기\s+회/g,"기회"),e=e.replace(/이\s+루어지는/g,"이루어지는"),e=e.replace(/루어지는/g,"이루어지는"),e=e.replace(/생태계물/g,"자연물"),e=e.replace(/놀은\s+는/g,"놀이는"),e=e.replace(/형성은\s+는/g,"형성은"),e=e.replace(/특정\s+공간\s+인/g,"특정 공간인"),e=e.replace(/(\S+)\s+\1/g,"$1"),e=e.replace(/([가-힣])을\b/g,(i,a)=>{const o=a.charCodeAt(0);return o>=44032&&o<=55203?(o-44032)%28!==0?a+"을":a+"를":i});const r=e.split(new RegExp("(?<=다\\.)\\s+")),n=new Set,s=[];for(const i of r){const a=i.match(/^([^은는]+[은는])\s+(.+)/);if(a){const o=a[1];if(n.has(o))continue;n.add(o)}s.push(i)}return e=s.join(" "),e=e.replace(/입니다\.\s*이는\s+/g,"이다. "),e=e.replace(/입니다\.\s*또한\s+/g,"이다. 또한 "),e=e.replace(/입니다\.\s*즉\s+/g,"이다. 즉 "),e=e.replace(/\s*\.\s*/g,". "),e=e.replace(/\s*,\s*/g,", "),e=e.replace(/\s*;\s*/g,"; "),e=e.replace(/[ ]{2,}/g," "),e=e.replace(/\n{3,}/g,`

`),e.trim()}function zt(t){const e=Math.max(200,we(t)),r=tt(t,"brief"),n=tt(t,"standard"),s=tt(t,"detail"),i=pe(r.min+Math.round((r.max-r.min)*.5),r.min,r.max),a=pe(Math.max(n.min,i+40),n.min,n.max),o=pe(Math.max(s.min,a+120),s.min,s.max);return{base:e,brief:i,standard:a,detail:o}}function sn(t){const e=zt(t);return`
당신은 학술 논문을 3단계(간단/표준/상세)로 "생성적 요약(Abstractive Summarization)" 방식으로 요약하는 전문 엔진입니다.

[입력 원문 - 학술 논문]
"""${Kt(t)}"""

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
- 간단: ${e.brief}자 내외 (원문 10~15%, 핵심만 간결하게)
- 표준: ${e.standard}자 내외 (원문 25~30%, 주요 논거 포함)
- 상세: ${e.detail}자 내외 (원문 45~55%, 학술적 논거+세부 지표+인과관계 명시, 아래 소제목 3개)

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
    "base_chars_no_space": ${e.base},
    "target": { "brief": ${e.brief}, "standard": ${e.standard}, "detail": ${e.detail} }
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
`.trim()}function an(t,e,r){if(!Array.isArray(t)||t.length===0)return{summary:"요약할 내용이 부족합니다.",mindmap:{keywords:[],nodes:[],edges:[]},meta:{ratio:0,target:{min:0,max:0}}};const n=Math.max(1,Number(r)||1),s=e==="brief"?{min:10,max:15}:e==="detail"?{min:45,max:55}:{min:25,max:30},i=["또한","아울러","더불어"],a=["한편","이와 함께","이와 더불어","또 다른 측면에서"],o=y=>{const $=String(y||"").trim().slice(0,24);if(/^(또한|아울러|더불어|한편|이와\s|그리고|그러나|하지만)\b/.test($))return null;const b=$.match(/^(.{1,20}?(은|는|이|가))\s+/);return b?b[1]:null},l=y=>{const $=String(y||"").trim();return $&&(/[.!?…]$/.test($)?$:$+".")},c=y=>{let $=String(y||"").trim(),b="";const g=$.match(/([.!?…])$/);return g&&(b=g[1],$=$.slice(0,-1).trim()),$=$.replace(/합니다$/,"한다").replace(/되었습니다$/,"되었다").replace(/입니다$/,"이다").replace(/습니다$/,"다"),($+(b||".")).trim()},u=y=>/^(그러므로|따라서|하지만|그러나|또한|더불어|한편|이와|나아가|아울러|즉|특히)\s/.test(y.trim()),h=y=>y.replace(/^(또한|더불어|한편|이와|나아가|아울러)\s+/,"").trim();let m=t.map((y,$)=>{const b=String(y||"").trim();if(!b)return"";if($===0){const f=h(b);return c(l(f))}if(u(b))return c(l(b));const g=String(t[$-1]||"").trim(),p=o(g),x=o(b),w=f=>f[$%f.length];if(x&&p&&x===p){const f=b.replace(/^(.{1,40}?(은|는|이|가))\s+/,"");return c(l(`${w(i)} ${f}`.trim()))}else return b.length>15?c(l(`${w(a)} ${b}`.trim())):c(l(b))}).filter(Boolean);const v=y=>String(y||"").replace(/\s+/g,"").length;let O=m.join(" ");O=O.replace(/\s*(또한|더불어|한편|이와|나아가|아울러)\s+(또한|더불어|한편|이와|나아가|아울러)\s+/g," $2 ").replace(/\s{2,}/g," ").trim();let T=v(O)/n*100;for(;T>s.max&&m.length>1;)m.pop(),O=m.join(" "),T=v(O)/n*100;T<s.min&&console.warn(`[젠스] 요약율 ${T.toFixed(1)}%가 목표 최소치 ${s.min}% 미만입니다.`);const j=m.join(" ").replace(/[0-9]/g," ").replace(/[^\uAC00-\uD7A3a-zA-Z\s]/g," ").split(/\s+/).map(y=>y.trim()).filter(y=>y.length>=2&&y.length<=6),N=new Map;for(const y of j)N.set(y,(N.get(y)||0)+1);const M=[...N.entries()].sort((y,$)=>$[1]-y[1]).slice(0,12).map(([y])=>y),U={keywords:M,nodes:M.map((y,$)=>({id:`k${$}`,label:y})),edges:[]};return{summary:O,mindmap:U,meta:{ratio:T,target:s}}}function on(t,e,r){const n=Qr(t);let s=Vr(n);s=Zr(s);const i=e==="brief"?pe(Math.round(s.length*.15),2,4):e==="standard"?pe(Math.round(s.length*.3),5,9):pe(Math.round(s.length*.55),10,18);let a=rn(s,i);if(e==="detail"){const c=["성별","학년","남학생","여학생","초등","중학","고학년","저학년","변인","차이","비교"],u=s.filter(h=>c.some(m=>h.includes(m))&&!a.includes(h)).slice(0,5);u.length>0&&(a=[...a,...u])}const o=we(n);if(r==="narrative"){let c,u=null,h=null;{const m=an(a,e,o);c=m.summary,u=m.mindmap,h=m.meta}return c=nn(c),{kind:"summary",mode:e,viewType:r,narrative:c,...u&&{mindmapKeywords:u},...h&&{meta:{...h,inputNormalized:!0,originalLen:o}}}}if(r==="structured")return{kind:"summary",mode:e,viewType:r,structured:{title:"구조화 요약",bullets:a.map((c,u)=>`- (${u+1}) ${c}`)}};if(r==="mindmap"){const c=(a[0]||s[0]||"핵심").slice(0,40),u=[{id:"c",label:c,level:0}],h=[];return a.slice(1).forEach((m,v)=>{const O=`n${v+1}`;u.push({id:O,label:m.slice(0,60),level:1}),h.push({from:"c",to:O})}),{kind:"summary",mode:e,viewType:r,mindmap:{center:c,nodes:u,edges:h}}}const l=a.map((c,u)=>({id:`q${u+1}`,type:"short",question:`(${u+1}) 다음 내용을 한 문장으로 설명해보세요: "${c.slice(0,70)}"`,answerHint:c}));return{kind:"summary",mode:e,viewType:r,selftest:{title:"셀프테스트",questions:l}}}function Bt(t){if(!t)return"empty";let e=2166136261,r=0;for(let i=0;i<t.length;i++){const a=t.charCodeAt(i);e^=a,e+=(e<<1)+(e<<4)+(e<<7)+(e<<8)+(e<<24),r=(r<<5)-r+a,r|=0}const n=(e>>>0).toString(16),s=(Math.abs(r)>>>0).toString(16);return`${t.length.toString(16)}_${n}_${s}`}function cn(t,e,r,n){const s=Bt(r);return`${t}::${n||"anon"}::${e}::base::${s}`}function ln(t,e,r,n,s){const i=Bt(n);return`${t}::${s||"anon"}::${e}::${r}::${i}`}async function dn(t){if(!Ze){if(!t){Ze=!0;return}await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),Ze=!0}}async function ft(t,e){const r=Date.now(),n=qe.get(e);if(n&&r-n.createdAt<Br)return{hit:!0,data:n.data,store:"mem"};if(n&&qe.delete(e),!t)return{hit:!1};const s=await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();if(!(s!=null&&s.response_json))return{hit:!1};try{const i=JSON.parse(s.response_json);return qe.set(e,{data:i,createdAt:r}),{hit:!0,data:i,store:"d1"}}catch{return{hit:!1}}}async function Ce(t,e,r,n){const s=Date.now();qe.set(e,{data:n,createdAt:s}),t&&await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e,r,JSON.stringify(n),Ft()).run()}function pt(t){const e=t.split(/\n\n+/).filter(n=>n.trim());return{kind:"summary",viewType:"structured",structured:{title:"구조화 요약",bullets:e.length>1?e.map((n,s)=>`- (${s+1}) ${n}`):t.split(/[\.。]\s+/).filter(n=>n.trim()).map((n,s)=>`- (${s+1}) ${n}.`)}}}function mt(t){const e=t.split(/[\.。]\s+/).filter(i=>i.trim()).map(i=>i.trim()),r=(e[0]||"핵심").slice(0,40),n=[{id:"c",label:r,level:0}],s=[];return e.slice(1).forEach((i,a)=>{const o=`n${a+1}`;n.push({id:o,label:i.slice(0,60),level:1}),s.push({from:"c",to:o})}),{kind:"summary",viewType:"mindmap",mindmap:{center:r,nodes:n,edges:s}}}function gt(t){return{kind:"summary",viewType:"selftest",selftest:{title:"셀프테스트",questions:t.split(/[\.。]\s+/).filter(n=>n.trim()).map(n=>n.trim()).map((n,s)=>({id:`q${s+1}`,type:"short",question:`(${s+1}) 다음 내용을 한 문장으로 설명해보세요: "${n.slice(0,70)}"`,answerHint:n}))}}}async function un(t,e){var l,c,u,h,m;const r=L(t.GEMINI_API_KEY).trim();if(!r)throw new Error("GEMINI_API_KEY is missing");const n=L(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",s=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`,i={contents:[{role:"user",parts:[{text:e}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let a=0,o=500;for(;a<3;){a++;const v=await fetch(s,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(i)});if(v.ok){const T=await v.json();return{ok:!0,text:((m=(h=(u=(c=(l=T==null?void 0:T.candidates)==null?void 0:l[0])==null?void 0:c.content)==null?void 0:u.parts)==null?void 0:h[0])==null?void 0:m.text)??"",raw:T}}if(v.status===429||v.status===503){await new Promise(T=>setTimeout(T,o)),o*=2;continue}const O=await v.text().catch(()=>"");throw new Error(`Gemini error ${v.status}: ${O.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function hn(t,e,r){var c,u,h,m,v;const n=L(t.GEMINI_API_KEY).trim();if(!n)throw new Error("GEMINI_API_KEY is missing");const s=L(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",i=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(n)}`,a={system_instruction:{parts:[{text:e}]},contents:[{role:"user",parts:[{text:r}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let o=0,l=500;for(;o<3;){o++;const O=await fetch(i,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(a)});if(O.ok){const A=await O.json();return((v=(m=(h=(u=(c=A==null?void 0:A.candidates)==null?void 0:c[0])==null?void 0:u.content)==null?void 0:h.parts)==null?void 0:m[0])==null?void 0:v.text)??""}if(O.status===429||O.status===503){await new Promise(A=>setTimeout(A,l)),l*=2;continue}const T=await O.text().catch(()=>"");throw new Error(`Gemini error ${O.status}: ${T.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function Jt(t,e){const r=await un(t,e);return typeof r=="string"?r:((r==null?void 0:r.text)??"").toString()}async function fn(t,e){const r=sn(e);for(let n=1;n<=2;n++)try{let i=(await Jt(t,r)||"").trim();i.startsWith("```")&&(i=i.replace(/^```(?:json)?\s*/i,"").replace(/```\s*$/i,"").trim());const a=JSON.parse(i);if(!(a!=null&&a.brief)||!(a!=null&&a.standard)||!(a!=null&&a.detail))throw new Error("Missing required fields");if(!a.detail.개념||!a.detail.영향||!a.detail["교육적 가치"])throw new Error("Missing detail fields");const o=we(a.brief),l=we(a.standard),c=we(a.detail.개념+a.detail.영향+a.detail["교육적 가치"]);(o>=l||l>=c)&&console.warn("[SummaryJSON] monotonic violated",{bLen:o,sLen:l,dLen:c,attempt:n});const u=et(a.brief,"brief"),h=et(a.standard,"standard"),m=a.detail.개념+" "+a.detail.영향+" "+a.detail["교육적 가치"],v=et(m,"detail");if(!u.valid&&(console.warn("[SummaryJSON] brief validation failed:",u.error),n===1))throw new Error(`Brief validation: ${u.error}`);if(!h.valid&&(console.warn("[SummaryJSON] standard validation failed:",h.error),n===1))throw new Error(`Standard validation: ${h.error}`);if(!v.valid&&(console.warn("[SummaryJSON] detail validation failed:",v.error),n===1))throw new Error(`Detail validation: ${v.error}`);return a}catch(s){if(console.error("[SummaryJSON] attempt failed",n,s==null?void 0:s.message),n===2){const i=zt(e);return{meta:{base_chars_no_space:i.base,target:{brief:i.brief,standard:i.standard,detail:i.detail}},brief:"[JSON 실패] 요약 생성 실패",standard:"[JSON 실패] 요약 생성 실패",detail:{개념:"[실패]",영향:"[실패]","교육적 가치":"[실패]"}}}}throw new Error("summarizeWithJSON failed")}const pn=(()=>{const e={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}},r={brief:6,standard:10,detail:14},n=["narrative","structured","mindmap"],s=["preview","exam"];function i(b){return(b||"").replace(/\s+/g,"")}function a(b,g){const x=Math.max(200,i(b||"").length),w=e[g]||e.standard,f=Math.floor(x*w.min),R=Math.ceil(x*w.max);return{base:x,min:Math.max(80,f),max:Math.max(120,R)}}function o(b){const g=(b||"").trim();return g?g.replace(/\r/g,"").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map(x=>x.trim()).filter(Boolean):[]}function l(b){return o(b).map((p,x)=>({sid:`S${x+1}`,text:p}))}function c(b,g,p){const x=b.find(w=>w.sid===g);return!x||!p||typeof p!="string"?!1:x.text.includes(p.trim())}function u(){return["당신은 교육공학 기반 요약·셀프테스트 생성 엔진이다.","추출형 복붙 금지. 반드시 의미 단위로 재구성하라.","가장 중요한 1순위는 문자수(공백 제외) 제한 준수다.","허위 정보(원문/요약에 없는 내용) 생성 금지.","JSON 출력이 요구되면 JSON만 출력하라."].join(`
`)}function h({originalText:b,mode:g,format:p}){const x=a(b,g),w=Kt(b),f=p==="narrative"?"서술형: 연결어를 사용해 흐름/인과가 보이도록 1~3문단으로 구성":p==="structured"?"구조화: 상위-하위 위계가 드러나는 조목(가/나/다 또는 ①②③) 형태":"마인드맵: 텍스트로 표현된 노드-관계 목록(중심노드/하위노드/연결라벨) 형태";return["[TASK] 아래 학술 논문을 생성적 요약(Abstractive Summarization) 방식으로 지정된 형식에 맞춰 요약하라.",`- 모드: ${g} (간단/표준/상세)`,`- 형식: ${p} (${f})`,`- 문자수 목표(공백 제외): 최소 ${x.min}자 ~ 최대 ${x.max}자`,"","[🔹 C. 논문형 텍스트 전용 요약 구조 - 반드시 준수]","이 텍스트는 학술 논문입니다.","요약 시 반드시 다음 순서를 유지하세요:","1. 연구 목적 (무엇을 연구했는가?)","2. 연구 설계 및 방법 (어떻게 연구했는가?)","3. 핵심 결과 (무엇을 발견했는가?)","4. 결과 해석 (결과가 의미하는 바는?)","5. 교육적 의의 (실무/교육에 어떤 시사점을 주는가?)","각 단계는 1문단 이상을 넘지 마세요.","","[요약 품질 규칙]","1. 단순 추출/복붙 금지: 원문 문장을 그대로 나열하지 말고 생성적으로 재구성하여 매끄러운 글 작성","2. 텍스트 정제: 페이지 번호(p.XX), 각주, 특수기호, 질문형 문장 제거 → 학술적 평서문으로 전환","3. 스마트 편집: 중복 표현 통합, 전문 용어 일관성 유지, 한 문장 2줄 이내로 단문 위주","4. 퀴즈 연동: 핵심 키워드와 인과관계를 문장 내에 전략적으로 배치 (퀴즈 앵커 확보)","5. 할루시네이션 금지: 원문에 없는 주장/사례/인과/수치 추가 절대 금지","6. 🔹 B. 결과 단독 발췌 금지: 간단 모드에서는 DLPFC, VLPFC, OFC 등 세부 뇌 영역 명칭 사용 금지","","[비율 엄수]","- 간단 10~15%, 표준 25~30%, 상세 45~55% 글자수 비율은 절대적 기준","- 상세 요약이 표준보다 짧아지는 역전 현상 금지","- 각 단계마다 정보의 깊이와 양을 계층적으로 명확히 차별화","","[ORIGINAL]",w].join(`
`)}function m({summaryText:b,format:g}){return["[TASK] 아래 요약문에서 학습 앵커(핵심 개념/관계)를 추출하라.","- 출력은 JSON만. 한국어로.","- 앵커 수: 6~14개 범위(요약 길이에 맞춰 적절히).","- 각 앵커는 요약문에 실제로 등장하는 표현을 근거(quote)로 가져와야 한다.","- quote는 요약문 일부를 그대로 복사(짧게 8~25자).","","[OUTPUT JSON SCHEMA]",`{
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
}`,"","[SUMMARY]",b].join(`
`)}function v({mode:b,purpose:g,format:p,summaryText:x,sentTable:w,anchors:f}){const R=r[b]||10,F=g==="preview"?"예습용 셀프테스트: 요약문 안에서 바로 확인 가능한 재인 중심(스키마 형성). 과도한 추론 금지.":"시험대비 셀프테스트: 요약문에 있는 근거를 바탕으로 인과/관계/분류를 인출하는 회상 중심. 요약에 없는 정보 금지.",Y=p==="narrative"?"문항 스타일: 문장 빈칸, 문장 순서 배열, 인과관계 단답/서술(요약 근거 필수)":p==="structured"?"문항 스타일: 항목-정의 매칭, 분류 채우기, 상하위 체계, 사례-범주 매칭(요약 근거 필수)":"문항 스타일: 노드 라벨 맞추기, 연결 라벨링, 누락 노드/연결 복원, 관계 이유 단답(요약 근거 필수)";return["[TASK] 아래 요약문과 앵커만을 근거로 셀프테스트 문항을 생성하라.",`- 모드: ${b} (문항수 ${R})`,`- 목적: ${g} (${F})`,`- 요약 형식: ${p} (${Y})`,"- 규칙1: 요약문에 없는 정보로 문제 만들지 말 것(할루시네이션 금지).","- 규칙2: 각 문항은 반드시 evidence를 포함: sid + quote(요약 문장 일부 8~25자).","- 규칙3: quote는 반드시 해당 sid 문장에 실제로 포함되어야 한다.","- 규칙4: 정답/해설은 간결하게. 해설은 evidence와 연결되게.","","[OUTPUT JSON ONLY]",`{
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
}`,"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(w,null,2),"","[ANCHORS]",JSON.stringify(f,null,2),"","[SUMMARY]",x].join(`
`)}function O(b,g){const p=g&&g.anchors?g.anchors:[],x=[],w=[];for(const f of p){const R=f==null?void 0:f.sid,F=f==null?void 0:f.quote;if(typeof(f==null?void 0:f.label)!="string"||!f.label.trim()){w.push({a:f,reason:"label missing"});continue}if(!c(b,R,F)){w.push({a:f,reason:"evidence not in sentence"});continue}x.push(f)}return{ok:x,bad:w}}function T(b,g){const p=g&&Array.isArray(g.items)?g.items:[],x=[],w=[];for(const f of p){const R=f==null?void 0:f.evidence;if(!(f!=null&&f.id)||!(f!=null&&f.question)||!(f!=null&&f.answer)||!(R!=null&&R.sid)||!(R!=null&&R.quote)){w.push({q:f,reason:"missing fields"});continue}if(!c(b,R.sid,R.quote)){w.push({q:f,reason:"evidence not in sentence"});continue}if(Array.isArray(f.choices)&&f.choices.length>0&&!f.choices.includes(f.answer)){w.push({q:f,reason:"answer not in choices"});continue}x.push(f)}return{ok:x,bad:w}}function A({summaryText:b,sentTable:g,anchors:p,badItems:x,mode:w,purpose:f,format:R}){return["[TASK] 아래는 검증에서 탈락한 문항들이다. 요약문 근거(sid+quote)를 만족하도록 문항을 다시 생성하라.",`- 재생성 문항 수: ${x.length}`,`- 모드: ${w}, 목적: ${f}, 형식: ${R}`,"- 규칙: 요약문 밖 정보 금지. 반드시 sid+quote가 실제로 해당 문장에 포함되어야 한다.","- 출력: JSON만. items 길이는 정확히 재생성 문항 수와 같아야 한다.","","[OUTPUT JSON ONLY]",'{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}',"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(g,null,2),"","[ANCHORS]",JSON.stringify(p,null,2),"","[BAD ITEMS]",JSON.stringify(x,null,2),"","[SUMMARY]",b].join(`
`)}async function j({llmCall:b,originalText:g,mode:p,format:x}){if(!b)throw new Error("llmCall is required");e[p]||(p="standard"),n.includes(x)||(x="narrative");const w=h({originalText:g,mode:p,format:x}),f=(await b({system:u(),user:w,json:!1})||"").trim()||"",R=l(f),F=m({summaryText:f,format:x});let Y=await b({system:u(),user:F,json:!0}),W;try{W=JSON.parse(Y)}catch{W={anchors:[]}}const{ok:P}=O(R,W),He=P.length>=4?P:N(R);return{summaryText:f,sentTable:R,anchors:He}}function N(b){const g=[];for(let p=0;p<Math.min(8,b.length);p++){const x=b[p],w=(x.text||"").slice(0,18);g.push({id:`A${p+1}`,label:`문장 핵심${p+1}`,type:"claim",sid:x.sid,quote:w,note:"요약 문장 기반 안전 앵커"})}return g}async function M({llmCall:b,mode:g,purpose:p,format:x,summaryText:w,sentTable:f,anchors:R}){e[g]||(g="standard"),s.includes(p)||(p="preview"),n.includes(x)||(x="narrative");const F=v({mode:g,purpose:p,format:x,summaryText:w,sentTable:f,anchors:R});let Y=await b({system:u(),user:F,json:!0}),W;try{W=JSON.parse(Y)}catch{W={items:[]}}let{ok:P,bad:He}=T(f,W);if(He.length>0){const Ne=A({summaryText:w,sentTable:f,anchors:R,badItems:He.map(Qt=>Qt.q),mode:g,purpose:p,format:x});let Wt=await b({system:u(),user:Ne,json:!0}),We;try{We=JSON.parse(Wt)}catch{We={items:[]}}const Xt=T(f,We);P=P.concat(Xt.ok);const Vt=r[g]||10;P=P.slice(0,Vt)}else{const Ne=r[g]||10;P=P.slice(0,Ne)}const Ye=r[g]||10;if(P.length<Ye){const Ne=U({sentTable:f,anchors:R,count:Ye-P.length,format:x,purpose:p});P=P.concat(Ne).slice(0,Ye)}return{items:P}}function U({sentTable:b,anchors:g,count:p,format:x,purpose:w}){const f=[],R=g.slice(0,Math.max(p,1));for(let F=0;F<p;F++){const Y=R[F%R.length],W=Y.sid,P=Y.quote;f.push({id:`QF${F+1}`,type:"short",question:w==="preview"?`요약에서 '${P}'가 의미하는 핵심 개념을 한 문장으로 말해보세요.`:`요약에서 '${P}'가 포함된 문장의 핵심 인과/관계를 한 문장으로 인출해보세요.`,choices:[],answer:"(서술형 정답: 사용자 입력 비교는 해설 기반 채점 또는 키워드 채점으로 처리)",explanation:"근거 문장을 다시 읽고 핵심을 1문장으로 재구성하면 됩니다.",evidence:{sid:W,quote:P},anchorIds:[Y.id]})}return f}class y{constructor(g,{passScore:p=90}={}){this.items=Array.isArray(g)?g:[],this.passScore=p,this.state={idx:0,attempts:1,correct:0,wrongIds:new Set,finished:!1}}gradeAnswer(g,p){if(!g)return{ok:!1,reason:"no item"};const x=g.type;if(x==="mcq"||x==="blank"||x==="match"||x==="order"||x==="label"||x==="short"){if(x==="short")return{ok:!0,reason:"short-auto-pass"};const w=(g.answer||"").trim(),f=(p||"").trim();return{ok:f===w,reason:f===w?"match":"mismatch"}}return{ok:!1,reason:"unknown type"}}getScore(){return this.items.length===0?0:Math.round(this.state.correct/this.items.length*100)}currentItem(){return this.items[this.state.idx]||null}submit(g){if(this.state.finished)return{done:!0,message:"already finished"};const p=this.currentItem();if(this.gradeAnswer(p,g).ok)return this.state.correct+=1,this.next(),{ok:!0,message:"정답 처리",score:this.getScore()};if(this.state.wrongIds.add(p.id),this.state.attempts===1)return this.state.attempts=2,{ok:!1,stage:1,hint:`힌트1: 근거 문장(${p.evidence.sid})을 다시 읽어보세요.`,score:this.getScore()};if(this.state.attempts===2)return this.state.attempts=3,{ok:!1,stage:2,hint:`힌트2: 근거 구절 = '${p.evidence.quote}'`,score:this.getScore()};{const w=p.explanation||"해설 없음";return this.next(),{ok:!1,stage:3,explanation:w,score:this.getScore()}}}next(){if(this.state.idx+=1,this.state.attempts=1,this.state.idx>=this.items.length)if(this.getScore()>=this.passScore)this.state.finished=!0;else{const p=this.items.filter(x=>this.state.wrongIds.has(x.id));this.items=p.length>0?p:this.items,this.state.idx=0,this.state.attempts=1,this.state.correct=0,this.state.wrongIds=new Set}}status(){return{idx:this.state.idx,total:this.items.length,score:this.getScore(),passScore:this.passScore,finished:this.state.finished}}}async function $({llmCall:b,originalText:g,mode:p,format:x,purpose:w}){const f=await j({llmCall:b,originalText:g,mode:p,format:x}),R=await M({llmCall:b,mode:p,purpose:w,format:x,summaryText:f.summaryText,sentTable:f.sentTable,anchors:f.anchors});return{summary:{mode:p,format:x,text:f.summaryText,sentences:f.sentTable,anchors:f.anchors},selfTest:{purpose:w,passScore:90,items:R.items}}}return{computeCharTargets:a,splitSentencesKR:o,makeSentenceTable:l,generateBundle:j,generateSelfTest:M,runPipeline:$,MasteryRunner:y}})(),mn=`/* MindStory Engine Bundle (compat) */
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
})();`;J.use("/api/*",Ir());J.get("/static/ms-engine-bundle.js",t=>t.text(mn,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));J.get("/favicon.ico",t=>t.body(null,204));J.use("/static/*",zr({root:"./public"}));J.get("/",t=>t.html(`<!DOCTYPE html>
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
</html>`));J.get("/api/health",t=>{const e=!!L(t.env.GEMINI_API_KEY).trim(),r=L(t.env.USE_MOCK).trim().toLowerCase()==="true";return t.json({ok:!0,ts:Ft(),hasDB:!!t.env.DB,hasGeminiKey:e,engineMode:e&&!r?"gemini+fallback":"local-only"})});J.post("/api/gens/run",async t=>{const e=Date.now();let r=null;try{r=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const n=L((r==null?void 0:r.text)||(r==null?void 0:r.originalText)||""),s=Ut((r==null?void 0:r.mode)||"standard"),i=qt((r==null?void 0:r.format)||(r==null?void 0:r.viewType)||"narrative"),a=L((r==null?void 0:r.purpose)||"preview").trim().toLowerCase();if(!n)return t.json({ok:!1,error:{code:"NO_TEXT",message:"원문 텍스트가 필요합니다."}},400);const o=!!L(t.env.GEMINI_API_KEY).trim(),l=L(t.env.USE_MOCK).trim().toLowerCase()==="true";if(!o||l)return t.json({ok:!1,error:{code:"GEMINI_REQUIRED",message:"GENS Engine은 Gemini API가 필요합니다. .dev.vars에 GEMINI_API_KEY를 설정하세요."},guide:{step1:".dev.vars 파일 생성",step2:"GEMINI_API_KEY=your_api_key_here 추가",step3:"서비스 재시작: pm2 restart webapp"}},503);const c=async({system:u,user:h,json:m})=>{if(m){const v=`${u}

${h}

출력은 반드시 JSON만 출력하라. 다른 텍스트 금지.`;return await Jt(t.env,v)}else return(await hn(t.env,u,h)||"").toString()};try{const u=await pn.runPipeline({llmCall:c,originalText:n,mode:s,format:i,purpose:a==="exam"?"exam":"preview"});return t.json({ok:!0,data:u,meta:{engine:"gens-v3",mode:s,format:i,purpose:a,elapsedMs:Date.now()-e}},200)}catch(u){return console.error("[GENS Engine Error]",u),t.json({ok:!1,error:{code:"GENS_ERROR",message:u.message||"GENS 엔진 오류",details:u.stack}},500)}});J.post("/api/engine",async t=>{var A,j;const e=Date.now(),r=t.env.DB;await dn(r);let n=null;try{n=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=Xr(n==null?void 0:n.kind),i=L((n==null?void 0:n.text)||""),a=Ut((n==null?void 0:n.mode)||(n==null?void 0:n.level)),o=qt((n==null?void 0:n.viewType)||(n==null?void 0:n.displayMode)),l=L(((A=n==null?void 0:n.options)==null?void 0:A.userId)||(n==null?void 0:n.userId)||"anon");if(!i.trim()||i.trim().length<5)return t.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const c=ln(s,a,o,i,l||null),u=await ft(r,c);if(u.hit)return t.json({ok:!0,data:u.data,meta:{cached:!0,cacheStore:u.store,cacheType:"derived",engine:"cache",elapsedMs:Date.now()-e}},200);const h=cn(s,a,i,l||null),m=await ft(r,h);if(m.hit&&((j=m.data)!=null&&j.narrative)){const N=m.data.narrative;let M;return o==="narrative"?M={kind:s,mode:a,viewType:o,narrative:N}:o==="structured"?M={kind:s,mode:a,...pt(N)}:o==="mindmap"?M={kind:s,mode:a,...mt(N)}:M={kind:s,mode:a,...gt(N)},await Ce(r,c,l||"anon",M),t.json({ok:!0,data:M,meta:{cached:!0,cacheStore:"derived",cacheType:"converted",engine:"local-convert",elapsedMs:Date.now()-e}},200)}const v=!!L(t.env.GEMINI_API_KEY).trim(),O=L(t.env.USE_MOCK).trim().toLowerCase()==="true";if(s==="summary"&&v&&!O)try{const N=await fn(t.env,i);let M;a==="brief"?M=N.brief:a==="standard"?M=N.standard:M=`**개념**
${N.detail.개념}

**영향**
${N.detail.영향}

**교육적 가치**
${N.detail["교육적 가치"]}`;const U={kind:s,mode:a,viewType:"narrative",narrative:M,allSummaries:{brief:N.brief,standard:N.standard,detail:N.detail},meta:N.meta};await Ce(r,h,l||"anon",U);let y;return o==="narrative"?y=U:o==="structured"?y={kind:s,mode:a,...pt(M)}:o==="mindmap"?y={kind:s,mode:a,...mt(M)}:y={kind:s,mode:a,...gt(M)},await Ce(r,c,l||"anon",y),t.json({ok:!0,data:y,meta:{cached:!1,engine:"gemini-json-v3",elapsedMs:Date.now()-e}},200)}catch(N){console.error("[Gemini JSON Error]",N)}const T=on(i,a,o);if(await Ce(r,c,l||"anon",T),T.narrative){const N={kind:"summary",mode:a,viewType:"narrative",narrative:T.narrative};await Ce(r,h,l||"anon",N)}return t.json({ok:!0,data:T,meta:{cached:!1,engine:"local",elapsedMs:Date.now()-e}},200)});J.get("/health",t=>t.json({ok:!0,service:"MindStory v2 Revised"}));J.notFound(t=>t.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const xt=new Ht,gn=Object.assign({"/src/index.tsx":J});let Yt=!1;for(const[,t]of Object.entries(gn))t&&(xt.route("/",t),xt.notFound(t.notFoundHandler),Yt=!0);if(!Yt)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{xt as default};
