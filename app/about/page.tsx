import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import CommonComponent from '@/components/CommonComponent';
import RouteSpecificComponent from '@/app/about/(_components)/RouteSpecificComponent';

export default function About() {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
          You are on the about page (app/about/page.tsx)
        </Typography>
        <RouteSpecificComponent />
        <CommonComponent />
        <Box sx={{ maxWidth: 'sm' }}>
          <Button variant='contained' component={NextLink} href='/'>
            Go to the home page (app/about/page.tsx)
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
