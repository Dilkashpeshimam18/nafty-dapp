import { useState,useEffect } from 'react';
import { X } from 'lucide-react';
import { useStateContext } from '../../context';

const EditProfileModal = ({ isOpen, onClose, userData }) => {
  const { editProfile } = useStateContext();

  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false); 


  useEffect(() => {
    if (isOpen && userData) {
      setDisplayName(userData.displayName || "");
      setUserName(userData.userName || "");
      setBio(userData.bio || "");
      setImage(userData.image || "");
    }
  }, [isOpen, userData]);
  const handleSave = async () => {
    try {
            setLoading(true); // start loading

      await editProfile(displayName, userName, bio, image);
      onClose();
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-900 w-[400px] rounded-2xl p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold mb-4 text-white">Edit Profile</h2>

        {/* Display Name */}
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded-lg bg-gray-800 text-gray-200 outline-none"
        />

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded-lg bg-gray-800 text-gray-200 outline-none"
        />

        {/* Bio */}
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded-lg bg-gray-800 text-gray-200 outline-none resize-none"
        />

        {/* Image URL */}
        <input
          type="text"
          placeholder="Profile Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded-lg bg-gray-800 text-gray-200 outline-none"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-white font-semibold"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
