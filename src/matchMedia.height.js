/*
 * @license (c) 2013 Matthias Reuter http://gweax.de/mmmq/
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Adds support for the media feature "height", including "min-height" and
 * "max-height".
 */
(function () {
    var matchers = mm.matchers,
        getInPx = mm.getInPx,
        feature = "height";
        
    matchers[feature] = function (value) {
        return getInPx(value) === mm.height;
    };

    matchers["min-" + feature] = function (value) {
        return getInPx(value) <= mm.height;
    };
            
    matchers["max-" + feature] = function (value) {
        return getInPx(value) >= mm.height;
    };

}());
