# j2h

j2h converts js object/arrary to html string. It's similar to [json2html](https://json2html.com/), but a lot simpler, and doesn't require jQuery, and hopefully more intuitive and flexible.

## Basic

```javascript
var json = {
    '<>': 'div',
    html: [
              'this is ', 
              {'<>':'b', html:'important'}
          ]
};
var template = j2h(json); // template is a function itself
template(); // when called it converts the json obj to DOM string.
```

In the json obj, `<>` is a special key whose value will be the tag of HTML element, `html` means 'innerHTML', also a special key for nested elements.

The other special keys are `[]` and `{}` as illustrated below.


## Render data

To fill data in DOM string, replace values in the json obj with callback functions.

```js
var template = j2h({'<>':'p', style:d=>`background:${d.color}`, html:d=>d.words});
var data = {color:'red', words:'this is a paragraph.'};
template(data);

// or render an array of data
template.batch([{color:'red', words:'paragraph one'},
                {color:'green', words:'paragraph two'}]);
```

`arr2tab(header, array)` is a helper function for converting array to a table (a list of obj with same fields).

```js
arr2tab('color/words', 
      [['red','paragraph one'], 
      ['green', 'paragraph two']]);
```

## A few handy callback functions

`_0` is predefined to be data=>data[0], also available are `_1`, `_2`, `_3`.

```js
var template = j2h({'<>':'a', html:_0, href:_1});
template(['百度', 'www.baidu.com']);
```

 `_i` and `_val` are for index and value of the array.

```js
var option_template = j2h({'<>':'option', value:_i, html:_val}).batch;
var select_template = j2h({'<>':'select', html: option_template}); // option_template as a callback funcion
select_template(['English','中文']);
```

## `{}` and `[]`

By default, callback functions act on the original data, but `{}` can alter the data.

`[]` alters the data before it's rendered by inner html template.

```js
var template = j2h({'{}':d=>d.form,
                    '<>':'form', method:f=>f.method, action:f=>f.url,

                    '[]': d=>d.inputs,
                    html: j2h([{'<>':'label', html:_txt}, {'<>':'input', type:i=>i.type}, '<br>']).batch
                });

template({form: {method:'post', url:'/submit.php'},
         inputs: arr2tab('text/type', 
                        [['quantity', 'number'], 
                        ['color', 'color'], 
                        ['urgent', 'checkbox']])});
```
