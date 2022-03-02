import mysql from 'mysql'

export type configMysql = {
  host?: string
  user?: string
  password?: string
  database?: string
}

export const MysqlHelper = {
  async connect (config: configMysql): Promise<void> {
    const { host, user, password, database } = config
    const con = await mysql.createConnection({
      host,
      user,
      password,
      database
    })
    await con.connect((err) => {
      if (err) {
        console.log('Erro connecting to database...', err)
        return
      }
      console.log('Connection established!')
    })
  },
  async disconnect (): Promise<void> {

  }
}
