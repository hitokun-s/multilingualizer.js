multilingualizer.js
===================

The simplest way to make a multilingual site (=localization) with tiny javascript code.  

###How to use:
load multilingualizer.js like

```
<script src="multilingualizer.js"></script>
```
and write multilingual text

```
<span>[[ja]]これは日本語です[[en]]This is English</span>
```

If you want to use any html in multilingual text, please use escaped html like this:

```
<div>
   [[en]]email:&lt;a href=mailto:info@abovtime.com&gt;INFO@ABOVTIME.COM&lt;/a&gt;
   [[ja]]Eメール：&lt;a href=mailto:info@abovtime.com&gt;INFO@ABOVTIME.COM&lt;/a&gt;
</div>
```

###How does this library assign a language at first?
1. OS locale language (default)
2. URL parameter "lang" ex.
   ```
   http://[url]?key=value&lang=en
   ```
###Can this library memorise the selected language after user leaves the page?
Yes. Once user choose a language, this library keeps it in memory(LocalStorage of HTML5).
The selected language kept in memory is priored to URL parameter lang.

###Demo:  
[http://hitokun-s.github.io/multilingualizer.js/demo.html](http://hitokun-s.github.io/multilingualizer.js/demo.html)  

