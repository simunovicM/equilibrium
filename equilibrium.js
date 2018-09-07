function PrepareDataForSubmit(data, prestr, arr) {
    if (arr == null)
        var arr = [];
    if (prestr == null) prestr = "";
    if (typeof data !== 'object') {
        arr.push({ name: prestr, data: data });
    } else if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++)
            PrepareDataForSubmit(data[i], prestr + "[{0}]".formatUnicorn(i), arr);
    } else {
        for (var name in data)
            PrepareDataForSubmit(data[name], prestr.trim() == "" ? name : prestr + '.' + name, arr);
    }
    return arr;
}
function postAjax(url, data) {
    var onSuccess = EmptyFunction;
    var onError = EmptyFunction;
    var params = (typeof data == 'string') ? data : PrepareDataForSubmit(data).map(function (f) { return encodeURIComponent(f.name) + '=' + encodeURIComponent(f.data); }).join('&');
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3)
            if (xhr.status == 200)
                onSuccess(JSON.parse(xhr.responseText));
            else
                onError(JSON.parse(xhr.responseText));
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);

    var retObj = { success: function (fn) { onSuccess = fn; return retObj; }, error: function (fn) { onError = fn; return retObj; } }

    return retObj;
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
    var encodeDiv = $('<div />');
    return function (str) {
        if (IsStringNullOrEmpty(str)) return str;
        return encodeDiv.text(str).html();
    }
}();
function EncodeWithQuota(str) {
    return Encode(str).replaceAll('"', '&quot;');
}
var isFunction = function (obj) { return (typeof obj === "function"); }
var isObject = function (obj) { return (typeof obj === "object"); }

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
    Array.prototype.groupBy = function (propFnc) {
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
        .map(function (f) { return f.first(); });
    };

if (!('head' in Array.prototype)) {
    Array.prototype.head = function (arr) {
        var self = this;
        return self.filter(function (f, ind) { return ind < self.length - 1 });
    };
}
if (!('tail' in Array.prototype)) {
    Array.prototype.tail = function (arr) {
        var self = this;
        return self.filter(function (f, ind) { return ind > 0 });
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function () { return $.trim(this); }
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
        this.GetDrawCount = function() { return drawCount; };
        var subject = this;
        observers.forEach(function (f) { f.Update(subject); });
    };
    this.Bind = function (element) {
        equilibrium.Bind(this, $(element));
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
equilibrium.RepeatObserver = function ($comment, drawfnc) {
    this.FilterFunctions = [];
    this.SortFunctions = [];
    var observer = this;
    this.Subject = null;
    this.RepeatProperty = '';
    this.RepeatPropertyShort = '';
    this.DrawedElements = [];
    this.MaxDrawingsAtTime = 0;
    var templateElement = drawfnc();

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
                    newObservers.push(newEl.observers);
                    observers = newEl.observers;
                };
                var additionals = new Object();
                if (observer.additionals != null)
                    equilibrium.CopyAllProperties(observer.additionals, additionals);
                additionals[repeatPropertyShort] = dat;
                additionals.index = index;
                observers.forEach(function (f) { f.Subject = subject; var adds = equilibrium.CopyAllProperties(additionals); adds.observer = f; adds.this = f['element']; f.additionals = adds; });
            });
            var afterElement = (observer.DrawedElements.length == 0) ? $comment : observer.DrawedElements[observer.DrawedElements.length - 1].last().LastDrawedElement();

            observer.DrawedElements = observer.DrawedElements.concat(newObservers);
            if (observer.MaxDrawingsAtTime == 0) {
                var parent = $comment.parentNode;

                if (observer.isOnMainBind)
                    parent.className.toggle('displayNoneClass', true);

                observer.DrawedElements.forEach(function (f) { f.forEach(function (g) { g.Update(); }); });
                var nextSibling = afterElement.nextSibling;
                drawedElements.forEach(function (f) {
                    parent.insertBefore(f, nextSibling);
                });

                if (observer.isOnMainBind) {
                    parent.className.toggle('displayNoneClass', false);
                }
            } else {
                var starttime = Date.now();
                var parent = $comment.parentNode;
                
                var childs = equilibrium.ToArray(parent.childNodes);
                var commentIndex = childs.indexOf($comment);

                var afters = childs.filter(function (f, ind) { return ind > commentIndex && f.className != null; });

                parent.className.toggle('displayNoneClass', true);
                for (var i = afters.length - 1; i >= 0; i--)
                    afters[i].className.toggle('displayNoneClass', true);

                var nextSibling = afterElement.nextSibling;
                parent.className.toggle('displayNoneClass', false);

                var start = 1 - observer.MaxDrawingsAtTime;
                var forDrawing = function () { return observer.DrawedElements.filter(function (f, ind) { return ind >= start && ind < start + observer.MaxDrawingsAtTime; }); };
                var drawer = function () {
                    var draws = forDrawing();
                    draws.forEach(function (f) { f.forEach(function (g) { g.Update(); }); });
                    if (draws.length > 0) {
                        var el = draws.last().last().element;
                        if (el.parentElement == null)
                            parent.insertBefore(el, nextSibling);
                    }
                };
                var callback = function () {
                    start += observer.MaxDrawingsAtTime; drawFewElements();
                    //var millis = Date.now() - starttime;
                    //Ticker.AddErrorMessage('elapsed     ' + Math.floor((Date.now() - starttime) / 100) / 10));
                };
                var drawFewElements = function () {
                    if (drawCount != subject.GetDrawCount())
                        return;
                    if (IsNotNullAndHasAny(forDrawing()))
                        async(drawer, callback);
                    else {
                        afters.forEach(function(f) { f.className.toggle('displayNoneClass', false); });
                        $('#testId').text('elapsed     ' + Math.floor((Date.now() - starttime) / 100) / 10);
                    };
                };
                drawer();
                drawFewElements();
            };
        }
    }
    var allElementsPattern = null;
    var FindAllElements = function (element) {
        var allElements = equilibrium.GetAllChildrens(element);
        if (allElementsPattern == null) {
            var allUsedEls = equilibrium.FindAllElements(element);
            allElementsPattern = allUsedEls.map(function (f) { return { index: allElements.indexOf(f), isRepeatObserver: f.attributes['emrepeat'] != null }; });
        };
        var ret = allElementsPattern.map(function (f) { return f; });
        ret.forEach(function (f) { f.element = allElements[f.index]; });
        return ret;
    };
    this.FilteredData = function () {
        var parentData = equilibrium.CopyAllProperties(observer.additionals, equilibrium.CopyAllProperties(this.Subject));
        var scope = equilibrium.getScopeFromString(parentData, observer.RepeatProperty);
        if (scope == null)
            return;

        var filtered = equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);
        observer.SortFunctions.forEach(function (f) { filtered = f(filtered, parentData, scope.topParent, observer.RepeatProperty); });

        var repeatPropertyShort = observer.RepeatPropertyShort;
        observer.FilterFunctions.forEach(function (f) { filtered = filtered.filter(function (dat, ind) { return f(dat, ind, parentData, scope.topParent, repeatPropertyShort); }); });

        return filtered;
    }
    this.LastDrawedElement = function () { return (observer.DrawedElements.length == 0) ? $comment : observer.DrawedElements[observer.DrawedElements.length - 1].LastDrawedElement() };
    this.RemoveAll = function () { equilibrium.getJQueryObj($comment).remove(); observer.DrawedElements.forEach(function (f) { f.forEach(function (g) { g.RemoveAll(); }); }); $comment = null; observer.DrawedElements = null; };
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
            FindAllElements(element).forEach(function (f, ind) {
                var obs;
                if (f.isRepeatObserver) {
                    obs = equilibrium.CreateRepeatObserverFromElement(f.element);
                    obs = equilibrium.AttachFiltersToObserver(obs, f.element);
                    obs = equilibrium.AttachSortToObserver(obs, f.element);
                }
                else {
                    obs = new equilibrium.ElementObserver(f.element, f.connectionTemplate);
                };
                observers.push(obs);
            });

            observers = observers.sortby('Order');
            observers.push(new equilibrium.ElementObserver(element));
        };
        observers.forEach(function (f) {
            f.ParentCollection = observers;
            f.ParentObserver = observer;
        });

        return { element: element, observers: observers };
    };
}
equilibrium.ElementObserver = function (element, pattern) {
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
        element.getScope = function() { return { scope: scope, additionals: additionals }; };
        if (isFirstTime) {
            equilibrium.BindOnValues(element, this.Subject);
            isFirstTime = false;
        }
    }
    this.LastDrawedElement = function () { return element; };
    this.RemoveAll = function () { element.parentNode.removeChild(element); element = null; };
    this.TopParentObserver = function () { return (observer.ParentObserver == null) ? observer : observer.ParentObserver.TopParentObserver(); };
}

equilibrium.CreateReadFncString = function (string) {
    //var pars = ['scope.', ''];
    if (string == 'null') return null;
    if (equilibrium.propertyIsStringBoolNumberOrArray(string)) {
        if (equilibrium.propertyIsString(string)) {
            var val = equilibrium.ValueOfProperty(string);
            if (val == null)
                return string;
            else
                return val.input.substring(0, val.index) + val.input[0] + ' + ' + equilibrium.CreateReadFncString(val[0].substring(2, val[0].length - 2)) + ' + ' + equilibrium.CreateReadFncString(val.input[0] + val.input.substring(val.index + val[0].length));
        } else return string;
    }
    var fncPart = equilibrium.FunctionPartOfProperty(string);
    if (fncPart == null) {
        var pattern = 'try { {0} } catch(err) { {1} }';
        var spl = equilibrium.splitParameters(string, ',').map(function (f) { return f.trim(); }).filter(IsNotNullAndHasAny);
        if (spl.length == 1) {
            var str = spl.first();
            return '(function() {' + pattern.formatUnicorn('var par = additionals.' + str + '; if (par !== undefined) return par; throw "";', pattern.formatUnicorn('var par = scope.' + str + '; if (par !== undefined) return par; throw "";', pattern.formatUnicorn('return ' + str, 'scope.' + str + ' = null; return null;'))) + ' })()';
        } else if (spl.length > 1)
            return spl.map(equilibrium.CreateReadFncString).join(',');
        return "";
    } else {
        var parameters = equilibrium.FindEnclosedPartOfString(fncPart.input, '(', ')');
        return '(' + equilibrium.CreateReadFncString(fncPart.input.substr(0, fncPart.index)) + ')(' + equilibrium.CreateReadFncString(parameters) + ')';
    }
}
equilibrium.CreateWriteFncString = function (string, prop) {
    var insertFnc = function(scopeName) {
        return '\nif (equilibrium.scopeHasProperty(' + scopeName + ',\'' + string + '\')) {\n\tif (' + scopeName + '.' + string + ' != value) { ' + scopeName + '.' + string + ' = value; scope.Notify(); }}';
    };
    var spl = equilibrium.splitParameters(string, '.');
    var head = spl.head().join('.');
    if (IsStringNullOrEmpty(head))
        return 'var value = equilibrium.getJQueryObj(additionals.this).prop(\'' + prop + '\');\n' + insertFnc('additionals') + '\nelse' + insertFnc('scope') + '\nelse' + insertFnc('window') + ' \nelse { subject.' + string + ' = value; scope.Notify(); }';
    return 'var value = equilibrium.getJQueryObj(additionals.this).prop(\'' + prop + '\');\n' + equilibrium.CreateReadFncString(head) + '.' + spl.last() + ' = value; scope.Notify();';
}
equilibrium.CreateReplaceFncString = function (string) {
    var val = equilibrium.ValueOfProperty(string);
    if (val != null) {
        var str = equilibrium.CreateReadFncString('\'' + val.input.replaceAll('\'', '\\\'') + '\'');
        return str;
    };
}
equilibrium.CreateOnFncs = function (control) {
    equilibrium.GetOnValues().forEach(function (f) {
        control.onFncs = control.onFncs || [];
        var t = control.getAttribute(f.name);
        if (t != null) {
            var fnc = new Function('scope, additionals', '//' + control.outerHTML.split('\n').first() + '\n//' + t + '\n' + equilibrium.CreateReadFncString(t));
            control.onFncs.push({ name: f.on, fnc: fnc });
        }
    });
}
equilibrium.CreatePropFncs = function (control) {
    equilibrium.GetPropValues().forEach(function (f) {
        control.propFncs = control.propFncs || [];
        control.onFncs = control.onFncs || [];
        var t = control.getAttribute(f.name);
        if (t != null) {
            if (f.name == 'emvisible') {
                var fnc = new Function('scope, additionals', '//' + control.outerHTML.split('\n').first() + '\n//' + t + '\nvar val = ' + equilibrium.CreateReadFncString(t, f.property) + ';\nequilibrium.getJQueryObj(additionals.this).toggle((val !== null) ? val : null);');
                control.propFncs.push({ name: f.on, fnc: fnc });
            } else {
                var fnc = new Function('scope, additionals', '//' + control.outerHTML.split('\n').first() + '\n//' + t + '\n//' + t + '\nvar val = ' + equilibrium.CreateReadFncString(t) + ';\nequilibrium.getJQueryObj(additionals.this).prop(\'' + f.property + '\',val);');
                control.propFncs.push({ name: f.on, fnc: fnc });
                if (f.name == 'emvalue' || f.name == 'emchecked') {
                    var fnc = new Function('scope, additionals', '//' + control.outerHTML.split('\n').first() + '\n//' + t + '\n' + equilibrium.CreateWriteFncString(t, f.property));
                    control.onFncs.push({ name: f.on, fnc: fnc });
                } else if (f.name == 'emif') {
                    var fnc = new Function('scope, additionals', '//' + control.outerHTML.split('\n').first() + '\n//' + t + '\n' + equilibrium.CreateWriteFncString(t, f.property));
                    control.onFncs.push({ name: f.on, fnc: fnc });
                }
            }
        }
    });
}
equilibrium.CreateReplaceFncs = function (el) {
    var nodFncs = equilibrium.ToArray(el.childNodes).map(function (nod, ind) {
        if (nod.nodeName == '#text') {
            var val = equilibrium.ValueOfProperty(nod.nodeValue.trim());
            if (val != null) {
                return '//' + nod.nodeValue.replaceAll('\n', '') + '\n\tvar nodval' + ind + ' = ' + equilibrium.CreateReadFncString('\'' + val.input.replaceAll('\'', '\\\'') + '\'') + ';\n\tif (nodes[' + ind + '].value != nodval' + ind + ') { nodes[' + ind + '].value = nodval' + ind + '; nodes[' + ind + '].nod.nodeValue = nodval' + ind + '; };';
            }
        };
    }).filter(function (f) { return f != null; });
    var atributeFncs = equilibrium.ToArray(el.attributes).map(function (attr, ind) {
        if (attr.value.startsWith('javascript:'))
            attr.value = attr.value.replace('javascript:', '');
        var val = equilibrium.ValueOfProperty(attr.value);
        if (val != null) {
            return '//' + attr.value + '\n\tvar attrval' + ind + ' = ' + equilibrium.CreateReadFncString('\'' + val.input.replaceAll('\'', '\\\'') + '\'') + ';\n\tif (attrs[' + ind + '].value != attrval' + ind + ') { attrs[' + ind + '].value = attrval' + ind + '; \n\t attrs[' + ind + '].attr.value = attrval' + ind + ';};';
        }
    }).filter(function (f) { return f != null; });
    var all = nodFncs.concat(atributeFncs);
    if (all.length > 0) {
        var fnc = new Function('control', '//' + el.outerHTML.split('\n').first() + '\nvar nodes = equilibrium.ToArray(control.childNodes).map(function(f) { return {nod: f, value: undefined}});\nvar attrs = equilibrium.ToArray(control.attributes).map(function(f) { return {attr: f, value: undefined}});\nreturn function(scope, additionals) {\n\t' + all.join('\n\t') + '\n};');
        el.replaceFnc = fnc;
    } else el.replaceFnc = function () { return EmptyFunction; };
    el.repFnc = el.replaceFnc(el);
}
equilibrium.InsertFncs = function (clone, element) {
    clone.onFncs = element.onFncs;
    clone.propFncs = element.propFncs;
    clone.replaceFnc = element.replaceFnc;
    clone.repFnc = element.replaceFnc(clone);
    for (var i = 0; i < element.childElementCount; i++)
        equilibrium.InsertFncs(clone.children[i], element.children[i]);
}
equilibrium.CloneElement = function (element) {
    var clone = element.cloneNode(true);
    equilibrium.InsertFncs(clone, element);
    return clone;
}
var comment = $('<!---->')[0];
equilibrium.CreateRepeatObserverFromElement = function (element) {
    var repeatattr = element.attributes['emrepeat'];
    if (repeatattr) {
        var spl = repeatattr.value.split(' in ');
        var $comment = comment.cloneNode();
        var template = equilibrium.CloneElement(element);

        element.parentNode.insertBefore($comment, element);
        element.parentNode.removeChild(element);
        obs = new equilibrium.RepeatObserver($comment, function (f) { return template; });
        obs.RepeatPropertyShort = spl[0].trim();
        obs.RepeatProperty = spl[1].trim();
        return obs;
    };
};
equilibrium.AttachFiltersToObserver = function (obs, element) {
    var filterattr = element.attributes['emfilter'];
    if (filterattr) {
        var filterValue = filterattr.value;
        var fnc = function (dat, index, subject, topParent, repeatPropertyShort) {
            subject = equilibrium.CopyAllProperties(subject);
            subject[repeatPropertyShort] = dat;
            subject.index = index;
            var scope = equilibrium.getScopeFromString(subject, filterValue, null, topParent);
            return equilibrium.scopeValue(scope.scope, scope.property, subject);
        };
        obs.FilterFunctions.push(fnc);
    }
    return obs;
};
equilibrium.AttachSortToObserver = function (obs, element) {
    var sortattr = element.attributes['emsort'];
    if (sortattr) {
        var sortValue = sortattr.value;
        var fnc = function (dats, subject, topParent, repeatProperty) {
            subject = equilibrium.CopyAllProperties(subject);
            subject[repeatProperty] = dats;
            var scope = equilibrium.getScopeFromString(subject, sortValue, null, topParent);
            return equilibrium.scopeValue(scope.scope, scope.property, subject);
        };
        obs.SortFunctions.push(fnc);
    }
    return obs;
};
equilibrium.ConnectElementsAndParts = function (elements, templates) {
    var connections = [];
    elements.forEach(function (el, index) {
        var temp = templates[index];
        for (var i = 0; i < temp.childNodes.length; i++)
            if (temp.childNodes[i].nodeName == '#text')
                if (equilibrium.ValueOfProperty(temp.childNodes[i].nodeValue)) { //temp.childNodes[i].textContent temp.childNodes[i].data
                    connections.push({ template: temp.childNodes[i].nodeValue, element: el.childNodes[i], parent: el });
                }
        for (var i = 0; i < temp.attributes.length; i++)
            if (equilibrium.ValueOfProperty(temp.attributes[i].value)) {
                connections.push({ template: temp.attributes[i].value, element: el.attributes[i], isAtribute: true, parent: el });
            }
    });
    return connections;
}
equilibrium.ReplaceScopeValues = function (control, scope, additionals) {
    control.repFnc(scope, additionals);
}

equilibrium.getJQueryObj = function (control) {
    if (control == null) return control;
    if (control.$control == null)
        control.$control = $(control);
    return control.$control;
}
equilibrium.BindOnValues = function (mainContainer) {
    mainContainer.onFncs.forEach(function (f) {
        equilibrium.getJQueryObj(mainContainer).on(f.name, function () { var obj = mainContainer.getScope();  f.fnc(obj.scope, obj.additionals, mainContainer); });
    });
}
equilibrium.ChangePropValues = function (mainContainer, scope, additionals) {
    if (!IsNotNullAndHasAny(mainContainer.propFncs))
        return;

    mainContainer.propFncs.forEach(function (propfnc) {
        propfnc.fnc(scope, additionals);
    });
};

equilibrium.allOnFncs = [];// ["abort", "auxclick", "beforecopy", "beforecut", "beforepaste", "blur", "cancel", "canplay", "canplaythrough", "change", "click", "close", "contextmenu", "copy", "cuechange", "cut", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "error", "focus", "gotpointercapture", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", "lostpointercapture", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "paste", "pause", "play", "playing", "pointercancel", "pointerdown", "pointerenter", "pointerleave", "pointermove", "pointerout", "pointerover", "pointerup", "progress", "ratechange", "reset", "resize", "scroll", "search", "seeked", "seeking", "select", "selectstart", "stalled", "submit", "suspend", "timeupdate", "toggle", "volumechange", "waiting", "webkitfullscreenchange", "webkitfullscreenerror", "wheel"];
equilibrium.attrFncs = {
    onfnc: function (property, subject, observer, control, name, unbindedfnc) {
        var sub = equilibrium.CopyAllProperties(observer.Parent);
        sub.observer = observer;
        var scope = equilibrium.getScopeFromString(sub, control.attr(name), control);
        if (scope === undefined)
            throw control.attr(name) + " is undefined!";
        equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);
        if (unbindedfnc) {
            var fncscope = equilibrium.getScopeFromString(window, unbindedfnc, control);
            equilibrium.scopeValue(fncscope.scope, fncscope.property, fncscope.topParent);
        }
    }
}
equilibrium.GetOnValues = function () {
    return equilibrium.allOnFncs.map(function (f) { return { name: 'emon' + f, on: f, fncon: equilibrium.attrFncs.onfnc }; });
}

equilibrium.allPropFncs = [];// ["classList", "className", "clientHeight", "clientLeft", "clientTop", "clientWidth", "checked", 'disabled', "draggable", "hidden", "id", "isContentEditable", "lang", "offsetHeight", "offsetLeft", "offsetTop", "offsetWidth", "scrollHeight", "scrollTop", "scrollWidth", "slot", "spellcheck", 'src', "tabIndex", "title", "translate", "type", "value"];
equilibrium.propFncs = {
    fnc: function (property, subject, observer, control, name) {
        var scope = equilibrium.getScopeFromString(subject, control.attr(name), control);
        var val = undefined;
        if (scope === undefined)
            equilibrium.insertPropToScope(subject, control.attr(name));
        else
            val = equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);
        control.prop(property, val != null ? val : null);
        if (val === undefined && control.is("select"))
            control.prop("selectedIndex", -1);
    },
    fnctoggle: function (property, subject, observer, control, name) {
        var scope = equilibrium.getScopeFromString(subject, control.attr(name), control);
        var val = null;
        if (scope === undefined)
            equilibrium.insertPropToScope(subject, control.attr(name));
        else
            var val = equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);

        control.toggle((val !== null) ? val : null);
    },
    fncon: function (property, subject, observer, control, name, unbindedfnc) {
        var scope = equilibrium.getScopeFromString(observer.Parent, control.attr(name), control);
        if (scope === undefined)
            equilibrium.insertPropToScope(observer.Parent, control.attr(name));
        else if (scope.scope[scope.property] != equilibrium.getJQueryObj(control).prop(property)) {
            scope.scope[scope.property] = equilibrium.getJQueryObj(control).prop(property);
            equilibrium.CopyValuesFromObject(scope.topParent, observer.Subject);
            observer.Subject.Notify();
        };
        if (unbindedfnc) {
            var fncscope = equilibrium.getScopeFromString(window, unbindedfnc, control);
            equilibrium.scopeValue(fncscope.scope, fncscope.property, fncscope.topParent);
        };
    },
    emptycomment: $('<!---->')[0],
    fncif: function (property, subject, observer, control, name) {
        var scope = equilibrium.getScopeFromString(subject, control.attr(name), control);
        var val = null;
        if (scope === undefined)
            equilibrium.insertPropToScope(subject, control.attr(name));
        else
            var val = equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);

        control = control[0];
        if (val) {
            if (observer.IfControl != control) {
                observer.IfControl.replaceWith(control);
                observer.IfControl = control;
            };
        } else if (observer.IfControl == control) {
            var com = equilibrium.propFncs.emptycomment.cloneNode(false);
            control.replaceWith(com);
            observer.IfControl = com;
        };
    },
    fncempty: function () { return; }
}
equilibrium.GetPropValues = function () {
    return [
		{ name: 'emchecked', property: 'checked', on: 'click', fnc: equilibrium.propFncs.fnc, fncon: equilibrium.propFncs.fncon },
		{ name: 'emvalue', property: 'value', on: 'change', fnc: equilibrium.propFncs.fnc, fncon: equilibrium.propFncs.fncon },
		{ name: 'emvisible', property: 'null', on: 'null', fnc: equilibrium.propFncs.fnctoggle, fncon: equilibrium.propFncs.fncempty },
		{ name: 'emif', property: 'null', on: 'null', fnc: equilibrium.propFncs.fncif, fncon: equilibrium.propFncs.fncempty }
    ].concat(equilibrium.allPropFncs.map(function (f) { return { name: 'emprop' + f, property: f, on: 'null', fnc: equilibrium.propFncs.fnc, fncon: equilibrium.propFncs.fncempty }; }));
}
equilibrium.allAttrFncs = []; // ["classList", "className", "clientHeight", "clientLeft", "clientTop", "clientWidth", "checked", 'disabled', "draggable", "hidden", "id", "isContentEditable", "lang", "offsetHeight", "offsetLeft", "offsetTop", "offsetWidth", "scrollHeight", "scrollTop", "scrollWidth", "slot", "spellcheck", 'src', "tabIndex", "title", "translate", "type", "value"];
equilibrium.GetAttrValues = function () {
    var fnc = function (property, subject, observer, control, name) {
        var scope = equilibrium.getScopeFromString(subject, control.attr(name), control);
        var val = null;
        if (scope === undefined)
            equilibrium.insertPropToScope(subject, control.attr(name));
        else
            val = equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);
        control.attr(property, (val != null) ? val : null);
    };

    var fncempty = function () { return; };
    return equilibrium.allAttrFncs.map(function (f) { return { name: 'emattr' + f, property: f, on: 'null', fnc: fnc, fncon: fncempty }; });
}
equilibrium.getFunctionParameters = function (scope, str) {
    var scopeSplit = equilibrium.splitParameters(str, ',').map(function (f) { return f.trim(); });
    var pars = scopeSplit.map(function (f) {
        var fscope = equilibrium.getScopeFromString(scope, f);
        if (fscope == null)
            if (equilibrium.FunctionPartOfProperty(f) == null)
                return undefined;
        return equilibrium.scopeValue(fscope.scope, fscope.property, fscope.topParent);
    });
    return pars;
}
equilibrium.splitParametersBackup = [];
equilibrium.splitParameters = function (str, splitby) {
    var find = equilibrium.splitParametersBackup.find(function (f) { return f.name === str && f.splitBy == splitby; });
    if (find)
        return find.value;
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
    equilibrium.splitParametersBackup.push({ name: str, value: pars, splitBy: splitby });
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
            wasInside = true;
            inSpecialChars++;
        }
        else if (ch === closechar)
            inSpecialChars--;
        if (inSpecialChars > 0) {
            par += ch;
        }
        else if (inSpecialChars <= 0 && wasInside)
            break;
    }
    return par.substring(1, par.length);
}
equilibrium.GetPropName = function (name) {
    var nameComplex = equilibrium.FunctionPartOfProperty(name) || equilibrium.ArrayPartOfProperty(name);
    if (nameComplex != null)
        name = nameComplex.input.substring(0, nameComplex.index);
    return name;
}
equilibrium.scopeHasProperty = function (scope, property) {
    return (scope['hasOwnProperty'] != null && scope.hasOwnProperty(property)) || scope[property] != undefined;
}
equilibrium.getScopeFromString = function (owner, string, thisElement, scopeParent) {
    var scope = equilibrium.getScopeFromStr(owner, string);

    if ((scope == null || !equilibrium.scopeHasProperty(scope.scope, equilibrium.GetPropName(scope.property))) && scopeParent != null)
        scope = equilibrium.getScopeFromStr(scopeParent, string);
    if (scope == null || !equilibrium.scopeHasProperty(scope.scope, equilibrium.GetPropName(scope.property)))
        scope = equilibrium.getScopeFromStr(window, string);
    if (scope == null || !equilibrium.scopeHasProperty(scope.scope, equilibrium.GetPropName(scope.property)))
        if (!(scope != null && equilibrium.propertyIsStringBoolNumberOrArray(scope.property)))
            return undefined;

    scope.topParent = (scopeParent != null) ? scopeParent : owner;
    return scope;
}
equilibrium.getScopeFromStr = function (owner, string) {
    var scope = owner;
    var scopeSplit = equilibrium.splitParameters(string, '.');
    for (var i = 0; i < scopeSplit.length - 1; i++) {
        scope = equilibrium.scopeValue(scope, scopeSplit[i], owner);
        if (scope == undefined) return;
    }
    return { 'topParent': owner, 'scope': scope, 'property': scopeSplit[scopeSplit.length - 1] };
}
equilibrium.insertPropToScope = function (owner, string) {
    var scope = owner;
    var scopeSplit = equilibrium.splitParameters(string, '.');
    for (var i = 0; i < scopeSplit.length - 1; i++) {
        if (scope[scopeSplit[i]] === undefined)
            scope[scopeSplit[i]] = new Object();
        scope = scope[scopeSplit[i]];
    }
    scope[scopeSplit[scopeSplit.length - 1]] = undefined;
    return owner;
}
equilibrium.scopeValue = function (scope, property, scopeparent) {
    //try {
    if (equilibrium.propertyIsFunction(property)) {
        var fncpart = equilibrium.FunctionPartOfProperty(property);
        var fncname = fncpart.input.substring(0, fncpart.index);
        var fncscope = equilibrium.getScopeFromString(scope, fncname, null, scopeparent);
        if (fncscope === undefined)
            throw "cannot execute " + property;
        // var fncvalue = fncscope.scope[fncscope.property];
        var parstr = equilibrium.FindEnclosedPartOfString(fncpart.input.substring(fncpart.index), '(', ')');
        var pars = equilibrium.getFunctionParameters(scopeparent, parstr);
        if (pars.length > 0) {
            if (pars.length === 1)
                scope = fncscope.scope[fncscope.property](pars[0]);
            else
                scope = fncscope.scope[fncscope.property].apply(this, pars);
        } else
            scope = fncscope.scope[fncscope.property]();
        property = property.substring((fncname + parstr).length + 2);
    }
    if (equilibrium.propertyIsArray(property)) {
        do {
            var arr = equilibrium.ArrayPartOfProperty(property);
            if (arr && arr[0].length != arr.input.length) {
                if (arr.index > 0) {
                    scope = scope[property.substring(0, arr.index)];
                    property = property.substring(arr.index);
                }
                scope = scope[arr[1]];
                property = property.substring(arr[0].length);
                if (property.length > 0 && property[0] === '.')
                    property = property.substring(1);

            } else
                break;
        } while (true);
    }
    var retScope = scope;
    if (property.length > 0) {
        retScope = retScope[property];
    }

    if (retScope === undefined) {
        try {
            return eval(property);
        } catch (err) { };
        return;
    } else
        return retScope;
    //} catch (err) { console.log(err); throw "cannot execute " + property; };
}

equilibrium.propertyIsStringBoolNumberOrArray = function (prop) {
    prop = prop.trim();
    return (prop === "null" || equilibrium.propertyIsString(prop) ||
			(prop === "false" || prop === "true") ||
			(prop.startsWith("[") && prop.endsWith("]")) ||
			!isNaN(prop));
}
equilibrium.propertyIsString = function (prop) {
    return (prop.startsWith("\"") && prop.endsWith("\"")) ||
        (prop.startsWith("'") && prop.endsWith("'"));
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
equilibrium.ValueOfProperty = function (property) {
    var patt1 = /\{\{(.*?)\}\}/;
    return property.match(patt1);
}
equilibrium.GetAllChildrens = function (element) {
    if (element.children.length > 0) {
        var childs = equilibrium.ToArray(element.children);
        var allelements = childs.map(function (f) { return equilibrium.GetAllChildrens(f); }).filter(function (f) { return f != null; }).forEach(function (f) { if (f) f.forEach(function (g) { childs.push(g); }) });
        return childs;
    }
    else
        return [];
}
equilibrium.Bind = function (subject, topParent) {
    function newObservers(elements, subject) {
        var singleObservers = [];
        elements.forEach(function (element, ind) {
            var obs = equilibrium.CreateRepeatObserverFromElement(element);
            if (obs != null) {
                var maxdrawingatattr = element.attributes['emmaxdrawings'];
                if (maxdrawingatattr) {
                    var maxDrawing = parseFloat(maxdrawingatattr.value);
                    if (!isNaN(maxDrawing) && maxDrawing > 0)
                        obs.MaxDrawingsAtTime = maxDrawing;
                };
                obs = equilibrium.AttachFiltersToObserver(obs, element);
                obs = equilibrium.AttachSortToObserver(obs, element);
                obs.isOnMainBind = true;
                subject.AddObserver(obs);
            } else {
                obs = new equilibrium.ElementObserver(element);
                singleObservers.push(obs);
            }
            obs.additionals = { this: element, observer: obs };
        });
        singleObservers.forEach(function (f) { subject.AddObserver(f); f.isOnMainBind = true; });
    }
    topParent = topParent[0];
    var allAttributes = [];
    equilibrium.GetAllAttributeNames(document.documentElement)
		.forEach(function (f) { f.forEach(function (g) { if (g.startsWith('em')) allAttributes.push(g); }) });

    var attrs = allAttributes.filter(function (f) { return f.startsWith('emattr'); }).map(function (f) { return f.substring(6); });
    var props = allAttributes.filter(function (f) { return f.startsWith('emprop'); }).map(function (f) { return f.substring(6); });
    var ons = allAttributes.filter(function (f) { return f.startsWith('emon'); }).map(function (f) { return f.substring(4); });

    //equilibrium.allAttrFncs = [];
    attrs.forEach(function (f) { if (equilibrium.allAttrFncs.find(function (g) { return g === f; }) == null) equilibrium.allAttrFncs.push(f); })
    //equilibrium.allPropFncs = [];
    props.forEach(function (f) { if (equilibrium.allPropFncs.find(function (g) { return g === f; }) == null) equilibrium.allPropFncs.push(f); })
    //equilibrium.allOnFncs = [];
    ons.forEach(function (f) { if (equilibrium.allOnFncs.find(function (g) { return g === f; }) == null) equilibrium.allOnFncs.push(f); })

    var allChilds = equilibrium.GetAllChildrens(topParent).pushMany([topParent]);
    allChilds.forEach(function (f) { equilibrium.CreateReplaceFncs(f); });
    allChilds.forEach(function (f) { equilibrium.CreatePropFncs(f); });
    allChilds.forEach(function (f) { equilibrium.CreateOnFncs(f); });

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

    return subject;
}
equilibrium.FindAllElements = function (topParent) {
    var groupAttributes = ['emrepeat'];
    var allAttributes = equilibrium.GetOnValues().map(function (f) { return f.name }).concat(equilibrium.GetPropValues().map(function (f) { return f.name })).concat(groupAttributes);
    var allElements = equilibrium.GetAllChildrens(topParent);
    var filtered = allElements.filter(function (f) { return (equilibrium.ItemHasAttributes(f, allAttributes) || equilibrium.ValueOfProperty(f.outerHTML) != null) && !equilibrium.ParentHasAttributes(f, groupAttributes, topParent) });
    return filtered;
}
equilibrium.ParentHasAttributes = function (element, attributes, topparent) {
    var parent = element.parentElement;
    if (parent == topparent)
        return false;
    var $parent = equilibrium.getJQueryObj(parent);
    var blns = attributes.find(function (f) { if ($parent.attr(f)) return true; });
    if (blns) return true;
    return equilibrium.ParentHasAttributes(parent, attributes, topparent);
}
equilibrium.ItemHasAttributes = function (element, attributes) {
    element = equilibrium.getJQueryObj(element);
    var blns = attributes.find(function (f) { if (element.attr(f)) return true; });
    if (blns) return true;
}
equilibrium.GetAllAttributeNames = function (element) {
    return equilibrium.GetAllChildrens(element)
		.map(function (f) { return equilibrium.ToArray(f.attributes).map(function (f) { return f.name; }); })
		.filter(function (f) { return f.length > 0; });
};

equilibrium.CopyValuesFromObject = function (fromObject, toObject) {
    for (var k in toObject) {
        if (fromObject[k] != null)
            toObject[k] = fromObject[k];
    }
    return toObject;
}
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
equilibrium.ToArray = function (fromObject) {
    return fromObject.length == 0 ? [] : (0).RangeTo(fromObject.length - 1).map(function (f) { return fromObject[f]; });
};

function UnloadDataOnExit(fnc) {
    $("#MainContentContainer").on("OnPageUnload", fnc);
}
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

                if (deep && typeof value == 'object' && value !== null) {
                    keysMap += FastClone._getKeyMap(value, deep, path, index);
                } else {
                    keysMap += 'this' + path + ' = src' + path + ';';
                }
            }
        }

        return keysMap;
    }
};
