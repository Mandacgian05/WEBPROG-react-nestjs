import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from './supabase';
function App() {
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const loadPosts = async () => {
        const { data, error } = await supabase
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error)
            setPosts(data || []);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !message)
            return;
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
    return (_jsxs("div", { style: { background: 'linear-gradient(135deg, #1f1c2c, #928dab)', color: '#fff', minHeight: '100vh', padding: '60px', fontFamily: 'Montserrat, sans-serif' }, children: [_jsx("h1", { style: { textAlign: 'center', fontSize: '3rem', background: 'linear-gradient(90deg, #ff8a00, #e52e71)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }, children: "My Profile & Guestbook" }), _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', justifyContent: 'center', gap: '15px', background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '12px' }, children: [_jsx("input", { value: name, onChange: e => setName(e.target.value), placeholder: "Name", style: { background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '12px', borderRadius: '8px' } }), _jsx("textarea", { value: message, onChange: e => setMessage(e.target.value), placeholder: "Message", style: { background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '12px', borderRadius: '8px', resize: 'none' } }), _jsx("button", { type: "submit", style: { background: '#ff8a00', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }, children: "Sign Guestbook" })] }), _jsx("div", { style: { maxWidth: '700px', margin: '40px auto' }, children: posts.map((p) => (_jsxs("div", { style: { background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid #ff8a00', padding: '15px', marginBottom: '15px', borderRadius: '8px' }, children: [_jsxs("strong", { style: { color: '#ffd700' }, children: [p.name, ":"] }), " ", p.message] }, p.id))) })] }));
}
export default App;
