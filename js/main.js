// JavaScript Document

$(document).ready(function() {

	// function use for close element when click outside of element
	function closeElement(element) {
		$(document).click(function(event) {
			var $target = $(event.target);
			if (!$target.closest(element).length && $(element).is(":visible")) {
				$(element).hide();
			}
		})
	}

	closeElement(".search_box");

	$('.input_search').click(function(event) {
		event.stopPropagation()
		$('.search_box').show();
		$('.search_field').show();
	});

	$('.content').each(function() {
		$(this).unbind().click(function() {
			// console.log($.trim($(this).text()))
			$('.input_search').val($.trim($(this).text()))
			$('.search_box').hide();
			$('.btn_search').addClass('active');
		})
	})

	$(".search_box_top").mCustomScrollbar();
	
	$('.input_search').keyup(function() {
		if ($('.input_search').length > 0 && $('.input_search').val() != '') {
			$('.btn_search').addClass('active');
		} else {
			$('.btn_search').removeClass('active');
		}
	});
});

(function($) {
	$.fn.tab = function() {
 		var _this = $(this);
    	var tabs = _this.children('.tab_header[data-child="false"]').children('a');
    	var childrenTabs = _this.find('.tab_header[data-child="true"]').children('a');

    	$(tabs).add(childrenTabs).on('click', function() {
      		var num;
      		var _this = $(this);
      		var classNameTab = _this.attr('class').split(' ');
      		var classNameContent = _this.parent().siblings().children();

      		for (var i = 0; i <= classNameTab.length; i++) {
        		if (/([\d.]+)/.test(classNameTab[i])) {
          			var isChild = $(_this).parent().data('child');
          			num = classNameTab[i].split('-')[1];
          
          			if (!isChild) {
            			$(tabs).removeClass('active');
            			$(_this).addClass('active');
          			} else {
            			$(_this).siblings().removeClass('active');
            			$(_this).addClass('active');
          			}
        		}
      		}

      		$(classNameContent).each(function(i, n) {
        		var name = $(n).attr('class').split(' ');
        		for (n = 0; n <= name.length; n++) {
          			if (name[n] != undefined) {
            			if (/([\d.]+)/.test(name[n])) {
              				if (num === name[n].split('-')[1]) {
                				var el = $(classNameContent)[num - 1];
                				$(classNameContent).removeClass('active');
                				$(el).addClass('active');
              				}
            			}
          			}
        		}
      		});
    	});
  	}
})(jQuery);

let nf = new Intl.NumberFormat('en-US');

function setLeftValue(rL, rR, nF, slide) {
	let numberFrom = document.querySelector(nF);
	let rangeRight = document.querySelector(rR);
  	let _this = document.querySelector(rL)
	let min = parseInt(_this.min)
	let max = parseInt(_this.max)
	_this.value = Math.min(parseInt(_this.value), parseInt(rangeRight.value));
  	numberFrom.innerHTML = `${nf.format(_this.value)}원`;
	let percent = ((_this.value - min) / (max - min)) * 100;
	document.querySelector(slide).style.left = percent + "%";
}

function setRightValue(rL, rR, nT, slide) {
	let numberTo = document.querySelector(nT);
	let rangeLeft = document.querySelector(rL);
  	let _this = document.querySelector(rR)
	let min = parseInt(_this.min)
	let max = parseInt(_this.max)
	_this.value = Math.max(parseInt(_this.value), parseInt(rangeLeft.value));
  	numberTo.innerHTML = `${nf.format(_this.value)}원`;
	let percent = ((_this.value - min) / (max - min)) * 100;
	document.querySelector(slide).style.right = 100 - percent + "%";
}

setLeftValue(".rTL", ".rTR", ".nFT", ".slider > .range_top");
setLeftValue(".rBL", ".rBR", ".nFB", ".slider > .range_bottom");

setRightValue(".rTL", ".rTR", ".nTT", ".slider > .range_top");
setRightValue(".rBL", ".rBR", ".nTB", ".slider > .range_bottom");

document.querySelector('.double_range:first-child .rTL').addEventListener("input", function () { 
	setLeftValue(".rTL", ".rTR", ".nFT", ".slider > .range_top")
});
document.querySelector('.double_range:first-child .rTR').addEventListener("input", function () { 
	setRightValue(".rTL", ".rTR", ".nTT", ".slider > .range_top")
});

document.querySelector('.double_range:nth-child(2) .rBL').addEventListener("input", function () { 
	setLeftValue(".rBL", ".rBR", ".nFB", ".slider > .range_bottom");
});
document.querySelector('.double_range:nth-child(2) .rBR').addEventListener("input", function () { 
	setRightValue(".rBL", ".rBR", ".nTB", ".slider > .range_bottom");
});

