# Stickyfill

Stickyfill - is a Magento2 module that integrates
[Stickyfill library](https://github.com/wilddeer/stickyfill) into Magento.

The module also provides [additional features](#additional-features): it may
add `sticky-active` class, when element is actually stuck at the moment.

### Installation

```bash
cd <magento_root>
composer require swissup/module-stickyfill
bin/magento module:enable Swissup_Stickyfill
bin/magento setup:upgrade
```

### Usage

Basic example:

```js
require(['stickyfill'], function (Stickyfill) {
    Stickyfill.add(document.querySelectorAll('.sidebar'));
});
```

> See all available methods at official site: https://github.com/wilddeer/stickyfill#api

Advanced example (works for dynamically added elements):

```js
require([
    'Magento_Ui/js/lib/view/utils/async',
    'stickyfill'
], function ($, Stickyfill) {
    $.async('.sidebar', function (el) {
        Stickyfill.add(el);
    });
});
```

### Additional features

`Swissup_Stickyfill/js/sticky` - is a proxy to stickyfill library that adds
`sticky-active` class name when element is stuck. It has the following methods:

Method  | Description
--------|------------
add     | Proxy to `Stickyfill.add`
remove  | Proxy to `Stickyfill.remove`
stickyfill | Returns `Stickyfill` object

Basic usage:

```js
require([
    'Swissup_Stickyfill/js/sticky'
], function (sticky) {
    sticky.add(document.querySelectorAll('.sidebar'))
});
```

Using with matchMedia library:

```js
require([
    'matchMedia',
    'Swissup_Stickyfill/js/sticky'
], function (mediaCheck, sticky) {
    'use strict';

    var sidebar = document.querySelectorAll('.sidebar');

    mediaCheck({
        media: '(min-width: 768px)',
        entry: function () {
            sticky.add(sidebar);
        },
        exit: function () {
            sticky.remove(sidebar);
        }
    });
});
```
