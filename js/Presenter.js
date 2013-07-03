/**
 * @class JsTest.Presenter
 * @extends Ext.util.Observable
 * Description
 */
Ext.define('JsTest.Presenter', {
    extend: 'Ext.util.Observable',
    /**
     * @property {String} the id of the dom element to append the messages
     */
    target: undefined,

    /**
     * @property {JsTest.Consumer} the consumer for our presenter
     */
    consumer: undefined,

    constructor: function (config) {
        var me = this;
        me.target = config.target;
        //adding the events for our object
        me.addEvents({
            'messagesdrawn': true
        });

        // Copy configured the listeners from the config
        me.listeners = config.listeners;

        me.callParent(arguments);
        console.log("Presenter created " + new Date());
    },

    renderMessages: function () {
        var me = this;
        if (!me.consumer) {
            alert("no consumer defined");
            return false;
        }
        me.consumer.getMessages();
        me.consumer.on('dataloaded', me.addMessagesToDOM, this);
        me.consumer.on('errorloading', me.errorLoadingMessages, this);
    },
    addMessagesToDOM: function (c, data) {
        var me = this,
            html;

        Ext.each(data.messages, function (message) {
            html = [
                '<div class="message">',
                	'<span><b>',
                	message.author + '</b> : ' + message.text,
                	'</span>',
                '</div>'
            ].join('');
            Ext.get(me.target).createChild(html);
        }, me);
        me.fireEvent('messagesdrawn', me);
    },
    errorLoadingMessages: function (c, error) {
        alert(error);
    }
});