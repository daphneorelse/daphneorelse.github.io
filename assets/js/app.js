const root = document.querySelector(':root');
const root_styles = getComputedStyle(root);
const css_white = root_styles.getPropertyValue('--white').trim();
const css_contrast = root_styles.getPropertyValue('--dark-contrast').trim();
const css_red = root_styles.getPropertyValue('--red').trim();
// var rand_rotation = root.styles.getPropertyValue('--random-rotation');
// var rand_y = root.styles.getPropertyValue('--random-translation-y');

$(function()
{
    $(".big-logo").hide().fadeIn(1500);
});

$("#logo-1-bounds").on("mouseenter", function()
{
    $(this).find("#crosshair-horizontal").css({"x": "50", "width" : "800"});
    $(this).find("#crosshair-vertical"  ).css({"y": "-90", "height": "340"});
    $(this).find("#crosshair").children().css({"fill": css_red});
    $(this).find("#a-crossing").css({"transform": "scaleX(0)"});
    $(this).find(".logo-flags").find("path").css({"transform": "translateX(16px)"});
    
}).on("mouseleave", function() 
{
    $(this).find("#crosshair-horizontal").css({"x": "400", "width" : "137"});
    $(this).find("#crosshair-vertical"  ).css({"y": "0",   "height": "164"});
    $(this).find("#crosshair").children().css({"fill": css_contrast});
    $(this).find("#a-crossing").css({"transform": "scaleX(1)"});
    $(this).find(".logo-flags").find("path").css({"transform": "translateX(0px)"});

}).on("mousemove", function(e)
{
    let center = {x: $(this).width() * 0.6, y: $(this).height() * 0.5};
    let normDistX = (e.offsetX - center.x) / 50;
    let normDistY = (e.offsetY - center.y) / 50;
    let angleRadians = Math.atan2(normDistY, normDistX);
    let distXLimited = Math.max(Math.min(1, normDistX), -1);
    let distYLimited = Math.max(Math.min(1, normDistY), -1);
    
    let newX = Math.cos(angleRadians) * 10 * Math.abs(distXLimited);
    let newY = Math.sin(angleRadians) * 10 * Math.abs(distYLimited);
    $(this).find("#crosshair").css({"transform": "translate("+newX+"px, "+newY+"px)", "transition-duration": "0ms"});
    
}).on("mouseleave", function()
{
    $(this).find("#crosshair").css({"transform": "translate(0px, 0px)", "transition-duration": "500ms"});
});

$("#logo-2-bounds").on("mouseenter", function()
{
    $(this).find("#knife").removeClass("return").addClass("throw");
    $(this).find(".logo-flags").find("path").css({"transform": "translateX(16px)"});

}).on("mouseleave", function()
{
    $(this).find("#knife").removeClass("throw").addClass("return");
    $(this).find(".logo-flags").find("path").css({"transform": "translateX(0px)"});
});