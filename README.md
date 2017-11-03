Javascript binder - visualizing like never before

I always liked the way angularjs binds elements (and did not like the way it doesn't support other
UIs). In the company I work right now it was not possibile to implement angularjs into existing 
software. So, I had to build my own binder called equilibrium.

And, yes, it overgrovth itself and became something more than just a binder. Equilibrium works with
all UIs and in almost all conditions and will fit in any existing project with no problem at all.

Let me get straight to the point. When creating html elements, if you want to bind some property
or function with your existing model you will do it using brackets {{ }} - equilibrium will replace
those values, or using attributes - emon... (for events) or emprop... (for properties) and emattr...
(for attributes). For example &lt;input id="{{GetInputId()}}" empropvalue="inputValue" /&gt;
will replace {{GetInputId()}} with result of that function and will insert inputValue into property
'value'. emvalue, emchecked are special props that do 2 way binding - read and write. Writting is 
triggered with onchanged and onclick functions. 

emrepeat is used like forEach. So, if you want to enumerate all products and draw it, you will write
something like &lt;input emrepeat="prod in products" empropvalue="prop.name" /&gt;.  

You have one extra property - emvisible - uses jquery show/hide functions.

Oh, yes, you can implement UNDO, REDO, SAVE STATE and LOAD STATE. And it's just a few lines of code.

Check existing Index.html to have a glance on what it can do.