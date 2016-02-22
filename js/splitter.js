/**
* Splitter Control
*/

// NOTE:  There are AMD Blocks available

/* start-amd-strip-block */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
/* end-amd-strip-block */

  //NOTE: Just this part will show up in SoHo Xi Builds.

  $.fn.splitter = function(options) {
    'use strict';

    // Settings and Options
    var pluginName = 'splitter',
        defaults = {
          axis: 'x'
        },
        settings = $.extend({}, defaults, options);

    // Plugin Constructor
    function Splitter(element) {
      this.settings = $.extend({}, settings);
      this.element = $(element);
      this.init();
    }

    // Plugin Methods
    Splitter.prototype = {
      init: function() {
        //Do other init (change/normalize settings, load externals, etc)
        return this
          .build()
          .handleEvents();
      },

      // Add markup to the control
      build: function() {
        var self = this;

        //Set the height
        this.element.drag({axis: this.settings.axis, containment: 'document'}).on('drag.splitter', function (e, args) {
          self.splitTo(args.left);
        });

        //move to left
        if (this.element.is('.splitter-right')) {
          this.orgLeft = this.element.parent().outerWidth();

          if (this.element.parent().is('.content')) {
            this.orgLeft = this.element.parent().parent().outerWidth();
          }

          this.orgLeft -= 20;

          this.element.css('left', this.orgLeft + 'px');
        }

        return this;
      },

      // Sets up event handlers for this control and its sub-elements
      handleEvents: function() {
        var self = this;

        this.element.on('updated.' + pluginName, function() {
          self.updated();
        });

        return this;
      },

      //Resize the panel to the Left
      resizeLeft: function (splitter, leftArg) {
        //Find the right parents and left and right side
        var rightSide = splitter.parent();

        if (rightSide.is('.content')) {
          rightSide = rightSide.parent();
        }

        var leftSide = rightSide.prev(),
          left = leftSide.parent().outerWidth() - leftArg;

        //Adjust Left and Right Side
        rightSide.css('width', (left + 'px'));
        leftSide.css('width', ('calc(100% - ' + left + 'px)'));

        //Reset the Width
        splitter.css('left', '');
      },

      //Resize the panel to the Right
      resizeRight: function (splitter, leftArg) {
        //Find the right parents and left and right side
        var leftSide = splitter.parent();

        if (leftSide.is('.content')) {
          leftSide = leftSide.parent();
        }

        var rightSide = leftSide.next(),
          w = leftArg + 20;

        //Adjust Left and Right Side
        leftSide.css('width', (w + 'px'));
        rightSide.css('width', ('calc(100% - ' + w + 'px)'));
      },

      splitTo: function (w) {
        var splitter = this.element;

        if (splitter.is('.splitter-right')) {
          this.resizeRight(splitter, w);
        } else {
          this.resizeLeft(splitter, w);
        }
      },

      //Handle Updating Settings
      updated: function() {
        return this
          .teardown()
          .init();
      },

      // Simple Teardown - remove events & rebuildable markup.
      teardown: function() {
        this.element.off('updated.' + pluginName);
        return this;
      },

      // Teardown - Remove added markup and events
      destroy: function() {
        this.teardown();
        $.removeData(this.element[0], pluginName);
      }
    };

    // Initialize the plugin (Once)
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (instance) {
        instance.settings = $.extend({}, instance.settings, options);
        instance.updated();
      } else {
        instance = $.data(this, pluginName, new Splitter(this, settings));
      }
    });
  };

/* start-amd-strip-block */
}));
/* end-amd-strip-block */