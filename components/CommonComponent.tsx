import Typography from '@mui/material/Typography';

export default function CommonComponent() {
  return (
    <Typography
      variant='body2'
      align='center'
      sx={{
        color: 'text.secondary',
      }}
    >
      This is a common component (components/CommonComponent.tsx)
    </Typography>
  );
}
