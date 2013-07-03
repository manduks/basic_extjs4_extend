Ext.onReady(function () {
	var consumer = new JsTest.Consumer({
		url:'./server/data.json',
		listeners:{
			dataloaded:function (c) {
				console.log('data loaded');
			},
			errorloading:function (c) {
				console.log('error loading');
			}
		}
	});

	var presenter = new JsTest.Presenter({
		url:'./server/data.json',
		target: 'messages', //we will render de messages to this DOM node
		consumer : consumer
	});

	//we render the messages
	presenter.renderMessages();
});