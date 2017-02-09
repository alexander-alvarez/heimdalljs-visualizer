"use strict";define("heimdalljs-visualizer/app",["exports","ember","heimdalljs-visualizer/resolver","ember-load-initializers","heimdalljs-visualizer/config/environment"],function(e,t,l,n,a){var r=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,r=t.default.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:l.default}),(0,n.default)(r,a.default.modulePrefix),e.default=r}),define("heimdalljs-visualizer/components/basic-tree",["exports","ember","d3-selection","d3-hierarchy","d3-zoom"],function(e,t,l,n,a){var r=t.default.run,s=t.default.get,i=t.default.inject,o=500;e.default=t.default.Component.extend({classNames:["basic-tree"],graph:i.service(),init:function(){this._super.apply(this,arguments),this._graphData=null},didReceiveAttrs:function(){var e=s(this,"graphData");this._lastGraphData!==e&&e&&(r.schedule("render",this,this.drawTree,e),this._lastGraphData=e)},nodeFilter:function(e){return e.label.broccoliNode},drawTree:function(e){function t(e){m(d);var l=d.descendants(),n=d.links(),a=c.selectAll(".node").data(l,function(e){return e.data.id}),r=a.enter().append("g").attr("class","node").attr("transform",function(e){return"translate("+e.y+","+e.x+")"}).on("click",function(e){e.children?(e._children=e.children,e.children=null):(e.children=e._children,e._children=null),t(e)});r.append("text").attr("dy","0.0em").style("text-anchor",function(e){return e.children?"end":"start"}).text(function(e){return e.data.label.name+" ("+e.data._id+")"}),r.append("text").attr("dy","1.1em").style("text-anchor",function(e){return e.children?"end":"start"}).text(function(e){return"total: "+(e.value/1e6).toFixed(2)}),r.append("text").attr("dy","2.1em").style("text-anchor",function(e){return e.children?"end":"start"}).text(function(e){return"self: "+(e.data._stats.time.self/1e6).toFixed(2)}),a.transition().duration(o).attr("transform",function(e){return"translate("+e.y+","+e.x+")"}),a.exit().transition().duration(o).attr("transform",function(){return"translate("+e.x+","+e.y+")"}).remove();var s=c.selectAll(".link").data(n,function(e){return e.target.data.id});s.enter().append("path").attr("class","link").attr("d",function(e){return"M"+e.target.y+","+e.target.x+"C"+(e.source.y+50)+","+e.target.x+" "+(e.source.y+50)+","+e.source.x+" "+e.source.y+","+e.source.x}),s.transition().duration(o).attr("d",function(e){return"M"+e.target.y+","+e.target.x+"C"+(e.source.y+50)+","+e.target.x+" "+(e.source.y+50)+","+e.source.x+" "+e.source.y+","+e.source.x}),s.exit().transition().duration(o/2).attr("transform",function(){return"translate("+e.x+","+e.y+")"}).remove()}function r(){return a.zoomIdentity.translate(48,120).scale(.1)}var s=this,i=this.element.querySelector(".svg-container");i.innerHTML="";var u=(0,l.select)(i).append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","0 0 300 300").classed("svg-content",!0),c=u.append("g"),d=(0,n.hierarchy)(e,function(e){var t=[],l=!0,n=!1,a=void 0;try{for(var r,i=e.adjacentIterator()[Symbol.iterator]();!(l=(r=i.next()).done);l=!0){var o=r.value;s.nodeFilter&&!s.nodeFilter(o)||t.push(o)}}catch(e){n=!0,a=e}finally{try{!l&&i.return&&i.return()}finally{if(n)throw a}}return t}).sum(function(e){return e._stats.time.self});self.root=d;var m=(0,n.cluster)().separation(function(e,t){return e.parent==t.parent?4:8}).nodeSize([8,180]);t(d);var p=(0,a.zoom)().on("zoom",function(){c.attr("transform",l.event.transform)});u.call(p.transform,r()),u.call(p)}})}),define("heimdalljs-visualizer/components/fa-icon",["exports","ember-font-awesome/components/fa-icon"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("heimdalljs-visualizer/components/fa-list",["exports","ember-font-awesome/components/fa-list"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("heimdalljs-visualizer/components/fa-stack",["exports","ember-font-awesome/components/fa-stack"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("heimdalljs-visualizer/components/slow-node-times",["exports","ember"],function(e,t){function l(e){var t=!0,l=!1,n=void 0;try{for(var r,s=e.statsIterator()[Symbol.iterator]();!(t=(r=s.next()).done);t=!0){var i=a(r.value,2),o=i[0],u=i[1];if("time.self"===o)return u}}catch(e){l=!0,n=e}finally{try{!t&&s.return&&s.return()}finally{if(l)throw n}}}function n(e){var t=0,n=!0,a=!1,r=void 0;try{for(var s,i=e.dfsIterator(function(e){return e.label.broccoliNode})[Symbol.iterator]();!(n=(s=i.next()).done);n=!0){var o=s.value;t+=l(o)}}catch(e){a=!0,r=e}finally{try{!n&&i.return&&i.return()}finally{if(a)throw r}}return t}var a=function(){function e(e,t){var l=[],n=!0,a=!1,r=void 0;try{for(var s,i=e[Symbol.iterator]();!(n=(s=i.next()).done)&&(l.push(s.value),!t||l.length!==t);n=!0);}catch(e){a=!0,r=e}finally{try{!n&&i.return&&i.return()}finally{if(a)throw r}}return l}return function(t,l){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,l);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),r=t.default.get,s=t.default.set,i=t.default.computed,o=t.default.inject;e.default=t.default.Component.extend({graph:o.service(),sortDescending:!0,nodes:i("data","filter","pluginNameFilter","groupByPluginName",function(){var e=this.get("data");if(!e)return[];var t=[],l=!0,a=!1,r=void 0;try{for(var s,i=e.dfsIterator()[Symbol.iterator]();!(l=(s=i.next()).done);l=!0){var o=s.value;o.label.broccoliNode&&(t.push(o),o._stats.time.plugin||(o._stats.time.plugin=n(o)))}}catch(e){a=!0,r=e}finally{try{!l&&i.return&&i.return()}finally{if(a)throw r}}var u=this.get("pluginNameFilter");u&&(t=t.filter(function(e){return!!e.label.broccoliNode&&e.label.broccoliPluginName===u}));var c=this.get("groupByPluginName");if(c){var d=t.reduce(function(e,t){var l=t.label.broccoliPluginName;return e[l]=e[l]||{count:0,time:0},e[l].time+=t._stats.time.plugin,e[l].count++,e},{});t=[];for(var m in d)t.push({groupedByPluginName:!0,label:{name:m,broccoliPluginName:d[m].count},_stats:{time:{plugin:d[m].time}}})}return t}),sortedNodes:i("nodes","sortDescending",function(){var e=this;return this.get("nodes").sort(function(t,l){return e.get("sortDescending")?l._stats.time.plugin-t._stats.time.plugin:t._stats.time.plugin-l._stats.time.plugin})}),totalTime:i("nodes",function(){var e=this.get("nodes");return e.reduce(function(e,t){return e+t._stats.time.plugin},0)}),actions:{"focus-node":function(e){this.get("graph").selectNode(e)},toggleDetailsForNode:function(e){if(e.groupedByPluginName)this.set("groupByPluginName",!1),this.set("pluginNameFilter",e.label.name);else{var t=r(e,"showDetails");s(e,"showDetails",!t)}},toggleTime:function(){this.toggleProperty("sortDescending")}}})}),define("heimdalljs-visualizer/components/welcome-page",["exports","ember-welcome-page/components/welcome-page"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("heimdalljs-visualizer/controllers/application",["exports","ember","ember-network/fetch"],function(e,t,l){var n=t.default.inject;e.default=t.default.Controller.extend({graph:n.service(),actions:{parseFile:function(e){var t=this,l=new FileReader;l.onload=function(e){var l=e.target.result;t.get("graph").setGraph(JSON.parse(l)),t.set("showUploadModal",!1)},l.readAsText(e.target.files[0])},useSample:function(e){var t=this;(0,l.default)(e).then(function(e){return e.json()}).then(function(e){t.get("graph").setGraph(e),t.set("showUploadModal",!1)})},clearData:function(){this.get("graph").clearGraph()}}})}),define("heimdalljs-visualizer/controllers/graph",["exports","ember"],function(e,t){var l=t.default.Controller,n=t.default.getOwner,a=t.default.computed,r=t.default.inject;e.default=l.extend({graph:r.service(),route:a.alias("router.currentPath"),init:function(){this.set("router",n(this).lookup("router:main"))}})}),define("heimdalljs-visualizer/controllers/graph/index",["exports","ember"],function(e,t){var l=t.default.inject;e.default=t.default.Controller.extend({graph:l.service()})}),define("heimdalljs-visualizer/controllers/graph/node",["exports","ember"],function(e,t){var l=t.default.inject;e.default=t.default.Controller.extend({graph:l.service()})}),define("heimdalljs-visualizer/controllers/selected-node",["exports","ember"],function(e,t){var l=t.default.inject;e.default=t.default.Controller.extend({graph:l.service()})}),define("heimdalljs-visualizer/controllers/slow-nodes",["exports","ember"],function(e,t){var l=t.default.inject;e.default=t.default.Controller.extend({graph:l.service(),actions:{parseFile:function(e){var t=this,l=new FileReader;l.onload=function(e){var l=e.target.result;t.get("graph").setGraph(JSON.parse(l))},l.readAsText(e.target.files[0])}}})}),define("heimdalljs-visualizer/helpers/and",["exports","ember","ember-truth-helpers/helpers/and"],function(e,t,l){var n=null;t.default.Helper?n=t.default.Helper.helper(l.andHelper):t.default.HTMLBars.makeBoundHelper&&(n=t.default.HTMLBars.makeBoundHelper(l.andHelper)),e.default=n}),define("heimdalljs-visualizer/helpers/app-version",["exports","ember","heimdalljs-visualizer/config/environment"],function(e,t,l){function n(){return a}e.appVersion=n;var a=l.default.APP.version;e.default=t.default.Helper.helper(n)}),define("heimdalljs-visualizer/helpers/eq",["exports","ember","ember-truth-helpers/helpers/equal"],function(e,t,l){var n=null;t.default.Helper?n=t.default.Helper.helper(l.equalHelper):t.default.HTMLBars.makeBoundHelper&&(n=t.default.HTMLBars.makeBoundHelper(l.equalHelper)),e.default=n}),define("heimdalljs-visualizer/helpers/gt",["exports","ember","ember-truth-helpers/helpers/gt"],function(e,t,l){var n=null;t.default.Helper?n=t.default.Helper.helper(l.gtHelper):t.default.HTMLBars.makeBoundHelper&&(n=t.default.HTMLBars.makeBoundHelper(l.gtHelper)),e.default=n}),define("heimdalljs-visualizer/helpers/gte",["exports","ember","ember-truth-helpers/helpers/gte"],function(e,t,l){var n=null;t.default.Helper?n=t.default.Helper.helper(l.gteHelper):t.default.HTMLBars.makeBoundHelper&&(n=t.default.HTMLBars.makeBoundHelper(l.gteHelper)),e.default=n}),define("heimdalljs-visualizer/helpers/includes",["exports","ember"],function(e,t){var l=function(){function e(e,t){var l=[],n=!0,a=!1,r=void 0;try{for(var s,i=e[Symbol.iterator]();!(n=(s=i.next()).done)&&(l.push(s.value),!t||l.length!==t);n=!0);}catch(e){a=!0,r=e}finally{try{!n&&i.return&&i.return()}finally{if(a)throw r}}return l}return function(t,l){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,l);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.default=t.default.Helper.helper(function(e){var t=l(e,2),n=t[0],a=t[1];return n&&n.includes&&n.includes(a)})}),define("heimdalljs-visualizer/helpers/is-array",["exports","ember","ember-truth-helpers/helpers/is-array"],function(e,t,l){var n=null;t.default.Helper?n=t.default.Helper.helper(l.isArrayHelper):t.default.HTMLBars.makeBoundHelper&&(n=t.default.HTMLBars.makeBoundHelper(l.isArrayHelper)),e.default=n}),define("heimdalljs-visualizer/helpers/lt",["exports","ember","ember-truth-helpers/helpers/lt"],function(e,t,l){var n=null;t.default.Helper?n=t.default.Helper.helper(l.ltHelper):t.default.HTMLBars.makeBoundHelper&&(n=t.default.HTMLBars.makeBoundHelper(l.ltHelper)),e.default=n}),define("heimdalljs-visualizer/helpers/lte",["exports","ember","ember-truth-helpers/helpers/lte"],function(e,t,l){var n=null;t.default.Helper?n=t.default.Helper.helper(l.lteHelper):t.default.HTMLBars.makeBoundHelper&&(n=t.default.HTMLBars.makeBoundHelper(l.lteHelper)),e.default=n}),define("heimdalljs-visualizer/helpers/not-eq",["exports","ember","ember-truth-helpers/helpers/not-equal"],function(e,t,l){var n=null;t.default.Helper?n=t.default.Helper.helper(l.notEqualHelper):t.default.HTMLBars.makeBoundHelper&&(n=t.default.HTMLBars.makeBoundHelper(l.notEqualHelper)),e.default=n}),define("heimdalljs-visualizer/helpers/not",["exports","ember","ember-truth-helpers/helpers/not"],function(e,t,l){var n=null;t.default.Helper?n=t.default.Helper.helper(l.notHelper):t.default.HTMLBars.makeBoundHelper&&(n=t.default.HTMLBars.makeBoundHelper(l.notHelper)),e.default=n}),define("heimdalljs-visualizer/helpers/ns-to-ms",["exports","ember"],function(e,t){function l(e){var t=n(e,1),l=t[0];return(l/1e6).toFixed(2)}var n=function(){function e(e,t){var l=[],n=!0,a=!1,r=void 0;try{for(var s,i=e[Symbol.iterator]();!(n=(s=i.next()).done)&&(l.push(s.value),!t||l.length!==t);n=!0);}catch(e){a=!0,r=e}finally{try{!n&&i.return&&i.return()}finally{if(a)throw r}}return l}return function(t,l){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,l);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.nsToMs=l,e.default=t.default.Helper.helper(l)}),define("heimdalljs-visualizer/helpers/or",["exports","ember","ember-truth-helpers/helpers/or"],function(e,t,l){var n=null;t.default.Helper?n=t.default.Helper.helper(l.orHelper):t.default.HTMLBars.makeBoundHelper&&(n=t.default.HTMLBars.makeBoundHelper(l.orHelper)),e.default=n}),define("heimdalljs-visualizer/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){e.default=t.default}),define("heimdalljs-visualizer/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){e.default=t.default}),define("heimdalljs-visualizer/helpers/stats-iterator",["exports","ember"],function(e,t){var l=function(){function e(e,t){var l=[],n=!0,a=!1,r=void 0;try{for(var s,i=e[Symbol.iterator]();!(n=(s=i.next()).done)&&(l.push(s.value),!t||l.length!==t);n=!0);}catch(e){a=!0,r=e}finally{try{!n&&i.return&&i.return()}finally{if(a)throw r}}return l}return function(t,l){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,l);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.default=t.default.Helper.helper(function(e){var t=l(e,1),n=t[0],a={},r=!0,s=!1,i=void 0;try{for(var o,u=n.statsIterator()[Symbol.iterator]();!(r=(o=u.next()).done);r=!0){var c=l(o.value,2),d=c[0],m=c[1];a[d]=m}}catch(e){s=!0,i=e}finally{try{!r&&u.return&&u.return()}finally{if(s)throw i}}return a})}),define("heimdalljs-visualizer/helpers/xor",["exports","ember","ember-truth-helpers/helpers/xor"],function(e,t,l){var n=null;t.default.Helper?n=t.default.Helper.helper(l.xorHelper):t.default.HTMLBars.makeBoundHelper&&(n=t.default.HTMLBars.makeBoundHelper(l.xorHelper)),e.default=n}),define("heimdalljs-visualizer/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","heimdalljs-visualizer/config/environment"],function(e,t,l){var n=l.default.APP,a=n.name,r=n.version;e.default={name:"App Version",initialize:(0,t.default)(a,r)}}),define("heimdalljs-visualizer/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("heimdalljs-visualizer/initializers/data-adapter",["exports","ember"],function(e,t){e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("heimdalljs-visualizer/initializers/ember-data",["exports","ember-data/setup-container","ember-data/-private/core"],function(e,t,l){e.default={name:"ember-data",initialize:t.default}}),define("heimdalljs-visualizer/initializers/export-application-global",["exports","ember","heimdalljs-visualizer/config/environment"],function(e,t,l){function n(){var e=arguments[1]||arguments[0];if(l.default.exportApplicationGlobal!==!1){var n;if("undefined"!=typeof window)n=window;else if("undefined"!=typeof global)n=global;else{if("undefined"==typeof self)return;n=self}var a,r=l.default.exportApplicationGlobal;a="string"==typeof r?r:t.default.String.classify(l.default.modulePrefix),n[a]||(n[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[a]}}))}}e.initialize=n,e.default={name:"export-application-global",initialize:n}}),define("heimdalljs-visualizer/initializers/injectStore",["exports","ember"],function(e,t){e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("heimdalljs-visualizer/initializers/store",["exports","ember"],function(e,t){e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("heimdalljs-visualizer/initializers/transforms",["exports","ember"],function(e,t){e.default={name:"transforms",before:"store",initialize:function(){}}}),define("heimdalljs-visualizer/initializers/truth-helpers",["exports","ember","ember-truth-helpers/utils/register-helper","ember-truth-helpers/helpers/and","ember-truth-helpers/helpers/or","ember-truth-helpers/helpers/equal","ember-truth-helpers/helpers/not","ember-truth-helpers/helpers/is-array","ember-truth-helpers/helpers/not-equal","ember-truth-helpers/helpers/gt","ember-truth-helpers/helpers/gte","ember-truth-helpers/helpers/lt","ember-truth-helpers/helpers/lte"],function(e,t,l,n,a,r,s,i,o,u,c,d,m){function p(){t.default.Helper||((0,l.registerHelper)("and",n.andHelper),(0,l.registerHelper)("or",a.orHelper),(0,l.registerHelper)("eq",r.equalHelper),(0,l.registerHelper)("not",s.notHelper),(0,l.registerHelper)("is-array",i.isArrayHelper),(0,l.registerHelper)("not-eq",o.notEqualHelper),(0,l.registerHelper)("gt",u.gtHelper),(0,l.registerHelper)("gte",c.gteHelper),(0,l.registerHelper)("lt",d.ltHelper),(0,l.registerHelper)("lte",m.lteHelper))}e.initialize=p,e.default={name:"truth-helpers",initialize:p}}),define("heimdalljs-visualizer/instance-initializers/ember-data",["exports","ember-data/-private/instance-initializers/initialize-store-service"],function(e,t){e.default={name:"ember-data",initialize:t.default}}),define("heimdalljs-visualizer/resolver",["exports","ember-resolver"],function(e,t){e.default=t.default}),define("heimdalljs-visualizer/router",["exports","ember","heimdalljs-visualizer/config/environment"],function(e,t,l){var n=t.default.Router.extend({location:l.default.locationType,rootURL:l.default.rootURL});n.map(function(){this.route("graph",{path:"/"},function(){this.route("node")}),this.route("slow-nodes")}),e.default=n}),define("heimdalljs-visualizer/services/graph",["exports","ember","heimdalljs-visualizer/config/environment","heimdalljs-graph"],function(e,t,l,n){var a=t.default.getOwner,r=l.default.storageVersion+"_graph-data",s=l.default.storageVersion+"_selected-node-id";e.default=t.default.Service.extend({init:function(){this._super.apply(this,arguments);var e=sessionStorage.getItem(r);e&&this.setGraph(JSON.parse(e));var t=sessionStorage.getItem(s);if(t&&e){var l=this.get("graph"),n=!0,a=!1,i=void 0;try{for(var o,u=l.dfsIterator()[Symbol.iterator]();!(n=(o=u.next()).done);n=!0){var c=o.value;if(c.id===t){this.set("selectedNode",c);break}}}catch(e){a=!0,i=e}finally{try{!n&&u.return&&u.return()}finally{if(a)throw i}}}},setGraph:function(e){var t=n.default.loadFromJSON(e);try{sessionStorage.setItem(r,JSON.stringify(e))}catch(e){}this.set("data",e),this.set("graph",t)},clearGraph:function(){this.set("data",null),this.set("graph",null),sessionStorage.removeItem(r),sessionStorage.removeItem(s)},selectNode:function(e){sessionStorage.setItem(s,e.id),this.set("selectedNode",e),a(this).lookup("router:main").transitionTo("graph.node")}})}),define("heimdalljs-visualizer/templates/application",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"czWFBOD1",block:'{"statements":[["open-element","section",[]],["static-attr","class","global-nav hero is-light"],["flush-element"],["text","\\n  "],["open-element","nav",[]],["static-attr","class","nav"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","nav-left"],["flush-element"],["text","\\n      "],["block",["link-to"],["graph"],[["class","activeClass"],["nav-item is-tab","is-active"]],5],["text","\\n      "],["block",["link-to"],["slow-nodes"],[["class","activeClass"],["nav-item is-tab","is-active"]],4],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","nav-center"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","nav-item title"],["flush-element"],["text","\\n        Heimdall Visualizer\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","nav-right"],["flush-element"],["text","\\n"],["block",["if"],[["helper",["not"],[["get",["graph","data"]]],null]],null,3,2],["text","\\n      "],["open-element","a",[]],["static-attr","class","nav-item"],["static-attr","href","https://github.com/rwjblue/heimdalljs-visualizer"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","icon"],["flush-element"],["text","\\n          "],["open-element","i",[]],["static-attr","class","fa fa-github"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["modal ",["helper",["if"],[["get",["showUploadModal"]],"is-active"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","modal-background"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","modal-content"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","box"],["flush-element"],["text","\\n    "],["open-element","form",[]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","control is-grouped"],["flush-element"],["text","\\n        "],["open-element","label",[]],["static-attr","class","label"],["flush-element"],["text","Upload the output of "],["open-element","code",[]],["flush-element"],["text","BROCCOLI_VIZ=1 ember build"],["close-element"],["text",":"],["close-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","control"],["flush-element"],["text","\\n          "],["open-element","input",[]],["static-attr","name","file-upload"],["static-attr","type","file"],["dynamic-attr","onchange",["helper",["action"],[["get",[null]],"parseFile"],null],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","control is-grouped"],["flush-element"],["text","\\n        "],["open-element","label",[]],["static-attr","class","label"],["flush-element"],["text","Sample File:"],["close-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","control"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","select is-small"],["flush-element"],["text","\\n            "],["open-element","select",[]],["dynamic-attr","onchange",["helper",["action"],[["get",[null]],"useSample"],[["value"],["target.value"]]],null],["flush-element"],["text","\\n              "],["open-element","option",[]],["static-attr","selected",""],["static-attr","disabled",""],["flush-element"],["text","Choose sample file"],["close-element"],["text","\\n              "],["open-element","option",[]],["static-attr","value","./broccoli-viz-files/initial-build-canary-ember-cli-20170206.json"],["flush-element"],["text","Empty Project - 2017-02-06"],["close-element"],["text","\\n              "],["open-element","option",[]],["static-attr","value","./broccoli-viz-files/ghost-initial-build-canary-ember-cli-20170206.json"],["flush-element"],["text","Ghost Admin Client - 2017-02-06"],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","button",[]],["static-attr","class","modal-close"],["modifier",["action"],[["get",[null]],["helper",["action"],[["get",[null]],["helper",["mut"],[["get",["showUploadModal"]]],null],false],null]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["graph","data"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","section",[]],["static-attr","class","upload-data-banner hero is-fullheight is-light"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hero-body"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","container has-text-centered"],["flush-element"],["text","\\n        "],["open-element","a",[]],["static-attr","href","#"],["modifier",["action"],[["get",[null]],["helper",["action"],[["get",[null]],["helper",["mut"],[["get",["showUploadModal"]]],null],true],null]]],["flush-element"],["text","\\n          "],["open-element","h1",[]],["static-attr","class","title"],["flush-element"],["text","\\n            "],["open-element","i",[]],["static-attr","class","fa fa-exclamation-triangle"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","h2",[]],["static-attr","class","subtitle"],["flush-element"],["text","\\n            Please upload data.\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["unknown",["outlet"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","a",[]],["static-attr","href","#"],["static-attr","class","nav-item"],["modifier",["action"],[["get",[null]],"clearData"]],["flush-element"],["text","\\n          Clear Data\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","a",[]],["static-attr","href","#"],["static-attr","class","nav-item"],["modifier",["action"],[["get",[null]],["helper",["action"],[["get",[null]],["helper",["mut"],[["get",["showUploadModal"]]],null],true],null]]],["flush-element"],["text","\\n          Upload Data\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","Nodes"]],"locals":[]},{"statements":[["text","Graph"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"heimdalljs-visualizer/templates/application.hbs"}})}),define("heimdalljs-visualizer/templates/components/basic-tree",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"44pJ8rtq",block:'{"statements":[["open-element","div",[]],["static-attr","class","svg-container"],["flush-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"heimdalljs-visualizer/templates/components/basic-tree.hbs"}})}),define("heimdalljs-visualizer/templates/components/slow-node-times",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"IBIilZU5",block:'{"statements":[["open-element","div",[]],["static-attr","class","nodes-controls level is-marginless"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","level-left"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","level-item"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","control has-addons"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["class","value","placeholder"],["input",["get",["pluginNameFilter"]],"Filter by plugin name..."]]],false],["text","\\n\\n        "],["open-element","button",[]],["dynamic-attr","class",["concat",["button is-primary ",["helper",["if"],[["helper",["not"],[["get",["pluginNameFilter"]]],null],"is-disabled"],null]]]],["modifier",["action"],[["get",[null]],["helper",["action"],[["get",[null]],["helper",["mut"],[["get",["pluginNameFilter"]]],null],""],null]]],["flush-element"],["text","Clear"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","level-item"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","control"],["flush-element"],["text","\\n        "],["open-element","label",[]],["static-attr","class","checkbox"],["flush-element"],["text","\\n          "],["append",["helper",["input"],null,[["type","checked"],["checkbox",["get",["groupByPluginName"]]]]],false],["text","\\n          Group by Plugin Name\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","table",[]],["static-attr","class","nodes-table table is-striped"],["flush-element"],["text","\\n  "],["open-element","thead",[]],["static-attr","class","nodes-table_header"],["flush-element"],["text","\\n    "],["open-element","tr",[]],["flush-element"],["text","\\n      "],["open-element","td",[]],["static-attr","style","width: 65%"],["flush-element"],["text","Description"],["close-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["append",["helper",["if"],[["get",["groupByPluginName"]],"Count","Plugin Name"],null],false],["close-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["text","\\n        "],["open-element","a",[]],["static-attr","href","#"],["static-attr","class","nodes-table_toggle"],["modifier",["action"],[["get",[null]],"toggleTime"]],["flush-element"],["text","Time (ms) "],["open-element","i",[]],["dynamic-attr","class",["concat",["fa fa-caret-",["helper",["if"],[["get",["sortDescending"]],"down","up"],null]]]],["flush-element"],["close-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","tbody",[]],["flush-element"],["text","\\n"],["block",["each"],[["get",["sortedNodes"]]],null,4],["text","  "],["close-element"],["text","\\n  "],["open-element","tfoot",[]],["flush-element"],["text","\\n    "],["open-element","tr",[]],["flush-element"],["text","\\n      "],["open-element","td",[]],["static-attr","colspan","2"],["static-attr","class","has-text-right"],["flush-element"],["text","Total"],["close-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["append",["helper",["ns-to-ms"],[["get",["totalTime"]]],null],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                      "],["append",["get",["value"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                      "],["append",["helper",["ns-to-ms"],[["get",["value"]]],null],false],["text","ms\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","div",[]],["flush-element"],["text","\\n                    "],["open-element","strong",[]],["flush-element"],["append",["get",["stat"]],false],["close-element"],["text",":\\n"],["block",["if"],[["helper",["includes"],[["get",["stat"]],"time"],null]],null,1,0],["text","                  "],["close-element"],["text","\\n"]],"locals":["stat","value"]},{"statements":[["text","        "],["open-element","tr",[]],["flush-element"],["text","\\n          "],["open-element","td",[]],["static-attr","colspan","3"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","card"],["flush-element"],["text","\\n              "],["open-element","header",[]],["static-attr","class","card-header"],["flush-element"],["text","\\n                "],["open-element","p",[]],["static-attr","class","card-header-title"],["flush-element"],["text","\\n                  Node Stats\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n\\n              "],["open-element","div",[]],["static-attr","class","card-content"],["flush-element"],["text","\\n"],["block",["each"],[["helper",["-each-in"],[["helper",["stats-iterator"],[["get",["node"]]],null]],null]],null,2],["text","              "],["close-element"],["text","\\n\\n              "],["open-element","div",[]],["static-attr","class","card-footer"],["flush-element"],["text","\\n                "],["open-element","a",[]],["static-attr","class","card-footer-item"],["modifier",["action"],[["get",[null]],"focus-node",["get",["node"]]]],["flush-element"],["text","Show Graph"],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","tr",[]],["static-attr","class","table-row"],["modifier",["action"],[["get",[null]],"toggleDetailsForNode",["get",["node"]]]],["flush-element"],["text","\\n        "],["open-element","td",[]],["flush-element"],["append",["unknown",["node","label","name"]],false],["close-element"],["text","\\n        "],["open-element","td",[]],["flush-element"],["append",["unknown",["node","label","broccoliPluginName"]],false],["close-element"],["text","\\n        "],["open-element","td",[]],["flush-element"],["append",["helper",["ns-to-ms"],[["get",["node","_stats","time","plugin"]]],null],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["node","showDetails"]]],null,3]],"locals":["node"]}],"hasPartials":false}',
meta:{moduleName:"heimdalljs-visualizer/templates/components/slow-node-times.hbs"}})}),define("heimdalljs-visualizer/templates/graph",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"AgmzpTHO",block:'{"statements":[["append",["unknown",["outlet"]],false],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","selected-node-controls hero-footer"],["flush-element"],["text","\\n  "],["open-element","nav",[]],["static-attr","class","tabs is-boxed is-fullwidth"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","container"],["flush-element"],["text","\\n      "],["open-element","ul",[]],["flush-element"],["text","\\n        "],["open-element","li",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["helper",["eq"],[["get",["route"]],"graph.index"],null],"is-active"],null]]]],["flush-element"],["text","\\n          "],["block",["link-to"],["graph.index"],null,1],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","li",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["helper",["eq"],[["get",["route"]],"graph.node"],null],"is-active"],null]]]],["flush-element"],["text","\\n"],["block",["link-to"],["graph.node"],null,0],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            Selected Node: "],["append",["helper",["if"],[["get",["graph","selectedNode"]],["get",["graph","selectedNode","label","name"]],"None"],null],false],["text","\\n"]],"locals":[]},{"statements":[["text","Full Graph"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"heimdalljs-visualizer/templates/graph.hbs"}})}),define("heimdalljs-visualizer/templates/graph/index",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"GiujADwe",block:'{"statements":[["append",["helper",["basic-tree"],null,[["graphData"],[["get",["graph","graph"]]]]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"heimdalljs-visualizer/templates/graph/index.hbs"}})}),define("heimdalljs-visualizer/templates/graph/node",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"3ubsG5Z3",block:'{"statements":[["block",["if"],[["get",["graph","selectedNode"]]],null,2,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","h1",[]],["static-attr","class","title"],["flush-element"],["text","\\n            "],["open-element","i",[]],["static-attr","class","fa fa-exclamation-triangle"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","h2",[]],["static-attr","class","subtitle"],["flush-element"],["text","\\n            Please select a node from the Nodes page.\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","section",[]],["static-attr","class","upload-data-banner hero is-fullheight is-light"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hero-body"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","container has-text-centered"],["flush-element"],["text","\\n"],["block",["link-to"],["slow-nodes"],null,0],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["helper",["basic-tree"],null,[["graphData","nodeFilter"],[["get",["graph","selectedNode"]],null]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"heimdalljs-visualizer/templates/graph/node.hbs"}})}),define("heimdalljs-visualizer/templates/slow-nodes",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"Unr94DD2",block:'{"statements":[["append",["helper",["slow-node-times"],null,[["data"],[["get",["graph","graph"]]]]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"heimdalljs-visualizer/templates/slow-nodes.hbs"}})}),define("heimdalljs-visualizer/config/environment",["ember"],function(e){var t="heimdalljs-visualizer";try{var l=t+"/config/environment",n=document.querySelector('meta[name="'+l+'"]').getAttribute("content"),a=JSON.parse(unescape(n)),r={default:a};return Object.defineProperty(r,"__esModule",{value:!0}),r}catch(e){throw new Error('Could not read config from meta tag with name "'+l+'".')}}),runningTests||require("heimdalljs-visualizer/app").default.create({name:"heimdalljs-visualizer",version:"0.5.0+f334dbc2"});