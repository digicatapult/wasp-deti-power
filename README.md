# wasp-deti-power

Uses [`wasp-payload-processor`](https://github.com/digicatapult/wasp-payload-processor) to build a payload processing service for Schneider power meters.

Example payload:
```
{
  "sentOn": 1620256786756,
  "metrics": {
    "CurrentAvg": 1.5844479,
    "TotalActiveEnergyDelivered": 1146.397,
    "ActivePowerTotal_timestamp": 1620256786755,
    "TotalActiveEnergyDelivered_timestamp": 1620256786724,
    "assetName": "Schneider5111-id2",
    "CurrentAvg_timestamp": 1620256786739,
    "ActivePowerTotal": 1.157379
  }
}
```

## Getting started

`wasp-deti-power` can be run in a similar way to most nodejs applications. First install required dependencies using `npm`:

```sh
npm install
```

### Testing
For integration testing, `wasp-deti-power` depends on Kafka and Zookeeper. These can be brought locally up using docker:

```sh
docker-compose up -d
```

You can then run tests with:

```sh
npm test
```

## Environment Variables

`wasp-deti-power` is configured primarily using environment variables as follows:

| variable                    | required |        default        | description                                                                          |
| :-------------------------- | :------: | :-------------------: | :----------------------------------------------------------------------------------- |
| WASP_SENSOR_TYPE            |    N     |      `detiPower`      | Type of this sensor/thing for `wasp-thing-service`                                   |

The following environment variables configure the use of [`wasp-payload-processor`](https://github.com/digicatapult/wasp-payload-processor):

| variable                    | required |     default     | description                                                                             |
| :-------------------------- | :------: | :-------------: | :-------------------------------------------------------------------------------------- |
| PORT                        |    N     |      `3000`     | Port on which the service will listen                                                   |
| LOG_LEVEL                   |    N     |      `info`     | Logging level. Valid values are [`trace`, `debug`, `info`, `warn`, `error`, `fatal`]    |
| KAFKA_LOG_LEVEL             |    N     |    `nothing`    | Logging level for Kafka. Valid values are [`debug`, `info`, `warn`, `error`, `nothing`] |
| KAFKA_BROKERS               |    N     | `localhost:9092`| List of addresses for the Kafka brokers                                                 |
| KAFKA_READINGS_TOPIC        |    N     |   `readings`    | Outgoing Kafka topic for readings                                                       |
| KAFKA_PAYLOAD_ROUTING_PREFIX|    N     |   `payloads`    | Prefix for incoming Kafka topics for payloads                                           |

## Helm/Kubernetes

Install `minikube` and `helm` using Homebrew, then start `minikube` and update helm dependencies:
```
brew install minikube helm
minikube start
helm dependency update helm/wasp-deti-power
```

Eval is required to provide helm with visibility for your local docker image repository:
```
eval $(minikube docker-env)
```

Build the docker image (change `src=` to point to your local github token):
```
DOCKER_BUILDKIT=1 docker build -t wasp-deti-power:latest --secret id=github,src=<path/to/your/github_token> .
```

To run/deploy the application on kubernetes via helm charts use the following `ct-values.yaml` with the corresponding overrides:
```
helm install wasp-deti-power helm/wasp-deti-power -f helm/wasp-deti-power/ci/ct-values.yaml
```

Check the pods are running successfully using:
```
kubectl get pods -A
```