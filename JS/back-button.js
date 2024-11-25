$(document).ready(function() {
    const backButton = $('.back-button');

    backButton.mouseover(function() {
        $(this).addClass('push');
    });

    backButton.mouseout(function() {
        $(this).removeClass('push');
    });

    backButton.click(function() {
        $(this).removeClass('push');
    });
});
