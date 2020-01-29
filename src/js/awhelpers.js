/***
<script>
    mw.require("<?= template_url(); ?>/assets/js/awhelpers.js"); //require do arquivo
    aw.addNewIcon(
        "Random Name", //nome
        "assets/icons_test/icons_a/flaticon.css", //caminho até o css dos ícones
        ["flaticon"], //classes para conseguir reconhecer o abrir
        [], //classes excessões para não exibir certos icones
        ".flaticon-", //classe identificador prefixo
        "flaticon ", //classe prefix inserção
        ['flaticon-'], //classes prefix para remover quando trocar de icone
        ['flaticon'] //classes para remover quando trocar dde icone
    );
    aw.addNewFont(
        [
            "Acumin Pro",
            "Acumin Pro Italic",
            "Acumin Pro Bold",
            "Acumin Pro Bold Italic"
        ], //todos os font families do css
        "assets/custom_fonts/acumin/style.css" //caminho até o css
    );
</script>
 ***/

(function () {
    var aw = { };
    aw.addNewIcon = function (name, path, fontIconFamilies, exceptions, classPrefix, renderPrefix, classesNamespaceToDelete, classesToDelete) {
        mw.require(mw.settings.template_url + path);
        $(window).on('load', function () {
            if(mw && mw.icons && mw.wysiwyg && mwd) {
                fontIconFamilies.forEach(function (fontIconFamily) {
                    mw.wysiwyg.fontIconFamilies.push(fontIconFamily);
                });
                mw.icons.addIconsInit = function () {
                    var iconsArray = [];
                    var iconsQuery = mwd.querySelector('link[href*="' + path + '"]');
                    if (iconsQuery && iconsQuery.sheet) {
                        try {
                            var icons = iconsQuery.sheet.cssRules;
                            var l = icons.length, cls;
                            for (var i = 0; i < l; i++) {
                                var sel = icons[i].selectorText;
                                if (!!sel && sel.indexOf(classPrefix) === 0) {
                                    cls = sel.replace(".", '').split(':')[0];
                                    if (exceptions.indexOf(cls) === -1) {
                                        iconsArray.push(cls);
                                    }
                                }
                            }
                        } catch (e) {
                        }
                    }
                    if (iconsArray.length) {
                        this.addFontIcons({
                            icons: iconsArray,
                            name: name,
                            remove: function (target) {
                                classesNamespaceToDelete.forEach(function (classNamespace) {
                                    mw.tools.classNamespaceDelete(target, classNamespace);
                                });
                                classesToDelete.forEach(function (classToDelete) {
                                    mw.tools.removeClass(target, classToDelete);
                                });
                            },
                            render: function (icon, target) {
                                mw.$(target).addClass(renderPrefix + icon);
                            }
                        });
                    }
                };
                mw.icons.addIconsInit();
                mw.icons.availableIcons();
            }
        });
    };
    aw.addNewFont = function (fontNames, cssPath){
        mw.require(mw.settings.template_url + cssPath);
        $(document).ready(function(){
            if(mw && mw.wysiwyg) {
                fontNames.forEach(function (fontName) {
                    mw.wysiwyg.fontFamilies.push(fontName);
                });
            }
        });
    };
    if(!window.aw) {
        window.aw = aw;
    } else {
        console.log('%c !!! aw already defined !!! ', 'background: #800080; color: #fff; font-size:16px;');
    }

})();
