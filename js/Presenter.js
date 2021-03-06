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
        if (!me.consumer) { //check if the consumer exists
            alert("no consumer defined");
            return false;
        }
        // we call the consumer methods
        me.consumer.getMessages();
        me.consumer.on('dataloaded', me.addMessagesToDOM, this);
        me.consumer.on('errorloading', me.errorLoadingMessages, this);
    },
    addMessagesToDOM: function (c, data) {
        var me = this,
            html;
        // for each message we do a html string to render in the target div
        Ext.each(data.messages, function (message) {
            html = [
                '<div class="message">',
                	'<span><b>',
                	message.author + '</b> : ' + message.text,
                	'</span>',
                '</div>'
            ].join('');
            Ext.fly(me.target).createChild(html);
        }, me);
        me.fireEvent('messagesdrawn', me);
    },
    errorLoadingMessages: function (c, error) {
        alert(error);
    }
});