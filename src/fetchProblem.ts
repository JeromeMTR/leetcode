const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';

const DAILY_CHALLENGE_QUERY = `
  query questionOfToday {
    activeDailyCodingChallengeQuestion {
      date
      userStatus
      link
      question {
        title
        titleSlug
        difficulty
        acRate
        topicTags {
          name
        }
      }
    }
  }
`;

const PROBLEM_DETAILS_QUERY = `
  query getProblemDetails($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      title
      questionId
      content
      difficulty
      topicTags {
        name
      }
      stats
      codeSnippets {
        lang
        code
      }
    }
  }
`;

async function fetchDailyProblem() {
  const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: DAILY_CHALLENGE_QUERY }),
  });

  interface DailyProblemResponse {
    data: {
      activeDailyCodingChallengeQuestion: {
        date: string;
        userStatus: string | null;
        link: string;
        question: {
          title: string;
          titleSlug: string;
          difficulty: string;
          acRate: number;
          topicTags: { name: string }[];
        };
      };
    };
  }

  const json = (await response.json()) as DailyProblemResponse;
  const dailyQuestion = json.data.activeDailyCodingChallengeQuestion;

  return {
    title: dailyQuestion.question.title,
    slug: dailyQuestion.question.titleSlug,
    difficulty: dailyQuestion.question.difficulty,
    url: `https://leetcode.com${dailyQuestion.link}`,
    tags: dailyQuestion.question.topicTags.map((tag: { name: string }) => tag.name),
    acceptanceRate: dailyQuestion.question.acRate,
  };
}

async function fetchProblemDetails(titleSlug: string) {
  const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: PROBLEM_DETAILS_QUERY,
      variables: { titleSlug },
    }),
  });

  interface ProblemDetailsResponse {
    data: {
      question: {
        title: string;
        questionId: string;
        content: string;
        difficulty: string;
        topicTags: { name: string }[];
        stats: string;
        codeSnippets: { lang: string; code: string }[];
      };
    };
    errors?: { message: string }[];
  }

  const json = (await response.json()) as ProblemDetailsResponse;

  // Check for errors
  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new Error('Failed to fetch problem details.');
  }

  const problem = json.data.question;

  return {
    title: problem.title,
    questionId: problem.questionId,
    content: problem.content,
    difficulty: problem.difficulty,
    tags: problem.topicTags.map((tag: { name: string }) => tag.name),
    stats: problem.stats,
    codeSnippets: problem.codeSnippets,
  };
}

async function fetchProblem() {

  try{
    const dailyProblemData = await fetchDailyProblem();
    const problemDetailsData = await fetchProblemDetails(dailyProblemData.slug);

    return {
      title: dailyProblemData.title,
      questionId: problemDetailsData.questionId,
      slug: dailyProblemData.slug,
      difficulty: dailyProblemData.difficulty,
      url: dailyProblemData.url,
      tags: dailyProblemData.tags,
      acceptanceRate: dailyProblemData.acceptanceRate,
      content: problemDetailsData.content,
      codeSnippets: problemDetailsData.codeSnippets
    }
  } catch (error) {
    console.error("Error fetching problem:", error);
  }
}

export default fetchProblem;
