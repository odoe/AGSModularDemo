(function(){define([],function(){return{exists:function(a,b,c){if(!c)throw new Error("Must provide a valid field name to search for.");for(var d=a.length-1;d>=0;d--)if(b[c]===a[d][c])return!0;return!1},indexof:function(a,b){var c=a.length,d;while(c--){d=a[c];if(d===b)return c}return-1}}})}).call(this)