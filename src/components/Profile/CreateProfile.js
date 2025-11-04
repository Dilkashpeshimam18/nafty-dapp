import { useState } from 'react';
import { X } from 'lucide-react';
import { useStateContext } from '../../context/index';

const ProfileModal = ({ onClose }) => {
  const { setProfile } = useStateContext();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name || !username) {
        alert('Name and username are required');
        return;
      }
      setLoading(true); // start loading

      await setProfile(name, bio, username, image);
      onClose(); // close modal after profile creation
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-2xl w-96 relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={onClose}>
          <X size={18} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Create Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Display Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-800 text-white text-sm"
          />
          <input
            type="text"
            placeholder="Username (@handle)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-800 text-white text-sm"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-800 text-white text-sm"
          />
          <input
            type="text"
            placeholder="Profile Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-800 text-white text-sm"
          />

          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm">
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
