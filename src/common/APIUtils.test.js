import * as api from "./APIUtils"


describe('#getRepositoriesByLanguage()', () => {
  it('should load top repostries', () => {
    return api.getRepositoriesByLanguage('javascript')
      .then(response => {
        expect(response.status).toEqual(200);
      })
  })
})

const userData = {
  name: "mudasser",
  address: "stockholm"
};

describe('#createUser()', () => {
  it('should post user data', () => {
    return api.createUser(userData)
      .then(response => {
        expect(response.status).toEqual(200);
      })
  })
})