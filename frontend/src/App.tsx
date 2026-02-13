import { useEffect, useState } from 'react';
import { supabase } from './supabase'; // Import the client you just fixed

function App() {
  const [posts, setPosts] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // 1. Load posts using the Supabase client
  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('guestbook') // Matches your table name
      .select('*')
      .order('created_at', { ascending: false }); // Show newest first

    if (error) {
      console.error('Error loading posts:', error.message);
    } else {
      setPosts(data || []);
    }
  };

  // 2. Submit posts using the Supabase client
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const { error } = await supabase
      .from('guestbook')
      .insert([{ name, message }]); // Matches your columns: name and message

    if (error) {
      alert('Error: ' + error.message);
    } else {
      setName('');
      setMessage('');
      loadPosts(); // Refresh the list
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div style={{ backgroundColor: '#1a1c2c', color: 'white', minHeight: '100vh', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Guestbook</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Name" 
          style={{ padding: '10px', margin: '5px', borderRadius: '4px', border: 'none' }} 
        />
        <input 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          placeholder="Message" 
          style={{ padding: '10px', margin: '5px', borderRadius: '4px', border: 'none' }} 
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', background: '#e52e71', color: 'white', border: 'none', borderRadius: '4px' }}>Sign</button>
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