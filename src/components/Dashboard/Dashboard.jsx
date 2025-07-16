import ProfileCard from "./ProfileCard";

export default function Dashboard() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h1>Welcome to Dashboard</h1>
        <ProfileCard/>
      {/* <BMICard /> */}
    </div>
  );
}