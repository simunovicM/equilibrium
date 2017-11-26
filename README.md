![](image.png)

JavaScript binder - Create interactive UIs easier than ever before - perfect for any existing project,
even legacy one!

Equilibrium is JavaScript binding library which connects your model with the view and take care it
always gets rendered the right way.

Equilibrium makes it painless to create interactive UIs. Design simple views for each state in your
application, and equilibrium will efficiently update and render just the right components when you
want it.

Let me get straight to the point. When creating html elements, if you want to bind some property
or function with your existing model you will do it using brackets {{ }} - equilibrium will replace
those values, or using attributes - emon... (for events) or emprop... (for properties) and emattr...
(for attributes). For example &lt;input id="{{GetInputId()}}" empropvalue="inputValue" /&gt;
will replace {{GetInputId()}} with result of that function and will insert inputValue into property
'value'. emvalue, emchecked are special props that do 2 way binding - read and write. Writing is 
triggered with onchanged and onclick functions. 

emrepeat is used like forEach. So, if you want to enumerate all products and draw it, you will write
something like &lt;input emrepeat="prod in products" empropvalue="prop.name" /&gt;.  

You have one extra property - emvisible - uses jquery show/hide functions.

Oh, yes, you can implement UNDO, REDO, SAVE STATE and LOAD STATE. And it's just a few lines of code.

Equilibrium supports all newer browsers, and bunch of old ones (from IE8).

Download data from Test directory to have a glance on what it can do, or test it directly on:

http://equilibrium.byethost7.com/index.html

http://equilibrium.byethost7.com/index_s.html

http://equilibrium.byethost7.com/index_dt.html

http://equilibrium.byethost7.com/index_s_ie8.html - IE8 test page
