$(function() {

	$('#flags').carouFredSel({
		auto: true,
		prev: '#prev2',
		next: '#next2',
	});

	$('#causes').carouFredSel({
		auto: false,
		prev: '#prev3',
		next: '#next3',
	});
	
	
	$('#causes2').carouFredSel({
		auto: false,
		pagination: "#pager",
	});


	
	$('#reviews').carouFredSel({
		auto: true,
		pagination: "#pager2",
	});

	
	$('#stories').carouFredSel({
		auto: false,
		prev: '#prev4',
		next: '#next4',
	});
	




	$('#post-carousel').carouFredSel({
		auto: true,
		prev: '#prev5',
		next: '#next5',
		scroll:1
});	

	$('#shop-carousel').carouFredSel({
		auto: false,
		prev: '#prev6',
		next: '#next6',
		scroll:1
});	




	
	$('#carousel').carouFredSel({
		responsive: true,
		circular: false,
		auto: false,
		items: {
			visible: 1,
			width: 20,
			height: '40%'
		},
		scroll: {
			fx: 'directscroll'
		}
	});
	$('#thumbs').carouFredSel({
		responsive: true,
		circular: false,
		infinite: false,
		auto: false,
		prev: '#prev',
		next: '#next',
		items: {
			visible: {
				min: 1,
				max: 6
			},
			width: 200,
			height: '80%'
		}
	});
	$('#thumbs a').click(function() {
		$('#carousel').trigger('slideTo', '#' + this.href.split('#').pop() );
		$('#thumbs a').removeClass('selected');
		$(this).addClass('selected');
		return false;
	});
});
