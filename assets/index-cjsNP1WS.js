var bx=Object.defineProperty;var Ax=(s,e,t)=>e in s?bx(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var Zu=(s,e,t)=>Ax(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function Z0(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Ku={exports:{}},Xo={},Qu={exports:{}},xt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mm;function Cx(){if(Mm)return xt;Mm=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),m=Symbol.for("react.lazy"),v=Symbol.iterator;function x(B){return B===null||typeof B!="object"?null:(B=v&&B[v]||B["@@iterator"],typeof B=="function"?B:null)}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,M={};function S(B,ce,se){this.props=B,this.context=ce,this.refs=M,this.updater=se||y}S.prototype.isReactComponent={},S.prototype.setState=function(B,ce){if(typeof B!="object"&&typeof B!="function"&&B!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,B,ce,"setState")},S.prototype.forceUpdate=function(B){this.updater.enqueueForceUpdate(this,B,"forceUpdate")};function g(){}g.prototype=S.prototype;function C(B,ce,se){this.props=B,this.context=ce,this.refs=M,this.updater=se||y}var A=C.prototype=new g;A.constructor=C,E(A,S.prototype),A.isPureReactComponent=!0;var T=Array.isArray,U=Object.prototype.hasOwnProperty,L={current:null},I={key:!0,ref:!0,__self:!0,__source:!0};function O(B,ce,se){var K,oe={},j=null,te=null;if(ce!=null)for(K in ce.ref!==void 0&&(te=ce.ref),ce.key!==void 0&&(j=""+ce.key),ce)U.call(ce,K)&&!I.hasOwnProperty(K)&&(oe[K]=ce[K]);var ge=arguments.length-2;if(ge===1)oe.children=se;else if(1<ge){for(var ye=Array(ge),Ce=0;Ce<ge;Ce++)ye[Ce]=arguments[Ce+2];oe.children=ye}if(B&&B.defaultProps)for(K in ge=B.defaultProps,ge)oe[K]===void 0&&(oe[K]=ge[K]);return{$$typeof:s,type:B,key:j,ref:te,props:oe,_owner:L.current}}function R(B,ce){return{$$typeof:s,type:B.type,key:ce,ref:B.ref,props:B.props,_owner:B._owner}}function P(B){return typeof B=="object"&&B!==null&&B.$$typeof===s}function F(B){var ce={"=":"=0",":":"=2"};return"$"+B.replace(/[=:]/g,function(se){return ce[se]})}var ne=/\/+/g;function q(B,ce){return typeof B=="object"&&B!==null&&B.key!=null?F(""+B.key):ce.toString(36)}function V(B,ce,se,K,oe){var j=typeof B;(j==="undefined"||j==="boolean")&&(B=null);var te=!1;if(B===null)te=!0;else switch(j){case"string":case"number":te=!0;break;case"object":switch(B.$$typeof){case s:case e:te=!0}}if(te)return te=B,oe=oe(te),B=K===""?"."+q(te,0):K,T(oe)?(se="",B!=null&&(se=B.replace(ne,"$&/")+"/"),V(oe,ce,se,"",function(Ce){return Ce})):oe!=null&&(P(oe)&&(oe=R(oe,se+(!oe.key||te&&te.key===oe.key?"":(""+oe.key).replace(ne,"$&/")+"/")+B)),ce.push(oe)),1;if(te=0,K=K===""?".":K+":",T(B))for(var ge=0;ge<B.length;ge++){j=B[ge];var ye=K+q(j,ge);te+=V(j,ce,se,ye,oe)}else if(ye=x(B),typeof ye=="function")for(B=ye.call(B),ge=0;!(j=B.next()).done;)j=j.value,ye=K+q(j,ge++),te+=V(j,ce,se,ye,oe);else if(j==="object")throw ce=String(B),Error("Objects are not valid as a React child (found: "+(ce==="[object Object]"?"object with keys {"+Object.keys(B).join(", ")+"}":ce)+"). If you meant to render a collection of children, use an array instead.");return te}function J(B,ce,se){if(B==null)return B;var K=[],oe=0;return V(B,K,"","",function(j){return ce.call(se,j,oe++)}),K}function ee(B){if(B._status===-1){var ce=B._result;ce=ce(),ce.then(function(se){(B._status===0||B._status===-1)&&(B._status=1,B._result=se)},function(se){(B._status===0||B._status===-1)&&(B._status=2,B._result=se)}),B._status===-1&&(B._status=0,B._result=ce)}if(B._status===1)return B._result.default;throw B._result}var ae={current:null},H={transition:null},le={ReactCurrentDispatcher:ae,ReactCurrentBatchConfig:H,ReactCurrentOwner:L};function ie(){throw Error("act(...) is not supported in production builds of React.")}return xt.Children={map:J,forEach:function(B,ce,se){J(B,function(){ce.apply(this,arguments)},se)},count:function(B){var ce=0;return J(B,function(){ce++}),ce},toArray:function(B){return J(B,function(ce){return ce})||[]},only:function(B){if(!P(B))throw Error("React.Children.only expected to receive a single React element child.");return B}},xt.Component=S,xt.Fragment=t,xt.Profiler=o,xt.PureComponent=C,xt.StrictMode=r,xt.Suspense=h,xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=le,xt.act=ie,xt.cloneElement=function(B,ce,se){if(B==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+B+".");var K=E({},B.props),oe=B.key,j=B.ref,te=B._owner;if(ce!=null){if(ce.ref!==void 0&&(j=ce.ref,te=L.current),ce.key!==void 0&&(oe=""+ce.key),B.type&&B.type.defaultProps)var ge=B.type.defaultProps;for(ye in ce)U.call(ce,ye)&&!I.hasOwnProperty(ye)&&(K[ye]=ce[ye]===void 0&&ge!==void 0?ge[ye]:ce[ye])}var ye=arguments.length-2;if(ye===1)K.children=se;else if(1<ye){ge=Array(ye);for(var Ce=0;Ce<ye;Ce++)ge[Ce]=arguments[Ce+2];K.children=ge}return{$$typeof:s,type:B.type,key:oe,ref:j,props:K,_owner:te}},xt.createContext=function(B){return B={$$typeof:u,_currentValue:B,_currentValue2:B,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},B.Provider={$$typeof:l,_context:B},B.Consumer=B},xt.createElement=O,xt.createFactory=function(B){var ce=O.bind(null,B);return ce.type=B,ce},xt.createRef=function(){return{current:null}},xt.forwardRef=function(B){return{$$typeof:d,render:B}},xt.isValidElement=P,xt.lazy=function(B){return{$$typeof:m,_payload:{_status:-1,_result:B},_init:ee}},xt.memo=function(B,ce){return{$$typeof:p,type:B,compare:ce===void 0?null:ce}},xt.startTransition=function(B){var ce=H.transition;H.transition={};try{B()}finally{H.transition=ce}},xt.unstable_act=ie,xt.useCallback=function(B,ce){return ae.current.useCallback(B,ce)},xt.useContext=function(B){return ae.current.useContext(B)},xt.useDebugValue=function(){},xt.useDeferredValue=function(B){return ae.current.useDeferredValue(B)},xt.useEffect=function(B,ce){return ae.current.useEffect(B,ce)},xt.useId=function(){return ae.current.useId()},xt.useImperativeHandle=function(B,ce,se){return ae.current.useImperativeHandle(B,ce,se)},xt.useInsertionEffect=function(B,ce){return ae.current.useInsertionEffect(B,ce)},xt.useLayoutEffect=function(B,ce){return ae.current.useLayoutEffect(B,ce)},xt.useMemo=function(B,ce){return ae.current.useMemo(B,ce)},xt.useReducer=function(B,ce,se){return ae.current.useReducer(B,ce,se)},xt.useRef=function(B){return ae.current.useRef(B)},xt.useState=function(B){return ae.current.useState(B)},xt.useSyncExternalStore=function(B,ce,se){return ae.current.useSyncExternalStore(B,ce,se)},xt.useTransition=function(){return ae.current.useTransition()},xt.version="18.3.1",xt}var Em;function Dh(){return Em||(Em=1,Qu.exports=Cx()),Qu.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wm;function Rx(){if(wm)return Xo;wm=1;var s=Dh(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,o=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(d,h,p){var m,v={},x=null,y=null;p!==void 0&&(x=""+p),h.key!==void 0&&(x=""+h.key),h.ref!==void 0&&(y=h.ref);for(m in h)r.call(h,m)&&!l.hasOwnProperty(m)&&(v[m]=h[m]);if(d&&d.defaultProps)for(m in h=d.defaultProps,h)v[m]===void 0&&(v[m]=h[m]);return{$$typeof:e,type:d,key:x,ref:y,props:v,_owner:o.current}}return Xo.Fragment=t,Xo.jsx=u,Xo.jsxs=u,Xo}var Tm;function Px(){return Tm||(Tm=1,Ku.exports=Rx()),Ku.exports}var w=Px(),Nt=Dh();const Yl=Z0(Nt);var xl={},Ju={exports:{}},Bn={},ed={exports:{}},td={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bm;function Nx(){return bm||(bm=1,(function(s){function e(H,le){var ie=H.length;H.push(le);e:for(;0<ie;){var B=ie-1>>>1,ce=H[B];if(0<o(ce,le))H[B]=le,H[ie]=ce,ie=B;else break e}}function t(H){return H.length===0?null:H[0]}function r(H){if(H.length===0)return null;var le=H[0],ie=H.pop();if(ie!==le){H[0]=ie;e:for(var B=0,ce=H.length,se=ce>>>1;B<se;){var K=2*(B+1)-1,oe=H[K],j=K+1,te=H[j];if(0>o(oe,ie))j<ce&&0>o(te,oe)?(H[B]=te,H[j]=ie,B=j):(H[B]=oe,H[K]=ie,B=K);else if(j<ce&&0>o(te,ie))H[B]=te,H[j]=ie,B=j;else break e}}return le}function o(H,le){var ie=H.sortIndex-le.sortIndex;return ie!==0?ie:H.id-le.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var u=Date,d=u.now();s.unstable_now=function(){return u.now()-d}}var h=[],p=[],m=1,v=null,x=3,y=!1,E=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,C=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function A(H){for(var le=t(p);le!==null;){if(le.callback===null)r(p);else if(le.startTime<=H)r(p),le.sortIndex=le.expirationTime,e(h,le);else break;le=t(p)}}function T(H){if(M=!1,A(H),!E)if(t(h)!==null)E=!0,ee(U);else{var le=t(p);le!==null&&ae(T,le.startTime-H)}}function U(H,le){E=!1,M&&(M=!1,g(O),O=-1),y=!0;var ie=x;try{for(A(le),v=t(h);v!==null&&(!(v.expirationTime>le)||H&&!F());){var B=v.callback;if(typeof B=="function"){v.callback=null,x=v.priorityLevel;var ce=B(v.expirationTime<=le);le=s.unstable_now(),typeof ce=="function"?v.callback=ce:v===t(h)&&r(h),A(le)}else r(h);v=t(h)}if(v!==null)var se=!0;else{var K=t(p);K!==null&&ae(T,K.startTime-le),se=!1}return se}finally{v=null,x=ie,y=!1}}var L=!1,I=null,O=-1,R=5,P=-1;function F(){return!(s.unstable_now()-P<R)}function ne(){if(I!==null){var H=s.unstable_now();P=H;var le=!0;try{le=I(!0,H)}finally{le?q():(L=!1,I=null)}}else L=!1}var q;if(typeof C=="function")q=function(){C(ne)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,J=V.port2;V.port1.onmessage=ne,q=function(){J.postMessage(null)}}else q=function(){S(ne,0)};function ee(H){I=H,L||(L=!0,q())}function ae(H,le){O=S(function(){H(s.unstable_now())},le)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(H){H.callback=null},s.unstable_continueExecution=function(){E||y||(E=!0,ee(U))},s.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<H?Math.floor(1e3/H):5},s.unstable_getCurrentPriorityLevel=function(){return x},s.unstable_getFirstCallbackNode=function(){return t(h)},s.unstable_next=function(H){switch(x){case 1:case 2:case 3:var le=3;break;default:le=x}var ie=x;x=le;try{return H()}finally{x=ie}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(H,le){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var ie=x;x=H;try{return le()}finally{x=ie}},s.unstable_scheduleCallback=function(H,le,ie){var B=s.unstable_now();switch(typeof ie=="object"&&ie!==null?(ie=ie.delay,ie=typeof ie=="number"&&0<ie?B+ie:B):ie=B,H){case 1:var ce=-1;break;case 2:ce=250;break;case 5:ce=1073741823;break;case 4:ce=1e4;break;default:ce=5e3}return ce=ie+ce,H={id:m++,callback:le,priorityLevel:H,startTime:ie,expirationTime:ce,sortIndex:-1},ie>B?(H.sortIndex=ie,e(p,H),t(h)===null&&H===t(p)&&(M?(g(O),O=-1):M=!0,ae(T,ie-B))):(H.sortIndex=ce,e(h,H),E||y||(E=!0,ee(U))),H},s.unstable_shouldYield=F,s.unstable_wrapCallback=function(H){var le=x;return function(){var ie=x;x=le;try{return H.apply(this,arguments)}finally{x=ie}}}})(td)),td}var Am;function Dx(){return Am||(Am=1,ed.exports=Nx()),ed.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cm;function Lx(){if(Cm)return Bn;Cm=1;var s=Dh(),e=Dx();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,o={};function l(n,i){u(n,i),u(n+"Capture",i)}function u(n,i){for(o[n]=i,n=0;n<i.length;n++)r.add(i[n])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,m={},v={};function x(n){return h.call(v,n)?!0:h.call(m,n)?!1:p.test(n)?v[n]=!0:(m[n]=!0,!1)}function y(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function E(n,i,a,c){if(i===null||typeof i>"u"||y(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function M(n,i,a,c,f,_,b){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=f,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=_,this.removeEmptyString=b}var S={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){S[n]=new M(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];S[i]=new M(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){S[n]=new M(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){S[n]=new M(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){S[n]=new M(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){S[n]=new M(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){S[n]=new M(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){S[n]=new M(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){S[n]=new M(n,5,!1,n.toLowerCase(),null,!1,!1)});var g=/[\-:]([a-z])/g;function C(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(g,C);S[i]=new M(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(g,C);S[i]=new M(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(g,C);S[i]=new M(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){S[n]=new M(n,1,!1,n.toLowerCase(),null,!1,!1)}),S.xlinkHref=new M("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){S[n]=new M(n,1,!1,n.toLowerCase(),null,!0,!0)});function A(n,i,a,c){var f=S.hasOwnProperty(i)?S[i]:null;(f!==null?f.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(E(i,a,f,c)&&(a=null),c||f===null?x(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):f.mustUseProperty?n[f.propertyName]=a===null?f.type===3?!1:"":a:(i=f.attributeName,c=f.attributeNamespace,a===null?n.removeAttribute(i):(f=f.type,a=f===3||f===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var T=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,U=Symbol.for("react.element"),L=Symbol.for("react.portal"),I=Symbol.for("react.fragment"),O=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),P=Symbol.for("react.provider"),F=Symbol.for("react.context"),ne=Symbol.for("react.forward_ref"),q=Symbol.for("react.suspense"),V=Symbol.for("react.suspense_list"),J=Symbol.for("react.memo"),ee=Symbol.for("react.lazy"),ae=Symbol.for("react.offscreen"),H=Symbol.iterator;function le(n){return n===null||typeof n!="object"?null:(n=H&&n[H]||n["@@iterator"],typeof n=="function"?n:null)}var ie=Object.assign,B;function ce(n){if(B===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);B=i&&i[1]||""}return`
`+B+n}var se=!1;function K(n,i){if(!n||se)return"";se=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(he){var c=he}Reflect.construct(n,[],i)}else{try{i.call()}catch(he){c=he}n.call(i.prototype)}else{try{throw Error()}catch(he){c=he}n()}}catch(he){if(he&&c&&typeof he.stack=="string"){for(var f=he.stack.split(`
`),_=c.stack.split(`
`),b=f.length-1,z=_.length-1;1<=b&&0<=z&&f[b]!==_[z];)z--;for(;1<=b&&0<=z;b--,z--)if(f[b]!==_[z]){if(b!==1||z!==1)do if(b--,z--,0>z||f[b]!==_[z]){var G=`
`+f[b].replace(" at new "," at ");return n.displayName&&G.includes("<anonymous>")&&(G=G.replace("<anonymous>",n.displayName)),G}while(1<=b&&0<=z);break}}}finally{se=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?ce(n):""}function oe(n){switch(n.tag){case 5:return ce(n.type);case 16:return ce("Lazy");case 13:return ce("Suspense");case 19:return ce("SuspenseList");case 0:case 2:case 15:return n=K(n.type,!1),n;case 11:return n=K(n.type.render,!1),n;case 1:return n=K(n.type,!0),n;default:return""}}function j(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case I:return"Fragment";case L:return"Portal";case R:return"Profiler";case O:return"StrictMode";case q:return"Suspense";case V:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case F:return(n.displayName||"Context")+".Consumer";case P:return(n._context.displayName||"Context")+".Provider";case ne:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case J:return i=n.displayName||null,i!==null?i:j(n.type)||"Memo";case ee:i=n._payload,n=n._init;try{return j(n(i))}catch{}}return null}function te(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return j(i);case 8:return i===O?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function ge(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function ye(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ce(n){var i=ye(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var f=a.get,_=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return f.call(this)},set:function(b){c=""+b,_.call(this,b)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(b){c=""+b},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function st(n){n._valueTracker||(n._valueTracker=Ce(n))}function Ze(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=ye(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function ut(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function W(n,i){var a=i.checked;return ie({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Ft(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=ge(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function ot(n,i){i=i.checked,i!=null&&A(n,"checked",i,!1)}function ht(n,i){ot(n,i);var a=ge(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?Lt(n,i.type,a):i.hasOwnProperty("defaultValue")&&Lt(n,i.type,ge(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function We(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function Lt(n,i,a){(i!=="number"||ut(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var Ye=Array.isArray;function k(n,i,a,c){if(n=n.options,i){i={};for(var f=0;f<a.length;f++)i["$"+a[f]]=!0;for(a=0;a<n.length;a++)f=i.hasOwnProperty("$"+n[a].value),n[a].selected!==f&&(n[a].selected=f),f&&c&&(n[a].defaultSelected=!0)}else{for(a=""+ge(a),i=null,f=0;f<n.length;f++){if(n[f].value===a){n[f].selected=!0,c&&(n[f].defaultSelected=!0);return}i!==null||n[f].disabled||(i=n[f])}i!==null&&(i.selected=!0)}}function N(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return ie({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function de(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(Ye(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:ge(a)}}function _e(n,i){var a=ge(i.value),c=ge(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function Me(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function ve(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Xe(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?ve(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Re,Fe=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,f){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,f)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Re=Re||document.createElement("div"),Re.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Re.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function gt(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var be={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},He=["Webkit","ms","Moz","O"];Object.keys(be).forEach(function(n){He.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),be[i]=be[n]})});function Qe(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||be.hasOwnProperty(n)&&be[n]?(""+i).trim():i+"px"}function tt(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,f=Qe(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,f):n[a]=f}}var Ve=ie({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function vt(n,i){if(i){if(Ve[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function at(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Pt=null;function Z(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Pe=null,me=null,xe=null;function Ie(n){if(n=No(n)){if(typeof Pe!="function")throw Error(t(280));var i=n.stateNode;i&&(i=La(i),Pe(n.stateNode,n.type,i))}}function Le(n){me?xe?xe.push(n):xe=[n]:me=n}function lt(){if(me){var n=me,i=xe;if(xe=me=null,Ie(n),i)for(n=0;n<i.length;n++)Ie(i[n])}}function Bt(n,i){return n(i)}function nn(){}var wt=!1;function In(n,i,a){if(wt)return n(i,a);wt=!0;try{return Bt(n,i,a)}finally{wt=!1,(me!==null||xe!==null)&&(nn(),lt())}}function Cn(n,i){var a=n.stateNode;if(a===null)return null;var c=La(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var hs=!1;if(d)try{var er={};Object.defineProperty(er,"passive",{get:function(){hs=!0}}),window.addEventListener("test",er,er),window.removeEventListener("test",er,er)}catch{hs=!1}function Li(n,i,a,c,f,_,b,z,G){var he=Array.prototype.slice.call(arguments,3);try{i.apply(a,he)}catch(Ee){this.onError(Ee)}}var Ii=!1,Ur=null,kr=!1,tr=null,ha={onError:function(n){Ii=!0,Ur=n}};function fs(n,i,a,c,f,_,b,z,G){Ii=!1,Ur=null,Li.apply(ha,arguments)}function fa(n,i,a,c,f,_,b,z,G){if(fs.apply(this,arguments),Ii){if(Ii){var he=Ur;Ii=!1,Ur=null}else throw Error(t(198));kr||(kr=!0,tr=he)}}function Mi(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function pa(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function ma(n){if(Mi(n)!==n)throw Error(t(188))}function _c(n){var i=n.alternate;if(!i){if(i=Mi(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var f=a.return;if(f===null)break;var _=f.alternate;if(_===null){if(c=f.return,c!==null){a=c;continue}break}if(f.child===_.child){for(_=f.child;_;){if(_===a)return ma(f),n;if(_===c)return ma(f),i;_=_.sibling}throw Error(t(188))}if(a.return!==c.return)a=f,c=_;else{for(var b=!1,z=f.child;z;){if(z===a){b=!0,a=f,c=_;break}if(z===c){b=!0,c=f,a=_;break}z=z.sibling}if(!b){for(z=_.child;z;){if(z===a){b=!0,a=_,c=f;break}if(z===c){b=!0,c=_,a=f;break}z=z.sibling}if(!b)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function ga(n){return n=_c(n),n!==null?va(n):null}function va(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=va(n);if(i!==null)return i;n=n.sibling}return null}var D=e.unstable_scheduleCallback,Q=e.unstable_cancelCallback,fe=e.unstable_shouldYield,pe=e.unstable_requestPaint,$=e.unstable_now,Te=e.unstable_getCurrentPriorityLevel,Ne=e.unstable_ImmediatePriority,Oe=e.unstable_UserBlockingPriority,ze=e.unstable_NormalPriority,nt=e.unstable_LowPriority,it=e.unstable_IdlePriority,qe=null,ct=null;function bt(n){if(ct&&typeof ct.onCommitFiberRoot=="function")try{ct.onCommitFiberRoot(qe,n,void 0,(n.current.flags&128)===128)}catch{}}var At=Math.clz32?Math.clz32:Ke,jt=Math.log,Et=Math.LN2;function Ke(n){return n>>>=0,n===0?32:31-(jt(n)/Et|0)|0}var qt=64,Mt=4194304;function fn(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function li(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,f=n.suspendedLanes,_=n.pingedLanes,b=a&268435455;if(b!==0){var z=b&~f;z!==0?c=fn(z):(_&=b,_!==0&&(c=fn(_)))}else b=a&~f,b!==0?c=fn(b):_!==0&&(c=fn(_));if(c===0)return 0;if(i!==0&&i!==c&&(i&f)===0&&(f=c&-c,_=i&-i,f>=_||f===16&&(_&4194240)!==0))return i;if((c&4)!==0&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-At(i),f=1<<a,c|=n[a],i&=~f;return c}function Rn(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Or(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,f=n.expirationTimes,_=n.pendingLanes;0<_;){var b=31-At(_),z=1<<b,G=f[b];G===-1?((z&a)===0||(z&c)!==0)&&(f[b]=Rn(z,i)):G<=i&&(n.expiredLanes|=z),_&=~z}}function Ut(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Pn(){var n=qt;return qt<<=1,(qt&4194240)===0&&(qt=64),n}function xn(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function Qt(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-At(i),n[i]=a}function _n(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var f=31-At(a),_=1<<f;i[f]=0,c[f]=-1,n[f]=-1,a&=~_}}function Fr(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-At(a),f=1<<c;f&i|n[c]&i&&(n[c]|=i),a&=~f}}var _t=0;function Jh(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var ef,yc,tf,nf,rf,Sc=!1,xa=[],nr=null,ir=null,rr=null,mo=new Map,go=new Map,sr=[],Yg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function sf(n,i){switch(n){case"focusin":case"focusout":nr=null;break;case"dragenter":case"dragleave":ir=null;break;case"mouseover":case"mouseout":rr=null;break;case"pointerover":case"pointerout":mo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":go.delete(i.pointerId)}}function vo(n,i,a,c,f,_){return n===null||n.nativeEvent!==_?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:_,targetContainers:[f]},i!==null&&(i=No(i),i!==null&&yc(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),n)}function qg(n,i,a,c,f){switch(i){case"focusin":return nr=vo(nr,n,i,a,c,f),!0;case"dragenter":return ir=vo(ir,n,i,a,c,f),!0;case"mouseover":return rr=vo(rr,n,i,a,c,f),!0;case"pointerover":var _=f.pointerId;return mo.set(_,vo(mo.get(_)||null,n,i,a,c,f)),!0;case"gotpointercapture":return _=f.pointerId,go.set(_,vo(go.get(_)||null,n,i,a,c,f)),!0}return!1}function of(n){var i=zr(n.target);if(i!==null){var a=Mi(i);if(a!==null){if(i=a.tag,i===13){if(i=pa(a),i!==null){n.blockedOn=i,rf(n.priority,function(){tf(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function _a(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=Ec(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);Pt=c,a.target.dispatchEvent(c),Pt=null}else return i=No(a),i!==null&&yc(i),n.blockedOn=a,!1;i.shift()}return!0}function af(n,i,a){_a(n)&&a.delete(i)}function Zg(){Sc=!1,nr!==null&&_a(nr)&&(nr=null),ir!==null&&_a(ir)&&(ir=null),rr!==null&&_a(rr)&&(rr=null),mo.forEach(af),go.forEach(af)}function xo(n,i){n.blockedOn===i&&(n.blockedOn=null,Sc||(Sc=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,Zg)))}function _o(n){function i(f){return xo(f,n)}if(0<xa.length){xo(xa[0],n);for(var a=1;a<xa.length;a++){var c=xa[a];c.blockedOn===n&&(c.blockedOn=null)}}for(nr!==null&&xo(nr,n),ir!==null&&xo(ir,n),rr!==null&&xo(rr,n),mo.forEach(i),go.forEach(i),a=0;a<sr.length;a++)c=sr[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<sr.length&&(a=sr[0],a.blockedOn===null);)of(a),a.blockedOn===null&&sr.shift()}var ps=T.ReactCurrentBatchConfig,ya=!0;function Kg(n,i,a,c){var f=_t,_=ps.transition;ps.transition=null;try{_t=1,Mc(n,i,a,c)}finally{_t=f,ps.transition=_}}function Qg(n,i,a,c){var f=_t,_=ps.transition;ps.transition=null;try{_t=4,Mc(n,i,a,c)}finally{_t=f,ps.transition=_}}function Mc(n,i,a,c){if(ya){var f=Ec(n,i,a,c);if(f===null)Bc(n,i,c,Sa,a),sf(n,c);else if(qg(f,n,i,a,c))c.stopPropagation();else if(sf(n,c),i&4&&-1<Yg.indexOf(n)){for(;f!==null;){var _=No(f);if(_!==null&&ef(_),_=Ec(n,i,a,c),_===null&&Bc(n,i,c,Sa,a),_===f)break;f=_}f!==null&&c.stopPropagation()}else Bc(n,i,c,null,a)}}var Sa=null;function Ec(n,i,a,c){if(Sa=null,n=Z(c),n=zr(n),n!==null)if(i=Mi(n),i===null)n=null;else if(a=i.tag,a===13){if(n=pa(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return Sa=n,null}function lf(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Te()){case Ne:return 1;case Oe:return 4;case ze:case nt:return 16;case it:return 536870912;default:return 16}default:return 16}}var or=null,wc=null,Ma=null;function cf(){if(Ma)return Ma;var n,i=wc,a=i.length,c,f="value"in or?or.value:or.textContent,_=f.length;for(n=0;n<a&&i[n]===f[n];n++);var b=a-n;for(c=1;c<=b&&i[a-c]===f[_-c];c++);return Ma=f.slice(n,1<c?1-c:void 0)}function Ea(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function wa(){return!0}function uf(){return!1}function jn(n){function i(a,c,f,_,b){this._reactName=a,this._targetInst=f,this.type=c,this.nativeEvent=_,this.target=b,this.currentTarget=null;for(var z in n)n.hasOwnProperty(z)&&(a=n[z],this[z]=a?a(_):_[z]);return this.isDefaultPrevented=(_.defaultPrevented!=null?_.defaultPrevented:_.returnValue===!1)?wa:uf,this.isPropagationStopped=uf,this}return ie(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=wa)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=wa)},persist:function(){},isPersistent:wa}),i}var ms={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Tc=jn(ms),yo=ie({},ms,{view:0,detail:0}),Jg=jn(yo),bc,Ac,So,Ta=ie({},yo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==So&&(So&&n.type==="mousemove"?(bc=n.screenX-So.screenX,Ac=n.screenY-So.screenY):Ac=bc=0,So=n),bc)},movementY:function(n){return"movementY"in n?n.movementY:Ac}}),df=jn(Ta),ev=ie({},Ta,{dataTransfer:0}),tv=jn(ev),nv=ie({},yo,{relatedTarget:0}),Cc=jn(nv),iv=ie({},ms,{animationName:0,elapsedTime:0,pseudoElement:0}),rv=jn(iv),sv=ie({},ms,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),ov=jn(sv),av=ie({},ms,{data:0}),hf=jn(av),lv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},uv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dv(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=uv[n])?!!i[n]:!1}function Rc(){return dv}var hv=ie({},yo,{key:function(n){if(n.key){var i=lv[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Ea(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?cv[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rc,charCode:function(n){return n.type==="keypress"?Ea(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Ea(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),fv=jn(hv),pv=ie({},Ta,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ff=jn(pv),mv=ie({},yo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rc}),gv=jn(mv),vv=ie({},ms,{propertyName:0,elapsedTime:0,pseudoElement:0}),xv=jn(vv),_v=ie({},Ta,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),yv=jn(_v),Sv=[9,13,27,32],Pc=d&&"CompositionEvent"in window,Mo=null;d&&"documentMode"in document&&(Mo=document.documentMode);var Mv=d&&"TextEvent"in window&&!Mo,pf=d&&(!Pc||Mo&&8<Mo&&11>=Mo),mf=" ",gf=!1;function vf(n,i){switch(n){case"keyup":return Sv.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var gs=!1;function Ev(n,i){switch(n){case"compositionend":return xf(i);case"keypress":return i.which!==32?null:(gf=!0,mf);case"textInput":return n=i.data,n===mf&&gf?null:n;default:return null}}function wv(n,i){if(gs)return n==="compositionend"||!Pc&&vf(n,i)?(n=cf(),Ma=wc=or=null,gs=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return pf&&i.locale!=="ko"?null:i.data;default:return null}}var Tv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function _f(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!Tv[n.type]:i==="textarea"}function yf(n,i,a,c){Le(c),i=Pa(i,"onChange"),0<i.length&&(a=new Tc("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var Eo=null,wo=null;function bv(n){Ff(n,0)}function ba(n){var i=Ss(n);if(Ze(i))return n}function Av(n,i){if(n==="change")return i}var Sf=!1;if(d){var Nc;if(d){var Dc="oninput"in document;if(!Dc){var Mf=document.createElement("div");Mf.setAttribute("oninput","return;"),Dc=typeof Mf.oninput=="function"}Nc=Dc}else Nc=!1;Sf=Nc&&(!document.documentMode||9<document.documentMode)}function Ef(){Eo&&(Eo.detachEvent("onpropertychange",wf),wo=Eo=null)}function wf(n){if(n.propertyName==="value"&&ba(wo)){var i=[];yf(i,wo,n,Z(n)),In(bv,i)}}function Cv(n,i,a){n==="focusin"?(Ef(),Eo=i,wo=a,Eo.attachEvent("onpropertychange",wf)):n==="focusout"&&Ef()}function Rv(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return ba(wo)}function Pv(n,i){if(n==="click")return ba(i)}function Nv(n,i){if(n==="input"||n==="change")return ba(i)}function Dv(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var ci=typeof Object.is=="function"?Object.is:Dv;function To(n,i){if(ci(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var f=a[c];if(!h.call(i,f)||!ci(n[f],i[f]))return!1}return!0}function Tf(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function bf(n,i){var a=Tf(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Tf(a)}}function Af(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Af(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Cf(){for(var n=window,i=ut();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=ut(n.document)}return i}function Lc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function Lv(n){var i=Cf(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&Af(a.ownerDocument.documentElement,a)){if(c!==null&&Lc(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var f=a.textContent.length,_=Math.min(c.start,f);c=c.end===void 0?_:Math.min(c.end,f),!n.extend&&_>c&&(f=c,c=_,_=f),f=bf(a,_);var b=bf(a,c);f&&b&&(n.rangeCount!==1||n.anchorNode!==f.node||n.anchorOffset!==f.offset||n.focusNode!==b.node||n.focusOffset!==b.offset)&&(i=i.createRange(),i.setStart(f.node,f.offset),n.removeAllRanges(),_>c?(n.addRange(i),n.extend(b.node,b.offset)):(i.setEnd(b.node,b.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Iv=d&&"documentMode"in document&&11>=document.documentMode,vs=null,Ic=null,bo=null,Uc=!1;function Rf(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Uc||vs==null||vs!==ut(c)||(c=vs,"selectionStart"in c&&Lc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),bo&&To(bo,c)||(bo=c,c=Pa(Ic,"onSelect"),0<c.length&&(i=new Tc("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=vs)))}function Aa(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var xs={animationend:Aa("Animation","AnimationEnd"),animationiteration:Aa("Animation","AnimationIteration"),animationstart:Aa("Animation","AnimationStart"),transitionend:Aa("Transition","TransitionEnd")},kc={},Pf={};d&&(Pf=document.createElement("div").style,"AnimationEvent"in window||(delete xs.animationend.animation,delete xs.animationiteration.animation,delete xs.animationstart.animation),"TransitionEvent"in window||delete xs.transitionend.transition);function Ca(n){if(kc[n])return kc[n];if(!xs[n])return n;var i=xs[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in Pf)return kc[n]=i[a];return n}var Nf=Ca("animationend"),Df=Ca("animationiteration"),Lf=Ca("animationstart"),If=Ca("transitionend"),Uf=new Map,kf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ar(n,i){Uf.set(n,i),l(i,[n])}for(var Oc=0;Oc<kf.length;Oc++){var Fc=kf[Oc],Uv=Fc.toLowerCase(),kv=Fc[0].toUpperCase()+Fc.slice(1);ar(Uv,"on"+kv)}ar(Nf,"onAnimationEnd"),ar(Df,"onAnimationIteration"),ar(Lf,"onAnimationStart"),ar("dblclick","onDoubleClick"),ar("focusin","onFocus"),ar("focusout","onBlur"),ar(If,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ao="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ov=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ao));function Of(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,fa(c,i,void 0,n),n.currentTarget=null}function Ff(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],f=c.event;c=c.listeners;e:{var _=void 0;if(i)for(var b=c.length-1;0<=b;b--){var z=c[b],G=z.instance,he=z.currentTarget;if(z=z.listener,G!==_&&f.isPropagationStopped())break e;Of(f,z,he),_=G}else for(b=0;b<c.length;b++){if(z=c[b],G=z.instance,he=z.currentTarget,z=z.listener,G!==_&&f.isPropagationStopped())break e;Of(f,z,he),_=G}}}if(kr)throw n=tr,kr=!1,tr=null,n}function Ht(n,i){var a=i[Xc];a===void 0&&(a=i[Xc]=new Set);var c=n+"__bubble";a.has(c)||(zf(i,n,2,!1),a.add(c))}function zc(n,i,a){var c=0;i&&(c|=4),zf(a,n,c,i)}var Ra="_reactListening"+Math.random().toString(36).slice(2);function Co(n){if(!n[Ra]){n[Ra]=!0,r.forEach(function(a){a!=="selectionchange"&&(Ov.has(a)||zc(a,!1,n),zc(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Ra]||(i[Ra]=!0,zc("selectionchange",!1,i))}}function zf(n,i,a,c){switch(lf(i)){case 1:var f=Kg;break;case 4:f=Qg;break;default:f=Mc}a=f.bind(null,i,a,n),f=void 0,!hs||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),c?f!==void 0?n.addEventListener(i,a,{capture:!0,passive:f}):n.addEventListener(i,a,!0):f!==void 0?n.addEventListener(i,a,{passive:f}):n.addEventListener(i,a,!1)}function Bc(n,i,a,c,f){var _=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var b=c.tag;if(b===3||b===4){var z=c.stateNode.containerInfo;if(z===f||z.nodeType===8&&z.parentNode===f)break;if(b===4)for(b=c.return;b!==null;){var G=b.tag;if((G===3||G===4)&&(G=b.stateNode.containerInfo,G===f||G.nodeType===8&&G.parentNode===f))return;b=b.return}for(;z!==null;){if(b=zr(z),b===null)return;if(G=b.tag,G===5||G===6){c=_=b;continue e}z=z.parentNode}}c=c.return}In(function(){var he=_,Ee=Z(a),we=[];e:{var Se=Uf.get(n);if(Se!==void 0){var ke=Tc,Ge=n;switch(n){case"keypress":if(Ea(a)===0)break e;case"keydown":case"keyup":ke=fv;break;case"focusin":Ge="focus",ke=Cc;break;case"focusout":Ge="blur",ke=Cc;break;case"beforeblur":case"afterblur":ke=Cc;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ke=df;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ke=tv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ke=gv;break;case Nf:case Df:case Lf:ke=rv;break;case If:ke=xv;break;case"scroll":ke=Jg;break;case"wheel":ke=yv;break;case"copy":case"cut":case"paste":ke=ov;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ke=ff}var je=(i&4)!==0,Jt=!je&&n==="scroll",re=je?Se!==null?Se+"Capture":null:Se;je=[];for(var Y=he,ue;Y!==null;){ue=Y;var Ae=ue.stateNode;if(ue.tag===5&&Ae!==null&&(ue=Ae,re!==null&&(Ae=Cn(Y,re),Ae!=null&&je.push(Ro(Y,Ae,ue)))),Jt)break;Y=Y.return}0<je.length&&(Se=new ke(Se,Ge,null,a,Ee),we.push({event:Se,listeners:je}))}}if((i&7)===0){e:{if(Se=n==="mouseover"||n==="pointerover",ke=n==="mouseout"||n==="pointerout",Se&&a!==Pt&&(Ge=a.relatedTarget||a.fromElement)&&(zr(Ge)||Ge[Ui]))break e;if((ke||Se)&&(Se=Ee.window===Ee?Ee:(Se=Ee.ownerDocument)?Se.defaultView||Se.parentWindow:window,ke?(Ge=a.relatedTarget||a.toElement,ke=he,Ge=Ge?zr(Ge):null,Ge!==null&&(Jt=Mi(Ge),Ge!==Jt||Ge.tag!==5&&Ge.tag!==6)&&(Ge=null)):(ke=null,Ge=he),ke!==Ge)){if(je=df,Ae="onMouseLeave",re="onMouseEnter",Y="mouse",(n==="pointerout"||n==="pointerover")&&(je=ff,Ae="onPointerLeave",re="onPointerEnter",Y="pointer"),Jt=ke==null?Se:Ss(ke),ue=Ge==null?Se:Ss(Ge),Se=new je(Ae,Y+"leave",ke,a,Ee),Se.target=Jt,Se.relatedTarget=ue,Ae=null,zr(Ee)===he&&(je=new je(re,Y+"enter",Ge,a,Ee),je.target=ue,je.relatedTarget=Jt,Ae=je),Jt=Ae,ke&&Ge)t:{for(je=ke,re=Ge,Y=0,ue=je;ue;ue=_s(ue))Y++;for(ue=0,Ae=re;Ae;Ae=_s(Ae))ue++;for(;0<Y-ue;)je=_s(je),Y--;for(;0<ue-Y;)re=_s(re),ue--;for(;Y--;){if(je===re||re!==null&&je===re.alternate)break t;je=_s(je),re=_s(re)}je=null}else je=null;ke!==null&&Bf(we,Se,ke,je,!1),Ge!==null&&Jt!==null&&Bf(we,Jt,Ge,je,!0)}}e:{if(Se=he?Ss(he):window,ke=Se.nodeName&&Se.nodeName.toLowerCase(),ke==="select"||ke==="input"&&Se.type==="file")var $e=Av;else if(_f(Se))if(Sf)$e=Nv;else{$e=Rv;var Je=Cv}else(ke=Se.nodeName)&&ke.toLowerCase()==="input"&&(Se.type==="checkbox"||Se.type==="radio")&&($e=Pv);if($e&&($e=$e(n,he))){yf(we,$e,a,Ee);break e}Je&&Je(n,Se,he),n==="focusout"&&(Je=Se._wrapperState)&&Je.controlled&&Se.type==="number"&&Lt(Se,"number",Se.value)}switch(Je=he?Ss(he):window,n){case"focusin":(_f(Je)||Je.contentEditable==="true")&&(vs=Je,Ic=he,bo=null);break;case"focusout":bo=Ic=vs=null;break;case"mousedown":Uc=!0;break;case"contextmenu":case"mouseup":case"dragend":Uc=!1,Rf(we,a,Ee);break;case"selectionchange":if(Iv)break;case"keydown":case"keyup":Rf(we,a,Ee)}var et;if(Pc)e:{switch(n){case"compositionstart":var rt="onCompositionStart";break e;case"compositionend":rt="onCompositionEnd";break e;case"compositionupdate":rt="onCompositionUpdate";break e}rt=void 0}else gs?vf(n,a)&&(rt="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(rt="onCompositionStart");rt&&(pf&&a.locale!=="ko"&&(gs||rt!=="onCompositionStart"?rt==="onCompositionEnd"&&gs&&(et=cf()):(or=Ee,wc="value"in or?or.value:or.textContent,gs=!0)),Je=Pa(he,rt),0<Je.length&&(rt=new hf(rt,n,null,a,Ee),we.push({event:rt,listeners:Je}),et?rt.data=et:(et=xf(a),et!==null&&(rt.data=et)))),(et=Mv?Ev(n,a):wv(n,a))&&(he=Pa(he,"onBeforeInput"),0<he.length&&(Ee=new hf("onBeforeInput","beforeinput",null,a,Ee),we.push({event:Ee,listeners:he}),Ee.data=et))}Ff(we,i)})}function Ro(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Pa(n,i){for(var a=i+"Capture",c=[];n!==null;){var f=n,_=f.stateNode;f.tag===5&&_!==null&&(f=_,_=Cn(n,a),_!=null&&c.unshift(Ro(n,_,f)),_=Cn(n,i),_!=null&&c.push(Ro(n,_,f))),n=n.return}return c}function _s(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Bf(n,i,a,c,f){for(var _=i._reactName,b=[];a!==null&&a!==c;){var z=a,G=z.alternate,he=z.stateNode;if(G!==null&&G===c)break;z.tag===5&&he!==null&&(z=he,f?(G=Cn(a,_),G!=null&&b.unshift(Ro(a,G,z))):f||(G=Cn(a,_),G!=null&&b.push(Ro(a,G,z)))),a=a.return}b.length!==0&&n.push({event:i,listeners:b})}var Fv=/\r\n?/g,zv=/\u0000|\uFFFD/g;function Hf(n){return(typeof n=="string"?n:""+n).replace(Fv,`
`).replace(zv,"")}function Na(n,i,a){if(i=Hf(i),Hf(n)!==i&&a)throw Error(t(425))}function Da(){}var Hc=null,Vc=null;function Gc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Wc=typeof setTimeout=="function"?setTimeout:void 0,Bv=typeof clearTimeout=="function"?clearTimeout:void 0,Vf=typeof Promise=="function"?Promise:void 0,Hv=typeof queueMicrotask=="function"?queueMicrotask:typeof Vf<"u"?function(n){return Vf.resolve(null).then(n).catch(Vv)}:Wc;function Vv(n){setTimeout(function(){throw n})}function jc(n,i){var a=i,c=0;do{var f=a.nextSibling;if(n.removeChild(a),f&&f.nodeType===8)if(a=f.data,a==="/$"){if(c===0){n.removeChild(f),_o(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=f}while(a);_o(i)}function lr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function Gf(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var ys=Math.random().toString(36).slice(2),Ei="__reactFiber$"+ys,Po="__reactProps$"+ys,Ui="__reactContainer$"+ys,Xc="__reactEvents$"+ys,Gv="__reactListeners$"+ys,Wv="__reactHandles$"+ys;function zr(n){var i=n[Ei];if(i)return i;for(var a=n.parentNode;a;){if(i=a[Ui]||a[Ei]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=Gf(n);n!==null;){if(a=n[Ei])return a;n=Gf(n)}return i}n=a,a=n.parentNode}return null}function No(n){return n=n[Ei]||n[Ui],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Ss(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function La(n){return n[Po]||null}var $c=[],Ms=-1;function cr(n){return{current:n}}function Vt(n){0>Ms||(n.current=$c[Ms],$c[Ms]=null,Ms--)}function zt(n,i){Ms++,$c[Ms]=n.current,n.current=i}var ur={},yn=cr(ur),Un=cr(!1),Br=ur;function Es(n,i){var a=n.type.contextTypes;if(!a)return ur;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var f={},_;for(_ in a)f[_]=i[_];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=f),f}function kn(n){return n=n.childContextTypes,n!=null}function Ia(){Vt(Un),Vt(yn)}function Wf(n,i,a){if(yn.current!==ur)throw Error(t(168));zt(yn,i),zt(Un,a)}function jf(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var f in c)if(!(f in i))throw Error(t(108,te(n)||"Unknown",f));return ie({},a,c)}function Ua(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||ur,Br=yn.current,zt(yn,n),zt(Un,Un.current),!0}function Xf(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=jf(n,i,Br),c.__reactInternalMemoizedMergedChildContext=n,Vt(Un),Vt(yn),zt(yn,n)):Vt(Un),zt(Un,a)}var ki=null,ka=!1,Yc=!1;function $f(n){ki===null?ki=[n]:ki.push(n)}function jv(n){ka=!0,$f(n)}function dr(){if(!Yc&&ki!==null){Yc=!0;var n=0,i=_t;try{var a=ki;for(_t=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}ki=null,ka=!1}catch(f){throw ki!==null&&(ki=ki.slice(n+1)),D(Ne,dr),f}finally{_t=i,Yc=!1}}return null}var ws=[],Ts=0,Oa=null,Fa=0,Kn=[],Qn=0,Hr=null,Oi=1,Fi="";function Vr(n,i){ws[Ts++]=Fa,ws[Ts++]=Oa,Oa=n,Fa=i}function Yf(n,i,a){Kn[Qn++]=Oi,Kn[Qn++]=Fi,Kn[Qn++]=Hr,Hr=n;var c=Oi;n=Fi;var f=32-At(c)-1;c&=~(1<<f),a+=1;var _=32-At(i)+f;if(30<_){var b=f-f%5;_=(c&(1<<b)-1).toString(32),c>>=b,f-=b,Oi=1<<32-At(i)+f|a<<f|c,Fi=_+n}else Oi=1<<_|a<<f|c,Fi=n}function qc(n){n.return!==null&&(Vr(n,1),Yf(n,1,0))}function Zc(n){for(;n===Oa;)Oa=ws[--Ts],ws[Ts]=null,Fa=ws[--Ts],ws[Ts]=null;for(;n===Hr;)Hr=Kn[--Qn],Kn[Qn]=null,Fi=Kn[--Qn],Kn[Qn]=null,Oi=Kn[--Qn],Kn[Qn]=null}var Xn=null,$n=null,Xt=!1,ui=null;function qf(n,i){var a=ni(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function Zf(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Xn=n,$n=lr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Xn=n,$n=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Hr!==null?{id:Oi,overflow:Fi}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=ni(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Xn=n,$n=null,!0):!1;default:return!1}}function Kc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Qc(n){if(Xt){var i=$n;if(i){var a=i;if(!Zf(n,i)){if(Kc(n))throw Error(t(418));i=lr(a.nextSibling);var c=Xn;i&&Zf(n,i)?qf(c,a):(n.flags=n.flags&-4097|2,Xt=!1,Xn=n)}}else{if(Kc(n))throw Error(t(418));n.flags=n.flags&-4097|2,Xt=!1,Xn=n}}}function Kf(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Xn=n}function za(n){if(n!==Xn)return!1;if(!Xt)return Kf(n),Xt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!Gc(n.type,n.memoizedProps)),i&&(i=$n)){if(Kc(n))throw Qf(),Error(t(418));for(;i;)qf(n,i),i=lr(i.nextSibling)}if(Kf(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){$n=lr(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}$n=null}}else $n=Xn?lr(n.stateNode.nextSibling):null;return!0}function Qf(){for(var n=$n;n;)n=lr(n.nextSibling)}function bs(){$n=Xn=null,Xt=!1}function Jc(n){ui===null?ui=[n]:ui.push(n)}var Xv=T.ReactCurrentBatchConfig;function Do(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var f=c,_=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===_?i.ref:(i=function(b){var z=f.refs;b===null?delete z[_]:z[_]=b},i._stringRef=_,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Ba(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function Jf(n){var i=n._init;return i(n._payload)}function ep(n){function i(re,Y){if(n){var ue=re.deletions;ue===null?(re.deletions=[Y],re.flags|=16):ue.push(Y)}}function a(re,Y){if(!n)return null;for(;Y!==null;)i(re,Y),Y=Y.sibling;return null}function c(re,Y){for(re=new Map;Y!==null;)Y.key!==null?re.set(Y.key,Y):re.set(Y.index,Y),Y=Y.sibling;return re}function f(re,Y){return re=_r(re,Y),re.index=0,re.sibling=null,re}function _(re,Y,ue){return re.index=ue,n?(ue=re.alternate,ue!==null?(ue=ue.index,ue<Y?(re.flags|=2,Y):ue):(re.flags|=2,Y)):(re.flags|=1048576,Y)}function b(re){return n&&re.alternate===null&&(re.flags|=2),re}function z(re,Y,ue,Ae){return Y===null||Y.tag!==6?(Y=Wu(ue,re.mode,Ae),Y.return=re,Y):(Y=f(Y,ue),Y.return=re,Y)}function G(re,Y,ue,Ae){var $e=ue.type;return $e===I?Ee(re,Y,ue.props.children,Ae,ue.key):Y!==null&&(Y.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===ee&&Jf($e)===Y.type)?(Ae=f(Y,ue.props),Ae.ref=Do(re,Y,ue),Ae.return=re,Ae):(Ae=ul(ue.type,ue.key,ue.props,null,re.mode,Ae),Ae.ref=Do(re,Y,ue),Ae.return=re,Ae)}function he(re,Y,ue,Ae){return Y===null||Y.tag!==4||Y.stateNode.containerInfo!==ue.containerInfo||Y.stateNode.implementation!==ue.implementation?(Y=ju(ue,re.mode,Ae),Y.return=re,Y):(Y=f(Y,ue.children||[]),Y.return=re,Y)}function Ee(re,Y,ue,Ae,$e){return Y===null||Y.tag!==7?(Y=Zr(ue,re.mode,Ae,$e),Y.return=re,Y):(Y=f(Y,ue),Y.return=re,Y)}function we(re,Y,ue){if(typeof Y=="string"&&Y!==""||typeof Y=="number")return Y=Wu(""+Y,re.mode,ue),Y.return=re,Y;if(typeof Y=="object"&&Y!==null){switch(Y.$$typeof){case U:return ue=ul(Y.type,Y.key,Y.props,null,re.mode,ue),ue.ref=Do(re,null,Y),ue.return=re,ue;case L:return Y=ju(Y,re.mode,ue),Y.return=re,Y;case ee:var Ae=Y._init;return we(re,Ae(Y._payload),ue)}if(Ye(Y)||le(Y))return Y=Zr(Y,re.mode,ue,null),Y.return=re,Y;Ba(re,Y)}return null}function Se(re,Y,ue,Ae){var $e=Y!==null?Y.key:null;if(typeof ue=="string"&&ue!==""||typeof ue=="number")return $e!==null?null:z(re,Y,""+ue,Ae);if(typeof ue=="object"&&ue!==null){switch(ue.$$typeof){case U:return ue.key===$e?G(re,Y,ue,Ae):null;case L:return ue.key===$e?he(re,Y,ue,Ae):null;case ee:return $e=ue._init,Se(re,Y,$e(ue._payload),Ae)}if(Ye(ue)||le(ue))return $e!==null?null:Ee(re,Y,ue,Ae,null);Ba(re,ue)}return null}function ke(re,Y,ue,Ae,$e){if(typeof Ae=="string"&&Ae!==""||typeof Ae=="number")return re=re.get(ue)||null,z(Y,re,""+Ae,$e);if(typeof Ae=="object"&&Ae!==null){switch(Ae.$$typeof){case U:return re=re.get(Ae.key===null?ue:Ae.key)||null,G(Y,re,Ae,$e);case L:return re=re.get(Ae.key===null?ue:Ae.key)||null,he(Y,re,Ae,$e);case ee:var Je=Ae._init;return ke(re,Y,ue,Je(Ae._payload),$e)}if(Ye(Ae)||le(Ae))return re=re.get(ue)||null,Ee(Y,re,Ae,$e,null);Ba(Y,Ae)}return null}function Ge(re,Y,ue,Ae){for(var $e=null,Je=null,et=Y,rt=Y=0,dn=null;et!==null&&rt<ue.length;rt++){et.index>rt?(dn=et,et=null):dn=et.sibling;var Ct=Se(re,et,ue[rt],Ae);if(Ct===null){et===null&&(et=dn);break}n&&et&&Ct.alternate===null&&i(re,et),Y=_(Ct,Y,rt),Je===null?$e=Ct:Je.sibling=Ct,Je=Ct,et=dn}if(rt===ue.length)return a(re,et),Xt&&Vr(re,rt),$e;if(et===null){for(;rt<ue.length;rt++)et=we(re,ue[rt],Ae),et!==null&&(Y=_(et,Y,rt),Je===null?$e=et:Je.sibling=et,Je=et);return Xt&&Vr(re,rt),$e}for(et=c(re,et);rt<ue.length;rt++)dn=ke(et,re,rt,ue[rt],Ae),dn!==null&&(n&&dn.alternate!==null&&et.delete(dn.key===null?rt:dn.key),Y=_(dn,Y,rt),Je===null?$e=dn:Je.sibling=dn,Je=dn);return n&&et.forEach(function(yr){return i(re,yr)}),Xt&&Vr(re,rt),$e}function je(re,Y,ue,Ae){var $e=le(ue);if(typeof $e!="function")throw Error(t(150));if(ue=$e.call(ue),ue==null)throw Error(t(151));for(var Je=$e=null,et=Y,rt=Y=0,dn=null,Ct=ue.next();et!==null&&!Ct.done;rt++,Ct=ue.next()){et.index>rt?(dn=et,et=null):dn=et.sibling;var yr=Se(re,et,Ct.value,Ae);if(yr===null){et===null&&(et=dn);break}n&&et&&yr.alternate===null&&i(re,et),Y=_(yr,Y,rt),Je===null?$e=yr:Je.sibling=yr,Je=yr,et=dn}if(Ct.done)return a(re,et),Xt&&Vr(re,rt),$e;if(et===null){for(;!Ct.done;rt++,Ct=ue.next())Ct=we(re,Ct.value,Ae),Ct!==null&&(Y=_(Ct,Y,rt),Je===null?$e=Ct:Je.sibling=Ct,Je=Ct);return Xt&&Vr(re,rt),$e}for(et=c(re,et);!Ct.done;rt++,Ct=ue.next())Ct=ke(et,re,rt,Ct.value,Ae),Ct!==null&&(n&&Ct.alternate!==null&&et.delete(Ct.key===null?rt:Ct.key),Y=_(Ct,Y,rt),Je===null?$e=Ct:Je.sibling=Ct,Je=Ct);return n&&et.forEach(function(Tx){return i(re,Tx)}),Xt&&Vr(re,rt),$e}function Jt(re,Y,ue,Ae){if(typeof ue=="object"&&ue!==null&&ue.type===I&&ue.key===null&&(ue=ue.props.children),typeof ue=="object"&&ue!==null){switch(ue.$$typeof){case U:e:{for(var $e=ue.key,Je=Y;Je!==null;){if(Je.key===$e){if($e=ue.type,$e===I){if(Je.tag===7){a(re,Je.sibling),Y=f(Je,ue.props.children),Y.return=re,re=Y;break e}}else if(Je.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===ee&&Jf($e)===Je.type){a(re,Je.sibling),Y=f(Je,ue.props),Y.ref=Do(re,Je,ue),Y.return=re,re=Y;break e}a(re,Je);break}else i(re,Je);Je=Je.sibling}ue.type===I?(Y=Zr(ue.props.children,re.mode,Ae,ue.key),Y.return=re,re=Y):(Ae=ul(ue.type,ue.key,ue.props,null,re.mode,Ae),Ae.ref=Do(re,Y,ue),Ae.return=re,re=Ae)}return b(re);case L:e:{for(Je=ue.key;Y!==null;){if(Y.key===Je)if(Y.tag===4&&Y.stateNode.containerInfo===ue.containerInfo&&Y.stateNode.implementation===ue.implementation){a(re,Y.sibling),Y=f(Y,ue.children||[]),Y.return=re,re=Y;break e}else{a(re,Y);break}else i(re,Y);Y=Y.sibling}Y=ju(ue,re.mode,Ae),Y.return=re,re=Y}return b(re);case ee:return Je=ue._init,Jt(re,Y,Je(ue._payload),Ae)}if(Ye(ue))return Ge(re,Y,ue,Ae);if(le(ue))return je(re,Y,ue,Ae);Ba(re,ue)}return typeof ue=="string"&&ue!==""||typeof ue=="number"?(ue=""+ue,Y!==null&&Y.tag===6?(a(re,Y.sibling),Y=f(Y,ue),Y.return=re,re=Y):(a(re,Y),Y=Wu(ue,re.mode,Ae),Y.return=re,re=Y),b(re)):a(re,Y)}return Jt}var As=ep(!0),tp=ep(!1),Ha=cr(null),Va=null,Cs=null,eu=null;function tu(){eu=Cs=Va=null}function nu(n){var i=Ha.current;Vt(Ha),n._currentValue=i}function iu(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function Rs(n,i){Va=n,eu=Cs=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(On=!0),n.firstContext=null)}function Jn(n){var i=n._currentValue;if(eu!==n)if(n={context:n,memoizedValue:i,next:null},Cs===null){if(Va===null)throw Error(t(308));Cs=n,Va.dependencies={lanes:0,firstContext:n}}else Cs=Cs.next=n;return i}var Gr=null;function ru(n){Gr===null?Gr=[n]:Gr.push(n)}function np(n,i,a,c){var f=i.interleaved;return f===null?(a.next=a,ru(i)):(a.next=f.next,f.next=a),i.interleaved=a,zi(n,c)}function zi(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var hr=!1;function su(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ip(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Bi(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function fr(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(Tt&2)!==0){var f=c.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),c.pending=i,zi(n,a)}return f=c.interleaved,f===null?(i.next=i,ru(c)):(i.next=f.next,f.next=i),c.interleaved=i,zi(n,a)}function Ga(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,Fr(n,a)}}function rp(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var f=null,_=null;if(a=a.firstBaseUpdate,a!==null){do{var b={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};_===null?f=_=b:_=_.next=b,a=a.next}while(a!==null);_===null?f=_=i:_=_.next=i}else f=_=i;a={baseState:c.baseState,firstBaseUpdate:f,lastBaseUpdate:_,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Wa(n,i,a,c){var f=n.updateQueue;hr=!1;var _=f.firstBaseUpdate,b=f.lastBaseUpdate,z=f.shared.pending;if(z!==null){f.shared.pending=null;var G=z,he=G.next;G.next=null,b===null?_=he:b.next=he,b=G;var Ee=n.alternate;Ee!==null&&(Ee=Ee.updateQueue,z=Ee.lastBaseUpdate,z!==b&&(z===null?Ee.firstBaseUpdate=he:z.next=he,Ee.lastBaseUpdate=G))}if(_!==null){var we=f.baseState;b=0,Ee=he=G=null,z=_;do{var Se=z.lane,ke=z.eventTime;if((c&Se)===Se){Ee!==null&&(Ee=Ee.next={eventTime:ke,lane:0,tag:z.tag,payload:z.payload,callback:z.callback,next:null});e:{var Ge=n,je=z;switch(Se=i,ke=a,je.tag){case 1:if(Ge=je.payload,typeof Ge=="function"){we=Ge.call(ke,we,Se);break e}we=Ge;break e;case 3:Ge.flags=Ge.flags&-65537|128;case 0:if(Ge=je.payload,Se=typeof Ge=="function"?Ge.call(ke,we,Se):Ge,Se==null)break e;we=ie({},we,Se);break e;case 2:hr=!0}}z.callback!==null&&z.lane!==0&&(n.flags|=64,Se=f.effects,Se===null?f.effects=[z]:Se.push(z))}else ke={eventTime:ke,lane:Se,tag:z.tag,payload:z.payload,callback:z.callback,next:null},Ee===null?(he=Ee=ke,G=we):Ee=Ee.next=ke,b|=Se;if(z=z.next,z===null){if(z=f.shared.pending,z===null)break;Se=z,z=Se.next,Se.next=null,f.lastBaseUpdate=Se,f.shared.pending=null}}while(!0);if(Ee===null&&(G=we),f.baseState=G,f.firstBaseUpdate=he,f.lastBaseUpdate=Ee,i=f.shared.interleaved,i!==null){f=i;do b|=f.lane,f=f.next;while(f!==i)}else _===null&&(f.shared.lanes=0);Xr|=b,n.lanes=b,n.memoizedState=we}}function sp(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],f=c.callback;if(f!==null){if(c.callback=null,c=a,typeof f!="function")throw Error(t(191,f));f.call(c)}}}var Lo={},wi=cr(Lo),Io=cr(Lo),Uo=cr(Lo);function Wr(n){if(n===Lo)throw Error(t(174));return n}function ou(n,i){switch(zt(Uo,i),zt(Io,n),zt(wi,Lo),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Xe(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=Xe(i,n)}Vt(wi),zt(wi,i)}function Ps(){Vt(wi),Vt(Io),Vt(Uo)}function op(n){Wr(Uo.current);var i=Wr(wi.current),a=Xe(i,n.type);i!==a&&(zt(Io,n),zt(wi,a))}function au(n){Io.current===n&&(Vt(wi),Vt(Io))}var $t=cr(0);function ja(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var lu=[];function cu(){for(var n=0;n<lu.length;n++)lu[n]._workInProgressVersionPrimary=null;lu.length=0}var Xa=T.ReactCurrentDispatcher,uu=T.ReactCurrentBatchConfig,jr=0,Yt=null,rn=null,cn=null,$a=!1,ko=!1,Oo=0,$v=0;function Sn(){throw Error(t(321))}function du(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!ci(n[a],i[a]))return!1;return!0}function hu(n,i,a,c,f,_){if(jr=_,Yt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Xa.current=n===null||n.memoizedState===null?Kv:Qv,n=a(c,f),ko){_=0;do{if(ko=!1,Oo=0,25<=_)throw Error(t(301));_+=1,cn=rn=null,i.updateQueue=null,Xa.current=Jv,n=a(c,f)}while(ko)}if(Xa.current=Za,i=rn!==null&&rn.next!==null,jr=0,cn=rn=Yt=null,$a=!1,i)throw Error(t(300));return n}function fu(){var n=Oo!==0;return Oo=0,n}function Ti(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return cn===null?Yt.memoizedState=cn=n:cn=cn.next=n,cn}function ei(){if(rn===null){var n=Yt.alternate;n=n!==null?n.memoizedState:null}else n=rn.next;var i=cn===null?Yt.memoizedState:cn.next;if(i!==null)cn=i,rn=n;else{if(n===null)throw Error(t(310));rn=n,n={memoizedState:rn.memoizedState,baseState:rn.baseState,baseQueue:rn.baseQueue,queue:rn.queue,next:null},cn===null?Yt.memoizedState=cn=n:cn=cn.next=n}return cn}function Fo(n,i){return typeof i=="function"?i(n):i}function pu(n){var i=ei(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=rn,f=c.baseQueue,_=a.pending;if(_!==null){if(f!==null){var b=f.next;f.next=_.next,_.next=b}c.baseQueue=f=_,a.pending=null}if(f!==null){_=f.next,c=c.baseState;var z=b=null,G=null,he=_;do{var Ee=he.lane;if((jr&Ee)===Ee)G!==null&&(G=G.next={lane:0,action:he.action,hasEagerState:he.hasEagerState,eagerState:he.eagerState,next:null}),c=he.hasEagerState?he.eagerState:n(c,he.action);else{var we={lane:Ee,action:he.action,hasEagerState:he.hasEagerState,eagerState:he.eagerState,next:null};G===null?(z=G=we,b=c):G=G.next=we,Yt.lanes|=Ee,Xr|=Ee}he=he.next}while(he!==null&&he!==_);G===null?b=c:G.next=z,ci(c,i.memoizedState)||(On=!0),i.memoizedState=c,i.baseState=b,i.baseQueue=G,a.lastRenderedState=c}if(n=a.interleaved,n!==null){f=n;do _=f.lane,Yt.lanes|=_,Xr|=_,f=f.next;while(f!==n)}else f===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function mu(n){var i=ei(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,f=a.pending,_=i.memoizedState;if(f!==null){a.pending=null;var b=f=f.next;do _=n(_,b.action),b=b.next;while(b!==f);ci(_,i.memoizedState)||(On=!0),i.memoizedState=_,i.baseQueue===null&&(i.baseState=_),a.lastRenderedState=_}return[_,c]}function ap(){}function lp(n,i){var a=Yt,c=ei(),f=i(),_=!ci(c.memoizedState,f);if(_&&(c.memoizedState=f,On=!0),c=c.queue,gu(dp.bind(null,a,c,n),[n]),c.getSnapshot!==i||_||cn!==null&&cn.memoizedState.tag&1){if(a.flags|=2048,zo(9,up.bind(null,a,c,f,i),void 0,null),un===null)throw Error(t(349));(jr&30)!==0||cp(a,i,f)}return f}function cp(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=Yt.updateQueue,i===null?(i={lastEffect:null,stores:null},Yt.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function up(n,i,a,c){i.value=a,i.getSnapshot=c,hp(i)&&fp(n)}function dp(n,i,a){return a(function(){hp(i)&&fp(n)})}function hp(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!ci(n,a)}catch{return!0}}function fp(n){var i=zi(n,1);i!==null&&pi(i,n,1,-1)}function pp(n){var i=Ti();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Fo,lastRenderedState:n},i.queue=n,n=n.dispatch=Zv.bind(null,Yt,n),[i.memoizedState,n]}function zo(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=Yt.updateQueue,i===null?(i={lastEffect:null,stores:null},Yt.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function mp(){return ei().memoizedState}function Ya(n,i,a,c){var f=Ti();Yt.flags|=n,f.memoizedState=zo(1|i,a,void 0,c===void 0?null:c)}function qa(n,i,a,c){var f=ei();c=c===void 0?null:c;var _=void 0;if(rn!==null){var b=rn.memoizedState;if(_=b.destroy,c!==null&&du(c,b.deps)){f.memoizedState=zo(i,a,_,c);return}}Yt.flags|=n,f.memoizedState=zo(1|i,a,_,c)}function gp(n,i){return Ya(8390656,8,n,i)}function gu(n,i){return qa(2048,8,n,i)}function vp(n,i){return qa(4,2,n,i)}function xp(n,i){return qa(4,4,n,i)}function _p(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function yp(n,i,a){return a=a!=null?a.concat([n]):null,qa(4,4,_p.bind(null,i,n),a)}function vu(){}function Sp(n,i){var a=ei();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&du(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function Mp(n,i){var a=ei();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&du(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function Ep(n,i,a){return(jr&21)===0?(n.baseState&&(n.baseState=!1,On=!0),n.memoizedState=a):(ci(a,i)||(a=Pn(),Yt.lanes|=a,Xr|=a,n.baseState=!0),i)}function Yv(n,i){var a=_t;_t=a!==0&&4>a?a:4,n(!0);var c=uu.transition;uu.transition={};try{n(!1),i()}finally{_t=a,uu.transition=c}}function wp(){return ei().memoizedState}function qv(n,i,a){var c=vr(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},Tp(n))bp(i,a);else if(a=np(n,i,a,c),a!==null){var f=Dn();pi(a,n,c,f),Ap(a,i,c)}}function Zv(n,i,a){var c=vr(n),f={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(Tp(n))bp(i,f);else{var _=n.alternate;if(n.lanes===0&&(_===null||_.lanes===0)&&(_=i.lastRenderedReducer,_!==null))try{var b=i.lastRenderedState,z=_(b,a);if(f.hasEagerState=!0,f.eagerState=z,ci(z,b)){var G=i.interleaved;G===null?(f.next=f,ru(i)):(f.next=G.next,G.next=f),i.interleaved=f;return}}catch{}finally{}a=np(n,i,f,c),a!==null&&(f=Dn(),pi(a,n,c,f),Ap(a,i,c))}}function Tp(n){var i=n.alternate;return n===Yt||i!==null&&i===Yt}function bp(n,i){ko=$a=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function Ap(n,i,a){if((a&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,Fr(n,a)}}var Za={readContext:Jn,useCallback:Sn,useContext:Sn,useEffect:Sn,useImperativeHandle:Sn,useInsertionEffect:Sn,useLayoutEffect:Sn,useMemo:Sn,useReducer:Sn,useRef:Sn,useState:Sn,useDebugValue:Sn,useDeferredValue:Sn,useTransition:Sn,useMutableSource:Sn,useSyncExternalStore:Sn,useId:Sn,unstable_isNewReconciler:!1},Kv={readContext:Jn,useCallback:function(n,i){return Ti().memoizedState=[n,i===void 0?null:i],n},useContext:Jn,useEffect:gp,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,Ya(4194308,4,_p.bind(null,i,n),a)},useLayoutEffect:function(n,i){return Ya(4194308,4,n,i)},useInsertionEffect:function(n,i){return Ya(4,2,n,i)},useMemo:function(n,i){var a=Ti();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=Ti();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=qv.bind(null,Yt,n),[c.memoizedState,n]},useRef:function(n){var i=Ti();return n={current:n},i.memoizedState=n},useState:pp,useDebugValue:vu,useDeferredValue:function(n){return Ti().memoizedState=n},useTransition:function(){var n=pp(!1),i=n[0];return n=Yv.bind(null,n[1]),Ti().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=Yt,f=Ti();if(Xt){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),un===null)throw Error(t(349));(jr&30)!==0||cp(c,i,a)}f.memoizedState=a;var _={value:a,getSnapshot:i};return f.queue=_,gp(dp.bind(null,c,_,n),[n]),c.flags|=2048,zo(9,up.bind(null,c,_,a,i),void 0,null),a},useId:function(){var n=Ti(),i=un.identifierPrefix;if(Xt){var a=Fi,c=Oi;a=(c&~(1<<32-At(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=Oo++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=$v++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},Qv={readContext:Jn,useCallback:Sp,useContext:Jn,useEffect:gu,useImperativeHandle:yp,useInsertionEffect:vp,useLayoutEffect:xp,useMemo:Mp,useReducer:pu,useRef:mp,useState:function(){return pu(Fo)},useDebugValue:vu,useDeferredValue:function(n){var i=ei();return Ep(i,rn.memoizedState,n)},useTransition:function(){var n=pu(Fo)[0],i=ei().memoizedState;return[n,i]},useMutableSource:ap,useSyncExternalStore:lp,useId:wp,unstable_isNewReconciler:!1},Jv={readContext:Jn,useCallback:Sp,useContext:Jn,useEffect:gu,useImperativeHandle:yp,useInsertionEffect:vp,useLayoutEffect:xp,useMemo:Mp,useReducer:mu,useRef:mp,useState:function(){return mu(Fo)},useDebugValue:vu,useDeferredValue:function(n){var i=ei();return rn===null?i.memoizedState=n:Ep(i,rn.memoizedState,n)},useTransition:function(){var n=mu(Fo)[0],i=ei().memoizedState;return[n,i]},useMutableSource:ap,useSyncExternalStore:lp,useId:wp,unstable_isNewReconciler:!1};function di(n,i){if(n&&n.defaultProps){i=ie({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function xu(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:ie({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var Ka={isMounted:function(n){return(n=n._reactInternals)?Mi(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=Dn(),f=vr(n),_=Bi(c,f);_.payload=i,a!=null&&(_.callback=a),i=fr(n,_,f),i!==null&&(pi(i,n,f,c),Ga(i,n,f))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=Dn(),f=vr(n),_=Bi(c,f);_.tag=1,_.payload=i,a!=null&&(_.callback=a),i=fr(n,_,f),i!==null&&(pi(i,n,f,c),Ga(i,n,f))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=Dn(),c=vr(n),f=Bi(a,c);f.tag=2,i!=null&&(f.callback=i),i=fr(n,f,c),i!==null&&(pi(i,n,c,a),Ga(i,n,c))}};function Cp(n,i,a,c,f,_,b){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,_,b):i.prototype&&i.prototype.isPureReactComponent?!To(a,c)||!To(f,_):!0}function Rp(n,i,a){var c=!1,f=ur,_=i.contextType;return typeof _=="object"&&_!==null?_=Jn(_):(f=kn(i)?Br:yn.current,c=i.contextTypes,_=(c=c!=null)?Es(n,f):ur),i=new i(a,_),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ka,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=f,n.__reactInternalMemoizedMaskedChildContext=_),i}function Pp(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&Ka.enqueueReplaceState(i,i.state,null)}function _u(n,i,a,c){var f=n.stateNode;f.props=a,f.state=n.memoizedState,f.refs={},su(n);var _=i.contextType;typeof _=="object"&&_!==null?f.context=Jn(_):(_=kn(i)?Br:yn.current,f.context=Es(n,_)),f.state=n.memoizedState,_=i.getDerivedStateFromProps,typeof _=="function"&&(xu(n,i,_,a),f.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(i=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),i!==f.state&&Ka.enqueueReplaceState(f,f.state,null),Wa(n,a,f,c),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308)}function Ns(n,i){try{var a="",c=i;do a+=oe(c),c=c.return;while(c);var f=a}catch(_){f=`
Error generating stack: `+_.message+`
`+_.stack}return{value:n,source:i,stack:f,digest:null}}function yu(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function Su(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var ex=typeof WeakMap=="function"?WeakMap:Map;function Np(n,i,a){a=Bi(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){rl||(rl=!0,ku=c),Su(n,i)},a}function Dp(n,i,a){a=Bi(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var f=i.value;a.payload=function(){return c(f)},a.callback=function(){Su(n,i)}}var _=n.stateNode;return _!==null&&typeof _.componentDidCatch=="function"&&(a.callback=function(){Su(n,i),typeof c!="function"&&(mr===null?mr=new Set([this]):mr.add(this));var b=i.stack;this.componentDidCatch(i.value,{componentStack:b!==null?b:""})}),a}function Lp(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new ex;var f=new Set;c.set(i,f)}else f=c.get(i),f===void 0&&(f=new Set,c.set(i,f));f.has(a)||(f.add(a),n=px.bind(null,n,i,a),i.then(n,n))}function Ip(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function Up(n,i,a,c,f){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=Bi(-1,1),i.tag=2,fr(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=f,n)}var tx=T.ReactCurrentOwner,On=!1;function Nn(n,i,a,c){i.child=n===null?tp(i,null,a,c):As(i,n.child,a,c)}function kp(n,i,a,c,f){a=a.render;var _=i.ref;return Rs(i,f),c=hu(n,i,a,c,_,f),a=fu(),n!==null&&!On?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~f,Hi(n,i,f)):(Xt&&a&&qc(i),i.flags|=1,Nn(n,i,c,f),i.child)}function Op(n,i,a,c,f){if(n===null){var _=a.type;return typeof _=="function"&&!Gu(_)&&_.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=_,Fp(n,i,_,c,f)):(n=ul(a.type,null,c,i,i.mode,f),n.ref=i.ref,n.return=i,i.child=n)}if(_=n.child,(n.lanes&f)===0){var b=_.memoizedProps;if(a=a.compare,a=a!==null?a:To,a(b,c)&&n.ref===i.ref)return Hi(n,i,f)}return i.flags|=1,n=_r(_,c),n.ref=i.ref,n.return=i,i.child=n}function Fp(n,i,a,c,f){if(n!==null){var _=n.memoizedProps;if(To(_,c)&&n.ref===i.ref)if(On=!1,i.pendingProps=c=_,(n.lanes&f)!==0)(n.flags&131072)!==0&&(On=!0);else return i.lanes=n.lanes,Hi(n,i,f)}return Mu(n,i,a,c,f)}function zp(n,i,a){var c=i.pendingProps,f=c.children,_=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},zt(Ls,Yn),Yn|=a;else{if((a&1073741824)===0)return n=_!==null?_.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,zt(Ls,Yn),Yn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=_!==null?_.baseLanes:a,zt(Ls,Yn),Yn|=c}else _!==null?(c=_.baseLanes|a,i.memoizedState=null):c=a,zt(Ls,Yn),Yn|=c;return Nn(n,i,f,a),i.child}function Bp(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function Mu(n,i,a,c,f){var _=kn(a)?Br:yn.current;return _=Es(i,_),Rs(i,f),a=hu(n,i,a,c,_,f),c=fu(),n!==null&&!On?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~f,Hi(n,i,f)):(Xt&&c&&qc(i),i.flags|=1,Nn(n,i,a,f),i.child)}function Hp(n,i,a,c,f){if(kn(a)){var _=!0;Ua(i)}else _=!1;if(Rs(i,f),i.stateNode===null)Ja(n,i),Rp(i,a,c),_u(i,a,c,f),c=!0;else if(n===null){var b=i.stateNode,z=i.memoizedProps;b.props=z;var G=b.context,he=a.contextType;typeof he=="object"&&he!==null?he=Jn(he):(he=kn(a)?Br:yn.current,he=Es(i,he));var Ee=a.getDerivedStateFromProps,we=typeof Ee=="function"||typeof b.getSnapshotBeforeUpdate=="function";we||typeof b.UNSAFE_componentWillReceiveProps!="function"&&typeof b.componentWillReceiveProps!="function"||(z!==c||G!==he)&&Pp(i,b,c,he),hr=!1;var Se=i.memoizedState;b.state=Se,Wa(i,c,b,f),G=i.memoizedState,z!==c||Se!==G||Un.current||hr?(typeof Ee=="function"&&(xu(i,a,Ee,c),G=i.memoizedState),(z=hr||Cp(i,a,z,c,Se,G,he))?(we||typeof b.UNSAFE_componentWillMount!="function"&&typeof b.componentWillMount!="function"||(typeof b.componentWillMount=="function"&&b.componentWillMount(),typeof b.UNSAFE_componentWillMount=="function"&&b.UNSAFE_componentWillMount()),typeof b.componentDidMount=="function"&&(i.flags|=4194308)):(typeof b.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=G),b.props=c,b.state=G,b.context=he,c=z):(typeof b.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{b=i.stateNode,ip(n,i),z=i.memoizedProps,he=i.type===i.elementType?z:di(i.type,z),b.props=he,we=i.pendingProps,Se=b.context,G=a.contextType,typeof G=="object"&&G!==null?G=Jn(G):(G=kn(a)?Br:yn.current,G=Es(i,G));var ke=a.getDerivedStateFromProps;(Ee=typeof ke=="function"||typeof b.getSnapshotBeforeUpdate=="function")||typeof b.UNSAFE_componentWillReceiveProps!="function"&&typeof b.componentWillReceiveProps!="function"||(z!==we||Se!==G)&&Pp(i,b,c,G),hr=!1,Se=i.memoizedState,b.state=Se,Wa(i,c,b,f);var Ge=i.memoizedState;z!==we||Se!==Ge||Un.current||hr?(typeof ke=="function"&&(xu(i,a,ke,c),Ge=i.memoizedState),(he=hr||Cp(i,a,he,c,Se,Ge,G)||!1)?(Ee||typeof b.UNSAFE_componentWillUpdate!="function"&&typeof b.componentWillUpdate!="function"||(typeof b.componentWillUpdate=="function"&&b.componentWillUpdate(c,Ge,G),typeof b.UNSAFE_componentWillUpdate=="function"&&b.UNSAFE_componentWillUpdate(c,Ge,G)),typeof b.componentDidUpdate=="function"&&(i.flags|=4),typeof b.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof b.componentDidUpdate!="function"||z===n.memoizedProps&&Se===n.memoizedState||(i.flags|=4),typeof b.getSnapshotBeforeUpdate!="function"||z===n.memoizedProps&&Se===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=Ge),b.props=c,b.state=Ge,b.context=G,c=he):(typeof b.componentDidUpdate!="function"||z===n.memoizedProps&&Se===n.memoizedState||(i.flags|=4),typeof b.getSnapshotBeforeUpdate!="function"||z===n.memoizedProps&&Se===n.memoizedState||(i.flags|=1024),c=!1)}return Eu(n,i,a,c,_,f)}function Eu(n,i,a,c,f,_){Bp(n,i);var b=(i.flags&128)!==0;if(!c&&!b)return f&&Xf(i,a,!1),Hi(n,i,_);c=i.stateNode,tx.current=i;var z=b&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&b?(i.child=As(i,n.child,null,_),i.child=As(i,null,z,_)):Nn(n,i,z,_),i.memoizedState=c.state,f&&Xf(i,a,!0),i.child}function Vp(n){var i=n.stateNode;i.pendingContext?Wf(n,i.pendingContext,i.pendingContext!==i.context):i.context&&Wf(n,i.context,!1),ou(n,i.containerInfo)}function Gp(n,i,a,c,f){return bs(),Jc(f),i.flags|=256,Nn(n,i,a,c),i.child}var wu={dehydrated:null,treeContext:null,retryLane:0};function Tu(n){return{baseLanes:n,cachePool:null,transitions:null}}function Wp(n,i,a){var c=i.pendingProps,f=$t.current,_=!1,b=(i.flags&128)!==0,z;if((z=b)||(z=n!==null&&n.memoizedState===null?!1:(f&2)!==0),z?(_=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(f|=1),zt($t,f&1),n===null)return Qc(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(b=c.children,n=c.fallback,_?(c=i.mode,_=i.child,b={mode:"hidden",children:b},(c&1)===0&&_!==null?(_.childLanes=0,_.pendingProps=b):_=dl(b,c,0,null),n=Zr(n,c,a,null),_.return=i,n.return=i,_.sibling=n,i.child=_,i.child.memoizedState=Tu(a),i.memoizedState=wu,n):bu(i,b));if(f=n.memoizedState,f!==null&&(z=f.dehydrated,z!==null))return nx(n,i,b,c,z,f,a);if(_){_=c.fallback,b=i.mode,f=n.child,z=f.sibling;var G={mode:"hidden",children:c.children};return(b&1)===0&&i.child!==f?(c=i.child,c.childLanes=0,c.pendingProps=G,i.deletions=null):(c=_r(f,G),c.subtreeFlags=f.subtreeFlags&14680064),z!==null?_=_r(z,_):(_=Zr(_,b,a,null),_.flags|=2),_.return=i,c.return=i,c.sibling=_,i.child=c,c=_,_=i.child,b=n.child.memoizedState,b=b===null?Tu(a):{baseLanes:b.baseLanes|a,cachePool:null,transitions:b.transitions},_.memoizedState=b,_.childLanes=n.childLanes&~a,i.memoizedState=wu,c}return _=n.child,n=_.sibling,c=_r(_,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function bu(n,i){return i=dl({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function Qa(n,i,a,c){return c!==null&&Jc(c),As(i,n.child,null,a),n=bu(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function nx(n,i,a,c,f,_,b){if(a)return i.flags&256?(i.flags&=-257,c=yu(Error(t(422))),Qa(n,i,b,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(_=c.fallback,f=i.mode,c=dl({mode:"visible",children:c.children},f,0,null),_=Zr(_,f,b,null),_.flags|=2,c.return=i,_.return=i,c.sibling=_,i.child=c,(i.mode&1)!==0&&As(i,n.child,null,b),i.child.memoizedState=Tu(b),i.memoizedState=wu,_);if((i.mode&1)===0)return Qa(n,i,b,null);if(f.data==="$!"){if(c=f.nextSibling&&f.nextSibling.dataset,c)var z=c.dgst;return c=z,_=Error(t(419)),c=yu(_,c,void 0),Qa(n,i,b,c)}if(z=(b&n.childLanes)!==0,On||z){if(c=un,c!==null){switch(b&-b){case 4:f=2;break;case 16:f=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:f=32;break;case 536870912:f=268435456;break;default:f=0}f=(f&(c.suspendedLanes|b))!==0?0:f,f!==0&&f!==_.retryLane&&(_.retryLane=f,zi(n,f),pi(c,n,f,-1))}return Vu(),c=yu(Error(t(421))),Qa(n,i,b,c)}return f.data==="$?"?(i.flags|=128,i.child=n.child,i=mx.bind(null,n),f._reactRetry=i,null):(n=_.treeContext,$n=lr(f.nextSibling),Xn=i,Xt=!0,ui=null,n!==null&&(Kn[Qn++]=Oi,Kn[Qn++]=Fi,Kn[Qn++]=Hr,Oi=n.id,Fi=n.overflow,Hr=i),i=bu(i,c.children),i.flags|=4096,i)}function jp(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),iu(n.return,i,a)}function Au(n,i,a,c,f){var _=n.memoizedState;_===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:f}:(_.isBackwards=i,_.rendering=null,_.renderingStartTime=0,_.last=c,_.tail=a,_.tailMode=f)}function Xp(n,i,a){var c=i.pendingProps,f=c.revealOrder,_=c.tail;if(Nn(n,i,c.children,a),c=$t.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&jp(n,a,i);else if(n.tag===19)jp(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(zt($t,c),(i.mode&1)===0)i.memoizedState=null;else switch(f){case"forwards":for(a=i.child,f=null;a!==null;)n=a.alternate,n!==null&&ja(n)===null&&(f=a),a=a.sibling;a=f,a===null?(f=i.child,i.child=null):(f=a.sibling,a.sibling=null),Au(i,!1,f,a,_);break;case"backwards":for(a=null,f=i.child,i.child=null;f!==null;){if(n=f.alternate,n!==null&&ja(n)===null){i.child=f;break}n=f.sibling,f.sibling=a,a=f,f=n}Au(i,!0,a,null,_);break;case"together":Au(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Ja(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Hi(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),Xr|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=_r(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=_r(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function ix(n,i,a){switch(i.tag){case 3:Vp(i),bs();break;case 5:op(i);break;case 1:kn(i.type)&&Ua(i);break;case 4:ou(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,f=i.memoizedProps.value;zt(Ha,c._currentValue),c._currentValue=f;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(zt($t,$t.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?Wp(n,i,a):(zt($t,$t.current&1),n=Hi(n,i,a),n!==null?n.sibling:null);zt($t,$t.current&1);break;case 19:if(c=(a&i.childLanes)!==0,(n.flags&128)!==0){if(c)return Xp(n,i,a);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),zt($t,$t.current),c)break;return null;case 22:case 23:return i.lanes=0,zp(n,i,a)}return Hi(n,i,a)}var $p,Cu,Yp,qp;$p=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Cu=function(){},Yp=function(n,i,a,c){var f=n.memoizedProps;if(f!==c){n=i.stateNode,Wr(wi.current);var _=null;switch(a){case"input":f=W(n,f),c=W(n,c),_=[];break;case"select":f=ie({},f,{value:void 0}),c=ie({},c,{value:void 0}),_=[];break;case"textarea":f=N(n,f),c=N(n,c),_=[];break;default:typeof f.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=Da)}vt(a,c);var b;a=null;for(he in f)if(!c.hasOwnProperty(he)&&f.hasOwnProperty(he)&&f[he]!=null)if(he==="style"){var z=f[he];for(b in z)z.hasOwnProperty(b)&&(a||(a={}),a[b]="")}else he!=="dangerouslySetInnerHTML"&&he!=="children"&&he!=="suppressContentEditableWarning"&&he!=="suppressHydrationWarning"&&he!=="autoFocus"&&(o.hasOwnProperty(he)?_||(_=[]):(_=_||[]).push(he,null));for(he in c){var G=c[he];if(z=f!=null?f[he]:void 0,c.hasOwnProperty(he)&&G!==z&&(G!=null||z!=null))if(he==="style")if(z){for(b in z)!z.hasOwnProperty(b)||G&&G.hasOwnProperty(b)||(a||(a={}),a[b]="");for(b in G)G.hasOwnProperty(b)&&z[b]!==G[b]&&(a||(a={}),a[b]=G[b])}else a||(_||(_=[]),_.push(he,a)),a=G;else he==="dangerouslySetInnerHTML"?(G=G?G.__html:void 0,z=z?z.__html:void 0,G!=null&&z!==G&&(_=_||[]).push(he,G)):he==="children"?typeof G!="string"&&typeof G!="number"||(_=_||[]).push(he,""+G):he!=="suppressContentEditableWarning"&&he!=="suppressHydrationWarning"&&(o.hasOwnProperty(he)?(G!=null&&he==="onScroll"&&Ht("scroll",n),_||z===G||(_=[])):(_=_||[]).push(he,G))}a&&(_=_||[]).push("style",a);var he=_;(i.updateQueue=he)&&(i.flags|=4)}},qp=function(n,i,a,c){a!==c&&(i.flags|=4)};function Bo(n,i){if(!Xt)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function Mn(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var f=n.child;f!==null;)a|=f.lanes|f.childLanes,c|=f.subtreeFlags&14680064,c|=f.flags&14680064,f.return=n,f=f.sibling;else for(f=n.child;f!==null;)a|=f.lanes|f.childLanes,c|=f.subtreeFlags,c|=f.flags,f.return=n,f=f.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function rx(n,i,a){var c=i.pendingProps;switch(Zc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Mn(i),null;case 1:return kn(i.type)&&Ia(),Mn(i),null;case 3:return c=i.stateNode,Ps(),Vt(Un),Vt(yn),cu(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(za(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ui!==null&&(zu(ui),ui=null))),Cu(n,i),Mn(i),null;case 5:au(i);var f=Wr(Uo.current);if(a=i.type,n!==null&&i.stateNode!=null)Yp(n,i,a,c,f),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return Mn(i),null}if(n=Wr(wi.current),za(i)){c=i.stateNode,a=i.type;var _=i.memoizedProps;switch(c[Ei]=i,c[Po]=_,n=(i.mode&1)!==0,a){case"dialog":Ht("cancel",c),Ht("close",c);break;case"iframe":case"object":case"embed":Ht("load",c);break;case"video":case"audio":for(f=0;f<Ao.length;f++)Ht(Ao[f],c);break;case"source":Ht("error",c);break;case"img":case"image":case"link":Ht("error",c),Ht("load",c);break;case"details":Ht("toggle",c);break;case"input":Ft(c,_),Ht("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!_.multiple},Ht("invalid",c);break;case"textarea":de(c,_),Ht("invalid",c)}vt(a,_),f=null;for(var b in _)if(_.hasOwnProperty(b)){var z=_[b];b==="children"?typeof z=="string"?c.textContent!==z&&(_.suppressHydrationWarning!==!0&&Na(c.textContent,z,n),f=["children",z]):typeof z=="number"&&c.textContent!==""+z&&(_.suppressHydrationWarning!==!0&&Na(c.textContent,z,n),f=["children",""+z]):o.hasOwnProperty(b)&&z!=null&&b==="onScroll"&&Ht("scroll",c)}switch(a){case"input":st(c),We(c,_,!0);break;case"textarea":st(c),Me(c);break;case"select":case"option":break;default:typeof _.onClick=="function"&&(c.onclick=Da)}c=f,i.updateQueue=c,c!==null&&(i.flags|=4)}else{b=f.nodeType===9?f:f.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=ve(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=b.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=b.createElement(a,{is:c.is}):(n=b.createElement(a),a==="select"&&(b=n,c.multiple?b.multiple=!0:c.size&&(b.size=c.size))):n=b.createElementNS(n,a),n[Ei]=i,n[Po]=c,$p(n,i,!1,!1),i.stateNode=n;e:{switch(b=at(a,c),a){case"dialog":Ht("cancel",n),Ht("close",n),f=c;break;case"iframe":case"object":case"embed":Ht("load",n),f=c;break;case"video":case"audio":for(f=0;f<Ao.length;f++)Ht(Ao[f],n);f=c;break;case"source":Ht("error",n),f=c;break;case"img":case"image":case"link":Ht("error",n),Ht("load",n),f=c;break;case"details":Ht("toggle",n),f=c;break;case"input":Ft(n,c),f=W(n,c),Ht("invalid",n);break;case"option":f=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},f=ie({},c,{value:void 0}),Ht("invalid",n);break;case"textarea":de(n,c),f=N(n,c),Ht("invalid",n);break;default:f=c}vt(a,f),z=f;for(_ in z)if(z.hasOwnProperty(_)){var G=z[_];_==="style"?tt(n,G):_==="dangerouslySetInnerHTML"?(G=G?G.__html:void 0,G!=null&&Fe(n,G)):_==="children"?typeof G=="string"?(a!=="textarea"||G!=="")&&gt(n,G):typeof G=="number"&&gt(n,""+G):_!=="suppressContentEditableWarning"&&_!=="suppressHydrationWarning"&&_!=="autoFocus"&&(o.hasOwnProperty(_)?G!=null&&_==="onScroll"&&Ht("scroll",n):G!=null&&A(n,_,G,b))}switch(a){case"input":st(n),We(n,c,!1);break;case"textarea":st(n),Me(n);break;case"option":c.value!=null&&n.setAttribute("value",""+ge(c.value));break;case"select":n.multiple=!!c.multiple,_=c.value,_!=null?k(n,!!c.multiple,_,!1):c.defaultValue!=null&&k(n,!!c.multiple,c.defaultValue,!0);break;default:typeof f.onClick=="function"&&(n.onclick=Da)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return Mn(i),null;case 6:if(n&&i.stateNode!=null)qp(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=Wr(Uo.current),Wr(wi.current),za(i)){if(c=i.stateNode,a=i.memoizedProps,c[Ei]=i,(_=c.nodeValue!==a)&&(n=Xn,n!==null))switch(n.tag){case 3:Na(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Na(c.nodeValue,a,(n.mode&1)!==0)}_&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[Ei]=i,i.stateNode=c}return Mn(i),null;case 13:if(Vt($t),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Xt&&$n!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Qf(),bs(),i.flags|=98560,_=!1;else if(_=za(i),c!==null&&c.dehydrated!==null){if(n===null){if(!_)throw Error(t(318));if(_=i.memoizedState,_=_!==null?_.dehydrated:null,!_)throw Error(t(317));_[Ei]=i}else bs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Mn(i),_=!1}else ui!==null&&(zu(ui),ui=null),_=!0;if(!_)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||($t.current&1)!==0?sn===0&&(sn=3):Vu())),i.updateQueue!==null&&(i.flags|=4),Mn(i),null);case 4:return Ps(),Cu(n,i),n===null&&Co(i.stateNode.containerInfo),Mn(i),null;case 10:return nu(i.type._context),Mn(i),null;case 17:return kn(i.type)&&Ia(),Mn(i),null;case 19:if(Vt($t),_=i.memoizedState,_===null)return Mn(i),null;if(c=(i.flags&128)!==0,b=_.rendering,b===null)if(c)Bo(_,!1);else{if(sn!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(b=ja(n),b!==null){for(i.flags|=128,Bo(_,!1),c=b.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)_=a,n=c,_.flags&=14680066,b=_.alternate,b===null?(_.childLanes=0,_.lanes=n,_.child=null,_.subtreeFlags=0,_.memoizedProps=null,_.memoizedState=null,_.updateQueue=null,_.dependencies=null,_.stateNode=null):(_.childLanes=b.childLanes,_.lanes=b.lanes,_.child=b.child,_.subtreeFlags=0,_.deletions=null,_.memoizedProps=b.memoizedProps,_.memoizedState=b.memoizedState,_.updateQueue=b.updateQueue,_.type=b.type,n=b.dependencies,_.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return zt($t,$t.current&1|2),i.child}n=n.sibling}_.tail!==null&&$()>Is&&(i.flags|=128,c=!0,Bo(_,!1),i.lanes=4194304)}else{if(!c)if(n=ja(b),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),Bo(_,!0),_.tail===null&&_.tailMode==="hidden"&&!b.alternate&&!Xt)return Mn(i),null}else 2*$()-_.renderingStartTime>Is&&a!==1073741824&&(i.flags|=128,c=!0,Bo(_,!1),i.lanes=4194304);_.isBackwards?(b.sibling=i.child,i.child=b):(a=_.last,a!==null?a.sibling=b:i.child=b,_.last=b)}return _.tail!==null?(i=_.tail,_.rendering=i,_.tail=i.sibling,_.renderingStartTime=$(),i.sibling=null,a=$t.current,zt($t,c?a&1|2:a&1),i):(Mn(i),null);case 22:case 23:return Hu(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(Yn&1073741824)!==0&&(Mn(i),i.subtreeFlags&6&&(i.flags|=8192)):Mn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function sx(n,i){switch(Zc(i),i.tag){case 1:return kn(i.type)&&Ia(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Ps(),Vt(Un),Vt(yn),cu(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return au(i),null;case 13:if(Vt($t),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));bs()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Vt($t),null;case 4:return Ps(),null;case 10:return nu(i.type._context),null;case 22:case 23:return Hu(),null;case 24:return null;default:return null}}var el=!1,En=!1,ox=typeof WeakSet=="function"?WeakSet:Set,Be=null;function Ds(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){Zt(n,i,c)}else a.current=null}function Ru(n,i,a){try{a()}catch(c){Zt(n,i,c)}}var Zp=!1;function ax(n,i){if(Hc=ya,n=Cf(),Lc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var f=c.anchorOffset,_=c.focusNode;c=c.focusOffset;try{a.nodeType,_.nodeType}catch{a=null;break e}var b=0,z=-1,G=-1,he=0,Ee=0,we=n,Se=null;t:for(;;){for(var ke;we!==a||f!==0&&we.nodeType!==3||(z=b+f),we!==_||c!==0&&we.nodeType!==3||(G=b+c),we.nodeType===3&&(b+=we.nodeValue.length),(ke=we.firstChild)!==null;)Se=we,we=ke;for(;;){if(we===n)break t;if(Se===a&&++he===f&&(z=b),Se===_&&++Ee===c&&(G=b),(ke=we.nextSibling)!==null)break;we=Se,Se=we.parentNode}we=ke}a=z===-1||G===-1?null:{start:z,end:G}}else a=null}a=a||{start:0,end:0}}else a=null;for(Vc={focusedElem:n,selectionRange:a},ya=!1,Be=i;Be!==null;)if(i=Be,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,Be=n;else for(;Be!==null;){i=Be;try{var Ge=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Ge!==null){var je=Ge.memoizedProps,Jt=Ge.memoizedState,re=i.stateNode,Y=re.getSnapshotBeforeUpdate(i.elementType===i.type?je:di(i.type,je),Jt);re.__reactInternalSnapshotBeforeUpdate=Y}break;case 3:var ue=i.stateNode.containerInfo;ue.nodeType===1?ue.textContent="":ue.nodeType===9&&ue.documentElement&&ue.removeChild(ue.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Ae){Zt(i,i.return,Ae)}if(n=i.sibling,n!==null){n.return=i.return,Be=n;break}Be=i.return}return Ge=Zp,Zp=!1,Ge}function Ho(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var f=c=c.next;do{if((f.tag&n)===n){var _=f.destroy;f.destroy=void 0,_!==void 0&&Ru(i,a,_)}f=f.next}while(f!==c)}}function tl(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function Pu(n){var i=n.ref;if(i!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof i=="function"?i(n):i.current=n}}function Kp(n){var i=n.alternate;i!==null&&(n.alternate=null,Kp(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[Ei],delete i[Po],delete i[Xc],delete i[Gv],delete i[Wv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Qp(n){return n.tag===5||n.tag===3||n.tag===4}function Jp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Qp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Nu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Da));else if(c!==4&&(n=n.child,n!==null))for(Nu(n,i,a),n=n.sibling;n!==null;)Nu(n,i,a),n=n.sibling}function Du(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(Du(n,i,a),n=n.sibling;n!==null;)Du(n,i,a),n=n.sibling}var pn=null,hi=!1;function pr(n,i,a){for(a=a.child;a!==null;)em(n,i,a),a=a.sibling}function em(n,i,a){if(ct&&typeof ct.onCommitFiberUnmount=="function")try{ct.onCommitFiberUnmount(qe,a)}catch{}switch(a.tag){case 5:En||Ds(a,i);case 6:var c=pn,f=hi;pn=null,pr(n,i,a),pn=c,hi=f,pn!==null&&(hi?(n=pn,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):pn.removeChild(a.stateNode));break;case 18:pn!==null&&(hi?(n=pn,a=a.stateNode,n.nodeType===8?jc(n.parentNode,a):n.nodeType===1&&jc(n,a),_o(n)):jc(pn,a.stateNode));break;case 4:c=pn,f=hi,pn=a.stateNode.containerInfo,hi=!0,pr(n,i,a),pn=c,hi=f;break;case 0:case 11:case 14:case 15:if(!En&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){f=c=c.next;do{var _=f,b=_.destroy;_=_.tag,b!==void 0&&((_&2)!==0||(_&4)!==0)&&Ru(a,i,b),f=f.next}while(f!==c)}pr(n,i,a);break;case 1:if(!En&&(Ds(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(z){Zt(a,i,z)}pr(n,i,a);break;case 21:pr(n,i,a);break;case 22:a.mode&1?(En=(c=En)||a.memoizedState!==null,pr(n,i,a),En=c):pr(n,i,a);break;default:pr(n,i,a)}}function tm(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new ox),i.forEach(function(c){var f=gx.bind(null,n,c);a.has(c)||(a.add(c),c.then(f,f))})}}function fi(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var f=a[c];try{var _=n,b=i,z=b;e:for(;z!==null;){switch(z.tag){case 5:pn=z.stateNode,hi=!1;break e;case 3:pn=z.stateNode.containerInfo,hi=!0;break e;case 4:pn=z.stateNode.containerInfo,hi=!0;break e}z=z.return}if(pn===null)throw Error(t(160));em(_,b,f),pn=null,hi=!1;var G=f.alternate;G!==null&&(G.return=null),f.return=null}catch(he){Zt(f,i,he)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)nm(i,n),i=i.sibling}function nm(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(fi(i,n),bi(n),c&4){try{Ho(3,n,n.return),tl(3,n)}catch(je){Zt(n,n.return,je)}try{Ho(5,n,n.return)}catch(je){Zt(n,n.return,je)}}break;case 1:fi(i,n),bi(n),c&512&&a!==null&&Ds(a,a.return);break;case 5:if(fi(i,n),bi(n),c&512&&a!==null&&Ds(a,a.return),n.flags&32){var f=n.stateNode;try{gt(f,"")}catch(je){Zt(n,n.return,je)}}if(c&4&&(f=n.stateNode,f!=null)){var _=n.memoizedProps,b=a!==null?a.memoizedProps:_,z=n.type,G=n.updateQueue;if(n.updateQueue=null,G!==null)try{z==="input"&&_.type==="radio"&&_.name!=null&&ot(f,_),at(z,b);var he=at(z,_);for(b=0;b<G.length;b+=2){var Ee=G[b],we=G[b+1];Ee==="style"?tt(f,we):Ee==="dangerouslySetInnerHTML"?Fe(f,we):Ee==="children"?gt(f,we):A(f,Ee,we,he)}switch(z){case"input":ht(f,_);break;case"textarea":_e(f,_);break;case"select":var Se=f._wrapperState.wasMultiple;f._wrapperState.wasMultiple=!!_.multiple;var ke=_.value;ke!=null?k(f,!!_.multiple,ke,!1):Se!==!!_.multiple&&(_.defaultValue!=null?k(f,!!_.multiple,_.defaultValue,!0):k(f,!!_.multiple,_.multiple?[]:"",!1))}f[Po]=_}catch(je){Zt(n,n.return,je)}}break;case 6:if(fi(i,n),bi(n),c&4){if(n.stateNode===null)throw Error(t(162));f=n.stateNode,_=n.memoizedProps;try{f.nodeValue=_}catch(je){Zt(n,n.return,je)}}break;case 3:if(fi(i,n),bi(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{_o(i.containerInfo)}catch(je){Zt(n,n.return,je)}break;case 4:fi(i,n),bi(n);break;case 13:fi(i,n),bi(n),f=n.child,f.flags&8192&&(_=f.memoizedState!==null,f.stateNode.isHidden=_,!_||f.alternate!==null&&f.alternate.memoizedState!==null||(Uu=$())),c&4&&tm(n);break;case 22:if(Ee=a!==null&&a.memoizedState!==null,n.mode&1?(En=(he=En)||Ee,fi(i,n),En=he):fi(i,n),bi(n),c&8192){if(he=n.memoizedState!==null,(n.stateNode.isHidden=he)&&!Ee&&(n.mode&1)!==0)for(Be=n,Ee=n.child;Ee!==null;){for(we=Be=Ee;Be!==null;){switch(Se=Be,ke=Se.child,Se.tag){case 0:case 11:case 14:case 15:Ho(4,Se,Se.return);break;case 1:Ds(Se,Se.return);var Ge=Se.stateNode;if(typeof Ge.componentWillUnmount=="function"){c=Se,a=Se.return;try{i=c,Ge.props=i.memoizedProps,Ge.state=i.memoizedState,Ge.componentWillUnmount()}catch(je){Zt(c,a,je)}}break;case 5:Ds(Se,Se.return);break;case 22:if(Se.memoizedState!==null){sm(we);continue}}ke!==null?(ke.return=Se,Be=ke):sm(we)}Ee=Ee.sibling}e:for(Ee=null,we=n;;){if(we.tag===5){if(Ee===null){Ee=we;try{f=we.stateNode,he?(_=f.style,typeof _.setProperty=="function"?_.setProperty("display","none","important"):_.display="none"):(z=we.stateNode,G=we.memoizedProps.style,b=G!=null&&G.hasOwnProperty("display")?G.display:null,z.style.display=Qe("display",b))}catch(je){Zt(n,n.return,je)}}}else if(we.tag===6){if(Ee===null)try{we.stateNode.nodeValue=he?"":we.memoizedProps}catch(je){Zt(n,n.return,je)}}else if((we.tag!==22&&we.tag!==23||we.memoizedState===null||we===n)&&we.child!==null){we.child.return=we,we=we.child;continue}if(we===n)break e;for(;we.sibling===null;){if(we.return===null||we.return===n)break e;Ee===we&&(Ee=null),we=we.return}Ee===we&&(Ee=null),we.sibling.return=we.return,we=we.sibling}}break;case 19:fi(i,n),bi(n),c&4&&tm(n);break;case 21:break;default:fi(i,n),bi(n)}}function bi(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(Qp(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var f=c.stateNode;c.flags&32&&(gt(f,""),c.flags&=-33);var _=Jp(n);Du(n,_,f);break;case 3:case 4:var b=c.stateNode.containerInfo,z=Jp(n);Nu(n,z,b);break;default:throw Error(t(161))}}catch(G){Zt(n,n.return,G)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function lx(n,i,a){Be=n,im(n)}function im(n,i,a){for(var c=(n.mode&1)!==0;Be!==null;){var f=Be,_=f.child;if(f.tag===22&&c){var b=f.memoizedState!==null||el;if(!b){var z=f.alternate,G=z!==null&&z.memoizedState!==null||En;z=el;var he=En;if(el=b,(En=G)&&!he)for(Be=f;Be!==null;)b=Be,G=b.child,b.tag===22&&b.memoizedState!==null?om(f):G!==null?(G.return=b,Be=G):om(f);for(;_!==null;)Be=_,im(_),_=_.sibling;Be=f,el=z,En=he}rm(n)}else(f.subtreeFlags&8772)!==0&&_!==null?(_.return=f,Be=_):rm(n)}}function rm(n){for(;Be!==null;){var i=Be;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:En||tl(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!En)if(a===null)c.componentDidMount();else{var f=i.elementType===i.type?a.memoizedProps:di(i.type,a.memoizedProps);c.componentDidUpdate(f,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var _=i.updateQueue;_!==null&&sp(i,_,c);break;case 3:var b=i.updateQueue;if(b!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}sp(i,b,a)}break;case 5:var z=i.stateNode;if(a===null&&i.flags&4){a=z;var G=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":G.autoFocus&&a.focus();break;case"img":G.src&&(a.src=G.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var he=i.alternate;if(he!==null){var Ee=he.memoizedState;if(Ee!==null){var we=Ee.dehydrated;we!==null&&_o(we)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}En||i.flags&512&&Pu(i)}catch(Se){Zt(i,i.return,Se)}}if(i===n){Be=null;break}if(a=i.sibling,a!==null){a.return=i.return,Be=a;break}Be=i.return}}function sm(n){for(;Be!==null;){var i=Be;if(i===n){Be=null;break}var a=i.sibling;if(a!==null){a.return=i.return,Be=a;break}Be=i.return}}function om(n){for(;Be!==null;){var i=Be;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{tl(4,i)}catch(G){Zt(i,a,G)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var f=i.return;try{c.componentDidMount()}catch(G){Zt(i,f,G)}}var _=i.return;try{Pu(i)}catch(G){Zt(i,_,G)}break;case 5:var b=i.return;try{Pu(i)}catch(G){Zt(i,b,G)}}}catch(G){Zt(i,i.return,G)}if(i===n){Be=null;break}var z=i.sibling;if(z!==null){z.return=i.return,Be=z;break}Be=i.return}}var cx=Math.ceil,nl=T.ReactCurrentDispatcher,Lu=T.ReactCurrentOwner,ti=T.ReactCurrentBatchConfig,Tt=0,un=null,en=null,mn=0,Yn=0,Ls=cr(0),sn=0,Vo=null,Xr=0,il=0,Iu=0,Go=null,Fn=null,Uu=0,Is=1/0,Vi=null,rl=!1,ku=null,mr=null,sl=!1,gr=null,ol=0,Wo=0,Ou=null,al=-1,ll=0;function Dn(){return(Tt&6)!==0?$():al!==-1?al:al=$()}function vr(n){return(n.mode&1)===0?1:(Tt&2)!==0&&mn!==0?mn&-mn:Xv.transition!==null?(ll===0&&(ll=Pn()),ll):(n=_t,n!==0||(n=window.event,n=n===void 0?16:lf(n.type)),n)}function pi(n,i,a,c){if(50<Wo)throw Wo=0,Ou=null,Error(t(185));Qt(n,a,c),((Tt&2)===0||n!==un)&&(n===un&&((Tt&2)===0&&(il|=a),sn===4&&xr(n,mn)),zn(n,c),a===1&&Tt===0&&(i.mode&1)===0&&(Is=$()+500,ka&&dr()))}function zn(n,i){var a=n.callbackNode;Or(n,i);var c=li(n,n===un?mn:0);if(c===0)a!==null&&Q(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&Q(a),i===1)n.tag===0?jv(lm.bind(null,n)):$f(lm.bind(null,n)),Hv(function(){(Tt&6)===0&&dr()}),a=null;else{switch(Jh(c)){case 1:a=Ne;break;case 4:a=Oe;break;case 16:a=ze;break;case 536870912:a=it;break;default:a=ze}a=gm(a,am.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function am(n,i){if(al=-1,ll=0,(Tt&6)!==0)throw Error(t(327));var a=n.callbackNode;if(Us()&&n.callbackNode!==a)return null;var c=li(n,n===un?mn:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=cl(n,c);else{i=c;var f=Tt;Tt|=2;var _=um();(un!==n||mn!==i)&&(Vi=null,Is=$()+500,Yr(n,i));do try{hx();break}catch(z){cm(n,z)}while(!0);tu(),nl.current=_,Tt=f,en!==null?i=0:(un=null,mn=0,i=sn)}if(i!==0){if(i===2&&(f=Ut(n),f!==0&&(c=f,i=Fu(n,f))),i===1)throw a=Vo,Yr(n,0),xr(n,c),zn(n,$()),a;if(i===6)xr(n,c);else{if(f=n.current.alternate,(c&30)===0&&!ux(f)&&(i=cl(n,c),i===2&&(_=Ut(n),_!==0&&(c=_,i=Fu(n,_))),i===1))throw a=Vo,Yr(n,0),xr(n,c),zn(n,$()),a;switch(n.finishedWork=f,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:qr(n,Fn,Vi);break;case 3:if(xr(n,c),(c&130023424)===c&&(i=Uu+500-$(),10<i)){if(li(n,0)!==0)break;if(f=n.suspendedLanes,(f&c)!==c){Dn(),n.pingedLanes|=n.suspendedLanes&f;break}n.timeoutHandle=Wc(qr.bind(null,n,Fn,Vi),i);break}qr(n,Fn,Vi);break;case 4:if(xr(n,c),(c&4194240)===c)break;for(i=n.eventTimes,f=-1;0<c;){var b=31-At(c);_=1<<b,b=i[b],b>f&&(f=b),c&=~_}if(c=f,c=$()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*cx(c/1960))-c,10<c){n.timeoutHandle=Wc(qr.bind(null,n,Fn,Vi),c);break}qr(n,Fn,Vi);break;case 5:qr(n,Fn,Vi);break;default:throw Error(t(329))}}}return zn(n,$()),n.callbackNode===a?am.bind(null,n):null}function Fu(n,i){var a=Go;return n.current.memoizedState.isDehydrated&&(Yr(n,i).flags|=256),n=cl(n,i),n!==2&&(i=Fn,Fn=a,i!==null&&zu(i)),n}function zu(n){Fn===null?Fn=n:Fn.push.apply(Fn,n)}function ux(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var f=a[c],_=f.getSnapshot;f=f.value;try{if(!ci(_(),f))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function xr(n,i){for(i&=~Iu,i&=~il,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-At(i),c=1<<a;n[a]=-1,i&=~c}}function lm(n){if((Tt&6)!==0)throw Error(t(327));Us();var i=li(n,0);if((i&1)===0)return zn(n,$()),null;var a=cl(n,i);if(n.tag!==0&&a===2){var c=Ut(n);c!==0&&(i=c,a=Fu(n,c))}if(a===1)throw a=Vo,Yr(n,0),xr(n,i),zn(n,$()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,qr(n,Fn,Vi),zn(n,$()),null}function Bu(n,i){var a=Tt;Tt|=1;try{return n(i)}finally{Tt=a,Tt===0&&(Is=$()+500,ka&&dr())}}function $r(n){gr!==null&&gr.tag===0&&(Tt&6)===0&&Us();var i=Tt;Tt|=1;var a=ti.transition,c=_t;try{if(ti.transition=null,_t=1,n)return n()}finally{_t=c,ti.transition=a,Tt=i,(Tt&6)===0&&dr()}}function Hu(){Yn=Ls.current,Vt(Ls)}function Yr(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,Bv(a)),en!==null)for(a=en.return;a!==null;){var c=a;switch(Zc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Ia();break;case 3:Ps(),Vt(Un),Vt(yn),cu();break;case 5:au(c);break;case 4:Ps();break;case 13:Vt($t);break;case 19:Vt($t);break;case 10:nu(c.type._context);break;case 22:case 23:Hu()}a=a.return}if(un=n,en=n=_r(n.current,null),mn=Yn=i,sn=0,Vo=null,Iu=il=Xr=0,Fn=Go=null,Gr!==null){for(i=0;i<Gr.length;i++)if(a=Gr[i],c=a.interleaved,c!==null){a.interleaved=null;var f=c.next,_=a.pending;if(_!==null){var b=_.next;_.next=f,c.next=b}a.pending=c}Gr=null}return n}function cm(n,i){do{var a=en;try{if(tu(),Xa.current=Za,$a){for(var c=Yt.memoizedState;c!==null;){var f=c.queue;f!==null&&(f.pending=null),c=c.next}$a=!1}if(jr=0,cn=rn=Yt=null,ko=!1,Oo=0,Lu.current=null,a===null||a.return===null){sn=1,Vo=i,en=null;break}e:{var _=n,b=a.return,z=a,G=i;if(i=mn,z.flags|=32768,G!==null&&typeof G=="object"&&typeof G.then=="function"){var he=G,Ee=z,we=Ee.tag;if((Ee.mode&1)===0&&(we===0||we===11||we===15)){var Se=Ee.alternate;Se?(Ee.updateQueue=Se.updateQueue,Ee.memoizedState=Se.memoizedState,Ee.lanes=Se.lanes):(Ee.updateQueue=null,Ee.memoizedState=null)}var ke=Ip(b);if(ke!==null){ke.flags&=-257,Up(ke,b,z,_,i),ke.mode&1&&Lp(_,he,i),i=ke,G=he;var Ge=i.updateQueue;if(Ge===null){var je=new Set;je.add(G),i.updateQueue=je}else Ge.add(G);break e}else{if((i&1)===0){Lp(_,he,i),Vu();break e}G=Error(t(426))}}else if(Xt&&z.mode&1){var Jt=Ip(b);if(Jt!==null){(Jt.flags&65536)===0&&(Jt.flags|=256),Up(Jt,b,z,_,i),Jc(Ns(G,z));break e}}_=G=Ns(G,z),sn!==4&&(sn=2),Go===null?Go=[_]:Go.push(_),_=b;do{switch(_.tag){case 3:_.flags|=65536,i&=-i,_.lanes|=i;var re=Np(_,G,i);rp(_,re);break e;case 1:z=G;var Y=_.type,ue=_.stateNode;if((_.flags&128)===0&&(typeof Y.getDerivedStateFromError=="function"||ue!==null&&typeof ue.componentDidCatch=="function"&&(mr===null||!mr.has(ue)))){_.flags|=65536,i&=-i,_.lanes|=i;var Ae=Dp(_,z,i);rp(_,Ae);break e}}_=_.return}while(_!==null)}hm(a)}catch($e){i=$e,en===a&&a!==null&&(en=a=a.return);continue}break}while(!0)}function um(){var n=nl.current;return nl.current=Za,n===null?Za:n}function Vu(){(sn===0||sn===3||sn===2)&&(sn=4),un===null||(Xr&268435455)===0&&(il&268435455)===0||xr(un,mn)}function cl(n,i){var a=Tt;Tt|=2;var c=um();(un!==n||mn!==i)&&(Vi=null,Yr(n,i));do try{dx();break}catch(f){cm(n,f)}while(!0);if(tu(),Tt=a,nl.current=c,en!==null)throw Error(t(261));return un=null,mn=0,sn}function dx(){for(;en!==null;)dm(en)}function hx(){for(;en!==null&&!fe();)dm(en)}function dm(n){var i=mm(n.alternate,n,Yn);n.memoizedProps=n.pendingProps,i===null?hm(n):en=i,Lu.current=null}function hm(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=rx(a,i,Yn),a!==null){en=a;return}}else{if(a=sx(a,i),a!==null){a.flags&=32767,en=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{sn=6,en=null;return}}if(i=i.sibling,i!==null){en=i;return}en=i=n}while(i!==null);sn===0&&(sn=5)}function qr(n,i,a){var c=_t,f=ti.transition;try{ti.transition=null,_t=1,fx(n,i,a,c)}finally{ti.transition=f,_t=c}return null}function fx(n,i,a,c){do Us();while(gr!==null);if((Tt&6)!==0)throw Error(t(327));a=n.finishedWork;var f=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var _=a.lanes|a.childLanes;if(_n(n,_),n===un&&(en=un=null,mn=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||sl||(sl=!0,gm(ze,function(){return Us(),null})),_=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||_){_=ti.transition,ti.transition=null;var b=_t;_t=1;var z=Tt;Tt|=4,Lu.current=null,ax(n,a),nm(a,n),Lv(Vc),ya=!!Hc,Vc=Hc=null,n.current=a,lx(a),pe(),Tt=z,_t=b,ti.transition=_}else n.current=a;if(sl&&(sl=!1,gr=n,ol=f),_=n.pendingLanes,_===0&&(mr=null),bt(a.stateNode),zn(n,$()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)f=i[a],c(f.value,{componentStack:f.stack,digest:f.digest});if(rl)throw rl=!1,n=ku,ku=null,n;return(ol&1)!==0&&n.tag!==0&&Us(),_=n.pendingLanes,(_&1)!==0?n===Ou?Wo++:(Wo=0,Ou=n):Wo=0,dr(),null}function Us(){if(gr!==null){var n=Jh(ol),i=ti.transition,a=_t;try{if(ti.transition=null,_t=16>n?16:n,gr===null)var c=!1;else{if(n=gr,gr=null,ol=0,(Tt&6)!==0)throw Error(t(331));var f=Tt;for(Tt|=4,Be=n.current;Be!==null;){var _=Be,b=_.child;if((Be.flags&16)!==0){var z=_.deletions;if(z!==null){for(var G=0;G<z.length;G++){var he=z[G];for(Be=he;Be!==null;){var Ee=Be;switch(Ee.tag){case 0:case 11:case 15:Ho(8,Ee,_)}var we=Ee.child;if(we!==null)we.return=Ee,Be=we;else for(;Be!==null;){Ee=Be;var Se=Ee.sibling,ke=Ee.return;if(Kp(Ee),Ee===he){Be=null;break}if(Se!==null){Se.return=ke,Be=Se;break}Be=ke}}}var Ge=_.alternate;if(Ge!==null){var je=Ge.child;if(je!==null){Ge.child=null;do{var Jt=je.sibling;je.sibling=null,je=Jt}while(je!==null)}}Be=_}}if((_.subtreeFlags&2064)!==0&&b!==null)b.return=_,Be=b;else e:for(;Be!==null;){if(_=Be,(_.flags&2048)!==0)switch(_.tag){case 0:case 11:case 15:Ho(9,_,_.return)}var re=_.sibling;if(re!==null){re.return=_.return,Be=re;break e}Be=_.return}}var Y=n.current;for(Be=Y;Be!==null;){b=Be;var ue=b.child;if((b.subtreeFlags&2064)!==0&&ue!==null)ue.return=b,Be=ue;else e:for(b=Y;Be!==null;){if(z=Be,(z.flags&2048)!==0)try{switch(z.tag){case 0:case 11:case 15:tl(9,z)}}catch($e){Zt(z,z.return,$e)}if(z===b){Be=null;break e}var Ae=z.sibling;if(Ae!==null){Ae.return=z.return,Be=Ae;break e}Be=z.return}}if(Tt=f,dr(),ct&&typeof ct.onPostCommitFiberRoot=="function")try{ct.onPostCommitFiberRoot(qe,n)}catch{}c=!0}return c}finally{_t=a,ti.transition=i}}return!1}function fm(n,i,a){i=Ns(a,i),i=Np(n,i,1),n=fr(n,i,1),i=Dn(),n!==null&&(Qt(n,1,i),zn(n,i))}function Zt(n,i,a){if(n.tag===3)fm(n,n,a);else for(;i!==null;){if(i.tag===3){fm(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(mr===null||!mr.has(c))){n=Ns(a,n),n=Dp(i,n,1),i=fr(i,n,1),n=Dn(),i!==null&&(Qt(i,1,n),zn(i,n));break}}i=i.return}}function px(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=Dn(),n.pingedLanes|=n.suspendedLanes&a,un===n&&(mn&a)===a&&(sn===4||sn===3&&(mn&130023424)===mn&&500>$()-Uu?Yr(n,0):Iu|=a),zn(n,i)}function pm(n,i){i===0&&((n.mode&1)===0?i=1:(i=Mt,Mt<<=1,(Mt&130023424)===0&&(Mt=4194304)));var a=Dn();n=zi(n,i),n!==null&&(Qt(n,i,a),zn(n,a))}function mx(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),pm(n,a)}function gx(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,f=n.memoizedState;f!==null&&(a=f.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),pm(n,a)}var mm;mm=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||Un.current)On=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return On=!1,ix(n,i,a);On=(n.flags&131072)!==0}else On=!1,Xt&&(i.flags&1048576)!==0&&Yf(i,Fa,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Ja(n,i),n=i.pendingProps;var f=Es(i,yn.current);Rs(i,a),f=hu(null,i,c,n,f,a);var _=fu();return i.flags|=1,typeof f=="object"&&f!==null&&typeof f.render=="function"&&f.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,kn(c)?(_=!0,Ua(i)):_=!1,i.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,su(i),f.updater=Ka,i.stateNode=f,f._reactInternals=i,_u(i,c,n,a),i=Eu(null,i,c,!0,_,a)):(i.tag=0,Xt&&_&&qc(i),Nn(null,i,f,a),i=i.child),i;case 16:c=i.elementType;e:{switch(Ja(n,i),n=i.pendingProps,f=c._init,c=f(c._payload),i.type=c,f=i.tag=xx(c),n=di(c,n),f){case 0:i=Mu(null,i,c,n,a);break e;case 1:i=Hp(null,i,c,n,a);break e;case 11:i=kp(null,i,c,n,a);break e;case 14:i=Op(null,i,c,di(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:di(c,f),Mu(n,i,c,f,a);case 1:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:di(c,f),Hp(n,i,c,f,a);case 3:e:{if(Vp(i),n===null)throw Error(t(387));c=i.pendingProps,_=i.memoizedState,f=_.element,ip(n,i),Wa(i,c,null,a);var b=i.memoizedState;if(c=b.element,_.isDehydrated)if(_={element:c,isDehydrated:!1,cache:b.cache,pendingSuspenseBoundaries:b.pendingSuspenseBoundaries,transitions:b.transitions},i.updateQueue.baseState=_,i.memoizedState=_,i.flags&256){f=Ns(Error(t(423)),i),i=Gp(n,i,c,a,f);break e}else if(c!==f){f=Ns(Error(t(424)),i),i=Gp(n,i,c,a,f);break e}else for($n=lr(i.stateNode.containerInfo.firstChild),Xn=i,Xt=!0,ui=null,a=tp(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(bs(),c===f){i=Hi(n,i,a);break e}Nn(n,i,c,a)}i=i.child}return i;case 5:return op(i),n===null&&Qc(i),c=i.type,f=i.pendingProps,_=n!==null?n.memoizedProps:null,b=f.children,Gc(c,f)?b=null:_!==null&&Gc(c,_)&&(i.flags|=32),Bp(n,i),Nn(n,i,b,a),i.child;case 6:return n===null&&Qc(i),null;case 13:return Wp(n,i,a);case 4:return ou(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=As(i,null,c,a):Nn(n,i,c,a),i.child;case 11:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:di(c,f),kp(n,i,c,f,a);case 7:return Nn(n,i,i.pendingProps,a),i.child;case 8:return Nn(n,i,i.pendingProps.children,a),i.child;case 12:return Nn(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,f=i.pendingProps,_=i.memoizedProps,b=f.value,zt(Ha,c._currentValue),c._currentValue=b,_!==null)if(ci(_.value,b)){if(_.children===f.children&&!Un.current){i=Hi(n,i,a);break e}}else for(_=i.child,_!==null&&(_.return=i);_!==null;){var z=_.dependencies;if(z!==null){b=_.child;for(var G=z.firstContext;G!==null;){if(G.context===c){if(_.tag===1){G=Bi(-1,a&-a),G.tag=2;var he=_.updateQueue;if(he!==null){he=he.shared;var Ee=he.pending;Ee===null?G.next=G:(G.next=Ee.next,Ee.next=G),he.pending=G}}_.lanes|=a,G=_.alternate,G!==null&&(G.lanes|=a),iu(_.return,a,i),z.lanes|=a;break}G=G.next}}else if(_.tag===10)b=_.type===i.type?null:_.child;else if(_.tag===18){if(b=_.return,b===null)throw Error(t(341));b.lanes|=a,z=b.alternate,z!==null&&(z.lanes|=a),iu(b,a,i),b=_.sibling}else b=_.child;if(b!==null)b.return=_;else for(b=_;b!==null;){if(b===i){b=null;break}if(_=b.sibling,_!==null){_.return=b.return,b=_;break}b=b.return}_=b}Nn(n,i,f.children,a),i=i.child}return i;case 9:return f=i.type,c=i.pendingProps.children,Rs(i,a),f=Jn(f),c=c(f),i.flags|=1,Nn(n,i,c,a),i.child;case 14:return c=i.type,f=di(c,i.pendingProps),f=di(c.type,f),Op(n,i,c,f,a);case 15:return Fp(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:di(c,f),Ja(n,i),i.tag=1,kn(c)?(n=!0,Ua(i)):n=!1,Rs(i,a),Rp(i,c,f),_u(i,c,f,a),Eu(null,i,c,!0,n,a);case 19:return Xp(n,i,a);case 22:return zp(n,i,a)}throw Error(t(156,i.tag))};function gm(n,i){return D(n,i)}function vx(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ni(n,i,a,c){return new vx(n,i,a,c)}function Gu(n){return n=n.prototype,!(!n||!n.isReactComponent)}function xx(n){if(typeof n=="function")return Gu(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ne)return 11;if(n===J)return 14}return 2}function _r(n,i){var a=n.alternate;return a===null?(a=ni(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function ul(n,i,a,c,f,_){var b=2;if(c=n,typeof n=="function")Gu(n)&&(b=1);else if(typeof n=="string")b=5;else e:switch(n){case I:return Zr(a.children,f,_,i);case O:b=8,f|=8;break;case R:return n=ni(12,a,i,f|2),n.elementType=R,n.lanes=_,n;case q:return n=ni(13,a,i,f),n.elementType=q,n.lanes=_,n;case V:return n=ni(19,a,i,f),n.elementType=V,n.lanes=_,n;case ae:return dl(a,f,_,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case P:b=10;break e;case F:b=9;break e;case ne:b=11;break e;case J:b=14;break e;case ee:b=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=ni(b,a,i,f),i.elementType=n,i.type=c,i.lanes=_,i}function Zr(n,i,a,c){return n=ni(7,n,c,i),n.lanes=a,n}function dl(n,i,a,c){return n=ni(22,n,c,i),n.elementType=ae,n.lanes=a,n.stateNode={isHidden:!1},n}function Wu(n,i,a){return n=ni(6,n,null,i),n.lanes=a,n}function ju(n,i,a){return i=ni(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function _x(n,i,a,c,f){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=xn(0),this.expirationTimes=xn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xn(0),this.identifierPrefix=c,this.onRecoverableError=f,this.mutableSourceEagerHydrationData=null}function Xu(n,i,a,c,f,_,b,z,G){return n=new _x(n,i,a,z,G),i===1?(i=1,_===!0&&(i|=8)):i=0,_=ni(3,null,null,i),n.current=_,_.stateNode=n,_.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},su(_),n}function yx(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:L,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function vm(n){if(!n)return ur;n=n._reactInternals;e:{if(Mi(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(kn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(kn(a))return jf(n,a,i)}return i}function xm(n,i,a,c,f,_,b,z,G){return n=Xu(a,c,!0,n,f,_,b,z,G),n.context=vm(null),a=n.current,c=Dn(),f=vr(a),_=Bi(c,f),_.callback=i??null,fr(a,_,f),n.current.lanes=f,Qt(n,f,c),zn(n,c),n}function hl(n,i,a,c){var f=i.current,_=Dn(),b=vr(f);return a=vm(a),i.context===null?i.context=a:i.pendingContext=a,i=Bi(_,b),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=fr(f,i,b),n!==null&&(pi(n,f,b,_),Ga(n,f,b)),b}function fl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function _m(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function $u(n,i){_m(n,i),(n=n.alternate)&&_m(n,i)}function Sx(){return null}var ym=typeof reportError=="function"?reportError:function(n){console.error(n)};function Yu(n){this._internalRoot=n}pl.prototype.render=Yu.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));hl(n,i,null,null)},pl.prototype.unmount=Yu.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;$r(function(){hl(null,n,null,null)}),i[Ui]=null}};function pl(n){this._internalRoot=n}pl.prototype.unstable_scheduleHydration=function(n){if(n){var i=nf();n={blockedOn:null,target:n,priority:i};for(var a=0;a<sr.length&&i!==0&&i<sr[a].priority;a++);sr.splice(a,0,n),a===0&&of(n)}};function qu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function ml(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Sm(){}function Mx(n,i,a,c,f){if(f){if(typeof c=="function"){var _=c;c=function(){var he=fl(b);_.call(he)}}var b=xm(i,c,n,0,null,!1,!1,"",Sm);return n._reactRootContainer=b,n[Ui]=b.current,Co(n.nodeType===8?n.parentNode:n),$r(),b}for(;f=n.lastChild;)n.removeChild(f);if(typeof c=="function"){var z=c;c=function(){var he=fl(G);z.call(he)}}var G=Xu(n,0,!1,null,null,!1,!1,"",Sm);return n._reactRootContainer=G,n[Ui]=G.current,Co(n.nodeType===8?n.parentNode:n),$r(function(){hl(i,G,a,c)}),G}function gl(n,i,a,c,f){var _=a._reactRootContainer;if(_){var b=_;if(typeof f=="function"){var z=f;f=function(){var G=fl(b);z.call(G)}}hl(i,b,n,f)}else b=Mx(a,i,n,f,c);return fl(b)}ef=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=fn(i.pendingLanes);a!==0&&(Fr(i,a|1),zn(i,$()),(Tt&6)===0&&(Is=$()+500,dr()))}break;case 13:$r(function(){var c=zi(n,1);if(c!==null){var f=Dn();pi(c,n,1,f)}}),$u(n,1)}},yc=function(n){if(n.tag===13){var i=zi(n,134217728);if(i!==null){var a=Dn();pi(i,n,134217728,a)}$u(n,134217728)}},tf=function(n){if(n.tag===13){var i=vr(n),a=zi(n,i);if(a!==null){var c=Dn();pi(a,n,i,c)}$u(n,i)}},nf=function(){return _t},rf=function(n,i){var a=_t;try{return _t=n,i()}finally{_t=a}},Pe=function(n,i,a){switch(i){case"input":if(ht(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var f=La(c);if(!f)throw Error(t(90));Ze(c),ht(c,f)}}}break;case"textarea":_e(n,a);break;case"select":i=a.value,i!=null&&k(n,!!a.multiple,i,!1)}},Bt=Bu,nn=$r;var Ex={usingClientEntryPoint:!1,Events:[No,Ss,La,Le,lt,Bu]},jo={findFiberByHostInstance:zr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},wx={bundleType:jo.bundleType,version:jo.version,rendererPackageName:jo.rendererPackageName,rendererConfig:jo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:T.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=ga(n),n===null?null:n.stateNode},findFiberByHostInstance:jo.findFiberByHostInstance||Sx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var vl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vl.isDisabled&&vl.supportsFiber)try{qe=vl.inject(wx),ct=vl}catch{}}return Bn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ex,Bn.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!qu(i))throw Error(t(200));return yx(n,i,null,a)},Bn.createRoot=function(n,i){if(!qu(n))throw Error(t(299));var a=!1,c="",f=ym;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(f=i.onRecoverableError)),i=Xu(n,1,!1,null,null,a,!1,c,f),n[Ui]=i.current,Co(n.nodeType===8?n.parentNode:n),new Yu(i)},Bn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=ga(i),n=n===null?null:n.stateNode,n},Bn.flushSync=function(n){return $r(n)},Bn.hydrate=function(n,i,a){if(!ml(i))throw Error(t(200));return gl(null,n,i,!0,a)},Bn.hydrateRoot=function(n,i,a){if(!qu(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,f=!1,_="",b=ym;if(a!=null&&(a.unstable_strictMode===!0&&(f=!0),a.identifierPrefix!==void 0&&(_=a.identifierPrefix),a.onRecoverableError!==void 0&&(b=a.onRecoverableError)),i=xm(i,null,n,1,a??null,f,!1,_,b),n[Ui]=i.current,Co(n),c)for(n=0;n<c.length;n++)a=c[n],f=a._getVersion,f=f(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,f]:i.mutableSourceEagerHydrationData.push(a,f);return new pl(i)},Bn.render=function(n,i,a){if(!ml(i))throw Error(t(200));return gl(null,n,i,!1,a)},Bn.unmountComponentAtNode=function(n){if(!ml(n))throw Error(t(40));return n._reactRootContainer?($r(function(){gl(null,null,n,!1,function(){n._reactRootContainer=null,n[Ui]=null})}),!0):!1},Bn.unstable_batchedUpdates=Bu,Bn.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!ml(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return gl(n,i,a,!1,c)},Bn.version="18.3.1-next-f1338f8080-20240426",Bn}var Rm;function Ix(){if(Rm)return Ju.exports;Rm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Ju.exports=Lx(),Ju.exports}var Pm;function Ux(){if(Pm)return xl;Pm=1;var s=Ix();return xl.createRoot=s.createRoot,xl.hydrateRoot=s.hydrateRoot,xl}var kx=Ux();const Ox=Z0(kx);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fx=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),K0=(...s)=>s.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var zx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bx=Nt.forwardRef(({color:s="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:r,className:o="",children:l,iconNode:u,...d},h)=>Nt.createElement("svg",{ref:h,...zx,width:e,height:e,stroke:s,strokeWidth:r?Number(t)*24/Number(e):t,className:K0("lucide",o),...d},[...u.map(([p,m])=>Nt.createElement(p,m)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=(s,e)=>{const t=Nt.forwardRef(({className:r,...o},l)=>Nt.createElement(Bx,{ref:l,iconNode:e,className:K0(`lucide-${Fx(s)}`,r),...o}));return t.displayName=`${s}`,t};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hx=yt("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vx=yt("ArrowDownRight",[["path",{d:"m7 7 10 10",key:"1fmybs"}],["path",{d:"M17 7v10H7",key:"6fjiku"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gx=yt("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wx=yt("Box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q0=yt("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jx=yt("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J0=yt("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eg=yt("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tg=yt("Columns2",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M12 3v18",key:"108xh3"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xx=yt("Compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $x=yt("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yx=yt("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ng=yt("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ig=yt("Layers",[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qx=yt("Maximize2",[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zx=yt("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kx=yt("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qx=yt("Radio",[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9",key:"1vaf9d"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5",key:"u1ii0m"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5",key:"1j5fej"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19",key:"10b0cb"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jx=yt("Redo2",[["path",{d:"m15 14 5-5-5-5",key:"12vg1m"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",key:"6uklza"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e_=yt("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t_=yt("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n_=yt("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i_=yt("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rg=yt("Route",[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r_=yt("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s_=yt("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o_=yt("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a_=yt("SlidersVertical",[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l_=yt("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c_=yt("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cc=yt("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u_=yt("Undo2",[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nm=yt("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d_=yt("Volume2",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h_=yt("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f_=yt("ZoomIn",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p_=yt("ZoomOut",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]),uc=[{id:"cramped-faulty-baseline",name:"Cramped Faulty Baseline",tagline:"Intentional acoustic, hygiene-galley, and blocked egress hazards for validation & optimization.",badge:"HAZARDS DETECTED",mission:{name:"Cramped Faulty Baseline",crewSize:4,durationDays:180,gravity:"0g",hull:{type:"rigid_cylinder",diameter:6,length:14,decks:1,wallThickness:.25}},zones:[{id:"cq-1",type:"crew_quarters",label:"Crew Quarters A (2 Bunks)",deck:0,x:1,y:.5,width:2.25,height:1.75,zHeight:2.2,rotation:0},{id:"cq-2",type:"crew_quarters",label:"Crew Quarters B (2 Bunks)",deck:0,x:1,y:3.75,width:2.25,height:1.75,zHeight:2.2,rotation:0},{id:"ex-1",type:"exercise",label:"Exercise & ARED",deck:0,x:3.5,y:.5,width:2.25,height:1.75,zHeight:2.2,rotation:0},{id:"eclss-1",type:"eclss",label:"ECLSS & Avionics",deck:0,x:3.5,y:3.75,width:1.75,height:1.75,zHeight:2.2,rotation:0},{id:"galley-1",type:"galley",label:"Galley & Wardroom",deck:0,x:6.25,y:.5,width:2.5,height:1.75,zHeight:2.2,rotation:0},{id:"hyg-1",type:"hygiene",label:"Hygiene & Waste (UWMS)",deck:0,x:8.75,y:.5,width:1.5,height:1.75,zHeight:2.2,rotation:0},{id:"med-1",type:"medical",label:"Medical & Science Lab",deck:0,x:6.25,y:3.75,width:2.25,height:1.75,zHeight:2.2,rotation:0},{id:"stow-1",type:"stowage",label:"Stowage & Logistics",deck:0,x:10.25,y:2,width:1.5,height:2.25,zHeight:2.2,rotation:0},{id:"shelter-1",type:"storm_shelter",label:"Radiation Storm Shelter",deck:0,x:8.75,y:3.75,width:1.5,height:1.75,zHeight:2.2,rotation:0},{id:"airlock-1",type:"airlock",label:"Airlock / Egress Hatch",deck:0,x:11.75,y:2.25,width:1.5,height:1.5,zHeight:2.2,rotation:0}]},{id:"lunar-gateway-transit",name:"Lunar Gateway Transit Hab",tagline:"Compact rigid cylinder optimized for 60-day cislunar missions with 4 crew.",badge:"CISLUNAR 0G",mission:{name:"Lunar Gateway Transit Hab",crewSize:4,durationDays:60,gravity:"0g",hull:{type:"rigid_cylinder",diameter:5.5,length:13,decks:1,wallThickness:.25}},zones:[{id:"lg-cq-1",type:"crew_quarters",label:"Crew Quarters Port",deck:0,x:.75,y:.5,width:2.25,height:1.5,zHeight:2.2,rotation:0},{id:"lg-cq-2",type:"crew_quarters",label:"Crew Quarters Stbd",deck:0,x:.75,y:3.5,width:2.25,height:1.5,zHeight:2.2,rotation:0},{id:"lg-shelter",type:"storm_shelter",label:"Water-Wall Storm Shelter",deck:0,x:3.5,y:.5,width:2.25,height:1.5,zHeight:2.2,rotation:0},{id:"lg-med",type:"medical",label:"Medical & Research",deck:0,x:3.5,y:3.5,width:2.25,height:1.5,zHeight:2.2,rotation:0},{id:"lg-galley",type:"galley",label:"Galley & Wardroom",deck:0,x:6.25,y:3.5,width:2.5,height:1.5,zHeight:2.2,rotation:0},{id:"lg-stow",type:"stowage",label:"Logistics & CTBs",deck:0,x:6.25,y:.5,width:1.75,height:1.5,zHeight:2.2,rotation:0},{id:"lg-eclss",type:"eclss",label:"ECLSS Rack Bay",deck:0,x:8.25,y:.5,width:1.75,height:1.5,zHeight:2.2,rotation:0},{id:"lg-ex",type:"exercise",label:"Exercise & ARED",deck:0,x:9,y:3.5,width:2,height:1.5,zHeight:2.2,rotation:0},{id:"lg-hyg",type:"hygiene",label:"Hygiene & UWMS",deck:0,x:10.25,y:.5,width:1.5,height:1.5,zHeight:2.2,rotation:0},{id:"lg-airlock",type:"airlock",label:"Radial Airlock Hatch",deck:0,x:11.25,y:2,width:1.25,height:1.5,zHeight:2.2,rotation:0}]},{id:"mars-transit-inflatable",name:"Mars Transit Inflatable",tagline:"Multi-deck TransHab-class inflatable for 6 crew on a 540-day Mars transit.",badge:"DEEP SPACE 2-DECK",mission:{name:"Mars Transit Inflatable",crewSize:6,durationDays:540,gravity:"3/8g",hull:{type:"inflatable",diameter:8,length:14,decks:2,wallThickness:.35}},zones:[{id:"mt-cq-1",type:"crew_quarters",label:"Crew Quarters 1-2",deck:0,x:1,y:.75,width:2.5,height:2,zHeight:2.4,rotation:0},{id:"mt-cq-2",type:"crew_quarters",label:"Crew Quarters 3-4",deck:0,x:1,y:5.25,width:2.5,height:2,zHeight:2.4,rotation:0},{id:"mt-cq-3",type:"crew_quarters",label:"Crew Quarters 5-6",deck:0,x:4,y:.75,width:2.5,height:2,zHeight:2.4,rotation:0},{id:"mt-shelter",type:"storm_shelter",label:"Central Water-Wall Shelter",deck:0,x:4.5,y:5,width:3,height:2.25,zHeight:2.4,rotation:0},{id:"mt-med",type:"medical",label:"Medical Bay & BioLab",deck:0,x:7.5,y:.75,width:2.75,height:2,zHeight:2.4,rotation:0},{id:"mt-stow-0",type:"stowage",label:"Deck 1 Logistics",deck:0,x:8.25,y:5.25,width:2.5,height:1.75,zHeight:2.4,rotation:0},{id:"mt-airlock-0",type:"airlock",label:"Primary EVA Airlock",deck:0,x:11.25,y:3,width:1.75,height:2,zHeight:2.4,rotation:0},{id:"mt-galley",type:"galley",label:"Galley & Wardroom",deck:1,x:1.25,y:.75,width:3.5,height:2.25,zHeight:2.4,rotation:0},{id:"mt-ex",type:"exercise",label:"Exercise & Countermeasures",deck:1,x:5.75,y:.75,width:3,height:2.25,zHeight:2.4,rotation:0},{id:"mt-hyg-1",type:"hygiene",label:"Hygiene & UWMS A",deck:1,x:9.25,y:5.25,width:1.75,height:1.75,zHeight:2.4,rotation:0},{id:"mt-hyg-2",type:"hygiene",label:"Hygiene & UWMS B",deck:1,x:7,y:5.25,width:1.75,height:1.75,zHeight:2.4,rotation:0},{id:"mt-eclss",type:"eclss",label:"Primary ECLSS & Power",deck:1,x:1.25,y:5.25,width:2.75,height:1.75,zHeight:2.4,rotation:0},{id:"mt-stow-1",type:"stowage",label:"Food & Consumables",deck:1,x:4.5,y:5.25,width:2,height:1.75,zHeight:2.4,rotation:0},{id:"mt-airlock-1",type:"airlock",label:"Upper Egress Hatch",deck:1,x:11.25,y:3,width:1.75,height:2,zHeight:2.4,rotation:0}]}],Dm=s=>{let e;const t=new Set,r=(p,m)=>{const v=typeof p=="function"?p(e):p;if(!Object.is(v,e)){const x=e;e=m??(typeof v!="object"||v===null)?v:Object.assign({},e,v),t.forEach(y=>y(e,x))}},o=()=>e,d={setState:r,getState:o,getInitialState:()=>h,subscribe:p=>(t.add(p),()=>t.delete(p))},h=e=s(r,o,d);return d},m_=(s=>s?Dm(s):Dm),g_=s=>s;function v_(s,e=g_){const t=Yl.useSyncExternalStore(s.subscribe,Yl.useCallback(()=>e(s.getState()),[s,e]),()=>e(s.getInitialState()));return Yl.useDebugValue(t),t}const Lm=s=>{const e=m_(s),t=r=>v_(e,r);return Object.assign(t,e),t},x_=(s=>s?Lm(s):Lm),gn={crew_quarters:{type:"crew_quarters",label:"Crew Quarters (Sleep)",shortLabel:"SLEEP",description:"Private acoustic-isolated sleep stations & personal stowage.",defaultWidth:2,defaultHeight:1.5,minWidth:1.25,minHeight:1.25,defaultZHeight:2.2,color:"#3b82f6",accentColor:"#93c5fd",noiseEmitDba:32,isQuietZone:!0,isContaminationSource:!1,isContaminationSensitive:!1,isOccupied:!0,isEquipmentOnly:!1,equipmentFraction:.2,massDensityKgPerM3:95},galley:{type:"galley",label:"Galley & Wardroom",shortLabel:"GALLEY",description:"Food rehydration, meal prep, dining table & crew social hub.",defaultWidth:2.5,defaultHeight:1.75,minWidth:1.5,minHeight:1.5,defaultZHeight:2.2,color:"#f59e0b",accentColor:"#fcd34d",noiseEmitDba:62,isQuietZone:!1,isContaminationSource:!1,isContaminationSensitive:!0,isOccupied:!0,isEquipmentOnly:!1,equipmentFraction:.25,massDensityKgPerM3:130},hygiene:{type:"hygiene",label:"Hygiene & Waste (UWMS)",shortLabel:"HYGIENE",description:"Universal Waste Management System & personal hygiene enclosure.",defaultWidth:1.5,defaultHeight:1.5,minWidth:1.25,minHeight:1.25,defaultZHeight:2.2,color:"#14b8a6",accentColor:"#5eead4",noiseEmitDba:56,isQuietZone:!1,isContaminationSource:!0,isContaminationSensitive:!1,isOccupied:!0,isEquipmentOnly:!1,equipmentFraction:.35,massDensityKgPerM3:165},exercise:{type:"exercise",label:"Exercise & ARED",shortLabel:"EXERCISE",description:"Resistive exercise & treadmill countermeasures (high vibration/noise).",defaultWidth:2.25,defaultHeight:1.75,minWidth:1.75,minHeight:1.5,defaultZHeight:2.2,color:"#f43f5e",accentColor:"#fda4af",noiseEmitDba:72,isQuietZone:!1,isContaminationSource:!1,isContaminationSensitive:!1,isOccupied:!0,isEquipmentOnly:!1,equipmentFraction:.32,massDensityKgPerM3:190},eclss:{type:"eclss",label:"ECLSS & Avionics",shortLabel:"ECLSS",description:"Life support racks, CO2 scrubbing, thermal control & avionics.",defaultWidth:1.75,defaultHeight:1.5,minWidth:1.25,minHeight:1,defaultZHeight:2.2,color:"#8b5cf6",accentColor:"#c4b5fd",noiseEmitDba:64,isQuietZone:!1,isContaminationSource:!1,isContaminationSensitive:!1,isOccupied:!1,isEquipmentOnly:!0,equipmentFraction:.82,massDensityKgPerM3:320},medical:{type:"medical",label:"Medical & Science Lab",shortLabel:"MED/LAB",description:"Crew health care station, glovebox & research payloads.",defaultWidth:2.25,defaultHeight:1.75,minWidth:1.5,minHeight:1.5,defaultZHeight:2.2,color:"#10b981",accentColor:"#6ee7b7",noiseEmitDba:48,isQuietZone:!1,isContaminationSource:!1,isContaminationSensitive:!0,isOccupied:!0,isEquipmentOnly:!1,equipmentFraction:.3,massDensityKgPerM3:175},airlock:{type:"airlock",label:"Airlock / Egress Hatch",shortLabel:"AIRLOCK",description:"EVA suitport & primary emergency egress pressure hatch.",defaultWidth:1.75,defaultHeight:1.75,minWidth:1.5,minHeight:1.5,defaultZHeight:2.2,color:"#06b6d4",accentColor:"#67e8f9",noiseEmitDba:42,isQuietZone:!1,isContaminationSource:!1,isContaminationSensitive:!1,isOccupied:!1,isEquipmentOnly:!1,equipmentFraction:.45,massDensityKgPerM3:240},storm_shelter:{type:"storm_shelter",label:"Radiation Storm Shelter",shortLabel:"SHELTER",description:"Water-wall / HDPE-shielded SPE refuge core for full crew.",defaultWidth:2.25,defaultHeight:2,minWidth:1.5,minHeight:1.5,defaultZHeight:2.2,color:"#0ea5e9",accentColor:"#7dd3fc",noiseEmitDba:36,isQuietZone:!1,isContaminationSource:!1,isContaminationSensitive:!1,isOccupied:!1,isEquipmentOnly:!1,equipmentFraction:.22,massDensityKgPerM3:380},stowage:{type:"stowage",label:"Stowage & Logistics",shortLabel:"STOWAGE",description:"CTB logistics bags, spares, food & consumables storage.",defaultWidth:1.75,defaultHeight:1.25,minWidth:1,minHeight:1,defaultZHeight:2.2,color:"#64748b",accentColor:"#cbd5e1",noiseEmitDba:20,isQuietZone:!1,isContaminationSource:!1,isContaminationSensitive:!1,isOccupied:!1,isEquipmentOnly:!0,equipmentFraction:.88,massDensityKgPerM3:210}},__=Object.values(gn),y_=.25;function St(s,e=y_){return Math.round(s/e)*e}function Si(s){const e=s.type==="surface_dome"?s.diameter:s.length,t=s.diameter,r=s.type==="surface_dome"?Math.max(2.2,Math.min(3,s.diameter*.5/s.decks)):Math.max(2.2,Math.min(2.6,s.diameter*.85/s.decks));return{width:e,depth:t,wall:s.wallThickness,deckHeight:r}}function sg(s){return s.type==="surface_dome"?s.diameter/2:s.type==="inflatable"?Math.min(s.diameter*.24,1.6):Math.min(s.diameter*.16,.9)}function og(s,e,t,r=0){const{width:o,depth:l,wall:u}=Si(t),d=u+r;if(t.type==="surface_dome"){const U=o/2,L=l/2,I=Math.max(.5,o/2-d),O=s-U,R=e-L;return O*O+R*R<=I*I+1e-6}const h=d,p=o-d,m=d,v=l-d;if(s<h-1e-6||s>p+1e-6||e<m-1e-6||e>v+1e-6)return!1;const x=Math.max(0,sg(t)-d);if(x<=0)return!0;const y=h+x,E=p-x,M=m+x,S=v-x;if(s>=y&&s<=E||e>=M&&e<=S)return!0;const g=s<y?y:E,C=e<M?M:S,A=s-g,T=e-C;return A*A+T*T<=x*x+1e-6}function oa(s,e,t,r,o){return[[s+.02,e+.02],[s+t-.02,e+.02],[s+.02,e+r-.02],[s+t-.02,e+r-.02],[s+t/2,e+.02],[s+t/2,e+r-.02],[s+.02,e+r/2],[s+t-.02,e+r/2]].every(([d,h])=>og(d,h,o))}function dc(s,e){if(s.deck!==e.deck)return 0;const t=Math.max(0,Math.min(s.x+s.width,e.x+e.width)-Math.max(s.x,e.x)),r=Math.max(0,Math.min(s.y+s.height,e.y+e.height)-Math.max(s.y,e.y));return t*r}function S_(s,e){const t=Math.max(0,Math.max(s.x-(e.x+e.width),e.x-(s.x+s.width))),r=Math.max(0,Math.max(s.y-(e.y+e.height),e.y-(s.y+s.height)));return Math.hypot(t,r)}function Hd(s,e,t=2.4){const r=S_(s,e),o=Math.abs(s.deck-e.deck)*t;return Math.hypot(r,o)}function M_(s,e){const{hull:t}=s,r=t.diameter/2,o=Math.max(.5,r-t.wallThickness);let l=0,u=0;if(t.type==="surface_dome")l=2/3*Math.PI*Math.pow(r,3)+Math.PI*r*r*.6,u=2/3*Math.PI*Math.pow(o,3)+Math.PI*o*o*.5;else{const g=Math.max(1,t.length-t.diameter*.35);l=Math.PI*r*r*g+4/3*Math.PI*r*r*(t.diameter*.175),u=Math.PI*o*o*Math.max(.5,g-t.wallThickness)+4/3*Math.PI*o*o*Math.max(.2,t.diameter*.175-t.wallThickness)}const d=t.decks>1?(t.decks-1)*(t.type==="surface_dome"?Math.PI*o*o*.8:t.length*t.diameter*.72)*.18:0,h=Math.max(0,l-u+d),p=t.type==="inflatable"?210:t.type==="surface_dome"?320:390,m=h*p;let v=0,x=0;for(const g of e){const C=gn[g.type],A=g.width*g.height*g.zHeight;x+=A*C.equipmentFraction,v+=A*C.massDensityKgPerM3*.38}const y=s.crewSize*s.durationDays*4.2,E=Math.round(m+v+y),M=s.gravity==="0g"?12500:s.gravity==="1/6g"?16e3:21e3,S=Number((E*M/1e6).toFixed(1));return{grossVolumeM3:Number(l.toFixed(1)),structureVolumeM3:Number(h.toFixed(1)),equipmentVolumeM3:Number(x.toFixed(1)),estimatedMassKg:E,estimatedLaunchCostM:S}}const Dt=.25,_l=.85,E_=3;function w_(s,e){const{width:t,depth:r}=Si(s),o=Math.max(4,Math.ceil(t/Dt)),l=Math.max(4,Math.ceil(r/Dt)),u=o*l,d=new Uint8Array(u),h=new Int16Array(u);h.fill(-1);for(let M=0;M<l;M++){const S=(M+.5)*Dt;for(let g=0;g<o;g++){const C=(g+.5)*Dt;og(C,S,s)||(d[M*o+g]=1)}}for(let M=0;M<e.length;M++){const S=e[M],g=Math.max(0,Math.floor(S.x/Dt)),C=Math.min(o-1,Math.floor((S.x+S.width-.001)/Dt)),A=Math.max(0,Math.floor(S.y/Dt)),T=Math.min(l-1,Math.floor((S.y+S.height-.001)/Dt));for(let U=A;U<=T;U++)for(let L=g;L<=C;L++){const I=U*o+L;d[I]=1,h[I]=M}}const p=new Float32Array(u);p.fill(999);const m=new Int32Array(u);let v=0,x=0;for(let M=0;M<u;M++)d[M]===1&&(p[M]=0,m[x++]=M);const y=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1]];for(;v<x;){const M=m[v++],S=Math.floor(M/o),g=M%o,C=p[M];for(let A=0;A<4;A++){const T=S+y[A][0],U=g+y[A][1];if(T<0||T>=l||U<0||U>=o)continue;const L=T*o+U;p[L]>C+1&&(p[L]=C+1,m[x++]=L)}}const E=new Float32Array(u);for(let M=0;M<u;M++)E[M]=p[M]*Dt;return{cols:o,rows:l,blocked:d,clearance:E,zoneMap:h}}function Im(s,e){const{cols:t,rows:r,blocked:o}=s,l=Math.max(0,Math.floor(e.x/Dt)-1),u=Math.min(t-1,Math.ceil((e.x+e.width)/Dt)),d=Math.max(0,Math.floor(e.y/Dt)-1),h=Math.min(r-1,Math.ceil((e.y+e.height)/Dt)),p=[];for(let m=d;m<=h;m++)for(let v=l;v<=u;v++){const x=m*t+v;if(o[x]===1)continue;const y=(v+.5)*Dt,E=(m+.5)*Dt,M=Math.max(0,Math.max(e.x-y,y-(e.x+e.width))),S=Math.max(0,Math.max(e.y-E,E-(e.y+e.height)));M<=Dt*.75&&S<=Dt*.75&&p.push(x)}return p}class T_{constructor(){Zu(this,"nodes",[]);Zu(this,"scores",[])}get size(){return this.nodes.length}push(e,t){this.nodes.push(e),this.scores.push(t),this.bubbleUp(this.nodes.length-1)}pop(){const e=this.nodes[0],t=this.nodes.pop(),r=this.scores.pop();return this.nodes.length>0&&(this.nodes[0]=t,this.scores[0]=r,this.sinkDown(0)),e}bubbleUp(e){for(;e>0;){const t=e-1>>1;if(this.scores[e]>=this.scores[t])break;[this.nodes[e],this.nodes[t]]=[this.nodes[t],this.nodes[e]],[this.scores[e],this.scores[t]]=[this.scores[t],this.scores[e]],e=t}}sinkDown(e){const t=this.nodes.length;for(;;){let r=e;const o=2*e+1,l=2*e+2;if(o<t&&this.scores[o]<this.scores[r]&&(r=o),l<t&&this.scores[l]<this.scores[r]&&(r=l),r===e)break;[this.nodes[e],this.nodes[r]]=[this.nodes[r],this.nodes[e]],[this.scores[e],this.scores[r]]=[this.scores[r],this.scores[e]],e=r}}}const nd=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Math.SQRT2],[1,-1,Math.SQRT2],[-1,1,Math.SQRT2],[-1,-1,Math.SQRT2]];function Um(s,e,t){if(e.length===0||t.length===0)return{found:!1,pathCells:[],distanceM:1/0,minCorridorWidthM:0};const{cols:r,rows:o,blocked:l,clearance:u}=s,d=r*o,h=new Uint8Array(d);let p=0,m=0;for(const T of t)h[T]=1,p+=Math.floor(T/r),m+=T%r;p/=t.length,m/=t.length;const v=new Float32Array(d);v.fill(1/0);const x=new Int32Array(d);x.fill(-1);const y=new Uint8Array(d),E=new T_;for(const T of e){v[T]=0;const U=Math.floor(T/r),L=T%r,I=Math.hypot(U-p,L-m)*Dt;E.push(T,I)}let M=-1;for(;E.size>0;){const T=E.pop();if(y[T])continue;if(y[T]=1,h[T]===1){M=T;break}const U=Math.floor(T/r),L=T%r,I=v[T];for(let O=0;O<8;O++){const R=nd[O][0],P=nd[O][1],F=nd[O][2],ne=U+R,q=L+P;if(ne<0||ne>=o||q<0||q>=r)continue;const V=ne*r+q;if(l[V]===1||y[V]===1||R!==0&&P!==0&&(l[U*r+q]===1||l[ne*r+L]===1))continue;const J=F*Dt,ee=u[V]<=Dt?.35:0,ae=I+J+ee;if(ae<v[V]){x[V]=T,v[V]=ae;const H=Math.hypot(ne-p,q-m)*Dt;E.push(V,ae+H)}}}if(M===-1)return{found:!1,pathCells:[],distanceM:1/0,minCorridorWidthM:0};const S=[];let g=M;for(;g!==-1;)S.push(g),g=x[g];S.reverse();let C=0,A=1/0;for(let T=0;T<S.length;T++){const U=S[T],L=Math.floor(U/r),I=U%r;if(T>0){const O=S[T-1],R=Math.floor(O/r),P=O%r;C+=Math.hypot(L-R,I-P)*Dt}if(T>0&&T<S.length-1){let O=1;for(let F=I-1;F>=0&&l[L*r+F]===0;F--)O++;for(let F=I+1;F<r&&l[L*r+F]===0;F++)O++;let R=1;for(let F=L-1;F>=0&&l[F*r+I]===0;F--)R++;for(let F=L+1;F<o&&l[F*r+I]===0;F++)R++;const P=Math.min(O,R)*Dt;P<A&&(A=P)}}return Number.isFinite(A)||(A=1.25),A<.5?{found:!1,pathCells:[],distanceM:1/0,minCorridorWidthM:A}:{found:!0,pathCells:S,distanceM:Number(C.toFixed(2)),minCorridorWidthM:Number(A.toFixed(2))}}function km(s,e,t,r){if(s.length===0)return[];const o=[{x:Number((t.x+t.width/2).toFixed(2)),y:Number((t.y+t.height/2).toFixed(2))}];for(let l=0;l<s.length;l++){const u=s[l],d=Math.floor(u/e),h=u%e;o.push({x:Number(((h+.5)*Dt).toFixed(2)),y:Number(((d+.5)*Dt).toFixed(2))})}return o.push({x:Number((r.x+r.width/2).toFixed(2)),y:Number((r.y+r.height/2).toFixed(2))}),o}function b_(s,e){const t=e.filter(C=>C.type==="airlock"),r=e.filter(C=>C.type==="storm_shelter"),o=e.filter(C=>gn[C.type].isOccupied),l=new Map;for(let C=0;C<s.decks;C++){const A=e.filter(T=>T.deck===C);l.set(C,w_(s,A))}const u=[],d=[],h=new Map,p=(C,A,T)=>{if(A.length===0)return{fromZoneId:C.id,fromLabel:C.label,targetZoneId:"",targetLabel:T==="airlock"?"No Airlock":"No Storm Shelter",targetType:T,deck:C.deck,reachable:!1,distanceM:1/0,transitTimeSec:1/0,points:[],minClearanceM:0};const U=l.get(C.deck),L=Im(U,C),I=A.filter(R=>R.deck===C.deck);let O=null;for(const R of I){const P=Im(U,R),F=Um(U,L,P);if(F.found){const ne={fromZoneId:C.id,fromLabel:C.label,targetZoneId:R.id,targetLabel:R.label,targetType:T,deck:C.deck,reachable:!0,distanceM:F.distanceM,transitTimeSec:Number((F.distanceM/_l).toFixed(1)),points:km(F.pathCells,U.cols,C,R),minClearanceM:F.minCorridorWidthM};if((!O||ne.distanceM<O.distanceM)&&(O=ne),F.minCorridorWidthM<1&&F.pathCells.length>2){const q=F.pathCells[Math.floor(F.pathCells.length/2)],V=Math.floor(q/U.cols),J=q%U.cols,ee=Number(((J+.5)*Dt).toFixed(2)),ae=Number(((V+.5)*Dt).toFixed(2)),H=`${C.deck}:${Math.round(ee)}:${Math.round(ae)}`;h.has(H)||h.set(H,{x:ee,y:ae,deck:C.deck,clearanceM:F.minCorridorWidthM})}}}if(!O&&I.length===0&&A.length>0){const R=A[0],{width:P,depth:F}=Si(s),ne=Math.floor(P/2/Dt),q=Math.floor(F/2/Dt),V=[];for(let ee=-2;ee<=2;ee++)for(let ae=-2;ae<=2;ae++){const H=q+ee,le=ne+ae;if(H>=0&&H<U.rows&&le>=0&&le<U.cols){const ie=H*U.cols+le;U.blocked[ie]===0&&V.push(ie)}}const J=Um(U,L,V);if(J.found){const ee=Math.abs(C.deck-R.deck),ae=Number((J.distanceM+ee*E_).toFixed(2));O={fromZoneId:C.id,fromLabel:C.label,targetZoneId:R.id,targetLabel:`${R.label} (Deck ${R.deck+1})`,targetType:T,deck:C.deck,reachable:!0,distanceM:ae,transitTimeSec:Number((ae/_l).toFixed(1)),points:km(J.pathCells,U.cols,C,{...R,x:P/2-.5,y:F/2-.5,width:1,height:1}),minClearanceM:J.minCorridorWidthM}}}return O||{fromZoneId:C.id,fromLabel:C.label,targetZoneId:(I[0]??A[0]).id,targetLabel:(I[0]??A[0]).label,targetType:T,deck:C.deck,reachable:!1,distanceM:1/0,transitTimeSec:1/0,points:[],minClearanceM:0}};for(const C of o)u.push(p(C,t,"airlock")),d.push(p(C,r,"storm_shelter"));const m=o.length===0||t.length>0&&u.every(C=>C.reachable),v=o.length===0||r.length>0&&d.every(C=>C.reachable),x=u.filter(C=>C.reachable).map(C=>C.distanceM),y=x.length>0?Math.max(...x):0,E=Number((y/_l).toFixed(1)),M=d.filter(C=>C.reachable).map(C=>C.distanceM),S=M.length>0?Math.max(...M):0,g=Number((S/_l).toFixed(1));return{airlockPaths:u,shelterPaths:d,overallReachable:m,shelterReachable:v,worstCaseDistanceM:y,worstCaseTimeSec:E,worstShelterDistanceM:S,worstShelterTimeSec:g,bottleneckPoints:Array.from(h.values()),gridResolutionM:Dt}}const Ar=50,Qs=3;function A_(s){if(s<=30)return 15;if(s>=180)return 25;const e=(s-30)/150;return Number((15+e*10).toFixed(1))}function C_(s){if(s.type!=="crew_quarters")return 0;const e=s.width*s.height;return Math.max(1,Math.floor(e/1.85))}function aa(s,e){const t=typeof performance<"u"?performance.now():Date.now(),{hull:r}=s,{deckHeight:o}=Si(r),l=[],u=[],d=[],h=M_(s,e),p=Math.max(0,h.grossVolumeM3-h.structureVolumeM3),m=r.type==="surface_dome"?.14:.1,v=Number((p*m).toFixed(1)),x=Number(Math.max(0,p-h.equipmentVolumeM3-v).toFixed(1)),y=Number((x/Math.max(1,s.crewSize)).toFixed(1)),E=A_(s.durationDays);let M=0;y<E*.85?(M+=18,l.push({id:"nhv-critical",ruleCode:"NASA-STD-3001-V2-8.2",category:"NHV",severity:"CRITICAL",title:"Insufficient Net Habitable Volume (NHV)",detail:`NHV per crewmember is ${y} m³/crew, well below the ${E} m³/crew threshold for a ${s.durationDays}-day mission.`,metric:`${y} / ${E} m³`,affectedZoneIds:[],recommendation:"Increase hull diameter/length, add a deck, switch to an Inflatable hull, or reduce excess equipment/stowage volume."})):y<E?(M+=8,l.push({id:"nhv-warning",ruleCode:"NASA-STD-3001-V2-8.2",category:"NHV",severity:"WARNING",title:"Marginal Net Habitable Volume (NHV)",detail:`NHV per crewmember is ${y} m³/crew, slightly under the ${E} m³/crew NASA HRP benchmark.`,metric:`${y} / ${E} m³`,affectedZoneIds:[],recommendation:"Slightly expand hull length/diameter or trim oversized stowage racks to reach full NHV compliance."})):l.push({id:"nhv-pass",ruleCode:"NASA-STD-3001-V2-8.2",category:"NHV",severity:"PASS",title:"Net Habitable Volume Compliant",detail:`NHV of ${y} m³/crew satisfies the ${E} m³/crew requirement for ${s.crewSize} crew over ${s.durationDays} days.`,metric:`${y} m³/crew`,affectedZoneIds:[],recommendation:"NHV margin is healthy."});const S=[];for(const se of e)(se.deck>=r.decks||!oa(se.x,se.y,se.width,se.height,r))&&S.push(se);S.length>0&&(M+=Math.min(24,S.length*10),l.push({id:"geom-oob",ruleCode:"HAB-GEOM-101",category:"GEOMETRY",severity:"CRITICAL",title:`${S.length} Zone(s) Breach Pressure Hull Boundary`,detail:`${S.map(se=>se.label).join(", ")} extend outside the pressurized hull envelope.`,metric:`${S.length} OOB`,affectedZoneIds:S.map(se=>se.id),recommendation:"Drag zones inward inside the hull contour or run Auto-Optimize."}));const g=new Set;let C=0;for(let se=0;se<e.length;se++)for(let K=se+1;K<e.length;K++)dc(e[se],e[K])>.05&&(C++,g.add(e[se].id),g.add(e[K].id));C>0&&(M+=Math.min(24,C*12),l.push({id:"geom-overlap",ruleCode:"HAB-GEOM-102",category:"GEOMETRY",severity:"CRITICAL",title:`${C} Overlapping Zone Collision(s)`,detail:"Two or more interior modules intersect on the same deck floorplan.",metric:`${C} overlaps`,affectedZoneIds:Array.from(g),recommendation:"Separate colliding modules or click Auto-Optimize to pack cleanly."}));const A=e.filter(se=>gn[se.type].isQuietZone),T=e.filter(se=>gn[se.type].noiseEmitDba>=60);let U=0;for(const se of T){const K=gn[se.type].noiseEmitDba;for(const oe of A){const j=Hd(se,oe,o),te=Math.max(.8,j+.5),ge=se.deck!==oe.deck?14:j>=.75?8:3,ye=Number((K-20*Math.log10(te)-ge).toFixed(1)),Ce=ye>Ar;if(u.push({sourceId:se.id,sourceLabel:se.label,targetId:oe.id,targetLabel:oe.label,sourceDba:K,receivedDba:ye,limitDba:Ar,distanceM:Number(j.toFixed(2)),violates:Ce}),Ce){U++;const st=Number((ye-Ar).toFixed(1)),Ze=st>=6;M+=Ze?12:6,l.push({id:`acoustic-${se.id}-${oe.id}`,ruleCode:"NASA-STD-3001-V2-6.6",category:"ACOUSTIC",severity:Ze?"CRITICAL":"WARNING",title:`Acoustic Limit Exceeded: ${se.label} → ${oe.label}`,detail:`Projected sleep-zone noise is ${ye} dBA (+${st} dBA over ${Ar} dBA limit) at ${j.toFixed(1)}m separation.`,metric:`${ye} dBA`,affectedZoneIds:[se.id,oe.id],recommendation:`Relocate ${se.label} farther from ${oe.label} (target ≥ 5.5m for Exercise or ≥ 2.5m for ECLSS/Galley) or separate across decks.`})}}}U===0&&A.length>0&&l.push({id:"acoustic-pass",ruleCode:"NASA-STD-3001-V2-6.6",category:"ACOUSTIC",severity:"PASS",title:"Sleep-Zone Acoustic Isolation Verified",detail:`All Crew Quarters remain ≤ ${Ar} dBA from Exercise, ECLSS, and Galley noise sources.`,metric:`≤ ${Ar} dBA`,affectedZoneIds:[],recommendation:"Acoustic zoning meets NASA sleep hygiene requirements."});const L=e.filter(se=>gn[se.type].isContaminationSource),I=e.filter(se=>gn[se.type].isContaminationSensitive);let O=0;for(const se of L)for(const K of I){const oe=Hd(se,K,o),te=(se.deck!==K.deck?Math.max(oe,3.5):oe)<Qs;if(d.push({hygieneId:se.id,hygieneLabel:se.label,targetId:K.id,targetLabel:K.label,distanceM:Number(oe.toFixed(2)),minRequiredM:Qs,violates:te}),te){O++;const ge=K.type==="galley";M+=ge?14:7,l.push({id:`contam-${se.id}-${K.id}`,ruleCode:"NASA-STD-3001-V2-7.4",category:"CONTAMINATION",severity:ge?"CRITICAL":"WARNING",title:`Contamination Hazard: ${se.label} ↔ ${K.label}`,detail:`Only ${oe.toFixed(1)}m edge separation (minimum ${Qs.toFixed(1)}m required between waste management and ${ge?"food preparation":"medical care"}).`,metric:`${oe.toFixed(1)}m / 3.0m`,affectedZoneIds:[se.id,K.id],recommendation:`Separate ${se.label} and ${K.label} by at least 3.0m or relocate to opposite ends of the habitat.`})}}O===0&&L.length>0&&I.length>0&&l.push({id:"contam-pass",ruleCode:"NASA-STD-3001-V2-7.4",category:"CONTAMINATION",severity:"PASS",title:"Hygiene-to-Galley Isolation Verified",detail:`All Hygiene/UWMS modules maintain ≥ ${Qs.toFixed(1)}m clearance from Galley and Medical zones.`,metric:"≥ 3.0m",affectedZoneIds:[],recommendation:"Bio-contamination zoning is compliant."});const R=A.reduce((se,K)=>se+C_(K),0);R<s.crewSize&&(M+=14,l.push({id:"support-bunks",ruleCode:"HRP-CREW-201",category:"CREW_SUPPORT",severity:"CRITICAL",title:"Insufficient Crew Sleep Stations",detail:`Layout supports ${R} bunk(s) for a crew of ${s.crewSize}.`,metric:`${R} / ${s.crewSize} bunks`,affectedZoneIds:A.map(se=>se.id),recommendation:"Add another Crew Quarters module or enlarge existing quarters."}));const P=Math.ceil(s.crewSize/4);L.length<P&&(M+=8,l.push({id:"support-hygiene",ruleCode:"HRP-CREW-202",category:"CREW_SUPPORT",severity:"WARNING",title:"Hygiene / UWMS Capacity Shortage",detail:`Found ${L.length} Hygiene module(s); recommended ≥ ${P} for ${s.crewSize} crew.`,metric:`${L.length} / ${P}`,affectedZoneIds:L.map(se=>se.id),recommendation:"Add an additional Hygiene & Waste (UWMS) station."}));const F=e.filter(se=>se.type==="exercise");s.durationDays>30&&F.length===0&&(M+=10,l.push({id:"support-exercise",ruleCode:"NASA-STD-3001-V2-10.3",category:"CREW_SUPPORT",severity:"CRITICAL",title:"Missing Exercise Countermeasures Zone",detail:`Missions exceeding 30 days (${s.durationDays}d) require dedicated resistive/aerobic exercise hardware.`,metric:"0 Exercise",affectedZoneIds:[],recommendation:"Place an Exercise & ARED module far from Crew Quarters."}));const ne=e.filter(se=>se.type==="airlock");ne.length===0&&(M+=16,l.push({id:"support-airlock",ruleCode:"NASA-STD-3001-EGRESS-1",category:"EGRESS",severity:"CRITICAL",title:"Missing Airlock / Emergency Egress Hatch",detail:"No Airlock or emergency egress hatch is placed in the habitat.",metric:"0 Airlocks",affectedZoneIds:[],recommendation:"Add at least one Airlock / Egress Hatch along the hull perimeter."}));const q=e.filter(se=>se.type==="storm_shelter");q.length===0&&(M+=12,l.push({id:"support-shelter",ruleCode:"NASA-STD-3001-RAD-1",category:"CREW_SUPPORT",severity:"CRITICAL",title:"Missing Radiation Storm Shelter",detail:"Deep-space habitats require a shielded Solar Particle Event (SPE) refuge.",metric:"0 Shelters",affectedZoneIds:[],recommendation:"Add a Radiation Storm Shelter sized ≥ 1.5 m³/crew."}));const V=b_(r,e),J=V.airlockPaths.filter(se=>!se.reachable);ne.length>0&&J.length>0&&(M+=18,l.push({id:"egress-airlock-blocked",ruleCode:"NASA-STD-3001-EGRESS-2",category:"EGRESS",severity:"CRITICAL",title:`Emergency Egress Blocked (${J.length} Zone${J.length>1?"s":""})`,detail:`A* pathfinding found no traversable corridor from ${J.map(se=>se.fromLabel).join(", ")} to an Airlock.`,metric:"BLOCKED",affectedZoneIds:J.map(se=>se.fromZoneId),recommendation:"Clear obstacles blocking the central corridor to maintain ≥ 1.0m unobstructed passage."}));const ee=V.shelterPaths.filter(se=>!se.reachable);q.length>0&&ee.length>0&&(M+=14,l.push({id:"egress-shelter-blocked",ruleCode:"NASA-STD-3001-RAD-2",category:"EGRESS",severity:"CRITICAL",title:`Storm Shelter Unreachable (${ee.length} Zone${ee.length>1?"s":""})`,detail:`Crew cannot reach the Radiation Storm Shelter from ${ee.map(se=>se.fromLabel).join(", ")}.`,metric:"BLOCKED",affectedZoneIds:ee.map(se=>se.fromZoneId),recommendation:"Open a continuous ≥ 1.0m corridor to the Radiation Storm Shelter."})),V.bottleneckPoints.length>0&&J.length===0&&(M+=6,l.push({id:"egress-pinch",ruleCode:"NASA-STD-3001-EGRESS-3",category:"EGRESS",severity:"WARNING",title:`${V.bottleneckPoints.length} Corridor Clearance Pinch-Point(s)`,detail:`Egress corridor narrows below 1.0m minimum clearance (min ${Math.min(...V.bottleneckPoints.map(se=>se.clearanceM)).toFixed(2)}m).`,metric:"< 1.0m wide",affectedZoneIds:[],recommendation:"Widen central aisle to at least 1.0m–1.25m for suited crew translation."})),ne.length>0&&J.length===0&&V.bottleneckPoints.length===0&&l.push({id:"egress-pass",ruleCode:"NASA-STD-3001-EGRESS-2",category:"EGRESS",severity:"PASS",title:"A* Emergency Egress Clear",detail:`All occupied zones reach an Airlock in ≤ ${V.worstCaseDistanceM.toFixed(1)}m (${V.worstCaseTimeSec}s) with ≥ 1.0m clearance.`,metric:`${V.worstCaseDistanceM.toFixed(1)}m max`,affectedZoneIds:[],recommendation:"Emergency translation corridors are unobstructed."});const ae={CRITICAL:0,WARNING:1,PASS:2};l.sort((se,K)=>ae[se.severity]-ae[K.severity]);const H=l.filter(se=>se.severity==="CRITICAL").length,le=l.filter(se=>se.severity==="WARNING").length,ie=l.filter(se=>se.severity==="PASS").length,B=Math.max(0,Math.min(100,Math.round(100-M))),ce=Number(((typeof performance<"u"?performance.now():Date.now())-t).toFixed(2));return{score:B,grossVolumeM3:h.grossVolumeM3,structureVolumeM3:h.structureVolumeM3,equipmentVolumeM3:h.equipmentVolumeM3,deadSpaceM3:v,nhvM3:x,nhvPerCrewM3:y,requiredNhvPerCrewM3:E,estimatedMassKg:h.estimatedMassKg,estimatedLaunchCostM:h.estimatedLaunchCostM,violations:l,criticalCount:H,warningCount:le,passCount:ie,acousticPairs:u,contaminationPairs:d,egress:V,computeTimeMs:ce}}function R_(s){let e=s>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function id(s,e){const{hull:t}=s,{width:r,depth:o,deckHeight:l}=Si(t),u=o/2;let d=0;for(const h of e){if(oa(h.x,h.y,h.width,h.height,t)||(d+=500),h.type!=="airlock"){const p=u-.65,m=u+.65,v=Math.max(0,Math.min(h.y+h.height,m)-Math.max(h.y,p));v>0&&(d+=v*140)}else{const p=Math.min(h.x,r-(h.x+h.width));d+=p*12}h.type==="crew_quarters"?d+=h.x/Math.max(1,r)*18:(h.type==="exercise"||h.type==="eclss")&&(d+=(r-(h.x+h.width))/Math.max(1,r)*18)}for(let h=0;h<e.length;h++){const p=e[h],m=gn[p.type];for(let v=h+1;v<e.length;v++){const x=e[v],y=gn[x.type],E=dc(p,x);E>.001&&(d+=400+E*250);const M=Hd(p,x,l),S=(C,A,T)=>{const U=Math.max(.8,M+.5),L=C.deck!==A.deck?14:M>=.75?8:3,I=T-20*Math.log10(U)-L;I>Ar&&(d+=(I-Ar)*28+80)};m.noiseEmitDba>=60&&y.isQuietZone&&S(p,x,m.noiseEmitDba),y.noiseEmitDba>=60&&m.isQuietZone&&S(x,p,y.noiseEmitDba);const g=(C,A)=>{const T=C.deck!==A.deck?Math.max(M,3.5):M;if(T<Qs){const U=A.type==="galley"?120:60;d+=(Qs-T)*U+90}};m.isContaminationSource&&y.isContaminationSensitive&&g(p,x),y.isContaminationSource&&m.isContaminationSensitive&&g(x,p)}}return d}function P_(s,e){const{hull:t}=s,{width:r,depth:o,wall:l}=Si(t),u=e.map(h=>({...h})),d={crew_quarters:0,storm_shelter:1,medical:2,galley:3,stowage:4,eclss:5,exercise:6,hygiene:7,airlock:8};for(let h=0;h<t.decks;h++){const p=u.filter(M=>M.deck===h&&!M.locked);p.sort((M,S)=>(d[M.type]??5)-(d[S.type]??5));const m=o/2,v=St(l+.25),x=St(o-l-.25);let y=St(l+.5),E=St(l+.5);for(const M of p){if(M.type==="airlock"){const C=St(r-l-M.width-.25),A=St(m-M.height/2);if(oa(C,A,M.width,M.height,t)){M.x=C,M.y=A;continue}}const S=M.type==="galley"?!1:M.type==="hygiene"?!0:y<=E,g=C=>{const A=C?v:St(x-M.height),T=C?y:E;for(let U=T;U<=r-l-M.width;U+=.25){const L=St(U);if(!oa(L,A,M.width,M.height,t))continue;if(!p.some(O=>O!==M&&dc({...M,x:L,y:A},O)>.01))return M.x=L,M.y=A,C?y=St(L+M.width+.25):E=St(L+M.width+.25),!0}return!1};g(S)||g(!S)}}return u}function N_(s,e,t=42){const r=aa(s,e),{hull:o}=s,{width:l,depth:u,wall:d}=Si(o),h=R_(t),p=[e.map(y=>({...y})),P_(s,e)];let m=e.map(y=>({...y})),v=r,x=0;for(const y of p){let E=y.map(L=>({...L})),M=id(s,E),S=E.map(L=>({...L})),g=M;const C=650;let A=120;const T=.992,U=E.map((L,I)=>L.locked?-1:I).filter(L=>L>=0);if(U.length>0)for(let L=0;L<C;L++){x++;const I=U[Math.floor(h()*U.length)],O=E[I],R={...O},P=h();if(P<.72){const q=A>30?3.5:1.25,V=St((h()*2-1)*q),J=St((h()*2-1)*q),ee=Math.max(d,Math.min(l-d-O.width,St(O.x+V))),ae=Math.max(d,Math.min(u-d-O.height,St(O.y+J)));O.x=ee,O.y=ae}else if(P<.88&&U.length>=2){const q=U[Math.floor(h()*U.length)];if(q!==I&&E[q].deck===O.deck){const V=E[q],J={...V};O.x=St(Math.min(l-d-O.width,Math.max(d,J.x))),O.y=St(Math.min(u-d-O.height,Math.max(d,J.y))),V.x=St(Math.min(l-d-V.width,Math.max(d,R.x))),V.y=St(Math.min(u-d-V.height,Math.max(d,R.y)));const ee=id(s,E),ae=ee-M;ae<0||h()<Math.exp(-ae/Math.max(.5,A))?(M=ee,M<g&&(g=M,S=E.map(H=>({...H})))):(E[I]=R,E[q]=J),A*=T;continue}}else{const q=O.height,V=O.width;O.x+q<=l-d&&O.y+V<=u-d&&(O.width=q,O.height=V,O.rotation=(O.rotation+90)%360)}const F=id(s,E),ne=F-M;ne<0||h()<Math.exp(-ne/Math.max(.5,A))?(M=F,M<g&&(g=M,S=E.map(q=>({...q})))):E[I]=R,A*=T}for(const L of[y,S]){const I=aa(s,L);(I.score>v.score||I.score===v.score&&I.criticalCount<v.criticalCount||I.score===v.score&&I.criticalCount===v.criticalCount&&I.warningCount<v.warningCount)&&(v=I,m=L.map(R=>({...R})))}}return{zones:m,beforeReport:r,afterReport:v,iterations:x,improved:v.score>r.score||v.criticalCount<r.criticalCount}}const D_="https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json",L_="https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json";function I_(s){return s>=.001?{xrayClass:`X${(s/1e-4).toFixed(1)}`,rScale:"R4–R5"}:s>=1e-4?{xrayClass:`X${(s/1e-4).toFixed(1)}`,rScale:"R3"}:s>=1e-5?{xrayClass:`M${(s/1e-5).toFixed(1)}`,rScale:"R1–R2"}:s>=1e-6?{xrayClass:`C${(s/1e-6).toFixed(1)}`,rScale:"R0"}:s>=1e-7?{xrayClass:`B${(s/1e-7).toFixed(1)}`,rScale:"R0"}:{xrayClass:`A${Math.max(1,s/1e-8).toFixed(1)}`,rScale:"R0"}}function U_(s){return s>=1e5?"S5 (Extreme)":s>=1e4?"S4 (Severe)":s>=1e3?"S3 (Strong)":s>=100?"S2 (Moderate)":s>=10?"S1 (Minor)":"S0 (Nominal)"}function ks(s,e,t=36,r=.72){const o=Date.now(),l=[];for(let u=0;u<t;u++){const d=u/(t-1),h=new Date(o-(t-1-u)*40*60*1e3).toISOString(),p=d-r,m=p>=0?Math.exp(-p*7.5):Math.exp(-Math.pow(p*12,2)),v=.92+u*37%17/100,x=(e+(s-e)*m)*v;l.push({timestamp:h,value:Number(x.toExponential(3))})}return l}function Lh(s){const e=new Date().toISOString();return s==="quiet_b"?{source:"SIMULATED_PRESET",presetId:"quiet_b",label:"Quiet Sun (B-Class)",fetchedAt:e,xrayFluxWm2:38e-8,xrayClass:"B3.8",protonFluxPfu:.42,noaaRScale:"R0",noaaSScale:"S0 (Nominal)",xraySeries:ks(52e-8,24e-8,36,.55),protonSeries:ks(.55,.35,36,.6),warningWindowSec:1800}:s==="moderate_m5"?{source:"SIMULATED_PRESET",presetId:"moderate_m5",label:"R3 / S2 Moderate Storm (M5)",fetchedAt:e,xrayFluxWm2:54e-6,xrayClass:"M5.4",protonFluxPfu:240,noaaRScale:"R2–R3",noaaSScale:"S2 (Moderate)",xraySeries:ks(54e-6,18e-7,36,.72),protonSeries:ks(240,1.4,36,.8),warningWindowSec:600}:{source:"SIMULATED_PRESET",presetId:"extreme_x10",label:"X10 Extreme Solar Particle Event",fetchedAt:e,xrayFluxWm2:.00105,xrayClass:"X10.5",protonFluxPfu:18500,noaaRScale:"R4–R5",noaaSScale:"S4 (Severe)",xraySeries:ks(.00105,45e-7,36,.7),protonSeries:ks(18500,4.2,36,.78),warningWindowSec:240}}async function k_(){const s=new AbortController,e=setTimeout(()=>s.abort(),5e3);try{const[t,r]=await Promise.all([fetch(D_,{signal:s.signal}),fetch(L_,{signal:s.signal})]);if(!t.ok||!r.ok)throw new Error(`NOAA HTTP status ${t.status}/${r.status}`);const[o,l]=await Promise.all([t.json(),r.json()]),u=o.filter(g=>g.energy==="0.1-0.8nm"&&typeof g.flux=="number"&&g.flux>0),d=l.filter(g=>g.energy===">=10 MeV"&&typeof g.flux=="number"&&g.flux>0);if(u.length===0||d.length===0)throw new Error("NOAA feed returned empty channels");const h=(g,C=40)=>{if(g.length<=C)return g;const A=Math.ceil(g.length/C),T=[];for(let U=0;U<g.length;U+=A)T.push(g[U]);return T[T.length-1]!==g[g.length-1]&&T.push(g[g.length-1]),T},p=h(u).map(g=>({timestamp:g.time_tag,value:g.flux})),m=h(d).map(g=>({timestamp:g.time_tag,value:g.flux})),v=u[u.length-1].flux,x=d[d.length-1].flux,{xrayClass:y,rScale:E}=I_(v),M=U_(x),S=x>=1e3?300:x>=10?600:1800;return{source:"LIVE_NOAA_GOES",presetId:"live",label:"NOAA SWPC GOES Primary (Live)",fetchedAt:new Date().toISOString(),xrayFluxWm2:v,xrayClass:y,protonFluxPfu:Number(x.toFixed(2)),noaaRScale:E,noaaSScale:M,xraySeries:p,protonSeries:m,warningWindowSec:S}}catch{return{...Lh("quiet_b"),label:"Cached GOES Telemetry (Offline Fallback)"}}finally{clearTimeout(e)}}function ta(s,e,t,r){const o=e.filter(L=>L.type==="storm_shelter"),l=o.length>0,u=250,d=1.5,h=Number(o.reduce((L,I)=>L+I.width*I.height*I.zHeight*.78,0).toFixed(1)),p=Number((h/Math.max(1,s.crewSize)).toFixed(2)),m=l&&t.egress.shelterReachable,v=m?t.egress.worstShelterTimeSec:1/0,x=s.hull.type==="surface_dome"?12:s.hull.type==="inflatable"?7:6,y=l?Math.min(28,14+Math.min(14,h*1.1)):0,E=Number((x+y).toFixed(1)),M=Number((.8+Math.pow(Math.max(0,r.protonFluxPfu),.74)*1.02).toFixed(1)),S=Math.exp(-E/14.5),g=Number(Math.max(.5,M*S).toFixed(1)),C=[];let A=0,T=0;return l?p<1.2?(A++,C.push({severity:"CRITICAL",title:"Storm Shelter Critically Undersized",detail:`Only ${p} m³/crew available (critical minimum 1.2 m³/crew; target ≥ 1.5 m³/crew for ${s.crewSize} crew).`})):p<d?(T++,C.push({severity:"WARNING",title:"Tight Emergency Huddle Volume",detail:`${p} m³/crew is below the 1.5 m³/crew comfort benchmark for multi-hour SPE sheltering.`})):C.push({severity:"PASS",title:"Shelter Capacity Verified",detail:`${p} m³/crew (${h} m³ net) accommodates all ${s.crewSize} crewmembers.`}):(A++,C.push({severity:"CRITICAL",title:"No Radiation Storm Shelter Installed",detail:"Crew has no dedicated water-wall / HDPE storm refuge during a Solar Particle Event."})),m?v>r.warningWindowSec?(A++,C.push({severity:"CRITICAL",title:"Transit Exceeds Proton Arrival Window",detail:`Worst-case transit (${v}s) exceeds the ${r.warningWindowSec}s warning window.`})):C.push({severity:"PASS",title:"Rapid Shelter Reachability Verified",detail:`All crew reach the storm shelter in ≤ ${v}s (well inside the ${r.warningWindowSec}s warning window).`}):(A++,C.push({severity:"CRITICAL",title:"A* Shelter Egress Blocked",detail:"One or more occupied zones have no unobstructed path to the Radiation Storm Shelter."})),g>u?(A++,C.push({severity:"CRITICAL",title:"Projected Dose Exceeds NASA 250 mSv Acute Limit",detail:`Shielded dose of ${g} mSv (${E} g/cm²) breaches the 250 mSv 30-day BFO threshold.`})):g>u*.65?(T++,C.push({severity:"WARNING",title:"Elevated Radiation Dose Margin",detail:`Projected shielded dose is ${g} mSv (${Math.round(g/u*100)}% of 250 mSv limit). Consider adding water-wall mass.`})):C.push({severity:"PASS",title:"Shielding Attenuation Within NASA Limits",detail:`${E} g/cm² shielding attenuates ${M} mSv → ${g} mSv (< ${u} mSv limit).`}),{verdict:A>0?"FAIL":T>0?"MARGINAL":"PASS",hasShelter:l,shelterVolumeM3:h,shelterVolumePerCrewM3:p,requiredVolumePerCrewM3:d,allCrewReachable:m,worstTransitSec:v,warningWindowSec:r.warningWindowSec,shieldingArealDensityGcm2:E,unshieldedDoseMsv:M,shieldedDoseMsv:g,acuteLimitMsv:u,diagnostics:C}}const Ih=uc[0],hc=structuredClone(Ih.mission),fc=structuredClone(Ih.zones),Uh=aa(hc,fc),ag=Lh("quiet_b"),O_=ta(hc,fc,Uh,ag),Om={id:"snap-baseline",name:"Baseline Layout A (Faulty)",timestamp:Date.now()-6e4,mission:structuredClone(hc),zones:structuredClone(fc),report:Uh},tc=uc[1],F_=aa(tc.mission,tc.zones),Fm={id:"snap-gateway",name:"Lunar Gateway Reference",timestamp:Date.now()-3e4,mission:structuredClone(tc.mission),zones:structuredClone(tc.zones),report:F_};function ii(s,e,t){const r=aa(s,e),o=ta(s,e,r,t);return{report:r,stormStress:o}}function Ai(s){const e={mission:structuredClone(s.mission),zones:structuredClone(s.zones)};return[...s.past.slice(-39),e]}function z_(s,e,t,r,o){const{width:l,depth:u,wall:d}=Si(s.hull),h=e.filter(p=>p.deck===t);for(let p=St(d+.25);p<=u-d-o;p+=.25)for(let m=St(d+.25);m<=l-d-r;m+=.25){const v=St(m),x=St(p);if(!oa(v,x,r,o,s.hull))continue;const y={deck:t,x:v,y:x,width:r,height:o};if(h.every(E=>dc(y,E)<.01))return{x:v,y:x}}return{x:St(Math.max(d+.25,(l-r)/2)),y:St(Math.max(d+.25,(u-o)/2))}}const Qi=x_((s,e)=>({activePresetId:Ih.id,mission:hc,zones:fc,report:Uh,activeDeck:0,activeView:"studio",selectedZoneId:null,highlightedZoneIds:[],showEgressOverlay:!0,showHazardOverlay:!0,past:[],future:[],lastOptimization:null,snapshots:[Om,Fm],compareIds:[Om.id,Fm.id],weather:ag,weatherLoading:!1,stormStress:O_,loadPreset:t=>{const r=uc.find(p=>p.id===t);if(!r)return;const o=e(),l=structuredClone(r.mission),u=structuredClone(r.zones),{report:d,stormStress:h}=ii(l,u,o.weather);s({activePresetId:t,mission:l,zones:u,report:d,stormStress:h,activeDeck:0,selectedZoneId:null,highlightedZoneIds:[],lastOptimization:null,past:Ai(o),future:[]})},updateMission:t=>{const r=e(),o={...r.mission,...t},{report:l,stormStress:u}=ii(o,r.zones,r.weather);s({mission:o,report:l,stormStress:u,past:Ai(r),future:[]})},updateHull:t=>{const r=e(),o={...r.mission.hull,...t};o.type==="surface_dome"&&(o.length=o.diameter);const l={...r.mission,hull:o},u=r.zones.map(m=>({...m,deck:Math.min(m.deck,o.decks-1)})),d=Math.min(r.activeDeck,o.decks-1),{report:h,stormStress:p}=ii(l,u,r.weather);s({mission:l,zones:u,activeDeck:d,report:h,stormStress:p,past:Ai(r),future:[]})},addZone:(t,r,o)=>{const l=e(),u=gn[t],d=typeof r=="number"&&typeof o=="number"?{x:St(r),y:St(o)}:z_(l.mission,l.zones,l.activeDeck,u.defaultWidth,u.defaultHeight),h=l.zones.filter(y=>y.type===t).length+1,p={id:`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,5)}`,type:t,label:h>1?`${u.label} #${h}`:u.label,deck:l.activeDeck,x:d.x,y:d.y,width:u.defaultWidth,height:u.defaultHeight,zHeight:u.defaultZHeight,rotation:0},m=[...l.zones,p],{report:v,stormStress:x}=ii(l.mission,m,l.weather);s({zones:m,report:v,stormStress:x,selectedZoneId:p.id,highlightedZoneIds:[],past:Ai(l),future:[]})},updateZone:(t,r,o=!0)=>{const l=e(),u=l.zones.map(p=>p.id===t?{...p,...r}:p),{report:d,stormStress:h}=ii(l.mission,u,l.weather);s({zones:u,report:d,stormStress:h,...o?{past:Ai(l),future:[]}:{}})},moveZone:(t,r,o,l=!1)=>{const u=e(),d=St(r),h=St(o),p=u.zones.map(x=>x.id===t?{...x,x:d,y:h}:x),{report:m,stormStress:v}=ii(u.mission,p,u.weather);s({zones:p,report:m,stormStress:v,...l?{past:Ai(u),future:[]}:{}})},resizeZone:(t,r,o,l,u,d=!1)=>{const h=e(),p=h.zones.map(x=>{if(x.id!==t)return x;const y=gn[x.type],E=Math.max(y.minWidth,St(r)),M=Math.max(y.minHeight,St(o));return{...x,width:E,height:M,x:typeof l=="number"?St(l):x.x,y:typeof u=="number"?St(u):x.y}}),{report:m,stormStress:v}=ii(h.mission,p,h.weather);s({zones:p,report:m,stormStress:v,...d?{past:Ai(h),future:[]}:{}})},rotateZone:t=>{const r=e(),o=r.zones.map(d=>d.id!==t?d:{...d,width:d.height,height:d.width,rotation:(d.rotation+90)%360}),{report:l,stormStress:u}=ii(r.mission,o,r.weather);s({zones:o,report:l,stormStress:u,past:Ai(r),future:[]})},deleteZone:t=>{const r=e(),o=r.zones.filter(d=>d.id!==t),{report:l,stormStress:u}=ii(r.mission,o,r.weather);s({zones:o,report:l,stormStress:u,selectedZoneId:r.selectedZoneId===t?null:r.selectedZoneId,highlightedZoneIds:r.highlightedZoneIds.filter(d=>d!==t),past:Ai(r),future:[]})},selectZone:t=>s({selectedZoneId:t,highlightedZoneIds:t?[t]:[]}),highlightZones:t=>{const r=e();if(t.length>0){const o=r.zones.find(l=>l.id===t[0]);s({highlightedZoneIds:t,selectedZoneId:t[0],activeDeck:o?o.deck:r.activeDeck})}else s({highlightedZoneIds:[]})},setActiveDeck:t=>s({activeDeck:t}),setActiveView:t=>s({activeView:t}),toggleEgressOverlay:()=>s(t=>({showEgressOverlay:!t.showEgressOverlay})),toggleHazardOverlay:()=>s(t=>({showHazardOverlay:!t.showHazardOverlay})),undo:()=>{const t=e();if(t.past.length===0)return;const r=t.past[t.past.length-1],o={mission:structuredClone(t.mission),zones:structuredClone(t.zones)},{report:l,stormStress:u}=ii(r.mission,r.zones,t.weather);s({mission:r.mission,zones:r.zones,report:l,stormStress:u,past:t.past.slice(0,-1),future:[o,...t.future.slice(0,39)],lastOptimization:null})},redo:()=>{const t=e();if(t.future.length===0)return;const r=t.future[0],o={mission:structuredClone(t.mission),zones:structuredClone(t.zones)},{report:l,stormStress:u}=ii(r.mission,r.zones,t.weather);s({mission:r.mission,zones:r.zones,report:l,stormStress:u,past:[...t.past,o],future:t.future.slice(1)})},runAutoOptimize:()=>{const t=e(),r=structuredClone(t.zones),o=N_(t.mission,t.zones,42),l=ta(t.mission,o.zones,o.afterReport,t.weather);s({zones:o.zones,report:o.afterReport,stormStress:l,highlightedZoneIds:[],past:Ai(t),future:[],lastOptimization:{beforeScore:o.beforeReport.score,afterScore:o.afterReport.score,beforeCritical:o.beforeReport.criticalCount,afterCritical:o.afterReport.criticalCount,beforeWarning:o.beforeReport.warningCount,afterWarning:o.afterReport.warningCount,iterations:o.iterations,previousZones:r}})},revertOptimization:()=>{const t=e();if(!t.lastOptimization)return;const r=structuredClone(t.lastOptimization.previousZones),{report:o,stormStress:l}=ii(t.mission,r,t.weather);s({zones:r,report:o,stormStress:l,lastOptimization:null})},dismissOptimization:()=>s({lastOptimization:null}),saveSnapshot:t=>{var h;const r=e(),o=r.snapshots.length+1,l={id:`snap-${Date.now().toString(36)}`,name:(t==null?void 0:t.trim())||`${r.mission.name} — Rev ${o}`,timestamp:Date.now(),mission:structuredClone(r.mission),zones:structuredClone(r.zones),report:r.report},u=[...r.snapshots,l],d=((h=r.snapshots[0])==null?void 0:h.id)??l.id;s({snapshots:u,compareIds:[d,l.id]})},deleteSnapshot:t=>{const r=e();if(r.snapshots.length<=2)return;const o=r.snapshots.filter(d=>d.id!==t),[l,u]=r.compareIds;s({snapshots:o,compareIds:[o.some(d=>d.id===l)?l:o[0].id,o.some(d=>d.id===u)?u:o[o.length-1].id]})},setComparePair:(t,r)=>s({compareIds:[t,r]}),fetchLiveWeather:async()=>{s({weatherLoading:!0});const t=await k_(),r=e(),o=ta(r.mission,r.zones,r.report,t);s({weather:t,weatherLoading:!1,stormStress:o})},selectWeatherPreset:t=>{const r=Lh(t),o=e(),l=ta(o.mission,o.zones,o.report,r);s({weather:r,stormStress:l})}})),B_=()=>{const{activePresetId:s,activeView:e,report:t,past:r,future:o,snapshots:l,stormStress:u,loadPreset:d,setActiveView:h,undo:p,redo:m,saveSnapshot:v}=Qi(),[x,y]=Nt.useState(!1),E=()=>{v(),y(!0),setTimeout(()=>y(!1),1800)},M=t.score>=85?"text-emerald-400 border-emerald-500/40 bg-emerald-500/10":t.score>=60?"text-amber-400 border-amber-500/40 bg-amber-500/10":"text-rose-400 border-rose-500/40 bg-rose-500/10",S=[{id:"studio",label:"Studio 2D / 3D",icon:w.jsx(ig,{className:"w-3.5 h-3.5"})},{id:"compare",label:"Compare Mode",icon:w.jsx(tg,{className:"w-3.5 h-3.5"}),badge:`${l.length}`},{id:"weather",label:"Solar-Flare Stress Test",icon:w.jsx(ng,{className:"w-3.5 h-3.5"}),badge:u.verdict}];return w.jsxs("header",{className:"h-13 shrink-0 bg-[#0D1320] border-b border-slate-800/90 px-4 flex items-center justify-between gap-3 select-none",children:[w.jsxs("div",{className:"flex items-center gap-3 min-w-0",children:[w.jsxs("div",{className:"flex items-center gap-2.5",children:[w.jsx("div",{className:"w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center shadow-inner",children:w.jsx(Xx,{className:"w-4.5 h-4.5 text-cyan-400"})}),w.jsxs("div",{className:"leading-tight",children:[w.jsx("div",{className:"text-xs font-bold tracking-wider text-slate-100 uppercase",children:"Space Habitat Studio"}),w.jsx("div",{className:"text-[10px] font-mono-telemetry text-cyan-400/80 tracking-wide",children:"NASA-STD-3001 • HRP ENGINE"})]})]}),w.jsx("div",{className:"h-6 w-px bg-slate-800 mx-1 hidden md:block"}),w.jsxs("div",{className:"flex items-center gap-1.5",children:[w.jsx("span",{className:"text-[10px] uppercase tracking-wider text-slate-400 hidden lg:inline",children:"Preset:"}),w.jsx("select",{"aria-label":"Habitat Preset",value:s,onChange:g=>d(g.target.value),className:"bg-[#111827] hover:bg-slate-800/80 border border-slate-700/80 text-slate-100 text-xs rounded-md px-2.5 py-1.5 outline-none focus:border-cyan-500 transition-colors cursor-pointer",children:uc.map(g=>w.jsx("option",{value:g.id,children:g.name},g.id))})]})]}),w.jsx("nav",{className:"flex items-center bg-[#090D16] p-1 rounded-lg border border-slate-800/80 gap-1",children:S.map(g=>{const C=e===g.id;return w.jsxs("button",{onClick:()=>h(g.id),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${C?"bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm":"text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"}`,children:[g.icon,w.jsx("span",{children:g.label}),g.badge&&w.jsx("span",{className:`text-[10px] font-mono-telemetry px-1.5 py-0.2 rounded-full ${g.badge==="FAIL"?"bg-rose-500/20 text-rose-300":g.badge==="MARGINAL"?"bg-amber-500/20 text-amber-300":g.badge==="PASS"?"bg-emerald-500/20 text-emerald-300":"bg-slate-700/80 text-slate-300"}`,children:g.badge})]},g.id)})}),w.jsxs("div",{className:"flex items-center gap-2",children:[w.jsxs("div",{className:"flex items-center bg-[#111827] border border-slate-800 rounded-md overflow-hidden",children:[w.jsx("button",{onClick:p,disabled:r.length===0,title:"Undo (Ctrl+Z)",className:"p-1.5 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer",children:w.jsx(u_,{className:"w-3.5 h-3.5"})}),w.jsx("div",{className:"w-px h-4 bg-slate-800"}),w.jsx("button",{onClick:m,disabled:o.length===0,title:"Redo (Ctrl+Y)",className:"p-1.5 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer",children:w.jsx(Jx,{className:"w-3.5 h-3.5"})})]}),w.jsx("button",{onClick:E,className:"flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-[#111827] hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors cursor-pointer",children:x?w.jsxs(w.Fragment,{children:[w.jsx(jx,{className:"w-3.5 h-3.5 text-emerald-400"}),w.jsx("span",{className:"text-emerald-300",children:"Saved"})]}):w.jsxs(w.Fragment,{children:[w.jsx(Q0,{className:"w-3.5 h-3.5 text-cyan-400"}),w.jsx("span",{children:"Save Snapshot"})]})}),w.jsxs("div",{className:`flex items-center gap-2 px-2.5 py-1 rounded-md border font-mono-telemetry text-xs font-bold ${M}`,children:[w.jsx("span",{className:"text-[10px] font-normal opacity-80",children:"READINESS"}),w.jsxs("span",{children:[t.score,"/100"]})]})]})]})},H_=()=>{const{mission:s,report:e,updateMission:t,updateHull:r,addZone:o}=Qi(),[l,u]=Nt.useState("zones"),d=[{id:"0g",label:"0g Micro"},{id:"1/6g",label:"1/6g Lunar"},{id:"3/8g",label:"3/8g Mars"}],h=[{id:"rigid_cylinder",label:"Rigid Cylinder"},{id:"inflatable",label:"Inflatable Hab"},{id:"surface_dome",label:"Surface Dome"}],p=(m,v)=>{m.dataTransfer.setData("application/x-habitat-zone",v),m.dataTransfer.effectAllowed="copy"};return w.jsxs("aside",{className:"w-72 shrink-0 bg-[#0D1320] border-r border-slate-800/90 flex flex-col h-full overflow-hidden select-none",children:[w.jsxs("div",{className:"p-2 border-b border-slate-800/80 grid grid-cols-2 gap-1 bg-[#090D16]/60",children:[w.jsxs("button",{onClick:()=>u("zones"),className:`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${l==="zones"?"bg-slate-800 text-cyan-300 border border-slate-700":"text-slate-400 hover:text-slate-200"}`,children:[w.jsx(Wx,{className:"w-3.5 h-3.5"}),"Zone Library"]}),w.jsxs("button",{onClick:()=>u("mission"),className:`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${l==="mission"?"bg-slate-800 text-cyan-300 border border-slate-700":"text-slate-400 hover:text-slate-200"}`,children:[w.jsx(a_,{className:"w-3.5 h-3.5"}),"Mission & Hull"]})]}),w.jsxs("div",{className:"grid grid-cols-3 gap-1.5 p-2.5 border-b border-slate-800/80 bg-[#111827]/70",children:[w.jsxs("div",{className:"bg-[#090D16] rounded p-1.5 border border-slate-800/70",children:[w.jsxs("div",{className:"text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1",children:[w.jsx(t_,{className:"w-2.5 h-2.5 text-cyan-400"}),"Gross Vol"]}),w.jsxs("div",{className:"text-xs font-bold font-mono-telemetry text-slate-100 mt-0.5",children:[e.grossVolumeM3," m³"]})]}),w.jsxs("div",{className:"bg-[#090D16] rounded p-1.5 border border-slate-800/70",children:[w.jsxs("div",{className:"text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1",children:[w.jsx(r_,{className:"w-2.5 h-2.5 text-amber-400"}),"Dry+Wet"]}),w.jsxs("div",{className:"text-xs font-bold font-mono-telemetry text-slate-100 mt-0.5",children:[(e.estimatedMassKg/1e3).toFixed(1)," t"]})]}),w.jsxs("div",{className:"bg-[#090D16] rounded p-1.5 border border-slate-800/70",children:[w.jsxs("div",{className:"text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1",children:[w.jsx($x,{className:"w-2.5 h-2.5 text-emerald-400"}),"Launch"]}),w.jsxs("div",{className:"text-xs font-bold font-mono-telemetry text-emerald-300 mt-0.5",children:["$",e.estimatedLaunchCostM,"M"]})]})]}),w.jsx("div",{className:"flex-1 overflow-y-auto p-3 space-y-3",children:l==="zones"?w.jsxs(w.Fragment,{children:[w.jsxs("div",{className:"text-[11px] text-slate-400 leading-snug",children:["Drag onto the 2D floorplan or click ",w.jsx("span",{className:"text-cyan-400 font-medium",children:"+"})," to place modules."]}),w.jsx("div",{className:"space-y-2",children:__.map(m=>w.jsxs("div",{draggable:!0,onDragStart:v=>p(v,m.type),className:"group bg-[#111827] hover:bg-slate-800/90 border border-slate-800 hover:border-slate-600 rounded-lg p-2.5 transition-all cursor-grab active:cursor-grabbing",children:[w.jsxs("div",{className:"flex items-start justify-between gap-2",children:[w.jsxs("div",{className:"flex items-center gap-2 min-w-0",children:[w.jsx("span",{className:"w-3 h-3 rounded-sm shrink-0 shadow-sm",style:{backgroundColor:m.color}}),w.jsx("span",{className:"text-xs font-semibold text-slate-100 truncate",children:m.label})]}),w.jsx("button",{onClick:()=>o(m.type),title:`Add ${m.label}`,className:"shrink-0 w-6 h-6 rounded bg-slate-800 group-hover:bg-cyan-500/20 text-slate-300 group-hover:text-cyan-300 border border-slate-700 group-hover:border-cyan-500/40 flex items-center justify-center transition-colors cursor-pointer",children:w.jsx(Kx,{className:"w-3.5 h-3.5"})})]}),w.jsx("p",{className:"text-[10px] text-slate-400 mt-1 leading-relaxed",children:m.description}),w.jsxs("div",{className:"flex items-center gap-2 mt-1.5 text-[10px] font-mono-telemetry text-slate-400",children:[w.jsxs("span",{children:[m.defaultWidth,"×",m.defaultHeight,"m"]}),m.noiseEmitDba>=60&&w.jsxs("span",{className:"inline-flex items-center gap-0.5 text-rose-300 bg-rose-500/15 px-1.5 py-0.5 rounded",children:[w.jsx(d_,{className:"w-2.5 h-2.5"}),m.noiseEmitDba," dBA"]}),m.isContaminationSource&&w.jsxs("span",{className:"inline-flex items-center gap-0.5 text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded",children:[w.jsx(cc,{className:"w-2.5 h-2.5"}),"Bio-Sep"]})]})]},m.type))})]}):w.jsxs("div",{className:"space-y-4",children:[w.jsxs("div",{className:"bg-[#111827] border border-slate-800 rounded-lg p-3 space-y-3",children:[w.jsx("div",{className:"text-[11px] font-semibold uppercase tracking-wider text-cyan-400",children:"Mission Profile"}),w.jsxs("div",{children:[w.jsxs("div",{className:"flex justify-between text-xs mb-1",children:[w.jsx("span",{className:"text-slate-300",children:"Crew Size"}),w.jsxs("span",{className:"font-mono-telemetry font-bold text-cyan-300",children:[s.crewSize," crew"]})]}),w.jsx("input",{type:"range",min:2,max:12,step:1,value:s.crewSize,onChange:m=>t({crewSize:Number(m.target.value)}),className:"w-full accent-cyan-500 cursor-pointer"})]}),w.jsxs("div",{children:[w.jsxs("div",{className:"flex justify-between text-xs mb-1",children:[w.jsx("span",{className:"text-slate-300",children:"Mission Duration"}),w.jsxs("span",{className:"font-mono-telemetry font-bold text-cyan-300",children:[s.durationDays," days"]})]}),w.jsx("input",{type:"range",min:30,max:1e3,step:10,value:s.durationDays,onChange:m=>t({durationDays:Number(m.target.value)}),className:"w-full accent-cyan-500 cursor-pointer"})]}),w.jsxs("div",{children:[w.jsx("div",{className:"text-xs text-slate-300 mb-1.5",children:"Gravity Regime"}),w.jsx("div",{className:"grid grid-cols-3 gap-1",children:d.map(m=>w.jsx("button",{onClick:()=>t({gravity:m.id}),className:`py-1.5 rounded text-[11px] font-medium border transition-colors cursor-pointer ${s.gravity===m.id?"bg-cyan-500/20 text-cyan-300 border-cyan-500/50":"bg-[#090D16] text-slate-400 border-slate-800 hover:text-slate-200"}`,children:m.label},m.id))})]})]}),w.jsxs("div",{className:"bg-[#111827] border border-slate-800 rounded-lg p-3 space-y-3",children:[w.jsx("div",{className:"text-[11px] font-semibold uppercase tracking-wider text-cyan-400",children:"Pressure Hull Geometry"}),w.jsx("div",{className:"space-y-1",children:h.map(m=>w.jsx("button",{onClick:()=>r({type:m.id}),className:`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${s.hull.type===m.id?"bg-cyan-500/20 text-cyan-300 border-cyan-500/50":"bg-[#090D16] text-slate-400 border-slate-800 hover:text-slate-200"}`,children:m.label},m.id))}),w.jsxs("div",{children:[w.jsxs("div",{className:"flex justify-between text-xs mb-1",children:[w.jsx("span",{className:"text-slate-300",children:"Hull Diameter"}),w.jsxs("span",{className:"font-mono-telemetry font-bold text-slate-100",children:[s.hull.diameter.toFixed(1)," m"]})]}),w.jsx("input",{type:"range",min:4.2,max:10,step:.2,value:s.hull.diameter,onChange:m=>r({diameter:Number(m.target.value)}),className:"w-full accent-cyan-500 cursor-pointer"})]}),s.hull.type!=="surface_dome"&&w.jsxs("div",{children:[w.jsxs("div",{className:"flex justify-between text-xs mb-1",children:[w.jsx("span",{className:"text-slate-300",children:"Hull Length"}),w.jsxs("span",{className:"font-mono-telemetry font-bold text-slate-100",children:[s.hull.length.toFixed(1)," m"]})]}),w.jsx("input",{type:"range",min:8,max:20,step:.5,value:s.hull.length,onChange:m=>r({length:Number(m.target.value)}),className:"w-full accent-cyan-500 cursor-pointer"})]}),w.jsxs("div",{children:[w.jsxs("div",{className:"flex justify-between text-xs mb-1.5",children:[w.jsx("span",{className:"text-slate-300",children:"Interior Decks"}),w.jsxs("span",{className:"font-mono-telemetry font-bold text-slate-100",children:[s.hull.decks," deck",s.hull.decks>1?"s":""]})]}),w.jsx("div",{className:"grid grid-cols-3 gap-1",children:[1,2,3].map(m=>w.jsxs("button",{onClick:()=>r({decks:m}),className:`py-1 rounded text-xs font-mono-telemetry border transition-colors cursor-pointer ${s.hull.decks===m?"bg-cyan-500/20 text-cyan-300 border-cyan-500/50":"bg-[#090D16] text-slate-400 border-slate-800 hover:text-slate-200"}`,children:[m,"D"]},m))})]})]})]})})]})},It=56,lg=({missionOverride:s,zonesOverride:e,reportOverride:t,deckOverride:r,readonly:o=!1,compact:l=!1})=>{const u=Qi(),d=s??u.mission,h=e??u.zones,p=t??u.report,m=r??u.activeDeck,{hull:v}=d,{width:x,depth:y,wall:E}=Si(v),M=sg(v),S=Nt.useRef(null),[g,C]=Nt.useState(1),[A,T]=Nt.useState({x:0,y:0}),[U,L]=Nt.useState(null),I=Nt.useMemo(()=>h.filter(j=>j.deck===m),[h,m]),O=1.25,R=(x+O*2)*It,P=(y+O*2)*It,F=(j,te)=>{const ge=S.current;if(!ge)return{x:0,y:0};const ye=ge.getBoundingClientRect(),Ce=R/g/ye.width,st=P/g/ye.height,Ze=Math.max(Ce,st),ut=ye.width*Ze,W=ye.height*Ze,Ft=(R-ut)/2-A.x,ot=(P-W)/2-A.y,ht=Ft+(j-ye.left)*Ze,We=ot+(te-ye.top)*Ze;return{x:ht/It-O,y:We/It-O}},ne=j=>{if(o)return;j.preventDefault();const te=j.deltaY<0?1.12:.89;C(ge=>Math.max(.55,Math.min(2.8,Number((ge*te).toFixed(2)))))},q=j=>{o||j.button===0&&(u.selectZone(null),L({mode:"pan",startX:j.clientX,startY:j.clientY,origPanX:A.x,origPanY:A.y}))},V=(j,te)=>{if(o)return;j.stopPropagation(),u.selectZone(te.id);const ge=F(j.clientX,j.clientY);L({mode:"move",zoneId:te.id,offsetX:ge.x-te.x,offsetY:ge.y-te.y,moved:!1})},J=(j,te)=>{if(o)return;j.stopPropagation();const ge=F(j.clientX,j.clientY);L({mode:"resize",zoneId:te.id,startX:ge.x,startY:ge.y,origW:te.width,origH:te.height})},ee=j=>{if(!U||o)return;if(U.mode==="pan"){const ge=(j.clientX-U.startX)/g,ye=(j.clientY-U.startY)/g;T({x:U.origPanX+ge,y:U.origPanY+ye});return}const te=F(j.clientX,j.clientY);if(U.mode==="move"){const ge=St(te.x-U.offsetX),ye=St(te.y-U.offsetY),Ce=Math.max(-.5,Math.min(x,ge)),st=Math.max(-.5,Math.min(y,ye));u.moveZone(U.zoneId,Ce,st,!U.moved),U.moved||L({...U,moved:!0})}else if(U.mode==="resize"){const ge=te.x-U.startX,ye=te.y-U.startY;u.resizeZone(U.zoneId,U.origW+ge,U.origH+ye,void 0,void 0,!1)}},ae=()=>{L(null)},H=j=>{if(o)return;j.preventDefault();const te=j.dataTransfer.getData("application/x-habitat-zone");if(!te||!gn[te])return;const ge=gn[te],ye=F(j.clientX,j.clientY);u.addZone(te,St(ye.x-ge.defaultWidth/2),St(ye.y-ge.defaultHeight/2))},le=o?null:I.find(j=>j.id===u.selectedZoneId)??null,ie=Nt.useMemo(()=>{const j=new Map;for(const te of p.violations)if(te.severity!=="PASS")for(const ge of te.affectedZoneIds)(!j.get(ge)||te.severity==="CRITICAL")&&j.set(ge,te.severity);return j},[p.violations]),B=p.egress.airlockPaths.filter(j=>j.deck===m&&j.reachable&&j.points.length>=2),ce=p.egress.shelterPaths.filter(j=>j.deck===m&&j.reachable&&j.points.length>=2),se=p.egress.bottleneckPoints.filter(j=>j.deck===m),K=`${(R-R/g)/2-A.x} ${(P-P/g)/2-A.y} ${R/g} ${P/g}`,oe=j=>(j+O)*It;return w.jsxs("div",{className:"relative w-full h-full bg-[#090D16] flex flex-col overflow-hidden select-none",children:[!l&&w.jsxs("div",{className:"absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none",children:[w.jsxs("div",{className:"flex items-center gap-1.5 pointer-events-auto",children:[w.jsxs("span",{className:"px-2 py-1 rounded bg-[#111827]/95 border border-slate-700/80 text-[10px] font-mono-telemetry uppercase tracking-wider text-cyan-300 shadow",children:["2D CAD • ",x.toFixed(1),"m × ",y.toFixed(1),"m • 0.25m SNAP"]}),v.decks>1&&!o&&w.jsx("div",{className:"flex items-center bg-[#111827]/95 border border-slate-700/80 rounded p-0.5 gap-0.5 shadow",children:Array.from({length:v.decks}).map((j,te)=>w.jsxs("button",{onClick:()=>u.setActiveDeck(te),className:`px-2 py-0.5 rounded text-[10px] font-mono-telemetry cursor-pointer transition-colors ${m===te?"bg-cyan-500/25 text-cyan-200":"text-slate-400 hover:text-slate-200"}`,children:["Deck ",te+1]},te))})]}),!o&&w.jsxs("div",{className:"flex items-center gap-1.5 pointer-events-auto",children:[w.jsxs("button",{onClick:u.toggleEgressOverlay,className:`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors cursor-pointer ${u.showEgressOverlay?"bg-emerald-500/15 text-emerald-300 border-emerald-500/40":"bg-[#111827]/90 text-slate-400 border-slate-700/80"}`,children:[w.jsx(rg,{className:"w-3 h-3"}),"A* Egress"]}),w.jsxs("button",{onClick:u.toggleHazardOverlay,className:`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border transition-colors cursor-pointer ${u.showHazardOverlay?"bg-rose-500/15 text-rose-300 border-rose-500/40":"bg-[#111827]/90 text-slate-400 border-slate-700/80"}`,children:[w.jsx(cc,{className:"w-3 h-3"}),"Hazards"]}),w.jsxs("div",{className:"flex items-center bg-[#111827]/95 border border-slate-700/80 rounded overflow-hidden",children:[w.jsx("button",{onClick:()=>C(j=>Math.min(2.8,Number((j*1.15).toFixed(2)))),className:"p-1 text-slate-300 hover:bg-slate-800 cursor-pointer",title:"Zoom In",children:w.jsx(f_,{className:"w-3.5 h-3.5"})}),w.jsx("button",{onClick:()=>C(j=>Math.max(.55,Number((j*.85).toFixed(2)))),className:"p-1 text-slate-300 hover:bg-slate-800 cursor-pointer",title:"Zoom Out",children:w.jsx(p_,{className:"w-3.5 h-3.5"})}),w.jsx("button",{onClick:()=>{C(1),T({x:0,y:0})},className:"p-1 text-slate-300 hover:bg-slate-800 cursor-pointer",title:"Fit Hull",children:w.jsx(qx,{className:"w-3.5 h-3.5"})})]})]})]}),le&&!o&&!l&&w.jsxs("div",{className:"absolute bottom-2.5 left-2.5 z-10 flex items-center gap-2 bg-[#111827]/95 border border-cyan-500/40 rounded-lg px-3 py-1.5 shadow-lg",children:[w.jsx("span",{className:"w-2.5 h-2.5 rounded-sm",style:{backgroundColor:gn[le.type].color}}),w.jsx("span",{className:"text-xs font-semibold text-slate-100",children:le.label}),w.jsxs("span",{className:"text-[10px] font-mono-telemetry text-slate-400",children:["(",le.x.toFixed(2),", ",le.y.toFixed(2),") • ",le.width.toFixed(2),"×",le.height.toFixed(2),"m • ",(le.width*le.height*le.zHeight).toFixed(1)," m³"]}),w.jsx("div",{className:"h-3.5 w-px bg-slate-700"}),w.jsxs("button",{onClick:()=>u.rotateZone(le.id),className:"flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-cyan-300 cursor-pointer",title:"Rotate 90°",children:[w.jsx(i_,{className:"w-3 h-3"}),"90°"]}),w.jsxs("button",{onClick:()=>u.deleteZone(le.id),className:"flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/15 hover:bg-rose-500/25 text-[11px] text-rose-300 cursor-pointer",title:"Delete Zone",children:[w.jsx(c_,{className:"w-3 h-3"}),"Delete"]})]}),w.jsxs("svg",{ref:S,viewBox:K,onWheel:ne,onMouseDown:q,onMouseMove:ee,onMouseUp:ae,onMouseLeave:ae,onDragOver:j=>j.preventDefault(),onDrop:H,className:"w-full h-full cursor-crosshair",children:[w.jsxs("defs",{children:[w.jsx("pattern",{id:`grid-minor-${l?"c":"m"}`,width:It*.25,height:It*.25,patternUnits:"userSpaceOnUse",children:w.jsx("path",{d:`M ${It*.25} 0 L 0 0 0 ${It*.25}`,fill:"none",stroke:"#1e293b",strokeWidth:"0.6",strokeOpacity:"0.45"})}),w.jsxs("pattern",{id:`grid-major-${l?"c":"m"}`,width:It,height:It,patternUnits:"userSpaceOnUse",children:[w.jsx("rect",{width:It,height:It,fill:`url(#grid-minor-${l?"c":"m"})`}),w.jsx("path",{d:`M ${It} 0 L 0 0 0 ${It}`,fill:"none",stroke:"#334155",strokeWidth:"1",strokeOpacity:"0.55"})]})]}),w.jsx("rect",{x:-R,y:-P,width:R*3,height:P*3,fill:`url(#grid-major-${l?"c":"m"})`}),v.type==="surface_dome"?w.jsxs("g",{children:[w.jsx("circle",{cx:oe(x/2),cy:oe(y/2),r:x/2*It,fill:"#0f172a",fillOpacity:"0.88",stroke:"#38bdf8",strokeWidth:"3",strokeOpacity:"0.65"}),w.jsx("circle",{cx:oe(x/2),cy:oe(y/2),r:(x/2-E)*It,fill:"#0b1220",stroke:"#475569",strokeWidth:"1.5",strokeDasharray:"6 4"})]}):w.jsxs("g",{children:[w.jsx("rect",{x:oe(0),y:oe(0),width:x*It,height:y*It,rx:M*It,ry:M*It,fill:"#0f172a",fillOpacity:"0.9",stroke:v.type==="inflatable"?"#a855f7":"#38bdf8",strokeWidth:"3.5",strokeOpacity:"0.7"}),w.jsx("rect",{x:oe(E),y:oe(E),width:(x-E*2)*It,height:(y-E*2)*It,rx:Math.max(0,M-E)*It,ry:Math.max(0,M-E)*It,fill:"#0b1220",stroke:"#475569",strokeWidth:"1.25",strokeDasharray:"6 4"})]}),w.jsxs("g",{className:"font-mono-telemetry",fill:"#64748b",fontSize:"11",children:[Array.from({length:Math.floor(x)+1}).map((j,te)=>w.jsxs("text",{x:oe(te),y:oe(-.35),textAnchor:"middle",children:[te,"m"]},`rx-${te}`)),Array.from({length:Math.floor(y)+1}).map((j,te)=>w.jsxs("text",{x:oe(-.45),y:oe(te)+4,textAnchor:"end",children:[te,"m"]},`ry-${te}`))]}),(u.showHazardOverlay||o)&&w.jsxs("g",{pointerEvents:"none",children:[p.acousticPairs.filter(j=>j.violates).map(j=>{const te=I.find(ut=>ut.id===j.sourceId),ge=I.find(ut=>ut.id===j.targetId);if(!te||!ge)return null;const ye=oe(te.x+te.width/2),Ce=oe(te.y+te.height/2),st=oe(ge.x+ge.width/2),Ze=oe(ge.y+ge.height/2);return w.jsxs("g",{children:[w.jsx("circle",{cx:ye,cy:Ce,r:2.4*It,fill:"#f43f5e",fillOpacity:"0.08",stroke:"#f43f5e",strokeWidth:"1.2",strokeDasharray:"4 4",strokeOpacity:"0.45"}),w.jsx("line",{x1:ye,y1:Ce,x2:st,y2:Ze,stroke:"#fb7185",strokeWidth:"2",strokeDasharray:"5 3"}),w.jsx("rect",{x:(ye+st)/2-28,y:(Ce+Ze)/2-10,width:"56",height:"18",rx:"4",fill:"#881337",stroke:"#fb7185",strokeWidth:"1"}),w.jsxs("text",{x:(ye+st)/2,y:(Ce+Ze)/2+3,textAnchor:"middle",fill:"#ffe4e6",fontSize:"10",className:"font-mono-telemetry font-bold",children:[j.receivedDba," dBA"]})]},`ac-${j.sourceId}-${j.targetId}`)}),p.contaminationPairs.filter(j=>j.violates).map(j=>{const te=I.find(ut=>ut.id===j.hygieneId),ge=I.find(ut=>ut.id===j.targetId);if(!te||!ge)return null;const ye=oe(te.x+te.width/2),Ce=oe(te.y+te.height/2),st=oe(ge.x+ge.width/2),Ze=oe(ge.y+ge.height/2);return w.jsxs("g",{children:[w.jsx("circle",{cx:ye,cy:Ce,r:3*It,fill:"#f59e0b",fillOpacity:"0.07",stroke:"#f59e0b",strokeWidth:"1.2",strokeDasharray:"6 4",strokeOpacity:"0.45"}),w.jsx("line",{x1:ye,y1:Ce,x2:st,y2:Ze,stroke:"#fbbf24",strokeWidth:"2",strokeDasharray:"4 3"}),w.jsx("rect",{x:(ye+st)/2-26,y:(Ce+Ze)/2-10,width:"52",height:"18",rx:"4",fill:"#78350f",stroke:"#fbbf24",strokeWidth:"1"}),w.jsxs("text",{x:(ye+st)/2,y:(Ce+Ze)/2+3,textAnchor:"middle",fill:"#fef3c7",fontSize:"10",className:"font-mono-telemetry font-bold",children:[j.distanceM.toFixed(1),"m!"]})]},`ct-${j.hygieneId}-${j.targetId}`)})]}),I.map(j=>{const te=gn[j.type],ge=!o&&u.selectedZoneId===j.id,ye=!o&&u.highlightedZoneIds.includes(j.id),Ce=ie.get(j.id),st=(j.width*j.height).toFixed(1),Ze=(j.width*j.height*j.zHeight).toFixed(1),ut=oe(j.x),W=oe(j.y),Ft=j.width*It,ot=j.height*It,ht=ge?"#22d3ee":ye?"#facc15":Ce==="CRITICAL"?"#f43f5e":Ce==="WARNING"?"#f59e0b":te.accentColor;return w.jsxs("g",{onMouseDown:We=>V(We,j),className:o?"":"cursor-move",children:[j.type==="storm_shelter"&&w.jsx("rect",{x:ut-4,y:W-4,width:Ft+8,height:ot+8,rx:"7",fill:"none",stroke:"#38bdf8",strokeWidth:"2.5",strokeOpacity:"0.45",strokeDasharray:"4 3"}),w.jsx("rect",{x:ut,y:W,width:Ft,height:ot,rx:"4",fill:te.color,fillOpacity:ge?.34:.22,stroke:ht,strokeWidth:ge||ye?2.6:Ce?2.2:1.5}),w.jsx("rect",{x:ut+1,y:W+1,width:Math.max(0,Ft-2),height:"5",rx:"2",fill:te.color,fillOpacity:"0.85"}),w.jsx("text",{x:ut+Ft/2,y:W+ot/2-4,textAnchor:"middle",fill:"#f8fafc",fontSize:Ft<95?"10":"11.5",fontWeight:"700",pointerEvents:"none",children:Ft<95?te.shortLabel:j.label.length>20?`${j.label.slice(0,18)}…`:j.label}),w.jsxs("text",{x:ut+Ft/2,y:W+ot/2+12,textAnchor:"middle",fill:"#cbd5e1",fontSize:"9.5",className:"font-mono-telemetry",pointerEvents:"none",children:[st,"m² • ",Ze,"m³"]}),!o&&w.jsx("rect",{x:ut+Ft-10,y:W+ot-10,width:"10",height:"10",rx:"2",fill:ge?"#22d3ee":"#94a3b8",fillOpacity:ge?.95:.55,className:"cursor-nwse-resize",onMouseDown:We=>J(We,j)})]},j.id)}),(u.showEgressOverlay||o)&&w.jsxs("g",{pointerEvents:"none",children:[ce.map(j=>w.jsx("polyline",{points:j.points.map(te=>`${oe(te.x)},${oe(te.y)}`).join(" "),fill:"none",stroke:"#38bdf8",strokeWidth:"2.2",strokeOpacity:"0.65",strokeDasharray:"6 6",className:"animate-egress-flow"},`sh-${j.fromZoneId}`)),B.map(j=>w.jsx("polyline",{points:j.points.map(te=>`${oe(te.x)},${oe(te.y)}`).join(" "),fill:"none",stroke:"#10b981",strokeWidth:"3",strokeOpacity:"0.9",strokeDasharray:"8 6",className:"animate-egress-flow"},`al-${j.fromZoneId}`)),se.map((j,te)=>w.jsxs("g",{transform:`translate(${oe(j.x)}, ${oe(j.y)})`,children:[w.jsx("polygon",{points:"0,-9 9,0 0,9 -9,0",fill:"#f59e0b",stroke:"#fef3c7",strokeWidth:"1.5"}),w.jsx("text",{y:"3.5",textAnchor:"middle",fill:"#090D16",fontSize:"10",fontWeight:"800",children:"!"})]},`bn-${te}`))]})]})]})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const kh="171",to={ROTATE:0,DOLLY:1,PAN:2},Js={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},V_=0,zm=1,G_=2,cg=1,W_=2,Yi=3,Lr=0,Gn=1,xi=2,Pr=0,no=1,Bm=2,Hm=3,Vm=4,j_=5,rs=100,X_=101,$_=102,Y_=103,q_=104,Z_=200,K_=201,Q_=202,J_=203,Vd=204,Gd=205,ey=206,ty=207,ny=208,iy=209,ry=210,sy=211,oy=212,ay=213,ly=214,Wd=0,jd=1,Xd=2,so=3,$d=4,Yd=5,qd=6,Zd=7,ug=0,cy=1,uy=2,Nr=0,dy=1,hy=2,fy=3,py=4,my=5,gy=6,vy=7,dg=300,oo=301,ao=302,Kd=303,Qd=304,pc=306,Jd=1e3,os=1001,eh=1002,yi=1003,xy=1004,yl=1005,Ri=1006,rd=1007,as=1008,Ji=1009,hg=1010,fg=1011,la=1012,Oh=1013,ls=1014,qi=1015,ca=1016,Fh=1017,zh=1018,lo=1020,pg=35902,mg=1021,gg=1022,_i=1023,vg=1024,xg=1025,io=1026,co=1027,_g=1028,Bh=1029,yg=1030,Hh=1031,Vh=1033,ql=33776,Zl=33777,Kl=33778,Ql=33779,th=35840,nh=35841,ih=35842,rh=35843,sh=36196,oh=37492,ah=37496,lh=37808,ch=37809,uh=37810,dh=37811,hh=37812,fh=37813,ph=37814,mh=37815,gh=37816,vh=37817,xh=37818,_h=37819,yh=37820,Sh=37821,Jl=36492,Mh=36494,Eh=36495,Sg=36283,wh=36284,Th=36285,bh=36286,_y=3200,yy=3201,Mg=0,Sy=1,Rr="",si="srgb",uo="srgb-linear",nc="linear",kt="srgb",Os=7680,Gm=519,My=512,Ey=513,wy=514,Eg=515,Ty=516,by=517,Ay=518,Cy=519,Wm=35044,jm="300 es",Zi=2e3,ic=2001;class ds{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const o=this._listeners[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const o=r.slice(0);for(let l=0,u=o.length;l<u;l++)o[l].call(this,e);e.target=null}}}const wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],na=Math.PI/180,Ah=180/Math.PI;function ua(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(wn[s&255]+wn[s>>8&255]+wn[s>>16&255]+wn[s>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[t&63|128]+wn[t>>8&255]+"-"+wn[t>>16&255]+wn[t>>24&255]+wn[r&255]+wn[r>>8&255]+wn[r>>16&255]+wn[r>>24&255]).toLowerCase()}function pt(s,e,t){return Math.max(e,Math.min(t,s))}function Ry(s,e){return(s%e+e)%e}function sd(s,e,t){return(1-t)*s+t*e}function $o(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Hn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Py={DEG2RAD:na};class Ue{constructor(e=0,t=0){Ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,o=e.elements;return this.x=o[0]*t+o[3]*r+o[6],this.y=o[1]*t+o[4]*r+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(pt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(pt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),o=Math.sin(t),l=this.x-e.x,u=this.y-e.y;return this.x=l*r-u*o+e.x,this.y=l*o+u*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ft{constructor(e,t,r,o,l,u,d,h,p){ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,u,d,h,p)}set(e,t,r,o,l,u,d,h,p){const m=this.elements;return m[0]=e,m[1]=o,m[2]=d,m[3]=t,m[4]=l,m[5]=h,m[6]=r,m[7]=u,m[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,u=r[0],d=r[3],h=r[6],p=r[1],m=r[4],v=r[7],x=r[2],y=r[5],E=r[8],M=o[0],S=o[3],g=o[6],C=o[1],A=o[4],T=o[7],U=o[2],L=o[5],I=o[8];return l[0]=u*M+d*C+h*U,l[3]=u*S+d*A+h*L,l[6]=u*g+d*T+h*I,l[1]=p*M+m*C+v*U,l[4]=p*S+m*A+v*L,l[7]=p*g+m*T+v*I,l[2]=x*M+y*C+E*U,l[5]=x*S+y*A+E*L,l[8]=x*g+y*T+E*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],u=e[4],d=e[5],h=e[6],p=e[7],m=e[8];return t*u*m-t*d*p-r*l*m+r*d*h+o*l*p-o*u*h}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],u=e[4],d=e[5],h=e[6],p=e[7],m=e[8],v=m*u-d*p,x=d*h-m*l,y=p*l-u*h,E=t*v+r*x+o*y;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/E;return e[0]=v*M,e[1]=(o*p-m*r)*M,e[2]=(d*r-o*u)*M,e[3]=x*M,e[4]=(m*t-o*h)*M,e[5]=(o*l-d*t)*M,e[6]=y*M,e[7]=(r*h-p*t)*M,e[8]=(u*t-r*l)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,o,l,u,d){const h=Math.cos(l),p=Math.sin(l);return this.set(r*h,r*p,-r*(h*u+p*d)+u+e,-o*p,o*h,-o*(-p*u+h*d)+d+t,0,0,1),this}scale(e,t){return this.premultiply(od.makeScale(e,t)),this}rotate(e){return this.premultiply(od.makeRotation(-e)),this}translate(e,t){return this.premultiply(od.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<9;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const od=new ft;function wg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function rc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Ny(){const s=rc("canvas");return s.style.display="block",s}const Xm={};function Ks(s){s in Xm||(Xm[s]=!0,console.warn(s))}function Dy(s,e,t){return new Promise(function(r,o){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:o();break;case s.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:r()}}setTimeout(l,t)})}function Ly(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Iy(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const $m=new ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ym=new ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Uy(){const s={enabled:!0,workingColorSpace:uo,spaces:{},convert:function(o,l,u){return this.enabled===!1||l===u||!l||!u||(this.spaces[l].transfer===kt&&(o.r=Ki(o.r),o.g=Ki(o.g),o.b=Ki(o.b)),this.spaces[l].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[l].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===kt&&(o.r=ro(o.r),o.g=ro(o.g),o.b=ro(o.b))),o},fromWorkingColorSpace:function(o,l){return this.convert(o,this.workingColorSpace,l)},toWorkingColorSpace:function(o,l){return this.convert(o,l,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Rr?nc:this.spaces[o].transfer},getLuminanceCoefficients:function(o,l=this.workingColorSpace){return o.fromArray(this.spaces[l].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,l,u){return o.copy(this.spaces[l].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[uo]:{primaries:e,whitePoint:r,transfer:nc,toXYZ:$m,fromXYZ:Ym,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:si},outputColorSpaceConfig:{drawingBufferColorSpace:si}},[si]:{primaries:e,whitePoint:r,transfer:kt,toXYZ:$m,fromXYZ:Ym,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:si}}}),s}const Rt=Uy();function Ki(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ro(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Fs;class ky{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Fs===void 0&&(Fs=rc("canvas")),Fs.width=e.width,Fs.height=e.height;const r=Fs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Fs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=rc("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const o=r.getImageData(0,0,e.width,e.height),l=o.data;for(let u=0;u<l.length;u++)l[u]=Ki(l[u]/255)*255;return r.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(Ki(t[r]/255)*255):t[r]=Ki(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Oy=0;class Tg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Oy++}),this.uuid=ua(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let u=0,d=o.length;u<d;u++)o[u].isDataTexture?l.push(ad(o[u].image)):l.push(ad(o[u]))}else l=ad(o);r.url=l}return t||(e.images[this.uuid]=r),r}}function ad(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ky.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fy=0;class Wn extends ds{constructor(e=Wn.DEFAULT_IMAGE,t=Wn.DEFAULT_MAPPING,r=os,o=os,l=Ri,u=as,d=_i,h=Ji,p=Wn.DEFAULT_ANISOTROPY,m=Rr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fy++}),this.uuid=ua(),this.name="",this.source=new Tg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=o,this.magFilter=l,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=h,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==dg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jd:e.x=e.x-Math.floor(e.x);break;case os:e.x=e.x<0?0:1;break;case eh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Jd:e.y=e.y-Math.floor(e.y);break;case os:e.y=e.y<0?0:1;break;case eh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wn.DEFAULT_IMAGE=null;Wn.DEFAULT_MAPPING=dg;Wn.DEFAULT_ANISOTROPY=1;class Kt{constructor(e=0,t=0,r=0,o=1){Kt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,o){return this.x=e,this.y=t,this.z=r,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=this.w,u=e.elements;return this.x=u[0]*t+u[4]*r+u[8]*o+u[12]*l,this.y=u[1]*t+u[5]*r+u[9]*o+u[13]*l,this.z=u[2]*t+u[6]*r+u[10]*o+u[14]*l,this.w=u[3]*t+u[7]*r+u[11]*o+u[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,o,l;const h=e.elements,p=h[0],m=h[4],v=h[8],x=h[1],y=h[5],E=h[9],M=h[2],S=h[6],g=h[10];if(Math.abs(m-x)<.01&&Math.abs(v-M)<.01&&Math.abs(E-S)<.01){if(Math.abs(m+x)<.1&&Math.abs(v+M)<.1&&Math.abs(E+S)<.1&&Math.abs(p+y+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(p+1)/2,T=(y+1)/2,U=(g+1)/2,L=(m+x)/4,I=(v+M)/4,O=(E+S)/4;return A>T&&A>U?A<.01?(r=0,o=.707106781,l=.707106781):(r=Math.sqrt(A),o=L/r,l=I/r):T>U?T<.01?(r=.707106781,o=0,l=.707106781):(o=Math.sqrt(T),r=L/o,l=O/o):U<.01?(r=.707106781,o=.707106781,l=0):(l=Math.sqrt(U),r=I/l,o=O/l),this.set(r,o,l,t),this}let C=Math.sqrt((S-E)*(S-E)+(v-M)*(v-M)+(x-m)*(x-m));return Math.abs(C)<.001&&(C=1),this.x=(S-E)/C,this.y=(v-M)/C,this.z=(x-m)/C,this.w=Math.acos((p+y+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(pt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zy extends ds{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Kt(0,0,e,t),this.scissorTest=!1,this.viewport=new Kt(0,0,e,t);const o={width:e,height:t,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ri,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const l=new Wn(o,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);l.flipY=!1,l.generateMipmaps=r.generateMipmaps,l.internalFormat=r.internalFormat,this.textures=[];const u=r.count;for(let d=0;d<u;d++)this.textures[d]=l.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let o=0,l=this.textures.length;o<l;o++)this.textures[o].image.width=e,this.textures[o].image.height=t,this.textures[o].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,o=e.textures.length;r<o;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Tg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cs extends zy{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class bg extends Wn{constructor(e=null,t=1,r=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=yi,this.minFilter=yi,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class By extends Wn{constructor(e=null,t=1,r=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=yi,this.minFilter=yi,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class us{constructor(e=0,t=0,r=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=o}static slerpFlat(e,t,r,o,l,u,d){let h=r[o+0],p=r[o+1],m=r[o+2],v=r[o+3];const x=l[u+0],y=l[u+1],E=l[u+2],M=l[u+3];if(d===0){e[t+0]=h,e[t+1]=p,e[t+2]=m,e[t+3]=v;return}if(d===1){e[t+0]=x,e[t+1]=y,e[t+2]=E,e[t+3]=M;return}if(v!==M||h!==x||p!==y||m!==E){let S=1-d;const g=h*x+p*y+m*E+v*M,C=g>=0?1:-1,A=1-g*g;if(A>Number.EPSILON){const U=Math.sqrt(A),L=Math.atan2(U,g*C);S=Math.sin(S*L)/U,d=Math.sin(d*L)/U}const T=d*C;if(h=h*S+x*T,p=p*S+y*T,m=m*S+E*T,v=v*S+M*T,S===1-d){const U=1/Math.sqrt(h*h+p*p+m*m+v*v);h*=U,p*=U,m*=U,v*=U}}e[t]=h,e[t+1]=p,e[t+2]=m,e[t+3]=v}static multiplyQuaternionsFlat(e,t,r,o,l,u){const d=r[o],h=r[o+1],p=r[o+2],m=r[o+3],v=l[u],x=l[u+1],y=l[u+2],E=l[u+3];return e[t]=d*E+m*v+h*y-p*x,e[t+1]=h*E+m*x+p*v-d*y,e[t+2]=p*E+m*y+d*x-h*v,e[t+3]=m*E-d*v-h*x-p*y,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,o){return this._x=e,this._y=t,this._z=r,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,o=e._y,l=e._z,u=e._order,d=Math.cos,h=Math.sin,p=d(r/2),m=d(o/2),v=d(l/2),x=h(r/2),y=h(o/2),E=h(l/2);switch(u){case"XYZ":this._x=x*m*v+p*y*E,this._y=p*y*v-x*m*E,this._z=p*m*E+x*y*v,this._w=p*m*v-x*y*E;break;case"YXZ":this._x=x*m*v+p*y*E,this._y=p*y*v-x*m*E,this._z=p*m*E-x*y*v,this._w=p*m*v+x*y*E;break;case"ZXY":this._x=x*m*v-p*y*E,this._y=p*y*v+x*m*E,this._z=p*m*E+x*y*v,this._w=p*m*v-x*y*E;break;case"ZYX":this._x=x*m*v-p*y*E,this._y=p*y*v+x*m*E,this._z=p*m*E-x*y*v,this._w=p*m*v+x*y*E;break;case"YZX":this._x=x*m*v+p*y*E,this._y=p*y*v+x*m*E,this._z=p*m*E-x*y*v,this._w=p*m*v-x*y*E;break;case"XZY":this._x=x*m*v-p*y*E,this._y=p*y*v-x*m*E,this._z=p*m*E+x*y*v,this._w=p*m*v+x*y*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,o=Math.sin(r);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],o=t[4],l=t[8],u=t[1],d=t[5],h=t[9],p=t[2],m=t[6],v=t[10],x=r+d+v;if(x>0){const y=.5/Math.sqrt(x+1);this._w=.25/y,this._x=(m-h)*y,this._y=(l-p)*y,this._z=(u-o)*y}else if(r>d&&r>v){const y=2*Math.sqrt(1+r-d-v);this._w=(m-h)/y,this._x=.25*y,this._y=(o+u)/y,this._z=(l+p)/y}else if(d>v){const y=2*Math.sqrt(1+d-r-v);this._w=(l-p)/y,this._x=(o+u)/y,this._y=.25*y,this._z=(h+m)/y}else{const y=2*Math.sqrt(1+v-r-d);this._w=(u-o)/y,this._x=(l+p)/y,this._y=(h+m)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const o=Math.min(1,t/r);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,o=e._y,l=e._z,u=e._w,d=t._x,h=t._y,p=t._z,m=t._w;return this._x=r*m+u*d+o*p-l*h,this._y=o*m+u*h+l*d-r*p,this._z=l*m+u*p+r*h-o*d,this._w=u*m-r*d-o*h-l*p,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,o=this._y,l=this._z,u=this._w;let d=u*e._w+r*e._x+o*e._y+l*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=u,this._x=r,this._y=o,this._z=l,this;const h=1-d*d;if(h<=Number.EPSILON){const y=1-t;return this._w=y*u+t*this._w,this._x=y*r+t*this._x,this._y=y*o+t*this._y,this._z=y*l+t*this._z,this.normalize(),this}const p=Math.sqrt(h),m=Math.atan2(p,d),v=Math.sin((1-t)*m)/p,x=Math.sin(t*m)/p;return this._w=u*v+this._w*x,this._x=r*v+this._x*x,this._y=o*v+this._y*x,this._z=l*v+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),o=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(o*Math.sin(e),o*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{constructor(e=0,t=0,r=0){X.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*o,this.y=l[1]*t+l[4]*r+l[7]*o,this.z=l[2]*t+l[5]*r+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=e.elements,u=1/(l[3]*t+l[7]*r+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*o+l[12])*u,this.y=(l[1]*t+l[5]*r+l[9]*o+l[13])*u,this.z=(l[2]*t+l[6]*r+l[10]*o+l[14])*u,this}applyQuaternion(e){const t=this.x,r=this.y,o=this.z,l=e.x,u=e.y,d=e.z,h=e.w,p=2*(u*o-d*r),m=2*(d*t-l*o),v=2*(l*r-u*t);return this.x=t+h*p+u*v-d*m,this.y=r+h*m+d*p-l*v,this.z=o+h*v+l*m-u*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*o,this.y=l[1]*t+l[5]*r+l[9]*o,this.z=l[2]*t+l[6]*r+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(pt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,o=e.y,l=e.z,u=t.x,d=t.y,h=t.z;return this.x=o*h-l*d,this.y=l*u-r*h,this.z=r*d-o*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return ld.copy(this).projectOnVector(e),this.sub(ld)}reflect(e){return this.sub(ld.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(pt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,o=this.z-e.z;return t*t+r*r+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const o=Math.sin(t)*e;return this.x=o*Math.sin(r),this.y=Math.cos(t)*e,this.z=o*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ld=new X,qm=new us;class da{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(mi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(mi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=mi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,d=l.count;u<d;u++)e.isMesh===!0?e.getVertexPosition(u,mi):mi.fromBufferAttribute(l,u),mi.applyMatrix4(e.matrixWorld),this.expandByPoint(mi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sl.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Sl.copy(r.boundingBox)),Sl.applyMatrix4(e.matrixWorld),this.union(Sl)}const o=e.children;for(let l=0,u=o.length;l<u;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mi),mi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yo),Ml.subVectors(this.max,Yo),zs.subVectors(e.a,Yo),Bs.subVectors(e.b,Yo),Hs.subVectors(e.c,Yo),Sr.subVectors(Bs,zs),Mr.subVectors(Hs,Bs),Kr.subVectors(zs,Hs);let t=[0,-Sr.z,Sr.y,0,-Mr.z,Mr.y,0,-Kr.z,Kr.y,Sr.z,0,-Sr.x,Mr.z,0,-Mr.x,Kr.z,0,-Kr.x,-Sr.y,Sr.x,0,-Mr.y,Mr.x,0,-Kr.y,Kr.x,0];return!cd(t,zs,Bs,Hs,Ml)||(t=[1,0,0,0,1,0,0,0,1],!cd(t,zs,Bs,Hs,Ml))?!1:(El.crossVectors(Sr,Mr),t=[El.x,El.y,El.z],cd(t,zs,Bs,Hs,Ml))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Gi=[new X,new X,new X,new X,new X,new X,new X,new X],mi=new X,Sl=new da,zs=new X,Bs=new X,Hs=new X,Sr=new X,Mr=new X,Kr=new X,Yo=new X,Ml=new X,El=new X,Qr=new X;function cd(s,e,t,r,o){for(let l=0,u=s.length-3;l<=u;l+=3){Qr.fromArray(s,l);const d=o.x*Math.abs(Qr.x)+o.y*Math.abs(Qr.y)+o.z*Math.abs(Qr.z),h=e.dot(Qr),p=t.dot(Qr),m=r.dot(Qr);if(Math.max(-Math.max(h,p,m),Math.min(h,p,m))>d)return!1}return!0}const Hy=new da,qo=new X,ud=new X;class mc{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):Hy.setFromPoints(e).getCenter(r);let o=0;for(let l=0,u=e.length;l<u;l++)o=Math.max(o,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qo.subVectors(e,this.center);const t=qo.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),o=(r-this.radius)*.5;this.center.addScaledVector(qo,o/r),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ud.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qo.copy(e.center).add(ud)),this.expandByPoint(qo.copy(e.center).sub(ud))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Wi=new X,dd=new X,wl=new X,Er=new X,hd=new X,Tl=new X,fd=new X;class gc{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wi.copy(this.origin).addScaledVector(this.direction,t),Wi.distanceToSquared(e))}distanceSqToSegment(e,t,r,o){dd.copy(e).add(t).multiplyScalar(.5),wl.copy(t).sub(e).normalize(),Er.copy(this.origin).sub(dd);const l=e.distanceTo(t)*.5,u=-this.direction.dot(wl),d=Er.dot(this.direction),h=-Er.dot(wl),p=Er.lengthSq(),m=Math.abs(1-u*u);let v,x,y,E;if(m>0)if(v=u*h-d,x=u*d-h,E=l*m,v>=0)if(x>=-E)if(x<=E){const M=1/m;v*=M,x*=M,y=v*(v+u*x+2*d)+x*(u*v+x+2*h)+p}else x=l,v=Math.max(0,-(u*x+d)),y=-v*v+x*(x+2*h)+p;else x=-l,v=Math.max(0,-(u*x+d)),y=-v*v+x*(x+2*h)+p;else x<=-E?(v=Math.max(0,-(-u*l+d)),x=v>0?-l:Math.min(Math.max(-l,-h),l),y=-v*v+x*(x+2*h)+p):x<=E?(v=0,x=Math.min(Math.max(-l,-h),l),y=x*(x+2*h)+p):(v=Math.max(0,-(u*l+d)),x=v>0?l:Math.min(Math.max(-l,-h),l),y=-v*v+x*(x+2*h)+p);else x=u>0?-l:l,v=Math.max(0,-(u*x+d)),y=-v*v+x*(x+2*h)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,v),o&&o.copy(dd).addScaledVector(wl,x),y}intersectSphere(e,t){Wi.subVectors(e.center,this.origin);const r=Wi.dot(this.direction),o=Wi.dot(Wi)-r*r,l=e.radius*e.radius;if(o>l)return null;const u=Math.sqrt(l-o),d=r-u,h=r+u;return h<0?null:d<0?this.at(h,t):this.at(d,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,o,l,u,d,h;const p=1/this.direction.x,m=1/this.direction.y,v=1/this.direction.z,x=this.origin;return p>=0?(r=(e.min.x-x.x)*p,o=(e.max.x-x.x)*p):(r=(e.max.x-x.x)*p,o=(e.min.x-x.x)*p),m>=0?(l=(e.min.y-x.y)*m,u=(e.max.y-x.y)*m):(l=(e.max.y-x.y)*m,u=(e.min.y-x.y)*m),r>u||l>o||((l>r||isNaN(r))&&(r=l),(u<o||isNaN(o))&&(o=u),v>=0?(d=(e.min.z-x.z)*v,h=(e.max.z-x.z)*v):(d=(e.max.z-x.z)*v,h=(e.min.z-x.z)*v),r>h||d>o)||((d>r||r!==r)&&(r=d),(h<o||o!==o)&&(o=h),o<0)?null:this.at(r>=0?r:o,t)}intersectsBox(e){return this.intersectBox(e,Wi)!==null}intersectTriangle(e,t,r,o,l){hd.subVectors(t,e),Tl.subVectors(r,e),fd.crossVectors(hd,Tl);let u=this.direction.dot(fd),d;if(u>0){if(o)return null;d=1}else if(u<0)d=-1,u=-u;else return null;Er.subVectors(this.origin,e);const h=d*this.direction.dot(Tl.crossVectors(Er,Tl));if(h<0)return null;const p=d*this.direction.dot(hd.cross(Er));if(p<0||h+p>u)return null;const m=-d*Er.dot(fd);return m<0?null:this.at(m/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gt{constructor(e,t,r,o,l,u,d,h,p,m,v,x,y,E,M,S){Gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,u,d,h,p,m,v,x,y,E,M,S)}set(e,t,r,o,l,u,d,h,p,m,v,x,y,E,M,S){const g=this.elements;return g[0]=e,g[4]=t,g[8]=r,g[12]=o,g[1]=l,g[5]=u,g[9]=d,g[13]=h,g[2]=p,g[6]=m,g[10]=v,g[14]=x,g[3]=y,g[7]=E,g[11]=M,g[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Gt().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,o=1/Vs.setFromMatrixColumn(e,0).length(),l=1/Vs.setFromMatrixColumn(e,1).length(),u=1/Vs.setFromMatrixColumn(e,2).length();return t[0]=r[0]*o,t[1]=r[1]*o,t[2]=r[2]*o,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*u,t[9]=r[9]*u,t[10]=r[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,o=e.y,l=e.z,u=Math.cos(r),d=Math.sin(r),h=Math.cos(o),p=Math.sin(o),m=Math.cos(l),v=Math.sin(l);if(e.order==="XYZ"){const x=u*m,y=u*v,E=d*m,M=d*v;t[0]=h*m,t[4]=-h*v,t[8]=p,t[1]=y+E*p,t[5]=x-M*p,t[9]=-d*h,t[2]=M-x*p,t[6]=E+y*p,t[10]=u*h}else if(e.order==="YXZ"){const x=h*m,y=h*v,E=p*m,M=p*v;t[0]=x+M*d,t[4]=E*d-y,t[8]=u*p,t[1]=u*v,t[5]=u*m,t[9]=-d,t[2]=y*d-E,t[6]=M+x*d,t[10]=u*h}else if(e.order==="ZXY"){const x=h*m,y=h*v,E=p*m,M=p*v;t[0]=x-M*d,t[4]=-u*v,t[8]=E+y*d,t[1]=y+E*d,t[5]=u*m,t[9]=M-x*d,t[2]=-u*p,t[6]=d,t[10]=u*h}else if(e.order==="ZYX"){const x=u*m,y=u*v,E=d*m,M=d*v;t[0]=h*m,t[4]=E*p-y,t[8]=x*p+M,t[1]=h*v,t[5]=M*p+x,t[9]=y*p-E,t[2]=-p,t[6]=d*h,t[10]=u*h}else if(e.order==="YZX"){const x=u*h,y=u*p,E=d*h,M=d*p;t[0]=h*m,t[4]=M-x*v,t[8]=E*v+y,t[1]=v,t[5]=u*m,t[9]=-d*m,t[2]=-p*m,t[6]=y*v+E,t[10]=x-M*v}else if(e.order==="XZY"){const x=u*h,y=u*p,E=d*h,M=d*p;t[0]=h*m,t[4]=-v,t[8]=p*m,t[1]=x*v+M,t[5]=u*m,t[9]=y*v-E,t[2]=E*v-y,t[6]=d*m,t[10]=M*v+x}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Vy,e,Gy)}lookAt(e,t,r){const o=this.elements;return qn.subVectors(e,t),qn.lengthSq()===0&&(qn.z=1),qn.normalize(),wr.crossVectors(r,qn),wr.lengthSq()===0&&(Math.abs(r.z)===1?qn.x+=1e-4:qn.z+=1e-4,qn.normalize(),wr.crossVectors(r,qn)),wr.normalize(),bl.crossVectors(qn,wr),o[0]=wr.x,o[4]=bl.x,o[8]=qn.x,o[1]=wr.y,o[5]=bl.y,o[9]=qn.y,o[2]=wr.z,o[6]=bl.z,o[10]=qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,u=r[0],d=r[4],h=r[8],p=r[12],m=r[1],v=r[5],x=r[9],y=r[13],E=r[2],M=r[6],S=r[10],g=r[14],C=r[3],A=r[7],T=r[11],U=r[15],L=o[0],I=o[4],O=o[8],R=o[12],P=o[1],F=o[5],ne=o[9],q=o[13],V=o[2],J=o[6],ee=o[10],ae=o[14],H=o[3],le=o[7],ie=o[11],B=o[15];return l[0]=u*L+d*P+h*V+p*H,l[4]=u*I+d*F+h*J+p*le,l[8]=u*O+d*ne+h*ee+p*ie,l[12]=u*R+d*q+h*ae+p*B,l[1]=m*L+v*P+x*V+y*H,l[5]=m*I+v*F+x*J+y*le,l[9]=m*O+v*ne+x*ee+y*ie,l[13]=m*R+v*q+x*ae+y*B,l[2]=E*L+M*P+S*V+g*H,l[6]=E*I+M*F+S*J+g*le,l[10]=E*O+M*ne+S*ee+g*ie,l[14]=E*R+M*q+S*ae+g*B,l[3]=C*L+A*P+T*V+U*H,l[7]=C*I+A*F+T*J+U*le,l[11]=C*O+A*ne+T*ee+U*ie,l[15]=C*R+A*q+T*ae+U*B,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],o=e[8],l=e[12],u=e[1],d=e[5],h=e[9],p=e[13],m=e[2],v=e[6],x=e[10],y=e[14],E=e[3],M=e[7],S=e[11],g=e[15];return E*(+l*h*v-o*p*v-l*d*x+r*p*x+o*d*y-r*h*y)+M*(+t*h*y-t*p*x+l*u*x-o*u*y+o*p*m-l*h*m)+S*(+t*p*v-t*d*y-l*u*v+r*u*y+l*d*m-r*p*m)+g*(-o*d*m-t*h*v+t*d*x+o*u*v-r*u*x+r*h*m)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],u=e[4],d=e[5],h=e[6],p=e[7],m=e[8],v=e[9],x=e[10],y=e[11],E=e[12],M=e[13],S=e[14],g=e[15],C=v*S*p-M*x*p+M*h*y-d*S*y-v*h*g+d*x*g,A=E*x*p-m*S*p-E*h*y+u*S*y+m*h*g-u*x*g,T=m*M*p-E*v*p+E*d*y-u*M*y-m*d*g+u*v*g,U=E*v*h-m*M*h-E*d*x+u*M*x+m*d*S-u*v*S,L=t*C+r*A+o*T+l*U;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/L;return e[0]=C*I,e[1]=(M*x*l-v*S*l-M*o*y+r*S*y+v*o*g-r*x*g)*I,e[2]=(d*S*l-M*h*l+M*o*p-r*S*p-d*o*g+r*h*g)*I,e[3]=(v*h*l-d*x*l-v*o*p+r*x*p+d*o*y-r*h*y)*I,e[4]=A*I,e[5]=(m*S*l-E*x*l+E*o*y-t*S*y-m*o*g+t*x*g)*I,e[6]=(E*h*l-u*S*l-E*o*p+t*S*p+u*o*g-t*h*g)*I,e[7]=(u*x*l-m*h*l+m*o*p-t*x*p-u*o*y+t*h*y)*I,e[8]=T*I,e[9]=(E*v*l-m*M*l-E*r*y+t*M*y+m*r*g-t*v*g)*I,e[10]=(u*M*l-E*d*l+E*r*p-t*M*p-u*r*g+t*d*g)*I,e[11]=(m*d*l-u*v*l-m*r*p+t*v*p+u*r*y-t*d*y)*I,e[12]=U*I,e[13]=(m*M*o-E*v*o+E*r*x-t*M*x-m*r*S+t*v*S)*I,e[14]=(E*d*o-u*M*o-E*r*h+t*M*h+u*r*S-t*d*S)*I,e[15]=(u*v*o-m*d*o+m*r*h-t*v*h-u*r*x+t*d*x)*I,this}scale(e){const t=this.elements,r=e.x,o=e.y,l=e.z;return t[0]*=r,t[4]*=o,t[8]*=l,t[1]*=r,t[5]*=o,t[9]*=l,t[2]*=r,t[6]*=o,t[10]*=l,t[3]*=r,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,o))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),o=Math.sin(t),l=1-r,u=e.x,d=e.y,h=e.z,p=l*u,m=l*d;return this.set(p*u+r,p*d-o*h,p*h+o*d,0,p*d+o*h,m*d+r,m*h-o*u,0,p*h-o*d,m*h+o*u,l*h*h+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,o,l,u){return this.set(1,r,l,0,e,1,u,0,t,o,1,0,0,0,0,1),this}compose(e,t,r){const o=this.elements,l=t._x,u=t._y,d=t._z,h=t._w,p=l+l,m=u+u,v=d+d,x=l*p,y=l*m,E=l*v,M=u*m,S=u*v,g=d*v,C=h*p,A=h*m,T=h*v,U=r.x,L=r.y,I=r.z;return o[0]=(1-(M+g))*U,o[1]=(y+T)*U,o[2]=(E-A)*U,o[3]=0,o[4]=(y-T)*L,o[5]=(1-(x+g))*L,o[6]=(S+C)*L,o[7]=0,o[8]=(E+A)*I,o[9]=(S-C)*I,o[10]=(1-(x+M))*I,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,r){const o=this.elements;let l=Vs.set(o[0],o[1],o[2]).length();const u=Vs.set(o[4],o[5],o[6]).length(),d=Vs.set(o[8],o[9],o[10]).length();this.determinant()<0&&(l=-l),e.x=o[12],e.y=o[13],e.z=o[14],gi.copy(this);const p=1/l,m=1/u,v=1/d;return gi.elements[0]*=p,gi.elements[1]*=p,gi.elements[2]*=p,gi.elements[4]*=m,gi.elements[5]*=m,gi.elements[6]*=m,gi.elements[8]*=v,gi.elements[9]*=v,gi.elements[10]*=v,t.setFromRotationMatrix(gi),r.x=l,r.y=u,r.z=d,this}makePerspective(e,t,r,o,l,u,d=Zi){const h=this.elements,p=2*l/(t-e),m=2*l/(r-o),v=(t+e)/(t-e),x=(r+o)/(r-o);let y,E;if(d===Zi)y=-(u+l)/(u-l),E=-2*u*l/(u-l);else if(d===ic)y=-u/(u-l),E=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return h[0]=p,h[4]=0,h[8]=v,h[12]=0,h[1]=0,h[5]=m,h[9]=x,h[13]=0,h[2]=0,h[6]=0,h[10]=y,h[14]=E,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,r,o,l,u,d=Zi){const h=this.elements,p=1/(t-e),m=1/(r-o),v=1/(u-l),x=(t+e)*p,y=(r+o)*m;let E,M;if(d===Zi)E=(u+l)*v,M=-2*v;else if(d===ic)E=l*v,M=-1*v;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return h[0]=2*p,h[4]=0,h[8]=0,h[12]=-x,h[1]=0,h[5]=2*m,h[9]=0,h[13]=-y,h[2]=0,h[6]=0,h[10]=M,h[14]=-E,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<16;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const Vs=new X,gi=new Gt,Vy=new X(0,0,0),Gy=new X(1,1,1),wr=new X,bl=new X,qn=new X,Zm=new Gt,Km=new us;class Ni{constructor(e=0,t=0,r=0,o=Ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,o=this._order){return this._x=e,this._y=t,this._z=r,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const o=e.elements,l=o[0],u=o[4],d=o[8],h=o[1],p=o[5],m=o[9],v=o[2],x=o[6],y=o[10];switch(t){case"XYZ":this._y=Math.asin(pt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-m,y),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(x,p),this._z=0);break;case"YXZ":this._x=Math.asin(-pt(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(d,y),this._z=Math.atan2(h,p)):(this._y=Math.atan2(-v,l),this._z=0);break;case"ZXY":this._x=Math.asin(pt(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-v,y),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-pt(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(x,y),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(pt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-m,p),this._y=Math.atan2(-v,l)):(this._x=0,this._y=Math.atan2(d,y));break;case"XZY":this._z=Math.asin(-pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(x,p),this._y=Math.atan2(d,l)):(this._x=Math.atan2(-m,y),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return Zm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zm,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Km.setFromEuler(this),this.setFromQuaternion(Km,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ni.DEFAULT_ORDER="XYZ";class Gh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Wy=0;const Qm=new X,Gs=new us,ji=new Gt,Al=new X,Zo=new X,jy=new X,Xy=new us,Jm=new X(1,0,0),e0=new X(0,1,0),t0=new X(0,0,1),n0={type:"added"},$y={type:"removed"},Ws={type:"childadded",child:null},pd={type:"childremoved",child:null};class vn extends ds{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wy++}),this.uuid=ua(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vn.DEFAULT_UP.clone();const e=new X,t=new Ni,r=new us,o=new X(1,1,1);function l(){r.setFromEuler(t,!1)}function u(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Gt},normalMatrix:{value:new ft}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=vn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gs.setFromAxisAngle(e,t),this.quaternion.multiply(Gs),this}rotateOnWorldAxis(e,t){return Gs.setFromAxisAngle(e,t),this.quaternion.premultiply(Gs),this}rotateX(e){return this.rotateOnAxis(Jm,e)}rotateY(e){return this.rotateOnAxis(e0,e)}rotateZ(e){return this.rotateOnAxis(t0,e)}translateOnAxis(e,t){return Qm.copy(e).applyQuaternion(this.quaternion),this.position.add(Qm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jm,e)}translateY(e){return this.translateOnAxis(e0,e)}translateZ(e){return this.translateOnAxis(t0,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ji.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Al.copy(e):Al.set(e,t,r);const o=this.parent;this.updateWorldMatrix(!0,!1),Zo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ji.lookAt(Zo,Al,this.up):ji.lookAt(Al,Zo,this.up),this.quaternion.setFromRotationMatrix(ji),o&&(ji.extractRotation(o.matrixWorld),Gs.setFromRotationMatrix(ji),this.quaternion.premultiply(Gs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(n0),Ws.child=e,this.dispatchEvent(Ws),Ws.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($y),pd.child=e,this.dispatchEvent(pd),pd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ji.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ji.multiply(e.parent.matrixWorld)),e.applyMatrix4(ji),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(n0),Ws.child=e,this.dispatchEvent(Ws),Ws.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,o=this.children.length;r<o;r++){const u=this.children[r].getObjectByProperty(e,t);if(u!==void 0)return u}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const o=this.children;for(let l=0,u=o.length;l<u;l++)o[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zo,e,jy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zo,Xy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const o=this.children;for(let l=0,u=o.length;l<u;l++)o[l].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function l(d,h){return d[h.uuid]===void 0&&(d[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const h=d.shapes;if(Array.isArray(h))for(let p=0,m=h.length;p<m;p++){const v=h[p];l(e.shapes,v)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let h=0,p=this.material.length;h<p;h++)d.push(l(e.materials,this.material[h]));o.material=d}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let d=0;d<this.children.length;d++)o.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let d=0;d<this.animations.length;d++){const h=this.animations[d];o.animations.push(l(e.animations,h))}}if(t){const d=u(e.geometries),h=u(e.materials),p=u(e.textures),m=u(e.images),v=u(e.shapes),x=u(e.skeletons),y=u(e.animations),E=u(e.nodes);d.length>0&&(r.geometries=d),h.length>0&&(r.materials=h),p.length>0&&(r.textures=p),m.length>0&&(r.images=m),v.length>0&&(r.shapes=v),x.length>0&&(r.skeletons=x),y.length>0&&(r.animations=y),E.length>0&&(r.nodes=E)}return r.object=o,r;function u(d){const h=[];for(const p in d){const m=d[p];delete m.metadata,h.push(m)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const o=e.children[r];this.add(o.clone())}return this}}vn.DEFAULT_UP=new X(0,1,0);vn.DEFAULT_MATRIX_AUTO_UPDATE=!0;vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vi=new X,Xi=new X,md=new X,$i=new X,js=new X,Xs=new X,i0=new X,gd=new X,vd=new X,xd=new X,_d=new Kt,yd=new Kt,Sd=new Kt;class ai{constructor(e=new X,t=new X,r=new X){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,o){o.subVectors(r,t),vi.subVectors(e,t),o.cross(vi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,r,o,l){vi.subVectors(o,t),Xi.subVectors(r,t),md.subVectors(e,t);const u=vi.dot(vi),d=vi.dot(Xi),h=vi.dot(md),p=Xi.dot(Xi),m=Xi.dot(md),v=u*p-d*d;if(v===0)return l.set(0,0,0),null;const x=1/v,y=(p*h-d*m)*x,E=(u*m-d*h)*x;return l.set(1-y-E,E,y)}static containsPoint(e,t,r,o){return this.getBarycoord(e,t,r,o,$i)===null?!1:$i.x>=0&&$i.y>=0&&$i.x+$i.y<=1}static getInterpolation(e,t,r,o,l,u,d,h){return this.getBarycoord(e,t,r,o,$i)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,$i.x),h.addScaledVector(u,$i.y),h.addScaledVector(d,$i.z),h)}static getInterpolatedAttribute(e,t,r,o,l,u){return _d.setScalar(0),yd.setScalar(0),Sd.setScalar(0),_d.fromBufferAttribute(e,t),yd.fromBufferAttribute(e,r),Sd.fromBufferAttribute(e,o),u.setScalar(0),u.addScaledVector(_d,l.x),u.addScaledVector(yd,l.y),u.addScaledVector(Sd,l.z),u}static isFrontFacing(e,t,r,o){return vi.subVectors(r,t),Xi.subVectors(e,t),vi.cross(Xi).dot(o)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,o){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,r,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vi.subVectors(this.c,this.b),Xi.subVectors(this.a,this.b),vi.cross(Xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ai.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ai.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,o,l){return ai.getInterpolation(e,this.a,this.b,this.c,t,r,o,l)}containsPoint(e){return ai.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ai.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,o=this.b,l=this.c;let u,d;js.subVectors(o,r),Xs.subVectors(l,r),gd.subVectors(e,r);const h=js.dot(gd),p=Xs.dot(gd);if(h<=0&&p<=0)return t.copy(r);vd.subVectors(e,o);const m=js.dot(vd),v=Xs.dot(vd);if(m>=0&&v<=m)return t.copy(o);const x=h*v-m*p;if(x<=0&&h>=0&&m<=0)return u=h/(h-m),t.copy(r).addScaledVector(js,u);xd.subVectors(e,l);const y=js.dot(xd),E=Xs.dot(xd);if(E>=0&&y<=E)return t.copy(l);const M=y*p-h*E;if(M<=0&&p>=0&&E<=0)return d=p/(p-E),t.copy(r).addScaledVector(Xs,d);const S=m*E-y*v;if(S<=0&&v-m>=0&&y-E>=0)return i0.subVectors(l,o),d=(v-m)/(v-m+(y-E)),t.copy(o).addScaledVector(i0,d);const g=1/(S+M+x);return u=M*g,d=x*g,t.copy(r).addScaledVector(js,u).addScaledVector(Xs,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ag={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Tr={h:0,s:0,l:0},Cl={h:0,s:0,l:0};function Md(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class dt{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=si){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.toWorkingColorSpace(this,t),this}setRGB(e,t,r,o=Rt.workingColorSpace){return this.r=e,this.g=t,this.b=r,Rt.toWorkingColorSpace(this,o),this}setHSL(e,t,r,o=Rt.workingColorSpace){if(e=Ry(e,1),t=pt(t,0,1),r=pt(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,u=2*r-l;this.r=Md(u,l,e+1/3),this.g=Md(u,l,e),this.b=Md(u,l,e-1/3)}return Rt.toWorkingColorSpace(this,o),this}setStyle(e,t=si){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=o[1],d=o[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(u===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=si){const r=Ag[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ki(e.r),this.g=Ki(e.g),this.b=Ki(e.b),this}copyLinearToSRGB(e){return this.r=ro(e.r),this.g=ro(e.g),this.b=ro(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=si){return Rt.fromWorkingColorSpace(Tn.copy(this),e),Math.round(pt(Tn.r*255,0,255))*65536+Math.round(pt(Tn.g*255,0,255))*256+Math.round(pt(Tn.b*255,0,255))}getHexString(e=si){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Rt.workingColorSpace){Rt.fromWorkingColorSpace(Tn.copy(this),t);const r=Tn.r,o=Tn.g,l=Tn.b,u=Math.max(r,o,l),d=Math.min(r,o,l);let h,p;const m=(d+u)/2;if(d===u)h=0,p=0;else{const v=u-d;switch(p=m<=.5?v/(u+d):v/(2-u-d),u){case r:h=(o-l)/v+(o<l?6:0);break;case o:h=(l-r)/v+2;break;case l:h=(r-o)/v+4;break}h/=6}return e.h=h,e.s=p,e.l=m,e}getRGB(e,t=Rt.workingColorSpace){return Rt.fromWorkingColorSpace(Tn.copy(this),t),e.r=Tn.r,e.g=Tn.g,e.b=Tn.b,e}getStyle(e=si){Rt.fromWorkingColorSpace(Tn.copy(this),e);const t=Tn.r,r=Tn.g,o=Tn.b;return e!==si?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(o*255)})`}offsetHSL(e,t,r){return this.getHSL(Tr),this.setHSL(Tr.h+e,Tr.s+t,Tr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Tr),e.getHSL(Cl);const r=sd(Tr.h,Cl.h,t),o=sd(Tr.s,Cl.s,t),l=sd(Tr.l,Cl.l,t);return this.setHSL(r,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*o,this.g=l[1]*t+l[4]*r+l[7]*o,this.b=l[2]*t+l[5]*r+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tn=new dt;dt.NAMES=Ag;let Yy=0;class fo extends ds{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yy++}),this.uuid=ua(),this.name="",this.type="Material",this.blending=no,this.side=Lr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vd,this.blendDst=Gd,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new dt(0,0,0),this.blendAlpha=0,this.depthFunc=so,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Os,this.stencilZFail=Os,this.stencilZPass=Os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(r):o&&o.isVector3&&r&&r.isVector3?o.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==no&&(r.blending=this.blending),this.side!==Lr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Vd&&(r.blendSrc=this.blendSrc),this.blendDst!==Gd&&(r.blendDst=this.blendDst),this.blendEquation!==rs&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==so&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gm&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Os&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Os&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Os&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function o(l){const u=[];for(const d in l){const h=l[d];delete h.metadata,u.push(h)}return u}if(t){const l=o(e.textures),u=o(e.images);l.length>0&&(r.textures=l),u.length>0&&(r.images=u)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const o=t.length;r=new Array(o);for(let l=0;l!==o;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class sc extends fo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ni,this.combine=ug,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const tn=new X,Rl=new Ue;class Pi{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=Wm,this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[r+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Rl.fromBufferAttribute(this,t),Rl.applyMatrix3(e),this.setXY(t,Rl.x,Rl.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix3(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=$o(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Hn(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$o(t,this.array)),t}setX(e,t){return this.normalized&&(t=Hn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$o(t,this.array)),t}setY(e,t){return this.normalized&&(t=Hn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$o(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Hn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$o(t,this.array)),t}setW(e,t){return this.normalized&&(t=Hn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Hn(t,this.array),r=Hn(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,o){return e*=this.itemSize,this.normalized&&(t=Hn(t,this.array),r=Hn(r,this.array),o=Hn(o,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this}setXYZW(e,t,r,o,l){return e*=this.itemSize,this.normalized&&(t=Hn(t,this.array),r=Hn(r,this.array),o=Hn(o,this.array),l=Hn(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Wm&&(e.usage=this.usage),e}}class Cg extends Pi{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Rg extends Pi{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class Wt extends Pi{constructor(e,t,r){super(new Float32Array(e),t,r)}}let qy=0;const ri=new Gt,Ed=new vn,$s=new X,Zn=new da,Ko=new da,hn=new X;class An extends ds{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qy++}),this.uuid=ua(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wg(e)?Rg:Cg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new ft().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ri.makeRotationFromQuaternion(e),this.applyMatrix4(ri),this}rotateX(e){return ri.makeRotationX(e),this.applyMatrix4(ri),this}rotateY(e){return ri.makeRotationY(e),this.applyMatrix4(ri),this}rotateZ(e){return ri.makeRotationZ(e),this.applyMatrix4(ri),this}translate(e,t,r){return ri.makeTranslation(e,t,r),this.applyMatrix4(ri),this}scale(e,t,r){return ri.makeScale(e,t,r),this.applyMatrix4(ri),this}lookAt(e){return Ed.lookAt(e),Ed.updateMatrix(),this.applyMatrix4(Ed.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($s).negate(),this.translate($s.x,$s.y,$s.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let o=0,l=e.length;o<l;o++){const u=e[o];r.push(u.x,u.y,u.z||0)}this.setAttribute("position",new Wt(r,3))}else{const r=Math.min(e.length,t.count);for(let o=0;o<r;o++){const l=e[o];t.setXYZ(o,l.x,l.y,l.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new da);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const l=t[r];Zn.setFromBufferAttribute(l),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Zn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Zn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Zn.min),this.boundingBox.expandByPoint(Zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){const r=this.boundingSphere.center;if(Zn.setFromBufferAttribute(e),t)for(let l=0,u=t.length;l<u;l++){const d=t[l];Ko.setFromBufferAttribute(d),this.morphTargetsRelative?(hn.addVectors(Zn.min,Ko.min),Zn.expandByPoint(hn),hn.addVectors(Zn.max,Ko.max),Zn.expandByPoint(hn)):(Zn.expandByPoint(Ko.min),Zn.expandByPoint(Ko.max))}Zn.getCenter(r);let o=0;for(let l=0,u=e.count;l<u;l++)hn.fromBufferAttribute(e,l),o=Math.max(o,r.distanceToSquared(hn));if(t)for(let l=0,u=t.length;l<u;l++){const d=t[l],h=this.morphTargetsRelative;for(let p=0,m=d.count;p<m;p++)hn.fromBufferAttribute(d,p),h&&($s.fromBufferAttribute(e,p),hn.add($s)),o=Math.max(o,r.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,o=t.normal,l=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pi(new Float32Array(4*r.count),4));const u=this.getAttribute("tangent"),d=[],h=[];for(let O=0;O<r.count;O++)d[O]=new X,h[O]=new X;const p=new X,m=new X,v=new X,x=new Ue,y=new Ue,E=new Ue,M=new X,S=new X;function g(O,R,P){p.fromBufferAttribute(r,O),m.fromBufferAttribute(r,R),v.fromBufferAttribute(r,P),x.fromBufferAttribute(l,O),y.fromBufferAttribute(l,R),E.fromBufferAttribute(l,P),m.sub(p),v.sub(p),y.sub(x),E.sub(x);const F=1/(y.x*E.y-E.x*y.y);isFinite(F)&&(M.copy(m).multiplyScalar(E.y).addScaledVector(v,-y.y).multiplyScalar(F),S.copy(v).multiplyScalar(y.x).addScaledVector(m,-E.x).multiplyScalar(F),d[O].add(M),d[R].add(M),d[P].add(M),h[O].add(S),h[R].add(S),h[P].add(S))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let O=0,R=C.length;O<R;++O){const P=C[O],F=P.start,ne=P.count;for(let q=F,V=F+ne;q<V;q+=3)g(e.getX(q+0),e.getX(q+1),e.getX(q+2))}const A=new X,T=new X,U=new X,L=new X;function I(O){U.fromBufferAttribute(o,O),L.copy(U);const R=d[O];A.copy(R),A.sub(U.multiplyScalar(U.dot(R))).normalize(),T.crossVectors(L,R);const F=T.dot(h[O])<0?-1:1;u.setXYZW(O,A.x,A.y,A.z,F)}for(let O=0,R=C.length;O<R;++O){const P=C[O],F=P.start,ne=P.count;for(let q=F,V=F+ne;q<V;q+=3)I(e.getX(q+0)),I(e.getX(q+1)),I(e.getX(q+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Pi(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let x=0,y=r.count;x<y;x++)r.setXYZ(x,0,0,0);const o=new X,l=new X,u=new X,d=new X,h=new X,p=new X,m=new X,v=new X;if(e)for(let x=0,y=e.count;x<y;x+=3){const E=e.getX(x+0),M=e.getX(x+1),S=e.getX(x+2);o.fromBufferAttribute(t,E),l.fromBufferAttribute(t,M),u.fromBufferAttribute(t,S),m.subVectors(u,l),v.subVectors(o,l),m.cross(v),d.fromBufferAttribute(r,E),h.fromBufferAttribute(r,M),p.fromBufferAttribute(r,S),d.add(m),h.add(m),p.add(m),r.setXYZ(E,d.x,d.y,d.z),r.setXYZ(M,h.x,h.y,h.z),r.setXYZ(S,p.x,p.y,p.z)}else for(let x=0,y=t.count;x<y;x+=3)o.fromBufferAttribute(t,x+0),l.fromBufferAttribute(t,x+1),u.fromBufferAttribute(t,x+2),m.subVectors(u,l),v.subVectors(o,l),m.cross(v),r.setXYZ(x+0,m.x,m.y,m.z),r.setXYZ(x+1,m.x,m.y,m.z),r.setXYZ(x+2,m.x,m.y,m.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(d,h){const p=d.array,m=d.itemSize,v=d.normalized,x=new p.constructor(h.length*m);let y=0,E=0;for(let M=0,S=h.length;M<S;M++){d.isInterleavedBufferAttribute?y=h[M]*d.data.stride+d.offset:y=h[M]*m;for(let g=0;g<m;g++)x[E++]=p[y++]}return new Pi(x,m,v)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new An,r=this.index.array,o=this.attributes;for(const d in o){const h=o[d],p=e(h,r);t.setAttribute(d,p)}const l=this.morphAttributes;for(const d in l){const h=[],p=l[d];for(let m=0,v=p.length;m<v;m++){const x=p[m],y=e(x,r);h.push(y)}t.morphAttributes[d]=h}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let d=0,h=u.length;d<h;d++){const p=u[d];t.addGroup(p.start,p.count,p.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const p in h)h[p]!==void 0&&(e[p]=h[p]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const h in r){const p=r[h];e.data.attributes[h]=p.toJSON(e.data)}const o={};let l=!1;for(const h in this.morphAttributes){const p=this.morphAttributes[h],m=[];for(let v=0,x=p.length;v<x;v++){const y=p[v];m.push(y.toJSON(e.data))}m.length>0&&(o[h]=m,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const o=e.attributes;for(const p in o){const m=o[p];this.setAttribute(p,m.clone(t))}const l=e.morphAttributes;for(const p in l){const m=[],v=l[p];for(let x=0,y=v.length;x<y;x++)m.push(v[x].clone(t));this.morphAttributes[p]=m}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let p=0,m=u.length;p<m;p++){const v=u[p];this.addGroup(v.start,v.count,v.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const r0=new Gt,Jr=new gc,Pl=new mc,s0=new X,Nl=new X,Dl=new X,Ll=new X,wd=new X,Il=new X,o0=new X,Ul=new X;class bn extends vn{constructor(e=new An,t=new sc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=o.length;l<u;l++){const d=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}getVertexPosition(e,t){const r=this.geometry,o=r.attributes.position,l=r.morphAttributes.position,u=r.morphTargetsRelative;t.fromBufferAttribute(o,e);const d=this.morphTargetInfluences;if(l&&d){Il.set(0,0,0);for(let h=0,p=l.length;h<p;h++){const m=d[h],v=l[h];m!==0&&(wd.fromBufferAttribute(v,e),u?Il.addScaledVector(wd,m):Il.addScaledVector(wd.sub(t),m))}t.add(Il)}return t}raycast(e,t){const r=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Pl.copy(r.boundingSphere),Pl.applyMatrix4(l),Jr.copy(e.ray).recast(e.near),!(Pl.containsPoint(Jr.origin)===!1&&(Jr.intersectSphere(Pl,s0)===null||Jr.origin.distanceToSquared(s0)>(e.far-e.near)**2))&&(r0.copy(l).invert(),Jr.copy(e.ray).applyMatrix4(r0),!(r.boundingBox!==null&&Jr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,Jr)))}_computeIntersections(e,t,r){let o;const l=this.geometry,u=this.material,d=l.index,h=l.attributes.position,p=l.attributes.uv,m=l.attributes.uv1,v=l.attributes.normal,x=l.groups,y=l.drawRange;if(d!==null)if(Array.isArray(u))for(let E=0,M=x.length;E<M;E++){const S=x[E],g=u[S.materialIndex],C=Math.max(S.start,y.start),A=Math.min(d.count,Math.min(S.start+S.count,y.start+y.count));for(let T=C,U=A;T<U;T+=3){const L=d.getX(T),I=d.getX(T+1),O=d.getX(T+2);o=kl(this,g,e,r,p,m,v,L,I,O),o&&(o.faceIndex=Math.floor(T/3),o.face.materialIndex=S.materialIndex,t.push(o))}}else{const E=Math.max(0,y.start),M=Math.min(d.count,y.start+y.count);for(let S=E,g=M;S<g;S+=3){const C=d.getX(S),A=d.getX(S+1),T=d.getX(S+2);o=kl(this,u,e,r,p,m,v,C,A,T),o&&(o.faceIndex=Math.floor(S/3),t.push(o))}}else if(h!==void 0)if(Array.isArray(u))for(let E=0,M=x.length;E<M;E++){const S=x[E],g=u[S.materialIndex],C=Math.max(S.start,y.start),A=Math.min(h.count,Math.min(S.start+S.count,y.start+y.count));for(let T=C,U=A;T<U;T+=3){const L=T,I=T+1,O=T+2;o=kl(this,g,e,r,p,m,v,L,I,O),o&&(o.faceIndex=Math.floor(T/3),o.face.materialIndex=S.materialIndex,t.push(o))}}else{const E=Math.max(0,y.start),M=Math.min(h.count,y.start+y.count);for(let S=E,g=M;S<g;S+=3){const C=S,A=S+1,T=S+2;o=kl(this,u,e,r,p,m,v,C,A,T),o&&(o.faceIndex=Math.floor(S/3),t.push(o))}}}}function Zy(s,e,t,r,o,l,u,d){let h;if(e.side===Gn?h=r.intersectTriangle(u,l,o,!0,d):h=r.intersectTriangle(o,l,u,e.side===Lr,d),h===null)return null;Ul.copy(d),Ul.applyMatrix4(s.matrixWorld);const p=t.ray.origin.distanceTo(Ul);return p<t.near||p>t.far?null:{distance:p,point:Ul.clone(),object:s}}function kl(s,e,t,r,o,l,u,d,h,p){s.getVertexPosition(d,Nl),s.getVertexPosition(h,Dl),s.getVertexPosition(p,Ll);const m=Zy(s,e,t,r,Nl,Dl,Ll,o0);if(m){const v=new X;ai.getBarycoord(o0,Nl,Dl,Ll,v),o&&(m.uv=ai.getInterpolatedAttribute(o,d,h,p,v,new Ue)),l&&(m.uv1=ai.getInterpolatedAttribute(l,d,h,p,v,new Ue)),u&&(m.normal=ai.getInterpolatedAttribute(u,d,h,p,v,new X),m.normal.dot(r.direction)>0&&m.normal.multiplyScalar(-1));const x={a:d,b:h,c:p,normal:new X,materialIndex:0};ai.getNormal(Nl,Dl,Ll,x.normal),m.face=x,m.barycoord=v}return m}class Dr extends An{constructor(e=1,t=1,r=1,o=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:o,heightSegments:l,depthSegments:u};const d=this;o=Math.floor(o),l=Math.floor(l),u=Math.floor(u);const h=[],p=[],m=[],v=[];let x=0,y=0;E("z","y","x",-1,-1,r,t,e,u,l,0),E("z","y","x",1,-1,r,t,-e,u,l,1),E("x","z","y",1,1,e,r,t,o,u,2),E("x","z","y",1,-1,e,r,-t,o,u,3),E("x","y","z",1,-1,e,t,r,o,l,4),E("x","y","z",-1,-1,e,t,-r,o,l,5),this.setIndex(h),this.setAttribute("position",new Wt(p,3)),this.setAttribute("normal",new Wt(m,3)),this.setAttribute("uv",new Wt(v,2));function E(M,S,g,C,A,T,U,L,I,O,R){const P=T/I,F=U/O,ne=T/2,q=U/2,V=L/2,J=I+1,ee=O+1;let ae=0,H=0;const le=new X;for(let ie=0;ie<ee;ie++){const B=ie*F-q;for(let ce=0;ce<J;ce++){const se=ce*P-ne;le[M]=se*C,le[S]=B*A,le[g]=V,p.push(le.x,le.y,le.z),le[M]=0,le[S]=0,le[g]=L>0?1:-1,m.push(le.x,le.y,le.z),v.push(ce/I),v.push(1-ie/O),ae+=1}}for(let ie=0;ie<O;ie++)for(let B=0;B<I;B++){const ce=x+B+J*ie,se=x+B+J*(ie+1),K=x+(B+1)+J*(ie+1),oe=x+(B+1)+J*ie;h.push(ce,se,oe),h.push(se,K,oe),H+=6}d.addGroup(y,H,R),y+=H,x+=ae}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ho(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const o=s[t][r];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=o.clone():Array.isArray(o)?e[t][r]=o.slice():e[t][r]=o}}return e}function Ln(s){const e={};for(let t=0;t<s.length;t++){const r=ho(s[t]);for(const o in r)e[o]=r[o]}return e}function Ky(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Pg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Rt.workingColorSpace}const Qy={clone:ho,merge:Ln};var Jy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,e1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ir extends fo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jy,this.fragmentShader=e1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ho(e.uniforms),this.uniformsGroups=Ky(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?t.uniforms[o]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[o]={type:"m4",value:u.toArray()}:t.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const o in this.extensions)this.extensions[o]===!0&&(r[o]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class Ng extends vn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=Zi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const br=new X,a0=new Ue,l0=new Ue;class oi extends Ng{constructor(e=50,t=1,r=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ah*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(na*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ah*2*Math.atan(Math.tan(na*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){br.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(br.x,br.y).multiplyScalar(-e/br.z),br.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(br.x,br.y).multiplyScalar(-e/br.z)}getViewSize(e,t){return this.getViewBounds(e,a0,l0),t.subVectors(l0,a0)}setViewOffset(e,t,r,o,l,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(na*.5*this.fov)/this.zoom,r=2*t,o=this.aspect*r,l=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const h=u.fullWidth,p=u.fullHeight;l+=u.offsetX*o/h,t-=u.offsetY*r/p,o*=u.width/h,r*=u.height/p}const d=this.filmOffset;d!==0&&(l+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ys=-90,qs=1;class t1 extends vn{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new oi(Ys,qs,e,t);o.layers=this.layers,this.add(o);const l=new oi(Ys,qs,e,t);l.layers=this.layers,this.add(l);const u=new oi(Ys,qs,e,t);u.layers=this.layers,this.add(u);const d=new oi(Ys,qs,e,t);d.layers=this.layers,this.add(d);const h=new oi(Ys,qs,e,t);h.layers=this.layers,this.add(h);const p=new oi(Ys,qs,e,t);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,o,l,u,d,h]=t;for(const p of t)this.remove(p);if(e===Zi)r.up.set(0,1,0),r.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===ic)r.up.set(0,-1,0),r.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of t)this.add(p),p.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,d,h,p,m]=this.children,v=e.getRenderTarget(),x=e.getActiveCubeFace(),y=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const M=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,o),e.render(t,l),e.setRenderTarget(r,1,o),e.render(t,u),e.setRenderTarget(r,2,o),e.render(t,d),e.setRenderTarget(r,3,o),e.render(t,h),e.setRenderTarget(r,4,o),e.render(t,p),r.texture.generateMipmaps=M,e.setRenderTarget(r,5,o),e.render(t,m),e.setRenderTarget(v,x,y),e.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class Dg extends Wn{constructor(e,t,r,o,l,u,d,h,p,m){e=e!==void 0?e:[],t=t!==void 0?t:oo,super(e,t,r,o,l,u,d,h,p,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class n1 extends cs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},o=[r,r,r,r,r,r];this.texture=new Dg(o,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ri}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new Dr(5,5,5),l=new Ir({name:"CubemapFromEquirect",uniforms:ho(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Gn,blending:Pr});l.uniforms.tEquirect.value=t;const u=new bn(o,l),d=t.minFilter;return t.minFilter===as&&(t.minFilter=Ri),new t1(1,10,this).update(e,u),t.minFilter=d,u.geometry.dispose(),u.material.dispose(),this}clear(e,t,r,o){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,r,o);e.setRenderTarget(l)}}class i1 extends vn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ni,this.environmentIntensity=1,this.environmentRotation=new Ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Td=new X,r1=new X,s1=new ft;class Cr{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,o){return this.normal.set(e,t,r),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const o=Td.subVectors(r,t).cross(r1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(Td),o=this.normal.dot(r);if(o===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/o;return l<0||l>1?null:t.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||s1.getNormalMatrix(e),o=this.coplanarPoint(Td).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const es=new mc,Ol=new X;class Wh{constructor(e=new Cr,t=new Cr,r=new Cr,o=new Cr,l=new Cr,u=new Cr){this.planes=[e,t,r,o,l,u]}set(e,t,r,o,l,u){const d=this.planes;return d[0].copy(e),d[1].copy(t),d[2].copy(r),d[3].copy(o),d[4].copy(l),d[5].copy(u),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=Zi){const r=this.planes,o=e.elements,l=o[0],u=o[1],d=o[2],h=o[3],p=o[4],m=o[5],v=o[6],x=o[7],y=o[8],E=o[9],M=o[10],S=o[11],g=o[12],C=o[13],A=o[14],T=o[15];if(r[0].setComponents(h-l,x-p,S-y,T-g).normalize(),r[1].setComponents(h+l,x+p,S+y,T+g).normalize(),r[2].setComponents(h+u,x+m,S+E,T+C).normalize(),r[3].setComponents(h-u,x-m,S-E,T-C).normalize(),r[4].setComponents(h-d,x-v,S-M,T-A).normalize(),t===Zi)r[5].setComponents(h+d,x+v,S+M,T+A).normalize();else if(t===ic)r[5].setComponents(d,v,M,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(e){return es.center.set(0,0,0),es.radius=.7071067811865476,es.applyMatrix4(e.matrixWorld),this.intersectsSphere(es)}intersectsSphere(e){const t=this.planes,r=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const o=t[r];if(Ol.x=o.normal.x>0?e.max.x:e.min.x,Ol.y=o.normal.y>0?e.max.y:e.min.y,Ol.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Ol)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ia extends fo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const oc=new X,ac=new X,c0=new Gt,Qo=new gc,Fl=new mc,bd=new X,u0=new X;class Lg extends vn{constructor(e=new An,t=new ia){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let o=1,l=t.count;o<l;o++)oc.fromBufferAttribute(t,o-1),ac.fromBufferAttribute(t,o),r[o]=r[o-1],r[o]+=oc.distanceTo(ac);e.setAttribute("lineDistance",new Wt(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,o=this.matrixWorld,l=e.params.Line.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Fl.copy(r.boundingSphere),Fl.applyMatrix4(o),Fl.radius+=l,e.ray.intersectsSphere(Fl)===!1)return;c0.copy(o).invert(),Qo.copy(e.ray).applyMatrix4(c0);const d=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=d*d,p=this.isLineSegments?2:1,m=r.index,x=r.attributes.position;if(m!==null){const y=Math.max(0,u.start),E=Math.min(m.count,u.start+u.count);for(let M=y,S=E-1;M<S;M+=p){const g=m.getX(M),C=m.getX(M+1),A=zl(this,e,Qo,h,g,C);A&&t.push(A)}if(this.isLineLoop){const M=m.getX(E-1),S=m.getX(y),g=zl(this,e,Qo,h,M,S);g&&t.push(g)}}else{const y=Math.max(0,u.start),E=Math.min(x.count,u.start+u.count);for(let M=y,S=E-1;M<S;M+=p){const g=zl(this,e,Qo,h,M,M+1);g&&t.push(g)}if(this.isLineLoop){const M=zl(this,e,Qo,h,E-1,y);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=o.length;l<u;l++){const d=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}}function zl(s,e,t,r,o,l){const u=s.geometry.attributes.position;if(oc.fromBufferAttribute(u,o),ac.fromBufferAttribute(u,l),t.distanceSqToSegment(oc,ac,bd,u0)>r)return;bd.applyMatrix4(s.matrixWorld);const h=e.ray.origin.distanceTo(bd);if(!(h<e.near||h>e.far))return{distance:h,point:u0.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}const d0=new X,h0=new X;class Ch extends Lg{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let o=0,l=t.count;o<l;o+=2)d0.fromBufferAttribute(t,o),h0.fromBufferAttribute(t,o+1),r[o]=o===0?0:r[o-1],r[o+1]=r[o]+d0.distanceTo(h0);e.setAttribute("lineDistance",new Wt(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Jo extends vn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Ig extends Wn{constructor(e,t,r,o,l,u,d,h,p,m=io){if(m!==io&&m!==co)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&m===io&&(r=ls),r===void 0&&m===co&&(r=lo),super(null,o,l,u,d,h,m,r,p),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=d!==void 0?d:yi,this.minFilter=h!==void 0?h:yi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Di{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const r=this.getUtoTmapping(e);return this.getPoint(r,t)}getPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return t}getSpacedPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPointAt(r/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let r,o=this.getPoint(0),l=0;t.push(0);for(let u=1;u<=e;u++)r=this.getPoint(u/e),l+=r.distanceTo(o),t.push(l),o=r;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const r=this.getLengths();let o=0;const l=r.length;let u;t?u=t:u=e*r[l-1];let d=0,h=l-1,p;for(;d<=h;)if(o=Math.floor(d+(h-d)/2),p=r[o]-u,p<0)d=o+1;else if(p>0)h=o-1;else{h=o;break}if(o=h,r[o]===u)return o/(l-1);const m=r[o],x=r[o+1]-m,y=(u-m)/x;return(o+y)/(l-1)}getTangent(e,t){let o=e-1e-4,l=e+1e-4;o<0&&(o=0),l>1&&(l=1);const u=this.getPoint(o),d=this.getPoint(l),h=t||(u.isVector2?new Ue:new X);return h.copy(d).sub(u).normalize(),h}getTangentAt(e,t){const r=this.getUtoTmapping(e);return this.getTangent(r,t)}computeFrenetFrames(e,t){const r=new X,o=[],l=[],u=[],d=new X,h=new Gt;for(let y=0;y<=e;y++){const E=y/e;o[y]=this.getTangentAt(E,new X)}l[0]=new X,u[0]=new X;let p=Number.MAX_VALUE;const m=Math.abs(o[0].x),v=Math.abs(o[0].y),x=Math.abs(o[0].z);m<=p&&(p=m,r.set(1,0,0)),v<=p&&(p=v,r.set(0,1,0)),x<=p&&r.set(0,0,1),d.crossVectors(o[0],r).normalize(),l[0].crossVectors(o[0],d),u[0].crossVectors(o[0],l[0]);for(let y=1;y<=e;y++){if(l[y]=l[y-1].clone(),u[y]=u[y-1].clone(),d.crossVectors(o[y-1],o[y]),d.length()>Number.EPSILON){d.normalize();const E=Math.acos(pt(o[y-1].dot(o[y]),-1,1));l[y].applyMatrix4(h.makeRotationAxis(d,E))}u[y].crossVectors(o[y],l[y])}if(t===!0){let y=Math.acos(pt(l[0].dot(l[e]),-1,1));y/=e,o[0].dot(d.crossVectors(l[0],l[e]))>0&&(y=-y);for(let E=1;E<=e;E++)l[E].applyMatrix4(h.makeRotationAxis(o[E],y*E)),u[E].crossVectors(o[E],l[E])}return{tangents:o,normals:l,binormals:u}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class jh extends Di{constructor(e=0,t=0,r=1,o=1,l=0,u=Math.PI*2,d=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=r,this.yRadius=o,this.aStartAngle=l,this.aEndAngle=u,this.aClockwise=d,this.aRotation=h}getPoint(e,t=new Ue){const r=t,o=Math.PI*2;let l=this.aEndAngle-this.aStartAngle;const u=Math.abs(l)<Number.EPSILON;for(;l<0;)l+=o;for(;l>o;)l-=o;l<Number.EPSILON&&(u?l=0:l=o),this.aClockwise===!0&&!u&&(l===o?l=-o:l=l-o);const d=this.aStartAngle+e*l;let h=this.aX+this.xRadius*Math.cos(d),p=this.aY+this.yRadius*Math.sin(d);if(this.aRotation!==0){const m=Math.cos(this.aRotation),v=Math.sin(this.aRotation),x=h-this.aX,y=p-this.aY;h=x*m-y*v+this.aX,p=x*v+y*m+this.aY}return r.set(h,p)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class o1 extends jh{constructor(e,t,r,o,l,u){super(e,t,r,r,o,l,u),this.isArcCurve=!0,this.type="ArcCurve"}}function Xh(){let s=0,e=0,t=0,r=0;function o(l,u,d,h){s=l,e=d,t=-3*l+3*u-2*d-h,r=2*l-2*u+d+h}return{initCatmullRom:function(l,u,d,h,p){o(u,d,p*(d-l),p*(h-u))},initNonuniformCatmullRom:function(l,u,d,h,p,m,v){let x=(u-l)/p-(d-l)/(p+m)+(d-u)/m,y=(d-u)/m-(h-u)/(m+v)+(h-d)/v;x*=m,y*=m,o(u,d,x,y)},calc:function(l){const u=l*l,d=u*l;return s+e*l+t*u+r*d}}}const Bl=new X,Ad=new Xh,Cd=new Xh,Rd=new Xh;class a1 extends Di{constructor(e=[],t=!1,r="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=r,this.tension=o}getPoint(e,t=new X){const r=t,o=this.points,l=o.length,u=(l-(this.closed?0:1))*e;let d=Math.floor(u),h=u-d;this.closed?d+=d>0?0:(Math.floor(Math.abs(d)/l)+1)*l:h===0&&d===l-1&&(d=l-2,h=1);let p,m;this.closed||d>0?p=o[(d-1)%l]:(Bl.subVectors(o[0],o[1]).add(o[0]),p=Bl);const v=o[d%l],x=o[(d+1)%l];if(this.closed||d+2<l?m=o[(d+2)%l]:(Bl.subVectors(o[l-1],o[l-2]).add(o[l-1]),m=Bl),this.curveType==="centripetal"||this.curveType==="chordal"){const y=this.curveType==="chordal"?.5:.25;let E=Math.pow(p.distanceToSquared(v),y),M=Math.pow(v.distanceToSquared(x),y),S=Math.pow(x.distanceToSquared(m),y);M<1e-4&&(M=1),E<1e-4&&(E=M),S<1e-4&&(S=M),Ad.initNonuniformCatmullRom(p.x,v.x,x.x,m.x,E,M,S),Cd.initNonuniformCatmullRom(p.y,v.y,x.y,m.y,E,M,S),Rd.initNonuniformCatmullRom(p.z,v.z,x.z,m.z,E,M,S)}else this.curveType==="catmullrom"&&(Ad.initCatmullRom(p.x,v.x,x.x,m.x,this.tension),Cd.initCatmullRom(p.y,v.y,x.y,m.y,this.tension),Rd.initCatmullRom(p.z,v.z,x.z,m.z,this.tension));return r.set(Ad.calc(h),Cd.calc(h),Rd.calc(h)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(o.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const o=this.points[t];e.points.push(o.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(new X().fromArray(o))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function f0(s,e,t,r,o){const l=(r-e)*.5,u=(o-t)*.5,d=s*s,h=s*d;return(2*t-2*r+l+u)*h+(-3*t+3*r-2*l-u)*d+l*s+t}function l1(s,e){const t=1-s;return t*t*e}function c1(s,e){return 2*(1-s)*s*e}function u1(s,e){return s*s*e}function ra(s,e,t,r){return l1(s,e)+c1(s,t)+u1(s,r)}function d1(s,e){const t=1-s;return t*t*t*e}function h1(s,e){const t=1-s;return 3*t*t*s*e}function f1(s,e){return 3*(1-s)*s*s*e}function p1(s,e){return s*s*s*e}function sa(s,e,t,r,o){return d1(s,e)+h1(s,t)+f1(s,r)+p1(s,o)}class Ug extends Di{constructor(e=new Ue,t=new Ue,r=new Ue,o=new Ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=r,this.v3=o}getPoint(e,t=new Ue){const r=t,o=this.v0,l=this.v1,u=this.v2,d=this.v3;return r.set(sa(e,o.x,l.x,u.x,d.x),sa(e,o.y,l.y,u.y,d.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class m1 extends Di{constructor(e=new X,t=new X,r=new X,o=new X){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=r,this.v3=o}getPoint(e,t=new X){const r=t,o=this.v0,l=this.v1,u=this.v2,d=this.v3;return r.set(sa(e,o.x,l.x,u.x,d.x),sa(e,o.y,l.y,u.y,d.y),sa(e,o.z,l.z,u.z,d.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class kg extends Di{constructor(e=new Ue,t=new Ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ue){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class g1 extends Di{constructor(e=new X,t=new X){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new X){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new X){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Og extends Di{constructor(e=new Ue,t=new Ue,r=new Ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new Ue){const r=t,o=this.v0,l=this.v1,u=this.v2;return r.set(ra(e,o.x,l.x,u.x),ra(e,o.y,l.y,u.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class v1 extends Di{constructor(e=new X,t=new X,r=new X){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new X){const r=t,o=this.v0,l=this.v1,u=this.v2;return r.set(ra(e,o.x,l.x,u.x),ra(e,o.y,l.y,u.y),ra(e,o.z,l.z,u.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fg extends Di{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ue){const r=t,o=this.points,l=(o.length-1)*e,u=Math.floor(l),d=l-u,h=o[u===0?u:u-1],p=o[u],m=o[u>o.length-2?o.length-1:u+1],v=o[u>o.length-3?o.length-1:u+2];return r.set(f0(d,h.x,p.x,m.x,v.x),f0(d,h.y,p.y,m.y,v.y)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(o.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const o=this.points[t];e.points.push(o.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const o=e.points[t];this.points.push(new Ue().fromArray(o))}return this}}var p0=Object.freeze({__proto__:null,ArcCurve:o1,CatmullRomCurve3:a1,CubicBezierCurve:Ug,CubicBezierCurve3:m1,EllipseCurve:jh,LineCurve:kg,LineCurve3:g1,QuadraticBezierCurve:Og,QuadraticBezierCurve3:v1,SplineCurve:Fg});class x1 extends Di{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const r=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new p0[r](t,e))}return this}getPoint(e,t){const r=e*this.getLength(),o=this.getCurveLengths();let l=0;for(;l<o.length;){if(o[l]>=r){const u=o[l]-r,d=this.curves[l],h=d.getLength(),p=h===0?0:1-u/h;return d.getPointAt(p,t)}l++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let r=0,o=this.curves.length;r<o;r++)t+=this.curves[r].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let r;for(let o=0,l=this.curves;o<l.length;o++){const u=l[o],d=u.isEllipseCurve?e*2:u.isLineCurve||u.isLineCurve3?1:u.isSplineCurve?e*u.points.length:e,h=u.getPoints(d);for(let p=0;p<h.length;p++){const m=h[p];r&&r.equals(m)||(t.push(m),r=m)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,r=e.curves.length;t<r;t++){const o=e.curves[t];this.curves.push(o.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,r=this.curves.length;t<r;t++){const o=this.curves[t];e.curves.push(o.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,r=e.curves.length;t<r;t++){const o=e.curves[t];this.curves.push(new p0[o.type]().fromJSON(o))}return this}}class _1 extends x1{constructor(e){super(),this.type="Path",this.currentPoint=new Ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,r=e.length;t<r;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const r=new kg(this.currentPoint.clone(),new Ue(e,t));return this.curves.push(r),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,r,o){const l=new Og(this.currentPoint.clone(),new Ue(e,t),new Ue(r,o));return this.curves.push(l),this.currentPoint.set(r,o),this}bezierCurveTo(e,t,r,o,l,u){const d=new Ug(this.currentPoint.clone(),new Ue(e,t),new Ue(r,o),new Ue(l,u));return this.curves.push(d),this.currentPoint.set(l,u),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),r=new Fg(t);return this.curves.push(r),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,r,o,l,u){const d=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(e+d,t+h,r,o,l,u),this}absarc(e,t,r,o,l,u){return this.absellipse(e,t,r,r,o,l,u),this}ellipse(e,t,r,o,l,u,d,h){const p=this.currentPoint.x,m=this.currentPoint.y;return this.absellipse(e+p,t+m,r,o,l,u,d,h),this}absellipse(e,t,r,o,l,u,d,h){const p=new jh(e,t,r,o,l,u,d,h);if(this.curves.length>0){const v=p.getPoint(0);v.equals(this.currentPoint)||this.lineTo(v.x,v.y)}this.curves.push(p);const m=p.getPoint(1);return this.currentPoint.copy(m),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class $h extends An{constructor(e=[new Ue(0,-.5),new Ue(.5,0),new Ue(0,.5)],t=12,r=0,o=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:r,phiLength:o},t=Math.floor(t),o=pt(o,0,Math.PI*2);const l=[],u=[],d=[],h=[],p=[],m=1/t,v=new X,x=new Ue,y=new X,E=new X,M=new X;let S=0,g=0;for(let C=0;C<=e.length-1;C++)switch(C){case 0:S=e[C+1].x-e[C].x,g=e[C+1].y-e[C].y,y.x=g*1,y.y=-S,y.z=g*0,M.copy(y),y.normalize(),h.push(y.x,y.y,y.z);break;case e.length-1:h.push(M.x,M.y,M.z);break;default:S=e[C+1].x-e[C].x,g=e[C+1].y-e[C].y,y.x=g*1,y.y=-S,y.z=g*0,E.copy(y),y.x+=M.x,y.y+=M.y,y.z+=M.z,y.normalize(),h.push(y.x,y.y,y.z),M.copy(E)}for(let C=0;C<=t;C++){const A=r+C*m*o,T=Math.sin(A),U=Math.cos(A);for(let L=0;L<=e.length-1;L++){v.x=e[L].x*T,v.y=e[L].y,v.z=e[L].x*U,u.push(v.x,v.y,v.z),x.x=C/t,x.y=L/(e.length-1),d.push(x.x,x.y);const I=h[3*L+0]*T,O=h[3*L+1],R=h[3*L+0]*U;p.push(I,O,R)}}for(let C=0;C<t;C++)for(let A=0;A<e.length-1;A++){const T=A+C*e.length,U=T,L=T+e.length,I=T+e.length+1,O=T+1;l.push(U,L,O),l.push(I,O,L)}this.setIndex(l),this.setAttribute("position",new Wt(u,3)),this.setAttribute("uv",new Wt(d,2)),this.setAttribute("normal",new Wt(p,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $h(e.points,e.segments,e.phiStart,e.phiLength)}}class Yh extends $h{constructor(e=1,t=1,r=4,o=8){const l=new _1;l.absarc(0,-t/2,e,Math.PI*1.5,0),l.absarc(0,t/2,e,0,Math.PI*.5),super(l.getPoints(r),o),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:r,radialSegments:o}}static fromJSON(e){return new Yh(e.radius,e.length,e.capSegments,e.radialSegments)}}class lc extends An{constructor(e=1,t=1,r=1,o=32,l=1,u=!1,d=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:o,heightSegments:l,openEnded:u,thetaStart:d,thetaLength:h};const p=this;o=Math.floor(o),l=Math.floor(l);const m=[],v=[],x=[],y=[];let E=0;const M=[],S=r/2;let g=0;C(),u===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(m),this.setAttribute("position",new Wt(v,3)),this.setAttribute("normal",new Wt(x,3)),this.setAttribute("uv",new Wt(y,2));function C(){const T=new X,U=new X;let L=0;const I=(t-e)/r;for(let O=0;O<=l;O++){const R=[],P=O/l,F=P*(t-e)+e;for(let ne=0;ne<=o;ne++){const q=ne/o,V=q*h+d,J=Math.sin(V),ee=Math.cos(V);U.x=F*J,U.y=-P*r+S,U.z=F*ee,v.push(U.x,U.y,U.z),T.set(J,I,ee).normalize(),x.push(T.x,T.y,T.z),y.push(q,1-P),R.push(E++)}M.push(R)}for(let O=0;O<o;O++)for(let R=0;R<l;R++){const P=M[R][O],F=M[R+1][O],ne=M[R+1][O+1],q=M[R][O+1];(e>0||R!==0)&&(m.push(P,F,q),L+=3),(t>0||R!==l-1)&&(m.push(F,ne,q),L+=3)}p.addGroup(g,L,0),g+=L}function A(T){const U=E,L=new Ue,I=new X;let O=0;const R=T===!0?e:t,P=T===!0?1:-1;for(let ne=1;ne<=o;ne++)v.push(0,S*P,0),x.push(0,P,0),y.push(.5,.5),E++;const F=E;for(let ne=0;ne<=o;ne++){const V=ne/o*h+d,J=Math.cos(V),ee=Math.sin(V);I.x=R*ee,I.y=S*P,I.z=R*J,v.push(I.x,I.y,I.z),x.push(0,P,0),L.x=J*.5+.5,L.y=ee*.5*P+.5,y.push(L.x,L.y),E++}for(let ne=0;ne<o;ne++){const q=U+ne,V=F+ne;T===!0?m.push(V,V+1,q):m.push(V+1,V,q),O+=3}p.addGroup(g,O,T===!0?1:2),g+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lc(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Hl=new X,Vl=new X,Pd=new X,Gl=new ai;class y1 extends An{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const o=Math.pow(10,4),l=Math.cos(na*t),u=e.getIndex(),d=e.getAttribute("position"),h=u?u.count:d.count,p=[0,0,0],m=["a","b","c"],v=new Array(3),x={},y=[];for(let E=0;E<h;E+=3){u?(p[0]=u.getX(E),p[1]=u.getX(E+1),p[2]=u.getX(E+2)):(p[0]=E,p[1]=E+1,p[2]=E+2);const{a:M,b:S,c:g}=Gl;if(M.fromBufferAttribute(d,p[0]),S.fromBufferAttribute(d,p[1]),g.fromBufferAttribute(d,p[2]),Gl.getNormal(Pd),v[0]=`${Math.round(M.x*o)},${Math.round(M.y*o)},${Math.round(M.z*o)}`,v[1]=`${Math.round(S.x*o)},${Math.round(S.y*o)},${Math.round(S.z*o)}`,v[2]=`${Math.round(g.x*o)},${Math.round(g.y*o)},${Math.round(g.z*o)}`,!(v[0]===v[1]||v[1]===v[2]||v[2]===v[0]))for(let C=0;C<3;C++){const A=(C+1)%3,T=v[C],U=v[A],L=Gl[m[C]],I=Gl[m[A]],O=`${T}_${U}`,R=`${U}_${T}`;R in x&&x[R]?(Pd.dot(x[R].normal)<=l&&(y.push(L.x,L.y,L.z),y.push(I.x,I.y,I.z)),x[R]=null):O in x||(x[O]={index0:p[C],index1:p[A],normal:Pd.clone()})}}for(const E in x)if(x[E]){const{index0:M,index1:S}=x[E];Hl.fromBufferAttribute(d,M),Vl.fromBufferAttribute(d,S),y.push(Hl.x,Hl.y,Hl.z),y.push(Vl.x,Vl.y,Vl.z)}this.setAttribute("position",new Wt(y,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class vc extends An{constructor(e=1,t=1,r=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:o};const l=e/2,u=t/2,d=Math.floor(r),h=Math.floor(o),p=d+1,m=h+1,v=e/d,x=t/h,y=[],E=[],M=[],S=[];for(let g=0;g<m;g++){const C=g*x-u;for(let A=0;A<p;A++){const T=A*v-l;E.push(T,-C,0),M.push(0,0,1),S.push(A/d),S.push(1-g/h)}}for(let g=0;g<h;g++)for(let C=0;C<d;C++){const A=C+p*g,T=C+p*(g+1),U=C+1+p*(g+1),L=C+1+p*g;y.push(A,T,L),y.push(T,U,L)}this.setIndex(y),this.setAttribute("position",new Wt(E,3)),this.setAttribute("normal",new Wt(M,3)),this.setAttribute("uv",new Wt(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vc(e.width,e.height,e.widthSegments,e.heightSegments)}}class qh extends An{constructor(e=1,t=32,r=16,o=0,l=Math.PI*2,u=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:o,phiLength:l,thetaStart:u,thetaLength:d},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const h=Math.min(u+d,Math.PI);let p=0;const m=[],v=new X,x=new X,y=[],E=[],M=[],S=[];for(let g=0;g<=r;g++){const C=[],A=g/r;let T=0;g===0&&u===0?T=.5/t:g===r&&h===Math.PI&&(T=-.5/t);for(let U=0;U<=t;U++){const L=U/t;v.x=-e*Math.cos(o+L*l)*Math.sin(u+A*d),v.y=e*Math.cos(u+A*d),v.z=e*Math.sin(o+L*l)*Math.sin(u+A*d),E.push(v.x,v.y,v.z),x.copy(v).normalize(),M.push(x.x,x.y,x.z),S.push(L+T,1-A),C.push(p++)}m.push(C)}for(let g=0;g<r;g++)for(let C=0;C<t;C++){const A=m[g][C+1],T=m[g][C],U=m[g+1][C],L=m[g+1][C+1];(g!==0||u>0)&&y.push(A,T,L),(g!==r-1||h<Math.PI)&&y.push(T,U,L)}this.setIndex(y),this.setAttribute("position",new Wt(E,3)),this.setAttribute("normal",new Wt(M,3)),this.setAttribute("uv",new Wt(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Zh extends An{constructor(e=1,t=.4,r=12,o=48,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:r,tubularSegments:o,arc:l},r=Math.floor(r),o=Math.floor(o);const u=[],d=[],h=[],p=[],m=new X,v=new X,x=new X;for(let y=0;y<=r;y++)for(let E=0;E<=o;E++){const M=E/o*l,S=y/r*Math.PI*2;v.x=(e+t*Math.cos(S))*Math.cos(M),v.y=(e+t*Math.cos(S))*Math.sin(M),v.z=t*Math.sin(S),d.push(v.x,v.y,v.z),m.x=e*Math.cos(M),m.y=e*Math.sin(M),x.subVectors(v,m).normalize(),h.push(x.x,x.y,x.z),p.push(E/o),p.push(y/r)}for(let y=1;y<=r;y++)for(let E=1;E<=o;E++){const M=(o+1)*y+E-1,S=(o+1)*(y-1)+E-1,g=(o+1)*(y-1)+E,C=(o+1)*y+E;u.push(M,S,C),u.push(S,g,C)}this.setIndex(u),this.setAttribute("position",new Wt(d,3)),this.setAttribute("normal",new Wt(h,3)),this.setAttribute("uv",new Wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zh(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class S1 extends An{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],r=new Set,o=new X,l=new X;if(e.index!==null){const u=e.attributes.position,d=e.index;let h=e.groups;h.length===0&&(h=[{start:0,count:d.count,materialIndex:0}]);for(let p=0,m=h.length;p<m;++p){const v=h[p],x=v.start,y=v.count;for(let E=x,M=x+y;E<M;E+=3)for(let S=0;S<3;S++){const g=d.getX(E+S),C=d.getX(E+(S+1)%3);o.fromBufferAttribute(u,g),l.fromBufferAttribute(u,C),m0(o,l,r)===!0&&(t.push(o.x,o.y,o.z),t.push(l.x,l.y,l.z))}}}else{const u=e.attributes.position;for(let d=0,h=u.count/3;d<h;d++)for(let p=0;p<3;p++){const m=3*d+p,v=3*d+(p+1)%3;o.fromBufferAttribute(u,m),l.fromBufferAttribute(u,v),m0(o,l,r)===!0&&(t.push(o.x,o.y,o.z),t.push(l.x,l.y,l.z))}}this.setAttribute("position",new Wt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function m0(s,e,t){const r=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,o=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(r)===!0||t.has(o)===!0?!1:(t.add(r),t.add(o),!0)}class Rh extends fo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mg,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Nd extends Rh{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new dt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new dt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new dt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class M1 extends fo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_y,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class E1 extends fo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class zg extends vn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new dt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Dd=new Gt,g0=new X,v0=new X;class w1{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.map=null,this.mapPass=null,this.matrix=new Gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wh,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new Kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;g0.setFromMatrixPosition(e.matrixWorld),t.position.copy(g0),v0.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(v0),t.updateMatrixWorld(),Dd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dd),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Dd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Bg extends Ng{constructor(e=-1,t=1,r=1,o=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=o,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,o,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=r-e,u=r+e,d=o+t,h=o-t;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,m=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=p*this.view.offsetX,u=l+p*this.view.width,d-=m*this.view.offsetY,h=d-m*this.view.height}this.projectionMatrix.makeOrthographic(l,u,d,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class T1 extends w1{constructor(){super(new Bg(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class x0 extends zg{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vn.DEFAULT_UP),this.updateMatrix(),this.target=new vn,this.shadow=new T1}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class b1 extends zg{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class A1 extends oi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}const _0=new Gt;class C1{constructor(e,t,r=0,o=1/0){this.ray=new gc(e,t),this.near=r,this.far=o,this.camera=null,this.layers=new Gh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return _0.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_0),this}intersectObject(e,t=!0,r=[]){return Ph(e,this,r,t),r.sort(y0),r}intersectObjects(e,t=!0,r=[]){for(let o=0,l=e.length;o<l;o++)Ph(e[o],this,r,t);return r.sort(y0),r}}function y0(s,e){return s.distance-e.distance}function Ph(s,e,t,r){let o=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(o=!1),o===!0&&r===!0){const l=s.children;for(let u=0,d=l.length;u<d;u++)Ph(l[u],e,t,!0)}}class S0{constructor(e=1,t=0,r=0){return this.radius=e,this.phi=t,this.theta=r,this}set(e,t,r){return this.radius=e,this.phi=t,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=pt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,r){return this.radius=Math.sqrt(e*e+t*t+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(pt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class R1 extends Ch{constructor(e=10,t=10,r=4473924,o=8947848){r=new dt(r),o=new dt(o);const l=t/2,u=e/t,d=e/2,h=[],p=[];for(let x=0,y=0,E=-d;x<=t;x++,E+=u){h.push(-d,0,E,d,0,E),h.push(E,0,-d,E,0,d);const M=x===l?r:o;M.toArray(p,y),y+=3,M.toArray(p,y),y+=3,M.toArray(p,y),y+=3,M.toArray(p,y),y+=3}const m=new An;m.setAttribute("position",new Wt(h,3)),m.setAttribute("color",new Wt(p,3));const v=new ia({vertexColors:!0,toneMapped:!1});super(m,v),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class P1 extends ds{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function M0(s,e,t,r){const o=N1(r);switch(t){case mg:return s*e;case vg:return s*e;case xg:return s*e*2;case _g:return s*e/o.components*o.byteLength;case Bh:return s*e/o.components*o.byteLength;case yg:return s*e*2/o.components*o.byteLength;case Hh:return s*e*2/o.components*o.byteLength;case gg:return s*e*3/o.components*o.byteLength;case _i:return s*e*4/o.components*o.byteLength;case Vh:return s*e*4/o.components*o.byteLength;case ql:case Zl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Kl:case Ql:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case nh:case rh:return Math.max(s,16)*Math.max(e,8)/4;case th:case ih:return Math.max(s,8)*Math.max(e,8)/2;case sh:case oh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ah:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case lh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ch:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case uh:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case dh:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case hh:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case fh:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case ph:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case mh:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case gh:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case vh:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case xh:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case _h:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case yh:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Sh:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Jl:case Mh:case Eh:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Sg:case wh:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Th:case bh:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function N1(s){switch(s){case Ji:case hg:return{byteLength:1,components:1};case la:case fg:case ca:return{byteLength:2,components:1};case Fh:case zh:return{byteLength:2,components:4};case ls:case Oh:case qi:return{byteLength:4,components:1};case pg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:kh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=kh);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Hg(){let s=null,e=!1,t=null,r=null;function o(l,u){t(l,u),r=s.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&(r=s.requestAnimationFrame(o),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function D1(s){const e=new WeakMap;function t(d,h){const p=d.array,m=d.usage,v=p.byteLength,x=s.createBuffer();s.bindBuffer(h,x),s.bufferData(h,p,m),d.onUploadCallback();let y;if(p instanceof Float32Array)y=s.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?y=s.HALF_FLOAT:y=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)y=s.SHORT;else if(p instanceof Uint32Array)y=s.UNSIGNED_INT;else if(p instanceof Int32Array)y=s.INT;else if(p instanceof Int8Array)y=s.BYTE;else if(p instanceof Uint8Array)y=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)y=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:y,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:v}}function r(d,h,p){const m=h.array,v=h.updateRanges;if(s.bindBuffer(p,d),v.length===0)s.bufferSubData(p,0,m);else{v.sort((y,E)=>y.start-E.start);let x=0;for(let y=1;y<v.length;y++){const E=v[x],M=v[y];M.start<=E.start+E.count+1?E.count=Math.max(E.count,M.start+M.count-E.start):(++x,v[x]=M)}v.length=x+1;for(let y=0,E=v.length;y<E;y++){const M=v[y];s.bufferSubData(p,M.start*m.BYTES_PER_ELEMENT,m,M.start,M.count)}h.clearUpdateRanges()}h.onUploadCallback()}function o(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function l(d){d.isInterleavedBufferAttribute&&(d=d.data);const h=e.get(d);h&&(s.deleteBuffer(h.buffer),e.delete(d))}function u(d,h){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const m=e.get(d);(!m||m.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,t(d,h));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,d,h),p.version=d.version}}return{get:o,remove:l,update:u}}var L1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,I1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,U1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,k1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,O1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,F1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,z1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,B1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,H1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,V1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,G1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,W1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,j1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,X1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,$1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Y1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,q1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Z1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,K1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Q1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,J1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,eS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,tS=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,nS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,iS=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,sS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,oS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,aS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cS="gl_FragColor = linearToOutputTexel( gl_FragColor );",uS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,hS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,pS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_S=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,SS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,MS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ES=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,TS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,bS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,AS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,CS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,RS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,PS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,NS=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,DS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,LS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,IS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,US=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,OS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,FS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,BS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,HS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,VS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,GS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,WS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,XS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$S=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,YS=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,KS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,QS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,JS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,tM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,nM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,iM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,oM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,aM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,lM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,uM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,mM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_M=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,SM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,MM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,EM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,TM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,AM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,CM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,RM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,PM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,NM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const DM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,LM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,IM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,OM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,BM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,HM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,VM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,GM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,XM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$M=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,KM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,JM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,eE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,iE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,aE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,uE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,mt={alphahash_fragment:L1,alphahash_pars_fragment:I1,alphamap_fragment:U1,alphamap_pars_fragment:k1,alphatest_fragment:O1,alphatest_pars_fragment:F1,aomap_fragment:z1,aomap_pars_fragment:B1,batching_pars_vertex:H1,batching_vertex:V1,begin_vertex:G1,beginnormal_vertex:W1,bsdfs:j1,iridescence_fragment:X1,bumpmap_pars_fragment:$1,clipping_planes_fragment:Y1,clipping_planes_pars_fragment:q1,clipping_planes_pars_vertex:Z1,clipping_planes_vertex:K1,color_fragment:Q1,color_pars_fragment:J1,color_pars_vertex:eS,color_vertex:tS,common:nS,cube_uv_reflection_fragment:iS,defaultnormal_vertex:rS,displacementmap_pars_vertex:sS,displacementmap_vertex:oS,emissivemap_fragment:aS,emissivemap_pars_fragment:lS,colorspace_fragment:cS,colorspace_pars_fragment:uS,envmap_fragment:dS,envmap_common_pars_fragment:hS,envmap_pars_fragment:fS,envmap_pars_vertex:pS,envmap_physical_pars_fragment:TS,envmap_vertex:mS,fog_vertex:gS,fog_pars_vertex:vS,fog_fragment:xS,fog_pars_fragment:_S,gradientmap_pars_fragment:yS,lightmap_pars_fragment:SS,lights_lambert_fragment:MS,lights_lambert_pars_fragment:ES,lights_pars_begin:wS,lights_toon_fragment:bS,lights_toon_pars_fragment:AS,lights_phong_fragment:CS,lights_phong_pars_fragment:RS,lights_physical_fragment:PS,lights_physical_pars_fragment:NS,lights_fragment_begin:DS,lights_fragment_maps:LS,lights_fragment_end:IS,logdepthbuf_fragment:US,logdepthbuf_pars_fragment:kS,logdepthbuf_pars_vertex:OS,logdepthbuf_vertex:FS,map_fragment:zS,map_pars_fragment:BS,map_particle_fragment:HS,map_particle_pars_fragment:VS,metalnessmap_fragment:GS,metalnessmap_pars_fragment:WS,morphinstance_vertex:jS,morphcolor_vertex:XS,morphnormal_vertex:$S,morphtarget_pars_vertex:YS,morphtarget_vertex:qS,normal_fragment_begin:ZS,normal_fragment_maps:KS,normal_pars_fragment:QS,normal_pars_vertex:JS,normal_vertex:eM,normalmap_pars_fragment:tM,clearcoat_normal_fragment_begin:nM,clearcoat_normal_fragment_maps:iM,clearcoat_pars_fragment:rM,iridescence_pars_fragment:sM,opaque_fragment:oM,packing:aM,premultiplied_alpha_fragment:lM,project_vertex:cM,dithering_fragment:uM,dithering_pars_fragment:dM,roughnessmap_fragment:hM,roughnessmap_pars_fragment:fM,shadowmap_pars_fragment:pM,shadowmap_pars_vertex:mM,shadowmap_vertex:gM,shadowmask_pars_fragment:vM,skinbase_vertex:xM,skinning_pars_vertex:_M,skinning_vertex:yM,skinnormal_vertex:SM,specularmap_fragment:MM,specularmap_pars_fragment:EM,tonemapping_fragment:wM,tonemapping_pars_fragment:TM,transmission_fragment:bM,transmission_pars_fragment:AM,uv_pars_fragment:CM,uv_pars_vertex:RM,uv_vertex:PM,worldpos_vertex:NM,background_vert:DM,background_frag:LM,backgroundCube_vert:IM,backgroundCube_frag:UM,cube_vert:kM,cube_frag:OM,depth_vert:FM,depth_frag:zM,distanceRGBA_vert:BM,distanceRGBA_frag:HM,equirect_vert:VM,equirect_frag:GM,linedashed_vert:WM,linedashed_frag:jM,meshbasic_vert:XM,meshbasic_frag:$M,meshlambert_vert:YM,meshlambert_frag:qM,meshmatcap_vert:ZM,meshmatcap_frag:KM,meshnormal_vert:QM,meshnormal_frag:JM,meshphong_vert:eE,meshphong_frag:tE,meshphysical_vert:nE,meshphysical_frag:iE,meshtoon_vert:rE,meshtoon_frag:sE,points_vert:oE,points_frag:aE,shadow_vert:lE,shadow_frag:cE,sprite_vert:uE,sprite_frag:dE},De={common:{diffuse:{value:new dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ft}},envmap:{envMap:{value:null},envMapRotation:{value:new ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ft},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0},uvTransform:{value:new ft}},sprite:{diffuse:{value:new dt(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}}},Ci={basic:{uniforms:Ln([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:Ln([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new dt(0)}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:Ln([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new dt(0)},specular:{value:new dt(1118481)},shininess:{value:30}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:Ln([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:Ln([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new dt(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:Ln([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:Ln([De.points,De.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:Ln([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:Ln([De.common,De.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:Ln([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:Ln([De.sprite,De.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ft}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distanceRGBA:{uniforms:Ln([De.common,De.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distanceRGBA_vert,fragmentShader:mt.distanceRGBA_frag},shadow:{uniforms:Ln([De.lights,De.fog,{color:{value:new dt(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};Ci.physical={uniforms:Ln([Ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ft},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ft},sheen:{value:0},sheenColor:{value:new dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ft},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ft},attenuationDistance:{value:0},attenuationColor:{value:new dt(0)},specularColor:{value:new dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ft},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ft}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};const Wl={r:0,b:0,g:0},ts=new Ni,hE=new Gt;function fE(s,e,t,r,o,l,u){const d=new dt(0);let h=l===!0?0:1,p,m,v=null,x=0,y=null;function E(A){let T=A.isScene===!0?A.background:null;return T&&T.isTexture&&(T=(A.backgroundBlurriness>0?t:e).get(T)),T}function M(A){let T=!1;const U=E(A);U===null?g(d,h):U&&U.isColor&&(g(U,1),T=!0);const L=s.xr.getEnvironmentBlendMode();L==="additive"?r.buffers.color.setClear(0,0,0,1,u):L==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,u),(s.autoClear||T)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function S(A,T){const U=E(T);U&&(U.isCubeTexture||U.mapping===pc)?(m===void 0&&(m=new bn(new Dr(1,1,1),new Ir({name:"BackgroundCubeMaterial",uniforms:ho(Ci.backgroundCube.uniforms),vertexShader:Ci.backgroundCube.vertexShader,fragmentShader:Ci.backgroundCube.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(L,I,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(m)),ts.copy(T.backgroundRotation),ts.x*=-1,ts.y*=-1,ts.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(ts.y*=-1,ts.z*=-1),m.material.uniforms.envMap.value=U,m.material.uniforms.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,m.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(hE.makeRotationFromEuler(ts)),m.material.toneMapped=Rt.getTransfer(U.colorSpace)!==kt,(v!==U||x!==U.version||y!==s.toneMapping)&&(m.material.needsUpdate=!0,v=U,x=U.version,y=s.toneMapping),m.layers.enableAll(),A.unshift(m,m.geometry,m.material,0,0,null)):U&&U.isTexture&&(p===void 0&&(p=new bn(new vc(2,2),new Ir({name:"BackgroundMaterial",uniforms:ho(Ci.background.uniforms),vertexShader:Ci.background.vertexShader,fragmentShader:Ci.background.fragmentShader,side:Lr,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(p)),p.material.uniforms.t2D.value=U,p.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,p.material.toneMapped=Rt.getTransfer(U.colorSpace)!==kt,U.matrixAutoUpdate===!0&&U.updateMatrix(),p.material.uniforms.uvTransform.value.copy(U.matrix),(v!==U||x!==U.version||y!==s.toneMapping)&&(p.material.needsUpdate=!0,v=U,x=U.version,y=s.toneMapping),p.layers.enableAll(),A.unshift(p,p.geometry,p.material,0,0,null))}function g(A,T){A.getRGB(Wl,Pg(s)),r.buffers.color.setClear(Wl.r,Wl.g,Wl.b,T,u)}function C(){m!==void 0&&(m.geometry.dispose(),m.material.dispose()),p!==void 0&&(p.geometry.dispose(),p.material.dispose())}return{getClearColor:function(){return d},setClearColor:function(A,T=1){d.set(A),h=T,g(d,h)},getClearAlpha:function(){return h},setClearAlpha:function(A){h=A,g(d,h)},render:M,addToRenderList:S,dispose:C}}function pE(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},o=x(null);let l=o,u=!1;function d(P,F,ne,q,V){let J=!1;const ee=v(q,ne,F);l!==ee&&(l=ee,p(l.object)),J=y(P,q,ne,V),J&&E(P,q,ne,V),V!==null&&e.update(V,s.ELEMENT_ARRAY_BUFFER),(J||u)&&(u=!1,T(P,F,ne,q),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function h(){return s.createVertexArray()}function p(P){return s.bindVertexArray(P)}function m(P){return s.deleteVertexArray(P)}function v(P,F,ne){const q=ne.wireframe===!0;let V=r[P.id];V===void 0&&(V={},r[P.id]=V);let J=V[F.id];J===void 0&&(J={},V[F.id]=J);let ee=J[q];return ee===void 0&&(ee=x(h()),J[q]=ee),ee}function x(P){const F=[],ne=[],q=[];for(let V=0;V<t;V++)F[V]=0,ne[V]=0,q[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:ne,attributeDivisors:q,object:P,attributes:{},index:null}}function y(P,F,ne,q){const V=l.attributes,J=F.attributes;let ee=0;const ae=ne.getAttributes();for(const H in ae)if(ae[H].location>=0){const ie=V[H];let B=J[H];if(B===void 0&&(H==="instanceMatrix"&&P.instanceMatrix&&(B=P.instanceMatrix),H==="instanceColor"&&P.instanceColor&&(B=P.instanceColor)),ie===void 0||ie.attribute!==B||B&&ie.data!==B.data)return!0;ee++}return l.attributesNum!==ee||l.index!==q}function E(P,F,ne,q){const V={},J=F.attributes;let ee=0;const ae=ne.getAttributes();for(const H in ae)if(ae[H].location>=0){let ie=J[H];ie===void 0&&(H==="instanceMatrix"&&P.instanceMatrix&&(ie=P.instanceMatrix),H==="instanceColor"&&P.instanceColor&&(ie=P.instanceColor));const B={};B.attribute=ie,ie&&ie.data&&(B.data=ie.data),V[H]=B,ee++}l.attributes=V,l.attributesNum=ee,l.index=q}function M(){const P=l.newAttributes;for(let F=0,ne=P.length;F<ne;F++)P[F]=0}function S(P){g(P,0)}function g(P,F){const ne=l.newAttributes,q=l.enabledAttributes,V=l.attributeDivisors;ne[P]=1,q[P]===0&&(s.enableVertexAttribArray(P),q[P]=1),V[P]!==F&&(s.vertexAttribDivisor(P,F),V[P]=F)}function C(){const P=l.newAttributes,F=l.enabledAttributes;for(let ne=0,q=F.length;ne<q;ne++)F[ne]!==P[ne]&&(s.disableVertexAttribArray(ne),F[ne]=0)}function A(P,F,ne,q,V,J,ee){ee===!0?s.vertexAttribIPointer(P,F,ne,V,J):s.vertexAttribPointer(P,F,ne,q,V,J)}function T(P,F,ne,q){M();const V=q.attributes,J=ne.getAttributes(),ee=F.defaultAttributeValues;for(const ae in J){const H=J[ae];if(H.location>=0){let le=V[ae];if(le===void 0&&(ae==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),ae==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),le!==void 0){const ie=le.normalized,B=le.itemSize,ce=e.get(le);if(ce===void 0)continue;const se=ce.buffer,K=ce.type,oe=ce.bytesPerElement,j=K===s.INT||K===s.UNSIGNED_INT||le.gpuType===Oh;if(le.isInterleavedBufferAttribute){const te=le.data,ge=te.stride,ye=le.offset;if(te.isInstancedInterleavedBuffer){for(let Ce=0;Ce<H.locationSize;Ce++)g(H.location+Ce,te.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ce=0;Ce<H.locationSize;Ce++)S(H.location+Ce);s.bindBuffer(s.ARRAY_BUFFER,se);for(let Ce=0;Ce<H.locationSize;Ce++)A(H.location+Ce,B/H.locationSize,K,ie,ge*oe,(ye+B/H.locationSize*Ce)*oe,j)}else{if(le.isInstancedBufferAttribute){for(let te=0;te<H.locationSize;te++)g(H.location+te,le.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let te=0;te<H.locationSize;te++)S(H.location+te);s.bindBuffer(s.ARRAY_BUFFER,se);for(let te=0;te<H.locationSize;te++)A(H.location+te,B/H.locationSize,K,ie,B*oe,B/H.locationSize*te*oe,j)}}else if(ee!==void 0){const ie=ee[ae];if(ie!==void 0)switch(ie.length){case 2:s.vertexAttrib2fv(H.location,ie);break;case 3:s.vertexAttrib3fv(H.location,ie);break;case 4:s.vertexAttrib4fv(H.location,ie);break;default:s.vertexAttrib1fv(H.location,ie)}}}}C()}function U(){O();for(const P in r){const F=r[P];for(const ne in F){const q=F[ne];for(const V in q)m(q[V].object),delete q[V];delete F[ne]}delete r[P]}}function L(P){if(r[P.id]===void 0)return;const F=r[P.id];for(const ne in F){const q=F[ne];for(const V in q)m(q[V].object),delete q[V];delete F[ne]}delete r[P.id]}function I(P){for(const F in r){const ne=r[F];if(ne[P.id]===void 0)continue;const q=ne[P.id];for(const V in q)m(q[V].object),delete q[V];delete ne[P.id]}}function O(){R(),u=!0,l!==o&&(l=o,p(l.object))}function R(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:d,reset:O,resetDefaultState:R,dispose:U,releaseStatesOfGeometry:L,releaseStatesOfProgram:I,initAttributes:M,enableAttribute:S,disableUnusedAttributes:C}}function mE(s,e,t){let r;function o(p){r=p}function l(p,m){s.drawArrays(r,p,m),t.update(m,r,1)}function u(p,m,v){v!==0&&(s.drawArraysInstanced(r,p,m,v),t.update(m,r,v))}function d(p,m,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,m,0,v);let y=0;for(let E=0;E<v;E++)y+=m[E];t.update(y,r,1)}function h(p,m,v,x){if(v===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let E=0;E<p.length;E++)u(p[E],m[E],x[E]);else{y.multiDrawArraysInstancedWEBGL(r,p,0,m,0,x,0,v);let E=0;for(let M=0;M<v;M++)E+=m[M]*x[M];t.update(E,r,1)}}this.setMode=o,this.render=l,this.renderInstances=u,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function gE(s,e,t,r){let o;function l(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");o=s.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(I){return!(I!==_i&&r.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(I){const O=I===ca&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Ji&&r.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==qi&&!O)}function h(I){if(I==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=t.precision!==void 0?t.precision:"highp";const m=h(p);m!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",m,"instead."),p=m);const v=t.logarithmicDepthBuffer===!0,x=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),y=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=s.getParameter(s.MAX_TEXTURE_SIZE),S=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),C=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),A=s.getParameter(s.MAX_VARYING_VECTORS),T=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),U=E>0,L=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:u,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:v,reverseDepthBuffer:x,maxTextures:y,maxVertexTextures:E,maxTextureSize:M,maxCubemapSize:S,maxAttributes:g,maxVertexUniforms:C,maxVaryings:A,maxFragmentUniforms:T,vertexTextures:U,maxSamples:L}}function vE(s){const e=this;let t=null,r=0,o=!1,l=!1;const u=new Cr,d=new ft,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(v,x){const y=v.length!==0||x||r!==0||o;return o=x,r=v.length,y},this.beginShadows=function(){l=!0,m(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(v,x){t=m(v,x,0)},this.setState=function(v,x,y){const E=v.clippingPlanes,M=v.clipIntersection,S=v.clipShadows,g=s.get(v);if(!o||E===null||E.length===0||l&&!S)l?m(null):p();else{const C=l?0:r,A=C*4;let T=g.clippingState||null;h.value=T,T=m(E,x,A,y);for(let U=0;U!==A;++U)T[U]=t[U];g.clippingState=T,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=C}};function p(){h.value!==t&&(h.value=t,h.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function m(v,x,y,E){const M=v!==null?v.length:0;let S=null;if(M!==0){if(S=h.value,E!==!0||S===null){const g=y+M*4,C=x.matrixWorldInverse;d.getNormalMatrix(C),(S===null||S.length<g)&&(S=new Float32Array(g));for(let A=0,T=y;A!==M;++A,T+=4)u.copy(v[A]).applyMatrix4(C,d),u.normal.toArray(S,T),S[T+3]=u.constant}h.value=S,h.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,S}}function xE(s){let e=new WeakMap;function t(u,d){return d===Kd?u.mapping=oo:d===Qd&&(u.mapping=ao),u}function r(u){if(u&&u.isTexture){const d=u.mapping;if(d===Kd||d===Qd)if(e.has(u)){const h=e.get(u).texture;return t(h,u.mapping)}else{const h=u.image;if(h&&h.height>0){const p=new n1(h.height);return p.fromEquirectangularTexture(s,u),e.set(u,p),u.addEventListener("dispose",o),t(p.texture,u.mapping)}else return null}}return u}function o(u){const d=u.target;d.removeEventListener("dispose",o);const h=e.get(d);h!==void 0&&(e.delete(d),h.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}const eo=4,E0=[.125,.215,.35,.446,.526,.582],ss=20,Ld=new Bg,w0=new dt;let Id=null,Ud=0,kd=0,Od=!1;const is=(1+Math.sqrt(5))/2,Zs=1/is,T0=[new X(-is,Zs,0),new X(is,Zs,0),new X(-Zs,0,is),new X(Zs,0,is),new X(0,is,-Zs),new X(0,is,Zs),new X(-1,1,-1),new X(1,1,-1),new X(-1,1,1),new X(1,1,1)];class b0{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,o=100){Id=this._renderer.getRenderTarget(),Ud=this._renderer.getActiveCubeFace(),kd=this._renderer.getActiveMipmapLevel(),Od=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,o,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=R0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=C0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Id,Ud,kd),this._renderer.xr.enabled=Od,e.scissorTest=!1,jl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===oo||e.mapping===ao?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Id=this._renderer.getRenderTarget(),Ud=this._renderer.getActiveCubeFace(),kd=this._renderer.getActiveMipmapLevel(),Od=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Ri,minFilter:Ri,generateMipmaps:!1,type:ca,format:_i,colorSpace:uo,depthBuffer:!1},o=A0(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=A0(e,t,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_E(l)),this._blurMaterial=yE(l,e,t)}return o}_compileMaterial(e){const t=new bn(this._lodPlanes[0],e);this._renderer.compile(t,Ld)}_sceneToCubeUV(e,t,r,o){const d=new oi(90,1,t,r),h=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],m=this._renderer,v=m.autoClear,x=m.toneMapping;m.getClearColor(w0),m.toneMapping=Nr,m.autoClear=!1;const y=new sc({name:"PMREM.Background",side:Gn,depthWrite:!1,depthTest:!1}),E=new bn(new Dr,y);let M=!1;const S=e.background;S?S.isColor&&(y.color.copy(S),e.background=null,M=!0):(y.color.copy(w0),M=!0);for(let g=0;g<6;g++){const C=g%3;C===0?(d.up.set(0,h[g],0),d.lookAt(p[g],0,0)):C===1?(d.up.set(0,0,h[g]),d.lookAt(0,p[g],0)):(d.up.set(0,h[g],0),d.lookAt(0,0,p[g]));const A=this._cubeSize;jl(o,C*A,g>2?A:0,A,A),m.setRenderTarget(o),M&&m.render(E,d),m.render(e,d)}E.geometry.dispose(),E.material.dispose(),m.toneMapping=x,m.autoClear=v,e.background=S}_textureToCubeUV(e,t){const r=this._renderer,o=e.mapping===oo||e.mapping===ao;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=R0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=C0());const l=o?this._cubemapMaterial:this._equirectMaterial,u=new bn(this._lodPlanes[0],l),d=l.uniforms;d.envMap.value=e;const h=this._cubeSize;jl(t,0,0,3*h,2*h),r.setRenderTarget(t),r.render(u,Ld)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const o=this._lodPlanes.length;for(let l=1;l<o;l++){const u=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),d=T0[(o-l-1)%T0.length];this._blur(e,l-1,l,u,d)}t.autoClear=r}_blur(e,t,r,o,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,r,o,"latitudinal",l),this._halfBlur(u,e,r,r,o,"longitudinal",l)}_halfBlur(e,t,r,o,l,u,d){const h=this._renderer,p=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const m=3,v=new bn(this._lodPlanes[o],p),x=p.uniforms,y=this._sizeLods[r]-1,E=isFinite(l)?Math.PI/(2*y):2*Math.PI/(2*ss-1),M=l/E,S=isFinite(l)?1+Math.floor(m*M):ss;S>ss&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${ss}`);const g=[];let C=0;for(let I=0;I<ss;++I){const O=I/M,R=Math.exp(-O*O/2);g.push(R),I===0?C+=R:I<S&&(C+=2*R)}for(let I=0;I<g.length;I++)g[I]=g[I]/C;x.envMap.value=e.texture,x.samples.value=S,x.weights.value=g,x.latitudinal.value=u==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:A}=this;x.dTheta.value=E,x.mipInt.value=A-r;const T=this._sizeLods[o],U=3*T*(o>A-eo?o-A+eo:0),L=4*(this._cubeSize-T);jl(t,U,L,3*T,2*T),h.setRenderTarget(t),h.render(v,Ld)}}function _E(s){const e=[],t=[],r=[];let o=s;const l=s-eo+1+E0.length;for(let u=0;u<l;u++){const d=Math.pow(2,o);t.push(d);let h=1/d;u>s-eo?h=E0[u-s+eo-1]:u===0&&(h=0),r.push(h);const p=1/(d-2),m=-p,v=1+p,x=[m,m,v,m,v,v,m,m,v,v,m,v],y=6,E=6,M=3,S=2,g=1,C=new Float32Array(M*E*y),A=new Float32Array(S*E*y),T=new Float32Array(g*E*y);for(let L=0;L<y;L++){const I=L%3*2/3-1,O=L>2?0:-1,R=[I,O,0,I+2/3,O,0,I+2/3,O+1,0,I,O,0,I+2/3,O+1,0,I,O+1,0];C.set(R,M*E*L),A.set(x,S*E*L);const P=[L,L,L,L,L,L];T.set(P,g*E*L)}const U=new An;U.setAttribute("position",new Pi(C,M)),U.setAttribute("uv",new Pi(A,S)),U.setAttribute("faceIndex",new Pi(T,g)),e.push(U),o>eo&&o--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function A0(s,e,t){const r=new cs(s,e,t);return r.texture.mapping=pc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function jl(s,e,t,r,o){s.viewport.set(e,t,r,o),s.scissor.set(e,t,r,o)}function yE(s,e,t){const r=new Float32Array(ss),o=new X(0,1,0);return new Ir({name:"SphericalGaussianBlur",defines:{n:ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Kh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pr,depthTest:!1,depthWrite:!1})}function C0(){return new Ir({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pr,depthTest:!1,depthWrite:!1})}function R0(){return new Ir({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pr,depthTest:!1,depthWrite:!1})}function Kh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function SE(s){let e=new WeakMap,t=null;function r(d){if(d&&d.isTexture){const h=d.mapping,p=h===Kd||h===Qd,m=h===oo||h===ao;if(p||m){let v=e.get(d);const x=v!==void 0?v.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return t===null&&(t=new b0(s)),v=p?t.fromEquirectangular(d,v):t.fromCubemap(d,v),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),v.texture;if(v!==void 0)return v.texture;{const y=d.image;return p&&y&&y.height>0||m&&y&&o(y)?(t===null&&(t=new b0(s)),v=p?t.fromEquirectangular(d):t.fromCubemap(d),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),d.addEventListener("dispose",l),v.texture):null}}}return d}function o(d){let h=0;const p=6;for(let m=0;m<p;m++)d[m]!==void 0&&h++;return h===p}function l(d){const h=d.target;h.removeEventListener("dispose",l);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:u}}function ME(s){const e={};function t(r){if(e[r]!==void 0)return e[r];let o;switch(r){case"WEBGL_depth_texture":o=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=s.getExtension(r)}return e[r]=o,o}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const o=t(r);return o===null&&Ks("THREE.WebGLRenderer: "+r+" extension not supported."),o}}}function EE(s,e,t,r){const o={},l=new WeakMap;function u(v){const x=v.target;x.index!==null&&e.remove(x.index);for(const E in x.attributes)e.remove(x.attributes[E]);x.removeEventListener("dispose",u),delete o[x.id];const y=l.get(x);y&&(e.remove(y),l.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function d(v,x){return o[x.id]===!0||(x.addEventListener("dispose",u),o[x.id]=!0,t.memory.geometries++),x}function h(v){const x=v.attributes;for(const y in x)e.update(x[y],s.ARRAY_BUFFER)}function p(v){const x=[],y=v.index,E=v.attributes.position;let M=0;if(y!==null){const C=y.array;M=y.version;for(let A=0,T=C.length;A<T;A+=3){const U=C[A+0],L=C[A+1],I=C[A+2];x.push(U,L,L,I,I,U)}}else if(E!==void 0){const C=E.array;M=E.version;for(let A=0,T=C.length/3-1;A<T;A+=3){const U=A+0,L=A+1,I=A+2;x.push(U,L,L,I,I,U)}}else return;const S=new(wg(x)?Rg:Cg)(x,1);S.version=M;const g=l.get(v);g&&e.remove(g),l.set(v,S)}function m(v){const x=l.get(v);if(x){const y=v.index;y!==null&&x.version<y.version&&p(v)}else p(v);return l.get(v)}return{get:d,update:h,getWireframeAttribute:m}}function wE(s,e,t){let r;function o(x){r=x}let l,u;function d(x){l=x.type,u=x.bytesPerElement}function h(x,y){s.drawElements(r,y,l,x*u),t.update(y,r,1)}function p(x,y,E){E!==0&&(s.drawElementsInstanced(r,y,l,x*u,E),t.update(y,r,E))}function m(x,y,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,y,0,l,x,0,E);let S=0;for(let g=0;g<E;g++)S+=y[g];t.update(S,r,1)}function v(x,y,E,M){if(E===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let g=0;g<x.length;g++)p(x[g]/u,y[g],M[g]);else{S.multiDrawElementsInstancedWEBGL(r,y,0,l,x,0,M,0,E);let g=0;for(let C=0;C<E;C++)g+=y[C]*M[C];t.update(g,r,1)}}this.setMode=o,this.setIndex=d,this.render=h,this.renderInstances=p,this.renderMultiDraw=m,this.renderMultiDrawInstances=v}function TE(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,u,d){switch(t.calls++,u){case s.TRIANGLES:t.triangles+=d*(l/3);break;case s.LINES:t.lines+=d*(l/2);break;case s.LINE_STRIP:t.lines+=d*(l-1);break;case s.LINE_LOOP:t.lines+=d*l;break;case s.POINTS:t.points+=d*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:r}}function bE(s,e,t){const r=new WeakMap,o=new Kt;function l(u,d,h){const p=u.morphTargetInfluences,m=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,v=m!==void 0?m.length:0;let x=r.get(d);if(x===void 0||x.count!==v){let P=function(){O.dispose(),r.delete(d),d.removeEventListener("dispose",P)};var y=P;x!==void 0&&x.texture.dispose();const E=d.morphAttributes.position!==void 0,M=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,g=d.morphAttributes.position||[],C=d.morphAttributes.normal||[],A=d.morphAttributes.color||[];let T=0;E===!0&&(T=1),M===!0&&(T=2),S===!0&&(T=3);let U=d.attributes.position.count*T,L=1;U>e.maxTextureSize&&(L=Math.ceil(U/e.maxTextureSize),U=e.maxTextureSize);const I=new Float32Array(U*L*4*v),O=new bg(I,U,L,v);O.type=qi,O.needsUpdate=!0;const R=T*4;for(let F=0;F<v;F++){const ne=g[F],q=C[F],V=A[F],J=U*L*4*F;for(let ee=0;ee<ne.count;ee++){const ae=ee*R;E===!0&&(o.fromBufferAttribute(ne,ee),I[J+ae+0]=o.x,I[J+ae+1]=o.y,I[J+ae+2]=o.z,I[J+ae+3]=0),M===!0&&(o.fromBufferAttribute(q,ee),I[J+ae+4]=o.x,I[J+ae+5]=o.y,I[J+ae+6]=o.z,I[J+ae+7]=0),S===!0&&(o.fromBufferAttribute(V,ee),I[J+ae+8]=o.x,I[J+ae+9]=o.y,I[J+ae+10]=o.z,I[J+ae+11]=V.itemSize===4?o.w:1)}}x={count:v,texture:O,size:new Ue(U,L)},r.set(d,x),d.addEventListener("dispose",P)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",u.morphTexture,t);else{let E=0;for(let S=0;S<p.length;S++)E+=p[S];const M=d.morphTargetsRelative?1:1-E;h.getUniforms().setValue(s,"morphTargetBaseInfluence",M),h.getUniforms().setValue(s,"morphTargetInfluences",p)}h.getUniforms().setValue(s,"morphTargetsTexture",x.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}return{update:l}}function AE(s,e,t,r){let o=new WeakMap;function l(h){const p=r.render.frame,m=h.geometry,v=e.get(h,m);if(o.get(v)!==p&&(e.update(v),o.set(v,p)),h.isInstancedMesh&&(h.hasEventListener("dispose",d)===!1&&h.addEventListener("dispose",d),o.get(h)!==p&&(t.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,s.ARRAY_BUFFER),o.set(h,p))),h.isSkinnedMesh){const x=h.skeleton;o.get(x)!==p&&(x.update(),o.set(x,p))}return v}function u(){o=new WeakMap}function d(h){const p=h.target;p.removeEventListener("dispose",d),t.remove(p.instanceMatrix),p.instanceColor!==null&&t.remove(p.instanceColor)}return{update:l,dispose:u}}const Vg=new Wn,P0=new Ig(1,1),Gg=new bg,Wg=new By,jg=new Dg,N0=[],D0=[],L0=new Float32Array(16),I0=new Float32Array(9),U0=new Float32Array(4);function po(s,e,t){const r=s[0];if(r<=0||r>0)return s;const o=e*t;let l=N0[o];if(l===void 0&&(l=new Float32Array(o),N0[o]=l),e!==0){r.toArray(l,0);for(let u=1,d=0;u!==e;++u)d+=t,s[u].toArray(l,d)}return l}function an(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function ln(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function xc(s,e){let t=D0[e];t===void 0&&(t=new Int32Array(e),D0[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function CE(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function RE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;s.uniform2fv(this.addr,e),ln(t,e)}}function PE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;s.uniform3fv(this.addr,e),ln(t,e)}}function NE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;s.uniform4fv(this.addr,e),ln(t,e)}}function DE(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(an(t,r))return;U0.set(r),s.uniformMatrix2fv(this.addr,!1,U0),ln(t,r)}}function LE(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(an(t,r))return;I0.set(r),s.uniformMatrix3fv(this.addr,!1,I0),ln(t,r)}}function IE(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(an(t,r))return;L0.set(r),s.uniformMatrix4fv(this.addr,!1,L0),ln(t,r)}}function UE(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function kE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;s.uniform2iv(this.addr,e),ln(t,e)}}function OE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;s.uniform3iv(this.addr,e),ln(t,e)}}function FE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;s.uniform4iv(this.addr,e),ln(t,e)}}function zE(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function BE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;s.uniform2uiv(this.addr,e),ln(t,e)}}function HE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;s.uniform3uiv(this.addr,e),ln(t,e)}}function VE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;s.uniform4uiv(this.addr,e),ln(t,e)}}function GE(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o);let l;this.type===s.SAMPLER_2D_SHADOW?(P0.compareFunction=Eg,l=P0):l=Vg,t.setTexture2D(e||l,o)}function WE(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture3D(e||Wg,o)}function jE(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTextureCube(e||jg,o)}function XE(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture2DArray(e||Gg,o)}function $E(s){switch(s){case 5126:return CE;case 35664:return RE;case 35665:return PE;case 35666:return NE;case 35674:return DE;case 35675:return LE;case 35676:return IE;case 5124:case 35670:return UE;case 35667:case 35671:return kE;case 35668:case 35672:return OE;case 35669:case 35673:return FE;case 5125:return zE;case 36294:return BE;case 36295:return HE;case 36296:return VE;case 35678:case 36198:case 36298:case 36306:case 35682:return GE;case 35679:case 36299:case 36307:return WE;case 35680:case 36300:case 36308:case 36293:return jE;case 36289:case 36303:case 36311:case 36292:return XE}}function YE(s,e){s.uniform1fv(this.addr,e)}function qE(s,e){const t=po(e,this.size,2);s.uniform2fv(this.addr,t)}function ZE(s,e){const t=po(e,this.size,3);s.uniform3fv(this.addr,t)}function KE(s,e){const t=po(e,this.size,4);s.uniform4fv(this.addr,t)}function QE(s,e){const t=po(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function JE(s,e){const t=po(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function ew(s,e){const t=po(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function tw(s,e){s.uniform1iv(this.addr,e)}function nw(s,e){s.uniform2iv(this.addr,e)}function iw(s,e){s.uniform3iv(this.addr,e)}function rw(s,e){s.uniform4iv(this.addr,e)}function sw(s,e){s.uniform1uiv(this.addr,e)}function ow(s,e){s.uniform2uiv(this.addr,e)}function aw(s,e){s.uniform3uiv(this.addr,e)}function lw(s,e){s.uniform4uiv(this.addr,e)}function cw(s,e,t){const r=this.cache,o=e.length,l=xc(t,o);an(r,l)||(s.uniform1iv(this.addr,l),ln(r,l));for(let u=0;u!==o;++u)t.setTexture2D(e[u]||Vg,l[u])}function uw(s,e,t){const r=this.cache,o=e.length,l=xc(t,o);an(r,l)||(s.uniform1iv(this.addr,l),ln(r,l));for(let u=0;u!==o;++u)t.setTexture3D(e[u]||Wg,l[u])}function dw(s,e,t){const r=this.cache,o=e.length,l=xc(t,o);an(r,l)||(s.uniform1iv(this.addr,l),ln(r,l));for(let u=0;u!==o;++u)t.setTextureCube(e[u]||jg,l[u])}function hw(s,e,t){const r=this.cache,o=e.length,l=xc(t,o);an(r,l)||(s.uniform1iv(this.addr,l),ln(r,l));for(let u=0;u!==o;++u)t.setTexture2DArray(e[u]||Gg,l[u])}function fw(s){switch(s){case 5126:return YE;case 35664:return qE;case 35665:return ZE;case 35666:return KE;case 35674:return QE;case 35675:return JE;case 35676:return ew;case 5124:case 35670:return tw;case 35667:case 35671:return nw;case 35668:case 35672:return iw;case 35669:case 35673:return rw;case 5125:return sw;case 36294:return ow;case 36295:return aw;case 36296:return lw;case 35678:case 36198:case 36298:case 36306:case 35682:return cw;case 35679:case 36299:case 36307:return uw;case 35680:case 36300:case 36308:case 36293:return dw;case 36289:case 36303:case 36311:case 36292:return hw}}class pw{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=$E(t.type)}}class mw{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fw(t.type)}}class gw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const o=this.seq;for(let l=0,u=o.length;l!==u;++l){const d=o[l];d.setValue(e,t[d.id],r)}}}const Fd=/(\w+)(\])?(\[|\.)?/g;function k0(s,e){s.seq.push(e),s.map[e.id]=e}function vw(s,e,t){const r=s.name,o=r.length;for(Fd.lastIndex=0;;){const l=Fd.exec(r),u=Fd.lastIndex;let d=l[1];const h=l[2]==="]",p=l[3];if(h&&(d=d|0),p===void 0||p==="["&&u+2===o){k0(t,p===void 0?new pw(d,s,e):new mw(d,s,e));break}else{let v=t.map[d];v===void 0&&(v=new gw(d),k0(t,v)),t=v}}}class ec{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<r;++o){const l=e.getActiveUniform(t,o),u=e.getUniformLocation(t,l.name);vw(l,u,this)}}setValue(e,t,r,o){const l=this.map[t];l!==void 0&&l.setValue(e,r,o)}setOptional(e,t,r){const o=t[r];o!==void 0&&this.setValue(e,r,o)}static upload(e,t,r,o){for(let l=0,u=t.length;l!==u;++l){const d=t[l],h=r[d.id];h.needsUpdate!==!1&&d.setValue(e,h.value,o)}}static seqWithValue(e,t){const r=[];for(let o=0,l=e.length;o!==l;++o){const u=e[o];u.id in t&&r.push(u)}return r}}function O0(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const xw=37297;let _w=0;function yw(s,e){const t=s.split(`
`),r=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let u=o;u<l;u++){const d=u+1;r.push(`${d===e?">":" "} ${d}: ${t[u]}`)}return r.join(`
`)}const F0=new ft;function Sw(s){Rt._getMatrix(F0,Rt.workingColorSpace,s);const e=`mat3( ${F0.elements.map(t=>t.toFixed(4))} )`;switch(Rt.getTransfer(s)){case nc:return[e,"LinearTransferOETF"];case kt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function z0(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),o=s.getShaderInfoLog(e).trim();if(r&&o==="")return"";const l=/ERROR: 0:(\d+)/.exec(o);if(l){const u=parseInt(l[1]);return t.toUpperCase()+`

`+o+`

`+yw(s.getShaderSource(e),u)}else return o}function Mw(s,e){const t=Sw(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Ew(s,e){let t;switch(e){case dy:t="Linear";break;case hy:t="Reinhard";break;case fy:t="Cineon";break;case py:t="ACESFilmic";break;case gy:t="AgX";break;case vy:t="Neutral";break;case my:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Xl=new X;function ww(){Rt.getLuminanceCoefficients(Xl);const s=Xl.x.toFixed(4),e=Xl.y.toFixed(4),t=Xl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tw(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ea).join(`
`)}function bw(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function Aw(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let o=0;o<r;o++){const l=s.getActiveAttrib(e,o),u=l.name;let d=1;l.type===s.FLOAT_MAT2&&(d=2),l.type===s.FLOAT_MAT3&&(d=3),l.type===s.FLOAT_MAT4&&(d=4),t[u]={type:l.type,location:s.getAttribLocation(e,u),locationSize:d}}return t}function ea(s){return s!==""}function B0(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function H0(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Cw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nh(s){return s.replace(Cw,Pw)}const Rw=new Map;function Pw(s,e){let t=mt[e];if(t===void 0){const r=Rw.get(e);if(r!==void 0)t=mt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Nh(t)}const Nw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function V0(s){return s.replace(Nw,Dw)}function Dw(s,e,t,r){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function G0(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Lw(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===cg?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===W_?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Yi&&(e="SHADOWMAP_TYPE_VSM"),e}function Iw(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case oo:case ao:e="ENVMAP_TYPE_CUBE";break;case pc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Uw(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ao:e="ENVMAP_MODE_REFRACTION";break}return e}function kw(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case ug:e="ENVMAP_BLENDING_MULTIPLY";break;case cy:e="ENVMAP_BLENDING_MIX";break;case uy:e="ENVMAP_BLENDING_ADD";break}return e}function Ow(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function Fw(s,e,t,r){const o=s.getContext(),l=t.defines;let u=t.vertexShader,d=t.fragmentShader;const h=Lw(t),p=Iw(t),m=Uw(t),v=kw(t),x=Ow(t),y=Tw(t),E=bw(l),M=o.createProgram();let S,g,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(ea).join(`
`),S.length>0&&(S+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(ea).join(`
`),g.length>0&&(g+=`
`)):(S=[G0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ea).join(`
`),g=[G0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.envMap?"#define "+m:"",t.envMap?"#define "+v:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nr?"#define TONE_MAPPING":"",t.toneMapping!==Nr?mt.tonemapping_pars_fragment:"",t.toneMapping!==Nr?Ew("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,Mw("linearToOutputTexel",t.outputColorSpace),ww(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ea).join(`
`)),u=Nh(u),u=B0(u,t),u=H0(u,t),d=Nh(d),d=B0(d,t),d=H0(d,t),u=V0(u),d=V0(d),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,S=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,g=["#define varying in",t.glslVersion===jm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const A=C+S+u,T=C+g+d,U=O0(o,o.VERTEX_SHADER,A),L=O0(o,o.FRAGMENT_SHADER,T);o.attachShader(M,U),o.attachShader(M,L),t.index0AttributeName!==void 0?o.bindAttribLocation(M,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(M,0,"position"),o.linkProgram(M);function I(F){if(s.debug.checkShaderErrors){const ne=o.getProgramInfoLog(M).trim(),q=o.getShaderInfoLog(U).trim(),V=o.getShaderInfoLog(L).trim();let J=!0,ee=!0;if(o.getProgramParameter(M,o.LINK_STATUS)===!1)if(J=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(o,M,U,L);else{const ae=z0(o,U,"vertex"),H=z0(o,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(M,o.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+ne+`
`+ae+`
`+H)}else ne!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ne):(q===""||V==="")&&(ee=!1);ee&&(F.diagnostics={runnable:J,programLog:ne,vertexShader:{log:q,prefix:S},fragmentShader:{log:V,prefix:g}})}o.deleteShader(U),o.deleteShader(L),O=new ec(o,M),R=Aw(o,M)}let O;this.getUniforms=function(){return O===void 0&&I(this),O};let R;this.getAttributes=function(){return R===void 0&&I(this),R};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=o.getProgramParameter(M,xw)),P},this.destroy=function(){r.releaseStatesOfProgram(this),o.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_w++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=U,this.fragmentShader=L,this}let zw=0;class Bw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(r),u=this._getShaderCacheForMaterial(e);return u.has(o)===!1&&(u.add(o),o.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new Hw(e),t.set(e,r)),r}}class Hw{constructor(e){this.id=zw++,this.code=e,this.usedTimes=0}}function Vw(s,e,t,r,o,l,u){const d=new Gh,h=new Bw,p=new Set,m=[],v=o.logarithmicDepthBuffer,x=o.vertexTextures;let y=o.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(R){return p.add(R),R===0?"uv":`uv${R}`}function S(R,P,F,ne,q){const V=ne.fog,J=q.geometry,ee=R.isMeshStandardMaterial?ne.environment:null,ae=(R.isMeshStandardMaterial?t:e).get(R.envMap||ee),H=ae&&ae.mapping===pc?ae.image.height:null,le=E[R.type];R.precision!==null&&(y=o.getMaxPrecision(R.precision),y!==R.precision&&console.warn("THREE.WebGLProgram.getParameters:",R.precision,"not supported, using",y,"instead."));const ie=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,B=ie!==void 0?ie.length:0;let ce=0;J.morphAttributes.position!==void 0&&(ce=1),J.morphAttributes.normal!==void 0&&(ce=2),J.morphAttributes.color!==void 0&&(ce=3);let se,K,oe,j;if(le){const wt=Ci[le];se=wt.vertexShader,K=wt.fragmentShader}else se=R.vertexShader,K=R.fragmentShader,h.update(R),oe=h.getVertexShaderID(R),j=h.getFragmentShaderID(R);const te=s.getRenderTarget(),ge=s.state.buffers.depth.getReversed(),ye=q.isInstancedMesh===!0,Ce=q.isBatchedMesh===!0,st=!!R.map,Ze=!!R.matcap,ut=!!ae,W=!!R.aoMap,Ft=!!R.lightMap,ot=!!R.bumpMap,ht=!!R.normalMap,We=!!R.displacementMap,Lt=!!R.emissiveMap,Ye=!!R.metalnessMap,k=!!R.roughnessMap,N=R.anisotropy>0,de=R.clearcoat>0,_e=R.dispersion>0,Me=R.iridescence>0,ve=R.sheen>0,Xe=R.transmission>0,Re=N&&!!R.anisotropyMap,Fe=de&&!!R.clearcoatMap,gt=de&&!!R.clearcoatNormalMap,be=de&&!!R.clearcoatRoughnessMap,He=Me&&!!R.iridescenceMap,Qe=Me&&!!R.iridescenceThicknessMap,tt=ve&&!!R.sheenColorMap,Ve=ve&&!!R.sheenRoughnessMap,vt=!!R.specularMap,at=!!R.specularColorMap,Pt=!!R.specularIntensityMap,Z=Xe&&!!R.transmissionMap,Pe=Xe&&!!R.thicknessMap,me=!!R.gradientMap,xe=!!R.alphaMap,Ie=R.alphaTest>0,Le=!!R.alphaHash,lt=!!R.extensions;let Bt=Nr;R.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Bt=s.toneMapping);const nn={shaderID:le,shaderType:R.type,shaderName:R.name,vertexShader:se,fragmentShader:K,defines:R.defines,customVertexShaderID:oe,customFragmentShaderID:j,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:y,batching:Ce,batchingColor:Ce&&q._colorsTexture!==null,instancing:ye,instancingColor:ye&&q.instanceColor!==null,instancingMorph:ye&&q.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:te===null?s.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:uo,alphaToCoverage:!!R.alphaToCoverage,map:st,matcap:Ze,envMap:ut,envMapMode:ut&&ae.mapping,envMapCubeUVHeight:H,aoMap:W,lightMap:Ft,bumpMap:ot,normalMap:ht,displacementMap:x&&We,emissiveMap:Lt,normalMapObjectSpace:ht&&R.normalMapType===Sy,normalMapTangentSpace:ht&&R.normalMapType===Mg,metalnessMap:Ye,roughnessMap:k,anisotropy:N,anisotropyMap:Re,clearcoat:de,clearcoatMap:Fe,clearcoatNormalMap:gt,clearcoatRoughnessMap:be,dispersion:_e,iridescence:Me,iridescenceMap:He,iridescenceThicknessMap:Qe,sheen:ve,sheenColorMap:tt,sheenRoughnessMap:Ve,specularMap:vt,specularColorMap:at,specularIntensityMap:Pt,transmission:Xe,transmissionMap:Z,thicknessMap:Pe,gradientMap:me,opaque:R.transparent===!1&&R.blending===no&&R.alphaToCoverage===!1,alphaMap:xe,alphaTest:Ie,alphaHash:Le,combine:R.combine,mapUv:st&&M(R.map.channel),aoMapUv:W&&M(R.aoMap.channel),lightMapUv:Ft&&M(R.lightMap.channel),bumpMapUv:ot&&M(R.bumpMap.channel),normalMapUv:ht&&M(R.normalMap.channel),displacementMapUv:We&&M(R.displacementMap.channel),emissiveMapUv:Lt&&M(R.emissiveMap.channel),metalnessMapUv:Ye&&M(R.metalnessMap.channel),roughnessMapUv:k&&M(R.roughnessMap.channel),anisotropyMapUv:Re&&M(R.anisotropyMap.channel),clearcoatMapUv:Fe&&M(R.clearcoatMap.channel),clearcoatNormalMapUv:gt&&M(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&M(R.clearcoatRoughnessMap.channel),iridescenceMapUv:He&&M(R.iridescenceMap.channel),iridescenceThicknessMapUv:Qe&&M(R.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&M(R.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&M(R.sheenRoughnessMap.channel),specularMapUv:vt&&M(R.specularMap.channel),specularColorMapUv:at&&M(R.specularColorMap.channel),specularIntensityMapUv:Pt&&M(R.specularIntensityMap.channel),transmissionMapUv:Z&&M(R.transmissionMap.channel),thicknessMapUv:Pe&&M(R.thicknessMap.channel),alphaMapUv:xe&&M(R.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(ht||N),vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!J.attributes.uv&&(st||xe),fog:!!V,useFog:R.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:R.flatShading===!0,sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:v,reverseDepthBuffer:ge,skinning:q.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:B,morphTextureStride:ce,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:R.dithering,shadowMapEnabled:s.shadowMap.enabled&&F.length>0,shadowMapType:s.shadowMap.type,toneMapping:Bt,decodeVideoTexture:st&&R.map.isVideoTexture===!0&&Rt.getTransfer(R.map.colorSpace)===kt,decodeVideoTextureEmissive:Lt&&R.emissiveMap.isVideoTexture===!0&&Rt.getTransfer(R.emissiveMap.colorSpace)===kt,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===xi,flipSided:R.side===Gn,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionClipCullDistance:lt&&R.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(lt&&R.extensions.multiDraw===!0||Ce)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()};return nn.vertexUv1s=p.has(1),nn.vertexUv2s=p.has(2),nn.vertexUv3s=p.has(3),p.clear(),nn}function g(R){const P=[];if(R.shaderID?P.push(R.shaderID):(P.push(R.customVertexShaderID),P.push(R.customFragmentShaderID)),R.defines!==void 0)for(const F in R.defines)P.push(F),P.push(R.defines[F]);return R.isRawShaderMaterial===!1&&(C(P,R),A(P,R),P.push(s.outputColorSpace)),P.push(R.customProgramCacheKey),P.join()}function C(R,P){R.push(P.precision),R.push(P.outputColorSpace),R.push(P.envMapMode),R.push(P.envMapCubeUVHeight),R.push(P.mapUv),R.push(P.alphaMapUv),R.push(P.lightMapUv),R.push(P.aoMapUv),R.push(P.bumpMapUv),R.push(P.normalMapUv),R.push(P.displacementMapUv),R.push(P.emissiveMapUv),R.push(P.metalnessMapUv),R.push(P.roughnessMapUv),R.push(P.anisotropyMapUv),R.push(P.clearcoatMapUv),R.push(P.clearcoatNormalMapUv),R.push(P.clearcoatRoughnessMapUv),R.push(P.iridescenceMapUv),R.push(P.iridescenceThicknessMapUv),R.push(P.sheenColorMapUv),R.push(P.sheenRoughnessMapUv),R.push(P.specularMapUv),R.push(P.specularColorMapUv),R.push(P.specularIntensityMapUv),R.push(P.transmissionMapUv),R.push(P.thicknessMapUv),R.push(P.combine),R.push(P.fogExp2),R.push(P.sizeAttenuation),R.push(P.morphTargetsCount),R.push(P.morphAttributeCount),R.push(P.numDirLights),R.push(P.numPointLights),R.push(P.numSpotLights),R.push(P.numSpotLightMaps),R.push(P.numHemiLights),R.push(P.numRectAreaLights),R.push(P.numDirLightShadows),R.push(P.numPointLightShadows),R.push(P.numSpotLightShadows),R.push(P.numSpotLightShadowsWithMaps),R.push(P.numLightProbes),R.push(P.shadowMapType),R.push(P.toneMapping),R.push(P.numClippingPlanes),R.push(P.numClipIntersection),R.push(P.depthPacking)}function A(R,P){d.disableAll(),P.supportsVertexTextures&&d.enable(0),P.instancing&&d.enable(1),P.instancingColor&&d.enable(2),P.instancingMorph&&d.enable(3),P.matcap&&d.enable(4),P.envMap&&d.enable(5),P.normalMapObjectSpace&&d.enable(6),P.normalMapTangentSpace&&d.enable(7),P.clearcoat&&d.enable(8),P.iridescence&&d.enable(9),P.alphaTest&&d.enable(10),P.vertexColors&&d.enable(11),P.vertexAlphas&&d.enable(12),P.vertexUv1s&&d.enable(13),P.vertexUv2s&&d.enable(14),P.vertexUv3s&&d.enable(15),P.vertexTangents&&d.enable(16),P.anisotropy&&d.enable(17),P.alphaHash&&d.enable(18),P.batching&&d.enable(19),P.dispersion&&d.enable(20),P.batchingColor&&d.enable(21),R.push(d.mask),d.disableAll(),P.fog&&d.enable(0),P.useFog&&d.enable(1),P.flatShading&&d.enable(2),P.logarithmicDepthBuffer&&d.enable(3),P.reverseDepthBuffer&&d.enable(4),P.skinning&&d.enable(5),P.morphTargets&&d.enable(6),P.morphNormals&&d.enable(7),P.morphColors&&d.enable(8),P.premultipliedAlpha&&d.enable(9),P.shadowMapEnabled&&d.enable(10),P.doubleSided&&d.enable(11),P.flipSided&&d.enable(12),P.useDepthPacking&&d.enable(13),P.dithering&&d.enable(14),P.transmission&&d.enable(15),P.sheen&&d.enable(16),P.opaque&&d.enable(17),P.pointsUvs&&d.enable(18),P.decodeVideoTexture&&d.enable(19),P.decodeVideoTextureEmissive&&d.enable(20),P.alphaToCoverage&&d.enable(21),R.push(d.mask)}function T(R){const P=E[R.type];let F;if(P){const ne=Ci[P];F=Qy.clone(ne.uniforms)}else F=R.uniforms;return F}function U(R,P){let F;for(let ne=0,q=m.length;ne<q;ne++){const V=m[ne];if(V.cacheKey===P){F=V,++F.usedTimes;break}}return F===void 0&&(F=new Fw(s,P,R,l),m.push(F)),F}function L(R){if(--R.usedTimes===0){const P=m.indexOf(R);m[P]=m[m.length-1],m.pop(),R.destroy()}}function I(R){h.remove(R)}function O(){h.dispose()}return{getParameters:S,getProgramCacheKey:g,getUniforms:T,acquireProgram:U,releaseProgram:L,releaseShaderCache:I,programs:m,dispose:O}}function Gw(){let s=new WeakMap;function e(u){return s.has(u)}function t(u){let d=s.get(u);return d===void 0&&(d={},s.set(u,d)),d}function r(u){s.delete(u)}function o(u,d,h){s.get(u)[d]=h}function l(){s=new WeakMap}return{has:e,get:t,remove:r,update:o,dispose:l}}function Ww(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function W0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function j0(){const s=[];let e=0;const t=[],r=[],o=[];function l(){e=0,t.length=0,r.length=0,o.length=0}function u(v,x,y,E,M,S){let g=s[e];return g===void 0?(g={id:v.id,object:v,geometry:x,material:y,groupOrder:E,renderOrder:v.renderOrder,z:M,group:S},s[e]=g):(g.id=v.id,g.object=v,g.geometry=x,g.material=y,g.groupOrder=E,g.renderOrder=v.renderOrder,g.z=M,g.group=S),e++,g}function d(v,x,y,E,M,S){const g=u(v,x,y,E,M,S);y.transmission>0?r.push(g):y.transparent===!0?o.push(g):t.push(g)}function h(v,x,y,E,M,S){const g=u(v,x,y,E,M,S);y.transmission>0?r.unshift(g):y.transparent===!0?o.unshift(g):t.unshift(g)}function p(v,x){t.length>1&&t.sort(v||Ww),r.length>1&&r.sort(x||W0),o.length>1&&o.sort(x||W0)}function m(){for(let v=e,x=s.length;v<x;v++){const y=s[v];if(y.id===null)break;y.id=null,y.object=null,y.geometry=null,y.material=null,y.group=null}}return{opaque:t,transmissive:r,transparent:o,init:l,push:d,unshift:h,finish:m,sort:p}}function jw(){let s=new WeakMap;function e(r,o){const l=s.get(r);let u;return l===void 0?(u=new j0,s.set(r,[u])):o>=l.length?(u=new j0,l.push(u)):u=l[o],u}function t(){s=new WeakMap}return{get:e,dispose:t}}function Xw(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new X,color:new dt};break;case"SpotLight":t={position:new X,direction:new X,color:new dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new dt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new dt,groundColor:new dt};break;case"RectAreaLight":t={color:new dt,position:new X,halfWidth:new X,halfHeight:new X};break}return s[e.id]=t,t}}}function $w(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Yw=0;function qw(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Zw(s){const e=new Xw,t=$w(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new X);const o=new X,l=new Gt,u=new Gt;function d(p){let m=0,v=0,x=0;for(let R=0;R<9;R++)r.probe[R].set(0,0,0);let y=0,E=0,M=0,S=0,g=0,C=0,A=0,T=0,U=0,L=0,I=0;p.sort(qw);for(let R=0,P=p.length;R<P;R++){const F=p[R],ne=F.color,q=F.intensity,V=F.distance,J=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)m+=ne.r*q,v+=ne.g*q,x+=ne.b*q;else if(F.isLightProbe){for(let ee=0;ee<9;ee++)r.probe[ee].addScaledVector(F.sh.coefficients[ee],q);I++}else if(F.isDirectionalLight){const ee=e.get(F);if(ee.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const ae=F.shadow,H=t.get(F);H.shadowIntensity=ae.intensity,H.shadowBias=ae.bias,H.shadowNormalBias=ae.normalBias,H.shadowRadius=ae.radius,H.shadowMapSize=ae.mapSize,r.directionalShadow[y]=H,r.directionalShadowMap[y]=J,r.directionalShadowMatrix[y]=F.shadow.matrix,C++}r.directional[y]=ee,y++}else if(F.isSpotLight){const ee=e.get(F);ee.position.setFromMatrixPosition(F.matrixWorld),ee.color.copy(ne).multiplyScalar(q),ee.distance=V,ee.coneCos=Math.cos(F.angle),ee.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),ee.decay=F.decay,r.spot[M]=ee;const ae=F.shadow;if(F.map&&(r.spotLightMap[U]=F.map,U++,ae.updateMatrices(F),F.castShadow&&L++),r.spotLightMatrix[M]=ae.matrix,F.castShadow){const H=t.get(F);H.shadowIntensity=ae.intensity,H.shadowBias=ae.bias,H.shadowNormalBias=ae.normalBias,H.shadowRadius=ae.radius,H.shadowMapSize=ae.mapSize,r.spotShadow[M]=H,r.spotShadowMap[M]=J,T++}M++}else if(F.isRectAreaLight){const ee=e.get(F);ee.color.copy(ne).multiplyScalar(q),ee.halfWidth.set(F.width*.5,0,0),ee.halfHeight.set(0,F.height*.5,0),r.rectArea[S]=ee,S++}else if(F.isPointLight){const ee=e.get(F);if(ee.color.copy(F.color).multiplyScalar(F.intensity),ee.distance=F.distance,ee.decay=F.decay,F.castShadow){const ae=F.shadow,H=t.get(F);H.shadowIntensity=ae.intensity,H.shadowBias=ae.bias,H.shadowNormalBias=ae.normalBias,H.shadowRadius=ae.radius,H.shadowMapSize=ae.mapSize,H.shadowCameraNear=ae.camera.near,H.shadowCameraFar=ae.camera.far,r.pointShadow[E]=H,r.pointShadowMap[E]=J,r.pointShadowMatrix[E]=F.shadow.matrix,A++}r.point[E]=ee,E++}else if(F.isHemisphereLight){const ee=e.get(F);ee.skyColor.copy(F.color).multiplyScalar(q),ee.groundColor.copy(F.groundColor).multiplyScalar(q),r.hemi[g]=ee,g++}}S>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=De.LTC_FLOAT_1,r.rectAreaLTC2=De.LTC_FLOAT_2):(r.rectAreaLTC1=De.LTC_HALF_1,r.rectAreaLTC2=De.LTC_HALF_2)),r.ambient[0]=m,r.ambient[1]=v,r.ambient[2]=x;const O=r.hash;(O.directionalLength!==y||O.pointLength!==E||O.spotLength!==M||O.rectAreaLength!==S||O.hemiLength!==g||O.numDirectionalShadows!==C||O.numPointShadows!==A||O.numSpotShadows!==T||O.numSpotMaps!==U||O.numLightProbes!==I)&&(r.directional.length=y,r.spot.length=M,r.rectArea.length=S,r.point.length=E,r.hemi.length=g,r.directionalShadow.length=C,r.directionalShadowMap.length=C,r.pointShadow.length=A,r.pointShadowMap.length=A,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=C,r.pointShadowMatrix.length=A,r.spotLightMatrix.length=T+U-L,r.spotLightMap.length=U,r.numSpotLightShadowsWithMaps=L,r.numLightProbes=I,O.directionalLength=y,O.pointLength=E,O.spotLength=M,O.rectAreaLength=S,O.hemiLength=g,O.numDirectionalShadows=C,O.numPointShadows=A,O.numSpotShadows=T,O.numSpotMaps=U,O.numLightProbes=I,r.version=Yw++)}function h(p,m){let v=0,x=0,y=0,E=0,M=0;const S=m.matrixWorldInverse;for(let g=0,C=p.length;g<C;g++){const A=p[g];if(A.isDirectionalLight){const T=r.directional[v];T.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),T.direction.sub(o),T.direction.transformDirection(S),v++}else if(A.isSpotLight){const T=r.spot[y];T.position.setFromMatrixPosition(A.matrixWorld),T.position.applyMatrix4(S),T.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),T.direction.sub(o),T.direction.transformDirection(S),y++}else if(A.isRectAreaLight){const T=r.rectArea[E];T.position.setFromMatrixPosition(A.matrixWorld),T.position.applyMatrix4(S),u.identity(),l.copy(A.matrixWorld),l.premultiply(S),u.extractRotation(l),T.halfWidth.set(A.width*.5,0,0),T.halfHeight.set(0,A.height*.5,0),T.halfWidth.applyMatrix4(u),T.halfHeight.applyMatrix4(u),E++}else if(A.isPointLight){const T=r.point[x];T.position.setFromMatrixPosition(A.matrixWorld),T.position.applyMatrix4(S),x++}else if(A.isHemisphereLight){const T=r.hemi[M];T.direction.setFromMatrixPosition(A.matrixWorld),T.direction.transformDirection(S),M++}}}return{setup:d,setupView:h,state:r}}function X0(s){const e=new Zw(s),t=[],r=[];function o(m){p.camera=m,t.length=0,r.length=0}function l(m){t.push(m)}function u(m){r.push(m)}function d(){e.setup(t)}function h(m){e.setupView(t,m)}const p={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:o,state:p,setupLights:d,setupLightsView:h,pushLight:l,pushShadow:u}}function Kw(s){let e=new WeakMap;function t(o,l=0){const u=e.get(o);let d;return u===void 0?(d=new X0(s),e.set(o,[d])):l>=u.length?(d=new X0(s),u.push(d)):d=u[l],d}function r(){e=new WeakMap}return{get:t,dispose:r}}const Qw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function eT(s,e,t){let r=new Wh;const o=new Ue,l=new Ue,u=new Kt,d=new M1({depthPacking:yy}),h=new E1,p={},m=t.maxTextureSize,v={[Lr]:Gn,[Gn]:Lr,[xi]:xi},x=new Ir({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:Qw,fragmentShader:Jw}),y=x.clone();y.defines.HORIZONTAL_PASS=1;const E=new An;E.setAttribute("position",new Pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new bn(E,x),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cg;let g=this.type;this.render=function(L,I,O){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||L.length===0)return;const R=s.getRenderTarget(),P=s.getActiveCubeFace(),F=s.getActiveMipmapLevel(),ne=s.state;ne.setBlending(Pr),ne.buffers.color.setClear(1,1,1,1),ne.buffers.depth.setTest(!0),ne.setScissorTest(!1);const q=g!==Yi&&this.type===Yi,V=g===Yi&&this.type!==Yi;for(let J=0,ee=L.length;J<ee;J++){const ae=L[J],H=ae.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",ae,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;o.copy(H.mapSize);const le=H.getFrameExtents();if(o.multiply(le),l.copy(H.mapSize),(o.x>m||o.y>m)&&(o.x>m&&(l.x=Math.floor(m/le.x),o.x=l.x*le.x,H.mapSize.x=l.x),o.y>m&&(l.y=Math.floor(m/le.y),o.y=l.y*le.y,H.mapSize.y=l.y)),H.map===null||q===!0||V===!0){const B=this.type!==Yi?{minFilter:yi,magFilter:yi}:{};H.map!==null&&H.map.dispose(),H.map=new cs(o.x,o.y,B),H.map.texture.name=ae.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();const ie=H.getViewportCount();for(let B=0;B<ie;B++){const ce=H.getViewport(B);u.set(l.x*ce.x,l.y*ce.y,l.x*ce.z,l.y*ce.w),ne.viewport(u),H.updateMatrices(ae,B),r=H.getFrustum(),T(I,O,H.camera,ae,this.type)}H.isPointLightShadow!==!0&&this.type===Yi&&C(H,O),H.needsUpdate=!1}g=this.type,S.needsUpdate=!1,s.setRenderTarget(R,P,F)};function C(L,I){const O=e.update(M);x.defines.VSM_SAMPLES!==L.blurSamples&&(x.defines.VSM_SAMPLES=L.blurSamples,y.defines.VSM_SAMPLES=L.blurSamples,x.needsUpdate=!0,y.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new cs(o.x,o.y)),x.uniforms.shadow_pass.value=L.map.texture,x.uniforms.resolution.value=L.mapSize,x.uniforms.radius.value=L.radius,s.setRenderTarget(L.mapPass),s.clear(),s.renderBufferDirect(I,null,O,x,M,null),y.uniforms.shadow_pass.value=L.mapPass.texture,y.uniforms.resolution.value=L.mapSize,y.uniforms.radius.value=L.radius,s.setRenderTarget(L.map),s.clear(),s.renderBufferDirect(I,null,O,y,M,null)}function A(L,I,O,R){let P=null;const F=O.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(F!==void 0)P=F;else if(P=O.isPointLight===!0?h:d,s.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const ne=P.uuid,q=I.uuid;let V=p[ne];V===void 0&&(V={},p[ne]=V);let J=V[q];J===void 0&&(J=P.clone(),V[q]=J,I.addEventListener("dispose",U)),P=J}if(P.visible=I.visible,P.wireframe=I.wireframe,R===Yi?P.side=I.shadowSide!==null?I.shadowSide:I.side:P.side=I.shadowSide!==null?I.shadowSide:v[I.side],P.alphaMap=I.alphaMap,P.alphaTest=I.alphaTest,P.map=I.map,P.clipShadows=I.clipShadows,P.clippingPlanes=I.clippingPlanes,P.clipIntersection=I.clipIntersection,P.displacementMap=I.displacementMap,P.displacementScale=I.displacementScale,P.displacementBias=I.displacementBias,P.wireframeLinewidth=I.wireframeLinewidth,P.linewidth=I.linewidth,O.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const ne=s.properties.get(P);ne.light=O}return P}function T(L,I,O,R,P){if(L.visible===!1)return;if(L.layers.test(I.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&P===Yi)&&(!L.frustumCulled||r.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,L.matrixWorld);const q=e.update(L),V=L.material;if(Array.isArray(V)){const J=q.groups;for(let ee=0,ae=J.length;ee<ae;ee++){const H=J[ee],le=V[H.materialIndex];if(le&&le.visible){const ie=A(L,le,R,P);L.onBeforeShadow(s,L,I,O,q,ie,H),s.renderBufferDirect(O,null,q,ie,L,H),L.onAfterShadow(s,L,I,O,q,ie,H)}}}else if(V.visible){const J=A(L,V,R,P);L.onBeforeShadow(s,L,I,O,q,J,null),s.renderBufferDirect(O,null,q,J,L,null),L.onAfterShadow(s,L,I,O,q,J,null)}}const ne=L.children;for(let q=0,V=ne.length;q<V;q++)T(ne[q],I,O,R,P)}function U(L){L.target.removeEventListener("dispose",U);for(const O in p){const R=p[O],P=L.target.uuid;P in R&&(R[P].dispose(),delete R[P])}}}const tT={[Wd]:jd,[Xd]:qd,[$d]:Zd,[so]:Yd,[jd]:Wd,[qd]:Xd,[Zd]:$d,[Yd]:so};function nT(s,e){function t(){let Z=!1;const Pe=new Kt;let me=null;const xe=new Kt(0,0,0,0);return{setMask:function(Ie){me!==Ie&&!Z&&(s.colorMask(Ie,Ie,Ie,Ie),me=Ie)},setLocked:function(Ie){Z=Ie},setClear:function(Ie,Le,lt,Bt,nn){nn===!0&&(Ie*=Bt,Le*=Bt,lt*=Bt),Pe.set(Ie,Le,lt,Bt),xe.equals(Pe)===!1&&(s.clearColor(Ie,Le,lt,Bt),xe.copy(Pe))},reset:function(){Z=!1,me=null,xe.set(-1,0,0,0)}}}function r(){let Z=!1,Pe=!1,me=null,xe=null,Ie=null;return{setReversed:function(Le){if(Pe!==Le){const lt=e.get("EXT_clip_control");Pe?lt.clipControlEXT(lt.LOWER_LEFT_EXT,lt.ZERO_TO_ONE_EXT):lt.clipControlEXT(lt.LOWER_LEFT_EXT,lt.NEGATIVE_ONE_TO_ONE_EXT);const Bt=Ie;Ie=null,this.setClear(Bt)}Pe=Le},getReversed:function(){return Pe},setTest:function(Le){Le?te(s.DEPTH_TEST):ge(s.DEPTH_TEST)},setMask:function(Le){me!==Le&&!Z&&(s.depthMask(Le),me=Le)},setFunc:function(Le){if(Pe&&(Le=tT[Le]),xe!==Le){switch(Le){case Wd:s.depthFunc(s.NEVER);break;case jd:s.depthFunc(s.ALWAYS);break;case Xd:s.depthFunc(s.LESS);break;case so:s.depthFunc(s.LEQUAL);break;case $d:s.depthFunc(s.EQUAL);break;case Yd:s.depthFunc(s.GEQUAL);break;case qd:s.depthFunc(s.GREATER);break;case Zd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}xe=Le}},setLocked:function(Le){Z=Le},setClear:function(Le){Ie!==Le&&(Pe&&(Le=1-Le),s.clearDepth(Le),Ie=Le)},reset:function(){Z=!1,me=null,xe=null,Ie=null,Pe=!1}}}function o(){let Z=!1,Pe=null,me=null,xe=null,Ie=null,Le=null,lt=null,Bt=null,nn=null;return{setTest:function(wt){Z||(wt?te(s.STENCIL_TEST):ge(s.STENCIL_TEST))},setMask:function(wt){Pe!==wt&&!Z&&(s.stencilMask(wt),Pe=wt)},setFunc:function(wt,In,Cn){(me!==wt||xe!==In||Ie!==Cn)&&(s.stencilFunc(wt,In,Cn),me=wt,xe=In,Ie=Cn)},setOp:function(wt,In,Cn){(Le!==wt||lt!==In||Bt!==Cn)&&(s.stencilOp(wt,In,Cn),Le=wt,lt=In,Bt=Cn)},setLocked:function(wt){Z=wt},setClear:function(wt){nn!==wt&&(s.clearStencil(wt),nn=wt)},reset:function(){Z=!1,Pe=null,me=null,xe=null,Ie=null,Le=null,lt=null,Bt=null,nn=null}}}const l=new t,u=new r,d=new o,h=new WeakMap,p=new WeakMap;let m={},v={},x=new WeakMap,y=[],E=null,M=!1,S=null,g=null,C=null,A=null,T=null,U=null,L=null,I=new dt(0,0,0),O=0,R=!1,P=null,F=null,ne=null,q=null,V=null;const J=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,ae=0;const H=s.getParameter(s.VERSION);H.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(H)[1]),ee=ae>=1):H.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),ee=ae>=2);let le=null,ie={};const B=s.getParameter(s.SCISSOR_BOX),ce=s.getParameter(s.VIEWPORT),se=new Kt().fromArray(B),K=new Kt().fromArray(ce);function oe(Z,Pe,me,xe){const Ie=new Uint8Array(4),Le=s.createTexture();s.bindTexture(Z,Le),s.texParameteri(Z,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(Z,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let lt=0;lt<me;lt++)Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?s.texImage3D(Pe,0,s.RGBA,1,1,xe,0,s.RGBA,s.UNSIGNED_BYTE,Ie):s.texImage2D(Pe+lt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ie);return Le}const j={};j[s.TEXTURE_2D]=oe(s.TEXTURE_2D,s.TEXTURE_2D,1),j[s.TEXTURE_CUBE_MAP]=oe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[s.TEXTURE_2D_ARRAY]=oe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),j[s.TEXTURE_3D]=oe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),u.setClear(1),d.setClear(0),te(s.DEPTH_TEST),u.setFunc(so),ot(!1),ht(zm),te(s.CULL_FACE),W(Pr);function te(Z){m[Z]!==!0&&(s.enable(Z),m[Z]=!0)}function ge(Z){m[Z]!==!1&&(s.disable(Z),m[Z]=!1)}function ye(Z,Pe){return v[Z]!==Pe?(s.bindFramebuffer(Z,Pe),v[Z]=Pe,Z===s.DRAW_FRAMEBUFFER&&(v[s.FRAMEBUFFER]=Pe),Z===s.FRAMEBUFFER&&(v[s.DRAW_FRAMEBUFFER]=Pe),!0):!1}function Ce(Z,Pe){let me=y,xe=!1;if(Z){me=x.get(Pe),me===void 0&&(me=[],x.set(Pe,me));const Ie=Z.textures;if(me.length!==Ie.length||me[0]!==s.COLOR_ATTACHMENT0){for(let Le=0,lt=Ie.length;Le<lt;Le++)me[Le]=s.COLOR_ATTACHMENT0+Le;me.length=Ie.length,xe=!0}}else me[0]!==s.BACK&&(me[0]=s.BACK,xe=!0);xe&&s.drawBuffers(me)}function st(Z){return E!==Z?(s.useProgram(Z),E=Z,!0):!1}const Ze={[rs]:s.FUNC_ADD,[X_]:s.FUNC_SUBTRACT,[$_]:s.FUNC_REVERSE_SUBTRACT};Ze[Y_]=s.MIN,Ze[q_]=s.MAX;const ut={[Z_]:s.ZERO,[K_]:s.ONE,[Q_]:s.SRC_COLOR,[Vd]:s.SRC_ALPHA,[ry]:s.SRC_ALPHA_SATURATE,[ny]:s.DST_COLOR,[ey]:s.DST_ALPHA,[J_]:s.ONE_MINUS_SRC_COLOR,[Gd]:s.ONE_MINUS_SRC_ALPHA,[iy]:s.ONE_MINUS_DST_COLOR,[ty]:s.ONE_MINUS_DST_ALPHA,[sy]:s.CONSTANT_COLOR,[oy]:s.ONE_MINUS_CONSTANT_COLOR,[ay]:s.CONSTANT_ALPHA,[ly]:s.ONE_MINUS_CONSTANT_ALPHA};function W(Z,Pe,me,xe,Ie,Le,lt,Bt,nn,wt){if(Z===Pr){M===!0&&(ge(s.BLEND),M=!1);return}if(M===!1&&(te(s.BLEND),M=!0),Z!==j_){if(Z!==S||wt!==R){if((g!==rs||T!==rs)&&(s.blendEquation(s.FUNC_ADD),g=rs,T=rs),wt)switch(Z){case no:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Bm:s.blendFunc(s.ONE,s.ONE);break;case Hm:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Vm:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}else switch(Z){case no:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Bm:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Hm:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Vm:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}C=null,A=null,U=null,L=null,I.set(0,0,0),O=0,S=Z,R=wt}return}Ie=Ie||Pe,Le=Le||me,lt=lt||xe,(Pe!==g||Ie!==T)&&(s.blendEquationSeparate(Ze[Pe],Ze[Ie]),g=Pe,T=Ie),(me!==C||xe!==A||Le!==U||lt!==L)&&(s.blendFuncSeparate(ut[me],ut[xe],ut[Le],ut[lt]),C=me,A=xe,U=Le,L=lt),(Bt.equals(I)===!1||nn!==O)&&(s.blendColor(Bt.r,Bt.g,Bt.b,nn),I.copy(Bt),O=nn),S=Z,R=!1}function Ft(Z,Pe){Z.side===xi?ge(s.CULL_FACE):te(s.CULL_FACE);let me=Z.side===Gn;Pe&&(me=!me),ot(me),Z.blending===no&&Z.transparent===!1?W(Pr):W(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),u.setFunc(Z.depthFunc),u.setTest(Z.depthTest),u.setMask(Z.depthWrite),l.setMask(Z.colorWrite);const xe=Z.stencilWrite;d.setTest(xe),xe&&(d.setMask(Z.stencilWriteMask),d.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),d.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),Lt(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?te(s.SAMPLE_ALPHA_TO_COVERAGE):ge(s.SAMPLE_ALPHA_TO_COVERAGE)}function ot(Z){P!==Z&&(Z?s.frontFace(s.CW):s.frontFace(s.CCW),P=Z)}function ht(Z){Z!==V_?(te(s.CULL_FACE),Z!==F&&(Z===zm?s.cullFace(s.BACK):Z===G_?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ge(s.CULL_FACE),F=Z}function We(Z){Z!==ne&&(ee&&s.lineWidth(Z),ne=Z)}function Lt(Z,Pe,me){Z?(te(s.POLYGON_OFFSET_FILL),(q!==Pe||V!==me)&&(s.polygonOffset(Pe,me),q=Pe,V=me)):ge(s.POLYGON_OFFSET_FILL)}function Ye(Z){Z?te(s.SCISSOR_TEST):ge(s.SCISSOR_TEST)}function k(Z){Z===void 0&&(Z=s.TEXTURE0+J-1),le!==Z&&(s.activeTexture(Z),le=Z)}function N(Z,Pe,me){me===void 0&&(le===null?me=s.TEXTURE0+J-1:me=le);let xe=ie[me];xe===void 0&&(xe={type:void 0,texture:void 0},ie[me]=xe),(xe.type!==Z||xe.texture!==Pe)&&(le!==me&&(s.activeTexture(me),le=me),s.bindTexture(Z,Pe||j[Z]),xe.type=Z,xe.texture=Pe)}function de(){const Z=ie[le];Z!==void 0&&Z.type!==void 0&&(s.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function _e(){try{s.compressedTexImage2D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Me(){try{s.compressedTexImage3D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function ve(){try{s.texSubImage2D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Xe(){try{s.texSubImage3D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Re(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Fe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function gt(){try{s.texStorage2D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function be(){try{s.texStorage3D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function He(){try{s.texImage2D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Qe(){try{s.texImage3D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function tt(Z){se.equals(Z)===!1&&(s.scissor(Z.x,Z.y,Z.z,Z.w),se.copy(Z))}function Ve(Z){K.equals(Z)===!1&&(s.viewport(Z.x,Z.y,Z.z,Z.w),K.copy(Z))}function vt(Z,Pe){let me=p.get(Pe);me===void 0&&(me=new WeakMap,p.set(Pe,me));let xe=me.get(Z);xe===void 0&&(xe=s.getUniformBlockIndex(Pe,Z.name),me.set(Z,xe))}function at(Z,Pe){const xe=p.get(Pe).get(Z);h.get(Pe)!==xe&&(s.uniformBlockBinding(Pe,xe,Z.__bindingPointIndex),h.set(Pe,xe))}function Pt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),u.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),m={},le=null,ie={},v={},x=new WeakMap,y=[],E=null,M=!1,S=null,g=null,C=null,A=null,T=null,U=null,L=null,I=new dt(0,0,0),O=0,R=!1,P=null,F=null,ne=null,q=null,V=null,se.set(0,0,s.canvas.width,s.canvas.height),K.set(0,0,s.canvas.width,s.canvas.height),l.reset(),u.reset(),d.reset()}return{buffers:{color:l,depth:u,stencil:d},enable:te,disable:ge,bindFramebuffer:ye,drawBuffers:Ce,useProgram:st,setBlending:W,setMaterial:Ft,setFlipSided:ot,setCullFace:ht,setLineWidth:We,setPolygonOffset:Lt,setScissorTest:Ye,activeTexture:k,bindTexture:N,unbindTexture:de,compressedTexImage2D:_e,compressedTexImage3D:Me,texImage2D:He,texImage3D:Qe,updateUBOMapping:vt,uniformBlockBinding:at,texStorage2D:gt,texStorage3D:be,texSubImage2D:ve,texSubImage3D:Xe,compressedTexSubImage2D:Re,compressedTexSubImage3D:Fe,scissor:tt,viewport:Ve,reset:Pt}}function iT(s,e,t,r,o,l,u){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ue,m=new WeakMap;let v;const x=new WeakMap;let y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(k,N){return y?new OffscreenCanvas(k,N):rc("canvas")}function M(k,N,de){let _e=1;const Me=Ye(k);if((Me.width>de||Me.height>de)&&(_e=de/Math.max(Me.width,Me.height)),_e<1)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap||typeof VideoFrame<"u"&&k instanceof VideoFrame){const ve=Math.floor(_e*Me.width),Xe=Math.floor(_e*Me.height);v===void 0&&(v=E(ve,Xe));const Re=N?E(ve,Xe):v;return Re.width=ve,Re.height=Xe,Re.getContext("2d").drawImage(k,0,0,ve,Xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Me.width+"x"+Me.height+") to ("+ve+"x"+Xe+")."),Re}else return"data"in k&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Me.width+"x"+Me.height+")."),k;return k}function S(k){return k.generateMipmaps}function g(k){s.generateMipmap(k)}function C(k){return k.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:k.isWebGL3DRenderTarget?s.TEXTURE_3D:k.isWebGLArrayRenderTarget||k.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function A(k,N,de,_e,Me=!1){if(k!==null){if(s[k]!==void 0)return s[k];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let ve=N;if(N===s.RED&&(de===s.FLOAT&&(ve=s.R32F),de===s.HALF_FLOAT&&(ve=s.R16F),de===s.UNSIGNED_BYTE&&(ve=s.R8)),N===s.RED_INTEGER&&(de===s.UNSIGNED_BYTE&&(ve=s.R8UI),de===s.UNSIGNED_SHORT&&(ve=s.R16UI),de===s.UNSIGNED_INT&&(ve=s.R32UI),de===s.BYTE&&(ve=s.R8I),de===s.SHORT&&(ve=s.R16I),de===s.INT&&(ve=s.R32I)),N===s.RG&&(de===s.FLOAT&&(ve=s.RG32F),de===s.HALF_FLOAT&&(ve=s.RG16F),de===s.UNSIGNED_BYTE&&(ve=s.RG8)),N===s.RG_INTEGER&&(de===s.UNSIGNED_BYTE&&(ve=s.RG8UI),de===s.UNSIGNED_SHORT&&(ve=s.RG16UI),de===s.UNSIGNED_INT&&(ve=s.RG32UI),de===s.BYTE&&(ve=s.RG8I),de===s.SHORT&&(ve=s.RG16I),de===s.INT&&(ve=s.RG32I)),N===s.RGB_INTEGER&&(de===s.UNSIGNED_BYTE&&(ve=s.RGB8UI),de===s.UNSIGNED_SHORT&&(ve=s.RGB16UI),de===s.UNSIGNED_INT&&(ve=s.RGB32UI),de===s.BYTE&&(ve=s.RGB8I),de===s.SHORT&&(ve=s.RGB16I),de===s.INT&&(ve=s.RGB32I)),N===s.RGBA_INTEGER&&(de===s.UNSIGNED_BYTE&&(ve=s.RGBA8UI),de===s.UNSIGNED_SHORT&&(ve=s.RGBA16UI),de===s.UNSIGNED_INT&&(ve=s.RGBA32UI),de===s.BYTE&&(ve=s.RGBA8I),de===s.SHORT&&(ve=s.RGBA16I),de===s.INT&&(ve=s.RGBA32I)),N===s.RGB&&de===s.UNSIGNED_INT_5_9_9_9_REV&&(ve=s.RGB9_E5),N===s.RGBA){const Xe=Me?nc:Rt.getTransfer(_e);de===s.FLOAT&&(ve=s.RGBA32F),de===s.HALF_FLOAT&&(ve=s.RGBA16F),de===s.UNSIGNED_BYTE&&(ve=Xe===kt?s.SRGB8_ALPHA8:s.RGBA8),de===s.UNSIGNED_SHORT_4_4_4_4&&(ve=s.RGBA4),de===s.UNSIGNED_SHORT_5_5_5_1&&(ve=s.RGB5_A1)}return(ve===s.R16F||ve===s.R32F||ve===s.RG16F||ve===s.RG32F||ve===s.RGBA16F||ve===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ve}function T(k,N){let de;return k?N===null||N===ls||N===lo?de=s.DEPTH24_STENCIL8:N===qi?de=s.DEPTH32F_STENCIL8:N===la&&(de=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):N===null||N===ls||N===lo?de=s.DEPTH_COMPONENT24:N===qi?de=s.DEPTH_COMPONENT32F:N===la&&(de=s.DEPTH_COMPONENT16),de}function U(k,N){return S(k)===!0||k.isFramebufferTexture&&k.minFilter!==yi&&k.minFilter!==Ri?Math.log2(Math.max(N.width,N.height))+1:k.mipmaps!==void 0&&k.mipmaps.length>0?k.mipmaps.length:k.isCompressedTexture&&Array.isArray(k.image)?N.mipmaps.length:1}function L(k){const N=k.target;N.removeEventListener("dispose",L),O(N),N.isVideoTexture&&m.delete(N)}function I(k){const N=k.target;N.removeEventListener("dispose",I),P(N)}function O(k){const N=r.get(k);if(N.__webglInit===void 0)return;const de=k.source,_e=x.get(de);if(_e){const Me=_e[N.__cacheKey];Me.usedTimes--,Me.usedTimes===0&&R(k),Object.keys(_e).length===0&&x.delete(de)}r.remove(k)}function R(k){const N=r.get(k);s.deleteTexture(N.__webglTexture);const de=k.source,_e=x.get(de);delete _e[N.__cacheKey],u.memory.textures--}function P(k){const N=r.get(k);if(k.depthTexture&&(k.depthTexture.dispose(),r.remove(k.depthTexture)),k.isWebGLCubeRenderTarget)for(let _e=0;_e<6;_e++){if(Array.isArray(N.__webglFramebuffer[_e]))for(let Me=0;Me<N.__webglFramebuffer[_e].length;Me++)s.deleteFramebuffer(N.__webglFramebuffer[_e][Me]);else s.deleteFramebuffer(N.__webglFramebuffer[_e]);N.__webglDepthbuffer&&s.deleteRenderbuffer(N.__webglDepthbuffer[_e])}else{if(Array.isArray(N.__webglFramebuffer))for(let _e=0;_e<N.__webglFramebuffer.length;_e++)s.deleteFramebuffer(N.__webglFramebuffer[_e]);else s.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&s.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&s.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let _e=0;_e<N.__webglColorRenderbuffer.length;_e++)N.__webglColorRenderbuffer[_e]&&s.deleteRenderbuffer(N.__webglColorRenderbuffer[_e]);N.__webglDepthRenderbuffer&&s.deleteRenderbuffer(N.__webglDepthRenderbuffer)}const de=k.textures;for(let _e=0,Me=de.length;_e<Me;_e++){const ve=r.get(de[_e]);ve.__webglTexture&&(s.deleteTexture(ve.__webglTexture),u.memory.textures--),r.remove(de[_e])}r.remove(k)}let F=0;function ne(){F=0}function q(){const k=F;return k>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+k+" texture units while this GPU supports only "+o.maxTextures),F+=1,k}function V(k){const N=[];return N.push(k.wrapS),N.push(k.wrapT),N.push(k.wrapR||0),N.push(k.magFilter),N.push(k.minFilter),N.push(k.anisotropy),N.push(k.internalFormat),N.push(k.format),N.push(k.type),N.push(k.generateMipmaps),N.push(k.premultiplyAlpha),N.push(k.flipY),N.push(k.unpackAlignment),N.push(k.colorSpace),N.join()}function J(k,N){const de=r.get(k);if(k.isVideoTexture&&We(k),k.isRenderTargetTexture===!1&&k.version>0&&de.__version!==k.version){const _e=k.image;if(_e===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(_e.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(de,k,N);return}}t.bindTexture(s.TEXTURE_2D,de.__webglTexture,s.TEXTURE0+N)}function ee(k,N){const de=r.get(k);if(k.version>0&&de.__version!==k.version){K(de,k,N);return}t.bindTexture(s.TEXTURE_2D_ARRAY,de.__webglTexture,s.TEXTURE0+N)}function ae(k,N){const de=r.get(k);if(k.version>0&&de.__version!==k.version){K(de,k,N);return}t.bindTexture(s.TEXTURE_3D,de.__webglTexture,s.TEXTURE0+N)}function H(k,N){const de=r.get(k);if(k.version>0&&de.__version!==k.version){oe(de,k,N);return}t.bindTexture(s.TEXTURE_CUBE_MAP,de.__webglTexture,s.TEXTURE0+N)}const le={[Jd]:s.REPEAT,[os]:s.CLAMP_TO_EDGE,[eh]:s.MIRRORED_REPEAT},ie={[yi]:s.NEAREST,[xy]:s.NEAREST_MIPMAP_NEAREST,[yl]:s.NEAREST_MIPMAP_LINEAR,[Ri]:s.LINEAR,[rd]:s.LINEAR_MIPMAP_NEAREST,[as]:s.LINEAR_MIPMAP_LINEAR},B={[My]:s.NEVER,[Cy]:s.ALWAYS,[Ey]:s.LESS,[Eg]:s.LEQUAL,[wy]:s.EQUAL,[Ay]:s.GEQUAL,[Ty]:s.GREATER,[by]:s.NOTEQUAL};function ce(k,N){if(N.type===qi&&e.has("OES_texture_float_linear")===!1&&(N.magFilter===Ri||N.magFilter===rd||N.magFilter===yl||N.magFilter===as||N.minFilter===Ri||N.minFilter===rd||N.minFilter===yl||N.minFilter===as)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(k,s.TEXTURE_WRAP_S,le[N.wrapS]),s.texParameteri(k,s.TEXTURE_WRAP_T,le[N.wrapT]),(k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY)&&s.texParameteri(k,s.TEXTURE_WRAP_R,le[N.wrapR]),s.texParameteri(k,s.TEXTURE_MAG_FILTER,ie[N.magFilter]),s.texParameteri(k,s.TEXTURE_MIN_FILTER,ie[N.minFilter]),N.compareFunction&&(s.texParameteri(k,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(k,s.TEXTURE_COMPARE_FUNC,B[N.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(N.magFilter===yi||N.minFilter!==yl&&N.minFilter!==as||N.type===qi&&e.has("OES_texture_float_linear")===!1)return;if(N.anisotropy>1||r.get(N).__currentAnisotropy){const de=e.get("EXT_texture_filter_anisotropic");s.texParameterf(k,de.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(N.anisotropy,o.getMaxAnisotropy())),r.get(N).__currentAnisotropy=N.anisotropy}}}function se(k,N){let de=!1;k.__webglInit===void 0&&(k.__webglInit=!0,N.addEventListener("dispose",L));const _e=N.source;let Me=x.get(_e);Me===void 0&&(Me={},x.set(_e,Me));const ve=V(N);if(ve!==k.__cacheKey){Me[ve]===void 0&&(Me[ve]={texture:s.createTexture(),usedTimes:0},u.memory.textures++,de=!0),Me[ve].usedTimes++;const Xe=Me[k.__cacheKey];Xe!==void 0&&(Me[k.__cacheKey].usedTimes--,Xe.usedTimes===0&&R(N)),k.__cacheKey=ve,k.__webglTexture=Me[ve].texture}return de}function K(k,N,de){let _e=s.TEXTURE_2D;(N.isDataArrayTexture||N.isCompressedArrayTexture)&&(_e=s.TEXTURE_2D_ARRAY),N.isData3DTexture&&(_e=s.TEXTURE_3D);const Me=se(k,N),ve=N.source;t.bindTexture(_e,k.__webglTexture,s.TEXTURE0+de);const Xe=r.get(ve);if(ve.version!==Xe.__version||Me===!0){t.activeTexture(s.TEXTURE0+de);const Re=Rt.getPrimaries(Rt.workingColorSpace),Fe=N.colorSpace===Rr?null:Rt.getPrimaries(N.colorSpace),gt=N.colorSpace===Rr||Re===Fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,N.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,N.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);let be=M(N.image,!1,o.maxTextureSize);be=Lt(N,be);const He=l.convert(N.format,N.colorSpace),Qe=l.convert(N.type);let tt=A(N.internalFormat,He,Qe,N.colorSpace,N.isVideoTexture);ce(_e,N);let Ve;const vt=N.mipmaps,at=N.isVideoTexture!==!0,Pt=Xe.__version===void 0||Me===!0,Z=ve.dataReady,Pe=U(N,be);if(N.isDepthTexture)tt=T(N.format===co,N.type),Pt&&(at?t.texStorage2D(s.TEXTURE_2D,1,tt,be.width,be.height):t.texImage2D(s.TEXTURE_2D,0,tt,be.width,be.height,0,He,Qe,null));else if(N.isDataTexture)if(vt.length>0){at&&Pt&&t.texStorage2D(s.TEXTURE_2D,Pe,tt,vt[0].width,vt[0].height);for(let me=0,xe=vt.length;me<xe;me++)Ve=vt[me],at?Z&&t.texSubImage2D(s.TEXTURE_2D,me,0,0,Ve.width,Ve.height,He,Qe,Ve.data):t.texImage2D(s.TEXTURE_2D,me,tt,Ve.width,Ve.height,0,He,Qe,Ve.data);N.generateMipmaps=!1}else at?(Pt&&t.texStorage2D(s.TEXTURE_2D,Pe,tt,be.width,be.height),Z&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,be.width,be.height,He,Qe,be.data)):t.texImage2D(s.TEXTURE_2D,0,tt,be.width,be.height,0,He,Qe,be.data);else if(N.isCompressedTexture)if(N.isCompressedArrayTexture){at&&Pt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,tt,vt[0].width,vt[0].height,be.depth);for(let me=0,xe=vt.length;me<xe;me++)if(Ve=vt[me],N.format!==_i)if(He!==null)if(at){if(Z)if(N.layerUpdates.size>0){const Ie=M0(Ve.width,Ve.height,N.format,N.type);for(const Le of N.layerUpdates){const lt=Ve.data.subarray(Le*Ie/Ve.data.BYTES_PER_ELEMENT,(Le+1)*Ie/Ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,me,0,0,Le,Ve.width,Ve.height,1,He,lt)}N.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,me,0,0,0,Ve.width,Ve.height,be.depth,He,Ve.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,me,tt,Ve.width,Ve.height,be.depth,0,Ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else at?Z&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,me,0,0,0,Ve.width,Ve.height,be.depth,He,Qe,Ve.data):t.texImage3D(s.TEXTURE_2D_ARRAY,me,tt,Ve.width,Ve.height,be.depth,0,He,Qe,Ve.data)}else{at&&Pt&&t.texStorage2D(s.TEXTURE_2D,Pe,tt,vt[0].width,vt[0].height);for(let me=0,xe=vt.length;me<xe;me++)Ve=vt[me],N.format!==_i?He!==null?at?Z&&t.compressedTexSubImage2D(s.TEXTURE_2D,me,0,0,Ve.width,Ve.height,He,Ve.data):t.compressedTexImage2D(s.TEXTURE_2D,me,tt,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?Z&&t.texSubImage2D(s.TEXTURE_2D,me,0,0,Ve.width,Ve.height,He,Qe,Ve.data):t.texImage2D(s.TEXTURE_2D,me,tt,Ve.width,Ve.height,0,He,Qe,Ve.data)}else if(N.isDataArrayTexture)if(at){if(Pt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,tt,be.width,be.height,be.depth),Z)if(N.layerUpdates.size>0){const me=M0(be.width,be.height,N.format,N.type);for(const xe of N.layerUpdates){const Ie=be.data.subarray(xe*me/be.data.BYTES_PER_ELEMENT,(xe+1)*me/be.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,xe,be.width,be.height,1,He,Qe,Ie)}N.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,be.width,be.height,be.depth,He,Qe,be.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,tt,be.width,be.height,be.depth,0,He,Qe,be.data);else if(N.isData3DTexture)at?(Pt&&t.texStorage3D(s.TEXTURE_3D,Pe,tt,be.width,be.height,be.depth),Z&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,be.width,be.height,be.depth,He,Qe,be.data)):t.texImage3D(s.TEXTURE_3D,0,tt,be.width,be.height,be.depth,0,He,Qe,be.data);else if(N.isFramebufferTexture){if(Pt)if(at)t.texStorage2D(s.TEXTURE_2D,Pe,tt,be.width,be.height);else{let me=be.width,xe=be.height;for(let Ie=0;Ie<Pe;Ie++)t.texImage2D(s.TEXTURE_2D,Ie,tt,me,xe,0,He,Qe,null),me>>=1,xe>>=1}}else if(vt.length>0){if(at&&Pt){const me=Ye(vt[0]);t.texStorage2D(s.TEXTURE_2D,Pe,tt,me.width,me.height)}for(let me=0,xe=vt.length;me<xe;me++)Ve=vt[me],at?Z&&t.texSubImage2D(s.TEXTURE_2D,me,0,0,He,Qe,Ve):t.texImage2D(s.TEXTURE_2D,me,tt,He,Qe,Ve);N.generateMipmaps=!1}else if(at){if(Pt){const me=Ye(be);t.texStorage2D(s.TEXTURE_2D,Pe,tt,me.width,me.height)}Z&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,He,Qe,be)}else t.texImage2D(s.TEXTURE_2D,0,tt,He,Qe,be);S(N)&&g(_e),Xe.__version=ve.version,N.onUpdate&&N.onUpdate(N)}k.__version=N.version}function oe(k,N,de){if(N.image.length!==6)return;const _e=se(k,N),Me=N.source;t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+de);const ve=r.get(Me);if(Me.version!==ve.__version||_e===!0){t.activeTexture(s.TEXTURE0+de);const Xe=Rt.getPrimaries(Rt.workingColorSpace),Re=N.colorSpace===Rr?null:Rt.getPrimaries(N.colorSpace),Fe=N.colorSpace===Rr||Xe===Re?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,N.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,N.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const gt=N.isCompressedTexture||N.image[0].isCompressedTexture,be=N.image[0]&&N.image[0].isDataTexture,He=[];for(let xe=0;xe<6;xe++)!gt&&!be?He[xe]=M(N.image[xe],!0,o.maxCubemapSize):He[xe]=be?N.image[xe].image:N.image[xe],He[xe]=Lt(N,He[xe]);const Qe=He[0],tt=l.convert(N.format,N.colorSpace),Ve=l.convert(N.type),vt=A(N.internalFormat,tt,Ve,N.colorSpace),at=N.isVideoTexture!==!0,Pt=ve.__version===void 0||_e===!0,Z=Me.dataReady;let Pe=U(N,Qe);ce(s.TEXTURE_CUBE_MAP,N);let me;if(gt){at&&Pt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Pe,vt,Qe.width,Qe.height);for(let xe=0;xe<6;xe++){me=He[xe].mipmaps;for(let Ie=0;Ie<me.length;Ie++){const Le=me[Ie];N.format!==_i?tt!==null?at?Z&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ie,0,0,Le.width,Le.height,tt,Le.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ie,vt,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):at?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ie,0,0,Le.width,Le.height,tt,Ve,Le.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ie,vt,Le.width,Le.height,0,tt,Ve,Le.data)}}}else{if(me=N.mipmaps,at&&Pt){me.length>0&&Pe++;const xe=Ye(He[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Pe,vt,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(be){at?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,He[xe].width,He[xe].height,tt,Ve,He[xe].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,vt,He[xe].width,He[xe].height,0,tt,Ve,He[xe].data);for(let Ie=0;Ie<me.length;Ie++){const lt=me[Ie].image[xe].image;at?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ie+1,0,0,lt.width,lt.height,tt,Ve,lt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ie+1,vt,lt.width,lt.height,0,tt,Ve,lt.data)}}else{at?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,tt,Ve,He[xe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,vt,tt,Ve,He[xe]);for(let Ie=0;Ie<me.length;Ie++){const Le=me[Ie];at?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ie+1,0,0,tt,Ve,Le.image[xe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ie+1,vt,tt,Ve,Le.image[xe])}}}S(N)&&g(s.TEXTURE_CUBE_MAP),ve.__version=Me.version,N.onUpdate&&N.onUpdate(N)}k.__version=N.version}function j(k,N,de,_e,Me,ve){const Xe=l.convert(de.format,de.colorSpace),Re=l.convert(de.type),Fe=A(de.internalFormat,Xe,Re,de.colorSpace),gt=r.get(N),be=r.get(de);if(be.__renderTarget=N,!gt.__hasExternalTextures){const He=Math.max(1,N.width>>ve),Qe=Math.max(1,N.height>>ve);Me===s.TEXTURE_3D||Me===s.TEXTURE_2D_ARRAY?t.texImage3D(Me,ve,Fe,He,Qe,N.depth,0,Xe,Re,null):t.texImage2D(Me,ve,Fe,He,Qe,0,Xe,Re,null)}t.bindFramebuffer(s.FRAMEBUFFER,k),ht(N)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,_e,Me,be.__webglTexture,0,ot(N)):(Me===s.TEXTURE_2D||Me>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Me<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,_e,Me,be.__webglTexture,ve),t.bindFramebuffer(s.FRAMEBUFFER,null)}function te(k,N,de){if(s.bindRenderbuffer(s.RENDERBUFFER,k),N.depthBuffer){const _e=N.depthTexture,Me=_e&&_e.isDepthTexture?_e.type:null,ve=T(N.stencilBuffer,Me),Xe=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Re=ot(N);ht(N)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Re,ve,N.width,N.height):de?s.renderbufferStorageMultisample(s.RENDERBUFFER,Re,ve,N.width,N.height):s.renderbufferStorage(s.RENDERBUFFER,ve,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Xe,s.RENDERBUFFER,k)}else{const _e=N.textures;for(let Me=0;Me<_e.length;Me++){const ve=_e[Me],Xe=l.convert(ve.format,ve.colorSpace),Re=l.convert(ve.type),Fe=A(ve.internalFormat,Xe,Re,ve.colorSpace),gt=ot(N);de&&ht(N)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,gt,Fe,N.width,N.height):ht(N)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,gt,Fe,N.width,N.height):s.renderbufferStorage(s.RENDERBUFFER,Fe,N.width,N.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ge(k,N){if(N&&N.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,k),!(N.depthTexture&&N.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const _e=r.get(N.depthTexture);_e.__renderTarget=N,(!_e.__webglTexture||N.depthTexture.image.width!==N.width||N.depthTexture.image.height!==N.height)&&(N.depthTexture.image.width=N.width,N.depthTexture.image.height=N.height,N.depthTexture.needsUpdate=!0),J(N.depthTexture,0);const Me=_e.__webglTexture,ve=ot(N);if(N.depthTexture.format===io)ht(N)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Me,0,ve):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Me,0);else if(N.depthTexture.format===co)ht(N)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Me,0,ve):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Me,0);else throw new Error("Unknown depthTexture format")}function ye(k){const N=r.get(k),de=k.isWebGLCubeRenderTarget===!0;if(N.__boundDepthTexture!==k.depthTexture){const _e=k.depthTexture;if(N.__depthDisposeCallback&&N.__depthDisposeCallback(),_e){const Me=()=>{delete N.__boundDepthTexture,delete N.__depthDisposeCallback,_e.removeEventListener("dispose",Me)};_e.addEventListener("dispose",Me),N.__depthDisposeCallback=Me}N.__boundDepthTexture=_e}if(k.depthTexture&&!N.__autoAllocateDepthBuffer){if(de)throw new Error("target.depthTexture not supported in Cube render targets");ge(N.__webglFramebuffer,k)}else if(de){N.__webglDepthbuffer=[];for(let _e=0;_e<6;_e++)if(t.bindFramebuffer(s.FRAMEBUFFER,N.__webglFramebuffer[_e]),N.__webglDepthbuffer[_e]===void 0)N.__webglDepthbuffer[_e]=s.createRenderbuffer(),te(N.__webglDepthbuffer[_e],k,!1);else{const Me=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=N.__webglDepthbuffer[_e];s.bindRenderbuffer(s.RENDERBUFFER,ve),s.framebufferRenderbuffer(s.FRAMEBUFFER,Me,s.RENDERBUFFER,ve)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,N.__webglFramebuffer),N.__webglDepthbuffer===void 0)N.__webglDepthbuffer=s.createRenderbuffer(),te(N.__webglDepthbuffer,k,!1);else{const _e=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Me=N.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Me),s.framebufferRenderbuffer(s.FRAMEBUFFER,_e,s.RENDERBUFFER,Me)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ce(k,N,de){const _e=r.get(k);N!==void 0&&j(_e.__webglFramebuffer,k,k.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),de!==void 0&&ye(k)}function st(k){const N=k.texture,de=r.get(k),_e=r.get(N);k.addEventListener("dispose",I);const Me=k.textures,ve=k.isWebGLCubeRenderTarget===!0,Xe=Me.length>1;if(Xe||(_e.__webglTexture===void 0&&(_e.__webglTexture=s.createTexture()),_e.__version=N.version,u.memory.textures++),ve){de.__webglFramebuffer=[];for(let Re=0;Re<6;Re++)if(N.mipmaps&&N.mipmaps.length>0){de.__webglFramebuffer[Re]=[];for(let Fe=0;Fe<N.mipmaps.length;Fe++)de.__webglFramebuffer[Re][Fe]=s.createFramebuffer()}else de.__webglFramebuffer[Re]=s.createFramebuffer()}else{if(N.mipmaps&&N.mipmaps.length>0){de.__webglFramebuffer=[];for(let Re=0;Re<N.mipmaps.length;Re++)de.__webglFramebuffer[Re]=s.createFramebuffer()}else de.__webglFramebuffer=s.createFramebuffer();if(Xe)for(let Re=0,Fe=Me.length;Re<Fe;Re++){const gt=r.get(Me[Re]);gt.__webglTexture===void 0&&(gt.__webglTexture=s.createTexture(),u.memory.textures++)}if(k.samples>0&&ht(k)===!1){de.__webglMultisampledFramebuffer=s.createFramebuffer(),de.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,de.__webglMultisampledFramebuffer);for(let Re=0;Re<Me.length;Re++){const Fe=Me[Re];de.__webglColorRenderbuffer[Re]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,de.__webglColorRenderbuffer[Re]);const gt=l.convert(Fe.format,Fe.colorSpace),be=l.convert(Fe.type),He=A(Fe.internalFormat,gt,be,Fe.colorSpace,k.isXRRenderTarget===!0),Qe=ot(k);s.renderbufferStorageMultisample(s.RENDERBUFFER,Qe,He,k.width,k.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,de.__webglColorRenderbuffer[Re])}s.bindRenderbuffer(s.RENDERBUFFER,null),k.depthBuffer&&(de.__webglDepthRenderbuffer=s.createRenderbuffer(),te(de.__webglDepthRenderbuffer,k,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ve){t.bindTexture(s.TEXTURE_CUBE_MAP,_e.__webglTexture),ce(s.TEXTURE_CUBE_MAP,N);for(let Re=0;Re<6;Re++)if(N.mipmaps&&N.mipmaps.length>0)for(let Fe=0;Fe<N.mipmaps.length;Fe++)j(de.__webglFramebuffer[Re][Fe],k,N,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Fe);else j(de.__webglFramebuffer[Re],k,N,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0);S(N)&&g(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Xe){for(let Re=0,Fe=Me.length;Re<Fe;Re++){const gt=Me[Re],be=r.get(gt);t.bindTexture(s.TEXTURE_2D,be.__webglTexture),ce(s.TEXTURE_2D,gt),j(de.__webglFramebuffer,k,gt,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,0),S(gt)&&g(s.TEXTURE_2D)}t.unbindTexture()}else{let Re=s.TEXTURE_2D;if((k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)&&(Re=k.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Re,_e.__webglTexture),ce(Re,N),N.mipmaps&&N.mipmaps.length>0)for(let Fe=0;Fe<N.mipmaps.length;Fe++)j(de.__webglFramebuffer[Fe],k,N,s.COLOR_ATTACHMENT0,Re,Fe);else j(de.__webglFramebuffer,k,N,s.COLOR_ATTACHMENT0,Re,0);S(N)&&g(Re),t.unbindTexture()}k.depthBuffer&&ye(k)}function Ze(k){const N=k.textures;for(let de=0,_e=N.length;de<_e;de++){const Me=N[de];if(S(Me)){const ve=C(k),Xe=r.get(Me).__webglTexture;t.bindTexture(ve,Xe),g(ve),t.unbindTexture()}}}const ut=[],W=[];function Ft(k){if(k.samples>0){if(ht(k)===!1){const N=k.textures,de=k.width,_e=k.height;let Me=s.COLOR_BUFFER_BIT;const ve=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Xe=r.get(k),Re=N.length>1;if(Re)for(let Fe=0;Fe<N.length;Fe++)t.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Xe.__webglFramebuffer);for(let Fe=0;Fe<N.length;Fe++){if(k.resolveDepthBuffer&&(k.depthBuffer&&(Me|=s.DEPTH_BUFFER_BIT),k.stencilBuffer&&k.resolveStencilBuffer&&(Me|=s.STENCIL_BUFFER_BIT)),Re){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Xe.__webglColorRenderbuffer[Fe]);const gt=r.get(N[Fe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,gt,0)}s.blitFramebuffer(0,0,de,_e,0,0,de,_e,Me,s.NEAREST),h===!0&&(ut.length=0,W.length=0,ut.push(s.COLOR_ATTACHMENT0+Fe),k.depthBuffer&&k.resolveDepthBuffer===!1&&(ut.push(ve),W.push(ve),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,W)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ut))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Re)for(let Fe=0;Fe<N.length;Fe++){t.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,Xe.__webglColorRenderbuffer[Fe]);const gt=r.get(N[Fe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,gt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Xe.__webglMultisampledFramebuffer)}else if(k.depthBuffer&&k.resolveDepthBuffer===!1&&h){const N=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[N])}}}function ot(k){return Math.min(o.maxSamples,k.samples)}function ht(k){const N=r.get(k);return k.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&N.__useRenderToTexture!==!1}function We(k){const N=u.render.frame;m.get(k)!==N&&(m.set(k,N),k.update())}function Lt(k,N){const de=k.colorSpace,_e=k.format,Me=k.type;return k.isCompressedTexture===!0||k.isVideoTexture===!0||de!==uo&&de!==Rr&&(Rt.getTransfer(de)===kt?(_e!==_i||Me!==Ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",de)),N}function Ye(k){return typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement?(p.width=k.naturalWidth||k.width,p.height=k.naturalHeight||k.height):typeof VideoFrame<"u"&&k instanceof VideoFrame?(p.width=k.displayWidth,p.height=k.displayHeight):(p.width=k.width,p.height=k.height),p}this.allocateTextureUnit=q,this.resetTextureUnits=ne,this.setTexture2D=J,this.setTexture2DArray=ee,this.setTexture3D=ae,this.setTextureCube=H,this.rebindTextures=Ce,this.setupRenderTarget=st,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=j,this.useMultisampledRTT=ht}function rT(s,e){function t(r,o=Rr){let l;const u=Rt.getTransfer(o);if(r===Ji)return s.UNSIGNED_BYTE;if(r===Fh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===zh)return s.UNSIGNED_SHORT_5_5_5_1;if(r===pg)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===hg)return s.BYTE;if(r===fg)return s.SHORT;if(r===la)return s.UNSIGNED_SHORT;if(r===Oh)return s.INT;if(r===ls)return s.UNSIGNED_INT;if(r===qi)return s.FLOAT;if(r===ca)return s.HALF_FLOAT;if(r===mg)return s.ALPHA;if(r===gg)return s.RGB;if(r===_i)return s.RGBA;if(r===vg)return s.LUMINANCE;if(r===xg)return s.LUMINANCE_ALPHA;if(r===io)return s.DEPTH_COMPONENT;if(r===co)return s.DEPTH_STENCIL;if(r===_g)return s.RED;if(r===Bh)return s.RED_INTEGER;if(r===yg)return s.RG;if(r===Hh)return s.RG_INTEGER;if(r===Vh)return s.RGBA_INTEGER;if(r===ql||r===Zl||r===Kl||r===Ql)if(u===kt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===ql)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Zl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Kl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ql)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===ql)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Zl)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Kl)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ql)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===th||r===nh||r===ih||r===rh)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===th)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===nh)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ih)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===rh)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===sh||r===oh||r===ah)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===sh||r===oh)return u===kt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===ah)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===lh||r===ch||r===uh||r===dh||r===hh||r===fh||r===ph||r===mh||r===gh||r===vh||r===xh||r===_h||r===yh||r===Sh)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===lh)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ch)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===uh)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===dh)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===hh)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===fh)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ph)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===mh)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===gh)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===vh)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===xh)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===_h)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===yh)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Sh)return u===kt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Jl||r===Mh||r===Eh)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===Jl)return u===kt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Mh)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Eh)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Sg||r===wh||r===Th||r===bh)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===Jl)return l.COMPRESSED_RED_RGTC1_EXT;if(r===wh)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Th)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===bh)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===lo?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:t}}const sT={type:"move"};class zd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let o=null,l=null,u=null;const d=this._targetRay,h=this._grip,p=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(p&&e.hand){u=!0;for(const M of e.hand.values()){const S=t.getJointPose(M,r),g=this._getHandJoint(p,M);S!==null&&(g.matrix.fromArray(S.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=S.radius),g.visible=S!==null}const m=p.joints["index-finger-tip"],v=p.joints["thumb-tip"],x=m.position.distanceTo(v.position),y=.02,E=.005;p.inputState.pinching&&x>y+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&x<=y-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));d!==null&&(o=t.getPose(e.targetRaySpace,r),o===null&&l!==null&&(o=l),o!==null&&(d.matrix.fromArray(o.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,o.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(o.linearVelocity)):d.hasLinearVelocity=!1,o.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(o.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(sT)))}return d!==null&&(d.visible=o!==null),h!==null&&(h.visible=l!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new Jo;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const oT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aT=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class lT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,r){if(this.texture===null){const o=new Wn,l=e.properties.get(o);l.__webglTexture=t.texture,(t.depthNear!=r.depthNear||t.depthFar!=r.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=o}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new Ir({vertexShader:oT,fragmentShader:aT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new bn(new vc(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cT extends ds{constructor(e,t){super();const r=this;let o=null,l=1,u=null,d="local-floor",h=1,p=null,m=null,v=null,x=null,y=null,E=null;const M=new lT,S=t.getContextAttributes();let g=null,C=null;const A=[],T=[],U=new Ue;let L=null;const I=new oi;I.viewport=new Kt;const O=new oi;O.viewport=new Kt;const R=[I,O],P=new A1;let F=null,ne=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let oe=A[K];return oe===void 0&&(oe=new zd,A[K]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(K){let oe=A[K];return oe===void 0&&(oe=new zd,A[K]=oe),oe.getGripSpace()},this.getHand=function(K){let oe=A[K];return oe===void 0&&(oe=new zd,A[K]=oe),oe.getHandSpace()};function q(K){const oe=T.indexOf(K.inputSource);if(oe===-1)return;const j=A[oe];j!==void 0&&(j.update(K.inputSource,K.frame,p||u),j.dispatchEvent({type:K.type,data:K.inputSource}))}function V(){o.removeEventListener("select",q),o.removeEventListener("selectstart",q),o.removeEventListener("selectend",q),o.removeEventListener("squeeze",q),o.removeEventListener("squeezestart",q),o.removeEventListener("squeezeend",q),o.removeEventListener("end",V),o.removeEventListener("inputsourceschange",J);for(let K=0;K<A.length;K++){const oe=T[K];oe!==null&&(T[K]=null,A[K].disconnect(oe))}F=null,ne=null,M.reset(),e.setRenderTarget(g),y=null,x=null,v=null,o=null,C=null,se.stop(),r.isPresenting=!1,e.setPixelRatio(L),e.setSize(U.width,U.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){l=K,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){d=K,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(K){p=K},this.getBaseLayer=function(){return x!==null?x:y},this.getBinding=function(){return v},this.getFrame=function(){return E},this.getSession=function(){return o},this.setSession=async function(K){if(o=K,o!==null){if(g=e.getRenderTarget(),o.addEventListener("select",q),o.addEventListener("selectstart",q),o.addEventListener("selectend",q),o.addEventListener("squeeze",q),o.addEventListener("squeezestart",q),o.addEventListener("squeezeend",q),o.addEventListener("end",V),o.addEventListener("inputsourceschange",J),S.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(U),o.renderState.layers===void 0){const oe={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:l};y=new XRWebGLLayer(o,t,oe),o.updateRenderState({baseLayer:y}),e.setPixelRatio(1),e.setSize(y.framebufferWidth,y.framebufferHeight,!1),C=new cs(y.framebufferWidth,y.framebufferHeight,{format:_i,type:Ji,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil})}else{let oe=null,j=null,te=null;S.depth&&(te=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=S.stencil?co:io,j=S.stencil?lo:ls);const ge={colorFormat:t.RGBA8,depthFormat:te,scaleFactor:l};v=new XRWebGLBinding(o,t),x=v.createProjectionLayer(ge),o.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),C=new cs(x.textureWidth,x.textureHeight,{format:_i,type:Ji,depthTexture:new Ig(x.textureWidth,x.textureHeight,j,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(h),p=null,u=await o.requestReferenceSpace(d),se.setContext(o),se.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function J(K){for(let oe=0;oe<K.removed.length;oe++){const j=K.removed[oe],te=T.indexOf(j);te>=0&&(T[te]=null,A[te].disconnect(j))}for(let oe=0;oe<K.added.length;oe++){const j=K.added[oe];let te=T.indexOf(j);if(te===-1){for(let ye=0;ye<A.length;ye++)if(ye>=T.length){T.push(j),te=ye;break}else if(T[ye]===null){T[ye]=j,te=ye;break}if(te===-1)break}const ge=A[te];ge&&ge.connect(j)}}const ee=new X,ae=new X;function H(K,oe,j){ee.setFromMatrixPosition(oe.matrixWorld),ae.setFromMatrixPosition(j.matrixWorld);const te=ee.distanceTo(ae),ge=oe.projectionMatrix.elements,ye=j.projectionMatrix.elements,Ce=ge[14]/(ge[10]-1),st=ge[14]/(ge[10]+1),Ze=(ge[9]+1)/ge[5],ut=(ge[9]-1)/ge[5],W=(ge[8]-1)/ge[0],Ft=(ye[8]+1)/ye[0],ot=Ce*W,ht=Ce*Ft,We=te/(-W+Ft),Lt=We*-W;if(oe.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Lt),K.translateZ(We),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),ge[10]===-1)K.projectionMatrix.copy(oe.projectionMatrix),K.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const Ye=Ce+We,k=st+We,N=ot-Lt,de=ht+(te-Lt),_e=Ze*st/k*Ye,Me=ut*st/k*Ye;K.projectionMatrix.makePerspective(N,de,_e,Me,Ye,k),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function le(K,oe){oe===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(oe.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(o===null)return;let oe=K.near,j=K.far;M.texture!==null&&(M.depthNear>0&&(oe=M.depthNear),M.depthFar>0&&(j=M.depthFar)),P.near=O.near=I.near=oe,P.far=O.far=I.far=j,(F!==P.near||ne!==P.far)&&(o.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,ne=P.far),I.layers.mask=K.layers.mask|2,O.layers.mask=K.layers.mask|4,P.layers.mask=I.layers.mask|O.layers.mask;const te=K.parent,ge=P.cameras;le(P,te);for(let ye=0;ye<ge.length;ye++)le(ge[ye],te);ge.length===2?H(P,I,O):P.projectionMatrix.copy(I.projectionMatrix),ie(K,P,te)};function ie(K,oe,j){j===null?K.matrix.copy(oe.matrixWorld):(K.matrix.copy(j.matrixWorld),K.matrix.invert(),K.matrix.multiply(oe.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(oe.projectionMatrix),K.projectionMatrixInverse.copy(oe.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Ah*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(x===null&&y===null))return h},this.setFoveation=function(K){h=K,x!==null&&(x.fixedFoveation=K),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=K)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(P)};let B=null;function ce(K,oe){if(m=oe.getViewerPose(p||u),E=oe,m!==null){const j=m.views;y!==null&&(e.setRenderTargetFramebuffer(C,y.framebuffer),e.setRenderTarget(C));let te=!1;j.length!==P.cameras.length&&(P.cameras.length=0,te=!0);for(let ye=0;ye<j.length;ye++){const Ce=j[ye];let st=null;if(y!==null)st=y.getViewport(Ce);else{const ut=v.getViewSubImage(x,Ce);st=ut.viewport,ye===0&&(e.setRenderTargetTextures(C,ut.colorTexture,x.ignoreDepthValues?void 0:ut.depthStencilTexture),e.setRenderTarget(C))}let Ze=R[ye];Ze===void 0&&(Ze=new oi,Ze.layers.enable(ye),Ze.viewport=new Kt,R[ye]=Ze),Ze.matrix.fromArray(Ce.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(Ce.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(st.x,st.y,st.width,st.height),ye===0&&(P.matrix.copy(Ze.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),te===!0&&P.cameras.push(Ze)}const ge=o.enabledFeatures;if(ge&&ge.includes("depth-sensing")){const ye=v.getDepthInformation(j[0]);ye&&ye.isValid&&ye.texture&&M.init(e,ye,o.renderState)}}for(let j=0;j<A.length;j++){const te=T[j],ge=A[j];te!==null&&ge!==void 0&&ge.update(te,oe,p||u)}B&&B(K,oe),oe.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:oe}),E=null}const se=new Hg;se.setAnimationLoop(ce),this.setAnimationLoop=function(K){B=K},this.dispose=function(){}}}const ns=new Ni,uT=new Gt;function dT(s,e){function t(S,g){S.matrixAutoUpdate===!0&&S.updateMatrix(),g.value.copy(S.matrix)}function r(S,g){g.color.getRGB(S.fogColor.value,Pg(s)),g.isFog?(S.fogNear.value=g.near,S.fogFar.value=g.far):g.isFogExp2&&(S.fogDensity.value=g.density)}function o(S,g,C,A,T){g.isMeshBasicMaterial||g.isMeshLambertMaterial?l(S,g):g.isMeshToonMaterial?(l(S,g),v(S,g)):g.isMeshPhongMaterial?(l(S,g),m(S,g)):g.isMeshStandardMaterial?(l(S,g),x(S,g),g.isMeshPhysicalMaterial&&y(S,g,T)):g.isMeshMatcapMaterial?(l(S,g),E(S,g)):g.isMeshDepthMaterial?l(S,g):g.isMeshDistanceMaterial?(l(S,g),M(S,g)):g.isMeshNormalMaterial?l(S,g):g.isLineBasicMaterial?(u(S,g),g.isLineDashedMaterial&&d(S,g)):g.isPointsMaterial?h(S,g,C,A):g.isSpriteMaterial?p(S,g):g.isShadowMaterial?(S.color.value.copy(g.color),S.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function l(S,g){S.opacity.value=g.opacity,g.color&&S.diffuse.value.copy(g.color),g.emissive&&S.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(S.map.value=g.map,t(g.map,S.mapTransform)),g.alphaMap&&(S.alphaMap.value=g.alphaMap,t(g.alphaMap,S.alphaMapTransform)),g.bumpMap&&(S.bumpMap.value=g.bumpMap,t(g.bumpMap,S.bumpMapTransform),S.bumpScale.value=g.bumpScale,g.side===Gn&&(S.bumpScale.value*=-1)),g.normalMap&&(S.normalMap.value=g.normalMap,t(g.normalMap,S.normalMapTransform),S.normalScale.value.copy(g.normalScale),g.side===Gn&&S.normalScale.value.negate()),g.displacementMap&&(S.displacementMap.value=g.displacementMap,t(g.displacementMap,S.displacementMapTransform),S.displacementScale.value=g.displacementScale,S.displacementBias.value=g.displacementBias),g.emissiveMap&&(S.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,S.emissiveMapTransform)),g.specularMap&&(S.specularMap.value=g.specularMap,t(g.specularMap,S.specularMapTransform)),g.alphaTest>0&&(S.alphaTest.value=g.alphaTest);const C=e.get(g),A=C.envMap,T=C.envMapRotation;A&&(S.envMap.value=A,ns.copy(T),ns.x*=-1,ns.y*=-1,ns.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(ns.y*=-1,ns.z*=-1),S.envMapRotation.value.setFromMatrix4(uT.makeRotationFromEuler(ns)),S.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=g.reflectivity,S.ior.value=g.ior,S.refractionRatio.value=g.refractionRatio),g.lightMap&&(S.lightMap.value=g.lightMap,S.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,S.lightMapTransform)),g.aoMap&&(S.aoMap.value=g.aoMap,S.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,S.aoMapTransform))}function u(S,g){S.diffuse.value.copy(g.color),S.opacity.value=g.opacity,g.map&&(S.map.value=g.map,t(g.map,S.mapTransform))}function d(S,g){S.dashSize.value=g.dashSize,S.totalSize.value=g.dashSize+g.gapSize,S.scale.value=g.scale}function h(S,g,C,A){S.diffuse.value.copy(g.color),S.opacity.value=g.opacity,S.size.value=g.size*C,S.scale.value=A*.5,g.map&&(S.map.value=g.map,t(g.map,S.uvTransform)),g.alphaMap&&(S.alphaMap.value=g.alphaMap,t(g.alphaMap,S.alphaMapTransform)),g.alphaTest>0&&(S.alphaTest.value=g.alphaTest)}function p(S,g){S.diffuse.value.copy(g.color),S.opacity.value=g.opacity,S.rotation.value=g.rotation,g.map&&(S.map.value=g.map,t(g.map,S.mapTransform)),g.alphaMap&&(S.alphaMap.value=g.alphaMap,t(g.alphaMap,S.alphaMapTransform)),g.alphaTest>0&&(S.alphaTest.value=g.alphaTest)}function m(S,g){S.specular.value.copy(g.specular),S.shininess.value=Math.max(g.shininess,1e-4)}function v(S,g){g.gradientMap&&(S.gradientMap.value=g.gradientMap)}function x(S,g){S.metalness.value=g.metalness,g.metalnessMap&&(S.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,S.metalnessMapTransform)),S.roughness.value=g.roughness,g.roughnessMap&&(S.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,S.roughnessMapTransform)),g.envMap&&(S.envMapIntensity.value=g.envMapIntensity)}function y(S,g,C){S.ior.value=g.ior,g.sheen>0&&(S.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),S.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(S.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,S.sheenColorMapTransform)),g.sheenRoughnessMap&&(S.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,S.sheenRoughnessMapTransform))),g.clearcoat>0&&(S.clearcoat.value=g.clearcoat,S.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(S.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,S.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(S.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Gn&&S.clearcoatNormalScale.value.negate())),g.dispersion>0&&(S.dispersion.value=g.dispersion),g.iridescence>0&&(S.iridescence.value=g.iridescence,S.iridescenceIOR.value=g.iridescenceIOR,S.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(S.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,S.iridescenceMapTransform)),g.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),g.transmission>0&&(S.transmission.value=g.transmission,S.transmissionSamplerMap.value=C.texture,S.transmissionSamplerSize.value.set(C.width,C.height),g.transmissionMap&&(S.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,S.transmissionMapTransform)),S.thickness.value=g.thickness,g.thicknessMap&&(S.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=g.attenuationDistance,S.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(S.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(S.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=g.specularIntensity,S.specularColor.value.copy(g.specularColor),g.specularColorMap&&(S.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,S.specularColorMapTransform)),g.specularIntensityMap&&(S.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,S.specularIntensityMapTransform))}function E(S,g){g.matcap&&(S.matcap.value=g.matcap)}function M(S,g){const C=e.get(g).light;S.referencePosition.value.setFromMatrixPosition(C.matrixWorld),S.nearDistance.value=C.shadow.camera.near,S.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:o}}function hT(s,e,t,r){let o={},l={},u=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(C,A){const T=A.program;r.uniformBlockBinding(C,T)}function p(C,A){let T=o[C.id];T===void 0&&(E(C),T=m(C),o[C.id]=T,C.addEventListener("dispose",S));const U=A.program;r.updateUBOMapping(C,U);const L=e.render.frame;l[C.id]!==L&&(x(C),l[C.id]=L)}function m(C){const A=v();C.__bindingPointIndex=A;const T=s.createBuffer(),U=C.__size,L=C.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,U,L),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,A,T),T}function v(){for(let C=0;C<d;C++)if(u.indexOf(C)===-1)return u.push(C),C;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(C){const A=o[C.id],T=C.uniforms,U=C.__cache;s.bindBuffer(s.UNIFORM_BUFFER,A);for(let L=0,I=T.length;L<I;L++){const O=Array.isArray(T[L])?T[L]:[T[L]];for(let R=0,P=O.length;R<P;R++){const F=O[R];if(y(F,L,R,U)===!0){const ne=F.__offset,q=Array.isArray(F.value)?F.value:[F.value];let V=0;for(let J=0;J<q.length;J++){const ee=q[J],ae=M(ee);typeof ee=="number"||typeof ee=="boolean"?(F.__data[0]=ee,s.bufferSubData(s.UNIFORM_BUFFER,ne+V,F.__data)):ee.isMatrix3?(F.__data[0]=ee.elements[0],F.__data[1]=ee.elements[1],F.__data[2]=ee.elements[2],F.__data[3]=0,F.__data[4]=ee.elements[3],F.__data[5]=ee.elements[4],F.__data[6]=ee.elements[5],F.__data[7]=0,F.__data[8]=ee.elements[6],F.__data[9]=ee.elements[7],F.__data[10]=ee.elements[8],F.__data[11]=0):(ee.toArray(F.__data,V),V+=ae.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ne,F.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function y(C,A,T,U){const L=C.value,I=A+"_"+T;if(U[I]===void 0)return typeof L=="number"||typeof L=="boolean"?U[I]=L:U[I]=L.clone(),!0;{const O=U[I];if(typeof L=="number"||typeof L=="boolean"){if(O!==L)return U[I]=L,!0}else if(O.equals(L)===!1)return O.copy(L),!0}return!1}function E(C){const A=C.uniforms;let T=0;const U=16;for(let I=0,O=A.length;I<O;I++){const R=Array.isArray(A[I])?A[I]:[A[I]];for(let P=0,F=R.length;P<F;P++){const ne=R[P],q=Array.isArray(ne.value)?ne.value:[ne.value];for(let V=0,J=q.length;V<J;V++){const ee=q[V],ae=M(ee),H=T%U,le=H%ae.boundary,ie=H+le;T+=le,ie!==0&&U-ie<ae.storage&&(T+=U-ie),ne.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),ne.__offset=T,T+=ae.storage}}}const L=T%U;return L>0&&(T+=U-L),C.__size=T,C.__cache={},this}function M(C){const A={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(A.boundary=4,A.storage=4):C.isVector2?(A.boundary=8,A.storage=8):C.isVector3||C.isColor?(A.boundary=16,A.storage=12):C.isVector4?(A.boundary=16,A.storage=16):C.isMatrix3?(A.boundary=48,A.storage=48):C.isMatrix4?(A.boundary=64,A.storage=64):C.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",C),A}function S(C){const A=C.target;A.removeEventListener("dispose",S);const T=u.indexOf(A.__bindingPointIndex);u.splice(T,1),s.deleteBuffer(o[A.id]),delete o[A.id],delete l[A.id]}function g(){for(const C in o)s.deleteBuffer(o[C]);u=[],o={},l={}}return{bind:h,update:p,dispose:g}}class fT{constructor(e={}){const{canvas:t=Ny(),context:r=null,depth:o=!0,stencil:l=!1,alpha:u=!1,antialias:d=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:p=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:v=!1,reverseDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let y;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");y=r.getContextAttributes().alpha}else y=u;const E=new Uint32Array(4),M=new Int32Array(4);let S=null,g=null;const C=[],A=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=si,this.toneMapping=Nr,this.toneMappingExposure=1;const T=this;let U=!1,L=0,I=0,O=null,R=-1,P=null;const F=new Kt,ne=new Kt;let q=null;const V=new dt(0);let J=0,ee=t.width,ae=t.height,H=1,le=null,ie=null;const B=new Kt(0,0,ee,ae),ce=new Kt(0,0,ee,ae);let se=!1;const K=new Wh;let oe=!1,j=!1;const te=new Gt,ge=new Gt,ye=new X,Ce=new Kt,st={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function ut(){return O===null?H:1}let W=r;function Ft(D,Q){return t.getContext(D,Q)}try{const D={alpha:!0,depth:o,stencil:l,antialias:d,premultipliedAlpha:h,preserveDrawingBuffer:p,powerPreference:m,failIfMajorPerformanceCaveat:v};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${kh}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Ie,!1),t.addEventListener("webglcontextcreationerror",Le,!1),W===null){const Q="webgl2";if(W=Ft(Q,D),W===null)throw Ft(Q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let ot,ht,We,Lt,Ye,k,N,de,_e,Me,ve,Xe,Re,Fe,gt,be,He,Qe,tt,Ve,vt,at,Pt,Z;function Pe(){ot=new ME(W),ot.init(),at=new rT(W,ot),ht=new gE(W,ot,e,at),We=new nT(W,ot),ht.reverseDepthBuffer&&x&&We.buffers.depth.setReversed(!0),Lt=new TE(W),Ye=new Gw,k=new iT(W,ot,We,Ye,ht,at,Lt),N=new xE(T),de=new SE(T),_e=new D1(W),Pt=new pE(W,_e),Me=new EE(W,_e,Lt,Pt),ve=new AE(W,Me,_e,Lt),tt=new bE(W,ht,k),be=new vE(Ye),Xe=new Vw(T,N,de,ot,ht,Pt,be),Re=new dT(T,Ye),Fe=new jw,gt=new Kw(ot),Qe=new fE(T,N,de,We,ve,y,h),He=new eT(T,ve,ht),Z=new hT(W,Lt,ht,We),Ve=new mE(W,ot,Lt),vt=new wE(W,ot,Lt),Lt.programs=Xe.programs,T.capabilities=ht,T.extensions=ot,T.properties=Ye,T.renderLists=Fe,T.shadowMap=He,T.state=We,T.info=Lt}Pe();const me=new cT(T,W);this.xr=me,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const D=ot.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=ot.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(D){D!==void 0&&(H=D,this.setSize(ee,ae,!1))},this.getSize=function(D){return D.set(ee,ae)},this.setSize=function(D,Q,fe=!0){if(me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ee=D,ae=Q,t.width=Math.floor(D*H),t.height=Math.floor(Q*H),fe===!0&&(t.style.width=D+"px",t.style.height=Q+"px"),this.setViewport(0,0,D,Q)},this.getDrawingBufferSize=function(D){return D.set(ee*H,ae*H).floor()},this.setDrawingBufferSize=function(D,Q,fe){ee=D,ae=Q,H=fe,t.width=Math.floor(D*fe),t.height=Math.floor(Q*fe),this.setViewport(0,0,D,Q)},this.getCurrentViewport=function(D){return D.copy(F)},this.getViewport=function(D){return D.copy(B)},this.setViewport=function(D,Q,fe,pe){D.isVector4?B.set(D.x,D.y,D.z,D.w):B.set(D,Q,fe,pe),We.viewport(F.copy(B).multiplyScalar(H).round())},this.getScissor=function(D){return D.copy(ce)},this.setScissor=function(D,Q,fe,pe){D.isVector4?ce.set(D.x,D.y,D.z,D.w):ce.set(D,Q,fe,pe),We.scissor(ne.copy(ce).multiplyScalar(H).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(D){We.setScissorTest(se=D)},this.setOpaqueSort=function(D){le=D},this.setTransparentSort=function(D){ie=D},this.getClearColor=function(D){return D.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor.apply(Qe,arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha.apply(Qe,arguments)},this.clear=function(D=!0,Q=!0,fe=!0){let pe=0;if(D){let $=!1;if(O!==null){const Te=O.texture.format;$=Te===Vh||Te===Hh||Te===Bh}if($){const Te=O.texture.type,Ne=Te===Ji||Te===ls||Te===la||Te===lo||Te===Fh||Te===zh,Oe=Qe.getClearColor(),ze=Qe.getClearAlpha(),nt=Oe.r,it=Oe.g,qe=Oe.b;Ne?(E[0]=nt,E[1]=it,E[2]=qe,E[3]=ze,W.clearBufferuiv(W.COLOR,0,E)):(M[0]=nt,M[1]=it,M[2]=qe,M[3]=ze,W.clearBufferiv(W.COLOR,0,M))}else pe|=W.COLOR_BUFFER_BIT}Q&&(pe|=W.DEPTH_BUFFER_BIT),fe&&(pe|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(pe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Ie,!1),t.removeEventListener("webglcontextcreationerror",Le,!1),Qe.dispose(),Fe.dispose(),gt.dispose(),Ye.dispose(),N.dispose(),de.dispose(),ve.dispose(),Pt.dispose(),Z.dispose(),Xe.dispose(),me.dispose(),me.removeEventListener("sessionstart",hs),me.removeEventListener("sessionend",er),Li.stop()};function xe(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),U=!0}function Ie(){console.log("THREE.WebGLRenderer: Context Restored."),U=!1;const D=Lt.autoReset,Q=He.enabled,fe=He.autoUpdate,pe=He.needsUpdate,$=He.type;Pe(),Lt.autoReset=D,He.enabled=Q,He.autoUpdate=fe,He.needsUpdate=pe,He.type=$}function Le(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function lt(D){const Q=D.target;Q.removeEventListener("dispose",lt),Bt(Q)}function Bt(D){nn(D),Ye.remove(D)}function nn(D){const Q=Ye.get(D).programs;Q!==void 0&&(Q.forEach(function(fe){Xe.releaseProgram(fe)}),D.isShaderMaterial&&Xe.releaseShaderCache(D))}this.renderBufferDirect=function(D,Q,fe,pe,$,Te){Q===null&&(Q=st);const Ne=$.isMesh&&$.matrixWorld.determinant()<0,Oe=pa(D,Q,fe,pe,$);We.setMaterial(pe,Ne);let ze=fe.index,nt=1;if(pe.wireframe===!0){if(ze=Me.getWireframeAttribute(fe),ze===void 0)return;nt=2}const it=fe.drawRange,qe=fe.attributes.position;let ct=it.start*nt,bt=(it.start+it.count)*nt;Te!==null&&(ct=Math.max(ct,Te.start*nt),bt=Math.min(bt,(Te.start+Te.count)*nt)),ze!==null?(ct=Math.max(ct,0),bt=Math.min(bt,ze.count)):qe!=null&&(ct=Math.max(ct,0),bt=Math.min(bt,qe.count));const At=bt-ct;if(At<0||At===1/0)return;Pt.setup($,pe,Oe,fe,ze);let jt,Et=Ve;if(ze!==null&&(jt=_e.get(ze),Et=vt,Et.setIndex(jt)),$.isMesh)pe.wireframe===!0?(We.setLineWidth(pe.wireframeLinewidth*ut()),Et.setMode(W.LINES)):Et.setMode(W.TRIANGLES);else if($.isLine){let Ke=pe.linewidth;Ke===void 0&&(Ke=1),We.setLineWidth(Ke*ut()),$.isLineSegments?Et.setMode(W.LINES):$.isLineLoop?Et.setMode(W.LINE_LOOP):Et.setMode(W.LINE_STRIP)}else $.isPoints?Et.setMode(W.POINTS):$.isSprite&&Et.setMode(W.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)Et.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(ot.get("WEBGL_multi_draw"))Et.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Ke=$._multiDrawStarts,qt=$._multiDrawCounts,Mt=$._multiDrawCount,fn=ze?_e.get(ze).bytesPerElement:1,li=Ye.get(pe).currentProgram.getUniforms();for(let Rn=0;Rn<Mt;Rn++)li.setValue(W,"_gl_DrawID",Rn),Et.render(Ke[Rn]/fn,qt[Rn])}else if($.isInstancedMesh)Et.renderInstances(ct,At,$.count);else if(fe.isInstancedBufferGeometry){const Ke=fe._maxInstanceCount!==void 0?fe._maxInstanceCount:1/0,qt=Math.min(fe.instanceCount,Ke);Et.renderInstances(ct,At,qt)}else Et.render(ct,At)};function wt(D,Q,fe){D.transparent===!0&&D.side===xi&&D.forceSinglePass===!1?(D.side=Gn,D.needsUpdate=!0,fs(D,Q,fe),D.side=Lr,D.needsUpdate=!0,fs(D,Q,fe),D.side=xi):fs(D,Q,fe)}this.compile=function(D,Q,fe=null){fe===null&&(fe=D),g=gt.get(fe),g.init(Q),A.push(g),fe.traverseVisible(function($){$.isLight&&$.layers.test(Q.layers)&&(g.pushLight($),$.castShadow&&g.pushShadow($))}),D!==fe&&D.traverseVisible(function($){$.isLight&&$.layers.test(Q.layers)&&(g.pushLight($),$.castShadow&&g.pushShadow($))}),g.setupLights();const pe=new Set;return D.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Te=$.material;if(Te)if(Array.isArray(Te))for(let Ne=0;Ne<Te.length;Ne++){const Oe=Te[Ne];wt(Oe,fe,$),pe.add(Oe)}else wt(Te,fe,$),pe.add(Te)}),A.pop(),g=null,pe},this.compileAsync=function(D,Q,fe=null){const pe=this.compile(D,Q,fe);return new Promise($=>{function Te(){if(pe.forEach(function(Ne){Ye.get(Ne).currentProgram.isReady()&&pe.delete(Ne)}),pe.size===0){$(D);return}setTimeout(Te,10)}ot.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let In=null;function Cn(D){In&&In(D)}function hs(){Li.stop()}function er(){Li.start()}const Li=new Hg;Li.setAnimationLoop(Cn),typeof self<"u"&&Li.setContext(self),this.setAnimationLoop=function(D){In=D,me.setAnimationLoop(D),D===null?Li.stop():Li.start()},me.addEventListener("sessionstart",hs),me.addEventListener("sessionend",er),this.render=function(D,Q){if(Q!==void 0&&Q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(me.cameraAutoUpdate===!0&&me.updateCamera(Q),Q=me.getCamera()),D.isScene===!0&&D.onBeforeRender(T,D,Q,O),g=gt.get(D,A.length),g.init(Q),A.push(g),ge.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),K.setFromProjectionMatrix(ge),j=this.localClippingEnabled,oe=be.init(this.clippingPlanes,j),S=Fe.get(D,C.length),S.init(),C.push(S),me.enabled===!0&&me.isPresenting===!0){const Te=T.xr.getDepthSensingMesh();Te!==null&&Ii(Te,Q,-1/0,T.sortObjects)}Ii(D,Q,0,T.sortObjects),S.finish(),T.sortObjects===!0&&S.sort(le,ie),Ze=me.enabled===!1||me.isPresenting===!1||me.hasDepthSensing()===!1,Ze&&Qe.addToRenderList(S,D),this.info.render.frame++,oe===!0&&be.beginShadows();const fe=g.state.shadowsArray;He.render(fe,D,Q),oe===!0&&be.endShadows(),this.info.autoReset===!0&&this.info.reset();const pe=S.opaque,$=S.transmissive;if(g.setupLights(),Q.isArrayCamera){const Te=Q.cameras;if($.length>0)for(let Ne=0,Oe=Te.length;Ne<Oe;Ne++){const ze=Te[Ne];kr(pe,$,D,ze)}Ze&&Qe.render(D);for(let Ne=0,Oe=Te.length;Ne<Oe;Ne++){const ze=Te[Ne];Ur(S,D,ze,ze.viewport)}}else $.length>0&&kr(pe,$,D,Q),Ze&&Qe.render(D),Ur(S,D,Q);O!==null&&(k.updateMultisampleRenderTarget(O),k.updateRenderTargetMipmap(O)),D.isScene===!0&&D.onAfterRender(T,D,Q),Pt.resetDefaultState(),R=-1,P=null,A.pop(),A.length>0?(g=A[A.length-1],oe===!0&&be.setGlobalState(T.clippingPlanes,g.state.camera)):g=null,C.pop(),C.length>0?S=C[C.length-1]:S=null};function Ii(D,Q,fe,pe){if(D.visible===!1)return;if(D.layers.test(Q.layers)){if(D.isGroup)fe=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(Q);else if(D.isLight)g.pushLight(D),D.castShadow&&g.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||K.intersectsSprite(D)){pe&&Ce.setFromMatrixPosition(D.matrixWorld).applyMatrix4(ge);const Ne=ve.update(D),Oe=D.material;Oe.visible&&S.push(D,Ne,Oe,fe,Ce.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||K.intersectsObject(D))){const Ne=ve.update(D),Oe=D.material;if(pe&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Ce.copy(D.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),Ce.copy(Ne.boundingSphere.center)),Ce.applyMatrix4(D.matrixWorld).applyMatrix4(ge)),Array.isArray(Oe)){const ze=Ne.groups;for(let nt=0,it=ze.length;nt<it;nt++){const qe=ze[nt],ct=Oe[qe.materialIndex];ct&&ct.visible&&S.push(D,Ne,ct,fe,Ce.z,qe)}}else Oe.visible&&S.push(D,Ne,Oe,fe,Ce.z,null)}}const Te=D.children;for(let Ne=0,Oe=Te.length;Ne<Oe;Ne++)Ii(Te[Ne],Q,fe,pe)}function Ur(D,Q,fe,pe){const $=D.opaque,Te=D.transmissive,Ne=D.transparent;g.setupLightsView(fe),oe===!0&&be.setGlobalState(T.clippingPlanes,fe),pe&&We.viewport(F.copy(pe)),$.length>0&&tr($,Q,fe),Te.length>0&&tr(Te,Q,fe),Ne.length>0&&tr(Ne,Q,fe),We.buffers.depth.setTest(!0),We.buffers.depth.setMask(!0),We.buffers.color.setMask(!0),We.setPolygonOffset(!1)}function kr(D,Q,fe,pe){if((fe.isScene===!0?fe.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[pe.id]===void 0&&(g.state.transmissionRenderTarget[pe.id]=new cs(1,1,{generateMipmaps:!0,type:ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float")?ca:Ji,minFilter:as,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Rt.workingColorSpace}));const Te=g.state.transmissionRenderTarget[pe.id],Ne=pe.viewport||F;Te.setSize(Ne.z,Ne.w);const Oe=T.getRenderTarget();T.setRenderTarget(Te),T.getClearColor(V),J=T.getClearAlpha(),J<1&&T.setClearColor(16777215,.5),T.clear(),Ze&&Qe.render(fe);const ze=T.toneMapping;T.toneMapping=Nr;const nt=pe.viewport;if(pe.viewport!==void 0&&(pe.viewport=void 0),g.setupLightsView(pe),oe===!0&&be.setGlobalState(T.clippingPlanes,pe),tr(D,fe,pe),k.updateMultisampleRenderTarget(Te),k.updateRenderTargetMipmap(Te),ot.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let qe=0,ct=Q.length;qe<ct;qe++){const bt=Q[qe],At=bt.object,jt=bt.geometry,Et=bt.material,Ke=bt.group;if(Et.side===xi&&At.layers.test(pe.layers)){const qt=Et.side;Et.side=Gn,Et.needsUpdate=!0,ha(At,fe,pe,jt,Et,Ke),Et.side=qt,Et.needsUpdate=!0,it=!0}}it===!0&&(k.updateMultisampleRenderTarget(Te),k.updateRenderTargetMipmap(Te))}T.setRenderTarget(Oe),T.setClearColor(V,J),nt!==void 0&&(pe.viewport=nt),T.toneMapping=ze}function tr(D,Q,fe){const pe=Q.isScene===!0?Q.overrideMaterial:null;for(let $=0,Te=D.length;$<Te;$++){const Ne=D[$],Oe=Ne.object,ze=Ne.geometry,nt=pe===null?Ne.material:pe,it=Ne.group;Oe.layers.test(fe.layers)&&ha(Oe,Q,fe,ze,nt,it)}}function ha(D,Q,fe,pe,$,Te){D.onBeforeRender(T,Q,fe,pe,$,Te),D.modelViewMatrix.multiplyMatrices(fe.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),$.onBeforeRender(T,Q,fe,pe,D,Te),$.transparent===!0&&$.side===xi&&$.forceSinglePass===!1?($.side=Gn,$.needsUpdate=!0,T.renderBufferDirect(fe,Q,pe,$,D,Te),$.side=Lr,$.needsUpdate=!0,T.renderBufferDirect(fe,Q,pe,$,D,Te),$.side=xi):T.renderBufferDirect(fe,Q,pe,$,D,Te),D.onAfterRender(T,Q,fe,pe,$,Te)}function fs(D,Q,fe){Q.isScene!==!0&&(Q=st);const pe=Ye.get(D),$=g.state.lights,Te=g.state.shadowsArray,Ne=$.state.version,Oe=Xe.getParameters(D,$.state,Te,Q,fe),ze=Xe.getProgramCacheKey(Oe);let nt=pe.programs;pe.environment=D.isMeshStandardMaterial?Q.environment:null,pe.fog=Q.fog,pe.envMap=(D.isMeshStandardMaterial?de:N).get(D.envMap||pe.environment),pe.envMapRotation=pe.environment!==null&&D.envMap===null?Q.environmentRotation:D.envMapRotation,nt===void 0&&(D.addEventListener("dispose",lt),nt=new Map,pe.programs=nt);let it=nt.get(ze);if(it!==void 0){if(pe.currentProgram===it&&pe.lightsStateVersion===Ne)return Mi(D,Oe),it}else Oe.uniforms=Xe.getUniforms(D),D.onBeforeCompile(Oe,T),it=Xe.acquireProgram(Oe,ze),nt.set(ze,it),pe.uniforms=Oe.uniforms;const qe=pe.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(qe.clippingPlanes=be.uniform),Mi(D,Oe),pe.needsLights=_c(D),pe.lightsStateVersion=Ne,pe.needsLights&&(qe.ambientLightColor.value=$.state.ambient,qe.lightProbe.value=$.state.probe,qe.directionalLights.value=$.state.directional,qe.directionalLightShadows.value=$.state.directionalShadow,qe.spotLights.value=$.state.spot,qe.spotLightShadows.value=$.state.spotShadow,qe.rectAreaLights.value=$.state.rectArea,qe.ltc_1.value=$.state.rectAreaLTC1,qe.ltc_2.value=$.state.rectAreaLTC2,qe.pointLights.value=$.state.point,qe.pointLightShadows.value=$.state.pointShadow,qe.hemisphereLights.value=$.state.hemi,qe.directionalShadowMap.value=$.state.directionalShadowMap,qe.directionalShadowMatrix.value=$.state.directionalShadowMatrix,qe.spotShadowMap.value=$.state.spotShadowMap,qe.spotLightMatrix.value=$.state.spotLightMatrix,qe.spotLightMap.value=$.state.spotLightMap,qe.pointShadowMap.value=$.state.pointShadowMap,qe.pointShadowMatrix.value=$.state.pointShadowMatrix),pe.currentProgram=it,pe.uniformsList=null,it}function fa(D){if(D.uniformsList===null){const Q=D.currentProgram.getUniforms();D.uniformsList=ec.seqWithValue(Q.seq,D.uniforms)}return D.uniformsList}function Mi(D,Q){const fe=Ye.get(D);fe.outputColorSpace=Q.outputColorSpace,fe.batching=Q.batching,fe.batchingColor=Q.batchingColor,fe.instancing=Q.instancing,fe.instancingColor=Q.instancingColor,fe.instancingMorph=Q.instancingMorph,fe.skinning=Q.skinning,fe.morphTargets=Q.morphTargets,fe.morphNormals=Q.morphNormals,fe.morphColors=Q.morphColors,fe.morphTargetsCount=Q.morphTargetsCount,fe.numClippingPlanes=Q.numClippingPlanes,fe.numIntersection=Q.numClipIntersection,fe.vertexAlphas=Q.vertexAlphas,fe.vertexTangents=Q.vertexTangents,fe.toneMapping=Q.toneMapping}function pa(D,Q,fe,pe,$){Q.isScene!==!0&&(Q=st),k.resetTextureUnits();const Te=Q.fog,Ne=pe.isMeshStandardMaterial?Q.environment:null,Oe=O===null?T.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:uo,ze=(pe.isMeshStandardMaterial?de:N).get(pe.envMap||Ne),nt=pe.vertexColors===!0&&!!fe.attributes.color&&fe.attributes.color.itemSize===4,it=!!fe.attributes.tangent&&(!!pe.normalMap||pe.anisotropy>0),qe=!!fe.morphAttributes.position,ct=!!fe.morphAttributes.normal,bt=!!fe.morphAttributes.color;let At=Nr;pe.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(At=T.toneMapping);const jt=fe.morphAttributes.position||fe.morphAttributes.normal||fe.morphAttributes.color,Et=jt!==void 0?jt.length:0,Ke=Ye.get(pe),qt=g.state.lights;if(oe===!0&&(j===!0||D!==P)){const Qt=D===P&&pe.id===R;be.setState(pe,D,Qt)}let Mt=!1;pe.version===Ke.__version?(Ke.needsLights&&Ke.lightsStateVersion!==qt.state.version||Ke.outputColorSpace!==Oe||$.isBatchedMesh&&Ke.batching===!1||!$.isBatchedMesh&&Ke.batching===!0||$.isBatchedMesh&&Ke.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&Ke.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&Ke.instancing===!1||!$.isInstancedMesh&&Ke.instancing===!0||$.isSkinnedMesh&&Ke.skinning===!1||!$.isSkinnedMesh&&Ke.skinning===!0||$.isInstancedMesh&&Ke.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ke.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ke.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ke.instancingMorph===!1&&$.morphTexture!==null||Ke.envMap!==ze||pe.fog===!0&&Ke.fog!==Te||Ke.numClippingPlanes!==void 0&&(Ke.numClippingPlanes!==be.numPlanes||Ke.numIntersection!==be.numIntersection)||Ke.vertexAlphas!==nt||Ke.vertexTangents!==it||Ke.morphTargets!==qe||Ke.morphNormals!==ct||Ke.morphColors!==bt||Ke.toneMapping!==At||Ke.morphTargetsCount!==Et)&&(Mt=!0):(Mt=!0,Ke.__version=pe.version);let fn=Ke.currentProgram;Mt===!0&&(fn=fs(pe,Q,$));let li=!1,Rn=!1,Or=!1;const Ut=fn.getUniforms(),Pn=Ke.uniforms;if(We.useProgram(fn.program)&&(li=!0,Rn=!0,Or=!0),pe.id!==R&&(R=pe.id,Rn=!0),li||P!==D){We.buffers.depth.getReversed()?(te.copy(D.projectionMatrix),Ly(te),Iy(te),Ut.setValue(W,"projectionMatrix",te)):Ut.setValue(W,"projectionMatrix",D.projectionMatrix),Ut.setValue(W,"viewMatrix",D.matrixWorldInverse);const _n=Ut.map.cameraPosition;_n!==void 0&&_n.setValue(W,ye.setFromMatrixPosition(D.matrixWorld)),ht.logarithmicDepthBuffer&&Ut.setValue(W,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(pe.isMeshPhongMaterial||pe.isMeshToonMaterial||pe.isMeshLambertMaterial||pe.isMeshBasicMaterial||pe.isMeshStandardMaterial||pe.isShaderMaterial)&&Ut.setValue(W,"isOrthographic",D.isOrthographicCamera===!0),P!==D&&(P=D,Rn=!0,Or=!0)}if($.isSkinnedMesh){Ut.setOptional(W,$,"bindMatrix"),Ut.setOptional(W,$,"bindMatrixInverse");const Qt=$.skeleton;Qt&&(Qt.boneTexture===null&&Qt.computeBoneTexture(),Ut.setValue(W,"boneTexture",Qt.boneTexture,k))}$.isBatchedMesh&&(Ut.setOptional(W,$,"batchingTexture"),Ut.setValue(W,"batchingTexture",$._matricesTexture,k),Ut.setOptional(W,$,"batchingIdTexture"),Ut.setValue(W,"batchingIdTexture",$._indirectTexture,k),Ut.setOptional(W,$,"batchingColorTexture"),$._colorsTexture!==null&&Ut.setValue(W,"batchingColorTexture",$._colorsTexture,k));const xn=fe.morphAttributes;if((xn.position!==void 0||xn.normal!==void 0||xn.color!==void 0)&&tt.update($,fe,fn),(Rn||Ke.receiveShadow!==$.receiveShadow)&&(Ke.receiveShadow=$.receiveShadow,Ut.setValue(W,"receiveShadow",$.receiveShadow)),pe.isMeshGouraudMaterial&&pe.envMap!==null&&(Pn.envMap.value=ze,Pn.flipEnvMap.value=ze.isCubeTexture&&ze.isRenderTargetTexture===!1?-1:1),pe.isMeshStandardMaterial&&pe.envMap===null&&Q.environment!==null&&(Pn.envMapIntensity.value=Q.environmentIntensity),Rn&&(Ut.setValue(W,"toneMappingExposure",T.toneMappingExposure),Ke.needsLights&&ma(Pn,Or),Te&&pe.fog===!0&&Re.refreshFogUniforms(Pn,Te),Re.refreshMaterialUniforms(Pn,pe,H,ae,g.state.transmissionRenderTarget[D.id]),ec.upload(W,fa(Ke),Pn,k)),pe.isShaderMaterial&&pe.uniformsNeedUpdate===!0&&(ec.upload(W,fa(Ke),Pn,k),pe.uniformsNeedUpdate=!1),pe.isSpriteMaterial&&Ut.setValue(W,"center",$.center),Ut.setValue(W,"modelViewMatrix",$.modelViewMatrix),Ut.setValue(W,"normalMatrix",$.normalMatrix),Ut.setValue(W,"modelMatrix",$.matrixWorld),pe.isShaderMaterial||pe.isRawShaderMaterial){const Qt=pe.uniformsGroups;for(let _n=0,Fr=Qt.length;_n<Fr;_n++){const _t=Qt[_n];Z.update(_t,fn),Z.bind(_t,fn)}}return fn}function ma(D,Q){D.ambientLightColor.needsUpdate=Q,D.lightProbe.needsUpdate=Q,D.directionalLights.needsUpdate=Q,D.directionalLightShadows.needsUpdate=Q,D.pointLights.needsUpdate=Q,D.pointLightShadows.needsUpdate=Q,D.spotLights.needsUpdate=Q,D.spotLightShadows.needsUpdate=Q,D.rectAreaLights.needsUpdate=Q,D.hemisphereLights.needsUpdate=Q}function _c(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(D,Q,fe){Ye.get(D.texture).__webglTexture=Q,Ye.get(D.depthTexture).__webglTexture=fe;const pe=Ye.get(D);pe.__hasExternalTextures=!0,pe.__autoAllocateDepthBuffer=fe===void 0,pe.__autoAllocateDepthBuffer||ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),pe.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(D,Q){const fe=Ye.get(D);fe.__webglFramebuffer=Q,fe.__useDefaultFramebuffer=Q===void 0},this.setRenderTarget=function(D,Q=0,fe=0){O=D,L=Q,I=fe;let pe=!0,$=null,Te=!1,Ne=!1;if(D){const ze=Ye.get(D);if(ze.__useDefaultFramebuffer!==void 0)We.bindFramebuffer(W.FRAMEBUFFER,null),pe=!1;else if(ze.__webglFramebuffer===void 0)k.setupRenderTarget(D);else if(ze.__hasExternalTextures)k.rebindTextures(D,Ye.get(D.texture).__webglTexture,Ye.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const qe=D.depthTexture;if(ze.__boundDepthTexture!==qe){if(qe!==null&&Ye.has(qe)&&(D.width!==qe.image.width||D.height!==qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(D)}}const nt=D.texture;(nt.isData3DTexture||nt.isDataArrayTexture||nt.isCompressedArrayTexture)&&(Ne=!0);const it=Ye.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(it[Q])?$=it[Q][fe]:$=it[Q],Te=!0):D.samples>0&&k.useMultisampledRTT(D)===!1?$=Ye.get(D).__webglMultisampledFramebuffer:Array.isArray(it)?$=it[fe]:$=it,F.copy(D.viewport),ne.copy(D.scissor),q=D.scissorTest}else F.copy(B).multiplyScalar(H).floor(),ne.copy(ce).multiplyScalar(H).floor(),q=se;if(We.bindFramebuffer(W.FRAMEBUFFER,$)&&pe&&We.drawBuffers(D,$),We.viewport(F),We.scissor(ne),We.setScissorTest(q),Te){const ze=Ye.get(D.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ze.__webglTexture,fe)}else if(Ne){const ze=Ye.get(D.texture),nt=Q||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,ze.__webglTexture,fe||0,nt)}R=-1},this.readRenderTargetPixels=function(D,Q,fe,pe,$,Te,Ne){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=Ye.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ne!==void 0&&(Oe=Oe[Ne]),Oe){We.bindFramebuffer(W.FRAMEBUFFER,Oe);try{const ze=D.texture,nt=ze.format,it=ze.type;if(!ht.textureFormatReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ht.textureTypeReadable(it)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=D.width-pe&&fe>=0&&fe<=D.height-$&&W.readPixels(Q,fe,pe,$,at.convert(nt),at.convert(it),Te)}finally{const ze=O!==null?Ye.get(O).__webglFramebuffer:null;We.bindFramebuffer(W.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(D,Q,fe,pe,$,Te,Ne){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=Ye.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ne!==void 0&&(Oe=Oe[Ne]),Oe){const ze=D.texture,nt=ze.format,it=ze.type;if(!ht.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ht.textureTypeReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Q>=0&&Q<=D.width-pe&&fe>=0&&fe<=D.height-$){We.bindFramebuffer(W.FRAMEBUFFER,Oe);const qe=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,qe),W.bufferData(W.PIXEL_PACK_BUFFER,Te.byteLength,W.STREAM_READ),W.readPixels(Q,fe,pe,$,at.convert(nt),at.convert(it),0);const ct=O!==null?Ye.get(O).__webglFramebuffer:null;We.bindFramebuffer(W.FRAMEBUFFER,ct);const bt=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await Dy(W,bt,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,qe),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,Te),W.deleteBuffer(qe),W.deleteSync(bt),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(D,Q=null,fe=0){D.isTexture!==!0&&(Ks("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Q=arguments[0]||null,D=arguments[1]);const pe=Math.pow(2,-fe),$=Math.floor(D.image.width*pe),Te=Math.floor(D.image.height*pe),Ne=Q!==null?Q.x:0,Oe=Q!==null?Q.y:0;k.setTexture2D(D,0),W.copyTexSubImage2D(W.TEXTURE_2D,fe,0,0,Ne,Oe,$,Te),We.unbindTexture()};const ga=W.createFramebuffer(),va=W.createFramebuffer();this.copyTextureToTexture=function(D,Q,fe=null,pe=null,$=0,Te=null){D.isTexture!==!0&&(Ks("WebGLRenderer: copyTextureToTexture function signature has changed."),pe=arguments[0]||null,D=arguments[1],Q=arguments[2],Te=arguments[3]||0,fe=null),Te===null&&($!==0?(Ks("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Te=$,$=0):Te=0);let Ne,Oe,ze,nt,it,qe,ct,bt,At;const jt=D.isCompressedTexture?D.mipmaps[Te]:D.image;if(fe!==null)Ne=fe.max.x-fe.min.x,Oe=fe.max.y-fe.min.y,ze=fe.isBox3?fe.max.z-fe.min.z:1,nt=fe.min.x,it=fe.min.y,qe=fe.isBox3?fe.min.z:0;else{const xn=Math.pow(2,-$);Ne=Math.floor(jt.width*xn),Oe=Math.floor(jt.height*xn),D.isDataArrayTexture?ze=jt.depth:D.isData3DTexture?ze=Math.floor(jt.depth*xn):ze=1,nt=0,it=0,qe=0}pe!==null?(ct=pe.x,bt=pe.y,At=pe.z):(ct=0,bt=0,At=0);const Et=at.convert(Q.format),Ke=at.convert(Q.type);let qt;Q.isData3DTexture?(k.setTexture3D(Q,0),qt=W.TEXTURE_3D):Q.isDataArrayTexture||Q.isCompressedArrayTexture?(k.setTexture2DArray(Q,0),qt=W.TEXTURE_2D_ARRAY):(k.setTexture2D(Q,0),qt=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,Q.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,Q.unpackAlignment);const Mt=W.getParameter(W.UNPACK_ROW_LENGTH),fn=W.getParameter(W.UNPACK_IMAGE_HEIGHT),li=W.getParameter(W.UNPACK_SKIP_PIXELS),Rn=W.getParameter(W.UNPACK_SKIP_ROWS),Or=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,jt.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,jt.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,nt),W.pixelStorei(W.UNPACK_SKIP_ROWS,it),W.pixelStorei(W.UNPACK_SKIP_IMAGES,qe);const Ut=D.isDataArrayTexture||D.isData3DTexture,Pn=Q.isDataArrayTexture||Q.isData3DTexture;if(D.isDepthTexture){const xn=Ye.get(D),Qt=Ye.get(Q),_n=Ye.get(xn.__renderTarget),Fr=Ye.get(Qt.__renderTarget);We.bindFramebuffer(W.READ_FRAMEBUFFER,_n.__webglFramebuffer),We.bindFramebuffer(W.DRAW_FRAMEBUFFER,Fr.__webglFramebuffer);for(let _t=0;_t<ze;_t++)Ut&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ye.get(D).__webglTexture,$,qe+_t),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Ye.get(Q).__webglTexture,Te,At+_t)),W.blitFramebuffer(nt,it,Ne,Oe,ct,bt,Ne,Oe,W.DEPTH_BUFFER_BIT,W.NEAREST);We.bindFramebuffer(W.READ_FRAMEBUFFER,null),We.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if($!==0||D.isRenderTargetTexture||Ye.has(D)){const xn=Ye.get(D),Qt=Ye.get(Q);We.bindFramebuffer(W.READ_FRAMEBUFFER,ga),We.bindFramebuffer(W.DRAW_FRAMEBUFFER,va);for(let _n=0;_n<ze;_n++)Ut?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,xn.__webglTexture,$,qe+_n):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,xn.__webglTexture,$),Pn?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Qt.__webglTexture,Te,At+_n):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Qt.__webglTexture,Te),$!==0?W.blitFramebuffer(nt,it,Ne,Oe,ct,bt,Ne,Oe,W.COLOR_BUFFER_BIT,W.NEAREST):Pn?W.copyTexSubImage3D(qt,Te,ct,bt,At+_n,nt,it,Ne,Oe):W.copyTexSubImage2D(qt,Te,ct,bt,nt,it,Ne,Oe);We.bindFramebuffer(W.READ_FRAMEBUFFER,null),We.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else Pn?D.isDataTexture||D.isData3DTexture?W.texSubImage3D(qt,Te,ct,bt,At,Ne,Oe,ze,Et,Ke,jt.data):Q.isCompressedArrayTexture?W.compressedTexSubImage3D(qt,Te,ct,bt,At,Ne,Oe,ze,Et,jt.data):W.texSubImage3D(qt,Te,ct,bt,At,Ne,Oe,ze,Et,Ke,jt):D.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,Te,ct,bt,Ne,Oe,Et,Ke,jt.data):D.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,Te,ct,bt,jt.width,jt.height,Et,jt.data):W.texSubImage2D(W.TEXTURE_2D,Te,ct,bt,Ne,Oe,Et,Ke,jt);W.pixelStorei(W.UNPACK_ROW_LENGTH,Mt),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,fn),W.pixelStorei(W.UNPACK_SKIP_PIXELS,li),W.pixelStorei(W.UNPACK_SKIP_ROWS,Rn),W.pixelStorei(W.UNPACK_SKIP_IMAGES,Or),Te===0&&Q.generateMipmaps&&W.generateMipmap(qt),We.unbindTexture()},this.copyTextureToTexture3D=function(D,Q,fe=null,pe=null,$=0){return D.isTexture!==!0&&(Ks("WebGLRenderer: copyTextureToTexture3D function signature has changed."),fe=arguments[0]||null,pe=arguments[1]||null,D=arguments[2],Q=arguments[3],$=arguments[4]||0),Ks('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(D,Q,fe,pe,$)},this.initRenderTarget=function(D){Ye.get(D).__webglFramebuffer===void 0&&k.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?k.setTextureCube(D,0):D.isData3DTexture?k.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?k.setTexture2DArray(D,0):k.setTexture2D(D,0),We.unbindTexture()},this.resetState=function(){L=0,I=0,O=null,We.reset(),Pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Rt._getUnpackColorSpace()}}const $0={type:"change"},Qh={type:"start"},Xg={type:"end"},$l=new gc,Y0=new Cr,pT=Math.cos(70*Py.DEG2RAD),on=new X,Vn=2*Math.PI,Ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Bd=1e-6;class mT extends P1{constructor(e,t=null){super(e,t),this.state=Ot.NONE,this.enabled=!0,this.target=new X,this.cursor=new X,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:to.ROTATE,MIDDLE:to.DOLLY,RIGHT:to.PAN},this.touches={ONE:Js.ROTATE,TWO:Js.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new X,this._lastQuaternion=new us,this._lastTargetPosition=new X,this._quat=new us().setFromUnitVectors(e.up,new X(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new S0,this._sphericalDelta=new S0,this._scale=1,this._panOffset=new X,this._rotateStart=new Ue,this._rotateEnd=new Ue,this._rotateDelta=new Ue,this._panStart=new Ue,this._panEnd=new Ue,this._panDelta=new Ue,this._dollyStart=new Ue,this._dollyEnd=new Ue,this._dollyDelta=new Ue,this._dollyDirection=new X,this._mouse=new Ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=vT.bind(this),this._onPointerDown=gT.bind(this),this._onPointerUp=xT.bind(this),this._onContextMenu=TT.bind(this),this._onMouseWheel=ST.bind(this),this._onKeyDown=MT.bind(this),this._onTouchStart=ET.bind(this),this._onTouchMove=wT.bind(this),this._onMouseDown=_T.bind(this),this._onMouseMove=yT.bind(this),this._interceptControlDown=bT.bind(this),this._interceptControlUp=AT.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent($0),this.update(),this.state=Ot.NONE}update(e=null){const t=this.object.position;on.copy(t).sub(this.target),on.applyQuaternion(this._quat),this._spherical.setFromVector3(on),this.autoRotate&&this.state===Ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,o=this.maxAzimuthAngle;isFinite(r)&&isFinite(o)&&(r<-Math.PI?r+=Vn:r>Math.PI&&(r-=Vn),o<-Math.PI?o+=Vn:o>Math.PI&&(o-=Vn),r<=o?this._spherical.theta=Math.max(r,Math.min(o,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+o)/2?Math.max(r,this._spherical.theta):Math.min(o,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let l=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const u=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),l=u!=this._spherical.radius}if(on.setFromSpherical(this._spherical),on.applyQuaternion(this._quatInverse),t.copy(this.target).add(on),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let u=null;if(this.object.isPerspectiveCamera){const d=on.length();u=this._clampDistance(d*this._scale);const h=d-u;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),l=!!h}else if(this.object.isOrthographicCamera){const d=new X(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),l=h!==this.object.zoom;const p=new X(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),u=on.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;u!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(u).add(this.object.position):($l.origin.copy(this.object.position),$l.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot($l.direction))<pT?this.object.lookAt(this.target):(Y0.setFromNormalAndCoplanarPoint(this.object.up,this.target),$l.intersectPlane(Y0,this.target))))}else if(this.object.isOrthographicCamera){const u=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),u!==this.object.zoom&&(this.object.updateProjectionMatrix(),l=!0)}return this._scale=1,this._performCursorZoom=!1,l||this._lastPosition.distanceToSquared(this.object.position)>Bd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Bd||this._lastTargetPosition.distanceToSquared(this.target)>Bd?(this.dispatchEvent($0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Vn/60*this.autoRotateSpeed*e:Vn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){on.setFromMatrixColumn(t,0),on.multiplyScalar(-e),this._panOffset.add(on)}_panUp(e,t){this.screenSpacePanning===!0?on.setFromMatrixColumn(t,1):(on.setFromMatrixColumn(t,0),on.crossVectors(this.object.up,on)),on.multiplyScalar(e),this._panOffset.add(on)}_pan(e,t){const r=this.domElement;if(this.object.isPerspectiveCamera){const o=this.object.position;on.copy(o).sub(this.target);let l=on.length();l*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*l/r.clientHeight,this.object.matrix),this._panUp(2*t*l/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),o=e-r.left,l=t-r.top,u=r.width,d=r.height;this._mouse.x=o/u*2-1,this._mouse.y=-(l/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Vn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Vn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Vn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Vn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);this._rotateStart.set(r,o)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);this._panStart.set(r,o)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),r=e.pageX-t.x,o=e.pageY-t.y,l=Math.sqrt(r*r+o*o);this._dollyStart.set(0,l)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),o=.5*(e.pageX+r.x),l=.5*(e.pageY+r.y);this._rotateEnd.set(o,l)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);this._panEnd.set(r,o)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),r=e.pageX-t.x,o=e.pageY-t.y,l=Math.sqrt(r*r+o*o);this._dollyEnd.set(0,l),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const u=(e.pageX+t.x)*.5,d=(e.pageY+t.y)*.5;this._updateZoomParameters(u,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function gT(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function vT(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function xT(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Xg),this.state=Ot.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function _T(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case to.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Ot.DOLLY;break;case to.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ot.ROTATE}break;case to.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ot.PAN}break;default:this.state=Ot.NONE}this.state!==Ot.NONE&&this.dispatchEvent(Qh)}function yT(s){switch(this.state){case Ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function ST(s){this.enabled===!1||this.enableZoom===!1||this.state!==Ot.NONE||(s.preventDefault(),this.dispatchEvent(Qh),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Xg))}function MT(s){this.enabled!==!1&&this._handleKeyDown(s)}function ET(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Js.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Ot.TOUCH_ROTATE;break;case Js.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Ot.TOUCH_PAN;break;default:this.state=Ot.NONE}break;case 2:switch(this.touches.TWO){case Js.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Ot.TOUCH_DOLLY_PAN;break;case Js.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Ot.TOUCH_DOLLY_ROTATE;break;default:this.state=Ot.NONE}break;default:this.state=Ot.NONE}this.state!==Ot.NONE&&this.dispatchEvent(Qh)}function wT(s){switch(this._trackPointer(s),this.state){case Ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Ot.NONE}}function TT(s){this.enabled!==!1&&s.preventDefault()}function bT(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function AT(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const $g=({missionOverride:s,zonesOverride:e,reportOverride:t,readonly:r=!1})=>{const o=Qi(),l=s??o.mission,u=e??o.zones,d=t??o.report,h=Nt.useRef(null),[p,m]=Nt.useState("perspective"),[v,x]=Nt.useState(null),y=Nt.useRef(null),E=Nt.useRef(null),M=Nt.useRef(null),S=Nt.useRef(null),g=Nt.useRef([]),C=Nt.useRef([]);return Nt.useEffect(()=>{const A=h.current;if(!A)return;let T;try{T=new fT({antialias:!0,alpha:!0,powerPreference:"default"})}catch(ie){x(ie instanceof Error?ie.message:"WebGL unavailable");return}T.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),T.setSize(A.clientWidth||400,A.clientHeight||300),T.setClearColor(593174,1),A.appendChild(T.domElement);const U=new i1;y.current=U;const L=new oi(44,(A.clientWidth||400)/Math.max(1,A.clientHeight||300),.1,200);L.position.set(11,10,13),E.current=L;const I=new mT(L,T.domElement);I.enableDamping=!0,I.dampingFactor=.08,I.maxDistance=42,I.minDistance=4,M.current=I;const O=new b1(13358561,.75);U.add(O);const R=new x0(14742270,1.15);R.position.set(14,22,12),U.add(R);const P=new x0(3718648,.45);P.position.set(-14,6,-12),U.add(P);const F=new Jo;U.add(F),S.current=F;const ne=new C1,q=new Ue;let V={x:0,y:0};const J=ie=>{V={x:ie.clientX,y:ie.clientY}},ee=ie=>{if(r||Math.hypot(ie.clientX-V.x,ie.clientY-V.y)>5)return;const ce=T.domElement.getBoundingClientRect();q.x=(ie.clientX-ce.left)/ce.width*2-1,q.y=-((ie.clientY-ce.top)/ce.height)*2+1,ne.setFromCamera(q,L);const se=ne.intersectObjects(C.current,!1);if(se.length>0){const K=se[0].object.userData.zoneId;K&&o.selectZone(K)}};T.domElement.addEventListener("pointerdown",J),T.domElement.addEventListener("pointerup",ee);const ae=new ResizeObserver(()=>{if(!A)return;const ie=A.clientWidth,B=A.clientHeight;ie>0&&B>0&&(L.aspect=ie/B,L.updateProjectionMatrix(),T.setSize(ie,B))});ae.observe(A);let H=0;const le=()=>{H=requestAnimationFrame(le),I.update();const ie=performance.now()*.0025;for(const B of g.current){const ce=B.material;ce.opacity=.65+.35*Math.sin(ie*2.2)}T.render(U,L)};return le(),()=>{cancelAnimationFrame(H),ae.disconnect(),T.domElement.removeEventListener("pointerdown",J),T.domElement.removeEventListener("pointerup",ee),I.dispose(),U.traverse(ie=>{ie.geometry&&ie.geometry.dispose();const B=ie.material;Array.isArray(B)?B.forEach(ce=>ce.dispose()):B&&B.dispose()}),T.dispose(),T.domElement.parentElement===A&&A.removeChild(T.domElement)}},[]),Nt.useEffect(()=>{const A=E.current,T=M.current;if(!A||!T)return;const{width:U,depth:L,deckHeight:I}=Si(l.hull),O=l.hull.decks*I,R=Math.max(U,L);T.target.set(0,O*.4,0),p==="top"?A.position.set(0,R*1.45,.01):p==="cutaway"?A.position.set(0,R*.65,R*.92):A.position.set(R*.72,R*.68,R*.85),T.update()},[p,l.hull.diameter,l.hull.length,l.hull.decks,l.hull.type]),Nt.useEffect(()=>{const A=S.current;if(!A)return;for(;A.children.length>0;){const V=A.children[0];A.remove(V),V.traverse(J=>{J.geometry&&J.geometry.dispose();const ee=J.material;Array.isArray(ee)?ee.forEach(ae=>ae.dispose()):ee&&ee.dispose()})}g.current=[],C.current=[];const{hull:T}=l,{width:U,depth:L,deckHeight:I}=Si(T),O=U/2,R=L/2,P=T.decks*I,F=p==="cutaway"?.07:.16,ne=T.type==="inflatable"?11032055:3718648;if(T.type==="surface_dome"){const V=new qh(T.diameter/2,36,20,0,Math.PI*2,0,Math.PI/2),J=new Nd({color:ne,transparent:!0,opacity:F,roughness:.25,side:xi,depthWrite:!1}),ee=new bn(V,J);ee.position.set(0,.3,0),A.add(ee);const ae=new S1(V),H=new ia({color:ne,transparent:!0,opacity:.22}),le=new Ch(ae,H);le.position.set(0,.3,0),A.add(le)}else{const V=Math.max(T.diameter/2,P/2+.3),J=new lc(V,V,T.length,32,1,p==="cutaway");J.rotateZ(Math.PI/2);const ee=new Nd({color:ne,transparent:!0,opacity:F,roughness:.25,side:xi,depthWrite:!1}),ae=new bn(J,ee);ae.position.set(0,P/2,0),A.add(ae);const H=Math.max(4,Math.floor(T.length/2.2));for(let le=0;le<=H;le++){const ie=-T.length/2+le/H*T.length,B=new Zh(V,.035,8,40);B.rotateY(Math.PI/2);const ce=new sc({color:ne,transparent:!0,opacity:.32}),se=new bn(B,ce);se.position.set(ie,P/2,0),A.add(se)}}for(let V=0;V<T.decks;V++){const J=V*I,ee=T.type==="surface_dome"?new lc(T.diameter/2-T.wallThickness,T.diameter/2-T.wallThickness,.08,36):new Dr(U-T.wallThickness*2,.08,L-T.wallThickness*2),ae=new Rh({color:1120295,roughness:.85,metalness:.2}),H=new bn(ee,ae);H.position.set(0,J-.04,0),A.add(H);const le=new R1(Math.max(U,L),Math.max(U,L),1976635,1976635);le.position.set(0,J+.005,0),le.material.transparent=!0,le.material.opacity=.35,A.add(le)}const q=new Map;for(const V of d.violations)if(V.severity!=="PASS")for(const J of V.affectedZoneIds)(!q.has(J)||V.severity==="CRITICAL")&&q.set(J,V.severity);for(const V of u){const J=gn[V.type],ee=V.deck*I,ae=Math.min(V.zHeight,I-.15),H=!r&&o.selectedZoneId===V.id,le=!r&&o.highlightedZoneIds.includes(V.id),ie=q.get(V.id),B=new Dr(V.width,ae,V.height),ce=new Nd({color:new dt(J.color),transparent:!0,opacity:H?.65:V.type==="storm_shelter"?.48:.38,roughness:.3,metalness:.1,emissive:H?new dt(2282478):le?new dt(16436245):ie==="CRITICAL"?new dt(16007006):new dt(0),emissiveIntensity:H||le?.35:ie==="CRITICAL"?.22:0}),se=new bn(B,ce);se.position.set(V.x+V.width/2-O,ee+ae/2,V.y+V.height/2-R),se.userData.zoneId=V.id,A.add(se),C.current.push(se);const K=new y1(B),oe=H?2282478:ie==="CRITICAL"?16007006:ie==="WARNING"?16096779:new dt(J.accentColor).getHex(),j=new ia({color:oe,transparent:!0,opacity:H?1:.8}),te=new Ch(K,j);if(te.position.copy(se.position),A.add(te),V.type==="storm_shelter"){const ge=new Dr(V.width+.16,ae+.12,V.height+.16),ye=new sc({color:3718648,transparent:!0,opacity:.16,wireframe:!0}),Ce=new bn(ge,ye);Ce.position.copy(se.position),A.add(Ce)}if(V.type==="crew_quarters"||V.type==="galley"){const ge=new Yh(.16,1.1,4,8),ye=new Rh({color:14870768,roughness:.4}),Ce=new bn(ge,ye);Ce.position.set(V.x+V.width/2-O,ee+.85,V.y+V.height/2-R),A.add(Ce)}}if(o.showEgressOverlay||r){const V=(J,ee,ae,H)=>{if(J.length<2)return;const le=ee*I+H,ie=J.map(K=>new X(K.x-O,le,K.y-R)),B=new An().setFromPoints(ie),ce=new ia({color:ae,transparent:!0,opacity:.9}),se=new Lg(B,ce);A.add(se),g.current.push(se)};for(const J of d.egress.airlockPaths)J.reachable&&V(J.points,J.deck,1096065,.18);for(const J of d.egress.shelterPaths)J.reachable&&V(J.points,J.deck,3718648,.11)}},[l,u,d,p,r,o.selectedZoneId,o.highlightedZoneIds,o.showEgressOverlay]),v?w.jsxs("div",{className:"w-full h-full bg-[#090D16] flex flex-col items-center justify-center p-6 text-center",children:[w.jsx(Nm,{className:"w-8 h-8 text-slate-500 mb-2"}),w.jsx("div",{className:"text-xs font-semibold text-slate-300",children:"3D WebGL Viewport Unavailable"}),w.jsx("div",{className:"text-[11px] text-slate-500 mt-1",children:v})]}):w.jsxs("div",{className:"relative w-full h-full bg-[#090D16] overflow-hidden select-none",children:[w.jsxs("div",{className:"absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none",children:[w.jsxs("span",{className:"px-2 py-1 rounded bg-[#111827]/90 border border-slate-700/80 text-[10px] font-mono-telemetry uppercase tracking-wider text-sky-300 shadow",children:["3D WEBGL • ",l.hull.decks," DECK",l.hull.decks>1?"S":""," • ORBIT / CLICK"]}),w.jsx("div",{className:"flex items-center bg-[#111827]/90 border border-slate-700/80 rounded p-0.5 gap-0.5 pointer-events-auto shadow",children:[{id:"perspective",label:"Perspective",icon:w.jsx(Nm,{className:"w-3 h-3"})},{id:"top",label:"Top-Down",icon:w.jsx(ig,{className:"w-3 h-3"})},{id:"cutaway",label:"Cutaway",icon:w.jsx(Yx,{className:"w-3 h-3"})}].map(A=>w.jsxs("button",{onClick:()=>m(A.id),className:`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer ${p===A.id?"bg-sky-500/25 text-sky-200":"text-slate-400 hover:text-slate-200"}`,children:[A.icon,w.jsx("span",{children:A.label})]},A.id))})]}),w.jsx("div",{ref:h,className:"w-full h-full"})]})},CT=()=>{const{mission:s,report:e,lastOptimization:t,highlightZones:r,runAutoOptimize:o,revertOptimization:l,dismissOptimization:u}=Qi(),d=e.score,h=34,p=2*Math.PI*h,m=p-d/100*p,v=d>=85?"#10b981":d>=60?"#f59e0b":"#f43f5e",x=Math.max(1,e.grossVolumeM3),y=Math.min(100,e.structureVolumeM3/x*100),E=Math.min(100-y,e.equipmentVolumeM3/x*100),M=Math.min(100-y-E,e.deadSpaceM3/x*100),S=Math.max(0,100-y-E-M);return w.jsxs("aside",{className:"w-80 xl:w-88 shrink-0 bg-[#0D1320] border-l border-slate-800/90 flex flex-col h-full overflow-hidden",children:[w.jsxs("div",{className:"p-3.5 border-b border-slate-800/80 bg-[#111827]/70 space-y-3",children:[w.jsxs("div",{className:"flex items-center gap-3.5",children:[w.jsxs("div",{className:"relative w-20 h-20 shrink-0 flex items-center justify-center",children:[w.jsxs("svg",{className:"w-20 h-20 -rotate-90",viewBox:"0 0 84 84",children:[w.jsx("circle",{cx:"42",cy:"42",r:h,fill:"none",stroke:"#1e293b",strokeWidth:"7"}),w.jsx("circle",{cx:"42",cy:"42",r:h,fill:"none",stroke:v,strokeWidth:"7",strokeLinecap:"round",strokeDasharray:p,strokeDashoffset:m,className:"transition-all duration-300"})]}),w.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center",children:[w.jsx("span",{className:"text-lg font-bold font-mono-telemetry text-slate-100 leading-none",children:d}),w.jsx("span",{className:"text-[9px] uppercase tracking-wider text-slate-400 mt-0.5",children:"SCORE"})]})]}),w.jsxs("div",{className:"flex-1 min-w-0",children:[w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsx("span",{className:"text-xs font-bold uppercase tracking-wider text-slate-200",children:"Mission Readiness"}),w.jsxs("span",{className:"text-[10px] font-mono-telemetry text-slate-500",children:[e.computeTimeMs,"ms"]})]}),w.jsxs("div",{className:"flex items-center gap-1.5 mt-1.5 flex-wrap",children:[w.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[10px] font-mono-telemetry font-semibold",children:[e.criticalCount," CRIT"]}),w.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 text-[10px] font-mono-telemetry font-semibold",children:[e.warningCount," WARN"]}),w.jsxs("span",{className:"inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-mono-telemetry font-semibold",children:[e.passCount," PASS"]})]}),w.jsxs("div",{className:"text-[10px] text-slate-400 mt-1.5",children:[s.crewSize," Crew • ",s.durationDays,"d • ",s.gravity]})]})]}),w.jsxs("button",{onClick:o,className:"w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-cyan-950/50 transition-all cursor-pointer",children:[w.jsx(l_,{className:"w-3.5 h-3.5"}),"Auto-Optimize Layout"]}),t&&w.jsxs("div",{className:"bg-emerald-500/10 border border-emerald-500/35 rounded-lg p-2.5 text-xs space-y-1.5",children:[w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsxs("span",{className:"font-semibold text-emerald-300 text-[11px]",children:["Optimization Complete (",t.iterations," iters)"]}),w.jsx("button",{onClick:u,className:"text-slate-400 hover:text-slate-200 cursor-pointer",children:w.jsx(h_,{className:"w-3.5 h-3.5"})})]}),w.jsxs("div",{className:"flex items-center justify-between font-mono-telemetry text-[11px]",children:[w.jsxs("span",{className:"text-slate-300",children:["Score: ",t.beforeScore," →"," ",w.jsx("strong",{className:"text-emerald-300",children:t.afterScore})," (",t.afterScore>=t.beforeScore?"+":"",t.afterScore-t.beforeScore,")"]}),w.jsxs("span",{className:"text-slate-300",children:["Crit: ",t.beforeCritical," → ",t.afterCritical]})]}),w.jsxs("button",{onClick:l,className:"inline-flex items-center gap-1 text-[11px] text-cyan-300 hover:text-cyan-200 font-medium cursor-pointer",children:[w.jsx(n_,{className:"w-3 h-3"}),"Undo / Revert Layout"]})]})]}),w.jsxs("div",{className:"flex-1 overflow-y-auto p-3.5 space-y-4",children:[w.jsxs("div",{className:"bg-[#111827] border border-slate-800 rounded-lg p-3 space-y-2",children:[w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsx("span",{className:"text-[11px] font-semibold uppercase tracking-wider text-slate-300",children:"NHV Breakdown"}),w.jsxs("span",{className:`text-xs font-bold font-mono-telemetry ${e.nhvPerCrewM3>=e.requiredNhvPerCrewM3?"text-emerald-400":"text-rose-400"}`,children:[e.nhvPerCrewM3," / ",e.requiredNhvPerCrewM3," m³/crew"]})]}),w.jsxs("div",{className:"w-full h-3 rounded-full bg-slate-900 overflow-hidden flex border border-slate-800",children:[w.jsx("div",{style:{width:`${S}%`},className:"bg-cyan-500 h-full",title:`NHV: ${e.nhvM3} m³`}),w.jsx("div",{style:{width:`${E}%`},className:"bg-violet-500 h-full",title:`Equipment: ${e.equipmentVolumeM3} m³`}),w.jsx("div",{style:{width:`${y}%`},className:"bg-slate-500 h-full",title:`Structure: ${e.structureVolumeM3} m³`}),w.jsx("div",{style:{width:`${M}%`},className:"bg-slate-700 h-full",title:`Dead Space: ${e.deadSpaceM3} m³`})]}),w.jsxs("div",{className:"grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] font-mono-telemetry text-slate-400 pt-0.5",children:[w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsxs("span",{className:"flex items-center gap-1",children:[w.jsx("span",{className:"w-2 h-2 rounded-full bg-cyan-500"}),"Net Habitable"]}),w.jsxs("span",{className:"text-slate-200",children:[e.nhvM3," m³"]})]}),w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsxs("span",{className:"flex items-center gap-1",children:[w.jsx("span",{className:"w-2 h-2 rounded-full bg-violet-500"}),"Equipment"]}),w.jsxs("span",{className:"text-slate-200",children:[e.equipmentVolumeM3," m³"]})]}),w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsxs("span",{className:"flex items-center gap-1",children:[w.jsx("span",{className:"w-2 h-2 rounded-full bg-slate-500"}),"Structure"]}),w.jsxs("span",{className:"text-slate-200",children:[e.structureVolumeM3," m³"]})]}),w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsxs("span",{className:"flex items-center gap-1",children:[w.jsx("span",{className:"w-2 h-2 rounded-full bg-slate-700"}),"Dead Space"]}),w.jsxs("span",{className:"text-slate-200",children:[e.deadSpaceM3," m³"]})]})]})]}),w.jsxs("div",{className:"bg-[#111827] border border-slate-800 rounded-lg p-3 space-y-2",children:[w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsxs("span",{className:"text-[11px] font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5",children:[w.jsx(rg,{className:"w-3.5 h-3.5 text-emerald-400"}),"A* Egress Solver"]}),w.jsx("span",{className:`px-1.5 py-0.5 rounded text-[10px] font-mono-telemetry font-bold ${e.egress.overallReachable?"bg-emerald-500/15 text-emerald-300":"bg-rose-500/15 text-rose-300"}`,children:e.egress.overallReachable?"PASS":"BLOCKED"})]}),w.jsxs("div",{className:"grid grid-cols-3 gap-2 pt-0.5",children:[w.jsxs("div",{className:"bg-[#090D16] rounded p-1.5 border border-slate-800/80",children:[w.jsx("div",{className:"text-[9px] uppercase text-slate-400",children:"Worst Dist"}),w.jsx("div",{className:"text-xs font-bold font-mono-telemetry text-slate-100",children:e.egress.overallReachable?`${e.egress.worstCaseDistanceM.toFixed(1)}m`:"N/A"})]}),w.jsxs("div",{className:"bg-[#090D16] rounded p-1.5 border border-slate-800/80",children:[w.jsx("div",{className:"text-[9px] uppercase text-slate-400",children:"Transit"}),w.jsx("div",{className:"text-xs font-bold font-mono-telemetry text-slate-100",children:e.egress.overallReachable?`${e.egress.worstCaseTimeSec}s`:"N/A"})]}),w.jsxs("div",{className:"bg-[#090D16] rounded p-1.5 border border-slate-800/80",children:[w.jsx("div",{className:"text-[9px] uppercase text-slate-400",children:"Pinch Pts"}),w.jsx("div",{className:`text-xs font-bold font-mono-telemetry ${e.egress.bottleneckPoints.length>0?"text-amber-400":"text-emerald-400"}`,children:e.egress.bottleneckPoints.length})]})]})]}),w.jsxs("div",{className:"space-y-2",children:[w.jsxs("div",{className:"flex items-center justify-between",children:[w.jsx("span",{className:"text-[11px] font-semibold uppercase tracking-wider text-slate-400",children:"NASA-STD-3001 Diagnostics"}),w.jsx("span",{className:"text-[10px] text-slate-500",children:"Click to highlight"})]}),w.jsx("div",{className:"space-y-2",children:e.violations.map(g=>{const C=g.severity==="CRITICAL",A=g.severity==="WARNING",T=C?"border-rose-500/40 bg-rose-950/20 hover:bg-rose-950/35":A?"border-amber-500/35 bg-amber-950/15 hover:bg-amber-950/30":"border-emerald-500/25 bg-emerald-950/10 hover:bg-emerald-950/20";return w.jsxs("button",{onClick:()=>r(g.affectedZoneIds),className:`w-full text-left rounded-lg border p-2.5 transition-colors cursor-pointer ${T}`,children:[w.jsxs("div",{className:"flex items-start justify-between gap-2",children:[w.jsxs("div",{className:"flex items-start gap-1.5 min-w-0",children:[C?w.jsx(J0,{className:"w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5"}):A?w.jsx(cc,{className:"w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5"}):w.jsx(eg,{className:"w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5"}),w.jsx("span",{className:"text-xs font-semibold text-slate-100 leading-snug",children:g.title})]}),w.jsx("span",{className:"shrink-0 text-[10px] font-mono-telemetry px-1.5 py-0.5 rounded bg-[#090D16]/80 text-slate-200 border border-slate-700/70",children:g.metric})]}),w.jsx("p",{className:"text-[11px] text-slate-300/90 mt-1 leading-relaxed",children:g.detail}),w.jsxs("div",{className:"flex items-center justify-between mt-1.5 text-[10px]",children:[w.jsx("span",{className:"font-mono-telemetry text-slate-500",children:g.ruleCode}),g.affectedZoneIds.length>0&&w.jsx("span",{className:"text-cyan-400 font-medium",children:"Focus Zones →"})]})]},g.id)})})]})]})]})},RT=()=>{const{snapshots:s,compareIds:e,setComparePair:t,saveSnapshot:r}=Qi(),[o,l]=Nt.useState("2d"),u=s.find(v=>v.id===e[0])??s[0],d=s.find(v=>v.id===e[1])??s[s.length-1],h=v=>v.report.acousticPairs.filter(x=>x.violates).length,p=v=>v.report.contaminationPairs.filter(x=>x.violates).length,m=[{label:"Mission Readiness Score",aVal:`${u.report.score} / 100`,bVal:`${d.report.score} / 100`,delta:d.report.score-u.report.score,unit:"pts",higherIsBetter:!0},{label:"Net Habitable Volume / Crew",aVal:`${u.report.nhvPerCrewM3} m³`,bVal:`${d.report.nhvPerCrewM3} m³`,delta:Number((d.report.nhvPerCrewM3-u.report.nhvPerCrewM3).toFixed(1)),unit:"m³",higherIsBetter:!0},{label:"Acoustic Violations (>50 dBA)",aVal:`${h(u)}`,bVal:`${h(d)}`,delta:h(d)-h(u),unit:"",higherIsBetter:!1},{label:"Contamination Violations (<3.0m)",aVal:`${p(u)}`,bVal:`${p(d)}`,delta:p(d)-p(u),unit:"",higherIsBetter:!1},{label:"Worst-Case A* Egress Distance",aVal:u.report.egress.overallReachable?`${u.report.egress.worstCaseDistanceM.toFixed(1)} m`:"BLOCKED",bVal:d.report.egress.overallReachable?`${d.report.egress.worstCaseDistanceM.toFixed(1)} m`:"BLOCKED",delta:u.report.egress.overallReachable&&d.report.egress.overallReachable?Number((d.report.egress.worstCaseDistanceM-u.report.egress.worstCaseDistanceM).toFixed(1)):0,unit:"m",higherIsBetter:!1},{label:"Estimated Pressurized Mass",aVal:`${u.report.estimatedMassKg.toLocaleString()} kg`,bVal:`${d.report.estimatedMassKg.toLocaleString()} kg`,delta:d.report.estimatedMassKg-u.report.estimatedMassKg,unit:"kg",higherIsBetter:!1},{label:"Estimated Launch Cost",aVal:`$${u.report.estimatedLaunchCostM}M`,bVal:`$${d.report.estimatedLaunchCostM}M`,delta:Number((d.report.estimatedLaunchCostM-u.report.estimatedLaunchCostM).toFixed(1)),unit:"M",higherIsBetter:!1}];return w.jsxs("div",{className:"flex-1 flex flex-col h-full overflow-hidden bg-[#090D16]",children:[w.jsxs("div",{className:"px-4 py-2.5 bg-[#0D1320] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3",children:[w.jsxs("div",{className:"flex items-center gap-2",children:[w.jsx(tg,{className:"w-4 h-4 text-cyan-400"}),w.jsx("h2",{className:"text-xs font-bold uppercase tracking-wider text-slate-100",children:"Side-by-Side Layout Comparison"})]}),w.jsxs("div",{className:"flex items-center gap-3 flex-wrap",children:[w.jsxs("div",{className:"flex items-center gap-1.5 text-xs",children:[w.jsx("span",{className:"text-slate-400 font-mono-telemetry",children:"A:"}),w.jsx("select",{"aria-label":"Layout A Snapshot",value:u.id,onChange:v=>t(v.target.value,d.id),className:"bg-[#111827] border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 outline-none focus:border-cyan-500",children:s.map(v=>w.jsxs("option",{value:v.id,children:[v.name," (Score ",v.report.score,")"]},v.id))})]}),w.jsx("span",{className:"text-slate-500 text-xs font-bold",children:"VS"}),w.jsxs("div",{className:"flex items-center gap-1.5 text-xs",children:[w.jsx("span",{className:"text-slate-400 font-mono-telemetry",children:"B:"}),w.jsx("select",{"aria-label":"Layout B Snapshot",value:d.id,onChange:v=>t(u.id,v.target.value),className:"bg-[#111827] border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 outline-none focus:border-cyan-500",children:s.map(v=>w.jsxs("option",{value:v.id,children:[v.name," (Score ",v.report.score,")"]},v.id))})]}),w.jsxs("div",{className:"flex items-center bg-[#111827] border border-slate-700 rounded p-0.5 text-[11px]",children:[w.jsx("button",{onClick:()=>l("2d"),className:`px-2 py-0.5 rounded cursor-pointer ${o==="2d"?"bg-cyan-500/20 text-cyan-300":"text-slate-400"}`,children:"2D CAD"}),w.jsx("button",{onClick:()=>l("3d"),className:`px-2 py-0.5 rounded cursor-pointer ${o==="3d"?"bg-cyan-500/20 text-cyan-300":"text-slate-400"}`,children:"3D WebGL"})]}),w.jsxs("button",{onClick:()=>r(),className:"flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-medium cursor-pointer",children:[w.jsx(Q0,{className:"w-3.5 h-3.5"}),"Snapshot Active Layout"]})]})]}),w.jsxs("div",{className:"flex-1 flex flex-col overflow-y-auto p-4 gap-4",children:[w.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[340px]",children:[{tag:"LAYOUT A",snap:u,accent:"border-slate-700"},{tag:"LAYOUT B",snap:d,accent:"border-cyan-500/50"}].map(({tag:v,snap:x,accent:y})=>w.jsxs("div",{className:`bg-[#0D1320] border ${y} rounded-xl overflow-hidden flex flex-col`,children:[w.jsxs("div",{className:"px-3 py-2 bg-[#111827] border-b border-slate-800 flex items-center justify-between",children:[w.jsxs("div",{children:[w.jsx("span",{className:"text-[10px] font-mono-telemetry text-cyan-400 uppercase tracking-wider",children:v}),w.jsx("div",{className:"text-xs font-semibold text-slate-100",children:x.name})]}),w.jsxs("div",{className:"flex items-center gap-2 font-mono-telemetry text-xs",children:[w.jsxs("span",{className:"text-slate-400",children:[x.mission.crewSize," Crew • ",x.mission.hull.diameter,"×",x.mission.hull.length,"m"]}),w.jsxs("span",{className:`px-2 py-0.5 rounded font-bold ${x.report.score>=85?"bg-emerald-500/15 text-emerald-300":x.report.score>=60?"bg-amber-500/15 text-amber-300":"bg-rose-500/15 text-rose-300"}`,children:[x.report.score,"/100"]})]})]}),w.jsx("div",{className:"h-[290px] w-full",children:o==="2d"?w.jsx(lg,{missionOverride:x.mission,zonesOverride:x.zones,reportOverride:x.report,deckOverride:0,readonly:!0,compact:!0}):w.jsx($g,{missionOverride:x.mission,zonesOverride:x.zones,reportOverride:x.report,readonly:!0})})]},v))}),w.jsxs("div",{className:"bg-[#0D1320] border border-slate-800 rounded-xl overflow-hidden",children:[w.jsx("div",{className:"px-4 py-2.5 bg-[#111827] border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-200",children:"Engineering Trade-Study Delta Matrix (B vs A)"}),w.jsx("div",{className:"overflow-x-auto",children:w.jsxs("table",{className:"w-full text-left border-collapse",children:[w.jsx("thead",{children:w.jsxs("tr",{className:"border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 bg-[#090D16]/60",children:[w.jsx("th",{className:"py-2.5 px-4",children:"Metric"}),w.jsxs("th",{className:"py-2.5 px-4 font-mono-telemetry",children:["Layout A (",u.name,")"]}),w.jsxs("th",{className:"py-2.5 px-4 font-mono-telemetry",children:["Layout B (",d.name,")"]}),w.jsx("th",{className:"py-2.5 px-4 font-mono-telemetry",children:"Delta (B − A)"})]})}),w.jsx("tbody",{className:"divide-y divide-slate-800/70 text-xs",children:m.map(v=>{const x=v.delta===0?null:v.higherIsBetter?v.delta>0:v.delta<0,y=x===null?"text-slate-400":x?"text-emerald-400":"text-rose-400";return w.jsxs("tr",{className:"hover:bg-slate-800/30",children:[w.jsx("td",{className:"py-2.5 px-4 font-medium text-slate-200",children:v.label}),w.jsx("td",{className:"py-2.5 px-4 font-mono-telemetry text-slate-300",children:v.aVal}),w.jsx("td",{className:"py-2.5 px-4 font-mono-telemetry text-slate-100 font-semibold",children:v.bVal}),w.jsx("td",{className:`py-2.5 px-4 font-mono-telemetry font-bold ${y}`,children:w.jsxs("span",{className:"inline-flex items-center gap-1",children:[v.delta>0?w.jsx(Gx,{className:"w-3.5 h-3.5"}):v.delta<0?w.jsx(Vx,{className:"w-3.5 h-3.5"}):w.jsx(Zx,{className:"w-3.5 h-3.5"}),v.delta>0?"+":"",v.delta,v.unit?` ${v.unit}`:""]})})]},v.label)})})]})})]})]})]})},q0=({title:s,unit:e,series:t,minLog:r,maxLog:o,color:l,thresholds:u})=>{const y=S=>{const g=Math.log10(Math.max(Math.pow(10,r),S));return 120-Math.max(0,Math.min(1,(g-r)/(o-r)))*106},E=t.map((S,g)=>{const C=42+g/Math.max(1,t.length-1)*384,A=y(S.value);return`${C.toFixed(1)},${A.toFixed(1)}`}),M=E.length>1?`M ${E[0]} L ${E.join(" L ")} L ${426 .toFixed(1)},120 L 42,120 Z`:"";return w.jsxs("div",{className:"bg-[#111827] border border-slate-800 rounded-xl p-3.5",children:[w.jsxs("div",{className:"flex items-center justify-between mb-2",children:[w.jsx("span",{className:"text-xs font-semibold text-slate-200",children:s}),w.jsx("span",{className:"text-[10px] font-mono-telemetry text-slate-400",children:e})]}),w.jsxs("svg",{viewBox:"0 0 440 140",className:"w-full h-36 overflow-visible",children:[u.map(S=>{const g=y(Math.pow(10,S.logVal));return w.jsxs("g",{children:[w.jsx("line",{x1:42,y1:g,x2:426,y2:g,stroke:S.color,strokeWidth:"1",strokeDasharray:"4 4",strokeOpacity:"0.45"}),w.jsx("text",{x:36,y:g+3,textAnchor:"end",fill:S.color,fontSize:"9",className:"font-mono-telemetry",children:S.label})]},S.label)}),M&&w.jsx("path",{d:M,fill:l,fillOpacity:"0.14"}),E.length>1&&w.jsx("polyline",{points:E.join(" "),fill:"none",stroke:l,strokeWidth:"2.2",strokeLinejoin:"round"}),t.length>0&&w.jsx("circle",{cx:426,cy:y(t[t.length-1].value),r:"4",fill:l,stroke:"#090D16",strokeWidth:"1.5"}),w.jsx("text",{x:42,y:136,fill:"#64748b",fontSize:"9",className:"font-mono-telemetry",children:"T-24h"}),w.jsx("text",{x:426,y:136,textAnchor:"end",fill:"#64748b",fontSize:"9",className:"font-mono-telemetry",children:"NOW (UTC)"})]})]})},PT=()=>{const{mission:s,weather:e,weatherLoading:t,stormStress:r,fetchLiveWeather:o,selectWeatherPreset:l}=Qi(),u=e.source==="LIVE_NOAA_GOES",d=r.verdict==="PASS"?"border-emerald-500/50 bg-emerald-950/25 text-emerald-300":r.verdict==="MARGINAL"?"border-amber-500/50 bg-amber-950/25 text-amber-300":"border-rose-500/50 bg-rose-950/25 text-rose-300";return w.jsxs("div",{className:"flex-1 flex flex-col h-full overflow-y-auto bg-[#090D16] p-5 space-y-5",children:[w.jsxs("div",{className:"bg-[#0D1320] border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4",children:[w.jsxs("div",{className:"space-y-1",children:[w.jsxs("div",{className:"flex items-center gap-2.5",children:[w.jsx(ng,{className:"w-5 h-5 text-amber-400"}),w.jsx("h2",{className:"text-sm font-bold uppercase tracking-wider text-slate-100",children:"NOAA GOES Solar-Flare Storm-Shelter Stress Test"}),w.jsxs("span",{className:`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono-telemetry font-bold border ${u?"bg-emerald-500/15 text-emerald-300 border-emerald-500/40":"bg-amber-500/15 text-amber-300 border-amber-500/40"}`,children:[w.jsx(Qx,{className:"w-3 h-3"}),u?"LIVE NOAA GOES":"SIMULATED PRESET"]})]}),w.jsxs("p",{className:"text-xs text-slate-400",children:["Active Telemetry: ",w.jsx("span",{className:"text-slate-200 font-medium",children:e.label})," • Updated ",new Date(e.fetchedAt).toLocaleTimeString()]})]}),w.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[w.jsxs("button",{onClick:()=>o(),disabled:t,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-medium cursor-pointer disabled:opacity-50",children:[w.jsx(e_,{className:`w-3.5 h-3.5 ${t?"animate-spin":""}`}),t?"Fetching NOAA...":"Fetch Live GOES"]}),w.jsx("div",{className:"h-5 w-px bg-slate-800 mx-1"}),[{id:"quiet_b",label:"Quiet Sun (B-Class)"},{id:"moderate_m5",label:"R3 / S2 Storm (M5)"},{id:"extreme_x10",label:"X10 Extreme SPE"}].map(h=>w.jsx("button",{onClick:()=>l(h.id),className:`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${e.presetId===h.id?h.id==="extreme_x10"?"bg-rose-500/20 text-rose-200 border-rose-500/50":h.id==="moderate_m5"?"bg-amber-500/20 text-amber-200 border-amber-500/50":"bg-emerald-500/20 text-emerald-200 border-emerald-500/50":"bg-[#111827] text-slate-300 border-slate-700/80 hover:bg-slate-800"}`,children:h.label},h.id))]})]}),w.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3.5",children:[w.jsxs("div",{className:"bg-[#0D1320] border border-slate-800 rounded-xl p-3.5",children:[w.jsx("div",{className:"text-[10px] uppercase tracking-wider text-slate-400",children:"GOES X-Ray Flux (0.1–0.8 nm)"}),w.jsx("div",{className:"text-xl font-bold font-mono-telemetry text-amber-300 mt-1",children:e.xrayClass}),w.jsxs("div",{className:"text-[11px] font-mono-telemetry text-slate-400 mt-0.5",children:[e.xrayFluxWm2.toExponential(2)," W/m² • ",e.noaaRScale]})]}),w.jsxs("div",{className:"bg-[#0D1320] border border-slate-800 rounded-xl p-3.5",children:[w.jsx("div",{className:"text-[10px] uppercase tracking-wider text-slate-400",children:"Integral Protons (≥10 MeV)"}),w.jsxs("div",{className:"text-xl font-bold font-mono-telemetry text-rose-300 mt-1",children:[e.protonFluxPfu.toLocaleString()," pfu"]}),w.jsx("div",{className:"text-[11px] font-mono-telemetry text-slate-400 mt-0.5",children:e.noaaSScale})]}),w.jsxs("div",{className:"bg-[#0D1320] border border-slate-800 rounded-xl p-3.5",children:[w.jsx("div",{className:"text-[10px] uppercase tracking-wider text-slate-400",children:"Proton Warning Window"}),w.jsxs("div",{className:"text-xl font-bold font-mono-telemetry text-cyan-300 mt-1",children:[e.warningWindowSec," s"]}),w.jsxs("div",{className:"text-[11px] text-slate-400 mt-0.5",children:["A* Worst Transit:"," ",w.jsx("span",{className:"font-mono-telemetry text-slate-200",children:r.allCrewReachable?`${r.worstTransitSec}s`:"BLOCKED"})]})]}),w.jsxs("div",{className:"bg-[#0D1320] border border-slate-800 rounded-xl p-3.5",children:[w.jsx("div",{className:"text-[10px] uppercase tracking-wider text-slate-400",children:"Projected Shielded Dose"}),w.jsxs("div",{className:`text-xl font-bold font-mono-telemetry mt-1 ${r.shieldedDoseMsv<=r.acuteLimitMsv?"text-emerald-300":"text-rose-400"}`,children:[r.shieldedDoseMsv," mSv"]}),w.jsxs("div",{className:"text-[11px] font-mono-telemetry text-slate-400 mt-0.5",children:["Unshielded: ",r.unshieldedDoseMsv," mSv • Limit ",r.acuteLimitMsv," mSv"]})]})]}),w.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:[w.jsx(q0,{title:"GOES-16/18 Primary X-Ray Flux (24h)",unit:"W/m² (log10)",series:e.xraySeries,minLog:-8,maxLog:-2.5,color:"#f59e0b",thresholds:[{logVal:-7,label:"B",color:"#64748b"},{logVal:-6,label:"C",color:"#38bdf8"},{logVal:-5,label:"M",color:"#f59e0b"},{logVal:-4,label:"X",color:"#f43f5e"}]}),w.jsx(q0,{title:"GOES Integral Proton Flux ≥10 MeV (24h)",unit:"pfu (log10)",series:e.protonSeries,minLog:-1,maxLog:5,color:"#f43f5e",thresholds:[{logVal:1,label:"S1",color:"#38bdf8"},{logVal:2,label:"S2",color:"#f59e0b"},{logVal:3,label:"S3",color:"#fb923c"},{logVal:4,label:"S4",color:"#f43f5e"}]})]}),w.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-4",children:[w.jsxs("div",{className:`rounded-xl border p-5 flex flex-col justify-between ${d}`,children:[w.jsxs("div",{children:[w.jsxs("div",{className:"flex items-center gap-2 text-xs font-mono-telemetry uppercase tracking-wider opacity-85",children:[r.verdict==="PASS"?w.jsx(o_,{className:"w-5 h-5"}):w.jsx(s_,{className:"w-5 h-5"}),"Crew Survivability Verdict"]}),w.jsx("div",{className:"text-3xl font-black font-mono-telemetry mt-2",children:r.verdict}),w.jsxs("p",{className:"text-xs opacity-90 mt-2 leading-relaxed",children:["Evaluating ",w.jsx("strong",{children:s.name})," (",s.crewSize," crew) under"," ",w.jsx("strong",{children:e.label})," solar particle flux."]})]}),w.jsxs("div",{className:"mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-mono-telemetry",children:[w.jsxs("div",{children:[w.jsx("div",{className:"opacity-70 text-[10px]",children:"SHELTER VOL/CREW"}),w.jsxs("div",{className:"font-bold",children:[r.shelterVolumePerCrewM3," m³/crew"]})]}),w.jsxs("div",{children:[w.jsx("div",{className:"opacity-70 text-[10px]",children:"SHIELDING MASS"}),w.jsxs("div",{className:"font-bold",children:[r.shieldingArealDensityGcm2," g/cm²"]})]})]})]}),w.jsxs("div",{className:"lg:col-span-2 bg-[#0D1320] border border-slate-800 rounded-xl p-4 space-y-3",children:[w.jsxs("div",{className:"flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-200",children:[w.jsx(Hx,{className:"w-4 h-4 text-cyan-400"}),"Storm-Shelter Engineering Verification Checklist"]}),w.jsx("div",{className:"space-y-2.5",children:r.diagnostics.map((h,p)=>w.jsxs("div",{className:"flex items-start gap-2.5 p-3 rounded-lg bg-[#111827] border border-slate-800",children:[h.severity==="CRITICAL"?w.jsx(J0,{className:"w-4 h-4 text-rose-400 shrink-0 mt-0.5"}):h.severity==="WARNING"?w.jsx(cc,{className:"w-4 h-4 text-amber-400 shrink-0 mt-0.5"}):w.jsx(eg,{className:"w-4 h-4 text-emerald-400 shrink-0 mt-0.5"}),w.jsxs("div",{children:[w.jsx("div",{className:"text-xs font-semibold text-slate-100",children:h.title}),w.jsx("div",{className:"text-[11px] text-slate-400 mt-0.5 leading-relaxed",children:h.detail})]})]},p))})]})]})]})},NT=()=>{const{activeView:s,fetchLiveWeather:e}=Qi(),[t,r]=Nt.useState("split");return Nt.useEffect(()=>{e()},[e]),Nt.useEffect(()=>{const o=l=>{const u=l.target;if(u&&(u.tagName==="INPUT"||u.tagName==="TEXTAREA"||u.tagName==="SELECT"))return;const d=Qi.getState();(l.ctrlKey||l.metaKey)&&l.key.toLowerCase()==="z"?(l.preventDefault(),l.shiftKey?d.redo():d.undo()):(l.ctrlKey||l.metaKey)&&l.key.toLowerCase()==="y"?(l.preventDefault(),d.redo()):l.key.toLowerCase()==="r"&&d.selectedZoneId?(l.preventDefault(),d.rotateZone(d.selectedZoneId)):(l.key==="Delete"||l.key==="Backspace")&&d.selectedZoneId&&d.activeView==="studio"&&(l.preventDefault(),d.deleteZone(d.selectedZoneId))};return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[]),w.jsxs("div",{className:"h-screen w-screen flex flex-col bg-[#090D16] text-slate-100 overflow-hidden",children:[w.jsx(B_,{}),s==="studio"&&w.jsxs("div",{className:"flex-1 flex min-h-0 overflow-hidden",children:[w.jsx(H_,{}),w.jsxs("main",{className:"flex-1 flex flex-col min-w-0 min-h-0 relative bg-[#090D16]",children:[w.jsxs("div",{className:"h-8 shrink-0 bg-[#0D1320]/90 border-b border-slate-800/80 px-3 flex items-center justify-between text-[11px]",children:[w.jsx("span",{className:"text-slate-400 font-mono-telemetry",children:"SYNCHRONIZED VIEWPORT • DRAG / RESIZE / PRESS [R] TO ROTATE"}),w.jsx("div",{className:"flex items-center bg-[#090D16] border border-slate-800 rounded p-0.5 gap-0.5",children:[{id:"split",label:"Split 2D + 3D"},{id:"2d",label:"2D Only"},{id:"3d",label:"3D Only"}].map(o=>w.jsx("button",{onClick:()=>r(o.id),className:`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${t===o.id?"bg-cyan-500/20 text-cyan-300":"text-slate-400 hover:text-slate-200"}`,children:o.label},o.id))})]}),w.jsxs("div",{className:"flex-1 flex flex-col min-h-0",children:[t!=="3d"&&w.jsx("div",{className:`${t==="split"?"h-[54%] border-b border-slate-800":"h-full"} w-full min-h-0`,children:w.jsx(lg,{})}),t!=="2d"&&w.jsx("div",{className:`${t==="split"?"h-[46%]":"h-full"} w-full min-h-0`,children:w.jsx($g,{})})]})]}),w.jsx(CT,{})]}),s==="compare"&&w.jsx(RT,{}),s==="weather"&&w.jsx(PT,{})]})};Ox.createRoot(document.getElementById("root")).render(w.jsx(Yl.StrictMode,{children:w.jsx(NT,{})}));
