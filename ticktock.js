(function($) {
  // 2009-2011 Zachary Johnson www.zachstronaut.com
  function getTransformProperty(element) {

    var properties = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'];
    var p;
    while (p = properties.shift()) {
      if (typeof element.style[p] != 'undefined') {
        return p;
      }
    }

    return 'transform';
  }

  var _propsObj = null;

  var proxied = $.fn.css;
  $.fn.css = function(arg, val) {

    if (_propsObj === null) {
      if (typeof $.cssProps != 'undefined') {
        _propsObj = $.cssProps;
      } else if (typeof $.props != 'undefined') {
        _propsObj = $.props;
      } else {
        _propsObj = {}
      }
    }

    if (
      typeof _propsObj['transform'] == 'undefined' &&
      (
        arg == 'transform' ||
        (
          typeof arg == 'object' && typeof arg['transform'] != 'undefined'
        )
      )
    ) {
      _propsObj['transform'] = getTransformProperty(this.get(0));
    }

    if (_propsObj['transform'] != 'transform') {
      if (arg == 'transform') {
        arg = _propsObj['transform'];

        if (typeof val == 'undefined' && jQuery.style) {
          return jQuery.style(this.get(0), arg);
        }
      } else if (
        typeof arg == 'object' && typeof arg['transform'] != 'undefined'
      ) {
        arg[_propsObj['transform']] = arg['transform'];
        delete arg['transform'];
      }
    }

    return proxied.apply(this, arguments);
  };
})(jQuery);
(function($) {
  // https://github.com/zachstronaut/jquery-animate-css-rotate-scale  
  function initData($el) {
    var _ARS_data = $el.data('_ARS_data');
    if (!_ARS_data) {
      _ARS_data = {
        rotateUnits: 'deg',
        scale: 1,
        rotate: 0
      };

      $el.data('_ARS_data', _ARS_data);
    }

    return _ARS_data;
  }

  function setTransform($el, data) {
    $el.css('transform', 'rotate(' + data.rotate + data.rotateUnits + ') scale(' + data.scale + ',' + data.scale + ')');
  }

  $.fn.rotate = function(val) {
    var $self = $(this),
      m, data = initData($self);

    if (typeof val == 'undefined') {
      return data.rotate + data.rotateUnits;
    }

    m = val.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);
    if (m) {
      if (m[3]) {
        data.rotateUnits = m[3];
      }

      data.rotate = m[1];

      setTransform($self, data);
    }

    return this;
  };

  $.fn.scale = function(val) {
    var $self = $(this),
      data = initData($self);

    if (typeof val == 'undefined') {
      return data.scale;
    }

    data.scale = val;

    setTransform($self, data);

    return this;
  };

  var curProxied = $.fx.prototype.cur;
  $.fx.prototype.cur = function() {
    if (this.prop == 'rotate') {
      return parseFloat($(this.elem).rotate());

    } else if (this.prop == 'scale') {
      return parseFloat($(this.elem).scale());
    }

    return curProxied.apply(this, arguments);
  };

  $.fx.step.rotate = function(fx) {
    var data = initData($(fx.elem));
    $(fx.elem).rotate(fx.now + data.rotateUnits);
  };

  $.fx.step.scale = function(fx) {
    $(fx.elem).scale(fx.now);
  };

  var animateProxied = $.fn.animate;
  $.fn.animate = function(prop) {
    if (typeof prop['rotate'] != 'undefined') {
      var $self, data, m = prop['rotate'].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
      if (m && m[5]) {
        $self = $(this);
        data = initData($self);
        data.rotateUnits = m[5];
      }

      prop['rotate'] = m[1];
    }

    return animateProxied.apply(this, arguments);
  };
})(jQuery);

function ticktock(theSVGContainer, theComponents, theOptions) {
  "use strict";
  var $theSVGContainer = theSVGContainer,
    $theSecondsHand = $theSVGContainer.find(theComponents.theSecondsHand) || null,
    $theMinuteHand = $theSVGContainer.find(theComponents.theMinuteHand) || null,
    $theHourHand = $theSVGContainer.find(theComponents.theHourHand) || null,
    $theCrown = $theSVGContainer.find(theComponents.theCrown) || null,
    $theResetButton = $theSVGContainer.find(theComponents.theResetButton) || null;
  
  var theOptions = theOptions || {
      singleHand: null,
      singleHandTarget: null,
      gmtOffset: null,
      startSecondsAtZero: null,
      sweep: null,
      crown: null
    },
    singleHand = theOptions.singleHand || false,
    theGMTOffset = theOptions.gmtOffset || null,
    startSecondsAtZero = theOptions.startSecondsAtZero || false,
    sweepObj = theOptions.sweep || {
      all: null,
      seconds: null,
      minutes: null,
      hours: null,
      duration: null,
      onSet: null
    },
    sweep = sweepObj.all === false ? sweepObj.all : true,
    sweepOnSet = sweepObj.onSet === false ? sweepObj.onSet : sweep,
    sweepSeconds = sweepObj.seconds || sweep,
    sweepMinutes = sweepObj.minutes || sweep,
    sweepHours = sweepObj.hours || sweep,
    sweepDuration = sweepObj.duration || 500,
    theCrownObj = theOptions.crown || {
      fillTarget: null,
      fillClasses: null,
      speed: null,
      activeClass: null
    },
    $theCrownFill = theCrownObj.fillTarget || null,
    theCrownFillClasses = theCrownObj.fillClasses || [],
    theCrownFillClassesLength = theCrownFillClasses.length || null,
    theCrownRotateSpeed = theCrownObj.speed || 20,
    theCrownActiveClass = theCrownObj.activeClass || "active";

  var theSecondsInterval, theMinuteInterval,
    theSecondsRotateValue = 6,
    theMinuteRotateValue = singleHand ? 0.5 : 6,
    theHourRotateValueGlobal = 30,
    theHourRotateValue,
    isCrownActive = $theCrown ? false : null,
    isManualTime = false,
    theCrownCounter = 0,
    theCurrentCrownState,
    initialTimeSet = false;

  var init = function() {
    TIME.setCurrentTime();
    
    if ($theCrown) {
      CROWN.bind();
    }
    if (startSecondsAtZero) {
      INTERVAL.SET.minute();
    }
    if ($theSecondsHand && startSecondsAtZero) {
      INTERVAL.SET.seconds();
    }
  };

  var INTERVAL = {
      SET: {
        seconds: function() {
          if (!isManualTime) {
            HANDLOGIC.secondsHand();
          }
          clearInterval(theSecondsInterval);
          theSecondsInterval = setInterval(function() {
            HANDLOGIC.secondsHand();
          }, 1000);
        },

        minute: function() {
          if (!isManualTime) {
            TIME.setCurrentTime();
          }
          clearInterval(theMinuteInterval);
          theMinuteInterval = setInterval(function() {
            TIME.setCurrentTime();
          }, 60000);
        }
      },

      clear: function() {
        clearInterval(theSecondsInterval);
        clearInterval(theMinuteInterval);
      }
    },

    ROTATE = {
      hand: function($theHand, theRotateValue, doSweep, theSweepDuration) {
        var theSweepDuration = theSweepDuration || sweepDuration;

        if (doSweep) {
          if (!initialTimeSet) {
            $theHand.animate({
              rotate: theRotateValue
            }, theSweepDuration, "linear", function() {
              if (!startSecondsAtZero) {
                INTERVAL.SET.seconds();
              }
            });
            initialTimeSet = true;
          } else {
            $theHand.stop().animate({
              rotate: theRotateValue
            }, theSweepDuration, "linear");
          }
        } else {
          if (!initialTimeSet) {
            $theHand.rotate(theRotateValue);
            initialTimeSet = true;
            INTERVAL.SET.seconds();
          } else {
            $theHand.rotate(theRotateValue);
          }
        }
      }
    },

    HANDLOGIC = {
      secondsHand: function(theSeconds) {
        var theSeconds = theSeconds || null,
          theDefinedLogic = (((theSeconds * theSecondsRotateValue) * 100) / 100) + "deg",
          theIncrementLogic = "+=" + theSecondsRotateValue + "deg";

        if (!initialTimeSet) {
          if (!startSecondsAtZero) {
            if (sweepOnSet) {
              ROTATE.hand($theSecondsHand, theDefinedLogic, true);
            } else {
              ROTATE.hand($theSecondsHand, theDefinedLogic);
            }
          }
        } else {
          if (sweepSeconds || sweep) {
            if (theSeconds) {
              ROTATE.hand($theSecondsHand, theDefinedLogic, true);
            } else {
              ROTATE.hand($theSecondsHand, theIncrementLogic, true, 1000);
            }

          } else {
            if (theSeconds) {
              ROTATE.hand($theSecondsHand, theDefinedLogic);
            } else {
              ROTATE.hand($theSecondsHand, theIncrementLogic, true, 1);
            }
          }
        }
      },

      minuteHand: function(theMinutes, theManualDirection) {
        var theMinutes = theMinutes || 0,
          theManualDirection = theManualDirection || null,
          theDefinedLogic = (((theMinutes * theMinuteRotateValue) * 100) / 100) + "deg",
          theIncrementLogic = "+=" + theMinuteRotateValue + "deg";

        if (theManualDirection) {
          var theManualAmount = 1,
            theManualOperator = theManualDirection == "backward" ? '-' : '+',
            theManualLogic;
          theManualLogic = theManualOperator + '=' + theManualAmount;

          ROTATE.hand($theMinuteHand, theManualLogic, true, 1);
        } else {
          if (!initialTimeSet) {
            if (sweepOnSet) {
              ROTATE.hand($theMinuteHand, theDefinedLogic, true);
            } else {
              ROTATE.hand($theMinuteHand, theDefinedLogic);
            }
          } else {
            if (sweepMinutes || sweep) {
              if (isManualTime) {
                ROTATE.hand($theMinuteHand, theIncrementLogic, true);
              } else {
                ROTATE.hand($theMinuteHand, theDefinedLogic, true);
              }
            } else {
              if (isManualTime) {
                ROTATE.hand($theMinuteHand, theIncrementLogic, true, 1);
              } else {
                ROTATE.hand($theMinuteHand, theDefinedLogic);
              }
            }
          }
        }
      },

      hourHand: function(theHours, theMinutes, theManualDirection) {
        theHourRotateValue = isManualTime ? 0.5 : theHourRotateValueGlobal;

        var theHours = theHours || 0,
          theMinutes = theMinutes || 0,
          theManualDirection = theManualDirection || null,
          theDefinedLogic = (theHours * theHourRotateValue + Math.round((theMinutes * 0.5) * 100) / 100) + "deg",
          theIncrementLogic = "+=" + theHourRotateValue + "deg";

        if (theManualDirection) {
          var theManualAmount = 0.084,
            theManualOperator = theManualDirection == "backward" ? '-' : '+',
            theManualLogic;
          theManualLogic = theManualOperator + '=' + theManualAmount;

          ROTATE.hand($theHourHand, theManualLogic, true, 1);
        } else {
          if (!initialTimeSet) {
            if (sweepOnSet) {
              ROTATE.hand($theHourHand, theDefinedLogic, true);
            } else {
              ROTATE.hand($theHourHand, theDefinedLogic);
            }
          } else {
            if (sweepHours || sweep) {
              if (isManualTime) {
                ROTATE.hand($theHourHand, theIncrementLogic, true);
              } else {
                ROTATE.hand($theHourHand, theDefinedLogic, true);
              }
            } else {
              if (isManualTime) {
                ROTATE.hand($theHourHand, theIncrementLogic, true, 1);
              } else {
                ROTATE.hand($theHourHand, theDefinedLogic);
              }
            }
          }
        }
      }
    },

    TIME = {
      getCurrentTime: function() {
        var d = new Date(),
          theHours = d.getHours(),
          theMinutes = d.getMinutes(),
          theSeconds = d.getSeconds(),
          theTimeValues = {};

        if (theGMTOffset) {
          var gmtHours = (theHours - (d.getTimezoneOffset() / 60));
          theHours = (gmtHours + theGMTOffset);
        }

        theHours = ((theHours + 11) % 12 + 1);

        theTimeValues = {
          seconds: theSeconds,
          minutes: theMinutes,
          hours: theHours
        };

        return theTimeValues;
      },

      setCurrentTime: function() {
        var theTimeValues = this.getCurrentTime();

        if (!startSecondsAtZero && !initialTimeSet) {
          clearInterval(theMinuteInterval);
          var theSecondsDifferential = (60 - theTimeValues.seconds),
            sweepDifferentialBuffer = sweepOnSet ? sweepDuration : 0;

          setTimeout(function() {
            TIME.setCurrentTime();
            INTERVAL.SET.minute();
          }, (theSecondsDifferential * 1000) + sweepDifferentialBuffer);
        }

        if (singleHand) {
          if ($theSecondsHand && !startSecondsAtZero && $theSecondsHand && !singleHand && !initialTimeSet) {
            HANDLOGIC.secondsHand(theTimeValues.seconds);
          } else {
            HANDLOGIC.secondsHand();
          }
          HANDLOGIC.hourHand(theTimeValues.hours, theTimeValues.minutes);
        } else {
          if (!startSecondsAtZero && $theSecondsHand && !singleHand && !initialTimeSet) {
            HANDLOGIC.secondsHand(theTimeValues.seconds);
          } else {
            HANDLOGIC.secondsHand();
          }
          if ($theMinuteHand) {
            HANDLOGIC.minuteHand(theTimeValues.minutes);
          }
          if ($theHourHand) {
            HANDLOGIC.hourHand(theTimeValues.hours, theTimeValues.minutes);
          }
        }

        if (!initialTimeSet) {
          initialTimeSet = true;
        }
      },

      MANUAL: {
        bindEventListener: function() {
          $(window).on('DOMMouseScroll mousewheel', function(e) {
            theCrownCounter++;
            TIME.MANUAL.update(e);

            if (theCrownCounter == theCrownRotateSpeed) {
              CROWN.rotate();
              theCrownCounter = 0;
            }
            return false;
          });
        },

        update: function(e) {
          if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
            HANDLOGIC.minuteHand(0, "forward");
            HANDLOGIC.hourHand(0, 0, "forward");
          } else {
            HANDLOGIC.minuteHand(0, "backward");
            HANDLOGIC.hourHand(0, 0, "backward");
          }
        },

        unbindEventListener: function() {
          $(window).unbind("DOMMouseScroll mousewheel");
        }
      }
    },
    CROWN = {
      bind: function() {
        $theCrown.on("click", function() {
          CROWN.toggleCrown();
        });
      },

      toggleCrown: function() {
        if (!isCrownActive) {
          INTERVAL.clear();
          $theCrown.attr("class", theCrownActiveClass);
          isCrownActive = true;
          isManualTime = true;

          if ($theSecondsHand.is(":animated")) {
            $theSecondsHand.stop();
          } else {
            INTERVAL.clear();
            clearInterval(theSecondsInterval);
          }
        } else {

          if ($theResetButton && $theResetButton.is(":hidden")) {
            RESETBUTTON.toggle();
            RESETBUTTON.bind();
          }

          $theCrown.attr("class", "");
          $theCrownFill.each(function() {
            theCurrentCrownState = $(this).attr("class");
            for (var i = 0; i < theCrownFillClassesLength; i++) {
              $(this).attr("class", theCurrentCrownState.replace(" " + theCrownFillClasses[i], ""));
            }
          });
          isCrownActive = false;
          INTERVAL.SET.seconds();
          INTERVAL.SET.minute();
        }
        this.toggleOtherClasses();
      },

      toggleOtherClasses: function() {
        var currentState = $theSVGContainer.attr("class");
        if (isCrownActive) {
          TIME.MANUAL.bindEventListener();
        } else {
          TIME.MANUAL.unbindEventListener();
        }
      },

      rotate: function() {
        theCrownFillClasses.push(theCrownFillClasses.shift());
        $theCrownFill.each(function(x) {
          theCurrentCrownState = $(this).attr("class");
          for (var i = 0; i < theCrownFillClassesLength; i++) {
            $(this).attr("class", theCurrentCrownState.replace(" " + theCrownFillClasses[i], ""));
          }
          theCurrentCrownState = $(this).attr("class");
          $(this).attr("class", theCurrentCrownState + " " + theCrownFillClasses[x]);
        });
      }
    },

    RESETBUTTON = {
      bind: function() {
        $theResetButton.off("click").on("click", function() {
          RESETBUTTON.unbind();
          isManualTime = false;
          TIME.setCurrentTime();
          RESETBUTTON.toggle();
        });
      },
      toggle: function() {
        $theResetButton.toggle();
      },
      unbind: function() {
        $theResetButton.off("click");
      }
    };

  return {
    init: init
  }
}