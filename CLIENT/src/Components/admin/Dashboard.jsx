import CategoryList from "./category/CategoryList";
import CommentList from "./comment/CommentList";
import ContactList from "./contact/ContactList";
import SubjectList from "./subject/SubjectList";

function Dashboard() {
  return (
    <>
      <main>
        <section>
          <h2>Hello Admin</h2>
        </section>

        <section>
          <CategoryList />
        </section>
        <section>
          <SubjectList />
        </section>
        <section>
          <CommentList />
        </section>
        <section>
          <ContactList />
        </section>
      </main>
    </>
  );
}

export default Dashboard;
