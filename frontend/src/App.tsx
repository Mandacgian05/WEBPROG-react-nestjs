import { useEffect, useState } from 'react';
import { supabase } from './supabase';

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

    const { error } = await supabase
      .from('guestbook')
      .insert([{ name, message }]);

    if (!error) {
      setName('');
      setMessage('');
      loadPosts();
    }
  };

  useEffect(() => { loadPosts(); }, []);

  return (
    <div style={{ backgroundColor: '#1a1c2c', color: 'white', minHeight: '100vh', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Guestbook</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" style={{ padding: '10px', margin: '5px' }} />
        <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" style={{ padding: '10px', margin: '5px' }} />
        <button type="submit" style={{ padding: '10px 20px', background: '#e52e71', color: 'white', border: 'none', borderRadius: '4px' }}>Sign</button>
      </form>
      <div>
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