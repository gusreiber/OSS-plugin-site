import React, { PropTypes } from 'react';
import { RadioGroup, Radio } from 'react-radio-group';

export default class Sort extends React.PureComponent {

  static propTypes = {
    selectSort: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired
  };

  render() {
    const { selectSort, sort } = this.props;
    return (
      <fieldset className="sortOptions">
        <legend>Sort {sort}</legend>
        <RadioGroup name="sort" selectedValue={sort} onChange={selectSort}>
          <label><Radio value="relevance" /> Relevance</label>
          <label><Radio value="installed" /> Most installed</label>
          <label><Radio value="trend" /> Recently installed</label>
          <label><Radio value="title" /> Title</label>
          <label><Radio value="updated" /> Release date</label>
        </RadioGroup>
      </fieldset>
    );
  }

}
