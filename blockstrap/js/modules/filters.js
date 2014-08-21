/*
 * 
 *  Blockstrap v0.5
 *  http://blockstrap.com
 *
 *  Designed, Developed and Maintained by Neuroware.io Inc
 *  All Work Released Under MIT License
 *  
 */

(function($) 
{
    // EMPTY OBJECT
    var filters = {};
    
    filters.bootstrap = function(blockstrap, data)
    {
        var snippet = blockstrap.snippets[data.type];
        var html = Mustache.render(snippet, data);
        return html;
    }
    
    filters.got = function(blockstrap, data)
    {
        if(data.collection && data.key)
        {
            var obj = localStorage.getItem('nw_'+data.collection+'_'+data.key);
            if(obj) return true;
            else return false;
        }
        else return false;
    }
    
    filters.get = function(blockstrap, data)
    {
        if(data.collection && data.key)
        {
            var obj = localStorage.getItem('nw_'+data.collection+'_'+data.key);
            if(blockstrap_functions.json(obj)) return $.parseJSON(obj);
            else return obj;
        }
        else return false;
    }
    
    filters.setup = function(blockstrap, data)
    {
        if(data.step)
        {
            var step = parseInt(data.step) - 1;
            return blockstrap.core.filter(blockstrap_setup_steps[step]);
        }
        else return data;
    }
    
    filters.avatars = function(blockstrap, data)
    {
        var photo = blockstrap.data.option('your_photo');
        if(!photo && data.default) photo = data.default;
        var image = '<img class="avatar" src="'+photo+'" />';
        return image;
    }
    
    filters.accounts = function(blockstrap, data)
    {
        var accounts = [];
        if($.isPlainObject(localStorage))
        {
            $.each(localStorage, function(key, account)
            {
                if(key.substring(0, 12) === 'nw_accounts_')
                {
                    accounts.push($.parseJSON(account));
                }
            });
        }
        return accounts;
    }
    
    filters.balances = function(blockstrap, data)
    {
        var data = [];
        var balances = blockstrap.accounts.balances();
        if($.isPlainObject(balances))
        {
            $.each(balances, function(k, v)
            {
                data.push({
                    code: k,
                    currency: v.name,
                    count: v.count,
                    balance: v.balance
                });
            });
        }
        return data;
    }
    
    filters.contacts = function(blockstrap, data)
    {
        var contacts = [];
        if($.isPlainObject(localStorage))
        {
            $.each(localStorage, function(key, contact)
            {
                if(key.substring(0, 12) === 'nw_contacts_')
                {
                    contacts.push($.parseJSON(contact));
                }
            });
        }
        return contacts;
    }
    
    filters.total = function(blockstrap, data)
    {
        var rate = 'btc';
        var prefix = 'US$';
        if(data.rate) rate = data.rate;
        if(data.prefix) prefix = data.prefix;
        return blockstrap.accounts.total(rate, prefix);
    }
    
    // MERGE THE NEW FUNCTIONS WITH CORE
    $.extend(true, $.fn.blockstrap, {filters:filters});
})
(jQuery);

