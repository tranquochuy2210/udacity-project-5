import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../helpers/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)

    // TODO: Implement creating a new TODO item
    let userId = getUserId(event)
    if (newTodo.name.length < 1) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false
        })
      }
    }
    const newTodoCreated = await createTodo(userId, newTodo)
    return {
      statusCode: 201,
      body: JSON.stringify({
        item: newTodoCreated
      })
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
