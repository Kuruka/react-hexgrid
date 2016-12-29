# react-hexgrid

![Downloads](https://img.shields.io/npm/dm/react-hexgrid.svg)
![Downloads](https://img.shields.io/npm/dt/react-hexgrid.svg)
![npm version](https://img.shields.io/npm/v/react-hexgrid.svg)
![dependencies](https://img.shields.io/david/Hellenic/react-hexgrid.svg)
![dev dependencies](https://img.shields.io/david/dev/Hellenic/react-hexgrid.svg)
![License](https://img.shields.io/npm/l/react-hexgrid.svg)

React component to create interactive hexagons grids. It uses SVG so it works fast and can be styled easily, and it is flexible to customize.

With inspiration from
[http://www.redblobgames.com/grids/hexagons](http://www.redblobgames.com/grids/hexagons).

## Pre-requisites

You should be familiar with Node + NPM, React and ES6 to use this library.
Library also depends heavily on HTML5 features which all might not be supported by every browser yet.
For example [Drag & Drop](http://caniuse.com/#search=drag%20and) is still quite heavily under work.

## Getting Started

Install it via npm:

```shell
npm install --save react-hexgrid
```

## Example

```javascript
import { HexGrid } from 'react-hexgrid';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let boardConfig = {
      width: 800, height: 800,
      layout: { width: 10, height: 10, flat: true, spacing: 1.1 },
      origin: { x: 0, y: 0 },
      map: 'hexagon',
      mapProps: [ 2 ]
    }
    let grid = HexGrid.generate(boardConfig);
    this.state = { grid, config: boardConfig };
  }
  render() {
    let { grid, config } = this.state;

    return (
      <div className="App">
        <HexGrid width={config.width} height={config.height} hexagons={grid.hexagons} layout={grid.layout} />
      </div>
    );
  }
}
```
Will look something like this (custom CSS applied):
![HexGrid image](https://raw.githubusercontent.com/Hellenic/react-hexgrid/master/HexGrid.png "HexGrid")

## Configurations

```javascript
{
    width: 1000, // Width of the viewbox
    height: 800, // Height of the viewbox
    layout: { // Settings on how the tiles looks like
        width: 8, // Width of a single tile
        height: 8, // Height of a single tile
        flat: false, // Defines is the tile pointy one or a flat one
        spacing: 1.1, // Spacing between the tiles
        name: 'unique-name' // Used to further identify the grid, needed when using multiple instances
    },
    origin: { // Defines the offset for the grid. Depending on the grid type, you might need to adjust this
        x: 0,
        y: 0
    },
    map: 'hexagon', // Grid type (see GridGenerator.js)
                    // Possible values: hexagon, triangle, parallelogram, rectangle, orientedRectangle
    mapProps: [ 3 ] // Properties for the grid type (depends on the grid type)  (see GridGenerator.js)
                    // * 'hexagon': [ radius: Number ]
                    // * 'triangle': [ size: Number ]
                    // * 'parallelogram': [ q1: Number, q2: Number, r1: Number, r1: Number ]
                    // * 'rectangle': [ width: Number, height: Number ]
                    // * 'orientedRectangle': [ width: Number, height: Number ]
}
```

## API reference
```javascript
// Available classes
import { HexGrid, Layout, HexUtils, Hex } from 'react-hexgrid';

// Using HexGrid component
<HexGrid
  width={1000} // Width of the viewbox
  height={800}
  path={{ start: nex Hex(0,0,0), end: new Hex(3, -3, 0) }} // Path drawn from between the two points (WIP)
  actions={} // Action callbacks. See example for all available actions.
  hexagons={[]} // Hexagons, e.g. generated by HexGrid.generate or manually created list
  layout={layoutConfig} /> // Layout configuration, see configurations above. Affects how tiles get rendered.
```

* [HexGrid.js](https://github.com/Hellenic/react-hexgrid/tree/master/src/HexGrid.js), Main React component
  * HexGrid.generate(config)
    * Generates the hexagons. See configuration above.
* [Layout.js](https://github.com/Hellenic/react-hexgrid/tree/master/src/Layout.js), controls the look and feel
  * constructor(layout, origin)
    * layout : Object { width: Number, height: Number, flat: Boolean, spacing: Number })
    * origin : Object [optional] { x: Number, y: Number }
* [HexUtils.js](https://github.com/Hellenic/react-hexgrid/tree/master/src/HexUtils.js), Static methods for calculating distance, checking neighboring tiles, etc.
* [Hex.js](https://github.com/Hellenic/react-hexgrid/tree/master/src/Hex.js)
  * contructor(q, r, s, props = {})
    * q, r, s : Number, coordinates
    * props : Object [optional] { text: String, image: String }

## Examples

See examples folder.

### Basics

1. [basic-board](https://github.com/Hellenic/react-hexgrid/tree/master/examples/basic-board)- Just simple render of HexGrid
1. [grid-types](https://github.com/Hellenic/react-hexgrid/tree/master/examples/grid-types) - All the different grid types and their configurations
1. [tile-events](https://github.com/Hellenic/react-hexgrid/tree/master/examples/tile-events) - HexGrid with action functions passed down. Just logs to console when different events are triggered.
1. [custom-grid](https://github.com/Hellenic/react-hexgrid/tree/master/examples/custom-grid) - Custom generated Hexagon grid and tile content

## Advanced

1. [pathfinding](https://github.com/Hellenic/react-hexgrid/tree/master/examples/pathfinding) - HexGrid with pathfinding between tiles and highlighting certain hexagons

## Testing changes locally
You can test changes by importing the library directly from a folder:

1. Do changes to the library
2. On your test project: `npm install /path/to/your/react-hexgrid/ --save`

## License

MIT
