$A.SandBox = Ext.extend($A.Component, {
	initComponent : function(config) {
		$A.SandBox.superclass.initComponent.call(this, config);
		this.txt = $(this.id + "_view");
		this.txt.setValue(this.content);
	},
	send : function(){
		var content = this.screenTpl.replace('{content}',this.txt.value);
		//new $A.Window({'title':'生成的页面','url':this.context+'/sandbox?content='+encodeURIComponent(content),fullScreen:true});
		window.open(this.context+'/sandbox?content='+encodeURIComponent(content));
	},
	screenTpl : "<a:screen xmlns:a='http://www.aurora-framework.org/application'><a:view template='sandbox'>{content}</a:view></a:screen>"
})