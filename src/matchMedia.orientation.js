/*
 * @license (c) 2013 Matthias Reuter http://gweax.de/mmmq/
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Adds support for the media feature "orientation".
 *
 * The orientation is "portrait" if the width is bigger or equal to the height,
 * and "landscape" otherwise.
 */
mm.matchers.orientation = function (value) {
    var mode = mm.height >= mm.width ? "portrait" : "landscape";
    
    return value === mode;
};

