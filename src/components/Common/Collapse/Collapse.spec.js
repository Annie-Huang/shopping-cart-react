import React from 'react';
import { shallow } from 'enzyme';

import Collapse from './Collapse';

describe('<Collapse />', () => {
    it('renders expanded', () => {
        const expanded = true;
        const tree = shallow(<Collapse expanded={expanded}>Some content</Collapse>);
        expect(tree).toMatchSnapshot();
    });
    it('renders collapsed', () => {
        const expanded = false;
        const tree = shallow(<Collapse expanded={expanded}>some content</Collapse>);
        expect(tree).toMatchSnapshot();
    });
});
