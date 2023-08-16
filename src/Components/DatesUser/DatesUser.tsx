import { useEffect, useLayoutEffect, useState } from "react";

import "./DatesUser.sass";

interface IdatesUser {
  name: string;
  level: number;
  id: number;
}

const datesUsers: IdatesUser[] = [
  { name: "Ruan", level: 10, id: 1 },
  { name: "Leonardo", level: 7, id: 2 },
  { name: "Cristina", level: 3, id: 3 },
  { name: "Roberta", level: 8, id: 4 },
  { name: "Cláudio", level: 6, id: 5 },
];

interface PropsUser {
  name: string;
  level: number;
  userAdd: boolean;
}

const DatesUser = ({ name, level, userAdd }: PropsUser) => {
  if (userAdd) {
    datesUsers.push({ name, level, id: 6 });
  }

  datesUsers.filter((i) => i.name === name).map((t) => (t.level = level));

  datesUsers.sort((a, b) => b.level - a.level);

  return (
    <div className="userContainer">
      <table className="tableContainer">
        <thead className="tableHeader">
          <tr>
            <th>Name</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody className="tableNames">
          {datesUsers.map(({ level, name, id }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatesUser;
