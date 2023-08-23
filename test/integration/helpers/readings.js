import { expect } from 'chai'

export const assertReadings = (actualResult, expectedResult) => {
  actualResult.sort(sortReadings)
  expectedResult.sort(sortReadings)
  expect(actualResult).to.deep.equal(expectedResult)
}

const sortReadings = (a, b) => {
  if (a.timestamp < b.timestamp) {
    return -1
  } else {
    return 1
  }
}
