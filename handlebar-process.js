/* 
 * Moongazer
 * 
 * 
 */
// Retrieve handlebar HTML code
var firstScript = $("#entry-template");
var source   = firstScript.html();
console.log(source);
// Compile the template, get a template() function
var template = Handlebars.compile(source);
console.log(template);
//  Initialize the data object
var context = {title: "My New Post", body: "This is my first post!"};

// pass the object data as a parameter to generate the final string with interpolated object values -> called execution
// Then attach the result back to HTML
firstScript.before( template(context) );

/**Escaping**/
//Escapes or unescapes an HTML file removing traces of offending characters that could be wrongfully interpreted as markup.
//The following characters are reserved in HTML and must be replaced with their corresponding HTML entities:
//
//" is replaced with &quot;
//& is replaced with &amp;
//< is replaced with &lt;
//> is replaced with &gt;

var target = $("#escape-template");
var sourceES   = target.html();
var templateES = Handlebars.compile(sourceES);
var contextES = {body: "<p>This is a post about &lt;p&gt; tags</p>"};
firstScript.before( templateES(contextES) );

/**Block expressions**/
var target = $("#block-template");
var sourceBl   = target.html();

//create helper func : it's sth needed  for block expressions
Handlebars.registerHelper('noop', function(options) {
    // The whole function only triggers when execution
    console.log(this);
//    console.log(options);
//    console.log(options.fn(this)); 
    return options.fn(this);
});

// items & options are built-in parameters
// this can handle array data obj, quite good
Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";
  console.log(items);
  console.log(this);  // pay attention 52 and 53:  "items" is a subset of "this" ; 52 =>{{#list people}}
  for(var i=0; i < items.length; i++) {
      console.log(items[i]);
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});

// Compile the template, get a template() function
var templateBl = Handlebars.compile(sourceBl);

//create data obj
var contextSimple = {
  title: "All about <p> Tags",
  body: "<p>This is a post about &lt;p&gt; tags, m'kay?</p>",
  people: [
    {firstName: "Yehuda", lastName: "Katz"},
    {firstName: "Carl", lastName: "Lerche"},
    {firstName: "Alan", lastName: "Johnson"}
  ]
};


// Execution
firstScript.before( templateBl(contextSimple) );

/** Path **/
var target = $("#path-template");
var sourcePa   = target.html();
var templatePa = Handlebars.compile(sourcePa); // get the template()  function
var contextPa = {
  "title": "My First Blog Post!",  // not matter whether has quotes or not
  "author": {
    "id": 47,
    "name": "Yehuda Katz"
  },
  "body": "My first post. Wheeeeeaa!"
};
firstScript.before( templatePa(contextPa) );

/**Helper Func**/
var target = $("#helper-template");
var sourceHe = target.html();
var templateHe = Handlebars.compile(sourceHe);
Handlebars.registerHelper('fullName', function(hehe) {
    // hehe => {{fullName author}}
    return hehe.firstName + " " + hehe.lastName;
});
var contextHe = {
  author: {firstName: "Alan", lastName: "Johnson"},
  body: "I Love Handlebars",
  comments: [{
    author: {firstName: "Yehuda", lastName: "Katz"},
    body: "Me too!"
  }]
};
firstScript.before( templateHe(contextHe) );


/**Each helper Func**/
var target = $("#each-template");
var sourceEa = target.html();
var templateEa = Handlebars.compile(sourceEa);

Handlebars.registerHelper('agree_button', function(options) {
    console.log(this);  // => Each func is powerful, it's like a for loop, iterate through the array one item after another;
    console.log(options); //TODO : study this more with Literals
  var emotion = Handlebars.escapeExpression(this.emotion);
  var name = Handlebars.escapeExpression(this.name);

  return new Handlebars.SafeString(
    "<button>I agree. I " + emotion + " " + name + "</button>"
  );
});
var contextEa = {
  items: [
    {name: "Handlebars", emotion: "love"},
    {name: "Mustache", emotion: "enjoy"},
    {name: "Ember", emotion: "want to learn"}
  ]
};
firstScript.before( templateEa(contextEa) );

