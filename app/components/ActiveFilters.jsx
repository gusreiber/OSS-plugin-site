import React, { PropTypes } from 'react';

export default class ActiveFilters extends React.PureComponent {

  static propTypes = {
    activeCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      labels: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired
    })).isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string
    })).isRequired,
    query: PropTypes.string.isRequired
  };

  render() {
    const { activeCategories, activeLabels, categories, labels, query } = this.props;
    const activeCategoryTitles = activeCategories.map((activeCategory) => {
      const category = categories.find((category) => category.id === activeCategory);
      const text = category !== undefined ? category.title : activeCategory;
      return <a className="nav-link">{text}</a>;
    });
    const activeLabelTitles = activeLabels.map((activeLabel) => {
      const label = labels.find((label) => label.id === activeLabel);
      const text = label !== undefined && label.title !== null ? label.title : activeLabel;
      return <a className="nav-link">{text}</a>;
    });
    return (
      <li className="nav-item active-filters">
        <div className="active-categories">
          {activeCategoryTitles}
        </div>
        <div className="active-labels">
          {activeLabelTitles}
        </div>
        <div className="active-string">
          {query !== '' && <a className="nav-link" title="clear search string">{query}</a>}
        </div>
      </li>
    );
  }

}
