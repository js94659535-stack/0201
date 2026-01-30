var Qt=Object.defineProperty;var lt=t=>{throw TypeError(t)};var Zt=(t,e,n)=>e in t?Qt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var b=(t,e,n)=>Zt(t,typeof e!="symbol"?e+"":e,n),tt=(t,e,n)=>e.has(t)||lt("Cannot "+n);var d=(t,e,n)=>(tt(t,e,"read from private field"),n?n.call(t):e.get(t)),S=(t,e,n)=>e.has(t)?lt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),x=(t,e,n,r)=>(tt(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),O=(t,e,n)=>(tt(t,e,"access private method"),n);var dt=(t,e,n,r)=>({set _(s){x(t,e,s,n)},get _(){return d(t,e,r)}});var ut=(t,e,n)=>(r,s)=>{let a=-1;return i(0);async function i(o){if(o<=a)throw new Error("next() called multiple times");a=o;let l,c=!1,u;if(t[o]?(u=t[o][0][0],r.req.routeIndex=o):u=o===t.length&&s||void 0,u)try{l=await u(r,()=>i(o+1))}catch(h){if(h instanceof Error&&e)r.error=h,l=await e(h,r),c=!0;else throw h}else r.finalized===!1&&n&&(l=await n(r));return l&&(r.finalized===!1||c)&&(r.res=l),r}},en=Symbol(),tn=async(t,e=Object.create(null))=>{const{all:n=!1,dot:r=!1}=e,a=(t instanceof Pt?t.raw.headers:t.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?nn(t,{all:n,dot:r}):{}};async function nn(t,e){const n=await t.formData();return n?rn(n,e):{}}function rn(t,e){const n=Object.create(null);return t.forEach((r,s)=>{e.all||s.endsWith("[]")?sn(n,s,r):n[s]=r}),e.dot&&Object.entries(n).forEach(([r,s])=>{r.includes(".")&&(an(n,r,s),delete n[r])}),n}var sn=(t,e,n)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(n):t[e]=[t[e],n]:e.endsWith("[]")?t[e]=[n]:t[e]=n},an=(t,e,n)=>{let r=t;const s=e.split(".");s.forEach((a,i)=>{i===s.length-1?r[a]=n:((!r[a]||typeof r[a]!="object"||Array.isArray(r[a])||r[a]instanceof File)&&(r[a]=Object.create(null)),r=r[a])})},kt=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},on=t=>{const{groups:e,path:n}=cn(t),r=kt(n);return ln(r,e)},cn=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(n,r)=>{const s=`@${r}`;return e.push([s,n]),s}),{groups:e,path:t}},ln=(t,e)=>{for(let n=e.length-1;n>=0;n--){const[r]=e[n];for(let s=t.length-1;s>=0;s--)if(t[s].includes(r)){t[s]=t[s].replace(r,e[n][1]);break}}return t},ze={},dn=(t,e)=>{if(t==="*")return"*";const n=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){const r=`${t}#${e}`;return ze[r]||(n[2]?ze[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,n[1],new RegExp(`^${n[2]}(?=/${e})`)]:[t,n[1],new RegExp(`^${n[2]}$`)]:ze[r]=[t,n[1],!0]),ze[r]}return null},ct=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return e(n)}catch{return n}})}},un=t=>ct(t,decodeURI),Mt=t=>{const e=t.url,n=e.indexOf("/",e.indexOf(":")+4);let r=n;for(;r<e.length;r++){const s=e.charCodeAt(r);if(s===37){const a=e.indexOf("?",r),i=e.slice(n,a===-1?void 0:a);return un(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(s===63)break}return e.slice(n,r)},hn=t=>{const e=Mt(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},we=(t,e,...n)=>(n.length&&(e=we(e,...n)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),At=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),n=[];let r="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){n.length===0&&r===""?n.push("/"):n.push(r);const a=s.replace("?","");r+="/"+a,n.push(r)}else r+="/"+s}),n.filter((s,a,i)=>i.indexOf(s)===a)},nt=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?ct(t,Nt):t):t,It=(t,e,n)=>{let r;if(!n&&e&&!/[%+]/.test(e)){let i=t.indexOf("?",8);if(i===-1)return;for(t.startsWith(e,i+1)||(i=t.indexOf(`&${e}`,i+1));i!==-1;){const o=t.charCodeAt(i+e.length+1);if(o===61){const l=i+e.length+2,c=t.indexOf("&",l);return nt(t.slice(l,c===-1?void 0:c))}else if(o==38||isNaN(o))return"";i=t.indexOf(`&${e}`,i+1)}if(r=/[%+]/.test(t),!r)return}const s={};r??(r=/[%+]/.test(t));let a=t.indexOf("?",8);for(;a!==-1;){const i=t.indexOf("&",a+1);let o=t.indexOf("=",a);o>i&&i!==-1&&(o=-1);let l=t.slice(a+1,o===-1?i===-1?void 0:i:o);if(r&&(l=nt(l)),a=i,l==="")continue;let c;o===-1?c="":(c=t.slice(o+1,i===-1?void 0:i),r&&(c=nt(c))),n?(s[l]&&Array.isArray(s[l])||(s[l]=[]),s[l].push(c)):s[l]??(s[l]=c)}return e?s[e]:s},fn=It,pn=(t,e)=>It(t,e,!0),Nt=decodeURIComponent,ht=t=>ct(t,Nt),$e,G,re,Ht,Lt,at,se,Ct,Pt=(Ct=class{constructor(t,e="/",n=[[]]){S(this,re);b(this,"raw");S(this,$e);S(this,G);b(this,"routeIndex",0);b(this,"path");b(this,"bodyCache",{});S(this,se,t=>{const{bodyCache:e,raw:n}=this,r=e[t];if(r)return r;const s=Object.keys(e)[0];return s?e[s].then(a=>(s==="json"&&(a=JSON.stringify(a)),new Response(a)[t]())):e[t]=n[t]()});this.raw=t,this.path=e,x(this,G,n),x(this,$e,{})}param(t){return t?O(this,re,Ht).call(this,t):O(this,re,Lt).call(this)}query(t){return fn(this.url,t)}queries(t){return pn(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((n,r)=>{e[r]=n}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await tn(this,t))}json(){return d(this,se).call(this,"text").then(t=>JSON.parse(t))}text(){return d(this,se).call(this,"text")}arrayBuffer(){return d(this,se).call(this,"arrayBuffer")}blob(){return d(this,se).call(this,"blob")}formData(){return d(this,se).call(this,"formData")}addValidatedData(t,e){d(this,$e)[t]=e}valid(t){return d(this,$e)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[en](){return d(this,G)}get matchedRoutes(){return d(this,G)[0].map(([[,t]])=>t)}get routePath(){return d(this,G)[0].map(([[,t]])=>t)[this.routeIndex].path}},$e=new WeakMap,G=new WeakMap,re=new WeakSet,Ht=function(t){const e=d(this,G)[0][this.routeIndex][1][t],n=O(this,re,at).call(this,e);return n&&/\%/.test(n)?ht(n):n},Lt=function(){const t={},e=Object.keys(d(this,G)[0][this.routeIndex][1]);for(const n of e){const r=O(this,re,at).call(this,d(this,G)[0][this.routeIndex][1][n]);r!==void 0&&(t[n]=/\%/.test(r)?ht(r):r)}return t},at=function(t){return d(this,G)[1]?d(this,G)[1][t]:t},se=new WeakMap,Ct),gn={Stringify:1},Dt=async(t,e,n,r,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const a=t.callbacks;return a!=null&&a.length?(s?s[0]+=t:s=[t],Promise.all(a.map(o=>o({phase:e,buffer:s,context:r}))).then(o=>Promise.all(o.filter(Boolean).map(l=>Dt(l,e,!1,r,s))).then(()=>s[0]))):Promise.resolve(t)},mn="text/plain; charset=UTF-8",rt=(t,e)=>({"Content-Type":t,...e}),Pe,He,Z,Ce,ee,K,Le,je,Oe,fe,De,Be,ae,Ee,jt,xn=(jt=class{constructor(t,e){S(this,ae);S(this,Pe);S(this,He);b(this,"env",{});S(this,Z);b(this,"finalized",!1);b(this,"error");S(this,Ce);S(this,ee);S(this,K);S(this,Le);S(this,je);S(this,Oe);S(this,fe);S(this,De);S(this,Be);b(this,"render",(...t)=>(d(this,je)??x(this,je,e=>this.html(e)),d(this,je).call(this,...t)));b(this,"setLayout",t=>x(this,Le,t));b(this,"getLayout",()=>d(this,Le));b(this,"setRenderer",t=>{x(this,je,t)});b(this,"header",(t,e,n)=>{this.finalized&&x(this,K,new Response(d(this,K).body,d(this,K)));const r=d(this,K)?d(this,K).headers:d(this,fe)??x(this,fe,new Headers);e===void 0?r.delete(t):n!=null&&n.append?r.append(t,e):r.set(t,e)});b(this,"status",t=>{x(this,Ce,t)});b(this,"set",(t,e)=>{d(this,Z)??x(this,Z,new Map),d(this,Z).set(t,e)});b(this,"get",t=>d(this,Z)?d(this,Z).get(t):void 0);b(this,"newResponse",(...t)=>O(this,ae,Ee).call(this,...t));b(this,"body",(t,e,n)=>O(this,ae,Ee).call(this,t,e,n));b(this,"text",(t,e,n)=>!d(this,fe)&&!d(this,Ce)&&!e&&!n&&!this.finalized?new Response(t):O(this,ae,Ee).call(this,t,e,rt(mn,n)));b(this,"json",(t,e,n)=>O(this,ae,Ee).call(this,JSON.stringify(t),e,rt("application/json",n)));b(this,"html",(t,e,n)=>{const r=s=>O(this,ae,Ee).call(this,s,e,rt("text/html; charset=UTF-8",n));return typeof t=="object"?Dt(t,gn.Stringify,!1,{}).then(r):r(t)});b(this,"redirect",(t,e)=>{const n=String(t);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,e??302)});b(this,"notFound",()=>(d(this,Oe)??x(this,Oe,()=>new Response),d(this,Oe).call(this,this)));x(this,Pe,t),e&&(x(this,ee,e.executionCtx),this.env=e.env,x(this,Oe,e.notFoundHandler),x(this,Be,e.path),x(this,De,e.matchResult))}get req(){return d(this,He)??x(this,He,new Pt(d(this,Pe),d(this,Be),d(this,De))),d(this,He)}get event(){if(d(this,ee)&&"respondWith"in d(this,ee))return d(this,ee);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,ee))return d(this,ee);throw Error("This context has no ExecutionContext")}get res(){return d(this,K)||x(this,K,new Response(null,{headers:d(this,fe)??x(this,fe,new Headers)}))}set res(t){if(d(this,K)&&t){t=new Response(t.body,t);for(const[e,n]of d(this,K).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=d(this,K).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of r)t.headers.append("set-cookie",s)}else t.headers.set(e,n)}x(this,K,t),this.finalized=!0}get var(){return d(this,Z)?Object.fromEntries(d(this,Z)):{}}},Pe=new WeakMap,He=new WeakMap,Z=new WeakMap,Ce=new WeakMap,ee=new WeakMap,K=new WeakMap,Le=new WeakMap,je=new WeakMap,Oe=new WeakMap,fe=new WeakMap,De=new WeakMap,Be=new WeakMap,ae=new WeakSet,Ee=function(t,e,n){const r=d(this,K)?new Headers(d(this,K).headers):d(this,fe)??new Headers;if(typeof e=="object"&&"headers"in e){const a=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[i,o]of a)i.toLowerCase()==="set-cookie"?r.append(i,o):r.set(i,o)}if(n)for(const[a,i]of Object.entries(n))if(typeof i=="string")r.set(a,i);else{r.delete(a);for(const o of i)r.append(a,o)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??d(this,Ce);return new Response(t,{status:s,headers:r})},jt),N="ALL",vn="all",bn=["get","post","put","delete","options","patch"],Bt="Can not add a route since the matcher is already built.",Ft=class extends Error{},yn="__COMPOSED_HANDLER",wn=t=>t.text("404 Not Found",404),ft=(t,e)=>{if("getResponse"in t){const n=t.getResponse();return e.newResponse(n.body,n)}return console.error(t),e.text("Internal Server Error",500)},W,P,Kt,Y,de,qe,Ue,Re,En=(Re=class{constructor(e={}){S(this,P);b(this,"get");b(this,"post");b(this,"put");b(this,"delete");b(this,"options");b(this,"patch");b(this,"all");b(this,"on");b(this,"use");b(this,"router");b(this,"getPath");b(this,"_basePath","/");S(this,W,"/");b(this,"routes",[]);S(this,Y,wn);b(this,"errorHandler",ft);b(this,"onError",e=>(this.errorHandler=e,this));b(this,"notFound",e=>(x(this,Y,e),this));b(this,"fetch",(e,...n)=>O(this,P,Ue).call(this,e,n[1],n[0],e.method));b(this,"request",(e,n,r,s)=>e instanceof Request?this.fetch(n?new Request(e,n):e,r,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${we("/",e)}`,n),r,s)));b(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(O(this,P,Ue).call(this,e.request,e,void 0,e.request.method))})});[...bn,vn].forEach(a=>{this[a]=(i,...o)=>(typeof i=="string"?x(this,W,i):O(this,P,de).call(this,a,d(this,W),i),o.forEach(l=>{O(this,P,de).call(this,a,d(this,W),l)}),this)}),this.on=(a,i,...o)=>{for(const l of[i].flat()){x(this,W,l);for(const c of[a].flat())o.map(u=>{O(this,P,de).call(this,c.toUpperCase(),d(this,W),u)})}return this},this.use=(a,...i)=>(typeof a=="string"?x(this,W,a):(x(this,W,"*"),i.unshift(a)),i.forEach(o=>{O(this,P,de).call(this,N,d(this,W),o)}),this);const{strict:r,...s}=e;Object.assign(this,s),this.getPath=r??!0?e.getPath??Mt:hn}route(e,n){const r=this.basePath(e);return n.routes.map(s=>{var i;let a;n.errorHandler===ft?a=s.handler:(a=async(o,l)=>(await ut([],n.errorHandler)(o,()=>s.handler(o,l))).res,a[yn]=s.handler),O(i=r,P,de).call(i,s.method,s.path,a)}),this}basePath(e){const n=O(this,P,Kt).call(this);return n._basePath=we(this._basePath,e),n}mount(e,n,r){let s,a;r&&(typeof r=="function"?a=r:(a=r.optionHandler,r.replaceRequest===!1?s=l=>l:s=r.replaceRequest));const i=a?l=>{const c=a(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};s||(s=(()=>{const l=we(this._basePath,e),c=l==="/"?0:l.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(c)||"/",new Request(h,u)}})());const o=async(l,c)=>{const u=await n(s(l.req.raw),...i(l));if(u)return u;await c()};return O(this,P,de).call(this,N,we(e,"*"),o),this}},W=new WeakMap,P=new WeakSet,Kt=function(){const e=new Re({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,x(e,Y,d(this,Y)),e.routes=this.routes,e},Y=new WeakMap,de=function(e,n,r){e=e.toUpperCase(),n=we(this._basePath,n);const s={basePath:this._basePath,path:n,method:e,handler:r};this.router.add(e,n,[r,s]),this.routes.push(s)},qe=function(e,n){if(e instanceof Error)return this.errorHandler(e,n);throw e},Ue=function(e,n,r,s){if(s==="HEAD")return(async()=>new Response(null,await O(this,P,Ue).call(this,e,n,r,"GET")))();const a=this.getPath(e,{env:r}),i=this.router.match(s,a),o=new xn(e,{path:a,matchResult:i,env:r,executionCtx:n,notFoundHandler:d(this,Y)});if(i[0].length===1){let c;try{c=i[0][0][0][0](o,async()=>{o.res=await d(this,Y).call(this,o)})}catch(u){return O(this,P,qe).call(this,u,o)}return c instanceof Promise?c.then(u=>u||(o.finalized?o.res:d(this,Y).call(this,o))).catch(u=>O(this,P,qe).call(this,u,o)):c??d(this,Y).call(this,o)}const l=ut(i[0],this.errorHandler,d(this,Y));return(async()=>{try{const c=await l(o);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return O(this,P,qe).call(this,c,o)}})()},Re),zt=[];function Sn(t,e){const n=this.buildAllMatchers(),r=(s,a)=>{const i=n[s]||n[N],o=i[2][a];if(o)return o;const l=a.match(i[0]);if(!l)return[[],zt];const c=l.indexOf("",1);return[i[1][c],l]};return this.match=r,r(t,e)}var Ye="[^/]+",Ie=".*",Ne="(?:|/.*)",Se=Symbol(),$n=new Set(".\\+*[^]$()");function Cn(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===Ie||t===Ne?1:e===Ie||e===Ne?-1:t===Ye?1:e===Ye?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var pe,ge,J,ve,jn=(ve=class{constructor(){S(this,pe);S(this,ge);S(this,J,Object.create(null))}insert(e,n,r,s,a){if(e.length===0){if(d(this,pe)!==void 0)throw Se;if(a)return;x(this,pe,n);return}const[i,...o]=e,l=i==="*"?o.length===0?["","",Ie]:["","",Ye]:i==="/*"?["","",Ne]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const u=l[1];let h=l[2]||Ye;if(u&&l[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw Se;if(c=d(this,J)[h],!c){if(Object.keys(d(this,J)).some(m=>m!==Ie&&m!==Ne))throw Se;if(a)return;c=d(this,J)[h]=new ve,u!==""&&x(c,ge,s.varIndex++)}!a&&u!==""&&r.push([u,d(c,ge)])}else if(c=d(this,J)[i],!c){if(Object.keys(d(this,J)).some(u=>u.length>1&&u!==Ie&&u!==Ne))throw Se;if(a)return;c=d(this,J)[i]=new ve}c.insert(o,n,r,s,a)}buildRegExpStr(){const n=Object.keys(d(this,J)).sort(Cn).map(r=>{const s=d(this,J)[r];return(typeof d(s,ge)=="number"?`(${r})@${d(s,ge)}`:$n.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof d(this,pe)=="number"&&n.unshift(`#${d(this,pe)}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},pe=new WeakMap,ge=new WeakMap,J=new WeakMap,ve),Xe,Fe,Ot,On=(Ot=class{constructor(){S(this,Xe,{varIndex:0});S(this,Fe,new jn)}insert(t,e,n){const r=[],s=[];for(let i=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,l=>{const c=`@\\${i}`;return s[i]=[c,l],i++,o=!0,c}),!o)break}const a=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=s.length-1;i>=0;i--){const[o]=s[i];for(let l=a.length-1;l>=0;l--)if(a[l].indexOf(o)!==-1){a[l]=a[l].replace(o,s[i][1]);break}}return d(this,Fe).insert(a,e,r,d(this,Xe),n),r}buildRegExp(){let t=d(this,Fe).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const n=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,a,i)=>a!==void 0?(n[++e]=Number(a),"$()"):(i!==void 0&&(r[Number(i)]=++e),"")),[new RegExp(`^${t}`),n,r]}},Xe=new WeakMap,Fe=new WeakMap,Ot),Rn=[/^$/,[],Object.create(null)],Ge=Object.create(null);function qt(t){return Ge[t]??(Ge[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,n)=>n?`\\${n}`:"(?:|/.*)")}$`))}function Tn(){Ge=Object.create(null)}function _n(t){var c;const e=new On,n=[];if(t.length===0)return Rn;const r=t.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[m,$])=>u?1:m?-1:h.length-$.length),s=Object.create(null);for(let u=0,h=-1,m=r.length;u<m;u++){const[$,j,A]=r[u];$?s[j]=[A.map(([f])=>[f,Object.create(null)]),zt]:h++;let v;try{v=e.insert(j,h,$)}catch(f){throw f===Se?new Ft(j):f}$||(n[h]=A.map(([f,g])=>{const y=Object.create(null);for(g-=1;g>=0;g--){const[C,p]=v[g];y[C]=p}return[f,y]}))}const[a,i,o]=e.buildRegExp();for(let u=0,h=n.length;u<h;u++)for(let m=0,$=n[u].length;m<$;m++){const j=(c=n[u][m])==null?void 0:c[1];if(!j)continue;const A=Object.keys(j);for(let v=0,f=A.length;v<f;v++)j[A[v]]=o[j[A[v]]]}const l=[];for(const u in i)l[u]=n[i[u]];return[a,l,s]}function ye(t,e){if(t){for(const n of Object.keys(t).sort((r,s)=>s.length-r.length))if(qt(n).test(e))return[...t[n]]}}var ie,oe,Qe,Ut,Rt,kn=(Rt=class{constructor(){S(this,Qe);b(this,"name","RegExpRouter");S(this,ie);S(this,oe);b(this,"match",Sn);x(this,ie,{[N]:Object.create(null)}),x(this,oe,{[N]:Object.create(null)})}add(t,e,n){var o;const r=d(this,ie),s=d(this,oe);if(!r||!s)throw new Error(Bt);r[t]||[r,s].forEach(l=>{l[t]=Object.create(null),Object.keys(l[N]).forEach(c=>{l[t][c]=[...l[N][c]]})}),e==="/*"&&(e="*");const a=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const l=qt(e);t===N?Object.keys(r).forEach(c=>{var u;(u=r[c])[e]||(u[e]=ye(r[c],e)||ye(r[N],e)||[])}):(o=r[t])[e]||(o[e]=ye(r[t],e)||ye(r[N],e)||[]),Object.keys(r).forEach(c=>{(t===N||t===c)&&Object.keys(r[c]).forEach(u=>{l.test(u)&&r[c][u].push([n,a])})}),Object.keys(s).forEach(c=>{(t===N||t===c)&&Object.keys(s[c]).forEach(u=>l.test(u)&&s[c][u].push([n,a]))});return}const i=At(e)||[e];for(let l=0,c=i.length;l<c;l++){const u=i[l];Object.keys(s).forEach(h=>{var m;(t===N||t===h)&&((m=s[h])[u]||(m[u]=[...ye(r[h],u)||ye(r[N],u)||[]]),s[h][u].push([n,a-c+l+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(d(this,oe)).concat(Object.keys(d(this,ie))).forEach(e=>{t[e]||(t[e]=O(this,Qe,Ut).call(this,e))}),x(this,ie,x(this,oe,void 0)),Tn(),t}},ie=new WeakMap,oe=new WeakMap,Qe=new WeakSet,Ut=function(t){const e=[];let n=t===N;return[d(this,ie),d(this,oe)].forEach(r=>{const s=r[t]?Object.keys(r[t]).map(a=>[a,r[t][a]]):[];s.length!==0?(n||(n=!0),e.push(...s)):t!==N&&e.push(...Object.keys(r[N]).map(a=>[a,r[N][a]]))}),n?_n(e):null},Rt),ce,te,Tt,Mn=(Tt=class{constructor(t){b(this,"name","SmartRouter");S(this,ce,[]);S(this,te,[]);x(this,ce,t.routers)}add(t,e,n){if(!d(this,te))throw new Error(Bt);d(this,te).push([t,e,n])}match(t,e){if(!d(this,te))throw new Error("Fatal error");const n=d(this,ce),r=d(this,te),s=n.length;let a=0,i;for(;a<s;a++){const o=n[a];try{for(let l=0,c=r.length;l<c;l++)o.add(...r[l]);i=o.match(t,e)}catch(l){if(l instanceof Ft)continue;throw l}this.match=o.match.bind(o),x(this,ce,[o]),x(this,te,void 0);break}if(a===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(d(this,te)||d(this,ce).length!==1)throw new Error("No active router has been determined yet.");return d(this,ce)[0]}},ce=new WeakMap,te=new WeakMap,Tt),Me=Object.create(null),le,B,me,Te,D,ne,ue,_e,An=(_e=class{constructor(e,n,r){S(this,ne);S(this,le);S(this,B);S(this,me);S(this,Te,0);S(this,D,Me);if(x(this,B,r||Object.create(null)),x(this,le,[]),e&&n){const s=Object.create(null);s[e]={handler:n,possibleKeys:[],score:0},x(this,le,[s])}x(this,me,[])}insert(e,n,r){x(this,Te,++dt(this,Te)._);let s=this;const a=on(n),i=[];for(let o=0,l=a.length;o<l;o++){const c=a[o],u=a[o+1],h=dn(c,u),m=Array.isArray(h)?h[0]:c;if(m in d(s,B)){s=d(s,B)[m],h&&i.push(h[1]);continue}d(s,B)[m]=new _e,h&&(d(s,me).push(h),i.push(h[1])),s=d(s,B)[m]}return d(s,le).push({[e]:{handler:r,possibleKeys:i.filter((o,l,c)=>c.indexOf(o)===l),score:d(this,Te)}}),s}search(e,n){var l;const r=[];x(this,D,Me);let a=[this];const i=kt(n),o=[];for(let c=0,u=i.length;c<u;c++){const h=i[c],m=c===u-1,$=[];for(let j=0,A=a.length;j<A;j++){const v=a[j],f=d(v,B)[h];f&&(x(f,D,d(v,D)),m?(d(f,B)["*"]&&r.push(...O(this,ne,ue).call(this,d(f,B)["*"],e,d(v,D))),r.push(...O(this,ne,ue).call(this,f,e,d(v,D)))):$.push(f));for(let g=0,y=d(v,me).length;g<y;g++){const C=d(v,me)[g],p=d(v,D)===Me?{}:{...d(v,D)};if(C==="*"){const H=d(v,B)["*"];H&&(r.push(...O(this,ne,ue).call(this,H,e,d(v,D))),x(H,D,p),$.push(H));continue}const[R,q,z]=C;if(!h&&!(z instanceof RegExp))continue;const I=d(v,B)[R],Ze=i.slice(c).join("/");if(z instanceof RegExp){const H=z.exec(Ze);if(H){if(p[q]=H[0],r.push(...O(this,ne,ue).call(this,I,e,d(v,D),p)),Object.keys(d(I,B)).length){x(I,D,p);const U=((l=H[0].match(/\//))==null?void 0:l.length)??0;(o[U]||(o[U]=[])).push(I)}continue}}(z===!0||z.test(h))&&(p[q]=h,m?(r.push(...O(this,ne,ue).call(this,I,e,p,d(v,D))),d(I,B)["*"]&&r.push(...O(this,ne,ue).call(this,d(I,B)["*"],e,p,d(v,D)))):(x(I,D,p),$.push(I)))}}a=$.concat(o.shift()??[])}return r.length>1&&r.sort((c,u)=>c.score-u.score),[r.map(({handler:c,params:u})=>[c,u])]}},le=new WeakMap,B=new WeakMap,me=new WeakMap,Te=new WeakMap,D=new WeakMap,ne=new WeakSet,ue=function(e,n,r,s){const a=[];for(let i=0,o=d(e,le).length;i<o;i++){const l=d(e,le)[i],c=l[n]||l[N],u={};if(c!==void 0&&(c.params=Object.create(null),a.push(c),r!==Me||s&&s!==Me))for(let h=0,m=c.possibleKeys.length;h<m;h++){const $=c.possibleKeys[h],j=u[c.score];c.params[$]=s!=null&&s[$]&&!j?s[$]:r[$]??(s==null?void 0:s[$]),u[c.score]=!0}}return a},_e),xe,_t,In=(_t=class{constructor(){b(this,"name","TrieRouter");S(this,xe);x(this,xe,new An)}add(t,e,n){const r=At(e);if(r){for(let s=0,a=r.length;s<a;s++)d(this,xe).insert(t,r[s],n);return}d(this,xe).insert(t,e,n)}match(t,e){return d(this,xe).search(t,e)}},xe=new WeakMap,_t),Gt=class extends En{constructor(t={}){super(t),this.router=t.router??new Mn({routers:[new kn,new In]})}},Nn=t=>{const n={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(n.origin),s=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(n.allowMethods);return async function(i,o){var u;function l(h,m){i.res.headers.set(h,m)}const c=await r(i.req.header("origin")||"",i);if(c&&l("Access-Control-Allow-Origin",c),n.credentials&&l("Access-Control-Allow-Credentials","true"),(u=n.exposeHeaders)!=null&&u.length&&l("Access-Control-Expose-Headers",n.exposeHeaders.join(",")),i.req.method==="OPTIONS"){n.origin!=="*"&&l("Vary","Origin"),n.maxAge!=null&&l("Access-Control-Max-Age",n.maxAge.toString());const h=await s(i.req.header("origin")||"",i);h.length&&l("Access-Control-Allow-Methods",h.join(","));let m=n.allowHeaders;if(!(m!=null&&m.length)){const $=i.req.header("Access-Control-Request-Headers");$&&(m=$.split(/\s*,\s*/))}return m!=null&&m.length&&(l("Access-Control-Allow-Headers",m.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),n.origin!=="*"&&i.header("Vary","Origin",{append:!0})}},Pn=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,pt=(t,e=Ln)=>{const n=/\.([a-zA-Z0-9]+?)$/,r=t.match(n);if(!r)return;let s=e[r[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},Hn={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Ln=Hn,Dn=(...t)=>{let e=t.filter(s=>s!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const n=e.split("/"),r=[];for(const s of n)s===".."&&r.length>0&&r.at(-1)!==".."?r.pop():s!=="."&&r.push(s);return r.join("/")||"."},Vt={br:".br",zstd:".zst",gzip:".gz"},Bn=Object.keys(Vt),Fn="index.html",Kn=t=>{const e=t.root??"./",n=t.path,r=t.join??Dn;return async(s,a)=>{var u,h,m,$;if(s.finalized)return a();let i;if(t.path)i=t.path;else try{if(i=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))throw new Error}catch{return await((u=t.onNotFound)==null?void 0:u.call(t,s.req.path,s)),a()}let o=r(e,!n&&t.rewriteRequestPath?t.rewriteRequestPath(i):i);t.isDir&&await t.isDir(o)&&(o=r(o,Fn));const l=t.getContent;let c=await l(o,s);if(c instanceof Response)return s.newResponse(c.body,c);if(c){const j=t.mimes&&pt(o,t.mimes)||pt(o);if(s.header("Content-Type",j||"application/octet-stream"),t.precompressed&&(!j||Pn.test(j))){const A=new Set((h=s.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(v=>v.trim()));for(const v of Bn){if(!A.has(v))continue;const f=await l(o+Vt[v],s);if(f){c=f,s.header("Content-Encoding",v),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=t.onFound)==null?void 0:m.call(t,o,s)),s.body(c)}await(($=t.onNotFound)==null?void 0:$.call(t,o,s)),await a()}},zn=async(t,e)=>{let n;e&&e.manifest?typeof e.manifest=="string"?n=JSON.parse(e.manifest):n=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?n=JSON.parse(__STATIC_CONTENT_MANIFEST):n=__STATIC_CONTENT_MANIFEST;let r;e&&e.namespace?r=e.namespace:r=__STATIC_CONTENT;const s=n[t];if(!s)return null;const a=await r.get(s,{type:"stream"});return a||null},qn=t=>async function(n,r){return Kn({...t,getContent:async a=>zn(a,{manifest:t.manifest,namespace:t.namespace?t.namespace:n.env?n.env.__STATIC_CONTENT:void 0})})(n,r)},Un=t=>qn(t);const Q=new Gt,Ve=new Map,Gn=1e3*60*60*24*7;let st=!1;function Wt(){return new Date().toISOString()}function X(t){return t==null?"":String(t)}function We(t,e,n){return Math.max(e,Math.min(n,t))}function it(t){return(t||"").replace(/\s+/g,"")}function he(t){return it(t).length}function Vn(t){const e=X(t).trim().toLowerCase();return e?e==="brief"||e==="simple"||e==="short"||e==="lite"?"brief":e==="detail"||e==="detailed"||e==="full"?"detail":"standard":"standard"}function Wn(t){const e=X(t).trim().toLowerCase();return e?e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"||e==="mind_map"?"mindmap":"narrative":"narrative"}function Yn(t){const e=X(t).trim().toLowerCase();return e==="concept"?"concept":e==="exam"?"exam":"summary"}function Jn(t){const e=(t||"").replace(/\s+/g," ").trim();if(!e)return[];const n=[];let r="",s=!1;for(let a=0;a<e.length;a++){const i=e[a],o=e[a+1];(i==='"'||i==='"'||i==='"')&&(s=!s),r+=i,!s&&/[\.\?\!]/.test(i)&&o===" "?i==="."&&r.endsWith("...")||(n.push(r.trim()),r="",a++):!s&&/[다요죠]/.test(i)&&o===" "&&(n.push(r.trim()),r="",a++)}return r.trim()&&n.push(r.trim()),n.length?n:[e]}const Xn=new Set(["그리고","그러나","하지만","또한","및","또","또는","즉","때문에","따라서","그래서","한편","이것","그것","저것","에서","으로","에게","부터","까지","보다","처럼","같이","의","가","이","은","는","을","를","과","와","도","만","하다","된다","있다","없다","이다","아니다","수","등","및","것","들","좀","매우","정말"]),Qn=[new Set(["안식처","힐링","치유","여유","안정","위로","휴식","쉼","평온","평화"]),new Set(["생태계","자연","환경","서식지","숲","공간","장소"]),new Set(["학습","공부","교육","배움","활동","체험","경험"]),new Set(["기술","방법","수단","방식"]),new Set(["오감","감각","느낌","감성","정서","심리"]),new Set(["탐색","탐구","관찰","발견"]),new Set(["성장","발달","발전","향상"])];function Zn(t){const e=new Set;for(const n of t){let r=!1;for(const s of Qn)if(s.has(n)){e.add(Array.from(s)[0]),r=!0;break}r||e.add(n)}return e}function Je(t){return(t||"").toLowerCase().replace(/[^0-9a-z가-힣\s]/g," ").split(/\s+/).map(e=>e.trim()).map(e=>e.replace(/에게$/g,"").replace(/에서$/g,"").replace(/으로$/g,"").replace(/를$/g,"").replace(/을$/g,"").replace(/의$/g,"").replace(/하는$/g,"하").replace(/하$/g,"하")).filter(e=>e.length>=2&&!Xn.has(e))}function er(t){const e=new Map;for(const r of t)for(const s of Je(r))e.set(s,(e.get(s)||0)+1);return t.map((r,s)=>{const a=Je(r);let i=0;for(const c of a)i+=e.get(c)||0;const o=r.length,l=o<15?.7:o>180?.85:1;return{idx:s,s:r,score:i*l}})}function tr(t,e){return er(t).slice().sort((s,a)=>a.score-s.score).slice(0,We(e,1,Math.max(1,t.length))).sort((s,a)=>s.idx-a.idx).map(s=>s.s)}function Yt(t){return t==="brief"?{min:.1,max:.15}:t==="standard"?{min:.25,max:.3}:{min:.45,max:.55}}function nr(t,e){const n=Math.max(50,he(t)),{min:r,max:s}=Yt(e);return{min:Math.floor(n*r),max:Math.ceil(n*s),base:n}}function gt(t,e,n=24){const r=it(t),s=it(e);if(r.length<n||s.length<n)return!1;const a=new Set;for(let i=0;i<=r.length-n;i+=2)a.add(r.slice(i,i+n));for(let i=0;i<=s.length-n;i+=2)if(a.has(s.slice(i,i+n)))return!0;return!1}function mt(t,e){const n=/(숲|산림|삼림).*(정의|의미|집합체|생태학)/.test(e),r=/(치유|안정|여유|안식|힐링|교육|가치|발달)/.test(e),s=/(숲\s*체험|체험\s*활동|오감|놀이\s*중심)/.test(e);return n&&r&&s}function ot(t){let e=(t||"").trim();return e=e.replace(/모\s+든/g,"모든"),e=e.replace(/기\s+회/g,"기회"),e=e.replace(/이\s+루어지는/g,"이루어지는"),e=e.replace(/루어지는/g,"이루어지는"),e=e.replace(/생태계물/g,"자연물"),e=e.replace(/놀은\s+는/g,"놀이는"),e=e.replace(/형성은\s+는/g,"형성은"),e=e.replace(/입니다\.\s*이는\s+/g,"이다. "),e=e.replace(/입니다\.\s*또한\s+/g,"이다. 또한 "),e=e.replace(/입니다\.\s*즉\s+/g,"이다. 즉 "),e=e.replace(/\s*\.\s*/g,". "),e=e.replace(/\s*,\s*/g,", "),e=e.replace(/\s*;\s*/g,"; "),e=e.replace(/[ ]{2,}/g," "),e=e.replace(/\n{3,}/g,`

`),e.trim()}function rr(){return`
너는 한국어 학술 텍스트 요약 엔진이다.
절대 규칙:
- 원문에 없는 사실/주장/인과/수치/연구결과를 추가하지 마라.
- 원문에 없는 참고문헌(저자, 연도)을 새로 만들지 마라.
- 요약은 "추출형 복붙"이 아니라, 의미를 유지한 "서술형 재구성"이어야 한다.
- 동일한 표현을 길게 복사하지 마라(연속 문구 복사 금지).
- 문장은 자연스러운 연결어로 매끄럽게 이어라.
- 과장 표현/단정(반드시/항상/완벽히)을 피하라.
출력은 오직 요약 본문만. 제목/머리말/목록 기호/메타설명 금지.
`.trim()}function xt(t,e){const n=Yt(e),r=e==="brief"?"간단 서술 요약: 정의(숲이 무엇인지) + 의미/기능(치유·교육 가치) + 숲 체험 활동 개념(무엇인지)을 모두 1문단으로 포함하라.":e==="standard"?"표준 서술 요약: 정의/의미/숲 체험 활동 개념/발달 영향/교육적 가치의 균형을 갖추어 2~4문단으로 서술하라.":"상세 서술 요약: 원문의 흐름을 유지하되 중복을 줄이고 연결어를 자연스럽게 하여 4~7문단으로 서술하라.";return`
[요약 모드] ${e}
[요약율] 원문(공백 제외) 대비 ${(n.min*100).toFixed(0)}~${(n.max*100).toFixed(0)}% 범위

[작성 지침]
- ${r}
- 원문에 있는 개념/정의/효과만 사용하고, 표현은 새롭게 재구성하라.
- 인용(저자, 연도)은 원문에 있는 것만 유지하되, 필요 없는 과다 인용은 줄여ra.

[원문]
${t}
`.trim()}const sr={definition:["의미","정의","사전","생태학적","개념","이란","무엇","장소"],meaning:["의미","가치","치유","안정","교육적","기능","중요","효과"],activity:["체험","활동","교육","놀이","경험","학습","탐색","참여"]};function vt(t){const e={definition:0,meaning:0,activity:0};for(const[r,s]of Object.entries(sr))for(const a of s)t.includes(a)&&e[r]++;const n=Math.max(e.definition,e.meaning,e.activity);return n===0?null:e.definition===n?"definition":e.meaning===n?"meaning":"activity"}function ar(t,e,n){const r=he(e),s=[],a=new Set,i=/\(([^)]+,?\s*\d{4})\)/g;let o;for(;(o=i.exec(e))!==null;)a.add(o[1]);for(const f of t){const g=[];let y;const C=/\(([^)]+,?\s*\d{4})\)/g;for(;(y=C.exec(f))!==null;){const q=y[1];a.has(q)&&g.push(q)}let p=f.replace(/\(([^)]+,?\s*\d{4})\)/g,"").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g,"").replace(/[\.。\?\!]+$/,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[[^\]]*\]/g,"").replace(/\s*-\s*\d+\s*-\s*/g," ").replace(/것이\s+다/g,"것이다").replace(/바이\s+다/g,"바이다").replace(/직\s+접/g,"직접").replace(/만나\s+게/g,"만나게").replace(/자유롭\s+게/g,"자유롭게").replace(/\s{2,}/g," ").trim();if(p.length<10)continue;const R=Je(p).slice(0,8);s.push({original:f,clean:p,keywords:R,citations:g}),p.includes("(")&&console.log("[DEBUG] 인용 미제거:",p.slice(0,100))}if(s.length===0)return"요약할 내용이 부족합니다.";const l=new Map;for(const f of s)for(const g of f.keywords)l.set(g,(l.get(g)||0)+1);const c=[];for(const f of s){new Set(f.keywords);let g=!1;for(const y of c)if(f.keywords.filter(p=>y.keywords.has(p)).length>=2){y.sentences.push({clean:f.clean,citations:f.citations}),f.keywords.forEach(p=>y.keywords.add(p)),g=!0;break}g||c.push({keywords:new Set(f.keywords),sentences:[{clean:f.clean,citations:f.citations}]})}const u=c.map(f=>{const g=f.sentences[0].clean,y=s.findIndex(C=>C.clean===g);return{...f,originalIdx:y}});let h="";if(n==="brief"){const f={definition:[],meaning:[],activity:[]};for(const w of u)for(const E of w.sentences){const T=vt(E.clean);T&&f[T].push(E)}const g=f.definition[0],y=f.meaning[0],C=f.activity[0],p=[],R=[];if(g&&(p.push(g.clean),R.push(...g.citations.filter(Boolean))),y&&(p.push(y.clean),R.push(...y.citations.filter(Boolean))),C&&(p.push(C.clean),R.push(...C.citations.filter(Boolean))),p.length===0){const E=u.sort((T,L)=>L.sentences.length-T.sentences.length)[0].sentences[0];p.push(E.clean),R.push(...E.citations.filter(Boolean))}const q=Array.from(new Set(R)),z=q.length>0?`(${q.join("; ")})`:"",I=p.map(w=>{let E=w;for(;E.includes("(");)E=E.replace(/\([^)]*\)/g,"");return E.trim()});I.length===1?h=`${I[0]}${z}.`:I.length===2?h=`${I[0]}. ${I[1]}${z}.`:h=`${I[0]}하며 ${I[1]}. ${I[2]}${z}.`;const H=he(h)/r*100;if(H>15){let w=h.slice(0,60);w=w.replace(/\([^)]*\)/g,"").trim(),h=w+(z?` ${z}.`:".")}const U=[];return g&&U.push("definition"),y&&U.push("meaning"),C&&U.push("activity"),typeof console<"u"&&console.log("[Brief Summary Meta]",{rolesFilled:U,sentenceCount:p.length,compressionRatio:H.toFixed(1)+"%",passed:H<=15}),h}if(n==="standard"){const f=u.sort((w,E)=>E.sentences.length-w.sentences.length).slice(0,3).sort((w,E)=>w.originalIdx-E.originalIdx);if(f.length===1){const w=f[0].sentences[0],E=f[0].sentences.flatMap(L=>L.citations).filter(Boolean),T=E.length>0?`(${E.join("; ")})`:"";return`${w.clean}${T}.`}const g=new Map,y=new Map,C={오감:["감각","감각적 경험","직접 체험"],탐색:["탐구","관찰","발견"],체험:["경험","활동","학습"],자연:["숲","환경","생태계"]};for(const w of f)for(const E of w.sentences){const T=E.clean.match(/^(.+?)[은는이가]\s*(.+)$/);if(T){let[,L,Ke]=T;L=L.replace(/[에게서로부터]$/g,"").trim(),g.has(L)||g.set(L,[]);let F=Ke.trim();F=F.replace(/[\.。\?\!]+$/g,"").trim();for(const[M,ke]of Object.entries(C))if(F.includes(M)){const be=y.get(M)||0;if(y.set(M,be+1),be>=1&&ke.length>0){const et=Math.min(be-1,ke.length-1);F=F.replace(M,ke[et])}}const _=new Set(Je(F)),k=Zn(_),V=new Set(["오감","감각","감각적","체험","경험","활동","학습"]);for(const M of V)k.delete(M);g.get(L).push({original:F,keywords:k,citations:E.citations})}}const p=[];for(const[w,E]of g.entries()){const T=E.flatMap(_=>_.citations).filter(Boolean),L=w.charAt(w.length-1),F=/[가-힣]/.test(L)&&(L.charCodeAt(0)-44032)%28!==0?"은":"는";if(E.length===1){const _=E[0].original,k=(_.match(/,/g)||[]).length;if(_.length>80&&k>=2){const V=_.split(",").map(M=>M.trim()).filter(M=>M.length>0);if(V.length>=2){p.push({text:`${w}${F} ${V[0]}`,citations:[]});for(let M=1;M<V.length-1;M++)p.push({text:`${V[M]}`,citations:[]});p.push({text:`${V[V.length-1]}`,citations:E[0].citations})}else p.push({text:`${w}${F} ${_}`,citations:T})}else p.push({text:`${w}${F} ${_}`,citations:T})}else{const _=[];for(const k of E){let V=!1;for(const M of _){const ke=Array.from(k.keywords).filter(et=>M.keywords.has(et)).length,be=Math.max(k.keywords.size,M.keywords.size);if(be>0&&ke/be>=.8){k.original.length>M.original.length&&(M.original=k.original,M.keywords=k.keywords),M.citations.push(...k.citations),V=!0;break}}V||_.push({original:k.original,keywords:k.keywords,citations:[...k.citations]})}if(_.length===1)p.push({text:`${w}${F} ${_[0].original}`,citations:_.flatMap(k=>k.citations)});else if(_.length===2)p.push({text:`${w}${F} ${_[0].original}`,citations:_[0].citations}),p.push({text:`${w}${F} ${_[1].original}`,citations:_[1].citations});else for(let k=0;k<_.length;k++)p.push({text:`${w}${F} ${_[k].original}`,citations:_[k].citations})}}if(p.length===0)return"요약할 내용이 부족합니다.";if(p.length===1){const w=p[0].citations.filter(Boolean),E=w.length>0?`(${w.join("; ")})`:"";return`${p[0].text}${E}.`}if(p.length===2){const w=p[0].citations.filter(Boolean),E=p[1].citations.filter(Boolean),T=w.length>0?`(${w.join("; ")})`:"",L=E.length>0?`(${E.join("; ")})`:"";return`${p[0].text}${T}. ${p[1].text}${L}.`}const R=[],q=p[0],z=q.citations.filter(Boolean),I=z.length>0?`(${z.join("; ")})`:"";if(R.push(`${q.text}${I}.`),p.length>=2){const w=p[1],E=w.citations.filter(Boolean),T=E.length>0?`(${E.join("; ")})`:"";R.push(`${w.text}${T}.`)}if(p.length>=3){const E=p.slice(2).map(T=>{const L=T.citations.filter(Boolean),Ke=L.length>0?`(${L.join("; ")})`:"";return`${T.text}${Ke}.`});R.push(E.join(" "))}h=R.join(`

`);const H=he(h)/r*100;H>30&&(R.length>3?h=R.slice(0,3).join(`

`):h=R.join(`

`));const U=[];for(const w of f)for(const E of w.sentences){const T=vt(E.clean);T&&!U.includes(T)&&U.push(T)}return typeof console<"u"&&console.log("[Standard Summary Meta]",{rolesFilled:U,sentenceCount:p.length,paragraphCount:R.length,compressionRatio:H.toFixed(1)+"%",passed:H>=25&&H<=30}),h}const m=u.sort((f,g)=>g.sentences.length-f.sentences.length).slice(0,5).sort((f,g)=>f.originalIdx-g.originalIdx);let $=m.map((f,g)=>{const y=f.sentences[0],C=f.sentences.flatMap(R=>R.citations).filter(Boolean),p=C.length>0?`(${C.join("; ")})`:"";return g===0?`${y.clean}${p}.`:g===m.length-1?`마지막으로 ${y.clean}${p}.`:`또한 ${y.clean}${p}.`}).join(" ");return he($)/r*100>(n==="brief"?15:n==="standard"?30:55)&&n==="detail"?m.slice(0,3).map((g,y)=>{const C=g.sentences[0],p=g.sentences.flatMap(q=>q.citations).filter(Boolean),R=p.length>0?`(${p.join("; ")})`:"";return y===0?`${C.clean}${R}.`:y===2?`마지막으로 ${C.clean}${R}.`:`또한 ${C.clean}${R}.`}).join(" "):$}function ir(t,e,n){const r=Jn(t),s=e==="brief"?We(Math.round(r.length*.18),2,4):e==="standard"?We(Math.round(r.length*.28),4,8):We(Math.round(r.length*.4),7,14),a=tr(r,s);if(n==="narrative"){let o=ar(a,t,e);return o=ot(o),{kind:"summary",mode:e,viewType:n,narrative:o}}if(n==="structured")return{kind:"summary",mode:e,viewType:n,structured:{title:"구조화 요약",bullets:a.map((o,l)=>`- (${l+1}) ${o}`)}};if(n==="mindmap"){const o=(a[0]||r[0]||"핵심").slice(0,40),l=[{id:"c",label:o,level:0}],c=[];return a.slice(1).forEach((u,h)=>{const m=`n${h+1}`;l.push({id:m,label:u.slice(0,60),level:1}),c.push({from:"c",to:m})}),{kind:"summary",mode:e,viewType:n,mindmap:{center:o,nodes:l,edges:c}}}const i=a.map((o,l)=>({id:`q${l+1}`,type:"short",question:`(${l+1}) 다음 내용을 한 문장으로 설명해보세요: "${o.slice(0,70)}"`,answerHint:o}));return{kind:"summary",mode:e,viewType:n,selftest:{title:"셀프테스트",questions:i}}}function Jt(t){if(!t)return"empty";let e=2166136261,n=0;for(let a=0;a<t.length;a++){const i=t.charCodeAt(a);e^=i,e+=(e<<1)+(e<<4)+(e<<7)+(e<<8)+(e<<24),n=(n<<5)-n+i,n|=0}const r=(e>>>0).toString(16),s=(Math.abs(n)>>>0).toString(16);return`${t.length.toString(16)}_${r}_${s}`}function or(t,e,n,r){const s=Jt(n);return`${t}::${r||"anon"}::${e}::base::${s}`}function cr(t,e,n,r,s){const a=Jt(r);return`${t}::${s||"anon"}::${e}::${n}::${a}`}async function lr(t){if(!st){if(!t){st=!0;return}await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),st=!0}}async function bt(t,e){const n=Date.now(),r=Ve.get(e);if(r&&n-r.createdAt<Gn)return{hit:!0,data:r.data,store:"mem"};if(r&&Ve.delete(e),!t)return{hit:!1};const s=await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();if(!(s!=null&&s.response_json))return{hit:!1};try{const a=JSON.parse(s.response_json);return Ve.set(e,{data:a,createdAt:n}),{hit:!0,data:a,store:"d1"}}catch{return{hit:!1}}}async function Ae(t,e,n,r){const s=Date.now();Ve.set(e,{data:r,createdAt:s}),t&&await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e,n,JSON.stringify(r),Wt()).run()}function yt(t){const e=t.split(/\n\n+/).filter(r=>r.trim());return{kind:"summary",viewType:"structured",structured:{title:"구조화 요약",bullets:e.length>1?e.map((r,s)=>`- (${s+1}) ${r}`):t.split(/[\.。]\s+/).filter(r=>r.trim()).map((r,s)=>`- (${s+1}) ${r}.`)}}}function wt(t){const e=t.split(/[\.。]\s+/).filter(a=>a.trim()).map(a=>a.trim()),n=(e[0]||"핵심").slice(0,40),r=[{id:"c",label:n,level:0}],s=[];return e.slice(1).forEach((a,i)=>{const o=`n${i+1}`;r.push({id:o,label:a.slice(0,60),level:1}),s.push({from:"c",to:o})}),{kind:"summary",viewType:"mindmap",mindmap:{center:n,nodes:r,edges:s}}}function Et(t){return{kind:"summary",viewType:"selftest",selftest:{title:"셀프테스트",questions:t.split(/[\.。]\s+/).filter(r=>r.trim()).map(r=>r.trim()).map((r,s)=>({id:`q${s+1}`,type:"short",question:`(${s+1}) 다음 내용을 한 문장으로 설명해보세요: "${r.slice(0,70)}"`,answerHint:r}))}}}async function St(t,e,n){var c,u,h,m,$;const r=X(t.GEMINI_API_KEY).trim();if(!r)throw new Error("GEMINI_API_KEY is missing");const s=X(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",a=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(s)}:generateContent?key=${encodeURIComponent(r)}`,i={system_instruction:{parts:[{text:e}]},contents:[{role:"user",parts:[{text:n}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let o=0,l=500;for(;o<3;){o++;const j=await fetch(a,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(i)});if(j.ok){const v=await j.json();return(($=(m=(h=(u=(c=v==null?void 0:v.candidates)==null?void 0:c[0])==null?void 0:u.content)==null?void 0:h.parts)==null?void 0:m[0])==null?void 0:$.text)??""}if(j.status===429||j.status===503){await new Promise(v=>setTimeout(v,l)),l*=2;continue}const A=await j.text().catch(()=>"");throw new Error(`Gemini error ${j.status}: ${A.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function dr(t,e,n){const{min:r,max:s}=nr(e,n),a=rr();let i="";for(let o=1;o<=3;o++){const l=xt(e,n);let c=await St(t,a,l);c=ot(c);const u=he(c),h=u>=r&&u<=s,m=gt(e,c,24),$=n==="detail"?!0:mt(e,c);if(h&&!m&&$)return console.log(`[Enforced Summary] mode=${n}, len=${u}, attempt=${o}, ✅ PASS`),c;const j=[h?"":u<r?`길이가 너무 짧다. 공백 제외 글자 수를 ${r}~${s}자로 늘려라.`:`길이가 너무 길다. 공백 제외 글자 수를 ${r}~${s}자로 줄여라.`,m?"원문 표현을 길게 복사했다. 같은 표현을 피하고 서술형으로 재구성하라.":"",$?"":"정의/의미/체험활동 개념 3요소를 모두 포함하라."].filter(Boolean).join(" ");i=c,console.log(`[Enforced Summary] mode=${n}, len=${u}, attempt=${o}, ❌ RETRY: ${j}`);const A=`
${xt(e,n)}

[추가 수정 지시]
${j}
- 결과는 자연스러운 한국어 문장으로만 출력하라.
`.trim();let v=await St(t,a,A);v=ot(v);const f=he(v),g=f>=r&&f<=s,y=gt(e,v,24),C=n==="detail"?!0:mt(e,v);if(g&&!y&&C)return console.log(`[Enforced Summary] mode=${n}, len=${f}, attempt=${o}.retry, ✅ PASS`),v;i=v}return console.warn(`[Enforced Summary] mode=${n}, ⚠️ 3회 실패, 마지막 결과 반환`),i||""}const ur=`/* MindStory Engine Bundle (compat) */
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
})();`;Q.use("/api/*",Nn());Q.get("/static/ms-engine-bundle.js",t=>t.text(ur,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));Q.get("/favicon.ico",t=>t.body(null,204));Q.use("/static/*",Un({root:"./public"}));Q.get("/",t=>t.html(`<!DOCTYPE html>
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

  <script src="/static/ms-engine-bundle.js"><\/script>
  <script>
    let currentMode = 'standard';
    let currentView = 'narrative';

    const elInput = document.getElementById('inputText');
    const elChar = document.getElementById('charCount');
    const elSumm = document.getElementById('summarizeBtn');
    const elClear = document.getElementById('clearBtn');
    const elOut = document.getElementById('out');
    const elErr = document.getElementById('errBox');
    const elMeta = document.getElementById('resultMeta');
    const elCopy = document.getElementById('copyBtn');
    const elRunBadge = document.getElementById('runBadge');
    const elRunText = document.getElementById('runText');
    const elSpin = document.getElementById('spin');

    const healthDot = document.getElementById('healthDot');
    const healthText = document.getElementById('healthText');
    const healthMeta = document.getElementById('healthMeta');

    function setErr(msg){
      if(!msg){ elErr.style.display='none'; elErr.textContent=''; return; }
      elErr.style.display='block';
      elErr.textContent = msg;
    }
    function setRunning(r){
      elSpin.style.display = r ? 'inline-block' : 'none';
      elRunText.textContent = r ? '실행 중' : '대기';
    }

    function pickActive(seg, key, value){
      seg.querySelectorAll('.btn').forEach(b=>{
        const v = b.dataset[key];
        if(v === value) b.classList.add('active');
        else b.classList.remove('active');
      });
    }

    document.getElementById('modeSeg').addEventListener('click', (e)=>{
      const btn = e.target.closest('.btn');
      if(!btn) return;
      currentMode = btn.dataset.mode;
      pickActive(document.getElementById('modeSeg'), 'mode', currentMode);
    });

    document.getElementById('viewSeg').addEventListener('click', (e)=>{
      const btn = e.target.closest('.btn');
      if(!btn) return;
      currentView = btn.dataset.view;
      pickActive(document.getElementById('viewSeg'), 'view', currentView);
    });

    elInput.addEventListener('input', ()=>{
      const n = elInput.value.length;
      elChar.textContent = n;
      elSumm.disabled = n < 5;
      setErr('');
    });

    elClear.addEventListener('click', ()=>{
      elInput.value = '';
      elChar.textContent = '0';
      elSumm.disabled = true;
      setErr('');
      elOut.innerHTML = '<div class="meta">초기화되었습니다.</div>';
      elMeta.textContent = '—';
    });

    elCopy.addEventListener('click', async ()=>{
      const text = elOut.innerText || '';
      try{
        await navigator.clipboard.writeText(text);
        elCopy.textContent = '✅ 복사됨';
        setTimeout(()=> elCopy.textContent='📋 복사', 1200);
      }catch{
        alert('복사에 실패했습니다.');
      }
    });

    function render(data){
      // data: { kind, mode, viewType, narrative|structured|mindmap|selftest }
      const v = currentView;
      if(v === 'narrative' && data.narrative){
        elOut.innerHTML = '<h3>서술형 요약</h3><div>' + escapeHtml(data.narrative) + '</div>';
        return;
      }
      if(v === 'structured' && data.structured){
        const bullets = data.structured.bullets || [];
        elOut.innerHTML = '<h3>' + escapeHtml(data.structured.title || '구조화 요약') + '</h3><ul>' +
          bullets.map(b=>'<li>' + escapeHtml(String(b).replace(/^[-•]\\s*/,'')) + '</li>').join('') +
        '</ul>';
        return;
      }
      if(v === 'mindmap' && data.mindmap){
        const center = data.mindmap.center || '핵심';
        const nodes = (data.mindmap.nodes || []).filter(n=>n.id !== 'c');
        elOut.innerHTML =
          '<h3>마인드맵(간이)</h3>' +
          '<div style="display:flex; flex-direction:column; gap:10px;">' +
            '<div class="badge">🌟 ' + escapeHtml(center) + '</div>' +
            '<ul>' + nodes.map(n=>'<li>' + escapeHtml(n.label || '') + '</li>').join('') + '</ul>' +
          '</div>';
        return;
      }
      if(v === 'selftest' && data.selftest){
        const qs = data.selftest.questions || [];
        elOut.innerHTML = '<h3>' + escapeHtml(data.selftest.title || '셀프테스트') + '</h3>' +
          qs.map((q,i)=>(
            '<div style="padding:10px 12px; border:1px solid rgba(255,255,255,.10); border-radius:12px; background:rgba(255,255,255,.04); margin:10px 0;">' +
              '<div style="font-weight:700; margin-bottom:6px;">Q' + (i+1) + '. ' + escapeHtml(q.question || '') + '</div>' +
              '<div class="meta">힌트: ' + escapeHtml(q.answerHint || '') + '</div>' +
            '</div>'
          )).join('');
        return;
      }
      elOut.innerHTML = '<div class="meta">선택한 보기 형식에 해당 결과가 없습니다.</div>';
    }

    function escapeHtml(s){
      return String(s).replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
    }

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

    elSumm.addEventListener('click', async ()=>{
      const text = (elInput.value || '').trim();
      if(text.length < 5) return;

      setErr('');
      setRunning(true);
      elMeta.textContent = '—';

      try{
        const res = await fetch('/api/engine', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body: JSON.stringify({
            kind: 'summary',
            text,
            mode: currentMode,
            viewType: currentView,
            options: { userId: 'web_user' }
          })
        });
        const j = await res.json();
        if(!j.ok){
          throw new Error(j.error?.message || '요약 실패');
        }
        render(j.data);
        const m = j.meta || {};
        elMeta.textContent =
          'engine: ' + (m.engine || 'unknown') +
          ' · cached: ' + (m.cached ? 'true' : 'false') +
          (m.cacheStore ? ('(' + m.cacheStore + ')') : '') +
          ' · ' + (m.elapsedMs != null ? (m.elapsedMs + 'ms') : '');
      }catch(e){
        setErr(e && e.message ? e.message : '요약 중 오류가 발생했습니다.');
      }finally{
        setRunning(false);
      }
    });
  <\/script>
</body>
</html>`));Q.get("/api/health",t=>{const e=!!X(t.env.GEMINI_API_KEY).trim(),n=X(t.env.USE_MOCK).trim().toLowerCase()==="true";return t.json({ok:!0,ts:Wt(),hasDB:!!t.env.DB,hasGeminiKey:e,engineMode:e&&!n?"gemini+fallback":"local-only"})});Q.post("/api/engine",async t=>{var v,f;const e=Date.now(),n=t.env.DB;await lr(n);let r=null;try{r=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=Yn(r==null?void 0:r.kind),a=X((r==null?void 0:r.text)||""),i=Vn((r==null?void 0:r.mode)||(r==null?void 0:r.level)),o=Wn((r==null?void 0:r.viewType)||(r==null?void 0:r.displayMode)),l=X(((v=r==null?void 0:r.options)==null?void 0:v.userId)||(r==null?void 0:r.userId)||"anon");if(!a.trim()||a.trim().length<5)return t.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const c=cr(s,i,o,a,l||null),u=await bt(n,c);if(u.hit)return t.json({ok:!0,data:u.data,meta:{cached:!0,cacheStore:u.store,cacheType:"derived",engine:"cache",elapsedMs:Date.now()-e}},200);const h=or(s,i,a,l||null),m=await bt(n,h);if(m.hit&&((f=m.data)!=null&&f.narrative)){const g=m.data.narrative;let y;return o==="narrative"?y={kind:s,mode:i,viewType:o,narrative:g}:o==="structured"?y={kind:s,mode:i,...yt(g)}:o==="mindmap"?y={kind:s,mode:i,...wt(g)}:y={kind:s,mode:i,...Et(g)},await Ae(n,c,l||"anon",y),t.json({ok:!0,data:y,meta:{cached:!0,cacheStore:"derived",cacheType:"converted",engine:"local-convert",elapsedMs:Date.now()-e}},200)}const $=!!X(t.env.GEMINI_API_KEY).trim(),j=X(t.env.USE_MOCK).trim().toLowerCase()==="true";if(s==="summary"&&$&&!j)try{const g=await dr(t.env,a,i),y={kind:s,mode:i,viewType:"narrative",narrative:g};await Ae(n,h,l||"anon",y);let C;return o==="narrative"?C=y:o==="structured"?C={kind:s,mode:i,...yt(g)}:o==="mindmap"?C={kind:s,mode:i,...wt(g)}:C={kind:s,mode:i,...Et(g)},await Ae(n,c,l||"anon",C),t.json({ok:!0,data:C,meta:{cached:!1,engine:"gemini-enforced",elapsedMs:Date.now()-e}},200)}catch(g){console.error("[Gemini Enforced Error]",g)}const A=ir(a,i,o);if(await Ae(n,c,l||"anon",A),A.narrative){const g={kind:"summary",mode:i,viewType:"narrative",narrative:A.narrative};await Ae(n,h,l||"anon",g)}return t.json({ok:!0,data:A,meta:{cached:!1,engine:"local",elapsedMs:Date.now()-e}},200)});Q.get("/health",t=>t.json({ok:!0,service:"MindStory v2 Revised"}));Q.notFound(t=>t.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const $t=new Gt,hr=Object.assign({"/src/index.tsx":Q});let Xt=!1;for(const[,t]of Object.entries(hr))t&&($t.route("/",t),$t.notFound(t.notFoundHandler),Xt=!0);if(!Xt)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{$t as default};
