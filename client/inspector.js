(function() {

   function getJournal() {
debugger;
    var json = '';
    var host = location.origin;
    var page = location.pathname.match(/[^\/]+$/)[0];
    var url = host + '/' + page + '.json';

	$.ajax({
	  dataType: "json",
	  url: url,
	  success: function(data) {
       json = data;
       },
    async: false
	});

  return json.journal;
  }

	function getParas($item, journal) {
      debugger;

	  function matchesId(id) {
          console.log(id);
		  return function(element) {
            console.log(element);
            if ( ! element.hasOwnProperty('item') )
				return 0;
            var item = element.item;
			return item.hasOwnProperty('id') && item.id == id;
		}
	  }

	  var s = '';
	  var href = $item.parent('.story').prev('.header').find('a').attr('href')
	  var id = href.match(/[^\/]+$/)[0];
	  var paras = $('#' + id).find('.paragraph p');
	  for ( var i = 0; i < paras.length; i++ ) {
        var dataId = paras[i].parentNode.getAttribute('data-id');
        var revs = journal.filter(matchesId(dataId));
		var p = paras[i].innerText.substr(0,30) + ' ...';
		s += '<p>' + p;
        s += '<blockquote>';
        for ( var j = 0; j < revs.length; j++ ) {
          if ( revs[j].item.hasOwnProperty('text') ) {
            s += '<div>';
            s += j + ': ' + revs[j].item.text;
            s += '</div>';
            }
          }
        s += '</blockquote>';
        s += '</p>';
	  }
	  return s;
	}

  var bind, emit;

  emit = function($item, item) {
    return $item.append("<div style=\"background-color:#eee;padding:15px;\">Inspector!</div>");
  };

  bind = function($item, item) {
      return $('body').on('new-neighbor-done', function(e, site) {
        journal = getJournal();
        var _results = [];
        _results.push($item.append(getParas($item,journal)));
        return _results;
      });
    };

  if (typeof window !== "undefined" && window !== null) {
    window.plugins.inspector = {
      emit: emit,
      bind: bind
    };
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = {
      expand: expand
    };
  }

}).call(this);

//# sourceMappingURL=inspector.js.map
