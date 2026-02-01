var en=Object.defineProperty;var it=t=>{throw TypeError(t)};var tn=(t,e,n)=>e in t?en(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var E=(t,e,n)=>tn(t,typeof e!="symbol"?e+"":e,n),We=(t,e,n)=>e.has(t)||it("Cannot "+n);var u=(t,e,n)=>(We(t,e,"read from private field"),n?n.call(t):e.get(t)),C=(t,e,n)=>e.has(t)?it("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),w=(t,e,n,r)=>(We(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),k=(t,e,n)=>(We(t,e,"access private method"),n);var at=(t,e,n,r)=>({set _(s){w(t,e,s,n)},get _(){return u(t,e,r)}});var ot=(t,e,n)=>(r,s)=>{let i=-1;return a(0);async function a(o){if(o<=i)throw new Error("next() called multiple times");i=o;let c,l=!1,d;if(t[o]?(d=t[o][0][0],r.req.routeIndex=o):d=o===t.length&&s||void 0,d)try{c=await d(r,()=>a(o+1))}catch(h){if(h instanceof Error&&e)r.error=h,c=await e(h,r),l=!0;else throw h}else r.finalized===!1&&n&&(c=await n(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},nn=Symbol(),rn=async(t,e=Object.create(null))=>{const{all:n=!1,dot:r=!1}=e,i=(t instanceof Rt?t.raw.headers:t.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?sn(t,{all:n,dot:r}):{}};async function sn(t,e){const n=await t.formData();return n?an(n,e):{}}function an(t,e){const n=Object.create(null);return t.forEach((r,s)=>{e.all||s.endsWith("[]")?on(n,s,r):n[s]=r}),e.dot&&Object.entries(n).forEach(([r,s])=>{r.includes(".")&&(cn(n,r,s),delete n[r])}),n}var on=(t,e,n)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(n):t[e]=[t[e],n]:e.endsWith("[]")?t[e]=[n]:t[e]=n},cn=(t,e,n)=>{let r=t;const s=e.split(".");s.forEach((i,a)=>{a===s.length-1?r[i]=n:((!r[i]||typeof r[i]!="object"||Array.isArray(r[i])||r[i]instanceof File)&&(r[i]=Object.create(null)),r=r[i])})},Ct=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},ln=t=>{const{groups:e,path:n}=dn(t),r=Ct(n);return un(r,e)},dn=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(n,r)=>{const s=`@${r}`;return e.push([s,n]),s}),{groups:e,path:t}},un=(t,e)=>{for(let n=e.length-1;n>=0;n--){const[r]=e[n];for(let s=t.length-1;s>=0;s--)if(t[s].includes(r)){t[s]=t[s].replace(r,e[n][1]);break}}return t},Le={},hn=(t,e)=>{if(t==="*")return"*";const n=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const r=`${t}#${e}`;return Le[r]||(n[2]?Le[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,n[1],new RegExp(`^${n[2]}(?=/${e})`)]:[t,n[1],new RegExp(`^${n[2]}$`)]:Le[r]=[t,n[1],!0]),Le[r]}return null},rt=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return e(n)}catch{return n}})}},pn=t=>rt(t,decodeURI),Ot=t=>{const e=t.url,n=e.indexOf("/",e.indexOf(":")+4);let r=n;for(;r<e.length;r++){const s=e.charCodeAt(r);if(s===37){const i=e.indexOf("?",r),a=e.slice(n,i===-1?void 0:i);return pn(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(s===63)break}return e.slice(n,r)},fn=t=>{const e=Ot(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},ge=(t,e,...n)=>(n.length&&(e=ge(e,...n)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Nt=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),n=[];let r="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){n.length===0&&r===""?n.push("/"):n.push(r);const i=s.replace("?","");r+="/"+i,n.push(r)}else r+="/"+s}),n.filter((s,i,a)=>a.indexOf(s)===i)},Qe=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?rt(t,kt):t):t,_t=(t,e,n)=>{let r;if(!n&&e&&!/[%+]/.test(e)){let a=t.indexOf("?",8);if(a===-1)return;for(t.startsWith(e,a+1)||(a=t.indexOf(`&${e}`,a+1));a!==-1;){const o=t.charCodeAt(a+e.length+1);if(o===61){const c=a+e.length+2,l=t.indexOf("&",c);return Qe(t.slice(c,l===-1?void 0:l))}else if(o==38||isNaN(o))return"";a=t.indexOf(`&${e}`,a+1)}if(r=/[%+]/.test(t),!r)return}const s={};r??(r=/[%+]/.test(t));let i=t.indexOf("?",8);for(;i!==-1;){const a=t.indexOf("&",i+1);let o=t.indexOf("=",i);o>a&&a!==-1&&(o=-1);let c=t.slice(i+1,o===-1?a===-1?void 0:a:o);if(r&&(c=Qe(c)),i=a,c==="")continue;let l;o===-1?l="":(l=t.slice(o+1,a===-1?void 0:a),r&&(l=Qe(l))),n?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(l)):s[c]??(s[c]=l)}return e?s[e]:s},mn=_t,gn=(t,e)=>_t(t,e,!0),kt=decodeURIComponent,ct=t=>rt(t,kt),be,G,ee,Mt,$t,nt,te,yt,Rt=(yt=class{constructor(t,e="/",n=[[]]){C(this,ee);E(this,"raw");C(this,be);C(this,G);E(this,"routeIndex",0);E(this,"path");E(this,"bodyCache",{});C(this,te,t=>{const{bodyCache:e,raw:n}=this,r=e[t];if(r)return r;const s=Object.keys(e)[0];return s?e[s].then(i=>(s==="json"&&(i=JSON.stringify(i)),new Response(i)[t]())):e[t]=n[t]()});this.raw=t,this.path=e,w(this,G,n),w(this,be,{})}param(t){return t?k(this,ee,Mt).call(this,t):k(this,ee,$t).call(this)}query(t){return mn(this.url,t)}queries(t){return gn(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((n,r)=>{e[r]=n}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await rn(this,t))}json(){return u(this,te).call(this,"text").then(t=>JSON.parse(t))}text(){return u(this,te).call(this,"text")}arrayBuffer(){return u(this,te).call(this,"arrayBuffer")}blob(){return u(this,te).call(this,"blob")}formData(){return u(this,te).call(this,"formData")}addValidatedData(t,e){u(this,be)[t]=e}valid(t){return u(this,be)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[nn](){return u(this,G)}get matchedRoutes(){return u(this,G)[0].map(([[,t]])=>t)}get routePath(){return u(this,G)[0].map(([[,t]])=>t)[this.routeIndex].path}},be=new WeakMap,G=new WeakMap,ee=new WeakSet,Mt=function(t){const e=u(this,G)[0][this.routeIndex][1][t],n=k(this,ee,nt).call(this,e);return n&&/\%/.test(n)?ct(n):n},$t=function(){const t={},e=Object.keys(u(this,G)[0][this.routeIndex][1]);for(const n of e){const r=k(this,ee,nt).call(this,u(this,G)[0][this.routeIndex][1][n]);r!==void 0&&(t[n]=/\%/.test(r)?ct(r):r)}return t},nt=function(t){return u(this,G)[1]?u(this,G)[1][t]:t},te=new WeakMap,yt),xn={Stringify:1},It=async(t,e,n,r,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const i=t.callbacks;return i!=null&&i.length?(s?s[0]+=t:s=[t],Promise.all(i.map(o=>o({phase:e,buffer:s,context:r}))).then(o=>Promise.all(o.filter(Boolean).map(c=>It(c,e,!1,r,s))).then(()=>s[0]))):Promise.resolve(t)},vn="text/plain; charset=UTF-8",Ze=(t,e)=>({"Content-Type":t,...e}),Re,Me,X,ye,W,B,$e,we,Ee,le,Ie,je,ne,xe,wt,bn=(wt=class{constructor(t,e){C(this,ne);C(this,Re);C(this,Me);E(this,"env",{});C(this,X);E(this,"finalized",!1);E(this,"error");C(this,ye);C(this,W);C(this,B);C(this,$e);C(this,we);C(this,Ee);C(this,le);C(this,Ie);C(this,je);E(this,"render",(...t)=>(u(this,we)??w(this,we,e=>this.html(e)),u(this,we).call(this,...t)));E(this,"setLayout",t=>w(this,$e,t));E(this,"getLayout",()=>u(this,$e));E(this,"setRenderer",t=>{w(this,we,t)});E(this,"header",(t,e,n)=>{this.finalized&&w(this,B,new Response(u(this,B).body,u(this,B)));const r=u(this,B)?u(this,B).headers:u(this,le)??w(this,le,new Headers);e===void 0?r.delete(t):n!=null&&n.append?r.append(t,e):r.set(t,e)});E(this,"status",t=>{w(this,ye,t)});E(this,"set",(t,e)=>{u(this,X)??w(this,X,new Map),u(this,X).set(t,e)});E(this,"get",t=>u(this,X)?u(this,X).get(t):void 0);E(this,"newResponse",(...t)=>k(this,ne,xe).call(this,...t));E(this,"body",(t,e,n)=>k(this,ne,xe).call(this,t,e,n));E(this,"text",(t,e,n)=>!u(this,le)&&!u(this,ye)&&!e&&!n&&!this.finalized?new Response(t):k(this,ne,xe).call(this,t,e,Ze(vn,n)));E(this,"json",(t,e,n)=>k(this,ne,xe).call(this,JSON.stringify(t),e,Ze("application/json",n)));E(this,"html",(t,e,n)=>{const r=s=>k(this,ne,xe).call(this,s,e,Ze("text/html; charset=UTF-8",n));return typeof t=="object"?It(t,xn.Stringify,!1,{}).then(r):r(t)});E(this,"redirect",(t,e)=>{const n=String(t);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,e??302)});E(this,"notFound",()=>(u(this,Ee)??w(this,Ee,()=>new Response),u(this,Ee).call(this,this)));w(this,Re,t),e&&(w(this,W,e.executionCtx),this.env=e.env,w(this,Ee,e.notFoundHandler),w(this,je,e.path),w(this,Ie,e.matchResult))}get req(){return u(this,Me)??w(this,Me,new Rt(u(this,Re),u(this,je),u(this,Ie))),u(this,Me)}get event(){if(u(this,W)&&"respondWith"in u(this,W))return u(this,W);throw Error("This context has no FetchEvent")}get executionCtx(){if(u(this,W))return u(this,W);throw Error("This context has no ExecutionContext")}get res(){return u(this,B)||w(this,B,new Response(null,{headers:u(this,le)??w(this,le,new Headers)}))}set res(t){if(u(this,B)&&t){t=new Response(t.body,t);for(const[e,n]of u(this,B).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=u(this,B).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of r)t.headers.append("set-cookie",s)}else t.headers.set(e,n)}w(this,B,t),this.finalized=!0}get var(){return u(this,X)?Object.fromEntries(u(this,X)):{}}},Re=new WeakMap,Me=new WeakMap,X=new WeakMap,ye=new WeakMap,W=new WeakMap,B=new WeakMap,$e=new WeakMap,we=new WeakMap,Ee=new WeakMap,le=new WeakMap,Ie=new WeakMap,je=new WeakMap,ne=new WeakSet,xe=function(t,e,n){const r=u(this,B)?new Headers(u(this,B).headers):u(this,le)??new Headers;if(typeof e=="object"&&"headers"in e){const i=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[a,o]of i)a.toLowerCase()==="set-cookie"?r.append(a,o):r.set(a,o)}if(n)for(const[i,a]of Object.entries(n))if(typeof a=="string")r.set(i,a);else{r.delete(i);for(const o of a)r.append(i,o)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??u(this,ye);return new Response(t,{status:s,headers:r})},wt),M="ALL",yn="all",wn=["get","post","put","delete","options","patch"],jt="Can not add a route since the matcher is already built.",Pt=class extends Error{},En="__COMPOSED_HANDLER",Sn=t=>t.text("404 Not Found",404),lt=(t,e)=>{if("getResponse"in t){const n=t.getResponse();return e.newResponse(n.body,n)}return console.error(t),e.text("Internal Server Error",500)},F,$,Dt,K,oe,He,qe,Se,Tn=(Se=class{constructor(e={}){C(this,$);E(this,"get");E(this,"post");E(this,"put");E(this,"delete");E(this,"options");E(this,"patch");E(this,"all");E(this,"on");E(this,"use");E(this,"router");E(this,"getPath");E(this,"_basePath","/");C(this,F,"/");E(this,"routes",[]);C(this,K,Sn);E(this,"errorHandler",lt);E(this,"onError",e=>(this.errorHandler=e,this));E(this,"notFound",e=>(w(this,K,e),this));E(this,"fetch",(e,...n)=>k(this,$,qe).call(this,e,n[1],n[0],e.method));E(this,"request",(e,n,r,s)=>e instanceof Request?this.fetch(n?new Request(e,n):e,r,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${ge("/",e)}`,n),r,s)));E(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(k(this,$,qe).call(this,e.request,e,void 0,e.request.method))})});[...wn,yn].forEach(i=>{this[i]=(a,...o)=>(typeof a=="string"?w(this,F,a):k(this,$,oe).call(this,i,u(this,F),a),o.forEach(c=>{k(this,$,oe).call(this,i,u(this,F),c)}),this)}),this.on=(i,a,...o)=>{for(const c of[a].flat()){w(this,F,c);for(const l of[i].flat())o.map(d=>{k(this,$,oe).call(this,l.toUpperCase(),u(this,F),d)})}return this},this.use=(i,...a)=>(typeof i=="string"?w(this,F,i):(w(this,F,"*"),a.unshift(i)),a.forEach(o=>{k(this,$,oe).call(this,M,u(this,F),o)}),this);const{strict:r,...s}=e;Object.assign(this,s),this.getPath=r??!0?e.getPath??Ot:fn}route(e,n){const r=this.basePath(e);return n.routes.map(s=>{var a;let i;n.errorHandler===lt?i=s.handler:(i=async(o,c)=>(await ot([],n.errorHandler)(o,()=>s.handler(o,c))).res,i[En]=s.handler),k(a=r,$,oe).call(a,s.method,s.path,i)}),this}basePath(e){const n=k(this,$,Dt).call(this);return n._basePath=ge(this._basePath,e),n}mount(e,n,r){let s,i;r&&(typeof r=="function"?i=r:(i=r.optionHandler,r.replaceRequest===!1?s=c=>c:s=r.replaceRequest));const a=i?c=>{const l=i(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};s||(s=(()=>{const c=ge(this._basePath,e),l=c==="/"?0:c.length;return d=>{const h=new URL(d.url);return h.pathname=h.pathname.slice(l)||"/",new Request(h,d)}})());const o=async(c,l)=>{const d=await n(s(c.req.raw),...a(c));if(d)return d;await l()};return k(this,$,oe).call(this,M,ge(e,"*"),o),this}},F=new WeakMap,$=new WeakSet,Dt=function(){const e=new Se({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,w(e,K,u(this,K)),e.routes=this.routes,e},K=new WeakMap,oe=function(e,n,r){e=e.toUpperCase(),n=ge(this._basePath,n);const s={basePath:this._basePath,path:n,method:e,handler:r};this.router.add(e,n,[r,s]),this.routes.push(s)},He=function(e,n){if(e instanceof Error)return this.errorHandler(e,n);throw e},qe=function(e,n,r,s){if(s==="HEAD")return(async()=>new Response(null,await k(this,$,qe).call(this,e,n,r,"GET")))();const i=this.getPath(e,{env:r}),a=this.router.match(s,i),o=new bn(e,{path:i,matchResult:a,env:r,executionCtx:n,notFoundHandler:u(this,K)});if(a[0].length===1){let l;try{l=a[0][0][0][0](o,async()=>{o.res=await u(this,K).call(this,o)})}catch(d){return k(this,$,He).call(this,d,o)}return l instanceof Promise?l.then(d=>d||(o.finalized?o.res:u(this,K).call(this,o))).catch(d=>k(this,$,He).call(this,d,o)):l??u(this,K).call(this,o)}const c=ot(a[0],this.errorHandler,u(this,K));return(async()=>{try{const l=await c(o);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return k(this,$,He).call(this,l,o)}})()},Se),Lt=[];function An(t,e){const n=this.buildAllMatchers(),r=(s,i)=>{const a=n[s]||n[M],o=a[2][i];if(o)return o;const c=i.match(a[0]);if(!c)return[[],Lt];const l=c.indexOf("",1);return[a[1][l],c]};return this.match=r,r(t,e)}var Ke="[^/]+",_e=".*",ke="(?:|/.*)",ve=Symbol(),Cn=new Set(".\\+*[^]$()");function On(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===_e||t===ke?1:e===_e||e===ke?-1:t===Ke?1:e===Ke?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var de,ue,U,fe,Nn=(fe=class{constructor(){C(this,de);C(this,ue);C(this,U,Object.create(null))}insert(e,n,r,s,i){if(e.length===0){if(u(this,de)!==void 0)throw ve;if(i)return;w(this,de,n);return}const[a,...o]=e,c=a==="*"?o.length===0?["","",_e]:["","",Ke]:a==="/*"?["","",ke]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const d=c[1];let h=c[2]||Ke;if(d&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw ve;if(l=u(this,U)[h],!l){if(Object.keys(u(this,U)).some(x=>x!==_e&&x!==ke))throw ve;if(i)return;l=u(this,U)[h]=new fe,d!==""&&w(l,ue,s.varIndex++)}!i&&d!==""&&r.push([d,u(l,ue)])}else if(l=u(this,U)[a],!l){if(Object.keys(u(this,U)).some(d=>d.length>1&&d!==_e&&d!==ke))throw ve;if(i)return;l=u(this,U)[a]=new fe}l.insert(o,n,r,s,i)}buildRegExpStr(){const n=Object.keys(u(this,U)).sort(On).map(r=>{const s=u(this,U)[r];return(typeof u(s,ue)=="number"?`(${r})@${u(s,ue)}`:Cn.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof u(this,de)=="number"&&n.unshift(`#${u(this,de)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},de=new WeakMap,ue=new WeakMap,U=new WeakMap,fe),Ue,Pe,Et,_n=(Et=class{constructor(){C(this,Ue,{varIndex:0});C(this,Pe,new Nn)}insert(t,e,n){const r=[],s=[];for(let a=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const l=`@\\${a}`;return s[a]=[l,c],a++,o=!0,l}),!o)break}const i=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=s.length-1;a>=0;a--){const[o]=s[a];for(let c=i.length-1;c>=0;c--)if(i[c].indexOf(o)!==-1){i[c]=i[c].replace(o,s[a][1]);break}}return u(this,Pe).insert(i,e,r,u(this,Ue),n),r}buildRegExp(){let t=u(this,Pe).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const n=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,i,a)=>i!==void 0?(n[++e]=Number(i),"$()"):(a!==void 0&&(r[Number(a)]=++e),"")),[new RegExp(`^${t}`),n,r]}},Ue=new WeakMap,Pe=new WeakMap,Et),kn=[/^$/,[],Object.create(null)],ze=Object.create(null);function Bt(t){return ze[t]??(ze[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function Rn(){ze=Object.create(null)}function Mn(t){var l;const e=new _n,n=[];if(t.length===0)return kn;const r=t.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,h],[x,b])=>d?1:x?-1:h.length-b.length),s=Object.create(null);for(let d=0,h=-1,x=r.length;d<x;d++){const[b,S,O]=r[d];b?s[S]=[O.map(([R])=>[R,Object.create(null)]),Lt]:h++;let A;try{A=e.insert(S,h,b)}catch(R){throw R===ve?new Pt(S):R}b||(n[h]=O.map(([R,I])=>{const H=Object.create(null);for(I-=1;I>=0;I--){const[z,T]=A[I];H[z]=T}return[R,H]}))}const[i,a,o]=e.buildRegExp();for(let d=0,h=n.length;d<h;d++)for(let x=0,b=n[d].length;x<b;x++){const S=(l=n[d][x])==null?void 0:l[1];if(!S)continue;const O=Object.keys(S);for(let A=0,R=O.length;A<R;A++)S[O[A]]=o[S[O[A]]]}const c=[];for(const d in a)c[d]=n[a[d]];return[i,c,s]}function me(t,e){if(t){for(const n of Object.keys(t).sort((r,s)=>s.length-r.length))if(Bt(n).test(e))return[...t[n]]}}var re,se,Je,Ht,St,$n=(St=class{constructor(){C(this,Je);E(this,"name","RegExpRouter");C(this,re);C(this,se);E(this,"match",An);w(this,re,{[M]:Object.create(null)}),w(this,se,{[M]:Object.create(null)})}add(t,e,n){var o;const r=u(this,re),s=u(this,se);if(!r||!s)throw new Error(jt);r[t]||[r,s].forEach(c=>{c[t]=Object.create(null),Object.keys(c[M]).forEach(l=>{c[t][l]=[...c[M][l]]})}),e==="/*"&&(e="*");const i=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const c=Bt(e);t===M?Object.keys(r).forEach(l=>{var d;(d=r[l])[e]||(d[e]=me(r[l],e)||me(r[M],e)||[])}):(o=r[t])[e]||(o[e]=me(r[t],e)||me(r[M],e)||[]),Object.keys(r).forEach(l=>{(t===M||t===l)&&Object.keys(r[l]).forEach(d=>{c.test(d)&&r[l][d].push([n,i])})}),Object.keys(s).forEach(l=>{(t===M||t===l)&&Object.keys(s[l]).forEach(d=>c.test(d)&&s[l][d].push([n,i]))});return}const a=Nt(e)||[e];for(let c=0,l=a.length;c<l;c++){const d=a[c];Object.keys(s).forEach(h=>{var x;(t===M||t===h)&&((x=s[h])[d]||(x[d]=[...me(r[h],d)||me(r[M],d)||[]]),s[h][d].push([n,i-l+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(u(this,se)).concat(Object.keys(u(this,re))).forEach(e=>{t[e]||(t[e]=k(this,Je,Ht).call(this,e))}),w(this,re,w(this,se,void 0)),Rn(),t}},re=new WeakMap,se=new WeakMap,Je=new WeakSet,Ht=function(t){const e=[];let n=t===M;return[u(this,re),u(this,se)].forEach(r=>{const s=r[t]?Object.keys(r[t]).map(i=>[i,r[t][i]]):[];s.length!==0?(n||(n=!0),e.push(...s)):t!==M&&e.push(...Object.keys(r[M]).map(i=>[i,r[M][i]]))}),n?Mn(e):null},St),ie,Q,Tt,In=(Tt=class{constructor(t){E(this,"name","SmartRouter");C(this,ie,[]);C(this,Q,[]);w(this,ie,t.routers)}add(t,e,n){if(!u(this,Q))throw new Error(jt);u(this,Q).push([t,e,n])}match(t,e){if(!u(this,Q))throw new Error("Fatal error");const n=u(this,ie),r=u(this,Q),s=n.length;let i=0,a;for(;i<s;i++){const o=n[i];try{for(let c=0,l=r.length;c<l;c++)o.add(...r[c]);a=o.match(t,e)}catch(c){if(c instanceof Pt)continue;throw c}this.match=o.match.bind(o),w(this,ie,[o]),w(this,Q,void 0);break}if(i===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(u(this,Q)||u(this,ie).length!==1)throw new Error("No active router has been determined yet.");return u(this,ie)[0]}},ie=new WeakMap,Q=new WeakMap,Tt),Oe=Object.create(null),ae,L,he,Te,D,Z,ce,Ae,jn=(Ae=class{constructor(e,n,r){C(this,Z);C(this,ae);C(this,L);C(this,he);C(this,Te,0);C(this,D,Oe);if(w(this,L,r||Object.create(null)),w(this,ae,[]),e&&n){const s=Object.create(null);s[e]={handler:n,possibleKeys:[],score:0},w(this,ae,[s])}w(this,he,[])}insert(e,n,r){w(this,Te,++at(this,Te)._);let s=this;const i=ln(n),a=[];for(let o=0,c=i.length;o<c;o++){const l=i[o],d=i[o+1],h=hn(l,d),x=Array.isArray(h)?h[0]:l;if(x in u(s,L)){s=u(s,L)[x],h&&a.push(h[1]);continue}u(s,L)[x]=new Ae,h&&(u(s,he).push(h),a.push(h[1])),s=u(s,L)[x]}return u(s,ae).push({[e]:{handler:r,possibleKeys:a.filter((o,c,l)=>l.indexOf(o)===c),score:u(this,Te)}}),s}search(e,n){var c;const r=[];w(this,D,Oe);let i=[this];const a=Ct(n),o=[];for(let l=0,d=a.length;l<d;l++){const h=a[l],x=l===d-1,b=[];for(let S=0,O=i.length;S<O;S++){const A=i[S],R=u(A,L)[h];R&&(w(R,D,u(A,D)),x?(u(R,L)["*"]&&r.push(...k(this,Z,ce).call(this,u(R,L)["*"],e,u(A,D))),r.push(...k(this,Z,ce).call(this,R,e,u(A,D)))):b.push(R));for(let I=0,H=u(A,he).length;I<H;I++){const z=u(A,he)[I],T=u(A,D)===Oe?{}:{...u(A,D)};if(z==="*"){const y=u(A,L)["*"];y&&(r.push(...k(this,Z,ce).call(this,y,e,u(A,D))),w(y,D,T),b.push(y));continue}const[_,f,m]=z;if(!h&&!(m instanceof RegExp))continue;const g=u(A,L)[_],v=a.slice(l).join("/");if(m instanceof RegExp){const y=m.exec(v);if(y){if(T[f]=y[0],r.push(...k(this,Z,ce).call(this,g,e,u(A,D),T)),Object.keys(u(g,L)).length){w(g,D,T);const p=((c=y[0].match(/\//))==null?void 0:c.length)??0;(o[p]||(o[p]=[])).push(g)}continue}}(m===!0||m.test(h))&&(T[f]=h,x?(r.push(...k(this,Z,ce).call(this,g,e,T,u(A,D))),u(g,L)["*"]&&r.push(...k(this,Z,ce).call(this,u(g,L)["*"],e,T,u(A,D)))):(w(g,D,T),b.push(g)))}}i=b.concat(o.shift()??[])}return r.length>1&&r.sort((l,d)=>l.score-d.score),[r.map(({handler:l,params:d})=>[l,d])]}},ae=new WeakMap,L=new WeakMap,he=new WeakMap,Te=new WeakMap,D=new WeakMap,Z=new WeakSet,ce=function(e,n,r,s){const i=[];for(let a=0,o=u(e,ae).length;a<o;a++){const c=u(e,ae)[a],l=c[n]||c[M],d={};if(l!==void 0&&(l.params=Object.create(null),i.push(l),r!==Oe||s&&s!==Oe))for(let h=0,x=l.possibleKeys.length;h<x;h++){const b=l.possibleKeys[h],S=d[l.score];l.params[b]=s!=null&&s[b]&&!S?s[b]:r[b]??(s==null?void 0:s[b]),d[l.score]=!0}}return i},Ae),pe,At,Pn=(At=class{constructor(){E(this,"name","TrieRouter");C(this,pe);w(this,pe,new jn)}add(t,e,n){const r=Nt(e);if(r){for(let s=0,i=r.length;s<i;s++)u(this,pe).insert(t,r[s],n);return}u(this,pe).insert(t,e,n)}match(t,e){return u(this,pe).search(t,e)}},pe=new WeakMap,At),qt=class extends Tn{constructor(t={}){super(t),this.router=t.router??new In({routers:[new $n,new Pn]})}},Dn=t=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(n.origin),s=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(n.allowMethods);return async function(a,o){var d;function c(h,x){a.res.headers.set(h,x)}const l=await r(a.req.header("origin")||"",a);if(l&&c("Access-Control-Allow-Origin",l),n.credentials&&c("Access-Control-Allow-Credentials","true"),(d=n.exposeHeaders)!=null&&d.length&&c("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),a.req.method==="OPTIONS"){n.origin!=="*"&&c("Vary","Origin"),n.maxAge!=null&&c("Access-Control-Max-Age",n.maxAge.toString());const h=await s(a.req.header("origin")||"",a);h.length&&c("Access-Control-Allow-Methods",h.join(","));let x=n.allowHeaders;if(!(x!=null&&x.length)){const b=a.req.header("Access-Control-Request-Headers");b&&(x=b.split(/\s*,\s*/))}return x!=null&&x.length&&(c("Access-Control-Allow-Headers",x.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await o(),n.origin!=="*"&&a.header("Vary","Origin",{append:!0})}},Ln=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,dt=(t,e=Hn)=>{const n=/\.([a-zA-Z0-9]+?)$/,r=t.match(n);if(!r)return;let s=e[r[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},Bn={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Hn=Bn,qn=(...t)=>{let e=t.filter(s=>s!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const n=e.split("/"),r=[];for(const s of n)s===".."&&r.length>0&&r.at(-1)!==".."?r.pop():s!=="."&&r.push(s);return r.join("/")||"."},zt={br:".br",zstd:".zst",gzip:".gz"},zn=Object.keys(zt),Gn="index.html",Fn=t=>{const e=t.root??"./",n=t.path,r=t.join??qn;return async(s,i)=>{var d,h,x,b;if(s.finalized)return i();let a;if(t.path)a=t.path;else try{if(a=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((d=t.onNotFound)==null?void 0:d.call(t,s.req.path,s)),i()}let o=r(e,!n&&t.rewriteRequestPath?t.rewriteRequestPath(a):a);t.isDir&&await t.isDir(o)&&(o=r(o,Gn));const c=t.getContent;let l=await c(o,s);if(l instanceof Response)return s.newResponse(l.body,l);if(l){const S=t.mimes&&dt(o,t.mimes)||dt(o);if(s.header("Content-Type",S||"application/octet-stream"),t.precompressed&&(!S||Ln.test(S))){const O=new Set((h=s.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(A=>A.trim()));for(const A of zn){if(!O.has(A))continue;const R=await c(o+zt[A],s);if(R){l=R,s.header("Content-Encoding",A),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((x=t.onFound)==null?void 0:x.call(t,o,s)),s.body(l)}await((b=t.onNotFound)==null?void 0:b.call(t,o,s)),await i()}},Kn=async(t,e)=>{let n;e&&e.manifest?typeof e.manifest=="string"?n=JSON.parse(e.manifest):n=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?n=JSON.parse(__STATIC_CONTENT_MANIFEST):n=__STATIC_CONTENT_MANIFEST;let r;e&&e.namespace?r=e.namespace:r=__STATIC_CONTENT;const s=n[t];if(!s)return null;const i=await r.get(s,{type:"stream"});return i||null},Un=t=>async function(n,r){return Fn({...t,getContent:async i=>Kn(i,{manifest:t.manifest,namespace:t.namespace?t.namespace:n.env?n.env.__STATIC_CONTENT:void 0})})(n,r)},Jn=t=>Un(t);const J=new qt,Ge=new Map,Vn=1e3*60*60*24*7;let et=!1;function Gt(){return new Date().toISOString()}function P(t){return t==null?"":String(t)}function Fe(t,e,n){return Math.max(e,Math.min(n,t))}function Yn(t){return(t||"").replace(/\s+/g,"")}function st(t){return Yn(t).length}function Xn(t){return(t||"").replace(/-\s*[ivxIVX]+-\s*/gi,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[p\.\s*\d+\]/gi,"").replace(/p\.\s*\d+/gi,"").replace(/\n+/g," ").replace(/\s{2,}/g," ").trim()}function Wn(t){if(!t)return"";let e=String(t);return e=e.replace(/\uFEFF/g,"").replace(/[\u200B-\u200D\u2060]/g,"").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g," "),e=e.replace(/(?:^|\n)\s*[-–—]?\s*\d{1,4}\s*[-–—]?\s*(?=\n|$)/g,`
`),e=e.replace(/([A-Za-z])-\s*\n\s*([A-Za-z])/g,"$1$2"),e=e.replace(/([가-힣0-9])\s*\n\s*([가-힣0-9])/g,"$1$2"),e=e.replace(/\n{3,}/g,`

`),e=e.replace(/[ \t]{2,}/g," "),e=e.replace(/[「『]/g,'"').replace(/[」』]/g,'"'),e=e.replace(/[〈《]/g,'"').replace(/[〉》]/g,'"'),e=e.replace(/\s+([,.;:!?])/g,"$1").replace(/([,.;:!?])\s+/g,"$1 "),e.trim()}function ut(t){const e=(t||"").trim();if(!e)return[];const n=e.split(/\n{2,}/g),r=[];for(const s of n){const i=s.replace(/\n/g," ").replace(/[ \t]{2,}/g," ").trim();if(!i)continue;const a=i.split(new RegExp("(?<=[다요임함]\\.|[다요임함]\\?|[다요임함]!|[.?!])\\s+","g"));for(let o of a)o=o.trim(),o&&r.push(o)}return r}function Qn(t){const e=(t||"").trim();return!!(!e||e.length<12&&!(/[.?!]$/.test(e)||/(?:이다|된다|한다|있다|없다|말한다|주장한다)\.?$/.test(e))||/[-–—]\s*\d{1,4}\s*[-–—]/.test(e)||/^["")\]\}]+$/.test(e)||/^["(\[\{]+$/.test(e)||/^(?:\(\d+\)|\d+\)|[①-⑳])\s*["")\]]*\s*$/.test(e)||/(완전\s*정복|쏙쏙|콕콕|실력을\s*쑥쑥|고득점|전문\s*대비반|특강|홍보)/.test(e)&&(/[""]/.test(e)||/!$/.test(e))||(e.match(/["""'(){}\[\]<>]/g)||[]).length>=10&&e.length<80)}function Zn(t){const e=[],n=new Set;for(const r of t){const s=r.trim();if(Qn(s))continue;const i=s.replace(/\s+/g," ");n.has(i)||(n.add(i),e.push(i))}return e}function er(t){const e=Wn(t),n=Zn(ut(e)),r=n.length>=3?n:ut(e);return{text:e,sentences:r}}function Ft(t){const e=P(t).trim().toLowerCase();return e?e==="brief"||e==="simple"||e==="short"||e==="lite"?"brief":e==="detail"||e==="detailed"||e==="full"?"detail":"standard":"standard"}function Kt(t){const e=P(t).trim().toLowerCase();return e?e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"||e==="mind_map"?"mindmap":"narrative":"narrative"}function tr(t){const e=P(t).trim().toLowerCase();return e==="concept"?"concept":e==="exam"?"exam":"summary"}function Ut(t){let e=P(t).replace(/\s+/g," ").trim();if(!e)return[];e=e.replace(/[\u201C\u201D\u2033\u00AB\u00BB]/g,'"').replace(/[\u2018\u2019\u2032]/g,"'");const n=[];let r="",s=null,i=0;const a=()=>{const o=r.trim();o&&n.push(o),r=""};for(let o=0;o<e.length;o++){const c=e[o],l=e[o+1]||"",d=e[o+2]||"";if(c==="("&&i++,c===")"&&(i=Math.max(0,i-1)),(c==='"'||c==="'")&&s===null?s=c:s&&c===s&&(s=null),r+=c,s===null&&i===0&&/[.!?]/.test(c)){l===" "&&(a(),o++);continue}if(s===null&&i===0&&l===" "){const x=r.trimEnd().slice(-1),b=/[가-힣A-Za-z0-9"'(\[]/.test(d);(x==="다"||x==="요"||x==="죠")&&b&&(a(),o++)}}return a(),n.length?n:[e]}const Ve={narrative:{brief:4,standard:6,detail:9},structured:{brief:3,standard:5,detail:8},mindmap:{brief:4,standard:6,detail:10},selftest:{brief:3,standard:5,detail:8}};function nr(t){const e=String(t||"").trim().toLowerCase();return e==="brief"||e==="standard"||e==="detail"?e:e==="simple"?"brief":"standard"}function rr(t){const e=String(t||"").trim().toLowerCase();return e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"?"mindmap":"narrative"}function sr(t){const e=String(t||"").trim(),n=e.indexOf("{"),r=e.lastIndexOf("}");return n>=0&&r>n?e.slice(n,r+1):e}function ht(t){const e=sr(t);try{return JSON.parse(e)}catch{}const n=e.replace(/,\s*}/g,"}").replace(/,\s*]/g,"]").replace(/\u0000/g,"");try{return JSON.parse(n)}catch{}return null}function ir(t){return["당신은 초·중·고 학생의 '학습 단위' 기준으로 내용을 구조화하는 전문가입니다.","절대 규칙:","- 원문에 없는 내용 생성 금지(추측/과장 금지)","- 문자 단순 자르기 금지, 의미 단위로 재구성","- 반드시 JSON만 출력(설명문/머리말/꼬리말/코드블록 금지)","","구조화의 뼈대(반드시 포함):","- anchor: 핵심 주장 1문장","- sections: 학습 단위 조목화, 각 section은 keywords/lvl25/explain 포함","- glossary: term/def로 구성","- links: anchor(A0) -> section 연결","","출력 스키마:","{",'  "anchor": "핵심 주장 1문장",','  "hierarchy": { "big": "대단원", "mid": "중단원", "small": "소단원", "subtitles": ["소제목"] },','  "sections": [','    { "id": "S1", "title": "섹션 제목", "keywords": ["핵심어"], "lvl25": ["의미키워드"], "explain": "1~3문장 설명" }',"  ],",'  "glossary": [ { "term": "용어", "def": "정의" } ],','  "links": [ { "from": "A0", "to": "S1", "rel": "covers" } ]',"}","",`원문(공백제외 ${st(t)}자):`,t].join(`
`)}function ar(t,e){const n=st(t),r=(e==null?void 0:e.anchor)||"",s=((e==null?void 0:e.sections)||[]).map(i=>i.title).slice(0,10);return["당신은 초·중·고 학생의 시험/이해/기억을 위한 서술형 요약 전문가입니다.","절대 규칙:","- 원문에 없는 내용 생성 금지","- 반드시 JSON만 출력(설명문/코드블록 금지)",'- 아래 "구조화 뼈대"를 벗어나지 말고, 그 내용을 자연스러운 문장으로 연결해 서술하세요.',"","구조화 뼈대:",`- anchor: ${r}`,`- sections: ${JSON.stringify(s)}`,"","요구:","- summary는 6~10문장(상세)","- keyPoints 4~7개, examHints 2~4개","","출력 스키마:","{",'  "title": "요약 제목",','  "summary": "자연스러운 문장 요약(6~10문장)",','  "keyPoints": ["핵심포인트"],','  "examHints": ["시험포인트"]',"}","",`원문(공백제외 ${n}자):`,t].join(`
`)}function or(t){const e=(t==null?void 0:t.anchor)||"",n=((t==null?void 0:t.sections)||[]).map(s=>({id:s.id,title:s.title,keywords:s.keywords.slice(0,5)})),r=((t==null?void 0:t.glossary)||[]).slice(0,20);return["당신은 학습용 마인드맵 JSON을 만드는 전문가입니다.","절대 규칙:","- 반드시 JSON만 출력","- 노드 id 중복/누락 금지, edge 참조 일관","- 아래 구조화 정보를 그대로 바탕으로 구성(새 내용 생성 금지)","","구조화 입력:",`anchor: ${e}`,`sections: ${JSON.stringify(n)}`,`glossary: ${JSON.stringify(r)}`,"","출력 스키마:","{",'  "center": { "id": "C0", "label": "중심 주제", "type": "root", "note": "짧은 설명" },','  "nodes": [','    { "id": "S1", "label": "섹션", "type": "section", "note": "설명" },','    { "id": "T1", "label": "용어", "type": "term", "note": "정의" }',"  ],",'  "edges": [ { "from": "C0", "to": "S1", "rel": "has" } ]',"}"].join(`
`)}function cr(t){const e=(t==null?void 0:t.anchor)||"",n=((t==null?void 0:t.sections)||[]).map(s=>({id:s.id,title:s.title,keywords:s.keywords.slice(0,6)})),r=((t==null?void 0:t.glossary)||[]).slice(0,25);return["당신은 초·중·고 학생용 셀프테스트를 만드는 전문가입니다.","절대 규칙:","- 반드시 JSON만 출력","- 원문/구조화에 없는 내용 금지","- 문항 id는 q1, q2... 고유","","구조화 입력:",`anchor: ${e}`,`sections: ${JSON.stringify(n)}`,`glossary: ${JSON.stringify(r)}`,"","요구(상세):","- 총 8문항","- type은 reorder/blank/multiple_choice 섞기","","출력 스키마:","{",'  "questions": [','    { "id": "q1", "type": "multiple_choice", "prompt": "질문", "choices": ["a","b","c"], "answer": 1 },','    { "id": "q2", "type": "blank", "prompt": "빈칸", "answer": "정답" },','    { "id": "q3", "type": "reorder", "prompt": "순서", "choices": ["A","B","C"], "answer": [0,2,1] }',"  ]","}"].join(`
`)}function pt(t,e){const n=Ve.structured[e],r=(t.sections||[]).slice(0,n).map(c=>({...c,keywords:(c.keywords||[]).slice(0,e==="brief"?4:6),lvl25:(c.lvl25||[]).slice(0,e==="brief"?2:3),explain:String(c.explain||"").trim()})),s=e==="brief"?8:e==="standard"?14:20,i=(t.glossary||[]).slice(0,s),a=new Set(r.map(c=>c.id)),o=(t.links||[]).filter(c=>c.from==="A0"&&a.has(c.to));return{...t,sections:r,glossary:i,links:o}}function ft(t,e){const n=Ve.mindmap[e],r=(t.nodes||[]).slice(0,Math.max(0,n-1)),s=new Set(["C0",...r.map(a=>a.id)]),i=(t.edges||[]).filter(a=>s.has(a.from)&&s.has(a.to));return{...t,nodes:r,edges:i}}function mt(t,e){const n=Ve.selftest[e];return{questions:(t.questions||[]).slice(0,n)}}function gt(t,e){const n=Ve.narrative[e],i=Ut(t.summary||"").slice(0,n).join(" "),a=(t.keyPoints||[]).slice(0,e==="brief"?3:4),o=(t.examHints||[]).slice(0,e==="brief"?2:3);return{...t,summary:i,keyPoints:a,examHints:o}}async function Be(t,e){const n=async()=>{const o=await Vt(t,e);return String(o||"")},r=await n(),s=ht(r);if(s)return s;const i=await n(),a=ht(i);if(a)return a;throw new Error("MODEL_JSON_PARSE_FAILED")}async function lr(t,e){const n=await Be(t,ir(e));if(!(n!=null&&n.anchor)||!Array.isArray(n.sections))throw new Error("STRUCTURED_SCHEMA_INVALID");n.links=n.links||n.sections.map(d=>({from:"A0",to:d.id,rel:"covers"}));const r=await Be(t,ar(e,n));if(!(r!=null&&r.summary))throw new Error("NARRATIVE_SCHEMA_INVALID");const s=await Be(t,or(n));if(!(s!=null&&s.center)||!Array.isArray(s.nodes)||!Array.isArray(s.edges))throw new Error("MINDMAP_SCHEMA_INVALID");s.center.id||(s.center.id="C0");const i=await Be(t,cr(n));if(!Array.isArray(i.questions))throw new Error("SELFTEST_SCHEMA_INVALID");const a={detail:n,standard:pt(n,"standard"),brief:pt(n,"brief")},o={detail:r,standard:gt(r,"standard"),brief:gt(r,"brief")},c={detail:s,standard:ft(s,"standard"),brief:ft(s,"brief")},l={detail:i,standard:mt(i,"standard"),brief:mt(i,"brief")};return{structured:a,narrative:o,mindmap:c,selftest:l}}function dr(t){if(!t)return"";let e=String(t);return e=e.replace(/([가-힣])\r?\n([가-힣])/g,"$1$2"),e=e.replace(/([A-Za-z])-\r?\n([A-Za-z])/g,"$1$2"),e=e.replace(/\r/g,""),e=e.replace(/\n{2,}/g,`
`),e=e.replace(/\n/g," "),e=e.replace(/[ \t]{2,}/g," "),e=e.replace(/\s+([,.;:!?])/g,"$1"),e.trim()}function ur(t){return(t||[]).filter(e=>{const n=(e||"").trim();return!(!n||n.length<18||!(/[.!?]$/.test(n)||/다\.$/.test(n)||/이다\.$/.test(n)||/하였다\.$/.test(n))&&n.length<45)})}const hr=new Set(["그리고","그러나","하지만","또한","및","또","또는","즉","때문에","따라서","그래서","한편","이것","그것","저것","에서","으로","에게","부터","까지","보다","처럼","같이","의","가","이","은","는","을","를","과","와","도","만","하다","된다","있다","없다","이다","아니다","수","등","및","것","들","좀","매우","정말"]);function xt(t){return(t||"").toLowerCase().replace(/[^0-9a-z가-힣\s]/g," ").split(/\s+/).map(e=>e.trim()).map(e=>e.replace(/에게$/g,"").replace(/에서$/g,"").replace(/으로$/g,"").replace(/를$/g,"").replace(/을$/g,"").replace(/의$/g,"").replace(/하는$/g,"하").replace(/하$/g,"하")).filter(e=>e.length>=2&&!hr.has(e))}function pr(t){const e=new Map;for(const r of t)for(const s of xt(r))e.set(s,(e.get(s)||0)+1);return t.map((r,s)=>{const i=xt(r);let a=0;for(const l of i)a+=e.get(l)||0;const o=r.length,c=o<15?.7:o>180?.85:1;return{idx:s,s:r,score:a*c}})}function fr(t,e){if(t.length===0)return[];const n=pr(t),r=n[0],s=n.slice(1),i=s.slice().sort((o,c)=>c.score-o.score).slice(0,Fe(e-1,0,Math.max(0,s.length)));return[r,...i].sort((o,c)=>o.idx-c.idx).map(o=>o.s)}function mr(t){let e=(t||"").trim();e=e.replace(/모\s+든/g,"모든"),e=e.replace(/기\s+회/g,"기회"),e=e.replace(/이\s+루어지는/g,"이루어지는"),e=e.replace(/루어지는/g,"이루어지는"),e=e.replace(/생태계물/g,"자연물"),e=e.replace(/놀은\s+는/g,"놀이는"),e=e.replace(/형성은\s+는/g,"형성은"),e=e.replace(/특정\s+공간\s+인/g,"특정 공간인"),e=e.replace(/(\S+)\s+\1/g,"$1"),e=e.replace(/([가-힣])을\b/g,(i,a)=>{const o=a.charCodeAt(0);return o>=44032&&o<=55203?(o-44032)%28!==0?a+"을":a+"를":i});const n=e.split(new RegExp("(?<=다\\.)\\s+")),r=new Set,s=[];for(const i of n){const a=i.match(/^([^은는]+[은는])\s+(.+)/);if(a){const o=a[1];if(r.has(o))continue;r.add(o)}s.push(i)}return e=s.join(" "),e=e.replace(/입니다\.\s*이는\s+/g,"이다. "),e=e.replace(/입니다\.\s*또한\s+/g,"이다. 또한 "),e=e.replace(/입니다\.\s*즉\s+/g,"이다. 즉 "),e=e.replace(/\s*\.\s*/g,". "),e=e.replace(/\s*,\s*/g,", "),e=e.replace(/\s*;\s*/g,"; "),e=e.replace(/[ ]{2,}/g," "),e=e.replace(/\n{3,}/g,`

`),e.trim()}function gr(t,e,n){if(!Array.isArray(t)||t.length===0)return{summary:"요약할 내용이 부족합니다.",mindmap:{keywords:[],nodes:[],edges:[]},meta:{ratio:0,target:{min:0,max:0}}};const r=Math.max(1,Number(n)||1),s=e==="brief"?{min:10,max:15}:e==="detail"?{min:45,max:55}:{min:25,max:30},i=["또한","아울러","더불어"],a=["한편","이와 함께","이와 더불어","또 다른 측면에서"],o=T=>{const _=String(T||"").trim().slice(0,24);if(/^(또한|아울러|더불어|한편|이와\s|그리고|그러나|하지만)\b/.test(_))return null;const f=_.match(/^(.{1,20}?(은|는|이|가))\s+/);return f?f[1]:null},c=T=>{const _=String(T||"").trim();return _&&(/[.!?…]$/.test(_)?_:_+".")},l=T=>{let _=String(T||"").trim(),f="";const m=_.match(/([.!?…])$/);return m&&(f=m[1],_=_.slice(0,-1).trim()),_=_.replace(/합니다$/,"한다").replace(/되었습니다$/,"되었다").replace(/입니다$/,"이다").replace(/습니다$/,"다"),(_+(f||".")).trim()},d=T=>/^(그러므로|따라서|하지만|그러나|또한|더불어|한편|이와|나아가|아울러|즉|특히)\s/.test(T.trim()),h=T=>T.replace(/^(또한|더불어|한편|이와|나아가|아울러)\s+/,"").trim();let x=t.map((T,_)=>{const f=String(T||"").trim();if(!f)return"";if(_===0){const p=h(f);return l(c(p))}if(d(f))return l(c(f));const m=String(t[_-1]||"").trim(),g=o(m),v=o(f),y=p=>p[_%p.length];if(v&&g&&v===g){const p=f.replace(/^(.{1,40}?(은|는|이|가))\s+/,"");return l(c(`${y(i)} ${p}`.trim()))}else return f.length>15?l(c(`${y(a)} ${f}`.trim())):l(c(f))}).filter(Boolean);const b=T=>String(T||"").replace(/\s+/g,"").length;let S=x.join(" ");S=S.replace(/\s*(또한|더불어|한편|이와|나아가|아울러)\s+(또한|더불어|한편|이와|나아가|아울러)\s+/g," $2 ").replace(/\s{2,}/g," ").trim();let O=b(S)/r*100;for(;O>s.max&&x.length>1;)x.pop(),S=x.join(" "),O=b(S)/r*100;O<s.min&&console.warn(`[젠스] 요약율 ${O.toFixed(1)}%가 목표 최소치 ${s.min}% 미만입니다.`);const R=x.join(" ").replace(/[0-9]/g," ").replace(/[^\uAC00-\uD7A3a-zA-Z\s]/g," ").split(/\s+/).map(T=>T.trim()).filter(T=>T.length>=2&&T.length<=6),I=new Map;for(const T of R)I.set(T,(I.get(T)||0)+1);const H=[...I.entries()].sort((T,_)=>_[1]-T[1]).slice(0,12).map(([T])=>T),z={keywords:H,nodes:H.map((T,_)=>({id:`k${_}`,label:T})),edges:[]};return{summary:S,mindmap:z,meta:{ratio:O,target:s}}}function tt(t,e,n){const r=dr(t);let s=Ut(r);s=ur(s);const i=e==="brief"?Fe(Math.round(s.length*.15),2,4):e==="standard"?Fe(Math.round(s.length*.3),5,9):Fe(Math.round(s.length*.55),10,18);let a=fr(s,i);if(e==="detail"){const l=["성별","학년","남학생","여학생","초등","중학","고학년","저학년","변인","차이","비교"],d=s.filter(h=>l.some(x=>h.includes(x))&&!a.includes(h)).slice(0,5);d.length>0&&(a=[...a,...d])}const o=st(r);if(n==="narrative"){let l,d=null,h=null;{const x=gr(a,e,o);l=x.summary,d=x.mindmap,h=x.meta}return l=mr(l),{kind:"summary",mode:e,viewType:n,narrative:l,...d&&{mindmapKeywords:d},...h&&{meta:{...h,inputNormalized:!0,originalLen:o}}}}if(n==="structured")return{kind:"summary",mode:e,viewType:n,structured:{title:"구조화 요약",bullets:a.map((l,d)=>`- (${d+1}) ${l}`)}};if(n==="mindmap"){const l=(a[0]||s[0]||"핵심").slice(0,40),d=[{id:"c",label:l,level:0}],h=[];return a.slice(1).forEach((x,b)=>{const S=`n${b+1}`;d.push({id:S,label:x.slice(0,60),level:1}),h.push({from:"c",to:S})}),{kind:"summary",mode:e,viewType:n,mindmap:{center:l,nodes:d,edges:h}}}const c=a.map((l,d)=>({id:`q${d+1}`,type:"short",question:`(${d+1}) 다음 내용을 한 문장으로 설명해보세요: "${l.slice(0,70)}"`,answerHint:l}));return{kind:"summary",mode:e,viewType:n,selftest:{title:"셀프테스트",questions:c}}}function Jt(t){if(!t)return"empty";let e=2166136261,n=0;for(let i=0;i<t.length;i++){const a=t.charCodeAt(i);e^=a,e+=(e<<1)+(e<<4)+(e<<7)+(e<<8)+(e<<24),n=(n<<5)-n+a,n|=0}const r=(e>>>0).toString(16),s=(Math.abs(n)>>>0).toString(16);return`${t.length.toString(16)}_${r}_${s}`}function xr(t,e,n,r){const s=Jt(n);return`${t}::${r||"anon"}::${e}::base::${s}`}function vr(t,e,n,r,s){const i=Jt(r);return`${t}::${s||"anon"}::${e}::${n}::${i}`}async function br(t){if(!et){if(!t){et=!0;return}await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),et=!0}}async function vt(t,e){const n=Date.now(),r=Ge.get(e);if(r&&n-r.createdAt<Vn)return{hit:!0,data:r.data,store:"mem"};if(r&&Ge.delete(e),!t)return{hit:!1};const s=await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();if(!(s!=null&&s.response_json))return{hit:!1};try{const i=JSON.parse(s.response_json);return Ge.set(e,{data:i,createdAt:n}),{hit:!0,data:i,store:"d1"}}catch{return{hit:!1}}}async function Ne(t,e,n,r){const s=Date.now();Ge.set(e,{data:r,createdAt:s}),t&&await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e,n,JSON.stringify(r),Gt()).run()}function yr(t){const e=t.split(/\n\n+/).filter(r=>r.trim());return{kind:"summary",viewType:"structured",structured:{title:"구조화 요약",bullets:e.length>1?e.map((r,s)=>`- (${s+1}) ${r}`):t.split(/[\.。]\s+/).filter(r=>r.trim()).map((r,s)=>`- (${s+1}) ${r}.`)}}}function wr(t){const e=t.split(/[\.。]\s+/).filter(i=>i.trim()).map(i=>i.trim()),n=(e[0]||"핵심").slice(0,40),r=[{id:"c",label:n,level:0}],s=[];return e.slice(1).forEach((i,a)=>{const o=`n${a+1}`;r.push({id:o,label:i.slice(0,60),level:1}),s.push({from:"c",to:o})}),{kind:"summary",viewType:"mindmap",mindmap:{center:n,nodes:r,edges:s}}}function Er(t){return{kind:"summary",viewType:"selftest",selftest:{title:"셀프테스트",questions:t.split(/[\.。]\s+/).filter(r=>r.trim()).map(r=>r.trim()).map((r,s)=>({id:`q${s+1}`,type:"short",question:`(${s+1}) 다음 내용을 한 문장으로 설명해보세요: "${r.slice(0,70)}"`,answerHint:r}))}}}async function Sr(t,e){var c,l,d,h,x;const n=P(t.GEMINI_API_KEY).trim();if(!n)throw new Error("GEMINI_API_KEY is missing");const r=P(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",s=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(n)}`,i={contents:[{role:"user",parts:[{text:e}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let a=0,o=500;for(;a<3;){a++;const b=await fetch(s,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(i)});if(b.ok){const O=await b.json();return{ok:!0,text:((x=(h=(d=(l=(c=O==null?void 0:O.candidates)==null?void 0:c[0])==null?void 0:l.content)==null?void 0:d.parts)==null?void 0:h[0])==null?void 0:x.text)??"",raw:O}}if(b.status===429||b.status===503){await new Promise(O=>setTimeout(O,o)),o*=2;continue}const S=await b.text().catch(()=>"");throw new Error(`Gemini error ${b.status}: ${S.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function Tr(t,e,n){var l,d,h,x,b;const r=P(t.GEMINI_API_KEY).trim();if(!r)throw new Error("GEMINI_API_KEY is missing");const s=P(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",i=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`,a={system_instruction:{parts:[{text:e}]},contents:[{role:"user",parts:[{text:n}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let o=0,c=500;for(;o<3;){o++;const S=await fetch(i,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(a)});if(S.ok){const A=await S.json();return((b=(x=(h=(d=(l=A==null?void 0:A.candidates)==null?void 0:l[0])==null?void 0:d.content)==null?void 0:h.parts)==null?void 0:x[0])==null?void 0:b.text)??""}if(S.status===429||S.status===503){await new Promise(A=>setTimeout(A,c)),c*=2;continue}const O=await S.text().catch(()=>"");throw new Error(`Gemini error ${S.status}: ${O.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function Vt(t,e){const n=await Sr(t,e);return typeof n=="string"?n:((n==null?void 0:n.text)??"").toString()}const Ar=(()=>{const e={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}},n={brief:6,standard:10,detail:14},r=["narrative","structured","mindmap"],s=["preview","exam"];function i(f){return(f||"").replace(/\s+/g,"")}function a(f,m){const v=Math.max(200,i(f||"").length),y=e[m]||e.standard,p=Math.floor(v*y.min),N=Math.ceil(v*y.max);return{base:v,min:Math.max(80,p),max:Math.max(120,N)}}function o(f){const m=(f||"").trim();return m?m.replace(/\r/g,"").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map(v=>v.trim()).filter(Boolean):[]}function c(f){return o(f).map((g,v)=>({sid:`S${v+1}`,text:g}))}function l(f,m,g){const v=f.find(y=>y.sid===m);return!v||!g||typeof g!="string"?!1:v.text.includes(g.trim())}function d(){return["당신은 교육공학 기반 요약·셀프테스트 생성 엔진이다.","추출형 복붙 금지. 반드시 의미 단위로 재구성하라.","가장 중요한 1순위는 문자수(공백 제외) 제한 준수다.","허위 정보(원문/요약에 없는 내용) 생성 금지.","JSON 출력이 요구되면 JSON만 출력하라."].join(`
`)}function h({originalText:f,mode:m,format:g}){const v=a(f,m),y=Xn(f),p=g==="narrative"?"서술형: 연결어를 사용해 흐름/인과가 보이도록 1~3문단으로 구성":g==="structured"?"구조화: 상위-하위 위계가 드러나는 조목(가/나/다 또는 ①②③) 형태":"마인드맵: 텍스트로 표현된 노드-관계 목록(중심노드/하위노드/연결라벨) 형태";return["[TASK] 아래 학술 논문을 생성적 요약(Abstractive Summarization) 방식으로 지정된 형식에 맞춰 요약하라.",`- 모드: ${m} (간단/표준/상세)`,`- 형식: ${g} (${p})`,`- 문자수 목표(공백 제외): 최소 ${v.min}자 ~ 최대 ${v.max}자`,"","[🔹 C. 논문형 텍스트 전용 요약 구조 - 반드시 준수]","이 텍스트는 학술 논문입니다.","요약 시 반드시 다음 순서를 유지하세요:","1. 연구 목적 (무엇을 연구했는가?)","2. 연구 설계 및 방법 (어떻게 연구했는가?)","3. 핵심 결과 (무엇을 발견했는가?)","4. 결과 해석 (결과가 의미하는 바는?)","5. 교육적 의의 (실무/교육에 어떤 시사점을 주는가?)","각 단계는 1문단 이상을 넘지 마세요.","","[요약 품질 규칙]","1. 단순 추출/복붙 금지: 원문 문장을 그대로 나열하지 말고 생성적으로 재구성하여 매끄러운 글 작성","2. 텍스트 정제: 페이지 번호(p.XX), 각주, 특수기호, 질문형 문장 제거 → 학술적 평서문으로 전환","3. 스마트 편집: 중복 표현 통합, 전문 용어 일관성 유지, 한 문장 2줄 이내로 단문 위주","4. 퀴즈 연동: 핵심 키워드와 인과관계를 문장 내에 전략적으로 배치 (퀴즈 앵커 확보)","5. 할루시네이션 금지: 원문에 없는 주장/사례/인과/수치 추가 절대 금지","6. 🔹 B. 결과 단독 발췌 금지: 간단 모드에서는 DLPFC, VLPFC, OFC 등 세부 뇌 영역 명칭 사용 금지","","[비율 엄수]","- 간단 10~15%, 표준 25~30%, 상세 45~55% 글자수 비율은 절대적 기준","- 상세 요약이 표준보다 짧아지는 역전 현상 금지","- 각 단계마다 정보의 깊이와 양을 계층적으로 명확히 차별화","","[ORIGINAL]",y].join(`
`)}function x({summaryText:f,format:m}){return["[TASK] 아래 요약문에서 학습 앵커(핵심 개념/관계)를 추출하라.","- 출력은 JSON만. 한국어로.","- 앵커 수: 6~14개 범위(요약 길이에 맞춰 적절히).","- 각 앵커는 요약문에 실제로 등장하는 표현을 근거(quote)로 가져와야 한다.","- quote는 요약문 일부를 그대로 복사(짧게 8~25자).","","[OUTPUT JSON SCHEMA]",`{
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
}`,"","[SUMMARY]",f].join(`
`)}function b({mode:f,purpose:m,format:g,summaryText:v,sentTable:y,anchors:p}){const N=n[f]||10,q=m==="preview"?"예습용 셀프테스트: 요약문 안에서 바로 확인 가능한 재인 중심(스키마 형성). 과도한 추론 금지.":"시험대비 셀프테스트: 요약문에 있는 근거를 바탕으로 인과/관계/분류를 인출하는 회상 중심. 요약에 없는 정보 금지.",V=g==="narrative"?"문항 스타일: 문장 빈칸, 문장 순서 배열, 인과관계 단답/서술(요약 근거 필수)":g==="structured"?"문항 스타일: 항목-정의 매칭, 분류 채우기, 상하위 체계, 사례-범주 매칭(요약 근거 필수)":"문항 스타일: 노드 라벨 맞추기, 연결 라벨링, 누락 노드/연결 복원, 관계 이유 단답(요약 근거 필수)";return["[TASK] 아래 요약문과 앵커만을 근거로 셀프테스트 문항을 생성하라.",`- 모드: ${f} (문항수 ${N})`,`- 목적: ${m} (${q})`,`- 요약 형식: ${g} (${V})`,"- 규칙1: 요약문에 없는 정보로 문제 만들지 말 것(할루시네이션 금지).","- 규칙2: 각 문항은 반드시 evidence를 포함: sid + quote(요약 문장 일부 8~25자).","- 규칙3: quote는 반드시 해당 sid 문장에 실제로 포함되어야 한다.","- 규칙4: 정답/해설은 간결하게. 해설은 evidence와 연결되게.","","[OUTPUT JSON ONLY]",`{
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
}`,"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(y,null,2),"","[ANCHORS]",JSON.stringify(p,null,2),"","[SUMMARY]",v].join(`
`)}function S(f,m){const g=m&&m.anchors?m.anchors:[],v=[],y=[];for(const p of g){const N=p==null?void 0:p.sid,q=p==null?void 0:p.quote;if(typeof(p==null?void 0:p.label)!="string"||!p.label.trim()){y.push({a:p,reason:"label missing"});continue}if(!l(f,N,q)){y.push({a:p,reason:"evidence not in sentence"});continue}v.push(p)}return{ok:v,bad:y}}function O(f,m){const g=m&&Array.isArray(m.items)?m.items:[],v=[],y=[];for(const p of g){const N=p==null?void 0:p.evidence;if(!(p!=null&&p.id)||!(p!=null&&p.question)||!(p!=null&&p.answer)||!(N!=null&&N.sid)||!(N!=null&&N.quote)){y.push({q:p,reason:"missing fields"});continue}if(!l(f,N.sid,N.quote)){y.push({q:p,reason:"evidence not in sentence"});continue}if(Array.isArray(p.choices)&&p.choices.length>0&&!p.choices.includes(p.answer)){y.push({q:p,reason:"answer not in choices"});continue}v.push(p)}return{ok:v,bad:y}}function A({summaryText:f,sentTable:m,anchors:g,badItems:v,mode:y,purpose:p,format:N}){return["[TASK] 아래는 검증에서 탈락한 문항들이다. 요약문 근거(sid+quote)를 만족하도록 문항을 다시 생성하라.",`- 재생성 문항 수: ${v.length}`,`- 모드: ${y}, 목적: ${p}, 형식: ${N}`,"- 규칙: 요약문 밖 정보 금지. 반드시 sid+quote가 실제로 해당 문장에 포함되어야 한다.","- 출력: JSON만. items 길이는 정확히 재생성 문항 수와 같아야 한다.","","[OUTPUT JSON ONLY]",'{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}',"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(m,null,2),"","[ANCHORS]",JSON.stringify(g,null,2),"","[BAD ITEMS]",JSON.stringify(v,null,2),"","[SUMMARY]",f].join(`
`)}async function R({llmCall:f,originalText:m,mode:g,format:v}){if(!f)throw new Error("llmCall is required");e[g]||(g="standard"),r.includes(v)||(v="narrative");const y=h({originalText:m,mode:g,format:v}),p=(await f({system:d(),user:y,json:!1})||"").trim()||"",N=c(p),q=x({summaryText:p,format:v});let V=await f({system:d(),user:q,json:!0}),Y;try{Y=JSON.parse(V)}catch{Y={anchors:[]}}const{ok:j}=S(N,Y),De=j.length>=4?j:I(N);return{summaryText:p,sentTable:N,anchors:De}}function I(f){const m=[];for(let g=0;g<Math.min(8,f.length);g++){const v=f[g],y=(v.text||"").slice(0,18);m.push({id:`A${g+1}`,label:`문장 핵심${g+1}`,type:"claim",sid:v.sid,quote:y,note:"요약 문장 기반 안전 앵커"})}return m}async function H({llmCall:f,mode:m,purpose:g,format:v,summaryText:y,sentTable:p,anchors:N}){e[m]||(m="standard"),s.includes(g)||(g="preview"),r.includes(v)||(v="narrative");const q=b({mode:m,purpose:g,format:v,summaryText:y,sentTable:p,anchors:N});let V=await f({system:d(),user:q,json:!0}),Y;try{Y=JSON.parse(V)}catch{Y={items:[]}}let{ok:j,bad:De}=O(p,Y);if(De.length>0){const Ce=A({summaryText:y,sentTable:p,anchors:N,badItems:De.map(Zt=>Zt.q),mode:m,purpose:g,format:v});let Xt=await f({system:d(),user:Ce,json:!0}),Xe;try{Xe=JSON.parse(Xt)}catch{Xe={items:[]}}const Wt=O(p,Xe);j=j.concat(Wt.ok);const Qt=n[m]||10;j=j.slice(0,Qt)}else{const Ce=n[m]||10;j=j.slice(0,Ce)}const Ye=n[m]||10;if(j.length<Ye){const Ce=z({sentTable:p,anchors:N,count:Ye-j.length,format:v,purpose:g});j=j.concat(Ce).slice(0,Ye)}return{items:j}}function z({sentTable:f,anchors:m,count:g,format:v,purpose:y}){const p=[],N=m.slice(0,Math.max(g,1));for(let q=0;q<g;q++){const V=N[q%N.length],Y=V.sid,j=V.quote;p.push({id:`QF${q+1}`,type:"short",question:y==="preview"?`요약에서 '${j}'가 의미하는 핵심 개념을 한 문장으로 말해보세요.`:`요약에서 '${j}'가 포함된 문장의 핵심 인과/관계를 한 문장으로 인출해보세요.`,choices:[],answer:"(서술형 정답: 사용자 입력 비교는 해설 기반 채점 또는 키워드 채점으로 처리)",explanation:"근거 문장을 다시 읽고 핵심을 1문장으로 재구성하면 됩니다.",evidence:{sid:Y,quote:j},anchorIds:[V.id]})}return p}class T{constructor(m,{passScore:g=90}={}){this.items=Array.isArray(m)?m:[],this.passScore=g,this.state={idx:0,attempts:1,correct:0,wrongIds:new Set,finished:!1}}gradeAnswer(m,g){if(!m)return{ok:!1,reason:"no item"};const v=m.type;if(v==="mcq"||v==="blank"||v==="match"||v==="order"||v==="label"||v==="short"){if(v==="short")return{ok:!0,reason:"short-auto-pass"};const y=(m.answer||"").trim(),p=(g||"").trim();return{ok:p===y,reason:p===y?"match":"mismatch"}}return{ok:!1,reason:"unknown type"}}getScore(){return this.items.length===0?0:Math.round(this.state.correct/this.items.length*100)}currentItem(){return this.items[this.state.idx]||null}submit(m){if(this.state.finished)return{done:!0,message:"already finished"};const g=this.currentItem();if(this.gradeAnswer(g,m).ok)return this.state.correct+=1,this.next(),{ok:!0,message:"정답 처리",score:this.getScore()};if(this.state.wrongIds.add(g.id),this.state.attempts===1)return this.state.attempts=2,{ok:!1,stage:1,hint:`힌트1: 근거 문장(${g.evidence.sid})을 다시 읽어보세요.`,score:this.getScore()};if(this.state.attempts===2)return this.state.attempts=3,{ok:!1,stage:2,hint:`힌트2: 근거 구절 = '${g.evidence.quote}'`,score:this.getScore()};{const y=g.explanation||"해설 없음";return this.next(),{ok:!1,stage:3,explanation:y,score:this.getScore()}}}next(){if(this.state.idx+=1,this.state.attempts=1,this.state.idx>=this.items.length)if(this.getScore()>=this.passScore)this.state.finished=!0;else{const g=this.items.filter(v=>this.state.wrongIds.has(v.id));this.items=g.length>0?g:this.items,this.state.idx=0,this.state.attempts=1,this.state.correct=0,this.state.wrongIds=new Set}}status(){return{idx:this.state.idx,total:this.items.length,score:this.getScore(),passScore:this.passScore,finished:this.state.finished}}}async function _({llmCall:f,originalText:m,mode:g,format:v,purpose:y}){const p=await R({llmCall:f,originalText:m,mode:g,format:v}),N=await H({llmCall:f,mode:g,purpose:y,format:v,summaryText:p.summaryText,sentTable:p.sentTable,anchors:p.anchors});return{summary:{mode:g,format:v,text:p.summaryText,sentences:p.sentTable,anchors:p.anchors},selfTest:{purpose:y,passScore:90,items:N.items}}}return{computeCharTargets:a,splitSentencesKR:o,makeSentenceTable:c,generateBundle:R,generateSelfTest:H,runPipeline:_,MasteryRunner:T}})(),Cr=`/* MindStory Engine Bundle (compat) */
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
})();`;J.get("/ms-engine-bundle.js",t=>t.text(Cr,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));J.use("/api/*",Dn());J.get("/favicon.ico",t=>t.body(null,204));J.use("/static/*",Jn({root:"./public"}));J.get("/",t=>t.html(`<!DOCTYPE html>
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
            <div class="meta">아직 결과가 없습니다. 오른쪽 상단 상태가 &apos;OK&apos;인지 확인 후 요약을 실행하세요.</div>
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

  <!-- 5) 입력/버튼 연결 및 실행 로직 -->
  <script>
    (function(){
      const inputText = document.getElementById('inputText');
      const summarizeBtn = document.getElementById('summarizeBtn');
      const clearBtn = document.getElementById('clearBtn');
      const copyBtn = document.getElementById('copyBtn');
      const charCount = document.getElementById('charCount');
      const modeSeg = document.getElementById('modeSeg');
      const viewSeg = document.getElementById('viewSeg');
      const out = document.getElementById('out');
      const errBox = document.getElementById('errBox');
      const runBadge = document.getElementById('runBadge');
      const runText = document.getElementById('runText');
      const spin = document.getElementById('spin');
      const resultMeta = document.getElementById('resultMeta');

      let currentMode = 'standard';
      let currentView = 'narrative';

      // 입력 텍스트 카운트 업데이트
      if (inputText && charCount) {
        inputText.addEventListener('input', () => {
          const len = inputText.value.length;
          charCount.textContent = len;
          if (summarizeBtn) {
            summarizeBtn.disabled = len < 5;
          }
        });
      }

      // 모드 탭 클릭
      if (modeSeg) {
        modeSeg.addEventListener('click', (e) => {
          const btn = e.target.closest('[data-mode]');
          if (!btn) return;
          currentMode = btn.dataset.mode;
          modeSeg.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      }

      // 뷰 타입 탭 클릭
      if (viewSeg) {
        viewSeg.addEventListener('click', (e) => {
          const btn = e.target.closest('[data-view]');
          if (!btn) return;
          currentView = btn.dataset.view;
          viewSeg.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      }

      // 요약하기 버튼 클릭
      if (summarizeBtn) {
        summarizeBtn.addEventListener('click', async () => {
          const text = inputText.value.trim();
          if (text.length < 5) {
            if (errBox) {
              errBox.style.display = 'block';
              errBox.textContent = '입력 텍스트가 너무 짧습니다. (최소 5자)';
            }
            return;
          }

          // 에러 숨기기
          if (errBox) errBox.style.display = 'none';

          // 로딩 표시
          if (spin) spin.style.display = 'inline-block';
          if (runText) runText.textContent = '처리 중...';
          if (summarizeBtn) summarizeBtn.disabled = true;

          try {
            // API 호출
            const response = await window.SummaryPipeline.run({
              text,
              mode: currentMode,
              viewType: currentView,
              userId: 'web_user'
            });

            if (!response.ok) {
              throw new Error(response.error?.message || '요약 실패');
            }

            // 결과 렌더링
            renderResult(response.data, response.meta);
            
            // 성공 표시
            if (runText) runText.textContent = '완료';
            if (resultMeta) {
              resultMeta.textContent = \`엔진: \${response.meta?.engine || 'unknown'} · 소요: \${response.meta?.elapsedMs || 0}ms\`;
            }

          } catch (err) {
            console.error('[main] Request failed:', err);
            if (errBox) {
              errBox.style.display = 'block';
              errBox.textContent = err.message || '요약 중 오류가 발생했습니다.';
            }
            if (out) {
              out.innerHTML = '<div class="meta" style="color: var(--danger);">오류: ' + (err.message || '알 수 없는 오류') + '</div>';
            }
            if (runText) runText.textContent = '실패';
          } finally {
            if (spin) spin.style.display = 'none';
            if (summarizeBtn) summarizeBtn.disabled = false;
          }
        });
      }

      // 지우기 버튼
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (inputText) {
            inputText.value = '';
            if (charCount) charCount.textContent = '0';
            if (summarizeBtn) summarizeBtn.disabled = true;
          }
          if (out) {
            out.innerHTML = "<div class='meta'>아직 결과가 없습니다. 오른쪽 상단 상태가 'OK'인지 확인 후 요약을 실행하세요.</div>";
          }
          if (errBox) errBox.style.display = 'none';
          if (resultMeta) resultMeta.textContent = '—';
          if (runText) runText.textContent = '대기';
        });
      }

      // 복사 버튼
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          if (!out) return;
          const text = out.innerText;
          navigator.clipboard.writeText(text).then(() => {
            const original = copyBtn.textContent;
            copyBtn.textContent = '✅ 복사됨!';
            setTimeout(() => {
              copyBtn.textContent = original;
            }, 2000);
          }).catch(err => {
            console.error('복사 실패:', err);
          });
        });
      }

      // 결과 렌더링 함수
      function renderResult(data, meta) {
        if (!out) return;
        out.innerHTML = '';

        if (!data) {
          out.innerHTML = '<div class="meta">결과가 없습니다.</div>';
          return;
        }

        // narrative (서술형)
        if (currentView === 'narrative' && data.narrative) {
          const pre = document.createElement('pre');
          pre.style.whiteSpace = 'pre-wrap';
          pre.style.lineHeight = '1.6';
          pre.style.margin = '0';
          pre.textContent = data.narrative;
          out.appendChild(pre);
          return;
        }

        // structured (구조화)
        if (currentView === 'structured' && data.structured) {
          const title = document.createElement('h3');
          title.style.marginTop = '0';
          title.textContent = '구조화 요약';
          out.appendChild(title);

          if (data.structured.anchor) {
            const anchorDiv = document.createElement('div');
            anchorDiv.style.cssText = 'background: rgba(139,92,246,.12); border: 1px solid rgba(139,92,246,.25); padding: 10px; border-radius: 8px; margin-bottom: 12px;';
            anchorDiv.innerHTML = '<strong>🎯 핵심:</strong> ' + data.structured.anchor;
            out.appendChild(anchorDiv);
          }

          if (data.structured.sections && data.structured.sections.length > 0) {
            const sectionsDiv = document.createElement('div');
            data.structured.sections.forEach(section => {
              const sectionDiv = document.createElement('div');
              sectionDiv.style.marginBottom = '10px';
              sectionDiv.innerHTML = '<strong>' + (section.title || '') + '</strong><br>' + (section.content || '');
              sectionsDiv.appendChild(sectionDiv);
            });
            out.appendChild(sectionsDiv);
          }
          return;
        }

        // mindmap (마인드맵)
        if (currentView === 'mindmap' && data.mindmap) {
          const title = document.createElement('h3');
          title.style.marginTop = '0';
          title.textContent = '마인드맵';
          out.appendChild(title);

          if (data.mindmap.center || data.mindmap.anchorNodeId) {
            const centerDiv = document.createElement('div');
            centerDiv.className = 'badge';
            centerDiv.style.marginBottom = '12px';
            centerDiv.textContent = '🌟 ' + (data.mindmap.center || '핵심');
            out.appendChild(centerDiv);
          }

          if (data.mindmap.nodes && data.mindmap.nodes.length > 0) {
            const ul = document.createElement('ul');
            ul.style.marginTop = '10px';
            data.mindmap.nodes
              .filter(n => n.id !== 'c' && n.id !== data.mindmap.anchorNodeId)
              .forEach(node => {
                const li = document.createElement('li');
                li.textContent = node.label || '';
                ul.appendChild(li);
              });
            out.appendChild(ul);
          }
          return;
        }

        // selftest (자가테스트)
        if (currentView === 'selftest' && data.selftest) {
          const title = document.createElement('h3');
          title.style.marginTop = '0';
          title.textContent = '자가테스트';
          out.appendChild(title);

          const questions = data.selftest.questions || [];
          if (questions.length === 0) {
            out.innerHTML += '<div class="meta">문제가 없습니다.</div>';
            return;
          }

          questions.forEach((q, i) => {
            const qBox = document.createElement('div');
            qBox.style.cssText = 'background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); border-radius: 12px; padding: 12px; margin-bottom: 12px;';

            const qText = document.createElement('div');
            qText.style.cssText = 'font-weight:700; margin-bottom:6px;';
            qText.textContent = \`Q\${i + 1}. \${q.prompt || q.question || ''}\`;
            qBox.appendChild(qText);

            if (q.choices && q.choices.length > 0) {
              const choicesDiv = document.createElement('div');
              choicesDiv.style.marginTop = '8px';
              q.choices.forEach((choice, idx) => {
                const choiceDiv = document.createElement('div');
                choiceDiv.style.margin = '4px 0';
                choiceDiv.textContent = \`\${idx + 1}) \${choice}\`;
                choicesDiv.appendChild(choiceDiv);
              });
              qBox.appendChild(choicesDiv);
            }

            if (q.answer || q.answerHint) {
              const hint = document.createElement('div');
              hint.className = 'meta';
              hint.style.marginTop = '8px';
              hint.textContent = '정답: ' + (q.answer || q.answerHint || '');
              qBox.appendChild(hint);
            }

            out.appendChild(qBox);
          });
          return;
        }

        // 폴백
        out.innerHTML = '<div class="meta">선택한 보기 형식에 해당 결과가 없습니다.</div>';
      }

    })();
  <\/script>
</body>
</html>`));J.get("/api/health",t=>{const e=!!P(t.env.GEMINI_API_KEY).trim(),n=P(t.env.USE_MOCK).trim().toLowerCase()==="true";return t.json({ok:!0,ts:Gt(),hasDB:!!t.env.DB,hasGeminiKey:e,engineMode:e&&!n?"gemini+fallback":"local-only"})});J.post("/api/gens/run",async t=>{const e=Date.now();let n=null;try{n=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const r=P((n==null?void 0:n.text)||(n==null?void 0:n.originalText)||""),s=Ft((n==null?void 0:n.mode)||"standard"),i=Kt((n==null?void 0:n.format)||(n==null?void 0:n.viewType)||"narrative"),a=P((n==null?void 0:n.purpose)||"preview").trim().toLowerCase();if(!r)return t.json({ok:!1,error:{code:"NO_TEXT",message:"원문 텍스트가 필요합니다."}},400);const o=!!P(t.env.GEMINI_API_KEY).trim(),c=P(t.env.USE_MOCK).trim().toLowerCase()==="true";if(!o||c)return t.json({ok:!1,error:{code:"GEMINI_REQUIRED",message:"GENS Engine은 Gemini API가 필요합니다. .dev.vars에 GEMINI_API_KEY를 설정하세요."},guide:{step1:".dev.vars 파일 생성",step2:"GEMINI_API_KEY=your_api_key_here 추가",step3:"서비스 재시작: pm2 restart webapp"}},503);const l=async({system:d,user:h,json:x})=>{if(x){const b=`${d}

${h}

출력은 반드시 JSON만 출력하라. 다른 텍스트 금지.`;return await Vt(t.env,b)}else return(await Tr(t.env,d,h)||"").toString()};try{const d=await Ar.runPipeline({llmCall:l,originalText:r,mode:s,format:i,purpose:a==="exam"?"exam":"preview"});return t.json({ok:!0,data:d,meta:{engine:"gens-v3",mode:s,format:i,purpose:a,elapsedMs:Date.now()-e}},200)}catch(d){return console.error("[GENS Engine Error]",d),t.json({ok:!1,error:{code:"GENS_ERROR",message:d.message||"GENS 엔진 오류",details:d.stack}},500)}});J.post("/api/engine",async t=>{var _;const e=Date.now(),n=t.env.DB;await br(n);let r=null;try{r=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=tr(r==null?void 0:r.kind),i=P((r==null?void 0:r.text)||""),a=Ft((r==null?void 0:r.mode)||(r==null?void 0:r.level)),o=Kt((r==null?void 0:r.viewType)||(r==null?void 0:r.displayMode)),c=P(((_=r==null?void 0:r.options)==null?void 0:_.userId)||(r==null?void 0:r.userId)||"anon");if(!i.trim()||i.trim().length<5)return t.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const l=er(i),d=l.text,h=l.sentences;console.log("[Sanitize] Original length:",i.length,"→ Cleaned:",d.length),console.log("[Sanitize] Sentences extracted:",h.length);const x=vr(s,a,o,d,c||null),b=await vt(n,x);if(b.hit)return t.json({ok:!0,data:b.data,meta:{cached:!0,cacheStore:b.store,cacheType:"derived",engine:"cache",elapsedMs:Date.now()-e}},200);const S=xr(s,a,d,c||null),O=await vt(n,S);if(O.hit&&O.data){let f;if(O.data.allSummaries&&O.data.allSummaries[a]?f=O.data.allSummaries[a]:O.data.narrative?f=O.data.narrative:console.warn("[Cache] Base cache has no narrative, skipping"),f){let m;return o==="narrative"?m={kind:s,mode:a,viewType:o,narrative:f}:o==="structured"?m={kind:s,mode:a,...yr(f)}:o==="mindmap"?m={kind:s,mode:a,...wr(f)}:m={kind:s,mode:a,...Er(f)},await Ne(n,x,c||"anon",m),t.json({ok:!0,data:m,meta:{cached:!0,cacheStore:"derived",cacheType:"converted",engine:"local-convert",elapsedMs:Date.now()-e}},200)}}const A=!!P(t.env.GEMINI_API_KEY).trim(),R=P(t.env.USE_MOCK).trim().toLowerCase()==="true";if(s==="summary"&&A&&!R)try{const f=await lr(t.env,d),m=nr(a),g=rr(o);let v;if(g==="structured")v={kind:s,mode:a,viewType:o,...f.structured[m]};else if(g==="mindmap")v={kind:s,mode:a,viewType:o,...f.mindmap[m]};else if(g==="selftest")v={kind:s,mode:a,viewType:o,...f.selftest[m]};else{const N=f.narrative[m];v={kind:s,mode:a,viewType:o,title:N.title,narrative:N.summary,keyPoints:N.keyPoints,examHints:N.examHints}}const y=f.narrative[m],p={kind:s,mode:a,viewType:"narrative",narrative:y.summary,allSummaries:{brief:f.narrative.brief.summary,standard:f.narrative.standard.summary,detail:f.narrative.detail.summary},meta:{engine:"v4",hierarchy:"brief ⊂ standard ⊂ detail (server-downsample)",structuredFirst:!0}};return await Ne(n,S,c||"anon",p),await Ne(n,x,c||"anon",v),t.json({ok:!0,data:v,meta:{cached:!1,engine:"gemini-v4-structured-first",elapsedMs:Date.now()-e,hierarchy:"brief ⊂ standard ⊂ detail (guaranteed)"}},200)}catch(f){console.error("[Gemini V4 Error]",f)}const I=tt(d,"brief",o),H=tt(d,"standard",o),z=tt(d,"detail",o),T=a==="brief"?I:a==="standard"?H:z;if(await Ne(n,x,c||"anon",T),I.narrative&&H.narrative&&z.narrative){const f={kind:"summary",mode:a,viewType:"narrative",narrative:T.narrative,allSummaries:{brief:I.narrative,standard:H.narrative,detail:z.narrative}};await Ne(n,S,c||"anon",f)}return t.json({ok:!0,data:T,meta:{cached:!1,engine:"local",elapsedMs:Date.now()-e}},200)});J.get("/health",t=>t.json({ok:!0,service:"MindStory v2 Revised"}));J.notFound(t=>t.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const bt=new qt,Or=Object.assign({"/src/index.tsx":J});let Yt=!1;for(const[,t]of Object.entries(Or))t&&(bt.route("/",t),bt.notFound(t.notFoundHandler),Yt=!0);if(!Yt)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{bt as default};
