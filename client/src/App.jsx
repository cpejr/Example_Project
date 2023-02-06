import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Routes from './routes';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />;
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
