export const getWords = async () => {
  const response = await fetch('http://localhost:3333/words');
  const result = response.json();
  return result;
};

export const getScore = async (score: number) => {
  const response = await fetch('http://localhost:3333/rank', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      scoreValue: score,
    }),
  });
  const result = response.json();
  return result;
};
