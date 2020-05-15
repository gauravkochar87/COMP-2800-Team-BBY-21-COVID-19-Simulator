///////////////////////////////////////////////////////////////
////        Toggles between Sign up and Login form         ////
///////////////////////////////////////////////////////////////

$('.message a').click(function () {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
});

$('#signup').click(function () {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
});


