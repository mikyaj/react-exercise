import { createShallow } from '@material-ui/core/test-utils'
import Enzyme from 'enzyme'
import Registraition from './Registration'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import * as api from "../common/APIUtils"

Enzyme.configure({ adapter: new Adapter() })

describe('<Registration />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('#handleChange() should change state, provided with value and state variable identifier', () => {
    const registrationWrapper = shallow(<Registraition></Registraition>);
    const instance = registrationWrapper.instance();
    instance.handleChange('jhon', 'name');
    instance.handleChange('Armegatan 32c', 'address');
    instance.handleChange('2019-01-10T21:11:00.000Z', 'dateOfBirth');
    instance.handleChange('2019-02-03T22:01:41.767Z', 'hourOfDelivery');
    expect(registrationWrapper.state().name).toEqual('jhon');
    expect(registrationWrapper.state().address).toEqual('Armegatan 32c');
    expect(registrationWrapper.state().dateOfBirth).toEqual('2019-01-10T21:11:00.000Z');
    expect(registrationWrapper.state().hourOfDelivery).toEqual('2019-02-03T22:01:41.767Z');
  });

  it('#isDisabled() should set form button disabled if next state is missing required fields and set error message for field which trigger change', () => {
    const registrationWrapper = shallow(<Registraition></Registraition>);
    const instance = registrationWrapper.instance();
    instance.isDisabled('name', { name: '', address: '', dateOfBirth: '', hourOfDelivery: ''});
    expect(registrationWrapper.state().nameError).toEqual(true);
    expect(registrationWrapper.state().registerBtnDisabled).toEqual(true);
    instance.isDisabled('name', { 
      name: 'jhon', 
      dateOfBirth: '2019-01-10T21:11:00.000Z', 
      hourOfDelivery: '2019-01-10T21:11:00.000Z'
    });
    expect(registrationWrapper.state().nameError).toEqual(false);
    expect(registrationWrapper.state().registerBtnDisabled).toEqual(false);
  });

  it('#register() should call api function to post data', () => {
    const postSpy = jest.spyOn(api, 'registerUser');
    const registrationWrapper = shallow(<Registraition></Registraition>);
    const instance = registrationWrapper.instance();
    instance.register();
    expect(postSpy).toBeCalled();
  });
});