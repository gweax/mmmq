/*
 * @license (c) 2013 Matthias Reuter http://gweax.de/mmmq/
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Adds support for the media feature "aspect-ratio" as well as
 * "min-aspect-ratio" and "max-aspect-ratio".
 */
(function () {

    var regExpRatio = /(\d+)\s*\/\s*(\d+)/,
        feature = "aspect-ratio",
        matchers = mm.matchers;

    /*
     * Gets the numerical value of a media query ratio value.
     *
     * e.g.
     * "1024/768" results in 1.3333333333
     * "800/480" results in 1.6666666666
     */
    function getRatio(value) {
        var match = regExpRatio.match(value),
            ratio = NaN;
        
        if (match) {
            ratio = match[1] / match[2];
        }
        
        return ratio;
    }

    matchers[feature] = function (value) {
        var ratio = mm.width / mm.height;
        
        return ratio === getRatio(value); 
    };

    matchers["min-" + feature] = function (value) {
        var ratio = mm.width / mm.height;
        
        return ratio >= getRatio(value); 
    };

    matchers["max-" + feature] = function (value) {
        var ratio = mm.width / mm.height;
        
        return ratio <= getRatio(value); 
    };
    
}());
