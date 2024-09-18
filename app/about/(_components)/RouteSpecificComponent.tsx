import Typography from '@mui/material/Typography';

export default function RouteSpecificComponent() {
  return (
    <Typography
      variant='body2'
      align='center'
      sx={{
        color: 'text.secondary',
      }}
    >
      This is a route specific component (app/about/(_components)/RouteSpecificComponent.tsx)
    </Typography>
  );
}
