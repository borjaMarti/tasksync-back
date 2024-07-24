# TaskSync (Back-End)

TaskSync allows your team to keep track of tasks with real-time updates, notifying you by email when new tasks are added.

- Built with [NestJS](https://nestjs.com/).
- ORM by [Prisma](https://www.prisma.io/).
- Data persistence with [SQLite](https://www.sqlite.org).
- Message brokering with [RabbitMQ](https://www.rabbitmq.com/).

[TaskSync (Front-End)](https://github.com/borjamarti/tasksync-front)

## Project Setup

```sh
npm install
```

Create a `.env` file on the root directory with the following variables:

```Dotenv
DATABASE_URL="file:./dev.db"
RABBITMQ_URL="amqp://localhost:5672"
EMAIL_HOST=""
EMAIL_PORT=""
EMAIL_USER=""
EMAIL_PASSWORD=""
```

You will need to fill the `EMAIL` variables with your email provider info. You can use [mailtrap](https://mailtrap.io/) for testing purposes.

If your RabbitMQ instance is running on a different URL, modify `RABBITMQ_URL`.

Finally, create and seed the database with:

```sh
npx prisma migrate dev --name init
```

### Start Project

Initialize your RabbitMQ instance. You can do this using Docker with the following command:

```sh
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13-management
```

Now you can start the NestJS server:

```sh
npm run start
```
