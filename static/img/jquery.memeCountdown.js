;(function($, window, document, undefined) {

    var pluginName = 'memeCountdown';


    function memeCountdown( element, options ){
        this.element = element;
        this._name = pluginName;
        this.config = options;
        this.init();
    }

    memeCountdown.prototype = {
        defaults : {
            duration : 1000,
            start : (new Date()).getTime(),
            end: (new Date()).getTime(),
            fixed : 3,
            setType : 'text',
            hiddenClass : 'hidden',
            endClass : 'end',
            prefix : '还剩下',
            msg : '特价活动已结束&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        },

        init : function(){
            this.config = $.extend({}, this.defaults, this.config);

            if(this.config.end <= this.config.start )
                this._end();
            else
                this._create();

        },

        _create : function(){
            var self = this;

            var n = self.config.end - self.config.start;

            if( n <= 0) self._end();

            if(window.location.pathname == '/') {
                $(self.element)[self.config.setType](this.formatter(n));
            } else {
                $(self.element)[self.config.setType](self.config.prefix + this.formatter(n));
            }

            var intervalId = window.setInterval(function() {
                var start = (new Date()).getTime();

                n = self.config.end  - start;

                if (n === 0 || self.config.end <= start) {
                    self._end(intervalId);
                    return;
                }

                if(window.location.pathname == '/') {
                    $(self.element)[self.config.setType](self.formatter(n));
                } else {
                    $(self.element)[self.config.setType](self.config.prefix + self.formatter(n));
                }

            }, self.config.duration);


            $(self.element).bind('countdown.stop', function(e) {
                self._stop(intervalId);
            });

            $(self.element).bind('countdown.end', function(e) {
                self._end(intervalId);
            });
        },
        formatter : function(time){

            var t = this.timer(time);
            var timeStr = '';

            if (t.days > 0) {
                timeStr += this.zeroFill(t.days) + '天 ';
            }

            if( this.config.duration == 10 || this.config.duration == 100 ) {
                return timeStr +
                    this.zeroFill(t.hours) +
                    '时 ' + this.zeroFill(t.minutes) +
                    '分 ' + this.zeroFill(t.seconds) +
                    '.'   + t.milseconds + '秒';

            }else if (this.config.duration == 1000){
                return timeStr + this.zeroFill(t.hours) +
                    '时 ' + this.zeroFill(t.minutes) +
                    '分 ' + this.zeroFill(t.seconds) + '秒';
            }
        },

        timer : function(time){

            var days = time / 1000 / 60 / 60 / 24;
            var daysRound = Math.floor(days);
            var hours = time / 1000 / 60 / 60 - (24 * daysRound);
            var hoursRound = Math.floor(hours);
            var minutes = time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
            var minutesRound = Math.floor(minutes);
            var seconds = time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);

            var tmpSecondsRound = seconds.toFixed(this.config.fixed).split('.');
            var secondsRound = tmpSecondsRound[0];
            var millisecondsRound = tmpSecondsRound[1];

            return {
                days : daysRound,
                hours : hoursRound,
                minutes : minutesRound,
                seconds : secondsRound,
                milseconds : millisecondsRound
            }
        },

        zeroFill : function(number){
            return parseInt(number) <= 9 ? '0' + number : number;
        },
        _stop : function(intervalId){
            window.clearInterval(intervalId);
        },
        _end : function(intervalId){
            this._stop(intervalId);

            $(this.element).addClass(this.config.endClass);
            this.element.innerHTML = this.config.msg;
            $(this.element).css('background','');
        }
    }

    memeCountdown.defaults = memeCountdown.prototype.defaults;


    $.fn[pluginName] = function( options ){
        var config = options;
        return this.each(function(){
            var options = $.extend({}, config, $(this).data());
            new memeCountdown(this, options).init();
        });
    }

})(jQuery, window, document);