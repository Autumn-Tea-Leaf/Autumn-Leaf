$(document).ready(function() {
    const submitButton = $('.form-section form button');

    submitButton.mouseover(function() {
        $(this).addClass('push');
    });

    submitButton.mouseout(function() {
        $(this).removeClass('push');
    });

    submitButton.click(function() {
        $(this).removeClass('push');
    });
});
