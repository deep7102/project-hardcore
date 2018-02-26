<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [HOMEPAGE_DEFAULTS](#homepage_defaults)
-   [Homepage](#homepage)
    -   [updated](#updated)
    -   [destroy](#destroy)
-   [resize](#resize)

## HOMEPAGE_DEFAULTS

Homepage Default Settings

**Properties**

-   `animate` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Disable animation during resize
-   `columns` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Display in 3 (default) or 4 column layout

## Homepage

The Homepage handles card layout at multiple breakpoints.

**Parameters**

-   `element` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The component element.
-   `settings` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The component settings.

### updated

Resync the UI and Settings.

**Parameters**

-   `settings` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The settings to apply.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The api

### destroy

Destroy this component instance and remove the link from its base element.

Returns **void** 

## resize

Fires after the page is resized and layout is set.
Can be used for any special adjustments.

**Properties**

-   `event` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The jquery event object