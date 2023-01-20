import nodemailer from 'nodemailer'

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  }

  sendEmail = (targetEmail, content) => {
    console.log(content)
    const message = {
      from: 'Open Music',
      to: targetEmail,
      subject: 'Ekspor Playlist',
      text: 'Terlampir hasil dari ekspor playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    }

    return this._transporter.sendMail(message)
  }
}

export default MailSender
