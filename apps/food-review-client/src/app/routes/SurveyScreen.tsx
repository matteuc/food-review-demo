import { BreakfastRating } from '@food-review-demo/api-interfaces';
import {
  TextField,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState, ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../utilities/api';
import { Logger } from '../../utilities/logger';
import { LabeledIconButton } from '../components/LabeledIconButton';

const BREAKFAST_RATING_COLOR_MAP: Record<BreakfastRating, string> = {
  [BreakfastRating.Bad]: 'red',
  [BreakfastRating.Ok]: 'orange',
  [BreakfastRating.Good]: 'green',
};

export default function SurveyScreen() {
  /**
   * State Hook to store the value from the user ID input field
   */
  const [userId, setUserId] = useState('');

  /**
   * State hook to store the current open state of the survey success dialog
   */
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  /**
   * Function that helps navigate to other routes
   */
  const navigate = useNavigate();

  /**
   * State Hook to store the value from the breakfast item and rating input fields
   */
  const [questionAnswers, setQuestionAnswers] = useState<{
    breakfastItem: string;
    breakfastRating: BreakfastRating | null;
  }>({
    breakfastItem: '',
    breakfastRating: null,
  });

  /**
   * Handle updating the current breakfast rating
   * @param rating The BreakfastRating that was clicked
   */
  const handleClickRating = (rating: BreakfastRating) => {
    setQuestionAnswers((oldAnswers) => ({
      ...oldAnswers,
      breakfastRating: rating,
    }));
  };

  /**
   * Handle updating the current user ID
   * @param changeEvent Change event triggered from the user ID input field
   */
  const handleChangeUserId: ComponentProps<typeof TextField>['onChange'] = (
    changeEvent
  ) => {
    setUserId(changeEvent.currentTarget.value);
  };

  /**
   * Handle updating the current breakfast item
   * @param changeEvent Change event triggered from the breakfast item input field
   */
  const handleChangeBreakfastItem: ComponentProps<
    typeof TextField
  >['onChange'] = (changeEvent) => {
    setQuestionAnswers((oldAnswers) => ({
      ...oldAnswers,
      breakfastItem: changeEvent.currentTarget.value,
    }));
  };

  /**
   * Handle submitting the survey response to our API
   * @returns void
   */
  const handleSubmit = async () => {
    const { breakfastItem, breakfastRating } = questionAnswers;

    if (!breakfastRating) return;

    await API.submitSurvey({
      survey: {
        userId,
        breakfastItem,
        breakfastRating,
      },
    });

    handleOpenSuccessDialog();

    Logger.debug({ userId, questionAnswers });
  };

  /**
   * Handle oepning the success dialog
   */
  const handleOpenSuccessDialog = () => {
    setSuccessDialogOpen(true);
  };

  /**
   * Handle closing the success dialog
   */
  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const handleViewSummary = () => {
    navigate('/summary');

    handleCloseSuccessDialog();
  };

  /**
   * A flag that determines whether or not the submit button should be disabled
   *
   * Only true if a non-empty user ID, breakfast item, and breakfast rating is entered
   */
  const submitDisabled = !(
    userId &&
    questionAnswers.breakfastItem &&
    questionAnswers.breakfastRating
  );

  return (
    <>
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
                helperText="Please enter your unique user ID"
                onChange={handleChangeUserId}
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
                          key={ratingKey}
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
                  Thank you for taking our survey! Click 'Submit' to send us
                  your daily breakfast survey ^.^
                </Typography>
                <Box my={2} />
                <Button
                  variant="outlined"
                  disabled={submitDisabled}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
      <SurveySubmissionSuccessDialog
        open={successDialogOpen}
        handleClose={handleCloseSuccessDialog}
        handleViewSummary={handleViewSummary}
      />
    </>
  );
}

const SurveySubmissionSuccessDialog: React.FC<{
  /**
   * Determines whether the dialog is open
   */
  open: boolean;
  /**
   * Close dialog handler
   */
  handleClose: () => void;
  /**
   * View summary screen handler
   */
  handleViewSummary: () => void;
}> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Survey Submitted!'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your breakfast review has been successfully submitted. Come back
          tomorrow to review your breakfast again!
          <br />
          <br />
          For now, check out what other people thought about their breakfast by
          clicking 'View Summary'.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="inherit">Cancel</Button>
        <Button onClick={props.handleViewSummary} autoFocus>
          View Summary
        </Button>
      </DialogActions>
    </Dialog>
  );
};