import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./redux-toolkit-or-app/store";
// import store from "./redux-vanila/store";
import routes from "./routes/routes";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </div>
  );
}

export default App;
