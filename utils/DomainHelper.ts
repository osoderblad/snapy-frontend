export function numberWithThousandSpace(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function calculateDaysUntilRelease(releaseDate: Date) {
  const currentDate = new Date();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  // Använd getTime() för att få millisekunder sedan epoch, vilket gör det säkert att utföra aritmetiska operationer
  return Math.ceil(
    (new Date(releaseDate).getTime() - currentDate.getTime()) /
      millisecondsPerDay
  );
}
