class ViewRule {

    function_hello() {
        if (document.body.contains(document.getElementById('sidebar'))) {
            x = document.getElementById("sidebar");
            if (x.style.display === "none") {
                x.style.display = "block";
            }
        } else {
            var g = document.createElement('DIV');
            g.setAttribute("class", "sidebar");
            g.setAttribute("id", "sidebar");
            g.innerHTML += "<div class=\"container\">";
            g.innerHTML += "<h4>Accessibility Checker</h4>";
            g.innerHTML += "<br>";
            g.innerHTML += "<label>Issue 1/14</label>";
            g.innerHTML += "<br><br>";
            g.innerHTML += "<label>Heading levels should not be skipped.</label>";
            g.innerHTML += "<br><br>";
            g.innerHTML += "<label for=\"sel1\">Action to take:</label><select class=\"form-control\" id=\"sel1\"><option>1</option></select>";
            g.innerHTML += "</div>";

            document.body.appendChild(g);


            var element = document.createElement("div");
            element.innerHTML += 
                "<button type='button' tabindex='0' onclick='ViewRule.hide_view()' class='button-1' id='button-1'\n" +
                "        style='margin: 0px; cursor: pointer;'><span class='bavIU_caGd'><span class='bavIU_eoCh'><svg\n" +
                "        name='IconX' viewBox='0 0 1920 1920' rotate='0' width='1em' height='1em' aria-hidden='true' role='presentation'\n" +
                "        focusable='false' data-cid='InlineSVG SVGIcon'><g role='presentation'><path\n" +
                "        d='M771.548 960.11L319 1412.658l188.562 188.562 452.548-452.548 452.548 452.548 188.562-188.562-452.548-452.548 452.548-452.548L1412.658 319 960.11 771.548 507.562 319 319 507.562z'\n" +
                "        fill-rule='nonzero' stroke='none' stroke-width='1'></path></g></svg></span></span>\n" +
                "</button>";
            document.getElementById('sidebar').appendChild(element);
        }
    }

    hide_view() {
        var x = document.getElementById("sidebar");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

}

export default ViewRule;
