# mmmq

A matchMedia/mediaQueries polyfill for older browsers.

## What?
Media queries are the basis for modern web sites using responsive web design. They allow us to set styles under some conditions, for example, if the page is at least 600 pixels wide. Or the page is in portrait mode.

Unfortunately, media queries aren't supported in older versions of Internet Explorer. IE8 and below will ignore those styles set by a media query.

mmmq is a polyfill for media queries in older browsers.

## How?
In general, there are two ways to use media queries. The first is in your CSS:

```css
@media all and (min-width: 400px) {
    // styles here
}
```

The other is to use one style sheet per breakpoint by specifying a media attribute on the link element:

```html
<link rel="stylesheet" href="size1.css" media="all and (min-width: 400px)">
```

mmmq works for the second way, separate style sheets per breakpoint and setting a media attribute. If that's not what you want, see below for alternatives.

The script parses the media queries given in the media attribute of link or style elements. These elements will be enabled or disabled, depending on the current size of the viewport. Of course it will update on resize.

## Use it
Just download the minified script (2.9kb, 1.3kb gzipped). Then include it in your files just after your stylesheets:

```html
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="size1.css" media="all and (min-width: 400px)">
<link rel="stylesheet" href="size2.css" media="all and (min-width: 800px)">
<link rel="stylesheet" href="size2.css" media="all and (min-width: 1000px)">
<script src="target/mmmq.min.js"></script>
```

##FAQ

### Are there any alternatives?
There are several. The best known is [Respond](https://github.com/scottjehl/Respond). It works by pre-loading the css files, parsing the css media query parts, and writing the relevant ones into a style element.

### What are the advantages of mmmq?
* It's very small. The minfied file is 1.2kB, gzipped only 0.8
* It's very simple. Just include the script after your css files
* It just works. It even works for local files on your computer, smartphone, from a memory stick. It doesn't need a server to work.

### What are the disadvantages?
You need one file per breakpoint. If you have many breakpoints (say for 320px, 480px, 600px, 1024px and 1280px), you need just as many files. That could mean some HTTP overhead. In praxis, however, only one or two will be loaded. Resizing the browser window is something only developers do. Normal people will only switch from portrait to landscape mode.

However, many developers prefer to define the styles of an element at one place, including modifications for the various breakpoints. This does not work with mmmq, since it needs all rules for a breakpoint in the same file. If you don't want that, use Respond.

### What happens in modern browsers?
As soon as the script detects a modern browser, it stops it work. Modern browsers support media queries, so the script has nothing to do.

### How does the script detect a modern browser?
Currently, by using a week inference. If the browser knows document.addEventListener, it assumes a modern browser. IE8 and below don't support CSS3 media queries, and they don't support document.addEventListener, so it works fine. If I find an easy feature detection for CSS3 media queries, I'll happily use that instead.

### Could I use conditional comments for the script then?
Yes, of course.
