import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

export default function Home() {
  const [crew, setCrew] = useState([])

  useEffect(() => {
    fetchCrew()
  }, [])

  async function fetchCrew() {
    const { data } = await supabase
      .from('crewmates')
      .select('*')
      .order('created_at', { ascending: false })
    setCrew(data)
  }
function computeStats(crewmates) {
  const total = crewmates.length
  const attributeCounts = {}
  const categoryCounts = {}

  for (const c of crewmates) {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1
    for (const attr of c.attributes) {
      attributeCounts[attr] = (attributeCounts[attr] || 0) + 1
    }
  }

  return { total, categoryCounts, attributeCounts }
}

const stats = computeStats(crew)
const isBalanced =
  stats.categoryCounts['Warrior'] &&
  stats.categoryCounts['Mage'] &&
  stats.categoryCounts['Rogue']



return (
  <div className="container">
    <h1>Crewmates</h1>
    <Link to="/create" className="button">Add New Crewmate</Link>

    <div className="stats-box">
      <h2>Team Summary</h2>
      <p><strong>Total Crewmates:</strong> {stats.total}</p>

      <p><strong>Category Breakdown:</strong></p>
      <ul>
        {Object.entries(stats.categoryCounts).map(([cat, count]) => (
          <li key={cat}>{cat}: {count}</li>
        ))}
      </ul>

      <p><strong>Attribute Distribution:</strong></p>
      <ul>
        {Object.entries(stats.attributeCounts).map(([attr, count]) => (
          <li key={attr}>
            {attr}: {((count / stats.total) * 100).toFixed(1)}%
          </li>
        ))}
      </ul>

      <div className={`success-message ${isBalanced ? 'success' : 'fail'}`}>
        Crew Success: {isBalanced ? 'Balanced team! ✅' : 'Unbalanced team ⚠️'}
      </div>
    </div>

    <div className="grid">
      {crew.map(c => (
        <div key={c.id} className="card">
          <h2>{c.name}</h2>
          <p><strong>Category:</strong> {c.category}</p>
          <p><strong>Attributes:</strong> {c.attributes.join(', ')}</p>
          <div className="actions">
            <Link to={`/crewmate/${c.id}`} className="button">View</Link>
            <Link to={`/edit/${c.id}`} className="button">Edit</Link>
          </div>
        </div>
      ))}
    </div>
  </div>
)


}
