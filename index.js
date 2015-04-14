var p = photonui;

$(document).ready(function() {
    var title = getQuery(window.location.href);
    
    if(title) {
        $("#titleText").text(unescape(title));
        $("title").text(unescape(title));
    }
    
    var progressBar = new p.ProgressBar({
        pulsate: true,
    });
    
    p.domInsert(progressBar, $("#widgetArea")[0]);
    
    mutateValue(progressBar, 0, false);
});

function mutateValue(progressBar, baseDelay, pulsateNext) {
    setTimeout(function() {
        var baseDelay = baseDelay ? baseDelay : 0;
        
        if(progressBar.pulsate) {
            progressBar.pulsate = false;
            baseDelay = 0;
        }

        if(pulsateNext) {
            progressBar.value = 0.01;
            progressBar.pulsate = true;
            baseDelay = 2000;
        }
        
        if(progressBar.value >= 0.99) {
            mutateValue(progressBar, 2000, true);
        } else {
            var val = (Math.random()/50) * (Math.random() * 10);
            
            if(progressBar.value + val > 0.99) {
                progressBar.value = 0.99;
            } else {
                progressBar.value += val;
            }
            
            mutateValue(progressBar, baseDelay, false);
        }
    }, baseDelay+getRandomInt(100, 2000));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getQuery(url) {
    var query = urlParser.parse(url).query;
    return query;
}
