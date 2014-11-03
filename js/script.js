var pred;
$.getJSON("js/colours.json", function (data) {
    pred = sortColours(data, 0, 0.7);
    for (var key in pred) {
        if (pred.hasOwnProperty(key)) {
            if (pred[key].hue > -1) {
                console.log("%c" + pred[key].hex + "     Hue:    " + pred[key].hue + "     Chr:    " + pred[key].chr + "    Name: " + pred[key].name + "     Sat:    " + pred[key].sat, "width:200%;background-color:" + pred[key].hex);
                $("body").append("<span class='colour colour-" + pred[key].name + "' style='background-color:" + pred[key].hex + "'><a href='http://dribbble.com/colors/" + pred[key].nohash + "?percent=5&variance=5' target='_blank' class='colourtext'>" + pred[key].hex + "</a></span>");
            }
        }
    }

    $("body").append("<form class='colour' action='js/add.php' method='get' autocomplete='off' style='background-color:#fefefe'><input type='text' name='hex' value='#HEXHRE' class='hexinput'></form>");
});

function scrollColours(colour) {
    $('html, body').animate({
        scrollTop: $(".colour-" + colour).offset().top
    }, 150);
}

function scrollDistance() {
    if ($(window).scrollTop() % $(window).height() === 6) {
        $('html, body').animate({
            scrollTop: ($(window).scrollTop() + ($(window).height()) * 4)
        }, 150);
    } else {

        $('html, body').animate({
            scrollTop: $(window).scrollTop() + $(window).height() - $(window).scrollTop() % $(window).height()
        }, 150);
    }

}

function sortColours(colours, satval, valval) {
    for (var c = 0; c < colours.length; c++) {

        //Remove # if it exists
        if (colours[c][0] == '#') {
            var hex = colours[c].substring(1);
        } else {
            var hex = colours[c];
        }

        var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test("#" + hex);
        if (isOk === true) {

            /* Get the RGB values to calculate the Hue. */
            var r = parseInt(hex.substring(0, 2), 16) / 255;
            var g = parseInt(hex.substring(2, 4), 16) / 255;
            var b = parseInt(hex.substring(4, 6), 16) / 255;

            /* Getting the Max and Min values for Chroma. */
            var max = Math.max.apply(Math, [r, g, b]);
            var min = Math.min.apply(Math, [r, g, b]);

            /* Variables for HSV value of hex colour. */
            var chr = max - min;
            var hue = 0;
            var val = max;
            var sat = 0;
            var colorname = "grey";
            if (val > 0) {
                /* Calculate Saturation only if Value isn't 0. */
                sat = chr / val;
                if (sat > 0.15) {
                    if (r == max) {
                        hue = 60 * (((g - min) - (b - min)) / chr);
                        if (hue < 0) {
                            hue += 360;
                        }
                    } else if (g == max) {
                        hue = 120 + 60 * (((b - min) - (r - min)) / chr);
                    } else if (b == max) {
                        hue = 240 + 60 * (((r - min) - (g - min)) / chr);
                    }
                    if (hue >= 356 || hue < 10) {
                        var colorname = "red";
                    } else if (hue >= 10 && hue < 40) {
                        var colorname = "orange";
                    } else if (hue >= 40 && hue < 60) {
                        var colorname = "yellow";
                    } else if (hue >= 60 && hue < 150) {
                        var colorname = "green";
                    } else if (hue >= 150 && hue < 240) {
                        var colorname = "blue";
                    } else if (hue >= 240 && hue < 320) {
                        var colorname = "purple";
                    } else if (hue >= 320 && hue < 345) {
                        var colorname = "pink";
                    } else if (hue >= 345 && hue < 356) {
                        var colorname = "pred";
                    }




                }
            }

            /* Modifies existing objects by adding HSV values. */
            colours[c] = hex;
            colours[c] = {
                hex: "#" + hex,
                nohash: hex,
                hue: hue,
                sat: sat,
                val: val,
                chr: chr,
                name: colorname
            };
        }
    }

    /* Sort by Hue. */
    var arr = colours.sort(function (a, b) {
        return (a.hue - b.hue);
    });
    return arr;
}

$('.arrow').click(function () {
    scrollDistance();
});