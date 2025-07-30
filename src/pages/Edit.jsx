import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'



const categories = {
  Warrior: ['Strength', 'Shield', 'Endurance'],
  Mage: ['Fire', 'Ice', 'Lightning'],
  Rogue: ['Stealth', 'Speed', 'Lockpicking']
}

export default function Edit() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)
  const [attributes, setAttributes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchOne() {
      const { data } = await supabase.from('crewmates').select().eq('id', id).single()
      setCrewmate(data)
      setAttributes(data.attributes)
    }
    fetchOne()
  }, [id])

  const handleAttributeClick = attr => {
    setAttributes(prev =>
      prev.includes(attr)
        ? prev.filter(a => a !== attr)
        : [...prev, attr]
    )
  }

  async function handleUpdate(e) {
    e.preventDefault()
    await supabase.from('crewmates').update({ attributes }).eq('id', id)
    navigate('/')
  }

  async function handleDelete() {
    await supabase.from('crewmates').delete().eq('id', id)
    navigate('/')
  }

  if (!crewmate) return <div>Loading...</div>

  return (
    <div className="edit-wrapper">
      <h1>Edit {crewmate.name}</h1>
      <form onSubmit={handleUpdate}>
        <p><strong>Category:</strong> {crewmate.category}</p>

        {categories[crewmate.category].map(attr => (
          <label key={attr}>
            <input
              type="checkbox"
              checked={attributes.includes(attr)}
              onChange={() => handleAttributeClick(attr)}
            />
            {attr}
          </label>
        ))}

        <div className="edit-actions">
          <button type="submit" className="update-button">Update</button>
          <button type="button" className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  )
}
