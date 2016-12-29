import React from 'react';
const { object } = React.PropTypes;
import HexPattern from './HexPattern';
import HexPolygon from './HexPolygon';
import HexPointers from './HexPointers';
import HexText from './HexText';
import HexUtils from './HexUtils';

class HexShape extends React.Component {

  getPoints(hex) {
    let points = this.props.layout.getPolygonPoints(hex)

    return points.map(point => {
      return point.x + ',' + point.y;
    }).join(' ');
  }

  translate() {
    let hex = this.props.hex;
    let pixel = HexUtils.hexToPixel(hex, this.props.layout);
    return `translate(${pixel.x}, ${pixel.y})`;
  }

  getActions() {
    const DEFAULT_ACTIONS = {
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onDragStart: () => {},
      onDragEnd: () => {},
      onDragOver: () => {},
      onDrop: () => {},
      onClick: () => {}
    };
    return Object.assign({}, DEFAULT_ACTIONS, this.props.actions);
  }

  render() {
    const { hex, layout } = this.props;
    const actions = this.getActions();
    const hexId = layout.name + HexUtils.getID(hex);
    const text = (hex.props.text) ? hex.props.text : HexUtils.getID(hex);
    const points = this.getPoints(hex);
    return (
      <g className={'shape-group ' + (hex.props.className || '')} transform={this.translate()} draggable="true"
        onMouseEnter={e => actions.onMouseEnter(this.props.hex, e)}
        onMouseLeave={e => actions.onMouseLeave(this.props.hex, e)}
        onDragStart={e => actions.onDragStart(this.props.hex, e)}
        onDragEnd={e => actions.onDragEnd(this.props.hex, e)}
        onDragOver={e => actions.onDragOver(this.props.hex, e)}
        onDrop={e => actions.onDrop(this.props.hex, e)}
        onClick={e => actions.onClick(this.props.hex, e)}
        >
        <HexPattern id={hexId} hex={hex} layout={layout} />
        <HexPolygon id={hexId} hex={hex} points={points} />
        <HexPointers hex={hex} points={points} />
        <HexText text={text} />
      </g>
    );
  }
}
HexShape.propTypes = {
  hex: object.isRequired,
  layout: object.isRequired,
  actions: object.isRequired
};

export default HexShape;
