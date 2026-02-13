import { useEffect, useState } from 'react';
import { supabase } from './supabase';

// This component uses your custom styles converted to a React-friendly format
function App() {
  const [posts, setPosts] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('guestbook') // Matches your table name
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setPosts(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || loading) return;

    setLoading(true);
    // Directly inserts into Supabase to avoid the 404 POST error
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
    <div style={{ 
      background: 'linear-gradient(135deg, #1f1c2c, #928dab)', 
      color: '#ffffff', 
      minHeight: '100vh', 
      padding: '60px', 
      fontFamily: 'Montserrat, sans-serif' 
    }}>
      <h1 style={{ 
        fontSize: '4rem', 
        fontWeight: 900, 
        textAlign: 'center', 
        marginBottom: '50px',
        background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        My Profile & Guestbook
      </h1>

      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '15px', 
        background: 'rgba(255, 255, 255, 0.05)', 
        padding: '25px', 
        borderRadius: '12px', 
        marginBottom: '30px',
        backdropFilter: 'blur(5px)'
      }}>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Name" 
          style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff', padding: '12px', borderRadius: '8px', width: '180px' }} 
        />
        <textarea 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          placeholder="Message" 
          style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff', padding: '12px', borderRadius: '8px', width: '320px', resize: 'none' }} 
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ background: '#ff8a00', color: '#fff', padding: '14px 28px', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
        >
          {loading ? 'Signing...' : 'Sign Guestbook'}
        </button>
      </form>

      <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {posts.map((p) => (
          <div key={p.id} style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            borderLeft: '4px solid #ff8a00', 
            padding: '15px 20px', 
            borderRadius: '8px' 
          }}>
            <strong style={{ color: '#ffd700' }}>{p.name}:</strong> {p.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;