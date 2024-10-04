const root = document.querySelector(':root');
const root_styles = getComputedStyle(root);
const css_white = root_styles.getPropertyValue('--white').trim();
const css_contrast = root_styles.getPropertyValue('--dark-contrast').trim();
const css_red = root_styles.getPropertyValue('--red').trim();

const slice_map = new Map([["a-slice", "#slice-1"], ["r-1-slice", "#slice-2"], ["m-1-slice", "#slice-3"], 
    ["m-2-slice", "#slice-4"], ["m-3-slice", "#slice-5"], ["o-slice", "#slice-6"], ["r-2-slice", "#slice-7"], ["y-slice", "#slice-8"]]);
let slice_set = new Set();
let knifeThrown = false;

let selected_tab = 1;

$(function()
{
    const firstNavItem = $(".nav-item").eq(selected_tab);
    $("#nav-highlight").css({"left": firstNavItem.position().left, "width": firstNavItem.css("width")});

    newTabSelected();
});

$("#logo-1-bounds").on("mouseenter", function()
{
    $(this).find("#crosshair-horizontal").css({"x": "50px", "width" : "800px"}); // mobile doesn't like x/y attr, maybe redo as animation with translate
    $(this).find("#crosshair-vertical"  ).css({"y": "-90px", "height": "340px"});
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
    $(this).find("#knife").removeClass("return").removeClass("throw").addClass("ready");
    $(this).find("#target").removeClass("return").addClass("ready");
    $(this).find(".logo-flags").find("path").css({"transform": "translateX(16px)"});

}).on("mousedown", function(event)
{
    if (knifeThrown === false)
    {
        let mouseX = (event.offsetX / $(this).width() - 0.29) * 880;
        let mouseY = (event.offsetY / $(this).height() - 0.5) * 290;
        $(this).find("#knife").css({"--destX": `${mouseX}px`, "--destY": `${mouseY}px`}).removeClass("ready").removeClass("return").addClass("throw");
        knifeThrown = true;
    }

}).on("mouseleave", function()
{
    $(this).find("#knife").removeClass("throw").removeClass("ready").addClass("return");
    $(this).find("#target").removeClass("ready").addClass("return");
    $(this).find(".logo-flags").find("path").css({"transform": "translateX(0px)"});
    knifeThrown = false;
});

$("#logo-3-bounds div").on("mouseenter", function()
{   
    let slice = $(slice_map.get(this.id));
    slice.removeClass("slice-return").addClass("slice-fall");
    slice_set.add(slice);
});

$("#logo-3-bounds").on("mouseleave", function()
{
    slice_set.forEach(el => {
        el.removeClass("slice-fall").addClass("slice-return");
    });
    slice_set.clear();
});

function newTabSelected()
{
    let contentSection = $("#content-section");
    contentSection.css({"opacity": 0});
    setTimeout(() => 
    {
        switch (selected_tab)
        {
            case 0:
                contentSection.load("../../launchcodes.html");
                break;
            case 1:
                contentSection.load("../../info.html");
                break;
            case 2:
                contentSection.load("../../contact.html");
                break;
        }

        contentSection.css({"opacity": 1});
    }, "250");
};

$(".nav-item").on("mousedown", function()
{
    const new_index = $(".nav-item").index($(this));
    if (new_index !== selected_tab)
    {
        let highlight = $("#nav-highlight");
        highlight.css({"left": $(this).position().left, "width": $(this).css("width")});
    
        selected_tab = new_index;
        newTabSelected();

        window.scrollTo({top: $("#section-divider").position().top, behavior: "smooth"});
    }
}).on("mouseenter", function()
{
    $(this).css({"color": css_red});

}).on("mouseleave", function()
{
    $(this).css({"color": css_contrast});
});