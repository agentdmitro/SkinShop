// Открыть попап окно по якорной ссылке

$(document).on('click', 'a.popup--bttn', function (e) {
  const popup_id = $(this).attr('href');
  
  if ($(popup_id).hasClass('popup')) {
    e.preventDefault();
    $('.popup').removeClass('show');
    $('body').addClass('scroll-disable');
    $('.popup-bg').addClass('show').hide().show();
    $(popup_id).toggleClass('show');
  }
});

$(document).ready(function (e) {
  const popup_id = window.location.hash;

  if ($(popup_id).hasClass('popup')) {
    $('.popup').removeClass('show');
    $('body').addClass('scroll-disable');
    $('.popup-bg').addClass('show').hide().show();
    $(popup_id).toggleClass('show');
  }
});

$(document).on('click', '.popup__bttn-close, .popup__close', function (e) {
  $('body').removeClass('scroll-disable');
  $('.popup-bg').fadeOut().removeClass('show');
  $('.popup').removeClass('show');
});

$(document).mousedown(function (e) {
  if ($('.popup-bg').hasClass('show')) {
    const popup = $('.popup');

    if (!popup.is(e.target) && popup.has(e.target).length === 0) {
      $('body').removeClass('scroll-disable');
      $('.popup-bg').fadeOut().removeClass('show');
      $('.popup').removeClass('show');
      $('.popup__video #video').each(function (index) {
        $(this).attr('src', $(this).attr('src'));
        return false;
      });

      // const $video = $('.popup__video #video'),
      // 	src = $video.attr('src');

      // $video.attr('src', src);
      // console.log(src);
    }
  }
});
