import {
  BreakfastRating,
  SurveyResponse,
} from '@food-review-demo/api-interfaces';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { BREAKFAST_RATING_COLOR_MAP } from '../../utilities/constants';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { API } from '../../utilities/api';
import { useNavigate } from 'react-router-dom';

const SurveyTable: React.FC<{ responses: SurveyResponse[] }> = ({
  responses,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Item</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responses
            .sort(
              (responseA, responseB) =>
                new Date(responseA.createdAt).getTime() -
                new Date(responseB.createdAt).getTime()
            )
            .map((response) => (
              <TableRow
                key={response.responseId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {response.userId}
                </TableCell>
                <TableCell align="right">{response.breakfastItem}</TableCell>
                <TableCell
                  align="right"
                  style={{
                    color: BREAKFAST_RATING_COLOR_MAP[response.breakfastRating],
                  }}
                >
                  {response.breakfastRating}
                </TableCell>
                <TableCell align="right">
                  {new Date(response.createdAt).toUTCString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function SummaryScreen() {
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponse[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResponses() {
      const surveyDataResponse = await API.getSurveyData({});

      setSurveyResponses(surveyDataResponse.responses);
    }

    fetchResponses();
  }, []);

  function getResponseTypeCount(rating: BreakfastRating) {
    return surveyResponses.filter(
      (response) => response.breakfastRating === rating
    ).length;
  }

  function handleViewSurvey() {
    navigate('/');
  }

  const CHART_GAP_SIZE = 7;

  return (
    <Box
      alignItems="center"
      justifyItems="center"
      display="flex"
      flexDirection={'column'}
    >
      <Typography variant="h4" align="center">
        Survey Summary
      </Typography>{' '}
      <Box my={1} />
      <Button onClick={handleViewSurvey} variant="outlined">
        Take Survey!
      </Button>
      <Box my={2} />
      <Box width={400} height={400}>
        <PieChart
          radius={PieChart.defaultProps.radius - CHART_GAP_SIZE}
          label={({ dataEntry }) => {
            if (dataEntry.value === 0) {
              return '';
            }

            const ratingPercentage =
              (dataEntry.value / surveyResponses.length) * 100;
              
            const roundedValue = ratingPercentage.toFixed(0);

            return `${roundedValue}%`;
          }}
          labelStyle={{
            fill: 'white',
            fontSize: '5px',
            fontFamily: 'sans-serif',
          }}
          segmentsShift={0.5}
          totalValue={surveyResponses.length}
          data={[
            {
              title: BreakfastRating.Bad,
              value: getResponseTypeCount(BreakfastRating.Bad),
              color: BREAKFAST_RATING_COLOR_MAP[BreakfastRating.Bad],
            },
            {
              title: BreakfastRating.Good,
              value: getResponseTypeCount(BreakfastRating.Good),
              color: BREAKFAST_RATING_COLOR_MAP[BreakfastRating.Good],
            },
            {
              title: BreakfastRating.OK,
              value: getResponseTypeCount(BreakfastRating.OK),
              color: BREAKFAST_RATING_COLOR_MAP[BreakfastRating.OK],
            },
          ]}
        />
      </Box>
      <Box my={2} />
      <SurveyTable responses={surveyResponses} />
      <Box my={2} />
    </Box>
  );
}
