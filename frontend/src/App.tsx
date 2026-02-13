import { useEffect, useState } from 'react';
import { supabase } from './supabase';

function App() {
  const [posts, setPosts] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setPosts(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || loading) return;

    setLoading(true);
    const { error } = await supabase
      .from('guestbook')
      .insert([{ name, message }]);

    if (!error) {
      setName('');
      setMessage('');
      await loadPosts();
    }
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, []);

  return (
    <div style={{ backgroundColor: '#1a1c2c', color: 'white', minHeight: '100vh', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Guestbook</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" style={{ padding: '10px', margin: '5px', borderRadius: '4px' }} />
        <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" style={{ padding: '10px', margin: '5px', borderRadius: '4px' }} />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', background: '#e52e71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Saving...' : 'Sign'}
        </button>
      </form>
      <div>
        {posts.map((p) => (
          <div key={p.id} style={{ borderLeft: '3px solid #ff8a00', paddingLeft: '15px', marginBottom: '20px' }}>
            <strong style={{ color: '#ff8a00' }}>{p.name}:</strong> {p.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;