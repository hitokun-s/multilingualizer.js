var DEAFULT_LANG = "en";
var LANG_REG_EXP = /\[\[([a-z]{2})\]\]([^\[]+)/g;
var isStorageEnabled = ! (typeof localStorage == 'undefined');
var user_lang = (navigator.userLanguage||navigator.browserLanguage||navigator.language||DEAFULT_LANG).substr(0,2);

var getLangParam = function(){
    var arr = /lang=([a-z]{2})/g.exec(location.search);
    return arr ? arr[1] : null;
}

var getLangFromStorage = function(){
    return isStorageEnabled ? localStorage.getItem('lang') : undefined;
}

var setLang = function(lang){
    user_lang = lang;
    if(isStorageEnabled){
        localStorage.setItem('lang', user_lang);
    }
    applyLang();
}

var applyLang = function(){
    globalDict.forEach(function(v){
        $(v.elm).html(v.dict[user_lang]);
    });
}

function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_ALL,null,false);
  while(n=walk.nextNode()){
      a.push(n);
  }
  return a;
}

var globalDict = [];

$(function(){
    
    user_lang = getLangParam() || getLangFromStorage() || user_lang;

    if(isStorageEnabled){
        localStorage.setItem('lang', user_lang);
    }
    
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
    applyLang();
});