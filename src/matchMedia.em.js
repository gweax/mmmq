/*
 * @license (c) 2013 Matthias Reuter http://gweax.de/mmmq/
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

(function () {
    var regExpEndsWithEm = /em$/,
        initialFontSize = 16,
        doc = document,
        docElem = doc.documentElement,
        body, element, value;

    /*
     * To support em values in media queries we have to determine the initial
     * font size.
     *
     * To do this, we insert an element with a width of 1em into the body and
     * get its offsetWidth. Unfortunately, the body might not yet exist when
     * this script is called in the head, so we create a fake body.
     *
     * When there's a font-size set to either the html or the body element, the
     * initial font-size would be wrong. To avoid this, we temporarily set the
     * font-size of both the html and the fake body element to 100%.
     *
     * This might lead to a re-rendering of the page, if this script is not
     * called in the head. Feel free to remove this code, if this bothers you.
     * Then an initial font-size of 16px is assumed (as is true in many
     * browsers).
     */

    // create a fake body element
    body = doc.createElement("body");
    body.style.cssText = "background:none;font-size:100%;";
    
    element = doc.createElement("div");
    element.style.cssText = "position:absolute;font-size:1em;width:1em";
    
    body.appendChild(element);
    docElem.appendChild(body);
    
    // set font size of html element to 100%
    docElem.style.fontSize = "100%";
    
    value = element.offsetWidth;
    
    // reset font size of html element
    docElem.style.fontSize = "";
    docElem.removeChild(body);
    
    initialFontSize = parseFloat(value);
    
    /*
     * Gets a numerical pixel value from a px/em value.
     *
     * e.g. given an initial font size of 16px
     *
     * "1.5em" will result in 24
     * "24px" will result in 24
     *
     * This function overwrites the original mm.getInPx method.
     */
    mm.getInPx = function (value) {
        var px = parseFloat(value);
    
        if (regExpEndsWithEm.text(value)) {
            px = px * initialFontSize;
        }
        
        return px;
    };
}());
