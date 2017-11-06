	var test = new equilibrium.DataSubject();
		test.products = [{name: "test1", substances:[1,2,3]},{name: "test2", substances:[4,5,6]}];
		// equilibrium.AutomaticallyAddObservers(test, $('#testId'));
        // test.Notify();
		function shiftChanged(shiftDown) {
			if (sub.shiftDown !== shiftDown) {
				sub.shiftDown = shiftDown;
				if (!shiftDown && selectedRange != null)
					selectedRange = [selectedIndex];
				sub.Notify();
			};
		};
		window.onkeydown = function(event) { if (event.key === "Shift") shiftChanged(true); };
		window.onkeyup = function(event) { if (event.key === "Shift") shiftChanged(false); };
        function createSymbolName(name) { return function (num) { return name + num; } };
        var sub = new equilibrium.DataSubject();
		sub.pages = [1,2,3];
		sub.selectedPage = 1;
		sub.symbolTypes = [
			{ name: "Mandatory", symbols:['m']},
			{ name: "Prohibitions", symbols:['f']},
			{ name: "Warnings", symbols:['w']},
			{ name: "Equipment", symbols:['e','s']},
			{ name: "G elements", symbols:['g']},
			{ name: "P elements", symbols:['p']}];
		var historyObserver = new equilibrium.HistoryObserver(100);
		sub.AddObserver(historyObserver);
        sub.allSymbols = GetRange(0, 5).map(createSymbolName("e"))
                            .concat(GetRange(1, 6).map(createSymbolName("f")))
                            .concat(GetRange(1, 7).map(createSymbolName("g")))
                            .concat(GetRange(1, 9).map(createSymbolName("ghs0")))
                            .concat(GetRange(0, 10).map(createSymbolName("m")))
                            .concat(GetRange(0, 8).map(createSymbolName("p")))
                            .concat(GetRange(0, 0).map(createSymbolName("s")))
                            .concat(GetRange(0, 15).map(createSymbolName("w")))
                            .map(function (f) { return { Name: f, Deleted: false }; });
        sub.FilterSymbols = function (symbols, names) { return symbols.filter(function (f) { return names.find(function(g) { return f.Name.startsWith(g); }) != null; });};
 
        sub.ChangeDeleted = function (symbol) { symbol.Deleted = !symbol.Deleted; sub.Notify(); };
		
		sub.ChangeDeletedSingle = function (symbol, ind, observer) { selectedRange = [ind]; selectedIndex = ind; sub.ChangeDeleted(symbol); };

		var selectedRange = null;
		var selectedIndex = null;
		sub.ChangeDeletedMulty = function(symbol, index, observer) {
			var dat = observer.FilteredData();
			symbol.Deleted = !symbol.Deleted;
			var checked = symbol.Deleted;
			var s1 = selectedIndex;
			var s2 = dat.indexOf(symbol);
			if (selectedRange.length > 1)
				sub = historyObserver.HistoryGo(-1);
			selectedRange = GetRange(Math.min(s1,s2), Math.max(s1,s2));
			
			observer.FilteredData().forEach(function(f,ind) { if (selectedRange.indexOf(ind) > -1) f.Deleted = checked; });
			sub.Notify();
		};
		sub.DeleteFunctionToCall = function(symbol, index, observer) { return (!sub.shiftDown || selectedRange == null) ? sub.ChangeDeletedSingle(symbol, index, observer) : sub.ChangeDeletedMulty(symbol, index,observer); };
		sub.BorderClass = function(ind) { return (sub.shiftDown && selectedRange != null && selectedRange.indexOf(ind) > -1) ? "bg-warning rounded":""; };
		sub.filterSymbolTypes = [];
		sub.FilterAllSymbols = function(symbol) { return sub.filterSymbolTypes.find(function(symbol_type) { return symbol.Name.startsWith(symbol_type); }) != null; };
		sub.ShowSymbols = function (symbol_types, title) {
			sub.filterSymbolTypes = symbol_types;
			sub.Notify();
			$('#symbol_wrapper').dialog({title: title}).dialog("open");
        };
        sub.RemoveSymbol = function(symbol) { symbol.Deleted = true; sub.Notify(); };
		sub.ShouldPageBeVisible = function(page) { return page == sub.selectedPage;};
		sub.SetPage = function(page) {sub.selectedPage = page; sub.Notify(); };
		sub.GetImageUrl = function(name) { return GetLocationRoot() + 'Symbols/' + name + '.png';};
        equilibrium.Bind(sub, $('#urlsid'));
        equilibrium.Bind(sub, $('#element1'));
		equilibrium.Bind(sub, $('#element2'));
		equilibrium.Bind(sub, $('#element3'));
        sub.Notify();
		
        $('#symbol_wrapper').dialog({
            height: 500,
            width: 580,
            modal: true,
            autoOpen: false,
			close: DialogOnCloseFunction
        });
		
		function DialogOnCloseFunction() { selectedRange = null; selectedIndex = null; };
		function isPartOfElementInView(elem) {
            var toptobottom = $(elem)[0].getBoundingClientRect().top - window.innerHeight;
            var bottomtotop = $(elem)[0].getBoundingClientRect().bottom;
            return toptobottom < 0 && bottomtotop > 0;
        };
