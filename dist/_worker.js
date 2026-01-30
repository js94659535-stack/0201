var Jt=Object.defineProperty;var ct=t=>{throw TypeError(t)};var Wt=(t,e,r)=>e in t?Jt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var b=(t,e,r)=>Wt(t,typeof e!="symbol"?e+"":e,r),nt=(t,e,r)=>e.has(t)||ct("Cannot "+r);var d=(t,e,r)=>(nt(t,e,"read from private field"),r?r.call(t):e.get(t)),S=(t,e,r)=>e.has(t)?ct("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),x=(t,e,r,n)=>(nt(t,e,"write to private field"),n?n.call(t,r):e.set(t,r),r),O=(t,e,r)=>(nt(t,e,"access private method"),r);var lt=(t,e,r,n)=>({set _(s){x(t,e,s,r)},get _(){return d(t,e,n)}});var dt=(t,e,r)=>(n,s)=>{let a=-1;return i(0);async function i(o){if(o<=a)throw new Error("next() called multiple times");a=o;let c,l=!1,u;if(t[o]?(u=t[o][0][0],n.req.routeIndex=o):u=o===t.length&&s||void 0,u)try{c=await u(n,()=>i(o+1))}catch(h){if(h instanceof Error&&e)n.error=h,c=await e(h,n),l=!0;else throw h}else n.finalized===!1&&r&&(c=await r(n));return c&&(n.finalized===!1||l)&&(n.res=c),n}},Vt=Symbol(),Yt=async(t,e=Object.create(null))=>{const{all:r=!1,dot:n=!1}=e,a=(t instanceof Rt?t.raw.headers:t.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?Xt(t,{all:r,dot:n}):{}};async function Xt(t,e){const r=await t.formData();return r?Qt(r,e):{}}function Qt(t,e){const r=Object.create(null);return t.forEach((n,s)=>{e.all||s.endsWith("[]")?Zt(r,s,n):r[s]=n}),e.dot&&Object.entries(r).forEach(([n,s])=>{n.includes(".")&&(en(r,n,s),delete r[n])}),r}var Zt=(t,e,r)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(r):t[e]=[t[e],r]:e.endsWith("[]")?t[e]=[r]:t[e]=r},en=(t,e,r)=>{let n=t;const s=e.split(".");s.forEach((a,i)=>{i===s.length-1?n[a]=r:((!n[a]||typeof n[a]!="object"||Array.isArray(n[a])||n[a]instanceof File)&&(n[a]=Object.create(null)),n=n[a])})},jt=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},tn=t=>{const{groups:e,path:r}=nn(t),n=jt(r);return rn(n,e)},nn=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(r,n)=>{const s=`@${n}`;return e.push([s,r]),s}),{groups:e,path:t}},rn=(t,e)=>{for(let r=e.length-1;r>=0;r--){const[n]=e[r];for(let s=t.length-1;s>=0;s--)if(t[s].includes(n)){t[s]=t[s].replace(n,e[r][1]);break}}return t},ze={},sn=(t,e)=>{if(t==="*")return"*";const r=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const n=`${t}#${e}`;return ze[n]||(r[2]?ze[n]=e&&e[0]!==":"&&e[0]!=="*"?[n,r[1],new RegExp(`^${r[2]}(?=/${e})`)]:[t,r[1],new RegExp(`^${r[2]}$`)]:ze[n]=[t,r[1],!0]),ze[n]}return null},ot=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return e(r)}catch{return r}})}},an=t=>ot(t,decodeURI),Ct=t=>{const e=t.url,r=e.indexOf("/",e.indexOf(":")+4);let n=r;for(;n<e.length;n++){const s=e.charCodeAt(n);if(s===37){const a=e.indexOf("?",n),i=e.slice(r,a===-1?void 0:a);return an(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(s===63)break}return e.slice(r,n)},on=t=>{const e=Ct(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},we=(t,e,...r)=>(r.length&&(e=we(e,...r)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Tt=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),r=[];let n="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))n+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){r.length===0&&n===""?r.push("/"):r.push(n);const a=s.replace("?","");n+="/"+a,r.push(n)}else n+="/"+s}),r.filter((s,a,i)=>i.indexOf(s)===a)},rt=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?ot(t,_t):t):t,Mt=(t,e,r)=>{let n;if(!r&&e&&!/[%+]/.test(e)){let i=t.indexOf("?",8);if(i===-1)return;for(t.startsWith(e,i+1)||(i=t.indexOf(`&${e}`,i+1));i!==-1;){const o=t.charCodeAt(i+e.length+1);if(o===61){const c=i+e.length+2,l=t.indexOf("&",c);return rt(t.slice(c,l===-1?void 0:l))}else if(o==38||isNaN(o))return"";i=t.indexOf(`&${e}`,i+1)}if(n=/[%+]/.test(t),!n)return}const s={};n??(n=/[%+]/.test(t));let a=t.indexOf("?",8);for(;a!==-1;){const i=t.indexOf("&",a+1);let o=t.indexOf("=",a);o>i&&i!==-1&&(o=-1);let c=t.slice(a+1,o===-1?i===-1?void 0:i:o);if(n&&(c=rt(c)),a=i,c==="")continue;let l;o===-1?l="":(l=t.slice(o+1,i===-1?void 0:i),n&&(l=rt(l))),r?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(l)):s[c]??(s[c]=l)}return e?s[e]:s},cn=Mt,ln=(t,e)=>Mt(t,e,!0),_t=decodeURIComponent,ut=t=>ot(t,_t),Se,G,re,kt,At,it,se,wt,Rt=(wt=class{constructor(t,e="/",r=[[]]){S(this,re);b(this,"raw");S(this,Se);S(this,G);b(this,"routeIndex",0);b(this,"path");b(this,"bodyCache",{});S(this,se,t=>{const{bodyCache:e,raw:r}=this,n=e[t];if(n)return n;const s=Object.keys(e)[0];return s?e[s].then(a=>(s==="json"&&(a=JSON.stringify(a)),new Response(a)[t]())):e[t]=r[t]()});this.raw=t,this.path=e,x(this,G,r),x(this,Se,{})}param(t){return t?O(this,re,kt).call(this,t):O(this,re,At).call(this)}query(t){return cn(this.url,t)}queries(t){return ln(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((r,n)=>{e[n]=r}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await Yt(this,t))}json(){return d(this,se).call(this,"text").then(t=>JSON.parse(t))}text(){return d(this,se).call(this,"text")}arrayBuffer(){return d(this,se).call(this,"arrayBuffer")}blob(){return d(this,se).call(this,"blob")}formData(){return d(this,se).call(this,"formData")}addValidatedData(t,e){d(this,Se)[t]=e}valid(t){return d(this,Se)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[Vt](){return d(this,G)}get matchedRoutes(){return d(this,G)[0].map(([[,t]])=>t)}get routePath(){return d(this,G)[0].map(([[,t]])=>t)[this.routeIndex].path}},Se=new WeakMap,G=new WeakMap,re=new WeakSet,kt=function(t){const e=d(this,G)[0][this.routeIndex][1][t],r=O(this,re,it).call(this,e);return r&&/\%/.test(r)?ut(r):r},At=function(){const t={},e=Object.keys(d(this,G)[0][this.routeIndex][1]);for(const r of e){const n=O(this,re,it).call(this,d(this,G)[0][this.routeIndex][1][r]);n!==void 0&&(t[r]=/\%/.test(n)?ut(n):n)}return t},it=function(t){return d(this,G)[1]?d(this,G)[1][t]:t},se=new WeakMap,wt),dn={Stringify:1},Nt=async(t,e,r,n,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const a=t.callbacks;return a!=null&&a.length?(s?s[0]+=t:s=[t],Promise.all(a.map(o=>o({phase:e,buffer:s,context:n}))).then(o=>Promise.all(o.filter(Boolean).map(c=>Nt(c,e,!1,n,s))).then(()=>s[0]))):Promise.resolve(t)},un="text/plain; charset=UTF-8",st=(t,e)=>({"Content-Type":t,...e}),Ie,Pe,Z,$e,ee,z,He,Oe,je,he,Le,De,ae,ye,yt,hn=(yt=class{constructor(t,e){S(this,ae);S(this,Ie);S(this,Pe);b(this,"env",{});S(this,Z);b(this,"finalized",!1);b(this,"error");S(this,$e);S(this,ee);S(this,z);S(this,He);S(this,Oe);S(this,je);S(this,he);S(this,Le);S(this,De);b(this,"render",(...t)=>(d(this,Oe)??x(this,Oe,e=>this.html(e)),d(this,Oe).call(this,...t)));b(this,"setLayout",t=>x(this,He,t));b(this,"getLayout",()=>d(this,He));b(this,"setRenderer",t=>{x(this,Oe,t)});b(this,"header",(t,e,r)=>{this.finalized&&x(this,z,new Response(d(this,z).body,d(this,z)));const n=d(this,z)?d(this,z).headers:d(this,he)??x(this,he,new Headers);e===void 0?n.delete(t):r!=null&&r.append?n.append(t,e):n.set(t,e)});b(this,"status",t=>{x(this,$e,t)});b(this,"set",(t,e)=>{d(this,Z)??x(this,Z,new Map),d(this,Z).set(t,e)});b(this,"get",t=>d(this,Z)?d(this,Z).get(t):void 0);b(this,"newResponse",(...t)=>O(this,ae,ye).call(this,...t));b(this,"body",(t,e,r)=>O(this,ae,ye).call(this,t,e,r));b(this,"text",(t,e,r)=>!d(this,he)&&!d(this,$e)&&!e&&!r&&!this.finalized?new Response(t):O(this,ae,ye).call(this,t,e,st(un,r)));b(this,"json",(t,e,r)=>O(this,ae,ye).call(this,JSON.stringify(t),e,st("application/json",r)));b(this,"html",(t,e,r)=>{const n=s=>O(this,ae,ye).call(this,s,e,st("text/html; charset=UTF-8",r));return typeof t=="object"?Nt(t,dn.Stringify,!1,{}).then(n):n(t)});b(this,"redirect",(t,e)=>{const r=String(t);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,e??302)});b(this,"notFound",()=>(d(this,je)??x(this,je,()=>new Response),d(this,je).call(this,this)));x(this,Ie,t),e&&(x(this,ee,e.executionCtx),this.env=e.env,x(this,je,e.notFoundHandler),x(this,De,e.path),x(this,Le,e.matchResult))}get req(){return d(this,Pe)??x(this,Pe,new Rt(d(this,Ie),d(this,De),d(this,Le))),d(this,Pe)}get event(){if(d(this,ee)&&"respondWith"in d(this,ee))return d(this,ee);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,ee))return d(this,ee);throw Error("This context has no ExecutionContext")}get res(){return d(this,z)||x(this,z,new Response(null,{headers:d(this,he)??x(this,he,new Headers)}))}set res(t){if(d(this,z)&&t){t=new Response(t.body,t);for(const[e,r]of d(this,z).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const n=d(this,z).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of n)t.headers.append("set-cookie",s)}else t.headers.set(e,r)}x(this,z,t),this.finalized=!0}get var(){return d(this,Z)?Object.fromEntries(d(this,Z)):{}}},Ie=new WeakMap,Pe=new WeakMap,Z=new WeakMap,$e=new WeakMap,ee=new WeakMap,z=new WeakMap,He=new WeakMap,Oe=new WeakMap,je=new WeakMap,he=new WeakMap,Le=new WeakMap,De=new WeakMap,ae=new WeakSet,ye=function(t,e,r){const n=d(this,z)?new Headers(d(this,z).headers):d(this,he)??new Headers;if(typeof e=="object"&&"headers"in e){const a=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[i,o]of a)i.toLowerCase()==="set-cookie"?n.append(i,o):n.set(i,o)}if(r)for(const[a,i]of Object.entries(r))if(typeof i=="string")n.set(a,i);else{n.delete(a);for(const o of i)n.append(a,o)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??d(this,$e);return new Response(t,{status:s,headers:n})},yt),I="ALL",fn="all",pn=["get","post","put","delete","options","patch"],It="Can not add a route since the matcher is already built.",Pt=class extends Error{},gn="__COMPOSED_HANDLER",mn=t=>t.text("404 Not Found",404),ht=(t,e)=>{if("getResponse"in t){const r=t.getResponse();return e.newResponse(r.body,r)}return console.error(t),e.text("Internal Server Error",500)},W,P,Ht,V,de,Ke,Ue,Ce,xn=(Ce=class{constructor(e={}){S(this,P);b(this,"get");b(this,"post");b(this,"put");b(this,"delete");b(this,"options");b(this,"patch");b(this,"all");b(this,"on");b(this,"use");b(this,"router");b(this,"getPath");b(this,"_basePath","/");S(this,W,"/");b(this,"routes",[]);S(this,V,mn);b(this,"errorHandler",ht);b(this,"onError",e=>(this.errorHandler=e,this));b(this,"notFound",e=>(x(this,V,e),this));b(this,"fetch",(e,...r)=>O(this,P,Ue).call(this,e,r[1],r[0],e.method));b(this,"request",(e,r,n,s)=>e instanceof Request?this.fetch(r?new Request(e,r):e,n,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${we("/",e)}`,r),n,s)));b(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(O(this,P,Ue).call(this,e.request,e,void 0,e.request.method))})});[...pn,fn].forEach(a=>{this[a]=(i,...o)=>(typeof i=="string"?x(this,W,i):O(this,P,de).call(this,a,d(this,W),i),o.forEach(c=>{O(this,P,de).call(this,a,d(this,W),c)}),this)}),this.on=(a,i,...o)=>{for(const c of[i].flat()){x(this,W,c);for(const l of[a].flat())o.map(u=>{O(this,P,de).call(this,l.toUpperCase(),d(this,W),u)})}return this},this.use=(a,...i)=>(typeof a=="string"?x(this,W,a):(x(this,W,"*"),i.unshift(a)),i.forEach(o=>{O(this,P,de).call(this,I,d(this,W),o)}),this);const{strict:n,...s}=e;Object.assign(this,s),this.getPath=n??!0?e.getPath??Ct:on}route(e,r){const n=this.basePath(e);return r.routes.map(s=>{var i;let a;r.errorHandler===ht?a=s.handler:(a=async(o,c)=>(await dt([],r.errorHandler)(o,()=>s.handler(o,c))).res,a[gn]=s.handler),O(i=n,P,de).call(i,s.method,s.path,a)}),this}basePath(e){const r=O(this,P,Ht).call(this);return r._basePath=we(this._basePath,e),r}mount(e,r,n){let s,a;n&&(typeof n=="function"?a=n:(a=n.optionHandler,n.replaceRequest===!1?s=c=>c:s=n.replaceRequest));const i=a?c=>{const l=a(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};s||(s=(()=>{const c=we(this._basePath,e),l=c==="/"?0:c.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(l)||"/",new Request(h,u)}})());const o=async(c,l)=>{const u=await r(s(c.req.raw),...i(c));if(u)return u;await l()};return O(this,P,de).call(this,I,we(e,"*"),o),this}},W=new WeakMap,P=new WeakSet,Ht=function(){const e=new Ce({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,x(e,V,d(this,V)),e.routes=this.routes,e},V=new WeakMap,de=function(e,r,n){e=e.toUpperCase(),r=we(this._basePath,r);const s={basePath:this._basePath,path:r,method:e,handler:n};this.router.add(e,r,[n,s]),this.routes.push(s)},Ke=function(e,r){if(e instanceof Error)return this.errorHandler(e,r);throw e},Ue=function(e,r,n,s){if(s==="HEAD")return(async()=>new Response(null,await O(this,P,Ue).call(this,e,r,n,"GET")))();const a=this.getPath(e,{env:n}),i=this.router.match(s,a),o=new hn(e,{path:a,matchResult:i,env:n,executionCtx:r,notFoundHandler:d(this,V)});if(i[0].length===1){let l;try{l=i[0][0][0][0](o,async()=>{o.res=await d(this,V).call(this,o)})}catch(u){return O(this,P,Ke).call(this,u,o)}return l instanceof Promise?l.then(u=>u||(o.finalized?o.res:d(this,V).call(this,o))).catch(u=>O(this,P,Ke).call(this,u,o)):l??d(this,V).call(this,o)}const c=dt(i[0],this.errorHandler,d(this,V));return(async()=>{try{const l=await c(o);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return O(this,P,Ke).call(this,l,o)}})()},Ce),Lt=[];function bn(t,e){const r=this.buildAllMatchers(),n=(s,a)=>{const i=r[s]||r[I],o=i[2][a];if(o)return o;const c=a.match(i[0]);if(!c)return[[],Lt];const l=c.indexOf("",1);return[i[1][l],c]};return this.match=n,n(t,e)}var Ye="[^/]+",Ae=".*",Ne="(?:|/.*)",Ee=Symbol(),vn=new Set(".\\+*[^]$()");function wn(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===Ae||t===Ne?1:e===Ae||e===Ne?-1:t===Ye?1:e===Ye?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var fe,pe,Y,xe,yn=(xe=class{constructor(){S(this,fe);S(this,pe);S(this,Y,Object.create(null))}insert(e,r,n,s,a){if(e.length===0){if(d(this,fe)!==void 0)throw Ee;if(a)return;x(this,fe,r);return}const[i,...o]=e,c=i==="*"?o.length===0?["","",Ae]:["","",Ye]:i==="/*"?["","",Ne]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let h=c[2]||Ye;if(u&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw Ee;if(l=d(this,Y)[h],!l){if(Object.keys(d(this,Y)).some(m=>m!==Ae&&m!==Ne))throw Ee;if(a)return;l=d(this,Y)[h]=new xe,u!==""&&x(l,pe,s.varIndex++)}!a&&u!==""&&n.push([u,d(l,pe)])}else if(l=d(this,Y)[i],!l){if(Object.keys(d(this,Y)).some(u=>u.length>1&&u!==Ae&&u!==Ne))throw Ee;if(a)return;l=d(this,Y)[i]=new xe}l.insert(o,r,n,s,a)}buildRegExpStr(){const r=Object.keys(d(this,Y)).sort(wn).map(n=>{const s=d(this,Y)[n];return(typeof d(s,pe)=="number"?`(${n})@${d(s,pe)}`:vn.has(n)?`\\${n}`:n)+s.buildRegExpStr()});return typeof d(this,fe)=="number"&&r.unshift(`#${d(this,fe)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},fe=new WeakMap,pe=new WeakMap,Y=new WeakMap,xe),Qe,Be,Et,En=(Et=class{constructor(){S(this,Qe,{varIndex:0});S(this,Be,new yn)}insert(t,e,r){const n=[],s=[];for(let i=0;;){let o=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const l=`@\\${i}`;return s[i]=[l,c],i++,o=!0,l}),!o)break}const a=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=s.length-1;i>=0;i--){const[o]=s[i];for(let c=a.length-1;c>=0;c--)if(a[c].indexOf(o)!==-1){a[c]=a[c].replace(o,s[i][1]);break}}return d(this,Be).insert(a,e,n,d(this,Qe),r),n}buildRegExp(){let t=d(this,Be).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const r=[],n=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,a,i)=>a!==void 0?(r[++e]=Number(a),"$()"):(i!==void 0&&(n[Number(i)]=++e),"")),[new RegExp(`^${t}`),r,n]}},Qe=new WeakMap,Be=new WeakMap,Et),Sn=[/^$/,[],Object.create(null)],Ge=Object.create(null);function Dt(t){return Ge[t]??(Ge[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function $n(){Ge=Object.create(null)}function On(t){var l;const e=new En,r=[];if(t.length===0)return Sn;const n=t.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[m,w])=>u?1:m?-1:h.length-w.length),s=Object.create(null);for(let u=0,h=-1,m=n.length;u<m;u++){const[w,C,T]=n[u];w?s[C]=[T.map(([p])=>[p,Object.create(null)]),Lt]:h++;let $;try{$=e.insert(C,h,w)}catch(p){throw p===Ee?new Pt(C):p}w||(r[h]=T.map(([p,g])=>{const v=Object.create(null);for(g-=1;g>=0;g--){const[j,f]=$[g];v[j]=f}return[p,v]}))}const[a,i,o]=e.buildRegExp();for(let u=0,h=r.length;u<h;u++)for(let m=0,w=r[u].length;m<w;m++){const C=(l=r[u][m])==null?void 0:l[1];if(!C)continue;const T=Object.keys(C);for(let $=0,p=T.length;$<p;$++)C[T[$]]=o[C[T[$]]]}const c=[];for(const u in i)c[u]=r[i[u]];return[a,c,s]}function ve(t,e){if(t){for(const r of Object.keys(t).sort((n,s)=>s.length-n.length))if(Dt(r).test(e))return[...t[r]]}}var ie,oe,Ze,Bt,St,jn=(St=class{constructor(){S(this,Ze);b(this,"name","RegExpRouter");S(this,ie);S(this,oe);b(this,"match",bn);x(this,ie,{[I]:Object.create(null)}),x(this,oe,{[I]:Object.create(null)})}add(t,e,r){var o;const n=d(this,ie),s=d(this,oe);if(!n||!s)throw new Error(It);n[t]||[n,s].forEach(c=>{c[t]=Object.create(null),Object.keys(c[I]).forEach(l=>{c[t][l]=[...c[I][l]]})}),e==="/*"&&(e="*");const a=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const c=Dt(e);t===I?Object.keys(n).forEach(l=>{var u;(u=n[l])[e]||(u[e]=ve(n[l],e)||ve(n[I],e)||[])}):(o=n[t])[e]||(o[e]=ve(n[t],e)||ve(n[I],e)||[]),Object.keys(n).forEach(l=>{(t===I||t===l)&&Object.keys(n[l]).forEach(u=>{c.test(u)&&n[l][u].push([r,a])})}),Object.keys(s).forEach(l=>{(t===I||t===l)&&Object.keys(s[l]).forEach(u=>c.test(u)&&s[l][u].push([r,a]))});return}const i=Tt(e)||[e];for(let c=0,l=i.length;c<l;c++){const u=i[c];Object.keys(s).forEach(h=>{var m;(t===I||t===h)&&((m=s[h])[u]||(m[u]=[...ve(n[h],u)||ve(n[I],u)||[]]),s[h][u].push([r,a-l+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(d(this,oe)).concat(Object.keys(d(this,ie))).forEach(e=>{t[e]||(t[e]=O(this,Ze,Bt).call(this,e))}),x(this,ie,x(this,oe,void 0)),$n(),t}},ie=new WeakMap,oe=new WeakMap,Ze=new WeakSet,Bt=function(t){const e=[];let r=t===I;return[d(this,ie),d(this,oe)].forEach(n=>{const s=n[t]?Object.keys(n[t]).map(a=>[a,n[t][a]]):[];s.length!==0?(r||(r=!0),e.push(...s)):t!==I&&e.push(...Object.keys(n[I]).map(a=>[a,n[I][a]]))}),r?On(e):null},St),ce,te,$t,Cn=($t=class{constructor(t){b(this,"name","SmartRouter");S(this,ce,[]);S(this,te,[]);x(this,ce,t.routers)}add(t,e,r){if(!d(this,te))throw new Error(It);d(this,te).push([t,e,r])}match(t,e){if(!d(this,te))throw new Error("Fatal error");const r=d(this,ce),n=d(this,te),s=r.length;let a=0,i;for(;a<s;a++){const o=r[a];try{for(let c=0,l=n.length;c<l;c++)o.add(...n[c]);i=o.match(t,e)}catch(c){if(c instanceof Pt)continue;throw c}this.match=o.match.bind(o),x(this,ce,[o]),x(this,te,void 0);break}if(a===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(d(this,te)||d(this,ce).length!==1)throw new Error("No active router has been determined yet.");return d(this,ce)[0]}},ce=new WeakMap,te=new WeakMap,$t),Re=Object.create(null),le,B,ge,Te,D,ne,ue,Me,Tn=(Me=class{constructor(e,r,n){S(this,ne);S(this,le);S(this,B);S(this,ge);S(this,Te,0);S(this,D,Re);if(x(this,B,n||Object.create(null)),x(this,le,[]),e&&r){const s=Object.create(null);s[e]={handler:r,possibleKeys:[],score:0},x(this,le,[s])}x(this,ge,[])}insert(e,r,n){x(this,Te,++lt(this,Te)._);let s=this;const a=tn(r),i=[];for(let o=0,c=a.length;o<c;o++){const l=a[o],u=a[o+1],h=sn(l,u),m=Array.isArray(h)?h[0]:l;if(m in d(s,B)){s=d(s,B)[m],h&&i.push(h[1]);continue}d(s,B)[m]=new Me,h&&(d(s,ge).push(h),i.push(h[1])),s=d(s,B)[m]}return d(s,le).push({[e]:{handler:n,possibleKeys:i.filter((o,c,l)=>l.indexOf(o)===c),score:d(this,Te)}}),s}search(e,r){var c;const n=[];x(this,D,Re);let a=[this];const i=jt(r),o=[];for(let l=0,u=i.length;l<u;l++){const h=i[l],m=l===u-1,w=[];for(let C=0,T=a.length;C<T;C++){const $=a[C],p=d($,B)[h];p&&(x(p,D,d($,D)),m?(d(p,B)["*"]&&n.push(...O(this,ne,ue).call(this,d(p,B)["*"],e,d($,D))),n.push(...O(this,ne,ue).call(this,p,e,d($,D)))):w.push(p));for(let g=0,v=d($,ge).length;g<v;g++){const j=d($,ge)[g],f=d($,D)===Re?{}:{...d($,D)};if(j==="*"){const H=d($,B)["*"];H&&(n.push(...O(this,ne,ue).call(this,H,e,d($,D))),x(H,D,f),w.push(H));continue}const[M,K,q]=j;if(!h&&!(q instanceof RegExp))continue;const N=d($,B)[M],et=i.slice(l).join("/");if(q instanceof RegExp){const H=q.exec(et);if(H){if(f[K]=H[0],n.push(...O(this,ne,ue).call(this,N,e,d($,D),f)),Object.keys(d(N,B)).length){x(N,D,f);const U=((c=H[0].match(/\//))==null?void 0:c.length)??0;(o[U]||(o[U]=[])).push(N)}continue}}(q===!0||q.test(h))&&(f[K]=h,m?(n.push(...O(this,ne,ue).call(this,N,e,f,d($,D))),d(N,B)["*"]&&n.push(...O(this,ne,ue).call(this,d(N,B)["*"],e,f,d($,D)))):(x(N,D,f),w.push(N)))}}a=w.concat(o.shift()??[])}return n.length>1&&n.sort((l,u)=>l.score-u.score),[n.map(({handler:l,params:u})=>[l,u])]}},le=new WeakMap,B=new WeakMap,ge=new WeakMap,Te=new WeakMap,D=new WeakMap,ne=new WeakSet,ue=function(e,r,n,s){const a=[];for(let i=0,o=d(e,le).length;i<o;i++){const c=d(e,le)[i],l=c[r]||c[I],u={};if(l!==void 0&&(l.params=Object.create(null),a.push(l),n!==Re||s&&s!==Re))for(let h=0,m=l.possibleKeys.length;h<m;h++){const w=l.possibleKeys[h],C=u[l.score];l.params[w]=s!=null&&s[w]&&!C?s[w]:n[w]??(s==null?void 0:s[w]),u[l.score]=!0}}return a},Me),me,Ot,Mn=(Ot=class{constructor(){b(this,"name","TrieRouter");S(this,me);x(this,me,new Tn)}add(t,e,r){const n=Tt(e);if(n){for(let s=0,a=n.length;s<a;s++)d(this,me).insert(t,n[s],r);return}d(this,me).insert(t,e,r)}match(t,e){return d(this,me).search(t,e)}},me=new WeakMap,Ot),Ft=class extends xn{constructor(t={}){super(t),this.router=t.router??new Cn({routers:[new jn,new Mn]})}},_n=t=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},n=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(r.origin),s=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(r.allowMethods);return async function(i,o){var u;function c(h,m){i.res.headers.set(h,m)}const l=await n(i.req.header("origin")||"",i);if(l&&c("Access-Control-Allow-Origin",l),r.credentials&&c("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),i.req.method==="OPTIONS"){r.origin!=="*"&&c("Vary","Origin"),r.maxAge!=null&&c("Access-Control-Max-Age",r.maxAge.toString());const h=await s(i.req.header("origin")||"",i);h.length&&c("Access-Control-Allow-Methods",h.join(","));let m=r.allowHeaders;if(!(m!=null&&m.length)){const w=i.req.header("Access-Control-Request-Headers");w&&(m=w.split(/\s*,\s*/))}return m!=null&&m.length&&(c("Access-Control-Allow-Headers",m.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),r.origin!=="*"&&i.header("Vary","Origin",{append:!0})}},Rn=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,ft=(t,e=An)=>{const r=/\.([a-zA-Z0-9]+?)$/,n=t.match(r);if(!n)return;let s=e[n[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},kn={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},An=kn,Nn=(...t)=>{let e=t.filter(s=>s!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=e.split("/"),n=[];for(const s of r)s===".."&&n.length>0&&n.at(-1)!==".."?n.pop():s!=="."&&n.push(s);return n.join("/")||"."},zt={br:".br",zstd:".zst",gzip:".gz"},In=Object.keys(zt),Pn="index.html",Hn=t=>{const e=t.root??"./",r=t.path,n=t.join??Nn;return async(s,a)=>{var u,h,m,w;if(s.finalized)return a();let i;if(t.path)i=t.path;else try{if(i=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))throw new Error}catch{return await((u=t.onNotFound)==null?void 0:u.call(t,s.req.path,s)),a()}let o=n(e,!r&&t.rewriteRequestPath?t.rewriteRequestPath(i):i);t.isDir&&await t.isDir(o)&&(o=n(o,Pn));const c=t.getContent;let l=await c(o,s);if(l instanceof Response)return s.newResponse(l.body,l);if(l){const C=t.mimes&&ft(o,t.mimes)||ft(o);if(s.header("Content-Type",C||"application/octet-stream"),t.precompressed&&(!C||Rn.test(C))){const T=new Set((h=s.req.header("Accept-Encoding"))==null?void 0:h.split(",").map($=>$.trim()));for(const $ of In){if(!T.has($))continue;const p=await c(o+zt[$],s);if(p){l=p,s.header("Content-Encoding",$),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=t.onFound)==null?void 0:m.call(t,o,s)),s.body(l)}await((w=t.onNotFound)==null?void 0:w.call(t,o,s)),await a()}},Ln=async(t,e)=>{let r;e&&e.manifest?typeof e.manifest=="string"?r=JSON.parse(e.manifest):r=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let n;e&&e.namespace?n=e.namespace:n=__STATIC_CONTENT;const s=r[t];if(!s)return null;const a=await n.get(s,{type:"stream"});return a||null},Dn=t=>async function(r,n){return Hn({...t,getContent:async a=>Ln(a,{manifest:t.manifest,namespace:t.namespace?t.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,n)},Bn=t=>Dn(t);const Q=new Ft,Je=new Map,Fn=1e3*60*60*24*7;let at=!1;function qt(){return new Date().toISOString()}function X(t){return t==null?"":String(t)}function We(t,e,r){return Math.max(e,Math.min(r,t))}function zn(t){return(t||"").replace(/\s+/g,"")}function qe(t){return zn(t).length}function qn(t){const e=X(t).trim().toLowerCase();return e?e==="brief"||e==="simple"||e==="short"||e==="lite"?"brief":e==="detail"||e==="detailed"||e==="full"?"detail":"standard":"standard"}function Kn(t){const e=X(t).trim().toLowerCase();return e?e==="narrative"||e==="structured"||e==="mindmap"||e==="selftest"?e:e==="mind-map"||e==="mind_map"?"mindmap":"narrative":"narrative"}function Un(t){const e=X(t).trim().toLowerCase();return e==="concept"?"concept":e==="exam"?"exam":"summary"}function Gn(t){const e=(t||"").replace(/\s+/g," ").trim();if(!e)return[];const r=[];let n="",s=!1;for(let a=0;a<e.length;a++){const i=e[a],o=e[a+1];(i==='"'||i==='"'||i==='"')&&(s=!s),n+=i,!s&&/[\.\?\!]/.test(i)&&o===" "?i==="."&&n.endsWith("...")||(r.push(n.trim()),n="",a++):!s&&/[다요죠]/.test(i)&&o===" "&&(r.push(n.trim()),n="",a++)}return n.trim()&&r.push(n.trim()),r.length?r:[e]}const Jn=new Set(["그리고","그러나","하지만","또한","및","또","또는","즉","때문에","따라서","그래서","한편","이것","그것","저것","에서","으로","에게","부터","까지","보다","처럼","같이","의","가","이","은","는","을","를","과","와","도","만","하다","된다","있다","없다","이다","아니다","수","등","및","것","들","좀","매우","정말"]),Wn=[new Set(["안식처","힐링","치유","여유","안정","위로","휴식","쉼","평온","평화"]),new Set(["생태계","자연","환경","서식지","숲","공간","장소"]),new Set(["학습","공부","교육","배움","활동","체험","경험"]),new Set(["기술","방법","수단","방식"]),new Set(["오감","감각","느낌","감성","정서","심리"]),new Set(["탐색","탐구","관찰","발견"]),new Set(["성장","발달","발전","향상"])];function Vn(t){const e=new Set;for(const r of t){let n=!1;for(const s of Wn)if(s.has(r)){e.add(Array.from(s)[0]),n=!0;break}n||e.add(r)}return e}function Xe(t){return(t||"").toLowerCase().replace(/[^0-9a-z가-힣\s]/g," ").split(/\s+/).map(e=>e.trim()).map(e=>e.replace(/에게$/g,"").replace(/에서$/g,"").replace(/으로$/g,"").replace(/를$/g,"").replace(/을$/g,"").replace(/의$/g,"").replace(/하는$/g,"하").replace(/하$/g,"하")).filter(e=>e.length>=2&&!Jn.has(e))}function Yn(t){const e=new Map;for(const n of t)for(const s of Xe(n))e.set(s,(e.get(s)||0)+1);return t.map((n,s)=>{const a=Xe(n);let i=0;for(const l of a)i+=e.get(l)||0;const o=n.length,c=o<15?.7:o>180?.85:1;return{idx:s,s:n,score:i*c}})}function Xn(t,e){return Yn(t).slice().sort((s,a)=>a.score-s.score).slice(0,We(e,1,Math.max(1,t.length))).sort((s,a)=>s.idx-a.idx).map(s=>s.s)}function Qn(t){let e=(t||"").trim();return e=e.replace(/모\s+든/g,"모든"),e=e.replace(/기\s+회/g,"기회"),e=e.replace(/이\s+루어지는/g,"이루어지는"),e=e.replace(/루어지는/g,"이루어지는"),e=e.replace(/생태계물/g,"자연물"),e=e.replace(/놀은\s+는/g,"놀이는"),e=e.replace(/형성은\s+는/g,"형성은"),e=e.replace(/입니다\.\s*이는\s+/g,"이다. "),e=e.replace(/입니다\.\s*또한\s+/g,"이다. 또한 "),e=e.replace(/입니다\.\s*즉\s+/g,"이다. 즉 "),e=e.replace(/\s*\.\s*/g,". "),e=e.replace(/\s*,\s*/g,", "),e=e.replace(/\s*;\s*/g,"; "),e=e.replace(/[ ]{2,}/g," "),e=e.replace(/\n{3,}/g,`

`),e.trim()}function Ve(t){return(t||"").replace(/\s+/g,"").length}function Kt(t){const e=Math.max(400,Ve(t)),r=(T,$,p)=>Math.max($,Math.min(p,T)),n=120,s=220,a=350,i=700,o=900,c=1600,l=r(Math.round(e*.05),n,s),u=r(Math.round(e*.14),a,i),h=r(Math.round(e*.32),o,c),m=Math.min(l,u-40),w=Math.max(u,m+80),C=Math.max(h,w+200);return{base:e,brief:m,standard:w,detail:C}}function Zn(t){const e=Kt(t);return`
당신은 교육/유아교육 연구 텍스트를 '요약 원칙'에 따라 3단계(간단/표준/상세)로 요약하는 엔진이다.

[입력 원문]
"""${t}"""

[요약 원칙 - 반드시 준수]
1) "간단 < 표준 < 상세" 글자수 단조 증가를 반드시 지켜라. (역전 금지)
2) 세 요약 모두 아래 3영역을 반드시 포함하라:
   - 개념(숲체험 활동이 무엇인지)
   - 영향(유아 발달에 어떤 영향인지)
   - 교육적 가치(교육적으로 어떤 가치인지)
3) 발췌/복붙 금지: 원문 문장을 그대로 길게 가져오지 말고 의미를 재구성하라.
4) 인용(저자, 연도)은 요약을 방해하면 제거하라. 꼭 필요하면 최대 1회만.
5) 문장부호는 한국어 기준으로 정리하고, 지나치게 긴 한 문장을 만들지 말라.
6) 세 요약은 서로 문장/구성이 '거의 동일'하면 실패로 간주한다(중복 금지).

[길이 목표(공백 제외 글자수)]
- 간단: 약 ${e.brief}자 (2문장 이내)
- 표준: 약 ${e.standard}자 (6~8문장)
- 상세: 약 ${e.detail}자 (아래 소제목 3개 포함)

[상세 요약 소제목(반드시 그대로 사용)]
- 개념
- 영향
- 교육적 가치

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

※ JSON 외의 어떤 문장도 출력하지 마라.
`.trim()}const er={definition:["의미","정의","사전","생태학적","개념","이란","무엇","장소"],meaning:["의미","가치","치유","안정","교육적","기능","중요","효과"],activity:["체험","활동","교육","놀이","경험","학습","탐색","참여"]};function pt(t){const e={definition:0,meaning:0,activity:0};for(const[n,s]of Object.entries(er))for(const a of s)t.includes(a)&&e[n]++;const r=Math.max(e.definition,e.meaning,e.activity);return r===0?null:e.definition===r?"definition":e.meaning===r?"meaning":"activity"}function tr(t,e,r){const n=qe(e),s=[],a=new Set,i=/\(([^)]+,?\s*\d{4})\)/g;let o;for(;(o=i.exec(e))!==null;)a.add(o[1]);for(const p of t){const g=[];let v;const j=/\(([^)]+,?\s*\d{4})\)/g;for(;(v=j.exec(p))!==null;){const K=v[1];a.has(K)&&g.push(K)}let f=p.replace(/\(([^)]+,?\s*\d{4})\)/g,"").replace(/^(그리고|또한|따라서|즉|또|한편|이러한|이와같이|결국|그러나|하지만|더불어|아울러)[,\s]*/g,"").replace(/[\.。\?\!]+$/,"").replace(/\(p\.\s*\d+\)/gi,"").replace(/\[[^\]]*\]/g,"").replace(/\s*-\s*\d+\s*-\s*/g," ").replace(/것이\s+다/g,"것이다").replace(/바이\s+다/g,"바이다").replace(/직\s+접/g,"직접").replace(/만나\s+게/g,"만나게").replace(/자유롭\s+게/g,"자유롭게").replace(/\s{2,}/g," ").trim();if(f.length<10)continue;const M=Xe(f).slice(0,8);s.push({original:p,clean:f,keywords:M,citations:g}),f.includes("(")&&console.log("[DEBUG] 인용 미제거:",f.slice(0,100))}if(s.length===0)return"요약할 내용이 부족합니다.";const c=new Map;for(const p of s)for(const g of p.keywords)c.set(g,(c.get(g)||0)+1);const l=[];for(const p of s){new Set(p.keywords);let g=!1;for(const v of l)if(p.keywords.filter(f=>v.keywords.has(f)).length>=2){v.sentences.push({clean:p.clean,citations:p.citations}),p.keywords.forEach(f=>v.keywords.add(f)),g=!0;break}g||l.push({keywords:new Set(p.keywords),sentences:[{clean:p.clean,citations:p.citations}]})}const u=l.map(p=>{const g=p.sentences[0].clean,v=s.findIndex(j=>j.clean===g);return{...p,originalIdx:v}});let h="";if(r==="brief"){const p={definition:[],meaning:[],activity:[]};for(const y of u)for(const E of y.sentences){const _=pt(E.clean);_&&p[_].push(E)}const g=p.definition[0],v=p.meaning[0],j=p.activity[0],f=[],M=[];if(g&&(f.push(g.clean),M.push(...g.citations.filter(Boolean))),v&&(f.push(v.clean),M.push(...v.citations.filter(Boolean))),j&&(f.push(j.clean),M.push(...j.citations.filter(Boolean))),f.length===0){const E=u.sort((_,L)=>L.sentences.length-_.sentences.length)[0].sentences[0];f.push(E.clean),M.push(...E.citations.filter(Boolean))}const K=Array.from(new Set(M)),q=K.length>0?`(${K.join("; ")})`:"",N=f.map(y=>{let E=y;for(;E.includes("(");)E=E.replace(/\([^)]*\)/g,"");return E.trim()});N.length===1?h=`${N[0]}${q}.`:N.length===2?h=`${N[0]}. ${N[1]}${q}.`:h=`${N[0]}하며 ${N[1]}. ${N[2]}${q}.`;const H=qe(h)/n*100;if(H>15){let y=h.slice(0,60);y=y.replace(/\([^)]*\)/g,"").trim(),h=y+(q?` ${q}.`:".")}const U=[];return g&&U.push("definition"),v&&U.push("meaning"),j&&U.push("activity"),typeof console<"u"&&console.log("[Brief Summary Meta]",{rolesFilled:U,sentenceCount:f.length,compressionRatio:H.toFixed(1)+"%",passed:H<=15}),h}if(r==="standard"){const p=u.sort((y,E)=>E.sentences.length-y.sentences.length).slice(0,3).sort((y,E)=>y.originalIdx-E.originalIdx);if(p.length===1){const y=p[0].sentences[0],E=p[0].sentences.flatMap(L=>L.citations).filter(Boolean),_=E.length>0?`(${E.join("; ")})`:"";return`${y.clean}${_}.`}const g=new Map,v=new Map,j={오감:["감각","감각적 경험","직접 체험"],탐색:["탐구","관찰","발견"],체험:["경험","활동","학습"],자연:["숲","환경","생태계"]};for(const y of p)for(const E of y.sentences){const _=E.clean.match(/^(.+?)[은는이가]\s*(.+)$/);if(_){let[,L,Fe]=_;L=L.replace(/[에게서로부터]$/g,"").trim(),g.has(L)||g.set(L,[]);let F=Fe.trim();F=F.replace(/[\.。\?\!]+$/g,"").trim();for(const[A,_e]of Object.entries(j))if(F.includes(A)){const be=v.get(A)||0;if(v.set(A,be+1),be>=1&&_e.length>0){const tt=Math.min(be-1,_e.length-1);F=F.replace(A,_e[tt])}}const R=new Set(Xe(F)),k=Vn(R),J=new Set(["오감","감각","감각적","체험","경험","활동","학습"]);for(const A of J)k.delete(A);g.get(L).push({original:F,keywords:k,citations:E.citations})}}const f=[];for(const[y,E]of g.entries()){const _=E.flatMap(R=>R.citations).filter(Boolean),L=y.charAt(y.length-1),F=/[가-힣]/.test(L)&&(L.charCodeAt(0)-44032)%28!==0?"은":"는";if(E.length===1){const R=E[0].original,k=(R.match(/,/g)||[]).length;if(R.length>80&&k>=2){const J=R.split(",").map(A=>A.trim()).filter(A=>A.length>0);if(J.length>=2){f.push({text:`${y}${F} ${J[0]}`,citations:[]});for(let A=1;A<J.length-1;A++)f.push({text:`${J[A]}`,citations:[]});f.push({text:`${J[J.length-1]}`,citations:E[0].citations})}else f.push({text:`${y}${F} ${R}`,citations:_})}else f.push({text:`${y}${F} ${R}`,citations:_})}else{const R=[];for(const k of E){let J=!1;for(const A of R){const _e=Array.from(k.keywords).filter(tt=>A.keywords.has(tt)).length,be=Math.max(k.keywords.size,A.keywords.size);if(be>0&&_e/be>=.8){k.original.length>A.original.length&&(A.original=k.original,A.keywords=k.keywords),A.citations.push(...k.citations),J=!0;break}}J||R.push({original:k.original,keywords:k.keywords,citations:[...k.citations]})}if(R.length===1)f.push({text:`${y}${F} ${R[0].original}`,citations:R.flatMap(k=>k.citations)});else if(R.length===2)f.push({text:`${y}${F} ${R[0].original}`,citations:R[0].citations}),f.push({text:`${y}${F} ${R[1].original}`,citations:R[1].citations});else for(let k=0;k<R.length;k++)f.push({text:`${y}${F} ${R[k].original}`,citations:R[k].citations})}}if(f.length===0)return"요약할 내용이 부족합니다.";if(f.length===1){const y=f[0].citations.filter(Boolean),E=y.length>0?`(${y.join("; ")})`:"";return`${f[0].text}${E}.`}if(f.length===2){const y=f[0].citations.filter(Boolean),E=f[1].citations.filter(Boolean),_=y.length>0?`(${y.join("; ")})`:"",L=E.length>0?`(${E.join("; ")})`:"";return`${f[0].text}${_}. ${f[1].text}${L}.`}const M=[],K=f[0],q=K.citations.filter(Boolean),N=q.length>0?`(${q.join("; ")})`:"";if(M.push(`${K.text}${N}.`),f.length>=2){const y=f[1],E=y.citations.filter(Boolean),_=E.length>0?`(${E.join("; ")})`:"";M.push(`${y.text}${_}.`)}if(f.length>=3){const E=f.slice(2).map(_=>{const L=_.citations.filter(Boolean),Fe=L.length>0?`(${L.join("; ")})`:"";return`${_.text}${Fe}.`});M.push(E.join(" "))}h=M.join(`

`);const H=qe(h)/n*100;H>30&&(M.length>3?h=M.slice(0,3).join(`

`):h=M.join(`

`));const U=[];for(const y of p)for(const E of y.sentences){const _=pt(E.clean);_&&!U.includes(_)&&U.push(_)}return typeof console<"u"&&console.log("[Standard Summary Meta]",{rolesFilled:U,sentenceCount:f.length,paragraphCount:M.length,compressionRatio:H.toFixed(1)+"%",passed:H>=25&&H<=30}),h}const m=u.sort((p,g)=>g.sentences.length-p.sentences.length).slice(0,5).sort((p,g)=>p.originalIdx-g.originalIdx);let w=m.map((p,g)=>{const v=p.sentences[0],j=p.sentences.flatMap(M=>M.citations).filter(Boolean),f=j.length>0?`(${j.join("; ")})`:"";return g===0?`${v.clean}${f}.`:g===m.length-1?`마지막으로 ${v.clean}${f}.`:`또한 ${v.clean}${f}.`}).join(" ");return qe(w)/n*100>(r==="brief"?15:r==="standard"?30:55)&&r==="detail"?m.slice(0,3).map((g,v)=>{const j=g.sentences[0],f=g.sentences.flatMap(K=>K.citations).filter(Boolean),M=f.length>0?`(${f.join("; ")})`:"";return v===0?`${j.clean}${M}.`:v===2?`마지막으로 ${j.clean}${M}.`:`또한 ${j.clean}${M}.`}).join(" "):w}function nr(t,e,r){const n=Gn(t),s=e==="brief"?We(Math.round(n.length*.18),2,4):e==="standard"?We(Math.round(n.length*.28),4,8):We(Math.round(n.length*.4),7,14),a=Xn(n,s);if(r==="narrative"){let o=tr(a,t,e);return o=Qn(o),{kind:"summary",mode:e,viewType:r,narrative:o}}if(r==="structured")return{kind:"summary",mode:e,viewType:r,structured:{title:"구조화 요약",bullets:a.map((o,c)=>`- (${c+1}) ${o}`)}};if(r==="mindmap"){const o=(a[0]||n[0]||"핵심").slice(0,40),c=[{id:"c",label:o,level:0}],l=[];return a.slice(1).forEach((u,h)=>{const m=`n${h+1}`;c.push({id:m,label:u.slice(0,60),level:1}),l.push({from:"c",to:m})}),{kind:"summary",mode:e,viewType:r,mindmap:{center:o,nodes:c,edges:l}}}const i=a.map((o,c)=>({id:`q${c+1}`,type:"short",question:`(${c+1}) 다음 내용을 한 문장으로 설명해보세요: "${o.slice(0,70)}"`,answerHint:o}));return{kind:"summary",mode:e,viewType:r,selftest:{title:"셀프테스트",questions:i}}}function Ut(t){if(!t)return"empty";let e=2166136261,r=0;for(let a=0;a<t.length;a++){const i=t.charCodeAt(a);e^=i,e+=(e<<1)+(e<<4)+(e<<7)+(e<<8)+(e<<24),r=(r<<5)-r+i,r|=0}const n=(e>>>0).toString(16),s=(Math.abs(r)>>>0).toString(16);return`${t.length.toString(16)}_${n}_${s}`}function rr(t,e,r,n){const s=Ut(r);return`${t}::${n||"anon"}::${e}::base::${s}`}function sr(t,e,r,n,s){const a=Ut(n);return`${t}::${s||"anon"}::${e}::${r}::${a}`}async function ar(t){if(!at){if(!t){at=!0;return}await t.prepare(`CREATE TABLE IF NOT EXISTS summary_cache (
      cache_key TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`).run(),await t.prepare(`CREATE INDEX IF NOT EXISTS idx_summary_cache_user_created
     ON summary_cache(user_id, created_at);`).run(),at=!0}}async function gt(t,e){const r=Date.now(),n=Je.get(e);if(n&&r-n.createdAt<Fn)return{hit:!0,data:n.data,store:"mem"};if(n&&Je.delete(e),!t)return{hit:!1};const s=await t.prepare("SELECT response_json, created_at FROM summary_cache WHERE cache_key=?").bind(e).first();if(!(s!=null&&s.response_json))return{hit:!1};try{const a=JSON.parse(s.response_json);return Je.set(e,{data:a,createdAt:r}),{hit:!0,data:a,store:"d1"}}catch{return{hit:!1}}}async function ke(t,e,r,n){const s=Date.now();Je.set(e,{data:n,createdAt:s}),t&&await t.prepare(`INSERT OR REPLACE INTO summary_cache(cache_key, user_id, response_json, created_at)
     VALUES (?,?,?,?)`).bind(e,r,JSON.stringify(n),qt()).run()}function mt(t){const e=t.split(/\n\n+/).filter(n=>n.trim());return{kind:"summary",viewType:"structured",structured:{title:"구조화 요약",bullets:e.length>1?e.map((n,s)=>`- (${s+1}) ${n}`):t.split(/[\.。]\s+/).filter(n=>n.trim()).map((n,s)=>`- (${s+1}) ${n}.`)}}}function xt(t){const e=t.split(/[\.。]\s+/).filter(a=>a.trim()).map(a=>a.trim()),r=(e[0]||"핵심").slice(0,40),n=[{id:"c",label:r,level:0}],s=[];return e.slice(1).forEach((a,i)=>{const o=`n${i+1}`;n.push({id:o,label:a.slice(0,60),level:1}),s.push({from:"c",to:o})}),{kind:"summary",viewType:"mindmap",mindmap:{center:r,nodes:n,edges:s}}}function bt(t){return{kind:"summary",viewType:"selftest",selftest:{title:"셀프테스트",questions:t.split(/[\.。]\s+/).filter(n=>n.trim()).map(n=>n.trim()).map((n,s)=>({id:`q${s+1}`,type:"short",question:`(${s+1}) 다음 내용을 한 문장으로 설명해보세요: "${n.slice(0,70)}"`,answerHint:n}))}}}async function ir(t,e){var c,l,u,h,m;const r=X(t.GEMINI_API_KEY).trim();if(!r)throw new Error("GEMINI_API_KEY is missing");const n=X(t.GEMINI_MODEL).trim()||"gemini-1.5-flash",s=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(n)}:generateContent?key=${encodeURIComponent(r)}`,a={contents:[{role:"user",parts:[{text:e}]}],generationConfig:{temperature:.3,topP:.9,maxOutputTokens:2048,topK:40},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]};let i=0,o=500;for(;i<3;){i++;const w=await fetch(s,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(a)});if(w.ok){const T=await w.json();return{ok:!0,text:((m=(h=(u=(l=(c=T==null?void 0:T.candidates)==null?void 0:c[0])==null?void 0:l.content)==null?void 0:u.parts)==null?void 0:h[0])==null?void 0:m.text)??"",raw:T}}if(w.status===429||w.status===503){await new Promise(T=>setTimeout(T,o)),o*=2;continue}const C=await w.text().catch(()=>"");throw new Error(`Gemini error ${w.status}: ${C.slice(0,200)}`)}throw new Error("Gemini retry exceeded")}async function or(t,e){const r=Zn(e);for(let n=1;n<=2;n++)try{let a=(await ir(t,r)).trim();a.startsWith("```json")?a=a.replace(/^```json\s*/i,"").replace(/```\s*$/,""):a.startsWith("```")&&(a=a.replace(/^```\s*/,"").replace(/```\s*$/,""));const i=JSON.parse(a);if(!i.brief||!i.standard||!i.detail)throw new Error("Missing required fields: brief/standard/detail");if(!i.detail.개념||!i.detail.영향||!i.detail["교육적 가치"])throw new Error("Missing required detail fields: 개념/영향/교육적 가치");const o=Ve(i.brief),c=Ve(i.standard),l=Ve(i.detail.개념+i.detail.영향+i.detail["교육적 가치"]);if(o>=c||c>=l)if(console.warn(`[Summary JSON] 단조증가 위반: brief=${o}, standard=${c}, detail=${l}, attempt=${n}`),n===2)console.warn("[Summary JSON] ⚠️ 단조증가 위반이지만 반환");else throw new Error("Monotonic increase violation");return console.log(`[Summary JSON] ✅ PASS - brief=${o}, standard=${c}, detail=${l}`),i}catch(s){if(console.error(`[Summary JSON] attempt=${n}, error:`,s.message),n===2){const a=Kt(e);return{meta:{base_chars_no_space:a.base,target:{brief:a.brief,standard:a.standard,detail:a.detail}},brief:"[JSON 파싱 실패] 원문 요약을 생성할 수 없습니다.",standard:"[JSON 파싱 실패] 원문 요약을 생성할 수 없습니다.",detail:{개념:"[파싱 실패]",영향:"[파싱 실패]","교육적 가치":"[파싱 실패]"}}}}throw new Error("Unexpected: summarizeWithJSON failed")}const cr=`/* MindStory Engine Bundle (compat) */
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
})();`;Q.use("/api/*",_n());Q.get("/static/ms-engine-bundle.js",t=>t.text(cr,200,{"content-type":"application/javascript; charset=utf-8","cache-control":"no-store"}));Q.get("/favicon.ico",t=>t.body(null,204));Q.use("/static/*",Bn({root:"./public"}));Q.get("/",t=>t.html(`<!DOCTYPE html>
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
</html>`));Q.get("/api/health",t=>{const e=!!X(t.env.GEMINI_API_KEY).trim(),r=X(t.env.USE_MOCK).trim().toLowerCase()==="true";return t.json({ok:!0,ts:qt(),hasDB:!!t.env.DB,hasGeminiKey:e,engineMode:e&&!r?"gemini+fallback":"local-only"})});Q.post("/api/engine",async t=>{var $,p;const e=Date.now(),r=t.env.DB;await ar(r);let n=null;try{n=await t.req.json()}catch{return t.json({ok:!1,error:{code:"BAD_JSON",message:"요청 JSON이 올바르지 않습니다."}},400)}const s=Un(n==null?void 0:n.kind),a=X((n==null?void 0:n.text)||""),i=qn((n==null?void 0:n.mode)||(n==null?void 0:n.level)),o=Kn((n==null?void 0:n.viewType)||(n==null?void 0:n.displayMode)),c=X((($=n==null?void 0:n.options)==null?void 0:$.userId)||(n==null?void 0:n.userId)||"anon");if(!a.trim()||a.trim().length<5)return t.json({ok:!1,error:{code:"NO_TEXT",message:"입력 텍스트가 없습니다."}},200);const l=sr(s,i,o,a,c||null),u=await gt(r,l);if(u.hit)return t.json({ok:!0,data:u.data,meta:{cached:!0,cacheStore:u.store,cacheType:"derived",engine:"cache",elapsedMs:Date.now()-e}},200);const h=rr(s,i,a,c||null),m=await gt(r,h);if(m.hit&&((p=m.data)!=null&&p.narrative)){const g=m.data.narrative;let v;return o==="narrative"?v={kind:s,mode:i,viewType:o,narrative:g}:o==="structured"?v={kind:s,mode:i,...mt(g)}:o==="mindmap"?v={kind:s,mode:i,...xt(g)}:v={kind:s,mode:i,...bt(g)},await ke(r,l,c||"anon",v),t.json({ok:!0,data:v,meta:{cached:!0,cacheStore:"derived",cacheType:"converted",engine:"local-convert",elapsedMs:Date.now()-e}},200)}const w=!!X(t.env.GEMINI_API_KEY).trim(),C=X(t.env.USE_MOCK).trim().toLowerCase()==="true";if(s==="summary"&&w&&!C)try{const g=await or(t.env,a);let v;i==="brief"?v=g.brief:i==="standard"?v=g.standard:v=`**개념**
${g.detail.개념}

**영향**
${g.detail.영향}

**교육적 가치**
${g.detail["교육적 가치"]}`;const j={kind:s,mode:i,viewType:"narrative",narrative:v,allSummaries:{brief:g.brief,standard:g.standard,detail:g.detail},meta:g.meta};await ke(r,h,c||"anon",j);let f;return o==="narrative"?f=j:o==="structured"?f={kind:s,mode:i,...mt(v)}:o==="mindmap"?f={kind:s,mode:i,...xt(v)}:f={kind:s,mode:i,...bt(v)},await ke(r,l,c||"anon",f),t.json({ok:!0,data:f,meta:{cached:!1,engine:"gemini-json-v3",elapsedMs:Date.now()-e}},200)}catch(g){console.error("[Gemini JSON Error]",g)}const T=nr(a,i,o);if(await ke(r,l,c||"anon",T),T.narrative){const g={kind:"summary",mode:i,viewType:"narrative",narrative:T.narrative};await ke(r,h,c||"anon",g)}return t.json({ok:!0,data:T,meta:{cached:!1,engine:"local",elapsedMs:Date.now()-e}},200)});Q.get("/health",t=>t.json({ok:!0,service:"MindStory v2 Revised"}));Q.notFound(t=>t.json({ok:!1,error:{code:"NOT_FOUND",message:"Route not found"}},404));const vt=new Ft,lr=Object.assign({"/src/index.tsx":Q});let Gt=!1;for(const[,t]of Object.entries(lr))t&&(vt.route("/",t),vt.notFound(t.notFoundHandler),Gt=!0);if(!Gt)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{vt as default};
