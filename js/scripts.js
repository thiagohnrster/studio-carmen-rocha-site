/*
 * @Author: Thiago
 * @Date:   2020-06-09 12:31:13
 * @Last Modified by:   Thiago
 * @Last Modified time: 2020-07-17 14:33:14
 */
$(function() {
    AOS.init({
        offset: 145
    });

    $('.navbar-flex').visualNav({
        useHash: false,
        bottomMargin: 145,
        offsetTop: 81,
        animationTime: 1200
    });

    $('.slider').bxSlider({
        mode: 'fade',
        adaptiveHeight: true,
        controls: false
    });

    function stickyNavigation() {
        var offset = $('.navigation').offset(),
            navParent = $('.navigation'),
            nav = navParent.find('div'),
            tmp = navParent.find('div').clone().attr('class', 'tmp').css('visibility', 'hidden');

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > offset.top) {
                navParent.append(tmp);
                
                $(nav).addClass('navbar-fixed')
            } else {
                navParent.find('.tmp').remove();
                
                $(nav).removeClass('navbar-fixed')
            }
        });
    }

    function scrollToNavigate() {
        $('.scroll-to').click(function(e) {

            var targetHref = $(this).attr('href'),
                headerHeight = $('header').outerHeight();

            $('html, body').animate({
                scrollTop: $(targetHref).offset().top - headerHeight
            }, 1200);

            e.preventDefault();
        });
    }

    // Populate images from data attributes.
    function simpleParallax() {
        var scrolled = $(window).scrollTop();

        $('.bg-parallax').each(function(index) {
            var imageSrc = $(this).data('image-src'),
                imageHeight = $(this).data('height');

            $(this).css('background-image', 'url(' + imageSrc + ')');
            $(this).css('height', imageHeight);

            // Adjust the background position.
            var initY = $(this).offset().top,
                height = $(this).height(),
                diff = scrolled - initY,
                ratio = Math.round((diff / height) * 100);

            $(this).css('background-position', 'center ' + parseInt(-(ratio * 1.5)) + 'px');
        });
    }

    // Attach scroll event to window. Calculate the scroll ratio of each element
    // and change the image position with that ratio.
    // https://codepen.io/lemagus/pen/RWxEYz
    function calculateScrollRatio() {
        $(window).scroll(function() {
            var scrolled = $(window).scrollTop();

            $('.bg-parallax').each(function(index, element) {
                var initY = $(this).offset().top,
                    height = $(this).height(),
                    endY = initY + $(this).height();

                // Check if the element is in the viewport.
                var visible = isInViewport(this);

                if (visible) {
                    var diff = scrolled - initY,
                        ratio = Math.round((diff / height) * 100);
                    $(this).css('background-position', 'center ' + parseInt(-(ratio * 1.5)) + 'px');
                }
            });
        });
    }

    simpleParallax();
    calculateScrollRatio();
    stickyNavigation();
    scrollToNavigate();
});

// Check if the element is in the viewport.
// http://www.hnldesign.nl/work/code/check-if-element-is-visible/
function isInViewport(node) {
    // Am I visible? Height and Width are not explicitly necessary in visibility
    // detection, the bottom, right, top and left are the essential checks. If an
    // image is 0x0, it is technically not visible, so it should not be marked as
    // such. That is why either width or height have to be > 0.
    var rect = node.getBoundingClientRect();

    return (
        (rect.height > 0 || rect.width > 0) &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}