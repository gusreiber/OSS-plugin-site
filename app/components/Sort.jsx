import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { RadioGroup, Radio } from 'react-radio-group';
import { setSort } from '../actions';

class Sort extends React.PureComponent {

  static propTypes = {
    setSort: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired
  };

  render() {
    const { setSort, sort } = this.props;
    return (
      <fieldset className="sortOptions">
        <legend>Sort {sort}</legend>
        <RadioGroup name="sort" selectedValue={sort} onChange={setSort}>
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

const mapStateToProps = (state) => {
  const { ui } = state;
  const { sort } = ui;
  return {
    sort
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSort: (sort) => {
      dispatch(setSort(sort));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
