import { before, after } from 'mocha'
import { Kafka, logLevel as kafkaLogLevels } from 'kafkajs'
import { setTimeout } from 'node:timers/promises'

const setupKafka = async (context) => {
  before(async function () {
    this.timeout(30000)
    const kafka = new Kafka({
      clientId: 'wasp-deti-power-tests',
      brokers: ['localhost:9092'],
      logLevel: kafkaLogLevels.NOTHING,
    })
    const producer = kafka.producer()
    await producer.connect()

    const consumer = kafka.consumer({ groupId: 'wasp-deti-power-tests' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'readings', fromBeginning: false })

    const messages = new Map()
    await consumer.run({
      eachMessage: async ({ topic, message: { value } }) => {
        messages.get(topic).push(JSON.parse(value.toString('utf8')))
      },
    })

    context.kafka = {
      publishAndWaitForResults: async (producerTopic, message, waitCount) => {
        messages.clear()
        messages.set('readings', [])

        await producer.send({
          topic: producerTopic,
          messages: [message],
        })

        // wait up to half second for results
        for (let i = 0; i < 5; i++) {
          await setTimeout(100)
          const messageCount = [...messages.values()].reduce((acc, m) => acc + m.length, 0)
          if (messageCount === waitCount) {
            // if we have the right number of results just wait a little longer just in case
            await setTimeout(100)
            return new Map(messages)
          }
        }
        return messages
      },
      disconnect: async () => {
        await consumer.stop()
        await consumer.disconnect()
        await producer.disconnect()
      },
    }
  })

  after(async function () {
    this.timeout(10000)
    await context.kafka.disconnect()
  })
}

export default setupKafka
