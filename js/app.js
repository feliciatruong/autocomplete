'use strict';

var cities = ['san', 'san jose', 'santiago', 'san francisco', 'santa rosa', 'san juan', 'sabadell',
'salamanca', 'salt lake city', 'salinas', 'salem', 'sausalito', 'taipei', 'tel aviv', 'tempe', 'termez',
 'temuco', 'tiajuna', 'tieling', 'thousand oaks', 'thunder bay', 'tokyo', 'tulsa'];

 /* Add cities to unordered list */
var FoundList = React.createClass({
  displayName: 'FoundList',
  render: function render() {
    var createItem = function createItem(item) {
      return React.createElement(
        'li',
        { key: item },
        item
      );
    };
    return React.createElement(
      'ul',
      null,
      this.props.items.map(createItem)
    );
  }
});

var AutocompleteApp = React.createClass({
  displayName: 'AutocompleteApp',
  getInitialState: function getInitialState() {
    return {
      items: [],
      text: '',
      results: "Enter at least 3 characters to begin searching"
    };
  },
  /* Capture key press from text input */
  onChange: function onChange(e) {
    var items = [];
    var text = e.target.value;
    var results;

    /* Remind user to enter at least 3 characters */
    if (text.length < 3) {
      results = "Enter at least 3 characters to begin searching";
    }
    /*  Returns matching city list */
    else {
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].search(text) == 0) {
          items.push([cities[i]]);
        }
      }
      results = items.length + " result(s)"
    }
    /* Update state */
    this.setState({ text: text, items: items, results: results });
  },
  /* search field selected automatically */
  componentDidMount: function componentDidMount() {
    this._input.focus();
  },
  render: function render() {
    var _this = this;
    return React.createElement(
      "div",
      { className: "search-page row" },

      React.createElement(
        "div",
        { className: "search-form form-group col-lg-offset-4 col-lg-4" },
        React.createElement(
          "h3",
          { className: "header" },
          "Autocomplete"
        ),
        React.createElement(
          "div",
          { className: "input-group" },
          React.createElement("input", { className: "form-control", placeholder: "Search cities...", onChange: this.onChange, value: this.state.text,
            ref: function ref(c) {
              return _this._input = c;
            } }),
          React.createElement(
            "span",
            { className: "input-group-btn" },
            React.createElement(
              "button",
              { className: "btn", type: "button" },
              React.createElement("span", { className: "glyphicon glyphicon-search" })
            )
          )
        ),
        React.createElement(
          "p",
          null,
          this.state.results
        ),
        React.createElement(FoundList, { items: this.state.items })
      )
    );
  }
});
ReactDOM.render(React.createElement(AutocompleteApp, null), document.getElementById('app-autocomplete'));
