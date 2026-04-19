/**
 * Returns a greeting based on the current hour.
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

/**
 * Formats a date to "Dia DD de Mês, YYYY" in pt-BR.
 */
export function formatDateBR(date: Date = new Date()): string {
  const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${weekday}, ${day} de ${month}`;
}

/**
 * Formats a time string "HH:mm" for display.
 */
export function formatTime(timeString: string): string {
  return timeString;
}
