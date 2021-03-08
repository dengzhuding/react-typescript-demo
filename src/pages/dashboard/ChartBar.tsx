
import React, {Component, createRef, RefObject} from 'react'
import echarts from '@utils/myEcharts'

interface Props {
  option: object
}
interface StateObj {
  styleObj: {
    width: string,
    height: string
  }
  [propName: string]: any
}
export default class ChartBar extends Component<Props, StateObj> {
  divRef: RefObject<HTMLDivElement>;
  constructor (props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      styleObj: {
        width: '200px',
        height: '200px'
      }
    }
    this.divRef = createRef()
  }
  render() {
    return (<div className="chart-bar" style={this.state.styleObj} ref={this.divRef}></div>)
  }
  componentDidMount() {
    const options = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }]
    };
    const myChart = echarts.init(this.divRef.current as HTMLElement);
    myChart.setOption(options)
  }
}