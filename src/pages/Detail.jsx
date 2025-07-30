import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Detail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)

  useEffect(() => {
    async function fetchOne() {
      const { data } = await supabase.from('crewmates').select().eq('id', id).single()
      setCrewmate(data)
    }
    fetchOne()
  }, [id])

  if (!crewmate) return <div>Loading...</div>

  return (
    <div className="detail-wrapper">
    <h1>{crewmate.name}</h1>
    <div className="detail-info">
        <p><strong>Category:</strong> {crewmate.category}</p>
        <p><strong>Attributes:</strong> {crewmate.attributes.join(', ')}</p>
    </div>
    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Link to={`/edit/${crewmate.id}`} className="button">Edit Crewmate</Link>
    </div>
    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Link to={`/edit/${crewmate.id}`} className="button">Edit Crewmate</Link>
        <br />
        <Link to="/" className="back-button">← Back to Home</Link>
    </div>

    </div>
  )
}
