var cn=Object.defineProperty;var ot=t=>{throw TypeError(t)};var ln=(t,e,n)=>e in t?cn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var w=(t,e,n)=>ln(t,typeof e!="symbol"?e+"":e,n),Ze=(t,e,n)=>e.has(t)||ot("Cannot "+n);var d=(t,e,n)=>(Ze(t,e,"read from private field"),n?n.call(t):e.get(t)),T=(t,e,n)=>e.has(t)?ot("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),y=(t,e,n,r)=>(Ze(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),O=(t,e,n)=>(Ze(t,e,"access private method"),n);var ct=(t,e,n,r)=>({set _(s){y(t,e,s,n)},get _(){return d(t,e,r)}});var lt=(t,e,n)=>(r,s)=>{let i=-1;return a(0);async function a(o){if(o<=i)throw new Error("next() called multiple times");i=o;let c,l=!1,u;if(t[o]?(u=t[o][0][0],r.req.routeIndex=o):u=o===t.length&&s||void 0,u)try{c=await u(r,()=>a(o+1))}catch(f){if(f instanceof Error&&e)r.error=f,c=await e(f,r),l=!0;else throw f}else r.finalized===!1&&n&&(c=await n(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},dn=Symbol(),un=async(t,e=Object.create(null))=>{const{all:n=!1,dot:r=!1}=e,i=(t instanceof Pt?t.raw.headers:t.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?pn(t,{all:n,dot:r}):{}};async function pn(t,e){const n=await t.formData();return n?hn(n,e):{}}function hn(t,e){const n=Object.create(null);return t.forEach((r,s)=>{e.all||s.endsWith("[]")?fn(n,s,r):n[s]=r}),e.dot&&Object.entries(n).forEach(([r,s])=>{r.includes(".")&&(mn(n,r,s),delete n[r])}),n}var fn=(t,e,n)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(n):t[e]=[t[e],n]:e.endsWith("[]")?t[e]=[n]:t[e]=n},mn=(t,e,n)=>{let r=t;const s=e.split(".");s.forEach((i,a)=>{a===s.length-1?r[i]=n:((!r[i]||typeof r[i]!="object"||Array.isArray(r[i])||r[i]instanceof File)&&(r[i]=Object.create(null)),r=r[i])})},Rt=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},gn=t=>{const{groups:e,path:n}=xn(t),r=Rt(n);return bn(r,e)},xn=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(n,r)=>{const s=`@${r}`;return e.push([s,n]),s}),{groups:e,path:t}},bn=(t,e)=>{for(let n=e.length-1;n>=0;n--){const[r]=e[n];for(let s=t.length-1;s>=0;s--)if(t[s].includes(r)){t[s]=t[s].replace(r,e[n][1]);break}}return t},qe={},vn=(t,e)=>{if(t==="*")return"*";const n=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const r=`${t}#${e}`;return qe[r]||(n[2]?qe[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,n[1],new RegExp(`^${n[2]}(?=/${e})`)]:[t,n[1],new RegExp(`^${n[2]}$`)]:qe[r]=[t,n[1],!0]),qe[r]}return null},it=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return e(n)}catch{return n}})}},yn=t=>it(t,decodeURI),Mt=t=>{const e=t.url,n=e.indexOf("/",e.indexOf(":")+4);let r=n;for(;r<e.length;r++){const s=e.charCodeAt(r);if(s===37){const i=e.indexOf("?",r),a=e.slice(n,i===-1?void 0:i);return yn(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(s===63)break}return e.slice(n,r)},wn=t=>{const e=Mt(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},ve=(t,e,...n)=>(n.length&&(e=ve(e,...n)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),It=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),n=[];let r="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){n.length===0&&r===""?n.push("/"):n.push(r);const i=s.replace("?","");r+="/"+i,n.push(r)}else r+="/"+s}),n.filter((s,i,a)=>a.indexOf(s)===i)},et=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?it(t,$t):t):t,jt=(t,e,n)=>{let r;if(!n&&e&&!/[%+]/.test(e)){let a=t.indexOf("?",8);if(a===-1)return;for(t.startsWith(e,a+1)||(a=t.indexOf(`&${e}`,a+1));a!==-1;){const o=t.charCodeAt(a+e.length+1);if(o===61){const c=a+e.length+2,l=t.indexOf("&",c);return et(t.slice(c,l===-1?void 0:l))}else if(o==38||isNaN(o))return"";a=t.indexOf(`&${e}`,a+1)}if(r=/[%+]/.test(t),!r)return}const s={};r??(r=/[%+]/.test(t));let i=t.indexOf("?",8);for(;i!==-1;){const a=t.indexOf("&",i+1);let o=t.indexOf("=",i);o>a&&a!==-1&&(o=-1);let c=t.slice(i+1,o===-1?a===-1?void 0:a:o);if(r&&(c=et(c)),i=a,c==="")continue;let l;o===-1?l="":(l=t.slice(o+1,a===-1?void 0:a),r&&(l=et(l))),n?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(l)):s[c]??(s[c]=l)}return e?s[e]:s},En=jt,Sn=(t,e)=>jt(t,e,!0),$t=decodeURIComponent,dt=t=>it(t,$t),Ee,F,ee,Dt,Bt,st,te,At,Pt=(At=class{constructor(t,e="/",n=[[]]){T(this,ee);w(this,"raw");T(this,Ee);T(this,F);w(this,"routeIndex",0);w(this,"path");w(this,"bodyCache",{});T(this,te,t=>{const{bodyCache:e,raw:n}=this,r=e[t];if(r)return r;const s=Object.keys(e)[0];return s?e[s].then(i=>(s==="json"&&(i=JSON.stringify(i)),new Response(i)[t]())):e[t]=n[t]()});this.raw=t,this.path=e,y(this,F,n),y(this,Ee,{})}param(t){return t?O(this,ee,Dt).call(this,t):O(this,ee,Bt).call(this)}query(t){return En(this.url,t)}queries(t){return Sn(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((n,r)=>{e[r]=n}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await un(this,t))}json(){return d(this,te).call(this,"text").then(t=>JSON.parse(t))}text(){return d(this,te).call(this,"text")}arrayBuffer(){return d(this,te).call(this,"arrayBuffer")}blob(){return d(this,te).call(this,"blob")}formData(){return d(this,te).call(this,"formData")}addValidatedData(t,e){d(this,Ee)[t]=e}valid(t){return d(this,Ee)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[dn](){return d(this,F)}get matchedRoutes(){return d(this,F)[0].map(([[,t]])=>t)}get routePath(){return d(this,F)[0].map(([[,t]])=>t)[this.routeIndex].path}},Ee=new WeakMap,F=new WeakMap,ee=new WeakSet,Dt=function(t){const e=d(this,F)[0][this.routeIndex][1][t],n=O(this,ee,st).call(this,e);return n&&/\%/.test(n)?dt(n):n},Bt=function(){const t={},e=Object.keys(d(this,F)[0][this.routeIndex][1]);for(const n of e){const r=O(this,ee,st).call(this,d(this,F)[0][this.routeIndex][1][n]);r!==void 0&&(t[n]=/\%/.test(r)?dt(r):r)}return t},st=function(t){return d(this,F)[1]?d(this,F)[1][t]:t},te=new WeakMap,At),Tn={Stringify:1},Lt=async(t,e,n,r,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const i=t.callbacks;return i!=null&&i.length?(s?s[0]+=t:s=[t],Promise.all(i.map(o=>o({phase:e,buffer:s,context:r}))).then(o=>Promise.all(o.filter(Boolean).map(c=>Lt(c,e,!1,r,s))).then(()=>s[0]))):Promise.resolve(t)},An="text/plain; charset=UTF-8",tt=(t,e)=>({"Content-Type":t,...e}),je,$e,X,Se,W,z,Pe,Te,Ae,pe,De,Be,ne,ye,Ct,Cn=(Ct=class{constructor(t,e){T(this,ne);T(this,je);T(this,$e);w(this,"env",{});T(this,X);w(this,"finalized",!1);w(this,"error");T(this,Se);T(this,W);T(this,z);T(this,Pe);T(this,Te);T(this,Ae);T(this,pe);T(this,De);T(this,Be);w(this,"render",(...t)=>(d(this,Te)??y(this,Te,e=>this.html(e)),d(this,Te).call(this,...t)));w(this,"setLayout",t=>y(this,Pe,t));w(this,"getLayout",()=>d(this,Pe));w(this,"setRenderer",t=>{y(this,Te,t)});w(this,"header",(t,e,n)=>{this.finalized&&y(this,z,new Response(d(this,z).body,d(this,z)));const r=d(this,z)?d(this,z).headers:d(this,pe)??y(this,pe,new Headers);e===void 0?r.delete(t):n!=null&&n.append?r.append(t,e):r.set(t,e)});w(this,"status",t=>{y(this,Se,t)});w(this,"set",(t,e)=>{d(this,X)??y(this,X,new Map),d(this,X).set(t,e)});w(this,"get",t=>d(this,X)?d(this,X).get(t):void 0);w(this,"newResponse",(...t)=>O(this,ne,ye).call(this,...t));w(this,"body",(t,e,n)=>O(this,ne,ye).call(this,t,e,n));w(this,"text",(t,e,n)=>!d(this,pe)&&!d(this,Se)&&!e&&!n&&!this.finalized?new Response(t):O(this,ne,ye).call(this,t,e,tt(An,n)));w(this,"json",(t,e,n)=>O(this,ne,ye).call(this,JSON.stringify(t),e,tt("application/json",n)));w(this,"html",(t,e,n)=>{const r=s=>O(this,ne,ye).call(this,s,e,tt("text/html; charset=UTF-8",n));return typeof t=="object"?Lt(t,Tn.Stringify,!1,{}).then(r):r(t)});w(this,"redirect",(t,e)=>{const n=String(t);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,e??302)});w(this,"notFound",()=>(d(this,Ae)??y(this,Ae,()=>new Response),d(this,Ae).call(this,this)));y(this,je,t),e&&(y(this,W,e.executionCtx),this.env=e.env,y(this,Ae,e.notFoundHandler),y(this,Be,e.path),y(this,De,e.matchResult))}get req(){return d(this,$e)??y(this,$e,new Pt(d(this,je),d(this,Be),d(this,De))),d(this,$e)}get event(){if(d(this,W)&&"respondWith"in d(this,W))return d(this,W);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,W))return d(this,W);throw Error("This context has no ExecutionContext")}get res(){return d(this,z)||y(this,z,new Response(null,{headers:d(this,pe)??y(this,pe,new Headers)}))}set res(t){if(d(this,z)&&t){t=new Response(t.body,t);for(const[e,n]of d(this,z).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=d(this,z).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of r)t.headers.append("set-cookie",s)}else t.headers.set(e,n)}y(this,z,t),this.finalized=!0}get var(){return d(this,X)?Object.fromEntries(d(this,X)):{}}},je=new WeakMap,$e=new WeakMap,X=new WeakMap,Se=new WeakMap,W=new WeakMap,z=new WeakMap,Pe=new WeakMap,Te=new WeakMap,Ae=new WeakMap,pe=new WeakMap,De=new WeakMap,Be=new WeakMap,ne=new WeakSet,ye=function(t,e,n){const r=d(this,z)?new Headers(d(this,z).headers):d(this,pe)??new Headers;if(typeof e=="object"&&"headers"in e){const i=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[a,o]of i)a.toLowerCase()==="set-cookie"?r.append(a,o):r.set(a,o)}if(n)for(const[i,a]of Object.entries(n))if(typeof a=="string")r.set(i,a);else{r.delete(i);for(const o of a)r.append(i,o)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??d(this,Se);return new Response(t,{status:s,headers:r})},Ct),I="ALL",_n="all",On=["get","post","put","delete","options","patch"],Ht="Can not add a route since the matcher is already built.",qt=class extends Error{},Nn="__COMPOSED_HANDLER",kn=t=>t.text("404 Not Found",404),ut=(t,e)=>{if("getResponse"in t){const n=t.getResponse();return e.newResponse(n.body,n)}return console.error(t),e.text("Internal Server Error",500)},G,j,zt,U,de,Fe,Ge,Ce,Rn=(Ce=class{constructor(e={}){T(this,j);w(this,"get");w(this,"post");w(this,"put");w(this,"delete");w(this,"options");w(this,"patch");w(this,"all");w(this,"on");w(this,"use");w(this,"router");w(this,"getPath");w(this,"_basePath","/");T(this,G,"/");w(this,"routes",[]);T(this,U,kn);w(this,"errorHandler",ut);w(this,"onError",e=>(this.errorHandler=e,this));w(this,"notFound",e=>(y(this,U,e),this));w(this,"fetch",(e,...n)=>O(this,j,Ge).call(this,e,n[1],n[0],e.method));w(this,"request",(e,n,r,s)=>e instanceof Request?this.fetch(n?new Request(e,n):e,r,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${ve("/",e)}`,n),r,s)));w(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(O(this,j,Ge).call(this,e.request,e,void 0,e.request.method))})});[...On,_n].forEach(i=>{this[i]=(a,...o)=>(typeof a=="string"?y(this,G,a):O(this,j,de).call(this,i,d(this,G),a),o.forEach(c=>{O(this,j,de).call(this,i,d(this,G),c)}),this)}),this.on=(i,a,...o)=>{for(const c of[a].flat()){y(this,G,c);for(const l of[i].flat())o.map(u=>{O(this,j,de).call(this,l.toUpperCase(),d(this,G),u)})}return this},this.use=(i,...a)=>(typeof i=="string"?y(this,G,i):(y(this,G,"*"),a.unshift(i)),a.forEach(o=>{O(this,j,de).call(this,I,d(this,G),o)}),this);const{strict:r,...s}=e;Object.assign(this,s),this.getPath=r??!0?e.getPath??Mt:wn}route(e,n){const r=this.basePath(e);return n.routes.map(s=>{var a;let i;n.errorHandler===ut?i=s.handler:(i=async(o,c)=>(await lt([],n.errorHandler)(o,()=>s.handler(o,c))).res,i[Nn]=s.handler),O(a=r,j,de).call(a,s.method,s.path,i)}),this}basePath(e){const n=O(this,j,zt).call(this);return n._basePath=ve(this._basePath,e),n}mount(e,n,r){let s,i;r&&(typeof r=="function"?i=r:(i=r.optionHandler,r.replaceRequest===!1?s=c=>c:s=r.replaceRequest));const a=i?c=>{const l=i(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};s||(s=(()=>{const c=ve(this._basePath,e),l=c==="/"?0:c.length;return u=>{const f=new URL(u.url);return f.pathname=f.pathname.slice(l)||"/",new Request(f,u)}})());const o=async(c,l)=>{const u=await n(s(c.req.raw),...a(c));if(u)return u;await l()};return O(this,j,de).call(this,I,ve(e,"*"),o),this}},G=new WeakMap,j=new WeakSet,zt=function(){const e=new Ce({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,y(e,U,d(this,U)),e.routes=this.routes,e},U=new WeakMap,de=function(e,n,r){e=e.toUpperCase(),n=ve(this._basePath,n);const s={basePath:this._basePath,path:n,method:e,handler:r};this.router.add(e,n,[r,s]),this.routes.push(s)},Fe=function(e,n){if(e instanceof Error)return this.errorHandler(e,n);throw e},Ge=function(e,n,r,s){if(s==="HEAD")return(async()=>new Response(null,await O(this,j,Ge).call(this,e,n,r,"GET")))();const i=this.getPath(e,{env:r}),a=this.router.match(s,i),o=new Cn(e,{path:i,matchResult:a,env:r,executionCtx:n,notFoundHandler:d(this,U)});if(a[0].length===1){let l;try{l=a[0][0][0][0](o,async()=>{o.res=await d(this,U).call(this,o)})}catch(u){return O(this,j,Fe).call(this,u,o)}return l instanceof Promise?l.then(u=>u||(o.finalized?o.res:d(this,U).call(this,o))).catch(u=>O(this,j,Fe).call(this,u,o)):l??d(this,U).call(this,o)}const c=lt(a[0],this.errorHandler,d(this,U));return(async()=>{try{const l=await c(o);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return O(this,j,Fe).call(this,l,o)}})()},Ce),Ft=[];function Mn(t,e){const n=this.buildAllMatchers(),r=(s,i)=>{const a=n[s]||n[I],o=a[2][i];if(o)return o;const c=i.match(a[0]);if(!c)return[[],Ft];const l=c.indexOf("",1);return[a[1][l],c]};return this.match=r,r(t,e)}var Je="[^/]+",Me=".*",Ie="(?:|/.*)",we=Symbol(),In=new Set(".\\+*[^]$()");function jn(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===Me||t===Ie?1:e===Me||e===Ie?-1:t===Je?1:e===Je?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var he,fe,K,xe,$n=(xe=class{constructor(){T(this,he);T(this,fe);T(this,K,Object.create(null))}insert(e,n,r,s,i){if(e.length===0){if(d(this,he)!==void 0)throw we;if(i)return;y(this,he,n);return}const[a,...o]=e,c=a==="*"?o.length===0?["","",Me]:["","",Je]:a==="/*"?["","",Ie]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let f=c[2]||Je;if(u&&c[2]&&(f===".*"||(f=f.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(f))))throw we;if(l=d(this,K)[f],!l){if(Object.keys(d(this,K)).some(x=>x!==Me&&x!==Ie))throw we;if(i)return;l=d(this,K)[f]=new xe,u!==""&&y(l,fe,s.varIndex++)}!i&&u!==""&&r.push([u,d(l,fe)])}else if(l=d(this,K)[a],!l){if(Object.keys(d(this,K)).some(u=>u.length>1&&u!==Me&&u!==Ie))throw we;if(i)return;l=d(this,K)[a]=new xe}l.insert(o,n,r,s,i)}buildRegExpStr(){const n=Object.keys(d(this,K)).sort(jn).map(r=>{const s=d(this,K)[r];return(typeof d(s,fe)=="number"?`(${r})@${d(s,fe)}`:In.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof d(this,he)=="number"&&n.unshift(`#${d(this,he)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},he=new WeakMap,fe=new WeakMap,K=new WeakMap,xe),Ve,Le,_t,Pn=(_t=class{constructor(){T(this,Ve,{varIndex:0});T(this,Le,new $n)}insert(t,e,n){const r=[],s=[];for(let a=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const l=`@\\${a}`;return s[a]=[l,c],a++,o=!0,l}),!o)break}const i=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=s.length-1;a>=0;a--){const[o]=s[a];for(let c=i.length-1;c>=0;c--)if(i[c].indexOf(o)!==-1){i[c]=i[c].replace(o,s[a][1]);break}}return d(this,Le).insert(i,e,r,d(this,Ve),n),r}buildRegExp(){let t=d(this,Le).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const n=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,i,a)=>i!==void 0?(n[++e]=Number(i),"$()"):(a!==void 0&&(r[Number(a)]=++e),"")),[new RegExp(`^${t}`),n,r]}},Ve=new WeakMap,Le=new WeakMap,_t),Dn=[/^$/,[],Object.create(null)],Ue=Object.create(null);function Gt(t){return Ue[t]??(Ue[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function Bn(){Ue=Object.create(null)}function Ln(t){var l;const e=new Pn,n=[];if(t.length===0)return Dn;const r=t.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,f],[x,v])=>u?1:x?-1:f.length-v.length),s=Object.create(null);for(let u=0,f=-1,x=r.length;u<x;u++){const[v,A,C]=r[u];v?s[A]=[C.map(([N])=>[N,Object.create(null)]),Ft]:f++;let S;try{S=e.insert(A,f,v)}catch(N){throw N===we?new qt(A):N}v||(n[f]=C.map(([N,H])=>{const B=Object.create(null);for(H-=1;H>=0;H--){const[q,k]=S[H];B[q]=k}return[N,B]}))}const[i,a,o]=e.buildRegExp();for(let u=0,f=n.length;u<f;u++)for(let x=0,v=n[u].length;x<v;x++){const A=(l=n[u][x])==null?void 0:l[1];if(!A)continue;const C=Object.keys(A);for(let S=0,N=C.length;S<N;S++)A[C[S]]=o[A[C[S]]]}const c=[];for(const u in a)c[u]=n[a[u]];return[i,c,s]}function be(t,e){if(t){for(const n of Object.keys(t).sort((r,s)=>s.length-r.length))if(Gt(n).test(e))return[...t[n]]}}var re,se,Ye,Ut,Ot,Hn=(Ot=class{constructor(){T(this,Ye);w(this,"name","RegExpRouter");T(this,re);T(this,se);w(this,"match",Mn);y(this,re,{[I]:Object.create(null)}),y(this,se,{[I]:Object.create(null)})}add(t,e,n){var o;const r=d(this,re),s=d(this,se);if(!r||!s)throw new Error(Ht);r[t]||[r,s].forEach(c=>{c[t]=Object.create(null),Object.keys(c[I]).forEach(l=>{c[t][l]=[...c[I][l]]})}),e==="/*"&&(e="*");const i=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const c=Gt(e);t===I?Object.keys(r).forEach(l=>{var u;(u=r[l])[e]||(u[e]=be(r[l],e)||be(r[I],e)||[])}):(o=r[t])[e]||(o[e]=be(r[t],e)||be(r[I],e)||[]),Object.keys(r).forEach(l=>{(t===I||t===l)&&Object.keys(r[l]).forEach(u=>{c.test(u)&&r[l][u].push([n,i])})}),Object.keys(s).forEach(l=>{(t===I||t===l)&&Object.keys(s[l]).forEach(u=>c.test(u)&&s[l][u].push([n,i]))});return}const a=It(e)||[e];for(let c=0,l=a.length;c<l;c++){const u=a[c];Object.keys(s).forEach(f=>{var x;(t===I||t===f)&&((x=s[f])[u]||(x[u]=[...be(r[f],u)||be(r[I],u)||[]]),s[f][u].push([n,i-l+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(d(this,se)).concat(Object.keys(d(this,re))).forEach(e=>{t[e]||(t[e]=O(this,Ye,Ut).call(this,e))}),y(this,re,y(this,se,void 0)),Bn(),t}},re=new WeakMap,se=new WeakMap,Ye=new WeakSet,Ut=function(t){const e=[];let n=t===I;return[d(this,re),d(this,se)].forEach(r=>{const s=r[t]?Object.keys(r[t]).map(i=>[i,r[t][i]]):[];s.length!==0?(n||(n=!0),e.push(...s)):t!==I&&e.push(...Object.keys(r[I]).map(i=>[i,r[I][i]]))}),n?Ln(e):null},Ot),ie,Q,Nt,qn=(Nt=class{constructor(t){w(this,"name","SmartRouter");T(this,ie,[]);T(this,Q,[]);y(this,ie,t.routers)}add(t,e,n){if(!d(this,Q))throw new Error(Ht);d(this,Q).push([t,e,n])}match(t,e){if(!d(this,Q))throw new Error("Fatal error");const n=d(this,ie),r=d(this,Q),s=n.length;let i=0,a;for(;i<s;i++){const o=n[i];try{for(let c=0,l=r.length;c<l;c++)o.add(...r[c]);a=o.match(t,e)}catch(c){if(c instanceof qt)continue;throw c}this.match=o.match.bind(o),y(this,ie,[o]),y(this,Q,void 0);break}if(i===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(d(this,Q)||d(this,ie).length!==1)throw new Error("No active router has been determined yet.");return d(this,ie)[0]}},ie=new WeakMap,Q=new WeakMap,Nt),ke=Object.create(null),ae,L,me,_e,D,Z,ue,Oe,zn=(Oe=class{constructor(e,n,r){T(this,Z);T(this,ae);T(this,L);T(this,me);T(this,_e,0);T(this,D,ke);if(y(this,L,r||Object.create(null)),y(this,ae,[]),e&&n){const s=Object.create(null);s[e]={handler:n,possibleKeys:[],score:0},y(this,ae,[s])}y(this,me,[])}insert(e,n,r){y(this,_e,++ct(this,_e)._);let s=this;const i=gn(n),a=[];for(let o=0,c=i.length;o<c;o++){const l=i[o],u=i[o+1],f=vn(l,u),x=Array.isArray(f)?f[0]:l;if(x in d(s,L)){s=d(s,L)[x],f&&a.push(f[1]);continue}d(s,L)[x]=new Oe,f&&(d(s,me).push(f),a.push(f[1])),s=d(s,L)[x]}return d(s,ae).push({[e]:{handler:r,possibleKeys:a.filter((o,c,l)=>l.indexOf(o)===c),score:d(this,_e)}}),s}search(e,n){var c;const r=[];y(this,D,ke);let i=[this];const a=Rt(n),o=[];for(let l=0,u=a.length;l<u;l++){const f=a[l],x=l===u-1,v=[];for(let A=0,C=i.length;A<C;A++){const S=i[A],N=d(S,L)[f];N&&(y(N,D,d(S,D)),x?(d(N,L)["*"]&&r.push(...O(this,Z,ue).call(this,d(N,L)["*"],e,d(S,D))),r.push(...O(this,Z,ue).call(this,N,e,d(S,D)))):v.push(N));for(let H=0,B=d(S,me).length;H<B;H++){const q=d(S,me)[H],k=d(S,D)===ke?{}:{...d(S,D)};if(q==="*"){const b=d(S,L)["*"];b&&(r.push(...O(this,Z,ue).call(this,b,e,d(S,D))),y(b,D,k),v.push(b));continue}const[R,E,h]=q;if(!f&&!(h instanceof RegExp))continue;const p=d(S,L)[R],g=a.slice(l).join("/");if(h instanceof RegExp){const b=h.exec(g);if(b){if(k[E]=b[0],r.push(...O(this,Z,ue).call(this,p,e,d(S,D),k)),Object.keys(d(p,L)).length){y(p,D,k);const m=((c=b[0].match(/\//))==null?void 0:c.length)??0;(o[m]||(o[m]=[])).push(p)}continue}}(h===!0||h.test(f))&&(k[E]=f,x?(r.push(...O(this,Z,ue).call(this,p,e,k,d(S,D))),d(p,L)["*"]&&r.push(...O(this,Z,ue).call(this,d(p,L)["*"],e,k,d(S,D)))):(y(p,D,k),v.push(p)))}}i=v.concat(o.shift()??[])}return r.length>1&&r.sort((l,u)=>l.score-u.score),[r.map(({handler:l,params:u})=>[l,u])]}},ae=new WeakMap,L=new WeakMap,me=new WeakMap,_e=new WeakMap,D=new WeakMap,Z=new WeakSet,ue=function(e,n,r,s){const i=[];for(let a=0,o=d(e,ae).length;a<o;a++){const c=d(e,ae)[a],l=c[n]||c[I],u={};if(l!==void 0&&(l.params=Object.create(null),i.push(l),r!==ke||s&&s!==ke))for(let f=0,x=l.possibleKeys.length;f<x;f++){const v=l.possibleKeys[f],A=u[l.score];l.params[v]=s!=null&&s[v]&&!A?s[v]:r[v]??(s==null?void 0:s[v]),u[l.score]=!0}}return i},Oe),ge,kt,Fn=(kt=class{constructor(){w(this,"name","TrieRouter");T(this,ge);y(this,ge,new zn)}add(t,e,n){const r=It(e);if(r){for(let s=0,i=r.length;s<i;s++)d(this,ge).insert(t,r[s],n);return}d(this,ge).insert(t,e,n)}match(t,e){return d(this,ge).search(t,e)}},ge=new WeakMap,kt),Kt=class extends Rn{constructor(t={}){super(t),this.router=t.router??new qn({routers:[new Hn,new Fn]})}},Gn=t=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(n.origin),s=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(n.allowMethods);return async function(a,o){var u;function c(f,x){a.res.headers.set(f,x)}const l=await r(a.req.header("origin")||"",a);if(l&&c("Access-Control-Allow-Origin",l),n.credentials&&c("Access-Control-Allow-Credentials","true"),(u=n.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),a.req.method==="OPTIONS"){n.origin!=="*"&&c("Vary","Origin"),n.maxAge!=null&&c("Access-Control-Max-Age",n.maxAge.toString());const f=await s(a.req.header("origin")||"",a);f.length&&c("Access-Control-Allow-Methods",f.join(","));let x=n.allowHeaders;if(!(x!=null&&x.length)){const v=a.req.header("Access-Control-Request-Headers");v&&(x=v.split(/\s*,\s*/))}return x!=null&&x.length&&(c("Access-Control-Allow-Headers",x.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await o(),n.origin!=="*"&&a.header("Vary","Origin",{append:!0})}},Un=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,pt=(t,e=Jn)=>{const n=/\.([a-zA-Z0-9]+?)$/,r=t.match(n);if(!r)return;let s=e[r[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},Kn={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Jn=Kn,Vn=(...t)=>{let e=t.filter(s=>s!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const n=e.split("/"),r=[];for(const s of n)s===".."&&r.length>0&&r.at(-1)!==".."?r.pop():s!=="."&&r.push(s);return r.join("/")||"."},Jt={br:".br",zstd:".zst",gzip:".gz"},Yn=Object.keys(Jt),Xn="index.html",Wn=t=>{const e=t.root??"./",n=t.path,r=t.join??Vn;return async(s,i)=>{var u,f,x,v;if(s.finalized)return i();let a;if(t.path)a=t.path;else try{if(a=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((u=t.onNotFound)==null?void 0:u.call(t,s.req.path,s)),i()}let o=r(e,!n&&t.rewriteRequestPath?t.rewriteRequestPath(a):a);t.isDir&&await t.isDir(o)&&(o=r(o,Xn));const c=t.getContent;let l=await c(o,s);if(l instanceof Response)return s.newResponse(l.body,l);if(l){const A=t.mimes&&pt(o,t.mimes)||pt(o);if(s.header("Content-Type",A||"application/octet-stream"),t.precompressed&&(!A||Un.test(A))){const C=new Set((f=s.req.header("Accept-Encoding"))==null?void 0:f.split(",").map(S=>S.trim()));for(const S of Yn){if(!C.has(S))continue;const N=await c(o+Jt[S],s);if(N){l=N,s.header("Content-Encoding",S),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((x=t.onFound)==null?void 0:x.call(t,o,s)),s.body(l)}await((v=t.onNotFound)==null?void 0:v.call(t,o,s)),await i()}},Qn=async(t,e)=>{let n;e&&e.manifest?typeof e.manifest=="string"?n=JSON.parse(e.manifest):n=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?n=JSON.parse(__STATIC_CONTENT_MANIFEST):n=__STATIC_CONTENT_MANIFEST;let r;e&&e.namespace?r=e.namespace:r=__STATIC_CONTENT;const s=n[t];if(!s)return null;const i=await r.get(s,{type:"stream"});return i||null},Zn=t=>async function(n,r){return Wn({...t,getContent:async i=>Qn(i,{manifest:t.manifest,namespace:t.namespace?t.namespace:n.env?n.env.__STATIC_CONTENT:void 0})})(n,r)},er=t=>Zn(t);const J=new Kt,Ke=new Map,tr=1e3*60*60*24*7;let nt=!1;function Vt(){return new Date().toISOString()}function P(t){return t==null?"":String(t)}function nr(t){return(t||"").replace(/\s+/g,"")}function Yt(t){return nr(t).length}function rr(t){return(t||"").replace(/-\s*[ivxIVX]+-\s*/gi,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[p\.\s*\d+\]/gi,"").replace(/p\.\s*\d+/gi,"").replace(/\n+/g," ").replace(/\s{2,}/g," ").trim()}function sr(t){if(!t)return"";let e=String(t);return e=e.replace(/\uFEFF/g,"").replace(/[\u200B-\u200D\u2060]/g,"").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g," "),e=e.replace(/(?:^|\n)\s*[-–—]?\s*\d{1,4}\s*[-–—]?\s*(?=\n|$)/g,`
`),e=e.replace(/([A-Za-z])-\s*\n\s*([A-Za-z])/g,"$1$2"),e=e.replace(/([가-힣0-9])\s*\n\s*([가-힣0-9])/g,"$1$2"),e=e.replace(/\n{3,}/g,`

`),e=e.replace(/[ \t]{2,}/g," "),e=e.replace(/[「『]/g,'"').replace(/[」』]/g,'"'),e=e.replace(/[〈《]/g,'"').replace(/[〉》]/g,'"'),e=e.replace(/\s+([,.;:!?])/g,"$1").replace(/([,.;:!?])\s+/g,"$1 "),e.trim()}function ht(t){const e=(t||"").trim();if(!e)return[];const n=e.split(/\n{2,}/g),r=[];for(const s of n){const i=s.replace(/\n/g," ").replace(/[ \t]{2,}/g," ").trim();if(!i)continue;const a=i.split(new RegExp("(?<=[다요임함]\\.|[다요임함]\\?|[다요임함]!|[.?!])\\s+","g"));for(let o of a)o=o.trim(),o&&r.push(o)}return r}function ir(t){const e=(t||"").trim();return!!(!e||e.length<12&&!(/[.?!]$/.test(e)||/(?:이다|된다|한다|있다|없다|말한다|주장한다)\.?$/.test(e))||/[-–—]\s*\d{1,4}\s*[-–—]/.test(e)||/^["")\]\}]+$/.test(e)||/^["(\[\{]+$/.test(e)||/^(?:\(\d+\)|\d+\)|[①-⑳])\s*["")\]]*\s*$/.test(e)||/(완전\s*정복|쏙쏙|콕콕|실력을\s*쑥쑥|고득점|전문\s*대비반|특강|홍보)/.test(e)&&(/[""]/.test(e)||/!$/.test(e))||(e.match(/["""'(){}\[\]<>]/g)||[]).length>=10&&e.length<80)}function ar(t){const e=[],n=new Set;for(const r of t){const s=r.trim();if(ir(s))continue;const i=s.replace(/\s+/g," ");n.has(i)||(n.add(i),e.push(i))}return e}function or(t){const e=sr(t),n=ar(ht(e)),r=n.length>=3?n:ht(e);return{text:e,sentences:r}}function Xt(t){const e=P(t).trim().toLowerCase();return e?e==="brief"||e==="simple"||e==="short"||e==="lite"?"brief":e==="detail"||e==="detailed"||e==="full"?"detail":"standard":"standard"}function Wt(t){const e=P(t).trim().toLowerCase();return e?e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"||e==="mind_map"?"mindmap":"narrative":"narrative"}function cr(t){const e=P(t).trim().toLowerCase();return e==="concept"?"concept":e==="exam"?"exam":"summary"}function lr(t){let e=P(t).replace(/\s+/g," ").trim();if(!e)return[];e=e.replace(/[\u201C\u201D\u2033\u00AB\u00BB]/g,'"').replace(/[\u2018\u2019\u2032]/g,"'");const n=[];let r="",s=null,i=0;const a=()=>{const o=r.trim();o&&n.push(o),r=""};for(let o=0;o<e.length;o++){const c=e[o],l=e[o+1]||"",u=e[o+2]||"";if(c==="("&&i++,c===")"&&(i=Math.max(0,i-1)),(c==='"'||c==="'")&&s===null?s=c:s&&c===s&&(s=null),r+=c,s===null&&i===0&&/[.!?]/.test(c)){l===" "&&(a(),o++);continue}if(s===null&&i===0&&l===" "){const x=r.trimEnd().slice(-1),v=/[가-힣A-Za-z0-9"'(\[]/.test(u);(x==="다"||x==="요"||x==="죠")&&v&&(a(),o++)}}return a(),n.length?n:[e]}const Xe={narrative:{brief:4,standard:6,detail:9},structured:{brief:3,standard:5,detail:8},mindmap:{brief:4,standard:6,detail:10},selftest:{brief:3,standard:5,detail:8}};function dr(t){const e=String(t||"").trim().toLowerCase();return e==="brief"||e==="standard"||e==="detail"?e:e==="simple"?"brief":"standard"}function ur(t){const e=String(t||"").trim().toLowerCase();return e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"?"mindmap":"narrative"}function pr(t){const e=String(t||"").trim(),n=e.indexOf("{"),r=e.lastIndexOf("}");return n>=0&&r>n?e.slice(n,r+1):e}function ft(t){const e=pr(t);try{return JSON.parse(e)}catch{}const n=e.replace(/,\s*}/g,"}").replace(/,\s*]/g,"]").replace(/\u0000/g,"");try{return JSON.parse(n)}catch{}return null}function hr(t){return["당신은 초·중·고 학생의 '학습 단위' 기준으로 내용을 구조화하는 전문가입니다.","절대 규칙:","- 원문에 없는 내용 생성 금지(추측/과장 금지)","- 문자 단순 자르기 금지, 의미 단위로 재구성","- 반드시 JSON만 출력(설명문/머리말/꼬리말/코드블록 금지)","","구조화의 뼈대(반드시 포함):","- anchor: 핵심 주장 1문장","- sections: 학습 단위 조목화, 각 section은 keywords/lvl25/explain 포함","- glossary: term/def로 구성","- links: anchor(A0) -> section 연결","","출력 스키마:","{",'  "anchor": "핵심 주장 1문장",','  "hierarchy": { "big": "대단원", "mid": "중단원", "small": "소단원", "subtitles": ["소제목"] },','  "sections": [','    { "id": "S1", "title": "섹션 제목", "keywords": ["핵심어"], "lvl25": ["의미키워드"], "explain": "1~3문장 설명" }',"  ],",'  "glossary": [ { "term": "용어", "def": "정의" } ],','  "links": [ { "from": "A0", "to": "S1", "rel": "covers" } ]',"}","",`원문(공백제외 ${Yt(t)}자):`,t].join(`
`)}function fr(t,e){const n=Yt(t),r=(e==null?void 0:e.anchor)||"",s=((e==null?void 0:e.sections)||[]).map(i=>i.title).slice(0,10);return["당신은 초·중·고 학생의 시험/이해/기억을 위한 서술형 요약 전문가입니다.","절대 규칙:","- 원문에 없는 내용 생성 금지","- 반드시 JSON만 출력(설명문/코드블록 금지)",'- 아래 "구조화 뼈대"를 벗어나지 말고, 그 내용을 자연스러운 문장으로 연결해 서술하세요.',"","구조화 뼈대:",`- anchor: ${r}`,`- sections: ${JSON.stringify(s)}`,"","요구:","- summary는 6~10문장(상세)","- keyPoints 4~7개, examHints 2~4개","","출력 스키마:","{",'  "title": "요약 제목",','  "summary": "자연스러운 문장 요약(6~10문장)",','  "keyPoints": ["핵심포인트"],','  "examHints": ["시험포인트"]',"}","",`원문(공백제외 ${n}자):`,t].join(`
`)}function mr(t){const e=(t==null?void 0:t.anchor)||"",n=((t==null?void 0:t.sections)||[]).map(s=>({id:s.id,title:s.title,keywords:s.keywords.slice(0,5)})),r=((t==null?void 0:t.glossary)||[]).slice(0,20);return["당신은 학습용 마인드맵 JSON을 만드는 전문가입니다.","절대 규칙:","- 반드시 JSON만 출력","- 노드 id 중복/누락 금지, edge 참조 일관","- 아래 구조화 정보를 그대로 바탕으로 구성(새 내용 생성 금지)","","구조화 입력:",`anchor: ${e}`,`sections: ${JSON.stringify(n)}`,`glossary: ${JSON.stringify(r)}`,"","출력 스키마:","{",'  "center": { "id": "C0", "label": "중심 주제", "type": "root", "note": "짧은 설명" },','  "nodes": [','    { "id": "S1", "label": "섹션", "type": "section", "note": "설명" },','    { "id": "T1", "label": "용어", "type": "term", "note": "정의" }',"  ],",'  "edges": [ { "from": "C0", "to": "S1", "rel": "has" } ]',"}"].join(`
`)}function gr(t){const e=(t==null?void 0:t.anchor)||"",n=((t==null?void 0:t.sections)||[]).map(s=>({id:s.id,title:s.title,keywords:s.keywords.slice(0,6)})),r=((t==null?void 0:t.glossary)||[]).slice(0,25);return["당신은 초·중·고 학생용 셀프테스트를 만드는 전문가입니다.","절대 규칙:","- 반드시 JSON만 출력","- 원문/구조화에 없는 내용 금지","- 문항 id는 q1, q2... 고유","","구조화 입력:",`anchor: ${e}`,`sections: ${JSON.stringify(n)}`,`glossary: ${JSON.stringify(r)}`,"","요구(상세):","- 총 8문항","- type은 reorder/blank/multiple_choice 섞기","","출력 스키마:","{",'  "questions": [','    { "id": "q1", "type": "multiple_choice", "prompt": "질문", "choices": ["a","b","c"], "answer": 1 },','    { "id": "q2", "type": "blank", "prompt": "빈칸", "answer": "정답" },','    { "id": "q3", "type": "reorder", "prompt": "순서", "choices": ["A","B","C"], "answer": [0,2,1] }',"  ]","}"].join(`
`)}function mt(t,e){const n=Xe.structured[e],r=(t.sections||[]).slice(0,n).map(c=>({...c,keywords:(c.keywords||[]).slice(0,e==="brief"?4:6),lvl25:(c.lvl25||[]).slice(0,e==="brief"?2:3),explain:String(c.explain||"").trim()})),s=e==="brief"?8:e==="standard"?14:20,i=(t.glossary||[]).slice(0,s),a=new Set(r.map(c=>c.id)),o=(t.links||[]).filter(c=>c.from==="A0"&&a.has(c.to));return{...t,sections:r,glossary:i,links:o}}function gt(t,e){const n=Xe.mindmap[e],r=(t.nodes||[]).slice(0,Math.max(0,n-1)),s=new Set(["C0",...r.map(a=>a.id)]),i=(t.edges||[]).filter(a=>s.has(a.from)&&s.has(a.to));return{...t,nodes:r,edges:i}}function xt(t,e){const n=Xe.selftest[e];return{questions:(t.questions||[]).slice(0,n)}}function bt(t,e){const n=Xe.narrative[e],i=lr(t.summary||"").slice(0,n).join(" "),a=(t.keyPoints||[]).slice(0,e==="brief"?3:4),o=(t.examHints||[]).slice(0,e==="brief"?2:3);return{...t,summary:i,keyPoints:a,examHints:o}}async function ze(t,e){const n=async()=>{const o=await Zt(t,e);return String(o||"")},r=await n(),s=ft(r);if(s)return s;const i=await n(),a=ft(i);if(a)return a;throw new Error("MODEL_JSON_PARSE_FAILED")}async function xr(t,e){const n=await ze(t,hr(e));if(!(n!=null&&n.anchor)||!Array.isArray(n.sections))throw new Error("STRUCTURED_SCHEMA_INVALID");n.links=n.links||n.sections.map(u=>({from:"A0",to:u.id,rel:"covers"}));const r=await ze(t,fr(e,n));if(!(r!=null&&r.summary))throw new Error("NARRATIVE_SCHEMA_INVALID");const s=await ze(t,mr(n));if(!(s!=null&&s.center)||!Array.isArray(s.nodes)||!Array.isArray(s.edges))throw new Error("MINDMAP_SCHEMA_INVALID");s.center.id||(s.center.id="C0");const i=await ze(t,gr(n));if(!Array.isArray(i.questions))throw new Error("SELFTEST_SCHEMA_INVALID");const a={detail:n,standard:mt(n,"standard"),brief:mt(n,"brief")},o={detail:r,standard:bt(r,"standard"),brief:bt(r,"brief")},c={detail:s,standard:gt(s,"standard"),brief:gt(s,"brief")},l={detail:i,standard:xt(i,"standard"),brief:xt(i,"brief")};return{structured:a,narrative:o,mindmap:c,selftest:l}}function Qt(t){if(!t)return"empty";let e=2166136261,n=0;for(let i=0;i<t.length;i++){const a=t.charCodeAt(i);e^=a,e+=(e<<1)+(e<<4)+(e<<7)+(e<<8)+(e<<24),n=(n<<5)-n+a,n|=0}const r=(e>>>0).toString(16),s=(Math.abs(n)>>>0).toString(16);return`${t.length.toString(16)}_${r}_${s}`}function br(t,e,n,r){const s=Qt(n);return`${t}::${r||"anon"}::${e}::base::${s}`}function vr(t,e,n,r,s){const i=Qt(r);return`${t}::${s||"anon"}::${e}::${n}::${i}`}async function yr(t){if(!nt){if(!t){nt=!0;return}await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),nt=!0}}async function vt(t,e){const n=Date.now(),r=Ke.get(e);if(r&&n-r.createdAt<tr)return{hit:!0,data:r.data,store:"mem"};if(r&&Ke.delete(e),!t)return{hit:!1};const s=await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();if(!(s!=null&&s.response_json))return{hit:!1};try{const i=JSON.parse(s.response_json);return Ke.set(e,{data:i,createdAt:n}),{hit:!0,data:i,store:"d1"}}catch{return{hit:!1}}}async function Re(t,e,n,r){const s=Date.now();Ke.set(e,{data:r,createdAt:s}),t&&await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e,n,JSON.stringify(r),Vt()).run()}function wr(t){const e=t.split(/\n\n+/).filter(r=>r.trim());return{kind:"summary",viewType:"structured",structured:{title:"구조화 요약",bullets:e.length>1?e.map((r,s)=>`- (${s+1}) ${r}`):t.split(/[\.。]\s+/).filter(r=>r.trim()).map((r,s)=>`- (${s+1}) ${r}.`)}}}function Er(t){const e=t.split(/[\.。]\s+/).filter(i=>i.trim()).map(i=>i.trim()),n=(e[0]||"핵심").slice(0,40),r=[{id:"c",label:n,level:0}],s=[];return e.slice(1).forEach((i,a)=>{const o=`n${a+1}`;r.push({id:o,label:i.slice(0,60),level:1}),s.push({from:"c",to:o})}),{kind:"summary",viewType:"mindmap",mindmap:{center:n,nodes:r,edges:s}}}function Sr(t){return{kind:"summary",viewType:"selftest",selftest:{title:"셀프테스트",questions:t.split(/[\.。]\s+/).filter(r=>r.trim()).map(r=>r.trim()).map((r,s)=>({id:`q${s+1}`,type:"short",question:`(${s+1}) 다음 내용을 한 문장으로 설명해보세요: "${r.slice(0,70)}"`,answerHint:r}))}}}async function Tr(t,e){var c,l,u,f,x;const n=P(t.GEMINI_API_KEY).trim();if(!n)throw new Error("GEMINI_API_KEY is missing");const r=P(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",s=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(r)}:generateContent?key=${encodeURIComponent(n)}`,i={contents:[{role:"user",parts:[{text:e}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let a=0,o=500;for(;a<3;){a++;const v=await fetch(s,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(i)});if(v.ok){const C=await v.json();return{ok:!0,text:((x=(f=(u=(l=(c=C==null?void 0:C.candidates)==null?void 0:c[0])==null?void 0:l.content)==null?void 0:u.parts)==null?void 0:f[0])==null?void 0:x.text)??"",raw:C}}if(v.status===429||v.status===503){await new Promise(C=>setTimeout(C,o)),o*=2;continue}const A=await v.text().catch(()=>"");throw new Error(`Gemini error ${v.status}: ${A.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function Ar(t,e,n){var l,u,f,x,v;const r=P(t.GEMINI_API_KEY).trim();if(!r)throw new Error("GEMINI_API_KEY is missing");const s=P(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",i=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`,a={system_instruction:{parts:[{text:e}]},contents:[{role:"user",parts:[{text:n}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let o=0,c=500;for(;o<3;){o++;const A=await fetch(i,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(a)});if(A.ok){const S=await A.json();return((v=(x=(f=(u=(l=S==null?void 0:S.candidates)==null?void 0:l[0])==null?void 0:u.content)==null?void 0:f.parts)==null?void 0:x[0])==null?void 0:v.text)??""}if(A.status===429||A.status===503){await new Promise(S=>setTimeout(S,c)),c*=2;continue}const C=await A.text().catch(()=>"");throw new Error(`Gemini error ${A.status}: ${C.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function Zt(t,e){const n=await Tr(t,e);return typeof n=="string"?n:((n==null?void 0:n.text)??"").toString()}const Cr=(()=>{const e={brief:{min:.1,max:.15},standard:{min:.25,max:.3},detail:{min:.45,max:.55}},n={brief:6,standard:10,detail:14},r=["narrative","structured","mindmap"],s=["preview","exam"];function i(E){return(E||"").replace(/\s+/g,"")}function a(E,h){const g=Math.max(200,i(E||"").length),b=e[h]||e.standard,m=Math.floor(g*b.min),_=Math.ceil(g*b.max);return{base:g,min:Math.max(80,m),max:Math.max(120,_)}}function o(E){const h=(E||"").trim();return h?h.replace(/\r/g,"").split(new RegExp("(?<=[\\.\\?\\!])\\s+|\\n+")).map(g=>g.trim()).filter(Boolean):[]}function c(E){return o(E).map((p,g)=>({sid:`S${g+1}`,text:p}))}function l(E,h,p){const g=E.find(b=>b.sid===h);return!g||!p||typeof p!="string"?!1:g.text.includes(p.trim())}function u(){return["당신은 교육공학 기반 요약·셀프테스트 생성 엔진이다.","추출형 복붙 금지. 반드시 의미 단위로 재구성하라.","가장 중요한 1순위는 문자수(공백 제외) 제한 준수다.","허위 정보(원문/요약에 없는 내용) 생성 금지.","JSON 출력이 요구되면 JSON만 출력하라."].join(`
`)}function f({originalText:E,mode:h,format:p}){const g=a(E,h),b=rr(E),m=p==="narrative"?"서술형: 연결어를 사용해 흐름/인과가 보이도록 1~3문단으로 구성":p==="structured"?"구조화: 상위-하위 위계가 드러나는 조목(가/나/다 또는 ①②③) 형태":"마인드맵: 텍스트로 표현된 노드-관계 목록(중심노드/하위노드/연결라벨) 형태";return["[TASK] 아래 학술 논문을 생성적 요약(Abstractive Summarization) 방식으로 지정된 형식에 맞춰 요약하라.",`- 모드: ${h} (간단/표준/상세)`,`- 형식: ${p} (${m})`,`- 문자수 목표(공백 제외): 최소 ${g.min}자 ~ 최대 ${g.max}자`,"","[🔹 C. 논문형 텍스트 전용 요약 구조 - 반드시 준수]","이 텍스트는 학술 논문입니다.","요약 시 반드시 다음 순서를 유지하세요:","1. 연구 목적 (무엇을 연구했는가?)","2. 연구 설계 및 방법 (어떻게 연구했는가?)","3. 핵심 결과 (무엇을 발견했는가?)","4. 결과 해석 (결과가 의미하는 바는?)","5. 교육적 의의 (실무/교육에 어떤 시사점을 주는가?)","각 단계는 1문단 이상을 넘지 마세요.","","[요약 품질 규칙]","1. 단순 추출/복붙 금지: 원문 문장을 그대로 나열하지 말고 생성적으로 재구성하여 매끄러운 글 작성","2. 텍스트 정제: 페이지 번호(p.XX), 각주, 특수기호, 질문형 문장 제거 → 학술적 평서문으로 전환","3. 스마트 편집: 중복 표현 통합, 전문 용어 일관성 유지, 한 문장 2줄 이내로 단문 위주","4. 퀴즈 연동: 핵심 키워드와 인과관계를 문장 내에 전략적으로 배치 (퀴즈 앵커 확보)","5. 할루시네이션 금지: 원문에 없는 주장/사례/인과/수치 추가 절대 금지","6. 🔹 B. 결과 단독 발췌 금지: 간단 모드에서는 DLPFC, VLPFC, OFC 등 세부 뇌 영역 명칭 사용 금지","","[비율 엄수]","- 간단 10~15%, 표준 25~30%, 상세 45~55% 글자수 비율은 절대적 기준","- 상세 요약이 표준보다 짧아지는 역전 현상 금지","- 각 단계마다 정보의 깊이와 양을 계층적으로 명확히 차별화","","[ORIGINAL]",b].join(`
`)}function x({summaryText:E,format:h}){return["[TASK] 아래 요약문에서 학습 앵커(핵심 개념/관계)를 추출하라.","- 출력은 JSON만. 한국어로.","- 앵커 수: 6~14개 범위(요약 길이에 맞춰 적절히).","- 각 앵커는 요약문에 실제로 등장하는 표현을 근거(quote)로 가져와야 한다.","- quote는 요약문 일부를 그대로 복사(짧게 8~25자).","","[OUTPUT JSON SCHEMA]",`{
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
}`,"","[SUMMARY]",E].join(`
`)}function v({mode:E,purpose:h,format:p,summaryText:g,sentTable:b,anchors:m}){const _=n[E]||10,M=h==="preview"?"예습용 셀프테스트: 요약문 안에서 바로 확인 가능한 재인 중심(스키마 형성). 과도한 추론 금지.":"시험대비 셀프테스트: 요약문에 있는 근거를 바탕으로 인과/관계/분류를 인출하는 회상 중심. 요약에 없는 정보 금지.",V=p==="narrative"?"문항 스타일: 문장 빈칸, 문장 순서 배열, 인과관계 단답/서술(요약 근거 필수)":p==="structured"?"문항 스타일: 항목-정의 매칭, 분류 채우기, 상하위 체계, 사례-범주 매칭(요약 근거 필수)":"문항 스타일: 노드 라벨 맞추기, 연결 라벨링, 누락 노드/연결 복원, 관계 이유 단답(요약 근거 필수)";return["[TASK] 아래 요약문과 앵커만을 근거로 셀프테스트 문항을 생성하라.",`- 모드: ${E} (문항수 ${_})`,`- 목적: ${h} (${M})`,`- 요약 형식: ${p} (${V})`,"- 규칙1: 요약문에 없는 정보로 문제 만들지 말 것(할루시네이션 금지).","- 규칙2: 각 문항은 반드시 evidence를 포함: sid + quote(요약 문장 일부 8~25자).","- 규칙3: quote는 반드시 해당 sid 문장에 실제로 포함되어야 한다.","- 규칙4: 정답/해설은 간결하게. 해설은 evidence와 연결되게.","","[OUTPUT JSON ONLY]",`{
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
}`,"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(b,null,2),"","[ANCHORS]",JSON.stringify(m,null,2),"","[SUMMARY]",g].join(`
`)}function A(E,h){const p=h&&h.anchors?h.anchors:[],g=[],b=[];for(const m of p){const _=m==null?void 0:m.sid,M=m==null?void 0:m.quote;if(typeof(m==null?void 0:m.label)!="string"||!m.label.trim()){b.push({a:m,reason:"label missing"});continue}if(!l(E,_,M)){b.push({a:m,reason:"evidence not in sentence"});continue}g.push(m)}return{ok:g,bad:b}}function C(E,h){const p=h&&Array.isArray(h.items)?h.items:[],g=[],b=[];for(const m of p){const _=m==null?void 0:m.evidence;if(!(m!=null&&m.id)||!(m!=null&&m.question)||!(m!=null&&m.answer)||!(_!=null&&_.sid)||!(_!=null&&_.quote)){b.push({q:m,reason:"missing fields"});continue}if(!l(E,_.sid,_.quote)){b.push({q:m,reason:"evidence not in sentence"});continue}if(Array.isArray(m.choices)&&m.choices.length>0&&!m.choices.includes(m.answer)){b.push({q:m,reason:"answer not in choices"});continue}g.push(m)}return{ok:g,bad:b}}function S({summaryText:E,sentTable:h,anchors:p,badItems:g,mode:b,purpose:m,format:_}){return["[TASK] 아래는 검증에서 탈락한 문항들이다. 요약문 근거(sid+quote)를 만족하도록 문항을 다시 생성하라.",`- 재생성 문항 수: ${g.length}`,`- 모드: ${b}, 목적: ${m}, 형식: ${_}`,"- 규칙: 요약문 밖 정보 금지. 반드시 sid+quote가 실제로 해당 문장에 포함되어야 한다.","- 출력: JSON만. items 길이는 정확히 재생성 문항 수와 같아야 한다.","","[OUTPUT JSON ONLY]",'{"items":[{ "id":"Qx","type":"blank|match|order|label|short|mcq","question":"...","choices":[],"answer":"...","explanation":"...","evidence":{"sid":"S1","quote":"..." },"anchorIds":["A1"] }]}',"","[SUMMARY SENTENCES WITH ID]",JSON.stringify(h,null,2),"","[ANCHORS]",JSON.stringify(p,null,2),"","[BAD ITEMS]",JSON.stringify(g,null,2),"","[SUMMARY]",E].join(`
`)}async function N({llmCall:E,originalText:h,mode:p,format:g}){if(!E)throw new Error("llmCall is required");e[p]||(p="standard"),r.includes(g)||(g="narrative");const b=f({originalText:h,mode:p,format:g}),m=(await E({system:u(),user:b,json:!1})||"").trim()||"",_=c(m),M=x({summaryText:m,format:g});let V=await E({system:u(),user:M,json:!0}),Y;try{Y=JSON.parse(V)}catch{Y={anchors:[]}}const{ok:$}=A(_,Y),He=$.length>=4?$:H(_);return{summaryText:m,sentTable:_,anchors:He}}function H(E){const h=[];for(let p=0;p<Math.min(8,E.length);p++){const g=E[p],b=(g.text||"").slice(0,18);h.push({id:`A${p+1}`,label:`문장 핵심${p+1}`,type:"claim",sid:g.sid,quote:b,note:"요약 문장 기반 안전 앵커"})}return h}async function B({llmCall:E,mode:h,purpose:p,format:g,summaryText:b,sentTable:m,anchors:_}){e[h]||(h="standard"),s.includes(p)||(p="preview"),r.includes(g)||(g="narrative");const M=v({mode:h,purpose:p,format:g,summaryText:b,sentTable:m,anchors:_});let V=await E({system:u(),user:M,json:!0}),Y;try{Y=JSON.parse(V)}catch{Y={items:[]}}let{ok:$,bad:He}=C(m,Y);if(He.length>0){const Ne=S({summaryText:b,sentTable:m,anchors:_,badItems:He.map(on=>on.q),mode:h,purpose:p,format:g});let rn=await E({system:u(),user:Ne,json:!0}),Qe;try{Qe=JSON.parse(rn)}catch{Qe={items:[]}}const sn=C(m,Qe);$=$.concat(sn.ok);const an=n[h]||10;$=$.slice(0,an)}else{const Ne=n[h]||10;$=$.slice(0,Ne)}const We=n[h]||10;if($.length<We){const Ne=q({sentTable:m,anchors:_,count:We-$.length,format:g,purpose:p});$=$.concat(Ne).slice(0,We)}return{items:$}}function q({sentTable:E,anchors:h,count:p,format:g,purpose:b}){const m=[],_=h.slice(0,Math.max(p,1));for(let M=0;M<p;M++){const V=_[M%_.length],Y=V.sid,$=V.quote;m.push({id:`QF${M+1}`,type:"short",question:b==="preview"?`요약에서 '${$}'가 의미하는 핵심 개념을 한 문장으로 말해보세요.`:`요약에서 '${$}'가 포함된 문장의 핵심 인과/관계를 한 문장으로 인출해보세요.`,choices:[],answer:"(서술형 정답: 사용자 입력 비교는 해설 기반 채점 또는 키워드 채점으로 처리)",explanation:"근거 문장을 다시 읽고 핵심을 1문장으로 재구성하면 됩니다.",evidence:{sid:Y,quote:$},anchorIds:[V.id]})}return m}class k{constructor(h,{passScore:p=90}={}){this.items=Array.isArray(h)?h:[],this.passScore=p,this.state={idx:0,attempts:1,correct:0,wrongIds:new Set,finished:!1}}gradeAnswer(h,p){if(!h)return{ok:!1,reason:"no item"};const g=h.type;if(g==="mcq"||g==="blank"||g==="match"||g==="order"||g==="label"||g==="short"){if(g==="short")return{ok:!0,reason:"short-auto-pass"};const b=(h.answer||"").trim(),m=(p||"").trim();return{ok:m===b,reason:m===b?"match":"mismatch"}}return{ok:!1,reason:"unknown type"}}getScore(){return this.items.length===0?0:Math.round(this.state.correct/this.items.length*100)}currentItem(){return this.items[this.state.idx]||null}submit(h){if(this.state.finished)return{done:!0,message:"already finished"};const p=this.currentItem();if(this.gradeAnswer(p,h).ok)return this.state.correct+=1,this.next(),{ok:!0,message:"정답 처리",score:this.getScore()};if(this.state.wrongIds.add(p.id),this.state.attempts===1)return this.state.attempts=2,{ok:!1,stage:1,hint:`힌트1: 근거 문장(${p.evidence.sid})을 다시 읽어보세요.`,score:this.getScore()};if(this.state.attempts===2)return this.state.attempts=3,{ok:!1,stage:2,hint:`힌트2: 근거 구절 = '${p.evidence.quote}'`,score:this.getScore()};{const b=p.explanation||"해설 없음";return this.next(),{ok:!1,stage:3,explanation:b,score:this.getScore()}}}next(){if(this.state.idx+=1,this.state.attempts=1,this.state.idx>=this.items.length)if(this.getScore()>=this.passScore)this.state.finished=!0;else{const p=this.items.filter(g=>this.state.wrongIds.has(g.id));this.items=p.length>0?p:this.items,this.state.idx=0,this.state.attempts=1,this.state.correct=0,this.state.wrongIds=new Set}}status(){return{idx:this.state.idx,total:this.items.length,score:this.getScore(),passScore:this.passScore,finished:this.state.finished}}}async function R({llmCall:E,originalText:h,mode:p,format:g,purpose:b}){const m=await N({llmCall:E,originalText:h,mode:p,format:g}),_=await B({llmCall:E,mode:p,purpose:b,format:g,summaryText:m.summaryText,sentTable:m.sentTable,anchors:m.anchors});return{summary:{mode:p,format:g,text:m.summaryText,sentences:m.sentTable,anchors:m.anchors},selfTest:{purpose:b,passScore:90,items:_.items}}}return{computeCharTargets:a,splitSentencesKR:o,makeSentenceTable:c,generateBundle:N,generateSelfTest:B,runPipeline:R,MasteryRunner:k}})(),_r=`/* MindStory Engine Bundle (compat) */
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
})();`;J.get("/ms-engine-bundle.js",t=>t.text(_r,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));J.use("/api/*",Gn());J.get("/favicon.ico",t=>t.body(null,204));J.use("/static/*",er({root:"./public"}));J.get("/",t=>t.html(`<!DOCTYPE html>
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
</html>`));J.get("/api/health",t=>{const e=!!P(t.env.GEMINI_API_KEY).trim(),n=P(t.env.USE_MOCK).trim().toLowerCase()==="true";return t.json({ok:!0,ts:Vt(),hasDB:!!t.env.DB,hasGeminiKey:e,engineMode:e&&!n?"gemini+fallback":"local-only"})});J.post("/api/gens/run",async t=>{const e=Date.now();let n=null;try{n=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const r=P((n==null?void 0:n.text)||(n==null?void 0:n.originalText)||""),s=Xt((n==null?void 0:n.mode)||"standard"),i=Wt((n==null?void 0:n.format)||(n==null?void 0:n.viewType)||"narrative"),a=P((n==null?void 0:n.purpose)||"preview").trim().toLowerCase();if(!r)return t.json({ok:!1,error:{code:"NO_TEXT",message:"원문 텍스트가 필요합니다."}},400);const o=!!P(t.env.GEMINI_API_KEY).trim(),c=P(t.env.USE_MOCK).trim().toLowerCase()==="true";if(!o||c)return t.json({ok:!1,error:{code:"GEMINI_REQUIRED",message:"GENS Engine은 Gemini API가 필요합니다. .dev.vars에 GEMINI_API_KEY를 설정하세요."},guide:{step1:".dev.vars 파일 생성",step2:"GEMINI_API_KEY=your_api_key_here 추가",step3:"서비스 재시작: pm2 restart webapp"}},503);const l=async({system:u,user:f,json:x})=>{if(x){const v=`${u}

${f}

출력은 반드시 JSON만 출력하라. 다른 텍스트 금지.`;return await Zt(t.env,v)}else return(await Ar(t.env,u,f)||"").toString()};try{const u=await Cr.runPipeline({llmCall:l,originalText:r,mode:s,format:i,purpose:a==="exam"?"exam":"preview"});return t.json({ok:!0,data:u,meta:{engine:"gens-v3",mode:s,format:i,purpose:a,elapsedMs:Date.now()-e}},200)}catch(u){return console.error("[GENS Engine Error]",u),t.json({ok:!1,error:{code:"GENS_ERROR",message:u.message||"GENS 엔진 오류",details:u.stack}},500)}});J.post("/api/engine",async t=>{var E;const e=Date.now(),n=t.env.DB;await yr(n);let r=null;try{r=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=cr(r==null?void 0:r.kind),i=P((r==null?void 0:r.text)||""),a=Xt((r==null?void 0:r.mode)||(r==null?void 0:r.level)),o=Wt((r==null?void 0:r.viewType)||(r==null?void 0:r.displayMode)),c=P(((E=r==null?void 0:r.options)==null?void 0:E.userId)||(r==null?void 0:r.userId)||"anon");if(!i.trim()||i.trim().length<5)return t.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const l=or(i),u=l.text,f=l.sentences;console.log("[Sanitize] Original length:",i.length,"→ Cleaned:",u.length),console.log("[Sanitize] Sentences extracted:",f.length);const x=vr(s,a,o,u,c||null),v=await vt(n,x);if(v.hit)return t.json({ok:!0,data:v.data,meta:{cached:!0,cacheStore:v.store,cacheType:"derived",engine:"cache",elapsedMs:Date.now()-e}},200);const A=br(s,a,u,c||null),C=await vt(n,A);if(C.hit&&C.data){let h;if(C.data.allSummaries&&C.data.allSummaries[a]?h=C.data.allSummaries[a]:C.data.narrative?h=C.data.narrative:console.warn("[Cache] Base cache has no narrative, skipping"),h){let p;return o==="narrative"?p={kind:s,mode:a,viewType:o,narrative:h}:o==="structured"?p={kind:s,mode:a,...wr(h)}:o==="mindmap"?p={kind:s,mode:a,...Er(h)}:p={kind:s,mode:a,...Sr(h)},await Re(n,x,c||"anon",p),t.json({ok:!0,data:p,meta:{cached:!0,cacheStore:"derived",cacheType:"converted",engine:"local-convert",elapsedMs:Date.now()-e}},200)}}const S=!!P(t.env.GEMINI_API_KEY).trim(),N=P(t.env.USE_MOCK).trim().toLowerCase()==="true";if(s==="summary"&&S&&!N)try{const h=await xr(t.env,u),p=dr(a),g=ur(o);let b;if(g==="structured")b={kind:s,mode:a,viewType:o,...h.structured[p]};else if(g==="mindmap")b={kind:s,mode:a,viewType:o,...h.mindmap[p]};else if(g==="selftest")b={kind:s,mode:a,viewType:o,...h.selftest[p]};else{const M=h.narrative[p];b={kind:s,mode:a,viewType:o,title:M.title,narrative:M.summary,keyPoints:M.keyPoints,examHints:M.examHints}}const m=h.narrative[p],_={kind:s,mode:a,viewType:"narrative",narrative:m.summary,allSummaries:{brief:h.narrative.brief.summary,standard:h.narrative.standard.summary,detail:h.narrative.detail.summary},meta:{engine:"v4",hierarchy:"brief ⊂ standard ⊂ detail (server-downsample)",structuredFirst:!0}};return await Re(n,A,c||"anon",_),await Re(n,x,c||"anon",b),t.json({ok:!0,data:b,meta:{cached:!1,engine:"gemini-v4-structured-first",elapsedMs:Date.now()-e,hierarchy:"brief ⊂ standard ⊂ detail (guaranteed)"}},200)}catch(h){console.error("[Gemini V4 Error]",h)}const{buildAllSummariesV4_Quality:H}=await Promise.resolve().then(()=>Lr),B=H(u),q=B[a]||B.standard;let k;o==="narrative"?k={kind:s,mode:a,viewType:o,narrative:q.narrative}:o==="structured"?k={kind:s,mode:a,viewType:o,structured:q.structured}:o==="mindmap"?k={kind:s,mode:a,viewType:o,mindmap:q.mindmap}:o==="selftest"&&(k={kind:s,mode:a,viewType:o,selftest:q.selftest}),await Re(n,x,c||"anon",k);const R={kind:"summary",mode:a,viewType:"narrative",narrative:q.narrative,allSummaries:{brief:B.brief.narrative,standard:B.standard.narrative,detail:B.detail.narrative}};return await Re(n,A,c||"anon",R),t.json({ok:!0,data:k,meta:{cached:!1,engine:"quality-v4.2",elapsedMs:Date.now()-e,features:["압축률 강제 (중간 절단 금지)","구조화: 논지/대립/현황/괴리/변천/시사점","마인드맵: 노드 단위 축약","brief ⊂ standard ⊂ detail 강제"]}},200)});J.get("/health",t=>t.json({ok:!0,service:"MindStory v2 Revised"}));J.notFound(t=>t.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const yt=new Kt,Or=Object.assign({"/src/index.tsx":J});let en=!1;for(const[,t]of Object.entries(Or))t&&(yt.route("/",t),yt.notFound(t.notFoundHandler),en=!0);if(!en)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");function wt(t,e,n){return Math.max(e,Math.min(n,t))}function at(t){return(t||"").replace(/\s+/g,"").length}function oe(t){return(t||"").replace(/[ \t]{2,}/g," ").replace(/\s+([,.;:!?])/g,"$1").trim()}function Nr(t,e){return`${t}_${e.toString(36)}`}function tn(t){if(!t)return"";let e=String(t);return e=e.replace(/\uFEFF/g,"").replace(/[\u200B-\u200D\u2060]/g,"").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g," "),e=e.replace(/(?:^|\n)\s*[-–—]?\s*\d{1,4}\s*[-–—]?\s*(?=\n|$)/g,`
`),e=e.replace(/([A-Za-z])-\s*\n\s*([A-Za-z])/g,"$1$2"),e=e.replace(/([가-힣0-9])\s*\n\s*([가-힣0-9])/g,"$1$2"),e=e.replace(/[「『〈《]/g,'"').replace(/[」』〉》]/g,'"'),e=e.replace(/\n{3,}/g,`

`),e=e.replace(/[ \t]{2,}/g," "),e.trim()}function Et(t){const e=(t||"").trim();if(!e)return[];const n=e.split(/\n{2,}/g),r=[];for(const s of n){const i=s.replace(/\n/g," ").replace(/[ \t]{2,}/g," ").trim();if(!i)continue;const a=i.split(new RegExp("(?<=[.?!])\\s+|(?<=(?:이다|된다|한다|있다|없다|말한다|주장한다)\\.)\\s+","g"));for(const o of a){const c=oe(o);c&&r.push(c)}}return r}function kr(t){const e=(t||"").trim();return!!(!e||e.length<12&&!(/[.?!]$/.test(e)||/(?:이다|된다|한다|있다|없다|말한다|주장한다)\.?$/.test(e))||/^["")\]\}]+$/.test(e)||/^["(\[\{]+$/.test(e)||/^(?:\(\d+\)|\d+\)|[①-⑳])\s*["")\]]*\s*$/.test(e)||/(완전\s*정복|쏙쏙|콕콕|실력을\s*쑥쑥|고득점|특강|전문\s*대비)/.test(e)&&(/[""]/.test(e)||/!$/.test(e)))}function St(t){const e=[],n=new Set;for(const r of t){const s=oe(r);if(!s||kr(s))continue;const i=s.replace(/\s+/g," ");n.has(i)||(n.add(i),e.push(i))}return e}function Rr(t){const e=/(^|\n)\s*(\d+\.\d+)\.\s*([^\n]+)\n?/g,n=[];let r;for(;(r=e.exec(t))!==null;)n.push({idx:r.index,key:r[2],title:oe(r[3])});if(n.length===0)return[{key:"all",title:"본문",text:t}];const s=[];for(let i=0;i<n.length;i++){const a=n[i],o=n[i+1],c=a.idx,l=o?o.idx:t.length;s.push({key:a.key,title:a.title,text:t.slice(c,l).trim()})}return s}function Mr(t){let e=1;/(교육부|공교육|정상화|사교육|입시|내신|대입|고입)/.test(t)&&(e+=2),/(방해|요인|우려|격차|부정적|증폭|현실)/.test(t)&&(e+=1.5),/(반해|반면|하지만|그러나|이에\s*반해)/.test(t)&&(e+=1.5),/(목표|역점|능력|국제|문화|듣기|말하기)/.test(t)&&(e+=1.2),/(현황|방법|프로그램|평가|설명회|학원|교육비|기숙)/.test(t)&&(e+=1),/(변천|과정|비율|가산점|전형|선발\s*시험)/.test(t)&&(e+=1.6);const n=at(t);return n>180&&(e-=.6),n>260&&(e-=1),e}function nn(t){let e=oe(t);return e=e.replace(/\([^)]*\d{4}[^)]*\)/g,"").trim(),e=e.replace(/"([^"]{60,})"/g,'"(인용문 요지)"'),e=e.replace(/본수업/g,"본 수업"),e=e.replace(/국력신장/g,"국력 신장"),e=e.replace(/내신대비/g,"내신 대비"),e=e.replace(/지원현황/g,"지원 현황"),e=e.replace(/또한출판/g,"또한 출판"),e=e.replace(/그리고입과/g,"그리고 고입과"),e=e.replace(/통한대비/g,"통한 대비"),/[.?!]$/.test(e)||(e+="."),oe(e)}function ce(t,e,n){return t.map((s,i)=>({id:Nr(n,i),text:s,score:Mr(s)})).sort((s,i)=>i.score-s.score).slice(0,e).map(s=>({id:s.id,text:nn(s.text),score:s.score}))}function Ir(t){var H,B,q,k;const e=Rr(t),n={};for(const R of e)n[R.key]=St(Et(R.text));const r=St(Et(t)),s=(H=e[0])!=null&&H.title?oe(e[0].title):"요약",i=ce(r,3,"core"),a=r.filter(R=>/(교육부|공교육|정상화|우려|부정적|방해|격차|참여도)/.test(R)),o=r.filter(R=>/(사교육|학원|예습|효율|성과|긍정|흥미|자신감)/.test(R)),c={id:"ministry",label:"교육부 관점(문제 제기)",bullets:ce(a.length?a:r,3,"min")},l={id:"private",label:"사교육 관점(효율 주장)",bullets:ce(o.length?o:r,3,"pri")},u=((B=n["2.3"])!=null&&B.length?n["2.3"]:r).filter(R=>/(현황|방법|설명회|프로그램|평가|교육비|특강|기숙|방학)/.test(R)),f={id:"reality",label:"방법 및 현황(사례 중심)",bullets:ce(u.length?u:r,4,"rea")},x=(q=n["2.2"])!=null&&q.length?n["2.2"]:r.filter(R=>/(목표|역점|하지만|현실|성적|시험)/.test(R)),v={id:"gap",label:"목표와 현실의 괴리",bullets:ce(x.length?x:r,3,"gap")},A=(k=n["2.4"])!=null&&k.length?n["2.4"]:r.filter(R=>/(변천|과정|비율|가산점|내신|추세)/.test(R)),C={id:"policy",label:"제도/변천(입시 구조 변화)",bullets:ce(A.length?A:r,3,"pol")},S=r.filter(R=>/(추세|강화|대응|영향|요인|현실)/.test(R)),N={id:"takeaway",label:"시사점(요약 결론)",bullets:ce(S.length?S:r,2,"tak")};return{title:s,core:{id:"core",bullets:i},perspectives:{ministry:c,privateEdu:l},reality:f,gap:v,policy:C,takeaway:N}}function le(t,e){return t.slice().sort((n,r)=>r.score-n.score).slice(0,e).sort((n,r)=>n.id.localeCompare(r.id))}function Tt(t,e){const n={brief:{core:2,per:2,reality:2,gap:1,policy:1,take:1},standard:{core:3,per:3,reality:3,gap:2,policy:2,take:2},detail:{core:3,per:3,reality:4,gap:3,policy:3,take:2}}[e];return{title:t.title,core:{id:t.core.id,bullets:le(t.core.bullets,n.core)},perspectives:{ministry:{...t.perspectives.ministry,bullets:le(t.perspectives.ministry.bullets,n.per)},privateEdu:{...t.perspectives.privateEdu,bullets:le(t.perspectives.privateEdu.bullets,n.per)}},reality:{...t.reality,bullets:le(t.reality.bullets,n.reality)},gap:{...t.gap,bullets:le(t.gap.bullets,n.gap)},policy:{...t.policy,bullets:le(t.policy.bullets,n.policy)},takeaway:{...t.takeaway,bullets:le(t.takeaway.bullets,n.take)}}}function jr(t,e){const n=Math.max(120,at(t)),r=e==="brief"?.13:e==="standard"?.3:.55,s=Math.floor(n*(r-.03)),i=Math.ceil(n*(r+.05));return{min:wt(s,80,999999),max:wt(i,110,999999)}}function rt(t,e,n){const{min:r,max:s}=jr(n,e),i=[],a=l=>l.forEach(u=>i.push(u.text));a(t.core.bullets),a(t.perspectives.ministry.bullets),a(t.perspectives.privateEdu.bullets),a(t.gap.bullets),a(t.policy.bullets),a(t.reality.bullets),a(t.takeaway.bullets);const o=[];let c=0;for(const l of i){const u=at(l);if(!(c+u>s&&o.length>=2)&&(o.push(l),c+=u,c>=r&&o.length>=(e==="brief"?2:e==="standard"?4:6)))break}return oe(o.join(" "))}function $r(t){const e=nn(t),n=e.split(/,\s+/g);return n.length>=3?oe(n.slice(0,2).join(", ")+"."):e}function Pr(t){const e=t.title||"핵심",n=(s,i,a)=>({id:s,label:i,children:a.map(o=>({id:o.id,label:$r(o.text)}))}),r=[n("n_core","핵심 요지",t.core.bullets),n("n_min",t.perspectives.ministry.label,t.perspectives.ministry.bullets),n("n_pri",t.perspectives.privateEdu.label,t.perspectives.privateEdu.bullets),n("n_gap",t.gap.label,t.gap.bullets),n("n_pol",t.policy.label,t.policy.bullets),n("n_rea",t.reality.label,t.reality.bullets),n("n_tak",t.takeaway.label,t.takeaway.bullets)];return{center:e,nodes:r}}function Dr(t,e){var r,s,i,a;const n=[];return n.push({q:"교육부는 선행학습을 왜 문제로 보는가?",a:((r=t.perspectives.ministry.bullets[0])==null?void 0:r.text)||"공교육 정상화 저해 및 격차/태도 악화 우려.",hint:"공교육·격차·참여도"}),n.push({q:"사교육이 말하는 예습과 선행학습의 차이는 무엇인가?",a:((s=t.perspectives.privateEdu.bullets[0])==null?void 0:s.text)||"예습은 수업 대비, 선행은 다음 학년 과정의 선학습.",hint:"수업 대비 vs 다음 학년"}),e!=="brief"&&n.push({q:"선행학습이 강화되는 제도적 배경은 무엇인가?",a:((i=t.policy.bullets[0])==null?void 0:i.text)||"내신 반영비율/전형/가산점 등 구조 변화가 영향을 준다.",hint:"내신·전형·비율"}),e==="detail"&&n.push({q:"선행학습의 현황(방법)에서 핵심 특징 1가지는?",a:((a=t.reality.bullets[0])==null?void 0:a.text)||"시험 대비 중심 프로그램과 특강/평가 체계가 운영된다.",hint:"프로그램·특강·평가"}),n}function Br(t){const e=tn(t),n=Ir(e),r=Tt(n,"standard"),s=Tt(n,"brief"),i=rt(n,"detail",e),a=rt(r,"standard",e),o=rt(s,"brief",e),c=(l,u,f)=>({mode:l,narrative:f,structured:u,mindmap:Pr(u),selftest:Dr(u,l)});return{brief:c("brief",s,o),standard:c("standard",r,a),detail:c("detail",n,i)}}const Lr=Object.freeze(Object.defineProperty({__proto__:null,buildAllSummariesV4_Quality:Br,sanitizeKoreanAcademicText:tn},Symbol.toStringTag,{value:"Module"}));export{yt as default};
