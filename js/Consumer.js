/**
 * @class JsTest.Consumer
 * @extends Ext.util.Observable
 * This class is the customer,
 */
Ext.define('JsTest.Consumer', {
    extend: 'Ext.util.Observable',
    requires:['Ext.Ajax.request'],
    /**
     * @property {String} the url we are going to conect to
     */
    url: undefined,
    /**
     * @property {Array} the array of data the consumer got from the request
     */
    data: [],

    constructor: function (config) {
    	var me = this;

        me.url = config.url;
        // adding the events for our object
        me.addEvents({
            'dataloaded': true,
            'errorloading': true
        });

        // Copy configured the listeners from the config
        me.listeners = config.listeners;

        me.callParent(arguments);
        console.log("Consumer created " + new Date());
    },
    /**
     * This method sends the request for the messages
     * @param  {string} url the url for the request if the url was not set when the objects was created.
     * @return {string}  the url the method was call with
     */
    getMessages: function (url) {
        var me = this,
            path;

        path = url || me.url; //if the method is called with an url we set the url else we use the config url

        if(!path){
        	me.fireEvent('errorloading',this,'The url is empty or undefined');
            return false;
        }
        // we do the server request
        Ext.Ajax.request({
            url: path,
            success: function (response) {
                var text = response.responseText;
                me.data = Ext.decode(text);
                me.fireEvent('dataloaded',this, me.data);
            },
            failure:function  (response) {
            	me.fireEvent('errorloading',this,'Error when loading form ajax :(');
            }
        });
        return url;
    }
});