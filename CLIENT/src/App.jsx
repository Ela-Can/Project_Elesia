import AdminRouter from "./Router/AdminRouter";
import UserRouter from "./Router/UserRouter";
import Loading from "./Components/Loading";

import useCheckAuth from "./Hook/useCheckAuth";

function App() {
  const [user, isLoading] = useCheckAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (user.role === "admin") {
    return <AdminRouter />;
  } else return <UserRouter />;
}

export default App;
