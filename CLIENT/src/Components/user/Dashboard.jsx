import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.user);
  return (
    <main>
      <h2>Hello {user.pseudo}</h2>
      <section>
        <p>Vos informations personnelles</p>
      </section>
    </main>
  );
}

export default Dashboard;
