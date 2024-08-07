import { Card } from "./components";
import { useReducer, useState, useSyncExternalStore } from "react";
import { womens, selectStore} from '../../../../stores/store'


export const SelectTopPick = () => {

  type Character = {
      id: number;
      name: string;
  }
  const [select, setSelect] = useState<number | undefined>(undefined);

  
  const setId = selectStore((state) => state.setId);

  return (
    <div className="max-h-[100%] overflow-y-auto">
      <div className="px-[18px] py-[18px] pb-[50px] gap-4 grid grid-cols-3">
        {womens.map((user, index) => (
          <Card
            onClick={() => {setSelect(user.id),setId(user.id)}}
            checked={select === user.id}
            key={index}
            user={{
              name: user.name,
              img: "/avatars/avatar-" + user.id +".png"
            }}
          />
        ))}
      </div>
    </div>
  );
};
