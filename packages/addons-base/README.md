# Treats Addons Base
Curated list of basic addons for Treats

## Helpers
**(@treats/addons-base/helper)**

#### Redis
Redis client helper using [redis][redis] package

Specify the redis configuration on the runtime config:
```json
{
    ...,
    "helper": {
        ...,
        "redis": {
            "my_redis": {
                "host": "my-redis.host",
                "port": "6379"
            }
        }
    }
}
```

To use your redis client:
```js
const redisHelper = app.get("redis"),
    myClient = redisHelper.get("my_redis");

//Then you can do any redis command with the said client
myClient.set("my_key", my_val);
```

#### Postgre
Postgre client helper using [pg-promise][pg-promise] package


Specify the postgre configuration on the runtime config:
```json
{
    ...,
    "helper": {
        ...,
        "postgre": {
            "my_db": {
                "host": "my-redis.host",
                "port": "6379"
            }
        }
    }
}
```

To use your postgre client:
```js
const postgreHelper = app.get("postgre"),
    myClient = postgreHelper.get("my_db");

// Then you can use your pgPromise client normally
myClient.any('SELECT * FROM users WHERE name = $1', 'John')
```

#### Datadog
Datadog is a powerful modern monitoring Infrastructure-as-a-Service for cloud applications. This helper provides client for Datadog (or any monitoring services that [hot-shots][hot-shots] supported).

You **HAVE** to set the runtime config for the StatsD client or it'll never initialize.
```json
{
    ...,
    "helper": {
        ...,
        "datadog": {
            "host": "localhost"
        }
    }
}
```

Then you can use your StatsD client with `track` command:
```js
const datadogHelper = app.get("datadog");

// You can use the helper with track, any arguments after your metric type and metric name would be passed to StatsD clint directly
datadogHelper.track("histogram", "my_metric", argument1, argument2,...)
```

Track method parameters:
```js
    datadogHelper.track(
        metric_type: String,
        metric_name: String,
        ...metric_arguments
    );
```
- `metric_type` - Metric type, for example: histogram, increment, etc.
- `metric_name` - Metric name, any name that you would query on your dashboard.
- `metric_arguments` - Metric arguments that would be passed to the StatsD client calls.

#### CircuitBreaker
[Circuit Breaker][circuit-breaker] pattern are useful in microservices world to avoid remote calls hung up indefinitely and blocking your critical resources. In this helper, we use [opossum][opossum] npm package.

You **HAVE** to set a default config for circuitbreaker instance to make it work.
```json
{
    ...,
    "helper": {
        ...,
        "circuitbreaker": {
            ...,
            "endpoint1": {
                "timeout": 1000,
                "errorThresholdPercentage": 50,
                "resetTimeout": 30000
            },
            "default": {
                "timeout": 3000,
                "errorThresholdPercentage": 50,
                "resetTimeout": 30000
            }
        }
    }
}
```

You can then use the Circuit Breaker instance with:
```js
const cbHelper = app.get("circuitbreaker");

function asyncFunctionThatCouldFail (x, y) {
  return new Promise((resolve, reject) => {
    // Do something, maybe on the network or a disk
  });
}

// Wrap the call with our CB instance
cbHelper.call(asyncFunctionThatCouldFail, "endpoint1", [1, 2]);

// Endpoint with no runtime configuration will fallback to the default configuration that we specified before
cbHelper.call(asyncFunctionThatCouldFail, "endpoint2", [1, 2]);
```

Call method parameters:
```
cbHelper.call(
    promiseCall: Function,
    endpoint: String,
    params: Array<Any>,
    callbacks: { [string]: Function }
)
```
 - `promiseCall` - Function that would be wrapped with the circuit breaker.
 - `endpoint` - Name of the endpoint/index of this call, this would be used to get the circuit breaker instance that would be applied.
 - `params` - Parameters that would be used to call the wrapped function.
 - `callbacks` - Callback functions that would be triggered when the circuit breaker instance reached certain conditions.
    - `onSuccess` - Triggered on every success calls.
    - `onFailure` - Triggered on failure calls.
    - `onOpen` - Triggered when circuit breaker instance entered `open` status.
    - `onClose` - Triggered when circuit breaker instance entered `close` status.
    - `onHalfOpen` - Triggered when circuit breaker instance entered `half open` status.
    - `onReject` - Triggered when calls are rejected.
    - `onTimeout` - Triggered timeout reached.

## Generators
**(@treats/addons-base/generator)**

#### Opinionated
Generator template to setup opinonated development environment like Eslint and Stylelint.

```sh
treats generate @treats/addons-base/generator/opinionated
```

#### Docker
Generator template to setup dockerfile and docker compose for Treats

```sh
treats generate @treats/addons-base/generator/docker
```

## License
Apache 2.0

[redis]: https://www.npmjs.com/package/redis
[pg-promise]: https://www.npmjs.com/package/pg-promise
[hot-shots]: https://www.npmjs.com/package/hot-shots
[circuit-breaker]: https://martinfowler.com/bliki/CircuitBreaker.html
[opossum]: https://www.npmjs.com/package/opossum
