import { buildService } from '@digicatapult/wasp-payload-processor'
import env from './env.js'

const { WASP_SENSOR_TYPE } = env

const payloadProcessor =
  ({ logger }) =>
  ({ thingId, payload }) => {
    const metrics = payload.metrics

    if (!metrics) {
      throw new Error(`Payload needs a metrics object`)
    }

    if (metrics.TIMER) {
      logger.info(`Ignoring TIMER payload`)
      return
    }

    const label = metrics.assetName

    if (!label) {
      throw new Error(`Payload needs an assetName`)
    }

    const messages = []
    const keys = Object.keys(metrics)
    const units = {
      active_power_total: 'kW',
      active_power_a: 'kW',
      active_power_b: 'kW',
      active_power_c: 'kW',
      acc_active_energy_delivered_wh: 'Wh',
      acc_active_energy_received_wh: 'Wh',
      active_energy_delivered: 'Wh',
      acc_reactive_energy_delivered_wh: 'VARh',
      acc_reactive_energy_received_wh: 'VARh',
      apparent_power_total: 'kVA',
      current_avg: 'A',
      reactive_power_total: 'kVAR',
      total_active_energy_delivered: 'kWh',
    }

    keys
      .filter((key) => metrics[`${key}_timestamp`] !== undefined)
      .forEach((metric) => {
        const type = snakeCase(metric)
        messages.push({
          dataset: {
            thingId,
            type,
            label,
            unit: units[type] || 'unspecified',
          },
          timestamp: new Date(metrics[`${metric}_timestamp`]).toISOString(),
          value: parseFloat(metrics[`${metric}`]),
        })
      })
    return {
      readings: messages,
    }
  }

const snakeCase = (str) => {
  return str
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase()
}

export const { startServer, createHttpServer } = await buildService({
  sensorType: WASP_SENSOR_TYPE,
  payloadProcessor,
})
