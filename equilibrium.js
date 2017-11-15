function async(fn, callback) {
    setTimeout(function () {
        fn();
        if (callback)
            callback();
    }, 0);
};

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
		var str = (typeof obj === 'object') ? JSON.stringify(obj): obj;
		var hash = 0;
		if (str.length == 0) return hash;
		for (var i = 0; i < str.length; i++) {
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
		observer.Subject = this;
    }
    this.RemoveObserver = function (observer) {
        var index = observers.indexOf(observer);
        observers.splice(index, 1);
    }
    this.GetAllObservers = function () { return observers; }
    this.Notify = function() {
        var subject = this;
        observers.forEach(function(f) { f.Update(subject); });
    };
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
    var drawfunc = drawfnc;
    this.FilterFunctions = [];
    this.SortFunctions = [];
	var observer = this;
	this.Subject = null;
    this.Parent = null;
    this.ParentObserver = null;
    this.RepeatProperty = '';
    this.RepeatPropertyShort = '';
    this.DrawedElements = [];
	this.MaxDrawingsAtTime = 0;
	var templateElement = drawfnc();

    this.Update = function () {
        observer.Redraw();
    }
    this.Redraw = function () {
        var repeatProperty = observer.RepeatProperty;
        var repeatPropertyShort = observer.RepeatPropertyShort;
        var subject = observer.Parent;
        var arrData = observer.FilteredData(observer.Parent);
        if (arrData) {
            var DrawedElements = observer.DrawedElements;
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
					var element = templateElement.cloneNode(true);
                    FindAllElements(element).forEach(function (f, ind) {
						var obs;
						if (f.isRepeatObserver) {
							obs = equilibrium.CreateRepeatObserverFromElement(f.element);
							obs = equilibrium.AttachFiltersToObserver(obs, f.element);
						}
						else {
                            obs = new equilibrium.ElementObserver(f.element, f.connectionTemplate);
						};
                        observers.push(obs);
                    });
		
                    observers.push(new equilibrium.ElementObserver(element));
                    observers.forEach(function (f) {
                        f.ParentCollection = observers;
                        f.ParentObserver = observer;
                    });
                    drawedElements.push(element);
                    newObservers.push(observers);
                };
                var scope = equilibrium.CopyAllProperties(subject);
                scope[repeatPropertyShort] = dat;
                scope.index = index;
				scope.observer = observer;
                observers.forEach(function (f) { f.Subject = subject; f.Parent = scope; });
            });
			var afterElement = (observer.DrawedElements.length == 0) ? $comment: $(observer.DrawedElements[observer.DrawedElements.length - 1].last().LastDrawedElement());
			
            observer.DrawedElements = observer.DrawedElements.concat(newObservers);
			if (observer.MaxDrawingsAtTime == 0) {
				observer.DrawedElements.forEach(function (f) { f.forEach(function (g) { g.Update(); }); });
				$(afterElement).after(drawedElements);
			} else {
				$(afterElement).after(drawedElements);
				
				var start = 1 - observer.MaxDrawingsAtTime;
				var forDrawing = function() { return observer.DrawedElements.filter(function(f,ind) { return ind >= start && ind < start + observer.MaxDrawingsAtTime;});};
				var drawer = function() { 
					forDrawing().forEach(function (f) { f.forEach(function (g) { g.Update(); }); });
				};
				var callback = function() { start += observer.MaxDrawingsAtTime; drawFewElements();};
				var drawFewElements = function() {
					if (IsNotNullAndHasAny(forDrawing()))
						async(drawer, callback);
				};
				drawer();
				drawFewElements();
			};
        }
    }
	var allElementsPattern = null;
	var FindAllElements = function(element) {
		var allElements = equilibrium.GetAllChildrens(element);
		if (allElementsPattern == null) {
			var allUsedEls = equilibrium.FindAllElements(element);
			allElementsPattern = allUsedEls.map(function(f) { return { index: allElements.indexOf(f), isRepeatObserver: f.attributes['emrepeat'] != null};});
			allElementsPattern.forEach(function(f, ind) { if (!f.isRepeatObserver) {
				var ells = [allUsedEls[ind]];
				var connection = equilibrium.ConnectElementsAndParts(ells, ells);
				var childNodes = equilibrium.ToArray(ells[0].childNodes).concat(equilibrium.ToArray(ells[0].attributes));
				f.connectionTemplate = connection.map(function(f) { return {template: f.template, index: childNodes.indexOf(f.element)}});
			};});
		};
		var ret = allElementsPattern.map(function(f) {return f;});
		ret.forEach(function(f) {f.element = allElements[f.index];});
		return ret;
	};
    this.FilteredData = function () {
        var scope = equilibrium.getScopeFromString(observer.Parent, observer.RepeatProperty);
        if (scope == null)
            return;

        var filtered = equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);
        observer.SortFunctions.forEach(function (f) { filtered = f(filtered); });

        var repeatPropertyShort = observer.RepeatPropertyShort;
        observer.FilterFunctions.forEach(function (f) { filtered = filtered.filter(function (dat, ind) { return f(dat, ind, observer.Parent, scope.topParent, repeatPropertyShort); }); });

        return filtered;
    }
    this.LastDrawedElement = function () { return (observer.DrawedElements.length == 0) ? $comment : observer.DrawedElements[observer.DrawedElements.length - 1].LastDrawedElement() };
    this.RemoveAll = function () { $($comment).remove(); observer.DrawedElements.forEach(function (f) { f.forEach(function (g) { g.RemoveAll(); }); }); $comment = null; observer.DrawedElements = null; };
    this.TopParentObserver = function() { return (observer.ParentObserver == null) ? observer : observer.ParentObserver.TopParentObserver(); };
}
equilibrium.ElementObserver = function ($elem, pattern) {
    var $element = $elem;
	var observer = this;
	this.Subject = null;
    this.Parent = null;
    this.ParentObserver = null;

    this.Update = function (dat) {
        observer.Redraw();
    }

    var isFirstTime = true;
    this.Redraw = function () {
        equilibrium.ReplaceScopeValues(elementsAndParts, observer.Parent);
        equilibrium.ChangePropValues([$elem], observer.Parent, observer);

        if (isFirstTime) {
            equilibrium.BindOnValues([$elem], observer.Parent, observer);
            isFirstTime = false;
        }
    }
    this.LastDrawedElement = function () { return $elem; };
    this.RemoveAll = function () { $element.parentNode.removeChild($element); $element = null; };
    this.TopParentObserver = function () { return (observer.ParentObserver == null) ? observer : observer.ParentObserver.TopParentObserver(); };
	var GetElementsAndParts = function(element, pattern) {
		if (pattern == null) 
			return equilibrium.ConnectElementsAndParts([element], [element]);
		else {
			var childNodes =equilibrium.ToArray(element.childNodes).concat(equilibrium.ToArray(element.attributes));
			return pattern.map(function(f) {return {template: f.template, element: childNodes[f.index]}});
		};
	};
	
    var elementsAndParts = GetElementsAndParts($elem, pattern);
}

var comment = $('<!---->')[0];
equilibrium.CreateRepeatObserverFromElement = function (element) {
    var repeatattr = element.attributes['emrepeat'];
    if (repeatattr) {
        var spl = repeatattr.value.split(' in ');
        var $comment = comment.cloneNode();
        var template = element.cloneNode(true);
        element.parentNode.insertBefore($comment, element);
        element.parentNode.removeChild(element);
        obs = new equilibrium.RepeatObserver($comment, function (f) { return template; });
        obs.RepeatPropertyShort = spl[0];
        obs.RepeatProperty = spl[1];
        return obs;
    };
};
equilibrium.AttachFiltersToObserver = function (obs, element) {
    var filterattr = $(element).attr('emfilter');
    if (filterattr) {
        var fnc = function (dat, index, subject, topParent, repeatPropertyShort) {
            subject = equilibrium.CopyAllProperties(subject);
            subject[repeatPropertyShort] = dat;
            subject.index = index;
            var scope = equilibrium.getScopeFromString(subject, filterattr, null, null, topParent);
            return equilibrium.scopeValue(scope.scope, scope.property, subject);
        };
        obs.FilterFunctions.push(fnc);
    }
    return obs;
};
equilibrium.ConnectElementsAndParts = function(elements, templates) {
    var connections = [];
    elements.forEach(function (el, index) {
        var temp = templates[index];
        for (var i = 0; i < temp.childNodes.length; i++)
            if (temp.childNodes[i].nodeName == '#text')
                if (equilibrium.ValueOfProperty(temp.childNodes[i].nodeValue)) //temp.childNodes[i].textContent temp.childNodes[i].data
                    connections.push({ template: temp.childNodes[i].nodeValue, element: el.childNodes[i] });

        for (var i = 0; i < temp.attributes.length; i++)
            if (equilibrium.ValueOfProperty(temp.attributes[i].value))
                connections.push({ template: temp.attributes[i].value, element: el.attributes[i], isAtribute: true });
    });
    return connections;
}
equilibrium.ReplaceScopeValues = function(connection, scope) {
    scope = equilibrium.CopyAllProperties(scope);
    connection.forEach(function (conn, index) {
        scope['this'] = $(conn.parent);
        var value = equilibrium.ReplaceValues(conn.template, scope);
		if (conn.value === undefined || conn.value != value) {
			conn.value = value;
			if (conn.isAtribute)
				conn.element.value = value;
			else
				conn.element.nodeValue = value;
		};
    });
}
equilibrium.replaceBackup = [];
equilibrium.ReplaceValues = function (containerstring, subject) {
	var find = equilibrium.replaceBackup.find(function(f) { return f.containerstring === containerstring;});
	if (find == null) {
		find = {containerstring: containerstring, valueProperties: equilibrium.GetAllValueProperties(containerstring)};
		equilibrium.replaceBackup.push(find);
	};
    var subj = subject;
	for (var i = 0; i < find.valueProperties.length; i++) {
		var valueString = find.valueProperties[i];
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
	};
    return containerstring;
}
equilibrium.GetAllValueProperties = function(containerstring) {
	var ret = [];
	do {
        var valueString = equilibrium.ValueOfProperty(containerstring);
        if (valueString) {
			ret.push(valueString);
			containerstring = containerstring.replace(valueString[0], GetRange(0, valueString[0].length - 1).map(function(f) { return "0"}).join(""));
        }
        else
            break;
    } while (true);
	return ret;
};

equilibrium.BindOnValues = function (mainContainer, subject, observer) {
	if (equilibrium.OnValues === undefined) {
		equilibrium.OnValues = equilibrium.GetPropValues().concat(equilibrium.GetOnValues());
	};
	
    equilibrium.OnValues.forEach(function (f) {
		var container = mainContainer[0];
		if (container.attributes[f.name] != null) {
			container = $(container);
			var jsOnFnc = 'on' + f.on;
			var jsFnc = container.attr(jsOnFnc);
			var fnc = function () {
				f.fncon(f.property, subject, observer, container, f.name, jsFnc);
			};
			container.on(f.on, fnc);
			container[0][jsOnFnc] = null;
		};
    });
}
equilibrium.ChangePropValues = function (mainContainer, subject, observer) {
	if (equilibrium.PropValues === undefined) {
		equilibrium.PropValues = equilibrium.GetPropValues().concat(equilibrium.GetAttrValues());
	};
	
    equilibrium.PropValues.forEach(function (f) {
		var container = mainContainer[0];
		if (container.attributes[f.name]) {
			f.fnc(f.property, observer.Parent, observer, $(container), f.name);
		};
    });
};

equilibrium.allOnFncs = [];// ["abort", "auxclick", "beforecopy", "beforecut", "beforepaste", "blur", "cancel", "canplay", "canplaythrough", "change", "click", "close", "contextmenu", "copy", "cuechange", "cut", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "error", "focus", "gotpointercapture", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", "lostpointercapture", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "paste", "pause", "play", "playing", "pointercancel", "pointerdown", "pointerenter", "pointerleave", "pointermove", "pointerout", "pointerover", "pointerup", "progress", "ratechange", "reset", "resize", "scroll", "search", "seeked", "seeking", "select", "selectstart", "stalled", "submit", "suspend", "timeupdate", "toggle", "volumechange", "waiting", "webkitfullscreenchange", "webkitfullscreenerror", "wheel"];
equilibrium.GetOnValues = function () {
    var onfnc = function (property, subject, observer, control, name, unbindedfnc) {
        var sub = equilibrium.CopyAllProperties(observer.Parent);
        sub.observer = observer;
        var scope = equilibrium.getScopeFromString(sub, control.attr(name), null, control);
        if (scope === undefined)
            throw control.attr(name) + " is undefined!";
        equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);
        if (unbindedfnc) {
            var fncscope = equilibrium.getScopeFromString(window, unbindedfnc, null, control);
            equilibrium.scopeValue(fncscope.scope, fncscope.property, fncscope.topParent);
        }
    }
    return equilibrium.allOnFncs.map(function (f) { return { name: 'emon' + f, on: f, fncon: onfnc }; });
}
equilibrium.allPropFncs = [];// ["classList", "className", "clientHeight", "clientLeft", "clientTop", "clientWidth", "checked", 'disabled', "draggable", "hidden", "id", "isContentEditable", "lang", "offsetHeight", "offsetLeft", "offsetTop", "offsetWidth", "scrollHeight", "scrollTop", "scrollWidth", "slot", "spellcheck", 'src', "tabIndex", "title", "translate", "type", "value"];
equilibrium.GetPropValues = function () {
    var fnc = function (property, subject, observer, control, name) {
        var scope = equilibrium.getScopeFromString(subject, control.attr(name), null, control);
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
        var scope = equilibrium.getScopeFromString(subject, control.attr(name), null, control);
        var val = null;
        if (scope === undefined)
            equilibrium.insertPropToScope(subject, control.attr(name));
        else
            var val = equilibrium.scopeValue(scope.scope, scope.property, scope.topParent);

        control.toggle((val !== null) ? val : null);
    };
    var fncon = function (property, subject, observer, control, name, unbindedfnc) {
        var scope = equilibrium.getScopeFromString(observer.Parent, control.attr(name), null, control);
        if (scope === undefined)
            equilibrium.insertPropToScope(observer.Parent, control.attr(name));
        else if (scope.scope[scope.property] != $(control).prop(property)) {
            scope.scope[scope.property] = $(control).prop(property);
            equilibrium.CopyValuesFromObject(scope.topParent, observer.Subject);
            observer.Subject.Notify();
        };
        if (unbindedfnc) {
            var fncscope = equilibrium.getScopeFromString(window, unbindedfnc, null, control);
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
equilibrium.allAttrFncs = []; // ["classList", "className", "clientHeight", "clientLeft", "clientTop", "clientWidth", "checked", 'disabled', "draggable", "hidden", "id", "isContentEditable", "lang", "offsetHeight", "offsetLeft", "offsetTop", "offsetWidth", "scrollHeight", "scrollTop", "scrollWidth", "slot", "spellcheck", 'src', "tabIndex", "title", "translate", "type", "value"];
equilibrium.GetAttrValues = function () {
    var fnc = function (property, subject, observer, control, name) {
        var scope = equilibrium.getScopeFromString(subject, control.attr(name), null, control);
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
equilibrium.GetAllChildrens = function(element) {
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
                subject.AddObserver(obs);
            } else
                obs = singleObservers.push(new equilibrium.ElementObserver(element));

            obs = equilibrium.AttachFiltersToObserver(obs, element);
        });
        singleObservers.forEach(function (f) { subject.AddObserver(f); });
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

    var elements = equilibrium.FindAllElements(topParent);
    subject.AddObserver(new equilibrium.ElementObserver(topParent));
    newObservers(elements, subject);
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
	var $parent = $(parent);
    var blns = attributes.find(function (f) { if ($parent.attr(f)) return true; });
    if (blns) return true;
    return equilibrium.ParentHasAttributes(parent, attributes, topparent);
}
equilibrium.ItemHasAttributes = function (element, attributes) {
    element = $(element);
    var blns = attributes.find(function (f) { if (element.attr(f)) return true; });
    if (blns) return true;
}
equilibrium.GetAllAttributeNames = function(element) {
    return equilibrium.GetAllChildrens(element)
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
equilibrium.PropertiesToArray = function (fromObject) {
    var arr = [];
    for (var k in fromObject) arr.push(fromObject[k]);
    return arr;
}
equilibrium.ToArray = function(fromObject) {
	var arr = [];
	for (var i = 0; i < fromObject.length; i++) arr.push(fromObject[i]);
	return arr;
};

function UnloadDataOnExit(fnc) {
    $("#MainContentContainer").on("OnPageUnload", fnc);
}
function GetLocationRoot() { return window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1); };
