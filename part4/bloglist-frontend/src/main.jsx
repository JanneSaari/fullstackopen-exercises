import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Container } from '@mui/material'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <Container>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </QueryClientProvider>
  </Container>
);
