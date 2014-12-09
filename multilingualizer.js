var DEAFULT_LANG = "en";
var LANG_REG_EXP = /\[\[([a-z]{2})\]\]([^\[]+)/g;

var user_lang = (navigator.userLanguage||navigator.browserLanguage||navigator.language||DEAFULT_LANG).substr(0,2);

var getLangParam = function(){
    var arr = /lang=([a-z]{2})/g.exec(location.search);
    return arr ? arr[1] : null;
}

function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}

var globalDict = [];

$(function(){
    
    user_lang = getLangParam() || user_lang;
    
    textNodesUnder(document).filter(function(v){
        return LANG_REG_EXP.test(v.nodeValue);
    }).forEach(function(v,i){
        var dict = {};
        var arr;
        while((arr = LANG_REG_EXP.exec(v.nodeValue)) != null){
            dict[arr[1]] = arr[2];
        }
        globalDict.push({elm:$(v).parent()[0], dict:dict});        
    });
    
    globalDict.forEach(function(v){
        $(v.elm).text(v.dict[user_lang]);
    });
});



