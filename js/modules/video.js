// Запуск iframe youtube по клику на обложку
$('.video-frame').on('click', function () {
	let $this = $(this);

	if (!$this.hasClass('video-play')) {
		$this.addClass('video-play');

		setTimeout(function () {
			$this.find('img').fadeOut();
		}, 500);

		let src = $this.data('video-id');
		let iframe = $('<iframe src="https://www.youtube.com/embed/' + src + '?rel=0&showinfo=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

		$this.find('.iframe').append(iframe);
	}
});