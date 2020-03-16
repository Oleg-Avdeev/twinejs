Typo = require('typo-js');

var rx_word = new RegExp("[^\!\"\#\$\%\&\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~\ ]");

const dictionaries = []
const onLoaded = (dictionary) => { console.log(dictionaries.push(dictionary)); }
new Typo("en", false, false, { dictionaryPath: "dictionaries", asyncLoad : true, loadedCallback: onLoaded});
new Typo("ru", false, false, { dictionaryPath: "dictionaries", asyncLoad : true, loadedCallback: onLoaded});

exports.spellOverlay = {
    token: function (stream, state) {
        
        if (stream.match(rx_word)) {
            var ch = '';
            while ((ch = stream.peek()) != null) {
                if (!ch.match(rx_word)) break;
                stream.next();
            }
            
            var current = stream.current();
            var valid = !isNaN(current);
            for (var i = 0; i < dictionaries.length && !valid; i++)
                valid = valid || dictionaries[i].check(current);
            
            if (!valid) return "spell-error";
            else return null;
        }
        
        while (stream.next() != null && !stream.match(rx_word, false)) { }
        return null;
    }
};

