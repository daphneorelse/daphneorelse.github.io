const root = document.querySelector(':root');
const root_styles = getComputedStyle(root);
const css_white = root_styles.getPropertyValue('--white');
const css_contrast = root_styles.getPropertyValue('--dark-contrast');
const css_red = root_styles.getPropertyValue('--red');
const css_lightGreen = root_styles.getPropertyValue('--light-green');
const css_lightestRed = root_styles.getPropertyValue('--lightest-red');
const css_lightestGray = root_styles.getPropertyValue('--lightest-gray');
const css_transparent = "rgba(0,0,0,0)";

$(function()
{
    $(".portfolio-feature").each(function() { sizeFeature($(this)); });
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

$("#secondary-nav-bar").on("mouseenter", function()
{
    $(this).find("svg").css({"fill": css_lightestRed});

}).on("mouseleave", function()
{
    $(this).find("svg").css({"fill": css_white});
});

$(".corner-target").on("mouseenter", function()
{
    let corners = $(".corner");

    let area = $(this);
    let cornerOffset = $(".corner").outerWidth() / 2;

    let left = area.offset().left - cornerOffset;
    let right = left + area.outerWidth();
    let top = area.offset().top - cornerOffset;
    let bottom = top + area.outerHeight();

    
    corners.css({"opacity": "100%"});
    corners.eq(0).css({"left": left, "top": top});
    corners.eq(1).css({"left": right, "top": top});
    corners.eq(2).css({"left": right, "top": bottom});
    corners.eq(3).css({"left": left, "top": bottom});
    
    // corners.addClass("corner-red");
    // corners.find("path").css({"stroke-width": "30"});

}).on("mouseleave", function()
{
    // $(".corner").removeClass("corner-red");
    $(".corner").css({"opacity": "0%"});
    $(".corner").find("path").css({"stroke-width": "20"});

}).on("mousedown", function()
{
    $(".corner").find("path").css({"stroke-width": "35"});

}).on("mouseup", function()
{
    $(".corner").find("path").css({"stroke-width": "20"});
});

let sight_grown = false;

$("#shooting-gallery").on("mousemove", function(e)
{
    let sight = $("#gallery-sight");

    let offset = sight.outerWidth() / 2;

    sight.css({"left": e.offsetX - offset, "top": e.offsetY - offset});

}).on("mouseenter", function()
{
    let sight = $("#gallery-sight").find("svg").eq(1);
    // sight.removeClass("blur-3p");
    sight.css({"backdrop-filter": "blur(0px)"});

}).on("mouseleave", function()
{
    let sight = $("#gallery-sight");
    sight.css({"left": "calc(50% - 90px)", "top": "calc(50% - 90px)"});
    // sight.find("svg").eq(1).addClass("blur-3p");
    sight.find("svg").eq(1).css({"backdrop-filter": "blur(3px)"});

    if (sight_grown)
    {
        sight.find("svg").css({"transform": "scale(1)"});
        sight_grown = false;
    }

}).on("mousedown", function()
{
    let sight = $("#gallery-sight").find("svg");

    if (sight_grown)
    {
        sight.css({"transform": "scale(1)"});
        sight_grown = false;
    }
    else
    {
        sight.css({"transform": "scale(2)"});
        sight_grown = true;
    }

});

function toggleMore(section, select)
{
    let icon = $(section).find(".more-icon");
    // console.log(select);

    if (select)
    {
        $(section).prop("open", true);
        icon.find("path").eq(1).css({"transform": "rotate(90deg)"});
        section.css({"height": "422px"});
        section.find(".feature-gallery").css({"opacity": "100%"});
        // section.addClass("expand-section").removeClass("minimize-section");
        maximizeFeature($(section).parents(".portfolio-feature"));
    }
    else
    {
        $(section).prop("open", false);
        icon.find("path").eq(1).css({"transform": "rotate(0deg)"});
        section.css({"height": "32px"});
        section.find(".feature-gallery").css({"opacity": "0%"});
        // section.addClass("minimize-section").removeClass("expand-section");
    }
};

function highlightFeature(feature)
{
    $(feature).css({"background-color": css_lightestGray});
    $(feature).find(".icon-background").css({"border-color": css_lightestGray});
    // $(feature).find(".feature-tags p").css({"border-color": css_white});
    $(feature).find(".feature-menu, .feature-menu > div, .menu-item-bar").css({"border-color": css_contrast});
    // $(feature).find(".feature-menu").css({"left": "0px", "opacity": "100%"});
    // $(feature).find(".feature-menu > div").css({"border-color": css_contrast});

    let expandIcon = $(feature).find(".expand-icon");
    expandIcon.css({"fill": css_contrast});
    // console.log(feature.css("height"));
    if (!expandIcon.prop("expanded"))
    {
        expandIcon.addClass("bouncing");
    }
}

// function tryNarrowMenu(menu)
// {
//     let shouldNarrow = true;
//     $(menu).children("div").each(function() { 
//         if ($(this).prop("open"))
//         {
//             shouldNarrow = false;
//         }
//     });

//     if (shouldNarrow)
//     {
//         $(menu).css({"max-width": "300px"});
//     }
// }

function dehighlightFeature(feature)
{
    $(feature).css({"background-color": css_lightGreen});
    $(feature).find(".icon-background").css({"border-color": css_lightGreen});
    // $(feature).find(".feature-tags p").css({"border-color": css_lightestGray});
    $(feature).find(".feature-menu, .feature-menu > div, .menu-item-bar").css({"border-color": css_lightestGray});
    // $(feature).find(".feature-menu").css({"left": "-20px", "opacity": "0%"});

    // $(feature).find(".feature-menu > div").each(function() { 
    //     console.log($(this).prop("open"));
    // });

    // tryNarrowMenu($(feature).find(".feature-menu"));
    
    $(feature).find(".expand-icon").css({"fill": css_lightestGray}).removeClass("bouncing");
}

$(window).on("resize", function()
{
    $(".portfolio-feature").each(function() { sizeFeature($(this)); });
});

function sizeFeature(feature)
{
    const expandedHeight = Math.max($(feature).find(".feature-basics").innerHeight() + 150, 600);
    const previewHeight = $(feature).find(".feature-basics").innerHeight() - $(feature).find(".feature-description").innerHeight();

    if ($(feature).find(".expand-icon").prop("expanded"))
    {
        // if ($(feature).find(".feature-basics").innerHeight() >= 500)
        // {
        //     $(feature).css({"height": "800px"});
        // }
        // else
        // {
        //     $(feature).css({"height": "600px"});
        // }
        $(feature).css({"height": expandedHeight});
    }
    else
    {
        // if ($(feature).find(".feature-title-line").innerHeight() >= 100)
        // {
        //     $(feature).css({"height": "400px"});
        // }
        // else
        // {
        //     $(feature).css({"height": "300px"});
        // }
        $(feature).css({"height": previewHeight + 35});
    }
    
}

function maximizeFeature(feature)
{
    $(feature).siblings(".portfolio-feature").each( function() { 
        minimizeFeature($(this));
    });
    $(feature).find(".feature-menu").css({"width": "100%"});
    setTimeout(function() { $(feature).find(".feature-description").css({"left": "0px", "opacity": "100%"}); }, 250);
    $(feature).find(".expand-icon").css({"transform": "scaleY(-1)"}).removeClass("bouncing").prop("expanded", true);

    sizeFeature(feature);
    setTimeout(sizeFeature(feature), 500);
}

function minimizeFeature(feature)
{
    $(feature).find(".expand-icon").css({"transform": "scaleY(1)"}).prop("expanded", false);
    $(feature).find(".feature-description").css({"left": "-20px", "opacity": "0%"});
    $(feature).find(".feature-menu").css({"width": "50%"});
    dehighlightFeature(feature);
    $(feature).find(".feature-menu > div").each(function() { toggleMore($(this), false); } );

    sizeFeature(feature);
}

$(".portfolio-feature").on("mouseenter", function()
{
    highlightFeature($(this));

// }).on("mousedown", function()
// {
//     maximizeFeature($(this));
    
}).on("mouseleave", function()
{
    dehighlightFeature($(this));
    
});

$(".expand-icon").on("mousedown", function()
{
    const feature = $(this).parent(".portfolio-feature");

    if ($(this).prop("expanded"))
    {
        minimizeFeature(feature);
    }
    else
    {
        toggleMore(feature.find(".feature-menu").children().eq(0), true);
        maximizeFeature(feature);
    }
});

// $(".portfolio-feature").waypoint( function()
// {
//     highlightFeature($(this.element));
// }, 
// {offset: "0%"}
// );

$(".menu-item-bar").on("mousedown", function()
{
    let section = $(this).parent();
    // let sections = section.siblings();

    if (section.prop("open"))
    {
        toggleMore(section, false);
    }
    else
    {
        section.siblings().each(function() { toggleMore($(this), false);} );
        toggleMore(section, true);
    }
});

$(".etc-expandable").on("mousedown", function()
{
    if ($(this).prop("expanded"))
    {
        $(this).prop("expanded", false);
        $(this).css({"width": 300});
        $(this).find(".more-icon path").eq(1).css({"transform": "rotate(0deg)"});
    }
    else
    {
        $(this).prop("expanded", true);
        let width = 0;
        $(this).children().each(function() { width += $(this).innerWidth() + 20 });
        $(this).css({"width": width});
        $(this).find(".more-icon path").eq(1).css({"transform": "rotate(90deg)"});
    }
});

$("#portfolio-profile-pic").on("mouseenter", function()
{
    $("#shifting-container").addClass("rotate-container");

}).on("mouseleave", function()
{
    $("#shifting-container").removeClass("rotate-container");
    
});

$(".inspiration-name").on("mousedown", function()
{
    // console.log($(this).prop("selected"));
    if ($(this).prop("selected"))
    {
        $(this).prop("selected", false);

        $(this).css({"border-color": css_contrast});
        $(".inspiration-box").removeClass("visible");
    }
    else
    {
        $(this).siblings().prop("selected", false);
        $(this).prop("selected", true);

        // $(this).siblings().css({"background-color": css_transparent});
        // $(this).css({"background-color": css_white});
        $(this).siblings().css({"border-color": css_contrast});
        $(this).css({"border-color": css_lightestRed});
        $(".inspiration-box").removeClass("visible");
        let index = $(".inspiration-name").index($(this));
        $(".inspiration-box").eq(index).addClass("visible");
    }
    
});

// $("#inspirations").on("mouseleave", function()
// {
//     $(".inspiration-box").removeClass("visible");
// });

$(".inspiration-feature img").on("mouseenter", function()
{
    $(this).css({"width": 275});

}).on("mouseleave", function()
{
    $(this).css({"width": 175});
});

// $(".contact-item").on("mouseenter", function()
// {
//     $(this).find(".contact-box").removeClass("box-close");
//     $(this).find(".contact-box").addClass("box-open");

// }).on("mouseleave", function()
// {
//     $(this).find(".contact-box").removeClass("box-open");
//     $(this).find(".contact-box").addClass("box-close");
// });

$(".contact-container").on("mouseenter", function()
{
    $(this).find(".contact-overlay").css({"top": "100px"});

}).on("mouseleave", function()
{
    $(this).find(".contact-overlay").css({"top": "0px"});
});

function copyEmail() {
    navigator.clipboard.writeText("daphnemwilkerson@gmail.com");
}

$("#email-link").on("mouseup", function()
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

// $(window).on("scroll", function() {
//     var hT = $('#scroll-to').offset().top,
//         hH = $('#scroll-to').outerHeight(),
//         wH = $(window).height(),
//         wS = $(this).scrollTop();
//     if (wS > (hT+hH-wH)){
//         console.log('H1 on the view!');
//     }
//  });

$("#portfolio-logo").on("mouseenter", function()
{
    $(this).find("#sight svg").eq(1).css({"backdrop-filter": "blur(0px)"});

}).on("mouseleave", function()
{
    $(this).find("#sight svg").eq(1).css({"backdrop-filter": "blur(2px)"});
})