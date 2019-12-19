// @format
import React from "react";
import Dygraph from "dygraphs";
import Flex from "react-styled-flexbox";

import { StyledSelect } from "./UIComponents";

let graph;

const genSquareWave = factor => {
  factor *= 2;
  return x => {
    let y = 0;
    for (let i = 1; i <= factor; i++) {
      if (i % 2 === 1) {
        y += Math.sin(x * i) / (i * Math.PI);
      }
    }
    return y;
  };
};

const genSawWave = factor => {
  factor *= 2;
  return x => {
    let y = 0;
    for (let i = 1; i <= factor; ++i) {
      y += Math.pow(-1, i) * (Math.sin(x * i) / i);
    }
    return 1 / 2 - (1 / Math.PI) * y;
  };
};

const genDigitalSawWave = x =>
  2 * (x / Math.PI - Math.floor(0.5 + x / Math.PI));

const funs = {
  SINE: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: Math.sin
  },
  SQUARE_D: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: x => (Math.sin(x) >= 0 ? 1 : -1)
  },
  SQUARE_3: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSquareWave(3)
  },
  SQUARE_4: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSquareWave(4)
  },
  SQUARE_6: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSquareWave(6)
  },
  SQUARE_8: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSquareWave(8)
  },
  SQUARE_16: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSquareWave(16)
  },
  SQUARE_32: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSquareWave(32)
  },
  SQUARE_64: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSquareWave(64)
  },
  SAW_D: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genDigitalSawWave
  },
  SAW_3: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSawWave(3)
  },
  SAW_4: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSawWave(4)
  },
  SAW_6: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSawWave(6)
  },
  SAW_8: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSawWave(8)
  },
  SAW_16: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSawWave(16)
  },
  SAW_32: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSawWave(32)
  },
  SAW_64: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: genSawWave(64)
  },
  TRIANGLE: {
    resolution: 0.1,
    limit: 2 * Math.PI,
    fun: x => Math.abs(genDigitalSawWave(x))
  }
};

export default class WaveGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "SINE"
    };

    this.handleChange = this.handleChange.bind(this);
    this.draw = this.draw.bind(this);
  }

  genWave() {
    const { selected } = this.state;
    const { fun, resolution, limit } = funs[selected];
    const data = [];

    for (let x = 0; x < limit; x += resolution) {
      data.push([x, fun(x)]);
    }
    return data;
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state;
    const { color } = this.props;
    if (prevState.selected !== selected || prevProps.color !== color) {
      this.draw();
    }
  }

  draw() {
    if (graph) graph.destroy();

    const { color } = this.props;
    const wave = this.genWave();
    graph = new Dygraph(this.refs.graph, wave, {
      strokeWidth: 2,
      axisLineWidth: 0,
      axisLabelFormatter: () => "",
      drawAxesAtZero: true,
      axisLabelWidth: 0,
      yLabelWidth: 0,
      height: 40,
      color
    });
  }

  handleChange({ target }) {
    this.setState({ selected: target.value });
  }

  render() {
    const { color } = this.props;
    return (
      <Flex style={{ width: "auto" }} justifySpaceAround itemsCenter>
        <StyledSelect color={color} onChange={this.handleChange}>
          {Object.keys(funs).map(k => (
            <option key={k}>{k}</option>
          ))}
        </StyledSelect>
        <div style={{ width: "50px", height: "20px", overflow: "hidden" }}>
          <div
            ref="graph"
            style={{ pointerEvents: "none", width: "50px", height: "40px" }}
          />
        </div>
      </Flex>
    );
  }
}
