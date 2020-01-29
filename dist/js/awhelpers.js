(function() {
    var aw = {};
    aw.addNewIcon = function(name, path, fontIconFamilies, exceptions, classPrefix, renderPrefix, classesNamespaceToDelete, classesToDelete) {
        mw.require(mw.settings.template_url + path);
        $(window).on("load", function() {
            if (mw && mw.icons && mw.wysiwyg && mwd) {
                fontIconFamilies.forEach(function(fontIconFamily) {
                    mw.wysiwyg.fontIconFamilies.push(fontIconFamily);
                });
                mw.icons.addIconsInit = function() {
                    var iconsArray = [];
                    var iconsQuery = mwd.querySelector('link[href*="' + path + '"]');
                    if (iconsQuery && iconsQuery.sheet) {
                        try {
                            var icons = iconsQuery.sheet.cssRules;
                            var l = icons.length, cls;
                            for (var i = 0; i < l; i++) {
                                var sel = icons[i].selectorText;
                                if (!!sel && sel.indexOf(classPrefix) === 0) {
                                    cls = sel.replace(".", "").split(":")[0];
                                    if (exceptions.indexOf(cls) === -1) {
                                        iconsArray.push(cls);
                                    }
                                }
                            }
                        } catch (e) {}
                    }
                    if (iconsArray.length) {
                        this.addFontIcons({
                            icons: iconsArray,
                            name: name,
                            remove: function(target) {
                                classesNamespaceToDelete.forEach(function(classNamespace) {
                                    mw.tools.classNamespaceDelete(target, classNamespace);
                                });
                                classesToDelete.forEach(function(classToDelete) {
                                    mw.tools.removeClass(target, classToDelete);
                                });
                            },
                            render: function(icon, target) {
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
    aw.addNewFont = function(fontNames, cssPath) {
        mw.require(mw.settings.template_url + cssPath);
        $(document).ready(function() {
            if (mw && mw.wysiwyg) {
                fontNames.forEach(function(fontName) {
                    mw.wysiwyg.fontFamilies.push(fontName);
                });
            }
        });
    };
    if (!window.aw) {
        window.aw = aw;
    } else {
        console.log("%c !!! aw already defined !!! ", "background: #800080; color: #fff; font-size:16px;");
    }
})();