var un=Object.defineProperty;var lt=t=>{throw TypeError(t)};var pn=(t,e,n)=>e in t?un(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var S=(t,e,n)=>pn(t,typeof e!="symbol"?e+"":e,n),tt=(t,e,n)=>e.has(t)||lt("Cannot "+n);var u=(t,e,n)=>(tt(t,e,"read from private field"),n?n.call(t):e.get(t)),T=(t,e,n)=>e.has(t)?lt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),w=(t,e,n,r)=>(tt(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),C=(t,e,n)=>(tt(t,e,"access private method"),n);var dt=(t,e,n,r)=>({set _(s){w(t,e,s,n)},get _(){return u(t,e,r)}});var ut=(t,e,n)=>(r,s)=>{let i=-1;return a(0);async function a(o){if(o<=i)throw new Error("next() called multiple times");i=o;let c,l=!1,d;if(t[o]?(d=t[o][0][0],r.req.routeIndex=o):d=o===t.length&&s||void 0,d)try{c=await d(r,()=>a(o+1))}catch(p){if(p instanceof Error&&e)r.error=p,c=await e(p,r),l=!0;else throw p}else r.finalized===!1&&n&&(c=await n(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},hn=Symbol(),fn=async(t,e=Object.create(null))=>{const{all:n=!1,dot:r=!1}=e,i=(t instanceof Lt?t.raw.headers:t.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?mn(t,{all:n,dot:r}):{}};async function mn(t,e){const n=await t.formData();return n?gn(n,e):{}}function gn(t,e){const n=Object.create(null);return t.forEach((r,s)=>{e.all||s.endsWith("[]")?xn(n,s,r):n[s]=r}),e.dot&&Object.entries(n).forEach(([r,s])=>{r.includes(".")&&(yn(n,r,s),delete n[r])}),n}var xn=(t,e,n)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(n):t[e]=[t[e],n]:e.endsWith("[]")?t[e]=[n]:t[e]=n},yn=(t,e,n)=>{let r=t;const s=e.split(".");s.forEach((i,a)=>{a===s.length-1?r[i]=n:((!r[i]||typeof r[i]!="object"||Array.isArray(r[i])||r[i]instanceof File)&&(r[i]=Object.create(null)),r=r[i])})},Mt=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},vn=t=>{const{groups:e,path:n}=bn(t),r=Mt(n);return wn(r,e)},bn=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(n,r)=>{const s=`@${r}`;return e.push([s,n]),s}),{groups:e,path:t}},wn=(t,e)=>{for(let n=e.length-1;n>=0;n--){const[r]=e[n];for(let s=t.length-1;s>=0;s--)if(t[s].includes(r)){t[s]=t[s].replace(r,e[n][1]);break}}return t},Ge={},Sn=(t,e)=>{if(t==="*")return"*";const n=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const r=`${t}#${e}`;return Ge[r]||(n[2]?Ge[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,n[1],new RegExp(`^${n[2]}(?=/${e})`)]:[t,n[1],new RegExp(`^${n[2]}$`)]:Ge[r]=[t,n[1],!0]),Ge[r]}return null},ot=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return e(n)}catch{return n}})}},En=t=>ot(t,decodeURI),Dt=t=>{const e=t.url,n=e.indexOf("/",e.indexOf(":")+4);let r=n;for(;r<e.length;r++){const s=e.charCodeAt(r);if(s===37){const i=e.indexOf("?",r),a=e.slice(n,i===-1?void 0:i);return En(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(s===63)break}return e.slice(n,r)},_n=t=>{const e=Dt(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},Ee=(t,e,...n)=>(n.length&&(e=Ee(e,...n)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Pt=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),n=[];let r="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){n.length===0&&r===""?n.push("/"):n.push(r);const i=s.replace("?","");r+="/"+i,n.push(r)}else r+="/"+s}),n.filter((s,i,a)=>a.indexOf(s)===i)},nt=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?ot(t,Bt):t):t,$t=(t,e,n)=>{let r;if(!n&&e&&!/[%+]/.test(e)){let a=t.indexOf("?",8);if(a===-1)return;for(t.startsWith(e,a+1)||(a=t.indexOf(`&${e}`,a+1));a!==-1;){const o=t.charCodeAt(a+e.length+1);if(o===61){const c=a+e.length+2,l=t.indexOf("&",c);return nt(t.slice(c,l===-1?void 0:l))}else if(o==38||isNaN(o))return"";a=t.indexOf(`&${e}`,a+1)}if(r=/[%+]/.test(t),!r)return}const s={};r??(r=/[%+]/.test(t));let i=t.indexOf("?",8);for(;i!==-1;){const a=t.indexOf("&",i+1);let o=t.indexOf("=",i);o>a&&a!==-1&&(o=-1);let c=t.slice(i+1,o===-1?a===-1?void 0:a:o);if(r&&(c=nt(c)),i=a,c==="")continue;let l;o===-1?l="":(l=t.slice(o+1,a===-1?void 0:a),r&&(l=nt(l))),n?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(l)):s[c]??(s[c]=l)}return e?s[e]:s},Tn=$t,An=(t,e)=>$t(t,e,!0),Bt=decodeURIComponent,pt=t=>ot(t,Bt),Ae,J,te,qt,Ht,at,ie,Ct,Lt=(Ct=class{constructor(t,e="/",n=[[]]){T(this,te);S(this,"raw");T(this,Ae);T(this,J);S(this,"routeIndex",0);S(this,"path");S(this,"bodyCache",{});T(this,ie,t=>{const{bodyCache:e,raw:n}=this,r=e[t];if(r)return r;const s=Object.keys(e)[0];return s?e[s].then(i=>(s==="json"&&(i=JSON.stringify(i)),new Response(i)[t]())):e[t]=n[t]()});this.raw=t,this.path=e,w(this,J,n),w(this,Ae,{})}param(t){return t?C(this,te,qt).call(this,t):C(this,te,Ht).call(this)}query(t){return Tn(this.url,t)}queries(t){return An(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((n,r)=>{e[r]=n}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await fn(this,t))}json(){return u(this,ie).call(this,"text").then(t=>JSON.parse(t))}text(){return u(this,ie).call(this,"text")}arrayBuffer(){return u(this,ie).call(this,"arrayBuffer")}blob(){return u(this,ie).call(this,"blob")}formData(){return u(this,ie).call(this,"formData")}addValidatedData(t,e){u(this,Ae)[t]=e}valid(t){return u(this,Ae)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[hn](){return u(this,J)}get matchedRoutes(){return u(this,J)[0].map(([[,t]])=>t)}get routePath(){return u(this,J)[0].map(([[,t]])=>t)[this.routeIndex].path}},Ae=new WeakMap,J=new WeakMap,te=new WeakSet,qt=function(t){const e=u(this,J)[0][this.routeIndex][1][t],n=C(this,te,at).call(this,e);return n&&/\%/.test(n)?pt(n):n},Ht=function(){const t={},e=Object.keys(u(this,J)[0][this.routeIndex][1]);for(const n of e){const r=C(this,te,at).call(this,u(this,J)[0][this.routeIndex][1][n]);r!==void 0&&(t[n]=/\%/.test(r)?pt(r):r)}return t},at=function(t){return u(this,J)[1]?u(this,J)[1][t]:t},ie=new WeakMap,Ct),On={Stringify:1},zt=async(t,e,n,r,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const i=t.callbacks;return i!=null&&i.length?(s?s[0]+=t:s=[t],Promise.all(i.map(o=>o({phase:e,buffer:s,context:r}))).then(o=>Promise.all(o.filter(Boolean).map(c=>zt(c,e,!1,r,s))).then(()=>s[0]))):Promise.resolve(t)},Cn="text/plain; charset=UTF-8",rt=(t,e)=>({"Content-Type":t,...e}),$e,Be,X,Oe,Q,G,Le,Ce,ke,me,qe,He,ae,_e,kt,kn=(kt=class{constructor(t,e){T(this,ae);T(this,$e);T(this,Be);S(this,"env",{});T(this,X);S(this,"finalized",!1);S(this,"error");T(this,Oe);T(this,Q);T(this,G);T(this,Le);T(this,Ce);T(this,ke);T(this,me);T(this,qe);T(this,He);S(this,"render",(...t)=>(u(this,Ce)??w(this,Ce,e=>this.html(e)),u(this,Ce).call(this,...t)));S(this,"setLayout",t=>w(this,Le,t));S(this,"getLayout",()=>u(this,Le));S(this,"setRenderer",t=>{w(this,Ce,t)});S(this,"header",(t,e,n)=>{this.finalized&&w(this,G,new Response(u(this,G).body,u(this,G)));const r=u(this,G)?u(this,G).headers:u(this,me)??w(this,me,new Headers);e===void 0?r.delete(t):n!=null&&n.append?r.append(t,e):r.set(t,e)});S(this,"status",t=>{w(this,Oe,t)});S(this,"set",(t,e)=>{u(this,X)??w(this,X,new Map),u(this,X).set(t,e)});S(this,"get",t=>u(this,X)?u(this,X).get(t):void 0);S(this,"newResponse",(...t)=>C(this,ae,_e).call(this,...t));S(this,"body",(t,e,n)=>C(this,ae,_e).call(this,t,e,n));S(this,"text",(t,e,n)=>!u(this,me)&&!u(this,Oe)&&!e&&!n&&!this.finalized?new Response(t):C(this,ae,_e).call(this,t,e,rt(Cn,n)));S(this,"json",(t,e,n)=>C(this,ae,_e).call(this,JSON.stringify(t),e,rt("application/json",n)));S(this,"html",(t,e,n)=>{const r=s=>C(this,ae,_e).call(this,s,e,rt("text/html; charset=UTF-8",n));return typeof t=="object"?zt(t,On.Stringify,!1,{}).then(r):r(t)});S(this,"redirect",(t,e)=>{const n=String(t);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,e??302)});S(this,"notFound",()=>(u(this,ke)??w(this,ke,()=>new Response),u(this,ke).call(this,this)));w(this,$e,t),e&&(w(this,Q,e.executionCtx),this.env=e.env,w(this,ke,e.notFoundHandler),w(this,He,e.path),w(this,qe,e.matchResult))}get req(){return u(this,Be)??w(this,Be,new Lt(u(this,$e),u(this,He),u(this,qe))),u(this,Be)}get event(){if(u(this,Q)&&"respondWith"in u(this,Q))return u(this,Q);throw Error("This context has no FetchEvent")}get executionCtx(){if(u(this,Q))return u(this,Q);throw Error("This context has no ExecutionContext")}get res(){return u(this,G)||w(this,G,new Response(null,{headers:u(this,me)??w(this,me,new Headers)}))}set res(t){if(u(this,G)&&t){t=new Response(t.body,t);for(const[e,n]of u(this,G).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=u(this,G).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of r)t.headers.append("set-cookie",s)}else t.headers.set(e,n)}w(this,G,t),this.finalized=!0}get var(){return u(this,X)?Object.fromEntries(u(this,X)):{}}},$e=new WeakMap,Be=new WeakMap,X=new WeakMap,Oe=new WeakMap,Q=new WeakMap,G=new WeakMap,Le=new WeakMap,Ce=new WeakMap,ke=new WeakMap,me=new WeakMap,qe=new WeakMap,He=new WeakMap,ae=new WeakSet,_e=function(t,e,n){const r=u(this,G)?new Headers(u(this,G).headers):u(this,me)??new Headers;if(typeof e=="object"&&"headers"in e){const i=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[a,o]of i)a.toLowerCase()==="set-cookie"?r.append(a,o):r.set(a,o)}if(n)for(const[i,a]of Object.entries(n))if(typeof a=="string")r.set(i,a);else{r.delete(i);for(const o of a)r.append(i,o)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??u(this,Oe);return new Response(t,{status:s,headers:r})},kt),P="ALL",Nn="all",In=["get","post","put","delete","options","patch"],Ft="Can not add a route since the matcher is already built.",Gt=class extends Error{},jn="__COMPOSED_HANDLER",Rn=t=>t.text("404 Not Found",404),ht=(t,e)=>{if("getResponse"in t){const n=t.getResponse();return e.newResponse(n.body,n)}return console.error(t),e.text("Internal Server Error",500)},V,$,Ut,Y,he,Ke,Je,Ne,Mn=(Ne=class{constructor(e={}){T(this,$);S(this,"get");S(this,"post");S(this,"put");S(this,"delete");S(this,"options");S(this,"patch");S(this,"all");S(this,"on");S(this,"use");S(this,"router");S(this,"getPath");S(this,"_basePath","/");T(this,V,"/");S(this,"routes",[]);T(this,Y,Rn);S(this,"errorHandler",ht);S(this,"onError",e=>(this.errorHandler=e,this));S(this,"notFound",e=>(w(this,Y,e),this));S(this,"fetch",(e,...n)=>C(this,$,Je).call(this,e,n[1],n[0],e.method));S(this,"request",(e,n,r,s)=>e instanceof Request?this.fetch(n?new Request(e,n):e,r,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${Ee("/",e)}`,n),r,s)));S(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(C(this,$,Je).call(this,e.request,e,void 0,e.request.method))})});[...In,Nn].forEach(i=>{this[i]=(a,...o)=>(typeof a=="string"?w(this,V,a):C(this,$,he).call(this,i,u(this,V),a),o.forEach(c=>{C(this,$,he).call(this,i,u(this,V),c)}),this)}),this.on=(i,a,...o)=>{for(const c of[a].flat()){w(this,V,c);for(const l of[i].flat())o.map(d=>{C(this,$,he).call(this,l.toUpperCase(),u(this,V),d)})}return this},this.use=(i,...a)=>(typeof i=="string"?w(this,V,i):(w(this,V,"*"),a.unshift(i)),a.forEach(o=>{C(this,$,he).call(this,P,u(this,V),o)}),this);const{strict:r,...s}=e;Object.assign(this,s),this.getPath=r??!0?e.getPath??Dt:_n}route(e,n){const r=this.basePath(e);return n.routes.map(s=>{var a;let i;n.errorHandler===ht?i=s.handler:(i=async(o,c)=>(await ut([],n.errorHandler)(o,()=>s.handler(o,c))).res,i[jn]=s.handler),C(a=r,$,he).call(a,s.method,s.path,i)}),this}basePath(e){const n=C(this,$,Ut).call(this);return n._basePath=Ee(this._basePath,e),n}mount(e,n,r){let s,i;r&&(typeof r=="function"?i=r:(i=r.optionHandler,r.replaceRequest===!1?s=c=>c:s=r.replaceRequest));const a=i?c=>{const l=i(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};s||(s=(()=>{const c=Ee(this._basePath,e),l=c==="/"?0:c.length;return d=>{const p=new URL(d.url);return p.pathname=p.pathname.slice(l)||"/",new Request(p,d)}})());const o=async(c,l)=>{const d=await n(s(c.req.raw),...a(c));if(d)return d;await l()};return C(this,$,he).call(this,P,Ee(e,"*"),o),this}},V=new WeakMap,$=new WeakSet,Ut=function(){const e=new Ne({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,w(e,Y,u(this,Y)),e.routes=this.routes,e},Y=new WeakMap,he=function(e,n,r){e=e.toUpperCase(),n=Ee(this._basePath,n);const s={basePath:this._basePath,path:n,method:e,handler:r};this.router.add(e,n,[r,s]),this.routes.push(s)},Ke=function(e,n){if(e instanceof Error)return this.errorHandler(e,n);throw e},Je=function(e,n,r,s){if(s==="HEAD")return(async()=>new Response(null,await C(this,$,Je).call(this,e,n,r,"GET")))();const i=this.getPath(e,{env:r}),a=this.router.match(s,i),o=new kn(e,{path:i,matchResult:a,env:r,executionCtx:n,notFoundHandler:u(this,Y)});if(a[0].length===1){let l;try{l=a[0][0][0][0](o,async()=>{o.res=await u(this,Y).call(this,o)})}catch(d){return C(this,$,Ke).call(this,d,o)}return l instanceof Promise?l.then(d=>d||(o.finalized?o.res:u(this,Y).call(this,o))).catch(d=>C(this,$,Ke).call(this,d,o)):l??u(this,Y).call(this,o)}const c=ut(a[0],this.errorHandler,u(this,Y));return(async()=>{try{const l=await c(o);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return C(this,$,Ke).call(this,l,o)}})()},Ne),Kt=[];function Dn(t,e){const n=this.buildAllMatchers(),r=(s,i)=>{const a=n[s]||n[P],o=a[2][i];if(o)return o;const c=i.match(a[0]);if(!c)return[[],Kt];const l=c.indexOf("",1);return[a[1][l],c]};return this.match=r,r(t,e)}var Xe="[^/]+",De=".*",Pe="(?:|/.*)",Te=Symbol(),Pn=new Set(".\\+*[^]$()");function $n(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===De||t===Pe?1:e===De||e===Pe?-1:t===Xe?1:e===Xe?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var ge,xe,W,be,Bn=(be=class{constructor(){T(this,ge);T(this,xe);T(this,W,Object.create(null))}insert(e,n,r,s,i){if(e.length===0){if(u(this,ge)!==void 0)throw Te;if(i)return;w(this,ge,n);return}const[a,...o]=e,c=a==="*"?o.length===0?["","",De]:["","",Xe]:a==="/*"?["","",Pe]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const d=c[1];let p=c[2]||Xe;if(d&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw Te;if(l=u(this,W)[p],!l){if(Object.keys(u(this,W)).some(m=>m!==De&&m!==Pe))throw Te;if(i)return;l=u(this,W)[p]=new be,d!==""&&w(l,xe,s.varIndex++)}!i&&d!==""&&r.push([d,u(l,xe)])}else if(l=u(this,W)[a],!l){if(Object.keys(u(this,W)).some(d=>d.length>1&&d!==De&&d!==Pe))throw Te;if(i)return;l=u(this,W)[a]=new be}l.insert(o,n,r,s,i)}buildRegExpStr(){const n=Object.keys(u(this,W)).sort($n).map(r=>{const s=u(this,W)[r];return(typeof u(s,xe)=="number"?`(${r})@${u(s,xe)}`:Pn.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof u(this,ge)=="number"&&n.unshift(`#${u(this,ge)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},ge=new WeakMap,xe=new WeakMap,W=new WeakMap,be),Qe,ze,Nt,Ln=(Nt=class{constructor(){T(this,Qe,{varIndex:0});T(this,ze,new Bn)}insert(t,e,n){const r=[],s=[];for(let a=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const l=`@\\${a}`;return s[a]=[l,c],a++,o=!0,l}),!o)break}const i=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=s.length-1;a>=0;a--){const[o]=s[a];for(let c=i.length-1;c>=0;c--)if(i[c].indexOf(o)!==-1){i[c]=i[c].replace(o,s[a][1]);break}}return u(this,ze).insert(i,e,r,u(this,Qe),n),r}buildRegExp(){let t=u(this,ze).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const n=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,i,a)=>i!==void 0?(n[++e]=Number(i),"$()"):(a!==void 0&&(r[Number(a)]=++e),"")),[new RegExp(`^${t}`),n,r]}},Qe=new WeakMap,ze=new WeakMap,Nt),qn=[/^$/,[],Object.create(null)],Ve=Object.create(null);function Jt(t){return Ve[t]??(Ve[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function Hn(){Ve=Object.create(null)}function zn(t){var l;const e=new Ln,n=[];if(t.length===0)return qn;const r=t.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,p],[m,v])=>d?1:m?-1:p.length-v.length),s=Object.create(null);for(let d=0,p=-1,m=r.length;d<m;d++){const[v,_,A]=r[d];v?s[_]=[A.map(([I])=>[I,Object.create(null)]),Kt]:p++;let E;try{E=e.insert(_,p,v)}catch(I){throw I===Te?new Gt(_):I}v||(n[p]=A.map(([I,z])=>{const L=Object.create(null);for(z-=1;z>=0;z--){const[F,R]=E[z];L[F]=R}return[I,L]}))}const[i,a,o]=e.buildRegExp();for(let d=0,p=n.length;d<p;d++)for(let m=0,v=n[d].length;m<v;m++){const _=(l=n[d][m])==null?void 0:l[1];if(!_)continue;const A=Object.keys(_);for(let E=0,I=A.length;E<I;E++)_[A[E]]=o[_[A[E]]]}const c=[];for(const d in a)c[d]=n[a[d]];return[i,c,s]}function Se(t,e){if(t){for(const n of Object.keys(t).sort((r,s)=>s.length-r.length))if(Jt(n).test(e))return[...t[n]]}}var oe,ce,Ze,Vt,It,Fn=(It=class{constructor(){T(this,Ze);S(this,"name","RegExpRouter");T(this,oe);T(this,ce);S(this,"match",Dn);w(this,oe,{[P]:Object.create(null)}),w(this,ce,{[P]:Object.create(null)})}add(t,e,n){var o;const r=u(this,oe),s=u(this,ce);if(!r||!s)throw new Error(Ft);r[t]||[r,s].forEach(c=>{c[t]=Object.create(null),Object.keys(c[P]).forEach(l=>{c[t][l]=[...c[P][l]]})}),e==="/*"&&(e="*");const i=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const c=Jt(e);t===P?Object.keys(r).forEach(l=>{var d;(d=r[l])[e]||(d[e]=Se(r[l],e)||Se(r[P],e)||[])}):(o=r[t])[e]||(o[e]=Se(r[t],e)||Se(r[P],e)||[]),Object.keys(r).forEach(l=>{(t===P||t===l)&&Object.keys(r[l]).forEach(d=>{c.test(d)&&r[l][d].push([n,i])})}),Object.keys(s).forEach(l=>{(t===P||t===l)&&Object.keys(s[l]).forEach(d=>c.test(d)&&s[l][d].push([n,i]))});return}const a=Pt(e)||[e];for(let c=0,l=a.length;c<l;c++){const d=a[c];Object.keys(s).forEach(p=>{var m;(t===P||t===p)&&((m=s[p])[d]||(m[d]=[...Se(r[p],d)||Se(r[P],d)||[]]),s[p][d].push([n,i-l+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(u(this,ce)).concat(Object.keys(u(this,oe))).forEach(e=>{t[e]||(t[e]=C(this,Ze,Vt).call(this,e))}),w(this,oe,w(this,ce,void 0)),Hn(),t}},oe=new WeakMap,ce=new WeakMap,Ze=new WeakSet,Vt=function(t){const e=[];let n=t===P;return[u(this,oe),u(this,ce)].forEach(r=>{const s=r[t]?Object.keys(r[t]).map(i=>[i,r[t][i]]):[];s.length!==0?(n||(n=!0),e.push(...s)):t!==P&&e.push(...Object.keys(r[P]).map(i=>[i,r[P][i]]))}),n?zn(e):null},It),le,Z,jt,Gn=(jt=class{constructor(t){S(this,"name","SmartRouter");T(this,le,[]);T(this,Z,[]);w(this,le,t.routers)}add(t,e,n){if(!u(this,Z))throw new Error(Ft);u(this,Z).push([t,e,n])}match(t,e){if(!u(this,Z))throw new Error("Fatal error");const n=u(this,le),r=u(this,Z),s=n.length;let i=0,a;for(;i<s;i++){const o=n[i];try{for(let c=0,l=r.length;c<l;c++)o.add(...r[c]);a=o.match(t,e)}catch(c){if(c instanceof Gt)continue;throw c}this.match=o.match.bind(o),w(this,le,[o]),w(this,Z,void 0);break}if(i===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(u(this,Z)||u(this,le).length!==1)throw new Error("No active router has been determined yet.");return u(this,le)[0]}},le=new WeakMap,Z=new WeakMap,jt),Re=Object.create(null),de,q,ye,Ie,B,ee,fe,je,Un=(je=class{constructor(e,n,r){T(this,ee);T(this,de);T(this,q);T(this,ye);T(this,Ie,0);T(this,B,Re);if(w(this,q,r||Object.create(null)),w(this,de,[]),e&&n){const s=Object.create(null);s[e]={handler:n,possibleKeys:[],score:0},w(this,de,[s])}w(this,ye,[])}insert(e,n,r){w(this,Ie,++dt(this,Ie)._);let s=this;const i=vn(n),a=[];for(let o=0,c=i.length;o<c;o++){const l=i[o],d=i[o+1],p=Sn(l,d),m=Array.isArray(p)?p[0]:l;if(m in u(s,q)){s=u(s,q)[m],p&&a.push(p[1]);continue}u(s,q)[m]=new je,p&&(u(s,ye).push(p),a.push(p[1])),s=u(s,q)[m]}return u(s,de).push({[e]:{handler:r,possibleKeys:a.filter((o,c,l)=>l.indexOf(o)===c),score:u(this,Ie)}}),s}search(e,n){var c;const r=[];w(this,B,Re);let i=[this];const a=Mt(n),o=[];for(let l=0,d=a.length;l<d;l++){const p=a[l],m=l===d-1,v=[];for(let _=0,A=i.length;_<A;_++){const E=i[_],I=u(E,q)[p];I&&(w(I,B,u(E,B)),m?(u(I,q)["*"]&&r.push(...C(this,ee,fe).call(this,u(I,q)["*"],e,u(E,B))),r.push(...C(this,ee,fe).call(this,I,e,u(E,B)))):v.push(I));for(let z=0,L=u(E,ye).length;z<L;z++){const F=u(E,ye)[z],R=u(E,B)===Re?{}:{...u(E,B)};if(F==="*"){const y=u(E,q)["*"];y&&(r.push(...C(this,ee,fe).call(this,y,e,u(E,B))),w(y,B,R),v.push(y));continue}const[ne,b,f]=F;if(!p&&!(f instanceof RegExp))continue;const h=u(E,q)[ne],x=a.slice(l).join("/");if(f instanceof RegExp){const y=f.exec(x);if(y){if(R[b]=y[0],r.push(...C(this,ee,fe).call(this,h,e,u(E,B),R)),Object.keys(u(h,q)).length){w(h,B,R);const g=((c=y[0].match(/\//))==null?void 0:c.length)??0;(o[g]||(o[g]=[])).push(h)}continue}}(f===!0||f.test(p))&&(R[b]=p,m?(r.push(...C(this,ee,fe).call(this,h,e,R,u(E,B))),u(h,q)["*"]&&r.push(...C(this,ee,fe).call(this,u(h,q)["*"],e,R,u(E,B)))):(w(h,B,R),v.push(h)))}}i=v.concat(o.shift()??[])}return r.length>1&&r.sort((l,d)=>l.score-d.score),[r.map(({handler:l,params:d})=>[l,d])]}},de=new WeakMap,q=new WeakMap,ye=new WeakMap,Ie=new WeakMap,B=new WeakMap,ee=new WeakSet,fe=function(e,n,r,s){const i=[];for(let a=0,o=u(e,de).length;a<o;a++){const c=u(e,de)[a],l=c[n]||c[P],d={};if(l!==void 0&&(l.params=Object.create(null),i.push(l),r!==Re||s&&s!==Re))for(let p=0,m=l.possibleKeys.length;p<m;p++){const v=l.possibleKeys[p],_=d[l.score];l.params[v]=s!=null&&s[v]&&!_?s[v]:r[v]??(s==null?void 0:s[v]),d[l.score]=!0}}return i},je),ve,Rt,Kn=(Rt=class{constructor(){S(this,"name","TrieRouter");T(this,ve);w(this,ve,new Un)}add(t,e,n){const r=Pt(e);if(r){for(let s=0,i=r.length;s<i;s++)u(this,ve).insert(t,r[s],n);return}u(this,ve).insert(t,e,n)}match(t,e){return u(this,ve).search(t,e)}},ve=new WeakMap,Rt),Yt=class extends Mn{constructor(t={}){super(t),this.router=t.router??new Gn({routers:[new Fn,new Kn]})}},Jn=t=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(n.origin),s=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(n.allowMethods);return async function(a,o){var d;function c(p,m){a.res.headers.set(p,m)}const l=await r(a.req.header("origin")||"",a);if(l&&c("Access-Control-Allow-Origin",l),n.credentials&&c("Access-Control-Allow-Credentials","true"),(d=n.exposeHeaders)!=null&&d.length&&c("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),a.req.method==="OPTIONS"){n.origin!=="*"&&c("Vary","Origin"),n.maxAge!=null&&c("Access-Control-Max-Age",n.maxAge.toString());const p=await s(a.req.header("origin")||"",a);p.length&&c("Access-Control-Allow-Methods",p.join(","));let m=n.allowHeaders;if(!(m!=null&&m.length)){const v=a.req.header("Access-Control-Request-Headers");v&&(m=v.split(/\s*,\s*/))}return m!=null&&m.length&&(c("Access-Control-Allow-Headers",m.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await o(),n.origin!=="*"&&a.header("Vary","Origin",{append:!0})}},Vn=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,ft=(t,e=Wn)=>{const n=/\.([a-zA-Z0-9]+?)$/,r=t.match(n);if(!r)return;let s=e[r[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},Yn={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Wn=Yn,Xn=(...t)=>{let e=t.filter(s=>s!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const n=e.split("/"),r=[];for(const s of n)s===".."&&r.length>0&&r.at(-1)!==".."?r.pop():s!=="."&&r.push(s);return r.join("/")||"."},Wt={br:".br",zstd:".zst",gzip:".gz"},Qn=Object.keys(Wt),Zn="index.html",er=t=>{const e=t.root??"./",n=t.path,r=t.join??Xn;return async(s,i)=>{var d,p,m,v;if(s.finalized)return i();let a;if(t.path)a=t.path;else try{if(a=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((d=t.onNotFound)==null?void 0:d.call(t,s.req.path,s)),i()}let o=r(e,!n&&t.rewriteRequestPath?t.rewriteRequestPath(a):a);t.isDir&&await t.isDir(o)&&(o=r(o,Zn));const c=t.getContent;let l=await c(o,s);if(l instanceof Response)return s.newResponse(l.body,l);if(l){const _=t.mimes&&ft(o,t.mimes)||ft(o);if(s.header("Content-Type",_||"application/octet-stream"),t.precompressed&&(!_||Vn.test(_))){const A=new Set((p=s.req.header("Accept-Encoding"))==null?void 0:p.split(",").map(E=>E.trim()));for(const E of Qn){if(!A.has(E))continue;const I=await c(o+Wt[E],s);if(I){l=I,s.header("Content-Encoding",E),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=t.onFound)==null?void 0:m.call(t,o,s)),s.body(l)}await((v=t.onNotFound)==null?void 0:v.call(t,o,s)),await i()}},tr=async(t,e)=>{let n;e&&e.manifest?typeof e.manifest=="string"?n=JSON.parse(e.manifest):n=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?n=JSON.parse(__STATIC_CONTENT_MANIFEST):n=__STATIC_CONTENT_MANIFEST;let r;e&&e.namespace?r=e.namespace:r=__STATIC_CONTENT;const s=n[t];if(!s)return null;const i=await r.get(s,{type:"stream"});return i||null},nr=t=>async function(n,r){return er({...t,getContent:async i=>tr(i,{manifest:t.manifest,namespace:t.namespace?t.namespace:n.env?n.env.__STATIC_CONTENT:void 0})})(n,r)},rr=t=>nr(t);const H=new Yt,Ye=new Map,sr=1e3*60*60*24*7;let st=!1;function Fe(){return new Date().toISOString()}function k(t){return t==null?"":String(t)}function ir(t){return(t||"").replace(/\s+/g,"")}function Xt(t){return ir(t).length}function ar(t){return(t||"").replace(/-\s*[ivxIVX]+-\s*/gi,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[p\.\s*\d+\]/gi,"").replace(/p\.\s*\d+/gi,"").replace(/\n+/g," ").replace(/\s{2,}/g," ").trim()}function or(t){if(!t)return"";let e=String(t);return e=e.replace(/\uFEFF/g,"").replace(/[\u200B-\u200D\u2060]/g,"").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g," "),e=e.replace(/(?:^|\n)\s*[-–—]?\s*\d{1,4}\s*[-–—]?\s*(?=\n|$)/g,`
`),e=e.replace(/([A-Za-z])-\s*\n\s*([A-Za-z])/g,"$1$2"),e=e.replace(/([가-힣0-9])\s*\n\s*([가-힣0-9])/g,"$1$2"),e=e.replace(/\n{3,}/g,`

`),e=e.replace(/[ \t]{2,}/g," "),e=e.replace(/[「『]/g,'"').replace(/[」』]/g,'"'),e=e.replace(/[〈《]/g,'"').replace(/[〉》]/g,'"'),e=e.replace(/\s+([,.;:!?])/g,"$1").replace(/([,.;:!?])\s+/g,"$1 "),e.trim()}function mt(t){const e=(t||"").trim();if(!e)return[];const n=e.split(/\n{2,}/g),r=[];for(const s of n){const i=s.replace(/\n/g," ").replace(/[ \t]{2,}/g," ").trim();if(!i)continue;const a=i.split(new RegExp("(?<=[다요임함]\\.|[다요임함]\\?|[다요임함]!|[.?!])\\s+","g"));for(let o of a)o=o.trim(),o&&r.push(o)}return r}function cr(t){const e=(t||"").trim();return!!(!e||e.length<12&&!(/[.?!]$/.test(e)||/(?:이다|된다|한다|있다|없다|말한다|주장한다)\.?$/.test(e))||/[-–—]\s*\d{1,4}\s*[-–—]/.test(e)||/^["")\]\}]+$/.test(e)||/^["(\[\{]+$/.test(e)||/^(?:\(\d+\)|\d+\)|[①-⑳])\s*["")\]]*\s*$/.test(e)||/(완전\s*정복|쏙쏙|콕콕|실력을\s*쑥쑥|고득점|전문\s*대비반|특강|홍보)/.test(e)&&(/[""]/.test(e)||/!$/.test(e))||(e.match(/["""'(){}\[\]<>]/g)||[]).length>=10&&e.length<80)}function lr(t){const e=[],n=new Set;for(const r of t){const s=r.trim();if(cr(s))continue;const i=s.replace(/\s+/g," ");n.has(i)||(n.add(i),e.push(i))}return e}function dr(t){const e=or(t),n=lr(mt(e)),r=n.length>=3?n:mt(e);return{text:e,sentences:r}}function Qt(t){const e=k(t).trim().toLowerCase();return e?e==="brief"||e==="simple"||e==="short"||e==="lite"?"brief":e==="detail"||e==="detailed"||e==="full"?"detail":"standard":"standard"}function Zt(t){const e=k(t).trim().toLowerCase();return e?e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"||e==="mind_map"?"mindmap":"narrative":"narrative"}function ur(t){const e=k(t).trim().toLowerCase();return e==="concept"?"concept":e==="exam"?"exam":"summary"}function pr(t){let e=k(t).replace(/\s+/g," ").trim();if(!e)return[];e=e.replace(/[\u201C\u201D\u2033\u00AB\u00BB]/g,'"').replace(/[\u2018\u2019\u2032]/g,"'");const n=[];let r="",s=null,i=0;const a=()=>{const o=r.trim();o&&n.push(o),r=""};for(let o=0;o<e.length;o++){const c=e[o],l=e[o+1]||"",d=e[o+2]||"";if(c==="("&&i++,c===")"&&(i=Math.max(0,i-1)),(c==='"'||c==="'")&&s===null?s=c:s&&c===s&&(s=null),r+=c,s===null&&i===0&&/[.!?]/.test(c)){l===" "&&(a(),o++);continue}if(s===null&&i===0&&l===" "){const m=r.trimEnd().slice(-1),v=/[가-힣A-Za-z0-9"'(\[]/.test(d);(m==="다"||m==="요"||m==="죠")&&v&&(a(),o++)}}return a(),n.length?n:[e]}const et={narrative:{brief:4,standard:6,detail:9},structured:{brief:3,standard:5,detail:8},mindmap:{brief:4,standard:6,detail:10},selftest:{brief:3,standard:5,detail:8}};function hr(t){const e=String(t||"").trim().toLowerCase();return e==="brief"||e==="standard"||e==="detail"?e:e==="simple"?"brief":"standard"}function fr(t){const e=String(t||"").trim().toLowerCase();return e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"?"mindmap":"narrative"}function mr(t){const e=String(t||"").trim(),n=e.indexOf("{"),r=e.lastIndexOf("}");return n>=0&&r>n?e.slice(n,r+1):e}function gt(t){const e=mr(t);try{return JSON.parse(e)}catch{}const n=e.replace(/,\s*}/g,"}").replace(/,\s*]/g,"]").replace(/\u0000/g,"");try{return JSON.parse(n)}catch{}return null}function gr(t){return["당신은 초·중·고 학생의 '학습 단위' 기준으로 내용을 구조화하는 전문가입니다.","절대 규칙:","- 원문에 없는 내용 생성 금지(추측/과장 금지)","- 문자 단순 자르기 금지, 의미 단위로 재구성","- 반드시 JSON만 출력(설명문/머리말/꼬리말/코드블록 금지)","","구조화의 뼈대(반드시 포함):","- anchor: 핵심 주장 1문장","- sections: 학습 단위 조목화, 각 section은 keywords/lvl25/explain 포함","- glossary: term/def로 구성","- links: anchor(A0) -> section 연결","","출력 스키마:","{",'  "anchor": "핵심 주장 1문장",','  "hierarchy": { "big": "대단원", "mid": "중단원", "small": "소단원", "subtitles": ["소제목"] },','  "sections": [','    { "id": "S1", "title": "섹션 제목", "keywords": ["핵심어"], "lvl25": ["의미키워드"], "explain": "1~3문장 설명" }',"  ],",'  "glossary": [ { "term": "용어", "def": "정의" } ],','  "links": [ { "from": "A0", "to": "S1", "rel": "covers" } ]',"}","",`원문(공백제외 ${Xt(t)}자):`,t].join(`
`)}function xr(t,e){const n=Xt(t),r=(e==null?void 0:e.anchor)||"",s=((e==null?void 0:e.sections)||[]).map(i=>i.title).slice(0,10);return["당신은 초·중·고 학생의 시험/이해/기억을 위한 서술형 요약 전문가입니다.","절대 규칙:","- 원문에 없는 내용 생성 금지","- 반드시 JSON만 출력(설명문/코드블록 금지)",'- 아래 "구조화 뼈대"를 벗어나지 말고, 그 내용을 자연스러운 문장으로 연결해 서술하세요.',"","구조화 뼈대:",`- anchor: ${r}`,`- sections: ${JSON.stringify(s)}`,"","요구:","- summary는 6~10문장(상세)","- keyPoints 4~7개, examHints 2~4개","","출력 스키마:","{",'  "title": "요약 제목",','  "summary": "자연스러운 문장 요약(6~10문장)",','  "keyPoints": ["핵심포인트"],','  "examHints": ["시험포인트"]',"}","",`원문(공백제외 ${n}자):`,t].join(`
`)}function yr(t){const e=(t==null?void 0:t.anchor)||"",n=((t==null?void 0:t.sections)||[]).map(s=>({id:s.id,title:s.title,keywords:s.keywords.slice(0,5)})),r=((t==null?void 0:t.glossary)||[]).slice(0,20);return["당신은 학습용 마인드맵 JSON을 만드는 전문가입니다.","절대 규칙:","- 반드시 JSON만 출력","- 노드 id 중복/누락 금지, edge 참조 일관","- 아래 구조화 정보를 그대로 바탕으로 구성(새 내용 생성 금지)","","구조화 입력:",`anchor: ${e}`,`sections: ${JSON.stringify(n)}`,`glossary: ${JSON.stringify(r)}`,"","출력 스키마:","{",'  "center": { "id": "C0", "label": "중심 주제", "type": "root", "note": "짧은 설명" },','  "nodes": [','    { "id": "S1", "label": "섹션", "type": "section", "note": "설명" },','    { "id": "T1", "label": "용어", "type": "term", "note": "정의" }',"  ],",'  "edges": [ { "from": "C0", "to": "S1", "rel": "has" } ]',"}"].join(`
`)}function vr(t){const e=(t==null?void 0:t.anchor)||"",n=((t==null?void 0:t.sections)||[]).map(s=>({id:s.id,title:s.title,keywords:s.keywords.slice(0,6)})),r=((t==null?void 0:t.glossary)||[]).slice(0,25);return["당신은 초·중·고 학생용 셀프테스트를 만드는 전문가입니다.","절대 규칙:","- 반드시 JSON만 출력","- 원문/구조화에 없는 내용 금지","- 문항 id는 q1, q2... 고유","","구조화 입력:",`anchor: ${e}`,`sections: ${JSON.stringify(n)}`,`glossary: ${JSON.stringify(r)}`,"","요구(상세):","- 총 8문항","- type은 reorder/blank/multiple_choice 섞기","","출력 스키마:","{",'  "questions": [','    { "id": "q1", "type": "multiple_choice", "prompt": "질문", "choices": ["a","b","c"], "answer": 1 },','    { "id": "q2", "type": "blank", "prompt": "빈칸", "answer": "정답" },','    { "id": "q3", "type": "reorder", "prompt": "순서", "choices": ["A","B","C"], "answer": [0,2,1] }',"  ]","}"].join(`
`)}function xt(t,e){const n=et.structured[e],r=(t.sections||[]).slice(0,n).map(c=>({...c,keywords:(c.keywords||[]).slice(0,e==="brief"?4:6),lvl25:(c.lvl25||[]).slice(0,e==="brief"?2:3),explain:String(c.explain||"").trim()})),s=e==="brief"?8:e==="standard"?14:20,i=(t.glossary||[]).slice(0,s),a=new Set(r.map(c=>c.id)),o=(t.links||[]).filter(c=>c.from==="A0"&&a.has(c.to));return{...t,sections:r,glossary:i,links:o}}function yt(t,e){const n=et.mindmap[e],r=(t.nodes||[]).slice(0,Math.max(0,n-1)),s=new Set(["C0",...r.map(a=>a.id)]),i=(t.edges||[]).filter(a=>s.has(a.from)&&s.has(a.to));return{...t,nodes:r,edges:i}}function vt(t,e){const n=et.selftest[e];return{questions:(t.questions||[]).slice(0,n)}}function bt(t,e){const n=et.narrative[e],i=pr(t.summary||"").slice(0,n).join(" "),a=(t.keyPoints||[]).slice(0,e==="brief"?3:4),o=(t.examHints||[]).slice(0,e==="brief"?2:3);return{...t,summary:i,keyPoints:a,examHints:o}}async function Ue(t,e){const n=async()=>{const o=await tn(t,e);return String(o||"")},r=await n(),s=gt(r);if(s)return s;const i=await n(),a=gt(i);if(a)return a;throw new Error("MODEL_JSON_PARSE_FAILED")}async function br(t,e){const n=await Ue(t,gr(e));if(!(n!=null&&n.anchor)||!Array.isArray(n.sections))throw new Error("STRUCTURED_SCHEMA_INVALID");n.links=n.links||n.sections.map(d=>({from:"A0",to:d.id,rel:"covers"}));const r=await Ue(t,xr(e,n));if(!(r!=null&&r.summary))throw new Error("NARRATIVE_SCHEMA_INVALID");const s=await Ue(t,yr(n));if(!(s!=null&&s.center)||!Array.isArray(s.nodes)||!Array.isArray(s.edges))throw new Error("MINDMAP_SCHEMA_INVALID");s.center.id||(s.center.id="C0");const i=await Ue(t,vr(n));if(!Array.isArray(i.questions))throw new Error("SELFTEST_SCHEMA_INVALID");const a={detail:n,standard:xt(n,"standard"),brief:xt(n,"brief")},o={detail:r,standard:bt(r,"standard"),brief:bt(r,"brief")},c={detail:s,standard:yt(s,"standard"),brief:yt(s,"brief")},l={detail:i,standard:vt(i,"standard"),brief:vt(i,"brief")};return{structured:a,narrative:o,mindmap:c,selftest:l}}function en(t){if(!t)return"empty";let e=2166136261,n=0;for(let i=0;i<t.length;i++){const a=t.charCodeAt(i);e^=a,e+=(e<<1)+(e<<4)+(e<<7)+(e<<8)+(e<<24),n=(n<<5)-n+a,n|=0}const r=(e>>>0).toString(16),s=(Math.abs(n)>>>0).toString(16);return`${t.length.toString(16)}_${r}_${s}`}function wr(t,e,n,r){const s=en(n);return`${t}::${r||"anon"}::${e}::base::${s}`}function Sr(t,e,n,r,s){const i=en(r);return`${t}::${s||"anon"}::${e}::${n}::${i}`}async function Er(t){if(!st){if(!t){st=!0;return}await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),st=!0}}async function wt(t,e){const n=Date.now(),r=Ye.get(e);if(r&&n-r.createdAt<sr)return{hit:!0,data:r.data,store:"mem"};if(r&&Ye.delete(e),!t)return{hit:!1};const s=await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();if(!(s!=null&&s.response_json))return{hit:!1};try{const i=JSON.parse(s.response_json);return Ye.set(e,{data:i,createdAt:n}),{hit:!0,data:i,store:"d1"}}catch{return{hit:!1}}}async function Me(t,e,n,r){const s=Date.now();Ye.set(e,{data:r,createdAt:s}),t&&await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e,n,JSON.stringify(r),Fe()).run()}async function _r(t,e){var c,l,d,p,m;const n=k(t.GEMINI_API_KEY).trim();if(!n)throw new Error("GEMINI_API_KEY is missing");const r=k(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",s=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(n)}`,i={contents:[{role:"user",parts:[{text:e}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let a=0,o=500;for(;a<3;){a++;const v=await fetch(s,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(i)});if(v.ok){const A=await v.json();return{ok:!0,text:((m=(p=(d=(l=(c=A==null?void 0:A.candidates)==null?void 0:c[0])==null?void 0:l.content)==null?void 0:d.parts)==null?void 0:p[0])==null?void 0:m.text)??"",raw:A}}if(v.status===429||v.status===503){await new Promise(A=>setTimeout(A,o)),o*=2;continue}const _=await v.text().catch(()=>"");throw new Error(`Gemini error ${v.status}: ${_.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function Tr(t,e,n){var l,d,p,m,v;const r=k(t.GEMINI_API_KEY).trim();if(!r)throw new Error("GEMINI_API_KEY is missing");const s=k(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",i=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`,a={system_instruction:{parts:[{text:e}]},contents:[{role:"user",parts:[{text:n}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let o=0,c=500;for(;o<3;){o++;const _=await fetch(i,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(a)});if(_.ok){const E=await _.json();return((v=(m=(p=(d=(l=E==null?void 0:E.candidates)==null?void 0:l[0])==null?void 0:d.content)==null?void 0:p.parts)==null?void 0:m[0])==null?void 0:v.text)??""}if(_.status===429||_.status===503){await new Promise(E=>setTimeout(E,c)),c*=2;continue}const A=await _.text().catch(()=>"");throw new Error(`Gemini error ${_.status}: ${A.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function tn(t,e){const n=await _r(t,e);return typeof n=="string"?n:((n==null?void 0:n.text)??"").toString()}const Ar=(()=>{const e={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}},n={brief:6,standard:10,detail:14},r=["narrative","structured","mindmap"],s=["preview","exam"];function i(b){return(b||"").replace(/\s+/g,"")}function a(b,f){const x=Math.max(200,i(b||"").length),y=e[f]||e.standard,g=Math.floor(x*y.min),O=Math.ceil(x*y.max);return{base:x,min:Math.max(80,g),max:Math.max(120,O)}}function o(b){const f=(b||"").trim();return f?f.replace(/\r/g,"").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map(x=>x.trim()).filter(Boolean):[]}function c(b){return o(b).map((h,x)=>({sid:`S${x+1}`,text:h}))}function l(b,f,h){const x=b.find(y=>y.sid===f);return!x||!h||typeof h!="string"?!1:x.text.includes(h.trim())}function d(){return["당신은 교육공학 기반 요약·셀프테스트 생성 엔진이다.","추출형 복붙 금지. 반드시 의미 단위로 재구성하라.","가장 중요한 1순위는 문자수(공백 제외) 제한 준수다.","허위 정보(원문/요약에 없는 내용) 생성 금지.","JSON 출력이 요구되면 JSON만 출력하라."].join(`
`)}function p({originalText:b,mode:f,format:h}){const x=a(b,f),y=ar(b),g=h==="narrative"?"서술형: 연결어를 사용해 흐름/인과가 보이도록 1~3문단으로 구성":h==="structured"?"구조화: 상위-하위 위계가 드러나는 조목(가/나/다 또는 ①②③) 형태":"마인드맵: 텍스트로 표현된 노드-관계 목록(중심노드/하위노드/연결라벨) 형태";return["[TASK] 아래 학술 논문을 생성적 요약(Abstractive Summarization) 방식으로 지정된 형식에 맞춰 요약하라.",`- 모드: ${f} (간단/표준/상세)`,`- 형식: ${h} (${g})`,`- 문자수 목표(공백 제외): 최소 ${x.min}자 ~ 최대 ${x.max}자`,"","[🔹 C. 논문형 텍스트 전용 요약 구조 - 반드시 준수]","이 텍스트는 학술 논문입니다.","요약 시 반드시 다음 순서를 유지하세요:","1. 연구 목적 (무엇을 연구했는가?)","2. 연구 설계 및 방법 (어떻게 연구했는가?)","3. 핵심 결과 (무엇을 발견했는가?)","4. 결과 해석 (결과가 의미하는 바는?)","5. 교육적 의의 (실무/교육에 어떤 시사점을 주는가?)","각 단계는 1문단 이상을 넘지 마세요.","","[요약 품질 규칙]","1. 단순 추출/복붙 금지: 원문 문장을 그대로 나열하지 말고 생성적으로 재구성하여 매끄러운 글 작성","2. 텍스트 정제: 페이지 번호(p.XX), 각주, 특수기호, 질문형 문장 제거 → 학술적 평서문으로 전환","3. 스마트 편집: 중복 표현 통합, 전문 용어 일관성 유지, 한 문장 2줄 이내로 단문 위주","4. 퀴즈 연동: 핵심 키워드와 인과관계를 문장 내에 전략적으로 배치 (퀴즈 앵커 확보)","5. 할루시네이션 금지: 원문에 없는 주장/사례/인과/수치 추가 절대 금지","6. 🔹 B. 결과 단독 발췌 금지: 간단 모드에서는 DLPFC, VLPFC, OFC 등 세부 뇌 영역 명칭 사용 금지","","[비율 엄수]","- 간단 10~15%, 표준 25~30%, 상세 45~55% 글자수 비율은 절대적 기준","- 상세 요약이 표준보다 짧아지는 역전 현상 금지","- 각 단계마다 정보의 깊이와 양을 계층적으로 명확히 차별화","","[ORIGINAL]",y].join(`
`)}function m({summaryText:b,format:f}){return["[TASK] 아래 요약문에서 학습 앵커(핵심 개념/관계)를 추출하라.","- 출력은 JSON만. 한국어로.","- 앵커 수: 6~14개 범위(요약 길이에 맞춰 적절히).","- 각 앵커는 요약문에 실제로 등장하는 표현을 근거(quote)로 가져와야 한다.","- quote는 요약문 일부를 그대로 복사(짧게 8~25자).","","[OUTPUT JSON SCHEMA]",`{
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
`)}function v({mode:b,purpose:f,format:h,summaryText:x,sentTable:y,anchors:g}){const O=n[b]||10,j=f==="preview"?"예습용 셀프테스트: 요약문 안에서 바로 확인 가능한 재인 중심(스키마 형성). 과도한 추론 금지.":"시험대비 셀프테스트: 요약문에 있는 근거를 바탕으로 인과/관계/분류를 인출하는 회상 중심. 요약에 없는 정보 금지.",U=h==="narrative"?"문항 스타일: 문장 빈칸, 문장 순서 배열, 인과관계 단답/서술(요약 근거 필수)":h==="structured"?"문항 스타일: 항목-정의 매칭, 분류 채우기, 상하위 체계, 사례-범주 매칭(요약 근거 필수)":"문항 스타일: 노드 라벨 맞추기, 연결 라벨링, 누락 노드/연결 복원, 관계 이유 단답(요약 근거 필수)";return["[TASK] 아래 요약문과 앵커만을 근거로 셀프테스트 문항을 생성하라.",`- 모드: ${b} (문항수 ${O})`,`- 목적: ${f} (${j})`,`- 요약 형식: ${h} (${U})`,"- 규칙1: 요약문에 없는 정보로 문제 만들지 말 것(할루시네이션 금지).","- 규칙2: 각 문항은 반드시 evidence를 포함: sid + quote(요약 문장 일부 8~25자).","- 규칙3: quote는 반드시 해당 sid 문장에 실제로 포함되어야 한다.","- 규칙4: 정답/해설은 간결하게. 해설은 evidence와 연결되게.","","[OUTPUT JSON ONLY]",`{
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
}`,"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(y,null,2),"","[ANCHORS]",JSON.stringify(g,null,2),"","[SUMMARY]",x].join(`
`)}function _(b,f){const h=f&&f.anchors?f.anchors:[],x=[],y=[];for(const g of h){const O=g==null?void 0:g.sid,j=g==null?void 0:g.quote;if(typeof(g==null?void 0:g.label)!="string"||!g.label.trim()){y.push({a:g,reason:"label missing"});continue}if(!l(b,O,j)){y.push({a:g,reason:"evidence not in sentence"});continue}x.push(g)}return{ok:x,bad:y}}function A(b,f){const h=f&&Array.isArray(f.items)?f.items:[],x=[],y=[];for(const g of h){const O=g==null?void 0:g.evidence;if(!(g!=null&&g.id)||!(g!=null&&g.question)||!(g!=null&&g.answer)||!(O!=null&&O.sid)||!(O!=null&&O.quote)){y.push({q:g,reason:"missing fields"});continue}if(!l(b,O.sid,O.quote)){y.push({q:g,reason:"evidence not in sentence"});continue}if(Array.isArray(g.choices)&&g.choices.length>0&&!g.choices.includes(g.answer)){y.push({q:g,reason:"answer not in choices"});continue}x.push(g)}return{ok:x,bad:y}}function E({summaryText:b,sentTable:f,anchors:h,badItems:x,mode:y,purpose:g,format:O}){return["[TASK] 아래는 검증에서 탈락한 문항들이다. 요약문 근거(sid+quote)를 만족하도록 문항을 다시 생성하라.",`- 재생성 문항 수: ${x.length}`,`- 모드: ${y}, 목적: ${g}, 형식: ${O}`,"- 규칙: 요약문 밖 정보 금지. 반드시 sid+quote가 실제로 해당 문장에 포함되어야 한다.","- 출력: JSON만. items 길이는 정확히 재생성 문항 수와 같아야 한다.","","[OUTPUT JSON ONLY]",'{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}',"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(f,null,2),"","[ANCHORS]",JSON.stringify(h,null,2),"","[BAD ITEMS]",JSON.stringify(x,null,2),"","[SUMMARY]",b].join(`
`)}async function I({llmCall:b,originalText:f,mode:h,format:x}){if(!b)throw new Error("llmCall is required");e[h]||(h="standard"),r.includes(x)||(x="narrative");const y=p({originalText:f,mode:h,format:x}),g=(await b({system:d(),user:y,json:!1})||"").trim()||"",O=c(g),j=m({summaryText:g,format:x});let U=await b({system:d(),user:j,json:!0}),K;try{K=JSON.parse(U)}catch{K={anchors:[]}}const{ok:M}=_(O,K),pe=M.length>=4?M:z(O);return{summaryText:g,sentTable:O,anchors:pe}}function z(b){const f=[];for(let h=0;h<Math.min(8,b.length);h++){const x=b[h],y=(x.text||"").slice(0,18);f.push({id:`A${h+1}`,label:`문장 핵심${h+1}`,type:"claim",sid:x.sid,quote:y,note:"요약 문장 기반 안전 앵커"})}return f}async function L({llmCall:b,mode:f,purpose:h,format:x,summaryText:y,sentTable:g,anchors:O}){e[f]||(f="standard"),s.includes(h)||(h="preview"),r.includes(x)||(x="narrative");const j=v({mode:f,purpose:h,format:x,summaryText:y,sentTable:g,anchors:O});let U=await b({system:d(),user:j,json:!0}),K;try{K=JSON.parse(U)}catch{K={items:[]}}let{ok:M,bad:pe}=A(g,K);if(pe.length>0){const re=E({summaryText:y,sentTable:g,anchors:O,badItems:pe.map(dn=>dn.q),mode:f,purpose:h,format:x});let N=await b({system:d(),user:re,json:!0}),D;try{D=JSON.parse(N)}catch{D={items:[]}}const cn=A(g,D);M=M.concat(cn.ok);const ln=n[f]||10;M=M.slice(0,ln)}else{const re=n[f]||10;M=M.slice(0,re)}const we=n[f]||10;if(M.length<we){const re=F({sentTable:g,anchors:O,count:we-M.length,format:x,purpose:h});M=M.concat(re).slice(0,we)}return{items:M}}function F({sentTable:b,anchors:f,count:h,format:x,purpose:y}){const g=[],O=f.slice(0,Math.max(h,1));for(let j=0;j<h;j++){const U=O[j%O.length],K=U.sid,M=U.quote;g.push({id:`QF${j+1}`,type:"short",question:y==="preview"?`요약에서 '${M}'가 의미하는 핵심 개념을 한 문장으로 말해보세요.`:`요약에서 '${M}'가 포함된 문장의 핵심 인과/관계를 한 문장으로 인출해보세요.`,choices:[],answer:"(서술형 정답: 사용자 입력 비교는 해설 기반 채점 또는 키워드 채점으로 처리)",explanation:"근거 문장을 다시 읽고 핵심을 1문장으로 재구성하면 됩니다.",evidence:{sid:K,quote:M},anchorIds:[U.id]})}return g}class R{constructor(f,{passScore:h=90}={}){this.items=Array.isArray(f)?f:[],this.passScore=h,this.state={idx:0,attempts:1,correct:0,wrongIds:new Set,finished:!1}}gradeAnswer(f,h){if(!f)return{ok:!1,reason:"no item"};const x=f.type;if(x==="mcq"||x==="blank"||x==="match"||x==="order"||x==="label"||x==="short"){if(x==="short")return{ok:!0,reason:"short-auto-pass"};const y=(f.answer||"").trim(),g=(h||"").trim();return{ok:g===y,reason:g===y?"match":"mismatch"}}return{ok:!1,reason:"unknown type"}}getScore(){return this.items.length===0?0:Math.round(this.state.correct/this.items.length*100)}currentItem(){return this.items[this.state.idx]||null}submit(f){if(this.state.finished)return{done:!0,message:"already finished"};const h=this.currentItem();if(this.gradeAnswer(h,f).ok)return this.state.correct+=1,this.next(),{ok:!0,message:"정답 처리",score:this.getScore()};if(this.state.wrongIds.add(h.id),this.state.attempts===1)return this.state.attempts=2,{ok:!1,stage:1,hint:`힌트1: 근거 문장(${h.evidence.sid})을 다시 읽어보세요.`,score:this.getScore()};if(this.state.attempts===2)return this.state.attempts=3,{ok:!1,stage:2,hint:`힌트2: 근거 구절 = '${h.evidence.quote}'`,score:this.getScore()};{const y=h.explanation||"해설 없음";return this.next(),{ok:!1,stage:3,explanation:y,score:this.getScore()}}}next(){if(this.state.idx+=1,this.state.attempts=1,this.state.idx>=this.items.length)if(this.getScore()>=this.passScore)this.state.finished=!0;else{const h=this.items.filter(x=>this.state.wrongIds.has(x.id));this.items=h.length>0?h:this.items,this.state.idx=0,this.state.attempts=1,this.state.correct=0,this.state.wrongIds=new Set}}status(){return{idx:this.state.idx,total:this.items.length,score:this.getScore(),passScore:this.passScore,finished:this.state.finished}}}async function ne({llmCall:b,originalText:f,mode:h,format:x,purpose:y}){const g=await I({llmCall:b,originalText:f,mode:h,format:x}),O=await L({llmCall:b,mode:h,purpose:y,format:x,summaryText:g.summaryText,sentTable:g.sentTable,anchors:g.anchors});return{summary:{mode:h,format:x,text:g.summaryText,sentences:g.sentTable,anchors:g.anchors},selfTest:{purpose:y,passScore:90,items:O.items}}}return{computeCharTargets:a,splitSentencesKR:o,makeSentenceTable:c,generateBundle:I,generateSelfTest:L,runPipeline:ne,MasteryRunner:R}})(),Or=`/* MindStory Engine Bundle (compat) */
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
})();`;H.get("/ms-engine-bundle.js",t=>t.text(Or,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));H.use("/api/*",Jn());H.get("/favicon.ico",t=>t.body(null,204));H.use("/static/*",rr({root:"./public"}));H.get("/",t=>t.html(`<!DOCTYPE html>
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
</html>`));H.get("/api/health",t=>{const e=!!k(t.env.GEMINI_API_KEY).trim(),n=k(t.env.USE_MOCK).trim().toLowerCase()==="true";return t.json({ok:!0,ts:Fe(),hasDB:!!t.env.DB,hasGeminiKey:e,engineMode:e&&!n?"gemini+fallback":"local-only"})});H.post("/api/gens/run",async t=>{const e=Date.now();let n=null;try{n=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const r=k((n==null?void 0:n.text)||(n==null?void 0:n.originalText)||""),s=Qt((n==null?void 0:n.mode)||"standard"),i=Zt((n==null?void 0:n.format)||(n==null?void 0:n.viewType)||"narrative"),a=k((n==null?void 0:n.purpose)||"preview").trim().toLowerCase();if(!r)return t.json({ok:!1,error:{code:"NO_TEXT",message:"원문 텍스트가 필요합니다."}},400);const o=!!k(t.env.GEMINI_API_KEY).trim(),c=k(t.env.USE_MOCK).trim().toLowerCase()==="true";if(!o||c)return t.json({ok:!1,error:{code:"GEMINI_REQUIRED",message:"GENS Engine은 Gemini API가 필요합니다. .dev.vars에 GEMINI_API_KEY를 설정하세요."},guide:{step1:".dev.vars 파일 생성",step2:"GEMINI_API_KEY=your_api_key_here 추가",step3:"서비스 재시작: pm2 restart webapp"}},503);const l=async({system:d,user:p,json:m})=>{if(m){const v=`${d}

${p}

출력은 반드시 JSON만 출력하라. 다른 텍스트 금지.`;return await tn(t.env,v)}else return(await Tr(t.env,d,p)||"").toString()};try{const d=await Ar.runPipeline({llmCall:l,originalText:r,mode:s,format:i,purpose:a==="exam"?"exam":"preview"});return t.json({ok:!0,data:d,meta:{engine:"gens-v3",mode:s,format:i,purpose:a,elapsedMs:Date.now()-e}},200)}catch(d){return console.error("[GENS Engine Error]",d),t.json({ok:!1,error:{code:"GENS_ERROR",message:d.message||"GENS 엔진 오류",details:d.stack}},500)}});H.post("/api/engine",async t=>{var b;const e=Date.now(),n=t.env.DB;await Er(n);let r=null;try{r=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=ur(r==null?void 0:r.kind),i=k((r==null?void 0:r.text)||""),a=Qt((r==null?void 0:r.mode)||(r==null?void 0:r.level)),o=Zt((r==null?void 0:r.viewType)||(r==null?void 0:r.displayMode)),c=k(((b=r==null?void 0:r.options)==null?void 0:b.userId)||(r==null?void 0:r.userId)||"anon");if(!i.trim()||i.trim().length<5)return t.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const l=dr(i),d=l.text,p=l.sentences;console.log("[Sanitize] Original length:",i.length,"→ Cleaned:",d.length),console.log("[Sanitize] Sentences extracted:",p.length);const m=Sr(s,a,o,d,c||null),v=await wt(n,m);if(v.hit)return t.json({ok:!0,data:v.data,meta:{cached:!0,cacheStore:v.store,cacheType:"derived",engine:"cache",elapsedMs:Date.now()-e}},200);const _=wr(s,a,d,c||null),A=await wt(n,_);if(A.hit&&A.data&&o==="narrative"){let f;if(A.data.allSummaries&&A.data.allSummaries[a]?f=A.data.allSummaries[a]:A.data.narrative?f=A.data.narrative:console.warn("[Cache] Base cache has no narrative, skipping"),f){const h={kind:s,mode:a,viewType:o,narrative:f};return await Me(n,m,c||"anon",h),t.json({ok:!0,data:h,meta:{cached:!0,cacheStore:"derived",cacheType:"base-narrative",engine:"cache",elapsedMs:Date.now()-e}},200)}}const E=!!k(t.env.GEMINI_API_KEY).trim(),I=k(t.env.USE_MOCK).trim().toLowerCase()==="true";if(s==="summary"&&E&&!I)try{const f=await br(t.env,d),h=hr(a),x=fr(o);let y;if(x==="structured")y={kind:s,mode:a,viewType:o,...f.structured[h]};else if(x==="mindmap")y={kind:s,mode:a,viewType:o,...f.mindmap[h]};else if(x==="selftest")y={kind:s,mode:a,viewType:o,...f.selftest[h]};else{const j=f.narrative[h];y={kind:s,mode:a,viewType:o,title:j.title,narrative:j.summary,keyPoints:j.keyPoints,examHints:j.examHints}}const g=f.narrative[h],O={kind:s,mode:a,viewType:"narrative",narrative:g.summary,allSummaries:{brief:f.narrative.brief.summary,standard:f.narrative.standard.summary,detail:f.narrative.detail.summary},meta:{engine:"v4",hierarchy:"brief ⊂ standard ⊂ detail (server-downsample)",structuredFirst:!0}};return await Me(n,_,c||"anon",O),await Me(n,m,c||"anon",y),t.json({ok:!0,data:y,meta:{cached:!1,engine:"gemini-v4-structured-first",elapsedMs:Date.now()-e,hierarchy:"brief ⊂ standard ⊂ detail (guaranteed)"}},200)}catch(f){console.error("[Gemini V4 Error]",f)}const{buildAllSummariesV4_Quality:z}=await Promise.resolve().then(()=>zr),L=z(d),F=L[a]||L.standard;let R;o==="narrative"?R={kind:s,mode:a,viewType:o,narrative:F.narrative}:o==="structured"?R={kind:s,mode:a,viewType:o,structured:F.structured}:o==="mindmap"?R={kind:s,mode:a,viewType:o,mindmap:F.mindmap}:o==="selftest"&&(R={kind:s,mode:a,viewType:o,selftest:F.selftest}),await Me(n,m,c||"anon",R);const ne={kind:"summary",mode:a,viewType:"narrative",narrative:F.narrative,allSummaries:{brief:L.brief.narrative,standard:L.standard.narrative,detail:L.detail.narrative}};return await Me(n,_,c||"anon",ne),t.json({ok:!0,data:R,meta:{cached:!1,engine:"quality-v4.2",elapsedMs:Date.now()-e,features:["압축률 강제 (중간 절단 금지)","구조화: 논지/대립/현황/괴리/변천/시사점","마인드맵: 노드 단위 축약","brief ⊂ standard ⊂ detail 강제"]}},200)});const We=90;function Cr(){return{version:"v1",passScore:We,itemCountByMode:{brief:5,standard:7,detail:10},mix:{mcq:.5,short:.2,tf:.2,cloze:.1},constraints:{noVerbatimLongQuote:!0,requireSourceGrounding:!0,preferKeyClaimsOverTrivia:!0,avoidPageArtifacts:!0,koreanGrammarClean:!0},scoring:{mcq:{points:10},tf:{points:10},short:{points:10,normalize:"trim-lower-space"},cloze:{points:10,normalize:"trim-lower-space"}}}}function St(t){return k(t).replace(/\s+/g," ").trim().toLowerCase()}function kr(t,e,n){let r=0,s=0;for(const o of t){let c=10;o.type==="mcq"&&(c=n.scoring.mcq.points),o.type==="tf"&&(c=n.scoring.tf.points),o.type==="short"&&(c=n.scoring.short.points),o.type==="cloze"&&(c=n.scoring.cloze.points),r+=c;const l=e==null?void 0:e[o.id];let d=!1;o.type==="mcq"?d=Number(l)===o.answer:o.type==="tf"?d=!!l===o.answer:d=St(l)===St(o.answer),d&&(s+=c)}const i=r?Math.round(s/r*100):0,a=i>=n.passScore;return{score:i,passed:a}}async function Nr(t){const e=new TextEncoder().encode(t||""),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n)).map(r=>r.toString(16).padStart(2,"0")).join("")}function nn(t=21){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";let n="";const s=globalThis.crypto.getRandomValues(new Uint8Array(t));for(let i=0;i<t;i++)n+=e[s[i]%e.length];return n}H.post("/api/session/save",async t=>{const e=await t.req.json().catch(()=>({})),n=k(e.userId),r=k(e.title||""),s=k(e.sourceText),i=e.allSummaries,a=e.engineMeta||{};if(!n)return t.json({ok:!1,error:"userId required"},400);if(!s||s.trim().length<5)return t.json({ok:!1,error:"sourceText too short"},400);if(!i||typeof i!="object")return t.json({ok:!1,error:"allSummaries required"},400);const o=t.env.DB;if(!o)return t.json({ok:!1,error:"DB not configured"},503);const c=k(e.sessionId)||nn(),l=await Nr(s),d=Fe(),p=o.prepare(`
    INSERT INTO ms_sessions (id, user_id, title, source_text, source_hash, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title=excluded.title,
      source_text=excluded.source_text,
      source_hash=excluded.source_hash,
      updated_at=excluded.updated_at
  `).bind(c,n,r,s,l,d,d),m=o.prepare(`
    INSERT INTO ms_summaries (session_id, all_summaries_json, engine_meta_json, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(session_id) DO UPDATE SET
      all_summaries_json=excluded.all_summaries_json,
      engine_meta_json=excluded.engine_meta_json,
      updated_at=excluded.updated_at
  `).bind(c,JSON.stringify(i),JSON.stringify(a),d,d);return await o.batch([p,m]),t.json({ok:!0,sessionId:c,updatedAt:d})});H.get("/api/session/load",async t=>{const e=k(t.req.query("userId")),n=k(t.req.query("sessionId"));if(!e)return t.json({ok:!1,error:"userId required"},400);if(!n)return t.json({ok:!1,error:"sessionId required"},400);const r=t.env.DB;if(!r)return t.json({ok:!1,error:"DB not configured"},503);const s=await r.prepare(`
    SELECT s.id, s.user_id, s.title, s.source_text, s.updated_at,
           m.all_summaries_json, m.engine_meta_json
    FROM ms_sessions s
    JOIN ms_summaries m ON m.session_id = s.id
    WHERE s.id = ? AND s.user_id = ?
  `).bind(n,e).first();return s?t.json({ok:!0,session:{sessionId:s.id,userId:s.user_id,title:s.title,sourceText:s.source_text,updatedAt:s.updated_at,allSummaries:JSON.parse(String(s.all_summaries_json||"{}")),engineMeta:JSON.parse(String(s.engine_meta_json||"{}"))}}):t.json({ok:!1,error:"not found"},404)});H.get("/api/session/list",async t=>{const e=k(t.req.query("userId"));if(!e)return t.json({ok:!1,error:"userId required"},400);const n=t.env.DB;if(!n)return t.json({ok:!1,error:"DB not configured"},503);const r=await n.prepare(`
    SELECT id, title, updated_at
    FROM ms_sessions
    WHERE user_id = ?
    ORDER BY updated_at DESC
    LIMIT 50
  `).bind(e).all();return t.json({ok:!0,items:r.results||[]})});H.post("/api/selftest/submit",async t=>{const e=await t.req.json().catch(()=>({})),n=k(e.userId),r=k(e.sessionId),s=k(e.mode||"standard"),i=k(e.viewType||"selftest"),a=e.spec||Cr(),o=Array.isArray(e.items)?e.items:[],c=e.answers||{};if(!n)return t.json({ok:!1,error:"userId required"},400);if(!r)return t.json({ok:!1,error:"sessionId required"},400);if(!o.length)return t.json({ok:!1,error:"items required"},400);a.passScore=We;const{score:l,passed:d}=kr(o,c,a),p=t.env.DB,m=Fe();if(p){const v=nn();return await p.prepare(`
      INSERT INTO ms_selftest_attempts
      (id, session_id, user_id, mode, view_type, spec_json, questions_json, answers_json, score, passed, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(v,r,n,s,i,JSON.stringify(a),JSON.stringify(o),JSON.stringify(c),l,d?1:0,m).run(),t.json({ok:!0,score:l,passed:d,passScore:We,attemptId:v,createdAt:m})}return t.json({ok:!0,score:l,passed:d,passScore:We,createdAt:m})});H.get("/api/health",async t=>{const e=!!t.env.DB,n=!!t.env.GEMINI_API_KEY;return t.json({ok:!0,ts:Fe(),hasDB:e,hasGeminiKey:n,engineMode:n?"llm":"local-only"})});H.get("/health",t=>t.json({ok:!0,service:"MindStory v2 Revised"}));H.notFound(t=>t.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const Et=new Yt,Ir=Object.assign({"/src/index.tsx":H});let rn=!1;for(const[,t]of Object.entries(Ir))t&&(Et.route("/",t),Et.notFound(t.notFoundHandler),rn=!0);if(!rn)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");function _t(t,e,n){return Math.max(e,Math.min(n,t))}function ct(t){return(t||"").replace(/\s+/g,"").length}function ue(t){return(t||"").replace(/[ \t]{2,}/g," ").replace(/\s+([,.;:!?])/g,"$1").trim()}function jr(t,e){return`${t}_${e.toString(36)}`}function sn(t){if(!t)return"";let e=String(t);return e=e.replace(/\uFEFF/g,"").replace(/[\u200B-\u200D\u2060]/g,"").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g," "),e=e.replace(/(?:^|\n)\s*[-–—]?\s*\d{1,4}\s*[-–—]?\s*(?=\n|$)/g,`
`),e=e.replace(/([A-Za-z])-\s*\n\s*([A-Za-z])/g,"$1$2"),e=e.replace(/([가-힣0-9])\s*\n\s*([가-힣0-9])/g,"$1$2"),e=e.replace(/[「『〈《]/g,'"').replace(/[」』〉》]/g,'"'),e=e.replace(/\n{3,}/g,`

`),e=e.replace(/[ \t]{2,}/g," "),e.trim()}function Tt(t){const e=(t||"").trim();if(!e)return[];const n=e.split(/\n{2,}/g),r=[];for(const s of n){const i=s.replace(/\n/g," ").replace(/[ \t]{2,}/g," ").trim();if(!i)continue;const a=i.split(new RegExp("(?<=[.?!])\\s+|(?<=(?:이다|된다|한다|있다|없다|말한다|주장한다)\\.)\\s+","g"));for(const o of a){const c=ue(o);c&&r.push(c)}}return r}function Rr(t){const e=(t||"").trim();return!!(!e||e.length<12&&!(/[.?!]$/.test(e)||/(?:이다|된다|한다|있다|없다|말한다|주장한다)\.?$/.test(e))||/^["")\]\}]+$/.test(e)||/^["(\[\{]+$/.test(e)||/^(?:\(\d+\)|\d+\)|[①-⑳])\s*["")\]]*\s*$/.test(e)||/(완전\s*정복|쏙쏙|콕콕|실력을\s*쑥쑥|고득점|특강|전문\s*대비)/.test(e)&&(/[""]/.test(e)||/!$/.test(e)))}function At(t){const e=[],n=new Set;for(const r of t){const s=ue(r);if(!s||Rr(s))continue;const i=s.replace(/\s+/g," ");n.has(i)||(n.add(i),e.push(i))}return e}function Mr(t){const e=/(^|\n)\s*(\d+\.\d+)\.\s*([^\n]+)\n?/g,n=[];let r;for(;(r=e.exec(t))!==null;)n.push({idx:r.index,key:r[2],title:ue(r[3])});if(n.length===0)return[{key:"all",title:"본문",text:t}];const s=[];for(let i=0;i<n.length;i++){const a=n[i],o=n[i+1],c=a.idx,l=o?o.idx:t.length;s.push({key:a.key,title:a.title,text:t.slice(c,l).trim()})}return s}function Dr(t){let e=1;/(교육부|공교육|정상화|사교육|입시|내신|대입|고입)/.test(t)&&(e+=2),/(방해|요인|우려|격차|부정적|증폭|현실)/.test(t)&&(e+=1.5),/(반해|반면|하지만|그러나|이에\s*반해)/.test(t)&&(e+=1.5),/(목표|역점|능력|국제|문화|듣기|말하기)/.test(t)&&(e+=1.2),/(현황|방법|프로그램|평가|설명회|학원|교육비|기숙)/.test(t)&&(e+=1),/(변천|과정|비율|가산점|전형|선발\s*시험)/.test(t)&&(e+=1.6);const n=ct(t);return n>180&&(e-=.6),n>260&&(e-=1),e}function an(t){let e=ue(t);return e=e.replace(/\([^)]*\d{4}[^)]*\)/g,"").trim(),e=e.replace(/"([^"]{60,})"/g,'"(인용문 요지)"'),e=e.replace(/본수업/g,"본 수업"),e=e.replace(/국력신장/g,"국력 신장"),e=e.replace(/내신대비/g,"내신 대비"),e=e.replace(/지원현황/g,"지원 현황"),e=e.replace(/또한출판/g,"또한 출판"),e=e.replace(/그리고입과/g,"그리고 고입과"),e=e.replace(/통한대비/g,"통한 대비"),/[.?!]$/.test(e)||(e+="."),ue(e)}function se(t,e,n){return t.map((s,i)=>({id:jr(n,i),text:s,score:Dr(s)})).sort((s,i)=>i.score-s.score).slice(0,e).map(s=>({id:s.id,text:an(s.text),score:s.score}))}function Pr(t){var ne,b,f,h,x,y,g,O,j,U,K,M,pe,we,re;const e=Mr(t),n={};for(const N of e)n[N.key]=At(Tt(N.text));const r=At(Tt(t)),s=(ne=e[0])!=null&&ne.title?ue(e[0].title):"선행학습 구조화",i=r.filter(N=>/(정의|개념|선행학습|학습활동|교육과정)/.test(N)),a=r.filter(N=>/(쟁점|관점|차이|주장|해석|입장)/.test(N)),o=se(i.length?i:r,2,"def"),c=se(a.length?a:r,2,"issue"),l=r.filter(N=>/(교육부|공교육|정상화|우려|부정적|방해|격차|참여도|태도|창의|인성|전인교육)/.test(N)),d=se(l.length?l:r,4,"min"),p=r.filter(N=>/(사교육|학원|예습|효율|성과|긍정|흥미|자신감|구분|조력|대비)/.test(N)),m=se(p.length?p:r,3,"pri"),v=(b=n["2.2"])!=null&&b.length?n["2.2"]:r.filter(N=>/(목표|역점|듣기|말하기|일상|국제|이해|능력)/.test(N)),_=r.filter(N=>/(현실|성취|성적|고입|대입|전환)/.test(N)),A=se(v.length?v:r,2,"goal"),E=se(_.length?_:r,2,"rgoal"),I=((f=n["2.3"])!=null&&f.length?n["2.3"]:r).filter(N=>/(현황|방법|설명회|프로그램|평가|교육비|특강|기숙|방학|시험대비|내신|인증시험|운영|비용|강도)/.test(N)),z=se(I.length?I:r,4,"rea"),L=(h=n["2.4"])!=null&&h.length?n["2.4"]:r.filter(N=>/(변천|과정|비율|가산점|내신|추세|반영|영어|비중|확대)/.test(N)),F=se(L.length?L:r,2,"pol"),R={title:s,children:[{title:"정의·쟁점",type:"question",collapsed:!1,children:[{title:"선행학습 정의",type:"keyword",pack:["정규과정 이전","미리 학습","학습과정"],explain:((x=o[0])==null?void 0:x.text)||"교육부 기준 선행학습은 정규 교육과정보다 앞서 미리 학습하는 모든 학습활동을 뜻한다.",collapsed:!1,children:[]},{title:"쟁점(관점 차이)",type:"keyword",pack:["국가","학생·학부모","사교육"],explain:((y=c[0])==null?void 0:y.text)||"선행학습의 성격과 영향에 대해 국가·학생/학부모·사교육이 서로 다른 주장과 해석을 제시한다.",collapsed:!1,children:[]}]},{title:"교육부 관점",type:"question",collapsed:!1,children:d.length>0?d.slice(0,4).map((N,D)=>({title:["공교육 정상화 저해","전인교육 저해·사교육 증폭","영어 태도 조기 고착 우려","학습격차·수업참여 악영향"][D]||`관점 ${D+1}`,type:"keyword",pack:[["공교육 방해","정상화 저해","핵심 요인"],["창의·인성","전인교육","사교육 관행"],["호오 조기결정","자신감 과잉","무력감"],["수준 격차","태도","참여도"]][D]||[],explain:N.text,collapsed:!1,children:[]})):[{title:"공교육 정상화 저해",type:"keyword",pack:["공교육 방해","정상화 저해","핵심 요인"],explain:((g=r[0])==null?void 0:g.text)||"교육부는 선행학습이 공교육 정상화를 방해하는 요인으로 본다.",collapsed:!1,children:[]}]},{title:"사교육 관점",type:"question",collapsed:!1,children:m.length>0?m.slice(0,3).map((N,D)=>({title:["예습과 선행학습 구분 주장","예습의 효과 강조","현장의 선행학습 실태(모순)"][D]||`관점 ${D+1}`,type:"keyword",pack:[["예습≠선행","대비","조력"],["수업 성과","효율","흥미·자신감"],["고학년 교재","방학·특강","실질 선행"]][D]||[],explain:N.text,collapsed:!1,children:[]})):[{title:"예습과 선행학습 구분",type:"keyword",pack:["예습","수업 대비","조력"],explain:((O=r[1])==null?void 0:O.text)||((j=r[0])==null?void 0:j.text)||"사교육은 예습과 선행학습을 구분한다.",collapsed:!1,children:[]}]},{title:"목표(교육부 vs 현실)",type:"question",collapsed:!1,children:[{title:"1998 영어교육 목표",type:"keyword",pack:["듣기·말하기","일상영어","국제이해"],explain:((U=A[0])==null?void 0:U.text)||"교육부(1998)는 음성언어 중심(듣기·말하기)과 일상생활 영어 사용 능력, 국제사회·외국문화 이해 및 국가 발전 기여를 목표로 제시했다.",collapsed:!1,children:[]},{title:"현실 목표의 전환",type:"keyword",pack:["성취·성적","고입","대입"],explain:((K=E[0])==null?void 0:K.text)||"현장에서는 교육 목표와 달리 학업 성취·성적 향상, 고입·대입 대비가 학습의 중심 목표로 작동하는 경향이 있다.",collapsed:!1,children:[]}]},{title:"방법·현황(사례)",type:"question",collapsed:!1,children:z.length>0?z.slice(0,4).map((N,D)=>({title:["시험대비 프로그램(초등 A학원)","내신·인증시험 집중(어학 B·C학원)","운영·비용·강도","기숙형 선행학습(방학 30일 내외)"][D]||`방법 ${D+1}`,type:"keyword",pack:[["단원평가","서술형 특강","성취도 평가"],["중등 내신","인증시험","L/S/R/W"],["주5회","주말 특강","자습 운영"],["교육청 연계","기숙","스파르타식"]][D]||[],explain:N.text,collapsed:!1,children:[]})):[{title:"시험대비 프로그램",type:"keyword",pack:["프로그램","특강","평가"],explain:((M=r[2])==null?void 0:M.text)||((pe=r[0])==null?void 0:pe.text)||"시험 대비 프로그램과 특강이 운영된다.",collapsed:!1,children:[]}]},{title:"변천(입시 반영 구조)",type:"question",collapsed:!1,children:F.length>0?F.slice(0,2).map((N,D)=>({title:["내신 반영 비율이 좌우","영어 비중 확대 추세"][D]||`변천 ${D+1}`,type:"keyword",pack:[["고입","대입","내신 비중"],["필수과목","가산점","비중 증가"]][D]||[],explain:N.text,collapsed:!1,children:[]})):[{title:"입시 반영 구조",type:"keyword",pack:["내신","비율","반영"],explain:((we=r[r.length-1])==null?void 0:we.text)||((re=r[0])==null?void 0:re.text)||"내신 반영 비율이 선행학습에 영향을 준다.",collapsed:!1,children:[]}]}]};return{title:s,tree:R}}function on(t,e,n){if(e>=n)return{...t,children:[]};const r={0:6,1:4,2:3}[e]||2;return{...t,children:t.children.slice(0,r).map(s=>on(s,e+1,n))}}function Ot(t,e){const n=e==="brief"?2:e==="standard"?3:4;return{title:t.title,tree:on(t.tree,0,n)}}function $r(t,e){const n=Math.max(120,ct(t)),r=e==="brief"?.13:e==="standard"?.3:.55,s=Math.floor(n*(r-.03)),i=Math.ceil(n*(r+.05));return{min:_t(s,80,999999),max:_t(i,110,999999)}}function it(t,e,n){const{min:r,max:s}=$r(n,e),i=[],a=e==="brief"?2:e==="standard"?4:6,o=e==="brief"?1:e==="standard"?2:4,c=(p,m,v,_)=>{m===0?p.children.slice(0,a).forEach((A,E)=>{c(A,m+1)}):m===1?p.children.slice(0,o).forEach((A,E)=>{c(A,m+1)}):m===2&&p.explain&&i.push(p.explain)};c(t.tree,0);const l=[];let d=0;for(const p of i){const m=ct(p);if(d+m>s&&l.length>=2||(l.push(p),d+=m,d>=r&&l.length>=(e==="brief"?2:e==="standard"?4:6)))break}return ue(l.join(" "))}function Br(t){const e=an(t),n=e.split(/,\s+/g);return n.length>=3?ue(n.slice(0,2).join(", ")+"."):e}function Lr(t){const e=t.title||"핵심",n=(s,i)=>{const a=`${i}_${Math.random().toString(36).substring(7)}`;return{id:a,label:Br(s.title),children:s.children.map((o,c)=>n(o,`${a}_${c}`))}},r=t.tree.children.map((s,i)=>n(s,`n${i}`));return{center:e,nodes:r}}function qr(t,e){const n=[],r=[],s=i=>{i.explain&&r.push(i.explain),i.children&&i.children.forEach(s)};return s(t.tree),n.push({q:"교육부는 선행학습을 왜 문제로 보는가?",a:r.find(i=>/(교육부|공교육|정상화|우려)/.test(i))||"공교육 정상화 저해 및 격차/태도 악화 우려.",hint:"공교육·격차·참여도"}),n.push({q:"사교육이 말하는 예습과 선행학습의 차이는 무엇인가?",a:r.find(i=>/(사교육|학원|예습|효율)/.test(i))||"예습은 수업 대비, 선행은 다음 학년 과정의 선학습.",hint:"수업 대비 vs 다음 학년"}),e!=="brief"&&n.push({q:"선행학습이 강화되는 제도적 배경은 무엇인가?",a:r.find(i=>/(변천|과정|비율|가산점|내신)/.test(i))||"내신 반영비율/전형/가산점 등 구조 변화가 영향을 준다.",hint:"내신·전형·비율"}),e==="detail"&&n.push({q:"선행학습의 현황(방법)에서 핵심 특징 1가지는?",a:r.find(i=>/(현황|방법|프로그램|평가)/.test(i))||"시험 대비 중심 프로그램과 특강/평가 체계가 운영된다.",hint:"프로그램·특강·평가"}),n}function Hr(t){const e=sn(t),n=Pr(e),r=Ot(n,"standard"),s=Ot(n,"brief"),i=it(n,"detail",e),a=it(r,"standard",e),o=it(s,"brief",e),c=(l,d,p)=>({mode:l,narrative:p,structured:d,mindmap:Lr(d),selftest:qr(d,l)});return{brief:c("brief",s,o),standard:c("standard",r,a),detail:c("detail",n,i)}}const zr=Object.freeze(Object.defineProperty({__proto__:null,buildAllSummariesV4_Quality:Hr,sanitizeKoreanAcademicText:sn},Symbol.toStringTag,{value:"Module"}));export{Et as default};
