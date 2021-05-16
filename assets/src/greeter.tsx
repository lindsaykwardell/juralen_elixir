import React, { Suspense } from "react";
import { useQuery, useSubscription } from "./gqless";

interface GreeterProps {
  name: string;
}

const UserList = () => {
  const query = useQuery({
    suspense: true,
  });
  const { newGameCreated } = useSubscription();

  return (
    <div>
      <div>
        {query.allUsers.map((user) => (
          <div key={user.id}>
            {user.id}: {user.name} ({user.email})
          </div>
        ))}
      </div>
      {newGameCreated({ uuid: "1b76f699-3716-4f93-b897-e3b336fdeee8" })}
    </div>
  );
};

const Greeter: React.FC<GreeterProps> = (props: GreeterProps) => {
  const name = props.name;

  return (
    <section className="w-96 m-auto bg-gray-900 p-4 shadow">
      <form className="flex flex-col text-lg">
        <label className="flex justify-between items-center mb-3">
          Email Address
          <input type="email" className="w-52 p-1 text-black" />
        </label>
        <label className="flex justify-between items-center">
          Password
          <input type="password" className="w-52 p-1 text-black" />
        </label>
      </form>
      <Suspense fallback="Loading...">
        <UserList />
      </Suspense>
    </section>
  );
};

export default Greeter;
