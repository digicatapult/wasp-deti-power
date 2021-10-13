const { describe, before, it } = require('mocha')
const { setupServer } = require('./helpers/server')
const setupKafka = require('./helpers/kafka')
const { assertReadings } = require('./helpers/readings')
const { WASP_SENSOR_TYPE } = require('../../app/env')

const {
  READING_PAYLOAD_1,
  NO_METRICS_PAYLOAD,
  TIMER_PAYLOAD,
  NO_ASSET_NAME_PAYLOAD,
  METRIC_WITHOUT_TIMESTAMP_PAYLOAD,
} = require('./data/payloads')

describe('message Processing', function () {
  const context = {}
  setupServer(context)
  setupKafka(context)

  const singlePayloadTest = ({ context, description, payload, expectation }) => {
    describe(description, function () {
      before(async function () {
        context.result = await context.kafka.publishAndWaitForResults(
          `payloads.${WASP_SENSOR_TYPE}`,
          payload.message,
          1
        )
      })

      it(expectation, function () {
        const readings = context.result.get('readings')
        assertReadings(readings, payload.expectedReadings)
      })
    })
  }

  describe('happy path', function () {
    singlePayloadTest({
      context,
      description: 'single reading',
      payload: READING_PAYLOAD_1,
      expectation: 'should forward the correct reading',
    })

    singlePayloadTest({
      context,
      description: 'no corresponding timestamp for metric',
      payload: METRIC_WITHOUT_TIMESTAMP_PAYLOAD,
      expectation: 'should still store other readings in payload',
    })
  })

  describe('invalid payloads', function () {
    singlePayloadTest({
      context,
      description: 'no metrics',
      payload: NO_METRICS_PAYLOAD,
      expectation: 'should not forward',
    })

    singlePayloadTest({
      context,
      description: 'TIMER payload',
      payload: TIMER_PAYLOAD,
      expectation: 'should not forward',
    })

    singlePayloadTest({
      context,
      description: 'no assetName',
      payload: NO_ASSET_NAME_PAYLOAD,
      expectation: 'should not forward',
    })
  })
})
