/*
 * @license (c) 2013 Matthias Reuter http://gweax.de/mmmq/
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Adds support for CSS3 media queries for <link> and <style> elements.
 *
 * Uses the mm polyfill for matchMedia.
 *
 * Only handles <link> and <style> elements present before this script is
 * called.
 */
(function () {
    var doc = document,
        getElementsByTagName = doc.getElementsByTagName,
        attrMedia = "media",
        attrDataMedia = "data-media",
        elements, delayTimeout;
    
    function hasNativeMediaQueries() {
        // Very week inference. IE 7 & 8 don't support CSS3 media queries,
        // and they don't support addEventListener. IE9+ supports both.
        return !!doc.addEventListener;
    }
    
    /* safes some bytes */
    function getAttribute(element, name) {
        return element.getAttribute(name);
    }
    
    if (hasNativeMediaQueries()) {
        // if the browser supports media queries natively, stop here.
        return;
    }

    elements = (function() {
    
        // Determine all style and link elements with a media attribute
        // Do so once.

        var links = getElementsByTagName("link"),
            styles = getElementsByTagName("style"),
            elements = [],
            i, len, element;
            
        function hasMedia(element) {
            // IE7 does not support hasAttribute
            return !!getAttribute(element, attrMedia);
        }
        
        function isStylesheet(element) {
            return getAttribute(element, "rel") === "stylesheet";
        }
            
        for (i = 0, len = links.length; i < len; i++) {
            element = links[i];
            
            if (isStylesheet(element) && hasMedia(element)) {
                elements.push(element);
            }
        }
        
        for (i = 0, len = styles.length; i < len; i++) {
            element = styles[i];
            
            if (hasMedia(element)) {
                elements.push(element);
            }
        }
        
        return elements;
        
    })();

    function handleResize() {
        var i, len, element, query;

        mm.update();
        
        for (i = 0, len = elements.length; i < len; i++) {
            element = elements[i];
            query = getAttribute(element, attrDataMedia);
            
            // disable stylesheet if the query does not match the media
            element.disabled = !mm.matchMedia(query);
        }
    }

    function initElements() {
        var i, len, element;

        for (i = 0, len = elements.length; i < len; i++) {
            element = elements[i];
            
            element.setAttribute(attrDataMedia, getAttribute(element, attrMedia));
            element.removeAttribute(attrMedia);
        }
    }

    initElements();
    handleResize();

    window.onresize = function () {
        clearTimeout(delayTimeout);
        
        delayTimeout = setTimeout(handleResize, 200);
    };
    
}());
