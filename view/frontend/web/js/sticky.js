define([
    'jquery',
    'underscore',
    'stickyfill'
], function ($, _, Stickyfill) {
    'use strict';

    var stickes = [],
        options = {
            activeClassName: 'sticky-active'
        },
        isIos = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    /**
     * Watch for all stickes and add sticky-active class when needed
     */
    function watch() {
        _.each(stickes, function (el) {
            var boundingClientRectTop = Number(el.getBoundingClientRect().top);

            // iOS fix
            if (isIos && Math.abs(boundingClientRectTop) <= 1) {
                boundingClientRectTop = 0;
            }

            var top = parseInt($(el).css('top'), 10) || 0,
                atTop = boundingClientRectTop === top,
                isStuck = $(el).hasClass(options.activeClassName);

            if (atTop && !isStuck) {
                $(el).addClass(options.activeClassName);
            } else if (!atTop && isStuck) {
                $(el).removeClass(options.activeClassName);
            }
        });
    }

    window.addEventListener('scroll', _.throttle(watch, 100));
    window.addEventListener('resize', _.throttle(watch, 100));

    /**
     * Initialize additional functionality
     *
     * @param {jQuery} elements
     */
    function init(elements) {
        stickes = stickes.concat($(elements).toArray());

        watch();

        return Stickyfill.add(elements);
    }

    /**
     * Remove additional functionality from the elements
     *
     * @param  {jQuery} elements
     */
    function destroy(elements) {
        var elementsArray = $(elements).toArray();

        $(elements).removeClass(options.activeClassName);

        stickes = _.filter(stickes, function (el) {
            return _.contains(elementsArray, el);
        });

        Stickyfill.remove(elements);
    }

    return {
        /**
         * @param {jQuery} elements
         * @return {Array}
         */
        add: function (elements) {
            return init(elements);
        },

        /**
         * @param {jQuery} elements
         */
        remove: function (elements) {
            destroy(elements);
        },

        /**
         * @return {Object}
         */
        stickyfill: function () {
            return Stickyfill;
        }
    };
});
