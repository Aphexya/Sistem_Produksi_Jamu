import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Mencegah pemanggilan data berulang yang tidak terduga saat focus tab
      retry: 1,                    // Default asalnya 3x coba, kita set 1 untuk UX yang lebih cepat
      staleTime: 5 * 60 * 1000,    // Cache dianggap valid selama 5 menit
    },
  },
});
