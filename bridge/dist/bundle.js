!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=n(r(1)),i=n(r(2));e.getBlogPostList=function(){var t=Array.from(document.querySelectorAll(".forFlow .postTitle,.postCon,.postDesc")),e=a(t);return localStorage.setItem("app-posts",JSON.stringify(e)),e},e.getBlogTitle=function(){var t=document.querySelector("#Header1_HeaderTitle");return localStorage.setItem("app-blog-title",t.innerText),t.innerText},e.getSubTitle=function(){var t=o.default("#blogTitle h2")[0].innerText;return localStorage.setItem("app-subtitle",t),t},e.getBlogStats=function(){var t=Array.from(document.querySelectorAll("#blog_stats span")).map(function(t){return t.innerText.split(" ")[2]}).map(function(t){return parseInt(t,10)}),e={postCnt:t[0],articleCnt:t[1],commentCnt:t[2]};return localStorage.setItem("app-stats",JSON.stringify(e)),e};var u=function(t){var e=/\d+/.exec(t);return null!==e?parseInt(e[0],10):0},a=function(t){for(var e=[],r=0;r<t.length;r+=3){var n=t[r],o=n.innerText,i=n.querySelector("a").href,a=t[r+1],c=a.innerText.substr(0,a.innerText.length-4),s=t[r+2].innerText.split(" "),l=new Date(s[2]+" "+s[3]),p=s[4],f={title:o,url:i,description:c,postTime:l,readCnt:u(s[5]),commentCnt:u(s[6]),author:p};e.push(f)}return e},c=function(t){var e=/：(.+)$/,r=t.innerText.split("\n").map(function(t){var r=e.exec(t);return r?r[1]:""});return{name:r[0],age:r[1],fansCnt:parseInt(r[2],10),followingCnt:parseInt(r[2],10)}},s=function(t){var e=/^\d+\. (.+)$/;return o.default("a",t).toArray().map(function(t){return{title:e.exec(t.innerText)[1],url:t.href}})},l=function(t){var e=/^(.+?)(\((\d+)\))?$/;return o.default("li",t).toArray().map(function(t){var r=e.exec(t.innerText);return{title:r[1].trim(),cnt:parseInt(r[3]||"0",10),url:t.querySelector("a").href}})},p=function(t){var e=/^(?:\d+\. )(.+?)(?:\((\d+)\))?$/;return o.default("li",t).toArray().map(function(t){var r=t.innerText,n=e.exec(r);return{title:n[1],cnt:parseInt(n[2],10),url:t.querySelector("a").href}})},f=function(t){return i.default(o.default("li",t),3).map(function(t){var e=t[0],r=/^\d+\. (.+)$/.exec(e.innerText)[1],n=e.querySelector("a").href,o=t[1].innerText,i=t[2];return{post:{title:r,url:n},content:o,user:i.innerText.substr(2,i.innerText.length-2)}})},g=function(){function t(){var t=e.getBlogPostList(),r=e.getBlogStats(),n=e.getBlogTitle(),o=e.getSubTitle();this.data={posts:t,stats:r,title:n,subTitle:o}}return t.prototype.getDataAsync=function(t,e,r){var n=localStorage.getItem(t);return n?Promise.resolve(JSON.parse(n)):function(t){return new Promise(function(e,r){var n,i=0,u=50,a=function(){clearInterval(n);var c=o.default(t);c&&c.children().length>0?e(c[0]):i>10?r("Timeout"):(i++,u+=50,n=setInterval(a,u))};n=setInterval(a,u)})}(e).then(function(e){var n=r(e);return localStorage.setItem(t,JSON.stringify(n)),n}).catch(function(){return null})},t.prototype.getUserProfile=function(){return this.getDataAsync("app-profile","#profile_block",c)},t.prototype.getRecentPosts=function(){return this.getDataAsync("app-recent-posts",".catListEssay ul",s)},t.prototype.getTags=function(){return this.getDataAsync("app-tags",".catListTag ul",l)},t.prototype.getPostCategories=function(){return this.getDataAsync("app-post-categories","#sidebar_postcategory ul",l)},t.prototype.getPostArchives=function(){return this.getDataAsync("app-post-archives","#sidebar_postarchive ul",l)},t.prototype.getArticleCategories=function(){return this.getDataAsync("app-article-categories","#sidebar_articlecategory ul",l)},t.prototype.getArticleArchives=function(){return this.getDataAsync("app-article-archives","#sidebar_articlearchive ul",l)},t.prototype.getImageCategories=function(){return this.getDataAsync("app-image-categories","#sidebar_imagecategory ul",l)},t.prototype.getRecentComments=function(){return this.getDataAsync("app-recent-comments","#RecentCommentsBlock ul",f)},t.prototype.getTopViewedPosts=function(){return this.getDataAsync("app-top-viewed-posts","#TopViewPostsBlock ul",p)},t.prototype.getTopCommentPosts=function(){return this.getDataAsync("app-top-comment-posts","#TopFeedbackPostsBlock ul",p)},t.prototype.getTopDiggPosts=function(){return this.getDataAsync("app-top-digg-posts","#TopDiggPostsBlock ul",p)},t}();e.CnblogsBridge=g,window.CnblogsBridge=g},function(t,e){t.exports=jQuery},function(t,e){var r=1/0,n=9007199254740991,o=1.7976931348623157e308,i=NaN,u="[object Function]",a="[object GeneratorFunction]",c="[object Symbol]",s=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,f=/^0o[0-7]+$/i,g=/^(?:0|[1-9]\d*)$/,y=parseInt,v=Object.prototype.toString,d=Math.ceil,m=Math.max;function b(t,e,r){var n=-1,o=t.length;e<0&&(e=-e>o?0:o+e),(r=r>o?o:r)<0&&(r+=o),o=e>r?0:r-e>>>0,e>>>=0;for(var i=Array(o);++n<o;)i[n]=t[n+e];return i}function h(t,e,r){if(!T(r))return!1;var o=typeof e;return!!("number"==o?function(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=n}(t.length)&&!function(t){var e=T(t)?v.call(t):"";return e==u||e==a}(t)}(r)&&function(t,e){return!!(e=null==e?n:e)&&("number"==typeof t||g.test(t))&&t>-1&&t%1==0&&t<e}(e,r.length):"string"==o&&e in r)&&function(t,e){return t===e||t!=t&&e!=e}(r[e],t)}function T(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}t.exports=function(t,e,n){e=(n?h(t,e,n):void 0===e)?1:m(function(t){var e=function(t){if(!t)return 0===t?t:0;if((t=function(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&v.call(t)==c}(t))return i;if(T(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=T(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(s,"");var r=p.test(t);return r||f.test(t)?y(t.slice(2),r?2:8):l.test(t)?i:+t}(t))===r||t===-r){var e=t<0?-1:1;return e*o}return t==t?t:0}(t),n=e%1;return e==e?n?e-n:e:0}(e),0);var u=t?t.length:0;if(!u||e<1)return[];for(var a=0,g=0,x=Array(d(u/e));a<u;)x[g++]=b(t,a,a+=e);return x}}]);