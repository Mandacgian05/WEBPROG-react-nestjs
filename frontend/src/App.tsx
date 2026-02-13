import { useEffect, useState } from 'react';
import { supabase } from './supabase'; // Ensure this points to your supabase.ts

function App() {
  const [posts, setPosts] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setPosts(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    // FIX: Directly use Supabase client, NOT a fetch() to a local URL
    const { error } = await supabase
      .from('guestbook')
      .insert([{ name, message }]);

    if (error) {
      console.error("Supabase Error:", error.message);
      alert("Error: " + error.message);
    } else {
      setName('');
      setMessage('');
      loadPosts();
    }
  };

  useEffect(() => { loadPosts(); }, []);

  return (
    <div style={{ backgroundColor: '#1a1c2c', color: 'white', minHeight: '100vh', padding: '50px' }}>
      <h1>Guestbook</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" style={{ padding: '10px', margin: '5px' }} />
        <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" style={{ padding: '10px', margin: '5px' }} />
        <button type="submit" style={{ padding: '10px 20px', background: '#e52e71', color: 'white' }}>Sign</button>
      </form>
      <div style={{ marginTop: '20px' }}>
        {posts.map((p) => (
          <div key={p.id} style={{ borderLeft: '3px solid #ff8a00', paddingLeft: '15px', marginBottom: '20px' }}>
            <strong>{p.name}:</strong> {p.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;