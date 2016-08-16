import React from 'react';
import {Line } from 'react-chartjs';
import moment from 'moment';

function chartData(labels,data) {
  return {
    labels: labels,
    datasets: [
      {
        label: 'Installs',
        fillColor: 'rgba(0,220,255,0.3)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: data,
      },
      {
        strokeColor: 'rgba(0,0,0,0)',
        pointColor: 'rgba(0,0,0,0)',
        pointStrokeColor: 'rgba(0,0,0,0)',
        label:'',
        data:[0]
      },
      {
        label:'',
        data:[10000]
      }
    ]
  }
}

const options = {
  responsive:true,
  maintainAspectRatio:false,
  scaleShowGridLines: true,
  scaleGridLineColor: 'rgba(0,0,0,.05)',
  scaleGridLineWidth: 1,
  scaleFontSize:9,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 2,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 10,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
}

const styles = {
  graphContainer: {
    padding: '0'
  }
}

class LineChart extends React.Component {

  constructor(props) {
    super(props);
    const life = props.total;
    let insts = props.installations;
    let labels = [];
    let data = [];
    let height = 150;
    if(life > 100000) height = 275;
    else if (life > 50000) height = 250;
    else if (life > 25000) height = 225;
    else if (life > 10000) height = 200;
    else if (life > 5000) height = 175;
    if(insts){
      insts.sort(function(a,b){
        a = a.timestamp;
        b = b.timestamp;
        return a < b ? -1 : (a > b ? 1 : 0);
      });
      insts = insts.slice(insts.length - 12, insts.length);

      insts.map((inst,i)=>{
        labels.push(moment(inst.timestamp).format('MMM'));
        data.push(inst.total);
      });
    }

    this.state = {
      data: chartData(labels,data),
      height:height
    }
  }

  render() {
    return (
      <div style={styles.graphContainer}>
        <Line data={this.state.data}
          options={options}
          height={this.state.height}/>
      </div>
    )
  }
}

export default LineChart;
