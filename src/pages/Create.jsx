import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const categories = {
  Warrior: ['Strength', 'Shield', 'Endurance'],
  Mage: ['Fire', 'Ice', 'Lightning'],
  Rogue: ['Stealth', 'Speed', 'Lockpicking']
}

export default function Create() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [attributes, setAttributes] = useState([])
  const navigate = useNavigate()

  const handleAttributeClick = attr => {
    setAttributes(prev =>
      prev.includes(attr)
        ? prev.filter(a => a !== attr)
        : [...prev, attr]
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await supabase.from('crewmates').insert([{ name, category, attributes }])
    navigate('/')
  }

  return (
    <div className="form-wrapper">
      <h1>Create Crewmate</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter crewmate name"
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={e => {
            setCategory(e.target.value)
            setAttributes([])
          }}
          required
        >
          <option value="">Select Category</option>
          {Object.keys(categories).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {category && (
          <div className="checkbox-group">
            <label>Attributes</label>
            {categories[category].map(attr => (
              <label key={attr}>
                <input
                  type="checkbox"
                  checked={attributes.includes(attr)}
                  onChange={() => handleAttributeClick(attr)}
                />
                {` ${attr}`}
              </label>
            ))}
          </div>
        )}

        <button type="submit" className="create-button">Create</button>
      </form>

      <Link to="/" className="back-button">← Back to Home</Link>

    </div>
  )
}
