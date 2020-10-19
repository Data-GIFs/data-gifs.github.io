const url = "datagif.csv";

const taxonomy = {
    visualization: ['map','line','bar','point','area','diagram', 'circle', 'tree_and_graph'],
    narrative_progress:['with', 'without'],
    animation_mapping: ["temporal", "faceting", "narrative", "setup"],
    context_preservation: ["no_context_preservation", "trails", "overview","baseline", "long_exposure"],
    repetition: ["loop", "pause", "bounce"],
    duration: ['less_than_10s', 'between_10s_and_20s', 'more_than_20s']
};

const facets = Object.keys(taxonomy);

const container = d3.select(".grid");

// create checkboxes to filter techniques
var filters = d3
    .select("#filters")
    .selectAll("div")
    .data(facets)
    .enter()
    .append("div")
    .attr("id", d => "select_" + d);

filters
    .append("h3")
    .html(d => formatText(d));

var checkboxes = filters
    .selectAll("input")
    .data(d => taxonomy[d])
    .enter()
    .append("div")
    .classed("checkbox-container", true);
checkboxes
    .append("input")
    .attr("type", "checkbox")
    .attr("class", "input")
    .attr("id", function (d) {
        return "check_" + d3.select(this.parentNode.parentNode).datum() + "_" + d;
    })
    .attr("value", d => d);
checkboxes
    .append("label")
    .attr("for", function (d) {
        return "check_" + d3.select(this.parentNode.parentNode).datum() + "_" + d;
    })
    .append("span")
    .text(d => formatText(d));

d3.select("#showall").on("click", function () {
    d3.selectAll("input").property("checked", false);
    // dispatch event to reload techniques
    let event = new Event("change");
    eventHandler.dispatchEvent(event);
});

d3.csv(url)
    .then(function (data) {
        data.forEach(function(d) {
            d.duration = ''
            if (d.length < 10000)
                d.duration = 'less_than_10s'
            else if (d.length >= 10000 && d.length <= 20000)
                d.duration = 'between_10s_and_20s'
            else if (d.length > 20000)
                d.duration = 'more_than_20s'
        })
        console.log(data);
        
        // display count
        d3.selectAll("#count, #total").text(data.length);

        // listen for changes in filters
        d3.selectAll(".input").on("change", function () {
            // get filter values
            var filters = facets.map(function (facet) {
                var selections = [];
                taxonomy[facet].forEach(function (selection) {
                    // console.log('selection:', selection)
                    if (d3.select("#check_" + facet + "_" + selection).property("checked")) {
                        selections.push(selection);
                    }
                });
                return [facet, selections];
            });

            // update
            refreshTechniques(filters);
        });

        function refreshTechniques(filters) {
            // filter
            var fData = data.filter(d => filterData(d, filters));
            // update count in heading
            d3.select("#count").text(fData.length);
            // get IDs of techniques matching filter
            var ids = fData.map(d => d.gif);
            // hide all non-matching ones
            d3.selectAll(".grid-item").style("display", d =>
                ids.indexOf(d.gif) != -1 ? null : "none"
            );
            // update layout
            msnry.layout();
        }

        // draw boxes for GIF
        var div = container
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .classed("grid-item", true);

        div.append("img").attr("src", d => "../corpus/" + d.gif + ".gif");
        div.append("span")
            .html(d => [
                "<b>",
                d.Title,
                "</b>",
                " <a href=" + d.Source + ' target="_blank">(Source)</a>'
            ].join("")
        );
        var tags = div.append("div").style("margin-top", "7px");

        // add tags on technique cards
        facets.forEach(function (facet) {
            tags
                .append("div")
                .classed("tag", true)
                .classed(facet, true)
                .html(d => d[facet]);
            
        });
    })
    .then(function () {
        imagesLoaded(".grid", function () {
            var elem = document.querySelector(".grid");
            window.msnry = new Masonry(elem, {
                // options
                itemSelector: ".grid-item",
                columnWidth: 241,
                gutter: 15
            });
            window.msnry.on('onOpenItem', onOpenItem)
        });
    })
    .catch(function (error) {
        throw error;
    });

function filterData(d, filters) {
    return filters.every(function (fil) {
        // facet: fil[0]
        // selected: fil[1]
        // check if either array is empty or category is selected
        // if (fil[0] != 'length'){
            return fil[1].length == 0 || fil[1].indexOf(d[fil[0]]) != -1;
        // }
        // else {
        //     console.log('fil[1]:', fil[1])
        //     console.log('fil:', d[fil[0]])
        // }
        
    });
}

function unique(arr, acc) {
    return arr.map(acc).filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
}

function formatText(str) {
    // capitalize and replace underscores by spaces
    // replace first letter
    str = str.slice(0, 1).toUpperCase() + str.slice(1);
    // find all underscores, replace by spaces and capitalize following letter
    while (str.indexOf("_") != -1) {
        str =
            str.slice(0, str.indexOf("_")) +
            " " +
            str.slice(str.indexOf("_") + 1, str.indexOf("_") + 2).toUpperCase() +
            str.slice(str.indexOf("_") + 2);
    }
    return str;
}

var support = { transitions: Modernizr.csstransitions },
    // transition end event name
    transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
    transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
    onEndTransition = function (el, callback) {
        var onEndCallbackFn = function (ev) {
            if (support.transitions) {
                if (ev.target != this) return;
                this.removeEventListener(transEndEventName, onEndCallbackFn);
            }
            if (callback && typeof callback === 'function') { callback.call(this); }
        };
        if (support.transitions) {
            el.addEventListener(transEndEventName, onEndCallbackFn);
        }
        else {
            onEndCallbackFn();
        }
    };

function onOpenItem(instance, item) {
    console.log('onOpenItem')
    instance.items.forEach(function (el) {
        if (item != el) {
            var delay = Math.floor(Math.random() * 50);
            el.style.WebkitTransition = 'opacity .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1), -webkit-transform .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1)';
            el.style.transition = 'opacity .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1), transform .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1)';
            el.style.WebkitTransform = 'scale3d(0.1,0.1,1)';
            el.style.transform = 'scale3d(0.1,0.1,1)';
            el.style.opacity = 0;
        }
    });
}

function onCloseItem(instance, item) {
    instance.items.forEach(function (el) {
        if (item != el) {
            el.style.WebkitTransition = 'opacity .4s, -webkit-transform .4s';
            el.style.transition = 'opacity .4s, transform .4s';
            el.style.WebkitTransform = 'scale3d(1,1,1)';
            el.style.transform = 'scale3d(1,1,1)';
            el.style.opacity = 1;

            onEndTransition(el, function () {
                el.style.transition = 'none';
                el.style.WebkitTransform = 'none';
            });
        }
    });
}

// new GridFx(document.querySelector('.grid'), {
//     imgPosition: {
//         x: -0.5,
//         y: 1
//     },
//     onOpenItem: function (instance, item) {
//         instance.items.forEach(function (el) {
//             if (item != el) {
//                 var delay = Math.floor(Math.random() * 50);
//                 el.style.WebkitTransition = 'opacity .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1), -webkit-transform .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1)';
//                 el.style.transition = 'opacity .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1), transform .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1)';
//                 el.style.WebkitTransform = 'scale3d(0.1,0.1,1)';
//                 el.style.transform = 'scale3d(0.1,0.1,1)';
//                 el.style.opacity = 0;
//             }
//         });
//     },
//     onCloseItem: function (instance, item) {
//         instance.items.forEach(function (el) {
//             if (item != el) {
//                 el.style.WebkitTransition = 'opacity .4s, -webkit-transform .4s';
//                 el.style.transition = 'opacity .4s, transform .4s';
//                 el.style.WebkitTransform = 'scale3d(1,1,1)';
//                 el.style.transform = 'scale3d(1,1,1)';
//                 el.style.opacity = 1;

//                 onEndTransition(el, function () {
//                     el.style.transition = 'none';
//                     el.style.WebkitTransform = 'none';
//                 });
//             }
//         });
//     }
// });