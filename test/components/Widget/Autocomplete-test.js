import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Autocomplete from '../../../app/components/Widget/Autocomplete';

describe('<Autocomplete />', () => {

  it("should correctly display span", () => {
    const props = {
      name: "autocomplete_name",
      placeholder: "autocomplete_placeholder",
      label: "autocomplete_label"
    };
    const wrapper = shallow(<Autocomplete {...props} />);
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('span').text()).to.equal(props.label);
  });

  it("should correctly display input", () => {
    const props = {
      name: "autocomplete_name",
      placeholder: "autocomplete_placeholder",
      label: "autocomplete_label"
    };
    const wrapper = shallow(<Autocomplete {...props} />);
    expect(wrapper.find(`input[type="text"][name="${props.name}"][placeholder="${props.placeholder}"]`)).to.have.length(1);
  });

});
