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
      text: ''
    };
  },
  /* Capture key press from text input */
  onChange: function onChange(e) {
    var items = [];
    var text = e.target.value;

    /*  Returns matching city list */
    for (var i = 0; i < cities.length; i++) {
      if (cities[i].search(e.target.value) == 0 && text.length > 2) {
        items.push([cities[i]]);
      }
    }
    /* Update state */
    this.setState({ text: text, items: items });
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h3',
        null,
        'City Search'
      ),
      React.createElement('input', { placeholder: 'Search cities...',
        onChange: this.onChange,
        value: this.state.text }),
      React.createElement(
        'p',
        null,
        this.state.results
      ),
      React.createElement(FoundList, { items: this.state.items })
    );
  }
});
ReactDOM.render(React.createElement(AutocompleteApp, null), document.getElementById('app-autocomplete'));
