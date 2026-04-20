export const Colors = {
  main: '#FF7D00',
  secondary: '#333333',
  text: '#000000',
  textSecondary: '#6B7280',
  detail: '#ffc300',
  background: '#F0F0F0',
  cardBackground: '#FFFFFF',
  success: '#28A745',
  error: '#FF2C2C',
  textButton: '#FFFFFF',

  // ── Gradientes ──
  button: {
    main: ['#EBC351', '#FF7D00'] as const,
    secondary: ['#28A745', '#0D5D1F'] as const,
    disabled: ['#6B6969', '#333333'] as const,
  },
  title: {
    main: ['#5E5858', '#C4B8B8'] as const,
  },
  border: {
    main: ['#EBC351', '#FF7D00'] as const,
  },
  headerGradient: ['#FF7D00', '#EBC351'] as const,

  // ── Status ──
  status: {
    pending: '#F59E0B',
    pendingBg: '#FEF3C7',
    in_progress: '#3B82F6',
    in_progressBg: '#DBEAFE',
    completed: '#10B981',
    completedBg: '#D1FAE5',
  },

  // ── Prioridade ──
  priority: {
    high: '#EF4444',
    highBg: '#FEE2E2',
    medium: '#F59E0B',
    mediumBg: '#FEF3C7',
    low: '#10B981',
    lowBg: '#D1FAE5',
  },
};
