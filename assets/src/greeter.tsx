import React, { Suspense } from "react";
import { useQuery } from "./gqless";

interface GreeterProps {
  name: string;
}

const UserList = () => {
  const query = useQuery({
    suspense: true,
  });

  return (
    <div>
      {query.allUsers.map((user) => (
        <div key={user.id}>{user.id}: {user.name} ({user.email})</div>
      ))}
    </div>
  );
};

const Greeter: React.FC<GreeterProps> = (props: GreeterProps) => {
  const name = props.name;

  return (
    <section className="phx-hero">
      <h1>Welcome to {name} with Typescript and React!</h1>
      <p>
        A productive web framework that
        <br />
        does not compromise speed or maintainability.
      </p>
      <Suspense fallback="Loading...">
        <UserList />
      </Suspense>
    </section>
  );
};

export default Greeter;
