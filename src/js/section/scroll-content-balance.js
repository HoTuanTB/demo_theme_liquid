import $ from 'jquery';

$(document).ready(function () {
  if ($(window).width() >= 768) {
    const $sections = $(".text-section");
    const $image = $("#main-image");

    let currentImage = "{{ section.blocks.first.settings.image | img_url: 'master' }}";

    function changeImage() {
      let scrollPosition = $(window).scrollTop() + $(window).height() / 2;

      $sections.each(function () {
        const $section = $(this);
        const sectionTop = $section.offset().top;
        const sectionHeight = $section.outerHeight();

        if (scrollPosition > sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const newImage = $section.attr("data-image");

          if (newImage !== currentImage) {
            $image.css("opacity", 0);
            setTimeout(() => {
              $image.attr("src", newImage).css("opacity", 1);
              currentImage = newImage;
            }, 500);
          }

          $sections.removeClass("active");
          $section.addClass("active");
        }
      });
    }

    $(window).on("scroll", changeImage);
  }
});
