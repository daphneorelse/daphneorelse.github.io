const root = document.querySelector(':root');
const root_styles = getComputedStyle(root);
const css_white = root_styles.getPropertyValue('--white');
const css_contrast = root_styles.getPropertyValue('--dark-contrast');
const css_red = root_styles.getPropertyValue('--red');
const css_lightGreen = root_styles.getPropertyValue('--light-green');
const css_secondary = root_styles.getPropertyValue('--background-color-secondary');
const css_lightestRed = root_styles.getPropertyValue('--lightest-red');
const css_lightestGray = root_styles.getPropertyValue('--lightest-gray');
const css_lightFlesh = root_styles.getPropertyValue('--light-flesh');
const css_lightestFlesh = root_styles.getPropertyValue('--lightest-flesh');
const css_mediumBurnt = root_styles.getPropertyValue('--medium-burnt');

const slice_map = new Map([["a-slice", "#slice-1"], ["r-1-slice", "#slice-2"], ["m-1-slice", "#slice-3"], 
    ["m-2-slice", "#slice-4"], ["m-3-slice", "#slice-5"], ["o-slice", "#slice-6"], ["r-2-slice", "#slice-7"], ["y-slice", "#slice-8"]]);
let slice_set = new Set();
let knifeThrown = false;

let selected_tab = 0;

$(function()
{
    if (this.location.pathname !== "/launchcodes-download/" && this.location.pathname!== "/portfolio/")
    {
        if (document.location.hash === "#info")
        {
            selected_tab = 2;
        }
        else if (document.location.hash === "#launchcodes")
        {
            selected_tab = 1;
        }
        else
        {
            selected_tab = 0;
        }

        setTimeout(newTabSelected(), 250);
    }
});

$("#logo-1-bounds").on("mouseenter", function()
{
    $(this).find("#crosshair-horizontal").css({"x": "50px", "width" : "800px"}); // mobile doesn't like x/y attr, maybe redo as animation with translate
    $(this).find("#crosshair-vertical"  ).css({"y": "-90px", "height": "340px"});
    $(this).find("#crosshair").children().css({"fill": css_mediumBurnt});
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
    if (selected_tab === 3)
    {
        window.location.href = "../../portfolio";
        return;
    }

    let navItem = $(".nav-item").eq(selected_tab);
    $("#nav-highlight").css({"left": navItem.position().left, "width": navItem.css("width")});
    $(".nav-item").css({"color": css_contrast});
    switch (selected_tab)
        {
            case 0:
                $("#nav-bar").css({"background-color": css_lightestFlesh});
                $(".nav-item").eq(selected_tab).css({"color": css_lightestFlesh});
                $("#title-screen").css({"background-color": css_lightestFlesh});
                break;
            case 1:
                $("#nav-bar").css({"background-color": css_secondary});
                $(".nav-item").eq(selected_tab).css({"color": css_secondary});
                $("#title-screen").css({"background-color": css_secondary});
                break;
            case 2:
                $("#nav-bar").css({"background-color": css_secondary});
                $(".nav-item").eq(selected_tab).css({"color": css_secondary});
                $("#title-screen").css({"background-color": css_secondary});
                break;
        }

    let contentSection = $("#content-section");
    contentSection.css({"opacity": 0});
    setTimeout(() => 
    {
        switch (selected_tab)
        {
            case 0:
                contentSection.load("../../turntablesaw.html");
                document.location.hash = "turntablesaw";
                break;
            case 1:
                contentSection.load("../../launchcodes.html");
                document.location.hash = "launchcodes";
                break;
            case 2:
                contentSection.load("../../info.html");
                document.location.hash = "info";
                break;
        }
    }, "500");
    setTimeout(() =>
    {
        contentSection.css({"opacity": 1});
    }, "750");
};

$(".nav-item").on("mousedown", function()
{
    const new_index = $(".nav-item").index($(this));
    if (new_index !== selected_tab)
    {
        selected_tab = new_index;
        newTabSelected();

        if (selected_tab !== 2)
        {
            window.scrollTo({top: $("#section-divider").position().top, behavior: "smooth"});
        }
    }

}).on("mouseenter", function()
{
    // $(this).css({"color": css_mediumBurnt});
    // $(this).css({"transform": "skewX(-17deg"});

}).on("mouseleave", function()
{
    // $(this).css({"color": css_contrast});
    // $(this).css({"transform": "skewX(0deg"});
});

// $("#content-section").on("mouseenter", "#launchcodes-logo", function()
// {
//     $(this).find("#crosshair").css({"fill": css_mediumBurnt});

// }).on("mouseleave", "#launchcodes-logo", function()
// {
//     $(this).find("#crosshair").css({"fill": css_contrast});
// });

function selectTourArea(index)
{
    const area = $(".tour-highlight-area").eq(index);
    $(".tour-highlight-area").find("div").css({"opacity": "50%"});
    area.find("div").css({"opacity": "0%"});

    const video = area.find($("video"));
    video.css({"opacity": "100%"});
    video.trigger("load"); // there's an issue putting these b2b
    video.trigger("play");
    $(".red-corner").css({"opacity": "100%"});
    $(".red-corner").eq(0).css({"left": area.css("left"), "top": area.css("top")});
    $(".red-corner").eq(1).css({"right": area.css("right"), "top": area.css("top")});
    $(".red-corner").eq(2).css({"right": area.css("right"), "bottom": area.css("bottom")});
    $(".red-corner").eq(3).css({"left": area.css("left"), "bottom": area.css("bottom")});

    const allDescriptions = $(".tour-item");
    allDescriptions.css({"filter": "brightness(0.5)"});
    const selectedDescription = allDescriptions.eq(index);
    selectedDescription.css({"filter": "brightness(1.0)"});

    const menu = $("#tour-description-menu");
    const itemHeight = selectedDescription.height() + parseInt(selectedDescription.css("padding")) * 2;
    menu.css({"height": itemHeight + parseInt(menu.css("padding")) * 2});
}

function deselectTourArea(index)
{
    const area = $(".tour-highlight-area").eq(index); 
    $(".tour-highlight-area div").css({"opacity": "0%"});

    const video = area.find($("video"));
    video.trigger("stop");
    video.css({"opacity": "0%"});
    
    $(".red-corner").css({"opacity": "0%"});

    $(".tour-item").css({"filter": "brightness(1.0)"});

    const menu = $("#tour-description-menu");
    var values = $(".tour-item").map(function(index, el) { return parseInt($(el).css("height")); }).get();
    const maxItemHeight = Math.max.apply(null, values);
    menu.css({"height": maxItemHeight + parseInt(menu.css("paddingTop")) * 2});
}

function startAutoScroll()
{
    const menu = $("#tour-description-menu");
    menu.animate({
        scrollLeft: 2000
    }, 1000);
}

$("#content-section").on("mouseenter", ".tour-highlight-area", function()
{
    const index = $(".tour-highlight-area").index($(this));
    selectTourArea(index);

    const container = $("#tour-menu-container")
    const menu = $("#tour-description-menu");
    const scrollTo = $(".tour-item").eq(index);
    const itemWidth = scrollTo.width() + parseInt(scrollTo.css("padding")) * 2;
    
    // console.log(container.width());
    const offset = parseInt(menu.css("paddingLeft")) + (parseInt($(".menu-spacer").css('width')) + parseInt(menu.css("gap"))) + (itemWidth + parseInt(menu.css("gap"))) * index - (menu.width() / 2 - itemWidth / 2);
    
    menu.stop();
    
    menu.animate({
        scrollLeft: offset
    }, 800);

    // const itemHeight = scrollTo.height() + parseInt(scrollTo.css("padding")) * 2;
    // menu.css({"height": itemHeight + parseInt(menu.css("padding")) * 2});
    
    // window.scrollTo({top: $("#tour-section").offset().top, behavior: "smooth"});

}).on("mouseleave", ".tour-highlight-area", function()
{
    deselectTourArea($(".tour-highlight-area").index($(this)));

    // const menu = $("#tour-description-menu");
    // var values = $(".tour-item").map(function(index, el) { return parseInt($(el).css("height")); }).get();
    // const maxItemHeight = Math.max.apply(null, values);
    // menu.css({"height": maxItemHeight + parseInt(menu.css("paddingTop")) * 2});
    // startAutoScroll();
});

$("#content-section").on("mouseenter", ".tour-item", function()
{
    const index = $(".tour-item").index($(this));
    selectTourArea(index);

}).on("mouseleave", ".tour-item", function()
{
    const index = $(".tour-item").index($(this));
    deselectTourArea(index);
});

function fadeInTourAreaTTS(index) {
    const itemToShow = $(".tour-item-tts").eq(index);
    $(".tour-item-tts").css({"opacity": "0%"});
    itemToShow.css({"opacity": "100%"});
}

$("#content-section").on("mouseenter", ".tour-highlight-area-tts", function()
{
    const index = $(".tour-highlight-area-tts").index($(this));
    fadeInTourAreaTTS(index + 1);
    const area = $(this);

    const video = area.find($("video"));
    video.css({"opacity": "100%"});
    video.trigger("load");
    video.trigger("play");
    $(".red-corner").css({"opacity": "100%"});
    $(".red-corner").eq(0).css({"left": area.css("left"), "top": area.css("top")});
    $(".red-corner").eq(1).css({"right": area.css("right"), "top": area.css("top")});
    $(".red-corner").eq(2).css({"right": area.css("right"), "bottom": area.css("bottom")});
    $(".red-corner").eq(3).css({"left": area.css("left"), "bottom": area.css("bottom")});

}).on("mouseleave", ".tour-highlight-area-tts", function()
{
    fadeInTourAreaTTS(0);

    const video = $(this).find($("video"));
    video.trigger("stop");
    video.css({"opacity": "0%"});
    
    $(".red-corner").css({"opacity": "0%"});
});

function resetFeatures()
{
    let wires = $(".feature-wire");
    wires.eq(0).attr({"d": "M50 278C50 278 50 50 50 50"});
    wires.eq(1).attr({"d": "M50 506C50 506 50 278 50 278"});
    wires.eq(2).attr({"d": "M50 735C50 735 50 506 50 506"});
    $(".feature-node").each(function(i) { $(this).attr({"cx": "50", "stroke": css_lightGreen}); });
    // $("#feature-box").css({"width": "0px"});
    $(".feature-box").find("video").trigger("stop");
    $(".feature-text").each(function(i) { $(this).css({"left": "-75px"}); });
}

$("#content-section").on("mouseenter", ".feature-text", function()
{
    resetFeatures();
    $(".feature-box").removeClass("box-open");
    $(".feature-box").removeClass("box-close");

    const index = $(".feature-text").index($(this));
    let wires = $(".feature-wire");
    let nodes = $(".feature-node");
    let box = $(".feature-box").eq(index);

    $(this).css({"left": "0px"});
    // box.removeClass("box-close");
    // box.removeClass("box-open");

    if (index === 0)
    {
        wires.eq(0).attr({"d": "M50 278C50 50 180 50 180 50"});
        nodes.eq(0).attr({"cx": "180", "stroke": css_red});
        // box.load("../../assets/subhtml/lfofeature.html");
        // box.css({"width": "400px", "top": top});
        // box.css({"height": "200px"});
        
    }
    else if (index === 1)
    {
        wires.eq(0).attr({"d": "M180 278C180 278 50 278 50 50"});
        wires.eq(1).attr({"d": "M50 506C50 278 180 278 180 278"});
        nodes.eq(1).attr({"cx": "180", "stroke": css_red});
        // box.load("../../assets/subhtml/reorderingfeature.html");
        // box.css({"width": "400px", "top": top});
        // box.css({"height": "250px"});
    }
    else if (index === 2)
    {
        wires.eq(1).attr({"d": "M180 506C180 506 50 506 50 278"});
        wires.eq(2).attr({"d": "M50 735C50 508.5 180 506 180 506"});
        nodes.eq(2).attr({"cx": "180", "stroke": css_red});
        // box.load("../../assets/subhtml/envelopefeature.html");
        // box.css({"width": "400px", "top": top});
        // box.css({"height": "200px"});
    }
    else if (index === 3)
    {
        wires.eq(2).attr({"d": "M180 735C180 735 50 735 50 506"});
        nodes.eq(3).attr({"cx": "180", "stroke": css_red});
        // box.load("../../assets/subhtml/uifeature.html");
        // box.css({"width": "400px", "top": top});
        // box.css({"height": "250px"});
    }

    const top = $(this).position().top - parseInt(box.css("height")) / 2 + parseInt($(this).css("height")) / 2;
    box.css({"top": top});
    box.find("video").trigger("load");
    box.find("video").trigger("play");
    box.addClass("box-open");

}).on("mouseleave", "#feature-container", function()
{
    resetFeatures();
    // const index = $(".feature-text").index($(this));
    $(".feature-box").each(function(i) { 
        if ($(this).hasClass("box-open")) { 
            $(this).removeClass("box-open");
            $(this).addClass("box-close"); 
        } 
    });
    // box.css({"width": "400px"});
    // box.addClass("box-close");
});

$("#content-section").on("mousedown", "#big-red-button", function()
{
    $(this).attr({"src": "../../assets/images/big red button pressed.svg"});

}).on("mouseup", "#big-red-button", function()
{
    $(this).attr({"src": "../../assets/images/big red button standby.svg"});
    window.location.href = "../../launchcodes-download";
});

$("#content-section").on("mouseenter", ".contact-item", function()
{
    $(this).find(".contact-box").removeClass("box-close");
    $(this).find(".contact-box").addClass("box-open");

}).on("mouseleave", ".contact-item", function()
{
    $(this).find(".contact-box").removeClass("box-open");
    $(this).find(".contact-box").addClass("box-close");
});

$("#content-section").on("mouseenter", ".link-button", function()
{
    $(this).css({"background-color": css_lightestRed});

}).on("mouseleave", ".link-button", function()
{
    $(this).css({"background-color": css_white});

}).on("mousedown", ".link-button", function()
{
    $(this).css({"color": css_white});

}).on("mouseup", ".link-button", function()
{
    $(this).css({"color": css_contrast});
});

$(".link-button").on("mouseenter", function()
{
    $(this).css({"background-color": css_lightestRed});

}).on("mouseleave", function()
{
    $(this).css({"background-color": css_white});

}).on("mousedown", function()
{
    $(this).css({"color": css_white});

}).on("mouseup", function()
{
    $(this).css({"color": css_contrast});
});

function copyEmail() {
    navigator.clipboard.writeText("daphnemwilkerson@gmail.com");
}

$("#content-section").on("mouseup", "#email-link", function()
{
    copyEmail();

    let currentWidth = $(this).css("width");
    $(this).html("<p>Copied!</p>");
    $(this).css({"width": currentWidth});
    setTimeout(() =>
    {
        $(this).html("<p>Copy email to clipboard</p>");
    }, 2000);
});

$("#secondary-nav-bar").on("mouseenter", function()
{
    $(this).find("svg").css({"fill": css_lightestRed});

}).on("mouseleave", function()
{
    $(this).find("svg").css({"fill": css_white});
});