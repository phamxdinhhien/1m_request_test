## Tech stacks

```
$ Nestjs
$ RabbitMQ
$ Redis
$ Typescript
```

## Compile and run the project

```bash
# development
$ docker compose up --build -d
```

## Simulate 1 million requests

```bash
# install k6
$ brew install k6

# usage
$ k6 run --vus 1000 --duration 1m  test-script.js
```
## This is CURL - In case of using other tools to simulate

```
<curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
"customerId": 1000,
"quantity": 10
}'>
```

