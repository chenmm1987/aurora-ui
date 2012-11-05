/**
 * @class Aurora.Radio
 * @extends Aurora.Component
 * <p>单选框组件.
 * @author njq.niu@hand-china.com
 * @constructor
 * @param {Object} config 配置对象. 
 */
$A.Radio = Ext.extend($A.Component, {
	ccs:'item-radio-img-c',
	ucs:'item-radio-img-u',
	rcc:'item-radio-img-readonly-c',
	ruc:'item-radio-img-readonly-u',
//	optionCss:'item-radio-option',
	imgCss:'item-radio-img',
	valueField:'value',
	constructor: function(config){
		config.checked = config.checked || false;
		config.readonly = config.readonly || false;
		$A.Radio.superclass.constructor.call(this,config);		
	},
	initComponent:function(config){
		$A.Radio.superclass.initComponent.call(this, config);
		this.wrap=Ext.get(this.id);	
		this.nodes = Ext.DomQuery.select('.item-radio-option',this.wrap.dom);
		this.initStatus();
//		this.select(this.selectIndex);
	},	
	processListener: function(ou){
        $A.Radio.superclass.processListener.call(this, ou);
    	this.wrap[ou]('click',this.onClick,this);
    	this.wrap[ou]("keydown", this.onKeyDown, this);
    	this.wrap[ou]('focus', this.onFocus, this);
    	this.wrap[ou]('blur', this.onBlur, this);
    },
    focus : function(){
    	this.wrap.focus();
    },
    blur : function(){
    	this.wrap.blur();
    },
    onFocus : function(){
		this.fireEvent('focus',this);
	},
	onBlur : function(){
		this.fireEvent('blur',this);
	},
	onKeyDown:function(e){
        var sf = this,keyCode = e.keyCode,
        	options = sf.options,
        	valueField = sf.valueField;
        sf.fireEvent('keydown', sf, e);
        if(keyCode == 13)  {
            (function(){
                sf.fireEvent('enterdown', sf, e);
            }).defer(5);
        }else{
        	var i = options.indexOf(sf.getValueItem());
        	if(keyCode==40 || keyCode==39){
	            ++i < options.length && sf.setValue(options[i][valueField]);
	            e.stopEvent();
	        }else if(keyCode==38 || keyCode==37){
	            --i >=0 && sf.setValue(options[i][valueField]);
	            e.stopEvent();
	        }
        }
    },
	initEvents:function(){
		$A.Radio.superclass.initEvents.call(this); 	
		this.addEvents(
		/**
         * @event click
         * 点击事件.
         * @param {Aurora.Tree} Radio对象
         * @param {Object} 当前选中的值
         */
		'click',
		/**
         * @event keydown
         * 键盘事件.
         * @param {Aurora.Tree} Radio对象
         * @param {Event} 键盘事件对象
         */
		'keydown',
		/**
         * @event enterdown
         * 回车事件.
         * @param {Aurora.Tree} Radio对象
         * @param {Event} 键盘事件对象
         */
		'enterdown');    
	},
	setValue:function(value,silent){
		if(value=='')return;
		$A.Radio.superclass.setValue.call(this,value, silent);
		this.initStatus();
		this.focus();
	},
	getItem: function(){
		var item = this.getValueItem();
		if(item!=null){
            item = new $A.Record(item);
		}
		return item;
	},
	getValueItem: function(){
	   var v = this.getValue();
	   var l = this.options.length;
	   var r = null;
	   for(var i=0;i<l;i++){
	       var o = this.options[i];
	       if(o[this.valueField]==v){
	           r = o;
	           break;
	       }
	   }	   
	   return r;
	},
	select : function(i){
		var v = this.getItemValue(i);
		if(v){
			this.setValue(v);
		}
	},
	getValue : function(){
    	var v = this.value;
		v=(v === null || v === undefined ? '' : v);
		return v;
    },
//	setReadOnly:function(b){
//		if(typeof(b)==='boolean'){
//			this.readonly=b?true:false;	
//			this.initStatus();		
//		}
//	},
	initStatus:function(){
		var l=this.nodes.length;
		for (var i = 0; i < l; i++) {
			var node=Ext.fly(this.nodes[i]).child('.'+this.imgCss);		
			node.removeClass(this.ccs);
			node.removeClass(this.ucs);
			node.removeClass(this.rcc);
			node.removeClass(this.ruc);
			var value = Ext.fly(this.nodes[i]).getAttributeNS("","itemvalue");
			//if((i==0 && !this.value) || value === this.value){
			if(value === this.value){
				this.readonly?node.addClass(this.rcc):node.addClass(this.ccs);				
			}else{
				this.readonly?node.addClass(this.ruc):node.addClass(this.ucs);		
			}
		}
	},
	getItemValue:function(i){
	   var node = Ext.fly(this.nodes[i]);
	   if(!node)return null;
	   var v = node.getAttributeNS("","itemvalue");
	   return v;
	},
	onClick:function(e) {
		if(!this.readonly){
			var l=this.nodes.length;
			for (var i = 0; i < l; i++) {
				var node = Ext.fly(this.nodes[i]);
				if(node.contains(e.target)){
					var v = node.getAttributeNS("","itemvalue");
					this.setValue(v);
					this.fireEvent('click',this,v);
					break;
				}
			}
			
		}		
	}	
});