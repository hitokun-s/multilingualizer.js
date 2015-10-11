multilingualizer.js
===================

Originally forked from [https://github.com/hitokun-s/multilingualizer.js](https://github.com/hitokun-s/multilingualizer.js).
The simplest way to make a multilingual site (=localization) with tiny javascript code.  

###Intallation & Usage:
Clone the repo and load it:

```<script src="multilingualizer.js/dist/multilingualizer.min.js"></script>``` and ```<link rel="stylesheet" href="multilingualizer.js/dist/multilingualizer.mincss">```.


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

Simple, add the your content inside ```<div id="multilingualizer-wrapper" class="multilingualizer-cloak">...content...</div>```.
The content's opacity will be set to 0 until the translation is rendered.
Optionally, you can add a loader by including ```<div id="multilingualizer-loader" class="multilingualizer-spinner"></div>``` outside
the wrapper and it will show a css loader while the translation is redered.

###How do I change the language programmatically?

There are 3 ways;
+ You can navigate to a page with ````?lang=language``` on the url;
+ You can call the ```multilingualizer.setLang('language')``` method;
+ You can call the previous method on an ```<a>``` element with ```href="#"``` (this is only useful when you need to reload lazy loading content.

###Can I disable the loader?

In case you want to disable the loader for a specific call, and hav added the loader div to the page, you can pass a ```removeCloak``` parameter
on the setLang() method, such as: ```multilingualizer.setLang('en', true)```

###Can load more content after the translation has been rendered?

Yes! Because of performance issues, it's not a good idea to watch the whole page for changes. But you can use ```multilingualizer.apply(removeCloak)```
after the new content call and it will handle it.

###Demo:  
[http://fgarci03.github.io/multilingualizer.js](http://fgarci03.github.io/multilingualizer.js)


###TODO:  
+ Add to bower;
+ Allow defining another default language
+ Allow ```multilingualizer.apply()``` to render specific elements instead of the whole page
