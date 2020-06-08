// Start Section: when first loaded, after button clicked = hidden

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var besucht = getCookie("besucht");

    if (besucht === "ja") {
        hideContent();
    } else {
        hideMain();
    }
}

function hideContent() {
    var element = document.getElementById("start");
    element.classList.add("hidden");
}

function hideMain() {
    var element = document.getElementById("main");
    element.classList.add("hidden");
}

function reload() {
    setCookie("besucht", "ja");

    location.reload();
    window.scrollTo(0, 0);
}

// text fields required

$(document).ready(function () {
    validate();
    $('#langeweile-antwort, #name').change(validate);
});

function validate() {
    if ($("#langeweile-antwort").val().length > 0 &&
        $("#name").val().length > 0) {
        $(".submit-button").prop("disabled", false);
    }
    else {
        $(".submit-button").prop("disabled", true);
    }
}


// Overlay Content

function overlayOn(buttonId) {
    document.getElementById("overlay-" + buttonId).style.display = "block";
}

function overlayOff(overlayId) {
    document.getElementById(overlayId).style.display = "none";

    let video = document.getElementById("video");

    if (video.paused) {
    } else {
        video.pause();
    }
}

// Slideshow

// Nächste Schritte:
// komischer Bug in text Feldern -> button bleibt noch disabled .. da irgendwas machen!


var slideIndex = 1;
var z = document.getElementsByClassName("slideshow");
for (i = 0; i < z.length; i++) {
    //set custom data attribute to first current image index
    z[i].setAttribute("data-currentslide", 1);
    showDivs(z[i].getAttribute("data-currentslide"), i);
}

function plusDivs(n, j) {
    //get custom data attribute value of current image index to slideshow class index j
    slideIndex = parseInt(z[j].getAttribute("data-currentslide")[0]);
    showDivs(slideIndex += n, j);
}

function currentDiv(n, j) {
    showDivs(slideIndex = n, j); /* showDivs Not showSlides*/
}

function showDivs(n, j) {
    var i;
    var z = document.getElementsByClassName("slideshow")[j];
    var x = z.getElementsByClassName("mySlides");

    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length;
    }
    //set custom data attribute to current image index
    z.setAttribute("data-currentslide", slideIndex);
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    x[slideIndex - 1].style.display = "block";
}