var Qt=Object.defineProperty;var st=t=>{throw TypeError(t)};var Zt=(t,e,r)=>e in t?Qt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var E=(t,e,r)=>Zt(t,typeof e!="symbol"?e+"":e,r),We=(t,e,r)=>e.has(t)||st("Cannot "+r);var d=(t,e,r)=>(We(t,e,"read from private field"),r?r.call(t):e.get(t)),_=(t,e,r)=>e.has(t)?st("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),S=(t,e,r,n)=>(We(t,e,"write to private field"),n?n.call(t,r):e.set(t,r),r),R=(t,e,r)=>(We(t,e,"access private method"),r);var it=(t,e,r,n)=>({set _(s){S(t,e,s,r)},get _(){return d(t,e,n)}});var at=(t,e,r)=>(n,s)=>{let i=-1;return a(0);async function a(o){if(o<=i)throw new Error("next() called multiple times");i=o;let c,l=!1,u;if(t[o]?(u=t[o][0][0],n.req.routeIndex=o):u=o===t.length&&s||void 0,u)try{c=await u(n,()=>a(o+1))}catch(h){if(h instanceof Error&&e)n.error=h,c=await e(h,n),l=!0;else throw h}else n.finalized===!1&&r&&(c=await r(n));return c&&(n.finalized===!1||l)&&(n.res=c),n}},er=Symbol(),tr=async(t,e=Object.create(null))=>{const{all:r=!1,dot:n=!1}=e,i=(t instanceof Ct?t.raw.headers:t.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?rr(t,{all:r,dot:n}):{}};async function rr(t,e){const r=await t.formData();return r?nr(r,e):{}}function nr(t,e){const r=Object.create(null);return t.forEach((n,s)=>{e.all||s.endsWith("[]")?sr(r,s,n):r[s]=n}),e.dot&&Object.entries(r).forEach(([n,s])=>{n.includes(".")&&(ir(r,n,s),delete r[n])}),r}var sr=(t,e,r)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(r):t[e]=[t[e],r]:e.endsWith("[]")?t[e]=[r]:t[e]=r},ir=(t,e,r)=>{let n=t;const s=e.split(".");s.forEach((i,a)=>{a===s.length-1?n[i]=r:((!n[i]||typeof n[i]!="object"||Array.isArray(n[i])||n[i]instanceof File)&&(n[i]=Object.create(null)),n=n[i])})},At=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},ar=t=>{const{groups:e,path:r}=or(t),n=At(r);return cr(n,e)},or=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(r,n)=>{const s=`@${n}`;return e.push([s,r]),s}),{groups:e,path:t}},cr=(t,e)=>{for(let r=e.length-1;r>=0;r--){const[n]=e[r];for(let s=t.length-1;s>=0;s--)if(t[s].includes(n)){t[s]=t[s].replace(n,e[r][1]);break}}return t},Le={},lr=(t,e)=>{if(t==="*")return"*";const r=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const n=`${t}#${e}`;return Le[n]||(r[2]?Le[n]=e&&e[0]!==":"&&e[0]!=="*"?[n,r[1],new RegExp(`^${r[2]}(?=/${e})`)]:[t,r[1],new RegExp(`^${r[2]}$`)]:Le[n]=[t,r[1],!0]),Le[n]}return null},rt=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return e(r)}catch{return r}})}},dr=t=>rt(t,decodeURI),Ot=t=>{const e=t.url,r=e.indexOf("/",e.indexOf(":")+4);let n=r;for(;n<e.length;n++){const s=e.charCodeAt(n);if(s===37){const i=e.indexOf("?",n),a=e.slice(r,i===-1?void 0:i);return dr(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(s===63)break}return e.slice(r,n)},ur=t=>{const e=Ot(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},ge=(t,e,...r)=>(r.length&&(e=ge(e,...r)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),_t=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),r=[];let n="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))n+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){r.length===0&&n===""?r.push("/"):r.push(n);const i=s.replace("?","");n+="/"+i,r.push(n)}else n+="/"+s}),r.filter((s,i,a)=>a.indexOf(s)===i)},Qe=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?rt(t,Nt):t):t,Tt=(t,e,r)=>{let n;if(!r&&e&&!/[%+]/.test(e)){let a=t.indexOf("?",8);if(a===-1)return;for(t.startsWith(e,a+1)||(a=t.indexOf(`&${e}`,a+1));a!==-1;){const o=t.charCodeAt(a+e.length+1);if(o===61){const c=a+e.length+2,l=t.indexOf("&",c);return Qe(t.slice(c,l===-1?void 0:l))}else if(o==38||isNaN(o))return"";a=t.indexOf(`&${e}`,a+1)}if(n=/[%+]/.test(t),!n)return}const s={};n??(n=/[%+]/.test(t));let i=t.indexOf("?",8);for(;i!==-1;){const a=t.indexOf("&",i+1);let o=t.indexOf("=",i);o>a&&a!==-1&&(o=-1);let c=t.slice(i+1,o===-1?a===-1?void 0:a:o);if(n&&(c=Qe(c)),i=a,c==="")continue;let l;o===-1?l="":(l=t.slice(o+1,a===-1?void 0:a),n&&(l=Qe(l))),r?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(l)):s[c]??(s[c]=l)}return e?s[e]:s},hr=Tt,pr=(t,e)=>Tt(t,e,!0),Nt=decodeURIComponent,ot=t=>rt(t,Nt),we,K,ee,Rt,kt,tt,te,bt,Ct=(bt=class{constructor(t,e="/",r=[[]]){_(this,ee);E(this,"raw");_(this,we);_(this,K);E(this,"routeIndex",0);E(this,"path");E(this,"bodyCache",{});_(this,te,t=>{const{bodyCache:e,raw:r}=this,n=e[t];if(n)return n;const s=Object.keys(e)[0];return s?e[s].then(i=>(s==="json"&&(i=JSON.stringify(i)),new Response(i)[t]())):e[t]=r[t]()});this.raw=t,this.path=e,S(this,K,r),S(this,we,{})}param(t){return t?R(this,ee,Rt).call(this,t):R(this,ee,kt).call(this)}query(t){return hr(this.url,t)}queries(t){return pr(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((r,n)=>{e[n]=r}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await tr(this,t))}json(){return d(this,te).call(this,"text").then(t=>JSON.parse(t))}text(){return d(this,te).call(this,"text")}arrayBuffer(){return d(this,te).call(this,"arrayBuffer")}blob(){return d(this,te).call(this,"blob")}formData(){return d(this,te).call(this,"formData")}addValidatedData(t,e){d(this,we)[t]=e}valid(t){return d(this,we)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[er](){return d(this,K)}get matchedRoutes(){return d(this,K)[0].map(([[,t]])=>t)}get routePath(){return d(this,K)[0].map(([[,t]])=>t)[this.routeIndex].path}},we=new WeakMap,K=new WeakMap,ee=new WeakSet,Rt=function(t){const e=d(this,K)[0][this.routeIndex][1][t],r=R(this,ee,tt).call(this,e);return r&&/\%/.test(r)?ot(r):r},kt=function(){const t={},e=Object.keys(d(this,K)[0][this.routeIndex][1]);for(const r of e){const n=R(this,ee,tt).call(this,d(this,K)[0][this.routeIndex][1][r]);n!==void 0&&(t[r]=/\%/.test(n)?ot(n):n)}return t},tt=function(t){return d(this,K)[1]?d(this,K)[1][t]:t},te=new WeakMap,bt),fr={Stringify:1},jt=async(t,e,r,n,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const i=t.callbacks;return i!=null&&i.length?(s?s[0]+=t:s=[t],Promise.all(i.map(o=>o({phase:e,buffer:s,context:n}))).then(o=>Promise.all(o.filter(Boolean).map(c=>jt(c,e,!1,n,s))).then(()=>s[0]))):Promise.resolve(t)},mr="text/plain; charset=UTF-8",Ze=(t,e)=>({"Content-Type":t,...e}),ke,je,X,ve,W,q,Me,ye,Se,le,Ie,$e,re,xe,wt,gr=(wt=class{constructor(t,e){_(this,re);_(this,ke);_(this,je);E(this,"env",{});_(this,X);E(this,"finalized",!1);E(this,"error");_(this,ve);_(this,W);_(this,q);_(this,Me);_(this,ye);_(this,Se);_(this,le);_(this,Ie);_(this,$e);E(this,"render",(...t)=>(d(this,ye)??S(this,ye,e=>this.html(e)),d(this,ye).call(this,...t)));E(this,"setLayout",t=>S(this,Me,t));E(this,"getLayout",()=>d(this,Me));E(this,"setRenderer",t=>{S(this,ye,t)});E(this,"header",(t,e,r)=>{this.finalized&&S(this,q,new Response(d(this,q).body,d(this,q)));const n=d(this,q)?d(this,q).headers:d(this,le)??S(this,le,new Headers);e===void 0?n.delete(t):r!=null&&r.append?n.append(t,e):n.set(t,e)});E(this,"status",t=>{S(this,ve,t)});E(this,"set",(t,e)=>{d(this,X)??S(this,X,new Map),d(this,X).set(t,e)});E(this,"get",t=>d(this,X)?d(this,X).get(t):void 0);E(this,"newResponse",(...t)=>R(this,re,xe).call(this,...t));E(this,"body",(t,e,r)=>R(this,re,xe).call(this,t,e,r));E(this,"text",(t,e,r)=>!d(this,le)&&!d(this,ve)&&!e&&!r&&!this.finalized?new Response(t):R(this,re,xe).call(this,t,e,Ze(mr,r)));E(this,"json",(t,e,r)=>R(this,re,xe).call(this,JSON.stringify(t),e,Ze("application/json",r)));E(this,"html",(t,e,r)=>{const n=s=>R(this,re,xe).call(this,s,e,Ze("text/html; charset=UTF-8",r));return typeof t=="object"?jt(t,fr.Stringify,!1,{}).then(n):n(t)});E(this,"redirect",(t,e)=>{const r=String(t);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,e??302)});E(this,"notFound",()=>(d(this,Se)??S(this,Se,()=>new Response),d(this,Se).call(this,this)));S(this,ke,t),e&&(S(this,W,e.executionCtx),this.env=e.env,S(this,Se,e.notFoundHandler),S(this,$e,e.path),S(this,Ie,e.matchResult))}get req(){return d(this,je)??S(this,je,new Ct(d(this,ke),d(this,$e),d(this,Ie))),d(this,je)}get event(){if(d(this,W)&&"respondWith"in d(this,W))return d(this,W);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,W))return d(this,W);throw Error("This context has no ExecutionContext")}get res(){return d(this,q)||S(this,q,new Response(null,{headers:d(this,le)??S(this,le,new Headers)}))}set res(t){if(d(this,q)&&t){t=new Response(t.body,t);for(const[e,r]of d(this,q).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const n=d(this,q).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of n)t.headers.append("set-cookie",s)}else t.headers.set(e,r)}S(this,q,t),this.finalized=!0}get var(){return d(this,X)?Object.fromEntries(d(this,X)):{}}},ke=new WeakMap,je=new WeakMap,X=new WeakMap,ve=new WeakMap,W=new WeakMap,q=new WeakMap,Me=new WeakMap,ye=new WeakMap,Se=new WeakMap,le=new WeakMap,Ie=new WeakMap,$e=new WeakMap,re=new WeakSet,xe=function(t,e,r){const n=d(this,q)?new Headers(d(this,q).headers):d(this,le)??new Headers;if(typeof e=="object"&&"headers"in e){const i=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[a,o]of i)a.toLowerCase()==="set-cookie"?n.append(a,o):n.set(a,o)}if(r)for(const[i,a]of Object.entries(r))if(typeof a=="string")n.set(i,a);else{n.delete(i);for(const o of a)n.append(i,o)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??d(this,ve);return new Response(t,{status:s,headers:n})},wt),I="ALL",xr="all",br=["get","post","put","delete","options","patch"],Mt="Can not add a route since the matcher is already built.",It=class extends Error{},wr="__COMPOSED_HANDLER",vr=t=>t.text("404 Not Found",404),ct=(t,e)=>{if("getResponse"in t){const r=t.getResponse();return e.newResponse(r.body,r)}return console.error(t),e.text("Internal Server Error",500)},z,$,$t,F,oe,qe,Ge,Ee,yr=(Ee=class{constructor(e={}){_(this,$);E(this,"get");E(this,"post");E(this,"put");E(this,"delete");E(this,"options");E(this,"patch");E(this,"all");E(this,"on");E(this,"use");E(this,"router");E(this,"getPath");E(this,"_basePath","/");_(this,z,"/");E(this,"routes",[]);_(this,F,vr);E(this,"errorHandler",ct);E(this,"onError",e=>(this.errorHandler=e,this));E(this,"notFound",e=>(S(this,F,e),this));E(this,"fetch",(e,...r)=>R(this,$,Ge).call(this,e,r[1],r[0],e.method));E(this,"request",(e,r,n,s)=>e instanceof Request?this.fetch(r?new Request(e,r):e,n,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${ge("/",e)}`,r),n,s)));E(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(R(this,$,Ge).call(this,e.request,e,void 0,e.request.method))})});[...br,xr].forEach(i=>{this[i]=(a,...o)=>(typeof a=="string"?S(this,z,a):R(this,$,oe).call(this,i,d(this,z),a),o.forEach(c=>{R(this,$,oe).call(this,i,d(this,z),c)}),this)}),this.on=(i,a,...o)=>{for(const c of[a].flat()){S(this,z,c);for(const l of[i].flat())o.map(u=>{R(this,$,oe).call(this,l.toUpperCase(),d(this,z),u)})}return this},this.use=(i,...a)=>(typeof i=="string"?S(this,z,i):(S(this,z,"*"),a.unshift(i)),a.forEach(o=>{R(this,$,oe).call(this,I,d(this,z),o)}),this);const{strict:n,...s}=e;Object.assign(this,s),this.getPath=n??!0?e.getPath??Ot:ur}route(e,r){const n=this.basePath(e);return r.routes.map(s=>{var a;let i;r.errorHandler===ct?i=s.handler:(i=async(o,c)=>(await at([],r.errorHandler)(o,()=>s.handler(o,c))).res,i[wr]=s.handler),R(a=n,$,oe).call(a,s.method,s.path,i)}),this}basePath(e){const r=R(this,$,$t).call(this);return r._basePath=ge(this._basePath,e),r}mount(e,r,n){let s,i;n&&(typeof n=="function"?i=n:(i=n.optionHandler,n.replaceRequest===!1?s=c=>c:s=n.replaceRequest));const a=i?c=>{const l=i(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};s||(s=(()=>{const c=ge(this._basePath,e),l=c==="/"?0:c.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(l)||"/",new Request(h,u)}})());const o=async(c,l)=>{const u=await r(s(c.req.raw),...a(c));if(u)return u;await l()};return R(this,$,oe).call(this,I,ge(e,"*"),o),this}},z=new WeakMap,$=new WeakSet,$t=function(){const e=new Ee({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,S(e,F,d(this,F)),e.routes=this.routes,e},F=new WeakMap,oe=function(e,r,n){e=e.toUpperCase(),r=ge(this._basePath,r);const s={basePath:this._basePath,path:r,method:e,handler:n};this.router.add(e,r,[n,s]),this.routes.push(s)},qe=function(e,r){if(e instanceof Error)return this.errorHandler(e,r);throw e},Ge=function(e,r,n,s){if(s==="HEAD")return(async()=>new Response(null,await R(this,$,Ge).call(this,e,r,n,"GET")))();const i=this.getPath(e,{env:n}),a=this.router.match(s,i),o=new gr(e,{path:i,matchResult:a,env:n,executionCtx:r,notFoundHandler:d(this,F)});if(a[0].length===1){let l;try{l=a[0][0][0][0](o,async()=>{o.res=await d(this,F).call(this,o)})}catch(u){return R(this,$,qe).call(this,u,o)}return l instanceof Promise?l.then(u=>u||(o.finalized?o.res:d(this,F).call(this,o))).catch(u=>R(this,$,qe).call(this,u,o)):l??d(this,F).call(this,o)}const c=at(a[0],this.errorHandler,d(this,F));return(async()=>{try{const l=await c(o);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return R(this,$,qe).call(this,l,o)}})()},Ee),Pt=[];function Sr(t,e){const r=this.buildAllMatchers(),n=(s,i)=>{const a=r[s]||r[I],o=a[2][i];if(o)return o;const c=i.match(a[0]);if(!c)return[[],Pt];const l=c.indexOf("",1);return[a[1][l],c]};return this.match=n,n(t,e)}var Fe="[^/]+",Ce=".*",Re="(?:|/.*)",be=Symbol(),Er=new Set(".\\+*[^]$()");function Ar(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===Ce||t===Re?1:e===Ce||e===Re?-1:t===Fe?1:e===Fe?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var de,ue,B,fe,Or=(fe=class{constructor(){_(this,de);_(this,ue);_(this,B,Object.create(null))}insert(e,r,n,s,i){if(e.length===0){if(d(this,de)!==void 0)throw be;if(i)return;S(this,de,r);return}const[a,...o]=e,c=a==="*"?o.length===0?["","",Ce]:["","",Fe]:a==="/*"?["","",Re]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let h=c[2]||Fe;if(u&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw be;if(l=d(this,B)[h],!l){if(Object.keys(d(this,B)).some(m=>m!==Ce&&m!==Re))throw be;if(i)return;l=d(this,B)[h]=new fe,u!==""&&S(l,ue,s.varIndex++)}!i&&u!==""&&n.push([u,d(l,ue)])}else if(l=d(this,B)[a],!l){if(Object.keys(d(this,B)).some(u=>u.length>1&&u!==Ce&&u!==Re))throw be;if(i)return;l=d(this,B)[a]=new fe}l.insert(o,r,n,s,i)}buildRegExpStr(){const r=Object.keys(d(this,B)).sort(Ar).map(n=>{const s=d(this,B)[n];return(typeof d(s,ue)=="number"?`(${n})@${d(s,ue)}`:Er.has(n)?`\\${n}`:n)+s.buildRegExpStr()});return typeof d(this,de)=="number"&&r.unshift(`#${d(this,de)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},de=new WeakMap,ue=new WeakMap,B=new WeakMap,fe),Be,Pe,vt,_r=(vt=class{constructor(){_(this,Be,{varIndex:0});_(this,Pe,new Or)}insert(t,e,r){const n=[],s=[];for(let a=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const l=`@\\${a}`;return s[a]=[l,c],a++,o=!0,l}),!o)break}const i=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=s.length-1;a>=0;a--){const[o]=s[a];for(let c=i.length-1;c>=0;c--)if(i[c].indexOf(o)!==-1){i[c]=i[c].replace(o,s[a][1]);break}}return d(this,Pe).insert(i,e,n,d(this,Be),r),n}buildRegExp(){let t=d(this,Pe).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const r=[],n=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,i,a)=>i!==void 0?(r[++e]=Number(i),"$()"):(a!==void 0&&(n[Number(a)]=++e),"")),[new RegExp(`^${t}`),r,n]}},Be=new WeakMap,Pe=new WeakMap,vt),Tr=[/^$/,[],Object.create(null)],Ue=Object.create(null);function Dt(t){return Ue[t]??(Ue[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Nr(){Ue=Object.create(null)}function Cr(t){var l;const e=new _r,r=[];if(t.length===0)return Tr;const n=t.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[m,w])=>u?1:m?-1:h.length-w.length),s=Object.create(null);for(let u=0,h=-1,m=n.length;u<m;u++){const[w,A,T]=n[u];w?s[A]=[T.map(([j])=>[j,Object.create(null)]),Pt]:h++;let O;try{O=e.insert(A,h,w)}catch(j){throw j===be?new It(A):j}w||(r[h]=T.map(([j,N])=>{const M=Object.create(null);for(N-=1;N>=0;N--){const[U,y]=O[N];M[U]=y}return[j,M]}))}const[i,a,o]=e.buildRegExp();for(let u=0,h=r.length;u<h;u++)for(let m=0,w=r[u].length;m<w;m++){const A=(l=r[u][m])==null?void 0:l[1];if(!A)continue;const T=Object.keys(A);for(let O=0,j=T.length;O<j;O++)A[T[O]]=o[A[T[O]]]}const c=[];for(const u in a)c[u]=r[a[u]];return[i,c,s]}function me(t,e){if(t){for(const r of Object.keys(t).sort((n,s)=>s.length-n.length))if(Dt(r).test(e))return[...t[r]]}}var ne,se,Je,Lt,yt,Rr=(yt=class{constructor(){_(this,Je);E(this,"name","RegExpRouter");_(this,ne);_(this,se);E(this,"match",Sr);S(this,ne,{[I]:Object.create(null)}),S(this,se,{[I]:Object.create(null)})}add(t,e,r){var o;const n=d(this,ne),s=d(this,se);if(!n||!s)throw new Error(Mt);n[t]||[n,s].forEach(c=>{c[t]=Object.create(null),Object.keys(c[I]).forEach(l=>{c[t][l]=[...c[I][l]]})}),e==="/*"&&(e="*");const i=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const c=Dt(e);t===I?Object.keys(n).forEach(l=>{var u;(u=n[l])[e]||(u[e]=me(n[l],e)||me(n[I],e)||[])}):(o=n[t])[e]||(o[e]=me(n[t],e)||me(n[I],e)||[]),Object.keys(n).forEach(l=>{(t===I||t===l)&&Object.keys(n[l]).forEach(u=>{c.test(u)&&n[l][u].push([r,i])})}),Object.keys(s).forEach(l=>{(t===I||t===l)&&Object.keys(s[l]).forEach(u=>c.test(u)&&s[l][u].push([r,i]))});return}const a=_t(e)||[e];for(let c=0,l=a.length;c<l;c++){const u=a[c];Object.keys(s).forEach(h=>{var m;(t===I||t===h)&&((m=s[h])[u]||(m[u]=[...me(n[h],u)||me(n[I],u)||[]]),s[h][u].push([r,i-l+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(d(this,se)).concat(Object.keys(d(this,ne))).forEach(e=>{t[e]||(t[e]=R(this,Je,Lt).call(this,e))}),S(this,ne,S(this,se,void 0)),Nr(),t}},ne=new WeakMap,se=new WeakMap,Je=new WeakSet,Lt=function(t){const e=[];let r=t===I;return[d(this,ne),d(this,se)].forEach(n=>{const s=n[t]?Object.keys(n[t]).map(i=>[i,n[t][i]]):[];s.length!==0?(r||(r=!0),e.push(...s)):t!==I&&e.push(...Object.keys(n[I]).map(i=>[i,n[I][i]]))}),r?Cr(e):null},yt),ie,Q,St,kr=(St=class{constructor(t){E(this,"name","SmartRouter");_(this,ie,[]);_(this,Q,[]);S(this,ie,t.routers)}add(t,e,r){if(!d(this,Q))throw new Error(Mt);d(this,Q).push([t,e,r])}match(t,e){if(!d(this,Q))throw new Error("Fatal error");const r=d(this,ie),n=d(this,Q),s=r.length;let i=0,a;for(;i<s;i++){const o=r[i];try{for(let c=0,l=n.length;c<l;c++)o.add(...n[c]);a=o.match(t,e)}catch(c){if(c instanceof It)continue;throw c}this.match=o.match.bind(o),S(this,ie,[o]),S(this,Q,void 0);break}if(i===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(d(this,Q)||d(this,ie).length!==1)throw new Error("No active router has been determined yet.");return d(this,ie)[0]}},ie=new WeakMap,Q=new WeakMap,St),Te=Object.create(null),ae,H,he,Ae,L,Z,ce,Oe,jr=(Oe=class{constructor(e,r,n){_(this,Z);_(this,ae);_(this,H);_(this,he);_(this,Ae,0);_(this,L,Te);if(S(this,H,n||Object.create(null)),S(this,ae,[]),e&&r){const s=Object.create(null);s[e]={handler:r,possibleKeys:[],score:0},S(this,ae,[s])}S(this,he,[])}insert(e,r,n){S(this,Ae,++it(this,Ae)._);let s=this;const i=ar(r),a=[];for(let o=0,c=i.length;o<c;o++){const l=i[o],u=i[o+1],h=lr(l,u),m=Array.isArray(h)?h[0]:l;if(m in d(s,H)){s=d(s,H)[m],h&&a.push(h[1]);continue}d(s,H)[m]=new Oe,h&&(d(s,he).push(h),a.push(h[1])),s=d(s,H)[m]}return d(s,ae).push({[e]:{handler:n,possibleKeys:a.filter((o,c,l)=>l.indexOf(o)===c),score:d(this,Ae)}}),s}search(e,r){var c;const n=[];S(this,L,Te);let i=[this];const a=At(r),o=[];for(let l=0,u=a.length;l<u;l++){const h=a[l],m=l===u-1,w=[];for(let A=0,T=i.length;A<T;A++){const O=i[A],j=d(O,H)[h];j&&(S(j,L,d(O,L)),m?(d(j,H)["*"]&&n.push(...R(this,Z,ce).call(this,d(j,H)["*"],e,d(O,L))),n.push(...R(this,Z,ce).call(this,j,e,d(O,L)))):w.push(j));for(let N=0,M=d(O,he).length;N<M;N++){const U=d(O,he)[N],y=d(O,L)===Te?{}:{...d(O,L)};if(U==="*"){const v=d(O,H)["*"];v&&(n.push(...R(this,Z,ce).call(this,v,e,d(O,L))),S(v,L,y),w.push(v));continue}const[k,x,g]=U;if(!h&&!(g instanceof RegExp))continue;const f=d(O,H)[k],b=a.slice(l).join("/");if(g instanceof RegExp){const v=g.exec(b);if(v){if(y[x]=v[0],n.push(...R(this,Z,ce).call(this,f,e,d(O,L),y)),Object.keys(d(f,H)).length){S(f,L,y);const p=((c=v[0].match(/\//))==null?void 0:c.length)??0;(o[p]||(o[p]=[])).push(f)}continue}}(g===!0||g.test(h))&&(y[x]=h,m?(n.push(...R(this,Z,ce).call(this,f,e,y,d(O,L))),d(f,H)["*"]&&n.push(...R(this,Z,ce).call(this,d(f,H)["*"],e,y,d(O,L)))):(S(f,L,y),w.push(f)))}}i=w.concat(o.shift()??[])}return n.length>1&&n.sort((l,u)=>l.score-u.score),[n.map(({handler:l,params:u})=>[l,u])]}},ae=new WeakMap,H=new WeakMap,he=new WeakMap,Ae=new WeakMap,L=new WeakMap,Z=new WeakSet,ce=function(e,r,n,s){const i=[];for(let a=0,o=d(e,ae).length;a<o;a++){const c=d(e,ae)[a],l=c[r]||c[I],u={};if(l!==void 0&&(l.params=Object.create(null),i.push(l),n!==Te||s&&s!==Te))for(let h=0,m=l.possibleKeys.length;h<m;h++){const w=l.possibleKeys[h],A=u[l.score];l.params[w]=s!=null&&s[w]&&!A?s[w]:n[w]??(s==null?void 0:s[w]),u[l.score]=!0}}return i},Oe),pe,Et,Mr=(Et=class{constructor(){E(this,"name","TrieRouter");_(this,pe);S(this,pe,new jr)}add(t,e,r){const n=_t(e);if(n){for(let s=0,i=n.length;s<i;s++)d(this,pe).insert(t,n[s],r);return}d(this,pe).insert(t,e,r)}match(t,e){return d(this,pe).search(t,e)}},pe=new WeakMap,Et),Ht=class extends yr{constructor(t={}){super(t),this.router=t.router??new kr({routers:[new Rr,new Mr]})}},Ir=t=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},n=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(r.origin),s=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(r.allowMethods);return async function(a,o){var u;function c(h,m){a.res.headers.set(h,m)}const l=await n(a.req.header("origin")||"",a);if(l&&c("Access-Control-Allow-Origin",l),r.credentials&&c("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),a.req.method==="OPTIONS"){r.origin!=="*"&&c("Vary","Origin"),r.maxAge!=null&&c("Access-Control-Max-Age",r.maxAge.toString());const h=await s(a.req.header("origin")||"",a);h.length&&c("Access-Control-Allow-Methods",h.join(","));let m=r.allowHeaders;if(!(m!=null&&m.length)){const w=a.req.header("Access-Control-Request-Headers");w&&(m=w.split(/\s*,\s*/))}return m!=null&&m.length&&(c("Access-Control-Allow-Headers",m.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await o(),r.origin!=="*"&&a.header("Vary","Origin",{append:!0})}},$r=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,lt=(t,e=Dr)=>{const r=/\.([a-zA-Z0-9]+?)$/,n=t.match(r);if(!n)return;let s=e[n[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},Pr={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Dr=Pr,Lr=(...t)=>{let e=t.filter(s=>s!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=e.split("/"),n=[];for(const s of r)s===".."&&n.length>0&&n.at(-1)!==".."?n.pop():s!=="."&&n.push(s);return n.join("/")||"."},qt={br:".br",zstd:".zst",gzip:".gz"},Hr=Object.keys(qt),qr="index.html",Gr=t=>{const e=t.root??"./",r=t.path,n=t.join??Lr;return async(s,i)=>{var u,h,m,w;if(s.finalized)return i();let a;if(t.path)a=t.path;else try{if(a=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((u=t.onNotFound)==null?void 0:u.call(t,s.req.path,s)),i()}let o=n(e,!r&&t.rewriteRequestPath?t.rewriteRequestPath(a):a);t.isDir&&await t.isDir(o)&&(o=n(o,qr));const c=t.getContent;let l=await c(o,s);if(l instanceof Response)return s.newResponse(l.body,l);if(l){const A=t.mimes&&lt(o,t.mimes)||lt(o);if(s.header("Content-Type",A||"application/octet-stream"),t.precompressed&&(!A||$r.test(A))){const T=new Set((h=s.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(O=>O.trim()));for(const O of Hr){if(!T.has(O))continue;const j=await c(o+qt[O],s);if(j){l=j,s.header("Content-Encoding",O),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=t.onFound)==null?void 0:m.call(t,o,s)),s.body(l)}await((w=t.onNotFound)==null?void 0:w.call(t,o,s)),await i()}},Ur=async(t,e)=>{let r;e&&e.manifest?typeof e.manifest=="string"?r=JSON.parse(e.manifest):r=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let n;e&&e.namespace?n=e.namespace:n=__STATIC_CONTENT;const s=r[t];if(!s)return null;const i=await n.get(s,{type:"stream"});return i||null},Kr=t=>async function(r,n){return Gr({...t,getContent:async i=>Ur(i,{manifest:t.manifest,namespace:t.namespace?t.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,n)},zr=t=>Kr(t);const J=new Ht,Ke=new Map,Fr=1e3*60*60*24*7;let et=!1;function Gt(){return new Date().toISOString()}function D(t){return t==null?"":String(t)}function ze(t,e,r){return Math.max(e,Math.min(r,t))}function Br(t){return(t||"").replace(/\s+/g,"")}function nt(t){return Br(t).length}function Jr(t){return(t||"").replace(/-\s*[ivxIVX]+-\s*/gi,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[p\.\s*\d+\]/gi,"").replace(/p\.\s*\d+/gi,"").replace(/\n+/g," ").replace(/\s{2,}/g," ").trim()}function Ut(t){const e=D(t).trim().toLowerCase();return e?e==="brief"||e==="simple"||e==="short"||e==="lite"?"brief":e==="detail"||e==="detailed"||e==="full"?"detail":"standard":"standard"}function Kt(t){const e=D(t).trim().toLowerCase();return e?e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"||e==="mind_map"?"mindmap":"narrative":"narrative"}function Yr(t){const e=D(t).trim().toLowerCase();return e==="concept"?"concept":e==="exam"?"exam":"summary"}function zt(t){let e=D(t).replace(/\s+/g," ").trim();if(!e)return[];e=e.replace(/[\u201C\u201D\u2033\u00AB\u00BB]/g,'"').replace(/[\u2018\u2019\u2032]/g,"'");const r=[];let n="",s=null,i=0;const a=()=>{const o=n.trim();o&&r.push(o),n=""};for(let o=0;o<e.length;o++){const c=e[o],l=e[o+1]||"",u=e[o+2]||"";if(c==="("&&i++,c===")"&&(i=Math.max(0,i-1)),(c==='"'||c==="'")&&s===null?s=c:s&&c===s&&(s=null),n+=c,s===null&&i===0&&/[.!?]/.test(c)){l===" "&&(a(),o++);continue}if(s===null&&i===0&&l===" "){const m=n.trimEnd().slice(-1),w=/[가-힣A-Za-z0-9"'(\[]/.test(u);(m==="다"||m==="요"||m==="죠")&&w&&(a(),o++)}}return a(),r.length?r:[e]}const Ye={narrative:{brief:4,standard:6,detail:9},structured:{brief:3,standard:5,detail:8},mindmap:{brief:4,standard:6,detail:10},selftest:{brief:3,standard:5,detail:8}};function Vr(t){const e=String(t||"").trim().toLowerCase();return e==="brief"||e==="standard"||e==="detail"?e:e==="simple"?"brief":"standard"}function Xr(t){const e=String(t||"").trim().toLowerCase();return e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"?"mindmap":"narrative"}function Wr(t){const e=String(t||"").trim(),r=e.indexOf("{"),n=e.lastIndexOf("}");return r>=0&&n>r?e.slice(r,n+1):e}function dt(t){const e=Wr(t);try{return JSON.parse(e)}catch{}const r=e.replace(/,\s*}/g,"}").replace(/,\s*]/g,"]").replace(/\u0000/g,"");try{return JSON.parse(r)}catch{}return null}function Qr(t){return["당신은 초·중·고 학생의 '학습 단위' 기준으로 내용을 구조화하는 전문가입니다.","절대 규칙:","- 원문에 없는 내용 생성 금지(추측/과장 금지)","- 문자 단순 자르기 금지, 의미 단위로 재구성","- 반드시 JSON만 출력(설명문/머리말/꼬리말/코드블록 금지)","","구조화의 뼈대(반드시 포함):","- anchor: 핵심 주장 1문장","- sections: 학습 단위 조목화, 각 section은 keywords/lvl25/explain 포함","- glossary: term/def로 구성","- links: anchor(A0) -> section 연결","","출력 스키마:","{",'  "anchor": "핵심 주장 1문장",','  "hierarchy": { "big": "대단원", "mid": "중단원", "small": "소단원", "subtitles": ["소제목"] },','  "sections": [','    { "id": "S1", "title": "섹션 제목", "keywords": ["핵심어"], "lvl25": ["의미키워드"], "explain": "1~3문장 설명" }',"  ],",'  "glossary": [ { "term": "용어", "def": "정의" } ],','  "links": [ { "from": "A0", "to": "S1", "rel": "covers" } ]',"}","",`원문(공백제외 ${nt(t)}자):`,t].join(`
`)}function Zr(t,e){const r=nt(t),n=(e==null?void 0:e.anchor)||"",s=((e==null?void 0:e.sections)||[]).map(i=>i.title).slice(0,10);return["당신은 초·중·고 학생의 시험/이해/기억을 위한 서술형 요약 전문가입니다.","절대 규칙:","- 원문에 없는 내용 생성 금지","- 반드시 JSON만 출력(설명문/코드블록 금지)",'- 아래 "구조화 뼈대"를 벗어나지 말고, 그 내용을 자연스러운 문장으로 연결해 서술하세요.',"","구조화 뼈대:",`- anchor: ${n}`,`- sections: ${JSON.stringify(s)}`,"","요구:","- summary는 6~10문장(상세)","- keyPoints 4~7개, examHints 2~4개","","출력 스키마:","{",'  "title": "요약 제목",','  "summary": "자연스러운 문장 요약(6~10문장)",','  "keyPoints": ["핵심포인트"],','  "examHints": ["시험포인트"]',"}","",`원문(공백제외 ${r}자):`,t].join(`
`)}function en(t){const e=(t==null?void 0:t.anchor)||"",r=((t==null?void 0:t.sections)||[]).map(s=>({id:s.id,title:s.title,keywords:s.keywords.slice(0,5)})),n=((t==null?void 0:t.glossary)||[]).slice(0,20);return["당신은 학습용 마인드맵 JSON을 만드는 전문가입니다.","절대 규칙:","- 반드시 JSON만 출력","- 노드 id 중복/누락 금지, edge 참조 일관","- 아래 구조화 정보를 그대로 바탕으로 구성(새 내용 생성 금지)","","구조화 입력:",`anchor: ${e}`,`sections: ${JSON.stringify(r)}`,`glossary: ${JSON.stringify(n)}`,"","출력 스키마:","{",'  "center": { "id": "C0", "label": "중심 주제", "type": "root", "note": "짧은 설명" },','  "nodes": [','    { "id": "S1", "label": "섹션", "type": "section", "note": "설명" },','    { "id": "T1", "label": "용어", "type": "term", "note": "정의" }',"  ],",'  "edges": [ { "from": "C0", "to": "S1", "rel": "has" } ]',"}"].join(`
`)}function tn(t){const e=(t==null?void 0:t.anchor)||"",r=((t==null?void 0:t.sections)||[]).map(s=>({id:s.id,title:s.title,keywords:s.keywords.slice(0,6)})),n=((t==null?void 0:t.glossary)||[]).slice(0,25);return["당신은 초·중·고 학생용 셀프테스트를 만드는 전문가입니다.","절대 규칙:","- 반드시 JSON만 출력","- 원문/구조화에 없는 내용 금지","- 문항 id는 q1, q2... 고유","","구조화 입력:",`anchor: ${e}`,`sections: ${JSON.stringify(r)}`,`glossary: ${JSON.stringify(n)}`,"","요구(상세):","- 총 8문항","- type은 reorder/blank/multiple_choice 섞기","","출력 스키마:","{",'  "questions": [','    { "id": "q1", "type": "multiple_choice", "prompt": "질문", "choices": ["a","b","c"], "answer": 1 },','    { "id": "q2", "type": "blank", "prompt": "빈칸", "answer": "정답" },','    { "id": "q3", "type": "reorder", "prompt": "순서", "choices": ["A","B","C"], "answer": [0,2,1] }',"  ]","}"].join(`
`)}function ut(t,e){const r=Ye.structured[e],n=(t.sections||[]).slice(0,r).map(c=>({...c,keywords:(c.keywords||[]).slice(0,e==="brief"?4:6),lvl25:(c.lvl25||[]).slice(0,e==="brief"?2:3),explain:String(c.explain||"").trim()})),s=e==="brief"?8:e==="standard"?14:20,i=(t.glossary||[]).slice(0,s),a=new Set(n.map(c=>c.id)),o=(t.links||[]).filter(c=>c.from==="A0"&&a.has(c.to));return{...t,sections:n,glossary:i,links:o}}function ht(t,e){const r=Ye.mindmap[e],n=(t.nodes||[]).slice(0,Math.max(0,r-1)),s=new Set(["C0",...n.map(a=>a.id)]),i=(t.edges||[]).filter(a=>s.has(a.from)&&s.has(a.to));return{...t,nodes:n,edges:i}}function pt(t,e){const r=Ye.selftest[e];return{questions:(t.questions||[]).slice(0,r)}}function ft(t,e){const r=Ye.narrative[e],i=zt(t.summary||"").slice(0,r).join(" "),a=(t.keyPoints||[]).slice(0,e==="brief"?3:4),o=(t.examHints||[]).slice(0,e==="brief"?2:3);return{...t,summary:i,keyPoints:a,examHints:o}}async function He(t,e){const r=async()=>{const o=await Bt(t,e);return String(o||"")},n=await r(),s=dt(n);if(s)return s;const i=await r(),a=dt(i);if(a)return a;throw new Error("MODEL_JSON_PARSE_FAILED")}async function rn(t,e){const r=await He(t,Qr(e));if(!(r!=null&&r.anchor)||!Array.isArray(r.sections))throw new Error("STRUCTURED_SCHEMA_INVALID");r.links=r.links||r.sections.map(u=>({from:"A0",to:u.id,rel:"covers"}));const n=await He(t,Zr(e,r));if(!(n!=null&&n.summary))throw new Error("NARRATIVE_SCHEMA_INVALID");const s=await He(t,en(r));if(!(s!=null&&s.center)||!Array.isArray(s.nodes)||!Array.isArray(s.edges))throw new Error("MINDMAP_SCHEMA_INVALID");s.center.id||(s.center.id="C0");const i=await He(t,tn(r));if(!Array.isArray(i.questions))throw new Error("SELFTEST_SCHEMA_INVALID");const a={detail:r,standard:ut(r,"standard"),brief:ut(r,"brief")},o={detail:n,standard:ft(n,"standard"),brief:ft(n,"brief")},c={detail:s,standard:ht(s,"standard"),brief:ht(s,"brief")},l={detail:i,standard:pt(i,"standard"),brief:pt(i,"brief")};return{structured:a,narrative:o,mindmap:c,selftest:l}}function nn(t){if(!t)return"";let e=String(t);return e=e.replace(/([가-힣])\r?\n([가-힣])/g,"$1$2"),e=e.replace(/([A-Za-z])-\r?\n([A-Za-z])/g,"$1$2"),e=e.replace(/\r/g,""),e=e.replace(/\n{2,}/g,`
`),e=e.replace(/\n/g," "),e=e.replace(/[ \t]{2,}/g," "),e=e.replace(/\s+([,.;:!?])/g,"$1"),e.trim()}function sn(t){return(t||[]).filter(e=>{const r=(e||"").trim();return!(!r||r.length<18||!(/[.!?]$/.test(r)||/다\.$/.test(r)||/이다\.$/.test(r)||/하였다\.$/.test(r))&&r.length<45)})}const an=new Set(["그리고","그러나","하지만","또한","및","또","또는","즉","때문에","따라서","그래서","한편","이것","그것","저것","에서","으로","에게","부터","까지","보다","처럼","같이","의","가","이","은","는","을","를","과","와","도","만","하다","된다","있다","없다","이다","아니다","수","등","및","것","들","좀","매우","정말"]);function mt(t){return(t||"").toLowerCase().replace(/[^0-9a-z가-힣\s]/g," ").split(/\s+/).map(e=>e.trim()).map(e=>e.replace(/에게$/g,"").replace(/에서$/g,"").replace(/으로$/g,"").replace(/를$/g,"").replace(/을$/g,"").replace(/의$/g,"").replace(/하는$/g,"하").replace(/하$/g,"하")).filter(e=>e.length>=2&&!an.has(e))}function on(t){const e=new Map;for(const n of t)for(const s of mt(n))e.set(s,(e.get(s)||0)+1);return t.map((n,s)=>{const i=mt(n);let a=0;for(const l of i)a+=e.get(l)||0;const o=n.length,c=o<15?.7:o>180?.85:1;return{idx:s,s:n,score:a*c}})}function cn(t,e){return on(t).slice().sort((s,i)=>i.score-s.score).slice(0,ze(e,1,Math.max(1,t.length))).sort((s,i)=>s.idx-i.idx).map(s=>s.s)}function ln(t){let e=(t||"").trim();e=e.replace(/모\s+든/g,"모든"),e=e.replace(/기\s+회/g,"기회"),e=e.replace(/이\s+루어지는/g,"이루어지는"),e=e.replace(/루어지는/g,"이루어지는"),e=e.replace(/생태계물/g,"자연물"),e=e.replace(/놀은\s+는/g,"놀이는"),e=e.replace(/형성은\s+는/g,"형성은"),e=e.replace(/특정\s+공간\s+인/g,"특정 공간인"),e=e.replace(/(\S+)\s+\1/g,"$1"),e=e.replace(/([가-힣])을\b/g,(i,a)=>{const o=a.charCodeAt(0);return o>=44032&&o<=55203?(o-44032)%28!==0?a+"을":a+"를":i});const r=e.split(new RegExp("(?<=다\\.)\\s+")),n=new Set,s=[];for(const i of r){const a=i.match(/^([^은는]+[은는])\s+(.+)/);if(a){const o=a[1];if(n.has(o))continue;n.add(o)}s.push(i)}return e=s.join(" "),e=e.replace(/입니다\.\s*이는\s+/g,"이다. "),e=e.replace(/입니다\.\s*또한\s+/g,"이다. 또한 "),e=e.replace(/입니다\.\s*즉\s+/g,"이다. 즉 "),e=e.replace(/\s*\.\s*/g,". "),e=e.replace(/\s*,\s*/g,", "),e=e.replace(/\s*;\s*/g,"; "),e=e.replace(/[ ]{2,}/g," "),e=e.replace(/\n{3,}/g,`

`),e.trim()}function dn(t,e,r){if(!Array.isArray(t)||t.length===0)return{summary:"요약할 내용이 부족합니다.",mindmap:{keywords:[],nodes:[],edges:[]},meta:{ratio:0,target:{min:0,max:0}}};const n=Math.max(1,Number(r)||1),s=e==="brief"?{min:10,max:15}:e==="detail"?{min:45,max:55}:{min:25,max:30},i=["또한","아울러","더불어"],a=["한편","이와 함께","이와 더불어","또 다른 측면에서"],o=y=>{const k=String(y||"").trim().slice(0,24);if(/^(또한|아울러|더불어|한편|이와\s|그리고|그러나|하지만)\b/.test(k))return null;const x=k.match(/^(.{1,20}?(은|는|이|가))\s+/);return x?x[1]:null},c=y=>{const k=String(y||"").trim();return k&&(/[.!?…]$/.test(k)?k:k+".")},l=y=>{let k=String(y||"").trim(),x="";const g=k.match(/([.!?…])$/);return g&&(x=g[1],k=k.slice(0,-1).trim()),k=k.replace(/합니다$/,"한다").replace(/되었습니다$/,"되었다").replace(/입니다$/,"이다").replace(/습니다$/,"다"),(k+(x||".")).trim()},u=y=>/^(그러므로|따라서|하지만|그러나|또한|더불어|한편|이와|나아가|아울러|즉|특히)\s/.test(y.trim()),h=y=>y.replace(/^(또한|더불어|한편|이와|나아가|아울러)\s+/,"").trim();let m=t.map((y,k)=>{const x=String(y||"").trim();if(!x)return"";if(k===0){const p=h(x);return l(c(p))}if(u(x))return l(c(x));const g=String(t[k-1]||"").trim(),f=o(g),b=o(x),v=p=>p[k%p.length];if(b&&f&&b===f){const p=x.replace(/^(.{1,40}?(은|는|이|가))\s+/,"");return l(c(`${v(i)} ${p}`.trim()))}else return x.length>15?l(c(`${v(a)} ${x}`.trim())):l(c(x))}).filter(Boolean);const w=y=>String(y||"").replace(/\s+/g,"").length;let A=m.join(" ");A=A.replace(/\s*(또한|더불어|한편|이와|나아가|아울러)\s+(또한|더불어|한편|이와|나아가|아울러)\s+/g," $2 ").replace(/\s{2,}/g," ").trim();let T=w(A)/n*100;for(;T>s.max&&m.length>1;)m.pop(),A=m.join(" "),T=w(A)/n*100;T<s.min&&console.warn(`[젠스] 요약율 ${T.toFixed(1)}%가 목표 최소치 ${s.min}% 미만입니다.`);const j=m.join(" ").replace(/[0-9]/g," ").replace(/[^\uAC00-\uD7A3a-zA-Z\s]/g," ").split(/\s+/).map(y=>y.trim()).filter(y=>y.length>=2&&y.length<=6),N=new Map;for(const y of j)N.set(y,(N.get(y)||0)+1);const M=[...N.entries()].sort((y,k)=>k[1]-y[1]).slice(0,12).map(([y])=>y),U={keywords:M,nodes:M.map((y,k)=>({id:`k${k}`,label:y})),edges:[]};return{summary:A,mindmap:U,meta:{ratio:T,target:s}}}function un(t,e,r){const n=nn(t);let s=zt(n);s=sn(s);const i=e==="brief"?ze(Math.round(s.length*.15),2,4):e==="standard"?ze(Math.round(s.length*.3),5,9):ze(Math.round(s.length*.55),10,18);let a=cn(s,i);if(e==="detail"){const l=["성별","학년","남학생","여학생","초등","중학","고학년","저학년","변인","차이","비교"],u=s.filter(h=>l.some(m=>h.includes(m))&&!a.includes(h)).slice(0,5);u.length>0&&(a=[...a,...u])}const o=nt(n);if(r==="narrative"){let l,u=null,h=null;{const m=dn(a,e,o);l=m.summary,u=m.mindmap,h=m.meta}return l=ln(l),{kind:"summary",mode:e,viewType:r,narrative:l,...u&&{mindmapKeywords:u},...h&&{meta:{...h,inputNormalized:!0,originalLen:o}}}}if(r==="structured")return{kind:"summary",mode:e,viewType:r,structured:{title:"구조화 요약",bullets:a.map((l,u)=>`- (${u+1}) ${l}`)}};if(r==="mindmap"){const l=(a[0]||s[0]||"핵심").slice(0,40),u=[{id:"c",label:l,level:0}],h=[];return a.slice(1).forEach((m,w)=>{const A=`n${w+1}`;u.push({id:A,label:m.slice(0,60),level:1}),h.push({from:"c",to:A})}),{kind:"summary",mode:e,viewType:r,mindmap:{center:l,nodes:u,edges:h}}}const c=a.map((l,u)=>({id:`q${u+1}`,type:"short",question:`(${u+1}) 다음 내용을 한 문장으로 설명해보세요: "${l.slice(0,70)}"`,answerHint:l}));return{kind:"summary",mode:e,viewType:r,selftest:{title:"셀프테스트",questions:c}}}function Ft(t){if(!t)return"empty";let e=2166136261,r=0;for(let i=0;i<t.length;i++){const a=t.charCodeAt(i);e^=a,e+=(e<<1)+(e<<4)+(e<<7)+(e<<8)+(e<<24),r=(r<<5)-r+a,r|=0}const n=(e>>>0).toString(16),s=(Math.abs(r)>>>0).toString(16);return`${t.length.toString(16)}_${n}_${s}`}function hn(t,e,r,n){const s=Ft(r);return`${t}::${n||"anon"}::${e}::base::${s}`}function pn(t,e,r,n,s){const i=Ft(n);return`${t}::${s||"anon"}::${e}::${r}::${i}`}async function fn(t){if(!et){if(!t){et=!0;return}await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),et=!0}}async function gt(t,e){const r=Date.now(),n=Ke.get(e);if(n&&r-n.createdAt<Fr)return{hit:!0,data:n.data,store:"mem"};if(n&&Ke.delete(e),!t)return{hit:!1};const s=await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();if(!(s!=null&&s.response_json))return{hit:!1};try{const i=JSON.parse(s.response_json);return Ke.set(e,{data:i,createdAt:r}),{hit:!0,data:i,store:"d1"}}catch{return{hit:!1}}}async function Ne(t,e,r,n){const s=Date.now();Ke.set(e,{data:n,createdAt:s}),t&&await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e,r,JSON.stringify(n),Gt()).run()}function mn(t){const e=t.split(/\n\n+/).filter(n=>n.trim());return{kind:"summary",viewType:"structured",structured:{title:"구조화 요약",bullets:e.length>1?e.map((n,s)=>`- (${s+1}) ${n}`):t.split(/[\.。]\s+/).filter(n=>n.trim()).map((n,s)=>`- (${s+1}) ${n}.`)}}}function gn(t){const e=t.split(/[\.。]\s+/).filter(i=>i.trim()).map(i=>i.trim()),r=(e[0]||"핵심").slice(0,40),n=[{id:"c",label:r,level:0}],s=[];return e.slice(1).forEach((i,a)=>{const o=`n${a+1}`;n.push({id:o,label:i.slice(0,60),level:1}),s.push({from:"c",to:o})}),{kind:"summary",viewType:"mindmap",mindmap:{center:r,nodes:n,edges:s}}}function xn(t){return{kind:"summary",viewType:"selftest",selftest:{title:"셀프테스트",questions:t.split(/[\.。]\s+/).filter(n=>n.trim()).map(n=>n.trim()).map((n,s)=>({id:`q${s+1}`,type:"short",question:`(${s+1}) 다음 내용을 한 문장으로 설명해보세요: "${n.slice(0,70)}"`,answerHint:n}))}}}async function bn(t,e){var c,l,u,h,m;const r=D(t.GEMINI_API_KEY).trim();if(!r)throw new Error("GEMINI_API_KEY is missing");const n=D(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",s=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`,i={contents:[{role:"user",parts:[{text:e}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let a=0,o=500;for(;a<3;){a++;const w=await fetch(s,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(i)});if(w.ok){const T=await w.json();return{ok:!0,text:((m=(h=(u=(l=(c=T==null?void 0:T.candidates)==null?void 0:c[0])==null?void 0:l.content)==null?void 0:u.parts)==null?void 0:h[0])==null?void 0:m.text)??"",raw:T}}if(w.status===429||w.status===503){await new Promise(T=>setTimeout(T,o)),o*=2;continue}const A=await w.text().catch(()=>"");throw new Error(`Gemini error ${w.status}: ${A.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function wn(t,e,r){var l,u,h,m,w;const n=D(t.GEMINI_API_KEY).trim();if(!n)throw new Error("GEMINI_API_KEY is missing");const s=D(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",i=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(n)}`,a={system_instruction:{parts:[{text:e}]},contents:[{role:"user",parts:[{text:r}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let o=0,c=500;for(;o<3;){o++;const A=await fetch(i,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(a)});if(A.ok){const O=await A.json();return((w=(m=(h=(u=(l=O==null?void 0:O.candidates)==null?void 0:l[0])==null?void 0:u.content)==null?void 0:h.parts)==null?void 0:m[0])==null?void 0:w.text)??""}if(A.status===429||A.status===503){await new Promise(O=>setTimeout(O,c)),c*=2;continue}const T=await A.text().catch(()=>"");throw new Error(`Gemini error ${A.status}: ${T.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function Bt(t,e){const r=await bn(t,e);return typeof r=="string"?r:((r==null?void 0:r.text)??"").toString()}const vn=(()=>{const e={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}},r={brief:6,standard:10,detail:14},n=["narrative","structured","mindmap"],s=["preview","exam"];function i(x){return(x||"").replace(/\s+/g,"")}function a(x,g){const b=Math.max(200,i(x||"").length),v=e[g]||e.standard,p=Math.floor(b*v.min),C=Math.ceil(b*v.max);return{base:b,min:Math.max(80,p),max:Math.max(120,C)}}function o(x){const g=(x||"").trim();return g?g.replace(/\r/g,"").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map(b=>b.trim()).filter(Boolean):[]}function c(x){return o(x).map((f,b)=>({sid:`S${b+1}`,text:f}))}function l(x,g,f){const b=x.find(v=>v.sid===g);return!b||!f||typeof f!="string"?!1:b.text.includes(f.trim())}function u(){return["당신은 교육공학 기반 요약·셀프테스트 생성 엔진이다.","추출형 복붙 금지. 반드시 의미 단위로 재구성하라.","가장 중요한 1순위는 문자수(공백 제외) 제한 준수다.","허위 정보(원문/요약에 없는 내용) 생성 금지.","JSON 출력이 요구되면 JSON만 출력하라."].join(`
`)}function h({originalText:x,mode:g,format:f}){const b=a(x,g),v=Jr(x),p=f==="narrative"?"서술형: 연결어를 사용해 흐름/인과가 보이도록 1~3문단으로 구성":f==="structured"?"구조화: 상위-하위 위계가 드러나는 조목(가/나/다 또는 ①②③) 형태":"마인드맵: 텍스트로 표현된 노드-관계 목록(중심노드/하위노드/연결라벨) 형태";return["[TASK] 아래 학술 논문을 생성적 요약(Abstractive Summarization) 방식으로 지정된 형식에 맞춰 요약하라.",`- 모드: ${g} (간단/표준/상세)`,`- 형식: ${f} (${p})`,`- 문자수 목표(공백 제외): 최소 ${b.min}자 ~ 최대 ${b.max}자`,"","[🔹 C. 논문형 텍스트 전용 요약 구조 - 반드시 준수]","이 텍스트는 학술 논문입니다.","요약 시 반드시 다음 순서를 유지하세요:","1. 연구 목적 (무엇을 연구했는가?)","2. 연구 설계 및 방법 (어떻게 연구했는가?)","3. 핵심 결과 (무엇을 발견했는가?)","4. 결과 해석 (결과가 의미하는 바는?)","5. 교육적 의의 (실무/교육에 어떤 시사점을 주는가?)","각 단계는 1문단 이상을 넘지 마세요.","","[요약 품질 규칙]","1. 단순 추출/복붙 금지: 원문 문장을 그대로 나열하지 말고 생성적으로 재구성하여 매끄러운 글 작성","2. 텍스트 정제: 페이지 번호(p.XX), 각주, 특수기호, 질문형 문장 제거 → 학술적 평서문으로 전환","3. 스마트 편집: 중복 표현 통합, 전문 용어 일관성 유지, 한 문장 2줄 이내로 단문 위주","4. 퀴즈 연동: 핵심 키워드와 인과관계를 문장 내에 전략적으로 배치 (퀴즈 앵커 확보)","5. 할루시네이션 금지: 원문에 없는 주장/사례/인과/수치 추가 절대 금지","6. 🔹 B. 결과 단독 발췌 금지: 간단 모드에서는 DLPFC, VLPFC, OFC 등 세부 뇌 영역 명칭 사용 금지","","[비율 엄수]","- 간단 10~15%, 표준 25~30%, 상세 45~55% 글자수 비율은 절대적 기준","- 상세 요약이 표준보다 짧아지는 역전 현상 금지","- 각 단계마다 정보의 깊이와 양을 계층적으로 명확히 차별화","","[ORIGINAL]",v].join(`
`)}function m({summaryText:x,format:g}){return["[TASK] 아래 요약문에서 학습 앵커(핵심 개념/관계)를 추출하라.","- 출력은 JSON만. 한국어로.","- 앵커 수: 6~14개 범위(요약 길이에 맞춰 적절히).","- 각 앵커는 요약문에 실제로 등장하는 표현을 근거(quote)로 가져와야 한다.","- quote는 요약문 일부를 그대로 복사(짧게 8~25자).","","[OUTPUT JSON SCHEMA]",`{
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
}`,"","[SUMMARY]",x].join(`
`)}function w({mode:x,purpose:g,format:f,summaryText:b,sentTable:v,anchors:p}){const C=r[x]||10,G=g==="preview"?"예습용 셀프테스트: 요약문 안에서 바로 확인 가능한 재인 중심(스키마 형성). 과도한 추론 금지.":"시험대비 셀프테스트: 요약문에 있는 근거를 바탕으로 인과/관계/분류를 인출하는 회상 중심. 요약에 없는 정보 금지.",Y=f==="narrative"?"문항 스타일: 문장 빈칸, 문장 순서 배열, 인과관계 단답/서술(요약 근거 필수)":f==="structured"?"문항 스타일: 항목-정의 매칭, 분류 채우기, 상하위 체계, 사례-범주 매칭(요약 근거 필수)":"문항 스타일: 노드 라벨 맞추기, 연결 라벨링, 누락 노드/연결 복원, 관계 이유 단답(요약 근거 필수)";return["[TASK] 아래 요약문과 앵커만을 근거로 셀프테스트 문항을 생성하라.",`- 모드: ${x} (문항수 ${C})`,`- 목적: ${g} (${G})`,`- 요약 형식: ${f} (${Y})`,"- 규칙1: 요약문에 없는 정보로 문제 만들지 말 것(할루시네이션 금지).","- 규칙2: 각 문항은 반드시 evidence를 포함: sid + quote(요약 문장 일부 8~25자).","- 규칙3: quote는 반드시 해당 sid 문장에 실제로 포함되어야 한다.","- 규칙4: 정답/해설은 간결하게. 해설은 evidence와 연결되게.","","[OUTPUT JSON ONLY]",`{
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
}`,"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(v,null,2),"","[ANCHORS]",JSON.stringify(p,null,2),"","[SUMMARY]",b].join(`
`)}function A(x,g){const f=g&&g.anchors?g.anchors:[],b=[],v=[];for(const p of f){const C=p==null?void 0:p.sid,G=p==null?void 0:p.quote;if(typeof(p==null?void 0:p.label)!="string"||!p.label.trim()){v.push({a:p,reason:"label missing"});continue}if(!l(x,C,G)){v.push({a:p,reason:"evidence not in sentence"});continue}b.push(p)}return{ok:b,bad:v}}function T(x,g){const f=g&&Array.isArray(g.items)?g.items:[],b=[],v=[];for(const p of f){const C=p==null?void 0:p.evidence;if(!(p!=null&&p.id)||!(p!=null&&p.question)||!(p!=null&&p.answer)||!(C!=null&&C.sid)||!(C!=null&&C.quote)){v.push({q:p,reason:"missing fields"});continue}if(!l(x,C.sid,C.quote)){v.push({q:p,reason:"evidence not in sentence"});continue}if(Array.isArray(p.choices)&&p.choices.length>0&&!p.choices.includes(p.answer)){v.push({q:p,reason:"answer not in choices"});continue}b.push(p)}return{ok:b,bad:v}}function O({summaryText:x,sentTable:g,anchors:f,badItems:b,mode:v,purpose:p,format:C}){return["[TASK] 아래는 검증에서 탈락한 문항들이다. 요약문 근거(sid+quote)를 만족하도록 문항을 다시 생성하라.",`- 재생성 문항 수: ${b.length}`,`- 모드: ${v}, 목적: ${p}, 형식: ${C}`,"- 규칙: 요약문 밖 정보 금지. 반드시 sid+quote가 실제로 해당 문장에 포함되어야 한다.","- 출력: JSON만. items 길이는 정확히 재생성 문항 수와 같아야 한다.","","[OUTPUT JSON ONLY]",'{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}',"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(g,null,2),"","[ANCHORS]",JSON.stringify(f,null,2),"","[BAD ITEMS]",JSON.stringify(b,null,2),"","[SUMMARY]",x].join(`
`)}async function j({llmCall:x,originalText:g,mode:f,format:b}){if(!x)throw new Error("llmCall is required");e[f]||(f="standard"),n.includes(b)||(b="narrative");const v=h({originalText:g,mode:f,format:b}),p=(await x({system:u(),user:v,json:!1})||"").trim()||"",C=c(p),G=m({summaryText:p,format:b});let Y=await x({system:u(),user:G,json:!0}),V;try{V=JSON.parse(Y)}catch{V={anchors:[]}}const{ok:P}=A(C,V),De=P.length>=4?P:N(C);return{summaryText:p,sentTable:C,anchors:De}}function N(x){const g=[];for(let f=0;f<Math.min(8,x.length);f++){const b=x[f],v=(b.text||"").slice(0,18);g.push({id:`A${f+1}`,label:`문장 핵심${f+1}`,type:"claim",sid:b.sid,quote:v,note:"요약 문장 기반 안전 앵커"})}return g}async function M({llmCall:x,mode:g,purpose:f,format:b,summaryText:v,sentTable:p,anchors:C}){e[g]||(g="standard"),s.includes(f)||(f="preview"),n.includes(b)||(b="narrative");const G=w({mode:g,purpose:f,format:b,summaryText:v,sentTable:p,anchors:C});let Y=await x({system:u(),user:G,json:!0}),V;try{V=JSON.parse(Y)}catch{V={items:[]}}let{ok:P,bad:De}=T(p,V);if(De.length>0){const _e=O({summaryText:v,sentTable:p,anchors:C,badItems:De.map(Wt=>Wt.q),mode:g,purpose:f,format:b});let Yt=await x({system:u(),user:_e,json:!0}),Xe;try{Xe=JSON.parse(Yt)}catch{Xe={items:[]}}const Vt=T(p,Xe);P=P.concat(Vt.ok);const Xt=r[g]||10;P=P.slice(0,Xt)}else{const _e=r[g]||10;P=P.slice(0,_e)}const Ve=r[g]||10;if(P.length<Ve){const _e=U({sentTable:p,anchors:C,count:Ve-P.length,format:b,purpose:f});P=P.concat(_e).slice(0,Ve)}return{items:P}}function U({sentTable:x,anchors:g,count:f,format:b,purpose:v}){const p=[],C=g.slice(0,Math.max(f,1));for(let G=0;G<f;G++){const Y=C[G%C.length],V=Y.sid,P=Y.quote;p.push({id:`QF${G+1}`,type:"short",question:v==="preview"?`요약에서 '${P}'가 의미하는 핵심 개념을 한 문장으로 말해보세요.`:`요약에서 '${P}'가 포함된 문장의 핵심 인과/관계를 한 문장으로 인출해보세요.`,choices:[],answer:"(서술형 정답: 사용자 입력 비교는 해설 기반 채점 또는 키워드 채점으로 처리)",explanation:"근거 문장을 다시 읽고 핵심을 1문장으로 재구성하면 됩니다.",evidence:{sid:V,quote:P},anchorIds:[Y.id]})}return p}class y{constructor(g,{passScore:f=90}={}){this.items=Array.isArray(g)?g:[],this.passScore=f,this.state={idx:0,attempts:1,correct:0,wrongIds:new Set,finished:!1}}gradeAnswer(g,f){if(!g)return{ok:!1,reason:"no item"};const b=g.type;if(b==="mcq"||b==="blank"||b==="match"||b==="order"||b==="label"||b==="short"){if(b==="short")return{ok:!0,reason:"short-auto-pass"};const v=(g.answer||"").trim(),p=(f||"").trim();return{ok:p===v,reason:p===v?"match":"mismatch"}}return{ok:!1,reason:"unknown type"}}getScore(){return this.items.length===0?0:Math.round(this.state.correct/this.items.length*100)}currentItem(){return this.items[this.state.idx]||null}submit(g){if(this.state.finished)return{done:!0,message:"already finished"};const f=this.currentItem();if(this.gradeAnswer(f,g).ok)return this.state.correct+=1,this.next(),{ok:!0,message:"정답 처리",score:this.getScore()};if(this.state.wrongIds.add(f.id),this.state.attempts===1)return this.state.attempts=2,{ok:!1,stage:1,hint:`힌트1: 근거 문장(${f.evidence.sid})을 다시 읽어보세요.`,score:this.getScore()};if(this.state.attempts===2)return this.state.attempts=3,{ok:!1,stage:2,hint:`힌트2: 근거 구절 = '${f.evidence.quote}'`,score:this.getScore()};{const v=f.explanation||"해설 없음";return this.next(),{ok:!1,stage:3,explanation:v,score:this.getScore()}}}next(){if(this.state.idx+=1,this.state.attempts=1,this.state.idx>=this.items.length)if(this.getScore()>=this.passScore)this.state.finished=!0;else{const f=this.items.filter(b=>this.state.wrongIds.has(b.id));this.items=f.length>0?f:this.items,this.state.idx=0,this.state.attempts=1,this.state.correct=0,this.state.wrongIds=new Set}}status(){return{idx:this.state.idx,total:this.items.length,score:this.getScore(),passScore:this.passScore,finished:this.state.finished}}}async function k({llmCall:x,originalText:g,mode:f,format:b,purpose:v}){const p=await j({llmCall:x,originalText:g,mode:f,format:b}),C=await M({llmCall:x,mode:f,purpose:v,format:b,summaryText:p.summaryText,sentTable:p.sentTable,anchors:p.anchors});return{summary:{mode:f,format:b,text:p.summaryText,sentences:p.sentTable,anchors:p.anchors},selfTest:{purpose:v,passScore:90,items:C.items}}}return{computeCharTargets:a,splitSentencesKR:o,makeSentenceTable:c,generateBundle:j,generateSelfTest:M,runPipeline:k,MasteryRunner:y}})(),yn=`/* MindStory Engine Bundle (compat) */
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
})();`;J.use("/api/*",Ir());J.get("/static/ms-engine-bundle.js",t=>t.text(yn,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));J.get("/favicon.ico",t=>t.body(null,204));J.use("/static/*",zr({root:"./public"}));J.get("/",t=>t.html(`<!DOCTYPE html>
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
</html>`));J.get("/api/health",t=>{const e=!!D(t.env.GEMINI_API_KEY).trim(),r=D(t.env.USE_MOCK).trim().toLowerCase()==="true";return t.json({ok:!0,ts:Gt(),hasDB:!!t.env.DB,hasGeminiKey:e,engineMode:e&&!r?"gemini+fallback":"local-only"})});J.post("/api/gens/run",async t=>{const e=Date.now();let r=null;try{r=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const n=D((r==null?void 0:r.text)||(r==null?void 0:r.originalText)||""),s=Ut((r==null?void 0:r.mode)||"standard"),i=Kt((r==null?void 0:r.format)||(r==null?void 0:r.viewType)||"narrative"),a=D((r==null?void 0:r.purpose)||"preview").trim().toLowerCase();if(!n)return t.json({ok:!1,error:{code:"NO_TEXT",message:"원문 텍스트가 필요합니다."}},400);const o=!!D(t.env.GEMINI_API_KEY).trim(),c=D(t.env.USE_MOCK).trim().toLowerCase()==="true";if(!o||c)return t.json({ok:!1,error:{code:"GEMINI_REQUIRED",message:"GENS Engine은 Gemini API가 필요합니다. .dev.vars에 GEMINI_API_KEY를 설정하세요."},guide:{step1:".dev.vars 파일 생성",step2:"GEMINI_API_KEY=your_api_key_here 추가",step3:"서비스 재시작: pm2 restart webapp"}},503);const l=async({system:u,user:h,json:m})=>{if(m){const w=`${u}

${h}

출력은 반드시 JSON만 출력하라. 다른 텍스트 금지.`;return await Bt(t.env,w)}else return(await wn(t.env,u,h)||"").toString()};try{const u=await vn.runPipeline({llmCall:l,originalText:n,mode:s,format:i,purpose:a==="exam"?"exam":"preview"});return t.json({ok:!0,data:u,meta:{engine:"gens-v3",mode:s,format:i,purpose:a,elapsedMs:Date.now()-e}},200)}catch(u){return console.error("[GENS Engine Error]",u),t.json({ok:!1,error:{code:"GENS_ERROR",message:u.message||"GENS 엔진 오류",details:u.stack}},500)}});J.post("/api/engine",async t=>{var O,j;const e=Date.now(),r=t.env.DB;await fn(r);let n=null;try{n=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=Yr(n==null?void 0:n.kind),i=D((n==null?void 0:n.text)||""),a=Ut((n==null?void 0:n.mode)||(n==null?void 0:n.level)),o=Kt((n==null?void 0:n.viewType)||(n==null?void 0:n.displayMode)),c=D(((O=n==null?void 0:n.options)==null?void 0:O.userId)||(n==null?void 0:n.userId)||"anon");if(!i.trim()||i.trim().length<5)return t.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const l=pn(s,a,o,i,c||null),u=await gt(r,l);if(u.hit)return t.json({ok:!0,data:u.data,meta:{cached:!0,cacheStore:u.store,cacheType:"derived",engine:"cache",elapsedMs:Date.now()-e}},200);const h=hn(s,a,i,c||null),m=await gt(r,h);if(m.hit&&((j=m.data)!=null&&j.narrative)){const N=m.data.narrative;let M;return o==="narrative"?M={kind:s,mode:a,viewType:o,narrative:N}:o==="structured"?M={kind:s,mode:a,...mn(N)}:o==="mindmap"?M={kind:s,mode:a,...gn(N)}:M={kind:s,mode:a,...xn(N)},await Ne(r,l,c||"anon",M),t.json({ok:!0,data:M,meta:{cached:!0,cacheStore:"derived",cacheType:"converted",engine:"local-convert",elapsedMs:Date.now()-e}},200)}const w=!!D(t.env.GEMINI_API_KEY).trim(),A=D(t.env.USE_MOCK).trim().toLowerCase()==="true";if(s==="summary"&&w&&!A)try{const N=await rn(t.env,i),M=Vr(a),U=Xr(o);let y;if(U==="structured")y={kind:s,mode:a,viewType:o,...N.structured[M]};else if(U==="mindmap")y={kind:s,mode:a,viewType:o,...N.mindmap[M]};else if(U==="selftest")y={kind:s,mode:a,viewType:o,...N.selftest[M]};else{const g=N.narrative[M];y={kind:s,mode:a,viewType:o,title:g.title,narrative:g.summary,keyPoints:g.keyPoints,examHints:g.examHints}}const k=N.narrative[M],x={kind:s,mode:a,viewType:"narrative",narrative:k.summary,allSummaries:{brief:N.narrative.brief.summary,standard:N.narrative.standard.summary,detail:N.narrative.detail.summary},meta:{engine:"v4",hierarchy:"brief ⊂ standard ⊂ detail (server-downsample)",structuredFirst:!0}};return await Ne(r,h,c||"anon",x),await Ne(r,l,c||"anon",y),t.json({ok:!0,data:y,meta:{cached:!1,engine:"gemini-v4-structured-first",elapsedMs:Date.now()-e,hierarchy:"brief ⊂ standard ⊂ detail (guaranteed)"}},200)}catch(N){console.error("[Gemini V4 Error]",N)}const T=un(i,a,o);if(await Ne(r,l,c||"anon",T),T.narrative){const N={kind:"summary",mode:a,viewType:"narrative",narrative:T.narrative};await Ne(r,h,c||"anon",N)}return t.json({ok:!0,data:T,meta:{cached:!1,engine:"local",elapsedMs:Date.now()-e}},200)});J.get("/health",t=>t.json({ok:!0,service:"MindStory v2 Revised"}));J.notFound(t=>t.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const xt=new Ht,Sn=Object.assign({"/src/index.tsx":J});let Jt=!1;for(const[,t]of Object.entries(Sn))t&&(xt.route("/",t),xt.notFound(t.notFoundHandler),Jt=!0);if(!Jt)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{xt as default};
