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
}

describe('#registerUser()', () => {
  it('should post user data', () => {
    return api.registerUser(userData)
      .then(response => {
        expect(response.status).toEqual(200);
      })
  })
})