export const cleanInputValue = (value) => {
  return value
    .replace(/^ /g, "")
    .replace(/ +/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export const getPrevDateString = (date) => {
  let prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 1);
  return prevDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export const getNextDateString = (date) => {
  let nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export const getSelectedDateString = (date) => {
  let selectedDate = new Date(date);
  return selectedDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export const getDateDaysAgo = (days) => {
  let date = new Date(
    new Date().setDate(new Date().getDate() - (days - 1))
  ).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return date;
};

export const getTitleErrors = (title, existingTitles) => {
  if (existingTitles.includes(title)) {
    return "Title must be unique";
  } else if (!title) {
    return "Title cannot be blank";
  } else {
    return "";
  }
};

export const getAverageScore = (itemScores, range) => {
  let scores = Object.entries(itemScores)
    .filter(
      (i) =>
        new Date(i[0]) >= new Date(getDateDaysAgo(range)) ||
        range === "All Time"
    )
    .map((item) => item[1]);

  return scores.length
    ? Math.round(
        (scores.reduce((sum, score) => sum + score, 0) / scores.length +
          Number.EPSILON) *
          100
      ) / 100
    : 0;
};

export const getLongestScoreStreak = (score, item, range) => {
  let longest = 0;
  let curStreak = 0;
  let sortedScores = Object.entries(item.scores)
    .filter(
      (i) =>
        new Date(i[0]) >= new Date(getDateDaysAgo(range)) ||
        range === "All Time"
    )
    .sort((a, b) => new Date(a[0]) - new Date(b[0]));

  for (let i = 0; i < sortedScores.length; i++) {
    let curScore = sortedScores[i][1];

    if (curScore === score) {
      curStreak++;

      if (curStreak > longest) {
        longest = curStreak;
      }
    } else {
      curStreak = 0;
    }
  }
  return longest;
};

export const getDaysTracked = (item) => {
  let today = new Date();
  let dateCreated = new Date(item.dateCreated);
  let dayDifference =
    (today.getTime() - dateCreated.getTime()) / (1000 * 3600 * 24);

  return Math.round(dayDifference);
};

export const getAvg = (a, b) => {
  return Math.round(((a + b) / 2 + Number.EPSILON) * 100) / 100;
};
