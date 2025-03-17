const clientId = 'dd3007c240d740eab7fb77584a27b52d';
const redirectUri = 'https://jspanglez.github.io/jammin/';
let accessToken;

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Check for access token match in URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // Clear the parameters from the URL, so the app doesn't try grabbing the access token after it has expired
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      console.error('Playlist name or track URIs are missing')
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name })
        });
      })
      .then(response => response.json())
      .then(jsonResponse => {
        const playlistId = jsonResponse.id;
        console.log(`Adding tracks to playlist ${playlistId} with URIs:`, trackUris);
        trackUris.forEach(uri => {
          if (!uri || !uri.startsWith('spotify:track:')) {
            console.error(`Invalid track URI: ${uri}`);
            throw new Error(`Invalid track URI: ${uri}`);
          }
        });
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris })
        });
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            console.error('Error adding tracks:', error);
            throw new Error(`Error adding tracks: ${error.error.message}`);
          });
        }
      })
      .catch(error => {
        console.error('Error saving playlist:', error);
      });
  }
};

// export default Spotify;