# Stickyfill

Stickyfill - is a Magento2 module that integrates
[Stickyfill library](https://github.com/wilddeer/stickyfill) into Magento.

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
