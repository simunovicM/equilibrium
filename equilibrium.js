function PrepareDataForSubmit(data, prestr, arr) {
    if (!isFunction(data)) {
        if (arr == null)
            var arr = [];
        if (prestr == null) prestr = "";

        if (isDate(data))
            arr.push({ name: prestr, data: data.toString() });
        else if (typeof data !== 'object') {
            arr.push({ name: prestr, data: data });
        } else if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++)
                PrepareDataForSubmit(data[i], prestr + "[{0}]".formatUnicorn(i), arr);
        } else {
            for (var name in data)
                PrepareDataForSubmit(data[name], prestr.trim() == "" ? name : prestr + '.' + name, arr);
        }
    }
    return arr;
}
if (!window['AjaxPost'])
    function AjaxPost(url, data) {
        var onSuccess = EmptyFunction;
        var onError = EmptyFunction;
        var params = (typeof data == 'string') ? data : PrepareDataForSubmit(data).map(function (f) { return encodeURIComponent(f.name) + '=' + encodeURIComponent(f.data); }).join('&');
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3)
                if (xhr.status == 200)
                    onSuccess(JSON.parse(xhr.responseText, xhr.status));
                else
                    onError(xhr, xhr.statusText);
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);

        var retObj = { success: function (fn) { onSuccess = fn; return retObj; }, error: function (fn) { onError = fn; return retObj; } }

        return retObj;
    }
if (!window['AjaxGet'])
    function AjaxGet(url, data) {
        var onSuccess = EmptyFunction;
        var onError = EmptyFunction;
        var params = (typeof data == 'string') ? data : equilibrium.PropertiesToObjects(data).map(function (f) { return encodeURIComponent(f.name) + '=' + encodeURIComponent(f.value); }).join('&');

        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open("GET", (url + (IsStringNullOrEmpty(params) ? '' : ('?' + params))));
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3)
                if (xhr.status == 200)
                    onSuccess(JSON.parse(xhr.responseText, xhr.status));
                else
                    onError(xhr, xhr.statusText);
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();

        var retObj = { success: function (fn) { onSuccess = fn; return retObj; }, error: function (fn) { onError = fn; return retObj; } }

        return retObj;
    }
function SubmitDataThroughForm(url, data) {
    var form = document.createElement('form');
    form.action = url;
    form.method = 'post';
    form.style.display = 'none';
    InsertDataToForm(form, data);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}
function InsertDataToForm(form, data) {
    var submitData = PrepareDataForSubmit(data);
    for (var i = 0; i < submitData.length; i++) {
        var inp = document.createElement('input');
        inp.name = submitData[i].name;
        inp.value = submitData[i].data;
        form.appendChild(inp);
    }
    return form;
}
function async(fn, callback) {
    setTimeout(function () {
        fn();
        if (callback)
            callback();
    }, 0);
};
function RandomLetters(len) { return Math.random().toString(36).substring(len); }

var Encode = function () {
    var encodeDiv = document.createElement('div');
    return function (str) {
        if (IsStringNullOrEmpty(str)) return str;
        encodeDiv.textContent = str;
        return encodeDiv.innerHTML;
    }
}();
function EncodeWithQuota(str) {
    return Encode(str).replaceAll('"', '&quot;');
}
var isFunction = function (obj) { return (typeof obj === "function"); }
var isObject = function (obj) { return (typeof obj === "object"); }
var isDate = function (obj) { return obj instanceof Date; };

if (!IsStringNullOrEmpty)
    function IsStringNullOrEmpty(str) { return (!str || !str.trim()); }
if (!IsNotNullAndHasAny)
    function IsNotNullAndHasAny(f) { return f != null && f.length > 0; };
if (!Not)
    function Not(bln) { return !bln; };
if (!Sum)
    function Sum(num1, num2) { return num1 + num2; };
if (!Multiply)
    function Multiply(num1, num2) { return num1 * num2; };
if (!GetRange)
    function GetRange(from, to) {
        var rang = [];
        for (var i = from; i <= to; i++)
            rang.push(i);
        return rang;
    };

if (!DeepClone)
    function DeepClone(obj) {
        return FastClone.cloneArray([obj])[0];
    }
if (!DeepCloneArray)
    function DeepCloneArray(obj) {
        return FastClone.cloneArray(obj);
    }
if (!('find' in Array.prototype)) {
    Array.prototype.find = function (find, that /*opt*/) {
        var v;
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && find.call(that, v = this[i], i, this))
                return v;
        return null;
    };
}
// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf = function (find, i /*opt*/) {
        if (i === undefined) i = 0;
        if (i < 0) i += this.length;
        if (i < 0) i = 0;
        for (var n = this.length; i < n; i++)
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf = function (find, i /*opt*/) {
        if (i === undefined) i = this.length - 1;
        if (i < 0) i += this.length;
        if (i > this.length - 1) i = this.length - 1;
        for (i++; i-- > 0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function (action, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map = function (mapper, that /*opt*/) {
        var other = new Array(this.length);
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                other[i] = mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter = function (filter, that /*opt*/) {
        var other = [], v;
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && filter.call(that, v = this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every = function (tester, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some = function (tester, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}
if (!Array.prototype.findby) {
    Array.prototype.findby = function (prop, value) {
        if (prop == null)
            return this.find(function (f) { return f == value; });
        else
            return this.find(function (f) { return f[prop] == value; });
    }
}
if (!Array.prototype.filterby) {
    Array.prototype.filterby = function (prop, value) {
        if (prop == null)
            return this.filter(function (f) { return f == value; });
        else
            return this.filter(function (f) { return f[prop] == value; });
    }
}
if (!Array.prototype.sortby) {
    Array.prototype.sortby = function (prop, sortfnc) {
        if (sortfnc == null)
            sortfnc = function (f, g) { return f > g; };
        var propfnc = prop;
        var propfnc = (isFunction(prop) ? prop : function (f) { return f[prop]; });

        var retdata = this.map(function (f) { return f; });
        for (var i = 0; i < retdata.length - 1; i++)
            for (var j = i + 1; j < retdata.length; j++)
                if (sortfnc(propfnc(retdata[i]), propfnc(retdata[j]))) {
                    var temp = retdata[i];
                    retdata[i] = retdata[j];
                    retdata[j] = temp;
                };
        return retdata;
    }
}
if (!('pushMany' in Array.prototype)) {
    Array.prototype.pushMany = function (arr) {
        var self = this;
        arr.forEach(function (f) { self.push(f); });
        return self;
    };
}
if (!Array.prototype.remove) {
    Array.prototype.remove = function (dat) {
        var ind = this.indexOf(dat);
        this.splice(ind, 1);
        return this;
    }
}
if (!Array.prototype.last) {
    Array.prototype.last = function (prop) {
        return this[this.length - 1];
    }
}
if (!Array.prototype.distinct) {
    Array.prototype.distinct = function () {
        return this.filter(function (value, index, self) { return self.indexOf(value) === index; });
    };
}
if (!Array.prototype.mapmany)
    Array.prototype.mapmany = function (mapper) {
        return this.reduce(function (prev, curr, i) {
            return prev.concat(mapper(curr));
        }, []);
    };
if (!Array.prototype.max)
    Array.prototype.max = function (property) {
        var mapped = (property == null) ? this.map(function (f) { return f; }) : this.map(function (f) { return f[property]; });
        return mapped.sort().last();
    };
if (!Array.prototype.first)
    Array.prototype.first = function () {
        return this[0];
    };
if (!Array.prototype.firstOrDefault)
    Array.prototype.firstOrDefault = function () {
        return this.length == 0 ? null : this.first();
    };
if (!Array.prototype.last)
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
if (!Array.prototype.lastOrDefault)
    Array.prototype.lastOrDefault = function () {
        return this.length == 0 ? null : this.last();
    };
if (!('startsWith' in String.prototype))
    String.prototype.startsWith = function (searchStr, position) {
        searchStr = searchStr.toString();
        return this.substr(position || 0, searchStr.length) === searchStr;
    };

if (!('endsWith' in String.prototype))
    String.prototype.endsWith = function (searchStr, Position) {
        searchStr = searchStr.toString();
        if (!(Position < this.length))
            Position = this.length;
        else
            Position |= 0; // round position
        return this.substr(Position - searchStr.length,
                           searchStr.length) === searchStr;
    };
if (!Array.prototype.groupBy)
    Array.prototype.groupBy = function (prop) {
        var propFnc = (!isFunction(prop)) ? function (f) { return f[prop]; } : prop;
        return this.reduce(function (groups, item) {
            var val = propFnc(item);
            var find = groups.find(function (f) { return f.key == val; });
            if (find != null)
                find.items.push(item);
            else
                groups.push({ key: val, items: [item] });
            return groups;
        }, []);
    };
if (!Array.prototype.unique)
    Array.prototype.unique = function (propFnc) {
        return this.groupBy(propFnc)
        .filter(function (f) { return f != null })
        .map(function (f) { return f.items.first(); });
    };

if (!('head' in Array.prototype)) {
    Array.prototype.head = function () {
        var self = this;
        return self.filter(function (f, ind) { return ind < self.length - 1 });
    };
}
if (!('tail' in Array.prototype)) {
    Array.prototype.tail = function () {
        var self = this;
        return self.filter(function (f, ind) { return ind > 0 });
    };
}
if (!('takeFromTo' in Array.prototype)) {
    Array.prototype.takeFromTo = function (from, to) {
        var self = this;
        return self.filter(function (f, ind) { return ind >= from && ind <= to });
    };
}
if (!('any' in Array.prototype)) {
    Array.prototype.any = function (fnc) {
        var self = this;
        if (fnc == null) return self.length > 0;
        return self.find(fnc) != null;
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}
String.prototype.replaceAll = String.prototype.replaceAll ||
    function (fromString, toString) {
        return this.replace(new RegExp(escapeRegExp(fromString), 'g'), toString);
    };
String.prototype.replaceWords = String.prototype.replaceWords ||
    function (fromString, toString) {
        return this.replace(new RegExp('\\b' + escapeRegExp(fromString) + '\\b', 'g'), toString);
    };
String.prototype.toggle = String.prototype.toggle ||
    function (word, bln) {
        var reg = new RegExp('\\b' + escapeRegExp(word) + '\\b', 'g');
        if (bln == null)
            bln = !(reg.test(this));

        if (bln)
            return reg.test(this) ? this : this.trim() + ' ' + word;
        else
            return this.replaceWords(word, '').split(' ').filter(function (f) { return !IsStringNullOrEmpty(f); }).join(' ');
    };
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
    function () {
        "use strict";
        var str = this.toString();
        if (arguments.length) {
            var t = typeof arguments[0];
            var key;
            var args = ("string" === t || "number" === t) ?
                Array.prototype.slice.call(arguments)
                : arguments[0];

            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }

        return str;
    };
if (!HashCode)
    function HashCode(obj) {
        var str = (typeof obj === 'object') ? JSON.stringify(obj) : obj;
        var hash = 0;
        if (str.length == 0) return hash;
        for (var i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

Number.prototype.RangeTo = function (intTo) {
    if (isNaN(intTo))
        return;
    var intFrom = parseInt(this);
    var step = intFrom <= intTo ? 1 : -1;
    var ret = [];
    do {
        ret.push(intFrom);
        if (intFrom == intTo)
            break;
        intFrom += step;
    } while (true);
    return ret;
}

if (!Element.prototype.insertBeforeCustom)
    Element.prototype.insertBeforeCustom = function insertBeforeCustom(insertEl, previousEl) {
        var sels = [insertEl].pushMany(equilibrium.GetAllChildrens(insertEl)).filter(function (f) { return f.tagName == 'SELECT'; }).map(function (f) { return { obj: f, selectedIndex: f.selectedIndex } });
        this.insertBefore(insertEl, previousEl);
        sels.forEach(function (f) { f.obj.selectedIndex = f.selectedIndex; });
    }
if (!Element.prototype.after)
    Element.prototype.after = function after() {
        var argArr = Array.prototype.slice.call(arguments),
		docFrag = document.createDocumentFragment();

        var sels = argArr.filter(function (f) { return f.tagName == 'SELECT'; }).map(function (f) { return { obj: f, selectedIndex: f.selectedIndex } });

        argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.parentNode.insertBefore(docFrag, this.nextSibling);

        sels.forEach(function (f) { f.obj.selectedIndex = f.selectedIndex; });
    }
if (!Element.prototype.replaceWith)
    Element.prototype.replaceWith = Element.prototype.replaceNode;

if (!Node.prototype.after)
    Node.prototype.after = Element.prototype.after;
if (!Node.prototype.replaceWith)
    Node.prototype.replaceWith = function ReplaceWith(Ele) {
        'use-strict'; // For safari, and IE > 10
        var parent = this.parentNode,
            i = arguments.length,
            firstIsNode = +(parent && typeof Ele === 'object');
        if (!parent) return;

        while (i-- > firstIsNode) {
            if (parent && typeof arguments[i] !== 'object') {
                arguments[i] = document.createTextNode(arguments[i]);
            }
            if (!parent && arguments[i].parentNode) {
                arguments[i].parentNode.removeChild(arguments[i]);
                continue;
            }
            parent.insertBeforeCustom(this.previousSibling, arguments[i]);
        }
        if (firstIsNode) parent.replaceChild(Ele, this);
    };

var equilibrium = equilibrium || new Object();
equilibrium.DataSubject = function () {
    var observers = [];

    this.AddObserver = function (observer) {
        observers.push(observer);
        // observer.Parent = equilibrium.CopyAllProperties(this);
        observer.Subject = this;
    }
    this.RemoveObserver = function (observer) {
        var index = observers.indexOf(observer);
        observers.splice(index, 1);
    }
    this.GetAllObservers = function () { return observers; }
    var drawCount = 0;
    this.Notify = function () {
        drawCount++;
        this.GetDrawCount = function () { return drawCount; };
        var subject = this;
        observers.forEach(function (f) { f.Update(subject); });
    };
    this.Bind = function (element) {
        equilibrium.Bind(this, element);
        return this;
    };
}
equilibrium.SimpleObserver = function (fn) {
    var fn = fn;
    this.Update = function (data) {
        fn();
    }
}
equilibrium.HistoryObserver = function (maxObservings) {
    var historyData = [];
    var historyIndex = -1;
    var lastSaved;
    this.Update = function (dat) {
        var histDat = DeepClone(equilibrium.CopyJustProperties(this.Subject));
        if (historyIndex >= 0 && HashCode(histDat) == HashCode(historyData[historyIndex]))
            return;
        if (historyIndex < 0 || lastSaved == null || Date.now() - lastSaved > 100) {
            historyData = DeleteHistoryDataAfterIndex(historyData, historyIndex);
            historyData.push(histDat);
            historyData = DeleteIfMoreThenMax(historyData, maxObservings);
            historyIndex = historyData.length - 1;
        }
        else
            historyData[historyIndex] = histDat;
        lastSaved = Date.now();
    };
    this.GetAllData = function () { return { historyData: historyData, historyIndex: historyIndex }; };
    this.RestoreHistoryData = function (data) { historyData = DeepCloneArray(data.historyData); historyIndex = data.historyIndex; if (this.Subject != null) this.HistoryGo(0); };
    this.HistoryGo = function (ind) { historyIndex += ind; this.Subject = equilibrium.DeleteJustProperties(this.Subject); return equilibrium.CopyAllProperties(DeepClone(historyData[historyIndex]), this.Subject); }
    this.CanGo = function (step) { return historyIndex + step >= 0 && historyIndex + step < historyData.length; };
    var DeleteHistoryDataAfterIndex = function (historyData, index) {
        return historyData.filter(function (f, ind) { return ind <= index; });
    };
    var DeleteIfMoreThenMax = function (historyData, maxObservings) {
        return historyData.filter(function (f, ind) { return ind >= historyData.length - maxObservings; });
    };
};

equilibrium.docFragment = document.createDocumentFragment();
equilibrium.RepeatObserver = function (comment, drawfnc) {
    this.FilterFunctions = [];
    this.SortFunctions = [];
    var observer = this;
    this.Subject = null;
    this.RepeatProperty = '';
    this.RepeatPropertyShort = '';
    this.DrawedElements = [];
    this.StepAtTime = 0;
    var templateElement = drawfnc();
    this.Order = 0;

    this.Update = function () {
        observer.Redraw();
    }
    this.Redraw = function () {
        var repeatPropertyShort = observer.RepeatPropertyShort;
        var subject = observer.Subject;
        var drawCount = subject.GetDrawCount();

        var arrData = observer.FilteredData(subject);
        if (arrData) {
            var DrawedElements = observer.DrawedElements;
            var newObservers = [];
            var drawedElements = [];

            for (var i = DrawedElements.length - 1; i >= arrData.length; i--) {
                backupOfElementObserver.push(DrawedElements[i]);
                var el = DrawedElements[i].last().LastDrawedElement();
                if (el.parentNode) el.parentNode.removeChild(el);
                DrawedElements.splice(i, 1);
            };
            arrData.forEach(function (dat, index) {
                var observers = null;
                if (DrawedElements.length > index)
                    observers = DrawedElements[index];
                else {
                    var newEl = CreateElementWithObservers();
                    drawedElements.push(newEl.element);
                    newObservers.push(newEl.observers.sortby('Order'));
                    observers = newEl.observers;
                };
                var additionals = new Object();
                if (observer.additionals != null)
                    equilibrium.CopyAllProperties(observer.additionals, additionals);
                additionals[repeatPropertyShort] = dat;
                additionals.index = index;
                observers.forEach(function (f) { equilibrium.SetAdditionals(f, additionals); });
            });
            var afterElement = (observer.DrawedElements.length == 0) ? comment : observer.DrawedElements[observer.DrawedElements.length - 1].last().LastDrawedElement();

            observer.DrawedElements = observer.DrawedElements.concat(newObservers);
            if (observer.StepAtTime == 0) {
                var parent = comment.parentNode;

                if (observer.isOnMainBind)
                    parent.className = parent.className.toggle('displayNoneClass', true);

                observer.DrawedElements.forEach(function (f) { f.forEach(function (g) { g.Update(); }); });

                var nextSibling = afterElement.nextSibling;
                drawedElements.forEach(function (f) {
                    parent.insertBeforeCustom(f, nextSibling);
                });

                if (observer.isOnMainBind) {
                    parent.className = parent.className.toggle('displayNoneClass', false);
                }
            } else {
                var starttime = Date.now();
                var parent = comment.parentNode;

                var childs = equilibrium.ToArray(parent.childNodes);
                var commentIndex = childs.indexOf(comment);

                var afters = childs.filter(function (f, ind) { return ind > commentIndex && f.className != null; });

                 parent.className = parent.className.toggle('displayNoneClass', true);
                 for (var i = afters.length - 1; i >= 0; i--)
                     afters[i].className = afters[i].className.toggle('displayNoneClass', true);

                var nextSibling = afterElement.nextSibling;
                 parent.className = parent.className.toggle('displayNoneClass', false);

                var start = 1 - observer.StepAtTime;
                var forDrawing = function () { return observer.DrawedElements.filter(function (f, ind) { return ind >= start && ind < start + observer.StepAtTime; }); };
                var drawer = function () {
                    var draws = forDrawing();
                    draws.forEach(function (f) { f.forEach(function (g) { g.Update(); }); });
                    if (draws.length > 0) {
                        var el = draws.last().last().element;
                        if (el.parentElement == null)
                            parent.insertBeforeCustom(el, nextSibling);
                    }
                };
                var callback = function () {
                    start += observer.StepAtTime; drawFewElements();
                };
                var drawFewElements = function () {
                    if (drawCount != subject.GetDrawCount())
                        return;
                    if (IsNotNullAndHasAny(forDrawing()))
                        async(drawer, callback);
                    else {
                         afters.forEach(function (f) { f.className = f.className.toggle('displayNoneClass', false); });
                    };
                };
                drawer();
                drawFewElements();
            };
        }
    }
    this.FilteredData = function () {
        var subject = this.Subject;
        var additionals = this.additionals;
        var filtered = observer.RepeatFnc(subject, this.additionals);

        if (observer.SortFnc)
            filtered = observer.SortFnc(subject, additionals)(filtered);

        var addits = equilibrium.CopyAllProperties(additionals);
        if (observer.FilterFnc != null) {
            filtered = filtered.filter(function (f, ind) {
                addits[observer.RepeatPropertyShort] = f;
                addits.index = ind;
                return observer.FilterFnc(subject, addits);
            });
        }
        return filtered;
    }
    this.LastDrawedElement = function () { return (observer.DrawedElements.length == 0) ? comment : observer.DrawedElements[observer.DrawedElements.length - 1].LastDrawedElement() };
    this.RemoveAll = function () { comment.parentElement.removeChild(comment); observer.DrawedElements.forEach(function (f) { f.forEach(function (g) { g.RemoveAll(); }); }); comment = null; observer.DrawedElements = null; };
    this.TopParentObserver = function () { return (observer.ParentObserver == null) ? observer : observer.ParentObserver.TopParentObserver(); };

    var backupOfElementObserver = [];
    var CreateElementWithObservers = function () {
        var observers = null;
        var element = null;
        if (backupOfElementObserver.length > 0) {
            observers = backupOfElementObserver[0];
            element = observers.last().LastDrawedElement();
            backupOfElementObserver.splice(0, 1);
        } else {
            observers = [];
            element = equilibrium.CloneElement(templateElement);
            equilibrium.GetAllChildrens(element).filter(function (f) { return f.replaceFnc != null }).forEach(function (f) {
                var obs;
                if (f.RepeatPropertyShort != null) {
                    obs = equilibrium.CreateRepeatObserverFromElement(f);
                }
                else {
                    obs = new equilibrium.ElementObserver(f);
                };
                observers.push(obs);
            });

            observers.push(new equilibrium.ElementObserver(element));
        };
        observers.forEach(function (f) {
            f.ParentCollection = observers;
            f.ParentObserver = observer;
        });

        return { element: element, observers: observers };
    };
}
equilibrium.ElementObserver = function (element) {
    var observer = this;
    this.ParentObserver = null;
    this.IfControl = element;
    this.Order = 1;
    this.element = element;

    this.Update = function () {
        observer.Redraw();
    }

    var isFirstTime = true;
    this.Redraw = function () {
        var scope = this.Subject;
        var additionals = this.additionals;

        equilibrium.ReplaceScopeValues(element, scope, additionals);
        equilibrium.ChangePropValues(element, scope, additionals);
        if (isFirstTime) {
            equilibrium.BindOnValues(element, observer);
            isFirstTime = false;
        }
    }
    this.LastDrawedElement = function () { return element; };
    this.RemoveAll = function () { element.parentNode.removeChild(element); element = null; };
    this.TopParentObserver = function () { return (observer.ParentObserver == null) ? observer : observer.ParentObserver.TopParentObserver(); };
}

equilibrium.CreateReadFncString = function (string, shouldAddProp) {
    if (string == 'null') return null;
    if (equilibrium.propertyIsStringBoolNumberOrArray(string)) {
        if (equilibrium.propertyIsString(string)) {
            var val = equilibrium.ValueOfProperty(string);
            if (val == null)
                return string;
            else
                return val.input.substring(0, val.index) + val.input[0] + ' + ' + equilibrium.CreateReadFncString(val[0].substring(2, val[0].length - 2), shouldAddProp) + ' + ' + equilibrium.CreateReadFncString(val.input[0] + val.input.substring(val.index + val[0].length), shouldAddProp);
        } else return string;
    }

    var spl = equilibrium.splitParameters(string, ',').map(function (f) { return f.trim(); }).filter(IsNotNullAndHasAny);
    if (spl.length == 1) {
        var str = spl.first();

        var fncPart = equilibrium.FindFunctionsAndArrays(str);
        if (fncPart == null) {
            var pattern = 'try {\n\t{0}\n} catch(err) {\n\t{1}\n}';
            return '(function() {' + pattern.formatUnicorn('var par = additionals.' + str + '; if (par !== undefined) return par; throw "";', pattern.formatUnicorn('var par = scope.' + str + '; if (par !== undefined) return par; throw "";', pattern.formatUnicorn('return window.' + str + ';', (shouldAddProp != null ? 'scope.' + str + ' = null; return null;' : '')))) + ' })()';
        } else {
            var parts = equilibrium.splitParameters(str, '.').map(function (f) {
                return { fncArr: equilibrium.FindFunctionsAndArrays(f), full: f };
            });
            var parameters = parts.filter(function (f) { return f.fncArr != null; })
                .mapmany(function (f) { return f.fncArr.pars.mapmany(function (g) { return g.parameters; }); });
            var parsStr = parameters.map(function (f, ind) { f.index = ind; return 'var par' + ind + ' = ' + equilibrium.CreateReadFncString(f.Name, shouldAddProp) + ';'; }).join('\n');

            var fncStr = parts.map(function (f) { return f.fncArr == null ? f.full : (f.fncArr.name + f.fncArr.pars.map(function (g) { return g.open + g.parameters.map(function (h) { return 'par' + h.index; }).join(',') + g.close; }).join('')) }).join('.');
            var fncNameFirst = parts.first().fncArr != null ? parts.first().fncArr.name : parts.first().full;

            var fncStr = ['additionals', 'scope', 'window'].map(function (f) { return 'if (equilibrium.scopeHasProperty(' + f + ', \'' + fncNameFirst + '\')) return ' + f + '.' + fncStr + ';' }).join('\n');
            fncStr += '\n throw \'Could not find ' + string.replaceAll('\'', '\\\'') + '\'';
            return '( function(){\n' + parsStr + '\n' + fncStr + '})\n();';
        }
    } else if (spl.length > 1) {
        return spl.map(function (f) { return equilibrium.CreateReadFncString(f, shouldAddProp); }).join(',');
    }
    return "";
}
equilibrium.CreateWriteString = function (string, valName) {
    var spl = equilibrium.splitParameters(string, '.');
    var head = spl[0];

    var fncArrPart = equilibrium.FindFunctionsAndArrays(head);
    if (fncArrPart) head = fncArrPart.name;
    return ['additionals', 'scope', 'window'].map(function (scopeName) { return 'if (equilibrium.scopeHasProperty(' + scopeName + ',\'' + head + '\')) ' + scopeName + '.' + string + ' = ' + valName + ';' }).join('\nelse ') + '\nelse scope.' + string + ' = ' + valName + ';';
}
equilibrium.CreateWriteFncString = function (string, prop) {
    var insertFnc = function (scopeName) {
        return '\nif (equilibrium.scopeHasProperty(' + scopeName + ',\'' + string + '\')) {\n\tif (' + scopeName + '.' + string + ' != value) { ' + scopeName + '.' + string + ' = value; scope.Notify(); }}';
    };
    var spl = equilibrium.splitParameters(string, '.');
    var head = spl.head().join('.');
    var valStr = 'var value = additionals.this[\'' + prop + '\'];';
    if (IsStringNullOrEmpty(head))
        return valStr + '\n' + insertFnc('additionals') + '\nelse' + insertFnc('scope') + '\nelse' + insertFnc('window') + ' \nelse { scope.' + string + ' = value; scope.Notify(); }';
    return valStr + '\n' + equilibrium.CreateReadFncString(head) + '.' + spl.last() + ' = value; scope.Notify();';
}
equilibrium.CreateReplaceFncString = function (string) {
    var pars = [];
    do {
        var count = 0;
        var val = equilibrium.ValueOfProperty(string);
        if (val != null) {
            if (val.index > 0)
                pars.push('\n\tparameters[\'par' + pars.length + '\'] = \'' + val.input.substring(0, val.index).replaceAll('\'', '\\\'') + '\';');
            pars.push('\n\tparameters[\'par' + pars.length + '\'] = ' + equilibrium.CreateReadFncString(val[1]) + ';');
            string = string.substring(val.index + val[0].length);
        } else {
            if (pars.length > 0)
                if (string.length > 0)
                    pars.push('\n\tparameters[\'par' + pars.length + '\'] = \'' + string.replaceAll('\'', '\\\'') + '\';');
            break;
        }
    } while (true);
    pars = pars.filter(function (f) { return f != null; })
    return pars.length > 0 ? '(function() {\n\tparameters = new Object();\n\tvar allPars = [' + pars.map(function (f, ind) { return '\'par' + ind + '\''; }).join(',') + '];' + pars.join('') + '\nreturn allPars.filter(function(f) { return parameters[f] != null; }).map(function(f) { return parameters[f]; }).join(\'\');\n})();' : null;
}
equilibrium.CreateReplaceFncs = function (el) {
    equilibrium.ToArray(el.childNodes).filter(function (f) { return f.nodeName == '#text' && f.nodeValue.trim() != ''; })
		.forEach(function (f) {
		    do {
		        var ins = equilibrium.InsertOfProperty(f.nodeValue);
		        if (ins) {
		            if (ins.index > 0) {
		                var nod = document.createTextNode(f.nodeValue.substring(0, ins.index));
		                el.insertBeforeCustom(nod, f);
		            }
		            var nodIns = document.createTextNode(ins[0]);
		            el.insertBeforeCustom(nodIns, f);
		            f.nodeValue = f.nodeValue.substring(ins.index + ins[0].length);
		        }
		        else break;
		    } while (true);
		});
    var nodFncs = equilibrium.ToArray(el.childNodes).filter(function (f) { return f.nodeName == '#text' && f.nodeValue.trim() != ''; }).map(function (nod, ind) {
        nod.nodeValue = nod.nodeValue.replaceAll('\n', '').trim();
        if (!equilibrium.InsertOfProperty(nod.nodeValue)) {
            var repFnc = equilibrium.CreateReplaceFncString(nod.nodeValue);
            if (repFnc != null) {
                return '//' + nod.nodeValue + '\n\tvar nodval' + ind + ' = ' + repFnc + ';\n\tif (nodval' + ind + ' === undefined) nodval' + ind + ' = \'\'; \n\tif (nodes[' + ind + '].value !== nodval' + ind + ') { nodes[' + ind + '].value = nodval' + ind + '; nodes[' + ind + '].nod.nodeValue = nodval' + ind + '; };';
            }
        } else {
            var insFnc = equilibrium.CreateReadFncString(nod.nodeValue.substring(4, nod.nodeValue.length - 4));
            return '//' + nod.nodeValue + '\n\tvar insval' + ind + ' = ' + insFnc + ';'
                + '\n\tif (isObject(insval' + ind + ')) {'
                + '\n\tif (insval' + ind + ' instanceof Node) insval' + ind + ' = equilibrium.ToArray(insval' + ind + ', true);'
                + '\n\telse insval' + ind + ' = equilibrium.ToArray(insval' + ind + ');'
                + '\n\tvar hash = HashCode(insval' + ind + '.map(function(f) { return f.outerHTML; }).join(\'\'));'
                + '\n\tif (nodes[' + ind + '].value != hash) {'
                + '\n\t\tnodes[' + ind + '].value = hash;'
                + '\n\t\tvar div = document.createElement(\'div\');'
                + '\n\t\tinsval' + ind + '.forEach(function(f) { div.appendChild(f); });'
                + '\n\t\tnodes[' + ind + '].nod = equilibrium.ToArray(nodes[' + ind + '].nod,true);'
				+ '\n\t\tvar pars = equilibrium.GetAttributesToParent(control, additionals.observer.Subject.BindedElement).filter(function(f) { return f.nodeName.startsWith(\'emtemp\'); }).reverse().map(function(f) { return {name: f.nodeName.substring(6), value: f.nodeValue}}).groupBy(\'name\').map(function(f) { return f.items.first(); });'
                + '\n\t\tequilibrium.ToArray(div.children).forEach(function(f) { equilibrium.ReplaceTemplates(f, pars); });'
                + '\n\t\tvar obss = equilibrium.CreateObservers(div).sortby(\'Order\');'
                + '\n\t\tobss.forEach(function(f) { equilibrium.SetAdditionals(f, additionals); f.Update(); });'
                + '\n\t\tvar objs = equilibrium.ToArray(div.childNodes);'
                + '\n\t\tnodes[' + ind + '].nod.tail().forEach(function(f) { f.parentElement.removeChild(f); });'
                + '\n\t\tobjs.reverse().forEach(function(f) { nodes[' + ind + '].nod.first().after(f); });'
                + '\n\t\tcontrol.removeChild(nodes[' + ind + '].nod.first());'
                + '\n\t\tnodes[' + ind + '].nod = objs;'
                + '\n\t\tnodes[' + ind + '].obss = obss;'
                + '\n\t} else {'
                + '\n\t\tnodes[' + ind + '].obss.forEach(function(f) { f.Update(); });'
                + '\n\t}}';
        }
    }).filter(function (f) { return f != null; });
    var atributeFncs = equilibrium.ToArray(el.attributes).map(function (attr, ind) {
        if (attr.value.startsWith('javascript:'))
            attr.value = attr.value.replace('javascript:', '');
        var repFnc = equilibrium.CreateReplaceFncString(attr.value);
        if (repFnc != null)
            return '//' + attr.value + '\n\tvar attrval' + ind + ' = ' + repFnc + ';\n\tif (attrs[' + ind + '].value !== attrval' + ind + ') { attrs[' + ind + '].value = attrval' + ind + '; \n\t attrs[' + ind + '].attr.value = attrval' + ind + ';};';
    }).filter(function (f) { return f != null; });
    var all = nodFncs.concat(atributeFncs);
    if (all.length > 0) {
        var fnc = new Function('control,observer', '//' + el.outerHTML.split('\n').first() + '\nvar nodes = equilibrium.ToArray(control.childNodes).filter(function (f) { return f.nodeName == \'#text\' && f.nodeValue.trim() != \'\'; }).map(function(f) { return {nod: f, value: undefined}});\nvar attrs = equilibrium.ToArray(control.attributes).map(function(f) { return {attr: f, value: undefined}});\nreturn function(scope, additionals) {\n\t' + all.join('\n\t') + '\n};');
        el.replaceFnc = fnc;
    } else el.replaceFnc = function () { return EmptyFunction; };
    el.repFnc = el.replaceFnc(el);
}
equilibrium.CreateOnFncs = function (control) {
    control.onFncs = control.onFncs || [];
    equilibrium.GetOnValues(control).forEach(function (f) {
        var t = control.getAttribute(f.name);
        if (t != null) {
            var fnc = new Function('scope, additionals', '//' + control.outerHTML.split('\n').first() + '\n//' + t + '\n' + equilibrium.CreateReadFncString(t));
            control.onFncs.push({ name: f.on, fnc: fnc });
        }
    });
}
equilibrium.CreatePropFncs = function (control) {
    control.propFncs = control.propFncs || [];
    control.onFncs = control.onFncs || [];
    equilibrium.GetPropValues(control).forEach(function (f) {
        var t = control.getAttribute(f.name);
        if (t != null) {
            if (f.name == 'emvisible') {
                var fnc = new Function('scope, additionals', '//' + control.outerHTML.split('\n').first() + '\n//' + t + '\nvar val = ' + equilibrium.CreateReadFncString(t) + ';\n \nif ((additionals.this.style.display != \'none\') != val) additionals.this.style.display = val ? \'block\':\'none\';');
                control.propFncs.push({ name: f.on, fnc: fnc });
            } else {
                if (f.name == 'emif') {
                    var fnc = new Function('scope, additionals', '//' + control.outerHTML.split('\n').first() + '\n//' + t + '\nvar val = ' + equilibrium.CreateReadFncString(t) + ';\nif (val) {\nif (observer.IfControl != control) {\n\tobserver.IfControl.replaceNode(control);\n\tobserver.IfControl = control;\n};\n} else if (observer.IfControl == control) {\n\tvar com = document.createComment(\'\');\n\tcontrol.replaceNode(com);\n\tobserver.IfControl = com;\n};');
                    control.propFncs.push({ name: f.name, fnc: fnc });
                } else {
                    if (!control[f.property])
                        for (var prop in control)
                            if (f.property == prop.toLowerCase())
                                f.property = prop;

                    var addString = (control.tagName == 'SELECT') ? '\nif (val == null) { \n\tadditionals.this.selectedIndex = -1;\n} else {\n\tadditionals.this[\'' + f.property + '\'] = val;\n}' : 'additionals.this[\'' + f.property + '\'] = (val != null) ? val : null;';
                    var fnc = new Function('scope, additionals', '//' + control.outerHTML.split('\n').first() + '\n//' + t + '\n//' + t + '\nvar val = ' + equilibrium.CreateReadFncString(t) + ';' + addString);
                    control.propFncs.push({ name: f.name, fnc: fnc });
                    if (f.name == 'emvalue' || f.name == 'emchecked') {
                        var fnc = new Function('scope, additionals', '//' + control.outerHTML.split('\n').first() + '\n//' + t + '\n' + equilibrium.CreateWriteFncString(t, f.property));
                        control.onFncs.push({ name: f.on, fnc: fnc });
                    };
                };
            };
        }
    });
}
equilibrium.CreateRepeateFncs = function (element) {
    var repeatattr = element.attributes['emrepeat'];
    if (repeatattr) {
        var spl = repeatattr.value.split(' in ');

        element.RepeatPropertyShort = spl[0].trim();
        element.RepeatProperty = spl[1].trim();
        element.RepeatFnc = new Function('scope, additionals', '//' + element.outerHTML.split('\n').first() + '\n//' + element.RepeatProperty + '\nreturn ' + equilibrium.CreateReadFncString(element.RepeatProperty) + ';');

        var filterattr = element.attributes['emfilter'];
        if (filterattr) {
            var filterValue = filterattr.value;
            element.FilterFnc = new Function('scope, additionals', '//' + element.outerHTML.split('\n').first() + '\n//' + filterValue + '\nreturn ' + equilibrium.CreateReadFncString(filterValue) + ';');
        }

        var sortattr = element.attributes['emsort'];
        if (sortattr) {
            var sortValue = sortattr.value;
            element.SortFnc = new Function('scope, additionals', '//' + element.outerHTML.split('\n').first() + '\n//' + sortValue + '\nreturn ' + equilibrium.CreateReadFncString(sortValue) + ';');
        }
    };
}
equilibrium.InsertFncs = function (clone, element) {
    clone.onFncs = element.onFncs;
    clone.propFncs = element.propFncs;
    if (element.replaceFnc != null) {
        clone.replaceFnc = element.replaceFnc;
        clone.repFnc = element.replaceFnc(clone);
    }
    clone.templateFncs = element.templateFncs;
    if (element.RepeatPropertyShort != null) {
        clone.RepeatPropertyShort = element.RepeatPropertyShort;
        clone.RepeatProperty = element.RepeatProperty;
        clone.RepeatFnc = element.RepeatFnc;
        clone.FilterFnc = element.FilterFnc;
        clone.SortFnc = element.SortFnc;
    }
    for (var i = 0; i < element.childElementCount; i++)
        equilibrium.InsertFncs(clone.children[i], element.children[i]);
}
equilibrium.CloneElement = function (element) {
    var clone = element.cloneNode(true);
    equilibrium.InsertFncs(clone, element);
    return clone;
}
var commentTemplate = document.createComment('');
equilibrium.CreateRepeatObserverFromElement = function (element) {
    if (element.RepeatProperty) {
        var comment = commentTemplate.cloneNode();
        var template = equilibrium.CloneElement(element);

        element.parentNode.insertBeforeCustom(comment, element);
        element.parentNode.removeChild(element);
        obs = new equilibrium.RepeatObserver(comment, function (f) { return template; });
        obs.RepeatPropertyShort = element.RepeatPropertyShort;
        obs.RepeatProperty = element.RepeatProperty;
        obs.RepeatFnc = element.RepeatFnc;
        obs.FilterFnc = element.FilterFnc;
        obs.SortFnc = element.SortFnc;

        return obs;
    };
};

equilibrium.ReplaceScopeValues = function (control, scope, additionals) {
    control.repFnc(scope, additionals);
}

equilibrium.BindOnValues = function (mainContainer, observer) {
    mainContainer.onFncs.forEach(function (f) {
        mainContainer['on' + f.key] = function () {
            f.items.forEach(function (g) { g.fnc(observer.Subject, observer.additionals, mainContainer); });
        };
    });
}
equilibrium.ChangePropValues = function (mainContainer, scope, additionals) {
    if (!IsNotNullAndHasAny(mainContainer.propFncs))
        return;

    mainContainer.propFncs.forEach(function (propfnc) {
        propfnc.fnc(scope, additionals);
    });
};

equilibrium.GetOnValues = (function () {
    var allOnFncs = function (control) {
        return equilibrium.ToArray(control.attributes).filter(function (f) { return f.name.startsWith('emon'); }).map(function (f) { return f.name.substring(4); });
    };
    return (function (control) {
        return allOnFncs(control).map(function (f) { return { name: 'emon' + f, on: f }; });
    });
})();

equilibrium.GetPropValues = (function () {
    var allPropFncs = function (control) {
        return equilibrium.ToArray(control.attributes).filter(function (f) { return f.name.startsWith('emprop'); }).map(function (f) { return f.name.substring(6); });
    };
    return (function (control) {
        return [
            { name: 'emchecked', property: 'checked', on: 'click' },
            { name: 'emvalue', property: 'value', on: 'change' },
            { name: 'emvisible', property: 'null', on: 'null' },
            { name: 'emif', property: 'null', on: 'null' }
        ].concat(allPropFncs(control).map(function (f) { return { name: 'emprop' + f, property: f, on: 'null' }; }));
    });
})();


equilibrium.splitParameters = function (str, splitby) {
    var pars = [];
    var specialChars = [
        { open: '\'', close: '\'' },
        { open: '"', close: '"' },
        { open: '(', close: ')' },
        { open: '{', close: '}' },
        { open: '[', close: ']' },
    ];
    var par = '';
    var counter = [];
    for (var i = 0; i < str.length; i++) {
        var ch = str[i];
        if (ch === '\\') {
            par += ch + str[i++];
        }
        else if (ch === splitby) {
            if (counter.length == 0) {
                pars.push(par);
                par = '';
            }
            else
                par += ch;
        }
        else {
            var findopening = specialChars.find(function (f) { return ch === f.open; });
            var findclosing = specialChars.find(function (f) { return ch === f.close; });
            if (findopening != null || findclosing != null) {
                // if (incounter != null && findclosing == null)
                // throw 'paramenters are not good!' + str;
                if (findopening != null && findclosing != null) {
                    if (counter.length == 0 || counter[counter.length - 1].name !== findopening.open)
                        counter.push({ name: ch, count: 1 });
                    else
                        counter[counter.length - 1].count--;
                }
                else if (findopening != null) {
                    if (counter.length == 0 || counter[counter.length - 1].name !== findopening.open)
                        counter.push({ name: ch, count: 1 });
                    else
                        counter[counter.length - 1].count++;
                }
                else if (findclosing != null) {
                    if (counter.length == 0 || counter[counter.length - 1].name !== findclosing.open)
                        throw 'Params not good ' + str;
                    else
                        counter[counter.length - 1].count--;
                }
                if (counter.length > 0 && counter[counter.length - 1].count === 0)
                    counter.splice(counter.length - 1, 1);
            }
            par += ch;
        }
    }

    if (par.length > 0)
        pars.push(par.trim());
    return pars;
}
equilibrium.FindEnclosedPartOfString = function (str, openchar, closechar) {
    var inSpecialChars = 0;
    var wasInside = false;
    var par = '';
    for (var i = 0; i < str.length; i++) {
        var ch = str[i];
        if (ch === '\\') {
            par += str[++i];
            continue;
        }
        else if (ch === openchar) {
            if (wasInside && openchar == closechar)
                inSpecialChars--;
            else {
                wasInside = true;
                inSpecialChars++;
            }
        } else if (ch === closechar)
            inSpecialChars--;
        if (inSpecialChars > 0) {
            par += ch;
        }
        else if (inSpecialChars <= 0 && wasInside)
            break;
    }
    return par.substring(1, par.length);
}
equilibrium.scopeHasProperty = function (scope, property) {
    return (scope['hasOwnProperty'] != null && scope.hasOwnProperty(property)) || scope[property] != undefined;
}

equilibrium.propertyIsStringBoolNumberOrArray = function (prop) {
    prop = prop.trim();
    return (prop === "null" || equilibrium.propertyIsString(prop) ||
            (prop === "false" || prop === "true") ||
            (prop.startsWith("[") && prop.endsWith("]")) ||
            !isNaN(prop));
}
equilibrium.propertyIsString = function (prop) {
    return prop.length > 1 && (prop.startsWith("\"") || prop.startsWith("'")) && equilibrium.FindEnclosedPartOfString(prop, prop[0], prop[0]) == prop.substring(1, prop.length - 1);
}

equilibrium.propertyIsFunction = function (str) {
    return equilibrium.FunctionPartOfProperty(str) != null;
}
equilibrium.propertyIsArray = function (str) {
    return equilibrium.ArrayPartOfProperty(str) != null;
}
equilibrium.ArrayPartOfProperty = function (property) {
    var patt1 = /\[(.*?)\]/;
    return property.match(patt1);
}
equilibrium.FunctionPartOfProperty = function (property) {
    var patt1 = /\((.*?)\)/;
    return property.match(patt1);
}
equilibrium.FindFunctionsAndArrays = function (str) {
    var name = '';
    var pars = [];
    var par = '';
    var counter = [];

    for (var i = 0; i < str.length; i++) {
        var createParObj = function (open, close) {
            var par = { open: open, close: close, parStr: equilibrium.FindEnclosedPartOfString(str.substring(i), open, close) };
            par.parameters = equilibrium.splitParameters(par.parStr, ',').map(function (f) { return { Name: f.trim() } });
            pars.push(par);
            i += par.parStr.length + 1;
        }
        var ch = str[i];
        if (ch == '"' || ch == '\'')
            return null;
        else if (ch == '(') {
            createParObj('(', ')');
        } else if (ch == '[') {
            createParObj('[', ']');
        } else name += ch;
    }
    return pars.length > 0 ? { name: name.trim(), pars: pars } : null;
}
equilibrium.ValueOfProperty = function (property) {
    var patt1 = /\{\{(.*?)\}\}/;
    return property.match(patt1);
}
equilibrium.InsertOfProperty = function (property) {
    var patt1 = /\{\{\[\[(.*?)\]\]\}\}/;
    return property.match(patt1);
}
equilibrium.GetAllChildrens = function (element) {
    if (element['children'] && element.children.length > 0) {
        var childs = equilibrium.ToArray(element.children);
        return childs.pushMany(childs.mapmany(function (f) { return equilibrium.GetAllChildrens(f) }));
    }
    else
        return [];
}
equilibrium.SetAdditionals = function (obs, additionals) {
    obs.Subject = additionals.observer.Subject;
    var adds = equilibrium.CopyAllProperties(additionals);
    adds.observer = obs;
    adds.this = obs['element'];
    if (adds['this'] != null && adds.this['templateFncs'] != null)
        adds.this.templateFncs.forEach(function (f) { adds[f.name] = f.fnc; });
    obs.additionals = adds;
}
equilibrium.Templates = equilibrium.Templates || [];
equilibrium.Bind = function (subject, topParent) {
    function newObservers(elements, subject) {
        var singleObservers = [];
        elements.forEach(function (element, ind) {
            var obs = equilibrium.CreateRepeatObserverFromElement(element);
            if (obs != null) {
                var stepattr = element.attributes['emstep'];
                if (stepattr) {
                    var step = parseInt(stepattr.value);
                    if (!isNaN(step) && step > 0)
                        obs.StepAtTime = step;
                };
                obs.isOnMainBind = true;
                subject.AddObserver(obs);
            } else {
                obs = new equilibrium.ElementObserver(element);
                singleObservers.push(obs);
            }
            obs.additionals = { this: element, observer: obs };
            if (element.templateFncs != null)
                element.templateFncs.forEach(function (f) { obs.additionals[f.name] = f.fnc; });
        });
        singleObservers.forEach(function (f) { subject.AddObserver(f); f.isOnMainBind = true; });
    }

    equilibrium.GetTemplates();
    equilibrium.ReplaceTemplates(topParent);

    var allChilds = equilibrium.GetAllChildrens(topParent).pushMany([topParent]);

    allChilds.forEach(function (f) { equilibrium.CreateReplaceFncs(f); });
    allChilds.forEach(function (f) { equilibrium.CreatePropFncs(f); });
    allChilds.forEach(function (f) { equilibrium.CreateOnFncs(f); });
    allChilds.forEach(function (f) { equilibrium.CreateRepeateFncs(f); });
    allChilds.forEach(function (f) { f.onFncs = f.onFncs.groupBy('name') });

    var elements = equilibrium.FindAllElements(topParent);
    var obs = new equilibrium.ElementObserver(topParent);
    obs.additionals = { this: topParent, observer: obs };

    subject.AddObserver(obs);
    newObservers(elements, subject);

    if (equilibrium.ToArray(document.styleSheets).find(function (f) { return equilibrium.hasOwnProperty(f, 'rules') && equilibrium.ToArray(f.rules).findby('selectorText', '.displayNoneClass') != null; }) == null) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.displayNoneClass { display: none; }';
        document.getElementsByTagName('head')[0].appendChild(style);
    };
    subject.BindedElement = topParent;

    return subject;
}
equilibrium.CreateObservers = function (topParent) {
    function newObservers(elements) {
        var observers = [];
        elements.forEach(function (element, ind) {
            var obs = equilibrium.CreateRepeatObserverFromElement(element);
            if (obs != null) {
                var stepattr = element.attributes['emstep'];
                if (stepattr) {
                    var step = parseInt(stepattr.value);
                    if (!isNaN(step) && step > 0)
                        obs.StepAtTime = step;
                };
            } else {
                obs = new equilibrium.ElementObserver(element);
            }
            obs.isOnMainBind = true;
            obs.additionals = { this: element, observer: obs };
            observers.push(obs);
            if (element.templateFncs != null)
                element.templateFncs.forEach(function (f) { obs.additionals[f.name] = f.fnc; });
        });
        return observers;
    }

    equilibrium.ReplaceTemplates(topParent);

    var allChilds = equilibrium.GetAllChildrens(topParent).pushMany([topParent]);

    allChilds.forEach(function (f) { equilibrium.CreateReplaceFncs(f); });
    allChilds.forEach(function (f) { equilibrium.CreatePropFncs(f); });
    allChilds.forEach(function (f) { equilibrium.CreateOnFncs(f); });
    allChilds.forEach(function (f) { equilibrium.CreateRepeateFncs(f); });
    allChilds.forEach(function (f) { f.onFncs = f.onFncs.groupBy('name') });

    var elements = equilibrium.FindAllElements(topParent);
    var obs = new equilibrium.ElementObserver(topParent);
    obs.additionals = { this: topParent, observer: obs };

    return [obs].pushMany(newObservers(elements));
}
equilibrium.GetTemplates = function () {
    var emTemplates = document.getElementsByTagName('EMTEMPLATES');
    if (emTemplates) {
        equilibrium.ToArray(emTemplates).mapmany(function (f) { return equilibrium.ToArray(f.children); }).forEach(function (selTemp) {
            var fncs = equilibrium.ToArray(selTemp.childNodes).filter(function (f) { return f.nodeName == 'SCRIPT' })
                    .mapmany(function (script) {
                        var fncStr = script.innerText;
                        script.parentElement.removeChild(script);
                        var allFncs = fncStr.split('function').map(function (f) { return equilibrium.FunctionPartOfProperty(f.trim()); })
                            .filter(function (f) { return f != null })
                            .map(function (f) { return { name: f.input.substring(0, f.index), parameters: f[1], body: equilibrium.FindEnclosedPartOfString(f.input, '{', '}').trim() }; });
                        return allFncs.map(function (f) {
                            return { name: f.name, fnc: new Function(f.parameters, f.body) };
                        });
                    });
            equilibrium.GetAllChildrens(selTemp).pushMany([selTemp]).forEach(function (el) {
                el.templateFncs = fncs;
            });
            equilibrium.Templates.push({ name: selTemp.nodeName, template: equilibrium.ToArray(selTemp.children) });
            selTemp.parentElement.removeChild(selTemp);
        });
        equilibrium.ToArray(emTemplates).forEach(function (t) { t.parentElement.removeChild(t); });
    }
}
equilibrium.ReplaceTemplates = function (el, pars) {
    var temp = equilibrium.Templates.find(function (f) { return f.name == el.nodeName; });

    var pompars = DeepCloneArray(pars || []);
    equilibrium.ToArray(el.attributes).filter(function (f) { return f.nodeName.startsWith('emtemp'); })
        .map(function (f) { return { name: f.nodeName.substring(6), value: f.nodeValue } })
        .forEach(function (f) { if (!pompars.any(function (g) { return f.name == g.name; })) pompars.push(f); });

    if (temp != null) {
        var elements = temp.template.map(function (tempEl) {
            var tempClone = equilibrium.CloneElement(tempEl);
            if (pompars.any()) {
                var ells = equilibrium.GetAllChildrens(tempClone).pushMany([tempClone]);
                var repFnc = function (g) {
                    if (g.nodeValue != null)
                        pompars.forEach(function (h) {
                            var ind = g.nodeValue.toLowerCase().indexOf('{' + h.name + '}');
                            if (ind > -1)
                                g.nodeValue = g.nodeValue.substring(0, ind) + h.value + g.nodeValue.substring(ind + h.name.length + 2);
                        });
                };
                ells.forEach(function (f) {
                    equilibrium.ToArray(f.childNodes).forEach(repFnc);
                    equilibrium.ToArray(f.attributes).forEach(repFnc);
                });
            };
            equilibrium.ToArray(el.attributes).forEach(function (f) { tempClone.setAttribute(f.nodeName, f.nodeValue) });
            return tempClone;
        });
        for (var i = elements.length - 1; i >= 0; i--)
            el.after(elements[i]);
        el.parentNode.removeChild(el);
        elements.forEach(function (f) { equilibrium.ReplaceTemplates(f, pompars); });
    }

    if (el.parentElement != null)
        equilibrium.ToArray(el.children).forEach(function (f) { equilibrium.ReplaceTemplates(f, pompars); });
}

equilibrium.FindAllElements = function (topParent) {
    var groupAttributes = ['emrepeat'];
    var allElements = equilibrium.GetAllChildrens(topParent);
    var filtered = allElements.filter(function (f) { return (equilibrium.ItemHasEqAttributes(f) || equilibrium.ValueOfProperty(f.outerHTML) != null) && !equilibrium.ParentHasAttributes(f, groupAttributes, topParent) });
    return filtered;
}
equilibrium.ParentHasAttributes = function (element, attributes, topparent) {
    var parent = element.parentElement;
    if (parent == topparent)
        return false;
    var attrs = equilibrium.ToArray(parent.attributes);
    var blns = attributes.find(function (f) { if (attrs.findby('name', f)) return true; });
    if (blns) return true;
    return equilibrium.ParentHasAttributes(parent, attributes, topparent);
}
equilibrium.ItemHasEqAttributes = function (element) {
    return equilibrium.GetPropValues(element).any() || equilibrium.GetOnValues(element).any();
}
equilibrium.GetAttributesToParent = function (element, toParent) {
    return equilibrium.GetElementsToParent(element, toParent).mapmany(function (f) { return equilibrium.ToArray(f.attributes); });
}
equilibrium.GetElementsToParent = function (element, toParent) {
    if (element.parentElement == null) return [element];
    return ((element == toParent) ? [element] : [element].pushMany(equilibrium.GetElementsToParent(element.parentElement, toParent))).filter(function (f) { return f != null; });
};

equilibrium.CopyAllProperties = function (fromObject, toObject) {
    if (toObject == null)
        toObject = new Object();
    for (var k in fromObject) toObject[k] = fromObject[k];
    return toObject;
}
equilibrium.CopyJustProperties = function (fromObject, toObject) {
    if (toObject == null)
        toObject = new Object();
    for (var k in fromObject)
        if (typeof fromObject[k] !== "function")
            toObject[k] = fromObject[k];
    return toObject;
}
equilibrium.DeleteJustProperties = function (fromObject) {
    for (var k in fromObject)
        if (typeof fromObject[k] !== "function")
            delete fromObject[k];
    return fromObject;
}
equilibrium.CopyJustFunctions = function (fromObject, toObject) {
    if (toObject == null)
        toObject = new Object();
    for (var k in fromObject)
        if (typeof fromObject[k] === "function")
            toObject[k] = fromObject[k];
    return toObject;
}
equilibrium.PropertiesToArray = function (fromObject) {
    var arr = [];
    for (var k in fromObject) arr.push(fromObject[k]);
    return arr;
}
equilibrium.PropertiesToObjects = function (fromObject) {
    var arr = [];
    for (var k in fromObject) arr.push({ name: k, value: fromObject[k] });
    return arr;
}
equilibrium.ToArray = function (fromObject, checkArray) {
    if (checkArray)
        return Array.isArray(fromObject) ? fromObject : [fromObject];

    return fromObject.length == 0 ? [] : (0).RangeTo(fromObject.length - 1).map(function (f) { return fromObject[f]; });
};

function GetLocationRoot() { return window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1); };

function EmptyFunction() { }

var FastClone = {

    /**
     * This is a factory method that creates clone constructor function
     * for a specified object
     *
     * @param {Object} source - source object that need to be cloned next
     * @param {Boolean} isDeep - flag that represents should be clone deep or not (default: true)
     * @returns {Function}
     */
    factory: function (source, isDeep) {
        if (typeof source != 'object' || Array.isArray(source)) {
            throw new Error('Source is not an object');
        }
        var deep = isDeep === undefined ? true : isDeep;

        return new Function('src', FastClone._getKeyMap(source, deep));
    },

    /**
     * This method is for array cloning
     *
     * @param {Array} source - source array to clone
     * @param {Boolean} isDeep - flag that represents should be clone deep or not (default: true)
     * @returns {Array}
     */
    cloneArray: function (source, isDeep) {
        if (!Array.isArray(source)) {
            throw new Error('Source should be an array');
        }
        var deep = isDeep === undefined ? true : isDeep;

        var clonedArray = [];
        if (source.length) {
            var Clone = FastClone.factory(source[0], deep);
            for (var i = 0; i < source.length; i++) {
                clonedArray.push(new Clone(source[i]));
            }
        }
        return clonedArray;
    },

    /**
     * This method create map of object fields
     * for eval in clone function
     *
     * @param {Object|Array} source - source object that need to be cloned next
     * @param {Boolean} deep - flag that represents should be clone deep or not
     * @param {String} baseKey - current sequence of object keys
     * @param {Number} arrIndex - current sequence of array indexes
     * @returns {string}
     */
    _getKeyMap: function (source, deep, baseKey, arrIndex) {
        var base = baseKey || '';
        var index = (arrIndex || 0) + 1;

        var keysMap = base ? 'this' + base : '';

        if (Array.isArray(source)) {
            var iterVal = 'i' + index; // name of the current counter value
            var iterPath = base + '[' + iterVal + ']'; // path of the current array value

            if (typeof source[0] == 'object') {
                // This cycle will write code for copy array values
                keysMap += base ? ' = [];' : '';
                keysMap += 'for (var ' + iterVal + ' = 0; ' + iterVal + ' < src' + base + '.length; ' + iterVal + '++) {';
                keysMap += FastClone._getKeyMap(source[0], deep, iterPath, index);
                keysMap += '}';
            } else {
                keysMap += ' = src' + base + '.slice();';
            }
        } else {
            keysMap += base ? ' = {};' : '';

            // Iterate over object keys
            for (var key in source) {
                if (!source.hasOwnProperty(key)) {
                    continue;
                }

                var value = source[key];
                var path = base + '.' + key; // current key path

                if (deep && typeof value == 'object' && value !== null && !(value instanceof Date)) {
                    keysMap += FastClone._getKeyMap(value, deep, path, index);
                } else {
                    keysMap += 'this' + path + ' = src' + path + ';';
                }
            }
        }

        return keysMap;
    }
};