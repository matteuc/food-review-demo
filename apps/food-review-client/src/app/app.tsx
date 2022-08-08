import {
  Box,
  Button,
  ButtonBase,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { ComponentProps, useState } from 'react';
import { Logger } from '../utilities/logger';
import './app.module.css';
import { LabeledIconButton } from './components/LabeledIconButton';
export function App() {
  return <MainContent />;
}

enum BreakfastRating {
  Bad = 'Bad',
  Ok = 'Ok',
  Good = 'Good',
}

const BREAKFAST_RATING_COLOR_MAP: Record<BreakfastRating, string> = {
  [BreakfastRating.Bad]: 'red',
  [BreakfastRating.Ok]: 'orange',
  [BreakfastRating.Good]: 'green',
};

export function MainContent() {
  const [userId, setUserId] = useState('');

  const [questionAnswers, setQuestionAnswers] = useState<{
    breakfastItem: string;
    breakfastRating: BreakfastRating | null;
  }>({
    breakfastItem: '',
    breakfastRating: null,
  });

  const handleClickRating = (rating: BreakfastRating) => {
    setQuestionAnswers((oldAnswers) => ({
      ...oldAnswers,
      breakfastRating: rating,
    }));
  };

  const handleChangeUsername: ComponentProps<typeof TextField>['onChange'] = (
    e
  ) => {
    setUserId(e.currentTarget.value);
  };

  const handleChangeBreakfastItem: ComponentProps<
    typeof TextField
  >['onChange'] = (e) => {
    setQuestionAnswers((oldAnswers) => ({
      ...oldAnswers,
      breakfastItem: e.currentTarget.value,
    }));
  };

  const handleSubmit = () => {
    // TODO - Submit answers

    Logger.debug({userId, questionAnswers})

  };

  const submitDisabled = !(
    userId &&
    questionAnswers.breakfastItem &&
    questionAnswers.breakfastRating
  );

  return (
    <Box
      width="calc(100% - 80px)"
      height="100vh"
      p={5}
      justifyItems="center"
      display="flex"
      flexDirection={'column'}
    >
      <Typography variant="h4" align="center">
        The Breakfast Study
      </Typography>

      <Box my={2} />

      <Stepper orientation="vertical">
        <Step expanded active>
          <StepLabel>Enter Your Username</StepLabel>
          <StepContent>
            <TextField
              label="loco-for-moco"
              helperText="Please enter your unique username"
              onChange={handleChangeUsername}
              value={userId || ''}
            />
          </StepContent>
        </Step>

        <Step expanded active>
          <StepLabel>Questions</StepLabel>
          <StepContent>
            <Box mb={2}>
              <Typography variant="body1">
                What did you eat for breakfast today?
              </Typography>

              <Box my={2} />

              <TextField
                onChange={handleChangeBreakfastItem}
                label="Loco Moco"
                value={questionAnswers.breakfastItem || ''}
              />
            </Box>

            <Box mb={2}>
              <Typography variant="body1">
                How was it?{' '}
                {questionAnswers.breakfastRating ? (
                  <Typography
                    component="span"
                    variant="body1"
                    style={{
                      color:
                        BREAKFAST_RATING_COLOR_MAP[
                          questionAnswers.breakfastRating
                        ],
                    }}
                  >
                    {questionAnswers.breakfastRating}
                  </Typography>
                ) : null}
              </Typography>

              <Box my={2} />
              <Box display="flex" justifyContent={'space-between'}>
                {Object.entries(BreakfastRating).map(
                  ([ratingKey, ratingLabel]) => {
                    const ratingEnum = ratingKey as BreakfastRating;

                    return (
                      <LabeledIconButton
                        label={ratingLabel}
                        onClick={() => {
                          handleClickRating(ratingEnum);
                        }}
                        color={BREAKFAST_RATING_COLOR_MAP[ratingEnum]}
                      />
                    );
                  }
                )}
              </Box>
            </Box>
          </StepContent>
        </Step>

        <Step expanded active>
          <StepLabel>Complete</StepLabel>
          <StepContent>
            <Box>
              <Typography>
                Thank you for taking our survey! Click 'Submit' to send us your
                daily breakfast survey ^.^
              </Typography>
              <Box my={2} />
              <Button
                variant="outlined"
                disabled={submitDisabled}
                onChange={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
}

export default App;
