import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import amqp from 'amqplib'
import PlaylistService from './PlaylistsService.js'
import MailSender from './MailSender.js'
import Listener from './Listener.js'
;(async () => {
  const playlistService = new PlaylistService()
  const mailSender = new MailSender()
  const listener = new Listener(playlistService, mailSender)

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER)
  const channel = await connection.createChannel()

  await channel.assertQueue('export:playlists', {
    durable: true,
  })

  channel.consume('export:playlists', listener.listen, { noAck: true })
})()
