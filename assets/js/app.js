const root = document.querySelector(':root');
const root_styles = getComputedStyle(root);
const css_white = root_styles.getPropertyValue('--white').trim();
const css_contrast = root_styles.getPropertyValue('--dark-contrast').trim();
const css_red = root_styles.getPropertyValue('--red').trim();

$(function()
{
    $("#big-logo").hide().fadeIn(1500);
});

$("#title-area").on("mouseenter", function()
{
    $("#crosshair-horizontal").css({"x": "50", "width" : "800"});
    $("#crosshair-vertical"  ).css({"y": "-290", "height": "740"});
    $("#crosshair").children().css({"fill": css_red});
    $("#a-crossing").css({"transform": "scaleX(0)"});
    $("#logo-flags").find("path").css({"transform": "translateX(16px)"});
    
}).on("mouseleave", function() 
{
    $("#crosshair-horizontal").css({"x": "400", "width" : "137"});
    $("#crosshair-vertical"  ).css({"y": "0",   "height": "164"});
    $("#crosshair").children().css({"fill": css_contrast});
    $("#a-crossing").css({"transform": "scaleX(1)"});
    $("#logo-flags").find("path").css({"transform": "translateX(0px)"});

}).on("mousemove", function(e)
{
    let center = {x: visualViewport.width * 0.55, y: visualViewport.height * 0.5};
    let normDistX = (e.pageX / center.x) - 1;
    let normDistY = (e.pageY / center.y) - 1;
    let angleRadians = Math.atan2(normDistY, normDistX);
    let distXLimited = Math.max(Math.min(1, normDistX * 4), -1);
    let distYLimited = Math.max(Math.min(1, normDistY * 4), -1);
    
    let newX = Math.cos(angleRadians) * 10 * Math.abs(distXLimited);
    let newY = Math.sin(angleRadians) * 10 * Math.abs(distYLimited);
    $("#crosshair").css({"transform": "translate("+newX+"px, "+newY+"px)", "transition-duration": "0ms"});
    
}).on("mouseleave", function()
{
    $("#crosshair").css({"transform": "translate(0px, 0px)", "transition-duration": "500ms"});
});