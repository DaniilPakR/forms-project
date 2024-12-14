import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Typography, Select, MenuItem } from "@mui/material";

export default function FillFormQuestions({
  questions,
  answers,
  onSetAnswers,
}) {
  if (!questions || questions.length === 0) {
    return <Typography variant="body1">No questions available</Typography>;
  }

  const handleSetAnswers = (questionId, value) => {
    onSetAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const content = questions.map((question) => {
    if (question.question_type === "short-answer") {
      return (
        <Box key={question.id} sx={{ mb: 3 }}>
          <Typography variant="body1" component="label" htmlFor={`question-${question.id}`} sx={{ mb: 1, display: "block" }}>
            {question.question_text}
          </Typography>
          <TextField
            id={`question-${question.id}`}
            value={answers[question.id] || ""}
            onChange={(e) => handleSetAnswers(question.id, e.target.value)}
            placeholder="Your Answer"
            variant="outlined"
            fullWidth
          />
        </Box>
      );
    } else if (question.question_type === "paragraph") {
      return (
        <Box key={question.id} sx={{ mb: 3 }}>
          <Typography variant="body1" component="label" htmlFor={`question-${question.id}`} sx={{ mb: 1, display: "block" }}>
            {question.question_text}
          </Typography>
          <TextField
            id={`question-${question.id}`}
            value={answers[question.id] || ""}
            onChange={(e) => handleSetAnswers(question.id, e.target.value)}
            placeholder="Your Answer"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </Box>
      );
    } else if (question.question_type === "multiple-choice") {
      return (
        <Box key={question.id} sx={{ mb: 3 }}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            {question.question_text}
          </FormLabel>
          <RadioGroup
            aria-labelledby={`radio-group-${question.id}`}
            name={`radio-group-${question.id}`}
            value={answers[question.id] || ""}
            onChange={(e) => handleSetAnswers(question.id, e.target.value)}
          >
            {question.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.option_text}
                control={<Radio />}
                label={option.option_text}
              />
            ))}
          </RadioGroup>
        </Box>
      );
    } else if (question.question_type === "checkboxes") {
      return (
        <Box key={question.id} sx={{ mb: 3 }}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            {question.question_text}
          </FormLabel>
          {question.options.map((option) => (
            <FormControlLabel
              key={option.id}
              control={
                <Checkbox
                  checked={(answers[question.id] || []).includes(option.option_text)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    onSetAnswers((prevAnswers) => {
                      const prevOptions = prevAnswers[question.id] || [];
                      return {
                        ...prevAnswers,
                        [question.id]: checked
                          ? [...prevOptions, option.option_text]
                          : prevOptions.filter((opt) => opt !== option.option_text),
                      };
                    });
                  }}
                />
              }
              label={option.option_text}
            />
          ))}
        </Box>
      );
    } else if (question.question_type === "dropdown") {
      return (
        <Box key={question.id} sx={{ mb: 3 }}>
          <Typography variant="body1" component="label" htmlFor={`dropdown-${question.id}`} sx={{ mb: 1, display: "block" }}>
            {question.question_text}
          </Typography>
          <Select
            id={`dropdown-${question.id}`}
            value={answers[question.id] || ""}
            onChange={(e) => handleSetAnswers(question.id, e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            {question.options.map((option) => (
              <MenuItem key={option.id} value={option.option_text}>
                {option.option_text}
              </MenuItem>
            ))}
          </Select>
        </Box>
      );
    }
    return null;
  });

  return <FormControl sx={{ width: "100%", gap: 4 }}>{content}</FormControl>;
}
