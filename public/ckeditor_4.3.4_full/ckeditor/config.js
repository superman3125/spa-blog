/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	
	// The toolbar groups arrangement, optimized for a single toolbar row.
	/*config.toolbarGroups = [
	    { name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'mode'},
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection' ] },
		{ name: 'forms' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'about' }
	];*/

	// The default plugins included in the basic setup define some buttons that
	// we don't want too have in a basic editor. We remove them here.
	config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';
    
	// Se the most common block elements.
	config.format_tags = 'h1;h2;h3;pre';
	
	// Let's have it basic on dialogs as well.
	config.removeDialogTabs = 'link:advanced';
	
	//切换主题('moono','kama','office2013','moonocolor')
	config.skin='kama';
	
	//取消拖拽
	config.resize_enabled = false;
	
	//移除底部路径
	//config.removePlugins = 'elementspath';
	
	//换行设置
	config.enterMode = CKEDITOR.ENTER_BR;  //按enter键的时候以<br/>换行
	config.shiftEnterMode = CKEDITOR.ENTER_P;//按shift+enter键的时候以<p>换行
};
