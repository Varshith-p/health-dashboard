import Chat from "./components/Chat";
import Gamification from "./components/Gamification";
import Header from "./components/Header";
import HealthCategories from "./components/HealthCategories";
import Passport from "./components/Passport";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log(user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?seed=consistentUser&results=1"
        );
        setUser(response.data.results[0]); // Save the single user data
        setLoading(false);
      } catch (err) {
        alert(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className="relative lg:grid grid-cols-6 w-screen h-screen overflow">
      <Sidebar loading={loading} user={user} />
      <main className="col-span-5 bg-[#ebf5fe]/60 h-full overflow-auto">
        <Navbar loading={loading} user={user} />
        <div className="p-8">
          <Header loading={loading} user={user} />
          <HealthCategories />
          <Gamification />
          <Passport />
          <Chat />
        </div>
      </main>
    </section>
  );
}

export default App;
