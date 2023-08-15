import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useTracksContext } from '../../contexts/TracksContext';

const TrackCard = ({ track }) => {
  const {playTrack} = useTracksContext()
  function handleClick() {
    playTrack(track.id)
  }
  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} onClick={handleClick}>
      <Card
        sx={{
          backgroundColor: "#222222",
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          margin:'1rem',
          cursor:'pointer'
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: "14rem", objectFit: 'cover' }}
          image={track.cover_image_url}
          alt={track.title}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '0.5rem' }}>
            {track.title}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>
            {track.artist} - {track.album}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: '1rem' }}>
            {formatDuration(track.duration_seconds)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackCard;
