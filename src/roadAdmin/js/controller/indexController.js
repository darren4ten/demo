var chart = null;
$(function () {
    //安全信号设施
    $('#pieChartBasicInfs').highcharts({
        chart: {
            plotBackgroundColor: null,// https://img.hcharts.cn/highcharts/highcharts.js
            plotBorderWidth: null,
            plotShadow: false,
            spacing: [100, 0, 40, 0],
            backgroundColor: 'rgba(0,0,0,0)'//背景透明
        },
        title: {
            floating: true,
            text: '圆心显示的标题'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                point: {
                    events: {
                        mouseOver: function (e) {  // 鼠标滑过时动态更新标题
                            // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                            chart.setTitle({
                                text: e.target.name + '\t<span style="font-size:6px;">' + e.target.y + ' %</span>'
                            });
                        }
                        //, 
                        // click: function(e) { // 同样的可以在点击事件里处理
                        //     chart.setTitle({
                        //         text: e.point.name+ '\t'+ e.point.y + ' %'
                        //     });
                        // }
                    }
                },
            }
        },
        series: [{
            type: 'pie',
            innerSize: '80%',
            name: '市场份额',
            data: [
                { name: '诱导屏', y: 2000, url: 'http://bbs.hcharts.cn' },
                ['协调信号机', 2390],
                ['潮汐车道', 500],
                ['单点机', 2300],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true,
                    url: 'http://www.hcharts.cn'
                }
            ]
        }]
    }, function (c) {
        // 环形图圆心
        var centerY = c.series[0].center[1],
            titleHeight = parseInt(c.title.styles.fontSize);
        c.setTitle({
            y: centerY + titleHeight / 2
        });
        chart = c;
    });
});
