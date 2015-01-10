(function() {

	function getParas($item) {
	  debugger;
	  var s = '';
	  var href = $item.parent('.story').prev('.header').find('a').attr('href')
	  var id = href.match(/[^\/]+$/)[0];
	  var paras = $('#' + id).find('.paragraph p');
	  for ( var i = 0; i < paras.length; i++ ) {
		var p = paras[i].innerText.substr(0,50) + ' ...';
		s += '<p><b>' + i + '</b>: ' + p + '</p>';
	  }
	  return s;
	}


  var bind, emit;

  emit = function($item, item) {
    return $item.append("<p style=\"background-color:#eee;padding:15px;\">Inspector</p>");
  };

  bind = function($item, item) {
      return $('body').on('new-neighbor-done', function(e, site) {
        var _results = [];
        _results.push($item.append(getParas($item)));
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
