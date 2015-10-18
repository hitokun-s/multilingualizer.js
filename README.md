multilingualizer.js
===================

The simplest way to make a multilingual site (=localization) with tiny javascript code.  

###Intallation & Usage:
Clone the repo and load it:

```<script src="multilingualizer.js/dist/multilingualizer.min.js"></script>``` and ```<link rel="stylesheet" href="multilingualizer.js/dist/multilingualizer.min.css">```.


**Bower**: ```bower install multilingualizer.js```


Now, write multilingual text:

```
<span>[[en]]This is English[[pt]]Isto é Português</span>
```


If you want to use any html in multilingual text, use escaped html:

```
<div>
   [[en]]My email:&lt;a href=mailto:info@somedomain.com&gt;INFO@SOMEDOMAIN.COM&lt;/a&gt;
   [[ja]]O meu email：&lt;a href=mailto:info@somedomain.com&gt;INFO@SOMEDOMAIN.COM&lt;/a&gt;
</div>
```

###How does this library assign a language at first?
1. OS locale language (default)
2. URL parameter "lang" ex.
   ```
   http://[url]?key=value&lang=en
   ```

###How do I set a language without reloading the page?
Just call ```multilingualizer.setLang('language')``` to set that language, as in:

```
<button onclick="multilingualizer.setLang('pt')>Portuguese</button>
```

###Can this library memorise the selected language after the user leaves the page?  

Yes. Once user choose a language, this library keeps it in memory(LocalStorage of HTML5).
The selected language kept in memory is priored to URL parameter lang.

###How do I hide the initial rendering of the content that shows the full untranslated text?

Simple, add a loader by including ```<div id="multilingualizer-loader"></div>``` anywhere on your HTML.

###How do I change the language programmatically?

There are 3 ways;
+ You can navigate to a page with ````?lang=language``` on the url;
+ You can call the ```multilingualizer.setLang('language')``` method;
+ You can call the previous method on an ```<a>``` element with ```href="#"``` (this is only useful when you need to reload lazy loading content.

###Can I disable the loader?

In case you want to disable the loader for a specific call, and have added the loader div to the page, you can pass a ```removeCloak``` boolean parameter
on the setLang('language', removeCloak) method, such as: ```multilingualizer.setLang('en', true)```

###Can load more content after the translation has been rendered?

Yes! Because of performance issues, it's not a good idea to watch the whole page for changes. But you can use ```multilingualizer.apply()``` with the
optional removeCloak boolean as parameter after the new content call and it will handle it.

###Demo:  
[https://hitokun-s.github.io/multilingualizer.js](https://hitokun-s.github.io/multilingualizer.js)


###TODO:  
+ Allow defining another default language
+ Allow ```multilingualizer.apply()``` to render specific elements instead of the whole page
+ Add unit tests
