$(document).ready(function() {
    var nav = $('.nav'),
        button = $('.go-top'),
        section = $('.section__introduction'),
        burger = $('.burger-container');

    $(window).bind('scroll', function() {
        // The value of where the "scoll" is
        if ($(this).scrollTop() > 100) {
            nav.addClass('fixed').parent().addClass('header_fixed');
            button.fadeIn(300);

        } else {
            nav.removeClass('fixed').parent().removeClass('header_fixed');
            button.fadeOut(300);
            section.css('margin-top', 'initial')
        }
    }); // end of scroll

    // Animate the scroll to top
    button.click(function(event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    // Collapsable nav for mobile
    burger.click(function() {
        nav.toggleClass('open');
    });

}); // end of ready
