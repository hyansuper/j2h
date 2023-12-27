# j2h
j2h renders json to html. It's similar to [json2html](https://json2html.com/), but a lot simpler, and doesn't require jQuery, and hopefully more intuitive and flexible.

## Basic

```javascript
var json = {'<>':'div',html:['this is', {'<>':'em', html:'important'}]};
var template = j2h(json); // template is a function itself
template(); // conver json data to DOM string.
```

`<>` is a special keyword whoes value will be the tag of HTML element.
`html` means 'innerHTML', also a special keyword for nested elements.
the other special keywords are `[]` and `{}` as illustrated below.


## Render data

Values in the json object can be callback functions for rendering corresponding fields of data.

```javascript
var template = j2h({'<>':'p', class:d=>d.cls, html:d=>d.words);
var data = {cls:'red', words:'this is a paragraph.'};
template(data);

// or render a batch of data
template.batch([{cls:'red', words:'paragraph one'},{cls:'green', words:'paragraph two'}]);
```

## A few handy callback functions

When data is an array, `_0` can be use for getting first element of data, also available are `_1`, `_2`, `_3`.
```javascript
j2h({'<>':'a', href:_0, html:_1}).(['www.baidu.com','百度'])
```

 `_i` and `_val` for index and value of the array.
```javascript
j2h(
		{
			'<>': 'select',
			html: j2h({'<>':'option', value:_i, html:_val}).batch // this is a callback function
		}
	
)(['English','中文'])
```
## `{}` and `[]`
