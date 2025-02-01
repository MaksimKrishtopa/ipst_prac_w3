export function formatDate(date: string) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  