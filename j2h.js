(function(){
	arr2tab=(hdr,arr)=>arr.map(a=>Object.fromEntries((typeof(hdr)=='string'?hdr.split('/'):hdr).map((k,i)=>[k,a[i]])));
	var no_tail_el=['input','br'];
	var binary_attr = ['selected', 'checked'];
	var special_prop=['html','{}','<>','[]'];
	var get=(o,attr,fallback)=>o.hasOwnProperty(attr)?o[attr]:fallback;
	var j2h_fn=(tmpl,data,index)=>{
		if(Array.isArray(tmpl))return tmpl.map(t=>j2h_fn(t,data)).join('');
		if(typeof(tmpl)=='object'){
			var ndata=get(tmpl,'{}',o=>o)(data); // new data
			var idata=get(tmpl,'[]',o=>ndata)(data); // inner data
			var html=get(tmpl,'html','');
			var tag=get(tmpl,'<>','div');
			var attr_list=Object.entries(tmpl).filter(([k,v])=>!special_prop.includes(k)).map(([k,v])=>{if(typeof(v)=='function')v=v(ndata,index);return binary_attr.includes(k)?(v?k:''):`${k}='${v}'`}).join('');
			return '<' + tag + (attr_list.length? (' '+attr_list): '') + (no_tail_el.includes(tag)? '/>': `>${j2h_fn(html,idata,index)}</${tag}>`);
		}
		if(typeof(tmpl)=='function') return ''+tmpl(data,index);
		return ''+tmpl;
	};
	j2h=tmpl=>{
		var fn=data=>j2h_fn(tmpl,data);
		fn.batch=data=>data.map((d,i)=>j2h_fn(tmpl,d,i)).join('');
		return fn;
	};
	_id=o=>o.id;_txt=o=>o.text;_val=o=>o;_i=(o,i)=>i;_0=o=>o[0];_1=o=>o[1];_2=o=>o[2];_3=o=>o[3];
}());