/*
 * @license (c) 2013 Matthias Reuter http://gweax.de/mmmq/
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var mm = (function () {

    /*
     * A matchMedia polyfill for browsers that don't support CSS3-Mediaqueries [1].
     *
     * Currently handles the media types (by always assuming true)
     *   screen
     *   all
     *
     * the keywords
     *   not
     *   only
     *   and
     *
     * Support for media features can be added by extending the mm.matchers
     * object. 
     *
     * The polyfill does not check if passed-in queries are syntactically
     * correct. More, it might handle invalid queries differently than
     * specified in the specs [2].
     *
     * This polyfill is written for easy extensibility. If you want it to support
     * a media feature, just add a function to mm.matchers. For example:
     *
     *   mm.matchers["min-device-width"] = function (value) {
     *       return mm.getInPx(value) <= screen.width;
     *   }
     *
     * [1] <http://dev.w3.org/csswg/css3-mediaqueries/>
     * [2] <http://dev.w3.org/csswg/css3-mediaqueries/#error-handling>.
     */

    var regExpOr = /\s*,\s*/,
        regExpNot = /^\s*not\s+/,
        regExpOnly = /^\s*only\s+/,
        regExpAnd = /\s+and\s+/,
        regExpKeyValue = /([^:\(]+)(?:\s*:\s*([^\)]+))?/,
        mm;
        
    function returnTrue () { return true; }

    /*
     * This function tries to extract a property and a value. It will then
     * perform a check, if the value matches the media for that property.
     *
     * "(min-width: 300px)" will result in the property "min-width" and the
     * value "300px";
     *
     * "screen" will result in the feature "screen" and the value undefined
     */
    function matchesAndPart(part) {
        var match, feature, value;

        // I'm not totally happy with that part. While I correctly handle valid
        // queries, I also accept malformed ones. Should I do a syntax check?
        match = part.replace(regExpOnly, "").match(regExpKeyValue);
        feature = match[1];
        value = match[2];
        
        return mm.matchers.hasOwnProperty(feature) && mm.matchers[feature](value);
    }
    
    /*
     * This function splits the query into several parts, and check each part
     * until one does not match.
     *
     * "screen and (min-width: 300px)" will be split into "screen" and
     * "(min-width: 300px)"
     */
    function matchesOrPart(part) {
        var andParts, i, len;

        if (regExpNot.test(part)) {
            return !matchesPart(part.replace(regExpNot, ""));
        }
        
        andParts = part.split(regExpAnd);
        
        for (i = 0, len = andParts.length; i < len; i++) {
            if (!matchesAndPart(andParts[i])) {
                return false;
            }
        }
        
        return true;
    }    
        
    /*
     * This is the entry point for a matchMedia call. It will split the query
     * into several parts, and check each part until one matches.
     *
     * "screen, tv" will be split to "screen" and "tv".
     */
    function matchMedia(query) {
        var orParts, i, len;

        orParts = query.split(regExpOr);
        
        for (i = 0, len = orParts.length; i < len; i++) {
            if (matchesOrPart(orParts[i])) {
                return true;
            }
        }
        
        return false;
    }
    
    /*
     * Calculates the current width and height of the viewport.
     *
     * This function will not be called automatically. If on every call of
     * matchMedia we had to determine the current size of the viewport, this
     * could slow down the browser.
     * The user of this script therefore is responsible for updating these
     * values at appropriate times.
     */
    function update() {
        var docElement = document.documentElement;
        
        mm.height = docElement.clientHeight;
        mm.width = docElement.clientWidth;
    }
    
    
    /*
     * Gets a numerical pixel value from a px value string.
     *
     * e.g. "24px" will result in 24
     */
    function getInPx(value) {
        return parseFloat(value);
    }
    
    mm = {
        "matchers": {
            "all": returnTrue,
            "screen": returnTrue,
        },
        
        "height": 0,
        "width": 0,
        
        "getInPx": getInPx,
        
        "matchMedia": matchMedia,
        "update": update
    };

    return mm;

}());
