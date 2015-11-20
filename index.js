/*
 * EXTERNAL LIBS
 */
// load google visualization packages
// we're loading `line` for when material charts are ready--they just aren't quite there yet
google.load('visualization', '1.1', {packages: ['line', 'corechart']});
/*
 * /EXTERNAL LIBS
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * CONFIG
 */
var Colors = {
    green: '#025736',
    tan: '#EEE3C7',
    gold: '#EFB410',
    red: '#BF2B37'
};
/*
 * /CONFIG
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * SEASON CONFIG
 */
// season metrics
// allows us to react to changes in season length or point system
// in case 3-2-1-0 system is adopted, this should handle it. only record display should need changing
var totalGames = 82;
var pointsForWin = 2;
var pointsForOTWin = 2;
var pointsForOTLoss = 1;
var pointsForLoss = 0;
var totalPoints = totalGames * pointsForWin;
/*
 * /SEASON CONFIG
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * GAME DATA
 */
// games played in descending order (ascending copy created below)
// original is descending since we can just uncomment a line and not worry about dangling commas
var gamesDesc = [
    //{date: '2016-04-09', points: pointsForWin},
    //{date: '2016-04-05', points: pointsForWin},
    //{date: '2016-04-03', points: pointsForWin},
    //{date: '2016-04-01', points: pointsForWin},
    //{date: '2016-03-31', points: pointsForWin},
    //{date: '2016-03-29', points: pointsForWin},
    //{date: '2016-03-26', points: pointsForWin},
    //{date: '2016-03-24', points: pointsForWin},
    //{date: '2016-03-22', points: pointsForWin},
    //{date: '2016-03-20', points: pointsForWin},
    //{date: '2016-03-19', points: pointsForWin},
    //{date: '2016-03-17', points: pointsForWin},
    //{date: '2016-03-15', points: pointsForWin},
    //{date: '2016-03-12', points: pointsForWin},
    //{date: '2016-03-10', points: pointsForWin},
    //{date: '2016-03-06', points: pointsForWin},
    //{date: '2016-03-05', points: pointsForWin},
    //{date: '2016-03-03', points: pointsForWin},
    //{date: '2016-03-01', points: pointsForWin},
    //{date: '2016-02-28', points: pointsForWin},
    //{date: '2016-02-26', points: pointsForWin},
    //{date: '2016-02-25', points: pointsForWin},
    //{date: '2016-02-23', points: pointsForWin},
    //{date: '2016-02-21', points: pointsForWin},
    //{date: '2016-02-18', points: pointsForWin},
    //{date: '2016-02-17', points: pointsForWin},
    //{date: '2016-02-15', points: pointsForWin},
    //{date: '2016-02-13', points: pointsForWin},
    //{date: '2016-02-11', points: pointsForWin},
    //{date: '2016-02-09', points: pointsForWin},
    //{date: '2016-02-06', points: pointsForWin},
    //{date: '2016-02-04', points: pointsForWin},
    //{date: '2016-02-02', points: pointsForWin},
    //{date: '2016-01-25', points: pointsForWin},
    //{date: '2016-01-23', points: pointsForWin},
    //{date: '2016-01-21', points: pointsForWin},
    //{date: '2016-01-20', points: pointsForWin},
    //{date: '2016-01-16', points: pointsForWin},
    //{date: '2016-01-15', points: pointsForWin},
    //{date: '2016-01-12', points: pointsForWin},
    //{date: '2016-01-10', points: pointsForWin},
    //{date: '2016-01-09', points: pointsForWin},
    //{date: '2016-01-07', points: pointsForWin},
    //{date: '2016-01-05', points: pointsForWin},
    //{date: '2016-01-03', points: pointsForWin},
    //{date: '2016-01-02', points: pointsForWin},
    //{date: '2015-12-31', points: pointsForWin},
    //{date: '2015-12-28', points: pointsForWin},
    //{date: '2015-12-26', points: pointsForWin},
    //{date: '2015-12-22', points: pointsForWin},
    //{date: '2015-12-21', points: pointsForWin},
    //{date: '2015-12-19', points: pointsForWin},
    //{date: '2015-12-17', points: pointsForWin},
    //{date: '2015-12-15', points: pointsForWin},
    //{date: '2015-12-12', points: pointsForWin},
    //{date: '2015-12-11', points: pointsForWin},
    //{date: '2015-12-07', points: pointsForWin},
    //{date: '2015-12-05', points: pointsForWin},
    //{date: '2015-12-03', points: pointsForWin},
    //{date: '2015-12-01', points: pointsForWin},
    //{date: '2015-11-28', points: pointsForWin},
    //{date: '2015-11-27', points: pointsForWin},
    //{date: '2015-11-25', points: pointsForWin},
    //{date: '2015-11-21', points: pointsForWin},
    {date: '2015-11-19', points: pointsForLoss},
    {date: '2015-11-17', points: pointsForLoss},
    {date: '2015-11-14', points: pointsForOTLoss},
    {date: '2015-11-12', points: pointsForWin},
    {date: '2015-11-10', points: pointsForWin},
    {date: '2015-11-07', points: pointsForWin},
    {date: '2015-11-05', points: pointsForLoss},
    {date: '2015-10-31', points: pointsForOTLoss},
    {date: '2015-10-30', points: pointsForWin},
    {date: '2015-10-27', points: pointsForWin},
    {date: '2015-10-25', points: pointsForLoss},
    {date: '2015-10-24', points: pointsForWin},
    {date: '2015-10-22', points: pointsForWin},
    {date: '2015-10-18', points: pointsForLoss},
    {date: '2015-10-16', points: pointsForOTLoss},
    {date: '2015-10-15', points: pointsForWin},
    {date: '2015-10-10', points: pointsForWin},
    {date: '2015-10-08', points: pointsForWin}
];
var gamesAsc = [];
for (var i = gamesDesc.length - 1; i >= 0; i--){
    gamesAsc.push(gamesDesc[i]);
}
/*
 * /GAME DATA
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * CHART DATA TABULATION
 */
// create the chart row for each game
var runningPoints = 0, possiblePoints = totalPoints;
gamesAsc.forEach(function(game, index) {
    var gameNo = index + 1;
    game.chartRow = [
        gameNo,                                                 // current game #
        runningPoints += game.points,                           // the total points through this game
        100,                                                    // /u/splurgingspurgeon points goal
        possiblePoints -= 2 - game.points,                      // the total possible points achievable
        (runningPoints / ((gameNo) * pointsForWin)) * 100       // the percentage of current points attained
    ];
});
/*
 * /CHART DATA TABULATION
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * RECORD TABULATION
 */
// calculate the current record
// again, otWins is tabulated only in case it gets adopted
var regulationWins = 0, regulationLosses = 0, otWins = 0, otLosses = 0;
gamesDesc.forEach(function(game) {
    switch (game.points) {
        case pointsForWin:
            regulationWins++;
            break;

        case pointsForOTWin:
            otWins++;
            break;

        case pointsForOTLoss:
            otLosses++;
            break;

        case pointsForLoss:
            regulationLosses++;
            break;
    }
});
/*
 * /RECORD TABULATION
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * METRIC TABULATION
 */
// calculate other metrics
var played = gamesDesc.length;
var points = (regulationWins * pointsForWin) +
    (otWins * pointsForOTWin) +
    (otLosses * pointsForOTLoss) +
    (regulationLosses * pointsForLoss);
var remaining = (totalGames - played) * pointsForWin;
// total points * current gotten points pct
var pace = totalPoints * (points / (played * pointsForWin));
/*
 * /METRIC TABULATION
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * TEXT DETAILS
 */
// set the values in the page
$(function() {
    $('#points-goal').html(points + '/100');
    $('#points-needed').html((100 - points) + '');
    $('#points-remaining').html(remaining + '');
    $('#current-pace').html(pace.toFixed() + '');
    $('#record').html(regulationWins + '-' + regulationLosses + '-' + otLosses);
});
/*
 * /TEXT DETAILS
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * PROGRESS BAR
 */
// set progress bar width
$(function() {
    $('#goal-progress').css('width', points + '%');
    var $yeoface = $('#yeoface');
    // to account for image width, make this 2% shorter than the progress bar
    $yeoface.css('margin-left', (points - 2) + '%');
    if (played > 41 && points < 50) {
        $yeoface.src = 'yeoface-stillsub50.png';
    } else if (points >= 50 && points < 75) {
        $yeoface.src = 'yeoface-sub75.png';
    } else if (points >= 100) {
        $yeoface.src = 'yeoface-100.png';
    }
});
/*
 * /PROGRESS BAR
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * GAME "SELECT"
 */
$(function() {
    // create the menu
    var $gamedayButton = $('#gameday-select-btn');
    var $gamedaySelect = $('#gameday-select-options');
    gamesDesc.forEach(function (game) {
        $gamedaySelect.append('<li><a>' + game.date + '</a></li>');
    });

    // set click handler for menu items
    var $games = $gamedaySelect.find('li > a');
    $games.each(function(index, item) {
        $(item).click(function(e) {
            // re-enable next & previous buttons
            var $nextBtn = $('#next-game-btn').prop('disabled', false);
            var $prevBtn = $('#previous-game-btn').prop('disabled', false);
            // we're at the most recent games, no next
            // or, we're at the earliest game, no previous
            if (index == 0) {
                $nextBtn.prop('disabled', true);
            } else if (index == $games.length - 1) {
                $prevBtn.prop('disabled', true);
            }

            // set button text & draw chart
            $gamedayButton.html($(e.target).text() + ' <span class="caret"></span>');
            drawChart();
        });
    });

    // click newest game by default
    $games.first().click();
});
/*
 * /GAME "SELECT"
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * PLAY / PAUSE / FORWARD / REWIND CHART BUTTONS
 */
$(function() {
    // play through the whole season
    $('#play-season-btn').click(function() {
        // disable the button
        var $me = $(this).prop('disabled', true);
        // grab all the games
        var $games = $('#gameday-select-options').find('li > a');
        var timeout = 0;
        // go through the list, bottom to top, clicking each one at an increasingly long interval from now
        for (var i = $games.length - 1; i >= 0; i--) {
            setTimeout(
                function($game){$game.click();},
                timeout += 250,
                $($games[i])
            );
        }
        // re-enable the button when the chart is done drawing to now
        setTimeout(function() {$me.prop('disabled', false);}, timeout);
    });

    // move to the previous game
    $('#previous-game-btn').click(function() {
        var selected = $.trim($('#gameday-select-btn').text());
        var $games = $('#gameday-select-options').find('li > a');
        $games.each(function(index, item) {
            // we're at the game
            if ($.trim($(item).text()) === selected) {
                // we have previous games, click it!
                if (index < $games.length - 1) {
                    $($games[index + 1]).click();
                    return false;
                }
            }
        });
    });

    // move to the next game
    $('#next-game-btn').click(function() {
        var selected = $.trim($('#gameday-select-btn').text());
        var $games = $('#gameday-select-options').find('li > a');
        $games.each(function(index, item) {
            // we're at the game
            if ($.trim($(item).text()) === selected) {
                // we have newer games, click it!
                if (index > 0) {
                    $($games[index - 1]).click();
                    return false;
                }
            }
        });
    });
});
/*
 * /PLAY / PAUSE / FORWARD / REWIND CHART BUTTONS
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * CHART
 */
function drawChart() {
    // get the button text
    var chartThrough = $.trim($('#gameday-select-btn').text());

    // set up our columns
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Games Played');
    data.addColumn('number', 'Earned Points');
    data.addColumn('number', 'SS Points Goal');
    data.addColumn('number', 'Possible Points');
    data.addColumn('number', 'Point Earn %');

    // create the games played rows. Initial data point is pre-populated
    var rows = [[0, 0, 100, totalGames * pointsForWin, 100]];
    for (var i = 0; i < gamesAsc.length; i++) {
        rows.push(gamesAsc[i].chartRow);

        // we've reached the selected game, stop charting
        if (gamesAsc[i].date === chartThrough) {
            break;
        }
    }

    // add filler rows to fill the ss points goal all the way across
    for (i = rows.length; i <= 82; i++) {
        rows.push([i, null, 100, null, null]);
    }

    // add all the rows to the chart
    data.addRows(rows);

    // draw that motherfucker
    new google.visualization.LineChart(document.getElementById('chart')).draw(
        data,
        {
            backgroundColor: 'transparent',
            height: 350,
            legend: {
                maxLines: 2,
                textStyle: {
                    color: Colors.green
                }
            },
            series: {
                0: {color: Colors.red, targetAxisIndex: 0},
                1: {color: Colors.green, lineDashStyle: [5, 2], targetAxisIndex: 0},
                2: {color: Colors.green, targetAxisIndex: 0},
                3: {color: Colors.gold, targetAxisIndex: 1}
            },
            hAxis: {
                gridlines: {color: 'transparent'},
                ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80],
                title: 'Games Played'
            },
            vAxes: {
                0: {
                    gridlines: {color: 'transparent'},
                    ticks: [0, 20, 40, 60, 80, 100, 120, 140, 160],
                    title: 'Points'
                },
                1: {
                    gridlines: {color: 'transparent'},
                    ticks: [0, 20, 40, 60, 80, 100],
                    title: 'Win %'
                }
            },
            trendlines: {
                0: {
                    color: '#CCC',
                    lineWidth: 0,
                    pointSize: .25
                }
            }
        }
    );
}

// make sure to resize the chart along with the window
$(function() {
    $(window).resize(function(){drawChart();});
});
/*
 * /CHART
 */
