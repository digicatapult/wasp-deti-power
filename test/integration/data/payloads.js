export default {
  READING_PAYLOAD_1: {
    message: {
      key: '00000000-0000-0000-0000-000000000000',
      value: JSON.stringify({
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'detiPower',
        ingest: 'mqtt',
        ingestId: '574bd77c-4aba-4557-aa9e-066939f938cc',
        timestamp: '',
        payload: {
          sentOn: 1620256786756,
          metrics: {
            CurrentAvg: 1.5844479,
            TotalActiveEnergyDelivered: 1146.397,
            ActivePowerTotal_timestamp: 1620256786755,
            TotalActiveEnergyDelivered_timestamp: 1620256786724,
            assetName: 'Schneider5111-id2',
            CurrentAvg_timestamp: 1620256786739,
            ActivePowerTotal: 1.157379,
          },
        },
        metadata: {},
      }),
    },
    expectedReadings: [
      {
        dataset: {
          thingId: '00000000-0000-0000-0000-000000000000',
          type: 'active_power_total',
          label: 'Schneider5111-id2',
          unit: 'kW',
        },
        timestamp: '2021-05-05T23:19:46.755Z',
        value: 1.157379,
      },
      {
        dataset: {
          thingId: '00000000-0000-0000-0000-000000000000',
          type: 'total_active_energy_delivered',
          label: 'Schneider5111-id2',
          unit: 'kWh',
        },
        timestamp: '2021-05-05T23:19:46.724Z',
        value: 1146.397,
      },
      {
        dataset: {
          thingId: '00000000-0000-0000-0000-000000000000',
          type: 'current_avg',
          label: 'Schneider5111-id2',
          unit: 'A',
        },
        timestamp: '2021-05-05T23:19:46.739Z',
        value: 1.5844479,
      },
    ],
  },
  NO_METRICS_PAYLOAD: {
    message: {
      key: '00000000-0000-0000-0000-000000000000',
      value: JSON.stringify({
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'detiPower',
        ingest: 'mqtt',
        ingestId: '574bd77c-4aba-4557-aa9e-066939f938cc',
        timestamp: '',
        payload: {
          sentOn: 1620256786756,
        },
        metadata: {},
      }),
    },
    expectedReadings: [],
  },
  TIMER_PAYLOAD: {
    message: {
      key: '00000000-0000-0000-0000-000000000000',
      value: JSON.stringify({
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'detiPower',
        ingest: 'mqtt',
        ingestId: '574bd77c-4aba-4557-aa9e-066939f938cc',
        timestamp: '',
        payload: {
          sentOn: 1620256786693,
          metrics: { TIMER: 1620256786693 },
        },
        metadata: {},
      }),
    },
    expectedReadings: [],
  },
  NO_ASSET_NAME_PAYLOAD: {
    message: {
      key: '00000000-0000-0000-0000-000000000000',
      value: JSON.stringify({
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'detiPower',
        ingest: 'mqtt',
        ingestId: '574bd77c-4aba-4557-aa9e-066939f938cc',
        timestamp: '',
        payload: {
          sentOn: 1620256786756,
          metrics: {
            CurrentAvg: 1.5844479,
            TotalActiveEnergyDelivered: 1146.397,
            ActivePowerTotal_timestamp: 1620256786755,
            TotalActiveEnergyDelivered_timestamp: 1620256786724,
            CurrentAvg_timestamp: 1620256786739,
            ActivePowerTotal: 1.157379,
          },
        },
        metadata: {},
      }),
    },
    expectedReadings: [],
  },
  METRIC_WITHOUT_TIMESTAMP_PAYLOAD: {
    message: {
      key: '00000000-0000-0000-0000-000000000000',
      value: JSON.stringify({
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'detiPower',
        ingest: 'mqtt',
        ingestId: '574bd77c-4aba-4557-aa9e-066939f938cc',
        timestamp: '',
        payload: {
          sentOn: 1620256786756,
          metrics: {
            CurrentAvg: 1.5844479,
            TotalActiveEnergyDelivered: 1146.397,
            TotalActiveEnergyDelivered_timestamp: 1620256786724,
            assetName: 'Schneider5111-id2',
          },
        },
        metadata: {},
      }),
    },
    expectedReadings: [
      {
        dataset: {
          thingId: '00000000-0000-0000-0000-000000000000',
          type: 'total_active_energy_delivered',
          label: 'Schneider5111-id2',
          unit: 'kWh',
        },
        timestamp: '2021-05-05T23:19:46.724Z',
        value: 1146.397,
      },
    ],
  },
}
