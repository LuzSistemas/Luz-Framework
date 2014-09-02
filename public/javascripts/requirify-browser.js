!function e(r,o,t){function n(a,s){if(!o[a]){if(!r[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);throw new Error("Cannot find module '"+a+"'")}var d=o[a]={exports:{}};r[a][0].call(d.exports,function(e){var o=r[a][1][e];return n(o?o:e)},d,d.exports,e,r,o,t)}return o[a].exports}for(var i="function"==typeof require&&require,a=0;a<t.length;a++)n(t[a]);return n}({1:[function(e,r){function o(e,r){if("function"!=typeof r)throw new Error("Bad callback given: "+r);if(!e)throw new Error("No options given");var a=e.onResponse;if(e="string"==typeof e?{uri:e}:JSON.parse(JSON.stringify(e)),e.onResponse=a,e.verbose&&(o.log=i()),e.url&&(e.uri=e.url,delete e.url),!e.uri&&""!==e.uri)throw new Error("options.uri is a required argument");if("string"!=typeof e.uri)throw new Error("options.uri must be a string");for(var s=["proxy","_redirectsFollowed","maxRedirects","followRedirect"],d=0;d<s.length;d++)if(e[s[d]])throw new Error("options."+s[d]+" is not supported");if(e.callback=r,e.method=e.method||"GET",e.headers=e.headers||{},e.body=e.body||null,e.timeout=e.timeout||o.DEFAULT_TIMEOUT,e.headers.host)throw new Error("Options.headers.host is not supported");e.json&&(e.headers.accept=e.headers.accept||"application/json","GET"!==e.method&&(e.headers["content-type"]="application/json"),"boolean"!=typeof e.json?e.body=JSON.stringify(e.json):"string"!=typeof e.body&&(e.body=JSON.stringify(e.body)));var c=function(e){var r=[];for(var o in e)e.hasOwnProperty(o)&&r.push(encodeURIComponent(o)+"="+encodeURIComponent(e[o]));return r.join("&")};if(e.qs){var f="string"==typeof e.qs?e.qs:c(e.qs);e.uri=-1!==e.uri.indexOf("?")?e.uri+"&"+f:e.uri+"?"+f}var p=function(e){var r={};r.boundry="-------------------------------"+Math.floor(1e9*Math.random());var o=[];for(var t in e)e.hasOwnProperty(t)&&o.push("--"+r.boundry+'\nContent-Disposition: form-data; name="'+t+'"\n\n'+e[t]+"\n");return o.push("--"+r.boundry+"--"),r.body=o.join(""),r.length=r.body.length,r.type="multipart/form-data; boundary="+r.boundry,r};if(e.form){if("string"==typeof e.form)throw"form name unsupported";if("POST"===e.method){var l=(e.encoding||"application/x-www-form-urlencoded").toLowerCase();switch(e.headers["content-type"]=l,l){case"application/x-www-form-urlencoded":e.body=c(e.form).replace(/%20/g,"+");break;case"multipart/form-data":var h=p(e.form);e.body=h.body,e.headers["content-type"]=h.type;break;default:throw new Error("unsupported encoding:"+l)}}}return e.onResponse=e.onResponse||n,e.onResponse===!0&&(e.onResponse=r,e.callback=n),!e.headers.authorization&&e.auth&&(e.headers.authorization="Basic "+u(e.auth.username+":"+e.auth.password)),t(e)}function t(e){function r(){c=!0;var r=new Error("ETIMEDOUT");return r.code="ETIMEDOUT",r.duration=e.timeout,o.log.error("Timeout",{id:u._id,milliseconds:e.timeout}),e.callback(r,u)}function t(){if(c)return o.log.debug("Ignoring timed out state change",{state:u.readyState,id:u.id});if(o.log.debug("State change",{state:u.readyState,id:u.id,timed_out:c}),u.readyState===d.OPENED){o.log.debug("Request started",{id:u.id});for(var r in e.headers)u.setRequestHeader(r,e.headers[r])}else u.readyState===d.HEADERS_RECEIVED?n():u.readyState===d.LOADING?(n(),i()):u.readyState===d.DONE&&(n(),i(),a())}function n(){if(!g.response){if(g.response=!0,o.log.debug("Got response",{id:u.id,status:u.status}),clearTimeout(u.timeoutTimer),u.statusCode=u.status,p&&0==u.statusCode){var r=new Error("CORS request rejected: "+e.uri);return r.cors="rejected",g.loading=!0,g.end=!0,e.callback(r,u)}e.onResponse(null,u)}}function i(){g.loading||(g.loading=!0,o.log.debug("Response body loading",{id:u.id}))}function a(){if(!g.end){if(g.end=!0,o.log.debug("Request done",{id:u.id}),u.body=u.responseText,e.json)try{u.body=JSON.parse(u.responseText)}catch(r){return e.callback(r,u)}e.callback(null,u,u.body)}}var u=new d,c=!1,p=s(e.uri),l="withCredentials"in u;if(f+=1,u.seq_id=f,u.id=f+": "+e.method+" "+e.uri,u._id=u.id,p&&!l){var h=new Error("Browser does not support cross-origin request: "+e.uri);return h.cors="unsupported",e.callback(h,u)}u.timeoutTimer=setTimeout(r,e.timeout);var g={response:!1,loading:!1,end:!1};return u.onreadystatechange=t,u.open(e.method,e.uri,!0),p&&(u.withCredentials=!!e.withCredentials),u.send(e.body),u}function n(){}function i(){var e,r,o={},t=["trace","debug","info","warn","error"];for(r=0;r<t.length;r++)e=t[r],o[e]=n,"undefined"!=typeof console&&console&&console[e]&&(o[e]=a(console,e));return o}function a(e,r){function o(o,t){return"object"==typeof t&&(o+=" "+JSON.stringify(t)),e[r].call(e,o)}return o}function s(e){var r,o=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;try{r=location.href}catch(t){r=document.createElement("a"),r.href="",r=r.href}var n=o.exec(r.toLowerCase())||[],i=o.exec(e.toLowerCase()),a=!(!i||i[1]==n[1]&&i[2]==n[2]&&(i[3]||("http:"===i[1]?80:443))==(n[3]||("http:"===n[1]?80:443)));return a}function u(e){var r,o,t,n,i,a,s,u,d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c=0,f=0,p="",l=[];if(!e)return e;do r=e.charCodeAt(c++),o=e.charCodeAt(c++),t=e.charCodeAt(c++),u=r<<16|o<<8|t,n=u>>18&63,i=u>>12&63,a=u>>6&63,s=63&u,l[f++]=d.charAt(n)+d.charAt(i)+d.charAt(a)+d.charAt(s);while(c<e.length);switch(p=l.join(""),e.length%3){case 1:p=p.slice(0,-2)+"==";break;case 2:p=p.slice(0,-1)+"="}return p}var d=XMLHttpRequest;if(!d)throw new Error("missing XMLHttpRequest");o.log={trace:n,debug:n,info:n,warn:n,error:n};var c=18e4,f=0;o.withCredentials=!1,o.DEFAULT_TIMEOUT=c,o.defaults=function(e){var r=function(r){var o=function(o,t){o="string"==typeof o?{uri:o}:JSON.parse(JSON.stringify(o));for(var n in e)void 0===o[n]&&(o[n]=e[n]);return r(o,t)};return o},t=r(o);return t.get=r(o.get),t.post=r(o.post),t.put=r(o.put),t.head=r(o.head),t};var p=["get","put","post","head"];p.forEach(function(e){var r=e.toUpperCase(),t=e.toLowerCase();o[t]=function(e){"string"==typeof e?e={method:r,uri:e}:(e=JSON.parse(JSON.stringify(e)),e.method=r);var t=[e].concat(Array.prototype.slice.apply(arguments,[1]));return o.apply(this,t)}}),o.couch=function(e,r){function t(e,o,t){if(e)return r(e,o,t);if((o.statusCode<200||o.statusCode>299)&&t.error){e=new Error("CouchDB error: "+(t.error.reason||t.error.error));for(var n in t)e[n]=t[n];return r(e,o,t)}return r(e,o,t)}"string"==typeof e&&(e={uri:e}),e.json=!0,e.body&&(e.json=e.body),delete e.body,r=r||n;var i=o(e,t);return i},r.exports=o},{}],2:[function(require,module,exports){var getThisName=function(e){var r=["top","window"];for(var o in window)if(console.log(o),r.indexOf(o)<0&&window[o]===e)return o},request=require("browser-request");window.require=function(name,moduleName){moduleName||(moduleName=name),console.log("Fetching "+moduleName+"... just one second"),request("https://evening-chamber-1845.herokuapp.com/"+name+"/"+moduleName,function(er,res,body){var r=eval(body);console.log("Finished getting "+moduleName)})}},{"browser-request":1}]},{},[2]);