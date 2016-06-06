/*TODO: 

3 - add extra views (last hour, day, week)
4 - add loading data image for extra views
5 - defer animation in current view to be based on seconds
6 - Put unknown co-ordinates into antarctica


*/
var width = 1000,
  height = 720;



var colours = {
  "http": "#a6cee3",
  "mail": "#1f78b4",
  "telnet": "#b2df8a",
  "microsoft-ds": "#33a02c",
  "ftp": "#fb9a99",
  "ssh": "#e31a1c",
  "xns": "#fdbf6f",
  "loc-srv": "#ff7f00",
  "proxy": "#cab2d6",
  "bootpc": "#6a3d9a",
  "netbios-ssn": "#ffff99",
  "kerberos": "#b15928",
  "unassigned": "#ffffff"
};

var services_list = [
  "http",
  "mail",
  "telnet",
  "microsoft-ds",
  "ftp",
  "ssh",
  "unassigned",
  "xns",
  "loc-srv",
  "proxy",
  "bootpc",
  "netbios-ssn",
  "kerberos"
];

var services_counts = d3.map();

services_list.forEach(function(d) {
  services_counts.set(d, 0);
});


var invader_path = "M 40.126998,0.5617511 40.126998,20.511862 60.090713,20.511862 60.090713,0.5617511 40.126998,0.5617511 z M 60.090713,20.511862 60.090713,40.461962 40.126998,40.461962 40.126998,60.412072 20.163284,60.412072 20.163284,80.362182 0.19956911,80.362182 0.19956911,140.2125 20.163284,140.2125 20.163284,100.31229 40.126998,100.31229 40.126998,140.2125 60.090713,140.2125 60.090713,120.26239 159.90929,120.26239 159.90929,140.2125 179.873,140.2125 179.873,100.31229 199.83672,100.31229 199.83672,140.2125 219.80043,140.2125 219.80043,80.362182 199.83672,80.362182 199.83672,60.412072 179.873,60.412072 179.873,40.461962 159.90929,40.461962 159.90929,20.511862 139.94557,20.511862 139.94557,40.461962 80.054428,40.461962 80.054428,20.511862 60.090713,20.511862 z M 159.90929,20.511862 179.873,20.511862 179.873,0.5617511 159.90929,0.5617511 159.90929,20.511862 z M 159.90929,140.2125 119.98186,140.2125 119.98186,160.16261 159.90929,160.16261 159.90929,140.2125 z M 60.090713,140.2125 60.090713,160.16261 100.01814,160.16261 100.01814,140.2125 60.090713,140.2125 z M 60.090713,60.412072 80.054428,60.412072 80.054428,80.362182 60.090713,80.362182 60.090713,60.412072 z M 139.94557,60.412072 159.90929,60.412072 159.90929,80.362182 139.94557,80.362182 139.94557,60.412072 z";

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);
//.attr("style","background:chocolate;");

var projection = d3.geo.robinson()
  .scale(150)
  .translate([(width / 2) - 50, (height / 2) + 50]);

var path = d3.geo.path()
  .projection(projection);

var homex = projection([28.007557, -26.057091, ])[0];
var homey = projection([28.007557, -26.057091, ])[1];
var homex_kzn = projection([31.068805, -29.730138, ])[0];
var homey_kzn = projection([31.068805, -29.730138, ])[1];
var homex_cpt = projection([18.421042, -33.919183, ])[0];
var homey_cpt = projection([18.421042, -33.919183, ])[1];

function close_overlay() {
  d3.select("#explanation_overlay").attr("style","display:none");
}

function open_overlay() {
  d3.select("#explanation_overlay").attr("style","display:block");
}

function draw_attacks(show, clear) {
  d3.json("attack_data/" + show, function(error, data) {
    if (clear === true) {
      services_counts.forEach(function (d) { services_counts.set(d,0); });
      loader.attr("style", "display:none");
      d3.selectAll(".invader").remove();
      d3.selectAll("dot").remove();
      d3.selectAll(".services_count").text("0");
    }
    // flying dots from each country
    var circle = svg.selectAll("dot")
      .data(data);

    circle.enter().append("circle")
      .attr("r", 2.5)
      .attr("class", "dot");

    circle
      .attr("cx", function(d) {
        return projection([d.long, d.lat])[0];
      })
      .attr("cy", function(d) {
        return projection([d.long, d.lat])[1];
      })
      .attr("style", "fill:none;");


    circle
      .transition()
      .attr("style", function(d) {
        return "fill :" + colours[d.service];
      })
      .attr("cx", function(d) {
        if (d.honeypot_server == "vm-is-cpt-honeypot") {
          return homex_cpt;
        }
        else if  (d.honeypot_server == "vm-is-dbn-honeypot") {
          return homex_kzn;
        }
        else {
          return homex;
        }
      })
      .attr("cy", function(d) {
        if (d.honeypot_server == "vm-is-cpt-honeypot") {
          return homey_cpt;
        }
        else if  (d.honeypot_server == "vm-is-dbn-honeypot") {
          return homey_kzn;
        }
        else {
          return homey;
        }
      })
      .duration(500)
      .delay(function(d, i) {
        if (show == "current") {
          return +(d.time_stamp.split(".")[0].split(":")[2]) * 900;
        }
        else {
          return 100 * i;
        }
      })
      .ease("linear")
      .each("start", function(d) {

        //this creates the text at the top of the screen
        services_counts.set(d.service, services_counts.get(d.service) + 1);
        d3.select(".service_" + d.service)
          .text(services_counts.get(d.service));

        d3.select("#top_box_1")
          .attr("fill", d3.select("#top_box_2").attr("fill"))
          .text(d3.select("#top_box_2").text());

        d3.select("#top_box_2")
          .attr("fill", d3.select("#top_box_3").attr("fill"))
          .text(d3.select("#top_box_3").text());

        d3.select("#top_box_3")
          .attr("fill", d3.select("#top_box_4").attr("fill"))
          .text(d3.select("#top_box_4").text());

        d3.select("#top_box_4")
          .attr("fill", colours[d.service])
          .text(
            d.time_stamp.split(".")[0].substring(0, 10) + ", " +
            d.time_stamp.split(".")[0].substring(11) + ", " +
            d.src_ip + ", " +
            d.protocol + ", " +
            d.service + ", " +
            d.country + ", " +
            d.honeypot_server);

        if (d.honeypot_server == "vm-is-cpt-honeypot") {
          return cpt_circle.attr("fill", "red");
        }
        else if  (d.honeypot_server == "vm-is-dbn-honeypot") {
          return kzn_circle.attr("fill", "red");
        }
        else {
          return bry_circle.attr("fill", "red");
        }    
        bry_circle.attr("fill", "red"); //.transition().duration(500).attr("fill", "#07A6B9");
      })
      .each("end", function(d, i) {
          bry_circle.attr("fill", "#07A6B9");
          kzn_circle.attr("fill", "#07A6B9");
          cpt_circle.attr("fill", "#07A6B9");
        if (data.length == (i + 1) && show !== "current") {
          show_g.attr("style", "display:block;");
          run_status_g.attr("style", "display:none;");
        }
      })
      .remove();

    circle.exit().remove();

    //draw the space invaders
    if (show !== "current"){
      var invader = svg.selectAll(".invader")
        .data(data);

      invader.enter().append("path")
        .attr("d", invader_path)
        .attr("class", "invader")
        .attr("style", "fill:none;")
        .attr("transform", function(d) {
          return "translate(" +
            (projection([d.long, d.lat])[0] - 10) +
            "," +
            (projection([d.long, d.lat])[1] - 10) +
            ") scale(0.1)";
        });

      invader
        .transition()
        .attr("style", function(d) {
          return "fill :" + colours[d.service];
        })
        .duration(2000)
        .delay(function(d, i) {
            return 100 * i;
        })
        .remove();

        invader.exit().remove();
      }
    else {
      var invader = svg.selectAll(".invader_temp")
        .data(data);

      invader.enter().append("path")
        .attr("d", invader_path)
        .attr("class", "invader")
        .attr("style", "fill:none;")
        .attr("transform", function(d) {
          return "translate(" +
            (projection([d.long, d.lat])[0] - 10) +
            "," +
            (projection([d.long, d.lat])[1] - 10) +
            ") scale(0.1)";
        })        
        .transition()
        .attr("style", function(d) {
          return "fill :" + colours[d.service];
        })
        .delay(function(d) {
            return +(d.time_stamp.split(".")[0].split(":")[2]) * 900;
        });
    }

  });
}

function timer_attacks() {
  draw_attacks("current");
}

//load the world map data
d3.json("data/world-110m.json", function(error, world) {

  //setup the main svg elements
  svg.append("path")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("d", path);

  svg.append("path")
    .datum(topojson.feature(world, world.objects.countries))
    .attr("class", "boundary")
    .attr("d", path);

  // svg.append("circle")
  //   .attr("cx", homex)
  //   .attr("cy", homey)
  //   .attr("r", 10)
  //   .attr("fill", "#07A6B9");

  bry_circle = svg.append("circle")
    .attr("cx", homex)
    .attr("cy", homey)
    .attr("r", 6)
    .attr("fill", "#07A6B9");

  kzn_circle = svg.append("circle")
    .attr("cx", homex_kzn)
    .attr("cy", homey_kzn)
    .attr("r", 4)
    .attr("fill", "#07A6B9");

  cpt_circle = svg.append("circle")
    .attr("cx", homex_cpt)
    .attr("cy", homey_cpt)
    .attr("r", 4)
    .attr("fill", "#07A6B9");

//  svg.append("image")
//    .attr("x", 20)
//    .attr("y", 38)
//    .attr("width", 120)
//    .attr("height", 84)
//    .attr("xlink:href", "images/is_logo_inverted.png");

  svg.append("image")
    .attr("x", 850)
    .attr("y", 630)
    .attr("width", 36)
    .attr("height", 21)
    .attr("style","cursor:pointer")
    .attr("xlink:href", "images/mini-limn.png")
    .on("click", function () {
      return window.open("http://www.limn.co.za");
    });

  svg.append("rect")
    .attr("x", 180.5)
    .attr("y", 30.5)
    .attr("width", 600)
    .attr("height", 100)
    .attr("class", "top_box");

  svg.append("text")
    .attr("x", 190)
    .attr("y", 50)
    .attr("class", "top_box_text")
    .attr("id", "top_box_1")
    .attr("fill", "#fff")
    .text("Waiting...");

  svg.append("text")
    .attr("x", 130)
    .attr("y", 80)
    .attr("class", "time_select_heading")
    .attr("style","cursor:pointer")    
    .attr("fill", "#fff")
    .text("?")
    .on("click", function () {
      return open_overlay();
    });

  svg.append("rect")
    .attr("x", 124.5)
    .attr("y", 65.5)
    .attr("width", 20)
    .attr("height", 20)
    .attr("class", "top_box");


  svg.append("text")
    .attr("x", 190)
    .attr("y", 72)
    .attr("class", "top_box_text")
    .attr("id", "top_box_2")
    .attr("fill", "#fff")
    .text(".");

  svg.append("text")
    .attr("x", 190)
    .attr("y", 94)
    .attr("class", "top_box_text")
    .attr("id", "top_box_3")
    .attr("fill", "#fff")
    .text(".");

  svg.append("text")
    .attr("x", 190)
    .attr("y", 116)
    .attr("class", "top_box_text")
    .attr("id", "top_box_4")
    .attr("fill", "#fff")
    .text(".");

  // show_g = svg.append("g");

  // show_g.append("text")
  //   .attr("x", 880)
  //   .attr("y", 45)
  //   .attr("class", "time_select_heading")
  //   .attr("text-anchor", "middle")
  //   .attr("fill", "#fff")
  //   .text("show:");

  // show_g.append("text")
  //   .attr("x", 880)
  //   .attr("y", 68)
  //   .attr("class", "time_select selected")
  //   .attr("text-anchor", "middle")
  //   .attr("fill", "#fff")
  //   .text("current")
  //   .on("click", function() {
  //     d3.selectAll(".time_select").attr("class", "time_select");
  //     d3.select(this).attr("class", "time_select selected");
  //     d3.selectAll(".top_box_text").attr("fill", "#fff").text(".");
  //     draw_attacks("current", true);
  //     timer = window.setInterval(timer_attacks, 60000);
  //   });

  // show_g.append("text")
  //   .attr("x", 880)
  //   .attr("y", 91)
  //   .attr("class", "time_select")
  //   .attr("text-anchor", "middle")
  //   .attr("fill", "#fff")
  //   .text("last_hour")
  //   .on("click", function() {
  //     d3.selectAll(".time_select").attr("class", "time_select");
  //     d3.select(this).attr("class", "time_select selected");
  //     clearInterval(timer);
  //     d3.selectAll(".top_box_text").text(".");
  //     loader.attr("style", "display:block;");
  //     show_g.attr("style", "display:none;");
  //     run_status_g.attr("style", "display:block;");
  //     draw_attacks("last_hour", true);
  //   });

  // show_g.append("text")
  //   .attr("x", 880)
  //   .attr("y", 114)
  //   .attr("class", "time_select")
  //   .attr("text-anchor", "middle")
  //   .attr("fill", "#fff")
  //   .text("last_day")
  //   .on("click", function() {
  //     d3.selectAll(".time_select").attr("class", "time_select");
  //     d3.select(this).attr("class", "time_select selected");
  //     clearInterval(timer);
  //     d3.selectAll(".top_box_text").text(".");
  //     loader.attr("style", "display:block;");
  //     show_g.attr("style", "display:none;");
  //     run_status_g.attr("style", "display:block;");
  //     draw_attacks("../big_day.json", true);
  //   });

  // run_status_g = svg.append("g");

  // run_status_g.append("text")
  //   .attr("x", 880)
  //   .attr("y", 85)
  //   .attr("class", "time_select_heading")
  //   .attr("text-anchor", "middle")
  //   .attr("fill", "#fff")
  //   .text("running...");

  // run_status_g.attr("style", "display:none;");

  loader = svg.append("g");

  loader.append("rect").attr("x", 330.5)
    .attr("y", 400.5)
    .attr("width", 300)
    .attr("height", 50)
    .attr("class", "loader");

  loader.append("text")
    .attr("x", 440)
    .attr("y", 418)
    .attr("class", "loader_text")
    .attr("fill", "#fff")
    .text("Loading Data...");

  loader.append("image")
    .attr("x", 415)
    .attr("y", 430)
    .attr("width", 128)
    .attr("height", 7)
    .attr("xlink:href", "images/ajax-loader.gif");

  loader.attr("style", "display:block;");

  //draw the services count box on the left
  var serv_text_x = 80,
    serv_text_y = 370;

  var services_text = svg.selectAll(".services_text")
    .data(services_list);

  services_text.enter().append("text");

  services_text
    .attr("class", "services_text")
    .attr("text-anchor", "end")
    .attr("x", serv_text_x)
    .attr("y", function(d, i) {
      return (i * 20) + serv_text_y;
    })
    .text(function(d) {
      return d;
    });

  services_text.exit().remove();

  var services_dots = svg.selectAll(".services_dots")
    .data(services_list);

  services_dots.enter().append("circle");

  services_dots
    .attr("class", "services_dots")
    .attr("fill", function(d) {
      return colours[d];
    })
    .attr("cx", serv_text_x + 10)
    .attr("cy", function(d, i) {
      return (i * 20) + serv_text_y - 3.5;
    })
    .attr("r", 4.5);

  services_text.exit().remove();

  var services_count_text = svg.selectAll(".services_count")
    .data(services_list);

  services_count_text.enter().append("text");

  services_count_text
    .attr("class", function(d) {
      return "services_count service_" + d;
    })
    .attr("text-anchor", "start")
    .attr("x", serv_text_x + 20)
    .attr("y", function(d, i) {
      return (i * 20) + serv_text_y;
    })
    .text("0");

  services_count_text.exit().remove();


  //load the attack data draw them.
  //draw_attacks("current");
  draw_attacks("../big_day.json", true);
  timer = window.setInterval(timer_attacks, 60000);
});
