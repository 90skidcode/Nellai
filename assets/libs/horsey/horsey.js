(function(f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this }
        g.horsey = f() } })(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} };
                t[o][0].call(l.exports, function(e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++) s(r[o]); return s })({
        1: [function(require, module, exports) {
            'use strict';

            var _hashSum = require('hash-sum');

            var _hashSum2 = _interopRequireDefault(_hashSum);

            var _sell = require('sell');

            var _sell2 = _interopRequireDefault(_sell);

            var _sektor = require('sektor');

            var _sektor2 = _interopRequireDefault(_sektor);

            var _emitter = require('contra/emitter');

            var _emitter2 = _interopRequireDefault(_emitter);

            var _bullseye = require('bullseye');

            var _bullseye2 = _interopRequireDefault(_bullseye);

            var _crossvent = require('crossvent');

            var _crossvent2 = _interopRequireDefault(_crossvent);

            var _fuzzysearch = require('fuzzysearch');

            var _fuzzysearch2 = _interopRequireDefault(_fuzzysearch);

            var _debounce = require('lodash/debounce');

            var _debounce2 = _interopRequireDefault(_debounce);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

            var KEY_BACKSPACE = 8;
            var KEY_ENTER = 13;
            var KEY_ESC = 27;
            var KEY_UP = 38;
            var KEY_DOWN = 40;
            var KEY_TAB = 9;
            var doc = document;
            var docElement = doc.documentElement;

            function horsey(el) {
                var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var setAppends = options.setAppends;
                var _set = options.set;
                var filter = options.filter;
                var source = options.source;
                var _options$cache = options.cache;
                var cache = _options$cache === undefined ? {} : _options$cache;
                var predictNextSearch = options.predictNextSearch;
                var renderItem = options.renderItem;
                var renderCategory = options.renderCategory;
                var blankSearch = options.blankSearch;
                var appendTo = options.appendTo;
                var anchor = options.anchor;
                var debounce = options.debounce;

                var caching = options.cache !== false;
                if (!source) {
                    return;
                }

                var userGetText = options.getText;
                var userGetValue = options.getValue;
                var getText = typeof userGetText === 'string' ? function(d) {
                    return d[userGetText];
                } : typeof userGetText === 'function' ? userGetText : function(d) {
                    return d.toString();
                };
                var getValue = typeof userGetValue === 'string' ? function(d) {
                    return d[userGetValue];
                } : typeof userGetValue === 'function' ? userGetValue : function(d) {
                    return d;
                };

                var previousSuggestions = [];
                var previousSelection = null;
                var limit = Number(options.limit) || Infinity;
                var completer = autocomplete(el, {
                    source: sourceFunction,
                    limit: limit,
                    getText: getText,
                    getValue: getValue,
                    setAppends: setAppends,
                    predictNextSearch: predictNextSearch,
                    renderItem: renderItem,
                    renderCategory: renderCategory,
                    appendTo: appendTo,
                    anchor: anchor,
                    noMatches: noMatches,
                    noMatchesText: options.noMatches,
                    blankSearch: blankSearch,
                    debounce: debounce,
                    set: function set(s) {
                        if (setAppends !== true) {
                            el.value = '';
                        }
                        previousSelection = s;
                        (_set || completer.defaultSetter)(getText(s), s);
                        completer.emit('afterSet');
                    },

                    filter: filter
                });
                return completer;

                function noMatches(data) {
                    if (!options.noMatches) {
                        return false;
                    }
                    return data.query.length;
                }

                function sourceFunction(data, done) {
                    var query = data.query;
                    var limit = data.limit;

                    if (!options.blankSearch && query.length === 0) {
                        done(null, [], true);
                        return;
                    }
                    if (completer) {
                        completer.emit('beforeUpdate');
                    }
                    var hash = (0, _hashSum2.default)(query); // fast, case insensitive, prevents collisions
                    if (caching) {
                        var entry = cache[hash];
                        if (entry) {
                            var start = entry.created.getTime();
                            var duration = cache.duration || 60 * 60 * 24;
                            var diff = duration * 1000;
                            var fresh = new Date(start + diff) > new Date();
                            if (fresh) {
                                done(null, entry.items.slice());
                                return;
                            }
                        }
                    }
                    var sourceData = {
                        previousSuggestions: previousSuggestions.slice(),
                        previousSelection: previousSelection,
                        input: query,
                        renderItem: renderItem,
                        renderCategory: renderCategory,
                        limit: limit
                    };
                    if (typeof options.source === 'function') {
                        options.source(sourceData, sourced);
                    } else {
                        sourced(null, options.source);
                    }

                    function sourced(err, result) {
                        if (err) {
                            console.log('Autocomplete source error.', err, el);
                            done(err, []);
                        }
                        var items = Array.isArray(result) ? result : [];
                        if (caching) {
                            cache[hash] = { created: new Date(), items: items };
                        }
                        previousSuggestions = items;
                        done(null, items.slice());
                    }
                }
            }

            function autocomplete(el) {
                var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                var o = options;
                var parent = o.appendTo || doc.body;
                var getText = o.getText;
                var getValue = o.getValue;
                var form = o.form;
                var source = o.source;
                var noMatches = o.noMatches;
                var noMatchesText = o.noMatchesText;
                var _o$highlighter = o.highlighter;
                var highlighter = _o$highlighter === undefined ? true : _o$highlighter;
                var _o$highlightCompleteW = o.highlightCompleteWords;
                var highlightCompleteWords = _o$highlightCompleteW === undefined ? true : _o$highlightCompleteW;
                var _o$renderItem = o.renderItem;
                var renderItem = _o$renderItem === undefined ? defaultItemRenderer : _o$renderItem;
                var _o$renderCategory = o.renderCategory;
                var renderCategory = _o$renderCategory === undefined ? defaultCategoryRenderer : _o$renderCategory;
                var setAppends = o.setAppends;

                var limit = typeof o.limit === 'number' ? o.limit : Infinity;
                var userFilter = o.filter || defaultFilter;
                var userSet = o.set || defaultSetter;
                var categories = tag('div', 'sey-categories');
                var container = tag('div', 'sey-container');
                var deferredFiltering = defer(filtering);
                var state = { counter: 0, query: null };
                var categoryMap = Object.create(null);
                var selection = null;
                var eye = void 0;
                var attachment = el;
                var noneMatch = void 0;
                var textInput = void 0;
                var anyInput = void 0;
                var ranchorleft = void 0;
                var ranchorright = void 0;
                var lastPrefix = '';
                var debounceTime = o.debounce || 300;
                var debouncedLoading = (0, _debounce2.default)(loading, debounceTime);

                if (o.autoHideOnBlur === void 0) {
                    o.autoHideOnBlur = true;
                }
                if (o.autoHideOnClick === void 0) {
                    o.autoHideOnClick = true;
                }
                if (o.autoShowOnUpDown === void 0) {
                    o.autoShowOnUpDown = el.tagName === 'INPUT';
                }
                if (o.anchor) {
                    ranchorleft = new RegExp('^' + o.anchor);
                    ranchorright = new RegExp(o.anchor + '$');
                }

                var hasItems = false;
                var api = (0, _emitter2.default)({
                    anchor: o.anchor,
                    clear: clear,
                    show: show,
                    hide: hide,
                    toggle: toggle,
                    destroy: destroy,
                    refreshPosition: refreshPosition,
                    appendText: appendText,
                    appendHTML: appendHTML,
                    filterAnchoredText: filterAnchoredText,
                    filterAnchoredHTML: filterAnchoredHTML,
                    defaultAppendText: appendText,
                    defaultFilter: defaultFilter,
                    defaultItemRenderer: defaultItemRenderer,
                    defaultCategoryRenderer: defaultCategoryRenderer,
                    defaultSetter: defaultSetter,
                    retarget: retarget,
                    attachment: attachment,
                    source: []
                });

                retarget(el);
                container.appendChild(categories);
                if (noMatches && noMatchesText) {
                    noneMatch = tag('div', 'sey-empty sey-hide');
                    text(noneMatch, noMatchesText);
                    container.appendChild(noneMatch);
                }
                parent.appendChild(container);
                el.setAttribute('autocomplete', 'off');

                if (Array.isArray(source)) {
                    loaded(source, false);
                }

                return api;

                function retarget(el) {
                    inputEvents(true);
                    attachment = api.attachment = el;
                    textInput = attachment.tagName === 'INPUT' || attachment.tagName === 'TEXTAREA';
                    anyInput = textInput || isEditable(attachment);
                    inputEvents();
                }

                function refreshPosition() {
                    if (eye) {
                        eye.refresh();
                    }
                }

                function loading(forceShow) {
                    if (typeof source !== 'function') {
                        return;
                    }
                    _crossvent2.default.remove(attachment, 'focus', loading);
                    var query = readInput();
                    if (query === state.query) {
                        return;
                    }
                    hasItems = false;
                    state.query = query;

                    var counter = ++state.counter;

                    source({ query: query, limit: limit }, sourced);

                    function sourced(err, result, blankQuery) {
                        if (state.counter !== counter) {
                            return;
                        }
                        loaded(result, forceShow);
                        if (err || blankQuery) {
                            hasItems = false;
                        }
                    }
                }

                function loaded(categories, forceShow) {
                    clear();
                    hasItems = true;
                    api.source = [];
                    categories.forEach(function(cat) {
                        return cat.list.forEach(function(suggestion) {
                            return add(suggestion, cat);
                        });
                    });
                    if (forceShow) {
                        show();
                    }
                    filtering();
                }

                function clear() {
                    unselect();
                    while (categories.lastChild) {
                        categories.removeChild(categories.lastChild);
                    }
                    categoryMap = Object.create(null);
                    hasItems = false;
                }

                function readInput() {
                    return (textInput ? el.value : el.innerHTML).trim();
                }

                function getCategory(data) {
                    if (!data.id) {
                        data.id = 'default';
                    }
                    if (!categoryMap[data.id]) {
                        categoryMap[data.id] = createCategory();
                    }
                    return categoryMap[data.id];

                    function createCategory() {
                        var category = tag('div', 'sey-category');
                        var ul = tag('ul', 'sey-list');
                        renderCategory(category, data);
                        category.appendChild(ul);
                        categories.appendChild(category);
                        return { data: data, ul: ul };
                    }
                }

                function add(suggestion, categoryData) {
                    var cat = getCategory(categoryData);
                    var li = tag('li', 'sey-item');
                    renderItem(li, suggestion);
                    if (highlighter) {
                        breakupForHighlighter(li);
                    }
                    _crossvent2.default.add(li, 'mouseenter', hoverSuggestion);
                    _crossvent2.default.add(li, 'click', clickedSuggestion);
                    _crossvent2.default.add(li, 'horsey-filter', filterItem);
                    _crossvent2.default.add(li, 'horsey-hide', hideItem);
                    cat.ul.appendChild(li);
                    api.source.push(suggestion);
                    return li;

                    function hoverSuggestion() {
                        select(li);
                    }

                    function clickedSuggestion() {
                        var input = getText(suggestion);
                        set(suggestion);
                        hide();
                        attachment.focus();
                        lastPrefix = o.predictNextSearch && o.predictNextSearch({
                            input: input,
                            source: api.source.slice(),
                            selection: suggestion
                        }) || '';
                        if (lastPrefix) {
                            el.value = lastPrefix;
                            el.select();
                            show();
                            filtering();
                        }
                    }

                    function filterItem() {
                        var value = readInput();
                        if (filter(value, suggestion)) {
                            li.className = li.className.replace(/ sey-hide/g, '');
                        } else {
                            _crossvent2.default.fabricate(li, 'horsey-hide');
                        }
                    }

                    function hideItem() {
                        if (!hidden(li)) {
                            li.className += ' sey-hide';
                            if (selection === li) {
                                unselect();
                            }
                        }
                    }
                }

                function breakupForHighlighter(el) {
                    getTextChildren(el).forEach(function(el) {
                        var parent = el.parentElement;
                        var text = el.textContent || el.nodeValue || '';
                        if (text.length === 0) {
                            return;
                        }
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = text[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var char = _step.value;

                                parent.insertBefore(spanFor(char), el);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        parent.removeChild(el);

                        function spanFor(char) {
                            var span = doc.createElement('span');
                            span.className = 'sey-char';
                            span.textContent = span.innerText = char;
                            return span;
                        }
                    });
                }

                function highlight(el, needle) {
                    var rword = /[\s,._\[\]{}()-]/g;
                    var words = needle.split(rword).filter(function(w) {
                        return w.length;
                    });
                    var elems = [].concat(_toConsumableArray(el.querySelectorAll('.sey-char')));
                    var chars = void 0;
                    var startIndex = 0;

                    balance();
                    if (highlightCompleteWords) {
                        whole();
                    }
                    fuzzy();
                    clearRemainder();

                    function balance() {
                        chars = elems.map(function(el) {
                            return el.innerText || el.textContent;
                        });
                    }

                    function whole() {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = words[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var word = _step2.value;

                                var tempIndex = startIndex;
                                retry: while (tempIndex !== -1) {
                                    var init = true;
                                    var prevIndex = tempIndex;
                                    var _iteratorNormalCompletion3 = true;
                                    var _didIteratorError3 = false;
                                    var _iteratorError3 = undefined;

                                    try {
                                        for (var _iterator3 = word[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                            var char = _step3.value;

                                            var i = chars.indexOf(char, prevIndex + 1);
                                            var fail = i === -1 || !init && prevIndex + 1 !== i;
                                            if (init) {
                                                init = false;
                                                tempIndex = i;
                                            }
                                            if (fail) {
                                                continue retry;
                                            }
                                            prevIndex = i;
                                        }
                                    } catch (err) {
                                        _didIteratorError3 = true;
                                        _iteratorError3 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                                _iterator3.return();
                                            }
                                        } finally {
                                            if (_didIteratorError3) {
                                                throw _iteratorError3;
                                            }
                                        }
                                    }

                                    var _iteratorNormalCompletion4 = true;
                                    var _didIteratorError4 = false;
                                    var _iteratorError4 = undefined;

                                    try {
                                        for (var _iterator4 = elems.splice(tempIndex, 1 + prevIndex - tempIndex)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                            var _el = _step4.value;

                                            on(_el);
                                        }
                                    } catch (err) {
                                        _didIteratorError4 = true;
                                        _iteratorError4 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                                _iterator4.return();
                                            }
                                        } finally {
                                            if (_didIteratorError4) {
                                                throw _iteratorError4;
                                            }
                                        }
                                    }

                                    balance();
                                    needle = needle.replace(word, '');
                                    break;
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }

                    function fuzzy() {
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = needle[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var input = _step5.value;

                                while (elems.length) {
                                    var _el2 = elems.shift();
                                    if ((_el2.innerText || _el2.textContent) === input) {
                                        on(_el2);
                                        break;
                                    } else {
                                        off(_el2);
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }
                    }

                    function clearRemainder() {
                        while (elems.length) {
                            off(elems.shift());
                        }
                    }

                    function on(ch) {
                        ch.classList.add('sey-char-highlight');
                    }

                    function off(ch) {
                        ch.classList.remove('sey-char-highlight');
                    }
                }

                function getTextChildren(el) {
                    var texts = [];
                    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
                    var node = void 0;
                    while (node = walker.nextNode()) {
                        texts.push(node);
                    }
                    return texts;
                }

                function set(value) {
                    if (o.anchor) {
                        return (isText() ? api.appendText : api.appendHTML)(getValue(value));
                    }
                    userSet(value);
                }

                function filter(value, suggestion) {
                    if (o.anchor) {
                        var il = (isText() ? api.filterAnchoredText : api.filterAnchoredHTML)(value, suggestion);
                        return il ? userFilter(il.input, il.suggestion) : false;
                    }
                    return userFilter(value, suggestion);
                }

                function isText() {
                    return isInput(attachment);
                }

                function visible() {
                    return container.className.indexOf('sey-show') !== -1;
                }

                function hidden(li) {
                    return li.className.indexOf('sey-hide') !== -1;
                }

                function show() {
                    eye.refresh();
                    if (!visible()) {
                        container.className += ' sey-show';
                        _crossvent2.default.fabricate(attachment, 'horsey-show');
                    }
                }

                function toggler(e) {
                    var left = e.which === 1 && !e.metaKey && !e.ctrlKey;
                    if (left === false) {
                        return; // we only care about honest to god left-clicks
                    }
                    toggle();
                }

                function toggle() {
                    if (!visible()) {
                        show();
                    } else {
                        hide();
                    }
                }

                function select(li) {
                    unselect();
                    if (li) {
                        selection = li;
                        selection.className += ' sey-selected';
                    }
                }

                function unselect() {
                    if (selection) {
                        selection.className = selection.className.replace(/ sey-selected/g, '');
                        selection = null;
                    }
                }

                function move(up, moves) {
                    var total = api.source.length;
                    if (total === 0) {
                        return;
                    }
                    if (moves > total) {
                        unselect();
                        return;
                    }
                    var cat = findCategory(selection) || categories.firstChild;
                    var first = up ? 'lastChild' : 'firstChild';
                    var last = up ? 'firstChild' : 'lastChild';
                    var next = up ? 'previousSibling' : 'nextSibling';
                    var prev = up ? 'nextSibling' : 'previousSibling';
                    var li = findNext();
                    select(li);

                    if (hidden(li)) {
                        move(up, moves ? moves + 1 : 1);
                    }

                    function findCategory(el) {
                        while (el) {
                            if (_sektor2.default.matchesSelector(el.parentElement, '.sey-category')) {
                                return el.parentElement;
                            }
                            el = el.parentElement;
                        }
                        return null;
                    }

                    function findNext() {
                        if (selection) {
                            if (selection[next]) {
                                return selection[next];
                            }
                            if (cat[next] && findList(cat[next])[first]) {
                                return findList(cat[next])[first];
                            }
                        }
                        return findList(categories[first])[first];
                    }
                }

                function hide() {
                    eye.sleep();
                    container.className = container.className.replace(/ sey-show/g, '');
                    unselect();
                    _crossvent2.default.fabricate(attachment, 'horsey-hide');
                    if (el.value === lastPrefix) {
                        el.value = '';
                    }
                }

                function keydown(e) {
                    var shown = visible();
                    var which = e.which || e.keyCode;
                    if (which === KEY_DOWN) {
                        if (anyInput && o.autoShowOnUpDown) {
                            show();
                        }
                        if (shown) {
                            move();
                            stop(e);
                        }
                    } else if (which === KEY_UP) {
                        if (anyInput && o.autoShowOnUpDown) {
                            show();
                        }
                        if (shown) {
                            move(true);
                            stop(e);
                        }
                    } else if (which === KEY_BACKSPACE) {
                        if (anyInput && o.autoShowOnUpDown) {
                            show();
                        }
                    } else if (shown) {
                        if (which === KEY_ENTER) {
                            if (selection) {
                                _crossvent2.default.fabricate(selection, 'click');
                            } else {
                                hide();
                            }
                            stop(e);
                        } else if (which === KEY_ESC) {
                            hide();
                            stop(e);
                        }
                    }
                }

                function stop(e) {
                    e.stopPropagation();
                    e.preventDefault();
                }

                function showNoResults() {
                    if (noneMatch) {
                        noneMatch.classList.remove('sey-hide');
                    }
                }

                function hideNoResults() {
                    if (noneMatch) {
                        noneMatch.classList.add('sey-hide');
                    }
                }

                function filtering() {
                    if (!visible()) {
                        return;
                    }
                    debouncedLoading(true);
                    _crossvent2.default.fabricate(attachment, 'horsey-filter');
                    var value = readInput();
                    if (!o.blankSearch && !value) {
                        hide();
                        return;
                    }
                    var nomatch = noMatches({ query: value });
                    var count = walkCategories();
                    if (count === 0 && nomatch && hasItems) {
                        showNoResults();
                    } else {
                        hideNoResults();
                    }
                    if (!selection) {
                        move();
                    }
                    if (!selection && !nomatch) {
                        hide();
                    }

                    function walkCategories() {
                        var category = categories.firstChild;
                        var count = 0;
                        while (category) {
                            var list = findList(category);
                            var partial = walkCategory(list);
                            if (partial === 0) {
                                category.classList.add('sey-hide');
                            } else {
                                category.classList.remove('sey-hide');
                            }
                            count += partial;
                            category = category.nextSibling;
                        }
                        return count;
                    }

                    function walkCategory(ul) {
                        var li = ul.firstChild;
                        var count = 0;
                        while (li) {
                            if (count >= limit) {
                                _crossvent2.default.fabricate(li, 'horsey-hide');
                            } else {
                                _crossvent2.default.fabricate(li, 'horsey-filter');
                                if (li.className.indexOf('sey-hide') === -1) {
                                    count++;
                                    if (highlighter) {
                                        highlight(li, value);
                                    }
                                }
                            }
                            li = li.nextSibling;
                        }
                        return count;
                    }
                }

                function deferredFilteringNoEnter(e) {
                    var which = e.which || e.keyCode;
                    if (which === KEY_ENTER) {
                        return;
                    }
                    deferredFiltering();
                }

                function deferredShow(e) {
                    var which = e.which || e.keyCode;
                    if (which === KEY_ENTER || which === KEY_TAB) {
                        return;
                    }
                    setTimeout(show, 0);
                }

                function autocompleteEventTarget(e) {
                    var target = e.target;
                    if (target === attachment) {
                        return true;
                    }
                    while (target) {
                        if (target === container || target === attachment) {
                            return true;
                        }
                        target = target.parentNode;
                    }
                }

                function hideOnBlur(e) {
                    var which = e.which || e.keyCode;
                    if (which === KEY_TAB) {
                        hide();
                    }
                }

                function hideOnClick(e) {
                    if (autocompleteEventTarget(e)) {
                        return;
                    }
                    hide();
                }

                function inputEvents(remove) {
                    var op = remove ? 'remove' : 'add';
                    if (eye) {
                        eye.destroy();
                        eye = null;
                    }
                    if (!remove) {
                        eye = (0, _bullseye2.default)(container, attachment, {
                            caret: anyInput && attachment.tagName !== 'INPUT',
                            context: o.appendTo
                        });
                        if (!visible()) {
                            eye.sleep();
                        }
                    }
                    if (remove || anyInput && doc.activeElement !== attachment) {
                        _crossvent2.default[op](attachment, 'focus', loading);
                    } else {
                        loading();
                    }
                    if (anyInput) {
                        _crossvent2.default[op](attachment, 'keypress', deferredShow);
                        _crossvent2.default[op](attachment, 'keypress', deferredFiltering);
                        _crossvent2.default[op](attachment, 'keydown', deferredFilteringNoEnter);
                        _crossvent2.default[op](attachment, 'paste', deferredFiltering);
                        _crossvent2.default[op](attachment, 'keydown', keydown);
                        if (o.autoHideOnBlur) {
                            _crossvent2.default[op](attachment, 'keydown', hideOnBlur);
                        }
                    } else {
                        _crossvent2.default[op](attachment, 'click', toggler);
                        _crossvent2.default[op](docElement, 'keydown', keydown);
                    }
                    if (o.autoHideOnClick) {
                        _crossvent2.default[op](doc, 'click', hideOnClick);
                    }
                    if (form) {
                        _crossvent2.default[op](form, 'submit', hide);
                    }
                }

                function destroy() {
                    inputEvents(true);
                    if (parent.contains(container)) {
                        parent.removeChild(container);
                    }
                }

                function defaultSetter(value) {
                    if (textInput) {
                        if (setAppends === true) {
                            el.value += ' ' + value;
                        } else {
                            el.value = value;
                        }
                    } else {
                        if (setAppends === true) {
                            el.innerHTML += ' ' + value;
                        } else {
                            el.innerHTML = value;
                        }
                    }
                }

                function defaultItemRenderer(li, suggestion) {
                    text(li, getText(suggestion));
                }

                function defaultCategoryRenderer(div, data) {
                    if (data.id !== 'default') {
                        var id = tag('div', 'sey-category-id');
                        div.appendChild(id);
                        text(id, data.id);
                    }
                }

                function defaultFilter(q, suggestion) {
                    var needle = q.toLowerCase();
                    var text = getText(suggestion) || '';
                    if ((0, _fuzzysearch2.default)(needle, text.toLowerCase())) {
                        return true;
                    }
                    var value = getValue(suggestion) || '';
                    if (typeof value !== 'string') {
                        return false;
                    }
                    return (0, _fuzzysearch2.default)(needle, value.toLowerCase());
                }

                function loopbackToAnchor(text, p) {
                    var result = '';
                    var anchored = false;
                    var start = p.start;
                    while (anchored === false && start >= 0) {
                        result = text.substr(start - 1, p.start - start + 1);
                        anchored = ranchorleft.test(result);
                        start--;
                    }
                    return {
                        text: anchored ? result : null,
                        start: start
                    };
                }

                function filterAnchoredText(q, suggestion) {
                    var position = (0, _sell2.default)(el);
                    var input = loopbackToAnchor(q, position).text;
                    if (input) {
                        return { input: input, suggestion: suggestion };
                    }
                }

                function appendText(value) {
                    var current = el.value;
                    var position = (0, _sell2.default)(el);
                    var input = loopbackToAnchor(current, position);
                    var left = current.substr(0, input.start);
                    var right = current.substr(input.start + input.text.length + (position.end - position.start));
                    var before = left + value + ' ';

                    el.value = before + right;
                    (0, _sell2.default)(el, { start: before.length, end: before.length });
                }

                function filterAnchoredHTML() {
                    throw new Error('Anchoring in editable elements is disabled by default.');
                }

                function appendHTML() {
                    throw new Error('Anchoring in editable elements is disabled by default.');
                }

                function findList(category) {
                    return (0, _sektor2.default)('.sey-list', category)[0];
                }
            }

            function isInput(el) {
                return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
            }

            function tag(type, className) {
                var el = doc.createElement(type);
                el.className = className;
                return el;
            }

            function defer(fn) {
                return function() {
                    setTimeout(fn, 0);
                };
            }

            function text(el, value) {
                el.innerText = el.textContent = value;
            }

            function isEditable(el) {
                var value = el.getAttribute('contentEditable');
                if (value === 'false') {
                    return false;
                }
                if (value === 'true') {
                    return true;
                }
                if (el.parentElement) {
                    return isEditable(el.parentElement);
                }
                return false;
            }

            module.exports = horsey;

        }, { "bullseye": 3, "contra/emitter": 7, "crossvent": 8, "fuzzysearch": 11, "hash-sum": 12, "lodash/debounce": 13, "sektor": 20, "sell": 29 }],
        2: [function(require, module, exports) {
            module.exports = function atoa(a, n) { return Array.prototype.slice.call(a, n); }

        }, {}],
        3: [function(require, module, exports) {
            'use strict';

            var crossvent = require('crossvent');
            var throttle = require('./throttle');
            var tailormade = require('./tailormade');

            function bullseye(el, target, options) {
                var o = options;
                var domTarget = target && target.tagName;

                if (!domTarget && arguments.length === 2) {
                    o = target;
                }
                if (!domTarget) {
                    target = el;
                }
                if (!o) { o = {}; }

                var destroyed = false;
                var throttledWrite = throttle(write, 30);
                var tailorOptions = { update: o.autoupdateToCaret !== false && update };
                var tailor = o.caret && tailormade(target, tailorOptions);

                write();

                if (o.tracking !== false) {
                    crossvent.add(window, 'resize', throttledWrite);
                }

                return {
                    read: readNull,
                    refresh: write,
                    destroy: destroy,
                    sleep: sleep
                };

                function sleep() {
                    tailorOptions.sleeping = true;
                }

                function readNull() { return read(); }

                function read(readings) {
                    var bounds = target.getBoundingClientRect();
                    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    if (tailor) {
                        readings = tailor.read();
                        return {
                            x: (readings.absolute ? 0 : bounds.left) + readings.x,
                            y: (readings.absolute ? 0 : bounds.top) + scrollTop + readings.y + 20
                        };
                    }
                    return {
                        x: bounds.left,
                        y: bounds.top + scrollTop
                    };
                }

                function update(readings) {
                    write(readings);
                }

                function write(readings) {
                    if (destroyed) {
                        throw new Error('Bullseye can\'t refresh after being destroyed. Create another instance instead.');
                    }
                    if (tailor && !readings) {
                        tailorOptions.sleeping = false;
                        tailor.refresh();
                        return;
                    }
                    var p = read(readings);
                    if (!tailor && target !== el) {
                        p.y += target.offsetHeight;
                    }
                    var context = o.context;
                    el.style.left = p.x + 'px';
                    el.style.top = (context ? context.offsetHeight : p.y) + 'px';
                }

                function destroy() {
                    if (tailor) { tailor.destroy(); }
                    crossvent.remove(window, 'resize', throttledWrite);
                    destroyed = true;
                }
            }

            module.exports = bullseye;

        }, { "./tailormade": 4, "./throttle": 5, "crossvent": 8 }],
        4: [function(require, module, exports) {
            (function(global) {
                'use strict';

                var sell = require('sell');
                var crossvent = require('crossvent');
                var seleccion = require('seleccion');
                var throttle = require('./throttle');
                var getSelection = seleccion.get;
                var props = [
                    'direction',
                    'boxSizing',
                    'width',
                    'height',
                    'overflowX',
                    'overflowY',
                    'borderTopWidth',
                    'borderRightWidth',
                    'borderBottomWidth',
                    'borderLeftWidth',
                    'paddingTop',
                    'paddingRight',
                    'paddingBottom',
                    'paddingLeft',
                    'fontStyle',
                    'fontVariant',
                    'fontWeight',
                    'fontStretch',
                    'fontSize',
                    'fontSizeAdjust',
                    'lineHeight',
                    'fontFamily',
                    'textAlign',
                    'textTransform',
                    'textIndent',
                    'textDecoration',
                    'letterSpacing',
                    'wordSpacing'
                ];
                var win = global;
                var doc = document;
                var ff = win.mozInnerScreenX !== null && win.mozInnerScreenX !== void 0;

                function tailormade(el, options) {
                    var textInput = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
                    var throttledRefresh = throttle(refresh, 30);
                    var o = options || {};

                    bind();

                    return {
                        read: readPosition,
                        refresh: throttledRefresh,
                        destroy: destroy
                    };

                    function noop() {}

                    function readPosition() { return (textInput ? coordsText : coordsHTML)(); }

                    function refresh() {
                        if (o.sleeping) {
                            return;
                        }
                        return (o.update || noop)(readPosition());
                    }

                    function coordsText() {
                        var p = sell(el);
                        var context = prepare();
                        var readings = readTextCoords(context, p.start);
                        doc.body.removeChild(context.mirror);
                        return readings;
                    }

                    function coordsHTML() {
                        var sel = getSelection();
                        if (sel.rangeCount) {
                            var range = sel.getRangeAt(0);
                            var needsToWorkAroundNewlineBug = range.startContainer.nodeName === 'P' && range.startOffset === 0;
                            if (needsToWorkAroundNewlineBug) {
                                return {
                                    x: range.startContainer.offsetLeft,
                                    y: range.startContainer.offsetTop,
                                    absolute: true
                                };
                            }
                            if (range.getClientRects) {
                                var rects = range.getClientRects();
                                if (rects.length > 0) {
                                    return {
                                        x: rects[0].left,
                                        y: rects[0].top,
                                        absolute: true
                                    };
                                }
                            }
                        }
                        return { x: 0, y: 0 };
                    }

                    function readTextCoords(context, p) {
                        var rest = doc.createElement('span');
                        var mirror = context.mirror;
                        var computed = context.computed;

                        write(mirror, read(el).substring(0, p));

                        if (el.tagName === 'INPUT') {
                            mirror.textContent = mirror.textContent.replace(/\s/g, '\u00a0');
                        }

                        write(rest, read(el).substring(p) || '.');

                        mirror.appendChild(rest);

                        return {
                            x: rest.offsetLeft + parseInt(computed['borderLeftWidth']),
                            y: rest.offsetTop + parseInt(computed['borderTopWidth'])
                        };
                    }

                    function read(el) {
                        return textInput ? el.value : el.innerHTML;
                    }

                    function prepare() {
                        var computed = win.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
                        var mirror = doc.createElement('div');
                        var style = mirror.style;

                        doc.body.appendChild(mirror);

                        if (el.tagName !== 'INPUT') {
                            style.wordWrap = 'break-word';
                        }
                        style.whiteSpace = 'pre-wrap';
                        style.position = 'absolute';
                        style.visibility = 'hidden';
                        props.forEach(copy);

                        if (ff) {
                            style.width = parseInt(computed.width) - 2 + 'px';
                            if (el.scrollHeight > parseInt(computed.height)) {
                                style.overflowY = 'scroll';
                            }
                        } else {
                            style.overflow = 'hidden';
                        }
                        return { mirror: mirror, computed: computed };

                        function copy(prop) {
                            style[prop] = computed[prop];
                        }
                    }

                    function write(el, value) {
                        if (textInput) {
                            el.textContent = value;
                        } else {
                            el.innerHTML = value;
                        }
                    }

                    function bind(remove) {
                        var op = remove ? 'remove' : 'add';
                        crossvent[op](el, 'keydown', throttledRefresh);
                        crossvent[op](el, 'keyup', throttledRefresh);
                        crossvent[op](el, 'input', throttledRefresh);
                        crossvent[op](el, 'paste', throttledRefresh);
                        crossvent[op](el, 'change', throttledRefresh);
                    }

                    function destroy() {
                        bind(true);
                    }
                }

                module.exports = tailormade;

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, { "./throttle": 5, "crossvent": 8, "seleccion": 27, "sell": 29 }],
        5: [function(require, module, exports) {
            'use strict';

            function throttle(fn, boundary) {
                var last = -Infinity;
                var timer;
                return function bounced() {
                    if (timer) {
                        return;
                    }
                    unbound();

                    function unbound() {
                        clearTimeout(timer);
                        timer = null;
                        var next = last + boundary;
                        var now = Date.now();
                        if (now > next) {
                            last = now;
                            fn();
                        } else {
                            timer = setTimeout(unbound, next - now);
                        }
                    }
                };
            }

            module.exports = throttle;

        }, {}],
        6: [function(require, module, exports) {
            'use strict';

            var ticky = require('ticky');

            module.exports = function debounce(fn, args, ctx) {
                if (!fn) { return; }
                ticky(function run() {
                    fn.apply(ctx || null, args || []);
                });
            };

        }, { "ticky": 30 }],
        7: [function(require, module, exports) {
            'use strict';

            var atoa = require('atoa');
            var debounce = require('./debounce');

            module.exports = function emitter(thing, options) {
                var opts = options || {};
                var evt = {};
                if (thing === undefined) { thing = {}; }
                thing.on = function(type, fn) {
                    if (!evt[type]) {
                        evt[type] = [fn];
                    } else {
                        evt[type].push(fn);
                    }
                    return thing;
                };
                thing.once = function(type, fn) {
                    fn._once = true; // thing.off(fn) still works!
                    thing.on(type, fn);
                    return thing;
                };
                thing.off = function(type, fn) {
                    var c = arguments.length;
                    if (c === 1) {
                        delete evt[type];
                    } else if (c === 0) {
                        evt = {};
                    } else {
                        var et = evt[type];
                        if (!et) { return thing; }
                        et.splice(et.indexOf(fn), 1);
                    }
                    return thing;
                };
                thing.emit = function() {
                    var args = atoa(arguments);
                    return thing.emitterSnapshot(args.shift()).apply(this, args);
                };
                thing.emitterSnapshot = function(type) {
                    var et = (evt[type] || []).slice(0);
                    return function() {
                        var args = atoa(arguments);
                        var ctx = this || thing;
                        if (type === 'error' && opts.throws !== false && !et.length) { throw args.length === 1 ? args[0] : args; }
                        et.forEach(function emitter(listen) {
                            if (opts.async) { debounce(listen, args, ctx); } else { listen.apply(ctx, args); }
                            if (listen._once) { thing.off(type, listen); }
                        });
                        return thing;
                    };
                };
                return thing;
            };

        }, { "./debounce": 6, "atoa": 2 }],
        8: [function(require, module, exports) {
            (function(global) {
                'use strict';

                var customEvent = require('custom-event');
                var eventmap = require('./eventmap');
                var doc = global.document;
                var addEvent = addEventEasy;
                var removeEvent = removeEventEasy;
                var hardCache = [];

                if (!global.addEventListener) {
                    addEvent = addEventHard;
                    removeEvent = removeEventHard;
                }

                module.exports = {
                    add: addEvent,
                    remove: removeEvent,
                    fabricate: fabricateEvent
                };

                function addEventEasy(el, type, fn, capturing) {
                    return el.addEventListener(type, fn, capturing);
                }

                function addEventHard(el, type, fn) {
                    return el.attachEvent('on' + type, wrap(el, type, fn));
                }

                function removeEventEasy(el, type, fn, capturing) {
                    return el.removeEventListener(type, fn, capturing);
                }

                function removeEventHard(el, type, fn) {
                    var listener = unwrap(el, type, fn);
                    if (listener) {
                        return el.detachEvent('on' + type, listener);
                    }
                }

                function fabricateEvent(el, type, model) {
                    var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
                    if (el.dispatchEvent) {
                        el.dispatchEvent(e);
                    } else {
                        el.fireEvent('on' + type, e);
                    }

                    function makeClassicEvent() {
                        var e;
                        if (doc.createEvent) {
                            e = doc.createEvent('Event');
                            e.initEvent(type, true, true);
                        } else if (doc.createEventObject) {
                            e = doc.createEventObject();
                        }
                        return e;
                    }

                    function makeCustomEvent() {
                        return new customEvent(type, { detail: model });
                    }
                }

                function wrapperFactory(el, type, fn) {
                    return function wrapper(originalEvent) {
                        var e = originalEvent || global.event;
                        e.target = e.target || e.srcElement;
                        e.preventDefault = e.preventDefault || function preventDefault() { e.returnValue = false; };
                        e.stopPropagation = e.stopPropagation || function stopPropagation() { e.cancelBubble = true; };
                        e.which = e.which || e.keyCode;
                        fn.call(el, e);
                    };
                }

                function wrap(el, type, fn) {
                    var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
                    hardCache.push({
                        wrapper: wrapper,
                        element: el,
                        type: type,
                        fn: fn
                    });
                    return wrapper;
                }

                function unwrap(el, type, fn) {
                    var i = find(el, type, fn);
                    if (i) {
                        var wrapper = hardCache[i].wrapper;
                        hardCache.splice(i, 1); // free up a tad of memory
                        return wrapper;
                    }
                }

                function find(el, type, fn) {
                    var i, item;
                    for (i = 0; i < hardCache.length; i++) {
                        item = hardCache[i];
                        if (item.element === el && item.type === type && item.fn === fn) {
                            return i;
                        }
                    }
                }

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, { "./eventmap": 9, "custom-event": 10 }],
        9: [function(require, module, exports) {
            (function(global) {
                'use strict';

                var eventmap = [];
                var eventname = '';
                var ron = /^on/;

                for (eventname in global) {
                    if (ron.test(eventname)) {
                        eventmap.push(eventname.slice(2));
                    }
                }

                module.exports = eventmap;

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {}],
        10: [function(require, module, exports) {
            (function(global) {

                var NativeCustomEvent = global.CustomEvent;

                function useNative() {
                    try {
                        var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
                        return 'cat' === p.type && 'bar' === p.detail.foo;
                    } catch (e) {}
                    return false;
                }

                /**
                 * Cross-browser `CustomEvent` constructor.
                 *
                 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
                 *
                 * @public
                 */

                module.exports = useNative() ? NativeCustomEvent :

                    // IE >= 9
                    'function' === typeof document.createEvent ? function CustomEvent(type, params) {
                        var e = document.createEvent('CustomEvent');
                        if (params) {
                            e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
                        } else {
                            e.initCustomEvent(type, false, false, void 0);
                        }
                        return e;
                    } :

                    // IE <= 8
                    function CustomEvent(type, params) {
                        var e = document.createEventObject();
                        e.type = type;
                        if (params) {
                            e.bubbles = Boolean(params.bubbles);
                            e.cancelable = Boolean(params.cancelable);
                            e.detail = params.detail;
                        } else {
                            e.bubbles = false;
                            e.cancelable = false;
                            e.detail = void 0;
                        }
                        return e;
                    }

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {}],
        11: [function(require, module, exports) {
            'use strict';

            function fuzzysearch(needle, haystack) {
                var tlen = haystack.length;
                var qlen = needle.length;
                if (qlen > tlen) {
                    return false;
                }
                if (qlen === tlen) {
                    return needle === haystack;
                }
                outer: for (var i = 0, j = 0; i < qlen; i++) {
                    var nch = needle.charCodeAt(i);
                    while (j < tlen) {
                        if (haystack.charCodeAt(j++) === nch) {
                            continue outer;
                        }
                    }
                    return false;
                }
                return true;
            }

            module.exports = fuzzysearch;

        }, {}],
        12: [function(require, module, exports) {
            'use strict';

            function pad(hash, len) {
                while (hash.length < len) {
                    hash = '0' + hash;
                }
                return hash;
            }

            function fold(hash, text) {
                var i;
                var chr;
                var len;
                if (text.length === 0) {
                    return hash;
                }
                for (i = 0, len = text.length; i < len; i++) {
                    chr = text.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0;
                }
                return hash < 0 ? hash * -2 : hash;
            }

            function foldObject(hash, o, seen) {
                return Object.keys(o).sort().reduce(foldKey, hash);

                function foldKey(hash, key) {
                    return foldValue(hash, o[key], key, seen);
                }
            }

            function foldValue(input, value, key, seen) {
                var hash = fold(fold(fold(input, key), toString(value)), typeof value);
                if (value === null) {
                    return fold(hash, 'null');
                }
                if (value === undefined) {
                    return fold(hash, 'undefined');
                }
                if (typeof value === 'object') {
                    if (seen.indexOf(value) !== -1) {
                        return fold(hash, '[Circular]' + key);
                    }
                    seen.push(value);
                    return foldObject(hash, value, seen);
                }
                return fold(hash, value.toString());
            }

            function toString(o) {
                return Object.prototype.toString.call(o);
            }

            function sum(o) {
                return pad(foldValue(0, o, '', []).toString(16), 8);
            }

            module.exports = sum;

        }, {}],
        13: [function(require, module, exports) {
            var isObject = require('./isObject'),
                now = require('./now'),
                toNumber = require('./toNumber');

            /** Used as the `TypeError` message for "Functions" methods. */
            var FUNC_ERROR_TEXT = 'Expected a function';

            /* Built-in method references for those with the same name as other `lodash` methods. */
            var nativeMax = Math.max,
                nativeMin = Math.min;

            /**
             * Creates a debounced function that delays invoking `func` until after `wait`
             * milliseconds have elapsed since the last time the debounced function was
             * invoked. The debounced function comes with a `cancel` method to cancel
             * delayed `func` invocations and a `flush` method to immediately invoke them.
             * Provide an options object to indicate whether `func` should be invoked on
             * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
             * with the last arguments provided to the debounced function. Subsequent calls
             * to the debounced function return the result of the last `func` invocation.
             *
             * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
             * on the trailing edge of the timeout only if the debounced function is
             * invoked more than once during the `wait` timeout.
             *
             * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
             * for details over the differences between `_.debounce` and `_.throttle`.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Function
             * @param {Function} func The function to debounce.
             * @param {number} [wait=0] The number of milliseconds to delay.
             * @param {Object} [options={}] The options object.
             * @param {boolean} [options.leading=false]
             *  Specify invoking on the leading edge of the timeout.
             * @param {number} [options.maxWait]
             *  The maximum time `func` is allowed to be delayed before it's invoked.
             * @param {boolean} [options.trailing=true]
             *  Specify invoking on the trailing edge of the timeout.
             * @returns {Function} Returns the new debounced function.
             * @example
             *
             * // Avoid costly calculations while the window size is in flux.
             * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
             *
             * // Invoke `sendMail` when clicked, debouncing subsequent calls.
             * jQuery(element).on('click', _.debounce(sendMail, 300, {
             *   'leading': true,
             *   'trailing': false
             * }));
             *
             * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
             * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
             * var source = new EventSource('/stream');
             * jQuery(source).on('message', debounced);
             *
             * // Cancel the trailing debounced invocation.
             * jQuery(window).on('popstate', debounced.cancel);
             */
            function debounce(func, wait, options) {
                var lastArgs,
                    lastThis,
                    maxWait,
                    result,
                    timerId,
                    lastCallTime,
                    lastInvokeTime = 0,
                    leading = false,
                    maxing = false,
                    trailing = true;

                if (typeof func != 'function') {
                    throw new TypeError(FUNC_ERROR_TEXT);
                }
                wait = toNumber(wait) || 0;
                if (isObject(options)) {
                    leading = !!options.leading;
                    maxing = 'maxWait' in options;
                    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
                    trailing = 'trailing' in options ? !!options.trailing : trailing;
                }

                function invokeFunc(time) {
                    var args = lastArgs,
                        thisArg = lastThis;

                    lastArgs = lastThis = undefined;
                    lastInvokeTime = time;
                    result = func.apply(thisArg, args);
                    return result;
                }

                function leadingEdge(time) {
                    // Reset any `maxWait` timer.
                    lastInvokeTime = time;
                    // Start the timer for the trailing edge.
                    timerId = setTimeout(timerExpired, wait);
                    // Invoke the leading edge.
                    return leading ? invokeFunc(time) : result;
                }

                function remainingWait(time) {
                    var timeSinceLastCall = time - lastCallTime,
                        timeSinceLastInvoke = time - lastInvokeTime,
                        result = wait - timeSinceLastCall;

                    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
                }

                function shouldInvoke(time) {
                    var timeSinceLastCall = time - lastCallTime,
                        timeSinceLastInvoke = time - lastInvokeTime;

                    // Either this is the first call, activity has stopped and we're at the
                    // trailing edge, the system time has gone backwards and we're treating
                    // it as the trailing edge, or we've hit the `maxWait` limit.
                    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
                        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
                }

                function timerExpired() {
                    var time = now();
                    if (shouldInvoke(time)) {
                        return trailingEdge(time);
                    }
                    // Restart the timer.
                    timerId = setTimeout(timerExpired, remainingWait(time));
                }

                function trailingEdge(time) {
                    timerId = undefined;

                    // Only invoke if we have `lastArgs` which means `func` has been
                    // debounced at least once.
                    if (trailing && lastArgs) {
                        return invokeFunc(time);
                    }
                    lastArgs = lastThis = undefined;
                    return result;
                }

                function cancel() {
                    lastInvokeTime = 0;
                    lastArgs = lastCallTime = lastThis = timerId = undefined;
                }

                function flush() {
                    return timerId === undefined ? result : trailingEdge(now());
                }

                function debounced() {
                    var time = now(),
                        isInvoking = shouldInvoke(time);

                    lastArgs = arguments;
                    lastThis = this;
                    lastCallTime = time;

                    if (isInvoking) {
                        if (timerId === undefined) {
                            return leadingEdge(lastCallTime);
                        }
                        if (maxing) {
                            // Handle invocations in a tight loop.
                            timerId = setTimeout(timerExpired, wait);
                            return invokeFunc(lastCallTime);
                        }
                    }
                    if (timerId === undefined) {
                        timerId = setTimeout(timerExpired, wait);
                    }
                    return result;
                }
                debounced.cancel = cancel;
                debounced.flush = flush;
                return debounced;
            }

            module.exports = debounce;

        }, { "./isObject": 15, "./now": 18, "./toNumber": 19 }],
        14: [function(require, module, exports) {
            var isObject = require('./isObject');

            /** `Object#toString` result references. */
            var funcTag = '[object Function]',
                genTag = '[object GeneratorFunction]';

            /** Used for built-in method references. */
            var objectProto = Object.prototype;

            /**
             * Used to resolve the
             * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
             * of values.
             */
            var objectToString = objectProto.toString;

            /**
             * Checks if `value` is classified as a `Function` object.
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is correctly classified,
             *  else `false`.
             * @example
             *
             * _.isFunction(_);
             * // => true
             *
             * _.isFunction(/abc/);
             * // => false
             */
            function isFunction(value) {
                // The use of `Object#toString` avoids issues with the `typeof` operator
                // in Safari 8 which returns 'object' for typed array and weak map constructors,
                // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
                var tag = isObject(value) ? objectToString.call(value) : '';
                return tag == funcTag || tag == genTag;
            }

            module.exports = isFunction;

        }, { "./isObject": 15 }],
        15: [function(require, module, exports) {
            /**
             * Checks if `value` is the
             * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
             * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
             *
             * @static
             * @memberOf _
             * @since 0.1.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is an object, else `false`.
             * @example
             *
             * _.isObject({});
             * // => true
             *
             * _.isObject([1, 2, 3]);
             * // => true
             *
             * _.isObject(_.noop);
             * // => true
             *
             * _.isObject(null);
             * // => false
             */
            function isObject(value) {
                var type = typeof value;
                return !!value && (type == 'object' || type == 'function');
            }

            module.exports = isObject;

        }, {}],
        16: [function(require, module, exports) {
            /**
             * Checks if `value` is object-like. A value is object-like if it's not `null`
             * and has a `typeof` result of "object".
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
             * @example
             *
             * _.isObjectLike({});
             * // => true
             *
             * _.isObjectLike([1, 2, 3]);
             * // => true
             *
             * _.isObjectLike(_.noop);
             * // => false
             *
             * _.isObjectLike(null);
             * // => false
             */
            function isObjectLike(value) {
                return !!value && typeof value == 'object';
            }

            module.exports = isObjectLike;

        }, {}],
        17: [function(require, module, exports) {
            var isObjectLike = require('./isObjectLike');

            /** `Object#toString` result references. */
            var symbolTag = '[object Symbol]';

            /** Used for built-in method references. */
            var objectProto = Object.prototype;

            /**
             * Used to resolve the
             * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
             * of values.
             */
            var objectToString = objectProto.toString;

            /**
             * Checks if `value` is classified as a `Symbol` primitive or object.
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is correctly classified,
             *  else `false`.
             * @example
             *
             * _.isSymbol(Symbol.iterator);
             * // => true
             *
             * _.isSymbol('abc');
             * // => false
             */
            function isSymbol(value) {
                return typeof value == 'symbol' ||
                    (isObjectLike(value) && objectToString.call(value) == symbolTag);
            }

            module.exports = isSymbol;

        }, { "./isObjectLike": 16 }],
        18: [function(require, module, exports) {
            /**
             * Gets the timestamp of the number of milliseconds that have elapsed since
             * the Unix epoch (1 January 1970 00:00:00 UTC).
             *
             * @static
             * @memberOf _
             * @since 2.4.0
             * @category Date
             * @returns {number} Returns the timestamp.
             * @example
             *
             * _.defer(function(stamp) {
             *   console.log(_.now() - stamp);
             * }, _.now());
             * // => Logs the number of milliseconds it took for the deferred invocation.
             */
            function now() {
                return Date.now();
            }

            module.exports = now;

        }, {}],
        19: [function(require, module, exports) {
            var isFunction = require('./isFunction'),
                isObject = require('./isObject'),
                isSymbol = require('./isSymbol');

            /** Used as references for various `Number` constants. */
            var NAN = 0 / 0;

            /** Used to match leading and trailing whitespace. */
            var reTrim = /^\s+|\s+$/g;

            /** Used to detect bad signed hexadecimal string values. */
            var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

            /** Used to detect binary string values. */
            var reIsBinary = /^0b[01]+$/i;

            /** Used to detect octal string values. */
            var reIsOctal = /^0o[0-7]+$/i;

            /** Built-in method references without a dependency on `root`. */
            var freeParseInt = parseInt;

            /**
             * Converts `value` to a number.
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to process.
             * @returns {number} Returns the number.
             * @example
             *
             * _.toNumber(3.2);
             * // => 3.2
             *
             * _.toNumber(Number.MIN_VALUE);
             * // => 5e-324
             *
             * _.toNumber(Infinity);
             * // => Infinity
             *
             * _.toNumber('3.2');
             * // => 3.2
             */
            function toNumber(value) {
                if (typeof value == 'number') {
                    return value;
                }
                if (isSymbol(value)) {
                    return NAN;
                }
                if (isObject(value)) {
                    var other = isFunction(value.valueOf) ? value.valueOf() : value;
                    value = isObject(other) ? (other + '') : other;
                }
                if (typeof value != 'string') {
                    return value === 0 ? value : +value;
                }
                value = value.replace(reTrim, '');
                var isBinary = reIsBinary.test(value);
                return (isBinary || reIsOctal.test(value)) ?
                    freeParseInt(value.slice(2), isBinary ? 2 : 8) :
                    (reIsBadHex.test(value) ? NAN : +value);
            }

            module.exports = toNumber;

        }, { "./isFunction": 14, "./isObject": 15, "./isSymbol": 17 }],
        20: [function(require, module, exports) {
            (function(global) {
                'use strict';

                var expando = 'sektor-' + Date.now();
                var rsiblings = /[+~]/;
                var document = global.document;
                var del = document.documentElement || {};
                var match = (
                    del.matches ||
                    del.webkitMatchesSelector ||
                    del.mozMatchesSelector ||
                    del.oMatchesSelector ||
                    del.msMatchesSelector ||
                    never
                );

                module.exports = sektor;

                sektor.matches = matches;
                sektor.matchesSelector = matchesSelector;

                function qsa(selector, context) {
                    var existed, id, prefix, prefixed, adapter, hack = context !== document;
                    if (hack) { // id hack for context-rooted queries
                        existed = context.getAttribute('id');
                        id = existed || expando;
                        prefix = '#' + id + ' ';
                        prefixed = prefix + selector.replace(/,/g, ',' + prefix);
                        adapter = rsiblings.test(selector) && context.parentNode;
                        if (!existed) { context.setAttribute('id', id); }
                    }
                    try {
                        return (adapter || context).querySelectorAll(prefixed || selector);
                    } catch (e) {
                        return [];
                    } finally {
                        if (existed === null) { context.removeAttribute('id'); }
                    }
                }

                function sektor(selector, ctx, collection, seed) {
                    var element;
                    var context = ctx || document;
                    var results = collection || [];
                    var i = 0;
                    if (typeof selector !== 'string') {
                        return results;
                    }
                    if (context.nodeType !== 1 && context.nodeType !== 9) {
                        return []; // bail if context is not an element or document
                    }
                    if (seed) {
                        while ((element = seed[i++])) {
                            if (matchesSelector(element, selector)) {
                                results.push(element);
                            }
                        }
                    } else {
                        results.push.apply(results, qsa(selector, context));
                    }
                    return results;
                }

                function matches(selector, elements) {
                    return sektor(selector, null, null, elements);
                }

                function matchesSelector(element, selector) {
                    return match.call(element, selector);
                }

                function never() { return false; }

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {}],
        21: [function(require, module, exports) {
            (function(global) {
                'use strict';

                var getSelection;
                var doc = global.document;
                var getSelectionRaw = require('./getSelectionRaw');
                var getSelectionNullOp = require('./getSelectionNullOp');
                var getSelectionSynthetic = require('./getSelectionSynthetic');
                var isHost = require('./isHost');
                if (isHost.method(global, 'getSelection')) {
                    getSelection = getSelectionRaw;
                } else if (typeof doc.selection === 'object' && doc.selection) {
                    getSelection = getSelectionSynthetic;
                } else {
                    getSelection = getSelectionNullOp;
                }

                module.exports = getSelection;

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, { "./getSelectionNullOp": 22, "./getSelectionRaw": 23, "./getSelectionSynthetic": 24, "./isHost": 25 }],
        22: [function(require, module, exports) {
            'use strict';

            function noop() {}

            function getSelectionNullOp() {
                return {
                    removeAllRanges: noop,
                    addRange: noop
                };
            }

            module.exports = getSelectionNullOp;

        }, {}],
        23: [function(require, module, exports) {
            (function(global) {
                'use strict';

                function getSelectionRaw() {
                    return global.getSelection();
                }

                module.exports = getSelectionRaw;

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {}],
        24: [function(require, module, exports) {
            (function(global) {
                'use strict';

                var rangeToTextRange = require('./rangeToTextRange');
                var doc = global.document;
                var body = doc.body;
                var GetSelectionProto = GetSelection.prototype;

                function GetSelection(selection) {
                    var self = this;
                    var range = selection.createRange();

                    this._selection = selection;
                    this._ranges = [];

                    if (selection.type === 'Control') {
                        updateControlSelection(self);
                    } else if (isTextRange(range)) {
                        updateFromTextRange(self, range);
                    } else {
                        updateEmptySelection(self);
                    }
                }

                GetSelectionProto.removeAllRanges = function() {
                    var textRange;
                    try {
                        this._selection.empty();
                        if (this._selection.type !== 'None') {
                            textRange = body.createTextRange();
                            textRange.select();
                            this._selection.empty();
                        }
                    } catch (e) {}
                    updateEmptySelection(this);
                };

                GetSelectionProto.addRange = function(range) {
                    if (this._selection.type === 'Control') {
                        addRangeToControlSelection(this, range);
                    } else {
                        rangeToTextRange(range).select();
                        this._ranges[0] = range;
                        this.rangeCount = 1;
                        this.isCollapsed = this._ranges[0].collapsed;
                        updateAnchorAndFocusFromRange(this, range, false);
                    }
                };

                GetSelectionProto.setRanges = function(ranges) {
                    this.removeAllRanges();
                    var rangeCount = ranges.length;
                    if (rangeCount > 1) {
                        createControlSelection(this, ranges);
                    } else if (rangeCount) {
                        this.addRange(ranges[0]);
                    }
                };

                GetSelectionProto.getRangeAt = function(index) {
                    if (index < 0 || index >= this.rangeCount) {
                        throw new Error('getRangeAt(): index out of bounds');
                    } else {
                        return this._ranges[index].cloneRange();
                    }
                };

                GetSelectionProto.removeRange = function(range) {
                    if (this._selection.type !== 'Control') {
                        removeRangeManually(this, range);
                        return;
                    }
                    var controlRange = this._selection.createRange();
                    var rangeElement = getSingleElementFromRange(range);
                    var newControlRange = body.createControlRange();
                    var el;
                    var removed = false;
                    for (var i = 0, len = controlRange.length; i < len; ++i) {
                        el = controlRange.item(i);
                        if (el !== rangeElement || removed) {
                            newControlRange.add(controlRange.item(i));
                        } else {
                            removed = true;
                        }
                    }
                    newControlRange.select();
                    updateControlSelection(this);
                };

                GetSelectionProto.eachRange = function(fn, returnValue) {
                    var i = 0;
                    var len = this._ranges.length;
                    for (i = 0; i < len; ++i) {
                        if (fn(this.getRangeAt(i))) {
                            return returnValue;
                        }
                    }
                };

                GetSelectionProto.getAllRanges = function() {
                    var ranges = [];
                    this.eachRange(function(range) {
                        ranges.push(range);
                    });
                    return ranges;
                };

                GetSelectionProto.setSingleRange = function(range) {
                    this.removeAllRanges();
                    this.addRange(range);
                };

                function createControlSelection(sel, ranges) {
                    var controlRange = body.createControlRange();
                    for (var i = 0, el, len = ranges.length; i < len; ++i) {
                        el = getSingleElementFromRange(ranges[i]);
                        try {
                            controlRange.add(el);
                        } catch (e) {
                            throw new Error('setRanges(): Element could not be added to control selection');
                        }
                    }
                    controlRange.select();
                    updateControlSelection(sel);
                }

                function removeRangeManually(sel, range) {
                    var ranges = sel.getAllRanges();
                    sel.removeAllRanges();
                    for (var i = 0, len = ranges.length; i < len; ++i) {
                        if (!isSameRange(range, ranges[i])) {
                            sel.addRange(ranges[i]);
                        }
                    }
                    if (!sel.rangeCount) {
                        updateEmptySelection(sel);
                    }
                }

                function updateAnchorAndFocusFromRange(sel, range) {
                    var anchorPrefix = 'start';
                    var focusPrefix = 'end';
                    sel.anchorNode = range[anchorPrefix + 'Container'];
                    sel.anchorOffset = range[anchorPrefix + 'Offset'];
                    sel.focusNode = range[focusPrefix + 'Container'];
                    sel.focusOffset = range[focusPrefix + 'Offset'];
                }

                function updateEmptySelection(sel) {
                    sel.anchorNode = sel.focusNode = null;
                    sel.anchorOffset = sel.focusOffset = 0;
                    sel.rangeCount = 0;
                    sel.isCollapsed = true;
                    sel._ranges.length = 0;
                }

                function rangeContainsSingleElement(rangeNodes) {
                    if (!rangeNodes.length || rangeNodes[0].nodeType !== 1) {
                        return false;
                    }
                    for (var i = 1, len = rangeNodes.length; i < len; ++i) {
                        if (!isAncestorOf(rangeNodes[0], rangeNodes[i])) {
                            return false;
                        }
                    }
                    return true;
                }

                function getSingleElementFromRange(range) {
                    var nodes = range.getNodes();
                    if (!rangeContainsSingleElement(nodes)) {
                        throw new Error('getSingleElementFromRange(): range did not consist of a single element');
                    }
                    return nodes[0];
                }

                function isTextRange(range) {
                    return range && range.text !== void 0;
                }

                function updateFromTextRange(sel, range) {
                    sel._ranges = [range];
                    updateAnchorAndFocusFromRange(sel, range, false);
                    sel.rangeCount = 1;
                    sel.isCollapsed = range.collapsed;
                }

                function updateControlSelection(sel) {
                    sel._ranges.length = 0;
                    if (sel._selection.type === 'None') {
                        updateEmptySelection(sel);
                    } else {
                        var controlRange = sel._selection.createRange();
                        if (isTextRange(controlRange)) {
                            updateFromTextRange(sel, controlRange);
                        } else {
                            sel.rangeCount = controlRange.length;
                            var range;
                            for (var i = 0; i < sel.rangeCount; ++i) {
                                range = doc.createRange();
                                range.selectNode(controlRange.item(i));
                                sel._ranges.push(range);
                            }
                            sel.isCollapsed = sel.rangeCount === 1 && sel._ranges[0].collapsed;
                            updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], false);
                        }
                    }
                }

                function addRangeToControlSelection(sel, range) {
                    var controlRange = sel._selection.createRange();
                    var rangeElement = getSingleElementFromRange(range);
                    var newControlRange = body.createControlRange();
                    for (var i = 0, len = controlRange.length; i < len; ++i) {
                        newControlRange.add(controlRange.item(i));
                    }
                    try {
                        newControlRange.add(rangeElement);
                    } catch (e) {
                        throw new Error('addRange(): Element could not be added to control selection');
                    }
                    newControlRange.select();
                    updateControlSelection(sel);
                }

                function isSameRange(left, right) {
                    return (
                        left.startContainer === right.startContainer &&
                        left.startOffset === right.startOffset &&
                        left.endContainer === right.endContainer &&
                        left.endOffset === right.endOffset
                    );
                }

                function isAncestorOf(ancestor, descendant) {
                    var node = descendant;
                    while (node.parentNode) {
                        if (node.parentNode === ancestor) {
                            return true;
                        }
                        node = node.parentNode;
                    }
                    return false;
                }

                function getSelection() {
                    return new GetSelection(global.document.selection);
                }

                module.exports = getSelection;

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, { "./rangeToTextRange": 26 }],
        25: [function(require, module, exports) {
            'use strict';

            function isHostMethod(host, prop) {
                var type = typeof host[prop];
                return type === 'function' || !!(type === 'object' && host[prop]) || type === 'unknown';
            }

            function isHostProperty(host, prop) {
                return typeof host[prop] !== 'undefined';
            }

            function many(fn) {
                return function areHosted(host, props) {
                    var i = props.length;
                    while (i--) {
                        if (!fn(host, props[i])) {
                            return false;
                        }
                    }
                    return true;
                };
            }

            module.exports = {
                method: isHostMethod,
                methods: many(isHostMethod),
                property: isHostProperty,
                properties: many(isHostProperty)
            };

        }, {}],
        26: [function(require, module, exports) {
            (function(global) {
                'use strict';

                var doc = global.document;
                var body = doc.body;

                function rangeToTextRange(p) {
                    if (p.collapsed) {
                        return createBoundaryTextRange({ node: p.startContainer, offset: p.startOffset }, true);
                    }
                    var startRange = createBoundaryTextRange({ node: p.startContainer, offset: p.startOffset }, true);
                    var endRange = createBoundaryTextRange({ node: p.endContainer, offset: p.endOffset }, false);
                    var textRange = body.createTextRange();
                    textRange.setEndPoint('StartToStart', startRange);
                    textRange.setEndPoint('EndToEnd', endRange);
                    return textRange;
                }

                function isCharacterDataNode(node) {
                    var t = node.nodeType;
                    return t === 3 || t === 4 || t === 8;
                }

                function createBoundaryTextRange(p, starting) {
                    var bound;
                    var parent;
                    var offset = p.offset;
                    var workingNode;
                    var childNodes;
                    var range = body.createTextRange();
                    var data = isCharacterDataNode(p.node);

                    if (data) {
                        bound = p.node;
                        parent = bound.parentNode;
                    } else {
                        childNodes = p.node.childNodes;
                        bound = offset < childNodes.length ? childNodes[offset] : null;
                        parent = p.node;
                    }

                    workingNode = doc.createElement('span');
                    workingNode.innerHTML = '&#feff;';

                    if (bound) {
                        parent.insertBefore(workingNode, bound);
                    } else {
                        parent.appendChild(workingNode);
                    }

                    range.moveToElementText(workingNode);
                    range.collapse(!starting);
                    parent.removeChild(workingNode);

                    if (data) {
                        range[starting ? 'moveStart' : 'moveEnd']('character', offset);
                    }
                    return range;
                }

                module.exports = rangeToTextRange;

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {}],
        27: [function(require, module, exports) {
            'use strict';

            var getSelection = require('./getSelection');
            var setSelection = require('./setSelection');

            module.exports = {
                get: getSelection,
                set: setSelection
            };

        }, { "./getSelection": 21, "./setSelection": 28 }],
        28: [function(require, module, exports) {
            (function(global) {
                'use strict';

                var getSelection = require('./getSelection');
                var rangeToTextRange = require('./rangeToTextRange');
                var doc = global.document;

                function setSelection(p) {
                    if (doc.createRange) {
                        modernSelection();
                    } else {
                        oldSelection();
                    }

                    function modernSelection() {
                        var sel = getSelection();
                        var range = doc.createRange();
                        if (!p.startContainer) {
                            return;
                        }
                        if (p.endContainer) {
                            range.setEnd(p.endContainer, p.endOffset);
                        } else {
                            range.setEnd(p.startContainer, p.startOffset);
                        }
                        range.setStart(p.startContainer, p.startOffset);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }

                    function oldSelection() {
                        rangeToTextRange(p).select();
                    }
                }

                module.exports = setSelection;

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, { "./getSelection": 21, "./rangeToTextRange": 26 }],
        29: [function(require, module, exports) {
            'use strict';

            var get = easyGet;
            var set = easySet;

            if (document.selection && document.selection.createRange) {
                get = hardGet;
                set = hardSet;
            }

            function easyGet(el) {
                return {
                    start: el.selectionStart,
                    end: el.selectionEnd
                };
            }

            function hardGet(el) {
                var active = document.activeElement;
                if (active !== el) {
                    el.focus();
                }

                var range = document.selection.createRange();
                var bookmark = range.getBookmark();
                var original = el.value;
                var marker = getUniqueMarker(original);
                var parent = range.parentElement();
                if (parent === null || !inputs(parent)) {
                    return result(0, 0);
                }
                range.text = marker + range.text + marker;

                var contents = el.value;

                el.value = original;
                range.moveToBookmark(bookmark);
                range.select();

                return result(contents.indexOf(marker), contents.lastIndexOf(marker) - marker.length);

                function result(start, end) {
                    if (active !== el) { // don't disrupt pre-existing state
                        if (active) {
                            active.focus();
                        } else {
                            el.blur();
                        }
                    }
                    return { start: start, end: end };
                }
            }

            function getUniqueMarker(contents) {
                var marker;
                do {
                    marker = '@@marker.' + Math.random() * new Date();
                } while (contents.indexOf(marker) !== -1);
                return marker;
            }

            function inputs(el) {
                return ((el.tagName === 'INPUT' && el.type === 'text') || el.tagName === 'TEXTAREA');
            }

            function easySet(el, p) {
                el.selectionStart = parse(el, p.start);
                el.selectionEnd = parse(el, p.end);
            }

            function hardSet(el, p) {
                var range = el.createTextRange();

                if (p.start === 'end' && p.end === 'end') {
                    range.collapse(false);
                    range.select();
                } else {
                    range.collapse(true);
                    range.moveEnd('character', parse(el, p.end));
                    range.moveStart('character', parse(el, p.start));
                    range.select();
                }
            }

            function parse(el, value) {
                return value === 'end' ? el.value.length : value || 0;
            }

            function sell(el, p) {
                if (arguments.length === 2) {
                    set(el, p);
                }
                return get(el);
            }

            module.exports = sell;

        }, {}],
        30: [function(require, module, exports) {
            var si = typeof setImmediate === 'function',
                tick;
            if (si) {
                tick = function(fn) { setImmediate(fn); };
            } else {
                tick = function(fn) { setTimeout(fn, 0); };
            }

            module.exports = tick;
        }, {}]
    }, {}, [1])(1)
});