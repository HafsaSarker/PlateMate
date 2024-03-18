import { Cog8ToothIcon } from "@heroicons/react/24/outline";




const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col justify-between px-4 py-10 bg-primary">
      <Cog8ToothIcon className="h-9" />
      <div className="flex flex-col gap-5">
        <button>Toggle</button>
        <img className="rounded-full" src='https://via.placeholder.com/55' alt='user-pfp' />
      </div>
    </div>


  );

}

export default Sidebar;