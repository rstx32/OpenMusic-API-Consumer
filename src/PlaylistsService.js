import pg from 'pg'
const { Pool } = pg

class PlaylistsService {
  constructor() {
    this._pool = new Pool()
  }

  async getPlaylists(userId) {
    // query playlist
    const query = `
        SELECT *
        FROM playlists
        WHERE owner='${userId}'
    `
    const { rows } = await this._pool.query(query)
    const playlistName = rows[0].name
    const playlistId = rows[0].id

    // query playlist songs
    const query2 = `
      SELECT songs.id, songs.title, songs.performer
      FROM songs
      LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id
      WHERE playlist_songs.playlist_id = '${playlistId}'
     `
    const { rows: songs } = await this._pool.query(query2)

    const playlistSongs = {
      playlist: {
        id: playlistId,
        name: playlistName,
        songs,
      },
    }

    return playlistSongs
  }
}

export default PlaylistsService
