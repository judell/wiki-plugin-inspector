(function() {

   var headline = '<p style="background-color:lightyellow"><b>Version Inspector</b></p>';

   function getJournal() {
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
		var p = paras[i].innerText.substr(0,30) + ' ...' + ' (' + revs.length + ')';
		s += '<div style="background-color:lightyellow;">';
        s += '<a title="toggle versions" href="javascript:window.plugins.inspector.toggle(' + "'" + dataId + "'" + ')">' + '+</a>';
        s += p;
        s += '<div class="wiki-paragraph-history" style="background-color:lightyellow;display:none" para-id="' + dataId + '">';
        for ( var j = 0; j < revs.length; j++ ) {
          if ( revs[j].item.hasOwnProperty('text') ) {
            s += '<p style="margin-left:20px">';
            s += j + ': ' + revs[j].item.text;
            s += '</p><hr>';
            }
          }
        s += '</div>';
        s += '</div>';
	  }
	  return s;
	}

  var bind, emit, toggle;

  toggle = function toggle(id) {
        var element = $('.wiki-paragraph-history[para-id="' + id + '"]');
        if ( element.css('display') == 'block' )
           element.css('display','none');
        else
           element.css('display','block');
      }

  emit = function($item, item) {
    return $item.append(headline);
  };

  bind = function($item, item) {
      return $('body').on('new-neighbor-done', function(e, site) {
        $item.empty();
		$item.append(headline);
        journal = getJournal();
        var _results = [];
        _results.push($item.append(getParas($item,journal)));
        return _results;
      });
    };

  if (typeof window !== "undefined" && window !== null) {
    window.plugins.inspector = {
      emit: emit,
      bind: bind,
      toggle: toggle
    };
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = {
    };
  }

}).call(this);

//# sourceMappingURL=inspector.js.map
