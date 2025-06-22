import {
  Button,
  Card,
  Box,
  CardActions,
  Typography,
  Avatar,
  alpha,
  Stack,
  Divider,
  styled,
  useTheme
} from '@mui/material';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import TrendingDownTwoToneIcon from '@mui/icons-material/TrendingDownTwoTone';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import TrendingFlatTwoToneIcon from '@mui/icons-material/TrendingFlatTwoTone';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    svg {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

function TaxPerformanceRow() {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      animations: {
        enabled: false
      },
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      zoom: {
        enabled: false
      }
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    stroke: {
      curve: 'smooth',
      colors: [theme.colors.primary.main],
      width: 2
    },
    yaxis: {
      show: false
    },
    colors: [theme.colors.primary.main],
    grid: {
      padding: {
        top: 10,
        right: 5,
        bottom: 10,
        left: 5
      }
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fixed: {
        enabled: true
      },
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return 'Amount: AED ';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  const vatData = [
    {
      name: 'VAT Collections',
      data: [12000, 15000, 18000, 22000, 25000, 28000, 30000]
    }
  ];

  const corporateTaxData = [
    {
      name: 'Corporate Tax',
      data: [50000, 55000, 60000, 65000, 70000, 75000, 80000]
    }
  ];

  const exciseTaxData = [
    {
      name: 'Excise Tax',
      data: [8000, 8500, 9000, 9500, 10000, 10500, 11000]
    }
  ];

  return (
    <Card>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
      >
        <Box
          sx={{
            width: '100%',
            p: 3
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper>
                <ReceiptIcon color="primary" />
              </AvatarWrapper>
              <Box>
                <Typography variant="h4" noWrap>
                  VAT Collections
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  Current Year
                </Typography>
              </Box>
            </Box>
            <Label color="secondary">Monthly</Label>
          </Box>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  pr: 1
                }}
              >
                AED 30,000
              </Typography>
              <Text color="success">
                <b>+8.5%</b>
              </Text>
            </Box>
            <TrendingUpTwoToneIcon
              sx={{
                color: `${theme.colors.success.main}`
              }}
            />
          </Box>
          <Box pt={2}>
            <Chart
              options={chartOptions}
              series={vatData}
              type="line"
              height={100}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            p: 3
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper>
                <AccountBalanceIcon color="secondary" />
              </AvatarWrapper>
              <Box>
                <Typography variant="h4" noWrap>
                  Corporate Tax
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  FY 2023-2024
                </Typography>
              </Box>
            </Box>
            <Label color="secondary">Quarterly</Label>
          </Box>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  pr: 1
                }}
              >
                AED 80,000
              </Typography>
              <Text color="success">
                <b>+5.2%</b>
              </Text>
            </Box>
            <TrendingUpTwoToneIcon
              sx={{
                color: `${theme.colors.success.main}`
              }}
            />
          </Box>
          <Box pt={2}>
            <Chart
              options={chartOptions}
              series={corporateTaxData}
              type="line"
              height={100}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            p: 3
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper>
                <PaidIcon color="warning" />
              </AvatarWrapper>
              <Box>
                <Typography variant="h4" noWrap>
                  Excise Tax
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  Current Year
                </Typography>
              </Box>
            </Box>
            <Label color="secondary">Monthly</Label>
          </Box>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  pr: 1
                }}
              >
                AED 11,000
              </Typography>
              <Text color="error">
                <b>-1.8%</b>
              </Text>
            </Box>
            <TrendingDownTwoToneIcon
              sx={{
                color: `${theme.colors.error.main}`
              }}
            />
          </Box>
          <Box pt={2}>
            <Chart
              options={chartOptions}
              series={exciseTaxData}
              type="line"
              height={100}
            />
          </Box>
        </Box>
      </Stack>
      <Divider />
      <CardActions
        disableSpacing
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
      </CardActions>
    </Card>
  );
}

export default TaxPerformanceRow;