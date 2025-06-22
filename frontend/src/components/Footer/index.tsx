import { Box, Container, Link, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
        background-color: ${theme.palette.background.paper};
        padding: ${theme.spacing(4)};
        border-top: 1px solid ${theme.palette.divider};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper" maxWidth="xl">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; {new Date().getFullYear()} - Emirates Tax Platform, Ministry of Finance
          </Typography>
          <Box mt={1} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center">
            <Link href="#" variant="body2" sx={{ mx: 1, color: 'text.secondary' }}>
              Terms of Service
            </Link>
            <Link href="#" variant="body2" sx={{ mx: 1, color: 'text.secondary' }}>
              Privacy Policy
            </Link>
            <Link href="#" variant="body2" sx={{ mx: 1, color: 'text.secondary' }}>
              Contact Us
            </Link>
            <Link href="#" variant="body2" sx={{ mx: 1, color: 'text.secondary' }}>
              FAQs
            </Link>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              pt: { xs: 2, md: 0 }
            }}
            variant="subtitle1"
          >
            Official portal of the{' '}
            <Link
              href="https://mof.gov.ae"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              UAE Ministry of Finance
            </Link>
          </Typography>
          <Typography variant="caption" display="block" mt={1}>
            Version 2.1.0 | Last updated: June 2023
          </Typography>
        </Box>
      </Box>
      <Box textAlign="center" mt={2}>
        <Typography variant="caption" color="text.secondary">
          The content of this platform is protected by copyright laws and is intended for official use only.
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;