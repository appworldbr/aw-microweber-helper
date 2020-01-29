# Usage

First at all, you need to require the file using
`mw.require("<?= template_url(); ?>/assets/js/awhelpers.js");` or 
`mw.require(mw.settings.template_url + "/assets/js/awhelpers.js");`

## Add Icon:
```js
<script>
$(window).on('load', function () {
    aw.addNewIcon(
        "Random Name", //icon name
        "assets/icons_test/icons_a/flaticon.css", //path to the css file
        ["flaticon"], //classes for open the icons tooltip
        [], //icon exceptions
        ".flaticon-", //class prefix identifier of icons
        "flaticon ", //class to insert before the icon (normally is the same as added for open the icons tooltip)
        ['flaticon-'], //classes prefix to remove the icons class (prefix)
        ['flaticon'] //classes to remove in the icon class (normally is the same as added before)
    );
});
</script>
```

## Add Font:
```js
<script>
$(window).on('load', function () {
    aw.addNewFont(
        [
            "Acumin Pro",
            "Acumin Pro Italic",
            "Acumin Pro Bold",
            "Acumin Pro Bold Italic"
        ], //all font families
        "assets/custom_fonts/acumin/style.css" //path to the css
    );
});
</script>
```

# Custom Code
Just copy the project, download node dependencies, make your custom code in `src/js/awhelpers.js` and run `npm run build` them copy in the dist 
folder the js you want in your [Microweber](https://github.com/microweber/microweber) project.