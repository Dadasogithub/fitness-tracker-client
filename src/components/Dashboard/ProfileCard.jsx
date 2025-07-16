import { useAuth } from "../../hooks/useAuth";

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-2">👤 Profile</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      {console.log(user + "user")}
      {/* You can add more fields here */}
    </div>
  );
}