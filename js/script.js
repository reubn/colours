var sortedColours;
$.getJSON("js/colours.json", function (data) {
    sortedColours = sortColours(data, 0, 0.7);
    for (var key in sortedColours) {
        if (sortedColours.hasOwnProperty(key)) {
            if (sortedColours[key].hue > -1) {
                console.log("%c" + sortedColours[key].hex + "     Hue:    " + sortedColours[key].hue + "     Chr:    " + sortedColours[key].chr + "    Name: " + sortedColours[key].name + "     Sat:    " + sortedColours[key].sat, "width:200%;background-color:" + sortedColours[key].hex);
                $("body").append("<span class='colour colour-" + sortedColours[key].name + "' style='background-color:" + sortedColours[key].hex + "'><a href='http://dribbble.com/colors/" + sortedColours[key].nohash + "?percent=5&variance=5' target='_blank' class='colourtext'>" + sortedColours[key].hex + "</a></span>");
            }
        }
    }

    $("body").append("<form class='colour' action='js/add.php' method='get' autocomplete='off' style='background-color:#fefefe'><input type='text' name='hex' value='#HEXHRE' class='hexinput'></form>");
});

function scrollItems(number) {
    window.scrollBy(0, $(window).height() * number);
}

function itemAt() {
    var pageHeight = window.innerHeight ||
        html.clientHeight ||
        body.clientHeight ||
        screen.availHeight;
    var scrolled = document.all ? iebody.scrollTop : pageYOffset;
    var numberOfItems = sortColours.length;
    
    return sortedColours[Math.floor(scrolled/pageHeight*(numberOfItems+1))];
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
                        var colorname = "sortedColours";
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
    scrollItems(1);
});