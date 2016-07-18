import React, { PropTypes } from 'react';
import LabelWidgetItem from './LabelWidgetItem';
import PureComponent from 'react-pure-render/component';

export default class LabelWidget extends PureComponent {
  handleClick(data) {
    debugger;
    this.props.location.query.labelFilter = data;
    this.props.router.replace(this.props.location);
  }

  render() {
    const { labels, location, router} = this.props;
    const { labelFilter = ''} = location.query;
    const sortedLabels = labels.sort(
      (label, nextLabel) => label.key.localeCompare(nextLabel.key));

    if (!sortedLabels.valueSeq) return null;
    return (
      <li className="nav-item btn-group">
        <button
          className={`nav-link dropdown-toggle ${ location.query.labelFilter ? 'btn-primary':''}`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          Labels <b>{labelFilter}</b> {labelFilter && <span
          onClick={(e) => {
            e.preventDefault();
            delete location.query.labelFilter;
            router.replace(location);
          }}
          className="glyphicon glyphicon-remove">remove Filter</span>}
        </button>

        <div className="filter-keys dropdown-menu">
          {
            sortedLabels.valueSeq().map(
              (item, index) => {
                return (<LabelWidgetItem key={index} index={index} item={item}
                                         onClick={this.handleClick.bind(this, item.key)}/>);
              })
          }
        </div>
      </li>
    );
  }
}

LabelWidget.propTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  labels: PropTypes.any.isRequired,
};
