"use strict";
console.log("WORKER: executing.");
var version="v2::",
offlineFundamentals=["./","./index.html","./project.zip","./favicon.ico","./manifest.json"];
self.addEventListener("install", function(e){
    console.log("WORKER: install event in progress."),
    e.waitUntil(caches.open(version+"fundamentals").then(function(e){
        return e.addAll(offlineFundamentals)}).then(function(){
            console.log("WORKER: install completed")}
        ))
    }),self.addEventListener("fetch",function(e){
        console.log("WORKER: fetch event in progress."),
        "GET"===e.request.method?e.respondWith(caches.match(e.request).then(function(s){
            var a=fetch(e.request).then(function(s){
                var a=s.clone();
                return console.log("WORKER: fetch response from network.",e.request.url),caches.open(version+"pages").then(function(s){
                    s.put(e.request,a)}).then(function(){
                        console.log("WORKER: fetch response stored in cache.",e.request.url)}),s},t).catch(t);
                        return console.log("WORKER: fetch event",s?"(cached)":"(network)",e.request.url),s||a;
                        function t(){return console.log("WORKER: fetch request failed in both cache and network."),
                        new Response('<html><body><h3>No tienes conexión, el juego no está disponible :(</h3></body></html>',{status:503,statusText:"Service Unavailable",headers:new Headers({"Content-Type":"text/html"})})}})):console.log("WORKER: fetch event ignored.",e.request.method,e.request.url)}),self.addEventListener("activate",function(e){console.log("WORKER: activate event in progress."),e.waitUntil(caches.keys().then(function(e){return Promise.all(e.filter(function(e){return!e.startsWith(version)}).map(function(e){return caches.delete(e)}))}).then(function(){console.log("WORKER: activate completed.")}))})