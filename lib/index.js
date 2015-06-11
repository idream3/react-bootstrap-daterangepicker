'use strict';
/**
 * react-bootstrap-daterangepicker.js
 *
 * A slightly modified version of bootstrap-daterangepicker.js for use in react and npm.
 * Original copyright in: ./lib/daterangepicker.js
 */
var React = require('react');
var $ = require('jquery');
var DateRangePicker = require('./daterangepicker.js');


/* this is our export React class */
module.exports = React.createClass({
  $picker: null,
  options: [
    'drops', 'startDate', 'endDate', 'minDate', 'maxDate', 'dateLimit', 'timeZone', 'showDropdowns', 'showWeekNumbers',
    'timePicker', 'timePickerIncrement', 'timePicker12Hour', 'timePickerSeconds', 'ranges', 'opens', 'buttonClasses',
    'applyClass', 'cancelClass', 'format', 'separator', 'locale', 'singleDatePicker', 'parentEl'
  ],
  makeEventHandler(eventType) {
    return function (event, picker) {
      if (typeof this.props.onEvent === 'function') {
        this.props.onEvent(event, picker);
      }
      if (typeof this.props[eventType] === 'function') {
        this.props[eventType](event, picker);
      }
    }.bind(this);
  },
  getOptionsFromProps() {
    var options, props = this.props;

    this.options.forEach(function (option) {
      if (props.hasOwnProperty(option)) {
        options = options || {};
        options[option] = props[option];
      }
    });
    return options;
  },
  setOptionsFromProps() {
    var currentOptions = this.getOptionsFromProps();
    if (this.$picker) {
      if (currentOptions) {
        this.$picker.data('daterangepicker').setOptions(currentOptions);
      }
    }
  },
  componentDidMount() {
    var $this = this;
    $this.$picker = $(this.refs.picker.getDOMNode());
    // initialize
    $this.$picker.daterangepicker(this.getOptionsFromProps());
    // attach event listeners
    ['Show', 'Hide', 'ShowCalendar', 'HideCalendar', 'Apply', 'Cancel'].forEach(function (event) {
      var lcase = event.toLowerCase();
      $this.$picker.on(lcase + '.daterangepicker', $this.makeEventHandler('on' + event));
    });
  },
  componentWillUnmount() {
    this.$picker.data('daterangepicker').remove();
  },
  render() {
    this.setOptionsFromProps();
    return React.createElement(
      'span',
      React.__spread({ref: 'picker'},  this.props),
      this.props.children
    );
  }
});
