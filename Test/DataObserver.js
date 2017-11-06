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
		return jQuery.extend(true, {}, obj);
	}
if (!DeepCloneArray)
	function DeepCloneArray(obj) {
		return jQuery.extend(true, [], obj);
	}
if (!('find' in Array.prototype)) {
    Array.prototype.find= function(find, that /*opt*/) {
        var v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && find.call(that, v= this[i], i, this))
                return v;
        return null;
    };
}	
if (!Array.prototype.find) {
    Array.prototype.find = function (fnc) {
        for (var i = 0; i < this.length; i++)
            if (fnc(this[i]))
                return this[i];
    }
}
// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf= function(find, i /*opt*/) {
        if (i===undefined) i= this.length-1;
        if (i<0) i+= this.length;
        if (i>this.length-1) i= this.length-1;
        for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map= function(mapper, that /*opt*/) {
        var other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}
if (!Array.prototype.findby) {
    Array.prototype.findby = function (prop, value) {
        if (value == null)
            return this.find(function (f) { return f == value; });
        else
            return this.find(function (f) { return f[prop] == value; });
    }
}
if (!Array.prototype.filterby) {
    Array.prototype.filterby = function (prop, value) {
        if (value == null)
            return this.filter(function (f) { return f == value; });
        else
            return this.filter(function (f) { return f[prop] == value; });
    }
}
if (!Array.prototype.sortby) {
    Array.prototype.sortby = function (prop, sortfnc) {
        if (sortfnc == null)
            sortfnc = function (f, g) { return f > g; };
        var retdata = this.map(function (f) { return f; });
        for (var i = 0; i < retdata.length - 1; i++)
            for (var j = i + 1; j < retdata.length; j++)
                if (sortfnc(retdata[i][prop], retdata[j][prop])) {
                    var temp = retdata[i];
                    retdata[i] = retdata[j];
                    retdata[j] = temp;
                };
        return retdata;
    }
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
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (f) {
        if (this == null || this.length === 0 || this.length < f.length)
            return false;

        for (var i = 0; i < f.length; i++)
            if (this.charAt(i) !== f.charAt(i))
                return false;

        return true;
    }
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (f) {
        if (this == null || this.length === 0 || this.length < f.length)
            return false;

        for (var i = f.length - 1; i >= 0; i--)
            if (this.charAt(i) !== f.charAt(i))
                return false;

        return true;
    }
}
if (!String.prototype.trim) {
    String.prototype.trim = function () { return $.trim(this);}
}
if (!HashCode)
	function HashCode(obj) {
		var str = JSON.stringify(obj);
		var hash = 0;
		if (str.length == 0) return hash;
		for (i = 0; i < str.length; i++) {
			char = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	}
var equilibrium = new Object();
equilibrium.DataSubject = function () {
    var observers = [];

    this.AddObserver = function (observer) {
        observers.push(observer);
        observer.Parent = this;
    }
    this.RemoveObserver = function (observer) {
        var index = observers.indexOf(observer);
        observers.splice(index, 1);
    }
    this.GetAllObservers = function () { return observers; }
    this.Notify = function () {
        var subject = this;
        observers.forEach(function (f) { f.Update(subject); });
    }
}
equilibrium.HistoryObserver = function (maxObservings) {
    var historyData = [];
    var historyIndex = -1;
    var lastSaved;
    this.Parent = null;
    this.Update = function (dat) {
        var histDat = DeepClone(equilibrium.CopyJustProperties(this.Parent));
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
    this.RestoreHistoryData = function (data) { historyData = DeepCloneArray(data.historyData); historyIndex = data.historyIndex; if (this.Parent != null) this.HistoryGo(0); };
    this.HistoryGo = function (ind) { historyIndex += ind; this.Parent = equilibrium.DeleteJustProperties(this.Parent); return equilibrium.CopyAllProperties(DeepClone(historyData[historyIndex]), this.Parent); }
    this.CanGo = function (step) { return historyIndex + step >= 0 && historyIndex + step < historyData.length; };
    var DeleteHistoryDataAfterIndex = function (historyData, index) {
        return historyData.filter(function (f, ind) { return ind <= index; });
    };
    var DeleteIfMoreThenMax = function (historyData, maxObservings) {
        return historyData.filter(function (f, ind) { return ind >= historyData.length - maxObservings; });
    };
};
equilibrium.RepeatObserver = function ($comment, drawfnc) {
    var data = null;
    var drawfunc = drawfnc;
    var templateChilds = equilibrium.GetParentWithAllChildrens(drawFunction(null));
    this.FilterFunctions = [];
    this.SortFunctions = [];
    this.Parent = null;
    this.RepeatProperty = '';
    this.RepeatPropertyShort = '';
    this.DrawedElements = [];
    function drawFunction(f) { return drawfunc(f); }

    this.Update = function (dat) {
        data = dat;
        this.Redraw(data);
    }
    this.Redraw = function (data) {
        var repeatProperty = this.RepeatProperty;
        var repeatPropertyShort = this.RepeatPropertyShort;
        var subject = this.Parent;
        var observer = this;
        var arrData = this.FilteredData(data);
        if (arrData) {
            var DrawedElements = this.DrawedElements;
            var newObservers = [];
            var drawedElements = [];

            for (var i = DrawedElements.length - 1; i >= arrData.length; i--) {
                DrawedElements[i].forEach(function (f) { f.RemoveAll(); });
                DrawedElements.splice(i, 1);
            };
            arrData.forEach(function (dat, index) {
                var observers = [];
                if (DrawedElements.length > index)
                    observers = DrawedElements[index];
                else {
                    var element = $(drawFunction(dat));
                    equilibrium.FindAllElements(element).forEach(function (f) {
                        var obs = equilibrium.CreateRepeatObserverFromElement($(f));
                        if (obs == null)
                            obs = new equilibrium.ElementObserver($(f));
                        obs = equilibrium.AttachFiltersToObserver(obs, $(f));
                        observers.push(obs);
                    });
                    observers.push(new equilibrium.ElementObserver(element));
                    drawedElements.push(element);
                    newObservers.push(observers);
                };
                var scope = equilibrium.CopyAllProperties(subject);
                scope[repeatPropertyShort] = dat;
                scope.index = index;
				scope.observer = observer;
                observers.forEach(function (f) { f.Parent = scope; });
            });
            var insertElements = drawedElements.map(function (f) { return f[0]; });
            if (this.DrawedElements.length == 0)
                $comment.after(insertElements);
            else 
				$(this.DrawedElements[this.DrawedElements.length - 1].last().LastDrawedElement()).after(insertElements);

            this.DrawedElements = this.DrawedElements.concat(newObservers);
            this.DrawedElements.forEach(function (f) { f.forEach(function (g) { g.Redraw(); }); });
        }
    }

    this.FilteredData = function () {
        var scope = equilibrium.getScopeFromString(this.Parent, this.RepeatProperty);
        if (scope == null)
            return;

        var filtered = equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);
        this.SortFunctions.forEach(function (f) { filtered = f(filtered); });

        var repeatPropertyShort = this.RepeatPropertyShort;
        this.FilterFunctions.forEach(function (f) { filtered = filtered.filter(function (dat, ind) { return f(dat, ind, scope.scope, repeatPropertyShort); }); });

        return filtered;
    }
    this.LastDrawedElement = function () { return (this.DrawedElements.length == 0) ? $comment : this.DrawedElements[this.DrawedElements.length - 1].LastDrawedElement() };
    this.RemoveAll = function () { $($comment).remove(); this.DrawedElements.forEach(function (f) { f.forEach(function (g) { g.RemoveAll(); }); }); $comment = null; this.DrawedElements = null; };
}
equilibrium.ElementObserver = function ($elem) {
    var $element = $elem;
    var templateChilds = [$($element[0].outerHTML)];
    var allElements = [$elem];
    var elementsAndParts = equilibrium.ConnectElementsAndParts(allElements, templateChilds);
    var data = null;
    this.Parent = null;

    this.Update = function (dat) {
        data = dat;
        this.Redraw(data);
    }

    var isFirstTime = true;
    this.Redraw = function () {
        equilibrium.ReplaceScopeValues(elementsAndParts, this.Parent);
        equilibrium.ChangePropValues(allElements, this.Parent, this);

        if (isFirstTime) {
            equilibrium.BindOnValues(allElements, this.Parent, this);
            isFirstTime = false;
        }
    }
    this.LastDrawedElement = function () { return allElements[0]; };
    this.RemoveAll = function () { $($element).remove(); $element = null; };
}
equilibrium.CreateRepeatObserverFromElement = function (element) {
    var repeatattr = element.attr('emrepeat');
    if (repeatattr) {
        var spl = repeatattr.split(' in ');
        var comment = $('<!--' + repeatattr + '-->');
        var template = element[0].outerHTML;
        element.before(comment);
        element.remove();
        obs = new equilibrium.RepeatObserver(comment, function (f) { return template; });
        obs.RepeatPropertyShort = spl[0];
        obs.RepeatProperty = spl[1];
        return obs;
    };
};
equilibrium.AttachFiltersToObserver = function (obs, element) {
    var filterattr = $(element).attr('emfilter');
    if (filterattr) {
        var fnc = function (dat, index, subject, repeatPropertyShort) {
            subject = equilibrium.CopyAllProperties(subject);
            subject[repeatPropertyShort] = dat;
            subject.index = index;
            var scope = equilibrium.getScopeFromString(subject, filterattr);
            return equilibrium.scopeValue(scope.scope, scope.property, subject);
        };
        obs.FilterFunctions.push(fnc);
    }
    return obs;
};
equilibrium.ConnectElementsAndParts = function(elements, templates) {
    var connections = [];
    elements.forEach(function (el, index) {
        var temp = $(templates[index])[0];
        for (var i = 0; i < temp.childNodes.length; i++)
            if (temp.childNodes[i].nodeName == '#text')
                if (equilibrium.ValueOfProperty(temp.childNodes[i].nodeValue)) //temp.childNodes[i].textContent temp.childNodes[i].data
                    connections.push({ template: temp.childNodes[i].nodeValue, element: $(el)[0].childNodes[i], parent: $(el) });

        for (var i = 0; i < temp.attributes.length; i++)
            if (equilibrium.ValueOfProperty(temp.attributes[i].value))
                connections.push({ template: temp.attributes[i].value, element: $(el)[0].attributes[i], parent: $(el), isAtribute: true });
    });
    return connections;
}
equilibrium.ReplaceScopeValues = function(connection, scope) {
    scope = equilibrium.CopyAllProperties(scope);
    connection.forEach(function (conn, index) {
        scope['this'] = $(conn.parent);
        if (conn.isAtribute)
            conn.element.value = equilibrium.ReplaceValues(conn.template, scope);
        else
            conn.element.nodeValue = equilibrium.ReplaceValues(conn.template, scope);
	});
}
equilibrium.ReplaceValues = function (containerstring, subject) {
    var subj = subject;

    do {
        var valueString = equilibrium.ValueOfProperty(containerstring);
        if (valueString) {
            var scope = equilibrium.getScopeFromString(subject, valueString[1]);
            if (scope != null)
                containerstring = containerstring.replace(valueString[0], equilibrium.scopeValue(scope.scope, scope.property, scope.topParent));
            else {
                if (equilibrium.FunctionPartOfProperty(valueString[1]) != null) {
                    console.log("cannot execute " + valueString[1]);
                    throw "";
                } else
                    containerstring = containerstring.replace(valueString[0], "");
            }
        }
        else
            break;
    } while (true);
    return containerstring;
}
equilibrium.BindOnValues = function (mainContainer, subject, observer) {
    var addSubject = function (f) { f.subject = subject; f.observer = observer; f.mainContainer = mainContainer; return f; };
    var onvalues = equilibrium.GetPropValues().concat(equilibrium.GetOnValues()).map(addSubject);

    onvalues.forEach(function (f) {
        $.makeArray(f.mainContainer).forEach(function (container) {
            var control = $(container);
            if (control.attr(f.name) != null) {
                var jsOnFnc = 'on' + f.on;
                var jsFnc = $(container).attr(jsOnFnc);
                var fnc = function () {
                    f.fncon(f.property, f.subject, f.observer, control, f.name, jsFnc);
                };
                control.on(f.on, fnc);
                $(container)[0][jsOnFnc] = null;
            };
        });
    });
}
equilibrium.ChangePropValues = function (mainContainer, subject, observer) {
    var addSubject = function (f) { f.subject = subject; f.observer = observer; f.mainContainer = mainContainer; return f; };
    propvalues = equilibrium.GetPropValues().concat(equilibrium.GetAttrValues()).map(addSubject);

    propvalues.forEach(function (f) {
        $.makeArray(f.mainContainer).forEach(function (container) {
            var control = $(container);
            if (control.attr(f.name)) {
                f.fnc(f.property, f.observer.Parent, f.observer, control, f.name);
            };
        });
    });
};

equilibrium.allOnFncs = ["abort", "auxclick", "beforecopy", "beforecut", "beforepaste", "blur", "cancel", "canplay", "canplaythrough", "change", "click", "close", "contextmenu", "copy", "cuechange", "cut", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "error", "focus", "gotpointercapture", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", "lostpointercapture", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "paste", "pause", "play", "playing", "pointercancel", "pointerdown", "pointerenter", "pointerleave", "pointermove", "pointerout", "pointerover", "pointerup", "progress", "ratechange", "reset", "resize", "scroll", "search", "seeked", "seeking", "select", "selectstart", "stalled", "submit", "suspend", "timeupdate", "toggle", "volumechange", "waiting", "webkitfullscreenchange", "webkitfullscreenerror", "wheel"];
equilibrium.GetOnValues = function () {
    var onfnc = function (property, subject, observer, control, name, unbindedfnc) {
        var scope = equilibrium.getScopeFromString(observer.Parent, control.attr(name), $(control).data(), control);
        if (scope === undefined)
            throw control.attr(name) + " is undefined!";
        equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);
        if (unbindedfnc) {
            var fncscope = equilibrium.getScopeFromString(window, unbindedfnc, null, $(control)[0]);
            equilibrium.scopeValue(fncscope.scope, fncscope.property, fncscope.topParent);
        }
    }
    return equilibrium.allOnFncs.map(function (f) { return { name: 'emon' + f, on: f, fncon: onfnc }; });
}
equilibrium.allPropFncs = ["classList", "className", "clientHeight", "clientLeft", "clientTop", "clientWidth", "checked", 'disabled', "draggable", "hidden", "id", "isContentEditable", "lang", "offsetHeight", "offsetLeft", "offsetTop", "offsetWidth", "scrollHeight", "scrollTop", "scrollWidth", "slot", "spellcheck", 'src', "tabIndex", "title", "translate", "type", "value"];
equilibrium.GetPropValues = function () {
    var fnc = function (property, subject, observer, control, name) {
        var scope = equilibrium.getScopeFromString(subject, control.attr(name), $(control).data(), control);
        var val = undefined;
        if (scope === undefined)
            equilibrium.insertPropToScope(subject, control.attr(name));
        else
            val = equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);
        control.prop(property, val);
		if (val === undefined && control.is("select"))
			control.prop("selectedIndex", -1);
    };
    var fnctoggle = function (property, subject, observer, control, name) {
        var scope = equilibrium.getScopeFromString(subject, control.attr(name), $(control).data(), control);
        var val = null;
        if (scope === undefined)
            equilibrium.insertPropToScope(subject, control.attr(name));
        else
            var val = equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);

        control.toggle((val !== null) ? val : null);
    };
    var fncon = function (property, subject, observer, control, name, unbindedfnc) {
        var scope = equilibrium.getScopeFromString(observer.Parent, control.attr(name), $(control).data(), control);
        if (scope === undefined)
            equilibrium.insertPropToScope(observer.Parent, control.attr(name));
        else if (scope.scope[scope.property] != $(control).prop(property)) {
            scope.scope[scope.property] = $(control).prop(property);
            equilibrium.CopyValuesFromObject(scope.topParent, subject);
            subject.Notify();
        };
        if (unbindedfnc) {
            var fncscope = equilibrium.getScopeFromString(window, unbindedfnc, null, $(control)[0]);
            equilibrium.scopeValue(fncscope.scope, fncscope.property, fncscope.topParent);
        };
    };
    var fncempty = function () { return; };
    return [
			{ name: 'emchecked', property: 'checked', on: 'click', fnc: fnc, fncon: fncon },
			{ name: 'emvalue', property: 'value', on: 'change', fnc: fnc, fncon: fncon },
			{ name: 'emvisible', property: 'null', on: 'null', fnc: fnctoggle, fncon: fncempty }
    ].concat(equilibrium.allPropFncs.map(function (f) { return { name: 'emprop' + f, property: f, on: 'null', fnc: fnc, fncon: fncempty }; }));
}
equilibrium.allAttrFncs = ["classList", "className", "clientHeight", "clientLeft", "clientTop", "clientWidth", "checked", 'disabled', "draggable", "hidden", "id", "isContentEditable", "lang", "offsetHeight", "offsetLeft", "offsetTop", "offsetWidth", "scrollHeight", "scrollTop", "scrollWidth", "slot", "spellcheck", 'src', "tabIndex", "title", "translate", "type", "value"];
equilibrium.GetAttrValues = function () {
    var fnc = function (property, subject, observer, control, name) {
        var scope = equilibrium.getScopeFromString(subject, control.attr(name), $(control).data(), control);
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
    var scopeSplit = equilibrium.splitParameters(str, ',');
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
            debugger;
            par += ch + ch[i++];
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
equilibrium.getScopeFromString = function (owner, string, additionalData, thisElement, scopeParent) {
    if (additionalData != null || thisElement != null) {
        owner = equilibrium.CopyAllProperties(owner);
        if (additionalData != null) owner = equilibrium.CopyAllProperties(additionalData, owner);
        if (thisElement != null) owner['this'] = thisElement;
    }
    var scope = equilibrium.getScopeFromStr(owner, string);

    var scopeHasProperty = function (scope, property) {
        return (scope['hasOwnProperty'] != null && scope.hasOwnProperty(property)) || scope[property] != null;
    }

    if ((scope == null || !scopeHasProperty(scope.scope, equilibrium.GetPropName(scope.property))) && scopeParent != null)
        scope = equilibrium.getScopeFromStr(scopeParent, string);
    if (scope == null || !scopeHasProperty(scope.scope, equilibrium.GetPropName(scope.property)))
        scope = equilibrium.getScopeFromStr(window, string);
    if (scope == null || !scopeHasProperty(scope.scope, equilibrium.GetPropName(scope.property)))
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
            var fncscope = equilibrium.getScopeFromString(scope, fncname, null, null, scopeparent);
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
    return (prop === "null" || (prop.startsWith("\"") && prop.endsWith("\"") ||
			prop.startsWith("'") && prop.endsWith("'")) ||
			(prop === "false" || prop === "true") ||
			(prop.startsWith("[") && prop.endsWith("]")) ||
			!isNaN(prop));
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
equilibrium.ValueOfProperty = function(property) {
    var patt1 = /\{\{(.*?)\}\}/;
    return property.match(patt1);
}
equilibrium.GetParentWithAllChildrens = function(parent) {
    var ret = [parent];
    var childrens = equilibrium.GetAllChildrens(parent);
    if (childrens)
        ret = ret.concat(childrens);
    return ret;
}
equilibrium.GetAllChildrens = function(element) {
    element = $(element);
    if (element.children().length > 0) {
        var childs = $.makeArray(element.children());
        var allelements = childs.map(function (f) { return equilibrium.GetAllChildrens(f); }).filter(function (f) { return f != null; }).forEach(function (f) { if (f) f.forEach(function (g) { childs.push(g); }) });
        return childs;
    }
    else
        return [];
}
equilibrium.Bind = function (subject, topParent) {
    function newObservers(elements, subject) {
        var singleObservers = [];
        elements.forEach(function (element) {
            element = $(element);
            var obs = equilibrium.CreateRepeatObserverFromElement(element);
            if (obs != null)
                subject.AddObserver(obs);
            else
                obs = singleObservers.push(new equilibrium.ElementObserver(element));

            obs = equilibrium.AttachFiltersToObserver(obs, element);
        });
        singleObservers.forEach(function (f) { subject.AddObserver(f); });
    }

    var allAttributes = [];
    equilibrium.GetAllAttributeNames(document)
		.forEach(function (f) { f.forEach(function (g) { if (g.startsWith('em')) allAttributes.push(g); }) });

    var attrs = allAttributes.filter(function (f) { return f.startsWith('emattr'); }).map(function (f) { return f.substring(6); });
    var props = allAttributes.filter(function (f) { return f.startsWith('emprop'); }).map(function (f) { return f.substring(6); });
    var ons = allAttributes.filter(function (f) { return f.startsWith('emon'); }).map(function (f) { return f.substring(4); });

    equilibrium.allAttrFncs = [];
    attrs.forEach(function (f) { if (equilibrium.allAttrFncs.find(function (g) { return g === f; }) == null) equilibrium.allAttrFncs.push(f); })
    equilibrium.allPropFncs = [];
    props.forEach(function (f) { if (equilibrium.allPropFncs.find(function (g) { return g === f; }) == null) equilibrium.allPropFncs.push(f); })
    equilibrium.allOnFncs = [];
    ons.forEach(function (f) { if (equilibrium.allOnFncs.find(function (g) { return g === f; }) == null) equilibrium.allOnFncs.push(f); })

    var elements = equilibrium.FindAllElements(topParent);
    subject.AddObserver(new equilibrium.ElementObserver(topParent));
    newObservers(elements, subject);
    subject.Notify();
}
equilibrium.FindAllElements = function (topParent) {
    var groupAttributes = ['emrepeat'];
    var allAttributes = equilibrium.GetOnValues().map(function (f) { return f.name }).concat(equilibrium.GetPropValues().map(function (f) { return f.name })).concat(groupAttributes);
    var allElements = equilibrium.GetAllChildrens(topParent);
    var filtered = allElements.filter(function (f) { return (equilibrium.ItemHasAttributes(f, allAttributes) || equilibrium.ValueOfProperty($(f)[0].outerHTML) != null) && !equilibrium.ParentHasAttributes(f, groupAttributes, topParent) });
    return filtered;
}
equilibrium.ParentHasAttributes = function (element, attributes, topparent) {
    var parent = $(element).parent();
    if (parent[0] == topparent[0])
        return false;
    var blns = attributes.find(function (f) { if (parent.attr(f)) return true; });
    if (blns) return true;
    return equilibrium.ParentHasAttributes(parent, attributes, topparent);
}
equilibrium.ItemHasAttributes = function (element, attributes) {
    element = $(element);
    var blns = attributes.find(function (f) { if (element.attr(f)) return true; });
    if (blns) return true;
}
equilibrium.GetAllAttributeNames = function(element) {
    return equilibrium.GetAllChildrens($(element))
		.map(function (f) { return $.makeArray(f.attributes).map(function (f) { return f.name; }); })
		.filter(function (f) { return f.length > 0; });
};

equilibrium.CopyValuesFromObject = function(fromObject, toObject) {
    for (var k in toObject) {
        if (fromObject[k] != null)
            toObject[k] = fromObject[k];
    }
    return toObject;
}
equilibrium.CopyAllProperties = function(fromObject, toObject) {
    if (toObject == null)
        toObject = new Object();
    for (var k in fromObject) toObject[k] = fromObject[k];
    return toObject;
}
equilibrium.CopyJustProperties = function(fromObject, toObject) {
    if (toObject == null)
        toObject = new Object();
    for (var k in fromObject)
        if (typeof fromObject[k] !== "function")
            toObject[k] = fromObject[k];
    return toObject;
}
equilibrium.DeleteJustProperties = function(fromObject) {
    for (var k in fromObject)
        if (typeof fromObject[k] !== "function")
            delete fromObject[k];
    return fromObject;
}
equilibrium.CopyJustFunctions = function(fromObject, toObject) {
    if (toObject == null)
        toObject = new Object();
    for (var k in fromObject)
        if (typeof fromObject[k] === "function")
            toObject[k] = fromObject[k];
    return toObject;
}

function UnloadDataOnExit(fnc) {
    $("#MainContentContainer").on("OnPageUnload", fnc);
}
function GetLocationRoot() { return window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1); };