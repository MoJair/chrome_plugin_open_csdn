let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('默认背景色设置为 %cgreen', `color: ${color}`);
});
chrome.system.cpu.getInfo(function(info){
  console.log(info);
});
chrome.system.memory.getInfo(function(info){
  console.log(info);
});

chrome.system.storage.getInfo(function(info){
  console.log(info);
});
var set = new Set();
// set.add("小米");
// set.add("HUAWEI");
// var kyts = {"aa":"bbb","a":5436};
var initiator = "";
chrome.webRequest.onCompleted.addListener(function(details){
  let server = "";
  // if("" === initiator){
  //   initiator = details.initiator;
  // } else if(initiator != details.initiator){
  //   set.clear();
  // }
  console.log(initiator);
  console.log(details.initiator);
    for(let serc of details.responseHeaders){
      if(serc.name.toString().toLowerCase() === "server"){
        console.log("服务器："+serc.value);
        set.add(serc.value);
        console.log(set);
      }
    }
    for(let value of set.values()){
      console.log("set集合："+value);
      server = server.concat(value).concat(",");
    }
    console.log(server);
    server = server.substring(0,server.length-1);
    chrome.storage.sync.set({ 'server' : server });
},{urls:["<all_urls>"]},["responseHeaders"]);