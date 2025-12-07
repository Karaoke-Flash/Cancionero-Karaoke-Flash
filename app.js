let songs = [];

fetch('songs.json')
  .then(res => res.json())
  .then(data => {
    songs = data;
    renderSongs(songs);
  })
  .catch(err => {
    document.getElementById('songList').innerHTML = `
      <tr><td colspan="4" style="color:red;text-align:center;">❌ Error al cargar canciones</td></tr>
    `;
  });

document.getElementById('searchInput').addEventListener('input', () => {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!q) return renderSongs(songs);

  const filtered = songs.filter(song =>
    song.titulo.toLowerCase().includes(q) ||
    song.artista.toLowerCase().includes(q) ||
    song.genero.toLowerCase().includes(q) ||
    song.letra.toLowerCase().includes(q) ||
    song.numero.toString().includes(q)
  );

  const display = filtered.length > 500 ? filtered.slice(0, 500) : filtered;
  renderSongs(display);
  
  document.getElementById('resultsInfo').textContent = 
    filtered.length === 0 
      ? '❌ No se encontraron canciones.' 
      : `✅ ${filtered.length} canción${filtered.length === 1 ? '' : 'es'} encontrada${filtered.length === 1 ? '' : 's'}.`;
});

function renderSongs(list) {
  const tbody = document.getElementById('songList');
  tbody.innerHTML = list.length === 0 
    ? '<tr><td colspan="4">No hay datos</td></tr>'
    : list.map(song => `
        <tr>
          <td>${song.numero}</td>
          <td>${song.titulo}</td>
          <td>${song.artista}</td>
          <td>${song.genero}</td>
        </tr>
      `).join('');
}