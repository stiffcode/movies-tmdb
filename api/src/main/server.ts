import './config/module-alias'
import 'dotenv/config'
import { MysqlHelper } from '../infra/db/mysql/helpers/MysqlHelper'

const env = process.env
const { MYSQL_USER, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_DB, port = '3000' } = env
console.log('MYSQL_USER', MYSQL_HOST, MYSQL_PASSWORD, MYSQL_DB)
MysqlHelper.connect({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB
}).then(async () => {
  const app = (await (import('./config/app'))).default
  app.listen(env.port, () =>
    console.log(`server running at http://localhost:${port}`)
  )
}).catch(console.error)
