import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useContext } from "react";

import { GlobalContext } from "../context/GlobalProvider";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

function QuestionStats({ questions, answers, answerOptions }) {

  const { t } = useContext(GlobalContext);

  if (!questions || !answers || !answerOptions) return null;


  const questionTypeCounts = questions.reduce((acc, question) => {
    acc[question.question_type] = (acc[question.question_type] || 0) + 1;
    return acc;
  }, {});

  const questionTypeLabels = Object.keys(questionTypeCounts);
  const questionTypeValues = Object.values(questionTypeCounts);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">{t("questionStats.formStatistics")}</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{t("questionStats.questionTypeDistribution")}</h3>
        <Bar
          data={{
            labels: questionTypeLabels,
            datasets: [
              {
                label: "Question Count",
                data: questionTypeValues,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: true, text: "Question Types" },
            },
            scales: { y: { beginAtZero: true } },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.map((question) => (
          <div
            key={question.question_id}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow space-y-3"
          >
            <h3 className="text-lg font-semibold">{question.question_text}</h3>
            <QuestionVisualization
              question={question}
              answers={answers.filter((ans) => ans.question_id === question.question_id)}
              options={answerOptions.filter((opt) => opt.question_id === question.question_id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionVisualization({ question, answers, options }) {
  const { question_type, question_text } = question;

  switch (question_type) {
    case "short-answer":
    case "paragraph":
      return (
        <div>
          <h4 className="font-medium">Top Responses:</h4>
          <ul className="list-disc list-inside text-sm">
            {answers.map((ans, idx) => (
              <li key={idx}>{ans.answer_text || "No response"}</li>
            ))}
          </ul>
        </div>
      );

    case "multiple-choice":
    case "checkboxes":
    case "dropdown": {
      const responseCounts = {};
      answers.forEach((ans) => {
        const selectedValues = Array.isArray(ans.answer_value)
          ? ans.answer_value
          : [ans.answer_text];
        selectedValues.forEach((val) => {
          responseCounts[val] = (responseCounts[val] || 0) + 1;
        });
      });

      const labels = options.map((opt) => opt.option_text);
      const dataValues = labels.map((label) => responseCounts[label] || 0);

      return (
        <PieChart
          question={question_text}
          labels={labels}
          dataValues={dataValues}
        />
      );
    }

    default:
      return <p>Unsupported question type</p>;
  }
}

function PieChart({ question, labels, dataValues }) {
  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: question,
      },
    },
  };

  return <Pie data={data} options={options} />;
}

export default QuestionStats;
