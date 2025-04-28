export const calculateRemainingDays = (
  createdAt: string,
  totalDays: number
): { text: string; color: string } => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  createdDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const timeDiff = currentDate.getTime() - createdDate.getTime();
  const daysElapsed = Math.floor(timeDiff / (1000 * 3600 * 24));
  const daysRemaining = totalDays - daysElapsed;

  let color = "#002140";

  if (daysRemaining > 5) {
    color = "#1D8348";
  } else if (daysRemaining >= 2 && daysRemaining <= 5) {
    color = "#FD7E14";
  } else {
    color = "#8C1111";
  }

  const text =
    daysRemaining >= 0
      ? `${daysRemaining} días restantes`
      : `${Math.abs(daysRemaining)} días vencidos`;

  return { text, color };
};
