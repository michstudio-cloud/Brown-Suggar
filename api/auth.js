export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = JSON.parse(req.body);
    
    // En Vercel, usamos process.env.ADMIN_PASSWORD (Variable de entorno del servidor, invisible al frontend)
    // En local, podemos tener un fallback o usar el mismo nombre en .env
    const serverPassword = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD;

    if (serverPassword && password === serverPassword) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}