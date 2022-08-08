import { ButtonBase, Box, Typography } from '@mui/material';

export const LabeledIconButton: React.FC<{
  color: string;
  label?: string;
  onClick?: () => void;
}> = ({ color, label, onClick }) => {
  return (
    <ButtonBase onClick={onClick}>
      <Box p={2} border="1px solid black" borderColor={color} borderRadius={2}>
        {label ? <Typography variant="subtitle2">{label}</Typography> : null}
      </Box>
    </ButtonBase>
  );
};
